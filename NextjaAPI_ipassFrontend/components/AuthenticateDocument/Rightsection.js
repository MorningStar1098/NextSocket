/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { BsExclamation } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

function Rightsection(props) {
    const {
        validityResponse,
        setShowDocInCenter,
        setImageInCenter,
        showDocInCenter,
        setPageNumber,
        currentImgData,
        setNormalPDF,
        setMappedPDF
    } = props

    const [accordianOne, setAccordianOne] = useState(false)
    const [accordianSec, setAccordianSec] = useState(false)
    const [validObjHTML, setValidObjHTML] = useState()
    const [accordionPdf, setAccordianPdf] = useState(false)
    const [accordianScreenImage, setAccordianScreenImage] = useState(false)

    setNormalPDF(`data:application/pdf/png/jpeg;base64,${validityResponse?.base64}`);
    setMappedPDF(`data:application/pdf/png/jpeg;base64,${validityResponse?.fraud?.local_traces?.map}`);

    useEffect(() => {
        creatModifiedObjArr(validityResponse);
    }, [validityResponse]);

    function handleShowPdfAccordionData() {
        setAccordianPdf((prev) => !prev)
    }

    function handleShowAccordionData() {
        setAccordianOne((prev) => !prev)
    }

    function handleAccordionsec() {
        setAccordianSec((prev) => !prev)
        setShowDocInCenter((prev) => !prev)
        if (showDocInCenter) {
            setImageInCenter(`data:application/pdf/png/jpeg;base64,${validityResponse?.base64}`)
        } else {
            setImageInCenter(`data:application/pdf/png/jpeg;base64,${validityResponse?.fraud?.local_traces?.map}`)
        }
    }

    function handleValidaPageClick(object, page) {        //On click of accordian tab
        setPageNumber(parseInt(page));
        const ele = document.getElementById(`validPdfid${object}`);
        const eleb = document.getElementById(`validPdfidb${object}`);
        const mappedPDF = document.getElementById("mappedPDFDOC");
        const normalPDF = document.getElementById("normalPDFDOC");
        if (ele.className == "hideAccordian") {
            ele.className = "showAccordian";
            eleb.className = "showButton";
            setShowDocInCenter(true);
        }
        else {
            ele.className = "hideAccordian";
            eleb.className = "hideButton";
            setShowDocInCenter(false);
        }
        if (ele.className == "hideAccordian") {
            mappedPDF.style.display = "none";
            normalPDF.style.display = "block";
        } else {
            mappedPDF.style.display = "block";
            normalPDF.style.display = "none";
        }
        const eles = document.getElementById("validPdfidbinside" + object);
        eles.className = eles.className == "hidePDF" ? "showPDF" : "hidePDF";
    }

    function creatModifiedObjArr(validata) {        //To put modified_objects in array validapdf
        const abaVAlida = <div className="validaOuter">
            {validata?.type == "application/pdf"
                && validata?.fraud?.local_traces?.digital_forgeries_pdf !== null
                && validata?.fraud?.local_traces?.digital_forgeries_pdf.length > 0
                ? validata?.fraud?.local_traces?.digital_forgeries_pdf.map((data, i) => (
                    <div className='pdf-accordian-wrapper' key={i}>
                        <div className='outside-button'>
                            <button
                                className='hideButton'
                                id={`validPdfidb${data.object_id}`}
                                onClick={() => handleValidaPageClick(data.object_id, data.page_nr)}
                            >
                                <div className='accordion-text'>
                                    <p>{data.detector}</p>
                                </div>
                                <div className='show-button'>
                                    <button className='hidePDF' id={`validPdfidbinside${data.object_id}`} >
                                        <span className='show-hide-text' />
                                    </button>
                                    <MdKeyboardArrowDown />
                                </div>
                            </button>
                        </div>
                        <div key={i} id={`validPdfid${data.object_id}`} className="hideAccordian">
                            <div data-page={data.object_id}>
                                <div className="validAccorTabOuter forged-text">
                                    <span className="validAccorTitle">Alert</span>
                                    <span className="validAccorAns">{data.alert ? "true" : "false"}</span>
                                </div>
                                <div className="validAccorTabOuter forged-text">
                                    <span className="validAccorTitle">Page No.</span>
                                    <span className="validAccorAns">{data.page_nr}</span>
                                </div>
                                <div className="validAccorTabOuter forged-text">
                                    <span className="validAccorTitle">Detector</span>
                                    <span className="validAccorAns">{data.detector}</span>
                                </div>
                                <div className="validAccorTabOuter forged-text">
                                    <span className="validAccorTitle">Message</span>
                                    <span className="validAccorAns">{data.message}</span>
                                </div>
                                {data?.previous_values
                                    && <div className="validAccorTabOuter forged-text">
                                        <span className="validAccorTitle">Previous Values</span>
                                        <div className="warningResponse">
                                            {data?.previous_values?.map((data1, index1) => {
                                                return <span key={index1}>{data1}</span>
                                            })}</div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                ))
                : null
            }
        </div>
        setValidObjHTML(abaVAlida);
    }
    // console.log("d",validityResponse?.fraud?.warnings);

    // console.log("validityResponse", validityResponse)

    const validationData = validityResponse?.error
        ? <div>{validityResponse?.error}</div>
        : validityResponse
            ? validityResponse?.type == "image/png" || validityResponse?.type == "image/jpeg"
                ? <div className="validation-table">
                    <div className='fraud-analyse-text'>
                        <h2>Fraud Analysis</h2>
                    </div>
                    <div className='document status'>
                        <p
                            className={validityResponse?.alert
                                ? "doc-status-highrisk"
                                : validityResponse?.fraud?.warnings?.length > 0
                                    ? "doc-status-warning"
                                    : "doc-status-passed"}
                        >
                            {validityResponse?.alert
                                ? "High Risk"
                                : validityResponse?.fraud?.warnings?.length > 0
                                    ? "Warning"
                                    : "Normal"}
                        </p>
                    </div>
                    <div className='risk-accordion-main'>
                    <div className='risk-indicatio-main'>
                            {validityResponse?.alert
                                ? <span className='risk-indicator-icon risk-rejected'><GrFormClose /></span>
                                : validityResponse?.fraud?.warnings?.length > 0
                                    ? <span className='risk-indicator-icon risk-warning'><BsExclamation /></span>
                                    : <span className='risk-indicator-icon'><TiTick /></span>}
                            <span>Risk Indicator</span>
                        </div>
                        <div className='accordion-main' >
                            <div className='accordian-1st-main'>
                                <button className='accordian-1st' onClick={handleShowAccordionData}>
                                    <div className='accordion-text'>
                                        <p>Manipulated Data Response</p>
                                    </div>
                                    <div className='show-button'>
                                        <span className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</span>
                                        {' '}{accordionPdf ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                    </div>
                                </button>
                                {accordianOne
                                    ? <div className='accordion-data'>
                                        <div className='forged-text'>
                                            <span>Forged</span>
                                            <span>{validityResponse?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Global Traces</span>
                                            <span>{validityResponse?.fraud?.global_traces?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Local Traces</span>
                                            <span>{validityResponse?.fraud?.local_traces?.alert ? "true" : "false"}</span>
                                        </div>
                                        {validityResponse?.fraud?.local_traces?.digital_forgeries?.score
                                            ? <div className='forged-text'>
                                                <span>Score</span>
                                                <span>
                                                    {Math.round(validityResponse?.fraud?.local_traces?.digital_forgeries?.score * 100)}%
                                                </span>
                                            </div>
                                            : null}
                                            {validityResponse?.fraud?.warnings
                                        && <div className='forged-text'>
                                            <span>Warning Messages</span>
                                            <div className="warningResponse">
                                                {validityResponse?.fraud?.warnings?.map((data, index) => {
                                                    {/* console.log("ddd",data) */}
                                                    return <span key={index}>{data?.message}</span>
                                                })}
                                                </div>
                                        </div>}
                                    </div>
                                    
                                    : null}

                                <button className='accordian-1st' onClick={() => { setAccordianScreenImage((prev) => !prev) }}>
                                    <div className='accordion-text'>
                                        <p>Screening Data Response</p>
                                    </div>
                                    <div className='show-button'>
                                        <span className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</span>
                                        {' '}{accordionPdf ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                    </div>
                                </button>
                                {accordianScreenImage
                                    ? <div className='accordion-data'>
                                        {/* <div className='forged-text'>
                                            <span>Forged</span>
                                            <span>{validityResponse?.identity?.screen?.alert ? "true" : "false"}</span>
                                        </div> */}
                                        <div className='forged-text'>
                                            <span>Print</span>
                                            <span>{validityResponse?.identity?.print?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Screen</span>
                                            <span>{validityResponse?.identity?.screen?.alert ? "true" : "false"}</span>
                                        </div>
                                        {validityResponse?.identity?.print?.score
                                            ? <div className='forged-text'>
                                                <span>Print Score</span>
                                                <span>{Math.round(validityResponse?.identity?.print?.score * 100)}%</span>
                                            </div>
                                            : null}
                                        {validityResponse?.identity?.screen?.score
                                            ? <div className='forged-text'>
                                                <span>Screen Score</span>
                                                <span>{Math.round(validityResponse?.identity?.screen?.score * 100)}%</span>
                                            </div>
                                            : null}
                                    </div>
                                    : null}
                            </div>
                            {validityResponse?.fraud?.local_traces?.map && validityResponse?.fraud?.local_traces?.map !== ""
                                && <div className='accordian-2nd-main accordian-1st-main'>
                                    <button className='accordian-2nd accordian-1st' >
                                        <div className='accordion-text'>
                                            <p>Image map</p>
                                        </div>
                                        <div className='show-button move-text' onClick={handleAccordionsec}>
                                            <span className='show-hide-text '>{accordianSec ? "Hide" : "Show"}</span>
                                        </div>
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
                : <div className="validation-table validation-pdf-table">
                    <div className='fraud-analyse-text'>
                        <h2>Fraud Analysis</h2>
                    </div>
                    <div className='document status'>
                        <p
                            className={validityResponse?.alert
                                ? "doc-status-highrisk"
                                : validityResponse?.fraud?.warnings?.length > 0
                                    ? "doc-status-warning"
                                    : "doc-status-passed"}
                        >
                            {validityResponse?.alert
                                ? "High Risk"
                                : validityResponse?.fraud?.warnings?.length > 0
                                    ? "Warning"
                                    : "Normal"}
                        </p>
                    </div>
                    <div className='risk-accordion-main'>
                        <div className='risk-indicatio-main'>
                            {validityResponse?.alert
                                ? <span className='risk-indicator-icon risk-rejected'><GrFormClose /></span>
                                : validityResponse?.fraud?.warnings?.length > 0
                                    ? <span className='risk-indicator-icon risk-warning'><BsExclamation /></span>
                                    : <span className='risk-indicator-icon'><TiTick /></span>}
                            <span>Risk Indicator</span>
                        </div>
                        <div className='accordian-1st-main'>
                            <button className='accordian-1st' onClick={handleShowPdfAccordionData}>
                                <div className='accordion-text'>
                                    <p>Response Data</p>
                                </div>
                                <div className='show-button'>
                                    <span className='show-hide-text'>{accordionPdf ? "Hide" : "Show"}</span>
                                    {' '}{accordionPdf ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </div>
                            </button>
                            {accordionPdf
                                ? <div className='accordion-data'>
                                    <div className='forged-text'>
                                        <span>Forged</span>
                                        <span>{validityResponse?.alert ? "true" : "false"}</span>
                                    </div>
                                    <div className='forged-text'>
                                        <span>Global Traces</span>
                                        <span>{validityResponse?.fraud?.global_traces?.alert ? "true" : "false"}</span>
                                    </div>
                                    <div className='forged-text'>
                                        <span>Local Traces</span>
                                        <span>{validityResponse?.fraud?.local_traces?.alert ? "true" : "false"}</span>
                                    </div>
                                    {validityResponse?.fraud?.warnings
                                        && <div className='forged-text'>
                                            <span>Warning Messages</span>
                                            <div className="warningResponse">
                                                {validityResponse?.fraud?.warnings?.map((data, index) => {
                                                    return <span key={index}>{data?.message}</span>
                                                })}</div>
                                        </div>}
                                </div>
                                : null}
                        </div>
                        {validObjHTML}
                    </div>
                </div>
            : null;

    return (
        <div className='right section-main' id="rightSectionMain">
            <div className='right-section-inner'>
                <ul>
                    <li className="text-tab active">
                        <span>Authentication</span>
                    </li>
                </ul>
                <div className="tabDataMain" >
                    {currentImgData?.email
                        ? <div className="validation-data">{validationData}</div>
                        : <div className="validation-nodata">No data available</div>}
                </div>
            </div>
        </div>
    )
}

export default Rightsection
