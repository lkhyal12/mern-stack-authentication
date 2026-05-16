import { transporter } from "./nodemailer.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./verificationTemplate.js";

export const sendResetPasswordLink = async (user, code) => {
  const url = `http://localhost:5173/reset-password/${code}?id=${user._id}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
    });
    return info;
  } catch (err) {
    console.log("error in the sendresetpasswordlink function ", err);
    return false;
  }
};
