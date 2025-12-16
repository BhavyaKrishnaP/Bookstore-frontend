import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allAPIs'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

const Auth = ({ register }) => {

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  console.log(userDetails);

  const handleRegister = async () => {
    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info("Please fill the form completely...")
    } else {
      // api call
      const result = await registerAPI({ username, email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success("Registration Successfull")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.status == 400) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error("Something went wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }

  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("Please fill the form")
    } else {
      //api call 
      const result = await loginAPI({ email, password })
      console.log(result);

      if (result.status == 200) {
        toast.success("Login Successfull...")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setTimeout(() => {
          if (result.data.existingUser.email == "bookAdmin@gmail.com") {
            navigate("/admin-home")
          } else {
            navigate("/")
          }
        }, 5000)
      }

    }
  }

  const handleGoogleLogin = async(credentialResponse)=>{
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);
    
    const result = await googleLoginAPI({username:details.name, email:details.email,password:"googlePswd",photo:details.picture})
    console.log(result);

    if(result.status == 200){
      toast.success("Login Successfull")
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)

      setTimeout(()=>{
        if(result.data.existingUser.email=="bookAdmin@gmail.com"){
          navigate("/admin-home")
        }else{
          navigate("/")
        }
      },2500)
    }else{
      toast.error("Something went wrong")
    }
    
  }


  return (
    <div id='loginPage'>
      <div className="md:grid grid-cols-3">
        <div></div>
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-3xl text-black font-bold p-6'>BOOKSTORE</h1>

          <form className='w-full bg-gray-900 p-8 flex justify-center items-center flex-col'>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='border border-white flex justify-center items-center'>
              <FontAwesomeIcon icon={faUser} className='text-white fa-2x' />
            </div>

            {!register ? <h1 className='text-white mt-4 text-3xl'>LOGIN</h1>
              :
              <h1 className='text-white mt-4 text-3xl'>REGISTER</h1>}

            {register && <div className="mb-3 w-full mt-8">
              <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='User Name' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>}

            <div className="mb-3 w-full mt-8">
              <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>

            <div className="mb-3 w-full mt-8">
              <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>

            <div className='mb-5 w-full flex justify-between'>
              <p className='text-amber-400' style={{ fontSize: '10px' }}>*Never Share Password with Others</p>

              {!register && <p className="text-white" style={{ fontSize: '10px' }}>Forget Password</p>}
            </div>

            {!register ? <div className="mb-2 w-full">
              <button onClick={handleLogin} type='button' className="bg-green-700 text-white w-full p-3 rounded">Login</button>
            </div> :
              <div className="mb-2 w-full">
                <button onClick={handleRegister} type='button' className="bg-green-700 text-white w-full p-3 rounded">Register</button>
              </div>}

            <p className='text-white'>......................OR......................</p>

            {!register && <div className='mb-5 mt-3 w-full'>
              {/* <button className='bg-white text-black w-full p-3 rounded'>Sign in With Google</button> */}

              <GoogleLogin width={'400px'}
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;
            </div>}

            {!register ? <p className="text-white">Are you a New User? <Link to={'/register'}>Register</Link></p> : <p className='text-white'>Existing User?<Link to={'/login'}>Login</Link></p>}
          </form>
        </div>
        <div></div>

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </div>
  )
}

export default Auth