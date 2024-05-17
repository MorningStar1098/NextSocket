/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { LIVE_URL } from '../../Hooks/envConst'
import axios from 'axios';
import { GrFormClose } from 'react-icons/gr'
import { GetOcrData } from '../PdfComponent/PdfComponentData'
import { TiTick } from 'react-icons/ti'
import moment from 'moment-hijri';
import { ShimmerCategoryList } from 'react-shimmer-effects';

function OcrData(props) {
    const { singlecustomer, testOcrFunc } = props
    const notverified = <GrFormClose />
    const [ocrData, setOcrData] = useState([])
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        if (singlecustomer && singlecustomer.account && singlecustomer.account.id !== undefined) {
            setLoading(true)
            setTimeout(() => {
                handleOcrResponse(singlecustomer?.account?.id)
            }, 2000)

        }

    }, [])

    function handleOcrResponse(similarid) {
        axios.get(`${LIVE_URL}/api/v1/getuser/ocr/data/${similarid}`, {
        }).then((response) => {
            let resp = response && response.data && response.data.data !== undefined ? response.data.data : null
            setOcrData(resp)
            testOcrFunc(resp)
            if(resp !== null){
            setLoading(false)
            }
            if (resp == null) {
                setTimeout(() => {
                    handleOcrResponse(similarid)
                }, 2000)
            }
        })
    }
    GetOcrData(singlecustomer, ocrData)

    function convertToGregorianDate(islamicDate) {
        var convertedDate = islamicDate?.toString().replace(/٠/g, '0').replace(/١/g, '1').replace(/٢/g, '2').replace(/٣/g, '3').replace(/٤/g, '4').replace(/٥/g, '5').replace(/٦/g, '6').replace(/٧/g, '7').replace(/٨/g, '8').replace(/٩/g, '9');
        var daet = moment(convertedDate).format('YYYY/DD/MM')
        console.log("dd",daet);
        const gregorian = moment(daet, 'iYYYY/iDD/iMM').format('DD/MM/YYYY');
        return gregorian; 
    }
    const getgrego = (props) => {
        let current = new Date().toLocaleDateString('en-us')
        if (props > current) {
            return false;
        }
        else if (props < current) {
            return true;
        }
        else {
            return true;
        }
    }

    return (
        <>
{loading?<ShimmerCategoryList/>:
<>
            {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.extraction !== undefined
                ? singlecustomer.capabilities.extraction.map((data) => {
                    return (
                        <>
                            {/* Jordan */}
                            {data?.data?.type == "ID_CARD"
                                ? <>
                                    {ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined
                                        ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                            return (
                                                <>
                                                    {ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined
                                                        ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                            const ocrData = ocrApiData && ocrApiData.fields !== undefined
                                                                ? ocrApiData.fields
                                                                : null
                                                            const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined
                                                                ? ocrApiBackData.fields
                                                                : null
                                                            {/*zFor id card  */ }
                                                            const idFnameArr = ocrData["First Name AR"]?.content
                                                            const idSecnameArr = ocrData["Father Name AR"]?.content
                                                            const idthrdnameArr = ocrData["Grand Father Name"]?.content
                                                            const idfourthnameArr = ocrData["Family Name AR"]?.content
                                                            const idBirthDat = ocrData["Date of Birth"]?.content
                                                            const idbirthplaceArr = ocrData["Place of Birth AR"]?.content
                                                            const idMothernameArr = ocrData["Mother Name AR"]?.content
                                                            {/* const idsexarr=ocrData["Gender"]?.content */ }
                                                            const idgenderArr = ocrData["Gender AR"]?.content
                                                            const idNo = ocrData["National Number"]?.content
                                                            const idExpDat = ocrData1["Date of Expiry"]?.content
                                                            const idIssNo = ocrData1["Registration Number"]?.content
                                                            const idPlace = ocrData1["Registration Place AR"]?.content
                                                            const idIssueplace = ocrData1["Place of Issuance"]?.content
                                                            const idResLoc = ocrData1["Residence Location"]?.content

                                                            return (
                                                                <>
                                                                    {data?.data?.issuingCountry == "JOR" ?
                                                                        <div className='id-check-lower-main'>
                                                                            <table>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Forms</th>
                                                                                        <th>Visual</th>
                                                                                        <th>Valid</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <>
                                                                                    <tbody>

                                                                                        <tr>
                                                                                            <td>First Name</td>


                                                                                            <td>
                                                                                                <span>{idFnameArr}</span>
                                                                                            </td>
                                                                                            <td>{idFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Father Name</td>


                                                                                            <td>
                                                                                                <span>{idSecnameArr}</span>
                                                                                            </td>
                                                                                            <td>{idSecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>GrandFather Name</td>


                                                                                            <td>
                                                                                                <span>{idthrdnameArr}</span>
                                                                                            </td>
                                                                                            <td>{idthrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Last Name</td>

                                                                                            <td>
                                                                                                <span>{idfourthnameArr}</span>
                                                                                            </td>
                                                                                            <td>{idfourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Mothers Name</td>
                                                                                            <td>
                                                                                                <span>{idMothernameArr !== undefined ? idMothernameArr : null}</span>
                                                                                            </td>
                                                                                            <td>{idMothernameArr !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>date of birth</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                            </td>
                                                                                            <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Place of birth</td>

                                                                                            <td>
                                                                                                <span>{idbirthplaceArr}</span>
                                                                                            </td>
                                                                                            <td>{idbirthplaceArr !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Gender</td>

                                                                                            <td>
                                                                                                <span>{idgenderArr == "/ M" ? "ذكر" : idgenderArr == "F" ? "أنثى" : idgenderArr}</span>
                                                                                            </td>
                                                                                            <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>document type</td>

                                                                                            <td>
                                                                                                <span>{data?.data?.type == "ID_CARD" ? "بطاقة التعريف" : null}</span>
                                                                                            </td>
                                                                                            <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>document number</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                                            </td>
                                                                                            <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>National Number</td>
                                                                                            <td><span>{idNo !== undefined ? idNo : null}</span></td>
                                                                                            <td>{idNo !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        {/* <tr>
                                                                                <td>document sub type</td>

                                                                                <td>
                                                                                    <span>{data?.data?.type == "ID_CARD" ? "بطاقة التعريف" : null}</span>
                                                                                </td>
                                                                                <td>{data && data.data && data.data.subType !== undefined ? <TiTick /> : null}</td>
                                                                            </tr> */}
                                                                                        <tr>
                                                                                            <td>Issuance Number</td>

                                                                                            <td>
                                                                                                <span>{idIssNo}</span>
                                                                                            </td>
                                                                                            <td>{idIssNo !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>Issuance Place</td>

                                                                                            <td>
                                                                                                <span>{idPlace}</span>
                                                                                            </td>
                                                                                            <td>{idPlace !== undefined ? <TiTick /> : null}</td>
                                                                                        </tr>
                                                                                        {/* <tr>
                                                                                <td>Place</td>

                                                                                <td>
                                                                                    <span>{idPlace}</span>
                                                                                </td>
                                                                                <td>{idPlace !== undefined ? <TiTick /> : null}</td>
                                                                            </tr> */}
                                                                                        {data && data.data && data.data.expiryDate ?
                                                                                            <>
                                                                                                {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                                    return (
                                                                                                        <tr>
                                                                                                            <td>Expiry Date</td>
                                                                                                            {/* <td></td> */}
                                                                                                            <td>
                                                                                                                <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                            </td>
                                                                                                            <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                                ? <TiTick />
                                                                                                                : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                                        </tr>
                                                                                                    )
                                                                                                })}

                                                                                            </>
                                                                                            : null}
                                                                                        {idResLoc !== undefined ?
                                                                                            <tr>
                                                                                                <td>Residence</td>

                                                                                                <td>
                                                                                                    <span>{idResLoc}</span>
                                                                                                </td>
                                                                                                <td>{idResLoc !== undefined ? <TiTick /> : null}</td>
                                                                                            </tr> : null}
                                                                                    </tbody>
                                                                                </>
                                                                            </table>
                                                                            {/* DRIVING_LICENSE */}
                                                                        </div>

                                                                        : null}
                                                                </>
                                                            )
                                                        }) : null}
                                                </>

                                            )
                                        }) : null}
                                </>
                                /* passssss */
                                : data?.data?.type == "PASSPORT" ?
                                    <>
                                        {data?.data?.issuingCountry == "JOR" ?
                                            <>
                                                {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                    const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                    {/* For Passport */ }
                                                    const fnameAr = ocrDataPass["First Name AR"]?.content
                                                    const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                                    const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                                    const fourthnameArr = ocrDataPass["Family Name AR"]?.content
                                                    const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                                    const genderArr = ocrDataPass["Gender AR"]?.content
                                                    const passNo = ocrDataPass["Passport No"]?.content
                                                    const passAuth = ocrDataPass["Authority AR"]?.content
                                                    const passMothernameArr = ocrDataPass["Mother Name AR"]?.content

                                                    return (
                                                        <>
                                                            <div className='id-check-lower-main two-tbl'>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Forms</th>
                                                                            <th>Visual</th>
                                                                            <th>Valid</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <>
                                                                        <tbody>

                                                                            <tr>
                                                                                <td>First Name</td>
                                                                                <td>
                                                                                    <span>{fnameAr}</span>
                                                                                </td>
                                                                                <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Father Name</td>


                                                                                <td>
                                                                                    <span>{SecnameArr}</span>
                                                                                </td>
                                                                                <td>{SecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>GrandFather Name</td>


                                                                                <td>
                                                                                    <span>{thrdnameArr}</span>
                                                                                </td>
                                                                                <td>{thrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Last Name</td>

                                                                                <td>
                                                                                    <span>{fourthnameArr}</span>
                                                                                </td>
                                                                                <td>{fourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td>date of birth</td>
                                                                                <td>
                                                                                    <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                </td>
                                                                                <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Mothers Name</td>
                                                                                <td>
                                                                                    <span>{passMothernameArr}</span>
                                                                                </td>
                                                                                <td>{passMothernameArr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Place of birth</td>

                                                                                <td>
                                                                                    <span>{birthplaceArr}</span>
                                                                                </td>
                                                                                <td>{birthplaceArr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Gender</td>

                                                                                <td>
                                                                                    <span>{genderArr == "M" ? "الذكر" : genderArr}</span>
                                                                                </td>
                                                                                <td>{genderArr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>document type</td>

                                                                                <td>
                                                                                    <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                                </td>
                                                                                <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>document number</td>
                                                                                <td>
                                                                                    <span>{passNo}</span>
                                                                                </td>
                                                                                <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            {/* <tr>
                                                                            <td>document sub type</td>

                                                                            <td>
                                                                                <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.subType !== undefined ? <TiTick /> : null}</td>
                                                                        </tr> */}

                                                                            {data && data.data && data.data.expiryDate ?
                                                                                <>
                                                                                    {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td>Expiry Date</td>
                                                                                                <td>
                                                                                                    <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                </td>
                                                                                                <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                    ? <TiTick />
                                                                                                    : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    })}
                                                                                </>
                                                                                : null}

                                                                            <tr>
                                                                                <td>Authority</td>

                                                                                <td>
                                                                                    <span>{passAuth}</span>
                                                                                </td>
                                                                                <td>{<TiTick />}</td>
                                                                            </tr>

                                                                        </tbody>
                                                                    </>
                                                                </table>
                                                            </div>
                                                        </>
                                                    )

                                                }) : null}
                                            </>
                                            : null}
                                    </> :
                                    /* drivlic */
                                    data?.data?.type == "DRIVING_LICENSE" ?
                                        <>
                                            {data?.data?.issuingCountry == "JOR" ?
                                                <>
                                                    {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                                        ? ocrData.analyzeResult.documents.map((ocrApiDataDriv) => {
                                                            const ocrDataDriv = ocrApiDataDriv && ocrApiDataDriv.fields !== undefined ? ocrApiDataDriv.fields : null
                                                            const drivFnameArr = ocrDataDriv["First Name AR"]?.content
                                                            const drivSecnameArr = ocrDataDriv["Second Name AR"]?.content
                                                            const drivThirdnameArr = ocrDataDriv["Third Name AR"]?.content
                                                            const drivFourthnameArr = ocrDataDriv["Family Name AR"]?.content
                                                            const drivBlodType = ocrDataDriv["Blood Type"]?.content
                                                            const drivCenter = ocrDataDriv["License center AR"]?.content
                                                            const drivNationality = ocrDataDriv["Nationality AR"]?.content
                                                            const drivAddress = ocrDataDriv["Address AR"]?.content
                                                            return (
                                                                <>
                                                                    <div className='id-check-lower-main two-tbl'>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Forms</th>
                                                                                    <th>Visual</th>
                                                                                    <th>Valid</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <>
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>First Name</td>
                                                                                        <td>
                                                                                            <span>{drivFnameArr}</span>
                                                                                        </td>
                                                                                        <td>{drivFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Father Name</td>


                                                                                        <td>
                                                                                            <span>{drivSecnameArr}</span>
                                                                                        </td>
                                                                                        <td>{drivSecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>GrandFather Name</td>


                                                                                        <td>
                                                                                            <span>{drivThirdnameArr}</span>
                                                                                        </td>
                                                                                        <td>{drivThirdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Last Name</td>

                                                                                        <td>
                                                                                            <span>{drivFourthnameArr}</span>
                                                                                        </td>
                                                                                        <td>{drivFourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td>Blood Type</td>
                                                                                        <td>
                                                                                            <span>{drivBlodType}</span>
                                                                                        </td>
                                                                                        <td>{drivBlodType !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>License Center</td>
                                                                                        <td>
                                                                                            <span>{drivCenter}</span>
                                                                                        </td>
                                                                                        <td>{drivCenter !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Nationality</td>

                                                                                        <td>
                                                                                            <span>{drivNationality}</span>
                                                                                        </td>
                                                                                        <td>{drivNationality !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Address</td>

                                                                                        <td>
                                                                                            <span>{drivAddress}</span>
                                                                                        </td>
                                                                                        <td>{drivAddress !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document type</td>

                                                                                        <td>
                                                                                            <span>{data?.data?.type == "DRIVING_LICENSE" ? "رخصة قيادة" : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    {/* <tr>
                                                                            <td>document number</td>
                                                                            <td>
                                                                                <span>{passNo}</span>
                                                                            </td>
                                                                            <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                        </tr> */}
                                                                                    {/* <tr>
                                                                                <td>document sub type</td>

                                                                                <td>
                                                                                    <span>{data?.data?.type == "DRIVING_LICENSE" ? "رخصة قيادة" : null}</span>
                                                                                </td>
                                                                                <td>{data && data.data && data.data.subType !== undefined ? <TiTick /> : null}</td>
                                                                            </tr> */}

                                                                                    {/* {data && data.data && data.data.expiryDate ?
                                                                            <>
                                                                                {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>Expiry Date</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                            </td>
                                                                                            <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT" ? <TiTick /> : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                            : null} */}

                                                                                    {/* <tr>
                                                                            <td>Authority</td>

                                                                            <td>
                                                                                <span>{passAuth}</span>
                                                                            </td>
                                                                            <td>{<TiTick />}</td>
                                                                        </tr> */}

                                                                                </tbody>
                                                                            </>
                                                                        </table>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : null}
                                                </>
                                                : null}
                                        </>
                                        /* =====end */
                                        : null}
                            {/* Jordan */}

                            {/* Israel */}
                            {data?.data?.type == "ID_CARD" ?
                                <>
                                    {data?.data?.issuingCountry == "ISR" ?
                                        <>
                                            <div className='id-check-lower-main two-tbl'>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Forms</th>
                                                            <th>Visual</th>
                                                            <th>Valid</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>First Name</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[0] !== undefined ? ocrData[0].firstName : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[0] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Father Name</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].fatherName : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>grandfather name</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].grandFatherName : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Last Name</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[0] !== undefined ? ocrData[0].lastName : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[0] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>mother name</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].motherName : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Place of Birth </td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].placeOfBirth : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gender </td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].gender : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Date of birth</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[0] !== undefined ? ocrData[0].dateOfBirth : null}</span>
                                                            </td>
                                                            <td> {ocrData && ocrData[0] !== undefined ? <TiTick /> : null} </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Place of Birth</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].placeOfBirth : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Date of issue</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[0] !== undefined ? ocrData[0].dateOfIssue : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[0] !== undefined ? <TiTick /> : null} </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Valid until</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[0] !== undefined ? ocrData[0].validUntil : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[0] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ID number</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].cardNumber : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>status</td>
                                                            <td>
                                                                <span>{ocrData && ocrData[1] !== undefined ? ocrData[1].status : null}</span>
                                                            </td>
                                                            <td>{ocrData && ocrData[1] !== undefined ? <TiTick /> : null}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>

                                        : null}
                                </>
                                : data?.data?.type == "PASSPORT" ?
                                    <>
                                        {data?.data?.issuingCountry == "ISR" ?
                                            <>
                                                <div className='id-check-lower-main two-tbl'>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Forms</th>
                                                                <th>Visual</th>
                                                                <th>Valid</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>First Name</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.firstName !== undefined ? ocrData.firstName : null}</span>
                                                                </td>
                                                                <td>{ocrData && ocrData.firstName !== undefined ? <TiTick /> : null}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Name</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.lastName !== undefined ? ocrData.lastName : null}</span>
                                                                </td>
                                                                <td>{ocrData && ocrData.lastName !== undefined ? <TiTick /> : null}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date of issue</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.dateOfIssue !== undefined ? ocrData.dateOfIssue : null}</span>
                                                                </td>
                                                                <td>{ocrData && ocrData.dateOfIssue !== undefined ? <TiTick /> : null}</td>
                                                            </tr>
                                                            {data && data.data && data.data.expiryDate ?
                                                                <>
                                                                    {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>Expiry Date</td>
                                                                                <td>
                                                                                    <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                </td>
                                                                                <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                    ? <TiTick />
                                                                                    : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                            </tr>
                                                                        )
                                                                    })}

                                                                </>
                                                                : null}
                                                            <tr>
                                                                <td>Date of birth</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.dateOfBirth !== undefined ? ocrData.dateOfBirth : null}</span>
                                                                </td>
                                                                <td>{ocrData && ocrData.dateOfBirth !== undefined ? <TiTick /> : null} </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Place of birth</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.placeOfBirth !== undefined ? ocrData.placeOfBirth : null}</span>
                                                                </td>
                                                                <td>{ocrData && ocrData.placeOfBirth !== undefined ? <TiTick /> : null}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Passport No.</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.passportNumber !== undefined ? ocrData.passportNumber : null}</span>
                                                                </td>
                                                                <td> {ocrData && ocrData.passportNumber !== undefined ? <TiTick /> : null} </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nationality</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.nationality !== undefined ? ocrData.nationality : null}</span>
                                                                </td>
                                                                <td>{ocrData && ocrData.nationality !== undefined ? <TiTick /> : null} </td>
                                                            </tr>
                                                            <tr>
                                                                <td>ID number</td>
                                                                <td>
                                                                    <span>{ocrData && ocrData.idNumber !== undefined ? ocrData.idNumber : null}</span>
                                                                </td>
                                                                <td> {ocrData && ocrData.idNumber !== undefined ? <TiTick /> : null} </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                            : null}
                                    </>
                                    : null}
                            {/* Israel */}

                            {/* Bahrin */}
                            {data?.data?.type == "PASSPORT" ?
                                <>
                                    {data?.data?.issuingCountry == "BHR" ?
                                        <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                {/* For Passport */ }
                                                const fnameAr = ocrDataPass["First Name AR"]?.content
                                                const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                                const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                                const fourthnameArr = ocrDataPass["Family Name AR"]?.content
                                                const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                                const genderArr = ocrDataPass["Gender AR"]?.content
                                                const passNo = ocrDataPass["Passport Number"]?.content
                                                const passAuth = ocrDataPass["Occupation AR"]?.content
                                                const passNationalityArr = ocrDataPass["Nationality AR"]?.content
                                                const passPerNo = ocrDataPass["Personal Number"]?.content

                                                return (
                                                    <>
                                                        <div className='id-check-lower-main two-tbl'>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Forms</th>
                                                                        <th>Visual</th>
                                                                        <th>Valid</th>
                                                                    </tr>
                                                                </thead>
                                                                <>
                                                                    <tbody>

                                                                        <tr>
                                                                            <td>First Name</td>
                                                                            <td>
                                                                                <span>{fnameAr}</span>
                                                                            </td>
                                                                            <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Father Name</td>


                                                                            <td>
                                                                                <span>{SecnameArr}</span>
                                                                            </td>
                                                                            <td>{SecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>GrandFather Name</td>


                                                                            <td>
                                                                                <span>{thrdnameArr}</span>
                                                                            </td>
                                                                            <td>{thrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Last Name</td>

                                                                            <td>
                                                                                <span>{fourthnameArr}</span>
                                                                            </td>
                                                                            <td>{fourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>date of birth</td>
                                                                            <td>
                                                                                <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Nationality</td>
                                                                            <td>
                                                                                <span>{passNationalityArr}</span>
                                                                            </td>
                                                                            <td>{passNationalityArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Place of birth</td>

                                                                            <td>
                                                                                <span>{birthplaceArr}</span>
                                                                            </td>
                                                                            <td>{birthplaceArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Gender</td>

                                                                            <td>
                                                                                <span>{genderArr == "M" ? "الذكر" : genderArr}</span>
                                                                            </td>
                                                                            <td>{genderArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document type</td>

                                                                            <td>
                                                                                <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document number</td>
                                                                            <td>
                                                                                <span>{passNo}</span>
                                                                            </td>
                                                                            <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        {data && data.data && data.data.expiryDate ?
                                                                            <>
                                                                                {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>Expiry Date</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                            </td>
                                                                                            <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                ? <TiTick />
                                                                                                : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                            : null}

                                                                        <tr>
                                                                            <td>Occupation</td>

                                                                            <td>
                                                                                <span>{passAuth}</span>
                                                                            </td>
                                                                            <td>{<TiTick />}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Personal Number</td>

                                                                            <td>
                                                                                <span>{passPerNo}</span>
                                                                            </td>
                                                                            <td>{<TiTick />}</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </>
                                                            </table>
                                                        </div>
                                                    </>
                                                )

                                            }) : null}
                                        </>
                                        : null}
                                </> : data?.data?.type == "ID_CARD" ?
                                    <>
                                        {ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                            return (
                                                <>
                                                    {ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                        const ocrDatas = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                        const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined ? ocrApiBackData.fields : null
                                                        {/*For id card  */ }
                                                        const idFnameArr = ocrDatas["First Name AR"]?.content
                                                        const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                        const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                        const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                        const idNationality = ocrDatas["Nationality AR"]?.content
                                                        const idPerNoArr = ocrDatas["Personal Number"]?.content
                                                        {/* const idsexarr=ocrData["Gender"]?.content */ }
                                                        const idgenderArr = ocrData1["Gender AR"]?.content
                                                        const idNo = ocrDatas["ID Number"]?.content
                                                        const idIssNo = ocrData1["Registration Number"]?.content
                                                        const idPlace = ocrData1["Registration Place AR"]?.content
                                                        const idIssueplace = ocrData1["Place of Issuance"]?.content
                                                        const idResLoc = ocrData1["Residence Location"]?.content

                                                        return (
                                                            <>
                                                                {data?.data?.issuingCountry == "BHR" ?
                                                                    <div className='id-check-lower-main'>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Forms</th>
                                                                                    <th>Visual</th>
                                                                                    <th>Valid</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <>
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>First Name</td>


                                                                                        <td>
                                                                                            <span>{idFnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Father Name</td>


                                                                                        <td>
                                                                                            <span>{idSecnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idSecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>GrandFather Name</td>


                                                                                        <td>
                                                                                            <span>{idthrdnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idthrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Last Name</td>

                                                                                        <td>
                                                                                            <span>{idfourthnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idfourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Personal Number</td>
                                                                                        <td>
                                                                                            <span>{idPerNoArr !== undefined ? idPerNoArr : null}</span>
                                                                                        </td>
                                                                                        <td>{idPerNoArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>date of birth</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Gender</td>

                                                                                        <td>
                                                                                            <span>{idgenderArr == "/ M" ? "ذكر" : idgenderArr == "F" ? "أنثى" : idgenderArr}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document type</td>

                                                                                        <td>
                                                                                            <span>{data?.data?.type == "ID_CARD" ? "بطاقة التعريف" : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document number</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Nationality</td>
                                                                                        <td><span>{idNationality !== undefined ? idNationality : null}</span></td>
                                                                                        <td>{idNationality !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    {data && data.data && data.data.expiryDate ?
                                                                                        <>
                                                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>Expiry Date</td>
                                                                                                        {/* <td></td> */}
                                                                                                        <td>
                                                                                                            <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                        </td>
                                                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                            ? <TiTick />
                                                                                                            : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })}

                                                                                        </>
                                                                                        : null}
                                                                                    {/* {idResLoc !== undefined ?
                                                                                <tr>
                                                                                    <td>Residence</td>

                                                                                    <td>
                                                                                        <span>{idResLoc}</span>
                                                                                    </td>
                                                                                    <td>{idResLoc !== undefined ? <TiTick /> : null}</td>
                                                                                </tr> : null} */}
                                                                                </tbody>
                                                                            </>
                                                                        </table>
                                                                        {/* DRIVING_LICENSE */}
                                                                    </div>

                                                                    : null}
                                                            </>
                                                        )
                                                    }) : null}
                                                </>

                                            )
                                        }) : null}
                                    </> : null}
                            {/* Bahrin */}

                            {/* Egypt */}
                            {data?.data?.type == "PASSPORT" ?
                                <>
                                    {data?.data?.issuingCountry == "EGY" ?
                                        <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                {/* For Passport */ }
                                                const fnameAr = ocrDataPass["First Name AR"]?.content
                                                const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                                const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                                const fourthnameArr = ocrDataPass["Surname AR"]?.content
                                                const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                                const genderArr = ocrDataPass["Gender AR"]?.content
                                                const passNo = ocrDataPass["Passport No"]?.content
                                                const passJobPos = ocrDataPass["Job Position AR"]?.content
                                                const passNationalityArr = ocrDataPass["Nationality AR"]?.content
                                                const passAdd = ocrDataPass["Address AR"]?.content

                                                return (
                                                    <>
                                                        <div className='id-check-lower-main two-tbl'>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Forms</th>
                                                                        <th>Visual</th>
                                                                        <th>Valid</th>
                                                                    </tr>
                                                                </thead>
                                                                <>
                                                                    <tbody>

                                                                        <tr>
                                                                            <td>First Name</td>
                                                                            <td>
                                                                                <span>{fnameAr}</span>
                                                                            </td>
                                                                            <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Father Name</td>


                                                                            <td>
                                                                                <span>{SecnameArr}</span>
                                                                            </td>
                                                                            <td>{SecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>GrandFather Name</td>


                                                                            <td>
                                                                                <span>{thrdnameArr}</span>
                                                                            </td>
                                                                            <td>{thrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Last Name</td>

                                                                            <td>
                                                                                <span>{fourthnameArr}</span>
                                                                            </td>
                                                                            <td>{fourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>date of birth</td>
                                                                            <td>
                                                                                <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Nationality</td>
                                                                            <td>
                                                                                <span>{passNationalityArr}</span>
                                                                            </td>
                                                                            <td>{passNationalityArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Place of birth</td>

                                                                            <td>
                                                                                <span>{birthplaceArr}</span>
                                                                            </td>
                                                                            <td>{birthplaceArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Gender</td>

                                                                            <td>
                                                                                <span>{genderArr == "M" ? "الذكر" : genderArr}</span>
                                                                            </td>
                                                                            <td>{genderArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document type</td>

                                                                            <td>
                                                                                <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document number</td>
                                                                            <td>
                                                                                <span>{passNo}</span>
                                                                            </td>
                                                                            <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        {/* <tr>
                                                                            <td>document sub type</td>

                                                                            <td>
                                                                                <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.subType !== undefined ? <TiTick /> : null}</td>
                                                                        </tr> */}

                                                                        {data && data.data && data.data.expiryDate ?
                                                                            <>
                                                                                {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>Expiry Date</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                            </td>
                                                                                            <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                ? <TiTick />
                                                                                                : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                            : null}

                                                                        <tr>
                                                                            <td>Job Position</td>

                                                                            <td>
                                                                                <span>{passJobPos}</span>
                                                                            </td>
                                                                            <td>{<TiTick />}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Address</td>

                                                                            <td>
                                                                                <span>{passAdd}</span>
                                                                            </td>
                                                                            <td>{<TiTick />}</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </>
                                                            </table>
                                                        </div>
                                                    </>
                                                )

                                            }) : null}
                                        </>
                                        : null}
                                </> : data?.data?.type == "ID_CARD" ?
                                    <>
                                        {ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                            return (
                                                <>
                                                    {ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                        const ocrDatas = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                        const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined ? ocrApiBackData.fields : null

                                                        {/*zFor id card  */ }
                                                        const idFnameArr = ocrDatas["First Name AR"]?.content
                                                        const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                        const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                        const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                        const idNationality = ocrDatas["National Number"]?.content
                                                        const idAddArr = ocrDatas["Address AR"]?.content
                                                        {/* const idsexarr=ocrData["Gender"]?.content */ }
                                                        const idgenderArr = ocrData1["Gender AR"]?.content
                                                        const idMaritSta = ocrData1["Marital Status"]?.content
                                                        const idOccupation = ocrData1["occupation AR"]?.content
                                                        const idPlace = ocrData1["Registration Place AR"]?.content
                                                        const idIssueplace = ocrData1["Place of Issuance"]?.content
                                                        const idResLoc = ocrData1["Residence Location"]?.content

                                                        return (
                                                            <>
                                                                {data?.data?.issuingCountry == "EGY" ?
                                                                    <div className='id-check-lower-main'>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Forms</th>
                                                                                    <th>Visual</th>
                                                                                    <th>Valid</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <>
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>First Name</td>


                                                                                        <td>
                                                                                            <span>{idFnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Father Name</td>


                                                                                        <td>
                                                                                            <span>{idSecnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idSecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>GrandFather Name</td>


                                                                                        <td>
                                                                                            <span>{idthrdnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idthrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Last Name</td>

                                                                                        <td>
                                                                                            <span>{idfourthnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idfourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Maritual Status</td>
                                                                                        <td>
                                                                                            <span>{idMaritSta !== undefined ? idMaritSta : null}</span>
                                                                                        </td>
                                                                                        <td>{idMaritSta !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Occupation</td>
                                                                                        <td>
                                                                                            <span>{idOccupation !== undefined ? idOccupation : null}</span>
                                                                                        </td>
                                                                                        <td>{idOccupation !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>date of birth</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Gender</td>

                                                                                        <td>
                                                                                            <span>{idgenderArr == "/ M" ? "ذكر" : idgenderArr == "F" ? "أنثى" : idgenderArr}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document type</td>

                                                                                        <td>
                                                                                            <span>{data?.data?.type == "ID_CARD" ? "بطاقة التعريف" : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document number</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>National Number</td>
                                                                                        <td><span>{idNationality !== undefined ? idNationality : null}</span></td>
                                                                                        <td>{idNationality !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    {data && data.data && data.data.expiryDate ?
                                                                                        <>
                                                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>Expiry Date</td>
                                                                                                        {/* <td></td> */}
                                                                                                        <td>
                                                                                                            <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                        </td>
                                                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                            ? <TiTick />
                                                                                                            : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })}

                                                                                        </>
                                                                                        : null}
                                                                                    <tr>
                                                                                        <td>Address</td>
                                                                                        <td>
                                                                                            <span>{idAddArr !== undefined ? idAddArr : null}</span>
                                                                                        </td>
                                                                                        <td>{idAddArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>


                                                                                </tbody>
                                                                            </>
                                                                        </table>
                                                                        {/* DRIVING_LICENSE */}
                                                                    </div>

                                                                    : null}
                                                            </>
                                                        )
                                                    }) : null}
                                                </>

                                            )
                                        }) : null}
                                    </> : null}
                            {/* Egypt */}

                            {/* UAE */}
                            {data?.data?.type == "PASSPORT" ?
                                <>
                                    {data?.data?.issuingCountry == "ARE" ?
                                        <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                {/* For Passport */ }
                                                const fnameAr = ocrDataPass["First Name AR"]?.content
                                                const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                                const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                                const fourthnameArr = ocrDataPass["Family Name AR"]?.content
                                                const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                                const genderArr = ocrDataPass["Gender AR"]?.content
                                                {/* const passNo = ocrDataPass["Passport No"]?.content */ }
                                                {/* const passJobPos = ocrDataPass["Job Position AR"]?.content */ }
                                                const passNationalityArr = ocrDataPass["Nationality AR"]?.content
                                                {/* const passAdd = ocrDataPass["Address AR"]?.content */ }

                                                return (
                                                    <>
                                                        <div className='id-check-lower-main two-tbl'>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Forms</th>
                                                                        <th>Visual</th>
                                                                        <th>Valid</th>
                                                                    </tr>
                                                                </thead>
                                                                <>
                                                                    <tbody>

                                                                        <tr>
                                                                            <td>First Name</td>
                                                                            <td>
                                                                                <span>{fnameAr}</span>
                                                                            </td>
                                                                            <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Father Name</td>


                                                                            <td>
                                                                                <span>{SecnameArr}</span>
                                                                            </td>
                                                                            <td>{SecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>GrandFather Name</td>


                                                                            <td>
                                                                                <span>{thrdnameArr}</span>
                                                                            </td>
                                                                            <td>{thrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Last Name</td>

                                                                            <td>
                                                                                <span>{fourthnameArr}</span>
                                                                            </td>
                                                                            <td>{fourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>date of birth</td>
                                                                            <td>
                                                                                <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Nationality</td>
                                                                            <td>
                                                                                <span>{passNationalityArr}</span>
                                                                            </td>
                                                                            <td>{passNationalityArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Place of birth</td>

                                                                            <td>
                                                                                <span>{birthplaceArr}</span>
                                                                            </td>
                                                                            <td>{birthplaceArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Gender</td>

                                                                            <td>
                                                                                <span>{genderArr == "M" ? "الذكر" : genderArr}</span>
                                                                            </td>
                                                                            <td>{genderArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document type</td>

                                                                            <td>
                                                                                <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document number</td>
                                                                            {/* <td></td> */}
                                                                            <td>
                                                                                <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        {/* <tr>
                                                                            <td>document sub type</td>

                                                                            <td>
                                                                                <span>{data?.data?.type == "PASSPORT" ? "جواز سفر" : null}</span>
                                                                            </td>
                                                                            <td>{data && data.data && data.data.subType !== undefined ? <TiTick /> : null}</td>
                                                                        </tr> */}

                                                                        {data && data.data && data.data.expiryDate ?
                                                                            <>
                                                                                {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>Expiry Date</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                            </td>
                                                                                            <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                ? <TiTick />
                                                                                                : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                            : null}

                                                                        {/* <tr>
                                                                        <td>Job Position</td>

                                                                        <td>
                                                                            <span>{passJobPos}</span>
                                                                        </td>
                                                                        <td>{<TiTick />}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Address</td>

                                                                        <td>
                                                                            <span>{passAdd}</span>
                                                                        </td>
                                                                        <td>{<TiTick />}</td>
                                                                    </tr> */}

                                                                    </tbody>
                                                                </>
                                                            </table>
                                                        </div>
                                                    </>
                                                )

                                            }) : null}
                                        </>
                                        : null}
                                </> : data?.data?.type == "ID_CARD" ?
                                    <>
                                    {data?.data?.employer?
                                    <>
                                        {ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                            return (
                                                <>
                                                    {ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                        const ocrDatas = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                        const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined ? ocrApiBackData.fields : null

                                                        {/*zFor id card  */ }
                                                        const idFnameArr = ocrDatas["First Name AR"]?.content
                                                        const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                        const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                        const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                        const idNumber = ocrDatas["ID Number"]?.content
                                                        //const idAddArr = ocrDatas["Issuing place AR"]?.content
                                                        {/* const idsexarr=ocrData["Gender"]?.content */ }
                                                        const idnationality = ocrDatas["Nationality AR"]?.content
                                                        {/* const idMaritSta = ocrData1["Marital Status"]?.content */ }
                                                        const idOccupation = ocrData1["Occupation AR"]?.content
                                                        {/* const idPlace = ocrData1["Registration Place AR"]?.content */ }
                                                        const idIssueplace = ocrData1["Issuing place AR"]?.content
                                                        {/* const idResLoc = ocrData1["Residence Location"]?.content */ }

                                                        return (
                                                            <>
                                                                {data?.data?.issuingCountry == "ARE" ?
                                                                    <div className='id-check-lower-main'>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Forms</th>
                                                                                    <th>Visual</th>
                                                                                    <th>Valid</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <>
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>First Name</td>


                                                                                        <td>
                                                                                            <span>{idFnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    
                                                                                    <tr>
                                                                                        <td>Last Name</td>

                                                                                        <td>
                                                                                            <span>{idSecnameArr} {idthrdnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idSecnameArr&&idthrdnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Occupation</td>
                                                                                        <td>
                                                                                            <span>{idOccupation !== undefined ? idOccupation : null}</span>
                                                                                        </td>
                                                                                        <td>{idOccupation !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>date of birth</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Nationality</td>

                                                                                        <td>
                                                                                            <span>{idnationality}</span>
                                                                                        </td>
                                                                                        <td>{idnationality !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document type</td>

                                                                                        <td>
                                                                                            <span>{data?.data?.type == "ID_CARD" ? "بطاقة التعريف" : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document number</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>National Number</td>
                                                                                        <td><span>{idNumber !== undefined ? idNumber : null}</span></td>
                                                                                        <td>{idNumber !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    {data && data.data && data.data.expiryDate ?
                                                                                        <>
                                                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>Expiry Date</td>
                                                                                                        {/* <td></td> */}
                                                                                                        <td>
                                                                                                            <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                        </td>
                                                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                            ? <TiTick />
                                                                                                            : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })}

                                                                                        </>
                                                                                        : null}
                                                                                    <tr>
                                                                                        <td>Issuing Place</td>
                                                                                        <td>
                                                                                            <span>{idIssueplace !== undefined ? idIssueplace : null}</span>
                                                                                        </td>
                                                                                        <td>{idIssueplace !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>


                                                                                </tbody>
                                                                            </>
                                                                        </table>
                                                                        {/* DRIVING_LICENSE */}
                                                                    </div>

                                                                    : null}
                                                            </>
                                                        )
                                                    }) : null}
                                                </>

                                            )
                                        }) : null}</>:
                                        <>
                                        {ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                            return (
                                                <>
                                                    {ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                        const ocrDatas = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                        const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined ? ocrApiBackData.fields : null

                                                        {/*zFor id card  */ }
                                                        const idFnameArr = ocrDatas["First Name AR"]?.content
                                                        const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                        const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                        const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                        const idNumber = ocrDatas["ID Number"]?.content
                                                        //const idAddArr = ocrDatas["Issuing place AR"]?.content
                                                        {/* const idsexarr=ocrData["Gender"]?.content */ }
                                                        const idnationality = ocrDatas["Nationality AR"]?.content
                                                        {/* const idMaritSta = ocrData1["Marital Status"]?.content */ }
                                                        const idOccupation = ocrData1["Occupation AR"]?.content
                                                        {/* const idPlace = ocrData1["Registration Place AR"]?.content */ }
                                                        const idIssueplace = ocrData1["Issuing place AR"]?.content
                                                        {/* const idResLoc = ocrData1["Residence Location"]?.content */ }

                                                        return (
                                                            <>
                                                                {data?.data?.issuingCountry == "ARE" ?
                                                                    <div className='id-check-lower-main'>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Forms</th>
                                                                                    <th>Visual</th>
                                                                                    <th>Valid</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <>
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>First Name</td>


                                                                                        <td>
                                                                                            <span>{idFnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    
                                                                                    <tr>
                                                                                        <td>Last Name</td>

                                                                                        <td>
                                                                                            <span>{idfourthnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idfourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>date of birth</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Nationality</td>

                                                                                        <td>
                                                                                            <span>{idnationality}</span>
                                                                                        </td>
                                                                                        <td>{idnationality !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document type</td>

                                                                                        <td>
                                                                                            <span>{data?.data?.type == "ID_CARD" ? "بطاقة التعريف" : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>document number</td>
                                                                                        <td>
                                                                                            <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                                        </td>
                                                                                        <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>National Number</td>
                                                                                        <td><span>{idNumber !== undefined ? idNumber : null}</span></td>
                                                                                        <td>{idNumber !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    {data && data.data && data.data.expiryDate ?
                                                                                        <>
                                                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>Expiry Date</td>
                                                                                                        {/* <td></td> */}
                                                                                                        <td>
                                                                                                            <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                        </td>
                                                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                            ? <TiTick />
                                                                                                            : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            })}

                                                                                        </>
                                                                                        : null}
                                                                                    {/* <tr>
                                                                                        <td>Issuing Place</td>
                                                                                        <td>
                                                                                            <span>{idIssueplace !== undefined ? idIssueplace : null}</span>
                                                                                        </td>
                                                                                        <td>{idIssueplace !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr> */}


                                                                                </tbody>
                                                                            </>
                                                                        </table>
                                                                        {/* DRIVING_LICENSE */}
                                                                    </div>

                                                                    : null}
                                                            </>
                                                        )
                                                    }) : null}
                                                </>

                                            )
                                        }) : null}
                                        </>
                                        }
                                    </>
                                    : null}
                            {/* UAE */}

                            {/* OMN */}
                            {data?.data?.type == "PASSPORT" ?
                                <>
                                    {data?.data?.issuingCountry == "OMN" ?
                                        <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                {/* For Passport */ }
                                                const fnameAr = ocrDataPass["First Name Ar"]?.content
                                                const lastnameAr = ocrDataPass["Family Name AR"]?.content
                                                const countryReg = ocrDataPass["CountryRegion"]?.content
                                                const dobAr = ocrDataPass["DOB"]?.content
                                                const expDateArr = ocrDataPass["DateOfExpiration"]?.content
                                                const issueDateArr = ocrDataPass["Date of Issue"]?.content
                                                const passNo = ocrDataPass["ID Number"]?.content
                                                const doctype = ocrDataPass["DocumentType"]?.content
                                                const issuingAuthArr = ocrDataPass["Issuing Authority"]?.content
                                                const nationality = ocrDataPass["Nationality AR"]?.content
                                                const personalNumber = ocrDataPass["Passport Number"]?.content
                                                const birthPlace = ocrDataPass["Place of Birth AR"]?.content
                                                return (
                                                    <>
                                                        <div className='id-check-lower-main two-tbl'>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Forms</th>
                                                                        <th>Visual</th>
                                                                        <th>Valid</th>
                                                                    </tr>
                                                                </thead>
                                                                <>
                                                                    <tbody>

                                                                        <tr>
                                                                            <td>First Name</td>
                                                                            <td>
                                                                                <span>{fnameAr}</span>
                                                                            </td>
                                                                            <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Last Name</td>


                                                                            <td>
                                                                                <span>{lastnameAr}</span>
                                                                            </td>
                                                                            <td>{lastnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Date Of Birth</td>

                                                                            <td>
                                                                                <span>{dobAr}</span>
                                                                            </td>
                                                                            <td>{dobAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Issuing Autority</td>
                                                                            <td>
                                                                                <span>{issuingAuthArr !== undefined ? issuingAuthArr : null}</span>
                                                                            </td>
                                                                            <td>{issuingAuthArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Nationality</td>
                                                                            <td>
                                                                                <span>{nationality}</span>
                                                                            </td>
                                                                            <td>{nationality !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Place of birth</td>

                                                                            <td>
                                                                                <span>{birthPlace}</span>
                                                                            </td>
                                                                            <td>{birthPlace !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Issue Date</td>

                                                                            <td>
                                                                                <span>{issueDateArr}</span>
                                                                            </td>
                                                                            <td>{issueDateArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document type</td>

                                                                            <td>
                                                                                <span>{"جواز سفر"}</span>
                                                                            </td>
                                                                            <td>{doctype !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>document number</td>
                                                                            <td>
                                                                                <span>{passNo !== undefined ? passNo : null}</span>
                                                                            </td>
                                                                            <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>

                                                                        {data && data.data && data.data.expiryDate ?
                                                                            <>
                                                                                {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>Expiry Date</td>
                                                                                            <td>
                                                                                                <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                            </td>
                                                                                            <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                ? <TiTick />
                                                                                                : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                            : null}
                                                                        <tr>
                                                                            <td>prsonal Number</td>

                                                                            <td>
                                                                                <span>{personalNumber}</span>
                                                                            </td>
                                                                            <td>{<TiTick />}</td>
                                                                        </tr>


                                                                    </tbody>
                                                                </>
                                                            </table>
                                                        </div>
                                                    </>
                                                )


                                            }) : null}
                                        </> : null}
                                </>
                                : null}
                            {data?.data?.issuingCountry == "OMN" && data?.data?.type == "ID_CARD"

                                ? data?.data?.dateOfBirthParts && data?.data?.expiryDateParts
                                    ? <div className='id-check-lower-main'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Forms</th>
                                                    <th>Visual</th>
                                                    <th>Valid</th>
                                                </tr>
                                            </thead>
                                            {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                                return <tbody key={index}>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td>
                                                            <span>{doc?.fields["First Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["First Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GrandFather Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Grand Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Grand Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Family Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Family Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["DOB"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields.DOB?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of birth</td>

                                                        <td>
                                                            <span>{doc?.fields["Place of Birth AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Place of Birth AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    {doc?.fields["First Name AR"]?.content ?
                                                        <>
                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                return (
                                                                    <tr>
                                                                        <td>Expiry Date</td>
                                                                        <td>
                                                                            <span>
                                                                                {data && data.data && data.data.expiryDate !== undefined
                                                                                    ? data.data.expiryDate : null}
                                                                            </span>
                                                                        </td>
                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                            ? <TiTick />
                                                                            : <span className='user-wrong-icon'>{notverified}</span>}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </>
                                                        : null}
                                                    <tr>
                                                        <td>Civil Number</td>
                                                        <td>
                                                            <span>{doc?.fields["Civil Number"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Civil Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            })}
                                            {ocrData && ocrData[1]?.analyzeResult?.documents?.map(
                                                (ocData, ocIndex) => <tbody key={ocIndex}>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>
                                                            <span>{ocData?.fields?.Address?.content}</span>
                                                        </td>
                                                        <td>{ocData?.fields?.Address?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    : <div className='id-check-lower-main'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Forms</th>
                                                    <th>Visual</th>
                                                    <th>Valid</th>
                                                </tr>
                                            </thead>
                                            {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                                return <tbody key={index}>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td>
                                                            <span>{doc?.fields["First Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["First Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GrandFather Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Grand Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Grand Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Family Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Family Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["DOB"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields.DOB?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of birth</td>

                                                        <td>
                                                            <span>{doc?.fields["Place of Birth AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Place of Birth AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    {doc?.fields["First Name AR"]?.content ?
                                                        <>
                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                return (
                                                                    <tr>
                                                                        <td>Expiry Date</td>
                                                                        <td>
                                                                            <span>
                                                                                {data && data.data && data.data.expiryDate !== undefined
                                                                                    ? data.data.expiryDate : null}
                                                                            </span>
                                                                        </td>
                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                            ? <TiTick />
                                                                            : <span className='user-wrong-icon'>{notverified}</span>}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </>
                                                        : null}
                                                    <tr>
                                                        <td>Civil Number</td>
                                                        <td>
                                                            <span>{doc?.fields["Civil Number"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Civil Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            })}
                                            {ocrData && ocrData[1]?.analyzeResult?.documents?.map(
                                                (ocData, ocIndex) => <tbody key={ocIndex}>
                                                    <tr>
                                                        <td>Nationality</td>
                                                        <td>
                                                            <span>{ocData?.fields["Nationality AR"]?.content}</span>
                                                        </td>
                                                        <td>{ocData?.fields["Nationality AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                : null}
                            {/* OMN */}

                            {/* SAU */}
                            {data?.data?.type == "PASSPORT" ?
                                <>
                                    {data?.data?.issuingCountry == "SAU" ?
                                        <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                {/* For Passport */ }
                                                const fnameAr = ocrDataPass["First Name AR"]?.content
                                                const lastnameAr = ocrDataPass["Family Name AR"]?.content
                                                const countryReg = ocrDataPass["Gender AR"]?.content
                                                const passNo = ocrDataPass["Grand Father Name AR"]?.content
                                                const issuingAuthArr = ocrDataPass["Issuing Authority AR"]?.content
                                                const National = ocrDataPass["Nationality AR"]?.content
                                                const Second = ocrDataPass["Second Name AR"]?.content


                                                return (
                                                    <>
                                                        <div className='id-check-lower-main two-tbl'>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Forms</th>
                                                                        <th>Visual</th>
                                                                        <th>Valid</th>
                                                                    </tr>
                                                                </thead>
                                                                <>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>First Name</td>
                                                                            <td>
                                                                                <span>{fnameAr}</span>
                                                                            </td>
                                                                            <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Father Name</td>
                                                                            <td>
                                                                                <span>{Second !== undefined ? issuingAuthArr : null}</span>
                                                                            </td>
                                                                            <td>{Second !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Grand Father</td>
                                                                            <td>
                                                                                <span>{passNo}</span>
                                                                            </td>
                                                                            <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Last Name</td>
                                                                            <td>
                                                                                <span>{lastnameAr}</span>
                                                                            </td>
                                                                            <td>{lastnameAr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Gender</td>
                                                                            <td>
                                                                                <span>{countryReg}</span>
                                                                            </td>
                                                                            <td>{countryReg !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Issuing Autority</td>
                                                                            <td>
                                                                                <span>{issuingAuthArr !== undefined ? issuingAuthArr : null}</span>
                                                                            </td>
                                                                            <td>{issuingAuthArr !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Nationality</td>
                                                                            <td>
                                                                                <span>{National !== undefined ? issuingAuthArr : null}</span>
                                                                            </td>
                                                                            <td>{National !== undefined ? <TiTick /> : null}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </>
                                                            </table>
                                                        </div>
                                                    </>
                                                )


                                            }) : null}
                                        </> : null}
                                </>
                                : null}
                            {data?.data?.issuingCountry == "SAU" && data?.data?.type == "ID_CARD"

                                ? data?.data?.dateOfBirthParts && data?.data?.expiryDateParts
                                    ? <div className='id-check-lower-main'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Forms</th>
                                                    <th>Visual</th>
                                                    <th>Valid</th>
                                                </tr>
                                            </thead>
                                            {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                                const gregorDat = convertToGregorianDate(doc?.fields["Expiry Date Hijri"]?.content);
                                                console.log("gredat", gregorDat);
                                                const isExpiry = getgrego(gregorDat)
                                                console.log("isexpire", isExpiry);
                                                return <tbody key={index}>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td>
                                                            <span>{doc?.fields["First Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["First Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GrandFather Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Grand Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Grand Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Family Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Family Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["DOB Hijri"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["DOB Hijri"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of birth</td>

                                                        <td>
                                                            <span>{doc?.fields["Place of Birth AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Place of Birth AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Number</td>
                                                        <td>
                                                            <span>{doc?.fields["Number"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Expiry Date</td>
                                                        {/* <td></td> */}
                                                        <td>
                                                            <span>{ gregorDat }</span>
                                                        </td>
                                                        <td>{!isExpiry
                                                            ? <TiTick />
                                                            : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Civil Number</td>
                                                        <td>
                                                            <span>{doc?.fields["Civil Number"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Civil Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Issuing Authority</td>
                                                        <td>
                                                            <span>{doc?.fields["Issuing Authority AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Issuing Authority AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            })}

                                        </table>
                                    </div>
                                    : <div className='id-check-lower-main'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Forms</th>
                                                    <th>Visual</th>
                                                    <th>Valid</th>
                                                </tr>
                                            </thead>
                                            {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                                const gregorDat = convertToGregorianDate(doc?.fields["Expiry Date Hijri"]?.content);
                                                const isExpiry = getgrego(gregorDat)
                                                {/* console.log("dd",doc?.fields) */}
                                                return <tbody key={index}>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td>
                                                            <span>{doc?.fields["First Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["First Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GrandFather Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Grand Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Grand Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Family Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Family Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["DOB Hijri"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["DOB Hijri"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                               <tr>
                                                        <td>ID Number</td>
                                                        <td>
                                                            <span>{doc?.fields["ID Number"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["ID Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of birth </td>
                                                        <td>
                                                            <span>{doc?.fields["Place of Birth AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Place of Birth AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Expiry Date</td>
                                                        {/* <td></td> */}
                                                        <td>
                                                            <span></span>
                                                        </td>
                                                        <td>
                                                            <span className='user-wrong-icon'></span></td>
                                                    </tr>
                                                </tbody>
                                            })}
                                        </table>
                                    </div>
                                : null}
                            {/* SAU */}

                            {/* QATAR */}
                            {data?.data?.type == "PASSPORT"
                                ? <>
                                    {data?.data?.issuingCountry == "QAT"
                                        ? <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                                ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                    const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                    {/* For Passport */ }
                                                    const fnameAr = ocrDataPass["First Name AR"]?.content
                                                    const lastnameAr = ocrDataPass["Family Name AR"]?.content
                                                    const lasFather = ocrDataPass["Father Name AR"]?.content
                                                    const idGend = ocrDataPass["Gender AR"]?.content
                                                    const passNo = ocrDataPass["Grand Father Name AR"]?.content
                                                    const idDOB = ocrDataPass["Date of Birth"]?.content
                                                    const idPassNum = ocrDataPass["Passport Number"]?.content
                                                    const idPrsNum = ocrDataPass["Personal Number"]?.content
                                                    const idBPlace = ocrDataPass["Place of birth AR"]?.content
                                                    return (
                                                        <>
                                                            <div className='id-check-lower-main two-tbl'>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Forms</th>
                                                                            <th>Visual</th>
                                                                            <th>Valid</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>First Name</td>
                                                                                <td>
                                                                                    <span>{fnameAr}</span>
                                                                                </td>
                                                                                <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Last Name</td>
                                                                                <td>
                                                                                    <span>{lastnameAr}</span>
                                                                                </td>
                                                                                <td>{lastnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Father Name</td>
                                                                                <td>
                                                                                    <span>{lasFather}</span>
                                                                                </td>
                                                                                <td>{lasFather !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Grand Father Name</td>
                                                                                <td>
                                                                                    <span>{passNo}</span>
                                                                                </td>
                                                                                <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Gender</td>
                                                                                <td>
                                                                                    <span>{idGend}</span>
                                                                                </td>
                                                                                <td>{idGend !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Passport Number</td>
                                                                                <td>
                                                                                    <span>{idPassNum !== undefined ? idPassNum : null}</span>
                                                                                </td>
                                                                                <td>{idPassNum !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Personal Number</td>
                                                                                <td>
                                                                                    <span>{idPrsNum !== undefined ? idPrsNum : null}</span>
                                                                                </td>
                                                                                <td>{idPrsNum !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Place of birth </td>
                                                                                <td>
                                                                                    <span>{idBPlace !== undefined ? idBPlace : null}</span>
                                                                                </td>
                                                                                <td>{idBPlace !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Date of birth </td>
                                                                                <td>
                                                                                    <span>{idDOB !== undefined ? idDOB : null}</span>
                                                                                </td>
                                                                                <td>{idDOB !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </>
                                                                </table>
                                                            </div>
                                                        </>
                                                    )
                                                }) : null}
                                        </> : null}
                                </>
                                : null}
                            {data?.data?.issuingCountry == "QAT" && data?.data?.type == "ID_CARD"
                                ? data?.data?.subType == "NATIONAL_ID"
                                    ? <div className='id-check-lower-main'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Forms</th>
                                                    <th>Visual</th>
                                                    <th>Valid</th>
                                                </tr>
                                            </thead>
                                            {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                                return <tbody key={index}>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td>
                                                            <span>{doc?.fields["First Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["First Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Father Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GrandFather Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Grand Father Name AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Grand Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td>
                                                            <span>{doc?.fields["Surname AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Surname AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["DOB"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["DOB"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["Place of Birth AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Place of Birth AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ID Number</td>

                                                        <td>
                                                            <span>{doc?.fields["ID Number"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["ID Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    {doc?.fields["First Name AR"]?.content ?
                                                        <>
                                                            {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                return (
                                                                    <tr>
                                                                        <td>Expiry Date</td>
                                                                        <td>
                                                                            <span>
                                                                                {data && data.data && data.data.expiryDate !== undefined
                                                                                    ? data.data.expiryDate : null}
                                                                            </span>
                                                                        </td>
                                                                        <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                            ? <TiTick />
                                                                            : <span className='user-wrong-icon'>{notverified}</span>}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </>
                                                        : null}
                                                    <tr>
                                                        <td>Nationality</td>
                                                        <td>
                                                            <span>{doc?.fields["Nationality AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Nationality AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            })}
                                            {ocrData && ocrData[1]?.analyzeResult?.documents?.map((data2, index2) => (
                                                <tbody key={index2}>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>
                                                            <span>{data2?.fields["Address AR"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Address AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Type</td>
                                                        <td>
                                                            <span>{data2?.fields["Blood Type"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Blood Type"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr><tr>
                                                        <td>Date of issue</td>
                                                        <td>
                                                            <span>{data2?.fields["Date of issue"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Date of issue"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr><tr>
                                                        <td>Signature</td>
                                                        <td>
                                                            <span>{data2?.fields["Holder Signature"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Holder Signature"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr><tr>
                                                        <td>Serial Number</td>
                                                        <td>
                                                            <span>{data2?.fields["Serial Number"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Serial Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </table>
                                    </div>
                                    : data?.data?.subType == "RESIDENT_PERMIT_ID"
                                    && <div className='id-check-lower-main'>
                                        {ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined
                                            ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                                return (
                                                    <>
                                                        {ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined
                                                            ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                                const ocrDatas = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                                const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined ? ocrApiBackData.fields : null
                                                                {/*zFor id card  */ }
                                                                const idFnameArr = ocrDatas["First Name AR"]?.content
                                                                const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                                const idDOB = ocrDatas["DOB"]?.content
                                                                const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                                const idNationality = ocrDatas["Nationality AR"]?.content
                                                                const idID = ocrDatas["ID Number"]?.content
                                                                const idsexarr = ocrData["Expiry Date"]?.content
                                                                const idHost = ocrData1["Host AR"]?.content
                                                                const idPass = ocrData1["Passport Expiry Date"]?.content
                                                                const idOccupation = ocrDatas["Occupation AR"]?.content
                                                                const idPassNum = ocrData1["Passport Number"]?.content
                                                                const idSrNum = ocrData1["Serial Number"]?.content
                                                                const idResLoc = ocrData1["Residency Type AR"]?.content
                                                                const sign = ocrData1["Signature"]?.content
                                                                return (
                                                                    <>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Forms</th>
                                                                                    <th>Visual</th>
                                                                                    <th>Valid</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <>
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>First Name</td>
                                                                                        <td>
                                                                                            <span>{idFnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idFnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Father Name</td>
                                                                                        <td>
                                                                                            <span>{idSecnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idSecnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Last Name</td>

                                                                                        <td>
                                                                                            <span>{idfourthnameArr}</span>
                                                                                        </td>
                                                                                        <td>{idfourthnameArr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Date of Birth</td>
                                                                                        <td>
                                                                                            <span>{idDOB}</span>
                                                                                        </td>
                                                                                        <td>{idDOB !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td>ID Number</td>
                                                                                        <td>
                                                                                            <span>{idID}</span>
                                                                                        </td>
                                                                                        <td>{idID !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Occupation</td>
                                                                                        <td>
                                                                                            <span>{idOccupation}</span>
                                                                                        </td>
                                                                                        <td>{idOccupation !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td>Host</td>
                                                                                        <td>
                                                                                            <span>{idHost}</span>
                                                                                        </td>
                                                                                        <td>{idHost !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Passport number</td>
                                                                                        <td>
                                                                                            <span>{idPassNum}</span>
                                                                                        </td>
                                                                                        <td>{idPassNum !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Passport Expiry Date</td>
                                                                                        <td>
                                                                                            <span>{idPass}</span>
                                                                                        </td>
                                                                                        <td>{idPass !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Residency</td>
                                                                                        <td><span>{idResLoc !== undefined ? idResLoc : null}</span></td>
                                                                                        <td>{idResLoc !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>National Number</td>
                                                                                        <td><span>{idNationality !== undefined ? idNationality : null}</span></td>
                                                                                        <td>{idNationality !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Expiry Date</td>
                                                                                        <td>
                                                                                            <span>{idsexarr}</span>
                                                                                        </td>
                                                                                        <td>{idsexarr !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Serial Number</td>
                                                                                        <td>
                                                                                            <span>{idSrNum}</span>
                                                                                        </td>
                                                                                        <td>{idSrNum !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Signature</td>
                                                                                        <td>
                                                                                            <span>{sign}</span>
                                                                                        </td>
                                                                                        <td>{sign !== undefined ? <TiTick /> : null}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </>
                                                                        </table>
                                                                    </>
                                                                )
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            })
                                            : null}
                                    </div>
                                : null}
                            {/* QATAR */}

                            {/* KWT */}
                            {data?.data?.type == "PASSPORT"
                                ? <>
                                    {data?.data?.issuingCountry == "KWT"
                                        ? <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                                ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                    const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                    {/* For Passport */ }
                                                    const fnameAr = ocrDataPass["First Name AR"]?.content
                                                    const lastnameAr = ocrDataPass["Family Name AR"]?.content
                                                    const lasFather = ocrDataPass["Father Name AR"]?.content
                                                    const idGend = ocrDataPass["Gender AR"]?.content
                                                    const passNo = ocrDataPass["Grand Father Name AR"]?.content
                                                    const idDOB = ocrDataPass["DOB"]?.content
                                                    const idPassNum = ocrDataPass["Passport Number"]?.content
                                                    const idPassIs = ocrDataPass["Date of Issue"]?.content
                                                    const idCivil = ocrDataPass["Civil Number"]?.content
                                                    const idBPlace = ocrDataPass["Place of Birth AR"]?.content
                                                    const idExpi = ocrDataPass["Date of Expiry"]?.content
                                                    const idSig = ocrDataPass["Signature"]?.content

                                                    return (
                                                        <>
                                                            <div className='id-check-lower-main two-tbl'>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Forms</th>
                                                                            <th>Visual</th>
                                                                            <th>Valid</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>First Name</td>
                                                                                <td>
                                                                                    <span>{fnameAr}</span>
                                                                                </td>
                                                                                <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Last Name</td>
                                                                                <td>
                                                                                    <span>{lastnameAr}</span>
                                                                                </td>
                                                                                <td>{lastnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Father Name</td>
                                                                                <td>
                                                                                    <span>{lasFather}</span>
                                                                                </td>
                                                                                <td>{lasFather !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Grand Father Name</td>
                                                                                <td>
                                                                                    <span>{passNo}</span>
                                                                                </td>
                                                                                <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Gender</td>
                                                                                <td>
                                                                                    <span>{idGend}</span>
                                                                                </td>
                                                                                <td>{idGend !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Passport Number</td>
                                                                                <td>
                                                                                    <span>{idPassNum !== undefined ? idPassNum : null}</span>
                                                                                </td>
                                                                                <td>{idPassNum !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Civil Number</td>
                                                                                <td>
                                                                                    <span>{idCivil !== undefined ? idCivil : null}</span>
                                                                                </td>
                                                                                <td>{idCivil !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Place of birth </td>
                                                                                <td>
                                                                                    <span>{idBPlace !== undefined ? idBPlace : null}</span>
                                                                                </td>
                                                                                <td>{idBPlace !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Date of birth </td>
                                                                                <td>
                                                                                    <span>{idDOB !== undefined ? idDOB : null}</span>
                                                                                </td>
                                                                                <td>{idDOB !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Expiry Date </td>
                                                                                <td>
                                                                                    <span>{idExpi !== undefined ? idExpi : null}</span>
                                                                                </td>
                                                                                <td>{idExpi !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Issue </td>
                                                                                <td>
                                                                                    <span>{idPassIs !== undefined ? idPassIs : null}</span>
                                                                                </td>
                                                                                <td>{idPassIs !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Signature</td>
                                                                                <td>
                                                                                    <span>{idSig !== undefined ? idSig : null}</span>
                                                                                </td>
                                                                                <td>{idSig !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </>
                                                                </table>
                                                            </div>
                                                        </>
                                                    )
                                                }) : null}
                                        </> : null}
                                </>
                                : null}
                            {data?.data?.issuingCountry == "KWT" && data?.data?.type == "ID_CARD"
                                ? <div className='id-check-lower-main'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Forms</th>
                                                <th>Visual</th>
                                                <th>Valid</th>
                                            </tr>
                                        </thead>
                                        {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                            return <tbody key={index}>
                                                <tr>
                                                    <td>First Name</td>
                                                    <td>
                                                        <span>{doc?.fields["First Name AR"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["First Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                                <tr>
                                                    <td>Father Name</td>
                                                    <td>
                                                        <span>{doc?.fields["Father Name AR"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                                <tr>
                                                    <td>GrandFather Name</td>
                                                    <td>
                                                        <span>{doc?.fields["Grand Father Name AR"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["Grand Father Name AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Name</td>
                                                    <td>
                                                        <span>{doc?.fields["Family Name AR"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["Surname AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date of birth</td>
                                                    <td>
                                                        <span>{doc?.fields["DOB"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["DOB"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                                {/* <tr>
                                                        <td>Place of birth</td>
                                                        <td>
                                                            <span>{doc?.fields["Place of Birth AR"]?.content}</span>
                                                        </td>
                                                        <td>{doc?.fields["Place of Birth AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr> */}
                                                <tr>
                                                    <td>Civil ID Number</td>
                                                    <td>
                                                        <span>{doc?.fields["Civil ID Number"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["Civil ID Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                                {doc?.fields["First Name AR"]?.content ?
                                                    <>
                                                        {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                            return (
                                                                <tr>
                                                                    <td>Expiry Date</td>
                                                                    <td>
                                                                        <span>
                                                                            {data && data.data && data.data.expiryDate !== undefined
                                                                                ? data.data.expiryDate : null}
                                                                        </span>
                                                                    </td>
                                                                    <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                        ? <TiTick />
                                                                        : <span className='user-wrong-icon'>{notverified}</span>}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </>
                                                    : null}
                                                <tr>
                                                    <td>Nationality</td>
                                                    <td>
                                                        <span>{doc?.fields["Nationality AR"]?.content}</span>
                                                    </td>
                                                    <td>{doc?.fields["Nationality AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                            </tbody>
                                        })}
                                        {ocrData && ocrData[1]?.analyzeResult?.documents?.map((data2, index2) => (
                                            <tbody key={index2}>
                                                {/* <tr>
                                                        <td>Address</td>
                                                        <td>
                                                            <span>{data2?.fields["Address AR"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Address AR"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Type</td>
                                                        <td>
                                                            <span>{data2?.fields["Blood Type"]?.content}</span>
                                                        </td>
                                                        <td>{data2?.fields["Blood Type"]?.content !== undefined ? <TiTick /> : null}</td>
                                                    </tr> */}
                                                <tr>
                                                    <td>Serial Number</td>
                                                    <td>
                                                        <span>{data2?.fields["Serial Number"]?.content}</span>
                                                    </td>
                                                    <td>{data2?.fields["Serial Number"]?.content !== undefined ? <TiTick /> : null}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                : null}
                            {/* KWT */}
                            {/* IRAQ */}
                            {data?.data?.type == "PASSPORT"
                                ? <>
                                    {data?.data?.issuingCountry == "IRQ"
                                        ? <>
                                            {ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                                ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                                    const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                                    {/* console.log("ocr",ocrDataPass) */}
                                                    {/* For Passport */ }
                                                    const fnameAr = ocrDataPass["First Name AR"]?.content
                                                    const lastnameAr = ocrDataPass["Family Name AR"]?.content
                                                    const lasFather = ocrDataPass["Father Name AR"]?.content
                                                    const idGend = ocrDataPass["Gender AR"]?.content
                                                    const passNo = ocrDataPass["Grand Father Name AR"]?.content
                                                    const idDOB = ocrDataPass["DOB"]?.content
                                                    const idPassNum = ocrDataPass["Passport Number"]?.content
                                                    const idPassIs = ocrDataPass["Date of Issue"]?.content
                                                    const idCivil = ocrDataPass["Civil Number"]?.content
                                                    const idBPlace = ocrDataPass["Place Of Birth AR"]?.content
                                                    const idExpi = ocrDataPass["Date of Expiry"]?.content
                                                    const idSig = ocrDataPass["Mother Name AR"]?.content

                                                    return (
                                                        <>
                                                            <div className='id-check-lower-main two-tbl'>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Forms</th>
                                                                            <th>Visual</th>
                                                                            <th>Valid</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>First Name</td>
                                                                                <td>
                                                                                    <span>{fnameAr}</span>
                                                                                </td>
                                                                                <td>{fnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                           
                                                                            <tr>    
                                                                                <td>Father Name</td>
                                                                                <td>
                                                                                    <span>{lasFather}</span>
                                                                                </td>
                                                                                <td>{lasFather !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Grand Father Name</td>
                                                                                <td>
                                                                                    <span>{passNo}</span>
                                                                                </td>
                                                                                <td>{passNo !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Last Name</td>
                                                                                <td>
                                                                                    <span>{lastnameAr}</span>
                                                                                </td>
                                                                                <td>{lastnameAr !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            {/* <tr>
                                                                                <td>Gender</td>
                                                                                <td>
                                                                                    <span>{idGend}</span>
                                                                                </td>
                                                                                <td>{idGend !== undefined ? <TiTick /> : null}</td>
                                                                            </tr> */}
                                                                            <tr>
                                                                                <td>Passport Number</td>
                                                                                <td>
                                                                                    <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                                                                </td>
                                                                                <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Place of birth </td>
                                                                                <td>
                                                                                    <span>{idBPlace !== undefined ? idBPlace : null}</span>
                                                                                </td>
                                                                                <td>{idBPlace !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>date of birth</td>
                                                                                <td>
                                                                                    <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                                                                </td>
                                                                                <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                            {data && data.data && data.data.expiryDate ?
                                                                                <>
                                                                                    {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td>Expiry Date</td>
                                                                                                <td>
                                                                                                    <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                                                                                </td>
                                                                                                <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                                                                                    ? <TiTick />
                                                                                                    : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    })}
                                                                                </>
                                                                                : null}
                                                                            <tr>
                                                                                <td>Mother Name</td>
                                                                                <td>
                                                                                    <span>{idSig !== undefined ? idSig : null}</span>
                                                                                </td>
                                                                                <td>{idSig !== undefined ? <TiTick /> : null}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </>
                                                                </table>
                                                            </div>
                                                        </>
                                                    )
                                                }) : null}
                                        </> : null}
                                </>
                                : null}
                             {/* IRAQ */}
                        </>
                    )
                })
                : null}
                </>}
        </>
    )
}
export default OcrData
