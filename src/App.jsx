import { useState } from "react";
import "./App.css";
import Loginpage from "./components/Login";
import { Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/Register";
import Setuppassword from "./components/Setuppassword";
import Profile from "./components/Profile";
import Mainpage from "./components/Mainpage";
import Resetpassword from "./components/Resetpassword";
import Newpassword from "./components/Newpassword";
import { Toaster } from "react-hot-toast";
import Accounts from "./components/Accounts";
import Productspage from "./components/Productspage";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Loginpage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/Setuppassword" element={<Setuppassword />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Mainpage" element={<Mainpage />}></Route>
        <Route path="/Resetpassword" element={<Resetpassword />}></Route>
        <Route path="/Newpassword" element={<Newpassword />}></Route>
        <Route path="/Accounts" element={<Accounts />}></Route>
        <Route path="/Productspage" element={<Productspage />}></Route>
      </Routes>
    </>
  );
}

export default App;
