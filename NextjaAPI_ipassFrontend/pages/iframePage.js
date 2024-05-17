import React, { useState, useEffect } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingIcons from 'react-loading-icons'
import Cookies from 'js-cookie';
import Logo from '../public/images/logo.png'
const IframePage = () => {
    if (typeof window !== "undefined") {
        document.body.classList.remove('dashboard-custom-body')
        }
    const [changeDoc, setChangeDoc] = useState(0)
    const [hasWebcam, sethasWebcam] = useState(false)
    const [isLogged, setIsLogged] = useState(true)
    const [clospops, setClosPops] = useState(false)
    const history = useRouter();
    const { weburl, sessionId, Uid } = history.query;
    function handelClosePop() {
        setClosPops(true)
    }

    function handelBackVerif() {
        setClosPops(false);
    }
   
    return (
        <>
            {isLogged ?
                <>
                    <header>
                        <div className="headerAdmin">
                            <Link href="#">
                                <img src={Logo.src} />
                            </Link>
                        </div>
                        <div className="menusBlock closeIconAdd">
                            {!clospops ? <div className="headerverif-main sessionpage-header">
                                <button onClick={handelClosePop}><AiOutlineClose /></button>
                            </div> : null}
                        </div>
                    </header>
                    <div className="getlink-main-1 docupl-main ">
                        <>
                            {changeDoc == 3 ?
                                <>
                                    <div className="thankyoupage-main">
                                        <h1>شكرا </h1>
                                        <h2>تم التسجيل بنجاح </h2>
                                        {/* <button className="commanButtonPrimary">متابعة</button> */}
                                    </div>
                                    {clospops ?

                                        <div className="close-pop-main">
                                            <div className="closse-popup-content">
                                                <h1>هل ترغب بالمغادرة؟ </h1>
                                                <p>هل أنت منأكد من رغبتك بالخروج من عملية تعريف الهوية؟ </p>
                                                <div className="popbuttons-bottom">
                                                    <Link href={`/sessionpage?sessionId=${sessionId}&Uid=${Uid}`}><a>الخروج </a></Link>
                                                    <button onClick={handelBackVerif}>تعرف على </button>
                                                </div>
                                            </div>
                                        </div>

                                        : null}
                                </>
                                :
                                <>
                                    {clospops ?
                                        <div className="close-pop-main">
                                            <div className="closse-popup-content">
                                                <h1>هل ترغب بالمغادرة؟ </h1>
                                                <p>هل أنت منأكد من رغبتك بالخروج من عملية تعريف الهوية؟ </p>
                                                <div className="popbuttons-bottom">
                                                    <Link href={`/sessionpage?sessionId=${sessionId}&Uid=${Uid}`}><a>الخروج </a></Link>
                                                    <button onClick={handelBackVerif}>تعرف على </button>
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    <div className="getlink-main-1">
                                        <iframe src={weburl} height="500px" width="700px" allow="camera;microphone" key="798900j"></iframe>

                                    </div>
                                </>}
                        </>
                    </div></> : null}
        </>

    )
}

export default IframePage