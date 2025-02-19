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

// export const productsdata = (setLoader,setData) => {
//   return getAPICall(ProductsUrl)
//     .then((res) => {
//       console.log("API Response:", res);
//       setLoader(false);
//       setData(res.data.products)

//       // if (res.data.msg === "data received") {
//       //   setError("");
//       // } else {
//       //   setError("unexpected response: " + (res.msg || "No message"));
//       // }
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       setLoader(false);
//       // setError("Error sending data .please try again.");
//       throw err;
//     })
   
// };


// let productsapiCalled = false;

// export const productsdata = async (setLoader, setData) => {
//   if (productsapiCalled) return 
//   (productsapiCalled = true) 
//   try {
   
//     setLoader(true); 

//     const res = await getAPICall(ProductsUrl);
//     console.log("API Response:", res);

//     setData(res.data.products);
   
//   } catch (err) {
//     console.error("Error:", err);
//     setMessage("Error loading data. Please try again.");
    
//   }
//    finally {
//     setLoader(false); 
//   }
// };
