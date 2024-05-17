/* eslint-disable */
import { TableContainer } from '@material-ui/core'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { ShimmerThumbnail } from 'react-shimmer-effects'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, } from 'recharts';
import { LIVE_URL } from '../../Hooks/envConst';
import Filter from "../TransactionsFilter/Filter"
import Cookies from 'js-cookie'

function ScoreDashboard() {
  const [emailState, setEmailState] = useState('')
  useEffect(() => {
    let emla = Cookies.get('email')
    let eml
    if (emla !== undefined) {
      eml = atob(emla)
      setEmailState(eml)
    }
    AppliedRuleFun()
  }, [emailState])
  const [appliedruledate, setAppliedRuleDate] = useState("All")
  const [appliedcountry, setAppliedCountry] = useState()
  const [loading3, setLoading3] = useState(false)
  const [rulename, setRulename] = useState()
  const [transtable, setTranstable] = useState([]);
  const [ruledate, setRuleDate] = useState(null)

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
                  <Line type="monotone" dataKey="ruleCount" stroke="rgb(96, 189, 178)" name="Totaltransaction" />
                </LineChart>
              </ResponsiveContainer>
            </TableContainer>
          </td>
        </tr>
      );
    },
  };
  function apliedRulename(rowData,) {
    // console.log(date);
    axios.get(`${LIVE_URL}/api/v1/ipass/get/aplideRules_Linchart?user_email=${emailState}&actionType=${ruledate?.actiontype ? ruledate?.actiontype : ""}&startDate=${ruledate?.date ? ruledate?.date[0] : ""}&endDate=${ruledate?.date ? ruledate?.date[1] : ""}&country=${ruledate?.countrytype && ruledate?.countrytype !== undefined && "All" ? ruledate?.countrytype : ""}&ruleName=${rowData}`)
      .then((res) => {
        setRulename(res.data.rules);
      })
  }
  async function handleApplyFunc(props) {
    if (props.value == "apliedRule") {
      let sessionStartDate = sessionStorage.getItem("selectedStartDate");
      await !isEmpty(sessionStartDate) && setAppliedRuleDate(sessionStartDate);
      AppliedRuleFun(props)
      setRuleDate(props.currentEndDate)
    }
  }
  async function handelResetFun(value) {
    if (value === "apliedRule") {
      let sessionStartDate = await sessionStorage.getItem("selectedStartDate");
      !isEmpty(sessionStartDate) && setAppliedRuleDate(sessionStartDate);
      AppliedRuleFun()
      setRuleDate()
    }
  }
  function AppliedRuleFun(propsDate) {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/applied_rules?user_email=${emailState}&actionType=${propsDate?.actiontype !== undefined && "All" ? propsDate?.actiontype : ""}&startDate=${propsDate?.date && propsDate?.date[0] !== "All" ? propsDate?.date[0] : ""}&endDate=${propsDate?.date && propsDate?.date[1] !== "All" ? propsDate?.date[1] : ""}&country=${propsDate?.countrytype && propsDate?.countrytype !== undefined && "All" ? propsDate?.countrytype : ""}`).then((res) => {
      const roles = res.data?.nameCountPairs?.map((i) => { return i })
      setTranstable(roles);
    })
  }
  function RefresRule() {
    setLoading3(true)
    setTimeout(() => {
      setAppliedRuleDate()
      AppliedRuleFun()
      setLoading3(false)
    }, 1000)
  }
  return (
    <div>
      <section className='dashboard-rules'>
        <div className='refresh' >
          <h1>Applied Rules Statistics</h1><FiRefreshCw onClick={RefresRule} /></div>
        <div className='fiterwrap'>
          <Filter value="apliedRule" handleApplyFunc={handleApplyFunc} handelResetFun={handelResetFun} />
        </div>
        {appliedruledate && appliedruledate !== "All" ?
          <div className='Date-Last'>{appliedruledate == "All" ? null : appliedruledate}&nbsp;{appliedcountry == "All" ? null : appliedcountry}</div> :
          <div className='Date-Last'>Date:Last 30 days</div>}
        {loading3 ? <ShimmerThumbnail /> :
          <MUIDataTable columns={columns} options={options} data={transtable} />}
      </section>
    </div>
  )
}

export default ScoreDashboard