import { useRef, useState } from "react";
import Button from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface AuthCompProps {
  isSignup: boolean;
}

const AuthComp = ({ isSignup }: AuthCompProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [pubkey, setpubKey] = useState("");
  const navigate = useNavigate();

  async function signup() {
    const resp = await axios.post("http://localhost:3000/signup", {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });
    setpubKey(resp.data.publicKey);
  }

  async function signin() {
    const resp = await axios.post("http://localhost:3000/signin", {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });
    localStorage.setItem("token", resp.data.token);
    navigate("/txnslogic");
  }
  return (
    <div>
      <div className="   mt-44 flex items-center justify-center">
        <div className=" border-2 border-zinc-200 rounded-md p-10 space-y-3">
          <div className=" mb-4 space-y-6">
            <p className=" pb-5 text-center text-4xl font-bold">
              {isSignup ? "Sign Up" : "Sign in"}
            </p>
            <Input placeholder="username" reference={usernameRef} size="lg" />
            <Input placeholder="password" reference={passwordRef} size="lg" />
            <Button
              onClick={isSignup ? signup : signin}
              value={isSignup ? "Sign up" : "Sign in"}
              size="lg"
              variant="primary"
            />

            <p className=" text-center">Agree to out terms & condition</p>
            <Link to={isSignup ? "/signin" : "/"}>
              <p> {isSignup ? "signin" : "signup"} </p>
            </Link>
          </div>
        </div>
      </div>
      <p className=" text-center ">
        your public key - <b> {pubkey}</b>
      </p>
    </div>
  );
};

export default AuthComp;
