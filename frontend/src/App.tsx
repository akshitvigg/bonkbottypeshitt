import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./components/signin";
import Signup from "./components/signup";
import TxnsLogic from "./components/txnsLogic";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import ProfileModal from "./components/profileModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  });
  return (
    <div>
      <ProfileModal onClose={() => setModalOpen(!modalOpen)} open={modalOpen} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/txnslogic"
            element={
              <TxnsLogic modalOpen={modalOpen} setModalOpen={setModalOpen} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
