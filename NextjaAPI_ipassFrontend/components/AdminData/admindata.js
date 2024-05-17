/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst'
import { TiTick } from 'react-icons/ti'
import { GrFormClose } from 'react-icons/gr'
import { BsExclamationCircleFill } from 'react-icons/bs'
import Cookies from 'js-cookie';
import { FilterListingData } from '../ipasslisting/ipasslisting';
import { AiOutlineClose } from 'react-icons/ai'
import LoadingIcons from 'react-loading-icons'

function AdminData(props) {
  const [allData, setAllData] = useState([]);
  const [dataCond, setDataCond] = useState(1);
  const [notPop, setNotPop] = useState()
  const [loading, setLoading] = useState(true)

  const { testFunc, handelSingleCustomer, offset, PER_PAGE, handleResp, getAdminFilterData, userData } = props;
  useEffect(() => {
    if (dataCond == 1) {
      setTimeout(() => {
        handleForAdmins()
      }, 2000)

    }
  })

  const base64Email = Cookies.get('email')
  const email = atob(base64Email)
  const monthLimit = parseInt(userData?.monthly_limit)
  const fiftyPercentage = Math.floor(0.5 * monthLimit)
  const nintyPercent = Math.floor(0.9 * monthLimit)
  const hundredPercent = 1 * monthLimit
  // const [dataStat,setdatastat]=useState()

  function handleForAdmins() {
    axios.get(`${LIVE_URL}/api/v1/ipass/data/admin/${email}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
      .then((repos) => {
        let res = repos && repos.data && repos.data.data !== undefined ? repos.data.data : null
        setLoading(false)

        setAllData(repos && repos.data && repos.data.data !== undefined
          ? repos.data.data
          : null)
        if (fiftyPercentage !== NaN && res.length == fiftyPercentage || res.length == nintyPercent || res.length == hundredPercent) {
          setNotPop(true)
        }
        testFunc(repos && repos.data && repos.data.data !== undefined
          ? repos.data.data.length
          : null)
        handleResp(repos && repos.data && repos.data.data !== undefined
          ? repos.data.data
          : null)
        setDataCond(0)
        // setLoading(false)
      })
  }

  function handleCloseNotPop() {
    setNotPop(false)
  }
  const arrCommon = FilterListingData(allData);
  getAdminFilterData(arrCommon.length);

  const Verifications = (
    <div className="verification-page-main1 userVerfiedData">
      <div className="verification-page-inner userVerfiedInner">
        {!loading ?
          <>
            {arrCommon.length !== 0 ?
              <table>
                <thead>
                  <tr>
                    <th>Submission date</th>
                    <th>Full name/ Document type</th>
                    <th>Issue country</th>
                    <th>Created by</th>
                    <th>Verifications</th>
                    <th>Risk</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {arrCommon !== null
                    ? arrCommon.slice(offset, offset + PER_PAGE).map((decdata) => {
                      let date = decdata && decdata.createdAt !== undefined
                        ? decdata.createdAt.slice(0, 10)
                        : null;
                      let revdate = date?.split("-").reverse().join("-");
                      let time = decdata && decdata.createdAt !== undefined
                        ? decdata.createdAt.slice(11, 16)
                        : null;
                      return (
                        <>
                          <tr className={decdata && decdata.decision && decdata.decision.type !== undefined
                            ? decdata.decision.type == "WARNING"
                              ? "main_tr_notdefined"
                              : decdata && decdata.decision && decdata.decision.type !== undefined
                                ? decdata.decision.type == "PASSED"
                                  ? "main_tr_passed"
                                  : "main_tre_warning"
                                : null
                            : null}
                            onClick={() => handelSingleCustomer(decdata && decdata.account && decdata.account.id !== undefined
                              ? decdata.account.id
                              : null, decdata.workflow.id)}>
                            <td>
                              <span>{revdate}<br />
                                <span>{time}</span>
                              </span>
                            </td>
                            <td>
                              {decdata && decdata.capabilities && decdata.capabilities.extraction !== undefined
                                ? decdata.capabilities.extraction.map((decnamtype) => {
                                  let name = `${decnamtype && decnamtype.data && decnamtype.data.firstName !== undefined
                                    ? decnamtype.data.firstName
                                    : "--"} ${decnamtype && decnamtype.data && decnamtype.data.lastName !== undefined
                                      ? decnamtype.data.lastName
                                      : "--"}`
                                  return (
                                    <div>
                                      <p className='user-name'>{name}</p>
                                      <p className='user-doc-type'>{decnamtype && decnamtype.data && decnamtype.data.type !== undefined
                                        ? decnamtype.data.type
                                        : "---"}</p>
                                    </div>
                                  )
                                })
                                : null}
                            </td>
                            <td>
                              {decdata && decdata.capabilities && decdata.capabilities.extraction !== undefined
                                ? decdata.capabilities.extraction.map((decissuecont) => {
                                  return (
                                    <p>{decissuecont && decissuecont.data && decissuecont.data.issuingCountry !== undefined
                                      ? decissuecont.data.issuingCountry
                                      : "---"}</p>
                                  )
                                })
                                : null}
                            </td>
                            <td>web<br />
                              <p>-----</p>
                            </td>
                            <td>
                              {decdata&&decdata.workflow&&decdata.workflow&&decdata.workflow.definitionKey!==undefined?decdata.workflow.definitionKey !== "10015"
                                ? <div className='checks-main'>
                                  {decdata && decdata.capabilities && decdata.capabilities.liveness !== undefined
                                    ? decdata.capabilities.liveness.map((livcheck) => {
                                      return (
                                        <div className={livcheck && livcheck.decision && livcheck.decision.type !== undefined
                                          ? livcheck.decision.type == "PASSED"
                                            ? 'liveness_check_passed'
                                            : 'document_check_failed'
                                          : null} >LIV</div>
                                      )
                                    })
                                    : null}
                                  {decdata && decdata.capabilities && decdata.capabilities.dataChecks !== undefined
                                    ? decdata.capabilities.dataChecks.map((doccheck) => {
                                      return (
                                        <div className={doccheck && doccheck.decision && doccheck.decision.type !== undefined
                                          ? doccheck.decision.type == "PASSED"
                                            ? 'liveness_check_passed'
                                            : 'document_check_failed'
                                          : null}>DOC</div>
                                      )
                                    })
                                    : null}
                                  {decdata && decdata.capabilities && decdata.capabilities.similarity !== undefined
                                    ? decdata.capabilities.similarity.map((facecheck) => {
                                      return (
                                        <div className={facecheck && facecheck.decision && facecheck.decision.type !== undefined
                                          ? facecheck.decision.type == "PASSED"
                                            ? 'liveness_check_passed'
                                            : 'document_check_failed'
                                          : null}>FM</div>
                                      )
                                    })
                                    : null}

                                  {decdata.amlsts !== undefined
                                    ? <div className={decdata && decdata.amlsts !== undefined
                                      ? decdata.amlsts == "PASSED"
                                        ? 'liveness_check_passed'
                                        : decdata.amlsts == "WARNING"
                                          ? "document_check_warning"
                                          : 'document_check_failed'
                                      : null}>AML</div>
                                    : null}

                                </div>
                                : <div>
                                  <div className='checks-main'>
                                    {decdata && decdata.capabilities && decdata.capabilities.extraction !== undefined
                                      ? decdata.capabilities.dataChecks.map((decchk) => {
                                        return (
                                          <div className='checks-main'>
                                            <div className={decchk && decchk.decision && decchk.decision.type !== undefined
                                              ? decchk.decision.type == "PASSED"
                                                ? 'liveness_check_passed'
                                                : 'document_check_failed'
                                              : null}>DOC</div>
                                          </div>
                                        )
                                      })
                                      : null}

                                    {decdata.amlsts !== undefined
                                      ? <div className={decdata && decdata.amlsts !== undefined
                                        ? decdata.amlsts == "PASSED"
                                          ? 'liveness_check_passed'
                                          : decdata.amlsts == "WARNING"
                                            ? "document_check_warning"
                                            : 'document_check_failed'
                                        : null}>AML</div>
                                      : null}
                                  </div>
                                </div>
                              :null}
                            </td>
                            <td>
                              <div className={decdata && decdata.decision && decdata.decision.type !== undefined
                                ? decdata.decision.type == "WARNING"
                                  ? "decesion_warning dec-type-warn icon_notdefined "
                                  : decdata && decdata.decision && decdata.decision.type !== undefined
                                    ? decdata.decision.type == "PASSED"
                                      ? " decesion_warning dec-type-warn icon_passed  "
                                      : " decesion_warning dec-type-warn"
                                    : null
                                : " decesion_warning dec-type-warn"}>
                                <span className={decdata && decdata.decision && decdata.decision.type !== undefined
                                  ? decdata.decision.type == "WARNING"
                                    ? "icon-dec-notdefined icon-dec-warning"
                                    : decdata && decdata.decision && decdata.decision.type !== undefined
                                      ? decdata.decision.type == "PASSED"
                                        ? "icon-dec-notdefined icon-dec-passed"
                                        : " icon-dec-notdefined"
                                      : null
                                  : "icon-dec-notdefined"}>
                                  <BsFillLightningChargeFill />
                                </span>
                                {decdata && decdata.decision && decdata.decision.risk && decdata.decision.risk.score !== undefined
                                  ? <span>{decdata.decision.risk.score}</span>
                                  : "N/A"}
                              </div>
                            </td>
                            <td>
                              <div className={decdata && decdata.decision && decdata.decision.type !== undefined
                                ? decdata.decision.type == "WARNING"
                                  ? "decesion_notdefined"
                                  : decdata && decdata.decision && decdata.decision.type !== undefined
                                    ? decdata.decision.type == "PASSED"
                                      ? "decesion_passed"
                                      : " decesion_warning"
                                    : null
                                : "decesion_pending"}>
                                {decdata && decdata.decision && decdata.decision.type !== undefined
                                  ? decdata.decision.type == "WARNING"
                                    ? <BsExclamationCircleFill />
                                    : decdata && decdata.decision && decdata.decision.type !== undefined
                                      ? decdata.decision.type == "PASSED"
                                        ? <TiTick />
                                        : <GrFormClose />
                                      : null
                                  : "...."}
                                {decdata && decdata.decision && decdata.decision.details && decdata.decision.details.label !== undefined
                                  ? <span>{decdata.decision.details.label}</span>
                                  : "Pending"}
                              </div>
                            </td>
                          </tr>
                          <tr className='blank-tr'></tr>
                        </>

                      )
                    })
                    : null}
                </tbody>
              </table>
              : <h2 className='data-notpresent'>No Data Found</h2>}

          </>

          : <h2 className='loading-text-main'>Loading please wait....</h2>}
      </div>
    </div>
  )
  return (
    <>
      {notPop ?
        <div className='notification-popup'>
          <div className='notification-popup-inner'>
            <div className='close-pop-btn' onClick={handleCloseNotPop}>
              <AiOutlineClose />
            </div>
            <span>{`${allData?.length == fiftyPercentage
              ? "50%"
              : allData?.length == nintyPercent
                ? "90%"
                : allData?.length == hundredPercent
                  ? "100%"
                  : null} Alert: You have consumed ${allData?.length == fiftyPercentage
                    ? "50%"
                    : allData?.length == nintyPercent
                      ? "90%"
                      : allData?.length == hundredPercent
                        ? "100%"
                        : null} of your monthly transaction limit.`}</span>
          </div>

        </div>
        : null}
      {/* {loading ?
        <div className="loading-request">
          <div className="loader-svg"> Loading...</div>
        </div>
        : null} */}
      {Verifications}
    </>
  )
}
export default AdminData
