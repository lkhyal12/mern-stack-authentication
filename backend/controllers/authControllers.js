import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, setCookies } from "../utils/tokens.js";
import { sendEmailVerification } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
export const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim().toLowerCase();
  if (!trimmedName || !trimmedEmail || !password)
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  try {
    const existingUser = await UserModel.findOne({ email: trimmedEmail });
    if (existingUser)
      return res
        .status(409)
        .json({ message: "This email already exists", success: false });
    const hashesPassword = await bcrypt.hash(password, 10);
    const code = Math.floor(Math.random() * 900000 + 100000);
    const user = await UserModel.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashesPassword,
      emailVerificationCode: String(code),
      emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000),
    });
    const result = await sendEmailVerification(user, code);
    console.log({ result });
    if (!result)
      return res.status(500).json({
        message:
          "We could not send a verification code please try to login with this email to get another code",
      });
    const userObj = {
      verified: user.verified,
      userId: user._id,
      email: user.email,
    };
    const accessToken = generateAccessToken(userObj);
    setCookies(res, user);
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      accessToken,
    });
  } catch (err) {
    console.log("Error in the signup controller ", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const verifyEmailController = async (req, res) => {
  const { accessToken, code } = req.body;
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decoded.user.email;
    const user = await UserModel.findOne({ email });
    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationExpires + 15 * 60 * 1000 > Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
      user.verified = true;
      user.emailVerificationCode = null;
      user.emailVerificationExpires = null;
      await user.save();
      return res.status(200).json({ message: "Email verified successfully" });
    }
  } catch (err) {
    console.log("error occured the verify email controller ", err);
    return res.status(500).json({ message: "server error" });
  }
};

// login controller
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const trimmedEmail = email?.trim().toLowerCase();
  if (!trimmedEmail || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await UserModel.findOne({ email: trimmedEmail });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    if (!user.verified) {
      const code = Math.floor(Math.random() * 900000 + 100000);
      const result = await sendEmailVerification(user, code);
      return res
        .status(400)
        .json({
          message:
            "Please check your inbox to check your email to verify your account",
        });
    }
    const userObj = { userId: user._id, email: trimmedEmail, verified: true };

    const accessToken = generateAccessToken(userObj);
    setCookies(res, user);
    return res.status(200).json({ message: "You are logged in successfully" });
  } catch (error) {
    console.log("error occured in the login controller ", err);
    return res.status(500).json({ message: "Server error" });
  }
};
