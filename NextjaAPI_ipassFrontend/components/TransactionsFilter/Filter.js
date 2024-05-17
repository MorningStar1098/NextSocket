/* eslint-disable */
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { RiEqualizerLine } from 'react-icons/ri';
import { DateRangePicker, createStaticRanges } from 'react-date-range'
import moment from 'moment/moment';
import { addDays, endOfDay, startOfDay,subYears} from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { useRouter } from 'next/router';
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst';
import Cookies from 'js-cookie';

function Filter(props) {
  const router = useRouter()

  const { handleApplyFunc, handelResetFun, value } = props
  let SessDates, sessEndDate
  if (typeof window !== "undefined") {
    SessDates = sessionStorage.getItem("selectedStartDate")
    sessEndDate = sessionStorage.getItem("selectedEndDate")
  }
  else {
    SessDates = null; sessEndDate = null;
  }
  const [filters, setFilters] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = () => { setOpen(true) }

  const [currentStartDate, setCurrentStartDate] = useState();
  const [currentEndDate, setCurrentEndDate] = useState();
  const [actiontype, setActionType] = useState();
  const [countrytype, setCountrytype] = useState()
  // const [currency, setCurrency] = useState()
  const [emailState, setEmailState] = useState('')
  const [fillCountry,setFillCountry]=useState()

  useEffect(()=>{
    let emla = Cookies.get('email')
    let eml
    if (emla !== undefined) {
      eml = atob(emla)
      setEmailState(eml)
    }
    handleGetCountries() 
  },[emailState])

  function handleGetCountries() {
    const body={
      "user_email":emailState
    }
    axios.post(`${LIVE_URL}/api/v1/ipass/get/email/country`,body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },

    }).then((response)=>{
      const allData=response?.data?.data
      setFillCountry(allData)
      // console.log("log",response);
    })
  }

  let date = [];
  date.push(currentStartDate==undefined?"":currentStartDate, currentEndDate==undefined?"":currentEndDate)

  const handleOnFilterApply = async () => {
    if (value === "worlmap") {
      sessionStorage.setItem("selectedStartDate", currentStartDate==undefined?"All":currentStartDate);
      sessionStorage.setItem("selectedEndDate", currentEndDate==undefined?"All":currentEndDate);
      sessionStorage.setItem("selectedActiontype", actiontype==undefined?"All":actiontype);
      sessionStorage.setItem("selectedCountrytype", countrytype==undefined?"All":countrytype);
      // sessionStorage.setItem("selectedCurrency", currency==undefined?"All":currency);

      await handleApplyFunc({ date,actiontype,countrytype, value })
    }
    if (value === "trans") {
      sessionStorage.setItem("selectedStartDate", currentStartDate==undefined?"All":currentStartDate);
      sessionStorage.setItem("selectedEndDate", currentEndDate==undefined?"All":currentEndDate);
      sessionStorage.setItem("selectedActiontype", actiontype==undefined?"All":actiontype);
      sessionStorage.setItem("selectedCountrytype", countrytype==undefined?"All":countrytype);
      // sessionStorage.setItem("selectedCurrency", currency==undefined?"All":currency);

      await handleApplyFunc({ date,actiontype,countrytype, value })
    }
    if (value === "translab") {
      sessionStorage.setItem("selectedStartDate", currentStartDate==undefined?"All":currentStartDate);
      sessionStorage.setItem("selectedEndDate", currentEndDate==undefined?"All":currentEndDate);
      sessionStorage.setItem("selectedActiontype", actiontype==undefined?"All":actiontype);
      sessionStorage.setItem("selectedCountrytype", countrytype==undefined?"All":countrytype);
      // sessionStorage.setItem("selectedCurrency", currency==undefined?"All":currency);

      await handleApplyFunc({ date,actiontype,countrytype, value })
    }
    if (value === "apliedRule") {
      sessionStorage.setItem("selectedStartDate", currentStartDate==undefined?"All":currentStartDate);
      sessionStorage.setItem("selectedEndDate", currentEndDate==undefined?"All":currentEndDate);
      sessionStorage.setItem("selectedActiontype", actiontype==undefined?"All":actiontype);
      sessionStorage.setItem("selectedCountrytype", countrytype==undefined?"All":countrytype);
      // sessionStorage.setItem("selectedCurrency", currency==undefined?"All":currency);

      await handleApplyFunc({ date,actiontype,countrytype, value })
    }
    if (value === "stateold") {
      sessionStorage.setItem("selectedStartDate", currentStartDate==undefined?"All":currentStartDate);
      sessionStorage.setItem("selectedEndDate", currentEndDate==undefined?"All":currentEndDate);
      sessionStorage.setItem("selectedActiontype", actiontype==undefined?"All":actiontype);
      sessionStorage.setItem("selectedCountrytype", countrytype==undefined?"All":countrytype);
      // sessionStorage.setItem("selectedCurrency", currency==undefined?"All":currency);

      await handleApplyFunc({ date,actiontype,countrytype, value })
    }
    router.push(window.location, null, { shallow: true })

    setFilters(false)
  }

  const handleOnFilterRemove = async () => {
    if (value === "worlmap") {
      await sessionStorage.setItem("selectedStartDate", "All");
      await sessionStorage.setItem("selectedEndDate", "All");
      await sessionStorage.setItem("selectedActiontype", "All");
      await sessionStorage.setItem("selectedCountrytype", "All");
      // await sessionStorage.setItem("selectedCurrency", "All");

      setCurrentStartDate()
      setCurrentEndDate()
      setActionType()
      setCountrytype()
      // setCurrency()

      handelResetFun(value)
    }
    if (value === "trans") {
      await sessionStorage.setItem("selectedStartDate", "All");
      await sessionStorage.setItem("selectedEndDate", "All");
      await sessionStorage.setItem("selectedActiontype", "All");
      await sessionStorage.setItem("selectedCountrytype", "All");
      // await sessionStorage.setItem("selectedCurrency", "All");

      setCurrentStartDate()
      setCurrentEndDate()
      setActionType()
      setCountrytype()
      // setCurrency()

      handelResetFun(value)
    }
    if (value === "translab") {
      await sessionStorage.setItem("selectedStartDate", "All");
      await sessionStorage.setItem("selectedEndDate", "All");
      await sessionStorage.setItem("selectedActiontype", "All");
      await sessionStorage.setItem("selectedCountrytype", "All");
      // await sessionStorage.setItem("selectedCurrency", "All");

      setCurrentStartDate()
      setCurrentEndDate()
      setActionType()
      setCountrytype()
      // setCurrency()

      handelResetFun(value)
    }
    if (value === "apliedRule") {
      await sessionStorage.setItem("selectedStartDate", "All");
      await sessionStorage.setItem("selectedEndDate", "All");
      await sessionStorage.setItem("selectedActiontype", "All");
      await sessionStorage.setItem("selectedCountrytype", "All");
      // await sessionStorage.setItem("selectedCurrency", "All");

      setCurrentStartDate()
      setCurrentEndDate()
      setActionType()
      setCountrytype()
      // setCurrency()

      handelResetFun(value)
    }
    if (value === "stateold") {
      await sessionStorage.setItem("selectedStartDate", "All");
      await sessionStorage.setItem("selectedEndDate", "All");
      await sessionStorage.setItem("selectedActiontype", "All");
      await sessionStorage.setItem("selectedCountrytype", "All");
      // await sessionStorage.setItem("selectedCurrency", "All");

      setCurrentStartDate()
      setCurrentEndDate()
      setActionType()
      setCountrytype()
      // setCurrency()

      handelResetFun(value)
    }

    setFilters(false)
  }

  function handelFilters() {
    setFilters(!filters)
  }

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  ])
  // console.log("state",state);

  const onClickClear = () => {
    setState([{
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },])
    setCurrentStartDate()
    setCurrentEndDate()
    setOpen(false)
  };

  const onClickDone = () => {
    let startDate = moment(state[0]?.startDate).format("YYYY-MM-DD");
    let endDate = moment(state[0].endDate).format("YYYY-MM-DD");
    setCurrentStartDate(startDate)
    setCurrentEndDate(endDate)
    setOpen(false)
  }

  const closeDate = () => {
    setOpen(false)
  }
