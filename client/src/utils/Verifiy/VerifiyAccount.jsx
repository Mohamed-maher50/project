import React from 'react'
import OtpInput from 'react-otp-input';
import "./VerifiyAccount.css"
import H_verifiy from '../../Hooks/H_verifiy.js';
import { Spin } from 'antd';


const VerifiyAccount = () => {

  const  [otp , setOtp , handleSub , isloading] = H_verifiy()

  return (
    <div className="verifiyAccount">
  <div className="container1  ">
  <h2>Verify Your Account</h2>

  <div className="code-container">
    <div className="inputs">
  <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderInput={(props) => <input {...props} />}
    />

    </div>
    <button type="button" className="btn btn-primary" onClick={handleSub}>
      {isloading === false  ? "Verify" : <Spin className='spin' />}
    </button>
  </div>




</div>
</div>
  )
}

export default VerifiyAccount