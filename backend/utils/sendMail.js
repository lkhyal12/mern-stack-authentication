import { transporter } from "./nodemailer.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./verificationTemplate.js";

export const sendEmailVerification = async (user, code) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Email verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{code}", code),
    });
    console.log(info);
    return info;
  } catch (err) {
    console.log("verification error ", err);
    return false;
  }
};
