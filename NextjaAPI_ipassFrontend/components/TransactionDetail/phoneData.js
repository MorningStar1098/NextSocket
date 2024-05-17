/* eslint-disable */
import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import { AiFillFacebook } from 'react-icons/ai'
import { SiBukalapak, SiFlipkart } from 'react-icons/si'
import { BsSearch } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { BsInstagram } from 'react-icons/bs'
import { BsMicrosoft } from 'react-icons/bs'
import { FaYahoo } from 'react-icons/fa'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { BsSkype } from 'react-icons/bs'
import { BsWhatsapp } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import ProgressBar from "@ramonak/react-progress-bar";
import { RiKakaoTalkLine } from 'react-icons/ri'
import { FaSnapchatSquare } from 'react-icons/fa'
import { RiLineLine } from 'react-icons/ri'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaViber } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'
import { TbBan } from 'react-icons/tb'
import moment from 'moment/moment';
import { ShimmerCategoryList } from "react-shimmer-effects";

function PhoneData(props) {
    const { singleTransaction, phoneLookupDetails, setPhoneLookupDetails, handleRefresh } = props
    // 
    const [loading, setLoading] = useState(false)

    const phoneMedia = singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.account_details !== null ? singleTransaction.data.phone_details.account_details : null
    const lookupDetail = singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.history !== undefined ? singleTransaction.data.phone_details.history : null
    const sDate = Date(lookupDetail?.first_seen)
    const FirstSeen = moment(sDate).format("DD-MM-YYYY h:mm:ss a")
    const lDate = Date(lookupDetail?.last_seen)
    const lastSeen = moment(lDate).format("DD-MM-YYYY h:mm:ss a")
    // console.log("dd", phoneMedia);
    function handlePhoneLookup() {
        setPhoneLookupDetails(!phoneLookupDetails)
    }
    function handleRef() {
        handleRefresh()
    }
    return (
        <>
            {/* {loading?
            <ShimmerCategoryList/>
        : */}
            <div className='phone-data-main '>
                <Col>
                    <div className="phone-content email-info-main tds-page">
                        {singleTransaction.data.phone_details == null ?
                            <div className='email-info-data'>
                                <h3>No Data Found</h3>
                            </div> :
                            <>
                                <div className='email-info-data'>
                                    <h3>Phone Information</h3>
                                    <span className='refresh-button' onClick={handleRef}>Refresh Data</span>
                                </div>
                                <div className='customer-email'>
                                    <span className='used-transaction'>Used in this transaction:</span>
                                    <span className='used-email'>{singleTransaction && singleTransaction.data !== undefined ? singleTransaction.data.phone_details.number : null}</span>
                                </div>
                                <div className="progress-email">
                                    <div className="phone-score">
                                        <div className="phone_score_inner_sec">
                                            <div className="phone_score_inner_sec_left">
                                                <span className="phone-cuist-score">{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.score !== undefined ? singleTransaction.data.phone_details.score : null}.00</span>
                                                <span className="phone-outof">/100</span>
                                            </div>
                                            <div className="phone_score_inner_sec_right">
                                                <span>score</span>
                                            </div>
                                        </div>
                                        <ProgressBar className="progressbar-phone"
                                            completed={singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.score !== undefined ? singleTransaction.data.phone_details.score : null}
                                            isLabelVisible={false}
                                            bgColor={singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.score !== undefined ? singleTransaction.data.phone_details.score !== 0 ? "#60BDB2" : "#ebebeb" : null}
                                        //  baseBgColor={singleCust && singleCust.data_phone && singleCust.data_phone.score== 0?"#60BDB2":"#60BDB"}
                                        />
                                    </div>
                                </div>

                                <div className='phone-number-content'>
                                    <dl>
                                        <dt >country</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.country !== undefined ? singleTransaction.data.phone_details.country : null}</dd>
                                        <dt>Valid</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.valid !== undefined ? singleTransaction.data.phone_details.valid == true ? "Yes" : "No" : null}</dd>
                                        <dt>Possible</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.disposable !== undefined ? singleTransaction.data.phone_details.disposable == true ? "Yes" : "No" : null}</dd>
                                        <dt>write</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.type !== undefined ? singleTransaction.data.phone_details.type : null}</dd>
                                        <dt>Disposable</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.disposable !== undefined ? singleTransaction.data.phone_details.disposable == true ? "Yes" : "No" : null}</dd>
                                        <dt>Phone Company</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.phone_details && singleTransaction.data.phone_details.carrier !== undefined ? singleTransaction.data.phone_details.carrier : null}</dd>
                                    </dl>
                                </div>
                                <div className="email-content">
                                    <div className="email-registered row gutters row-social">
                                        <Col xs={12} md={12} className="">
                                            <h3>Registered</h3>
                                            <h4>Online Profiles</h4>
                                        </Col>
                                        <div className='skype-detail-main'>
                                            {phoneMedia?.skype && phoneMedia?.skype?.registered !== undefined && phoneMedia.skype.registered !== null && phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== false ?

                                                <>

                                                    <Col xs={12} md={12} className="socialActive">
                                                        <div className="googleProflePic socialActive">
                                                            {phoneMedia?.skype && phoneMedia?.skype?.registered !== undefined && phoneMedia.skype.registered !== null ? <><BsSkype />Skype</> : null}
                                                        </div>
                                                    </Col>

                                                    <div className="skype-details">
                                                        <div className="skype-image-name">
                                                            <div className="skype-img">
                                                                <img src={phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.photo : null}
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
                                        </div>

                                        <div className="not-detail-customers transds-page">
                                            {phoneMedia?.google && phoneMedia?.google?.registered !== undefined && phoneMedia.google.registered !== false && phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== null ?
                                                <>
                                                    <Col xs={12} md={6} className="socialActive tds">
                                                        <div className="googleProflePic socialActive tdsPage">
                                                            {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== false ? <><FcGoogle /></>
                                                                : null}

                                                        </div>
                                                    </Col>
                                                </>
                                                : null}

                                            {phoneMedia?.bukalapak && phoneMedia?.bukalapak?.registered !== undefined && phoneMedia.bukalapak.registered !== false && phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.bukalapak && phoneMedia?.bukalapak?.registered !== undefined && phoneMedia.bukalapak.registered !== false ? <><TbBan /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.facebook && phoneMedia?.facebook?.registered !== undefined && phoneMedia.facebook.registered !== false && phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.facebook && phoneMedia?.facebook?.registered !== undefined && phoneMedia.facebook.registered !== false ? <><AiFillFacebook /></> : null}
                                                    </div>
                                                </Col> : null}

                                            {phoneMedia?.flipkart && phoneMedia?.flipkart?.registered !== undefined && phoneMedia.flipkart.registered !== false && phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.flipkart && phoneMedia?.flipkart?.registered !== undefined && phoneMedia.flipkart.registered !== false ? <><SiFlipkart /></> : null}
                                                    </div>
                                                </Col> : null}

                                            {phoneMedia?.instagram && phoneMedia?.instagram?.registered !== undefined && phoneMedia.instagram.registered !== false && phoneMedia.instagram && phoneMedia.instagram.registered !== undefined && phoneMedia.instagram.registered !== false ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.instagram && phoneMedia?.instagram?.registered !== undefined && phoneMedia.instagram.registered !== null ? <><BsInstagram /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.kakao && phoneMedia?.kakao?.registered !== undefined && phoneMedia.kakao.registered !== false && phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.kakao && phoneMedia?.kakao?.registered !== undefined && phoneMedia.kakao.registered !== false ? <><RiKakaoTalkLine /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.microsoft && phoneMedia?.microsoft?.registered !== undefined && phoneMedia.microsoft.registered !== false && phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.microsoft && phoneMedia?.microsoft?.registered !== undefined && phoneMedia.microsoft.registered !== false ? <><BsMicrosoft /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.twitter && phoneMedia?.twitter?.registered !== undefined && phoneMedia.twitter.registered !== false && phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.twitter && phoneMedia?.twitter?.registered !== undefined && phoneMedia.twitter.registered !== false ? <><AiFillTwitterCircle /></> : null}
                                                    </div>
                                                </Col> : null}

                                            {phoneMedia?.yahoo && phoneMedia?.yahoo?.registered !== undefined && phoneMedia.yahoo.registered !== false && phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.yahoo && phoneMedia?.yahoo?.registered !== undefined && phoneMedia.yahoo.registered !== false ? <><FaYahoo /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.snapchat && phoneMedia?.snapchat?.registered !== undefined && phoneMedia.snapchat.registered !== false && phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.snapchat && phoneMedia?.snapchat?.registered !== undefined && phoneMedia.snapchat.registered !== false ? <><FaSnapchatSquare /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.zalo && phoneMedia?.zalo?.registered !== undefined && phoneMedia.zalo.registered !== false && phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.zalo && phoneMedia?.zalo?.registered !== undefined && phoneMedia.zalo.registered !== false ? <><FaYahoo /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.whatsapp && phoneMedia?.whatsapp?.registered !== undefined && phoneMedia.whatsapp.registered !== false && phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.whatsapp && phoneMedia?.whatsapp?.registered !== undefined && phoneMedia.whatsapp.registered !== false ? <><BsWhatsapp /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.viber && phoneMedia?.viber?.registered !== undefined && phoneMedia.viber.registered !== false && phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.viber && phoneMedia?.viber?.registered !== undefined && phoneMedia.viber.registered !== false ? <><FaViber /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.telegram && phoneMedia?.telegram?.registered !== undefined && phoneMedia.telegram.registered !== false && phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.telegram && phoneMedia?.telegram?.registered !== undefined && phoneMedia.telegram.registered !== false ? <><FaTelegramPlane /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.ok && phoneMedia?.ok?.registered !== undefined && phoneMedia.ok.registered !== false && phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.ok && phoneMedia?.ok?.registered !== undefined && phoneMedia.ok.registered !== false ? <></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.line && phoneMedia?.line?.registered !== undefined && phoneMedia.line.registered !== false && phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== null ?
                                                <Col xs={12} md={6} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.line && phoneMedia?.line?.registered !== undefined && phoneMedia.line.registered !== false ? <><RiLineLine /></> : null}
                                                    </div>
                                                </Col> : null}
                                            {phoneMedia?.jdid && phoneMedia?.jdid?.registered !== undefined && phoneMedia.jdid.registered !== false && phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== null ?
                                                <Col xs={12} md={12} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {phoneMedia?.jdid && phoneMedia?.jdid?.registered !== undefined && phoneMedia.jdid.registered !== false ? <><TbBan /></> : null}
                                                    </div>
                                                </Col> : null}

                                        </div>
                                    </div>
                                    <div className="email-not-registered row gutters row-social">
                                        <div className="not-registered-profiles">
                                            <Col xs={12} md={12}>
                                                <h3>Not registered</h3>
                                                <h4>Online Profiles</h4>
                                            </Col>
                                        </div>
                                        <div className="not-register-data">
                                            <div className='not-online-main'>
                                                {phoneMedia?.bukalapak && phoneMedia?.bukalapak?.registered !== undefined && phoneMedia.bukalapak.registered == false ?
                                                    <Col>
                                                        {phoneMedia?.bukalapak && phoneMedia?.bukalapak?.registered !== undefined && phoneMedia.bukalapak.registered == false ? <><SiBukalapak /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.facebook && phoneMedia?.facebook?.registered !== undefined && phoneMedia.facebook.registered == false||phoneMedia.facebook.registered==null ?
                                                    <Col >
                                                        {phoneMedia?.facebook && phoneMedia?.facebook?.registered !== undefined && phoneMedia.facebook.registered == false||phoneMedia.facebook.registered==null ? <><AiFillFacebook/></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.flipkart && phoneMedia?.flipkart?.registered !== undefined && phoneMedia.flipkart.registered == false ?
                                                    <Col >
                                                        {phoneMedia?.flipkart && phoneMedia?.flipkart?.registered !== undefined && phoneMedia.flipkart.registered == false ? <><SiFlipkart /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.google && phoneMedia?.google?.registered !== undefined && phoneMedia.google.registered == false ?
                                                    <Col >
                                                        {phoneMedia?.google && phoneMedia?.google?.registered !== undefined && phoneMedia.google.registered == false ? <><FcGoogle /> </> : null}
                                                    </Col> : null}

                                                {phoneMedia?.instagram && phoneMedia?.instagram?.registered !== undefined && phoneMedia.instagram.registered == false ?
                                                    <Col >
                                                        {phoneMedia?.instagram && phoneMedia?.instagram?.registered !== undefined && phoneMedia.instagram.registered == false ? <><BsInstagram /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.kakao && phoneMedia?.kakao?.registered !== null || undefined && phoneMedia?.kakao?.registered == false || phoneMedia?.kakao?.registered == null ?
                                                    <Col >
                                                        {phoneMedia?.kakao?.registered == false || phoneMedia?.kakao?.registered == null ? <><RiKakaoTalkLine /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.microsoft && phoneMedia?.microsoft?.registered !== null || undefined && phoneMedia.microsoft.registered == false ?
                                                    <Col >
                                                        {phoneMedia?.microsoft && phoneMedia?.microsoft?.registered !== undefined || null && phoneMedia.microsoft.registered == false ? <><BsMicrosoft /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.skype && phoneMedia?.skype?.registered !== undefined || null && phoneMedia.skype.registered == null || phoneMedia?.skype?.registered == false ?
                                                    <Col >
                                                        {phoneMedia?.skype && phoneMedia?.skype?.registered !== undefined || null && phoneMedia?.skype?.registered == null || phoneMedia?.skype?.registered == false ? <><BsSkype /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.twitter && phoneMedia?.twitter?.registered !== undefined || null && phoneMedia?.twitter?.registered == false || phoneMedia?.twitter?.registered == null ?
                                                    <Col >
                                                        {phoneMedia?.twitter && phoneMedia?.twitter?.registered !== undefined || null && phoneMedia?.twitter?.registered == false || phoneMedia?.twitter?.registered == null ? <><AiFillTwitterCircle /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.yahoo && phoneMedia?.yahoo?.registered !== undefined || null && phoneMedia?.yahoo?.registered == false || phoneMedia?.yahoo?.registered == null ?
                                                    <Col >
                                                        {phoneMedia?.yahoo && phoneMedia?.yahoo?.registered !== undefined || null && phoneMedia.yahoo.registered == false || phoneMedia?.yahoo?.registered == null ? <><FaYahoo /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.snapchat && phoneMedia?.snapchat?.registered !== undefined || null && phoneMedia?.snapchat?.registered !== false || phoneMedia?.snapchat?.registered == null ?
                                                    <Col  >
                                                        {phoneMedia?.snapchat && phoneMedia?.snapchat?.registered !== undefined || null && phoneMedia.snapchat.registered == false || phoneMedia?.snapchat?.registered == null ? <><FaSnapchatSquare /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.zalo && phoneMedia?.zalo?.registered !== undefined || null && phoneMedia.zalo.registered == false ?
                                                    <Col  >
                                                        {phoneMedia?.zalo && phoneMedia?.zalo?.registered !== undefined || null && phoneMedia.zalo.registered == false ? <><SiZalo /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.whatsapp && phoneMedia?.whatsapp?.registered !== undefined || null && phoneMedia?.whatsapp?.registered == false || phoneMedia?.whatsapp?.registered == null ?
                                                    <Col  >
                                                        {phoneMedia?.whatsapp && phoneMedia?.whatsapp?.registered !== undefined || null && phoneMedia?.whatsapp?.registered == false || phoneMedia?.whatsapp?.registered == null ? <><BsWhatsapp /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.viber && phoneMedia?.viber?.registered !== undefined || null && phoneMedia?.viber?.registered == false || phoneMedia?.viber?.registered == null ?
                                                    <Col  >
                                                        {phoneMedia?.viber && phoneMedia?.viber?.registered !== undefined || null && phoneMedia?.viber?.registered == false || phoneMedia?.viber?.registered == null ? <><FaViber /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.telegram && phoneMedia?.telegram?.registered !== undefined || null && phoneMedia.telegram.registered == false ?
                                                    <Col  >
                                                        {phoneMedia?.telegram && phoneMedia?.telegram?.registered !== undefined || null && phoneMedia.telegram.registered == false ? <><FaTelegramPlane /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.ok && phoneMedia?.ok?.registered !== undefined || null && phoneMedia?.ok?.registered == false || phoneMedia?.ok?.registered == null ?
                                                    <Col>
                                                        {phoneMedia?.ok?.registered == false || phoneMedia?.ok?.registered == null ? <><TbBan />Ok</> : null}
                                                    </Col> : null}

                                                {phoneMedia?.line && phoneMedia?.line?.registered !== undefined || null && phoneMedia?.line?.registered == false || phoneMedia?.line?.registered == null ?
                                                    <Col>
                                                        {phoneMedia?.line && phoneMedia?.line?.registered !== undefined || null && phoneMedia?.line?.registered == false || phoneMedia?.line?.registered == null ? <><RiLineLine /></> : null}
                                                    </Col> : null}

                                                {phoneMedia?.jdid && phoneMedia?.jdid?.registered !== undefined || null && phoneMedia?.jdid?.registered == false || phoneMedia?.jdid?.registered == null ?
                                                    <Col>
                                                        {phoneMedia?.jdid && phoneMedia?.jdid?.registered !== undefined || null && phoneMedia?.jdid?.registered == false || phoneMedia?.jdid?.registered == null ? <><TbBan /></> : null}
                                                    </Col> : null}
                                            </div>
                                            <div className='domail-accordian'>
                                                <button onClick={handlePhoneLookup} className='world-tds'><BsSearch /><span className='lookup-text'>Lookup details</span>
                                                    <div className="icon-text trds">
                                                        <BiChevronDown />
                                                    </div>
                                                </button>
                                                {phoneLookupDetails ?
                                                    <dl className="domain-details-content">
                                                        <div className='drop-main'>
                                                            <dt>Number of hits</dt>
                                                            <dd>{lookupDetail?.hits}</dd>
                                                        </div>
                                                        <div className='drop-main'>
                                                            <dt>Customer hits</dt>
                                                            <dd>{lookupDetail?.customer_hits}</dd>
                                                        </div>
                                                        <div className='drop-main'>
                                                            <dt>First seen</dt>
                                                            <dd>{FirstSeen}</dd>
                                                        </div>
                                                        <div className='drop-main'>
                                                            <dt>Last seen</dt>
                                                            <dd>{lastSeen}</dd>
                                                        </div>
                                                    </dl>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>}
                    </div>


                </Col>
            </div>
        </>
    )
}

export default PhoneData