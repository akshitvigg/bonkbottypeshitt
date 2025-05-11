import express from "express";
import { userModel } from "./db";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/rcKewhEi1DhcCldkNH-Ls8SlXjTd3HIy"
);

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashedpass = await bcrypt.hash(password, 8);
  const keypair = new Keypair();

  await userModel.create({
    username: username,
    password: hashedpass,
    privateKey: keypair.secretKey,
    publicKey: keypair.publicKey,
  });

  res.json({
    message: "user signed up successfully",
    publicKey: keypair.publicKey,
  });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    res.json({
      message: "user not found",
    });
    return;
  }

  const hashedpass = await bcrypt.compare(password, user.password!);
  if (hashedpass) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET as string);
    res.json({
      message: "signed in successfully",
      token: token,
    });
  } else {
    res.json({
      message: "invalid credentials or password try again ",
    });
  }
});

app.post("/txn/sign", async (req, res) => {
  const serializedTxns = req.body.serializedTxns;

  const txn = Transaction.from(Buffer.from(serializedTxns));
  const keypair = Keypair.fromSecretKey(
    bs58.decode(process.env.PRIVATE_KEY as string)
  );

  txn.sign(keypair);

  const signature = await connection.sendRawTransaction(txn.serialize());
  console.log(signature);

  res.json({
    message: "txns success",
  });
});

app.get("/txn", (req, res) => {});

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://akshitvig213:TzHRadb1s9w9vAlh@cluster0.wvw0s.mongodb.net/cloudWallet"
  );
  console.log("database connected");
  app.listen(3000);
  console.log("server started listening on ", PORT);
};
connect();
