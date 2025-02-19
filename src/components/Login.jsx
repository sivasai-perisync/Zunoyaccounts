import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const LoginPage = () => {
  
const navigate=useNavigate();
const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
 const [focused, setFocused] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(value)); 
  };


  return (
    <>
      <header className=" pt-2 pl-4  w-auto md:w-[1200px]">
        <img
          src="./public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png"
          alt=""
        />
      </header>
      <main className=" text-black w-full flex  xl:flex lg:flex md:flex sm:flex-wrap-reverse overflow-hidden ">
        <div className="w-[1200px]  pt-72 pl-44 pr-44 sm:pl-4 sm:pr-4 md:pl-4 md:pr-4  lg:pl-44 lg:pr-44 ">
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-gray-600 font-normal pt-3">
            Zunoy Accounts is a secure and efficient account management system
            designed to streamline user authentication, preferences, and access
            control. It offers seamless integration with various platforms,
            ensuring a smooth user experience with features like dark mode
            preferences, API-based authentication, and enhanced security
            protocols.
          </p>
          <h1 className="text-2xl font-bold pt-8">Featured Products</h1>
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
          <footer>
            <p className="text-center text-gray-500 pt-72 ">
              © 2025, Zunoy Pvt. Ltd. All Rights Reserved.
            </p>
          </footer>
        </div>
        <div className="w-[400px] pt-44 pl-20 lg:pt-44  lg:pl-20 md:pt-4  md:pl-4 sm:pt-4  sm:pl-4 sm:pr-4 border-l border-solid border-gray-400 xl:border-l xl:border-solid xl:border-gray-400 lg:border-l sm:border-none ">
          <h1 className="text-3xl font-bold">Log in</h1>
          <p className="text-gray-500 mb-8">
            Don't have an account?{" "}
            <button  className="text-blue-500" onClick={()=>navigate("/Register")}>
              {" "}
              Register
            </button>
          </p>
          <TextField 
            className="w-[100%] "
            error={emailError}
            id="filled-error-helper-text"
            label="Email Address"
            defaultValue=""
            
            onChange={handleEmailChange}
            helperText={emailError ? "Please enter a valid email" : "Email is required"}
             onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
            sx={{
              "& .MuiInputBase-root": {
                border: `2px solid ${focused ? "#1976D2" : "#F8F8F8"}`, // Black default, Blue on focus
              
                borderRadius: "4px",
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
           
          />{" "}
          <br />
          <br />
          <TextField
            className="w-[100%]"
            error
            id="filled-error-helper-text"
            label="Password"
            defaultValue=""
           
          />{" "}
          <br />
          <br />
          <div>
            {" "}
            <Button
              className="w-[100%] h-12 rounded-3xl text-xs"
              variant="contained"
            >
              Log in
            </Button>{" "}
          </div>
          <br />
    <a className=" text-blue-500" href="">Forgot Password?</a><br /><br />
<p className= "text-center text-gray-400   text-sm">Version 6.4.6
</p>
<p className=" text-center text-sm mt-2"><a className="text-blue-500 " href="">Terms and Conditions</a></p>
        </div>
      </main>
    </>
  );
}

export default LoginPage;

// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import InputAdornment from "@mui/material/InputAdornment";
// // import IconButton from "@mui/material/IconButton";
// // import Visibility from "@mui/icons-material/Visibility";
// // import VisibilityOff from "@mui/icons-material/VisibilityOff";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState(false);
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailError(false);
//   };

//   const handleBlur = () => {
//     setEmailError(email.trim() === "");
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (!email.trim()) {
//       setEmailError(true);
//     } else {
//       console.log("Logging in with:", { email, password });
//       // Add authentication logic
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white p-8 rounded-lg shadow-md flex">
        
//         {/* Left Section - Info & Products */}
//         <div className="w-1/2 hidden md:block">
//           <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
//           <p className="text-gray-500 mt-2">
//             Zunoy Accounts is a secure and efficient account management system designed 
//             to streamline user authentication, preferences, and access control.
//           </p>
//           <p className="text-gray-500 mt-1">
//             It offers seamless integration with various platforms and features like dark 
//             mode preferences, API-based authentication, and enhanced security protocols.
//           </p>

//           {/* Featured Products */}
//           <h2 className="mt-6 text-lg font-semibold">Featured Products</h2>
//           <div className="mt-3 flex space-x-3">
//             <div className="border rounded-lg p-2 px-4 flex items-center space-x-2 shadow-sm">
//               <span>📄</span>
//               <p className="font-medium">FormFlow</p>
//             </div>
//             <div className="border rounded-lg p-2 px-4 flex items-center space-x-2 shadow-sm">
//               <span>🔍</span>
//               <p className="font-medium">WatchTower</p>
//             </div>
//             <div className="border rounded-lg p-2 px-4 flex items-center space-x-2 shadow-sm">
//               <span>🌐</span>
//               <p className="font-medium">MockAPI</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Login Form */}
//         <div className="w-full md:w-1/2 text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
//           <p className="text-gray-500 mt-1">
//             Don’t have an account? <a href="#" className="text-blue-600">Register</a>
//           </p>

//           {/* Email Input */}
//           <div className="mt-6">
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email Address"
//               value={email}
//               onChange={handleEmailChange}
//               onBlur={handleBlur}
//               error={emailError}
//               helperText={emailError ? "Email is required" : ""}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   border: `2px solid ${emailError ? "red" : "black"}`,
//                   borderRadius: "6px",
//                   backgroundColor: "white",
//                   "&:hover": { border: "2px solid black" },
//                 },
//               }}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mt-4">
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={handlePasswordChange}
//               // InputProps={{
//               //   endAdornment: (
//               //     <InputAdornment position="end">
//               //       <IconButton onClick={() => setShowPassword(!showPassword)}>
//               //         {showPassword ? <VisibilityOff /> : <Visibility />}
//               //       </IconButton>
//               //     </InputAdornment>
//               //   ),
//               // }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   border: "2px solid black",
//                   borderRadius: "6px",
//                   backgroundColor: "white",
//                   "&:hover": { border: "2px solid black" },
//                 },
//               }}
//             />
//           </div>

//           {/* Log In Button */}
//           <div className="mt-6">
//             <Button
//               fullWidth
//               variant="contained"
//               className="w-full"
//               onClick={handleSubmit}
//               sx={{
//                 backgroundColor: "#6366F1",
//                 fontSize: "16px",
//                 textTransform: "none",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 "&:hover": { backgroundColor: "#4f46e5" },
//               }}
//             >
//               Log in
//             </Button>
//           </div>

//           {/* Forgot Password */}
//           <div className="mt-4">
//             <a href="#" className="text-blue-600">Forgot password?</a>
//           </div>

//           {/* Version & Terms */}
//           <div className="mt-6 text-sm text-gray-500">
//             <p>Version 6.4.8</p>
//             <a href="#" className="text-blue-600">Terms and Conditions</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

