import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./components/signin";
import Signup from "./components/signup";
import TxnsLogic from "./components/txnsLogic";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  });
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/txnslogic" element={<TxnsLogic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
