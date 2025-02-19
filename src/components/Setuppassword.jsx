import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Setuppassword = () => {
  const [email, setEmail] = useState("al4wc@edny.net");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState(false);
  
const createaccount = () => {
    navigate("/Profile");
 
  };
const navigate = useNavigate();
// const [identifier, setIdentifier] = useState(""); 
// const createaccount = async () => {
//   if (password !== confirmPassword) {
//     setPasswordError(true);
//     return;
//   }

//   setPasswordError(false);
//   setLoading(true);
//   setErrorMessage("");
//   try {
//     const response = await axios.post(
//       "https://znginx.perisync.work/api/v1/acc/createUser",
//       { email, password,termsandcondition:true,policy:true,userIP:"106.51.221.186", identifier:identifier},
//       { headers: { "Content-Type": "application/json" } }
//     );

//     if (response?.data?.success) {
//       setIdentifier(data.identifier); 
//       navigate("/Profile", { state: { identifier: identifier } }); 
//     } else {
//       throw new Error(response?.data?.message || "Failed to create account");
//     }
//   } catch (error) {
//     console.error("Error creating account:", error.response?.data || error.message);
//     setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };
 
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/3 p-16 flex flex-col justify-center hidden lg:flex">
      <header className=" pt-2 pl-4   absolute top-2 left-2">
            <img
              src="./public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png"
              alt=""
            />
          </header> 
          <h2 className="text-xl font-semibold">Create your Zunoy account in three simple steps</h2>
          <div className="flex flex-col space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">✓</div>
            <p className="font-semibold text-black">Email Verification</p>
          </div>
          <div className="border-l-2 border-gray-300 h-6 ml-3"></div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">2</div>
            <p className="text-gray-600">Setup Password</p>
          </div>
          <div className="border-l-2 border-gray-300 h-6 ml-3"></div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">3</div>
            <p className="text-gray-400">Complete your Profile</p>
          </div>
        </div>
        <p className="text-gray-600 mt-12 absolute bottom-2">
          <strong>Need assistance?</strong> <br />
          Reach out to us at: <span className="text-indigo-500">support@zunoy.com</span>
        </p>
      </div>

      {/* Right Side */}
      <div className="w-2/3 bg-white p-10 xl:px-80 sm:px-4 flex flex-col justify-center border-l sm:w-full md:w-full lg:w-2/3">
      <header className=" pt-2 pl-4  w-auto md:w-[1200px] absolute top-2 left-2 lg:hidden sm:block">
            <img
              src="./public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png"
              alt=""
            />
          </header>
        <h2 className="text-2xl font-bold">Register</h2>
        <p className="text-sm text-gray-600 mt-2">
          Already have an account? <a href="#" className="text-blue-600">Log in</a>
        </p>

        {/* Email Field */}
        <div className="mt-6">
          <TextField
            fullWidth
            label="Email"
            value={email}
             variant="filled"
            disabled
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            sx={{
              backgroundColor:"white",
              "& .MuiInputBase-root": {
                border: `1px solid ${focused ? "white" : "white"}`, // Black default, Blue on focus
              borderRadius: "8px",
                backgroundColor: "white",
              },
            
              "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                display: "none", // Removes bottom border
                backgroundColor: "none",
              },
            }}
          />
        </div>

        {/* Password Field */}
        <div className="mt-4 relative">
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            sx={{
              "& .MuiInputBase-root": {
                border: `2px solid ${focused ? "#1976D2" : "#F8F8F8"}`, // Black default, Blue on focus
              
                borderRadius: "8px",
                backgroundColor: "white",
              },
              "& .MuiInputBase-root:hover": {
                border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`, 
               backgroundColor:"#F8F8F8", // Keep border black on hover
              },
              "& .MuiInputBase-root.Mui-focused": {
                border: "3px solid #1976D2", // Blue border on focus
                backgroundColor:"white"
              },
              "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                display: "none", // Removes bottom border
              },
            }}
          />
          {/* <IconButton
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton> */}
        </div>

        {/* Confirm Password Field */}
        <div className="mt-4 relative">
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label="Password (Confirm)"
           variant="filled"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            sx={{
              "& .MuiInputBase-root": {
                border: `2px solid ${focused ? "#1976D2" : "#F8F8F8"}`, // Black default, Blue on focus
              
                borderRadius: "8px",
                backgroundColor: "white",
              },
              "& .MuiInputBase-root:hover": {
                border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`, 
               backgroundColor:"#F8F8F8", // Keep border black on hover
              },
              "& .MuiInputBase-root.Mui-focused": {
                border: "3px solid #1976D2", // Blue border on focus
                backgroundColor:"white"
              },
              "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                display: "none", // Removes bottom border
              },
            }}
          />
          {/* <IconButton
            className="absolute right-2 top-2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton> */}
        </div>

        {/* Terms and Conditions */}
        <div className="mt-4 flex items-center">
          <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          <p className="text-gray-600">
            I have read the <a href="#" className="text-blue-600">Terms and Conditions</a>
          </p>
        </div>

        {/* Submit Button */}
        <Button onClick={createaccount}
          className="mt-6 h-12 w-full bg-indigo-600 text-white py-2 rounded-lg"
          variant="contained"
          disabled={!checked || !password || !confirmPassword}
        >
          Create Account
        </Button>

        <p className="text-sm text-gray-500 mt-8 text-center absolute bottom-2">
          © 2025, Zunoy Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Setuppassword;
