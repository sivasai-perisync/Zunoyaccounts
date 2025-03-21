

import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { SendOptiApi } from "../APIconfig/getAPIconfig";

const Resetpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef([]);
  const [loading, setLoading] = useState(false);
   const [focused, setFocused] = useState(false);
     const [resendTimer, setResendTimer] = useState(10);
     const [isResendDisabled, setIsResendDisabled] = useState(true);
     const [loader, setLoader] = useState(false);
      const [error, setError] = useState(false);

  const handleSendOtp = async () => {
    if (email) {
      setLoading(true);
      try {
        const response = await axios.put("https://znginx.perisync.work/api/v1/acc/forgotPassword", { email });


      if (response.data && response.data.identifier) {
        localStorage.setItem("otpIdentifier", response.data.identifier); // Store identifier
      }

        localStorage.setItem("email", email);
        setOtpSent(true);
      } catch (error) {
        console.error("Error sending OTP", error);
      }
      setLoading(false);
    }
  };

  
  const handleOtpChange = (index, event) => {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  const handleVerifyOtp = async () => {
    const otpValue = Number(otp.join(""));
    if (otpValue.toString().length === 6) {
      setLoading(true);
      try {
        const response = await axios.put("https://znginx.perisync.work/api/v1/acc/verifyOtp", {
          email,
          otp: otpValue
        });
  
        if (response.status === 200 && response.data) {
          const { identifier, message } = response.data;
  
          if (identifier) {
            localStorage.setItem("otpIdentifier", identifier); // Store identifier
            setOtpVerified(true);
            setOtpError(false);
            setTimeout(() => navigate("/Newpassword"), 1000);
          } else {
            setOtpError(true);
            console.error("Identifier missing in API response:", response.data);
          }
        } else {
          setOtpError(true);
        }
      } catch (error) {
        console.error("Error verifying OTP", error.response ? error.response.data : error.message);
        setOtpError(true);
      }
      setLoading(false);
    } else {
      setOtpError(true);
    }
  };
  
   useEffect(() => {
      localStorage.removeItem("email"); // Clear email on page refresh
    }, []);
  
    
   const resendOtp = async () => {
      setLoader(true);
      try {
        await SendOptiApi(
          { email: email, otp: false },
          setLoader,
          setOtpSent,
          setError
        );
      } catch (error) {
        console.error("Error resending OTP:", error);
      } finally {
        setLoader(false);
      }
    };
  
    useEffect(() => {
      let timer;
      if (otpSent && isResendDisabled) {
        timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsResendDisabled(false);
              return prev - 1;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [otpSent, isResendDisabled]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-left">Reset Password</h2>
        <p className="text-sm text-gray-600 mt-2">
        Go back to Login Page?{" "}
            <a href="" className="text-blue-600">
              Log in
            </a>
          </p>
        {!otpSent ? (
          <>
          <div className="mt-4"></div>
            <TextField
              variant="filled"
              className="w-full mt-4"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
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
            <button
              className="mt-4 w-full h-12 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "..." : "Verify email"}
            </button>
          </>
        ) : (
          <>
            <p className="mt-4 text-lg text-gray-800">{email}</p>
            <div className="flex justify-between mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  className="w-12 h-12 text-center text-lg border rounded-lg"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>
            {otpError && <p className="text-red-500 text-sm mt-2">Invalid OTP, try again.</p>}
            <div className="mt-2"></div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500">
                  {" "}
                  {resendTimer > 0
                    ? `Resend OTP available in ${resendTimer}s`
                    : "Didn't receive OTP?"}
                </span>
                <button
                  onClick={resendOtp}
                  className={`ml-2 text-blue-600 font-semibold ${
                    isResendDisabled ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={isResendDisabled}
                >
               
                 Resend OTP
              
                
                </button>
              </div>
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
          <p className="text-gray-600 mt-12 ">
            <strong>Need assistance?</strong> <br /> Reach out to us at:
            support@zunoy.com
          </p>
        <p className="text-xs text-gray-400 text-center mt-6 absolute bottom-2">&copy; 2025, Zunoy Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Resetpassword;
