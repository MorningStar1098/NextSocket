/* eslint-disable */
import LeftCenterSection from "./LeftCenterSection";
import ScanHeader from "./ScanHeader";
import RightSection from "./RightSection";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { LIVE_URL } from "../../Hooks/envConst";
import LoadingIcons from 'react-loading-icons';
import { checkLogin } from "../../Hooks/checkLogin";
import { useRouter } from "next/router";

const ScanDocument = () => {
    const [currentImgData, setCurrentImgData] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const base64Email = Cookies.get('email');
    const token = Cookies.get('token');
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const history = useRouter();
    const docTypeObj = {
        printed: "printed", handwritten: "handwritten"
    }

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

    function getAllFormData(email) {
        setLoading(true)
        axios.get(`${LIVE_URL}/api/v1/ipass/getdata/form?email=${email}`, {
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
                    email={email}
                    getAllFormData={getAllFormData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setCurrentImgData={setCurrentImgData}
                    currentImgData={currentImgData}
                    docTypeObj={docTypeObj}
                />
                <RightSection
                    currentImgData={currentImgData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    docTypeObj={docTypeObj}
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
export default ScanDocument;