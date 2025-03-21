
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AccountsRootUrl } from "../APIconfig/ConstantRootURL/RootUrl";
import {  IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const [focused, setFocused] = useState(false);
  
    const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(value));
  };

  const handleLogin = async () => {
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      const response = await fetch(`${AccountsRootUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceInfo: {
            platform: "web",
            os: "Linux x86_64",
            browser: "Chrome",
            device: "133.0.0.0",
            deviceName: "Linux x86_64",
            ipAddress: "106.51.219.124",
          },
          email,
          password,
          killSession: false,
          otp: 0,
        }),
      });

  

  const token = response.headers.get("at");
      if (response.ok && token) {
        localStorage.setItem("at", token);
        await fetchDarkModePreference(token);
        await fetchProducts(token);
        navigate("/Mainpage");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };
  const fetchDarkModePreference = async (token) => {
    try {
      const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/darkMode", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("darkMode", JSON.stringify(data.darkMode));
      }
    } catch (error) {
      console.error("Failed to fetch dark mode preference", error);
    }
  };
  const fetchProducts = async (token) => {
    try {
      const response = await fetch("https://znginx.perisync.work/api/v1/acc/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const products = await response.json();
        localStorage.setItem("products", JSON.stringify(products)); // Store products if needed
        console.log("Fetched products:", products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div className="flex h-screen w-full">
      {/* Left Column */}
      <div className="w-2/3 hidden lg:flex flex-col justify-center  p-16 max-w-4xl mx-auto">
        <header className="absolute top-2 left-2">
          <img src="/public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png" alt="Logo" />
        </header>
        <p className="text-3xl font-bold mt-6 text-start max-w-lg">Accounts</p>
        <p className="text-gray-600 font-normal pt-3  max-w-3xl">
          Zunoy Accounts is a secure and efficient account management system
          designed to streamline user authentication, preferences, and access
          control. It offers seamless integration with various platforms,
          ensuring a smooth user experience with features like dark mode
          preferences, API-based authentication, and enhanced security
          protocols.
        </p>
        <div className="text-2xl font-bold pt-8  ">
          Featured Products
        </div>
        <div className="flex flex-wrap gap-10 pt-3">
          <img
            src="./public/Screenshot 2025-02-14 at 10-26-52 Login Zunoy Accounts.png"
            alt=""
          />
          <img
            src="./public/Screenshot 2025-02-14 at 10-26-59 Login Zunoy Accounts.png"
            alt=""
          />
          <img
            src="./public/Screenshot 2025-02-14 at 10-27-04 Login Zunoy Accounts.png"
            alt=""
          />
        </div>

        <div className="text-gray-600 mt-12 absolute bottom-2 left-1/4">
          © 2025, Zunoy Pvt. Ltd. All Rights Reserved.
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/3 bg-white p-10 flex flex-col justify-center  border-l max-w-md mx-auto sm:w-full lg:w-1/3 sm:border-l-0 lg:border-l sm:p-4 lg:p-10">
        <header className="absolute top-2 left-2 lg:hidden">
          <img src="/public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png" alt="Logo" />
        </header>
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
        <p className="text-gray-500 mb-8">
          Don't have an account? 
          <button
            className="text-blue-500"
            onClick={() => navigate("/Register")}
          >
            {" "}
             Register
          </button>
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <TextField
          className="w-full"
          error={emailError}
          label="Email Address"
          variant="filled"
          onChange={handleEmailChange}
          helperText={emailError ? "Please enter a valid email" : ""}
          sx={{
            "& .MuiInputBase-root": {
              border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`,
              borderRadius: "8px",
              backgroundColor: "white",
            },
            "& .MuiInputBase-root:hover": {
              border: `1px solid ${focused ? "#BEBEBE" : "#BEBEBE"}`,
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
        <br />
        <TextField
      className="w-full"
      error={passwordError}
      label="Password"
      type={showPassword ? "text" : "password"}
      variant="filled"
      onChange={(e) => setPassword(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      helperText={passwordError ? "Password is required" : ""}
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
        <br />
        <Button
          className="w-full h-12 rounded-3xl text-xs"
          variant="contained"
          onClick={handleLogin}
        >
          Log in
        </Button>
        <br />
        <button className="text-blue-500 text-left" onClick={() => navigate("/ResetPassword")}>
          Forgot Password?
        </button >
        <p className= "text-center text-gray-400  pt-4 text-sm">Version 6.4.6
</p>
<p className=" text-center text-sm mt-2"><a className="text-blue-500 " href="">Terms and Conditions</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
