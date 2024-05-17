/* eslint-disable */
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { LIVE_URL } from "../../Hooks/envConst"
import { useRouter } from 'next/router';
//import {Select,MenuItem,FormControl,} from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MUIDataTable from "mui-datatables";
import { AiFillSetting, AiOutlineClose, AiOutlineConsoleSql, AiOutlineMinusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import { FiRefreshCw } from 'react-icons/fi';
import { ShimmerThumbnail } from "react-shimmer-effects";
import Filter from '../TransactionsFilter/Filter1'
import Cookies from 'js-cookie';
import { checkLogin } from '../../Hooks/checkLogin';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function transactions(props) {
    const router = useRouter()
    const { transactionData, handleTransactions, handletransfilApp, handletransfilRest } = props;
    const limitToast = () => toast.success("Maximum columns were reached")
    let cols, columns, newStorageFields;
    function colFunc(value, tableMeta) {
        // console.log("table",tableMeta);
        return <FormControl variant="outlined" size="small" className={value == "APPROVE" ? "transaction-status-approve" : value == "DECLINE" ? "transaction-status-decline" : "transaction-status-review"}>
            {tableMeta?.rowData[8] == "incomplete" ?
                <Select
                    value={value}
                    onChange={(e) => setselectOpt(e.target.value, tableMeta?.rowData[0])}
                //  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                    <MenuItem value={"APPROVE"} className='approve-select'><span></span>APPROVE</MenuItem>
                    <MenuItem value={"DECLINE"} className='decline-select'><span></span>DECLINE</MenuItem>
                    <MenuItem value={"REVIEW"} className='review-select'><span></span>REVIEW</MenuItem>
                </Select> :
                <Select
                    value={value}
                // onChange={(e) => setselectOpt(e.target.value, tableMeta?.rowData[0])}
                //  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                    <MenuItem value={"APPROVE"} className='approve-select'><span></span>APPROVE</MenuItem>
                    <MenuItem value={"DECLINE"} className='decline-select'><span></span>DECLINE</MenuItem>
                    <MenuItem value={"REVIEW"} className='review-select'><span></span>REVIEW</MenuItem>
                </Select>}

        </FormControl>
    }
    columns = [
        {
            name: "_id",
            label: "Id",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: true,
            },
        }, {
            name: "fraud_score",
            label: "Score",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: true,

            },
        },
        {
            name: "state",
            label: "State",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: false,
                customBodyRender: colFunc
            }
        },
        {
            name: "userId",
            label: "User Id",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: false,
            },
        },
        {
            name: "email",
            label: "User",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: false,
            },
        },
        {
            name: "price",
            label: "Amount",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: false,
            },
        },
        {
            name: "date",
            label: "Date",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: false,
            },
        },
        {
            name: "label",
            label: "Label",
            options: {
                filter: true,
                sortThirdClickReset: true,
                search: false,
            },
        },
        {
            name: "Transaction_Status",
            label: "Transaction Status",
            options: {
                filter: true,
                sortThirdClickReset: false,
                search: true,
                display: false,
            },
        }

    ];
    const options = {
        filterType: "checkbox",
        selectableRows: false,
        download: false,
        print: false,
        filter: false,
        search: false,
        viewColumns: false,
        pagination: false,
        // expandableRowsOnClick:true,
        onCellClick: (e, cellMeta) => handleDetail(e, cellMeta, transationArr[cellMeta.dataIndex]),
        textLabels: {
            body: {
                noMatch: 'No data found',
            }
        },
        draggableColumns: { enabled: true }
    }
    const newFields = [
        {
            name: "Transaction_Status",
            options: {
                display: false,
            }
        },
        {
            name: "Action_type"
        },
        {
            name: "Ip_Address"
        },
        // ipFields
        {
            name: "Ip_Score"
        },
        {
            name: "Ip_Type"
        },
        {
            name: "IP_Country"
        },
        {
            name: "Ip_City"
        },
        {
            name: "Ip_latitude"
        },
        {
            name: "Ip_Longitude"
        },
        {
            name: "Ip_timezone_offset"
        },
        {
            name: "Harmful_Ip"
        },
        // phoneFields
        {
            name: "Phone_Number"
        },
        {
            name: "Phone_Score"
        },
        {
            name: "Phone_valid"
        },
        {
            name: "Phone_country"
        },
        {
            name: "Phone_carrier"
        },
        {
            name: "Phone_disposable"
        },
        {
            name: "Phone_type"
        },
        // emailfields
        {
            name: "Email_score"
        },
        {
            name: "Email_domain"
        },
        {
            name: "Email_disposable"
        },
        {
            name: "Email_free"
        },
        {
            name: "Email_custom"
        }
    ]
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (cols == null) {
                sessionStorage.setItem("newCol", JSON.stringify(columns))
                sessionStorage.setItem("newFields", JSON.stringify(newFields))
            }
        }

    }, [cols])
    if (typeof window !== 'undefined') {
        cols = JSON.parse(sessionStorage.getItem("newCol"))
        newStorageFields = JSON.parse(sessionStorage.getItem("newFields"))

        if (cols) {
            cols.map((vals) => {
                if (vals.label == "State") {
                    vals.options.customBodyRender = colFunc
                }
            })

        }

    }
    const [isDropdown, setIsDropdown] = useState(false)
    const [hasMounted, setHasMounted] = useState(false);
    const [newColumns, setNewColumns] = useState(cols);
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState()
    const [labelName, setLabelName] = useState()
    const [toDoFunct, setToDoFunct] = useState()
    const [refresh, setRefresh] = useState(false)
    const [filters, setFilters] = useState(false)
    const [open, setOpen] = useState(false)

    const transationArr = []
    transactionData?.map((data) => {
        const transationObj = {}
        transationObj._id = data?._id;
        transationObj.fraud_score = data?.data?.fraud_score;
        transationObj.state = data?.data?.state
        transationObj.userId = data?.data?.id
        transationObj.email = data?.data?.email_details?.email
        transationObj.date = data?.data?.date
        transationObj.label = data?.data?.label
        transationObj.price = data?.data?.price
        transationObj.seon_id = data?.data?.seon_id
        transationObj.Transaction_Status = data?.complete == "true" ? "complete" : "incomplete"
        transationObj.Action_type = data?.data?.account_type
        // ipadata
        transationObj.Ip_Address = data?.data?.ip_details?.ip
        transationObj.Ip_Score = data?.data?.ip_details?.score
        transationObj.Ip_Type = data?.data?.ip_details?.type
        transationObj.IP_Country = data?.data?.ip_details?.country
        transationObj.Ip_City = data?.data?.ip_details?.city
        transationObj.Ip_latitude = data?.data?.ip_details?.latitude
        transationObj.Ip_Longitude = data?.data?.ip_details?.longitude
        transationObj.Ip_timezone_offset = data?.data?.ip_details?.timezone_offset
        transationObj.Harmful_Ip = data?.data?.ip_details?.harmful == true ? "Yes" : "No"
        // phoneData
        transationObj.Phone_Number = data?.data?.phone_details?.number
        transationObj.Phone_Score = data?.data?.phone_details?.score
        transationObj.Phone_valid = data?.data?.phone_details?.valid == true ? "Yes" : "No"
        transationObj.Phone_country = data?.data?.phone_details?.country
        transationObj.Phone_carrier = data?.data?.phone_details?.carrier
        transationObj.Phone_disposable = data?.data?.phone_details?.disposable == true ? "Yes" : "No"
        transationObj.Phone_type = data?.data?.phone_details?.type
        // emailData
        transationObj.Email_score = data?.data?.email_details?.score
        transationObj.Email_domain = data?.data?.email_details?.domain_details?.domain
        transationObj.Email_disposable = data?.data?.email_details?.domain_details?.disposable == true ? "Yes" : "No"
        transationObj.Email_free = data?.data?.email_details?.domain_details?.free == true ? "Yes" : "No"
        transationObj.Email_custom = data?.data?.email_details?.domain_details?.custom == true ? "Yes" : "No"
        transationArr.push(transationObj)
    })
    function setselectOpt(value, id) {
        // ipass/transaction/update/labels
        const base64Email = Cookies.get('email')
        const token = Cookies.get('token')
        const eml = checkLogin(token, base64Email)
        console.log("incond");
        const body = {
            "state": value,
            "id": id
        }
        axios.put(`${LIVE_URL}/api/v1/ipass/transaction/update/labels`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response?.data?.success == true) {
                handleTransactions(eml)
            }
        })

    }
    function handleDropdown() {
        setIsDropdown(!isDropdown)
    }
    let minFraud = transactionData && transactionData[0]?.data?.fraud_score;
    let maxfraud = transactionData && transactionData[0]?.data?.fraud_score;
    let fraudArr = [];
    // emailFrauds
    let minEmailFraud = transactionData && transactionData[0]?.data?.email_details?.score
    let avgEmailFraud = []
    let maxEmailFraud = transactionData && transactionData[0]?.data?.email_details?.score
    // phone Score
    let minPhoneFraud = transactionData && transactionData[0]?.data?.phone_details?.score
    let avgPhoneFraud = []
    let maxPhoneFraud = transactionData && transactionData[0]?.data?.phone_details?.score
    // ip score
    let minIpFraud = transactionData && transactionData[0]?.data?.ip_details?.score
    let avgIpFraud = []
    let maxIpFraud = transactionData && transactionData[0]?.data?.ip_details?.score
    transactionData && transactionData.map((resp) => {
        if (resp?.data?.fraud_score < minFraud) {
            minFraud = resp?.data?.fraud_score;
        }
        if (resp?.data?.fraud_score > maxfraud) {
            maxfraud = resp?.data?.fraud_score;
        }
        fraudArr.push(resp?.data?.fraud_score);
        // email score
        if (resp?.data?.email_details?.score < minEmailFraud) {
            minEmailFraud = resp?.data?.email_details?.score;
        }
        if (resp?.data?.email_details?.score > maxEmailFraud) {
            maxEmailFraud = resp?.data?.email_details?.score;
        }
        avgEmailFraud.push(resp?.data?.email_details?.score)
        // phone score
        if (resp?.data?.phone_details?.score < minPhoneFraud) {
            minPhoneFraud = resp?.data?.phone_details?.score;
        }
        if (resp?.data?.phone_details?.score > maxPhoneFraud) {
            maxPhoneFraud = resp?.data?.phone_details?.score;
        }
        avgPhoneFraud.push(resp?.data?.phone_details?.score)
        // ip score
        if (resp?.data?.ip_details?.score < minIpFraud) {
            minIpFraud = resp?.data?.ip_details?.score;
        }
        if (resp?.data?.ip_details?.score > maxIpFraud) {
            maxIpFraud = resp?.data?.ip_details?.score;
        }
        avgIpFraud.push(resp?.data?.ip_details?.score)
    })
    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    const fraudAvg = average(fraudArr);
    const emailFraudAvg = average(avgEmailFraud)
    const phoneFraudAvg = average(avgPhoneFraud)
    const ipFraudAvg = average(avgIpFraud)
    function handleDetail(e, ind, transId) {
        const id = transId._id
        if (ind.colIndex !== 2) {
            router.push(`/transactionDetail?get=${id}`)
            Cookies.set("mId",id)
        }
    }
    //code to stop hydration error start
    React.useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    //code to stop hydration error ends
    function handleOpenSetting() {
        setIsSettingOpen(true)
    }
    function setselectOptField(val) {
        setSelectedValue(val)
        setToDoFunct("add")
    }
    function handleAddField() {
        if (toDoFunct !== undefined) {
            if (toDoFunct == "add") {
                if (newColumns.length < 10) {
                    if (selectedValue !== undefined) {
                        const newcolumns = [...newColumns];
                        newcolumns.push({
                            name: selectedValue,
                            label: selectedValue,
                            options: {
                                filter: true,
                                sortThirdClickReset: true,
                                search: true,
                                // onCellClick:()=>handleDetail(e)
                            }
                        });
                        // new fields
                        const newFlds = [...newStorageFields]
                        const index = newFlds.findIndex(x => x.name === selectedValue);
                        if (index > -1) { // only splice array when item is found
                            newFlds.splice(index, 1); // 2nd parameter means remove one item only
                        }

                        if (typeof window !== 'undefined') {
                            sessionStorage.setItem("newFields", JSON.stringify(newFlds))
                        }
                        if (typeof window !== 'undefined') {
                            newStorageFields = JSON.parse(sessionStorage.getItem("newFields"))
                        }
                        // new columns
                        if (typeof window !== 'undefined') {
                            sessionStorage.setItem("newCol", JSON.stringify(newcolumns))
                        }
                        if (typeof window !== 'undefined') {
                            cols = JSON.parse(sessionStorage.getItem("newCol"))
                            if (cols) {
                                cols.map((vals) => {
                                    if (vals.label == "State") {
                                        vals.options.customBodyRender = colFunc
                                    }
                                })

                            }
                        }
                        setNewColumns(cols)
                        setTimeout(() => {
                            setIsSettingOpen(false)
                        }, 1000)
                    }
                } else {
                    limitToast()
                    setIsSettingOpen(false)
                }
            }
            if (toDoFunct == "remove") {
                if (labelName !== undefined) {
                    removeColumn(labelName, cols)
                }
            }
        }
    }
    function removeColumn(name, array) {
        const index = array.findIndex(x => x.name === name);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        // array = [2, 9]
        // new fields
        const newFlds = [...newStorageFields]
        newFlds.push({
            name: name
        })
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("newFields", JSON.stringify(newFlds))
        }
        if (typeof window !== 'undefined') {
            newStorageFields = JSON.parse(sessionStorage.getItem("newFields"))
        }
        // new cloumns
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("newCol", JSON.stringify(array))
        }
        if (typeof window !== 'undefined') {
            cols = JSON.parse(sessionStorage.getItem("newCol"))
            if (cols) {
                cols.map((vals) => {
                    if (vals.label == "State") {
                        vals.options.customBodyRender = colFunc
                    }
                })

            }
        }
        setNewColumns(cols)
        setTimeout(() => {
            setIsSettingOpen(false)
        }, 1000)

    }
    function handleCloseSettings() {
        setIsSettingOpen(false)
    }
    function handleFields() {
        return <>
            <table>
                <thead></thead>
                <tbody>
                    {newColumns !== null ?

                        newColumns?.map((colVals) => {
                            return (
                                colVals?.options?.display !== false && <tr>
                                    <td>{colVals?.label}</td>
                                    {/* <td onClick={() => removeColumn(colVals?.name, cols)}>-</td> */}
                                    {/* <td onClick={() => handleColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td> */}
                                    <td onClick={() => removeColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td>
                                </tr>
                            )
                        }) :
                        columns?.map((colVals) => {
                            return (
                                colVals?.options?.display !== false && <tr>
                                    <td>{colVals?.label}</td>
                                    {/* <td onClick={() => removeColumn(colVals?.name, cols)}>-</td> */}
                                    {/* <td onClick={() => handleColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td> */}
                                    <td onClick={() => removeColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>

    }
    let fields = handleFields()
    const selectednotValue = "-1"
    function handlerefresh() {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)

        }, 1000)

        // alert(1)
    }
    return (
        <>
            <div className='transaction-table-main'>
                <div className='transaction-filter'>
                    <Filter value="transaction-filter"
                        handletransfilApp={handletransfilApp}
                        handletransfilRest={handletransfilRest}
                        filters={filters}
                        setFilters={setFilters}
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
                {isSettingOpen ?
                    <div className='setting-popup-main'>
                        <div className='setting-pop-inner'>
                            <div className='text-close-btn-tms'>
                                <h3>You can customize your transaction list view here</h3>
                                <span onClick={handleCloseSettings}><AiOutlineClose /></span>
                            </div>
                            <div className='table-columns'>
                                {fields}
                            </div>
                            {newColumns?.length >= 10 ?
                                <Tooltip title="Maximum column reached">
                                    <FormControl sx={{ m: 1, width: 300 }}  >
                                        <label>Add new field</label>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={selectednotValue}
                                            onChange={(e) => setselectOptField(e.target.value)}
                                            MenuProps={MenuProps}
                                            disabled={newColumns?.length >= 10 ? true : false}
                                        >
                                            <MenuItem value={"-1"} className="select-none">Select</MenuItem>
                                            {newStorageFields.map((fields) => {
                                                return (
                                                    fields?.options?.display !== false && <MenuItem className='field_add_dropdown' value={fields?.name}><span></span>{fields?.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Tooltip>
                                : <FormControl sx={{ m: 1, width: 300 }}  >
                                    <label>Add new field</label>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={selectednotValue}
                                        onChange={(e) => setselectOptField(e.target.value)}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={"-1"} className="select-none">Select</MenuItem>
                                        {newStorageFields.map((fields) => {
                                            return (
                                                fields?.options?.display !== false && <MenuItem className='field_add_dropdown' value={fields?.name}><span></span>{fields?.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>}
                            <div className='cancel-save-btn-main'>
                                <span onClick={handleCloseSettings}>Close</span>
                                <span onClick={handleAddField}>Save</span>
                            </div>
                        </div>
                    </div>
                    : null}
                <div className='statics-main'>
                    <div className={isDropdown ? "statics-transaction-count totalScoreActive" : 'statics-transaction-count '}>
                        <div className='stats-transaction-button'>
                            <p onClick={handleDropdown}>Statics</p>
                            {!isDropdown ?
                                <>
                                    <span onClick={handleDropdown}>Total transactions</span>{'  '}
                                    <span onClick={handleDropdown}>{transactionData?.length}</span>
                                </> : null}
                            {isDropdown ? <span onClick={handlerefresh}><FiRefreshCw /></span> : null}
                            <button onClick={handleDropdown}>{isDropdown ? <> <BsChevronUp /></> : <BsChevronDown />}</button>
                        </div>
                        {refresh ? <ShimmerThumbnail /> :
                            <div className='transaction-data-main'>
                                {isDropdown ?
                                    <>
                                        <div className='count-amount'>
                                            <div className='total-transaction'>
                                                <span>Total Transaction</span>{"  "}
                                                <span>{transactionData?.length}</span>
                                            </div>
                                            <div className='total-amount'>
                                                <span>Total Amount</span>{"  "}
                                                <span></span>
                                            </div>
                                        </div>
                                        <div className='scores-main'>
                                            <div className='fraud-score-main commanScore'>
                                                <span>Fraud Score</span>{'       '}
                                                <span>min {minFraud !== undefined ? minFraud : 0}</span>{'      '}
                                                <span>avg {fraudAvg !== undefined ? fraudAvg : 0}</span>{'       '}
                                                <span>max {maxfraud !== undefined ? maxfraud : minFraud}</span>
                                            </div>
                                            <div className='email-scores commanScore'>
                                                <span>Email Score</span>{'       '}
                                                <span>min {minEmailFraud !== undefined ? minEmailFraud : 0}</span>{'      '}
                                                <span>avg {emailFraudAvg !== undefined ? emailFraudAvg : 0}</span>{'       '}
                                                <span>max {maxEmailFraud !== undefined ? maxEmailFraud : minEmailFraud}</span>
                                            </div>
                                            <div className='phone-scores commanScore'>
                                                <span>Phone Score</span>{'       '}
                                                <span>min {minPhoneFraud !== undefined ? minPhoneFraud : 0}</span>{'      '}
                                                <span>avg {phoneFraudAvg !== undefined ? phoneFraudAvg : 0}</span>{'       '}
                                                <span>max {maxPhoneFraud !== undefined ? maxPhoneFraud : minPhoneFraud}</span>
                                            </div>
                                            <div className='ipdata-scores commanScore'>
                                                <span>Ip Score</span>{'       '}
                                                <span>min {minIpFraud !== undefined ? minIpFraud : 0}</span>{'      '}
                                                <span>avg {ipFraudAvg !== undefined ? ipFraudAvg : 0}</span>{'       '}
                                                <span>max {maxIpFraud !== undefined ? maxIpFraud : minIpFraud}</span>
                                            </div>
                                        </div>
                                    </>
                                    : null}
                            </div>}
                    </div>
                </div>
                {open ?
                    <div className={'setting-button date'}>
                        <span onClick={handleOpenSetting}><AiFillSetting /></span>
                    </div> :
                    <div className={isDropdown ? 'setting-button add' : filters ? "setting-button filt" : 'setting-button'}>
                        <span onClick={handleOpenSetting}><AiFillSetting /></span>
                    </div>}
                <MUIDataTable
                    data={transationArr ? transationArr : []}
                    columns={newColumns !== null ? newColumns : columns}
                    className="custom-table-outer"
                    options={options}
                />
            </div>
        </>
    )
}

export default transactions