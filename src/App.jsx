import { useState } from "react";
import "./App.css";
import Loginpage from "./components/Login";
import { Router ,Routes,Route} from "react-router-dom";
import RegisterPage from "./components/Register";
import Setuppassword from "./components/Setuppassword";
import Profile from "./components/Profile";
import Mainpage from "./components/Mainpage";


function App() {

  return (
    <>
    
  <Routes>
    <Route path="/" element={<Loginpage/>}></Route>
    <Route path="/register" element={<RegisterPage/>}></Route>
    <Route path="/Setuppassword" element={<Setuppassword/>}></Route>
    <Route path="/Profile" element={<Profile/>}></Route>
    <Route path="/Mainpage" element={<Mainpage/>}></Route>
  </Routes>
   
    </>
  );
}

export default App;
