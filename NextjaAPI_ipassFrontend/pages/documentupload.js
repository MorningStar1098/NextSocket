/* eslint-disable */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingIcons from 'react-loading-icons'
import Logo from '../public/images/logo.png'


function DocumentUpload() {
    if (typeof window !== "undefined") {
        document.body.classList.remove('dashboard-custom-body')
        }
    const history = useRouter();
    const { Uid,weburl } = history.query;
    const [loading, setLoading] = useState(false)
    const [hasWebcam, sethasWebcam] = useState(false)
    const [clospops, setClosPops] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
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
                                    <div className="getlink-main-1">
                                         {!hasWebcam ?
                                    <iframe src={weburl} height="500px" width="700px" allow="camera;microphone" key="798900j"></iframe>
                                  :null}
                                    </div>
                                    <button onClick={() => handelDecesion()} id="btns"></button>
                                    
                                    {loading ?
                                    <div className="loading-request">
                                       <div className="loader-svg"> <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
                                        </div>
                                        : null}
                                </>
                    </div></> : null}
        </>
    )
}
export default DocumentUpload