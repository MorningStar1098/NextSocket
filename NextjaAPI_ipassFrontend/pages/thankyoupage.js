 /* eslint-disable */
 import React from 'react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import Logo from '../public/images/logo.png'

const thankyoupage = () => {
  if (typeof window !== "undefined") {
    document.body.classList.remove('dashboard-custom-body')
    }
  return (
    <div className=" sessionpage-root">
    <header>
    <div className="headerAdmin ">
        <Link href="#">
            <img src={Logo.src} />
        </Link>
    </div>
</header>
    <div className="thankyoupage-main">
    <h1>Thank You </h1>
    <h2>Registered Successfully</h2>
       </div>
  </div>
  )
}
export default thankyoupage