import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";

const Profile = () => {
  const storedEmail = localStorage.getItem("email") || "";
  const [formData, setFormData] = useState({
    country: "India",
    email: storedEmail,
    firstName: "",
    knowAboutUs: "",
    lastName: "",
    phoneNo: "",
  });
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyDomain: "",
    teamSize: "",
  });
  const [knowAboutUsOptions, setKnowAboutUsOptions] = useState([]);
  const [accountType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const options = ["Google", "Banner", "Referral", "Social_Media"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const requestData = { ...formData, accountType };

    try {
      const response = await axios.post(
        "https://znginx.perisync.work/api/v1/acc/register",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201 && response.data.msg === "register success") {
        console.log("Registration successful:", response.data);

        navigate("/"); // Redirect to login page
      } else {
        throw new Error(response.data.msg || "Profile creation failed");
      }
    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response?.data || error.message
      );
      setErrorMessage(
        error.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchKnowAboutUsOptions = async () => {
      try {
        const response = await axios.get(
          "https://znginx.perisync.work/api/v1/acc/knowAboutUs"
        );
        setKnowAboutUsOptions(response.data.options || []);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchKnowAboutUsOptions();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-16 flex flex-col justify-center hidden lg:flex">
        <header className="pt-2 pl-4 absolute top-2 left-2">
          <img src="https://account.zunoy.com/logo.svg" alt="" />
        </header>
        <h2 className="text-xl font-semibold">
          Create your Zunoy account in three simple steps
        </h2>
        <div className="flex flex-col space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
              ✓
            </div>
            <p className="font-semibold text-black">Email Verification</p>
          </div>
          <div className="border-l-2 border-gray-300 h-6 ml-3"></div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
              2
            </div>
            <p className="text-gray-600">Setup Password</p>
          </div>
          <div className="border-l-2 border-gray-300 h-6 ml-3"></div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
              3
            </div>
            <p className="text-gray-400">Complete your Profile</p>
          </div>
        </div>
        <p className="text-gray-600 mt-12 absolute bottom-2">
          <strong>Need assistance?</strong> <br />
          Reach out to us at:{" "}
          <span className="text-indigo-500">support@zunoy.com</span>
        </p>
      </div>
      <div className="flex h-screen">
        <div className="w-2/3 bg-white p-10 xl:px-80 sm:px-4 flex flex-col justify-center border-l sm:w-full">
          <header className="pt-2 pl-4 w-auto md:w-[1200px] absolute top-2 left-2 lg:hidden sm:block">
            <img src="https://account.zunoy.com/logo.svg" alt="" />
          </header>
          <h2 className="text-2xl font-bold text-center mb-4">
            Complete Your Registration
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              fullWidth
              required
              disabled
              variant="filled"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              sx={{
                backgroundColor: "white",
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
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              variant="filled"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              sx={{
                "& .MuiInputBase-root": {
                  border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "& .MuiInputBase-root:hover": {
                  border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                  backgroundColor: "#F8F8F8", // Keep border black on hover
                },
                "& .MuiInputBase-root.Mui-focused": {
                  border: "3px solid #1976D2", // Blue border on focus
                  backgroundColor: "white",
                },
                "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                  display: "none", // Removes bottom border
                },
              }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              variant="filled"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              sx={{
                "& .MuiInputBase-root": {
                  border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "& .MuiInputBase-root:hover": {
                  border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                  backgroundColor: "#F8F8F8", // Keep border black on hover
                },
                "& .MuiInputBase-root.Mui-focused": {
                  border: "3px solid #1976D2", // Blue border on focus
                  backgroundColor: "white",
                },
                "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                  display: "none", // Removes bottom border
                },
              }}
            />
            <TextField
              label="Phone No"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              fullWidth
              required
              variant="filled"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              sx={{
                "& .MuiInputBase-root": {
                  border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "& .MuiInputBase-root:hover": {
                  border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                  backgroundColor: "#F8F8F8", // Keep border black on hover
                },
                "& .MuiInputBase-root.Mui-focused": {
                  border: "3px solid #1976D2", // Blue border on focus
                  backgroundColor: "white",
                },
                "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                  display: "none", // Removes bottom border
                },
              }}
            />

            <TextField
              select
              label="Where did you learn about us?"
              name="knowAboutUs"
              value={formData.knowAboutUs}
              onChange={handleChange}
              fullWidth
              variant="filled"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              sx={{
                "& .MuiInputBase-root": {
                  border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "& .MuiInputBase-root:hover": {
                  border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                  backgroundColor: "#F8F8F8", // Keep border black on hover
                },
                "& .MuiInputBase-root.Mui-focused": {
                  border: "3px solid #1976D2", // Blue border on focus
                  backgroundColor: "white",
                },
                "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                  display: "none", // Removes bottom border
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <RadioGroup
              row
              value={accountType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <FormControlLabel
                value="Organization"
                control={<Radio />}
                label="Organization"
              />
              <FormControlLabel
                value="Freelancer"
                control={<Radio />}
                label="Freelancer"
              />
            </RadioGroup>

            {accountType === "Organization" && (
              <div className="mt-4 space-y-2">
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={companyDetails.companyName}
                  onChange={handleCompanyChange}
                  fullWidth
                  required
                  variant="filled"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  sx={{
                    "& .MuiInputBase-root": {
                      border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                      borderRadius: "8px",
                      backgroundColor: "white",
                    },
                    "& .MuiInputBase-root:hover": {
                      border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                      backgroundColor: "#F8F8F8", // Keep border black on hover
                    },
                    "& .MuiInputBase-root.Mui-focused": {
                      border: "3px solid #1976D2", // Blue border on focus
                      backgroundColor: "white",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                      {
                        display: "none", // Removes bottom border
                      },
                  }}
                />
                <TextField
                  label="Company Domain"
                  name="companyDomain"
                  value={companyDetails.companyDomain}
                  onChange={handleCompanyChange}
                  fullWidth
                  required
                  variant="filled"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  sx={{
                    "& .MuiInputBase-root": {
                      border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                      borderRadius: "8px",
                      backgroundColor: "white",
                    },
                    "& .MuiInputBase-root:hover": {
                      border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                      backgroundColor: "#F8F8F8", // Keep border black on hover
                    },
                    "& .MuiInputBase-root.Mui-focused": {
                      border: "3px solid #1976D2", // Blue border on focus
                      backgroundColor: "white",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                      {
                        display: "none", // Removes bottom border
                      },
                  }}
                />
                <TextField
                  select
                  label="Team Size"
                  name="teamSize"
                  value={companyDetails.teamSize}
                  onChange={handleCompanyChange}
                  fullWidth
                  required
                  variant="filled"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  sx={{
                    "& .MuiInputBase-root": {
                      border: `2px solid ${focused ? "#F8F8F8" : "#F8F8F8"}`, // Black default, Blue on focus
                      borderRadius: "8px",
                      backgroundColor: "white",
                    },
                    "& .MuiInputBase-root:hover": {
                      border: `1px solid ${focused ? "#1976D2" : "#BEBEBE"}`,
                      backgroundColor: "#F8F8F8", // Keep border black on hover
                    },
                    "& .MuiInputBase-root.Mui-focused": {
                      border: "3px solid #1976D2", // Blue border on focus
                      backgroundColor: "white",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                      {
                        display: "none", // Removes bottom border
                      },
                  }}
                >
                  {["1-10", "11-50", "51-200", "201+"].map((size, index) => (
                    <MenuItem key={index} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
