"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const secret = "random";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
const connection = new web3_js_1.Connection("https://solana-devnet.g.alchemy.com/v2/rcKewhEi1DhcCldkNH-Ls8SlXjTd3HIy");
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedpass = yield bcrypt_1.default.hash(password, 8);
    const keypair = new web3_js_1.Keypair();
    yield db_1.userModel.create({
        username: username,
        password: hashedpass,
        privateKey: keypair.secretKey,
        publicKey: keypair.publicKey,
    });
    res.json({
        message: "user signed up successfully",
        publicKey: keypair.publicKey,
    });
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.userModel.findOne({
        username,
    });
    if (!user) {
        res.json({
            message: "user not found",
        });
        return;
    }
    const hashedpass = yield bcrypt_1.default.compare(password, user.password);
    if (hashedpass) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
        res.json({
            message: "signed in successfully",
            token: token,
        });
    }
    else {
        res.json({
            message: "invalid credentials or password try again ",
        });
    }
}));
app.post("/txn/sign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedTxns = req.body.serializedTxns;
    const txn = web3_js_1.Transaction.from(Buffer.from(serializedTxns));
    const keypair = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(process.env.PRIVATE_KEY));
    txn.sign(keypair);
    const signature = yield connection.sendRawTransaction(txn.serialize());
    console.log(signature);
    res.json({
        message: "txns success",
    });
}));
app.get("/txn", (req, res) => { });
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb+srv://akshitvig213:TzHRadb1s9w9vAlh@cluster0.wvw0s.mongodb.net/cloudWallet");
    console.log("database connected");
    app.listen(3000);
    console.log("server started listening on ", PORT);
});
connect();
