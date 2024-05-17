/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { LIVE_URL } from '../Hooks/envConst'
import axios from 'axios';
import Logo from '../public/images/logo.png'
import LoadingIcons from 'react-loading-icons'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AiOutlineClose } from 'react-icons/ai'
import { checkLogin } from '../Hooks/checkLogin';

function Login(props) {
  const [isLogged, setIsLogged] = useState(false)
  const history = useRouter();
  const [baseCurrentDate, setBaseCurrentDate] = useState();
  // console.log("dddd",null==undefined);
  useEffect(() => {
    const currentDate = new Date();
    const parsedDate = Date.parse(currentDate);
    const baseCurrentDate1 = window.btoa(parsedDate);
    setBaseCurrentDate(baseCurrentDate1);
  }, []);


  useEffect(() => {
    const token = Cookies.get('token')
    const base64Email = Cookies.get('email')
    const eml = checkLogin(token, base64Email);
    if (eml) {
      setIsLogged(true)
      history.push('/dashboard')
    }
    else {
      Cookies.remove('token');
      Cookies.remove('email');
      history.push('/')
    }
  }, [isLogged]);

  if (typeof window !== "undefined") {
    document.body.classList.remove('dashboard-custom-body')
  }

  const emailError = () => toast.error("Invalid Credential");
  const suspendError = () => toast.error("Your is suspended");
  const Error = () => toast.error("Invalid email");
  const noDataErr = () => toast.error("No account found with this email.")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forLoading, setForLoading] = useState(false)
  const [forgetPass, setForgetPass] = useState(false);
  const [thanksPage, setThanksPage] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  // const [noDataErr, setNoDataErr] = useState("");
  const emlRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  function handelLogin(e) {
    e.preventDefault();
    if (email == "" || emlRegex.test(email) == false) {
      document.getElementById("uname").style.borderColor = "red"
      Error()
      // setEmailErr("Invalid Email")
      return
    } if (password == "") {
      document.getElementById("pass").style.borderColor = "red";
      return
    }
    setLoading(true);
    let body = JSON.stringify({
      action:"Login",
      email: email,
      password: password
    })
    axios.post(`/api/reg_log`, body, {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }, mode: 'no-cors'
    }).then((response) => {
      if (response.status == 200) {
        if (response?.data?.message == "Your account is suspended") {
          suspendError()
          setLoading(false);
        } else {
          let in30Minutes = 1 / 48;
          Cookies.set('token', response.data.token, { expires: in30Minutes })
          // let eml = response.data.message.email
          let pub_key = response.data.message.public_key
          let priv_key = response.data.message.private_key
          Cookies.set('email', btoa(response.data.message.email))
          const base64Id = btoa(`${pub_key}:${priv_key}`)
          const accType = btoa(response.data.message.accountType)
          if (response.data.message.isSupAdmin == "1") {
            Cookies.set("acc_type", accType)
          }
          Cookies.set('pubprivkey', base64Id)
          Cookies.set('issup', response.data.message.isSupAdmin)
          history.push({
            pathname: "/dashboard"
          })
        }
      }
    }).catch(error => {
      console.log(error);
      setLoading(false);
      emailError();
    })
  }

  function unameSet(e) {
    e.target.style.borderColor = "white";
    setEmail(e.target.value)
  }
  function passSet(e) {
    e.target.style.borderColor = "white";
    setPassword(e.target.value)
  }
  function handleForgetPass() {
    setForgetPass(true)
  }
  function handelClosePass() {
    setThanksPage(false)
    setForgetPass(false);
  }
  function handleForgotEmail(e) {

    e.target.style.borderColor = "white";
    setForgotEmail(e.target.value)
  }
  // ===============================================================================
  async function handleUpdateUser(userData, name) {
    const body = JSON.stringify({
      forgotLinkTime: baseCurrentDate
    })
    await axios.put(`${LIVE_URL}/api/v1/update/email/${userData?._id}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    }).then((response) => {
      if (response.data.message == "data updated successfullly") {
        handleThanks(name)
      }
    })
  }

  async function handleUserName(e) {
    e.preventDefault()
    if (forgotEmail == "" || emlRegex.test(forgotEmail) == false) {
      document.getElementById("forgemal").style.borderColor = "red"
      return
    }
    setForLoading(true)
    await axios.get(`${LIVE_URL}/api/v1/getuser/${forgotEmail}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    }).then((response) => {
      let res = response && response.data && response.data.data !== undefined ? response.data.data : null
      if (res == null) {
        setForLoading(false)
        noDataErr()
      }
      else {
        const name = `${res?.firstname} ${res?.lastname}`
        handleUpdateUser(res, name)
      }
    })
  }

  function handleThanks(name) {
    if (forgotEmail == "" || emlRegex.test(forgotEmail) == false) {
      document.getElementById("forgemal").style.borderColor = "red"
      return
    }
    let body = JSON.stringify({
      mail: forgotEmail,
      usrname: name,
      forgotLinkTime: baseCurrentDate,
    })
    axios.post(`${LIVE_URL}/api/v1/ipass/forgotpass/mail`, body, {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }, mode: 'no-cors'
    }).then((resp) => {
      if (resp?.data?.message == "Mail sent successfully") {
        setTimeout(() => {
          setThanksPage(true)
          setForLoading(false);
        }, 2000)
      }
    })
    // ==============================================================================================
  }

  return (
    <>
      {!isLogged
        ? <>
          {forgetPass
            ? <div className=' froget-pass-main'>
              <div className=" forget-pass-inner">
                <button className="close-btn-verif" onClick={handelClosePass}><AiOutlineClose /></button>
                {thanksPage == true
                  ? <div className='mail-successful-page-main'>
                    <h2 className='mail-success-heading'>Mail sent successful</h2>
                    <p className='mail-check-text'>Check your email inbox we have sent an reset link to set your new password</p>
                    <button className='mail-success-okbtn' onClick={handelClosePass}>Ok</button>
                  </div>
                  : <>
                    <div className='reset-heading-main'>
                      <h2 className='reset-heading'>
                        Forgot my password
                      </h2>
                      <p className='reset-descreption'>Enter your registered email id below to receive password reset instructions.</p>
                    </div>
                    <div className='pass-email'>
                      <label>Email id</label>
                      <input type="text" id='forgemal' onChange={(e) => handleForgotEmail(e)} />
                      {/* <div className='error-text-undefined'> */}
                      {/* <span className='no-dat-err'>{noDataErr!==""?noDataErr:null}</span> */}
                      {/* </div> */}
                      <div className='button-container forget-pass-next-btn' >
                        <button className="loaderImageS-socialmedia" onClick={handleUserName}>{forLoading
                          ? <LoadingIcons.Bars />
                          : "Submit"}</button>
                      </div>
                    </div></>}
              </div>
            </div>
            : null}

          <div className='login-formmain'>
            <div className='login-form'>
              <div className="logoBlock">
                <img src={Logo.src} />
              </div>
              <h1>sign in</h1>
              <form>
                <p>Use the following to register on the IPass platform</p>
                <div className='loginuser-name'>
                  <label>E-mail</label>
                  <input type="text" name="uname" placeholder='enter your email' value={email} id="uname" onChange={(e) => unameSet(e)} />
                  {/* {emailErr !== ""
                    ? <span className='email-error'>{emailErr}</span>
                    : null} */}
                </div>
                <div className='loginuser-password'>
                  <label>Password</label>
                  <input type="password" name="pass" id="pass" placeholder='enter your password' value={password} onChange={(e) => passSet(e)} />
                </div>
                <div className='forgot-pass-btn' onClick={handleForgetPass}>Forgot Password</div>
                <div className="button-container">
                  <button onClick={handelLogin} disable={loading ? "true" : "false"}>
                    {loading ? <LoadingIcons.Bars /> : "Login"}
                  </button>
                </div>
              </form>
            </div>
            <div className="login image">
              <img src="https://ipass-mena.com/wp-content/uploads/2022/06/Graydon-KYC-Know-Your-Customer.jpg" />
            </div>
          </div>
        </>
        : null}
    </>)
}
export default Login;
