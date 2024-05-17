/* eslint-disable */
import React, { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { GrFormClose } from 'react-icons/gr'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link'
import { LIVE_URL } from '../../Hooks/envConst'
import { SiGravatar } from 'react-icons/si'
import { AiOutlineAmazon } from 'react-icons/ai'
import { AiFillApple } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { SiFlipkart } from 'react-icons/si'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { BsInstagram } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
import { BsMicrosoft } from 'react-icons/bs'
import { RiNetflixFill } from 'react-icons/ri'
import { FaYahoo } from 'react-icons/fa'
import { BsWordpress } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaPinterestP } from 'react-icons/fa'
import { BsSkype } from 'react-icons/bs'
import { BsWhatsapp } from 'react-icons/bs'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { FaFolder } from 'react-icons/fa'
import { SiAdobe } from 'react-icons/si'
import { FaAirbnb } from 'react-icons/fa'
import { FaAtlassian } from 'react-icons/fa'
import { TbBrandBooking } from 'react-icons/tb'
import { BsDiscord } from 'react-icons/bs'
import { FaEbay } from 'react-icons/fa'
import { DiEnvato } from 'react-icons/di'
import { FaEvernote } from 'react-icons/fa'
import { FaFlickr } from 'react-icons/fa'
import { FaFoursquare } from 'react-icons/fa'
import ProgressBar from "@ramonak/react-progress-bar";
import { TbWorld } from "react-icons/tb"
import { RiKakaoTalkLine } from 'react-icons/ri'
import { FaLastfm } from 'react-icons/fa'
import { SiMyspace } from 'react-icons/si'
import { FaQuora } from 'react-icons/fa'
import { SiSamsung } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'
import { TbExternalLink } from 'react-icons/tb'
import { BiEdit } from 'react-icons/bi'
import { FaSnapchatSquare } from 'react-icons/fa'
import { RiLineLine } from 'react-icons/ri'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaViber } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'
import { TbBan } from 'react-icons/tb'
import { GetSocialData } from "../PdfComponent/PdfComponentData";

