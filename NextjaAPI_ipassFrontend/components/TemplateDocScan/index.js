/* eslint-disable */
import React, { useEffect, useState } from 'react'
import ScanHeader from "../ScanDocument/ScanHeader"
import LeftCenterSection from './LeftCenterSection'
import RightSection from './RightSection'
import Cookies from 'js-cookie';
import axios from 'axios';
import { LIVE_URL } from "../../Hooks/envConst"
import LoadingIcons from 'react-loading-icons';
import { checkLogin } from '../../Hooks/checkLogin';
import { useRouter } from 'next/router';

function TemplateDocScan() {
    useEffect(()=>{
        getAllFormData()
    },[])
    const base64Email = Cookies.get('email');
    const token = Cookies.get('token');
    const [currentImgData, setCurrentImgData] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const history = useRouter();

    useEffect(() => {
        const eml = checkLogin(token, base64Email)
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
    function getAllFormData() {
        setLoading(true)
        axios.get(`${LIVE_URL}/api/v1/get/all/document/data?email=${base64Email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {
            setApiData(response?.data?.formrecdata)
            if (apiData !== []) {
                setLoading(false)
            }
        })
    }
    return (
        <>
            <ScanHeader />
            <div className="mainSection">
                <LeftCenterSection
                dataFromDatabase={apiData}
                currentImgData={currentImgData}
                setCurrentImgData={setCurrentImgData}
                email={base64Email}
                getAllFormData={getAllFormData}
                 />
                <RightSection 
                    currentImgData={currentImgData}
                />
                {loading
                    ? <div className="loading-request">
                        <div className="loader-svg">
                            <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" />
                        </div>
                    </div>
                    : null}
            </div>

        </>

    )
}

export default TemplateDocScan