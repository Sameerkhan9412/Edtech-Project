import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  // LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("POST",RESETPASSTOKEN_API,{email});
      console.log("RESET PASSWORD TOKEN RESPONSE ......",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error){
      console.log("RESET PASSWORD TOKEN ERROR ");
      toast.error("failed to send email for resetting password")
    }
    dispatch(setLoading(false));
  }
}
export function resetPassword(password,confirmPassword,token){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("POST",RESETPASSWORD_API,{
        password,confirmPassword,token
      });
      console.log("RESET PASSWORD RESPONSE ...",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      toast.success("password has been reset successfully");
    }
    catch(e){
      console.log("RESET PASSWORD TOKEN ERROR ");
      toast.error("Unable to reset password")
    }
    dispatch(setLoading(false));
  }
}

