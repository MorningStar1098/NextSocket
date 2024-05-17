import React, { useState, useContext, useEffect } from 'react';
import '../styles/globals.css'
import '../styles/TDS.css'
import { ToastContainer as ToastPopup } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css'
import Login from '../pages'
import { useRouter } from 'next/router';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState(false)
  // useEffect(() => {
  //   setToken(localStorage.getItem("token"))

  // }, [token])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Babylonica&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/Static/logo.png" />
                    </Head>

                    <Component {...pageProps} />
                    <ToastPopup
                      position="bottom-right"
                      autoClose={9000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss={false}
                      draggable
                      pauseOnHover={false}
                      theme="dark"
                    />
                  </>
                  )
}

                  export default MyApp
