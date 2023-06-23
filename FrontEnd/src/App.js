import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import DiaryState from "./Context/notes/diaryState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState("");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <DiaryState alert={alert} showAlert={showAlert}>
        <Navbar />
        <Alert alert={alert} showAlert={showAlert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login className="container-Login" alert={alert} showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup className="signup-page" alert={alert} showAlert={showAlert} />} />
          </Routes>
        </div>
      </DiaryState >
    </>
  );
}


export default App;

