import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  privateKey: { type: [Number] },
  publicKey: String,
});

export const userModel = mongoose.model("users", userSchema);
