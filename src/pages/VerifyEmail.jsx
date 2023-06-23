import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const {signupData, loading } = useSelector((state) => state.auth);

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const {accountType,firstName,lastName,email,password,confirmPassword} =signupData;
    dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
  }
  return
   <div>
        {
            loading
            ?(<div>
                Loading...
            </div>)
            :(
                <div>
                    <h1>Verfiy Email</h1>
                    <p>A verfication code has been sent to you . Enter the code below</p>
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props)=> <input {...props} />}
                        />
                        <button type="submit">Verify Email</button>
                    </form>
                    <div>
                    <Link to="/login">
                        <p>Back to Login</p>
                        </Link>    
                    </div>
                    <button >Resend It</button>
                </div>
            )
        }
  </div>;
};

export default VerifyEmail;
