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
  const [image, setImage] = useState<string | undefined>(
    "f2a1b136-f35d-43ff-a83b-f3423d548b73"
  );
  const [username, setUsername] = useState("");
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  });
  return (
    <div>
      <ProfileModal username={username} image={image} open={modalOpen} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/txnslogic"
            element={
              <TxnsLogic
                setImage={setImage}
                image={image}
                onClose={() => {
                  setModalOpen(!modalOpen);
                }}
                setUsername={setUsername}
                username={username}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
