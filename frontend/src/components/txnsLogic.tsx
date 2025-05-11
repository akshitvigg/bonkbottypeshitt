import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import Button from "./ui/button";

const TxnsLogic = () => {
  const [publicKey, setpubKey] = useState("");
  const toRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/rcKewhEi1DhcCldkNH-Ls8SlXjTd3HIy"
  );

  useEffect(() => {
    async function getpubkey() {
      const resp = await axios.get("http://localhost:3000/getinfo", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setpubKey(resp.data.pubKey);
    }
    getpubkey();
  }, []);

  const sendSol = async () => {
    if (!publicKey) {
      console.log("public key not loaded yet");
      return;
    }
    const amount = parseFloat(amountRef.current?.value || "0");
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const pubKey = new PublicKey(publicKey);
    const inx = SystemProgram.transfer({
      fromPubkey: pubKey,
      toPubkey: new PublicKey(toRef.current?.value!),
      lamports: amount * LAMPORTS_PER_SOL,
    });

    const txn = new Transaction().add(inx);
    const { blockhash } = await connection.getLatestBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = pubKey;

    const serializedTxn = txn.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    await axios.post(
      "http://localhost:3000/txn/sign",
      {
        serializedTxns: serializedTxn,
        retry: false,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  return (
    <div className=" min-h-screen  flex justify-center items-center">
      <div className=" space-y-6">
        <Input reference={toRef} size="lg" placeholder="to" />
        <Input size="lg" reference={amountRef} placeholder="amount" />
        <Button value="Send" variant="primary" size="lg" onClick={sendSol} />
        pubkey - <b>{publicKey}</b>
      </div>
    </div>
  );
};

export default TxnsLogic;
