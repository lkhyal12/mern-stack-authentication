import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken, setCookies } from "../utils/tokens.js";
import { sendEmailVerification } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { sendResetPasswordLink } from "../utils/sendResetPassword.js";
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
      return res.status(400).json({
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

// logout controller
export const logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json({ message: "Logged out successfully", success: true });
};

// forgot password controller
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const trimmedEmail = email?.trim().toLowerCase();
  if (!trimmedEmail)
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  try {
    const user = await UserModel.findOne({ email: trimmedEmail });
    if (!user) return res.status(400).json({ message: "Invalid Email" });
    const code = crypto.randomBytes(32).toString("hex");
    user.passwordVerificationCode = code;
    user.passwordVerificationExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    const result = await sendResetPasswordLink(user, code);
    if (result) {
      return res.status(200).json({ message: "Reset Password Link Sent" });
    }
    return res.status(400).json({
      message: "We could not send a reset link please try again later",
    });
  } catch (err) {
    console.log("error occured in the forgotpassword controller ", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// reset password controller

export const resetPasswordController = async (req, res) => {
  const { code } = req.params;
  const { email, password } = req.body;
  const trimmedEmail = email?.trim().toLowerCase();
  if (!trimmedEmail)
    return res.status(400).json({ message: "Missing credentials" });
  if (!password)
    return res.status(400).json({ message: "new password is required" });
  if (!code)
    return res.status(400).json({ message: "Missing Verification code" });

  try {
    const user = await UserModel.findOne({ email: trimmedEmail });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    if (
      code !== user.passwordVerificationCode ||
      user.passwordVerificationExpires < Date.now()
    )
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    const hashesPassword = await bcrypt.hash(password, 10);
    user.password = hashesPassword;
    user.passwordVerificationCode = null;
    user.passwordVerificationExpires = null;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log("error occured in the reset password controller ", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// refresh token controller
export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Missing refreshToken" });
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // const user = await UserModel.findById(decoded.user.userId).select('-password')

    const newAccessToken = generateAccessToken(decoded.user);
    return res.status(200).json({
      message: "new accessToken was issued",
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log("error occured ine the refreshcontroller ", err);
    return res.status(401).json({ message: "Invalid refreshToken" });
  }
};

// get profile controller
export const getProfileController = (req, res) => {
  return res.status(200).json({
    message: "User sent successfully",
    user: req.user,
    success: true,
  });
};
