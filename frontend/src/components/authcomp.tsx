import { useRef, useState } from "react";
import Button from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./ui/loader";

interface AuthCompProps {
  isSignup: boolean;
}

const AuthComp = ({ isSignup }: AuthCompProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<Boolean>(false);
  const [pubkey, setpubKey] = useState("");
  const [beMsg, setbeMsg] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      setError(true);
      return;
    }
    setError(false);
    setbeMsg("");
    try {
      setLoading(true);
      const resp = await axios.post("http://localhost:3000/signup", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      if (resp.data.publicKey) {
        setpubKey(resp.data.publicKey);
        navigate("/signin");
      } else {
        setbeMsg(resp.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function signin() {
    const username = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      setError(true);
      return;
    }
    setError(false);

    try {
      setLoading(true);

      const resp = await axios.post("http://localhost:3000/signin", {
        username,
        password,
      });
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
        navigate("/txnslogic");
      }
      setbeMsg(resp.data.message);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-aos="fade-up" data-aos-duration="10000">
      <div className="  [font-family:var(--font-handwriting)]  mt-44 flex items-center justify-center">
        <div className=" border-2 border-zinc-200 rounded-3xl p-10 space-y-3">
          <p className="  text-center text-4xl font-bold">
            {isSignup ? "Sign Up" : "Sign in"}
          </p>
          <div className=" mb-4 space-y-6">
            <p className=" text-zinc-500 pb-5 text-center text-lg ">
              {isSignup
                ? "Create a new account to get started"
                : "Enter your credentials to continue"}
            </p>
            <div>
              <Input placeholder="username" reference={usernameRef} size="lg" />
              {error && (
                <p className="  text-red-500">username cannot be empty</p>
              )}
            </div>
            <div>
              <Input placeholder="password" reference={passwordRef} size="lg" />
              {error && (
                <p className="text-red-500">password cannot be empty</p>
              )}
            </div>
            <Button
              onClick={isSignup ? signup : signin}
              value={
                isSignup ? (
                  <div>{loading ? <Loader color="white" /> : "Sign up"}</div>
                ) : (
                  <div>{loading ? <Loader color="white" /> : "Sign in"}</div>
                )
              }
              size="lg"
              variant="primary"
            />
            {beMsg && (
              <p className="text-red-500 text-center text-sm">{beMsg}</p>
            )}

            <p className=" text-center">
              {isSignup ? (
                <div>
                  <span className=" text-zinc-600">
                    Already have an account?
                  </span>{" "}
                  <a className=" hover:underline" href="/signin">
                    Sign in
                  </a>
                </div>
              ) : (
                <div>
                  <span className=" text-zinc-600">Dont have an account?</span>{" "}
                  <a className=" hover:underline" href="/">
                    Sign up
                  </a>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComp;
