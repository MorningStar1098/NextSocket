/* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import { LIVE_URL } from '../../Hooks/envConst'
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from '@ramonak/react-progress-bar';
import { BiEdit } from 'react-icons/bi';
import { FaFolder } from 'react-icons/fa';
import moment from 'moment/moment';
import EmailData from './emailData';
import PhoneData from './phoneData';
import IpData from './ipData';
import { BsFiletypePdf } from 'react-icons/bs'
import MUIDataTable from "mui-datatables";
import MapSection from './mapSection';
import ReactCountryFlag from "react-country-flag"
import { ShimmerCategoryList } from "react-shimmer-effects";
import Logo from '../../public/images/logo.png';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { AiFillSetting, AiOutlineClose, AiOutlineMinusCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
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
const TransactionRightSection = forwardRef(function TransactionRightSection(props, ref) {
    const { singleTransaction, handleSingleTransaction, handlePrint } = props 
    let cols, columns, newStorageFields;
    function colFunc(value, tableMeta) {
        // console.log("value", value)
        return <FormControl variant="outlined" size="small" className={value == "APPROVE" ? "transaction-status-approve" : value == "DECLINE" ? "transaction-status-decline" : "transaction-status-review"}>

            <Select
                value={value}
                onChange={(e) => setselectOpt(e.target.value, tableMeta?.rowData[0])}
            //  MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
                <MenuItem value={"APPROVE"} className='approve-select'><span></span>APPROVE</MenuItem>
                <MenuItem value={"DECLINE"} className='decline-select'><span></span>DECLINE</MenuItem>
                <MenuItem value={"REVIEW"} className='review-select'><span></span>REVIEW</MenuItem>
            </Select>
        </FormControl>
    }
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
    const limitToast = () => toast.success("Maximum columns were reached")
    const [transState, setTransState] = useState()
    const [emailLookupDetails, setEmailLookupDetails] = useState(false)
    const [domailDetail, setDomainDetail] = useState(false)
    const [ipLookupDetails, setIpLookupDetails] = useState(false)
    const [phoneLookupDetails, setPhoneLookupDetails] = useState(false)
    const [addLogo, setAddLogo] = useState(false)
    const [newColumns, setNewColumns] = useState(cols);
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState()
    const [toDoFunct, setToDoFunct] = useState()
    const [oid, setOid] = useState()
    const containerStyle = {
        width: addLogo ? '500px' : "625px",
        height: addLogo ? '300px' : '350px'
    };

    const transationArr = []
    const transationObj = {}
    transationObj._id = singleTransaction?._id;
    transationObj.fraud_score = singleTransaction?.data?.fraud_score;
    transationObj.state = singleTransaction?.data?.state
    transationObj.userId = singleTransaction?.data?.id
    transationObj.email = singleTransaction?.data?.email_details?.email
    transationObj.date = singleTransaction?.data?.date
    transationObj.label = singleTransaction?.data?.label
    transationObj.price = singleTransaction?.data?.price

    transationObj.Transaction_Status = singleTransaction?.complete == "true" ? "complete" : "incomplete"
    transationObj.Action_type = singleTransaction?.data?.account_type
    // ipadata
    transationObj.Ip_Address = singleTransaction?.data?.ip_details?.ip
    transationObj.Ip_Score = singleTransaction?.data?.ip_details?.score
    transationObj.Ip_Type = singleTransaction?.data?.ip_details?.type
    transationObj.IP_Country = singleTransaction?.data?.ip_details?.country
    transationObj.Ip_City = singleTransaction?.data?.ip_details?.city
    transationObj.Ip_latitude = singleTransaction?.data?.ip_details?.latitude
    transationObj.Ip_Longitude = singleTransaction?.data?.ip_details?.longitude
    transationObj.Ip_timezone_offset = singleTransaction?.data?.ip_details?.timezone_offset
    transationObj.Harmful_Ip = singleTransaction?.data?.ip_details?.harmful == true ? "Yes" : "No"
    // phoneData
    transationObj.Phone_Number = singleTransaction?.data?.phone_details?.number
    transationObj.Phone_Score = singleTransaction?.data?.phone_details?.score
    transationObj.Phone_valid = singleTransaction?.data?.phone_details?.valid == true ? "Yes" : "No"
    transationObj.Phone_country = singleTransaction?.data?.phone_details?.country
    transationObj.Phone_carrier = singleTransaction?.data?.phone_details?.carrier
    transationObj.Phone_disposable = singleTransaction?.data?.phone_details?.disposable == true ? "Yes" : "No"
    transationObj.Phone_type = singleTransaction?.data?.phone_details?.type
    // emailData
    transationObj.Email_score = singleTransaction?.data?.email_details?.score
    transationObj.Email_domain = singleTransaction?.data?.email_details?.domain_details?.domain
    transationObj.Email_disposable = singleTransaction?.data?.email_details?.domain_details?.disposable == true ? "Yes" : "No"
    transationObj.Email_free = singleTransaction?.data?.email_details?.domain_details?.free == true ? "Yes" : "No"
    transationObj.Email_custom = singleTransaction?.data?.email_details?.domain_details?.custom == true ? "Yes" : "No"

    transationArr.push(transationObj)
    // })
    // console.log("singleTransaction", singleTransaction);
    function handleRefresh() {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }
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
        // onCellClick: (e, cellMeta) => handleDetail(e, cellMeta, transationArr[cellMeta.dataIndex]),
        textLabels: {
            body: {
                noMatch: 'No data found',
            }
        },
        draggableColumns: { enabled: true }
    }
    useEffect(() => {
        if (singleTransaction?.data?.state !== undefined) {
            setTransState(singleTransaction?.data?.state)
        }
        Cookies.set("comp",singleTransaction && singleTransaction?.complete)
    }, [singleTransaction])
    // console.log("ss", singleTransaction?.complete);
    function handleComplete() {
        // setCompleteState("Completed")
        const body = {
            id: singleTransaction?._id,
            comp: "true"
        }
        axios.put(`${LIVE_URL}/api/v1/ipass/update/transaction/complete`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response?.data?.success == true) {
                handleSingleTransaction(singleTransaction?._id)
            }
        })
    }
    function handleInComplete() {
        const body = {
            id: singleTransaction?._id,
            comp: "false"
        }
        axios.put(`${LIVE_URL}/api/v1/ipass/update/transaction/complete`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response?.data?.success == true) {
                handleSingleTransaction(singleTransaction?._id)
            }
        })
    }

    const appRule = singleTransaction?.data?.applied_rules
    const retdate = Date(singleTransaction?.data?.email_details?.history?.first_seen)
    const linkDate = moment(retdate).format("DD-MM-YYYY");
    //  console.log("date", singleTransaction);
    const [filterValue, setFilterValue] = useState()

    function handlePrintIt() {
        setEmailLookupDetails(true)
        setDomainDetail(true)
        setIpLookupDetails(true)
        setPhoneLookupDetails(true)
        setAddLogo(true)

        setTimeout(() => {
            handlePrint()
        }, 500)
        setTimeout(() => {
            setEmailLookupDetails(false)
            setDomainDetail(false)
            setIpLookupDetails(false)
            setPhoneLookupDetails(false)
            setAddLogo(false)
        }, 5000)

    }
    function setselectOpt(value, id) {
        
        // ipass/transaction/update/labels
        const comp=Cookies.get("comp")
        // console.log("comp", typeof comp);
        setTransState(value)
        if (comp == "true") {
            console.log("wwworksss");
            return false
        } 
        else {
            console.log("wwworksss11");
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
                    const transId = Cookies.get("mId")
                    handleSingleTransaction(transId)
                }
            })
        }
    }
    function setselectFilter(value) {
        setFilterValue(value)
        if (value == "Highest output") {
            appRule.sort((a, b) => (a.score > b.score) ? 1 : -1)
        }
        if (value == "Lowest output") {
            appRule.sort((a, b) => (a.score < b.score) ? 1 : -1)
        }
        if (value == "By category A-Z") {
            appRule.sort((a, b) => a.id.localeCompare(b.id))
        }
        if (value == "By category Z-A") {
            appRule.sort((a, b) => b.id.localeCompare(a.id))
        }
    }

    function handleOpenSetting() {
        setIsSettingOpen(true)
    }
    function handleCloseSettings() {
        setIsSettingOpen(false)
    }
    function setselectOptField(val) {
        setSelectedValue(val)
        setToDoFunct("add")
    }
    function handleAddField() {
        if (toDoFunct !== undefined) {
            if (toDoFunct == "add") {
                if (newColumns?.length < 10) {
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
    function handleFields() {
        return <>
            <table>
                <thead></thead>
                <tbody>
                    {newColumns !== null &&

                        newColumns?.map((colVals) => {
                            return (
                                colVals?.options?.display !== false && <tr>
                                    <td>{colVals?.label}</td>
                                    {/* <td onClick={() => removeColumn(colVals?.name, cols)}>-</td> */}
                                    {/* <td onClick={() => handleColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td> */}
                                    <td onClick={() => removeColumn(colVals?.name, cols)} className='minus-btn-delete'><AiOutlineMinusCircle /></td>
                                </tr>
                            )
                        })}

                </tbody>
            </table>
        </>

    }
    let fields = handleFields()
    const selectednotValue = "-1"

    return (
        <>
            {singleTransaction !== undefined &&
                <div className='transaction-detail-main' >
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
                                {newColumns.length >= 10 ?
                                    <Tooltip title="Maximum column reached">
                                        <FormControl sx={{ m: 1, width: 300 }}  >
                                            <label>Add new field</label>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                value={selectednotValue}
                                                onChange={(e) => setselectOptField(e.target.value)}
                                                MenuProps={MenuProps}
                                                disabled={newColumns.length >= 10 ? true : false}
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
                    <div className='transaction-details-inner' ref={ref}>
                        <div className='transaction-summary-card'>
                            {addLogo ?
                                <div className='headerAdmin'>
                                    <img src={Logo.src} />
                                </div> : null}
                            <div className='text-button-main'>
                                <span className="headingB">Transaction summary</span>
                                {singleTransaction?.complete == "true" ? <span className='complete-text'>{singleTransaction?.complete == "true" ? "Completed" : null}</span> : null}
                                <div className='mark-button'>
                                    {singleTransaction?.complete == "false" ? <button onClick={handleComplete}>Mark as completed</button> : <button onClick={handleInComplete}>Mark as incompleted</button>}
                                </div>
                            </div>
                            {!addLogo ?
                                <div className='setting-button detail'>
                                    <span onClick={handleOpenSetting}><AiFillSetting /></span>
                                </div> : null}
                            <MUIDataTable
                                data={transationArr ? transationArr : []}
                                columns={newColumns}
                                className="custom-table-outer"
                                options={options}
                            />
                        </div>
                        <div className='item-section'>

                            <div className='transaction-table-inner p-25 bgWhite'>
                                <div className='text-main'>
                                    <span className="headingB">Items</span>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Item Category</th>
                                            <th>Item Id</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Store</th>
                                            <th>Url</th>
                                            <th>Item Custom Field</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='scores-appliedRule-main p-25 bgWhite'>
                                <div className="customer_sec">
                                    <div className="score-email-main">
                                        <div className="frod-score-main">
                                            <span className="email-score">{singleTransaction && singleTransaction.data && singleTransaction.data && singleTransaction.data.fraud_score !== undefined ? singleTransaction.data.fraud_score : null}.00</span>
                                            <br />
                                            <ProgressBar className="progressbar-email"
                                                completed={singleTransaction && singleTransaction.data && singleTransaction.data && singleTransaction.data.fraud_score !== undefined ? singleTransaction.data.fraud_score : null}
                                                isLabelVisible={false}
                                                bgColor={singleTransaction && singleTransaction.data && singleTransaction.data && singleTransaction.data.fraud_score !== undefined ? singleTransaction.data.fraud_score !== 0 ? "#fd9393" : "#ebebeb" : null}
                                            />
                                        </div>

                                        <div className="scoreBarBoard">
                                            <div className="email-score score-holder ">
                                                <span className="scores-main-all">{singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.score !== undefined ? singleTransaction.data.email_details.score : null}.00</span>
                                                <span className="score-text">Email Score</span>
                                            </div>
                                            <div className="email-score score-holder ">
                                                <span className="scores-main-all">{singleTransaction && singleTransaction.data && singleTransaction.data.ip_details && singleTransaction.data.ip_details.score !== undefined ? singleTransaction.data.ip_details.score : null}</span>
                                                <span className="score-text">IP score</span>
                                            </div>
                                            <div className="email-score score-holder ">
                                                <span className="scores-main-all">{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.score !== undefined ? singleTransaction.data.phone_details.score : null}.00</span>
                                                <span className="score-text">Phone score</span>
                                            </div>
                                            <div className="email-score score-holder ">
                                                <span className="scores-main-all">{singleTransaction && singleTransaction.data && singleTransaction.data.device_details !== null ? singleTransaction.data.device_details : "N/A"}</span>
                                                <span className="score-text">Device score</span>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="aplied-rules-main">
                                        <div className='text-filters'>
                                            <span className="headingB">Applied Rules</span>
                                            <div className='filter-data'>
                                                <select onChange={(e) => setselectFilter(e.target.value)}>
                                                    <option>Highest output</option>
                                                    <option>Lowest output</option>
                                                    <option>By category A-Z</option>
                                                    <option>By category Z-A</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="transaction-table-inner">
                                            <table>
                                                {appRule?.map((apprul, i) => {
                                                    return (

                                                        <tbody>
                                                            <tr key={i}>
                                                                <td>{apprul.id}</td>{' '}
                                                                <td>{apprul.name}</td>{' '}
                                                                <td>{apprul.operation}{' '}{apprul.score}</td>{' '}
                                                                <td><BiEdit /></td>
                                                            </tr>
                                                        </tbody>

                                                    )
                                                })}
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="list-identity-section-main">
                                <Row>
                                    <Col xs={12} md={6}>
                                        <div className="identity-box">
                                            <div className="single-cust-inner">
                                                <h3><b>Identity</b></h3>

                                                <dl>
                                                    <dt>User ID</dt>
                                                    <dd>{singleTransaction && singleTransaction._id !== undefined ? singleTransaction._id : null}</dd>
                                                    <dt>Registrationscore</dt>
                                                    <dd className='identity-score'>
                                                        <span>{singleTransaction && singleTransaction?.data?.fraud_score}.00</span>
                                                        <ProgressBar className="progressbar-email"
                                                            completed={singleTransaction && singleTransaction.data && singleTransaction.data && singleTransaction.data.fraud_score !== undefined ? singleTransaction.data.fraud_score : null}
                                                            isLabelVisible={false}
                                                            bgColor={singleTransaction && singleTransaction.data && singleTransaction.data && singleTransaction.data.fraud_score !== undefined ? singleTransaction.data.fraud_score !== 0 ? "#fd9393" : "#ebebeb" : null}
                                                        /></dd>
                                                    <dt>Email</dt>
                                                    <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.email !== undefined ? singleTransaction.data.email_details.email : null}</dd>
                                                    <dt>Total amount</dt>
                                                    <dd>0EUR</dd>
                                                    <dt>Total transaction count</dt>
                                                    <dd>3</dd>
                                                    <dt>First View</dt>
                                                    <dd>{linkDate}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <div className="single-cust-inner">
                                            <h3><b>Lists Status</b></h3>
                                            <div className="email-data-blacklisted-content">
                                                <div className="black-listed">
                                                    <h4>Blacklisted</h4><br />
                                                    {singleTransaction && singleTransaction.data && singleTransaction.data && singleTransaction.data.applied_rules !== undefined ? singleTransaction.data.applied_rules.map((blist) => {
                                                        return (
                                                            <>
                                                                {blist.operation == "BLACKLIST" ?
                                                                    <span>{blist.name}</span>
                                                                    : null}
                                                            </>
                                                        )
                                                    })
                                                        : null}
                                                    <p>No data has been blacklisted</p>
                                                </div>
                                                <div className="white-listed">
                                                    <h4>White Listed</h4><br />
                                                    <p>No data has been whitelisted</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='addresses-emaildata-main'>
                                <Row className='ip-geological' style={{ "display": "flex" }}>
                                    <Col xs={12} md={6} className='address-column'>
                                        <div className='address-card'>
                                            {singleTransaction?.data?.ip_details == null ?
                                                <h3><b>No Data Found</b></h3> :
                                                <>
                                                    <h3><b>Addresses</b></h3>
                                                    <div className='geological-text-main'>
                                                        <span className='geological-text'>Ip geological</span>
                                                        <span>{singleTransaction?.data?.ip_details?.city}</span>
                                                        <div className='country-flag-main'>
                                                            <span>{singleTransaction?.data?.ip_details?.country}</span>
                                                            <ReactCountryFlag countryCode={singleTransaction?.data?.ip_details?.country} className='flag-main' />
                                                        </div>
                                                    </div>
                                                    <dl className='lat-long-main'>
                                                        <div className='lat-long'>
                                                            <dt>Latitude</dt>
                                                            <dd>{singleTransaction?.data?.ip_details?.latitude}</dd>
                                                        </div>
                                                        <div className='lat-long'>
                                                            <dt>longitude</dt>
                                                            <dd>{singleTransaction?.data?.ip_details?.longitude}</dd>
                                                        </div>
                                                    </dl>
                                                    <MapSection
                                                        singleTransaction={singleTransaction}
                                                        containerStyle={containerStyle}
                                                    />
                                                </>}
                                        </div>
                                        <div className='phone-ip-main'>
                                            <Row className='ip-geological' style={{ "display": "flex" }}>
                                                <Col className='phone-column'>
                                                    {loading ?
                                                        <ShimmerCategoryList />
                                                        :
                                                        <PhoneData
                                                            singleTransaction={singleTransaction}
                                                            phoneLookupDetails={phoneLookupDetails}
                                                            setPhoneLookupDetails={setPhoneLookupDetails}
                                                            handleRefresh={handleRefresh}
                                                        />}
                                                </Col>
                                            </Row>
                                        </div>
                                        <IpData
                                            singleTransaction={singleTransaction}
                                            ipLookupDetails={ipLookupDetails}
                                            setIpLookupDetails={setIpLookupDetails}
                                        />
                                    </Col>
                                    <EmailData
                                        singleTransaction={singleTransaction}
                                        emailLookupDetails={emailLookupDetails}
                                        setEmailLookupDetails={setEmailLookupDetails}
                                        domailDetail={domailDetail}
                                        setDomainDetail={setDomainDetail}
                                    />
                                </Row>

                            </div>

                        </div>

                    </div >
                    <div className="pdfButton">
                        <span className='pdf-icon'><BsFiletypePdf /></span>
                        <button onClick={handlePrintIt}>Save as pdf</button>
                    </div>
                </div >}</>
    )
})

export default TransactionRightSection