/* eslint-disable */
// import { toast } from "react-hot-toast";
import { getAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";

// export const GetSessionsApi = (
//   PageData,
//   searchValue,
//   { setloader, setTotalRows }
// ) => {
//   return (dispatch) => {
//     const options = {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("at"),
//       },
//     };
//     getAPICall(
//       `${AccountsRootUrl}/account/session?page=${PageData?.page + 1}&size=${PageData?.pageSize}&search=${searchValue}`,
//       options
//     )
//       .then((res) => {
//         setTotalRows(res?.data?.total);
//         // dispatch(GetSessionsSuccess(res));
//         setloader(false);
//       })
//       .catch((err) => {
//         setloader(false);
//         dispatch({ type: "GET_SESSION_FAILED", payload: err });
//         // toast.error(
//         //   err?.response?.data?.msg ||
//         //   "Unable to retrieve the data. Please try again later."
//         // );
//       });
//   };
// };

export const SendOptiApi = (data, setLoader, setOtpSent, setError) => {
  // setLoader(true);

  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("at"),
    },
  };

  return getAPICall(
    `${AccountsRootUrl}/sendOtp?email=${data?.email}&reqOtp=${data?.otp}`,
    options
  )
    .then((res) => {
      console.log("API Response:", res);
      setLoader(false);
      
      if (res?.data?.msg === "otp sent") {
        setOtpSent(true);
        setError("");
      } else {
        setError("Unexpected response: " + (res?.msg || "No message"));
      }

      // return res;
    })
    .catch((err) => {
      console.error("Error:", err);
      setLoader(false);
      setError("Error sending OTP. Please try again.");
      throw err;
    });
};




