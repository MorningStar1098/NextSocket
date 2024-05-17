/* eslint-disable */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsUpload } from 'react-icons/bs';
import { MdClose, MdOutlineContentCopy } from 'react-icons/md';
import { toast } from "react-toastify";
import OutsideClickHandler from "react-outside-click-handler";
import ReactHtmlParser from 'react-html-parser';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Handwritten from './handwritten';

function RightSection(props) {
    const { currentImgData, pageNumber, validTab, docTypeObj } = props;
    const [textTab, setTextTab] = useState(true);
    const [tableTab, setTableTab] = useState(false);
    const [filteredParaData, setFilteredParaData] = useState();
    const [showDownloadPop, setShowDownloadPop] = useState(false);
    const download = <BsUpload />;
    const coppyIcon = <MdOutlineContentCopy className='coppy-text-icon' />;
    const coppyToast = () => toast.success("Copied to clipboard");
    const failedToast = () => toast.error("No data available");
    const tableDataHtml = formatTableData();
    const tableDataHtml1 = ReactHtmlParser(tableDataHtml);
    const stringParaTable = getTempStringData(filteredParaData, "excel");
    const tableDataParaExcel = ReactHtmlParser(stringParaTable);
    const [showEmptyTable, setShowEmptyTable] = useState();
    const [showEmptyText, setShowEmptyText] = useState();
    const showTextData = showText();
    const showAllTables = formatTableData(true);
    const showAllTablesHtml = ReactHtmlParser(showAllTables);
    const downloadAllText = showText(true);
    const ocrDataArr = currentImgData?.ocrtext && currentImgData?.ocrtext.split("\n");
    const [showHandWritten, setShowHandWritten] = useState(false);
    const handText = handWrittenText(false);
    const parsedHandText = handText && ReactHtmlParser(handText);
    const handExcelText = handWrittenText(true)
    const parsedHandExcelText = handExcelText && ReactHtmlParser(handExcelText);
    useEffect(() => {
        if (currentImgData?.doctype == docTypeObj.handwritten) {
            setShowHandWritten(true)
        }
        else {
            setShowHandWritten(false)
        }
    }, [currentImgData])

    useEffect(() => {
        setShowEmptyText(shouldShowTextData);
    }, [showText])

    useEffect(() => {
        setShowEmptyTable(shouldShowTableData());
    }, [formatTableData]);

    useEffect(() => {
        setFilteredParaData(getFilteredData(currentImgData));
    }, [currentImgData])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function shouldShowTableData() {
        const abcd = document?.querySelectorAll("#tab-tabledata-id #dataTable tbody")
        let final = true;
        for (const element of abcd) {
            if (element?.innerHTML == "") {
                final = true;
            } else {
                return false;
            }
        }
        return final;
    }

    function shouldShowTextData() {
        const abcd = document?.querySelector("#tab-textdata-id .paragraphMain")
        return abcd?.innerHTML == "";
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

    function getFilteredData(selectedData) {            //It will filter the table text from paragraph
        const paraData = selectedData?.analyzeResult?.paragraphs;
        const tableDataContent = [];
        selectedData?.analyzeResult?.tables?.map((data, i) => {
            data?.cells?.map((tableData) => {
                tableDataContent.push(tableData?.content);
            })
        });
        return paraData?.filter(item => !tableDataContent.includes(item.content));
    }

    function getTempStringData(filteredData, type) {  //To put para data into template string for the copy and docx and excel
        let tempStringData = ``;
        let tempStringParaData = ``;
        let tempStringTableData = `<table id="excelParaData"><tbody>`;
        filteredData?.map((data, i) => {
            const crole = data.content && data.content !== undefined
                ? data?.role
                    ? data?.role
                    : "Paragraph"
                : '';
            const role = capitalizeFirstLetter(crole);
            const contents = data.content && data.content !== undefined ? data.content : '';
            tempStringData = tempStringData + `${role} \n\n${contents} \n\n======================= \n\n\n`;
            tempStringParaData = tempStringParaData + `<b>${role}</b> <br/><br/>${contents}  <br/><hr/><br/><br/>`;
            tempStringTableData = tempStringTableData + `<tr><td><b>${role}</b></td><td>${contents}</td></tr>`;
        })
        tempStringTableData = tempStringTableData + `</tbody></table>`;
        if (type == "docx") {
            return tempStringParaData;
        }
        return type == "excel" ? tempStringTableData : tempStringData;
    }

    function handleWordDownload() {
        if (textTab) {
            ExportToDoc("allTextToDownload");
        }
        else if (tableTab) {
            ExportToDoc("wordTableForDownloadingId");
        }
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

    function handleTextTab() {  //When click on textTab
        setTextTab(true)
        setTableTab(false)
    }

    function handleTableTab() {      //When click on tableTab
        setTableTab(true)
        setTextTab(false)
    }

    async function handleCoppy() {             //When copy text button is clicked
        if (textTab) {
            if (showEmptyText) {
                failedToast()
            }
            else {
                newFormatCopyData("#tab-textdata-id")
            }
        }
        else if (tableTab) {
            if (showEmptyTable) {
                failedToast()
            }
            else {
                newFormatCopyData("#dataTable");
            }
        }
    }

    function handleDownload() {             //To show download popup
        setShowDownloadPop(true)
        const ele = document.getElementById("rightSectionMain");
        ele.style.overflow = "hidden";
    }

    function handleDownloadPopClose() {       //To close download popup
        setShowDownloadPop(false);
        const ele = document.getElementById("rightSectionMain");
        ele.style.overflow = "auto";
    }

    function showText(forDownload = false) {
        return <div className="paragraphMain">
            {filteredParaData?.map((data, i) => {
                if (forDownload) {
                    const role = data.content && data.content !== undefined
                        ? data?.role
                            ? data?.role
                            : "Paragraph"
                        : '';
                    const capRole = capitalizeFirstLetter(role);
                    const contents = data.content && data.content !== undefined ? data.content : '';
                    return (
                        <div key={i} className="paraText">
                            <div className="paraRole">
                                <strong>{capRole}</strong>
                            </div>
                            <div className="paraContent">
                                {contents}
                            </div>
                        </div>
                    )
                }
                else if (data?.boundingRegions[0]?.pageNumber == pageNumber) {
                    const role = data.content && data.content !== undefined
                        ? data?.role
                            ? data?.role
                            : "Paragraph"
                        : '';
                    const capRole = capitalizeFirstLetter(role);
                    const contents = data.content && data.content !== undefined ? data.content : '';
                    return (
                        <div key={i} className="paraText">
                            <div className="paraRole">
                                <strong>{capRole}</strong>
                            </div>
                            <div className="paraContent">
                                {contents}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    }
    function handWrittenText(excel = "false") {     //put handwritten data in string for word and excel download
        // const fullTextAnnotation = currentImgData?.responses && currentImgData?.responses[0].fullTextAnnotation;
        const fullText = currentImgData?.responses && currentImgData?.responses[0].fullTextAnnotation?.text;
        const handArray = fullText?.split("\n");
        let handTextTempString = ``;
        if (excel) {
            handTextTempString += `<table id="excelParaData"><tbody>`;
            if (handArray?.length > 0) {
                for (const paras of handArray) {
                    handTextTempString += `<tr><td>Paragraph</td>`
                    handTextTempString += `<td>`
                    handTextTempString += `${paras}`
                    handTextTempString += `</td>`
                    handTextTempString += `</tr>`
                }
            }
            handTextTempString += `</tbody></table>`;
        }
        else {
            if (handArray?.length > 0) {
                handTextTempString += `<div>`
                for (const paras of handArray) {
                    handTextTempString += `<div><strong>Paragraph</strong></div>`
                    handTextTempString += `<div>`
                    handTextTempString += ` ${paras} `
                    handTextTempString += `</div>`
                }
                handTextTempString += `</div>`
            }
        }
        return handTextTempString;
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
                    if (cellDataValue?.boundingRegions[0]?.pageNumber == pageNumber) {
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
                    }
                })
            }
            tableDataExcString += `</tbody>`;
        });
        return tableDataExcString;
    }

    return (
        <div className='right section-main' id="rightSectionMain">
            <div className='right-section-inner'>
                <ul>
                    <li className={textTab ? "text-tab active" : 'text-tab'}>
                        <span onClick={handleTextTab}>Text</span>
                    </li>
                    <li className={tableTab ? "table-tab active" : "table-tab"}>
                        <span onClick={handleTableTab}>Table</span>
                    </li>
                </ul>
                {!validTab && <ul className="iconBlock">
                    <li className='Download-button-main' onClick={handleDownload}>
                        <button> {download}</button>
                    </li>
                    <li className='Coppy button-main'>
                        <button onClick={handleCoppy}>{coppyIcon}</button>
                    </li>
                </ul>}
                <div className="tabDataMain">
                    {textTab && showHandWritten
                        ? <Handwritten
                            currentImgData={currentImgData}
                            setShowHandWritten={setShowHandWritten}
                        />
                        : textTab && <div className="tabParaData" id="tab-textdata-id">
                            {currentImgData?.doctype && currentImgData?.doctype === docTypeObj.handwritten
                                ? <div className="paragraphMain">
                                    {ocrDataArr && ocrDataArr?.map((data, index) => (
                                        <div key={index} className="paraText">
                                            <div className="paraRole">
                                                <strong>Paragraph</strong>
                                            </div>
                                            <div className="paraContent">
                                                {data}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                : showTextData
                            }
                        </div>}
                    {showEmptyText
                        ? textTab
                            ? currentImgData?.type == "application/pdf"
                                ? <div className='noDataTableText'>
                                    <span>No text was found on current page.</span>
                                    <span>  Switch to another page to see more results.</span>
                                </div>
                                : <div className='noDataTableText'>
                                    <span>No text was found.</span>
                                </div>
                            : null
                        : null}
                    {tableTab && <div className="tabTableData" id="tab-tabledata-id">
                        <table className="scannedTable" id="dataTable">  {tableDataHtml1}</table>
                    </div>}
                    {showEmptyTable
                        ? tableTab
                            ? currentImgData?.type == "application/pdf"
                                ? <div className='noDataTableText'><span>No table was found on current page.
                                </span><span> Switch to another page to see more results.</span></div>
                                : <div className='noDataTableText'><span>No table was found.
                                </span></div>
                            : null
                        : null}
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
                                {tableTab
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
                                        ? <li>
                                            <ReactHTMLTableToExcel
                                                id="table-xls-button"
                                                className="download-table-xls-button"
                                                table="excelParaData"
                                                filename="textxls"
                                                sheet="textxls"
                                                buttonText="Download as excel"
                                            />
                                        </li>
                                        : <li onClick={() => { failedToast() }}>Downoad as excel</li>
                                }
                            </ul>
                        </OutsideClickHandler>
                    </div>}
            </div>
            {/* Put paragraph data in excel */}
            {textTab && showHandWritten
                ? <div style={{ display: "none" }}>
                    {parsedHandExcelText}
                </div>
                : <div style={{ display: "none" }}>
                    {tableDataParaExcel}
                </div>}
            {/* Put paragraph data in word */}
            {textTab && showHandWritten
                ? <div id="allTextToDownload" style={{ display: "none" }}>
                    <div>
                        {parsedHandText}
                    </div>
                </div>
                : <div id="allTextToDownload" style={{ display: "none" }}>
                    {downloadAllText}
                </div>}
            <div id="wordTableForDownloadingId" style={{ display: "none" }}>
                {/*
                    wordTableForDownloadingId id to download table data in word and
                    tableForDownloading id is to to download table data in excel
                */}
                <table id="tableForDownloading">{showAllTablesHtml}</table>
            </div>
        </div>
    )
}
export default RightSection
