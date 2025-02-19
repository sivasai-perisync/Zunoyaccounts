/*eslint-disable */
import { AccountsRootUrl, ProjectId } from "./ConstantRootURL/RootUrl";
import { toast } from "react-hot-toast";
import { putAPICall } from "./axiosMethodCalls";
import { useNavigate } from "react-router-dom";

export const ResetPasswordApi = (data, { setloader, setStatus }) => {
  return (dispatch) => {
    putAPICall(`${AccountsRootUrl}/forgotPassword`, data)
      .then((res) => {
        setStatus("otp sent");
        if (res?.data?.msg === "otp sent") {
          // GlobalToaster(5, "success");
        } else {
          toast.success(res?.data?.msg);
        }
        setloader(false);
      })
      .catch((err) => {
        dispatch({ type: "USER_VERIFICATION_FAILED", payload: err });
        setloader(false);
        toast.error(
          err?.response?.data?.msg ||
          "Unable to update. Please try again later."
        );
      });
  };
};

// export const VerifyOtpAndNavigate = (otp, sentOtp, navigate) => {
//   return (dispatch) => {
//     if (otp === sentOtp) {
//       toast.success("OTP verified successfully");
//       navigate("/setuppassword");
//     } else {
//       toast.error("Invalid OTP. Please try again.");
//     }
//   };
// };
// export const verifyOtp = async () => {
//   const enteredOtp = otp.join(""); // Join OTP digits into a string

//   if (enteredOtp.length < 6) {
//     setOtpError(true);
//     return;
//   }

//   setLoader(true);
//   setOtpError(false);

//   try {
//     const response = await axios.put("https://znginx.perisync.work/api/v1/acc", {
//       email: email,
//       otp: enteredOtp,
//     });

//     if (response.status === 200) {
//       navigate("/setuppassword"); // Navigate if OTP is correct
//     } else {
//       setOtpError(true);
//     }
//   } catch (error) {
//     setOtpError(true);
//   } finally {
//     setLoader(false);
//   }
// };
