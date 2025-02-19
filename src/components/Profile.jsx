// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import { TextField, MenuItem, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";

// const Profile = () => {
//     const [userType, setUserType] = useState("");
//        const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [source, setSource] = useState("");

//   const [formData, setFormData] = useState({
//     email: 'honnoky319@juanzs.com',
//     firstName: '',
//     lastName: '',
//     country: 'India',
//     mobileNumber: '',
//     learnAboutUs: '',
//     organization: '',
//     freelancer: false,
//   });

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: type === 'checkbox' ? checked : value,
//   //   });
//   // };
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//   };
//   const handleChange = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await axios.post(
//         "https://your-api-endpoint.com/api/v1/profile/create", // Replace with actual API URL
//         { ...formData, userType },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.data.success) {
//         navigate("/login"); // Navigate to login page on success
//       } else {
//         throw new Error(response.data.message || "Profile creation failed");
//       }
//     } catch (error) {
//       console.error("Error creating profile:", error.response?.data || error.message);
//       setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//     <div className="w-1/3 sm:hidden md:hidden lg:flex p-16 flex flex-col justify-center ">
//       <header className=" pt-2 pl-4   absolute top-2 left-2">
//         <img
//           src="./public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png"
//           alt=""
//         />
//       </header>

//       <h2 className="text-xl font-semibold mt-6">
//         Create your Zunoy account in three simple steps
//       </h2>
//       <div className="flex flex-col space-y-4 pt-4">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
//             1
//           </div>
//           <p className="font-semibold text-black">Email Verification</p>
//         </div>

//         <div className="border-l-2 border-gray-300 h-6 ml-3"></div>

//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
//             2
//           </div>
//           <p className="text-gray-400">Setup Password</p>
//         </div>

//         <div className="border-l-2 border-gray-300 h-6 ml-3"></div>

//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
//             3
//           </div>
//           <p className="text-gray-400">Complete your Profile</p>
//         </div>
//       </div>
//       <p className="text-gray-600 mt-12 absolute bottom-2">
//         <strong>Need assistance?</strong> <br /> Reach out to us at:
//         support@zunoy.com
//       </p>
//     </div>

//     <div className="w-2/3 bg-white p-10  xl:px-80 sm:px-4  flex flex-col justify-center border-l sm:w-full md:w-full lg:w-2/3 ">
//       <header className=" pt-2 pl-4  w-auto md:w-[1200px] absolute top-2 left-2 lg:hidden sm:block">
//         <img
//           src="./public/Screenshot 2025-02-14 at 10-26-43 Login Zunoy Accounts.png"
//           alt=""
//         />
//       </header>
    
//       <h2 className="text-2xl font-bold text-center mb-4">Complete Your Registration</h2>
//       <p className="text-center mb-6">
//         Already have an account? <a href="/login" className="text-blue-500">Log in</a>
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Country</label>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           >
//             <option value="India">India</option>
//             {/* Add more countries as needed */}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Mobile Number</label>
//           <input
//             type="tel"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Where did you learn about us?</label>
//           <input
//             type="text"
//             name="learnAboutUs"
//             value={formData.learnAboutUs}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>

//         <RadioGroup row className="mt-4" value={userType} onChange={(e) => setUserType(e.target.value)}>
//           <FormControlLabel value="Organization" control={<Radio />} label="Organization" />
//           <FormControlLabel value="Freelancer" control={<Radio />} label="Freelancer" />
//         </RadioGroup>
        
//         <div className="flex justify-between mt-6">
//           <Button variant="outlined" color="primary">Cancel</Button>
//           <Button variant="contained" color="primary" onClick={handleSubmit} >
//             Submit
//           </Button>
//         </div>
//       </form>

//       <p className="text-sm text-gray-500 mt-8 text-center absolute bottom-2">
//           © 2025, Zunoy Pvt. Ltd. All Rights Reserved.
//         </p>
    
// </div>
//   </div>
//   );
// };


// export default Profile;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, MenuItem, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";

const Profile = () => {
  const [formData, setFormData] = useState({
    country	: "India",
    email	: "honnoky319@juanzs.com",
    firstName: "",
    knowAboutUs	: "",
    lastName	: "",
    phoneNo	: "",
    
   
  });

  const [accountType	, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMessage("");

  //   try {
  //     const response = await axios.post(
  //       "	https://api.zunoy.com/api/v1/acc/register", // Replace with actual API URL
  //       { ...formData, userType },
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     if (response.data.success) {
  //       navigate("/login"); // Navigate to login page on success
  //     } else {
  //       throw new Error(response.data.message || "Profile creation failed");
  //     }
  //   } catch (error) {
  //     console.error("Error creating profile:", error.response?.data || error.message);
  //     setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMessage("");
  
  //   // Debug: Log the request payload
  //   console.log("Submitting data:", JSON.stringify({ ...formData, userType }));
  
  //   try {
  //     const response = await axios.post(
  //       "https://api.zunoy.com/api/v1/acc/register", 
  //       { ...formData, userType },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  
  //     console.log("Response:", response.data); // Debugging API response
  
  //     if (response.data.success) {
  //       navigate("/login"); // Navigate to login page on success
  //     } else {
  //       throw new Error(response.data.message || "Profile creation failed");
  //     }
  //   } catch (error) {
  //     console.error("Error creating profile:", error.response?.data || error.message);
      
  //     // Debug: Check API error response
  //     if (error.response?.data) {
  //       console.log("API Error Response:", error.response.data);
  //     }
  
  //     setErrorMessage(
  //       error.response?.data?.message || "Something went wrong. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
  
    // 🔍 Debug: Log the request payload before sending
    const requestData = { ...formData, accountType	 };
    console.log("Submitting data:", JSON.stringify(requestData, null, 2));
  
    try {
      const response = await axios.post(
        "https://api.zunoy.com/api/v1/acc/register", 
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("✅ Response:", response.data); // Log API response
  
      if (response.data.success) {
        navigate("/login"); // Redirect to login on success
      } else {
        throw new Error(response.data.message || "Profile creation failed");
      }
    } catch (error) {
      console.error("❌ Error creating profile:", error.response?.data || error.message);
  
      // 🔍 Debug: Log the actual API error response
      if (error.response?.data) {
        console.log("API Error Response:", JSON.stringify(error.response.data, null, 2));
      }
  
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-white p-10 xl:px-80 sm:px-4 flex flex-col justify-center border-l sm:w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Complete Your Registration</h2>
        <p className="text-center mb-6">
          Already have an account? <a href="/login" className="text-blue-500">Log in</a>
        </p>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField label="Email" name="email"   value={formData.email || ""} onChange={handleChange} fullWidth required />
          <TextField label="First Name" name="firstName"  value={formData.firstName || ""} onChange={handleChange} fullWidth required />
          <TextField label="Last Name" name="lastName" value={formData.lastName || ""} onChange={handleChange} fullWidth required />
          <TextField label="phoneNo" name="phoneNo" value={formData.phoneNo || ""} onChange={handleChange} fullWidth required />
          <TextField label="Where did you learn about us?" name="knowAboutUs" value={formData.knowAboutUs || ""} onChange={handleChange} fullWidth />
          
          <RadioGroup row value={accountType} onChange={(e) => setUserType(e.target.value)}>
            <FormControlLabel value="Organization" control={<Radio />} label="Organization" />
            <FormControlLabel value="Freelancer" control={<Radio />} label="Freelancer" />
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
