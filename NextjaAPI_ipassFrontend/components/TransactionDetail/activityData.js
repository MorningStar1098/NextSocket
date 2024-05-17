/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { LIVE_URL } from "../../Hooks/envConst"
import axios from 'axios'
import { useRouter } from 'next/router'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import MUIDataTable from "mui-datatables";
import { AiFillSetting, AiOutlineClose, AiOutlineMinusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify';

import {DateRangePicker, createStaticRanges } from 'react-date-range';
import { addDays, endOfDay, startOfDay } from 'date-fns'
import moment from 'moment/moment';

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
function ActivityData(props) {
    const { singleTransaction, setdetails, setActivity } = props
    const limitToast = () => toast.success("Maximum columns were reached")
    // let eml
    useEffect(() => {
        if (singleTransaction !== undefined || null) {
            handleEmailData()
        }
    }, [singleTransaction])
    let cols, columns, newStorageFields;
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
                customBodyRender:colFunc
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
        // {
        //     name: "_id",
        //     options: {
        //         display: false,
        //         filter: false,
        //         sort: true,
        //         viewColumns: false,
        //         searchable: false,
        //     }
        // }

    ];
    const options = {
        filterType: "checkbox",
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
            name: "Transaction_Status"
        },
        {
            name: "Action_type"
        },
        {
            name: "Ip_Address"
        },
        // ipFields
        {
            name:"Ip_Score"
        },
        {
            name:"Ip_Type"
        },
        {
            name:"IP_Country"
        },
        {
            name:"Ip_City"
        },
        {
            name:"Ip_latitude"
        },
        {
            name:"Ip_Longitude"
        },
        {
            name:"Ip_timezone_offset"
        },
        {
            name:"Harmful_Ip"
        },
        // phoneFields
        {
            name:"Phone_Number"
        },
        {
            name:"Phone_Score"
        },
        {
            name:"Phone_valid"
        },
        {
            name:"Phone_country"
        },
        {
            name:"Phone_carrier"
        },
        {
            name:"Phone_disposable"
        },
        {
            name:"Phone_type"
        },
        // emailfields
        {
            name:"Email_score"
        },
        {
            name:"Email_domain"
        },
        {
            name:"Email_disposable"
        },
        {
            name:"Email_free"
        },
        {
            name:"Email_custom"
        }
    ]
    function colFunc(value, tableMeta) {
        // console.log("value",value)
        return <FormControl variant="outlined" size="small" className={value == "APPROVE" ? "transaction-status-approve" : value == "DECLINE" ? "transaction-status-decline" : "transaction-status-review"}>
            <Select
                value={value}
                // onChange={(e) => setselectOpt(e.target.value, tableMeta?.rowData[0])}
            //  MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
                <MenuItem value={"APPROVE"} className='approve-select'><span></span>APPROVE</MenuItem>
                <MenuItem value={"DECLINE"} className='decline-select'><span></span>DECLINE</MenuItem>
                <MenuItem value={"REVIEW"} className='review-select'><span></span>REVIEW</MenuItem>
            </Select>
        </FormControl>
    }
    if (typeof window !== 'undefined') {
        cols = JSON.parse(sessionStorage.getItem("newActivityCol"))
        newStorageFields = JSON.parse(sessionStorage.getItem("newActivityFields"))

        if (cols) {
            cols.map((vals) => {
                if (vals.label == "State") {
                    vals.options.customBodyRender = colFunc
                }
            })

        }
    }
    const [emailTransaction, setEmailTransaction] = useState()
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    const [newColumns, setNewColumns] = useState(cols);
    const [selectedValue, setSelectedValue] = useState()
    const [hasMounted, setHasMounted] = useState(false);
    const [toDoFunct, setToDoFunct] = useState()
