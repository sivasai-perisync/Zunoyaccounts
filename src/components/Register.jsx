

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SendOptiApi } from "../APIconfig/getAPIconfig";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [OtpSent, setOtpSent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [focused, setFocused] = useState(false);
  const [identifier, setIdentifier] = useState("");  // Local state for identifier
  const navigate = useNavigate();

  // Function to fetch the OTP
  const fetchInfo = () => {
    setLoader(true);
    const data = { email: email, otp: false };
    SendOptiApi(data, setLoader, setOtpSent, setError);

    // Store email in localStorage
    localStorage.setItem("email", email);
  };

  // Handle email input change and validation
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Validate email format
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(value.length > 1 && !isValid);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (value === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    const enteredOtp = Number(otp.join(""));

    if (enteredOtp.toString().length !== 6) {
      setOtpError(true);
      return;
    }

    setLoader(true);
    setOtpError(false);

    try {
      const response = await axios.put(
        "https://znginx.perisync.work/api/v1/acc/verifyOtp",
        { email: email, otp: enteredOtp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // Store the identifier in localStorage
        localStorage.setItem("identifier", response?.data?.identifier); // assuming the identifier is returned in the response
        navigate("/setuppassword");
      } else {
        setOtpError(true);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      setOtpError(true);
    } finally {
      setLoader(false);
    }
  };

  // You can get the identifier from localStorage wherever needed
  useEffect(() => {
    const savedIdentifier = localStorage.getItem("identifier");
    if (savedIdentifier) {
      setIdentifier(savedIdentifier);
    }

    // Retrieve email from localStorage
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {/* Left Column (optional) */}
        <div className="w-1/3 sm:hidden md:hidden lg:flex p-16 flex flex-col justify-center ">
          <header className=" pt-2 pl-4 absolute top-2 left-2">
            <img src="https://account.zunoy.com/logo.svg" alt="" />
          </header>

          <h2 className="text-xl font-semibold mt-6">
            Create your Zunoy account in three simple steps
          </h2>
          <div className="flex flex-col space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                1
              </div>
              <p className="font-semibold text-black">Email Verification</p>
            </div>

            <div className="border-l-2 border-gray-300 h-6 ml-3"></div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                2
              </div>
              <p className="text-gray-400">Setup Password</p>
            </div>

            <div className="border-l-2 border-gray-300 h-6 ml-3"></div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                3
              </div>
              <p className="text-gray-400">Complete your Profile</p>
            </div>
          </div>
          <p className="text-gray-600 mt-12 absolute bottom-2">
            <strong>Need assistance?</strong> <br /> Reach out to us at:
            support@zunoy.com
          </p>
        </div>

        {/* Right Column (Main Content) */}
        <div className="w-2/3  bg-white p-10 xl:px-80 sm:px-4 flex flex-col justify-center border-l sm:w-full md:w-full lg:w-2/3 ">
          <header className=" pt-2 pl-4 w-auto md:w-[1200px] absolute top-2 left-2 lg:hidden sm:block">
            <img src="https://account.zunoy.com/logo.svg" alt="" />
          </header>

          <h2 className="text-2xl font-bold">Register</h2>
          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <a href="#" className="text-blue-600">
              Log in
            </a>
          </p>

          <div className="mt-6">
          
 
    <TextField
      variant="filled"
      className="w-full"
      error={emailError}
      label="Email"
      value={email}
      onChange={handleEmailChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      helperText={
        email.length === 0
          ? "Email is required"
          : emailError
          ? "Please enter a valid email"
          : ""
      }
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
          <div className="mb-6"></div>
          {loader && <p>Loading Please wait</p>}

          {OtpSent && (
            <div className="mt-4">
              <div className="flex justify-center space-x-2 mt-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <div className="mt-6"></div>
              <Button
                onClick={verifyOtp}
                fullWidth
                className="mt-6 bg-green-600 text-white py-2 rounded-lg"
                variant="contained"
              >
                Verify OTP
              </Button>
            </div>
          )}

          {!OtpSent ? (
            <Button
              onClick={fetchInfo}
              fullWidth
              className="mt-6 bg-indigo-600 text-white py-2 rounded-lg"
              variant="contained"
            >
              Verify Email
            </Button>
          ) : null}

          <p className="text-sm text-gray-500 mt-8 mb-2 text-center absolute bottom-2 ">
            © 2025, Zunoy Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;


