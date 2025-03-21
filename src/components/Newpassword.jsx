
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {  IconButton, InputAdornment } from "@mui/material";
import axios from "axios";

export default function Newpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showConfirmPassword1, setShowConfirmPassword1] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedIdentifier = localStorage.getItem("otpIdentifier"); // Retrieve identifier
  
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (!storedIdentifier) {
      setError("Session expired. Please restart the password reset process.");
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const identifier = localStorage.getItem("otpIdentifier"); // Use stored identifier

    if (!identifier) {
      setError("Session expired. Please restart the password reset process.");
      return;
    }

    try {
      const response = await axios.put(
        "https://znginx.perisync.work/api/v1/acc/setPassword",
        {
          email,
          identifier,
          password,
          device: "133.0.0.0",
          ipAddress: "106.51.219.124",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || (response.data && response.data.message.toLowerCase() === "password updated")) {
      
        localStorage.removeItem("otpIdentifier"); // Clear identifier after successful reset
        navigate("/");
      } else {
        setError("Failed to update password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
       <div className="w-full max-w-md p-6">
      <h2 className="text-2xl font-semibold text-left">Reset Password</h2>
      <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <a href="" className="text-blue-600">
              Log in
            </a>
          </p>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-sm">
        <div className="mb-4">
          <TextField label="Email" type="email" value={email} disabled fullWidth variant="filled"  onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            error={!!error}
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
            }} />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            type={showConfirmPassword ? "text" : "password"} 
            value={password}
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
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
            error={!!error}
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
        <div className="mb-4">
          <TextField
            label="Confirm Password"
            type={showConfirmPassword1 ? "text" : "password"} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            error={!!error}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          variant="filled"
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
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Password
        </Button>
      </form>
      <p className="text-gray-600 mt-12 ">
            <strong>Need assistance?</strong> <br /> Reach out to us at:
            support@zunoy.com
          </p>
        <p className="text-xs text-gray-400 text-center mt-6 absolute bottom-2">&copy; 2025, Zunoy Pvt. Ltd. All Rights Reserved.</p>
    </div></div>
  );
}

