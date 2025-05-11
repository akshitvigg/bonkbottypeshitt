import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import "./App.css";
import axios from "axios";

function App() {
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/rcKewhEi1DhcCldkNH-Ls8SlXjTd3HIy"
  );

  const pubKey = new PublicKey("Cz6y2KDbtfVtpcfXywsuYVDEcuPDNq4nXQq3Eq1kttfC");
  const sendSol = async () => {
    const inx = SystemProgram.transfer({
      fromPubkey: pubKey,
      toPubkey: new PublicKey("badzog4uMZdEJmkAJrzUSbp4Yzvp79ax9b3ozKxmFvc"),
      lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    const txn = new Transaction().add(inx);
    const { blockhash } = await connection.getLatestBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = pubKey;

    const serializedTxn = txn.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    await axios.post("http://localhost:3000/txn/sign", {
      serializedTxns: serializedTxn,
      retry: false,
    });
  };

  return (
    <div>
      <input type="text" placeholder="to" />
      <input type="text" placeholder="amount" />
      <button onClick={sendSol}>send</button>
    </div>
  );
}

export default App;