function SocialMedia(props) {
    const { singlecustomer, setMetaData, setIdCheck, setSimilaity, setLiveness,
        MetaData, socialdata, setSocialData, setAmlCheck } = props
    const [singleCust, setSingleCust] = useState([])
    const [domailDetail, setDomainDetail] = useState(false)
    const [apistate, setApiState] = useState(true)
    const verifiedicon = <TiTick />
    const notverified = <GrFormClose />
    let custid;
    if (singlecustomer && singlecustomer.sessionsid !== undefined) {
        custid = singlecustomer.sessionsid
        {
            if (apistate) {
                handleMedia();
            } else {
                null;
            }
        }
    }

    function handleMedia() {
        axios.get(`${LIVE_URL}/api/v1/ipass/getoneData/${custid}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            mode: 'no-cors',
        })
            .then((respos) => {
                setApiState(false)
                setSingleCust(respos && respos.data && respos.data !== undefined ? respos.data : null)
            });
    }
    function handlemetaCheck() {
        setMetaData(true)
        setIdCheck(false)
        setSimilaity(false)
        setLiveness(false)
        setSocialData(false)
        setAmlCheck(false)
    }
    function handleSocialMedia() {
        setSocialData(true)
        setMetaData(false)
        setIdCheck(false)
        setSimilaity(false)
        setLiveness(false)
        setAmlCheck(false)
    }
    const socialMedia = singleCust && singleCust.data && singleCust.data.data !== undefined && singleCust && singleCust.data && singleCust.data.data !== null ? singleCust.data.data.account_details : ""
    const phoneMedia = singleCust && singleCust.data_phone !== undefined && singleCust && singleCust.data_phone !== null ? singleCust.data_phone.account_details : ""
    const DomainData = singleCust && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.domain_details : ""
    const IpData = singleCust?.ip_data?.data
    let seondat1, seondat2, seonrevDat, seonday, seonfinalDat;
    seonrevDat = singleCust && singleCust.data && singleCust.data.data !== undefined && singleCust && singleCust.data && singleCust.data.data !== null ?
        singleCust && singleCust.data !== undefined ? singleCust.data.update_at : null : null;
    function seonFormatDate(d) {
        var dat = new Date(d);

        if (isNaN(dat.getTime())) {
            return d;
        } else {
            var month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            seonday = dat.getDate();

            if (seonday < 10) {
                seonday = "0" + seonday;
            }

            return seonday + " " + month[dat.getMonth()] + ", " + dat.getFullYear();
        }
    }
    seondat1 = new Date().getTime() - new Date(seonrevDat).getTime();
    seondat2 = seondat1 / Math.floor(1000 * 60 * 60 * 24);
    seonfinalDat = seonFormatDate(seonrevDat);

    function handleDomains() {
        setDomainDetail(!domailDetail)
    }

    let insdate = singlecustomer && singlecustomer.createdAt !== undefined ? singlecustomer.createdAt.slice(0, 10) : null
    let instime = singlecustomer && singlecustomer.createdAt !== undefined ? singlecustomer.createdAt.slice(11, 16) : null
    const initatedatetime = `${insdate} ${instime}`
    let date2 = singlecustomer && singlecustomer.startedAt !== undefined ? singlecustomer.startedAt.slice(0, 10) : null
    let time2 = singlecustomer && singlecustomer.startedAt !== undefined ? singlecustomer.startedAt.slice(11, 16) : null
    const startDateTime = `${date2} ${time2}`
    let date3 = singlecustomer && singlecustomer.completedAt !== undefined ? singlecustomer.completedAt.slice(0, 10) : null
    let time3 = singlecustomer && singlecustomer.completedAt !== undefined ? singlecustomer.completedAt.slice(11, 16) : null
    const completeDateTime = `${date3} ${time3}`

    GetSocialData(socialMedia, phoneMedia, DomainData, seonfinalDat, singleCust, IpData);

    return (
        <>

            <div className={MetaData ? "id-check active" : 'id-check'}>

                <div className={'metadata-chk'}>
                    <button onClick={handlemetaCheck}>
                        <span>{verifiedicon}</span>
                        Metadata</button>
                </div>
                {MetaData ?
                    <div className='id-doccheck-innerdata'>
                        <div className='metadata-block-main'>
                            {/* <div className='metadata-heading'>
                            <h3><b>Ip Data</b></h3>
                            </div> */}
                            <div className='transaction-media-detail-main transaction-metadata-inner-main'>
                                <div className='transaction-metadata-left'>
                                    <div className="ip-add-box">
                                        <div className="single-cust-inner">
                                            <h3><b>Geolocation Data </b></h3>

                                            <dl>
                                                <div className='left-side-content'>
                                                    <dt>Ip Address</dt>
                                                    <dd>{IpData?.ip}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Isp Name</dt>
                                                    <dd>{IpData?.isp_name}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Country</dt>
                                                    <dd>{IpData?.country}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>City</dt>
                                                    <dd>{IpData?.city}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Score</dt>
                                                    <dd>{IpData?.score}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Spam Number</dt>
                                                    <dd>{IpData?.spam_number}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>State Prov</dt>
                                                    <dd>{IpData?.state_prov}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>TimeZone</dt>
                                                    <dd>{IpData?.timezone_offset}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Type</dt>
                                                    <dd>{IpData?.type}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Customer Hits</dt>
                                                    <dd>{IpData?.history?.customer_hits}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Hits</dt>
                                                    <dd>{IpData?.history?.hits}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Harmful</dt>
                                                    <dd>{IpData?.harmful == false ? "No" : IpData?.harmful == true ? "Yes" : null}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Tor</dt>
                                                    <dd>{IpData?.tor == false ? "No" : IpData?.tor == "true" ? "Yes" : null}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Vpn</dt>
                                                    <dd>{IpData?.vpn == false ? "No" : IpData?.vpn == true ? "Yes" : null}</dd>
                                                </div>
                                                <div className='left-side-content'>
                                                    <dt>Web Proxy</dt>
                                                    <dd>{IpData?.web_proxy == false ? "No" : IpData?.web_proxy == true ? "Yes" : null}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                {IpData && IpData.applied_rules && IpData.flags !== undefined ?
                                    <div className='transaction-metadata-right'>
                                        <div className="ip-aplied-rules-main">
                                            <h3>Applied Rules</h3>
                                            <div className=' applied-rules-inner'>
                                                {IpData && IpData.applied_rules !== undefined ? IpData.applied_rules.map((rules) => {
                                                    return (
                                                        <table>
                                                            <tbody>
                                                                <tr >
                                                                    <td>{rules.id}</td>{' '}
                                                                    <td>{rules.name}</td>{' '}
                                                                    <td >{rules.operation}</td>{' '}
                                                                    <td className='app-rules-score'>{rules.score}</td>
                                                                    <div className='edit-button-app-rules'><BiEdit /></div>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    )
                                                }) : null}
                                            </div>
                                            <div className='spam-urls-main'>
                                                <h3>Spam Url</h3>
                                                <span>{IpData?.spam_urls[0] !== undefined ? IpData?.spam_urls[0] : null}</span>
                                                <span>{IpData?.spam_urls[1] !== undefined ? IpData?.spam_urls[1] : null}</span>
                                                <span>{IpData?.spam_urls[2] !== undefined ? IpData?.spam_urls[2] : null}</span>
                                                <span>{IpData?.spam_urls[3] !== undefined ? IpData?.spam_urls[3] : null}</span>
                                                <span>{IpData?.spam_urls[4] !== undefined ? IpData?.spam_urls[4] : null}</span>


                                            </div>
                                            <div className='flage-main'>
                                                <h3>Flags</h3>
                                                {IpData && IpData.flags !== undefined ? IpData.flags.map((flag) => {
                                                    return (
                                                        <>
                                                            <span>{flag?.industry}</span>
                                                            <span>{flag?.note}</span>
                                                        </>
                                                    )
                                                }) : null}
                                            </div>
                                        </div>
                                    </div> : null}
                            </div>
                        </div>

                    </div> : null}
            </div>


            <div className={socialdata ? "id-check active" : 'id-check'}>
                <div className={'metadata-chk'}>
                    <button onClick={handleSocialMedia}>
                        <span>{verifiedicon}</span>
                        Social Media
                    </button>
                </div>
                <div className='id-doccheck-innerdata'>
                    {socialdata ?
                        <div className="single-cust-main">
                            {singleCust && singleCust.data && singleCust.data.data !== undefined && singleCust && singleCust.data && singleCust.data.data !== null ?
                                <>
                                    <div className="single-cust-inner">

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>User ID</th>
                                                    <th>Result</th>
                                                    <th>Email</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{singleCust && singleCust.data && singleCust.data._id !== undefined ? singleCust.data._id : null}</td>
                                                    <td>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score : null}</td>
                                                    <td>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.email : null}</td>
                                                    <td> {seonfinalDat}</td>
                                                </tr>
                                            </tbody>

                                        </table>

                                    </div>
                                    <div className="single-cust-inner">
                                        <Row className="customer_sec">
                                            <Col xs={12} md={4}>
                                                <div className="score-email-main">
                                                    <Row>
                                                        <Col xs={12} md={6}>
                                                            <div className="frod-score-main">
                                                                <span className="email-score">{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score : null}.00</span>
                                                                <br />
                                                                <ProgressBar className="progressbar-email"
                                                                    completed={singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score : null}
                                                                    isLabelVisible={false}
                                                                    bgColor={singleCust && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score !== 0 ? "#fd9393" : "#ebebeb" : null}
                                                                />

                                                                <br /><span className="email-score-text">Degree of fraud</span>
                                                            </div>
                                                        </Col>

                                                        <Col xs={12} md={5}>
                                                            <div className="email-score score-holder ">
                                                                <span className="scores-main-all">{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score : null}.00</span>
                                                                <br /><span className="score-text">Email Score</span>
                                                            </div>
                                                            <div className="email-score score-holder ">
                                                                <span className="scores-main-all">0.00</span><br />
                                                                <span className="score-text">IP score</span>
                                                            </div>
                                                            <div className="email-score score-holder ">
                                                                <span className="scores-main-all">{singleCust && singleCust.data_phone !== undefined ? singleCust.data_phone.score : null}.00</span>
                                                                <br /><span className="score-text">Phone class</span>
                                                            </div>
                                                            <div className="email-score score-holder ">
                                                                <span className="scores-main-all">N/A</span>
                                                                <br /> <span className="score-text">Device score</span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={8}>
                                                <div className="aplied-rules-main">

                                                    <h4>Rules Applicable</h4>
                                                    <div className="applied-rules pause-top">
                                                        <div className="emain-info-icon">

                                                            <p>Email Rules</p> <FaFolder />
                                                        </div>
                                                        {singleCust && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.applied_rules.map((apprul, i) => {
                                                            return (
                                                                <table>
                                                                    <tbody>
                                                                        <tr key={i}>
                                                                            <td>{apprul.id}</td>{' '}
                                                                            <td>{apprul.name}</td>{' '}
                                                                            <td>{apprul.operation}</td>{' '}
                                                                            <td>{apprul.score}</td><BiEdit />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            )
                                                        }) : null}
                                                    </div>
                                                    <div className="phone-number-rules">
                                                        <div className="emain-info-icon">
                                                            <span>Phone Rules</span><FaFolder />
                                                        </div>
                                                        {singleCust && singleCust.data_phone && singleCust.data_phone.applied_rules !== undefined ? singleCust.data_phone.applied_rules.map((apprul, i) => {
                                                            return (
                                                                <table>
                                                                    <tbody>
                                                                        <tr key={i}>
                                                                            <td>{apprul.id}</td>{' '}
                                                                            <td>{apprul.name}</td>{' '}
                                                                            <td>{apprul.operation}</td>{' '}
                                                                            <td>{apprul.score}</td><BiEdit />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            )
                                                        }) : null}
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="list-identity-section-main">
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <div className="identity-box">
                                                    <div className="single-cust-inner">
                                                        <h3><b>Identity</b></h3>

                                                        <dl>
                                                            <dt>User ID</dt>
                                                            <dd>{singleCust && singleCust.data && singleCust.data._id !== undefined ? singleCust.data._id : null}</dd>
                                                            <dt>Email</dt>
                                                            <dd>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.email : null}</dd>
                                                            <dt>Total amount</dt>
                                                            <dd>0EUR</dd>
                                                            <dt>Total Number of Transactions</dt>
                                                            <dd></dd>
                                                            <dt>First View</dt>
                                                            <dd></dd>
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
                                    <div className="email-phone-main">
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <div className="phone-content">
                                                    <h3>Phone Information</h3>
                                                    <span className="customer-number">+{singleCust && singleCust.data !== undefined ? singleCust.data_phone.number : null}</span>
                                                    <div className="phone-score">
                                                        <div className="phone_score_inner_sec">
                                                            <div className="phone_score_inner_sec_left">
                                                                <span className="phone-cuist-score">{singleCust && singleCust.data_phone && singleCust.data_phone.score !== undefined ? singleCust.data_phone.score : null}.00</span>
                                                                <span className="phone-outof">/100</span>
                                                            </div>
                                                            <div className="phone_score_inner_sec_right">
                                                                <span>result</span>
                                                            </div>
                                                        </div>
                                                        <ProgressBar className="progressbar-phone"
                                                            completed={singleCust?.data_phone?.score}
                                                            isLabelVisible={false}
                                                            bgColor={singleCust && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score !== 0 ? "#60BDB2" : "#ebebeb" : null}
                                                        //  baseBgColor={singleCust && singleCust.data_phone && singleCust.data_phone.score== 0?"#60BDB2":"#60BDB"}
                                                        />
                                                    </div>

                                                    <div className='phone-number-content'>
                                                        <dl>
                                                            <dt >country</dt>
                                                            <dd>{singleCust && singleCust.data_phone && singleCust.data_phone.country !== undefined ? singleCust.data_phone.country : null}</dd>
                                                            <dt>Valid</dt>
                                                            <dd>{singleCust && singleCust.data_phone && singleCust.data_phone.valid !== undefined ? singleCust.data_phone.valid == true ? "Yes" : "No" : null}</dd>
                                                            <dt>Possible</dt>
                                                            <dd>{singleCust && singleCust.data_phone && singleCust.data_phone.disposable !== undefined ? singleCust.data_phone.disposable == true ? "Yes" : "No" : null}</dd>
                                                            <dt>write</dt>
                                                            <dd>{singleCust && singleCust.data_phone && singleCust.data_phone.type !== undefined ? singleCust.data_phone.type : null}</dd>
                                                            <dt>Disposable</dt>
                                                            <dd>{singleCust && singleCust.data_phone && singleCust.data_phone.disposable !== undefined ? singleCust.data_phone.disposable == true ? "Yes" : "No" : null}</dd>
                                                            <dt>Phone Company</dt>
                                                            <dd>{singleCust && singleCust.data_phone && singleCust.data_phone.carrier !== undefined ? singleCust.data_phone.carrier : null}</dd>
                                                        </dl>
                                                    </div>

                                                    <div className="email-content">
                                                        <div className="email-registered row gutters row-social">
                                                            <Col xs={12} md={12} className="">
                                                                <h3>Registered</h3>
                                                                <h4>Online Profiles</h4>
                                                            </Col>

                                                            {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== null && phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== false ?

                                                                <>

                                                                    <Col xs={12} md={12} className="socialActive">
                                                                        <div className="googleProflePic socialActive">
                                                                            {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== null ? <><BsSkype />Skype</> : null}
                                                                        </div>
                                                                    </Col>

                                                                    <div className="skype-details">
                                                                        <div className="skype-image-name">
                                                                            <div className="skype-img">
                                                                                <img src={phoneMedia.skype && socialMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.photo : null}
                                                                                /><br />

                                                                            </div>
                                                                            <div className="skype-name-phone">

                                                                                <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.name : null}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        <div className="skype-else-detail">

                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.name !== null ?
                                                                                <>
                                                                                    <b>Name:</b>
                                                                                    <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.name : null}</span><br /></> : null : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.id !== null ?
                                                                                <>
                                                                                    <b>Skype ID:</b>
                                                                                    <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.id : null}</span><br /></> : null : null}

                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.gender !== null ?
                                                                                <>
                                                                                    <b>Gender:</b>
                                                                                    <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.gender == 2 ? "Female" : "Male" : null}</span><br />
                                                                                </>
                                                                                : null : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.age !== null ?
                                                                                <>
                                                                                    <b>Age:</b>
                                                                                    <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.age : null}</span><br />
                                                                                </>
                                                                                : null : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.language !== null ?
                                                                                <>
                                                                                    <b>Language:</b>
                                                                                    <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.language : null}</span><br />
                                                                                </>
                                                                                : null : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.handle !== null ?
                                                                                <>
                                                                                    <b>Deals:</b>
                                                                                    <span>{phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.handle : null}</span></> : null : null}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                : null}
                                                            <div className="not-detail-customers">
                                                                {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== false && phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== null ?
                                                                    <>
                                                                        <Col xs={12} md={6} className="socialActive">

                                                                            <div className="googleProflePic socialActive">
                                                                                {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== false ? <><FcGoogle /> google</>
                                                                                    : null}

                                                                            </div>
                                                                        </Col>
                                                                    </>
                                                                    : null}

                                                                {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== false && phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== false ? <><TbBan />Bukalapak</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== false && phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== false ? <><AiFillFacebook />Facebook</> : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== false && phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== false ? <><SiFlipkart />flipkart</> : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {phoneMedia.instagram && phoneMedia.instagram.registered !== undefined && phoneMedia.instagram.registered !== false && phoneMedia.zoho && phoneMedia.zoho.registered !== undefined && phoneMedia.instagram.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.zoho && phoneMedia.zoho.registered !== undefined && phoneMedia.instagram.registered !== false ? <><BsInstagram />instagram</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== false && phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== false ? <><TbBan />Kakao</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== false && phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== false ? <><BsMicrosoft />Microsoft</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== false && phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== false ? <><AiFillTwitterCircle />twitter</> : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== false && phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== false ? <><FaYahoo />Yahoo</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== false && phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== false ? <><FaSnapchatSquare />Snapchat</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== false && phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== false ? <><FaYahoo />Zalo</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== false && phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== false ? <><BsWhatsapp />Whatsapp</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== false && phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== false ? <><FaViber />Viber</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== false && phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== false ? <><FaTelegramPlane />Telegram</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== false && phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== false ? <>Ok</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== false && phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== false ? <><RiLineLine />Line</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== false && phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== null ? <Col xs={12} md={12} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== false ? <><TbBan />Jdid</> : null}
                                                                    </div>
                                                                </Col> : null}

                                                            </div>

                                                            {/* <div className="clearfix"></div> */}

                                                        </div>

                                                        <div className="email-not-registered row gutters row-social">
                                                            <div className="not-registered-profiles">
                                                                <Col xs={12} md={12}>
                                                                    <h3>Not registered</h3>
                                                                    <h4>Online Profiles</h4>
                                                                </Col>
                                                            </div>
                                                            <div className="not-register-data">
                                                                {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered == false ? <><TbBan />Bukalapak</> : null}
                                                                    </Col> : null}
                                                                {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered == false ?

                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered == false ? <>facebook</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered == false ? <><SiFlipkart />flipkart</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered == false ? <><FcGoogle /> google</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.instagram && phoneMedia.instagram.registered !== undefined && phoneMedia.instagram.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.zoho && phoneMedia.zoho.registered !== undefined && phoneMedia.instagram.registered == false ? <><BsInstagram />instagram</> : null}
                                                                    </Col> : null}
                                                                {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered == false ? <><RiKakaoTalkLine />Kakao</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered == false ? <><BsMicrosoft />Microsoft</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered == null ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered == null ? <><BsSkype />Skype</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered == false ? <><AiFillTwitterCircle />twitter</> : null}
                                                                    </Col> : null}

                                                                {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered == false ?
                                                                    <Col xs={12} md={6}>
                                                                        {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered == false ? <><FaYahoo />Yahoo</> : null}
                                                                    </Col> : null}
                                                                {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== false && phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== null ? <Col xs={12} md={6} >
                                                                    {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered == false ? <><FaSnapchatSquare />Snapchat</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered == false ? <Col xs={12} md={6} >
                                                                    {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered == false ? <><SiZalo />Zalo</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered == false ? <Col xs={12} md={6} >
                                                                    {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered == false ? <><BsWhatsapp />Whatsapp</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered == false && phoneMedia.viber ? <Col xs={12} md={6} >
                                                                    {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered == false ? <><FaViber />Viber</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered == false ? <Col xs={12} md={6} >
                                                                    {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered == false ? <><FaTelegramPlane />Telegram</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered == false ? <Col xs={12} md={6}  >
                                                                    {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered == false ? <><TbBan />Ok</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered == false ? <Col xs={12} md={6} >
                                                                    {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered == false ? <><RiLineLine />Line</> : null}
                                                                </Col> : null}
                                                                {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered == false ? <Col xs={12} md={6}  >
                                                                    {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered == false ? <><TbBan />Jdid</> : null}
                                                                </Col> : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </Col>
                                            <Col xs={12} md={6}>
                                                <div className="email-info-main">
                                                    <div className="email-info-data">
                                                        <h3><b>Email Information</b></h3>
                                                    </div>
                                                    <div className="email-info-content">
                                                        <dl>
                                                            <dd>
                                                                <span className="customer-email">{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.email : null}</span>
                                                                <div className="phone-score">
                                                                    <div className="phone_score_inner_sec">
                                                                        <div className="phone_score_inner_sec_left">
                                                                            <span className="phone-cuist-score">{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score : null}.00</span>
                                                                            <span className="phone-outof">/100</span>
                                                                        </div>
                                                                        <div className="phone_score_inner_sec_right">
                                                                            <span>result</span>
                                                                        </div>
                                                                    </div>
                                                                    <ProgressBar className="progressbar-phone"
                                                                        completed={singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score : null}
                                                                        isLabelVisible={false}
                                                                        bgColor={singleCust && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.score !== 0 ? "#60BDB2" : "#ebebeb" : null}

                                                                    />
                                                                </div>
                                                            </dd>
                                                            <dd className="search-google-dd">

                                                                <Link href={`https://www.google.com/search?q=${singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.email : "#"}`}>Search on Google</Link><TbExternalLink />
                                                            </dd>
                                                        </dl>
                                                        <dl className="email-delieverable">
                                                            <dt>Delivery</dt>                                                            <p>{singleCust && singleCust.data && singleCust.data.data && singleCust.data.data.deliverable !== undefined ? singleCust.data.data.deliverable == true ? "Yes" : "No" : null}</p>
                                                        </dl>
                                                        <div className="data-breaches-bottom-main">
                                                            <h3>Data breaches<FaDatabase /></h3>
                                                            <dl className="breaches">
                                                                <dt>Data breaches</dt>
                                                                <dd>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.breach_details.number_of_breaches !== 0 ? singleCust.data.data.breach_details.number_of_breaches : "No Data" : null}</dd>
                                                                <dt>First breach</dt>
                                                                <dd>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ? singleCust.data.data.breach_details.first_breach : null}</dd>

                                                                {singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ?
                                                                    singleCust.data.data.breach_details.breaches !== null ? singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined ?
                                                                        singleCust.data.data.breach_details.breaches.map((breach) => {
                                                                            return (
                                                                                <>
                                                                                    <dt>{breach.name}</dt>
                                                                                    <dd>{breach.date}</dd>
                                                                                </>
                                                                            )
                                                                        })

                                                                        : null : null : null}

                                                            </dl>

                                                        </div>
                                                    </div>
                                                    <div className="email-content">
                                                        <div className="email-registered row gutters row-social">
                                                            <Col xs={12} md={12} className="">
                                                                <h3>Registered</h3>
                                                                <h4>Online Profiles</h4>
                                                            </Col>
                                                            {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null && socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== false ? <Col xs={12} md={12} className="socialActive">
                                                                <div className="googleProflePic socialActive">
                                                                    {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== false && socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null ? <><AiFillLinkedin />Linkedin
                                                                        <div className="viewprofile-link">
                                                                            {socialMedia.linkedin.url !== null ? <> <Link href={socialMedia && socialMedia.linkedin && socialMedia.linkedin.url !== undefined && socialMedia && socialMedia.linkedin && socialMedia.linkedin.url !== null ? socialMedia.linkedin.url : "#"}>View Profile</Link> <BiChevronRight /></> : null}
                                                                        </div>
                                                                    </> : null}<br />
                                                                </div>
                                                                {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null ?
                                                                    <div className="linkedin-user-detail">
                                                                        <div className="linkedin-image-namedata">
                                                                            {socialMedia.linkedin && socialMedia.linkedin.photo !== null ? <div className="linkedin-userprofile">
                                                                                <img src={socialMedia.linkedin && socialMedia.linkedin.photo !== undefined ? socialMedia.linkedin.photo : null} /><br />
                                                                            </div> : null}
                                                                            {socialMedia.linkedin && socialMedia.linkedin.name !== null ? <div className="linkedin-username">
                                                                                <span>{socialMedia.linkedin && socialMedia.linkedin.name !== undefined ? socialMedia.linkedin.name : null}</span><br />
                                                                                <span>{socialMedia.linkedin && socialMedia.linkedin.location !== undefined ? socialMedia.linkedin.location : null}</span><br />
                                                                            </div> : null}
                                                                        </div>

                                                                        {socialMedia.linkedin && socialMedia.linkedin.title && socialMedia.linkedin && socialMedia.linkedin.name && socialMedia.linkedin && socialMedia.linkedin.connection_count !== null ? <div className="linkedin-title-name">
                                                                            <span>{socialMedia.linkedin && socialMedia.linkedin.title !== undefined ? socialMedia.linkedin.title : null}</span><br />
                                                                            <span className="">Name:{socialMedia.linkedin && socialMedia.linkedin.name !== undefined ? socialMedia.linkedin.name : null}</span><br />

                                                                            {socialMedia.linkedin && socialMedia.linkedin.company !== null ?
                                                                                <>
                                                                                    <span>Company:{socialMedia.linkedin && socialMedia.linkedin.company !== undefined ? socialMedia.linkedin.company : null}</span><br /></> : null}
                                                                            <span>connection_count:{socialMedia.linkedin && socialMedia.linkedin.connection_count !== undefined ? socialMedia.linkedin.connection_count : null}</span>
                                                                        </div> : null}
                                                                    </div>
                                                                    : null}
                                                            </Col> : null}

                                                            {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== null && socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== false ?

                                                                <>

                                                                    <Col xs={12} md={12} className="socialActive">
                                                                        <div className="googleProflePic socialActive">
                                                                            {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== null && socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== false ? <><BsSkype />Skype</> : null}
                                                                        </div>
                                                                    </Col>

                                                                    <div className="skype-details">
                                                                        {socialMedia.skype && socialMedia.skype.photo !== null ?
                                                                            <div className="skype-image-name">
                                                                                <div className="skype-img">
                                                                                    <img src={socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.photo : null} /><br />

                                                                                </div>
                                                                                <div className="skype-name">
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.name : null}</span><br />
                                                                                </div>
                                                                            </div> : null}
                                                                        <div className="skype-else-detail">

                                                                            {socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.name !== null ?
                                                                                <>
                                                                                    <b>Name:</b>
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.name : null}</span><br /></> : null : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.id !== null ?
                                                                                <>
                                                                                    <b>Skype ID:</b>
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.id : null}</span><br /></> : null : null}

                                                                            {socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.gender !== null ?
                                                                                <>
                                                                                    <b>Gender:</b>
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.gender == 2 ? "Female" : "Male" : null}</span><br />
                                                                                </>
                                                                                : null : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.age !== null ?
                                                                                <>
                                                                                    <b>Age:</b>
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.age : null}</span><br />
                                                                                </>
                                                                                : null : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.language !== null ?
                                                                                <>
                                                                                    <b>Language:</b>
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.language : null}</span><br />
                                                                                </>
                                                                                : null : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.handle !== null ?
                                                                                <>
                                                                                    <b>Deals:</b>
                                                                                    <span>{socialMedia.skype && socialMedia.skype !== undefined ? socialMedia.skype && socialMedia.skype.handle : null}</span></> : null : null}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                : null}
                                                            {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== false && socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== null ?
                                                                <>
                                                                    <Col xs={12} md={12}>

                                                                        <div className="googleProflePic socialActive">
                                                                            {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== false ? <><FcGoogle /> google</>
                                                                                : null}

                                                                        </div>
                                                                    </Col>
                                                                    <div className="google-details">
                                                                        {socialMedia.google && socialMedia.google.photo !== null ?

                                                                            <div className="google-profile">
                                                                                <img src={socialMedia.google && socialMedia.google.photo !== undefined ? socialMedia.google.photo : null} />
                                                                            </div> : null}
                                                                    </div>
                                                                </>
                                                                : null}

                                                            {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false && socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== null ?

                                                                <Col xs={12} md={12} >
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false ? <><SiGravatar />Gravatar
                                                                            <div className="gravtar-view-link"><Link href={socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false ? socialMedia.gravatar && socialMedia.gravatar.profile_url : "#"}>View profile</Link><BiChevronRight /></div>
                                                                        </> : null}

                                                                    </div>
                                                                    <div className="gravtr-details">
                                                                        <span><b>Username:</b></span>
                                                                        <span>{socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false ? socialMedia.gravatar && socialMedia.gravatar.username : null}</span>
                                                                        {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false ? socialMedia.gravatar && socialMedia.gravatar.name !== null ?
                                                                            <>
                                                                                <br /> <span><b>Name</b>:</span>
                                                                                <span>{socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false ? socialMedia.gravatar && socialMedia.gravatar.name : null}</span></> : null : null}
                                                                    </div>

                                                                </Col>


                                                                : null}

                                                            <div className="not-detail-customers">
                                                                {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== false && socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== null ?
                                                                    <>
                                                                        <Col xs={12} md={6} className="socialActive">
                                                                            <div className="googleProflePic socialActive">
                                                                                {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== false ? <><TbBan />Adobe</> : null}
                                                                            </div>
                                                                        </Col>

                                                                    </>
                                                                    : null}

                                                                {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== false && socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== null ?

                                                                    <Col xs={12} md={6} className="socialActive">
                                                                        <div className="googleProflePic socialActive">
                                                                            {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== false ? <><TbBan />Airbnb</> : null}
                                                                        </div>
                                                                    </Col>

                                                                    : null}
                                                                {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== false && socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== null ?

                                                                    <Col xs={12} md={6} className="socialActive">
                                                                        <div className="googleProflePic socialActive">
                                                                            {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== false ? <><AiOutlineAmazon />Amazon</> : null}
                                                                        </div>
                                                                    </Col>

                                                                    : null}
                                                                {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== false && socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== false ? <><AiFillApple />apple</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== false && socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== false ? <><TbBan />Archiveorg</> : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== false && socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== false ? <><TbBan />Booking</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== false && socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== false ? 'Bukalapak' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== false && socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== false ? 'Discord' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false && socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false ? 'Disneyplus' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered !== false ? 'Ebay' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== false && socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== false ? 'Envato' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered !== false ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered !== false ? 'Evernote' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== false && socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== false ? <><AiFillFacebook />Facebook</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== false && socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== false ? 'Flickr' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== false && socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== false ? <><SiFlipkart />flipkart</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered !== false ? 'Foursquare' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== false && socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== false ? <><BsGithub />github</> : null}
                                                                    </div>
                                                                </Col> : null}


                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered !== false ? <><BsInstagram />instagram</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== false && socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== false ? 'Kakao' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== false && socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== false ? 'Lastfm' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== false && socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== false ? 'Lazada' : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered !== false && socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered !== false ? <><BsMicrosoft />Microsoft</> : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== false && socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== false ? 'Myspace' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== false && socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== false ? <><RiNetflixFill />Netflix</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.pinterest.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.pinterest.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.pinterest.registered !== false ? <><FaPinterestP />Pinterest</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== false && socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== false ? 'Quora' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== false && socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== false ? 'Qzone' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== false && socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== false ? 'Samsung' : null}
                                                                    </div>
                                                                </Col> : null}

                                                                {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== false && socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== false ? 'Spotify' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== false && socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== false ? 'Tokopedia' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== false && socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== false ? <><AiFillTwitterCircle />twitter</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== false && socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== false ? <><BsWordpress />Wordpress</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== false && socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== false ? <><FaYahoo />Yahoo</> : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== false ? 'Zoho' : null}
                                                                    </div>
                                                                </Col> : null}
                                                                {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== false && socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== null ? <Col xs={12} md={6} className="socialActive">
                                                                    <div className="googleProflePic socialActive">
                                                                        {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== false ? 'Vimeo' : null}
                                                                    </div>
                                                                </Col> : null}
                                                            </div>

                                                            {/* <div className="clearfix"></div> */}

                                                        </div>

                                                        <div className="email-not-registered row gutters row-social">
                                                            <div className="not-registered-profiles">
                                                                <Col xs={12} md={12}>
                                                                    <h3>Not registered</h3>
                                                                    <h4>Online Profiles</h4>
                                                                </Col>
                                                            </div>
                                                            {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered == false ?
                                                                <Col xs={12} md={6}>

                                                                    {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered == false ? <> <SiAdobe />Adobe</> : null}
                                                                </Col> : null}
                                                            {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered == false ? <><FaAirbnb />Airbnb</> : null}
                                                                </Col> : null}
                                                            {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered == false ? <><AiOutlineAmazon />Amazon</> : null}
                                                                </Col> : null}
                                                            {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered == false ? <><AiFillApple />apple</> : null}
                                                                </Col> : null}
                                                            {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered == false ? <><TbBan />Archiveorg</> : null}
                                                                </Col> : null}
                                                            {socialMedia.atlassian && socialMedia.atlassian.registered !== undefined && socialMedia.atlassian.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.atlassian && socialMedia.atlassian.registered !== undefined && socialMedia.atlassian.registered == false ? <><FaAtlassian />Atlassian</> : null}
                                                                </Col> : null}
                                                            {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered == false ? <><TbBrandBooking />Booking</> : null}
                                                                </Col> : null}
                                                            {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered == false ? <><TbBan />Bukalapak</> : null}
                                                                </Col> : null}
                                                            {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered == false ? <><BsDiscord />Discord</> : null}
                                                                </Col> : null}
                                                            {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered == false ? <><TbBan />Disneyplus</> : null}
                                                                </Col> : null}
                                                            {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.ebay.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered == false ? <><FaEbay />Ebay</> : null}
                                                                </Col> : null}
                                                            {socialMedia.envato && socialMedia.envato.registered !== undefined && socialMedia.envato.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered == false ? <><DiEnvato /> Envato</> : null}
                                                                </Col> : null}
                                                            {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered == false ? <><FaEvernote /> Evernote</> : null}
                                                                </Col> : null}
                                                            {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered == false ? <><AiFillFacebook />Facebook</> : null}
                                                                </Col> : null}
                                                            {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered == false ? <><FaFlickr /> Flickr</> : null}
                                                                </Col> : null}
                                                            {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered == false ? <><SiFlipkart />flipkart</> : null}
                                                                </Col> : null}
                                                            {socialMedia.foursquare && socialMedia.foursquare.registered !== undefined && socialMedia.foursquare.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered == false ? <><FaFoursquare />Foursquare</> : null}
                                                                </Col> : null}
                                                            {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered == false ? <><BsGithub />github</> : null}
                                                                </Col> : null}
                                                            {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered == false ? <><FcGoogle /> google</> : null}
                                                                </Col> : null}
                                                            {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered == false ? <><SiGravatar />Gravatar</> : null}
                                                                </Col> : null}
                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered == false ? <><BsInstagram />instagram</> : null}
                                                                </Col> : null}
                                                            {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered == false ? <><RiKakaoTalkLine />Kakao</> : null}
                                                                </Col> : null}
                                                            {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered == false ? <><FaLastfm />Lastfm</> : null}
                                                                </Col> : null}
                                                            {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered == false ? <><TbBan />Lazada</> : null}
                                                                </Col> : null}
                                                            {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered == false ? <><AiFillLinkedin />Linkedin</> : null}
                                                                </Col> : null}
                                                            {socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered == false ? <><TbBan />Mailru</> : null}
                                                                </Col> : null}
                                                            {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered == false ? <><BsMicrosoft />Microsoft</> : null}
                                                                </Col> : null}
                                                            {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered == false ? <><SiMyspace />Myspace</> : null}
                                                                </Col> : null}
                                                            {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered == false ? <><RiNetflixFill />Netflix</> : null}
                                                                </Col> : null}

                                                            {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered == false ? <><FaQuora />Quora</> : null}
                                                                </Col> : null}
                                                            {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered == false ? <><TbBan />Qzone</> : null}
                                                                </Col> : null}
                                                            {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered == false ? <><SiSamsung />Samsung</> : null}
                                                                </Col> : null}
                                                            {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered == null ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered == null ? <><BsSkype />Skype</> : null}
                                                                </Col> : null}
                                                            {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered == false ? <><TbBan />Spotify</> : null}
                                                                </Col> : null}
                                                            {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered == false ? <><TbBan />Tokopedia</> : null}
                                                                </Col> : null}
                                                            {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered == false ? <><AiFillTwitterCircle />twitter</> : null}
                                                                </Col> : null}
                                                            {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered == false ? <><BsWordpress />Wordpress</> : null}
                                                                </Col> : null}
                                                            {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered == false ?
                                                                <Col xs={12} md={6}>
                                                                    {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered == false ? <><FaYahoo />Yahoo</> : null}
                                                                </Col> : null}
                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered == false ? <><TbBan />Zoho</> : null}
                                                                </Col> : null}
                                                            {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered == false ?
                                                                <Col xs={12} md={6} >
                                                                    {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered == false ? <><TbBan />Vimeo</> : null}
                                                                </Col> : null}
                                                            <div className="domail-accordian">
                                                                <button onClick={handleDomains}><TbWorld />Domain
                                                                    <div className="icon-text">
                                                                        <div className="isfree-main">
                                                                            {DomainData.free == true ? "Free" : DomainData.disposable == true ? "Disposable" : DomainData.custom == true ? "Custom" : null}
                                                                        </div>
                                                                        <BiChevronDown />
                                                                    </div>
                                                                </button>
                                                                {domailDetail ?
                                                                    <dl className="domain-details-content">
                                                                        <dt>Registered</dt>
                                                                        <dd>{DomainData.registered == true ? "Yes" : "No"}</dd>
                                                                        <dt>Professional</dt>
                                                                        <dd>{DomainData.domain}</dd>
                                                                        <dt>Free</dt>
                                                                        <dd>{DomainData.free == true ? "Yes" : "No"}</dd>
                                                                        <dt>Date Created</dt>
                                                                        <dd>{DomainData.created}</dd>
                                                                        <dt>Update Date</dt>
                                                                        <dd>{DomainData.updated}</dd>
                                                                        <dt>Expiry Date</dt>
                                                                        <dd>{DomainData.expires}</dd>
                                                                        <dt>Registrar Name</dt>
                                                                        <dd>{DomainData.registrar_name}</dd>
                                                                        <dt>Registered to</dt>
                                                                        <dd>{DomainData.registered_to}</dd>
                                                                        <dt>DMARC Enforced</dt>
                                                                        <dd>{DomainData.dmarc_enforced == true ? "Yes" : "No"}</dd>
                                                                        <dt>Strict SPF</dt>
                                                                        <dd>{DomainData.spf_strict == true ? "Yes" : "No"}</dd>
                                                                        <dt>MX Fit</dt>
                                                                        <dd>{DomainData.valid_mx == true ? "Yes" : "No"}</dd>
                                                                        <dt>Accept All</dt>
                                                                        <dd>{DomainData.accept_all == true ? "Yes" : "No"}</dd>
                                                                        <dt>Suspicious TLD</dt>
                                                                        <dd>{DomainData.suspicious_tld == true ? "Yes" : "No"}</dd>
                                                                        <dt>Website exists</dt>
                                                                        <dd>{DomainData.website_exists == true ? "Yes" : "No"}</dd>
                                                                    </dl> : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </> : <h1>No data available</h1>}
                        </div>

                        : null}
                </div>
            </div>

        </>
    )
}
export default SocialMedia