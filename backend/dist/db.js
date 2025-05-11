"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    privateKey: { type: [Number] },
    publicKey: String,
});
exports.userModel = mongoose_1.default.model("users", userSchema);
