
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {  IconButton, InputAdornment } from "@mui/material";

const Setuppassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPassword1, setShowConfirmPassword1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState(false);
  

  // Retrieve email and identifier from localStorage
  const emailFromStorage = localStorage.getItem("email");
  const identifier = localStorage.getItem("identifier");

  // Set the email from localStorage into state
  useEffect(() => {
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    }
  }, [emailFromStorage]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!identifier) {
      // If no identifier in localStorage, redirect to Register page
      navigate("/register");
    }
  }, [identifier, navigate]);

  const createAccount = () => {
    setLoading(true);

    // Your API call to create the account, send email, password, and identifier
    axios
      .post("https://znginx.perisync.work/api/v1/acc/createUser", {
        email: email,
        identifier: identifier,
        password: password,
        policy: true,
        termsandcondition: true,
        userIP: "106.51.221.186"
      })
      .then((response) => {
        // On success, navigate to Profile page
        navigate("/profile");
      })
      .catch((error) => {
        // Handle error
        setErrorMessage("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-16 flex flex-col justify-center hidden lg:flex">
        <header className="pt-2 pl-4 absolute top-2 left-2">
          <img src="/public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png" alt="" />
        </header>
        <h2 className="text-xl font-semibold">
          Create your Zunoy account in three simple steps
        </h2>
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

      <div className="w-2/3 bg-white p-10 xl:px-80 sm:px-4 flex flex-col justify-center border-l sm:w-full md:w-full lg:w-2/3">
        <header className="pt-2 pl-4 w-auto md:w-[1200px] absolute top-2 left-2 lg:hidden sm:block">
          <img src="/public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png" alt="" />
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
            type={showConfirmPassword1 ? "text" : "password"}
            label="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword1(!showConfirmPassword1)} edge="end">
                    {showConfirmPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
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
        </div>

        {/* Confirm Password Field */}
        <div className="mt-4 relative">
        <TextField
  fullWidth
  type={showConfirmPassword ? "text" : "password"}
  label="Confirm Password"
  variant="filled"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiInputBase-root": {
      border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`,
      borderRadius: "8px",
      backgroundColor: "white",
    },
    "& .MuiInputBase-root:hover": {
      border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
      backgroundColor: "#F8F8F8",
    },
    "& .MuiInputBase-root.Mui-focused": {
      border: "3px solid #1976D2",
      backgroundColor: "white",
    },
    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
      display: "none",
    },
  }}
/>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-4 flex items-center">
          <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          <p className="text-gray-600">
            I have read the <a href="#" className="text-blue-600">Terms and Conditions</a>
          </p>
        </div>

        {/* Submit Button */}
        <Button onClick={createAccount}
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
