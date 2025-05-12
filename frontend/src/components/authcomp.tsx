import { useRef, useState } from "react";
import Button from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./ui/loader";

interface AuthCompProps {
  isSignup: boolean;
}

const AuthComp = ({ isSignup }: AuthCompProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<Boolean>(false);
  const [pubkey, setpubKey] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  async function signup() {
    if (
      usernameRef.current?.value.trim() === "" ||
      passwordRef.current?.value.trim() === ""
    ) {
      setError(true);
    }

    if (
      usernameRef.current?.value.trim() != "" ||
      passwordRef.current?.value.trim() != ""
    ) {
      setError(false);
    }
    try {
      setLoading(true);
      const resp = await axios.post("http://localhost:3000/signup", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      setpubKey(resp.data.publicKey);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
    <div data-aos="fade-up" data-aos-duration="10000">
      <div className="  [font-family:var(--font-handwriting)]  mt-44 flex items-center justify-center">
        <div className=" border-2 border-zinc-200 rounded-md p-10 space-y-3">
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

            <p className=" text-center">
              {isSignup ? (
                <div>
                  <span className=" text-zinc-500">
                    Already have an account?
                  </span>{" "}
                  <a className=" hover:underline" href="/signin">
                    sign in
                  </a>
                </div>
              ) : (
                <div>
                  <span className=" text-zinc-500">Dont have an account?</span>
                  <a className=" hover:underline" href="/">
                    sign up
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
