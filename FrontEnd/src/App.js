import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import DiaryState from "./Context/notes/diaryState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <DiaryState>
        <Navbar />
        <Alert message="This is Alert Component"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </DiaryState>
    </>
  );
}

export default App;
