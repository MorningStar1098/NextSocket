/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { LIVE_URL, Link_show, Link_coppy } from '../Hooks/envConst'
import { AiOutlineClose } from 'react-icons/ai'
import LoadingIcons from 'react-loading-icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IpassListing from '../components/ipasslisting/ipasslisting';
import Header from '../components/Header/header'
import Statics from '../components/Statics/statics'
import { toast } from 'react-toastify';
import AddClient from '../components/AddClient/addclient'
import CustomerListing from '../components/CustomerListing/customerlisting'
import CustomeProfile from '../components/CustomerProfile/customerprofile'
import { MdOutlineContentCopy } from 'react-icons/md'
import { checkLogin } from '../Hooks/checkLogin';
// import { toHijri, toGregorian } from "hijri-converter";

function Dashboard() {

    // const inGregorian = toGregorian(1407,7,7)
    // console.log("1407,7,7 --->",inGregorian.gd, inGregorian.gm, inGregorian.gy);
    const eml = Cookies.get('issup')
    const base64Email = Cookies.get('email')
    const accType = Cookies.get("acc_type")
    const tokPubPrivkey = Cookies.get('pubprivkey')

    if (typeof window !== "undefined") {
        document.body.classList.add('dashboard-custom-body')
    }

    const coppyIcon = <MdOutlineContentCopy className='coppy-text-icon' />
    const coppyToast = () => toast.success("Link copied to clipboard")
    const history = useRouter();
    const [loading, setLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [requests, setRequests] = useState(true)
    const [statics, setStatics] = useState(false)
    const [showVerif, setShowVerif] = useState(false)
    const [genLink, setGenLink] = useState(false)
    const [selectOpt, setselectOpt] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [uid, setuid] = useState("")
    const [apiResp, setApiResp] = useState([])
    const [sesnid, setSesnid] = useState('')
    const [request, setRequest] = useState(true)
    const [singleCust, setSingleCust] = useState(false)
    const [limit, setLimit] = useState()
    const [customers, setCustomers] = useState(false)
    const [myProfile, setMyProfile] = useState(false)
    const [userData, setUserData] = useState()
    const [email, setEmail] = useState();
    const limitError = () => toast.error("You have exceed transactions limit")
    const suspendError = () => toast.error("Your account is suspended")
   
    // console.log("isAd",userData);
    useEffect(() => {
        const token = Cookies.get('token')
         const isAd=Cookies.get('issup')
         
        const eml = checkLogin(token, base64Email)
        if (eml) {
            setIsLogged(true)
            setEmail(eml);
            // if(isAd==1){
            //     handleUser() 
            // }
        }
        else {
            Cookies.remove('token');
            Cookies.remove('email');
            history.push('/')
        }
    }, [isLogged])
    
    function handleUser() {
        axios.get(`${LIVE_URL}/api/v1/getuser/${email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {
            let res = response && response.data && response.data.data !== undefined ? response.data.data : null
            setUserData(res)
            setLimit(res?.remaining)

        })
    }

    function handleForAdmins() {
        axios.get(`${LIVE_URL}/api/v1/ipass/data/admin/${email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        })
            .then((repos) => {
                setAllData(repos && repos.data && repos.data.data !== undefined ? repos.data.data : null)
            })
    }

    function testFunc(allData) {
        // setLimit(allData)
        // setLimitLength(limit.length)
    }

    function verifPopup() {
        if (limit == "0") {
            limitError()
            setShowVerif(false)
        } else if (userData?.issuspended == "1") {
            suspendError()
            setShowVerif(false)
        }
        else {
            setShowVerif(true);
        }
    }
    // if(userData?.issuspended=="1"){
    //     suspendError()
    // }
    function handelCloseVerif() {
        setShowVerif(false);
    }

    function uNameSet(e) {
        e.target.style.borderColor = "white";
        setFname(e.target.value)
    }

    function lNameSet(e) {
        e.target.style.borderColor = "white";
        setLname(e.target.value)
    }

    function handleSetUid(e) {
        e.target.style.borderColor = "white";
        setuid(e.target.value)
    }

    async function handelGenrateLink(e) {
        e.preventDefault();
        if (fname == "") {
            document.getElementById("fname").style.borderColor = "red";
            return
        }
        if (lname == "") {
            document.getElementById("lname").style.borderColor = "red";
            return
        }
        // if(uid==""){
        //     document.getElementById("userid").style.borderColor = "red";
        //     return
        // }
        setLoading(true);
        const current = new Date();
        let month = current.getMonth() + 1
        let minutes = current.getMinutes()
        let seconds = current.getSeconds()
        let crrDate = current.getDate()
        let crrHour = current.getHours()
        let date = `${current.getFullYear()}-${month < 10 ? `0${month}` : `${month}`}-${crrDate < 10 ? `0${crrDate}` : `${crrDate}`}T${crrHour < 10 ? `0${crrHour}` : `${crrHour}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}.597Z`;
        let body = JSON.stringify({
            integration: selectOpt,
            fname: fname,
            lname: lname,
            uniq_id: uid,
            workflow_id: selectOpt == "Id verification + Liveness + KYC" ? "10032" : selectOpt == "Id verification + KYC" ? "10015" : selectOpt == "Id verification + Liveness without KYC" ? "10011" : "10032",
            timestamp: date
        })
        await axios.post(`${LIVE_URL}/api/v1/ipass/customsession`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        }).then((response) => {
            if (response.status == 201) {
                const sessids = response.data.data._id
                setSesnid(sessids)
                handleToken(sessids);
            }
        })
    }
    async function handleToken(sessids) {
        let body = ({
            form: {
                'grant_type': 'client_credentials'
            },
            sesnid: sessids,
            // email: eml,
            tokpubpriv: tokPubPrivkey
        })
        await axios.post(`${LIVE_URL}/api/v1/ipass/jumio`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'

        }).then((response) => {
            const parseBody = response && response.data && response.data.parseBody !== undefined ? response.data.parseBody : null
            if (response.status == 201) {
                setLoading(false)
                setApiResp(parseBody);
                setGenLink(true);
                setShowVerif(false);
            }
        })
    }
    function handelCloseGenLink() {
        setGenLink(false);
    }

    const copyToClipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str);
        return Promise.reject('The Clipboard API is not available.');

    };
    function handleCoppy(customId) {
        copyToClipboard(customId);
        coppyToast()
    }
    function handleNotLink(e) {
        e.preventDefault()
    }
    // const date=new Date();
    // const hour=date.getHours()
    return (
        <>
            {isLogged ?
                <>
                    <div className="dashboard-header">
                        <Header
                            requests={requests}
                            statics={statics}
                            setRequests={setRequests}
                            setRequest={setRequest}
                            setStatics={setStatics}
                            setSingleCust={setSingleCust}
                            setIsLogged={setIsLogged}
                            setCustomers={setCustomers}
                            customers={customers}
                            setMyProfile={setMyProfile}
                            myProfile={myProfile}
                            userData={userData}
                        />
                        {/* <h2>Hi {hour<12?"Good morning":hour<18?"Good Afternoon":"Good evening"}{' '}{email}</h2> */}
                        {showVerif ?
                            <div className="addverif-popup-main">
                                <div className="addverif-popup-main_inner_sec">
                                    <button className="close-btn-verif" onClick={handelCloseVerif}><AiOutlineClose /></button>
                                    <div className="addverif-popup">
                                        <h2>Create a new profile request </h2>
                                        <p>Enter the information below to be able to create a new user identification request
                                            The user first and last name may be modified during the identification process, but the request identification code will not change </p>
                                        <form className="addverif-form">
                                            <label><span className="intdropdown">Workflow</span></label>
                                            <select id='selopt' onChange={(e) => setselectOpt(e.target.value)}>
                                                <option>Id verification + Liveness + KYC</option>
                                                <option> Id verification + KYC</option>
                                                <option> Id verification + Liveness without KYC</option>
                                            </select>
                                            <div className="modal_form_verficatn_btn_main">
                                                <div className="modal_form_verficatn_btn_main_inner">
                                                    <label>
                                                        <span className="usr-fname">User first name</span></label>
                                                    <input type="text" name="fname" id='fname' placeholder="The first name as it appears on the user document" onChange={(e) => uNameSet(e)} />
                                                </div>
                                                <div className="modal_form_verficatn_btn_main_inner">
                                                    <label>
                                                        <span className="usr-lname">User last name</span></label>
                                                    <input type="text" name="lname" id='lname' placeholder="Last name as it appears in the user document" onChange={(e) => lNameSet(e)} /><br />
                                                </div>
                                            </div>
                                            <div className="popup-mdl_sec_second_last_sec">
                                                <label>
                                                    <span className="uniq-id">Id code (400 items) </span></label>
                                                <input type="text" id="userid" placeholder="user document, order number, identity...etc" onChange={(e) => handleSetUid(e)} />
                                            </div>
                                            {/* {lname == ""?fname == "" ? <div className={`${lname == "" ? 'popup_mopdal_sec_last_btn' :fname == ""?'popup_mopdal_sec_last_btn': 'popup_mopdal_sec_last_btn_notdisabled'}`}>
                                                <button id='button-disable' className="loaderImageS" onClick={handleNotLink}
                                                >
                                                    create
                                                </button>
                                                <p>Choose the identification mechanism and enter the user name to create an identification request </p>
                                            </div> :
                                                <div className={`${lname == ""&&fname == "" ? 'popup_mopdal_sec_last_btn' : 'popup_mopdal_sec_last_btn_notdisabled'}`}>
                                                    <button id='button-disable' className="loaderImageS" onClick={handelGenrateLink}
                                                    >{loading ? <LoadingIcons.Bars /> :
                                                        "create"
                                                        } </button>
                                                    <p>Choose the identification mechanism and enter the user name to create an identification request </p>
                                                </div>:<div className={`${lname == ""? 'popup_mopdal_sec_last_btn' :fname == ""?'popup_mopdal_sec_last_btn':  'popup_mopdal_sec_last_btn_notdisabled'}`}>
                                                    <button id='button-disable' className="loaderImageS" onClick={handelGenrateLink}
                                                    >{loading ? <LoadingIcons.Bars /> :
                                                        "create"
                                                        } </button>
                                                    <p>Choose the identification mechanism and enter the user name to create an identification request </p>
                                                </div>} */}
                                            <div className={'popup_mopdal_sec_last_btn_notdisabled'}>
                                                <button id='button-disable' className="loaderImageS" onClick={handelGenrateLink}
                                                // disabled={uid == ""?true:false}
                                                >{loading ? <LoadingIcons.Bars /> :
                                                    "create"
                                                    } </button>
                                                {/* <p>Choose the identification mechanism and enter the user name to create an identification request </p> */}
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            : genLink ?


                                <div className="genlink-popup-main addverif-popup-main">
                                    <div className="genlink-popup-main_inner">
                                        <button className="cross_btn" onClick={handelCloseGenLink}><AiOutlineClose /></button>
                                        <div className="genlink-popup-main_inner_sec_modal">
                                            <div className="genlink-colleft">
                                                {apiResp?.error == "invalid_client" ? null :
                                                    <p>Click on the link below to open the induction session</p>
                                                }

                                                <div className="add-verif-link">

                                                    {apiResp?.error == "invalid_client" ? <h3>Something went wrong. Please check you public or private keys.</h3> :
                                                        <>
                                                            <Link href={{ pathname: '/verifyemail', query: { id: sesnid, tok: tokPubPrivkey, eml: base64Email, sup: eml, acc: accType } }}><a target="_blank" rel="noreferrer">{`${Link_show}/${apiResp.access_token}`}</a></Link>
                                                            <button className='coppy-link-button' onClick={() => handleCoppy(`${Link_coppy}?id=${sesnid}&tok=${tokPubPrivkey}&sup=${eml}&eml=${base64Email}&acc=${accType}`)}>{coppyIcon}</button>
                                                        </>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                : null}

                        {!statics && !customers && !myProfile ? <div className="addverification-button">
                            <button onClick={verifPopup}>Add Verifications</button>
                            {eml == "0" ?
                                <AddClient /> : null}
                        </div> : null}
                        {requests && !myProfile ?
                            <IpassListing
                                apiResp={apiResp} sesnid={sesnid}
                                setRequests={setRequests} requests={requests}
                                setRequest={setRequest} request={request}
                                setSingleCust={setSingleCust} singleCust={singleCust}
                                eml={eml} testFunc={testFunc} userData={userData}
                            /> : null}
                        {statics && !myProfile ?
                            <Statics /> : null
                        }
                        {customers && !myProfile ?
                            <CustomerListing
                                setCustomers={setCustomers}
                                customers={customers}
                            />
                            : null}
                        {myProfile ? <CustomeProfile
                            email={email}
                        /> : null}
                    </div>
                </> : null}
        </>
    )
}
export default Dashboard