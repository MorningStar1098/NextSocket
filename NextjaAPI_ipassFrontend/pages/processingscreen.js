/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LIVE_URL } from '../Hooks/envConst'
import LoadingIcons from 'react-loading-icons'
import { TiTick } from 'react-icons/ti'
import Cookies from 'js-cookie';
import Logo from '../public/images/logo.png'
import Link from 'next/link'
import queryString from 'query-string';

import { useRouter } from 'next/router'

function ProcessingScreen() {
    if (typeof window !== "undefined") {
        document.body.classList.remove('dashboard-custom-body')
    }


    useEffect(() => {
        let params = queryString.parse(location.search)
        let accountId = params.accountId
        let workflowExecutionId = params.workflowExecutionId
        handlePhoto(accountId, workflowExecutionId)
    }, [])


    const [photoState, setPhotoState] = useState(0)
    const [imgQuality, setImgQuality] = useState(0)
    const [allData, setAllData] = useState(0)
    const [finalData, setFinalData] = useState(0)
    let history = useRouter();
    // let accId = Cookies.get('accountId')
    // let wekId = Cookies.get('workflowExecutionId')
    const Uid = Cookies.get('Uid')
    const tokpubPrivkey = Cookies.get('pubprivkey')
    const isSupAdmin = Cookies.get('issup')
    const eml = Cookies.get('email')
    const acct = Cookies.get("acc_type")
    let email
    let accType
    if (eml !== undefined) {
        email = atob(eml)
    }
    if (acct!==undefined&&isSupAdmin=="1") {
        accType = atob(acct)
    }

    async function handleUpdateClientData() {
        let bodycr = {
            "sesId": Uid,
            "tokpubpriv": tokpubPrivkey,
            "isSup": isSupAdmin,
            "eml": email,
            "acc_type":isSupAdmin=="1"?accType:"demo"
        }
        let body = {
            "email": email
        }
        await axios.put(`${LIVE_URL}/api/v1/update/consumptions/reamining`, body, {})
            .then((resp) => {
                if (resp?.data?.message == "data updated successfullly") {
                    axios.post(`${LIVE_URL}/api/v1/ipass/cron/data`, bodycr, {})
                    setFinalData(2)
                    history.push('/thankyoupage')
                    Cookies.remove('accountId')
                    Cookies.remove('workflowExecutionId')
                }
            })
    }
    async function handleDecesion(accountId, workflowExecutionId) {
        setFinalData(1);
        let body = {
            "sesId": Uid,
            "tokpubpriv": tokpubPrivkey,
            "isSup": isSupAdmin,
            "eml": email,
            "acc_type":isSupAdmin=="1"?accType:"demo"
        }
        await axios.post(`${LIVE_URL}/api/v1/jumio/success?accountId=${accountId}&workflowExecutionId=${workflowExecutionId}`, body, {})
            .then((resp) => {
                if (resp.status == 200) {
                    if (isSupAdmin == "1") {
                        handleUpdateClientData()
                    } else {
                        axios.post(`${LIVE_URL}/api/v1/ipass/cron/data`, body, {})
                        setFinalData(2)
                        history.push('/thankyoupage')
                        Cookies.remove('accountId')
                        Cookies.remove('workflowExecutionId')
                    }

                }
            })


    }
    function handlePhoto(accountId, workflowExecutionId) {
        setPhotoState(1);
        setTimeout(async () => {
            setPhotoState(2)
            handleImgQuality(accountId, workflowExecutionId);
        }, 2000)
    }
    function handleImgQuality(accountId, workflowExecutionId) {
        setImgQuality(1)
        setTimeout(async () => {
            setImgQuality(2)
            handleData(accountId, workflowExecutionId);
        }, 2000)
    }
    function handleData(accountId, workflowExecutionId) {
        setAllData(1)
        setTimeout(async () => {
            setAllData(2)
             handleDecesion(accountId, workflowExecutionId);
        }, 2000)
    }
    return (
        <div className='sessionpage-root'>
            <header>
                <div className="headerAdmin ">
                    <Link href="#">
                        <img src={Logo.src} />
                    </Link>
                </div>
                <div className="menusBlock closeIconAdd">
                </div>
            </header>
            <div className=' processing-screen-main'>

                <h1>Please Wait</h1><br />
                <ul className='all-text-loader'>
                    <li className='loading-text'> <div className="processingSteps">{photoState == 1 ? <div className='one-sec-loader processingSteps'><LoadingIcons.Circles className='onesecond-loader ' /></div> : photoState == 2 ? <span className='verifies-icons-screen processingSteps'><TiTick /></span> : null}</div>  <span className='new-screen-text'>Processing Photos</span></li><br />
                    <li className='loading-text'><div className="processingSteps">{imgQuality == 1 ? <div className='one-sec-loader'><LoadingIcons.Circles className='onesecond-loader' /> </div> : imgQuality == 2 ? <div className="processingSteps"><span className='verifies-icons-screen'><TiTick /></span></div> : null}</div><span className='new-screen-text'>Checking images quality</span></li><br />
                    <li className='loading-text'><div className="processingSteps">{allData == 1 ? <div className='one-sec-loader'><LoadingIcons.Circles className='onesecond-loader' /></div> : allData == 2 ? <div className="processingSteps"><span className='verifies-icons-screen'><TiTick /></span> </div>: null}</div><span className='new-screen-text'>Processing Data</span></li><br />
                    <li className='loading-text'><div className="processingSteps">{finalData == 1 ? <div className='one-sec-loader'><LoadingIcons.Circles className='onesecond-loader' /></div> : finalData == 2 ?<div className="processingSteps"><span className='verifies-icons-screen'><TiTick /></span></div> : null}</div><span className='new-screen-text'>Getting final decesion</span></li>
                </ul>
            </div>
        </div>
    )
}
export default ProcessingScreen