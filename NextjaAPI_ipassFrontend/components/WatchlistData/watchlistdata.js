/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { LIVE_URL } from '../../Hooks/envConst'
import { TiTick } from 'react-icons/ti'
import { GrFormClose } from 'react-icons/gr'
import { BsExclamationCircleFill } from 'react-icons/bs'
import SocialMedia from '../SocialMedia/socialmedia'
import Reject from '../../public/images/reject.png'
import Warning from '../../public/images/warning.png'
import Success from '../../public/images/success.png'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { MdOutlineContentCopy } from 'react-icons/md'
import { GetWatchListDataComp } from "../PdfComponent/PdfComponentData"
import LoadingIcons from 'react-loading-icons'
import {ShimmerCategoryList} from "react-shimmer-effects";

function WatchlistData(props) {
    let usbcondition = 0
    const { singlecustomer, validaData } = props
    const [watchLoading, setWatchLoading] = useState(false)
    useEffect(() => {
        setWatchLoading(true)
        if (singlecustomer && singlecustomer.account && singlecustomer.account.id !== undefined && checkWatchData) {

            WatchlistdataFunc(singlecustomer?.account?.id);
        }

    }, [singlecustomer])

    const coppyToast = () => toast.success("copied to clipboard")
    const [checkWatchData, setCheckWatchData] = useState(true);

    const copyToClipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str);
        return Promise.reject('The Clipboard API is not available.');

    };
    function handlecoppy(id) {
        copyToClipboard(id);
        coppyToast()

    }
    const [watchlistData, setWatchlistData] = useState([])
    let date1 = watchlistData && watchlistData.createdAt !== undefined ? watchlistData.createdAt.slice(0, 10) : null
    let time1 = watchlistData && watchlistData.createdAt !== undefined ? watchlistData.createdAt.slice(11, 16) : null
    const initatedatetime = `${date1}${time1}`
    let date2 = watchlistData && watchlistData.startedAt !== undefined ? watchlistData.startedAt.slice(0, 10) : null
    let time2 = watchlistData && watchlistData.startedAt !== undefined ? watchlistData.startedAt.slice(11, 16) : null
    const startDateTime = `${date2}${time2}`
    let date3 = watchlistData && watchlistData.completedAt !== undefined ? watchlistData.completedAt.slice(0, 10) : null
    let time3 = watchlistData && watchlistData.completedAt !== undefined ? watchlistData.completedAt.slice(11, 16) : null
    const completeDateTime = `${date3}${time3}`


    const verifiedicon = <TiTick />
    const notverified = <GrFormClose />

    const [idCheck, setIdCheck] = useState(true)
    const [similarity, setSimilaity] = useState(false)
    const [liveness, setLiveness] = useState(false)
    const [MetaData, setMetaData] = useState(false)
    const [socialdata, setSocialData] = useState(false)
    const [amlCheck, setAmlCheck] = useState(false)


    function handleDocCheck() {
        setIdCheck(true)
        setSimilaity(false)
        setLiveness(false)
        setMetaData(false)
        setSocialData(false)
        setAmlCheck(false)
    }
    function handleFaceCheck() {
        setSimilaity(true)
        setIdCheck(false)
        setLiveness(false)
        setMetaData(false)
        setSocialData(false)
        setAmlCheck(false)
    }
    function handlelivnessCheck() {
        setLiveness(true)
        setSimilaity(false)
        setIdCheck(false)
        setMetaData(false)
        setSocialData(false)
        setAmlCheck(false)
    }
    function handleAmlCheck() {
        setAmlCheck(true)
        setLiveness(false)
        setSimilaity(false)
        setIdCheck(false)
        setMetaData(false)
        setSocialData(false)
    }
    
    const WatchlistdataFunc = (ID) => {

        axios.get(`${LIVE_URL}/api/v1/ipasswatchscrening/${ID}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'

        })
            .then((repos) => {
                const watchData = repos && repos.data && repos.data.data !== undefined ? repos.data.data : null
                setWatchlistData(watchData)
                GetWatchListDataComp(watchData);
                setWatchLoading(false)

            }).then(() => {
                setCheckWatchData(false);
            })

    }





    return (
        <>
         {/* {loading
                ? <div className="loading-requests">
                    <div className="loader-svg"> <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
                </div>
                : null} */}
                {watchLoading?<ShimmerCategoryList/>
                :<div className='tabs-section-inner'>
            
                {singlecustomer.workflow?.definitionKey == "10015"
                    ? <>
                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.dataChecks !== undefined
                            ? singlecustomer.capabilities.dataChecks.map((ids) => {
                                return (
                                    <>
                                        <div className={idCheck ? "id-check active" : 'id-check'}>
                                            <div className={'id-check-tab'}>
                                                <button onClick={handleDocCheck}>
                                                    {ids && ids.decision && ids.decision.type !== undefined
                                                        ? ids.decision.type == "PASSED"
                                                            ? <span>{verifiedicon}</span>
                                                            : ids.decision.type == "WARNING"
                                                                ? <div className='warning-icon-upper'><BsExclamationCircleFill /></div>
                                                                : <span className='user-notverified-main'>{notverified}</span>
                                                        : null}
                                                    ID Doc Check</button>
                                            </div>
                                            {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.imageChecks !== undefined
                                                ? singlecustomer.capabilities.imageChecks.map((imgchk) => {
                                                    return (
                                                        <>
                                                            {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.usability !== undefined ? singlecustomer.capabilities.usability.map((usability) => {
                                                                usbcondition++
                                                                return (
                                                                    <>
                                                                        {idCheck
                                                                            ? <div className='id-doccheck-innerdata'>
                                                                                <>
                                                                                    {usbcondition == 1 && ids && ids.decision && ids.decision.type !== undefined
                                                                                        ? ids.decision.type && imgchk && imgchk.decision && imgchk.decision.type !== undefined
                                                                                            ? imgchk.decision.type && usability && usability.decision && usability.decision.type !== undefined
                                                                                                ? usability.decision.type == "PASSED"
                                                                                                    ? <>
                                                                                                        <div className='id-checkphoto-qal'>
                                                                                                            <h2>Document photo qualities</h2>
                                                                                                            <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document is supported for the check.</span></p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal id-chk-fraud'>
                                                                                                            <h2>Fraud assessment</h2>
                                                                                                            <p>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document does match the expected document template.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The picture of the face is found blurred on the document.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Picture of the face on the document does not show signs of tampering or modification.</span></p>
                                                                                                            <p>
                                                                                                                {validaData && validaData?.detailvalidaAppId !== undefined ?
                                                                                                                    <>
                                                                                                                        {validaData?.detailvalidaAppId[0]?.forged || validaData?.detailvalidaAppId[1]?.forged
                                                                                                                            ? <span className='user-notverified'>{notverified}</span>
                                                                                                                            : <span className='user-verified'>{verifiedicon}</span>}</> : null}<span className='spanInsideWatchilist'>Document does not show signs of digital tamperings.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Fonts that used on a document are correct.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>No issues with security features found.</span></p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                            <h2>Consistency and validity of extracted data</h2>
                                                                                                            <p>{ids.decision.type == "PASSED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Data extracted from the document is consistent and valid.</span></p>
                                                                                                            <p>{ids.decision.type == "PASSED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}{ids?.decision?.details?.label}</p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                            <h2>Images Check</h2>
                                                                                                            <p>
                                                                                                                <>
                                                                                                                    {imgchk.decision.type == "PASSED"
                                                                                                                        ? <span className='user-verified'>{verifiedicon}</span> : imgchk.decision.type == "REJECTED"
                                                                                                                            ? <span className='user-notverified'>{notverified}</span>
                                                                                                                            : <span className='warning-icon'><BsExclamationCircleFill /></span>}{imgchk.decision.details.label}
                                                                                                                </>
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                            <h2>usability Check</h2>
                                                                                                            <p>
                                                                                                                <>
                                                                                                                    {usability.decision.type == "PASSED"
                                                                                                                        ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                        : usability.decision.type == "WARNING"
                                                                                                                            ? <span className='warning-icon'><BsExclamationCircleFill /></span>
                                                                                                                            : <span className='user-notverified'>{notverified}</span>}{usability.decision.details.label}
                                                                                                                </>
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        {/* <div className='id-checkphoto-qal validations-data'>
                                                                                                            <h2>Document Authentications</h2>
                                                                                                            <div>{ValidaComponent}</div>
                                                                                                        </div> */}
                                                                                                    </>
                                                                                                    : <>
                                                                                                        <div className='id-checkphoto-qal'>
                                                                                                            <h2>Document photo qualities</h2>
                                                                                                            <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document is supported for the check.</span></p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal id-chk-fraud'>
                                                                                                            <h2>Fraud assessment</h2>
                                                                                                            <p>{imgchk.decision.details.label !== " MANIPULATED_DOCUMENT"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document does match the expected document template.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The picture of the face is found blurred on the document.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Picture of the face on the document does not show signs of tampering or modification.</span></p>
                                                                                                            <p>
                                                                                                                {validaData && validaData?.detailvalidaAppId !== undefined ?
                                                                                                                    <>
                                                                                                                        {validaData?.detailvalidaAppId[0]?.forged || validaData?.detailvalidaAppId[1]?.forged
                                                                                                                            ? <span className='user-notverified'>{notverified}</span>
                                                                                                                            : <span className='user-verified'>{verifiedicon}</span>}</> : null}<span className='spanInsideWatchilist'>Document does not show signs of digital tampering.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== " MANIPULATED_DOCUMENT"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Fonts that used on a document are correct.</span></p>
                                                                                                            <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>No issues with security features found.</span></p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                            <h2>Consistency and validity of extracted data</h2>
                                                                                                            <p>{ids.decision.type == "PASSED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Data extracted from the document is consistent and valid.</span></p>
                                                                                                            <p>{ids.decision.type == "PASSED"
                                                                                                                ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                : <span className='user-notverified'>{notverified}</span>}{ids?.decision?.details?.label}</p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                            <h2>Images Check</h2>
                                                                                                            <p>
                                                                                                                <>
                                                                                                                    {imgchk.decision.type == "PASSED"
                                                                                                                        ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                        : imgchk.decision.type == "REJECTED"
                                                                                                                            ? <span className='user-notverified'>{notverified}</span>
                                                                                                                            : <span className='warning-icon'><BsExclamationCircleFill /></span>}{imgchk.decision.details.label}
                                                                                                                </>
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                            <h2>usability Check</h2>
                                                                                                            <p>
                                                                                                                <>
                                                                                                                    {usability.decision.type == "PASSED"
                                                                                                                        ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                        : usability.decision.type == "WARNING"
                                                                                                                            ? <span className='warning-icon'><BsExclamationCircleFill /></span>
                                                                                                                            : <span className='user-notverified'>{notverified}</span>}{usability.decision.details.label}
                                                                                                                </>
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        {/* <div className='id-checkphoto-qal validations-data'>
                                                                                                            <h2>Document Authentications</h2>
                                                                                                            <div>{ValidaComponent}</div>
                                                                                                        </div> */}
                                                                                                    </>
                                                                                                : null
                                                                                            : null
                                                                                        : null
                                                                                    }</>
                                                                            </div>
                                                                            : null}
                                                                    </>)
                                                            }) : null}
                                                        </>)
                                                })
                                                : null}
                                        </div></>)
                            }) : null}
                    </>
                    : null}
                {singlecustomer.workflow?.definitionKey !== "10015"
                    ? <>
                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.dataChecks !== undefined
                            ? singlecustomer.capabilities.dataChecks.map((ids) => {
                                return (
                                    <>
                                        <div className={idCheck
                                            ? "id-check active"
                                            : 'id-check'}>
                                            <div className={'id-check-tab'}>
                                                <button onClick={handleDocCheck}>
                                                    {ids && ids.decision && ids.decision.type !== undefined
                                                        ? ids.decision.type == "PASSED"
                                                            ? <span>{verifiedicon}</span>
                                                            : ids.decision.type == "WARNING"
                                                                ? <span className='warning-icon'><BsExclamationCircleFill /></span>
                                                                : <span className='user-notverified-main'>{notverified}</span>
                                                        : null}
                                                    ID Doc Check</button>
                                            </div>
                                            {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.imageChecks !== undefined
                                                ? singlecustomer.capabilities.imageChecks.map((imgchk) => {
                                                    return (
                                                        <>
                                                            {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.usability !== undefined
                                                                ? singlecustomer.capabilities.usability.map((usability) => {
                                                                    usbcondition++
                                                                    return (
                                                                        <>
                                                                            {idCheck
                                                                                ? <div className='id-doccheck-innerdata'>
                                                                                    <>
                                                                                        {usbcondition == 1 && ids && ids.decision && ids.decision.type !== undefined
                                                                                            ? ids.decision.type && imgchk && imgchk.decision && imgchk.decision.type !== undefined
                                                                                                ? imgchk.decision.type && usability && usability.decision && usability.decision.type !== undefined
                                                                                                    ? usability.decision.type == "PASSED"
                                                                                                        ? <>
                                                                                                            <div className='id-checkphoto-qal'>
                                                                                                                <h2>Document photo qualities</h2>
                                                                                                                <p>
                                                                                                                    {imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                        ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                        : <span className='user-notverified'>{notverified}</span>}
                                                                                                                    <span className='spanInsideWatchilist'>The document is supported for the check.</span>
                                                                                                                </p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal id-chk-fraud'>
                                                                                                                <h2>Fraud assessment</h2>
                                                                                                                <p>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document does match the expected document template.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The picture of the face is found blurred on the document.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Picture of the face on the document does not show signs of tampering or modification.</span></p>
                                                                                                                <p>
                                                                                                                    {validaData && validaData?.detailvalidaAppId !== undefined ?
                                                                                                                        <>
                                                                                                                            {validaData?.detailvalidaAppId[0]?.forged || validaData?.detailvalidaAppId[1]?.forged
                                                                                                                                ? <span className='user-notverified'>{notverified}</span>
                                                                                                                                : <span className='user-verified'>{verifiedicon}</span>}</> : null}<span className='spanInsideWatchilist'>Document does not show signs of digital tampering.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Fonts that used on a document are correct.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>No issues with security features found.</span></p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                                <h2>Consistency and validity of extracted data</h2>
                                                                                                                <p>{ids.decision.type == "PASSED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Data extracted from the document is consistent and valid.</span></p>
                                                                                                                <p>{ids.decision.type == "PASSED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}{ids?.decision?.details?.label}</p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                                <h2>Images Check</h2>
                                                                                                                <p>
                                                                                                                    <>
                                                                                                                        {imgchk.decision.type == "PASSED"
                                                                                                                            ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                            : imgchk.decision.type == "REJECTED"
                                                                                                                                ? <span className='user-notverified'>{notverified}</span>
                                                                                                                                : <span className='warning-icon'><BsExclamationCircleFill /></span>}{imgchk.decision.details.label}
                                                                                                                    </>
                                                                                                                </p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                                <h2>usability Check</h2>
                                                                                                                <p>{usability.decision.type == "PASSED"
                                                                                                                    ? <>
                                                                                                                        {usability.decision.type == "PASSED"
                                                                                                                            ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                            : usability.decision.type == "WARNING"
                                                                                                                                ? <span className='warning-icon'><BsExclamationCircleFill /></span>
                                                                                                                                : <span className='user-notverified'>{notverified}</span>}{usability.decision.details.label}
                                                                                                                    </>
                                                                                                                    : <><span className='user-notverified'>{notverified}</span>PRECONDITION_NOT_FULFILLED</>}

                                                                                                                </p>
                                                                                                            </div>
                                                                                                            {/* <div className='id-checkphoto-qal validations-data'>
                                                                                                                <h2>Document Authentications</h2>
                                                                                                                <div>{ValidaComponent}</div>
                                                                                                            </div> */}
                                                                                                        </>
                                                                                                        : <>
                                                                                                            <div className='id-checkphoto-qal'>
                                                                                                                <h2>Document photo qualities</h2>
                                                                                                                <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document is supported for the check.</span></p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal id-chk-fraud'>
                                                                                                                <h2>Fraud assessment</h2>
                                                                                                                <p>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The document does match the expected document templates.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>The picture of the face is found blurred on the document.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Picture of the face on the document does not show signs of tampering or modification.</span></p>
                                                                                                                <p>
                                                                                                                    {validaData && validaData?.detailvalidaAppId !== undefined ?
                                                                                                                        <>
                                                                                                                            {validaData?.detailvalidaAppId[0]?.forged || validaData?.detailvalidaAppId[1]?.forged
                                                                                                                                ? <span className='user-notverified'>{notverified}</span>
                                                                                                                                : <span className='user-verified'>{verifiedicon}</span>}</> : null}<span className='spanInsideWatchilist'>Document does not show signs of digital tampering.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Fonts that used on a document are correct.</span></p>
                                                                                                                <p>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>No issues with security features found.</span></p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                                <h2>Consistency and validity of extracted data</h2>
                                                                                                                <p>{ids.decision.type == "PASSED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}<span className='spanInsideWatchilist'>Data extracted from the document is consistent and valid.</span></p>
                                                                                                                <p>{ids.decision.type == "PASSED"
                                                                                                                    ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                    : <span className='user-notverified'>{notverified}</span>}{ids?.decision?.details?.label}</p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                                <h2>Images Check</h2>
                                                                                                                <p>
                                                                                                                    <>
                                                                                                                        {imgchk.decision.type == "PASSED"
                                                                                                                            ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                            : imgchk.decision.type == "REJECTED"
                                                                                                                                ? <span className='user-notverified'>{notverified}</span>
                                                                                                                                : <span className='warning-icon'><BsExclamationCircleFill /></span>}{imgchk.decision.details.label}
                                                                                                                    </>
                                                                                                                </p>
                                                                                                            </div>
                                                                                                            <div className='id-checkphoto-qal idchk-consistency-check'>
                                                                                                                <h2>Usability Check</h2>
                                                                                                                <p>{usability.decision.type == "PASSED"
                                                                                                                    ? <>
                                                                                                                        {usability.decision.type == "PASSED"
                                                                                                                            ? <span className='user-verified'>{verifiedicon}</span>
                                                                                                                            : usability.decision.type == "WARNING"
                                                                                                                                ? <span className='warning-icon'><BsExclamationCircleFill /></span>
                                                                                                                                : <span className='user-notverified'>{notverified}</span>}{usability.decision.details.label}
                                                                                                                    </>
                                                                                                                    : <><span className='user-notverified'>{notverified}</span>PRECONDITION_NOT_FULFILLED</>}
                                                                                                                </p>
                                                                                                            </div>
                                                                                                            {/* <div className='id-checkphoto-qal validations-data'>
                                                                                                                <h2>Document Authentications</h2>
                                                                                                                <div>{ValidaComponent}</div>
                                                                                                            </div> */}
                                                                                                        </>
                                                                                                    : null
                                                                                                : null
                                                                                            : null
                                                                                        }</>
                                                                                </div>
                                                                                : null}
                                                                        </>)
                                                                })
                                                                : null}
                                                        </>)
                                                }) : null}
                                        </div></>)
                            }) : null}
                    </> : null}
                {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.similarity !== undefined
                    ? singlecustomer.capabilities.similarity.map((similar) => {
                        return (
                            <>
                                <div className={similarity
                                    ? "id-check active"
                                    : 'id-check'}>
                                    <div className={'similarit-check'}>
                                        <button onClick={handleFaceCheck}>
                                            {similar?.decision?.type == "PASSED"
                                                ? <span>{verifiedicon}</span>
                                                : <span className='user-notverified-main'>{notverified}</span>}
                                            Facial Similarity</button>
                                    </div>
                                    <div className='id-doccheck-innerdata'>
                                        {similarity && singlecustomer.workflow.definitionKey !== "10015"
                                            ? <>
                                                {similar?.decision?.type == "PASSED"
                                                    ? <>
                                                        {/* <p>Faces are similar Level of confidence is 95%</p> */}
                                                        <div className=" id-checkphoto-qal face-check-inner-data">
                                                            <h2>Selfie provided</h2>
                                                            <p>{verifiedicon}One face at photo.</p>
                                                            <p>{verifiedicon}This is a selfie.</p>
                                                        </div>
                                                    </>
                                                    : <>
                                                        {/* <p>ttt</p> */}
                                                        <div className="id-checkphoto-qal id-doccheck-innerdata">
                                                            <h2>Selfie provided</h2>
                                                            <p><span className='user-notverified'>{notverified}</span>{' '}{similar?.decision?.details?.label}</p>
                                                            <p>{verifiedicon}One face at photo.</p>
                                                            <p>{verifiedicon}This is a selfie.</p>
                                                        </div>
                                                    </>}</>
                                            : null}
                                    </div>
                                </div></>)
                    }) : null}
                {singlecustomer && singlecustomer.workflow && singlecustomer.workflow.definitionKey !== undefined
                    ? singlecustomer.workflow.definitionKey !== "10011"
                        ? <>
                            <div className={amlCheck
                                ? 'id-check active'
                                : "id-check"}>
                                <div className={'liveness-chk'}>
                                    <button onClick={handleAmlCheck}>
                                        {watchlistData !== null && watchlistData !== []
                                            ? <>{watchlistData && watchlistData.decision && watchlistData.decision.type !== undefined
                                                ? watchlistData.decision.type == "PASSED"
                                                    ? <span>{verifiedicon}</span>
                                                    : watchlistData.decision.type == "WARNING"
                                                        ? <span className='warning-icon aml-check'><BsExclamationCircleFill /></span>
                                                        : <span className='user-notverified-main'>{notverified}</span>
                                                : null}</>
                                            : null}
                                        AML Watchlist</button>
                                </div>
                                <div className='id-doccheck-innerdata'>
                                    <>
                                        {amlCheck
                                            ? <>
                                                {watchlistData !== null && watchlistData !== []
                                                    ? <>
                                                        <div className='screening-section-main'>
                                                            <div className='shadow-mail'>
                                                                <div className='summary-heading'>
                                                                    <h2>Summary</h2>
                                                                </div>
                                                                <div className='summary-section-main'>
                                                                    <div className='accountid'>
                                                                        <span>Account id</span>
                                                                        <span onClick={() => handlecoppy(watchlistData.account.id)}>{watchlistData?.account.id}{'   '}<MdOutlineContentCopy /></span>
                                                                    </div>
                                                                    <div className='risk-score-section'>
                                                                        {watchlistData?.decision?.risk?.score == 50
                                                                            ? <img src={Warning.src} />
                                                                            : watchlistData?.decision?.risk?.score == 100
                                                                                ? <img src={Reject.src} />
                                                                                : watchlistData?.decision?.risk?.score == 0
                                                                                    ? <img src={Success.src} />
                                                                                    : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {watchlistData?.capabilities?.watchlistScreening.map((watch) => {
                                                                let date = watch?.data?.searchDate.slice(0, 10)
                                                                let time = watch?.data?.searchDate.slice(11, 16)
                                                                let datetime = `${date} ${time}`
                                                                return (
                                                                    <>
                                                                        <div className='shadow-mail'>
                                                                            <div className='screening-heading'>
                                                                                <h2>Screening</h2>
                                                                            </div>
                                                                            <div className='details-section'>
                                                                                <div className='detail-section-left'>
                                                                                    <div className='detail-status'>
                                                                                        <span>Status</span>
                                                                                        <span>{watch?.data?.searchStatus}</span>
                                                                                    </div>
                                                                                    <div className='detail-status detail-result-url'>
                                                                                        <span>Result URL</span>
                                                                                        <Link href={watch && watch.data && watch.data.searchResultUrl !== undefined
                                                                                            ? watch.data.searchResultUrl
                                                                                            : "#"}><a>Open CA Case</a></Link>
                                                                                    </div>
                                                                                    <div className='detail-status search-date'>
                                                                                        <span>Search Date</span>
                                                                                        <span>{datetime}</span>
                                                                                    </div>
                                                                                    <div className='detail-status search-refrence'>
                                                                                        <span>Search Reference</span>
                                                                                        <span>{watch?.data?.searchReference}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='detail-status detail-section-right'>
                                                                                    <div className='vendor-data'>
                                                                                        <span>Count Of Results</span>
                                                                                        <span>{watch?.data?.searchResults}</span>
                                                                                    </div>
                                                                                    <div className='detail-status search-id'>
                                                                                        <span>Search ID</span>
                                                                                        <span>{watch?.data?.searchId}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}
                                                            <div className='transaction-metadata-main'>
                                                                <div className='shadow-mail'>
                                                                    <div className='transaction-heading'>
                                                                        <h2>Transaction Metadata</h2>
                                                                    </div>
                                                                    <div className='transaction-media-detail-main'>
                                                                        <div className='transaction-media-left'>
                                                                            <div className='customer-interface'>
                                                                                <span>Customer Internal Reference</span>
                                                                                <span>{watchlistData?.workflow?.customerInternalReference}</span>
                                                                            </div>
                                                                            <div className='customer-interface user-interface'>
                                                                                <span>User Reference</span>
                                                                                <span>---</span>
                                                                            </div>
                                                                            <div className='customer-interface reporting-criteria'>
                                                                                <span>Reporting Criteria</span>
                                                                                <span>---</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='transaction-media-right'>
                                                                            <div className='customer-interface initated-at'>
                                                                                <span>Initiated At</span>
                                                                                <span>{initatedatetime}</span>
                                                                            </div>
                                                                            <div className='customer-interface started-at'>
                                                                                <span>Started At</span>
                                                                                <span>{startDateTime}</span>
                                                                            </div>
                                                                            <div className='customer-interface completed-at'>
                                                                                <span>Completed At</span>
                                                                                <span>{completeDateTime}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </>
                                                    : <h2>No data avilable</h2>}
                                            </>
                                            : null}
                                    </>
                                </div>
                            </div>
                        </> : null
                    : null}
                {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.liveness !== undefined ? singlecustomer.capabilities.liveness.map((live) => {
                    return (
                        <>
                            <div className={liveness
                                ? 'id-check active'
                                : "id-check"}>
                                <div className={'liveness-chk'}>
                                    <button onClick={handlelivnessCheck}>
                                        {live?.decision?.type == "PASSED"
                                            ? <span>{verifiedicon}</span>
                                            : <span className='user-notverified-main'>{notverified}</span>}
                                        Liveness Check</button>
                                </div>
                                <div className='id-doccheck-innerdata'>
                                    {liveness && singlecustomer.workflow.definitionKey !== "10015"
                                        ? <>
                                            {live?.decision?.type == "PASSED"
                                                ? <>
                                                    {/* <p>Liveness check passed</p> */}
                                                    <div className='id-checkphoto-qal live-check-inner'>
                                                        <h2>Identity check in live mode</h2>
                                                        <p>{verifiedicon}Liveness service signature match</p>
                                                        <p>{live?.decision?.type == "PASSED"
                                                            ? <span className='user-verified'>{verifiedicon}</span>
                                                            : <span className='user-notverified'>{notverified}</span>}Liveness check passed</p>
                                                    </div>
                                                </>
                                                : <>
                                                    {/* <p>Liveness check failed</p> */}
                                                    <div className='id-checkphoto-qal live-check-inner'>
                                                        <h2>Identity check in live mode</h2>
                                                        <p><span className='user-notverified'>{notverified}</span>{' '}{live?.decision?.details?.label}</p>
                                                        <p>{verifiedicon}Liveness service signature match</p>
                                                        <p>{live?.decision?.type == "PASSED"
                                                            ? <span className='user-verified'>{verifiedicon}</span>
                                                            : <span className='user-notverified'>{notverified}</span>}Liveness check passed</p>
                                                    </div>
                                                </>
                                            }</>
                                        : null}
                                </div>
                            </div></>)
                }) : null}
                <SocialMedia
                    singlecustomer={singlecustomer}
                    setMetaData={setMetaData}
                    setIdCheck={setIdCheck}
                    setSimilaity={setSimilaity}
                    setLiveness={setLiveness}
                    MetaData={MetaData}
                    socialdata={socialdata}
                    setSocialData={setSocialData}
                    setAmlCheck={setAmlCheck}
                />
            </div>}
        </>
    )
}
export default WatchlistData