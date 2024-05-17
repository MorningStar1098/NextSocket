import axios from 'axios';
import React, { useEffect, useState,useMemo } from 'react'
import { LIVE_URL } from '../../Hooks/envConst'

import dynamic from 'next/dynamic'
import { BarChart, Bar,Cell,Text } from 'recharts';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {} from "recharts";
import Cookies from 'js-cookie';

const DonutChart = dynamic(import('react-donut-chart'), { ssr: false })
function Statics() {
  let base64Email = Cookies.get('email')
  const email=atob(base64Email);
  let eml = Cookies.get('issup')
  let ApiUrl1;
  let ApiUrl2;
  let ApiUrl3;
  let ApiUrl4;
  let ApiUrl5;
  let ApiUrl6;
  useEffect(() => {
     ApiUrl1=eml=="0"?`${LIVE_URL}/api/v1/getallcounts?isSup=${eml}`:`${LIVE_URL}/api/v1/getallcounts?isSup=${eml}&email=${email}`
     ApiUrl2=eml=="0"?`${LIVE_URL}/api/v1/getallcountData?isSup=${eml}`:`${LIVE_URL}/api/v1/getallcountData?isSup=${eml}&email=${email}`
     ApiUrl3=eml=="0"?`${LIVE_URL}/api/v1/getcounts/allstatus?isSup=${eml}`:`${LIVE_URL}/api/v1/getcounts/allstatus?isSup=${eml}&email=${email}`
     ApiUrl4=eml=="0"?`${LIVE_URL}/api/v1/getdateVerification?isSup=${eml}`:`${LIVE_URL}/api/v1/getdateVerification?isSup=${eml}&email=${email}`
     ApiUrl5=eml=="0"?`${LIVE_URL}/api/v1/getverificationPlatform?isSup=${eml}`:`${LIVE_URL}/api/v1/getverificationPlatform?isSup=${eml}&email=${email}`
     ApiUrl6=eml=="0"?`${LIVE_URL}/api/v1/getVerificationbasedontime?isSup=${eml}`:`${LIVE_URL}/api/v1/getVerificationbasedontime?isSup=${eml}&email=${email}`
    handleGetCount();
  }, [])
  


  let data = [{ name: "Doc Error", pv: 2 }, { name: 'validity', pv: 4 },  { name: 'AML Data', pv: 1 },
  { name: 'similarity', pv: 2 }, { name: 'Quality', pv: 3 }];

  
  const BAR_AXIS_SPACE = 10;


  const YAxisLeftTick = ({ y, payload: { value } }) => {
    return (
      <Text x={0} y={y}  verticalAnchor="middle">
        {value}
      </Text>
    );
  };
  let ctx;
   const measureText14HelveticaNeue = (text) => {
    if (!ctx) {
      ctx = document.createElement("canvas").getContext("2d");
      ctx.font = "14px 'Helvetica Neue";
    }
  
    return ctx.measureText(text).width;
  };

  const SimpleBarChart = ({ data, yKey, xKey }) => {
    const maxTextWidth = useMemo(
      () =>
        data.reduce((acc, cur) => {
          const value = cur[yKey];
          const width = measureText14HelveticaNeue(value.toLocaleString());
          if (width > acc) {
            return width;
          }
          return acc;
        }, 0),
      [data, yKey]
    );
  
    return (
      <ResponsiveContainer width={"100%"} height={50 * data.length} debounce={50}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
        >
          <XAxis hide axisLine={false} type="number" />
          <YAxis
            yAxisId={0}
            dataKey={xKey}
            type="category"
            axisLine={false}
            tickLine={false}
            tick={YAxisLeftTick}
          />
          <YAxis
            orientation="right"
            yAxisId={1}
            dataKey={yKey}
            type="category"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value.toLocaleString()}
            mirror
            tick={{
              transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
            }}
          />
          <Bar dataKey={yKey} minPointSize={2} barSize={32}>
            {data?.map((d, idx) => {
              return <Cell key={d[xKey]} fill={"#f6cf79"} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };
  const [getCounts, setGetCounts] = useState([])
  const [getByCountry, setGetByCountry] = useState([])
  const [getBreakdown, setGetBreakdown] = useState([])
  const [getVerifDate, setVerifdate] = useState([])
  const [getVerifPlatform, setVerifPlatform] = useState([])
  const [getVerifOnTime, setVerifOnTime] = useState([])

  
  async function handleGetCount() {
    await axios.get(ApiUrl1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then((response) => {
      if (response.status == 200) {
        let countData = response && response.data !== undefined ? response.data : null
        setGetCounts(countData)
         handleVerifCountry()
      }
    })
  }
  async function handleVerifCountry() {
    await axios.get(ApiUrl2, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then((response) => {
      let verifCountry = response && response.data && response.data.data !== undefined ? response.data.data : null
      setGetByCountry(verifCountry)
       handleStatusBreakdown()
    })
  }
  async function handleStatusBreakdown() {
    await axios.get(ApiUrl3, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then((resp) => {
      let breakdown = resp && resp.data !== undefined ? resp.data : null
      setGetBreakdown(breakdown)
      handleVerificationResilts()
    })
  }
  async function handleVerificationResilts() {
    await axios.get(ApiUrl4, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then((resp) => {
      let verifResult = resp && resp.data && resp.data.data !== undefined ? resp.data.data : null
      setVerifdate(verifResult)
      handleVerifPlatform()

    }).catch((err)=>{
      console.log(err);
    })
  }
  async function handleVerifPlatform() {
    await axios.get(ApiUrl5, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then((resp) => {
      let verifResultPlatform = resp && resp.data && resp.data.data !== undefined ? resp.data.data : null
      setVerifPlatform(verifResultPlatform)
      handleVerifOnTime()
    })
  }
  async function handleVerifOnTime() {
    await axios.get(ApiUrl6, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then((resp) => {
      let verifResultOnTime = resp && resp.data && resp.data.data !== undefined ? resp.data.data : null
      setVerifOnTime(verifResultOnTime)
     
    })
  }
  return (
    <div className='static-section-main'>
      <div className='statics-header-section'>
        <span className='statics-text'>Statistics</span>
      </div>
      <div className='statics-graphs-data-main'>
        <div className='statics-graphs-left-main'>
          <div className='verified-application-duration-main'>
            <div className='verified-application cardBlock'>
              <h2>Verified Applications</h2>
              <p>A number of applications created and verified for the selected period.</p>
              <span className='overall-percentage'>{getCounts.count}</span>
            </div>
            <div className='duration-overall cardBlock'>
              <h2>Verification duration 5 min (overall)</h2>
              <p>The total share of applications that were verified within 5 minutes after creation.</p>
              <span className='overall-percentage'>0%</span>
            </div>
          </div>
          <div className='statics-piecharts-main cardBlock'>
            <h2>Verification statuses breakdown</h2>
            <p>Shares of verification results for the selected period.</p>
            <div className='pie-chart'>

              <div className="garphBlock">
                <div className="svgGraph">
                  <h4>Verification results (current)</h4>
                  <DonutChart
                    data={[
                      {
                        label: 'Passed',
                        value: getBreakdown.passdata,
                        className: "pased-section",
                        outerRadius: 0.90,
                        height: 500,
                        width: 500,

                      },
                      {
                        label: 'Rejected',
                        value: getBreakdown.rejdata,
                        emptyColor: "#e0e0e0",
                        className: "rejected-section",
                        outerRadius: 0.90
                      },
                      {
                        label: 'Warning',
                        value: getBreakdown.warndata,
                        emptyColor: '#e0e0e0',
                        className: "warning-section",
                        outerRadius: 0.90
                      },
                    ]}
                  />
                </div>

                <div className="svgGraph">
                  <h4>Verification results (current)</h4>
                  <DonutChart
                    data={[
                      {
                        label: 'Passed',
                        value: getBreakdown.passdata,
                        className: "pased-section",
                        outerRadius: 0.90,
                        height: 500,
                        width: 500,

                      },
                      {
                        label: 'Rejected',
                        value: getBreakdown.rejdata,
                        emptyColor: "#e0e0e0",
                        className: "rejected-section",
                        outerRadius: 0.90
                      },
                      {
                        label: 'Warning',
                        value: getBreakdown.warndata,
                        emptyColor: '#e0e0e0',
                        className: "warning-section",
                        outerRadius: 0.90
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='verifcation-results-chart-main cardBlock'>
            <h2>Verifications results</h2>
            <p>Dynamics of created applications for the chosen period and their resolutions breakdown.<br />
              (Ipass) — resolution after Ipass processing.<br />
              * - resolution after manual modifications on a client side.
            </p>
            <div className='stackedbar-chart'>
            <ResponsiveContainer width={850}height={600}>
              <BarChart
                data={getVerifDate}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 36,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top"  iconType="circle" />
                <Bar dataKey="accepted" stackId="a" fill="rgb(133, 224, 191)" />
                <Bar dataKey="rejected" stackId="a" fill="rgb(248, 133, 133)" />
              </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className='statics-graphs-right-main'>
          <div className='verification-countries-main cardBlock'>
            <h2>Verifications by countries and ID document types</h2>
            <p>Top countries and ID document types used in applications.</p>
            <div className='countries-table-main'>
              <table border="0">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>All</th>
                    <th>Share</th>
                    <th>Passport</th>
                    <th>ID card</th>
                    <th>Residence permit</th>
                    <th>DL</th>
                  </tr>
                </thead>
                <tbody>
                  {getByCountry?.map((country) => {
                    return (
                      <>
                        <tr>
                          <td>{country.name}</td>
                          <td>{country.all}</td>
                          <td>{country.share}%</td>
                          <td>{country.passport}</td>
                          <td>{country.IdCard}</td>
                          <td>0</td>
                          <td>{country.DL}</td>
                        </tr>
                      </>
                    )

                  })}


                </tbody>
              </table>
            </div>
          </div>
          <div className='scatter-duration-chart cardBlock'>
            <h2>Verification duration 5 min (dynamics)</h2>
            <p>Dynamics of applications proportion that were processed by GetID during 5 minutes after creation.</p>
            <ScatterChart width={1000} height={500}
              margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
              <YAxis dataKey="withinTime" unit="%" />

              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              {/* <Legend /> */}
              <Scatter data={getVerifOnTime} fill="#8884d8" />
            </ScatterChart>

          </div>
          <div className='reason-horizontal-chart cardBlock'>
          <h2>Application creation sources</h2>
            <p>Dynamics of created and verified applications with a breakdown of their sources.
            </p>
            <div className='application-creation-stackedbar-chart'>
            <ResponsiveContainer width={850} height={600}>
              <BarChart
                width={1000}
                height={500}
                data={getVerifPlatform}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 36,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="web" stackId="a" fill="rgb(179, 145, 235)" />
                {/* <Bar dataKey="rejeced" stackId="a" fill="rgb(133, 224, 191)" /> */}
              </BarChart>
              </ResponsiveContainer>
            </div>
            {/* <h2>Reasons that led to  Rejected.</h2>
            <p>Verification findings that caused unapproved statuses of applications and their frequency.</p>
            <SimpleBarChart data={data} xKey="name" yKey="pv" /> */}
            {/* <ChartComponent
              primaryXAxis={{
                valueType: "Category",
              }}
              primaryYAxis={{
              }}
            >
              <Inject services={[BarSeries, Category]} />
              <SeriesCollectionDirective>
                <SeriesDirective dataSource={data} xName='x' yName='y' type='Bar'>
                </SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Statics
