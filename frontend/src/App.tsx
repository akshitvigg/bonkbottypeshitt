import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./components/signin";
import Signup from "./components/signup";
import TxnsLogic from "./components/txnsLogic";

function App() {
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