// console.log("ee",newColumns);
    function handleEmailData(props) {
        props==undefined||props=="ALL_ACTIONS"?
        axios.get(`${LIVE_URL}/api/v1/ipass/get/transaction/withemail/${singleTransaction?.data?.email_details?.email}`, {

        }).then((resp) => {
            setEmailTransaction(resp?.data?.filteredTransactions)
        }):
        axios.get(`${LIVE_URL}/api/v1/ipass/get/transaction/withemail/${singleTransaction?.data?.email_details?.email}?actionType=${props==undefined?"":props}`, {

        }).then((resp) => {
            setEmailTransaction(resp?.data?.filteredTransactions)
        })
    }
    const transationArr = []
    emailTransaction?.map((data) => {
        const transationObj = {}
        // console.log(data);
        transationObj._id = data._id;
        transationObj.fraud_score = data.data.fraud_score;
        transationObj.state = data.data.state
        transationObj.userId = data.data.id
        transationObj.email = data.data.email_details.email
        transationObj.date = data.data.date
        transationObj.label = data.data.label
        transationObj.price = data.data.price
        transationObj.seon_id=data.data.seon_id
        transationObj.Transaction_Status=data?.complete=="true"?"complete":"incomplete"
        transationObj.Action_type=data?.data?.account_type
        // ipadata
        transationObj.Ip_Address=data?.data?.ip_details?.ip
        transationObj.Ip_Score=data?.data?.ip_details?.score
        transationObj.Ip_Type=data?.data?.ip_details?.type
        transationObj.IP_Country=data?.data?.ip_details?.country
        transationObj.Ip_City=data?.data?.ip_details?.city
        transationObj.Ip_latitude=data?.data?.ip_details?.latitude
        transationObj.Ip_Longitude=data?.data?.ip_details?.longitude
        transationObj.Ip_timezone_offset=data?.data?.ip_details?.timezone_offset
        transationObj.Harmful_Ip=data?.data?.ip_details?.harmful==true?"Yes":"No"
        // phoneData
        transationObj.Phone_Number=data?.data?.phone_details?.number
        transationObj.Phone_Score=data?.data?.phone_details?.score
        transationObj.Phone_valid=data?.data?.phone_details?.valid==true?"Yes":"No"
        transationObj.Phone_country=data?.data?.phone_details?.country
        transationObj.Phone_carrier=data?.data?.phone_details?.carrier
        transationObj.Phone_disposable=data?.data?.phone_details?.disposable==true?"Yes":"No"
        transationObj.Phone_type=data?.data?.phone_details?.type
        // emailData
        transationObj.Email_score=data?.data?.email_details?.score
        transationObj.Email_domain=data?.data?.email_details?.domain_details?.domain
        transationObj.Email_disposable=data?.data?.email_details?.domain_details?.disposable==true?"Yes":"No"
        transationObj.Email_free=data?.data?.email_details?.domain_details?.free==true?"Yes":"No"
        transationObj.Email_custom=data?.data?.email_details?.domain_details?.custom==true?"Yes":"No"
        transationArr.push(transationObj)
    })
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (cols == null) {
                sessionStorage.setItem("newActivityCol", JSON.stringify(columns))
                sessionStorage.setItem("newActivityFields", JSON.stringify(newFields))
            }
        }

    }, [])
    //code to stop hydration error start

    React.useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    //code to stop hydration error ends
    function setselectOptField(val) {
        setSelectedValue(val)
        setToDoFunct("add")
    }
    function handleAddField() {
        if (toDoFunct !== undefined) {
            if (toDoFunct == "add") {
                if(newColumns.length<10){
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
                        sessionStorage.setItem("newActivityFields", JSON.stringify(newFlds))
                    }
                    if (typeof window !== 'undefined') {
                        newStorageFields = JSON.parse(sessionStorage.getItem("newActivityFields"))
                    }
                    // new columns
                    if (typeof window !== 'undefined') {
                        sessionStorage.setItem("newActivityCol", JSON.stringify(newcolumns))
                    }
                    if (typeof window !== 'undefined') {
                        cols = JSON.parse(sessionStorage.getItem("newActivityCol"))
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
            }else{
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
            sessionStorage.setItem("newActivityFields", JSON.stringify(newFlds))
        }
        if (typeof window !== 'undefined') {
            newStorageFields = JSON.parse(sessionStorage.getItem("newActivityFields"))
        }
        // new cloumns
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("newActivityCol", JSON.stringify(array))
        }
        if (typeof window !== 'undefined') {
            cols = JSON.parse(sessionStorage.getItem("newActivityCol"))
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

    function setselectOpt(value, id) {
        // ipass/transaction/update/labels
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
                // handleTransactions()
            }
        })

    }
    const router = useRouter()
    function handleDetail(e, ind, transId) {
        const id = transId._id
        if (ind.colIndex !== 2) {
        router.push(`/transactionDetail?get=${id}`)
        Cookies.set("mId",id)
        setdetails(true)
        setActivity(false)
        }
    }
    function handleOpenSetting() {
        setIsSettingOpen(true)
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
                                    <td onClick={() => removeColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td>
                                </tr>
                            )
                        }) :
                        columns?.map((colVals) => {
                            return (
                                colVals?.options?.display !== false && <tr>
                                    <td>{colVals?.label}</td>
                                    <td onClick={() => removeColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>

    }
    const selectednotValue="-1"
    let fields = handleFields()

    const handelaction=(e)=>{
        handleEmailData(e.target.value)
        }
    return (
        <div className='customer-activity-main'>
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
                        {newColumns?.length>=10?
                            <Tooltip title="Maximum column reached">
                            <FormControl sx={{ m: 1, width: 300 }}  >
                            <label>Add new field</label>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    value={selectednotValue}
                                    onChange={(e) => setselectOptField(e.target.value)}
                                    MenuProps={MenuProps}
                                    disabled={newColumns?.length>=10?true:false}
                                >
                                    <MenuItem value={"-1"} className="select-none">Select</MenuItem>
                                    {newStorageFields.map((fields) => {
                                        return (
                                            <MenuItem className='field_add_dropdown' value={fields?.name}><span></span>{fields?.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            </Tooltip>
                            :<FormControl sx={{ m: 1, width: 300 }}  >
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
                                            <MenuItem className='field_add_dropdown' value={fields?.name}><span></span>{fields?.name}</MenuItem>
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
            <div className='customer-activity-inner'>
                <div className='text-email-filter-main'>
                    <div className='text-email'>
                        <h3>Customer activity</h3>
                        <span>{singleTransaction?.data?.email_details?.email}</span>
                    </div>
                    <FormControl variant="outlined" size="small">
                            <Select defaultValue="ALL_ACTIONS"  onChange={handelaction}>
                                <MenuItem className='field_add_dropdown' value="ALL_ACTIONS">ALL ACTIONS</MenuItem>
                                <MenuItem className='field_add_dropdown' value="ACCOUNT_LOGIN">ACCOUNT_LOGIN</MenuItem>
                                <MenuItem className='field_add_dropdown' value="ACCOUNT_REGISTER">ACCOUNT_REGISTER</MenuItem>
                                <MenuItem className='field_add_dropdown' value="PAYMENT">PAYMENT</MenuItem>
                                <MenuItem className='field_add_dropdown' value="WITHDRAWAL">WITHDRAWAL</MenuItem>
                             </Select>
                       </FormControl>
                    {/* <div className='date-filter'>
                        <div className='start-date'>
                        <input
                            type="date"
                            id="startdate"
                            value={currentStartDate}
                            onChange={(e) => setTdsCurrentStartDate(e.target.value)}
                          />
                        </div>
                        <div className='end-date'>
                        <input
                            type="date"
                            id="enddate"
                            value={currentEndDate}
                            onChange={(e) => setTdsCurrentEndDate(e.target.value)}
                          />
                        </div>
                    </div> */}
                </div>
                <div className='setting-button acticity'>
                    <span onClick={handleOpenSetting}><AiFillSetting /></span>
                </div>
                <MUIDataTable
                    data={transationArr ? transationArr : []}
                    columns={newColumns !== null ? newColumns : columns}
                    className="custom-table-outer"
                    options={options}
                />
            </div>
        </div>
    )
}

export default ActivityData