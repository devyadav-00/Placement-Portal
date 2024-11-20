import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Account_Verification_Success_Template } from "../utils/AccountVerificationTemplate.js";
import transporter from "../utils/email.config.js";

const tpoSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    // notifications: [
    //   {
    //     message: { type: String, required: true },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
  },
  { timestamps: true }
);


tpoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
tpoSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

tpoSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

tpoSchema.post("save", async function (doc) {
  if (doc.isVerified) {
    const mailOptions = {
      from: `"NITA-PLACEMENT-CELL" <${process.env.NODEMAIL_EMAIL}>`,
      to: doc.email,
      subject: "Account Verified",
      text: `Hello ${doc.firstname},\n\nYour account has been successfully verified. You can now access all our features and resources.\n\nRegards,\nTeam NITA Placement Cell`,
      html: Account_Verification_Success_Template(doc),
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }
});


export const TPO = mongoose.model("TPO", tpoSchema);
