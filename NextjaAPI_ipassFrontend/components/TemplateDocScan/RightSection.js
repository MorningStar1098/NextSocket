/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { BsUpload, BsChevronDown } from 'react-icons/bs';
import { MdClose, MdOutlineContentCopy } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactHtmlParser from 'react-html-parser';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { toast } from "react-toastify";
import { JsonView, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
// import ReactJson from '@textea/json-viewer'


function RightSection(props) {
    const { currentImgData } = props;
    const isEmpty = (value) => {
        // console.log("val",value);
        return (value == null || value.length === 0 || value == undefined);
    }
    // console.log("gggd", typeof currentImgData);
    const download = <BsUpload />;
    const coppyIcon = <MdOutlineContentCopy className='coppy-text-icon' />;
    const [mainTab, setMainTab] = useState(true)
    const [rawTab, setRawTab] = useState(false)
    const [showDownloadPop, setShowDownloadPop] = useState(false);
    const coppyToast = () => toast.success("Copied to clipboard");
    const failedToast = () => toast.error("No data available");
    // const [filteredParaData, setFilteredParaData] = useState();
    // const [showEmptyText, setShowEmptyText] = useState();
    // useEffect(() => {
    //     setFilteredParaData(getFilteredData(currentImgData));
    // }, [currentImgData])
    const ocrData = handleShowOcrData()
    const showAllTables = formatTableData()
    const showAllTablesHtml = ReactHtmlParser(showAllTables);
    // const noDataToast = failedToast()
    // const stringParaTable = getTempStringData(filteredParaData, "excel");
    const downloadAllText = handleShowOcrData()
    function handleMainTab() {
        setMainTab(true)
        setRawTab(false)
    }
    function handleRawTab() {
        setRawTab(true)
        setMainTab(false)
    }
    function handleDownload() {             //To show download popup
        if (isEmpty(currentImgData)) {
            failedToast()
        } else {
            setShowDownloadPop(true)
            const ele = document.getElementById("rightSectionMain");
            ele.style.overflow = "hidden";
        }
    }
    function handleDownloadPopClose() {       //To close download popup
        setShowDownloadPop(false);
        const ele = document.getElementById("rightSectionMain");
        ele.style.overflow = "auto";
    }
    function ExportToDoc(element, filename = '') {          //export the table to docx
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        const footer = "</body></html>";
        const html = header + document.getElementById(element).innerHTML + footer;
        const blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        const url = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(html)}`;
        filename = filename ? `${filename}.doc` : 'scanned_text.doc';
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }
        document.body.removeChild(downloadLink);
    }
    function handleWordDownload() {
        // if (textTab) {
        if (isEmpty(currentImgData)) {
            failedToast()
        } else {
            ExportToDoc("allTextToDownload");
        }
        // }
        // else if (tableTab) {
        //     ExportToDoc("wordTableForDownloadingId");
        // }
    }

    function handleShowOcrData() {
        return <div>
            <>
                {currentImgData && currentImgData.analyzeResult && currentImgData.analyzeResult.documents !== undefined
                    ?
                    currentImgData.analyzeResult.documents.map((ocrData) => {
                        const ocrdata = ocrData?.fields

                        {/* const field1 = ocrData["الاسم التجاري للمنشأة"] */ }
                        {/* console.log("resp", ocrdata) */ }

                        {/* const entries = Object.entries(ocrdata); */ }
                        const entries = Object.entries(ocrdata);
                        {/* console.log("gg", entries) */ }
                        return (
                            <>
                                <div className='id-check-lower-main tem-doc-scan-main'>
                                    <table id='tableForDownloading'>
                                        <thead>
                                            <tr>
                                                <th>Forms</th>
                                                <th>Visual</th>
                                                {/* <th>Valid</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entries.map(([key, value]) => {
                                                const datas = value.valueObject
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{key}</td>
                                                            <td>{value.content}</td>
                                                        </tr>
                                                        {value.valueObject ?
                                                            <>
                                                                {/* <span>colapse</span> */}
                                                                {Object.entries(datas).map(([ke1, val1]) => {
                                                                    return (
                                                                        <>
                                                                            {val1?.valueObject !== undefined ? Object.entries(val1?.valueObject).map(([key2, val2]) => {
                                                                                {/* console.log("hh", key2) */ }
                                                                                return (
                                                                                    <tr>
                                                                                        {/* <td>{val2?.content}</td> */}
                                                                                        <td>{key2}</td>
                                                                                        <td>{val2.content}</td>
                                                                                    </tr>
                                                                                )

                                                                            }) : null}
                                                                        </>
                                                                    )

                                                                })}
                                                            </>
                                                            : null}
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    })
                    : null}

            </>
            {/* <h2>Hello</h2> */}
        </div>
    }
    const newFormatCopyData = (elem) => {             //To copy the data on click
        const elTable = document.querySelector(elem);
        let range;
        let sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(elTable);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(elTable);
                sel.addRange(range);
            }
            document.execCommand('copy');
        }
        sel.removeAllRanges();
        coppyToast();
    }
    function handleCoppy() {
        newFormatCopyData("#tab-textdata-id")
    }
    function handleCoppyMainData() {
        newFormatCopyData("#tableForDownloading")
    }

    function formatTableData(forDownload = false) {
        let tableDataExcString = ``;
        currentImgData?.analyzeResult?.tables?.map((tdata, i) => {
            tableDataExcString = forDownload
                ? `${tableDataExcString}<tbody><tr/><tr/>`
                : `${tableDataExcString}<tbody>`;

            if (forDownload) {
                tdata?.cells?.map((cellDataValue, cindex, cellArray) => {
                    if (cellDataValue.rowIndex > cellArray[cindex - 1]?.rowIndex || cellDataValue.rowIndex == 0) {
                        if (cellDataValue.rowIndex - cellArray[cindex - 1]?.rowIndex > 1) {
                            tableDataExcString += `<tr></tr>`;
                        }
                        if (cellDataValue.rowIndex !== 0) {
                            tableDataExcString += `</tr>`
                        }
                        if (cellDataValue.rowIndex !== cellArray[cindex - 1]?.rowIndex) {
                            tableDataExcString += `<tr>`
                        }
                        if (cellDataValue.rowSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</th>`
                                : `<td rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</td>`;
                        }
                        else if (cellDataValue.columnSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</th>`
                                : `<td colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</td>`;
                        }
                        else {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th>${cellDataValue.content}</th>`
                                : `<td>${cellDataValue.content}</td>`;
                        }
                    } else {
                        if (cellDataValue.rowSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</th>`
                                : `<td rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</td>`;
                        }
                        else if (cellDataValue.columnSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</th>`
                                : `<td colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</td>`;
                        }
                        else {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th>${cellDataValue.content}</th>`
                                : `<td>${cellDataValue.content}</td>`;
                        }
                    }
                })
            } else {
                tdata?.cells?.map((cellDataValue, cindex, cellArray) => {
                    // if (cellDataValue?.boundingRegions[0]?.pageNumber == pageNumber) {
                    if (cellDataValue.rowIndex > cellArray[cindex - 1]?.rowIndex || cellDataValue.rowIndex == 0) {
                        if (cellDataValue.rowIndex - cellArray[cindex - 1]?.rowIndex > 1) {
                            tableDataExcString += `<tr></tr>`;
                        }
                        if (cellDataValue.rowIndex !== 0) {
                            tableDataExcString += `</tr>`
                        }
                        if (cellDataValue.rowIndex !== cellArray[cindex - 1]?.rowIndex) {
                            tableDataExcString += `<tr>`
                        }
                        if (cellDataValue.rowSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</th>`
                                : `<td rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</td>`;
                        }
                        else if (cellDataValue.columnSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</th>`
                                : `<td colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</td>`;
                        }
                        else {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th>${cellDataValue.content}</th>`
                                : `<td>${cellDataValue.content}</td>`;
                        }
                    }
                    else {
                        if (cellDataValue.rowSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</th>`
                                : `<td rowspan=${cellDataValue.rowSpan}>${cellDataValue.content}</td>`;
                        }
                        else if (cellDataValue.columnSpan) {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</th>`
                                : `<td colSpan=${cellDataValue.columnSpan}>${cellDataValue.content}</td>`;
                        }
                        else {
                            tableDataExcString += cellDataValue.kind && cellDataValue.kind === "columnHeader"
                                ? `<th>${cellDataValue.content}</th>`
                                : `<td>${cellDataValue.content}</td>`;
                        }
                    }
                    // }
                })
            }
            tableDataExcString += `</tbody>`;
        });
        return tableDataExcString;
    }
    const jsonStyle = {
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' }
    }
    async function handleRequest() {
        const json = JSON.stringify(currentImgData);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "rawData" + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // console.log("ff", currentImgData);
    return (
        <>
            <div className='right section-main' id="rightSectionMain">
                <div className='right-section-inner'>
                    {/* <div className='tabs-header-main'> */}
                    <ul>
                        <li className={mainTab ? "text-tab active" : 'text-tab'}>
                            <span onClick={handleMainTab}>Main</span>
                        </li>
                        <li className={rawTab ? "table-tab active" : "table-tab"}>
                            <span onClick={handleRawTab}>Raw</span>
                        </li>
                    </ul>

                    <ul className="iconBlock">
                        {mainTab ?
                            <>
                                <li className='Download-button-main' onClick={handleDownload}>
                                    <button> {download}</button>
                                </li>
                                <li className='Download-button-main' onClick={handleCoppyMainData}>
                                    <button> {coppyIcon}</button>
                                </li>
                            </>
                            :
                            <>
                                <li className='Download-button-main' onClick={handleRequest}>
                                    <button> {download}</button>
                                </li>
                                <li className='Download-button-main' onClick={handleCoppy}>
                                    <button> {coppyIcon}</button>
                                </li>
                            </>
                        }
                    </ul>
                    {/* </div> */}

                    <div className="tabDataMain">
                        {mainTab ?
                            ocrData
                            : null}
                        {rawTab && currentImgData?.analyzeResult ?
                            <>
                                <div id='tab-textdata-id'>
                                    <JsonView
                                        data={currentImgData}
                                        shouldInitiallyExpand={(level) => true}
                                        style={defaultStyles}
                                        expander="expanding-buttons"
                                    />
                                </div>
                            </>
                            : null}

                        {currentImgData == null ? <div className='noDataTableText'>
                            <span>No data found.</span>
                        </div> : null}
                    </div>
                    {showDownloadPop
                        && <div className="downloadDataPopup">
                            <OutsideClickHandler
                                onOutsideClick={handleDownloadPopClose}
                            >
                                <ul className='downloadOptions' >
                                    <div className="closeDownloadPopup">
                                        <MdClose onClick={handleDownloadPopClose} />
                                    </div>
                                    <li onClick={handleWordDownload}>Download as word</li>
                                    {/* {tableTab
                                    ? <li>
                                        <ReactHTMLTableToExcel
                                            id="table-xls-button"
                                            className="download-table-xls-button"
                                            table="tableForDownloading"
                                            filename="tablexls"
                                            sheet="tablexls"
                                            buttonText="Download as excel"
                                        />
                                    </li>
                                    : textTab
                                        ? <li> */}
                                    {mainTab
                                        ?
                                        <li>
                                            <ReactHTMLTableToExcel
                                                id="table-xls-button"
                                                className="download-table-xls-button"
                                                table="tableForDownloading"
                                                filename="tablexls"
                                                sheet="tablexls"
                                                buttonText="Download as excel"
                                            />
                                            {/* <ReactHTMLTableToExcel
                                                id="table-xls-button"
                                                className="download-table-xls-button"
                                                table="excelParaData"
                                                filename="textxls"
                                                sheet="textxls"
                                                buttonText="Download as excel"
                                            /> */}
                                        </li>
                                        : null}
                                    {/* </li>
                                        : 
                                } */}
                                    {/* <li onClick={() => { failedToast() }}>Downoad as excel</li> */}
                                </ul>
                            </OutsideClickHandler>
                        </div>}
                </div>
                <div id="allTextToDownload" style={{ display: "none" }}>
                    {downloadAllText}
                </div>

            </div>
        </>
    )
}

export default RightSection