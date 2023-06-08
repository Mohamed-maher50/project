import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Error, success } from '../utils/Notification';
import { verifiyResetCode } from '../store/user';
import { useNavigate } from 'react-router-dom';

const H_verifiy = () => {
    const [otp, setOtp] = useState("");
    const [isLoad , setIsLoad] = useState(true)
  const dispatch = useDispatch()
  const {userverifiy , isloading} = useSelector(state => state.user)
  const Navigate = useNavigate()


  const handleSub = async()=>{
    if(otp=== "") return Error("please enter reset code ..")
    if(otp.length < 6 ) return Error("please enter full reset code ..")
    setIsLoad(true)
    await dispatch(verifiyResetCode(otp))
    setIsLoad(false)
  }

  useEffect(_=> {
    if(isLoad === false){
      if(userverifiy?.status === "success"){
        setTimeout(() => {
          Navigate("/login")
        }, 1000);
      }
      else{
        Error("Please check the code and try again")
      }
    }
  },[isLoad])

  return [otp , setOtp , handleSub , isloading]
}

export default H_verifiy