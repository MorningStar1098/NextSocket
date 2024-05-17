/* eslint-disable */
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti';
import Link from 'next/link'
import { LIVE_URL } from '../Hooks/envConst'
import { useRouter } from 'next/router'
import axios from 'axios';
import Logo from '../public/images/logo.png'
import Cookies from 'js-cookie';
import LoadingIcons from 'react-loading-icons'

function SessionPage() {
    if (typeof window !== "undefined") {
        document.body.classList.remove('dashboard-custom-body')
        }
    let history = useRouter();
    // const [token, setToken] = useState([])
    const [loading, setLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(true)
    const { id } = history.query;
    useEffect(() => {
    
        // if (sessionId) {
        //     localStorage.setItem("sessionId", sessionId)
        // }

    }, [])

    async function handleWorkflowId(){
        setLoading(true)
        await axios.get(`${LIVE_URL}/api/v1/ipass/workflowid/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'

        }).then((resp)=>{
            const wid = resp && resp.data && resp.data.data !== undefined ? resp.data.data.workflow_id : null
            handelDocVeriff(wid)            
        })
    }
    async function handelDocVeriff(wid) {
        await axios.get(`${LIVE_URL}/api/v1/ipass/tokendata/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'

        })
            .then((response) => {
                const token = response && response.data && response.data.data !== undefined ? response.data.data.access_token : null
                handleJumioAccount(token,wid)
            })
    }
    async function handleJumioAccount(token,wid) {
        localStorage.setItem("sessionId", token)
        let body = (
            {
                "customerInternalReference": "1",
                "workflowDefinition": {
                    "key":wid,
                    "capabilities": {
                        "watchlistScreening": {
                            "additionalProperties": "string"
                        }
                    }
                },
                "callbackUrl": "https://www.google.com",
                "userReference": "YOUR_USER_REFERENCE",
                "tokenLifetime": "5m",
                "web": {
                    "successUrl": "https://app.ipass-mena.com/success",
                    "errorUrl": "https://app.ipass-mena.com/error",
                    "locale": "en-US"
                }, 
                "sesId":`${id}` 
            }

        )
        
        var inHalfADay = 0.5;
        Cookies.set('Uid', id, {
            
            expires: inHalfADay
        })
        Cookies.set('sessionId', token, {
            expires: inHalfADay
        })
        await axios.post(`${LIVE_URL}/api/v1/ipass/jumio/account`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: 'no-cors'

        })
            .then((response) => {

                setLoading(false)
                // let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                // if (token == sessionId) {
                    history.push(response.data.url);
                // }

            })
    }

    const [clospops, setClosPops] = useState(false)
    function handelClosePop() {
        setClosPops(true)
    }
    function handelBackVerif() {
        setClosPops(false);
    }
    return (
        <>
            {isLogged ?

                <div className=" sessionpage-root">
                    <header>
                        <div className="headerAdmin ">
                            <Link href="#">
                                <img src={Logo.src} />
                            </Link>
                        </div>
                        <div className="menusBlock closeIconAdd">
                        </div>
                    </header>
                    {clospops ?
                        <div className="close-pop-main">
                            <div className="closse-popup-content">
                                <h1>Do you want to leave? </h1>
                                <p>Are you sure you want to opt out of the identification process? </p>
                                <div className="popbuttons-bottom">
                                    <Link href={`/genlinkpage`}><a>Exit </a></Link>
                                    <button onClick={handelBackVerif}>verify me</button>
                                </div>
                            </div>
                        </div>
                        : null}
                    <div className="getlink-main-1">

                        <div className="genlinkpage-main sessionpage-main1">
                            <div className="genpagelink-inner sessionpage-inner">
                                <h1>Let's start the identification process</h1>
                                <p className="vertified-3">Please prepare personal identification </p>
                                <div className="sessionpage-beforestart-main">
                                    <h2>Before starting please do the following </h2>
                                    <ul>
                                        <li>
                                            <TiTick />
                                            Preparing an effective government document
                                        </li>
                                        <li>
                                            <TiTick />
                                            Make sure the camera on the device is active
                                        </li>
                                        <li>
                                            <TiTick />
                                            Get ready to take a selfie of you and the document
                                        </li>
                                    </ul>
                                </div>
                                <p>
                                    <span>
                                        <span>providing us your opinion voluntarily will help us improve the quality of service provided.</span>
                                        We use an automated system to identify the document, for more information you can visit IPass
                                        <Link href="privacypolicy">Privacy Policy</Link>
                                    </span>
                                </p>
                                <div className="session-button button-container">
                                    <button onClick={handleWorkflowId}
                                    >{loading ?
                                        <LoadingIcons.Bars /> :
                                        "start session"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}
        </>
    )
}
export default SessionPage;