interface AuthCompProps {
  isSignup: boolean;
}

const AuthComp = ({ isSignup }: AuthCompProps) => {
  return (
    <div className=" bg-blue-950">
      {isSignup ? "hello this is signup" : "hello this is signin"}
    </div>
  );
};

export default AuthComp;
