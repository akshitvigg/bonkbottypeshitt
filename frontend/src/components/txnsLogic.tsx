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
import Loader from "./ui/loader";

const TxnsLogic = ({
  onClose,
  setImage,
  image,
  setUsername,
  username,
}: any) => {
  const [publicKey, setpubKey] = useState("");
  const toRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [colorbool, setcolorbool] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      if (resp.data.user) {
        setUsername(resp.data.user.username);
        setpubKey(resp.data.user.publicKey);
        console.log(resp.data.user.username, resp.data.user.publicKey);
        setcolorbool(true);
      }
    }
    getpubkey();
  }, []);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objecturl = URL.createObjectURL(file);
      setImage(objecturl);
      console.log(objecturl);
    }
  };

  const sendSol = async () => {
    console.log(image);
    const to = toRef.current?.value;
    const amount = parseFloat(amountRef.current?.value || "0");
    setLoading(true);
    if (!to || isNaN(amount) || amount <= 0) {
      setError(true);
      return;
    }

    if (!publicKey) {
      console.log("public key not loaded yet");
      return;
    }
    try {
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
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="[font-family:var(--font-handwriting)] min-h-screen  ">
      <div data-aos="fade-left" className="  flex justify-end mt-4 mr-7">
        <Button
          onClick={onClose}
          statusColor={colorbool}
          value={username}
          status={true}
          variant="primary"
          size="md"
          imgUrl={image}
          changefn={handlechange}
        />
      </div>
      <div className="flex justify-center  mt-34">
        <div
          data-aos="fade-up"
          className=" border-2 rounded-3xl border-zinc-200 pb-10 pt-10 px-10 space-y-6"
        >
          <p className=" text-center text-3xl font-bold">Transaction</p>
          <Input reference={toRef} size="lg" placeholder="to" />
          {error && (
            <p className="  text-red-500">recipient address cannot be empty</p>
          )}
          <Input size="lg" reference={amountRef} placeholder="amount" />
          {error && <p className=" text-red-500">amount cannot be empty</p>}
          <Button
            value={loading ? <Loader color="white" /> : "Send"}
            variant="primary"
            size="lg"
            onClick={sendSol}
          />
        </div>
      </div>
    </div>
  );
};

export default TxnsLogic;
