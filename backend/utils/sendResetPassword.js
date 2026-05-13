import { transporter } from "./nodemailer.js";

export const sendResetPasswordLink = async (user, code) => {
  const url = `http://localhost:5317/reset-password/${code}`;
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `<a target='_blank' href='${url}'>Reset Your Password</a>`,
    });
    return info;
  } catch (err) {
    console.log("error in the sendresetpasswordlink function ", err);
    return false;
  }
};
