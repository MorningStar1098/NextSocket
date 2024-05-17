import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../public/images/logo.png';
import validator from 'validator';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LIVE_URL } from '../Hooks/envConst';
import LoadingIcons from 'react-loading-icons';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

function ForgetPasswordReset() {
    const history = useRouter();
    const { token, ld } = history.query;

    useEffect(() => {
        getUserData(token);
    }, [token])

    const [password, setPassword] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successPage, setSuccessPage] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();
    const [expired, setExpired] = useState();
    const [passwordState, setPaswordState] = useState();
    const [loadingErr, setLoadingErr] = useState(true)

    function getUserData(token) {
        axios.get(`${LIVE_URL}/api/v1/get/user/data/${token}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {
            setUserData(response?.data?.data);
            setTimeout(()=>{
                setLoadingErr(false)
              },500)
            if (response?.data?.data?.forgotLinkTime !== ld || !response?.data?.data?.forgotLinkTime || !ld) {
                setExpired(true);
            } else {
                const decodedDate = parseInt(atob(response?.data?.data?.forgotLinkTime));
                const currentdate = new Date();
                const linkDate = new Date(decodedDate);
                linkDate.setHours(linkDate.getHours() + 72);
                const currentTime = Date.parse(currentdate);
                const expiryTime = Date.parse(linkDate);
                if (currentTime > expiryTime) {
                    setExpired(true);
                } else {
                    setExpired(false);
                }
            }
        })
    }

    function handleUpdPass(e) {
        e.preventDefault();
        if (validator.isStrongPassword(userEmail, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPaswordState(false)
        } else {
            setPaswordState(true)
            // setErrorMessage(' Not Strong Password')
        }

        if (userEmail == password) {
            if (passwordState == false) {
                setLoading(true)
                let body = JSON.stringify({
                    password: password
                })
                axios.put(`${LIVE_URL}/api/v1/update/${userData._id}`, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                }).then((response) => {
                    if (response.data.message == "data updated successfullly") {
                        setTimeout(() => {
                            setLoading(false)
                            setSuccessPage(true)
                        }, 3000)
                    }
                })
            }
        } else {
            setEmailError("Password and confirm password must be same")
        }
    }

    const [oldpasswordType, setoldpasswordType] = useState("password");
    const [newpasswordType, setnewpasswordType] = useState("password");

    const toggleoldPassword = (e) => {
        e.preventDefault()
        if (oldpasswordType === "password") {
            setoldpasswordType("text")
        }
        else {
            setoldpasswordType("password")
        }
    }

    const togglenewPassword = (e) => {
        e.preventDefault()
        if (newpasswordType === "password") {
            setnewpasswordType("text")
        }
        else {
            setnewpasswordType("password")
        }
    }

    function handleEmail(e) {
        setuserEmail(e.target.value);
        if (validator.isStrongPassword(userEmail, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('Strong Password');
        } else {
            setErrorMessage(' Not Strong Password');
        }
    }

    function handlePass(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            {userData?.token == token
                ? <div className='login-formmain details reset-paswword-main'>
                    <div className='login-form reset-password-inner'>
                        <div className="logoBlock">
                            {/* <Link href="/dashboard"> */}
                            <img src={Logo.src} />
                            {/* </Link> */}
                        </div>
                        {successPage
                            ? <div className='success-page-main'>
                                <h1 className='succes-heading'>Password reset succesful</h1>
                                <p className='success-page-text'>Your new password has been saved. Please use this password to sign into your Account.</p>
                                <Link href="/">
                                    <a className='success-page-login'> LOGIN</a>
                                </Link>
                                {/* <button className='success-page-login'>Login</button> */}
                            </div>
                            : <>
                                {expired
                                    ? <h1>Link Expired</h1>
                                    : <>
                                        <h1>Set your new password</h1>
                                        <form>
                                            <div className='loginuser-name confirm-pass-inputbox'>
                                                <label>Password</label>
                                                <button className="view-icon" onClick={toggleoldPassword}>
                                                    {oldpasswordType == "password"
                                                        ? <AiOutlineEye />
                                                        : <AiOutlineEyeInvisible />}</button>
                                                <input type={oldpasswordType} id='confirm-pass' onChange={handleEmail} />
                                                {errorMessage === '' ? null :
                                                    <span className={errorMessage == "Strong Password" ? "password-strong" : "password-not-strong"}>
                                                        {errorMessage}
                                                    </span>}
                                                {userEmail.length <= 4 && userEmail.length !== 0 ?
                                                    <span className='pass-length-err'> Password length must be 10 chracter</span> : null}
                                            </div>
                                            <div className='loginuser-name password-input-box'>
                                                <label>Confirm Password</label>
                                                <button className="view-icon" onClick={togglenewPassword}>
                                                    {newpasswordType == "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                                                <input type={newpasswordType} id='passreset' onChange={handlePass} />
                                                {emailError !== "" ? <span className='confirm-errmsg'>{emailError}</span> : null}

                                            </div>

                                            <div className='button-container reset-pass-continuebtn'>
                                                {passwordState == true
                                                    ? <span className='password-not-strong'>This password is too weak .Try with new password</span>
                                                    : null}
                                                <button className="loaderImageS-socialmedia" onClick={handleUpdPass} >
                                                    {loading ? <LoadingIcons.Bars /> : "Submit"}
                                                </button>
                                            </div>
                                        </form>
                                    </>}
                            </>}
                    </div>
                </div>
                : <h2>404 page not found</h2>}
                {loadingErr ?
        <div className="loading-request">
          <div className="loader-svg"> <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
        </div>
        : null}

        </>
    )
}

export default ForgetPasswordReset;