//   const today = new Date();
// // Get current year
// const year = today.getFullYear()
  // console.log("dd",currentStartDate);

  return (
    <div>
      <div>
        <div className='sidefilter' onClick={handelFilters}>
        <span className='RiEqualizerLine'><RiEqualizerLine /></span>{filters == true ? "Hide Filter" : "Open Filter"}
        </div>
      </div>

      <> {filters
        ? <div className='slidefilter-popup-main'>
          <div className='slidefilter-popup-inner'>
            <div className='slidedate-filter'>
              <div className='date-filter-main'>
                <div  className='date-filter-startdate'>
                  <div className='date-selectdiv'>
                  {currentStartDate&&currentStartDate !== "All"?
                    <div onClick={toggle} >{`Date:${currentStartDate==undefined?"":currentStartDate}  -  ${currentEndDate==undefined?"":currentEndDate}`}</div>:
                    SessDates&&SessDates!==null&&SessDates!=="All"?
                    <div onClick={toggle}>{`Date:${SessDates} - ${sessEndDate}`}</div>:
                    <div onClick={toggle} >{`Last 30 days`}</div>
                  }

                    {open ?
                      // <OutsideClickHandler  onOutsideClick={closeDate}>
                      <div className="datePickerBlockA">
                        <OutsideClickHandler onOutsideClick={closeDate}>
                          <DateRangePicker
                            onChange={(item) => { setState([item.range1]) }}
                            showSelectionPreview={true}
                            showDateDisplay={true}
                            months={2}
                            color="f6be00"
                            ranges={state}
                            direction="horizontal"
                            staticRanges={createStaticRanges([
                                {
                                  label: 'Last 1 day',
                                  range: () => ({
                                    startDate: startOfDay(new Date()),
                                    endDate: endOfDay(new Date()),
                                  }),
                                },
                                {
                                  label: 'Last 7 Days',
                                  range: () => ({
                                    startDate: startOfDay(addDays(new Date(), -7)),
                                    endDate: endOfDay(new Date()),
                                  }),
                                },
                                {
                                  label: 'Last 30 Days',
                                  range: () => ({
                                    startDate: startOfDay(addDays(new Date(), -30)),
                                    endDate: endOfDay(new Date()),
                                  
                                  }),
                                },
                                {
                                  label: 'Month',
                                  range: () => ({
                                    startDate:startOfDay(addDays(new Date(), -31)),
                                    endDate:  endOfDay(new Date()),
                                  
                                  }),
                                },
                                {
                                  label:'Year',
                                  range:()=>({
                                    startDate:subYears(new Date(), 1),
                                    endDate:  new Date(),
                                  })
                                }
                              ])}
                            inputRanges={[]}
                          />
                          <div className="setDateBtn text-right position-relative rdr-buttons-position mt-2 mr-3">
                            <button
                              className="cancel_ btn btn-transparent text-danger rounded-0 px-4"
                              onClick={onClickClear}
                            >
                              Cancel
                            </button>
                            <button
                              className="setDate_ btn btn-transparent text-primary rounded-0 px-4 mr-2"
                              onClick={onClickDone}
                            >
                              Set Date
                            </button>

                          </div>
                        </OutsideClickHandler>
                      </div>
                      : null}
                  </div>
                </div>
                <div className='date-filter-startdate'>
                  <select
                    className='date-selectdiv'
                    id='seloption1'
                    value={actiontype}
                    onChange={(e) => setActionType(e.target.value)}
                    
                  >
                    <option>All</option>
                    <option>ACCOUNT_LOGIN</option>
                    <option>ACCOUNT_REGISTER</option>
                    <option>PAYMENT</option>
                    <option>WITHDRAWL</option>
                    {/* <option>withdrawal</option> */}
                  </select>
                </div>
              </div>
            </div>
            <div className='status-country-filter'>
              <div className='status-filter'>
                <select
                  className='date-selectdiv'
                  id='seloption1'
                  value={countrytype}
                  onChange={(e) => setCountrytype(e.target.value)}
                  
                >
                 <option>All</option>
                {fillCountry?.map((country)=>{
                  return(
                    <option>{country?.name}</option>
                  )
                })}
                </select>
              </div>
            </div>
          </div>
          <div className='apply-reset-btnt'>
            <div className='reset-btn-mainn'>
              <button onClick={handleOnFilterRemove}>Reset Filters</button>
            </div>&nbsp;&nbsp;
            <div className='apply-btn-mainn'>
              <button onClick={handleOnFilterApply}>Apply Filters</button>
            </div>
          </div>
        </div>
        : null}
      </>

    </div>
  )
}

export default Filter