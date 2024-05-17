/* eslint-disable */
import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import { BiChevronDown } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment/moment';
import {ShimmerCategoryList} from "react-shimmer-effects";

function IpData(props) {
    const { singleTransaction,ipLookupDetails, setIpLookupDetails } = props
    const [loading,setLoading]=useState(false)
    const ipdata = singleTransaction && singleTransaction.data && singleTransaction.data.ip_details !== undefined || null ? singleTransaction.data.ip_details : null
    const lookupDetail = singleTransaction && singleTransaction.data && singleTransaction.data.ip_details&&singleTransaction.data.ip_details.history !== undefined || null ? singleTransaction.data.ip_details.history : null
    const sDate = Date(lookupDetail?.first_seen)
    const FirstSeen = moment(sDate).format("DD-MM-YYYY h:mm:ss a")
    const lDate = Date(lookupDetail?.last_seen)
    const lastSeen = moment(lDate).format("DD-MM-YYYY h:mm:ss a")
    
// console.log("ipdata",ipdata);
    function handleIpLookup() {
        setIpLookupDetails(!ipLookupDetails)
    }
    function handleRefresh() {
        setLoading(true)
        
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }
    return (
        <>
        {ipdata==null?
            <div className='ip-dat-main'>
            <Col>
            <div className='email-info-data'>
            <h3><b>No Data Found</b></h3>
            </div>
            </Col>
            </div>
            :
        <>
        {loading?
        <ShimmerCategoryList/>
        :
        <div className='ip-dat-main'>
            <Col>
                {/* <div className="email-info-data"> */}
                    
                    <div className='email-info-data'>
                    <h3><b>Ip Information</b></h3>
                    <span className='refresh-button' onClick={handleRefresh}>Refresh Data</span>
                    </div>
                {/* </div> */}
                <div className="email-info-content">
                    <dl>
                        <dd>
                            <div className='customer-email'>
                                <span className='used-transaction'>Used in this transaction:</span>
                                <span className='used-email'>{singleTransaction && singleTransaction.data && singleTransaction.data.ip_details && singleTransaction.data.ip_details.ip !== undefined ? singleTransaction.data.ip_details.ip : null}</span>
                            </div>
                            <div className="progress-email">
                                <div className="phone-score">
                                    <div className="phone_score_inner_sec">
                                        <div className="phone_score_inner_sec_left">
                                            <span className="phone-cuist-score">{singleTransaction && singleTransaction.data && singleTransaction.data.ip_details && singleTransaction.data.ip_details.score !== undefined ? singleTransaction.data.ip_details.score : null}.00</span>
                                            <span className="phone-outof">/100</span>
                                        </div>
                                        <div className="phone_score_inner_sec_right">
                                            <span>score</span>
                                        </div>
                                    </div>
                                    <ProgressBar className="progressbar-phone"
                                        completed={singleTransaction && singleTransaction.data && singleTransaction.data.ip_details && singleTransaction.data.ip_details.score !== undefined ? singleTransaction.data.ip_details.score : null}
                                        isLabelVisible={false}
                                        bgColor={singleTransaction && singleTransaction.data && singleTransaction.data.ip_details && singleTransaction.data.ip_details.score !== undefined ? singleTransaction.data.ip_details.score !== 0 ? "#60BDB2" : "#ebebeb" : null}
                                    //  baseBgColor={singleCust && singleCust.data_phone && singleCust.data_phone.score== 0?"#60BDB2":"#60BDB"}
                                    />
                                </div>
                            </div>

                            <div className='ip-data-1st-section'>
                                <dl className='ip-data'>
                                <div className='drop-main'>
                                    <dt className='heading-main'>Location</dt>
                                    <dd className='head-data-main'>{ipdata?.city}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>Country</dt>
                                    <dd className='head-data-main'>{ipdata?.country}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>IP type</dt>
                                    <dd className='head-data-main'>{ipdata?.type}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>ISP</dt>
                                    <dd className='head-data-main'>{ipdata?.isp_name}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>Open ports</dt>
                                    {ipdata?.open_ports.map((openPorts, i) => {
                                        return (
                                            <dd className='head-data-main'>{openPorts}{i + 1 < ipdata?.open_ports.length && ","}</dd>
                                        )
                                    })}
                                    </div>
                                </dl>
                            </div>
                            <div className='ip-data-2nd-section'>
                                <dl className='ip-data'>
                                <div className='drop-main'>
                                    <dt className='heading-main'>Web proxy</dt>
                                    <dd className='head-data-main'>{ipdata?.web_proxy == true ? "Yes" : "No"}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>Public proxy</dt>
                                    <dd className='head-data-main'>{ipdata?.public_proxy == true ? "Yes" : "No"}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>TOR</dt>
                                    <dd className='head-data-main'>{ipdata?.tor == true ? "Yes" : "No"}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>VPN</dt>
                                    <dd className='head-data-main'>{ipdata?.vpn == true ? "Yes" : "No"}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>Datacenter proxy</dt>
                                    <dd className='head-data-main'>No</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className='ip-data-3rd-section'>
                                <dl className='ip-data'>
                                <div className='drop-main'>
                                    <dt className='heading-main'>SPAM blacklists</dt>
                                    <dd className='head-data-main'>{ipdata?.spam_number}</dd>
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>SPAM urls</dt>
                                    {ipdata?.spam_urls.map((urls, i) => {
                                        return (
                                            <dd className='head-data-main'>{urls}{i + 1 < ipdata?.spam_urls.length && ","}</dd>
                                        )
                                    })}
                                    </div>
                                    <div className='drop-main'>
                                    <dt className='heading-main'>Harmful IP</dt>
                                    <dd className='head-data-main'>{ipdata?.harmful == true ? "Yes" : "No"}</dd>
                                </div>
                                </dl>
                            </div>
                            <div className='domail-accordian'>
                                <button onClick={handleIpLookup} className='world-tds'><BsSearch /><span className='lookup-text'>Lookup details</span>
                                    <div className="icon-text">
                                        <BiChevronDown />
                                    </div>
                                </button>
                                {ipLookupDetails ?
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
                        </dd>
                    </dl>
                </div>
            </Col>
        </div>}
        </>
        }

        </>
    )
}

export default IpData