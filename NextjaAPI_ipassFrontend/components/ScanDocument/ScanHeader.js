/* eslint-disable */
import { FiMonitor, FiUsers } from "react-icons/fi";
import { MdClose, MdOutlineDocumentScanner, MdOutlineSettingsOverscan, MdOutlineShowChart } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import Logo from '../../public/images/logo.png';
import Cookies from 'js-cookie';
import { RiUser3Fill } from 'react-icons/ri';
import { AiFillCaretDown } from 'react-icons/ai';
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter } from "next/router";
import { checkLogin } from "../../Hooks/checkLogin";
import { BsList,BsQrCodeScan } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import axios from "axios";
import { LIVE_URL } from "../../Hooks/envConst";

const ScanHeader = () => {
    const emls = Cookies.get('issup');
    const usericon = <RiUser3Fill />;
    const downicon = <AiFillCaretDown className='down-arrow-main' />;
    const history = useRouter();
    const currentPage = history.pathname;
    const [emailState, setEmailState] = useState('');
    const [profileDropDown, setProfileDropDown] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [navBarOpen, setNavBarOpen] = useState(false);
    const [userData, setUserData] = useState()

    useEffect(() => {
        const token = Cookies.get('token');
        const base64email = Cookies.get('email');
        const eml = checkLogin(token, base64email);
       
        if (eml) {
            setEmailState(eml)
            setIsLogged(true);
            if(emls==1){
                handleUser(emailState) 
            }
        }
        else {
            handleLogout();
        }
    }, [isLogged]);

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
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsMobile(true)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    //code to stop hydration error start
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    //code to stop hydration error ends

    

    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
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
        setIsLogged(false);
        history.push("/")
    }

    function goToDashboard(page) {
        history.push({
            pathname: "/dashboard",
            query: { "p": page }
        })
    }

    function handleNavigateClick(pageName) {
        history.push({
            pathname: pageName,
        })
    }

    return (
        <div className="dashboard-header">
            <header className={navBarOpen ? "navBarOpen" : "navBarClose"}>
            <div className="headerAdmin">
                    {isMobile &&
                        <div className='headerNavIcons'>
                            <BsList onClick={() => (setNavBarOpen((prev) => !prev))} />
                            <MdClose onClick={() => setNavBarOpen(false)} />
                        </div>
                    }
                    <img src={Logo.src} onClick={goToDashboard} />
                </div>
                <ul>
                    <li className='request-tab' onClick={() => { goToDashboard("requests") }}>
                        <div className='requests-icon'><TiDocumentText /></div>
                        <div className={'dashboard-request-text'}>
                            <span>ID Doc</span>
                        </div>
                    </li>
                    <li
                        className={currentPage == "/documentScan" ? "static-tab active" : "static-tab"}
                        onClick={() => handleNavigateClick("/documentScan")}
                    >
                        <div className="requests-icon"><MdOutlineDocumentScanner /></div>
                        <div className='dashboard-static-text'>
                            <span>Doc Scan</span>
                        </div>
                    </li>
                    <li
                        className={currentPage == "/documentAuthentication" ? "static-tab active" : "static-tab"}
                        onClick={() => handleNavigateClick("/documentAuthentication")}
                    >
                        <div className="requests-icon docAuthIcon"><MdOutlineSettingsOverscan /></div>
                        <div className='dashboard-static-text'>
                            <span>Doc Authentication</span>
                        </div>
                    </li>
                    <li
                        className={currentPage == "/documentAuthentication" ? "static-tab active" : "static-tab"}
                        onClick={() => handleNavigateClick("/templatedocscan")}
                    >
                        <div className="requests-icon docAuthIcon"><BsQrCodeScan /></div>
                        <div className='dashboard-static-text'>
                            <span>TDS</span>
                        </div>
                    </li>
                    {emls==1?
                    <>
                    {userData?.tms_account=="true"&&userData?.sandbox_account=="false"?
                    <li className="static-tab">
                        <div className="requests-icon docAuthIcon"><FiMonitor /></div>
                        <div className={'dashboard-static-text'}>
                            <span onClick={() => handleNavigateClick("/trans")}>TMS</span>
                        </div>
                    </li>:null}</>:
                    <li className="static-tab">
                        <div className="requests-icon docAuthIcon"><FiMonitor /></div>
                        <div className={'dashboard-static-text'}>
                            <span onClick={() => handleNavigateClick("/trans")}>TMS</span>
                        </div>
                    </li>}
                    <li className='static-tab' onClick={() => { goToDashboard("statistics") }}>
                        <div className='requests-icon'><MdOutlineShowChart /></div>
                        <div className={'dashboard-static-text'}>
                            <span>Statistics</span>
                        </div>
                    </li>
                    {emls == "0"
                        ? <li className='customer tab' onClick={() => { goToDashboard("customers") }}>
                            <div className='requests-icon'><FiUsers /></div>
                            <div className={'dashboard-static-text'}>
                                <span>Customers</span>
                            </div>
                        </li>
                        : null}
                       
                </ul>
                <button onClick={handleMyProfile}>
                    {usericon}
                    {emailState === ''
                        ? null
                        : <span>{emailState}</span>}
                    {downicon}
                    <div className="dropdown-ul">
                        <OutsideClickHandler
                            onOutsideClick={handleClosePopup}
                        >
                            {profileDropDown
                                ? <div className='two-buttons-main'>
                                    <div className='logout-btn-main'>
                                        <span onClick={handleLogout}>Logout</span>
                                    </div>
                                    {emls === "0"
                                        ? null
                                        : <div className='logout-btn-main'>
                                            <span onClick={() => { goToDashboard("profile") }}>My Profile</span>
                                        </div>}
                                </div>
                                : null}
                        </OutsideClickHandler>
                    </div>
                </button>
            </header>
        </div>
    );
}
export default ScanHeader;