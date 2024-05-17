/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst'
import { TiTick } from 'react-icons/ti'
import { GrFormClose } from 'react-icons/gr'
import { BsExclamationCircleFill } from 'react-icons/bs'
import SingleCustomer from '../SingleCustomer/singlecustomer'
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import Filters from '../Filters/filters';
import AdminData from '../AdminData/admindata';

export const isEmpty = (value) => {
  return (value == null || value.length === 0 || value == undefined);
}

function getWholeDate (date){
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}-${month}-${year}`
}

export const FilterListingData = (data) => {
  let sessionStartDate = "All";
  let sessionEndDate = "All";
  let sessionStatus = "All";
  let sessionCountry = "All";
  let sessionIdType = "All";

  const sStartDate = sessionStorage.getItem("selectedStartDate");
  const sEndDate = sessionStorage.getItem("selectedEndDate");
  const sStatus = sessionStorage.getItem("selectedStatus");
  const sCountry = sessionStorage.getItem("selectedCountry");
  const sIdType = sessionStorage.getItem("selectedIdType");

  sessionStartDate = !isEmpty(sStartDate) ? sStartDate : "All";
  sessionEndDate = !isEmpty(sEndDate) ? sEndDate : "All";
  sessionStatus = !isEmpty(sStatus) ? sStatus : "All";
  sessionCountry = !isEmpty(sCountry) ? sCountry : "All";
  sessionIdType = !isEmpty(sIdType) ? sIdType : "All";

  //For date
  const filteredDateDataSession = sessionStartDate && sessionEndDate && sessionStartDate !== "All" && sessionEndDate !== "All"
    ? data.filter(a => {
      const date = new Date(a?.createdAt);
      const sdate = new Date(sessionStartDate);
      const edate = new Date(sessionEndDate);
      const dateInc = getWholeDate(date);
      const sdateInc = getWholeDate(sdate);
      const edateInc = getWholeDate(edate);
      return (dateInc >= sdateInc && dateInc <= edateInc);
    })
    : data;

  //For status
  const filteredStatusDataSession = sessionStatus && sessionStatus !== "All"
    ? data?.filter(a => {
      var status = a?.decision?.type
      return (status === sessionStatus);
    })
    : data;

  //For country
  const filteredCountryDataSession = sessionCountry && sessionCountry !== "All"
    ? data?.filter((element) =>
      element?.capabilities?.extraction?.some((subElement) =>
        sessionCountry === subElement?.data?.issuingCountry
      ))
    : data;

  //For idType
  const filteredIdTypeDataSession = sessionIdType && sessionIdType !== "All"
    ? data?.filter((element) =>
      element?.capabilities?.extraction?.some((subElement) =>
        sessionIdType === subElement?.data?.type
      ))
    : data;

  return filteredStatusDataSession.filter(value => filteredCountryDataSession.includes(value) && filteredIdTypeDataSession.includes(value) && filteredDateDataSession.includes(value));
}

function IpassListing(props) {
  useEffect(() => {
    if (eml == "0") {
      handleForSuperAdmin()
    }
  }, [])
  const { setRequest, request, setSingleCust, singleCust, apiResp, sesnid, eml, testFunc, userData } = props;

  const [currentPage, setCurrentPage] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [allData, setAllData] = useState([]);
  const [adminFilteredData, setAdminFilteredData] = useState([]);
  const [superAdminData, setSuperAdminData] = useState([]);
  const [customId, setCustomId] = useState("");
  const [signState, setSingState] = useState(0);
  const [workflowid, setWorkflowId] = useState("");
  const [loading,setLoading]=useState(true);
  const PER_PAGE = recordPerPage;
  const arrowLeft = <MdOutlineKeyboardArrowLeft />;
  const arrowRight = <MdOutlineKeyboardArrowRight />;
  const arrCommon = FilterListingData(superAdminData);

  function handleShowPerPage(e) {
    setRecordPerPage(e)
    setCurrentPage(0)
    let a = document.querySelector(".pagination li a[aria-label='Page 1']");
    if (a !== null) {
      a.click();
    }
  }

  function handleForSuperAdmin() {
    axios.get(`${LIVE_URL}/api/v1/getsuper/admin/data`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
      .then((repos) => {

        setSuperAdminData(repos && repos.data && repos.data.data !== undefined
          ? repos.data.data
          : null)
          setLoading(false)
      })
  }

  function handleResp(allData) {
    setAllData(allData)
  }
  function getAdminFilterData(data) {
    setAdminFilteredData(data);
  }

  function handelSingleCustomer(cusId, workId) {
    setWorkflowId(workId)
    setCustomId(cusId);
    setRequest(false)
    setSingleCust(true)
    setSingState(1)
  }

  function handlePageClick(data) {
    if (data && data.nextSelectedPage !== undefined) {
      setCurrentPage(data.nextSelectedPage)
    }
  }

  const offset = currentPage * PER_PAGE;

  const SuperVerifications = (
    <div className="verification-page-main1 userVerfiedData">
      <div className="verification-page-inner userVerfiedInner">
      {!loading?
      <>
      {arrCommon.length!==0?
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
            {arrCommon !==null
              ? arrCommon.slice(offset, offset + parseInt(PER_PAGE)).map((decdata) => {
                let date = decdata && decdata.createdAt !== undefined
                  ? decdata.createdAt.slice(0, 10)
                  : null;
                let revdate = date?.split("-").reverse().join("-");
                let time = decdata && decdata.createdAt !== undefined
                  ? decdata.createdAt.slice(11, 16)
                  : null;
                return (
                  <>
                  {decdata?.acc_type == "Live" ?
                  <>
                  <tr key={decdata._id} className={decdata && decdata.decision && decdata.decision.type !== undefined
                    ? decdata.decision.type == "WARNING"
                      ? "main_tr_notdefined"
                      : decdata && decdata.decision && decdata.decision.type !== undefined
                        ? decdata.decision.type == "PASSED"
                          ? "main_tr_passed"
                          : "main_tre_warning"
                        : null
                    : null}
                    // onClick={() => handelSingleCustomer(
                    //   decdata && decdata.account && decdata.account.id !== undefined
                    //     ? decdata.account.id
                    //     : null, decdata.workflow.id)}
                        >
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
                            : "--"}
                            ${decnamtype && decnamtype.data && decnamtype.data.lastName !== undefined
                              ? decnamtype.data.lastName
                              : "--"}`
                          return (
                            <span key={decnamtype.id}>
                            <p>{decdata?.account?.id}</p>
                              <p className='user-doc-type'>
                                {decnamtype && decnamtype.data && decnamtype.data.type !== undefined
                                  ? decnamtype.data.type
                                  : "---"}
                              </p>
                            </span>
                          )
                        })
                        : null}
                    </td>
                    <td>
                      {decdata && decdata.capabilities && decdata.capabilities.extraction !== undefined
                        ? decdata.capabilities.extraction.map((decissuecont) => {
                          return (
                            <p key={decissuecont.id}>
                              {decissuecont && decissuecont.data && decissuecont.data.issuingCountry !== undefined
                                ? decissuecont.data.issuingCountry
                                : "---"}
                            </p>
                          )
                        })
                        : null}
                    </td>
                    <td>web<br />
                      <p>-----</p>
                    </td>
                    <td>
                      {decdata?.workflow?.definitionKey !== "10015"
                        ? <div className='checks-main'>
                          {decdata && decdata.capabilities && decdata.capabilities.liveness !== undefined
                            ? decdata.capabilities.liveness.map((livcheck) => {
                              return (
                                <div className={livcheck && livcheck.decision && livcheck.decision.type !== undefined
                                  ? livcheck.decision.type == "PASSED"
                                    ? 'liveness_check_passed'
                                    : 'document_check_failed'
                                  : null}>LIV</div>
                              )
                            })
                            : null}
                          {decdata && decdata.capabilities && decdata.capabilities.dataChecks !== undefined
                            ? decdata.capabilities.dataChecks.map((doccheck) => {
                              return (
                                <div>
                                  {doccheck?.decision?.details?.label == "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                    ? <div className="document_check_warning">DOC</div>
                                    : <div className={doccheck && doccheck.decision && doccheck.decision.type !== undefined
                                      ? doccheck.decision.type == "PASSED"
                                        ? 'liveness_check_passed'
                                        : 'document_check_failed'
                                      : null}>DOC</div>
                                  }
                                </div>
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
                            {decdata && decdata.capabilities && decdata.capabilities.dataChecks !== undefined
                              ? decdata.capabilities.dataChecks.map((doccheck) => {

                                return (
                                  <div>
                                    {doccheck?.decision?.details?.label == "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                      ? <div className="document_check_warning">DOC</div>
                                      : <div className={doccheck && doccheck.decision && doccheck.decision.type !== undefined
                                        ? doccheck.decision.type == "PASSED"
                                          ? 'liveness_check_passed'
                                          : 'document_check_failed'
                                        : null}>DOC</div>
                                    }
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
                      }
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
                  </> :
                  <>
                  <tr key={decdata._id} className={decdata && decdata.decision && decdata.decision.type !== undefined
                    ? decdata.decision.type == "WARNING"
                      ? "main_tr_notdefined"
                      : decdata && decdata.decision && decdata.decision.type !== undefined
                        ? decdata.decision.type == "PASSED"
                          ? "main_tr_passed"
                          : "main_tre_warning"
                        : null
                    : null}
                    onClick={() => handelSingleCustomer(
                      decdata && decdata.account && decdata.account.id !== undefined
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
                            : "--"}
                            ${decnamtype && decnamtype.data && decnamtype.data.lastName !== undefined
                              ? decnamtype.data.lastName
                              : "--"}`
                          return (
                            <span key={decnamtype.id}>
                              <p className='user-name'>{name}</p>
                              <p className='user-doc-type'>
                                {decnamtype && decnamtype.data && decnamtype.data.type !== undefined
                                  ? decnamtype.data.type
                                  : "---"}
                              </p>
                            </span>
                          )
                        })
                        : null}
                    </td>
                    <td>
                      {decdata && decdata.capabilities && decdata.capabilities.extraction !== undefined
                        ? decdata.capabilities.extraction.map((decissuecont) => {
                          return (
                            <p key={decissuecont.id}>
                              {decissuecont && decissuecont.data && decissuecont.data.issuingCountry !== undefined
                                ? decissuecont.data.issuingCountry
                                : "---"}
                            </p>
                          )
                        })
                        : null}
                    </td>
                    <td>web<br />
                      <p>-----</p>
                    </td>
                    <td>
                      {decdata?.workflow?.definitionKey !== "10015"
                        ? <div className='checks-main'>
                          {decdata && decdata.capabilities && decdata.capabilities.liveness !== undefined
                            ? decdata.capabilities.liveness.map((livcheck) => {
                              return (
                                <div className={livcheck && livcheck.decision && livcheck.decision.type !== undefined
                                  ? livcheck.decision.type == "PASSED"
                                    ? 'liveness_check_passed'
                                    : 'document_check_failed'
                                  : null}>LIV</div>
                              )
                            })
                            : null}
                          {decdata && decdata.capabilities && decdata.capabilities.dataChecks !== undefined
                            ? decdata.capabilities.dataChecks.map((doccheck) => {
                              return (
                                <div>
                                  {doccheck?.decision?.details?.label == "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                    ? <div className="document_check_warning">DOC</div>
                                    : <div className={doccheck && doccheck.decision && doccheck.decision.type !== undefined
                                      ? doccheck.decision.type == "PASSED"
                                        ? 'liveness_check_passed'
                                        : 'document_check_failed'
                                      : null}>DOC</div>
                                  }
                                </div>
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
                            {decdata && decdata.capabilities && decdata.capabilities.dataChecks !== undefined
                              ? decdata.capabilities.dataChecks.map((doccheck) => {

                                return (
                                  <div>
                                    {doccheck?.decision?.details?.label == "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                      ? <div className="document_check_warning">DOC</div>
                                      : <div className={doccheck && doccheck.decision && doccheck.decision.type !== undefined
                                        ? doccheck.decision.type == "PASSED"
                                          ? 'liveness_check_passed'
                                          : 'document_check_failed'
                                        : null}>DOC</div>
                                    }
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
                      }
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
                  }
                  </>
                )
              })
              : null}
          </tbody>
        </table>:<h2 className='data-notpresent'>No Data Found</h2>}
        </>
        :<h2 className='loading-text-main'>Loading please wait....</h2>}

      </div>
    </div>
  )

  const pageCount = Math.ceil(allData !== null || superAdminData !== null
    ? eml == "0"
      ? superAdminData.length / PER_PAGE
      : allData.length / PER_PAGE
    : 0);
    
    const [num] = useState(1)
  return (
    <>
    {/* <button onClick={handleClick}>click</button> */}
      {!singleCust
        ? <Filters />
        : null}
      {request
        ? <div>
          {eml == "0"
            ? SuperVerifications
            : <AdminData
              testFunc={testFunc}
              eml={eml}
              handelSingleCustomer={handelSingleCustomer}
              offset={offset}
              PER_PAGE={PER_PAGE}
              handleResp={handleResp}
              getAdminFilterData={getAdminFilterData}
              userData={userData}
            />}
          <div className='pagination-section-main'>
           <div className='paginationSelectDropdown'>
            <p>Show per page</p>
            <select id='select-pageval' onChange={(e) => handleShowPerPage(e.target.value)}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            </div>
            <div className="paginationReact">
            <p className='page-record-count'>{num + parseInt(offset)}-{currentPage < offset ? offset + parseInt(recordPerPage) : recordPerPage}{'  '}of{'  '}{eml == "0"
                ? arrCommon.length
                : adminFilteredData}</p>
            <ReactPaginate
              previousLabel={arrowLeft}
              nextLabel={arrowRight}
              pageCount={pageCount}
              onClick={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
            </div>
          </div>
        </div>
        : null}
      {singleCust
        ? <SingleCustomer
          apiResp={apiResp} sesnid={sesnid}
          workflowid={workflowid}
          customId={customId}
          setRequest={setRequest}
          setSingleCust={setSingleCust}
          signState={signState}
          setSingState={setSingState}
        />
        : null}
    </>)
}
export default IpassListing;