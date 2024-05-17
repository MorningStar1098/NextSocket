/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { RiUser3Fill } from 'react-icons/ri'
import { AiFillCaretDown } from 'react-icons/ai'
import Logo from '../../public/images/logo.png'
import { TiDocumentText } from 'react-icons/ti'
import {
    MdOutlineDocumentScanner,
    MdOutlineSettingsOverscan,
    MdOutlineShowChart,
    MdClose
} from 'react-icons/md'
import { BsList, BsQrCodeScan } from 'react-icons/bs'
import OutsideClickHandler from 'react-outside-click-handler';
import { FiMonitor, FiUsers } from "react-icons/fi";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { isEmpty } from '../ipasslisting/ipasslisting';
import { BiTransferAlt } from 'react-icons/bi'
import { LIVE_URL } from '../../Hooks/envConst'
import axios from 'axios'

function Header(props) {
    const history = useRouter();
    let pageState = history.query['p'] || '';
    const {
        setRequests,
        setIsLogged,
        setRequest,
        setStatics,
        setSingleCust,
        requests,
        statics,
        setCustomers,
        customers,
        setMyProfile,
        myProfile
    } = props


    let usericon = <RiUser3Fill />
    let downicon = <AiFillCaretDown className='down-arrow-main' />
    const [emailState, setEmailState] = useState('')
    const [profileDropDown, setProfileDropDown] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [navBarOpen, setNavBarOpen] = useState(false);
    const [userData, setUserData] = useState()

    //dated-30December2022 start
    useEffect(() => {
        if (!isEmpty(pageState)) {
            if (pageState == "requests") {
                handleRequests();
                window.history.replaceState(null, null, window.location.pathname);
            }
            else if (pageState == "statistics") {
                handleStatics();
                window.history.replaceState(null, null, window.location.pathname);
            }
            else if (pageState == "customers") {
                handleCustomers();
                window.history.replaceState(null, null, window.location.pathname);
            } else if (pageState == "profile") {
                handleProfilePage();
                window.history.replaceState(null, null, window.location.pathname);
            }
        }
    }, []);
    //dated-30December2022 end

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsMobile(true)
        }
    }, [])
    let emls = Cookies.get('issup')

    useEffect(() => {
        let emla = Cookies.get('email')
        let eml
        if (emla !== undefined) {
            eml = atob(emla)
        }
        setEmailState(eml)
        if (emls == 1) {
            handleUser(emailState)
        }
    }, [emailState])



    function handleUser(email) {
        axios.get(`${LIVE_URL}/api/v1/getuser/${email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {
            let res = response && response.data && response.data.data !== undefined ? response.data.data : null
            setUserData(res)

        })
    }
    // console.log("rr",userData?.sandbox_account);

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    function handleRequests() {
        setRequests(true)
        setRequest(true)
        setStatics(false)
        setSingleCust(false)
        setCustomers(false)
        setMyProfile(false)
        setNavBarOpen(false)
    }
    function handleStatics() {
        setStatics(true)
        setRequests(false)
        setSingleCust(false)
        setCustomers(false)
        setMyProfile(false)
        setNavBarOpen(false)
    }
    function handleCustomers() {
        // history.push({
        //     pathname: "/customerList",
        //     // query: { id: id }

        //   })
        setCustomers(true)
        setStatics(false)
        setRequests(false)
        setSingleCust(false)
        setMyProfile(false)
        setNavBarOpen(false)
    }
    function handleMyProfile() {
        setProfileDropDown(true)
    }
    function handleClosePopup() {
        setProfileDropDown(false)
    }

    function handleLogout() {
        Cookies.remove('token')
        Cookies.remove('email')
        Cookies.remove('pubprivkey')
        Cookies.remove('issup')
        Cookies.remove('sessionId')
        Cookies.remove('Uid')
        Cookies.remove("acc_type")
        sessionStorage.setItem("selectedStartDate", "All");
        sessionStorage.setItem("selectedEndDate", "All");
        sessionStorage.setItem("selectedActiontype", "All");
        sessionStorage.setItem("selectedCountrytype", "All");

        setIsLogged(false)
    }
    function handleProfilePage() {
        setMyProfile(true)
    }
    function handleNavigateClick(pageName) {
        history.push({
            pathname: pageName,
        })
    }

    return (
        <>
            <header className={navBarOpen ? "navBarOpen" : "navBarClose"}>
                <div className="headerAdmin">
                    {isMobile &&
                        <div className='headerNavIcons'>
                            <BsList onClick={() => (setNavBarOpen((prev) => !prev))} />
                            <MdClose onClick={() => setNavBarOpen(false)} />
                        </div>

                    }
                    <img src={Logo.src} onClick={handleRequests} />
                </div>
                <ul>
                    <li className={requests && !myProfile ? 'request-tab active' : 'request-tab'}>
                        <div className='requests-icon'><TiDocumentText /></div>
                        <div className={'dashboard-request-text'}>
                            <span onClick={handleRequests}>ID Doc</span>
                        </div>
                    </li>
                    <li className="static-tab">
                        <div className="requests-icon"><MdOutlineDocumentScanner /></div>
                        <div className={'dashboard-static-text'}>
                            <span onClick={() => handleNavigateClick("/documentScan")}>Doc Scan</span>
                        </div>
                    </li>
                    <li className="static-tab">
                        <div className="requests-icon docAuthIcon"><MdOutlineSettingsOverscan /></div>
                        <div className={'dashboard-static-text'}>
                            <span onClick={() => handleNavigateClick("/documentAuthentication")}>Doc Authentication</span>
                        </div>
                    </li>
                    <li className="static-tab">
                        <div className="requests-icon docAuthIcon"><BsQrCodeScan /></div>
                        <div className={'dashboard-static-text'}>
                            <span onClick={() => handleNavigateClick("/templatedocscan")}>TDS</span>
                        </div>
                    </li>
                    {emls == 1 ?
                        <>
                            {userData?.tms_account == "true" && userData?.sandbox_account == "false" ?
                                <li className="static-tab">
                                    <div className="requests-icon docAuthIcon"><FiMonitor /></div>
                                    <div className={'dashboard-static-text'}>
                                        <span onClick={() => handleNavigateClick("/trans")}>TMS</span>
                                    </div>
                                </li> : null}</> :
                        <li className="static-tab">
                            <div className="requests-icon docAuthIcon"><FiMonitor /></div>
                            <div className={'dashboard-static-text'}>
                                <span onClick={() => handleNavigateClick("/trans")}>TMS</span>
                            </div>
                        </li>}

                    <li className={statics && !myProfile ? 'static-tab active' : 'static-tab'}>
                        <div className='requests-icon'><MdOutlineShowChart /></div>
                        <div className={'dashboard-static-text'}>
                            <span onClick={handleStatics}>Statistics</span>
                        </div>
                    </li>
                    {emls == "0" ?
                        <li className={customers ? 'customer tab active' : ' customer tab'}>
                            <div className='requests-icon'><FiUsers /></div>
                            <div className={'dashboard-static-text'}>
                                <span onClick={handleCustomers} >Customers</span>
                            </div>
                        </li>
                        : null}

                </ul>
                <button onClick={handleMyProfile} >
                    {usericon}{emailState !== '' ? <span>{emailState}</span> : null}{downicon}
                    <div className="dropdown-ul">
                        <OutsideClickHandler
                            onOutsideClick={handleClosePopup}
                        >
                            {profileDropDown ?
                                <div className='two-buttons-main'>
                                    <div className='logout-btn-main'>
                                        <span onClick={handleLogout}>Logout</span>
                                    </div>
                                    {emls !== "0" ?
                                        <div className='logout-btn-main'>
                                            <span onClick={handleProfilePage}>My Profile</span>
                                        </div> : null}
                                </div>
                                : null}
                        </OutsideClickHandler>
                    </div>
                </button>
            </header>
        </>
    )
}
export default Header
