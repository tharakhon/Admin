import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Addminuser from "./user";
import Login from "./Login";
import Register from "./register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user" element={<Addminuser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
