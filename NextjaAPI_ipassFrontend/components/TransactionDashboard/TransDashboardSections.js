/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { WorldMap } from "react-svg-worldmap";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, } from 'recharts';
import Filter from '../TransactionsFilter/Filter';
import ProgressBar from '@ramonak/react-progress-bar';
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst';
import MUIDataTable from "mui-datatables";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TableContainer from "@material-ui/core/TableContainer";
import { FiRefreshCw } from "react-icons/fi";
import { ShimmerThumbnail } from "react-shimmer-effects";
import Cookies from 'js-cookie';

function TransDashboardSections(props) {

  const isEmpty = (value) => {
    return (value == null || value.length === 0 || value == undefined);
  }

  const [data, setData] = useState([]);
  const [transacttion, setTransacttion] = useState([]);
  const [transrespo, setTransrespo] = useState([]);
  const [transtable, setTranstable] = useState([]);
  const [threshold, setThreshold] = useState([])
  const [approve, setApprove] = useState([])
  const [data2, setData2] = useState([]);
  const [rulename, setRulename] = useState()
  const [tabsData, setTabsData] = useState(true)
  const [tabsData1, setTabsData1] = useState(true)
  const [changecolor, setChangeColor] = useState(false)
  const [lablecolor, setLableColor] = useState(false)
  const [addClass, setAddClass] = useState(false)
  const [defaultvalues, setDefaultvalues] = useState("Markapprove")
  const [emailState, setEmailState] = useState('')
  // console.log("emailState",emailState);

  //Empty state
  const [worldmapdate, setWorldmapDate] = useState([])
  const [ruledate, setRuleDate] = useState(null)
  const [labledeclinedate, setLabledeclinedate] = useState(null)

  //Refresh
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [loading4, setLoading4] = useState(false)

  //applied
  const [appliedworldstart, setAppliedWorldStart] = useState("All")
  const [appliedworldenddate, setAppliedWorldmapEndDate] = useState("All")
  const [appliedworldcountry, setAppliedWorldCountry] = useState("All")
  const [appliedworldactiontype, setAppliedWorldActiontype] = useState("All")

  const [appliedtransstartdate, setAppliedTransStartDate] = useState("All")
  const [appliedtransenddate, setAppliedTransEndDate] = useState("All")
  const [appliedtranscountry, setAppliedTransCountry] = useState("All")
  const [appliedtransactiontype, setAppliedTransActiontype] = useState("All")

  const [appliedtranslabstartdate, setAppliedTransLabStartDate] = useState("All")
  const [appliedtranslabenddate, setAppliedTransLabEndDate] = useState("All")
  const [appliedtranslabcountry, setAppliedTransLabCountry] = useState("All")
  const [appliedtranslabactiontype, setAppliedTransLabActiontype] = useState("All")

  const [appliedruledstartdate, setAppliedRuleStartDate] = useState("All")
  const [appliedruleenddate, setAppliedRuleEndDate] = useState("All")
  const [appliedrulecountry, setAppliedRuleCountry] = useState("All")
  const [appliedruledactiontype, setAppliedRuleActiontype] = useState("All")

  const [appliedthreshstartdate, setAppliedThreshStartDate] = useState("All")
  const [appliedthreshenddate, setAppliedThreshEndDate] = useState("All")
  const [appliedthreshcountry, setAppliedThreshCountry] = useState("All")
  const [appliedthreshactiontype, setAppliedThreshActiontype] = useState("All")

  useEffect(() => {
    let emla = Cookies.get('email')
    let eml
    if (emla !== undefined) {
      eml = atob(emla)
      setEmailState(eml)
    }

    handleApprove(props)
    lableapprove(props)
    transa(props)
    AppliedRuleFun()
    ThresholdFun()
  }, [emailState])

  async function handleApplyFunc(props) {

    if (props.value === "worlmap") {
      setWorldmapDate(props);
      handleApprove(props);
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedWorldStart(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedWorldmapEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedWorldActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedWorldCountry(sessionCountry)

    }
    if (props.value === "trans") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedTransStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedTransEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedTransActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedTransCountry(sessionCountry)
      transa(props);
    }
    if (props.value === "translab") {
      setLabledeclinedate(props)
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedTransLabStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedTransLabEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedTransLabActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedTransLabCountry(sessionCountry);

      if (defaultvalues === "Markapprove") {
        lableapprove(props)
        setDefaultvalues("Markapprove")
      }
      else if (defaultvalues == "Markdecline") {
        labledecline()
      }
    }
    if (props.value === "apliedRule") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedRuleStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedRuleEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedRuleActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedRuleCountry(sessionCountry)
      AppliedRuleFun(props)
      setRuleDate(props)
    }
    if (props.value === "stateold") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedThreshStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedThreshEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedThreshActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedThreshCountry(sessionCountry)
      ThresholdFun(props)
    }
  }

  async function handelResetFun(value) {
    if (value === "worlmap") {
      setWorldmapDate()
      handleDecline()
      handleApprove()
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedWorldStart(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedWorldmapEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedWorldActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedWorldCountry(sessionCountry)

    }
    if (value === "trans") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedTransStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedTransEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedTransActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedTransCountry(sessionCountry)
      transa()
    }
    if (value === "translab") {
      setLabledeclinedate()
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedTransLabStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedTransLabEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedTransLabActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedTransLabCountry(sessionCountry);
      if (defaultvalues === "Markapprove") {
        lableapprove()
        setDefaultvalues("Markapprove")
      }
    }
    if (value === "apliedRule") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedRuleStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedRuleEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedRuleActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedRuleCountry(sessionCountry)
      AppliedRuleFun()
      setRuleDate()
    }
    if (value === "stateold") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      let sessionEndDate = await sessionStorage.getItem("selectedEndDate");
      let sessionActiotype = await sessionStorage.getItem("selectedActiontype");
      let sessionCountry = await sessionStorage.getItem("selectedCountrytype");
      !isEmpty(sessionStartDate) && setAppliedThreshStartDate(sessionStartDate);
      !isEmpty(sessionEndDate) && setAppliedThreshEndDate(sessionEndDate);
      !isEmpty(sessionActiotype) && setAppliedThreshActiontype(sessionActiotype);
      !isEmpty(sessionCountry) && setAppliedThreshCountry(sessionCountry)
      ThresholdFun()
    }
  }

  const handleApprove = (propsDate) => {
    console.log(propsDate, "propsDate", worldmapdate);
    axios.get(`${LIVE_URL}/api/v1/ipass/get/approve_country?user_email=${emailState}&actionType=${propsDate?.actiontype == undefined && "All" ? "" : propsDate?.actiontype }&startDate=${propsDate?.date && propsDate?.date[0] !== "All" ? propsDate?.date[0] : "" || worldmapdate?.date && worldmapdate?.date[0] !== "All" ? worldmapdate?.date[0] : ""} &endDate=${propsDate?.date && propsDate?.date[1] !== "All" ? propsDate?.date[1] : "" || worldmapdate?.date && worldmapdate?.date[1] !== "All" ? worldmapdate?.date[1] : ""}&country=${propsDate?.countrytype && propsDate?.countrytype !== undefined && "All" ? propsDate?.countrytype : "" || worldmapdate?.countrytype !== undefined && "All" ? worldmapdate?.countrytype : ""}`)
      .then((res) => {
        setData(res.data.approveByCountry); setTabsData1(true), setChangeColor(false)
      })
  };

  const handleDecline = () => {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/decline_country?user_email=${emailState}&actionType=${worldmapdate?.actiontype !== undefined && "All" ? worldmapdate?.actiontype : ""}&startDate=${worldmapdate?.date && worldmapdate?.date[0] !== "All" ? worldmapdate?.date[0] : ""}&endDate=${worldmapdate?.date && worldmapdate?.date[1] !== "All" ? worldmapdate?.date[1] : ""}&country=${worldmapdate?.countrytype !== undefined && "All" ? worldmapdate?.countrytype : ""}`).then((res) => {
      setData(res.data.declineByCountry);
      setTabsData1(false), setChangeColor(true)
    })
  };

  let country = data?.map((i) => { return i })

  async function lableapprove(props) {

    await axios.get(`${LIVE_URL}/api/v1/ipass/get/countapprove/data?user_email=${emailState}&startDate=${props?.date && props?.date[0] ? props?.date[0] : ""}&endDate=${props?.date && props?.date[1] ? props?.date[1] : ""}&actionType=${props?.actiontype !== undefined && "All" ? props?.actiontype : ""}&country=${props?.countrytype && props?.countrytype !== undefined && "All" ? props?.countrytype : ""}`)
      .then((res) => { setApprove(res.data.data), setLableColor(true), setData2(res.data), setDefaultvalues("Markapprove") })
  }

  function labledecline() {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/countdecline/data?user_email=${emailState}&actionType=${labledeclinedate?.actiontype !== undefined && "All" ? labledeclinedate?.actiontype : ""}&startDate=${labledeclinedate?.date[0] && labledeclinedate?.date[0] !== "All" ? labledeclinedate?.date[0] : ""}&endDate=${labledeclinedate?.date[0] && labledeclinedate?.date[1] !== "All" ? labledeclinedate?.date[1] : ""}&country=${labledeclinedate?.countrytype && labledeclinedate?.countrytype !== undefined && "All" ? labledeclinedate?.countrytype : ""}`)
      .then((res) => { setApprove(res.data.data), setLableColor(false), setData2(res.data) })
  }

  function handleCount() { setTabsData(true) }

  function hadleAddClass() { setAddClass(true) }

  function transa(propsDate) {
    axios.get(`${LIVE_URL}/api/v1/ipass/transaction?user_email=${emailState}&startDate=${propsDate?.date && propsDate?.date[0] !== "All" ? propsDate?.date[0] : ""}&endDate=${propsDate?.date && propsDate?.date[1] !== "All" ? propsDate?.date[1] : ""}&actionType=${propsDate?.actiontype !== undefined && "All" ? propsDate?.actiontype : ""}&country=${propsDate?.countrytype && propsDate?.countrytype !== undefined && "All" ? propsDate?.countrytype : ""}`)
      .then((res) => {
        setTransrespo(res.data.totalObject)
        setTransacttion(res.data.data);
      })
  }

  function AppliedRuleFun(propsDate) {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/applied_rules?user_email=${emailState}&actionType=${propsDate?.actiontype !== undefined && "All" ? propsDate?.actiontype : ""}&startDate=${propsDate?.date && propsDate?.date[0] !== "All" ? propsDate?.date[0] : ""}&endDate=${propsDate?.date && propsDate?.date[1] !== "All" ? propsDate?.date[1] : ""}&country=${propsDate?.countrytype && propsDate?.countrytype !== undefined && "All" ? propsDate?.countrytype : ""}`).then((res) => {
      // console.log(res);
      const roles = res.data?.nameCountPairs?.map((i) => { return i })
      setTranstable(roles);
    })
  }

  function ThresholdFun(propsDate) {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/scorethreshold/data?user_email=${emailState}&startDate=${propsDate?.date && propsDate?.date[0] !== "All" ? propsDate?.date[0] : ""}&endDate=${propsDate?.date && propsDate?.date[0] !== "All" ? propsDate?.date[1] : ""}&country=${propsDate?.countrytype && propsDate?.countrytype !== undefined && "All" ? propsDate?.countrytype : ""}`).then((res) => { setThreshold(res.data) })

  }

  const columns = [
    {
      name: "rulecount",
      label: "TIMES",
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: "rulname",
      label: "RULE NAME",
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: "approved_percentages",
      label: "APPROVED",
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: "reviewed_percentages",
      label: "REVIEWED",
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: "declined_percentages",
      label: "DECLINED",
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: "date",
      label: "LAST TRIGGER DATE",
      options: {
        filter: true,
        sort: true,

      }
    },

  ];

  const options = {
    filter: false,
    filterType: 'multiselect',
    download: true,
    downloadOptions: { filename: 'export_applied_rules_statistics.csv', },
    search: false,
    print: false,
    viewColumns: false,
    pagination: false,
    selectableRows: "none",
    responsive: "scroll",
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    onRowExpansionChange: (currentRowsExpanded) => { <div onClick={apliedRulename(transtable[currentRowsExpanded[0].dataIndex]?.rulname)}></div> },
    renderExpandableRow: () => {
      return (
        <tr>
          <td colSpan={15}>
            <TableContainer >
              <ResponsiveContainer width={1500} height={200}>
                <LineChart width={600} height={300} data={rulename} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ruleCount" stroke="rgb(60, 114, 255)" name="Totaltransaction" />
                </LineChart>
              </ResponsiveContainer>
            </TableContainer>
          </td>
        </tr>
      );
    },

  };

  function apliedRulename(rowData) {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/aplideRules_Linchart?user_email=${emailState}&actionType=${ruledate?.actiontype ? ruledate?.actiontype : ""}&startDate=${ruledate?.date ? ruledate?.date[0] : ""}&endDate=${ruledate?.date ? ruledate?.date[1] : ""}&country=${ruledate?.countrytype && ruledate?.countrytype !== undefined && "All" ? ruledate?.countrytype : ""}&ruleName=${rowData}`)
      .then((res) => {
        setRulename(res.data.rules);
      })
  }

  function Refreshworlmap() {
    setLoading(true)
    setTimeout(() => {
      handleDecline()
      handleApprove(props)
      setWorldmapDate()
      setLoading(false)
    }, 1000)
  }

  function Refreshtrans() {
    setLoading1(true)
    setTimeout(() => {
      transa()
      setAppliedTransStartDate()
      setAppliedTransEndDate()
      setLoading1(false)
    }, 1000)
  }

  function Refreshtranslable() {
    setLoading2(true)
    setTimeout(() => {

      labledecline()
      lableapprove()
      setLoading2(false)
    }, 1000)
  }

  function RefresRule() {
    setLoading3(true)
    setTimeout(() => {
      setAppliedRuleStartDate()
      setAppliedRuleEndDate()
      AppliedRuleFun()
      setLoading3(false)
    }, 1000)
  }

  function Refreshthres() {
    setLoading4(true)
    setTimeout(() => {
      ThresholdFun()
      setLoading4(false)
    }, 1000)
  }

  function handleChange(value) {
    if (defaultvalues && value === "Markapprove") {
      lableapprove()
      setDefaultvalues("Markapprove")
    }
    else if (value === "Markdecline") {
      labledecline()
    }
  }

  const transformRef = useRef(null);

  const handleZoomIn = () => {
    if (transformRef.current) {
      transformRef.current.zoomIn();
    }
  };
  const handleZoomOut = () => {
    if (transformRef.current) {
      transformRef.current.zoomOut();
    }
  }

  return (
    <div>

      <section>
        <div className='refresh' >
          <h1>Top locations</h1><FiRefreshCw onClick={Refreshworlmap} /></div>
        <div className='fiterwrap'>
          <Filter value="worlmap" handleApplyFunc={handleApplyFunc} handelResetFun={handelResetFun} />
        </div>

        {appliedworldstart && appliedworldenddate != "All" || appliedworldactiontype != "All" || appliedworldcountry != "All" ?
          <div className='applied-filter-main'>
            {appliedworldstart && appliedworldenddate != "All" ?
              <div className='Date-Last'>{appliedworldstart != "All" ? `Date:${appliedworldstart}` : " "}-{appliedworldenddate !== "All" ? appliedworldenddate : ""}
              </div> : null}
            {appliedworldactiontype !== "All" ?
              <div className='Date-Last'>
                {appliedworldactiontype !== "All" ? `Action type:${appliedworldactiontype}` : " "}
              </div> : null}
            {appliedworldcountry !== "All" ?
              <div className='Date-Last'>
                {appliedworldcountry !== "All" ? `User country:${appliedworldcountry}` : ""}</div> : null}
          </div> :
          <div className='Date-Last'>Date:Last 30 days</div>}

        {loading ? <ShimmerThumbnail height={250} /> :
          <div>
            <div className='Worlmapwrap'>
              <TransformWrapper ref={transformRef}>
                <TransformComponent>
                  <WorldMap data={country} color={changecolor ? "rgb(231, 99, 95)" : "rgb(96, 189, 178)"} value-suffix="people" size="xl" />
                </TransformComponent>
              </TransformWrapper>
              <div className='zoomIn_and_zoomOut'>
                <button onClick={handleZoomIn}>+</button>
                <button onClick={handleZoomOut}>-</button>
              </div>
            </div>

            <div className='app-wrap-sec'>
              <div className='Aprovewrap'>
                <p className={tabsData1 ? "approve-dtata-tab active" : 'approve-data-tab'} onClick={() => handleApprove(props)}>Approve</p>
              </div>
              <div className='Declinewrap'>
                <p className={!tabsData1 ? "decline-data active" : "decline-data"} onClick={() => handleDecline(props)}>Decline</p>
              </div>
              {tabsData1 ? <div className='Approve'>{country?.map((i) => (<div className='contry-data'><div className='icon-name'>{i.country}</div><div className='add-text-1'>{i.value}</div></div>))}</div> : null}
              {!tabsData1 ? <div className='Approve'>{country?.map((i) => (<div className='contry-data'><div className='icon-name'>{i.country}</div><div className='add-text-1'>{i.value}</div></div>))}</div> : null}
            </div>
          </div>}

      </section>

      <section>
        <div className='refresh' >
          <h1>Transactions</h1><FiRefreshCw onClick={Refreshtrans} /></div>
        <div className='fiterwrap'>
          <Filter value="trans" handleApplyFunc={handleApplyFunc} handelResetFun={handelResetFun} />
        </div>
        {appliedtransstartdate && appliedtransenddate !== "All" || appliedtransactiontype !== "All" || appliedtranscountry !== "All" ?
          <div className='applied-filter-main'>
            {appliedtransstartdate && appliedtransenddate !== "All" ?
              <div className='Date-Last'>
                {appliedtransstartdate == "All" ? "" : `Date:${appliedtransstartdate}`}-{appliedtransenddate == "All" ? "" : appliedtransenddate}
              </div> : null}
            {appliedtransactiontype !== "All" ?
              <div className='Date-Last'>
                {appliedtransactiontype == "All" ? "" : `Action type:${appliedtransactiontype}`}
              </div> : null}
            {appliedtranscountry !== "All" ?
              <div className='Date-Last'>
                {appliedtranscountry == "All" ? "" : `User country:${appliedtranscountry}`}
              </div> : null}
          </div>
          : <div className='Date-Last'>Date:Last 30 days</div>}
        {loading1 ? <ShimmerThumbnail /> :
          <div className='trans-sec'>
            <div className='transaction-bar'>
              <ResponsiveContainer width={1100} height={200}>
                <LineChart width={600} height={300} data={transacttion} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="approve" stroke="rgb(96, 189, 178)" name="Approve" />
                  <Line type="monotone" dataKey="decline" stroke="rgb(231, 99, 95)" name="Decline" />
                  <Line type="monotone" dataKey="review" stroke="rgb(232, 209, 114)" name="Review" />
                </LineChart>
              </ResponsiveContainer>
              <div className='total-num-cont'>
                <h5>Total number of transactions</h5><span>{transrespo.TOTAL_TRANSACTIONS}</span>
              </div>
            </div>
            <div className='amount-rawdata-main'>
              <div className={'amount-rawdata-inner'}>
                {/* <button
              className={tabsData ? "amount-dtata-tab active" : 'amount-data-tab'}
              onClick={handleAmount}
            >
              Amount
            </button> */}
                <button className={tabsData ? "count-data active" : "count-data"} onClick={handleCount}>
                  COUNT
                </button>
              </div>
              {/* {tabsData ?
            <div className='Countprogress'>
              <div>
                <h5 className='dotapprove'>Approve</h5>
                <span>{transrespo?.APPROVE?.count}</span><span className='countinner'>{transrespo?.APPROVE?.percentage}</span></div>
              <ProgressBar className="progressbar-email"
                completed={transrespo && transrespo.APPROVE && transrespo.APPROVE && transrespo?.APPROVE?.percentage !== undefined ? transrespo.APPROVE.percentage.substring(0, 2) : null}
                isLabelVisible={false} bgColor='rgb(96, 189, 178)' />
              <div> <h5 className='dotreview'>REVIEW</h5>
                <span>{transrespo?.REVIEW?.count}</span><span className='countinner'>{transrespo?.REVIEW?.percentage}</span> </div>
              <ProgressBar className="progressbar-email" completed={transrespo && transrespo.REVIEW && transrespo.REVIEW && transrespo.REVIEW.percentage !== undefined ? transrespo.REVIEW.percentage.substring(0, 2) : null} isLabelVisible={false} bgColor='rgb(232, 209, 114)' />
              <div> <h5 className='dotdecline'>DECLINE</h5>
                <span>{transrespo?.DECLINE?.count}</span><span className='countinner'>{transrespo?.DECLINE?.percentage}</span>  </div>
              <ProgressBar className="progressbar-email" completed={transrespo && transrespo.DECLINE && transrespo.DECLINE && transrespo.DECLINE.percentage !== undefined ? transrespo.DECLINE.percentage.substring(0, 2) : null} isLabelVisible={false} bgColor='rgb(231, 99, 95)' />
            </div> : null} */}
              {tabsData ?
                <div className='Countprogress'>
                  <div >
                    <h5 className='dotapprove'>Approve</h5>
                    <span>{transrespo?.APPROVE?.count}</span><span className='countinner'>{transrespo?.APPROVE?.percentage}</span></div>
                  <ProgressBar className="progressbar-email"
                    completed={transrespo && transrespo.APPROVE && transrespo.APPROVE && transrespo?.APPROVE?.percentage !== undefined ? transrespo.APPROVE.percentage.substring(0, 2) : null}

                    isLabelVisible={false} bgColor='rgb(96, 189, 178)' />
                  <div> <h5 className='dotreview'>REVIEW</h5>
                    <span>{transrespo?.REVIEW?.count}</span><span className='countinner'>{transrespo?.REVIEW?.percentage}</span> </div>
                  <ProgressBar className="progressbar-email" completed={transrespo && transrespo.REVIEW && transrespo.REVIEW && transrespo.REVIEW.percentage !== undefined ? transrespo.REVIEW.percentage.substring(0, 2) : null} maxCompleted={100} isLabelVisible={false} bgColor='rgb(232, 209, 114)' />
                  <div> <h5 className='dotdecline'>DECLINE</h5>
                    <span>{transrespo?.DECLINE?.count}</span><span className='countinner'>{transrespo?.DECLINE?.percentage}</span>  </div>
                  <ProgressBar className="progressbar-email" completed={transrespo && transrespo.DECLINE && transrespo.DECLINE && transrespo.DECLINE.percentage !== undefined ? transrespo.DECLINE.percentage.substring(0, 2) : null} maxCompleted={100} isLabelVisible={false} bgColor='rgb(231, 99, 95)' />
                </div> : null}
            </div>
          </div>}
      </section>

      <section>
        <div className='refresh' >
          <h1>Transaction labels</h1><FiRefreshCw onClick={Refreshtranslable} /></div>
        <div className='fiterwrap'>
          <Filter value="translab" handleApplyFunc={handleApplyFunc} handelResetFun={handelResetFun} />
        </div>
        {appliedtranslabstartdate && appliedtranslabenddate !== "All" || appliedtranslabactiontype !== "All" || appliedtranslabcountry !== "All" ?
          <div className='applied-filter-main'>
            {appliedtranslabstartdate && appliedtranslabenddate !== "All" ?
              <div className='Date-Last'>
                {appliedtranslabstartdate == "All" ? "" : `Date:${appliedtranslabstartdate}`}-{appliedtranslabenddate == "All" ? "" : appliedtranslabenddate}
              </div> : null}
            {appliedtranslabactiontype !== "All" ?
              <div className='Date-Last'>
                {appliedtranslabactiontype == "All" ? "" : `Action type:${appliedtranslabactiontype}`}
              </div> : null}
            {appliedtranslabcountry !== "All" ?
              <div className='Date-Last'>
                {appliedtranslabcountry == "All" ? "" : `User country:${appliedtranslabcountry}`}
              </div> : null}
          </div>
          : <div className='Date-Last'>Date:Last 30 days</div>}
        {loading2 ? <ShimmerThumbnail /> :
          <div className='trans-wrap'>
            <div className='Transaction-wrap'>
              <ResponsiveContainer width={1100} height={200}>
                <LineChart width={600} height={300} data={approve} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {lablecolor ? <Line type="monotone" dataKey="Markedasapprove" stroke="rgb(96, 189, 178)" name="Approve" /> : <Line type="monotone" dataKey="markedasdecline" stroke="rgb(231, 99, 95)" name="Decline" />}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className='marked-box'>
              <div className={addClass ? "select-clicked" : "select"} onClick={hadleAddClass} >
                <label></label>
                <select defaultChecked={setDefaultvalues} onChange={(e) => handleChange(e.target.value)}>
                  <option value="Markapprove">Label: Marked as approve  </option>
                  <option value="Markdecline">Label: Marked as decline</option>
                </select>
              </div>
              <h5>Total number of transactions</h5><span>{data2?.totalMarkedAsApprove ? data2?.totalMarkedAsApprove : data2?.totalMarkedAsDecline}</span>
            </div>

          </div>}
      </section>

      <section class="AppliedRulesStatistics dashboard-rules">
        <div className='refresh' >
          <h1>Applied Rules Statistics</h1><FiRefreshCw onClick={RefresRule} />
        </div>
        <div className='fiterwrap'>
          <Filter value="apliedRule" handleApplyFunc={handleApplyFunc} handelResetFun={handelResetFun} />
        </div>
        {appliedruledstartdate && appliedruleenddate !== "All" || appliedruledactiontype !== "All" || appliedrulecountry !== "All" ?
          <div className='applied-filter-main'>
            {appliedruledstartdate && appliedruleenddate !== "All" ?
              <div className='Date-Last'>
                {appliedruledstartdate == "All" ? " " : `Date:${appliedruledstartdate}`}-{appliedruleenddate == "All" ? "" : appliedruleenddate}
              </div> : null}
            {appliedruledactiontype !== "All" ?
              <div className='Date-Last'>
                {appliedruledactiontype == "All" ? "" : `Action type:${appliedruledactiontype}`}
              </div> : null}
            {appliedrulecountry !== "All" ?
              <div className='Date-Last'>
                {appliedrulecountry == "All" ? "" : `User country:${appliedrulecountry}`}
              </div> : null}

          </div>
          : <div className='Date-Last'>Date:Last 30 days</div>}
        {loading3 ? <ShimmerThumbnail /> :

          <MUIDataTable columns={columns} options={options} data={transtable} />}
      </section>

      <section>
        <div className='refresh' >
          <h1>State Threshold</h1><FiRefreshCw onClick={Refreshthres} />
        </div>
        <div className='fiterwrap'>
          <Filter value="stateold" handleApplyFunc={handleApplyFunc} handelResetFun={handelResetFun} />
        </div>
        {appliedthreshstartdate && appliedthreshenddate !== "All" || appliedthreshactiontype !== "All" || appliedthreshcountry !== "All" ?
          <div className='applied-filter-main'>
            {appliedthreshstartdate && appliedthreshenddate !== "All" ?
              <div className='Date-Last'>
                {appliedthreshstartdate == "All" ? "" : `Date:${appliedthreshstartdate}`}-{appliedthreshenddate == "All" ? "" : appliedthreshenddate}
              </div> : null}
            {appliedthreshactiontype !== "All" ?
              <div className='Date-Last'>
                {appliedthreshactiontype == "All" ? "" : `Action type:${appliedthreshactiontype}`}
              </div> : null}
            {appliedthreshcountry !== "All" ?
              <div className='Date-Last'>
                {appliedthreshcountry == "All" ? "" : `User country:${appliedthreshcountry}`}
              </div> : null}
          </div>

          : <div className='Date-Last'>Date:Last 30 days</div>}
        {loading4 ? <ShimmerThumbnail />
          : <div className='statethreshold'>
            <div>
              <ResponsiveContainer width={1550} height={250}>
                <LineChart width={600} height={300} data={threshold} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="fraud_score" />
                  <YAxis dataKey="fraud_score" />
                  <Tooltip />
                  <Line type="monotone" dataKey="approve" stroke="rgb(96, 189, 178)" name="Totaltransaction" />
                  {/* <Line type="monotone" dataKey="fraud_score" stroke="rgb(96, 189, 178)" name="score" /> */}
                  <Line type="monotone" dataKey="decline" stroke="rgb(231, 99, 95)" name="Totaltransaction" />
                  {/* <Line type="monotone" dataKey="fraud_score" stroke="rgb(231, 99, 95)" name="score" /> */}
                  <Line type="monotone" dataKey="review" stroke="rgb(232, 209, 114)" name="Totaltransaction" />
                  {/* <Line type="monotone" dataKey="fraud_score" stroke="rgb(232, 209, 114)" name="score" /> */}

                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* <div className='marked-box'>
            <h5>Total number of transactions</h5>
            <span>{data1}</span>
          </div> */}
          </div>}

      </section>

    </div>

  )
}

export default TransDashboardSections