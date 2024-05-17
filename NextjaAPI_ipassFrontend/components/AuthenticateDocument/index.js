/* eslint-disable */
import React, { useState, useEffect } from 'react'
import ScanHeader from '../ScanDocument/ScanHeader'
import Leftcentersection from './Leftcentersection'
import RightSection from "./Rightsection";
import Cookies from 'js-cookie';
import axios from "axios";
import { LIVE_URL } from "../../Hooks/envConst";
import LoadingIcons from 'react-loading-icons'
import { checkLogin } from "../../Hooks/checkLogin"
import { useRouter } from 'next/router';

function AuthenticateDocument() {
    const [currentImgData, setCurrentImgData] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [validityResponse, setValidityResponse] = useState(null);
    const [loading, setLoading] = useState(false)
    const [showDocInCenter, setShowDocInCenter] = useState(false)
    const [imageInCenter, setImageInCenter] = useState(null);
    const [normalPDF, setNormalPDF] = useState(null);
    const [mappedPDF, setMappedPDF] = useState(null);
    const [email, setEmail] = useState()
    const history = useRouter();

    useEffect(() => {
        // console.log("apiData",apiData);
        const base64Email = Cookies.get('email');
        const token = Cookies.get('token');
        const eml = checkLogin(token, base64Email);
        if (eml) {
            setEmail(eml)
            getAllFormData(eml);
        }
        else {
            Cookies.remove('token');
            Cookies.remove('email');
            history.push('/')
        }
    }, [])

    function getAllFormData(email) {
        setLoading(true)
        axios.get(`${LIVE_URL}/api/v1/ipass/document/allData?email=${email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {
            setApiData(response?.data?.validadata)
            if (apiData !== []) {
                setLoading(false)
            }
        })
    }

    function getCurrentValidaData(dataId) {
        if (dataId !== undefined) {
            axios.get(`${LIVE_URL}/api/v1/ipass/document/get/validitydata/${dataId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors',
            }).then((response) => {
                setValidityResponse(response?.data?.validadata);
            })
        }
    }

    return (
        <>
            <ScanHeader />
            <div className="mainSection">
                <Leftcentersection
                    dataFromDatabase={apiData}
                    email={email}
                    getAllFormData={getAllFormData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    getCurrentValidaData={getCurrentValidaData}
                    showDocInCenter={showDocInCenter}
                    setImageInCenter={setImageInCenter}
                    imageInCenter={imageInCenter}
                    setCurrentImgData={setCurrentImgData}
                    currentImgData={currentImgData}
                    normalPDF={normalPDF}
                    mappedPDF={mappedPDF}
                />
                <RightSection
                    currentImgData={currentImgData}
                    pageNumber={pageNumber}
                    validityResponse={validityResponse}
                    showDocInCenter={showDocInCenter}
                    setShowDocInCenter={setShowDocInCenter}
                    setImageInCenter={setImageInCenter}
                    imageInCenter={imageInCenter}
                    setPageNumber={setPageNumber}
                    setMappedPDF={setMappedPDF}
                    setNormalPDF={setNormalPDF}
                />
                {loading ?
                    <div className="loading-request">
                        <div className="loader-svg">
                            <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
                    </div>
                    : null}
            </div>
        </>
    )
}

export default AuthenticateDocument
