/* eslint-disable */
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react'
import { LIVE_URL } from "../../Hooks/envConst"
import axios from 'axios';
import { BiChevronRight, BiUser } from 'react-icons/bi';
import { ShimmerCategoryList } from "react-shimmer-effects";
import { useRouter } from 'next/router';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DefinedRange, createStaticRanges } from 'react-date-range';
import { addDays, endOfDay, startOfDay } from 'date-fns'
import moment from 'moment/moment';
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'

function CustomerConnection(props) {
    const { singleTransaction, setdetails, setCustomer } = props
    const [singleTransactionFilter, setSingleTransactionFilter] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    function handleDetail(e, transId) {
        router.push(`/transactionDetail?get=${transId}`)
        setdetails(true)
        setCustomer(false)
    }
    function handleGetdata(startDate, endDate) {
        const phoneChecked = document.getElementById("phoneCheck")
        const emailChecked = document.getElementById("emailCheck")
        const ipChecked = document.getElementById("ipCheck")
        const body = {
            "transIp": ipChecked.checked ? singleTransaction?.data?.ip_details?.ip : "",
            "transEml": emailChecked.checked ? singleTransaction?.data?.email_details?.email : "",
            "transNumber": phoneChecked.checked ? singleTransaction?.data?.phone_details?.number : "",
            "startDate": startDate !== "Invalid date" ? startDate : "",
            "endDate": endDate !== "Invalid date" ? endDate : "",
        }
        axios.post(`${LIVE_URL}/api/v1/ipass/get/similar/transaction`, body, {
        }).then((response) => {
            const data = response?.data?.filteredRecords
            setSingleTransactionFilter(data)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
        // }
        // if (pp == "email") {
        // setLoading(true)
        // const phoneChecked = document.getElementById("phoneCheck")
        // const emailChecked = document.getElementById("emailCheck")
        // const ipChecked = document.getElementById("ipCheck")
        // const body = {
        //     "transIp": ipChecked.checked ? singleTransaction?.data?.ip_details?.ip : "",
        //     "transEml": emailChecked.checked ? singleTransaction?.data?.email_details?.email : "",
        //     "transNumber": phoneChecked.checked ? singleTransaction?.data?.phone_details?.number : "",
        //     "startDate": startDate !=="Invalid date" ? startDate : "",
        //     "endDate": endDate !=="Invalid date" ? endDate : "",
        // }
        // axios.post(`${LIVE_URL}/api/v1/ipass/get/similar/transaction`, body, {
        // }).then((response) => {
        //     const data = response?.data?.filteredRecords
        //     setSingleTransactionFilter(data)
        // setTimeout(()=>{
        //     setLoading(false)
        // },1000)
        // })
        // }
        // if (pp == "number") {
        // setLoading(true)
        // const phoneChecked = document.getElementById("phoneCheck")
        // const emailChecked = document.getElementById("emailCheck")
        // const ipChecked = document.getElementById("ipCheck")
        // if(phoneChecked.checked){
        // const body = {
        //     "transIp": ipChecked.checked ? singleTransaction?.data?.ip_details?.ip : "",
        //     "transEml": emailChecked.checked ? singleTransaction?.data?.email_details?.email : "",
        //     "transNumber": phoneChecked.checked ? singleTransaction?.data?.phone_details?.number : "",
        //     "startDate": startDate !=="Invalid date" ? startDate : "",
        //     "endDate": endDate !=="Invalid date" ? endDate : "",
        // }
        // axios.post(`${LIVE_URL}/api/v1/ipass/get/similar/transaction`, body, {
        // }).then((response) => {
        //     const data = response?.data?.filteredRecords
        //     setSingleTransactionFilter(data)
        // setTimeout(()=>{
        //     setLoading(false)
        // },1000)
        // console.log("dd",response);
        // })
        // }
        // }
    }
    const phoneChecked = document.getElementById("phoneCheck")
    const emailChecked = document.getElementById("emailCheck")
    const ipChecked = document.getElementById("ipCheck")

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

    function handleDownload() {
        ExportToDoc("connections")
    }

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
        },
    ])
    function handleChangedate(item,range) {
        setState(range)
        let startDate = moment(range[0]?.startDate).format("YYYY-MM-DD");
        let endDate = moment(range[0].endDate).format("YYYY-MM-DD");
        handleGetdata(startDate, endDate)
    }

    return (
        <>
            <div className='customer-activity-main customerconnection'>
                <div className='customer-activity-inner'>
                    <div className='customerconnection-tab'>
                        <div className='text-email-filter-main '>
                            <div className='text-user'>
                                <h3>Customer connections of</h3><span>{singleTransaction?.data?.email_details?.email}</span>
                            </div>
                            <FormControl variant="outlined" size="small" >
                                <Select
                                    value={"Last 30 Days"}
                                    onChange={(e) => handleChangedate()}
                                >
                                   
                                    <DefinedRange
                                        onChange={(item) => { handleChangedate([item.range1]) }}
                                        color="f6be00"
                                        ranges={state}
                                        direction="horizontal"
                                        staticRanges={createStaticRanges([
                                            {
                                                label: 'Last 1 day',
                                                range: () => ({
                                                    startDate: startOfDay(new Date()),
                                                    endDate: endOfDay(new Date()),
                                                }),
                                            },
                                            {
                                                label: 'Last 7 Days',
                                                range: () => ({
                                                    startDate: startOfDay(addDays(new Date(), -7)),
                                                    endDate: endOfDay(new Date()),
                                                }),
                                            },
                                            {
                                                label: 'Last 30 Days',
                                                range: () => ({
                                                    startDate: startOfDay(addDays(new Date(), -30)),
                                                    endDate: endOfDay(new Date()),
                                                }),
                                            },
                                            {
                                                label: 'All Time',
                                                range: () => ({
                                                    startDate: null,
                                                    endDate: null,
                                                }),
                                            },
                                        ])}
                                        inputRanges={[]}
                                    />
                                     <MenuItem value={"Last 30 Days"} >Last 30 Days</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <ul>
                            <li className="active-tab">By data points</li>
                        </ul>
                    </div>
                    <div className='connection-basedon-connected-customer-main'>
                        <div className='connection-basedon-section'>
                            <h2>Find connections based on:</h2>
                            <div className='data-transaction-user-data-point'>
                                <div className='checkbox-main'>
                                    <input id="ipCheck" type='checkbox' onChange={() => handleGetdata()} />
                                </div>
                                <div className='field-data'>
                                    <div className='headding-data'>
                                        <span>Ip address</span>
                                    </div>
                                    <span>{singleTransaction?.data?.ip_details?.ip}</span>
                                </div>
                            </div>
                            <div className='data-transaction-user-data-point'>
                                <div className='checkbox-main'>
                                    <input id="emailCheck" type='checkbox' onChange={() => handleGetdata()} />
                                </div>
                                <div className='field-data'>
                                    <div className='headding-data'>
                                        <span>Email</span>
                                    </div>
                                    <span>{singleTransaction?.data?.email_details?.email}</span>
                                </div>
                            </div>
                            <div className='data-transaction-user-data-point'>
                                <div className='checkbox-main'>
                                    <input id='phoneCheck' type='checkbox' onChange={() => handleGetdata()} />
                                </div>
                                <div className='field-data'>
                                    <div className='headding-data'>
                                        <span>Phone</span>
                                    </div>
                                    <span>{singleTransaction?.data?.phone_details?.number}</span>
                                </div>
                            </div>
                        </div>
                        <div className='baseddata-right section'>
                            <div className='connected-customer'>
                                <h3>Customer Connected</h3>
                                {singleTransactionFilter?.length > 0 ? <span>{singleTransactionFilter?.length}</span> : null}
                            </div>
                            <div className='not-data-class'>
                                {ipChecked?.checked || emailChecked?.checked || phoneChecked?.checked?
                                    null :
                                    <>
                                        {loading ? <ShimmerCategoryList /> :
                                            <span>Select a field on the left to see connections with other customers</span>}</>}
                                            {/* {ipChecked?.checked || emailChecked?.checked || phoneChecked?.checked||singleTransactionFilter?.length==0?
                                                <span>We didn't find any connections. Try modifying your selected data points or the date range to uncover more connections.</span>
                                            :null} */}
                            </div>
                            {/* {singleTransactionFilter?.length!==0? */}
                            <div className='export-button'>
                                {/* <ReactHTMLTableToExcel
                                    id="table-xls-button"
                                    className="download-table-xls-button"
                                    table="connections"
                                    filename="tablexls"
                                    sheet="tablexls"
                                    buttonText="Export"
                                /> */}
                                {/* <span onClick={handleDownload}>Export</span> */}
                            </div>
                            {singleTransactionFilter?.map((user) => {
                                return (
                                    <>
                                        <div className='user-data-icon-text'>
                                            <div className='user-icon'><BiUser /></div>
                                            <div id='connections' className='name-emaildata-main' onClick={(e) => handleDetail(e, user._id)} >
                                                <div className='name-data'>
                                                    <span>Prince Jazzi</span>
                                                    <span><BiChevronRight /></span>
                                                </div>
                                                <div className='email-id' >
                                                    <span>{user?.data?.email_details?.email}</span>
                                                    <span className='dot-email-id'></span>
                                                    <span>{user?.data?.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerConnection