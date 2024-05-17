/* eslint-disable */
import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import { BsExclamation } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { ShimmerCategoryList } from 'react-shimmer-effects';
function DetailAuthenticate(props) {
    const { frntBackImg, validaData, setFrntImg, setBackImg, setBack, setFrnt,validaLoading } = props
    const [accordianOne, setAccordianOne] = useState(false)
    const [accordianScreen, setAccordianScreen] = useState(false)
    const [accordianScreenBack, setAccordianScreenBack] = useState(false)
    const [accordianSec, setAccordianSec] = useState(false) 
    const [accordianOneBack, setAccordianOneBack] = useState(false)
    const [accordianSecBack, setAccordianSecBack] = useState(false)

    function handleShowAccordionData() {
        setAccordianOne((prev) => !prev)
    }
    function handleShowAccordionScreen() {
        setAccordianScreen((prev) => !prev)
    }
    function handleShowAccordionScreenBack() {
        setAccordianScreenBack((prev) => !prev)
    }
    function handleAccordionsec(data) {
        setAccordianSec((prev) => !prev)
        setBack(false)
        setFrnt(true)
        {
            !accordianSec ?
            data?.map && data?.map !== "" ?
                setFrntImg(data?.map)
                : null
            : frntBackImg?.map((faceimg) => {
                if (faceimg.type == "FRONT") {
                    setFrntImg(faceimg.image)
                }
            })
        }
    }
    function handleShowAccordionDataSec() {
        setAccordianOneBack((prev) => !prev)
    }
    function handleAccordionsecBack(data) {
        setAccordianSecBack((prev) => !prev)
        setBack(true)
        setFrnt(false)
        {
            !accordianSecBack ?
                data?.map && data?.map !== "" ?
                    setBackImg(data?.map)
                    : null
                : frntBackImg?.map((faceimg) => {
                    if (faceimg.type == "BACK") {
                        setBackImg(faceimg.image)
                    }
                })
        }
    }
     
    const forZeroObj = validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[0] !== undefined ? validaData?.detailvalidaAppId[0] : null
    const forOneObj = validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[1] !== undefined ? validaData?.detailvalidaAppId[1] : null
    const ValidaComponentMap = 
    <>
    {validaLoading?<ShimmerCategoryList/>:
    <div className='validat-detail-page-both'>
        {forZeroObj && forZeroObj.type == "FRONT" ?
            <div className="validation-table validaComponent">
                <div className='fraud-analyse-text'>
                    <h2>Front Image Data</h2>
                </div>
                <div className='document status'>
                    {forZeroObj !== undefined ?
                        <p className={forZeroObj?.fraud?.warnings?.length > 0
                        ? "doc-status-warning"
                        :forZeroObj?.alert ? "doc-status-highrisk": 
                        "doc-status-passed"}>{forZeroObj?.alert ? 
                        "High Risk" 
                        :forZeroObj?.fraud?.warnings?.length > 0
                        ? "Warning"
                        :"Normal"}</p>
                        : null}
                </div>
                <div className='risk-accordion-main'>
                    <div className='risk-indicatio-main'>
                        {forZeroObj !== undefined ?
                            <>
                                <span className={forZeroObj?.fraud?.warnings?.length > 0?'risk-indicator-icon risk-warning'
                                    :forZeroObj?.alert ? 'risk-indicator-icon risk-rejected' 
                                : 'risk-indicator-icon'}>{forZeroObj?.fraud?.warnings?.length > 0?<BsExclamation/>
                                    :forZeroObj?.alert ? <GrFormClose /> 
                                : <TiTick />}</span>
                                <span>Risk Indicator</span></> : null}
                    </div>
                    <div className='accordion-main' >
                        <div className='accordian-1st-main'>
                            <button className='accordian-1st' onClick={handleShowAccordionData}>
                                <div className='accordion-text'>
                                    <p>Response Data</p>
                                </div>
                                {forZeroObj !== undefined ?
                                    <div className='show-button'><p className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</p>{' '}{accordianOne ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                    : null}
                            </button>
                            {accordianOne ?
                                <div className='accordion-data'>
                                    <div className='forged-text'>
                                        <span>Alert</span><span>{forZeroObj?.alert ? "true" : "false"}</span>
                                    </div>
                                    <div className='forged-text'>
                                        <span>Global Traces</span><span>{forZeroObj?.fraud?.global_traces?.alert ? "true" : "false"}</span>
                                    </div>
                                    <div className='forged-text'>
                                        <span>Local Traces</span><span>{forZeroObj?.fraud?.local_traces?.alert ? "true" : "false"}</span>
                                    </div>
                                    {forZeroObj?.fraud?.warnings
                                        && <div className='forged-text'>
                                            <span>Warning Messages</span>
                                            <div className="warningResponse">
                                                {forZeroObj?.fraud?.warnings?.map((data, index) => {
                                                    return <span key={index}>{data?.message}</span>
                                                })}</div>
                                        </div>}
                                </div> : null}
                        </div>
                        <div className='accordian-2nd-main accordian-1st-main'>
                            <button className='accordian-1st' onClick={handleShowAccordionScreen}>
                                <div className='accordion-text'>
                                    <p>Screening</p>
                                </div>
                                {forZeroObj !== undefined ?
                                    <div className='show-button'>
                                        <p className='show-hide-text'>{accordianScreen ? "Hide" : "Show"}</p>{' '}{accordianScreen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                    : null}
                            </button>
                        </div>
                        {accordianScreen ?
                            <div className='accordion-data'>
                                <div className='forged-text'>
                                    <span>Alert</span><span>{forZeroObj?.identity?.screen?.alert ? "true" : "false"}</span>
                                </div>
                                {forZeroObj?.identity?.screen?.score && <div className='forged-text'>
                                    <span>Score</span>
                                    <span>
                                        {`${Math.round(forZeroObj?.identity?.screen?.score * 100)}%`}
                                    </span>
                                </div>}
                                <div className='forged-text'>
                                    <span>Print</span><span>{forZeroObj?.identity?.print?.alert ? "true" : "false"}</span>
                                </div>

                            </div>
                            : null}
                        {forZeroObj !== undefined ?
                            <>
                                {forZeroObj?.fraud?.local_traces?.map && forZeroObj?.fraud?.local_traces?.map !== "" &&
                                    <div className='accordian-2nd-main accordian-1st-main'>
                                        <button className='accordian-2nd accordian-1st' >
                                            <div className='accordion-text'>
                                                <p>Image map</p>
                                            </div>
                                            <div className='show-button move-text' onClick={() => handleAccordionsec(forZeroObj?.fraud?.local_traces)}><p className='show-hide-text '>{accordianSec ? "Hide" : "Show"}</p></div>
                                        </button>
                                    </div>}</> : null}
                    </div>
                </div>
            </div>
            : forZeroObj && forZeroObj.type == "BACK" ?
                <div className="validation-table validaComponent-Back">
                    <div className='fraud-analyse-text'>
                        <h2>Back Image Data</h2>
                    </div>
                    <div className='document status'>
                    {forZeroObj !== undefined ?
                        <p className={forZeroObj?.fraud?.warnings?.length > 0
                        ? "doc-status-warning"
                        :forZeroObj?.alert ? "doc-status-highrisk": 
                        "doc-status-passed"}>{forZeroObj?.alert ? 
                        "High Risk" 
                        :forZeroObj?.fraud?.warnings?.length > 0
                        ? "Warning"
                        :"Normal"}</p>
                        : null}
                </div>
                    <div className='risk-accordion-main'>
                        <div className='risk-indicatio-main'>
                            {forZeroObj !== undefined ?
                                <>
                                <span className={forZeroObj?.fraud?.warnings?.length > 0?'risk-indicator-icon risk-warning'
                                    :forZeroObj?.alert ? 'risk-indicator-icon risk-rejected' 
                                : 'risk-indicator-icon'}>{forZeroObj?.fraud?.warnings?.length > 0?<BsExclamation/>
                                    :forZeroObj?.alert ? <GrFormClose /> 
                                : <TiTick />}</span>
                                    <span>Risk Indicator</span></> : null}
                        </div>
                        <div className='accordion-main' >
                            <div className='accordian-1st-main'>
                                <button className='accordian-1st' onClick={handleShowAccordionDataSec}>
                                    <div className='accordion-text'>
                                        <p>Response Data</p>
                                    </div>
                                    {forZeroObj !== undefined ?
                                        <div className='show-button'><p className='show-hide-text'>{accordianOneBack ? "Hide" : "Show"}</p>{' '}{accordianOneBack ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                        : null}
                                </button>
                                {accordianOneBack ?
                                    <div className='accordion-data'>
                                        <div className='forged-text'>
                                            <span>Alert</span><span>{forZeroObj?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Global Traces</span><span>{forZeroObj?.fraud?.global_traces?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Local Traces</span><span>{forZeroObj?.fraud?.local_traces?.alert ? "true" : "false"}</span>
                                        </div>
                                        {forZeroObj?.fraud?.warnings
                                        && <div className='forged-text'>
                                            <span>Warning Messages</span>
                                            <div className="warningResponse">
                                                {forZeroObj?.fraud?.warnings?.map((data, index) => {
                                                    return <span key={index}>{data?.message}</span>
                                                })}</div>
                                        </div>}

                                    </div> : null}
                            </div>
                            <div className='accordian-2nd-main accordian-1st-main'>
                                <button className='accordian-1st' onClick={handleShowAccordionScreenBack}>
                                    <div className='accordion-text'>
                                        <p>Screening</p>
                                    </div>
                                    {forZeroObj !== undefined ?
                                        <div className='show-button'><p className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</p>{' '}{accordianOne ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                        : null}
                                </button>
                            </div>
                            {accordianScreenBack ?
                                <div className='accordion-data'>
                                    <div className='forged-text'>
                                        <span>Alert</span><span>{forZeroObj?.identity?.screen?.alert ? "true" : "false"}</span>
                                    </div>
                                    {forZeroObj?.identity?.screen?.score && <div className='forged-text'>
                                        <span>Score</span>
                                        <span>
                                            {`${Math.round(forZeroObj?.identity?.screen?.score * 100)}%`}
                                        </span>
                                    </div>}
                                    <div className='forged-text'>
                                        <span>Print</span><span>{forZeroObj?.identity?.Print?.alert ? "true" : "false"}</span>
                                    </div>

                                </div>
                                : null}
                            {forZeroObj !== undefined ?
                                <>
                                    {forZeroObj?.fraud?.local_traces?.map && forZeroObj?.fraud?.local_traces?.map !== "" &&
                                        <div className='accordian-2nd-main accordian-1st-main'>
                                            <button className='accordian-2nd accordian-1st' >
                                                <div className='accordion-text'>
                                                    <p>Image map</p>
                                                </div>
                                                <div className='show-button move-text' onClick={() => handleAccordionsecBack(forZeroObj?.fraud?.local_traces)}>
                                                    <p className='show-hide-text '>{accordianSecBack ? "Hide" : "Show"}</p>
                                                </div>
                                            </button>
                                        </div>}</> : null}
                        </div>
                    </div>
                </div>
                : null}
{/*============================================================================================================= */}
        {forOneObj && forOneObj.type == "FRONT" ?
            <div className="validation-table validaComponent">
                <div className='fraud-analyse-text'>
                    <h2>Front Image Data</h2>
                </div>
                <div className='document status'>
                    {forOneObj !== undefined ?
                        <p className={forOneObj?.fraud?.warnings?.length > 0
                        ? "doc-status-warning"
                        :forOneObj?.alert ? "doc-status-highrisk": 
                        "doc-status-passed"}>{forOneObj?.alert ? 
                        "High Risk" 
                        :forOneObj?.fraud?.warnings?.length > 0
                        ? "Warning"
                        :"Normal"}</p>
                        : null}
                </div>
                <div className='risk-accordion-main'>
                    <div className='risk-indicatio-main'>
                        {forOneObj !== undefined ?
                            <>
                            <span className={forOneObj?.fraud?.warnings?.length > 0?'risk-indicator-icon risk-warning'
                                    :forOneObj?.alert ? 'risk-indicator-icon risk-rejected' 
                                : 'risk-indicator-icon'}>{forOneObj?.fraud?.warnings?.length > 0?<BsExclamation/>
                                    :forOneObj?.alert ? <GrFormClose /> 
                                : <TiTick />}</span>                              
                                  <span>Risk Indicator</span></> : null}
                    </div>
                    <div className='accordion-main' >
                        <div className='accordian-1st-main'>
                            <button className='accordian-1st' onClick={handleShowAccordionData}>
                                <div className='accordion-text'>
                                    <p>Response Data</p>
                                </div>
                                {forOneObj !== undefined ?
                                    <div className='show-button'><p className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</p>{' '}{accordianOne ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                    : null}
                            </button>
                            {accordianOne ?
                                <div className='accordion-data'>
                                    <div className='forged-text'>
                                        <span>Alert</span><span>{forOneObj?.alert ? "true" : "false"}</span>
                                    </div>
                                    <div className='forged-text'>
                                        <span>Global Traces</span><span>{forOneObj?.fraud?.global_traces?.alert ? "true" : "false"}</span>
                                    </div>
                                    <div className='forged-text'>
                                        <span>Local Traces</span><span>{forOneObj?.fraud?.local_traces?.alert ? "true" : "false"}</span>
                                    </div>
                                    {forOneObj?.fraud?.warnings
                                        && <div className='forged-text'>
                                            <span>Warning Messages</span>
                                            <div className="warningResponse">
                                                {forOneObj?.fraud?.warnings?.map((data, index) => {
                                                    return <span key={index}>{data?.message}</span>
                                                })}</div>
                                        </div>}
                                </div> : null}
                        </div>

                        <>
                            <div className='accordian-2nd-main accordian-1st-main'>
                                <button className='accordian-1st' onClick={handleShowAccordionScreen}>
                                    <div className='accordion-text'>
                                        <p>Screening</p>
                                    </div>
                                    {forZeroObj !== undefined ?
                                        <div className='show-button'><p className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</p>{' '}{accordianOne ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                        : null}
                                </button>
                            </div></>
                        {accordianScreen ?
                            <div className='accordion-data'>
                                <div className='forged-text'>
                                    <span>Alert</span><span>{forOneObj?.identity?.screen?.alert ? "true" : "false"}</span>
                                </div>
                                {forOneObj?.identity?.screen?.score && <div className='forged-text'>
                                    <span>Score</span>
                                    <span>
                                        {`${Math.round(forOneObj?.identity?.screen?.score * 100)}%`}
                                    </span>
                                </div>}
                                <div className='forged-text'>
                                    <span>Print</span><span>{forOneObj?.identity?.Print?.alert ? "true" : "false"}</span>
                                </div>

                            </div>
                            : null}
                        {forOneObj !== undefined ?
                            <>
                                {forOneObj?.fraud?.local_traces?.map && forOneObj?.fraud?.local_traces?.map !== "" &&
                                    <div className='accordian-2nd-main accordian-1st-main'>
                                        <button className='accordian-2nd accordian-1st' >
                                            <div className='accordion-text'>
                                                <p>Image map</p>
                                            </div>
                                            <div className='show-button move-text' onClick={() => handleAccordionsec(forOneObj?.fraud?.local_traces)}><p className='show-hide-text '>{accordianSec ? "Hide" : "Show"}</p></div>
                                        </button>
                                    </div>}</> : null}
                    </div>
                </div>
            </div>
            : forOneObj && forOneObj.type == "BACK" ?
                <div className="validation-table validaComponent-Back">
                    <div className='fraud-analyse-text'>
                        <h2>Back Image Data</h2>
                    </div>
                    <div className='document status'>
                    {forOneObj !== undefined ?
                        <p className={forOneObj?.fraud?.warnings?.length > 0
                        ? "doc-status-warning"
                        :forOneObj?.alert ? "doc-status-highrisk": 
                        "doc-status-passed"}>{forOneObj?.alert ? 
                        "High Risk" 
                        :forOneObj?.fraud?.warnings?.length > 0
                        ? "Warning"
                        :"Normal"}</p>
                        : null}
                </div>
                    <div className='risk-accordion-main'>
                        <div className='risk-indicatio-main'>
                            {forOneObj !== undefined ?
                                <>
                                    <span className={forOneObj?.alert ? 'risk-indicator-icon risk-rejected' : 'risk-indicator-icon'}>{forOneObj?.alert ? <GrFormClose /> : <TiTick />}</span>
                                    <span>Risk Indicator</span></> : null}
                        </div>
                        <div className='accordion-main' >
                            <div className='accordian-1st-main'>
                                <button className='accordian-1st' onClick={handleShowAccordionDataSec}>
                                    <div className='accordion-text'>
                                        <p>Response Data</p>
                                    </div>
                                    {forOneObj !== undefined ?
                                        <div className='show-button'><p className='show-hide-text'>{accordianOneBack ? "Hide" : "Show"}</p>{' '}{accordianOneBack ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                        : null}
                                </button>
                                {accordianOneBack ?
                                    <div className='accordion-data'>
                                        <div className='forged-text'>
                                            <span>Alert</span><span>{forOneObj?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Global Traces</span><span>{forOneObj?.fraud?.global_traces?.alert ? "true" : "false"}</span>
                                        </div>
                                        <div className='forged-text'>
                                            <span>Local Traces</span><span>{forOneObj?.fraud?.local_traces?.alert ? "true" : "false"}</span>
                                        </div>
                                        {forOneObj?.fraud?.warnings
                                        && <div className='forged-text'>
                                            <span>Warning Messages</span>
                                            <div className="warningResponse">
                                                {forOneObj?.fraud?.warnings?.map((data, index) => {
                                                    return <span key={index}>{data?.message}</span>
                                                })}</div>
                                        </div>}
                                    </div> : null}
                            </div>
                            <div className='accordian-2nd-main accordian-1st-main'>
                                <button className='accordian-1st' onClick={handleShowAccordionScreenBack}>
                                    <div className='accordion-text'>
                                        <p>Screening</p>
                                    </div>
                                    {forOneObj !== undefined ?
                                        <div className='show-button'><p className='show-hide-text'>{accordianOne ? "Hide" : "Show"}</p>{' '}{accordianOne ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                                        : null}
                                </button>
                            </div>
                            {accordianScreenBack ?
                                <div className='accordion-data'>
                                    <div className='forged-text'>
                                        <span>Alert</span><span>{forOneObj?.identity?.screen?.alert ? "true" : "false"}</span>
                                    </div>
                                    {forOneObj?.identity?.screen?.score && <div className='forged-text'>
                                        <span>Score</span>
                                        <span>
                                            {`${Math.round(forOneObj?.identity?.screen?.score * 100)}%`}
                                        </span>
                                    </div>}
                                    <div className='forged-text'>
                                        <span>Print</span><span>{forOneObj?.identity?.print?.alert ? "true" : "false"}</span>
                                    </div>

                                </div>
                                : null}
                            {forOneObj !== undefined ?
                                <>
                                    {forOneObj?.fraud?.local_traces?.map && forOneObj?.fraud?.local_traces?.map !== "" &&
                                        <div className='accordian-2nd-main accordian-1st-main'>
                                            <button className='accordian-2nd accordian-1st' >
                                                <div className='accordion-text'>
                                                    <p>Image map</p>
                                                </div>
                                                <div className='show-button move-text' onClick={() => handleAccordionsecBack(forOneObj?.fraud?.local_traces)}>
                                                    <p className='show-hide-text '>{accordianSecBack ? "Hide" : "Show"}</p>
                                                </div>
                                            </button>
                                        </div>}
                                </>
                                : null}
                        </div>
                    </div>
                </div>
                : null}
                 </div>}
                 </>

    return (
        <div className='id-validations-data'>
            <h2>Document Authentications</h2>
            <div>{ValidaComponentMap}</div>
        </div>
    )
}

export default DetailAuthenticate