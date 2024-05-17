/* eslint-disable */
import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link'
// import { TiTick } from 'react-icons/ti'
// import { GrFormClose } from 'react-icons/gr'
import { SiGravatar, SiQzone, SiZoho } from 'react-icons/si'
import { AiOutlineAmazon } from 'react-icons/ai'
import { AiFillApple } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { SiFlipkart } from 'react-icons/si'
import { BsGithub, BsQuora, BsSearch, BsVimeo } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { BsInstagram } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
import { BsMicrosoft } from 'react-icons/bs'
import { RiKakaoTalkFill, RiNetflixFill } from 'react-icons/ri'
import { FaSpotify, FaYahoo } from 'react-icons/fa'
import { BsWordpress } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaPinterestP } from 'react-icons/fa'
import { BsSkype } from 'react-icons/bs'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { SiAdobe } from 'react-icons/si'
import { FaAirbnb } from 'react-icons/fa'
import { FaAtlassian } from 'react-icons/fa'
import { TbBrandAirbnb, TbBrandBooking, TbBrandDisney } from 'react-icons/tb'
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
import { TbBan } from 'react-icons/tb'
import moment from 'moment/moment';
import { ShimmerCategoryList } from "react-shimmer-effects";


function EmailData(props) {
    const { singleTransaction, emailLookupDetails, setEmailLookupDetails, domailDetail, setDomainDetail } = props


    const [loading, setLoading] = useState(false)
    function handleDomains() {
        setDomainDetail(!domailDetail)
    }
    function handleEmailLookup() {
        setEmailLookupDetails(!emailLookupDetails)
    }
    const socialMedia = singleTransaction && singleTransaction.data && singleTransaction.data.email_details&&singleTransaction.data.email_details.account_details !== undefined ? singleTransaction.data.email_details.account_details : null
    const DomainData = singleTransaction && singleTransaction.data && singleTransaction.data.email_details&&singleTransaction.data.email_details.domain_details !== undefined ? singleTransaction.data.email_details.domain_details : ""
    const lookupDetail = singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.history !== undefined ? singleTransaction.data.email_details.history : ""
    const sDate = Date(lookupDetail?.first_seen)
    const FirstSeen = moment(sDate).format("DD-MM-YYYY h:mm:ss a")
    const lDate = Date(lookupDetail?.last_seen)
    const lastSeen = moment(lDate).format("DD-MM-YYYY h:mm:ss a")

    function handleRefresh() {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    // console.log("dd", socialMedia);
    return (
        // < className='email-data-card'>
        <>
            {loading ?
                <ShimmerCategoryList /> :
                <Col xs={12} md={6}>
                    <div className="email-info-main tds-page">
                        {singleTransaction.data.email_details == null ?
                            <div className="email-info-data">
                                <h3><b>No Data Found</b></h3>
                                
                            </div>:<>
                            <div className="email-info-data">
                                <h3><b>Email Information</b></h3>
                                <span className='refresh-button' onClick={handleRefresh}>Refresh Data</span>
                            </div>
                            <div className="email-info-content">
                                <dl>
                                    <dd className='progress-email'>
                                        <div className='email-link-main'>
                                            <div className='customer-email'>
                                                <span className='used-transaction'>Used in this transaction:</span>
                                                <span className='used-email'>{singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.email !== undefined ? singleTransaction.data.email_details.email : null}</span>
                                            </div>
                                            <div className="search-google-dd">
                                                <Link href={`https://www.google.com/search?q=${singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.email !== undefined ? singleTransaction.data.email_details.email : "#"}`}>Search on Google</Link><TbExternalLink />
                                            </div>
                                        </div>
                                        <div className="phone-score">
                                            <div className="phone_score_inner_sec">
                                                <div className="phone_score_inner_sec_left">
                                                    <span className="phone-cuist-score">{singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.score !== undefined ? singleTransaction.data.email_details.score : null}.00</span>
                                                    <span className="phone-outof">/100</span>
                                                </div>
                                                <div className="phone_score_inner_sec_right">
                                                    <span>score</span>
                                                </div>
                                            </div>
                                            <ProgressBar className="progressbar-phone"
                                                completed={singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.score !== undefined ? singleTransaction.data.email_details.score : null}
                                                isLabelVisible={false}
                                                bgColor={singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.score !== undefined ? singleTransaction.data.email_details.score !== 0 ? "#60BDB2" : "#ebebeb" : null}

                                            />
                                        </div>
                                    </dd>

                                </dl>
                                <dl className="email-delieverables">
                                    <dt>Deliverable</dt>
                                    <p>{singleTransaction && singleTransaction.data && singleTransaction.data.email_details && singleTransaction.data.email_details.deliverable !== undefined ? singleTransaction.data.email_details.deliverable == true ? "Yes" : "No" : null}</p>
                                </dl>
                                <div className="data-breaches-bottom-main">
                                    <h3>Data breaches<FaDatabase /></h3>
                                    <dl className="breaches">
                                        <dt>Data breaches</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.email_details !== undefined ? singleTransaction.data.email_details.breach_details.number_of_breaches !== 0 ? singleTransaction.data.email_details.breach_details.number_of_breaches : "No Data" : null}</dd>
                                        <dt>First breach</dt>
                                        <dd>{singleTransaction && singleTransaction.data && singleTransaction.data.email_details !== undefined ? singleTransaction && singleTransaction.data && singleTransaction.data.email_details.breach_details.first_breach : null}</dd>

                                        {singleTransaction && singleTransaction.data && singleTransaction.data.email_details !== undefined ?
                                            singleTransaction.data.email_details.breach_details.breaches !== null ? singleTransaction && singleTransaction.data && singleTransaction.data.email_details !== undefined ?
                                                singleTransaction.data.email_details.breach_details.breaches.map((breach) => {
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
                            <div className="email-content tdspage">
                                <div className="email-registered row gutters row-social">
                                    <Col xs={12} md={12} className="">
                                        <h3>Registered</h3>
                                        <h4>Online Profiles</h4>
                                    </Col>
                                    <div className='skype-detail-main'>
                                        {socialMedia?.linkedin && socialMedia?.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null && socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== false ? <Col xs={12} md={12} className="socialActive">
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
                                    </div>
                                    <div className='skype-detail-main'>
                                        {socialMedia?.skype && socialMedia?.skype.registered !== undefined && socialMedia.skype.registered !== null && socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== false ?
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
                                    </div>
                                    <div className='skype-detail-main'>
                                        {socialMedia?.google && socialMedia?.google.registered !== undefined && socialMedia.google.registered !== false && socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== null ?
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
                                    </div>
                                    <div className='skype-detail-main'>
                                        {socialMedia?.gravatar && socialMedia?.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false && socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== null ?

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
                                    </div>
                                    <div className="not-detail-customers transds-page">
                                        {socialMedia?.adobe && socialMedia?.adobe.registered !== undefined && socialMedia.adobe.registered !== false && socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== null ?
                                            <>
                                                <Col xs={12} md={3} className="socialActive tds">
                                                    <div className="googleProflePic socialActive tdsPage">
                                                        {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== false ? <><SiAdobe /></> : null}
                                                    </div>
                                                </Col>

                                            </>
                                            : null}

                                        {socialMedia?.airbnb && socialMedia?.airbnb.registered !== undefined && socialMedia.airbnb.registered !== false && socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== null ?

                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== false ? <><TbBrandAirbnb /></> : null}
                                                </div>
                                            </Col>

                                            : null}
                                        {socialMedia?.amazon && socialMedia?.amazon.registered !== undefined && socialMedia.amazon.registered !== false && socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== null ?

                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== false ? <><AiOutlineAmazon /></> : null}
                                                </div>
                                            </Col>

                                            : null}
                                        {socialMedia?.apple && socialMedia?.apple.registered !== undefined && socialMedia.apple.registered !== false && socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== false ? <><AiFillApple /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.archiveorg && socialMedia?.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== false && socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== false ? <><TbBan /></> : null}
                                                </div>
                                            </Col> : null}

                                        {socialMedia?.booking && socialMedia?.booking.registered !== undefined && socialMedia.booking.registered !== false && socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== false ? <><TbBan /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.bukalapak && socialMedia?.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== false && socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== false ? <TbBan /> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.discord && socialMedia?.discord.registered !== undefined && socialMedia.discord.registered !== false && socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== false ? <BsDiscord/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.disneyplus && socialMedia?.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false && socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false ? <TbBrandDisney/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.ebay && socialMedia?.ebay.registered !== undefined && socialMedia.ebay.registered !== false && socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.ebay.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.ebay.registered !== false ? <FaEbay/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.ebay && socialMedia?.ebay.registered !== undefined && socialMedia.envato.registered !== false && socialMedia.envato && socialMedia.envato.registered !== undefined && socialMedia.envato.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== false ? <DiEnvato/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.evernote && socialMedia?.evernote.registered !== undefined && socialMedia.evernote.registered !== false ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered !== false ? <FaEvernote/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.facebook && socialMedia?.facebook.registered !== undefined && socialMedia.facebook.registered !== false && socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== false ? <><AiFillFacebook /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.flickr && socialMedia?.flickr.registered !== undefined && socialMedia.flickr.registered !== false && socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== false ? <FaFlickr/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.flipkart && socialMedia?.flipkart.registered !== undefined && socialMedia.flipkart.registered !== false && socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== false ? <><SiFlipkart /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.foursquare && socialMedia.foursquare.registered !== undefined && socialMedia.foursquare.registered !== false && socialMedia.foursquare && socialMedia.foursquare.registered !== undefined && socialMedia.foursquare.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.foursquare && socialMedia.foursquare.registered !== undefined && socialMedia.foursquare.registered !== false ? <FaFoursquare/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.github && socialMedia?.github.registered !== undefined && socialMedia.github.registered !== false && socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive  tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== false ? <><BsGithub /></> : null}
                                                </div>
                                            </Col> : null}


                                        {socialMedia?.instagram && socialMedia?.instagram.registered !== undefined && socialMedia.instagram.registered !== false && socialMedia.instagram && socialMedia.instagram.registered !== undefined && socialMedia.instagram.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.instagram && socialMedia.instagram.registered !== undefined && socialMedia.instagram.registered !== false ? <><BsInstagram /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.kakao && socialMedia?.kakao.registered !== undefined && socialMedia.kakao.registered !== false && socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== false ?<RiKakaoTalkFill/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.lastfm && socialMedia?.lastfm.registered !== undefined && socialMedia.lastfm.registered !== false && socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== false ? <FaLastfm/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.lazada && socialMedia?.lazada.registered !== undefined && socialMedia.lazada.registered !== false && socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== false ? 'Lazada' : null}
                                                </div>
                                            </Col> : null}

                                        {socialMedia?.mailru && socialMedia?.microsoft.registered !== undefined && socialMedia.microsoft.registered !== false && socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered !== false ? <><BsMicrosoft /></> : null}
                                                </div>
                                            </Col> : null}

                                        {socialMedia?.myspace && socialMedia?.myspace.registered !== undefined && socialMedia.myspace.registered !== false && socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== false ? <SiMyspace/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.netflix && socialMedia?.netflix.registered !== undefined && socialMedia.netflix.registered !== false && socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== false ? <><RiNetflixFill /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.pinterest && socialMedia?.pinterest.registered !== undefined && socialMedia.pinterest.registered !== false && socialMedia.pinterest && socialMedia.pinterest.registered !== undefined && socialMedia.pinterest.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.pinterest && socialMedia.pinterest.registered !== undefined && socialMedia.pinterest.registered !== false ? <><FaPinterestP /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.quora && socialMedia?.quora.registered !== undefined && socialMedia.quora.registered !== false && socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== false ? <BsQuora/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.qzone && socialMedia?.qzone.registered !== undefined && socialMedia.qzone.registered !== false && socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== false ? <SiQzone/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.samsung && socialMedia?.samsung.registered !== undefined && socialMedia.samsung.registered !== false && socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== false ? <SiSamsung/> : null}
                                                </div>
                                            </Col> : null}

                                        {socialMedia?.spotify && socialMedia?.spotify.registered !== undefined && socialMedia.spotify.registered !== false && socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== false ? <FaSpotify/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.tokopedia && socialMedia?.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== false && socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== false ? 'Tokopedia' : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.twitter && socialMedia?.twitter.registered !== undefined && socialMedia.twitter.registered !== false && socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== false ? <><AiFillTwitterCircle /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.wordpress && socialMedia?.wordpress.registered !== undefined && socialMedia.wordpress.registered !== false && socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== false ? <><BsWordpress /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.yahoo && socialMedia?.yahoo.registered !== undefined && socialMedia.yahoo.registered !== false && socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== false ? <><FaYahoo /></> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.zoho && socialMedia?.zoho?.registered !== undefined && socialMedia.zoho.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== false ? <SiZoho/> : null}
                                                </div>
                                            </Col> : null}
                                        {socialMedia?.vimeo && socialMedia?.vimeo.registered !== undefined && socialMedia.vimeo.registered !== false && socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== null ?
                                            <Col xs={12} md={3} className="socialActive tds">
                                                <div className="googleProflePic socialActive tdsPage">
                                                    {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== false ? <BsVimeo/> : null}
                                                </div>
                                            </Col> : null}
                                    </div>
                                    {/* fffff */}
                                </div>
                                <div className="email-not-registered row gutters row-social">
                                    <div className="not-registered-profiles">
                                        <Col xs={12} md={12}>
                                            <h3>Not registered</h3>
                                            <h4>Online Profiles</h4>
                                        </Col>
                                    </div>
                                    <div className='not-online-main'>
                                        {socialMedia?.adobe && socialMedia?.adobe?.registered !== undefined && socialMedia.adobe.registered == false ?
                                            <Col>
                                                {/* <div className="googleProflePic socialActive tdsPage notReg"> */}
                                                {socialMedia?.adobe && socialMedia?.adobe?.registered !== undefined && socialMedia.adobe.registered == false ? <> <SiAdobe /></> : null}
                                                {/* </div> */}
                                            </Col>

                                            : null}
                                        {socialMedia?.airbnb && socialMedia?.airbnb?.registered !== undefined && socialMedia.airbnb.registered == false ?
                                            <Col >
                                                {socialMedia?.airbnb && socialMedia?.airbnb.registered !== undefined && socialMedia.airbnb.registered == false ? <><FaAirbnb /></> : null}
                                            </Col> : null}
                                        {socialMedia?.amazon && socialMedia?.amazon.registered !== undefined && socialMedia.amazon.registered == false ?
                                            <Col>
                                                {socialMedia?.amazon && socialMedia?.amazon.registered !== undefined && socialMedia.amazon.registered == false ? <><AiOutlineAmazon /></> : null}
                                            </Col> : null}
                                        {socialMedia?.apple && socialMedia?.apple?.registered !== undefined && socialMedia.apple.registered == false ?
                                            <Col>
                                                {/* <div className="googleProflePic socialActive tdsPage notReg"> */}
                                                {socialMedia?.apple && socialMedia?.apple?.registered !== undefined && socialMedia.apple.registered == false ? <><AiFillApple /></> : null}
                                                {/* </div> */}
                                            </Col> : null}
                                        {socialMedia?.archiveorg && socialMedia?.archiveorg?.registered !== undefined && socialMedia.archiveorg.registered == false ?
                                            <Col>
                                                {socialMedia?.archiveorg && socialMedia?.archiveorg?.registered !== undefined && socialMedia.archiveorg.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.atlassian && socialMedia?.atlassian?.registered !== undefined && socialMedia.atlassian.registered == false ?
                                            <Col>
                                                {socialMedia?.atlassian && socialMedia?.atlassian?.registered !== undefined && socialMedia.atlassian.registered == false ? <><FaAtlassian /></> : null}
                                            </Col> : null}
                                        {socialMedia?.booking && socialMedia?.booking?.registered !== undefined && socialMedia.booking.registered == false ?
                                            <Col>
                                                {socialMedia?.booking && socialMedia?.booking?.registered !== undefined && socialMedia.booking.registered == false ? <><TbBrandBooking /></> : null}
                                            </Col> : null}
                                        {socialMedia?.bukalapak && socialMedia?.bukalapak?.registered !== undefined && socialMedia.bukalapak.registered == false ?
                                            <Col>
                                                {socialMedia?.bukalapak && socialMedia?.bukalapak?.registered !== undefined && socialMedia.bukalapak.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.discord && socialMedia?.discord?.registered !== undefined && socialMedia.discord.registered == false ?
                                            <Col>
                                                {socialMedia?.discord && socialMedia?.discord?.registered !== undefined && socialMedia.discord.registered == false ? <><BsDiscord /></> : null}
                                            </Col> : null}
                                        {socialMedia?.disneyplus && socialMedia?.disneyplus?.registered !== undefined && socialMedia.disneyplus.registered == false ?
                                            <Col >
                                                {socialMedia?.disneyplus && socialMedia?.disneyplus.registered !== undefined && socialMedia.disneyplus.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.ebay && socialMedia?.ebay?.registered !== undefined && socialMedia.ebay.registered == false ?
                                            <Col >
                                                {socialMedia?.zoho && socialMedia?.zoho.registered !== undefined && socialMedia.ebay.registered == false ? <><FaEbay /></> : null}
                                            </Col> : null}
                                        {socialMedia?.envato && socialMedia?.envato?.registered !== undefined && socialMedia.envato.registered == false ?
                                            <Col >
                                                {socialMedia?.ebay && socialMedia?.ebay?.registered !== undefined && socialMedia.envato.registered == false ? <><DiEnvato /> </> : null}
                                            </Col> : null}
                                        {socialMedia?.evernote && socialMedia?.evernote?.registered !== undefined && socialMedia.evernote.registered == false ?
                                            <Col >
                                                {socialMedia?.evernote && socialMedia?.evernote?.registered !== undefined && socialMedia.evernote.registered == false ? <><FaEvernote /> </> : null}
                                            </Col> : null}
                                        {socialMedia?.facebook && socialMedia?.facebook?.registered !== undefined && socialMedia.facebook.registered == false ?
                                            <Col >
                                                {socialMedia?.facebook && socialMedia?.facebook?.registered !== undefined && socialMedia.facebook.registered == false ? <><AiFillFacebook /></> : null}
                                            </Col> : null}
                                        {socialMedia?.flickr && socialMedia?.flickr?.registered !== undefined && socialMedia.flickr.registered == false ?
                                            <Col >
                                                {socialMedia?.flickr && socialMedia?.flickr?.registered !== undefined && socialMedia.flickr.registered == false ? <><FaFlickr /> </> : null}
                                            </Col> : null}
                                        {socialMedia?.flipkart && socialMedia?.flipkart?.registered !== undefined && socialMedia.flipkart.registered == false ?
                                            <Col >
                                                {socialMedia?.flipkart && socialMedia?.flipkart?.registered !== undefined && socialMedia.flipkart.registered == false ? <><SiFlipkart /></> : null}
                                            </Col> : null}
                                        {socialMedia?.foursquare && socialMedia?.foursquare?.registered !== undefined && socialMedia.foursquare.registered == false ?
                                            <Col >
                                                {socialMedia?.zoho && socialMedia?.zoho?.registered !== undefined && socialMedia.foursquare.registered == false ? <><FaFoursquare /></> : null}
                                            </Col> : null}
                                        {socialMedia?.github && socialMedia?.github?.registered !== undefined && socialMedia.github.registered == false ?
                                            <Col >
                                                {socialMedia?.github && socialMedia?.github?.registered !== undefined && socialMedia.github.registered == false ? <><BsGithub /></> : null}
                                            </Col> : null}
                                        {socialMedia?.google && socialMedia?.google?.registered !== undefined && socialMedia.google.registered == false ?
                                            <Col >
                                                {socialMedia?.google && socialMedia?.google.registered !== undefined && socialMedia.google.registered == false ? <><FcGoogle /> </> : null}
                                            </Col> : null}
                                        {socialMedia?.gravatar && socialMedia?.gravatar?.registered !== undefined && socialMedia.gravatar.registered == false ?
                                            <Col >
                                                {socialMedia?.gravatar && socialMedia?.gravatar?.registered !== undefined && socialMedia.gravatar.registered == false ? <><SiGravatar /></> : null}
                                            </Col> : null}
                                        {socialMedia?.zoho && socialMedia?.zoho?.registered !== undefined && socialMedia.instagram.registered == false ?
                                            <Col >
                                                {socialMedia?.zoho && socialMedia?.zoho?.registered !== undefined && socialMedia.instagram.registered == false ? <><BsInstagram /></> : null}
                                            </Col> : null}
                                        {socialMedia?.kakao && socialMedia?.kakao?.registered !== undefined && socialMedia.kakao.registered == false ?
                                            <Col >
                                                {socialMedia?.kakao && socialMedia?.kakao?.registered !== undefined && socialMedia.kakao.registered == false ? <><RiKakaoTalkLine /></> : null}
                                            </Col> : null}
                                        {socialMedia?.lastfm && socialMedia?.lastfm?.registered !== undefined && socialMedia.lastfm.registered == false ?
                                            <Col >
                                                {socialMedia?.lastfm && socialMedia?.lastfm?.registered !== undefined && socialMedia.lastfm.registered == false ? <><FaLastfm /></> : null}
                                            </Col> : null}
                                        {socialMedia?.lazada && socialMedia?.lazada?.registered !== undefined && socialMedia.lazada.registered == false ?
                                            <Col  >
                                                {socialMedia?.lazada && socialMedia?.lazada?.registered !== undefined && socialMedia.lazada.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.linkedin && socialMedia?.linkedin?.registered !== undefined && socialMedia.linkedin.registered == false ?
                                            <Col >
                                                {socialMedia?.linkedin && socialMedia?.linkedin?.registered !== undefined && socialMedia.linkedin.registered == false ? <><AiFillLinkedin /></> : null}
                                            </Col> : null}
                                        {socialMedia?.mailru && socialMedia?.mailru?.registered !== undefined && socialMedia.mailru.registered == false ?
                                            <Col  >
                                                {socialMedia?.mailru && socialMedia?.mailru?.registered !== undefined && socialMedia.mailru.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.microsoft && socialMedia?.microsoft?.registered !== undefined && socialMedia.microsoft.registered == false ?
                                            <Col >
                                                {socialMedia?.microsoft && socialMedia?.microsoft?.registered !== undefined && socialMedia.microsoft.registered == false ? <><BsMicrosoft /></> : null}
                                            </Col> : null}
                                        {socialMedia?.myspace && socialMedia?.myspace?.registered !== undefined && socialMedia.myspace.registered == false ?
                                            <Col>
                                                {socialMedia?.myspace && socialMedia?.myspace?.registered !== undefined && socialMedia.myspace.registered == false ? <><SiMyspace /></> : null}
                                            </Col> : null}
                                        {socialMedia?.netflix && socialMedia?.netflix?.registered !== undefined && socialMedia.netflix.registered == false ?
                                            <Col >
                                                {socialMedia?.netflix && socialMedia?.netflix?.registered !== undefined && socialMedia.netflix.registered == false ? <><RiNetflixFill /></> : null}
                                            </Col> : null}

                                        {socialMedia?.quora && socialMedia?.quora?.registered !== undefined && socialMedia.quora.registered == false ?
                                            <Col >
                                                {socialMedia?.quora && socialMedia?.quora?.registered !== undefined && socialMedia.quora.registered == false ? <><FaQuora /></> : null}
                                            </Col> : null}
                                        {socialMedia?.qzone && socialMedia?.qzone?.registered !== undefined && socialMedia.qzone.registered == false ?
                                            <Col >
                                                {socialMedia?.qzone && socialMedia?.qzone?.registered !== undefined && socialMedia.qzone.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.samsung && socialMedia?.samsung?.registered !== undefined && socialMedia.samsung.registered == false ?
                                            <Col >
                                                {socialMedia?.samsung && socialMedia?.samsung?.registered !== undefined && socialMedia.samsung.registered == false ? <><SiSamsung /></> : null}
                                            </Col> : null}
                                        {socialMedia?.skype && socialMedia?.skype?.registered !== undefined && socialMedia.skype.registered == null ?
                                            <Col >
                                                {socialMedia?.skype && socialMedia?.skype?.registered !== undefined && socialMedia.skype.registered == null ? <><BsSkype /></> : null}
                                            </Col> : null}
                                        {socialMedia?.spotify && socialMedia?.spotify?.registered !== undefined && socialMedia.spotify.registered == false ?
                                            <Col  >
                                                {socialMedia?.spotify && socialMedia?.spotify?.registered !== undefined && socialMedia.spotify.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.tokopedia && socialMedia?.tokopedia?.registered !== undefined && socialMedia.tokopedia.registered == false ?
                                            <Col  >
                                                {socialMedia?.tokopedia && socialMedia?.tokopedia?.registered !== undefined && socialMedia.tokopedia.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.twitter && socialMedia?.twitter?.registered !== undefined && socialMedia.twitter.registered == false ?
                                            <Col >
                                                {socialMedia?.twitter && socialMedia?.twitter?.registered !== undefined && socialMedia.twitter.registered == false ? <><AiFillTwitterCircle /></> : null}
                                            </Col> : null}
                                        {socialMedia?.wordpress && socialMedia?.wordpress?.registered !== undefined && socialMedia.wordpress.registered == false ?
                                            <Col>
                                                {socialMedia?.wordpress && socialMedia?.wordpress?.registered !== undefined && socialMedia.wordpress.registered == false ? <><BsWordpress /></> : null}
                                            </Col> : null}
                                        {socialMedia?.yahoo && socialMedia?.yahoo?.registered !== undefined && socialMedia.yahoo.registered == false ?
                                            <Col >
                                                {socialMedia?.yahoo && socialMedia?.yahoo?.registered !== undefined && socialMedia.yahoo.registered == false ? <><FaYahoo /></> : null}
                                            </Col> : null}
                                        {socialMedia?.zoho && socialMedia?.zoho?.registered !== undefined && socialMedia.zoho.registered == false ?
                                            <Col  >
                                                {socialMedia?.zoho && socialMedia?.zoho?.registered !== undefined && socialMedia.zoho.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                        {socialMedia?.vimeo && socialMedia?.vimeo?.registered !== undefined && socialMedia.vimeo.registered == false ?
                                            <Col>
                                                {socialMedia?.vimeo && socialMedia?.vimeo?.registered !== undefined && socialMedia.vimeo.registered == false ? <><TbBan /></> : null}
                                            </Col> : null}
                                    </div>
                                    <div className="domail-accordian">
                                        <button onClick={handleDomains} className='world-tds'><TbWorld /><span>Domain</span>
                                            <div className="icon-text trds">
                                                {/* <div className="isfree-main">
                                        {DomainData.free == true ? "Free" : DomainData.disposable == true ? "Disposable" : DomainData.custom == true ? "Custom" : null}
                                    </div> */}
                                                <BiChevronDown />
                                            </div>
                                        </button>
                                        {domailDetail ?
                                            <dl className="domain-details-content">
                                                <div className='drop-main'>
                                                    <dt>Type</dt>
                                                    <dd>{DomainData.free == true ? "Free" : DomainData.disposable == true ? "Disposable" : DomainData.custom == true ? "Custom" : null}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Registered</dt>
                                                    <dd>{DomainData.registered == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Professional</dt>
                                                    <dd></dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Domain</dt>
                                                    <dd>{DomainData.domain}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Free</dt>
                                                    <dd>{DomainData.free == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Date Created</dt>
                                                    <dd>{DomainData.created}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Update Date</dt>
                                                    <dd>{DomainData.updated}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Expiry Date</dt>
                                                    <dd>{DomainData.expires}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Registrar Name</dt>
                                                    <dd>{DomainData.registrar_name}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Registered to</dt>
                                                    <dd>{DomainData.registered_to}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>DMARC Enforced</dt>
                                                    <dd>{DomainData.dmarc_enforced == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Strict SPF</dt>
                                                    <dd>{DomainData.spf_strict == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>MX Fit</dt>
                                                    <dd>{DomainData.valid_mx == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Accept All</dt>
                                                    <dd>{DomainData.accept_all == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Suspicious TLD</dt>
                                                    <dd>{DomainData.suspicious_tld == true ? "Yes" : "No"}</dd>
                                                </div>
                                                <div className='drop-main'>
                                                    <dt>Website exists</dt>
                                                    <dd>{DomainData.website_exists == true ? "Yes" : "No"}</dd>
                                                </div>
                                            </dl> : null}
                                    </div>
                                    <div className='domail-accordian'>
                                        <button onClick={handleEmailLookup} className='world-tds'><BsSearch /><span className='lookup-text'>Lookup details</span>
                                            <div className="icon-text trds">
                                                <BiChevronDown />
                                            </div>
                                        </button>
                                        {emailLookupDetails ?
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
                        </>}
                    </div>
                </Col>}
        </>
    )
}

export default EmailData