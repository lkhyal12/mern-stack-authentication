import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: String,
  emailVerificationExpires: Date,
  passwordVerificationCode: String,
  passwordVerificationExpires: Date,
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
