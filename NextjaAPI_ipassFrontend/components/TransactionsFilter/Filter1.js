/* eslint-disable */
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { DateRangePicker, createStaticRanges } from 'react-date-range'
import moment from 'moment/moment';
import { addDays, endOfDay, startOfDay } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { useRouter } from 'next/router';
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst';
import Cookies from 'js-cookie';

function Filter(props) {
  const router = useRouter()

  const { handletransfilApp, handletransfilRest, value,filters, setFilters,open,setOpen } = props
  let SessDates, sessEndDate
  if (typeof window !== "undefined") {
    SessDates = sessionStorage.getItem("selectedStartDate")
    sessEndDate = sessionStorage.getItem("selectedEndDate")
  }
  else {
    SessDates = null; sessEndDate = null;
  }
  
  
  const toggle = () => { setOpen(true) }

  const [currentStartDate, setCurrentStartDate] = useState();
  const [currentEndDate, setCurrentEndDate] = useState();
  const [actiontype, setActionType] = useState();
  const [countrytype, setCountrytype] = useState()
  // const [currency, setCurrency] = useState("All")
  const [emailState, setEmailState] = useState('')
  const [fillCountry,setFillCountry]=useState()
  useEffect(()=>{
    let emla = Cookies.get('email')
    let eml
    if (emla !== undefined) {
      eml = atob(emla)
      setEmailState(eml)
      handleGetCountries() 
    }
  },[emailState])
  // console.log("e",emailState);

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

  const handleTransFilterApply = async () => {
    if (value === "transaction-filter") {
      sessionStorage.setItem("selectedStartDate", currentStartDate==undefined?"All":currentStartDate);
      sessionStorage.setItem("selectedEndDate", currentEndDate==undefined?"All":currentEndDate);
      sessionStorage.setItem("selectedActiontype", actiontype==undefined?"All":actiontype);
      sessionStorage.setItem("selectedCountrytype", countrytype==undefined?"All":countrytype);
      // sessionStorage.setItem("selectedCurrency", currency==undefined?"All":currency);
      
      await handletransfilApp({ date,actiontype,countrytype, value })
    }
  
    router.push(window.location, null, { shallow: true })

    setFilters(false)
  }

  const handleTransFilterRemove = async () => {
    if (value === "transaction-filter") {
      setCurrentStartDate()
      setCurrentEndDate()
      setActionType()
      setCountrytype()

      handletransfilRest(value)
    }
    setFilters(false)
  }

  function handelFilters() {
    setFilters(!filters)
  }

  const [datastate, setDataState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  ])

  const onClickClear = () => {
    setDataState([{
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },])
    setCurrentStartDate()
    setCurrentEndDate()
    setOpen(false)
  };

  const onClickDone = () => {
    let startDate = moment(datastate[0]?.startDate).format("YYYY-MM-DD");
    let endDate = moment(datastate[0].endDate).format("YYYY-MM-DD");
    setCurrentStartDate(startDate)
    setCurrentEndDate(endDate)
    setOpen(false)
  }

  const closeDate = () => {
    setOpen(false)
  }

 
  
  return (
    <div>
    <div>
      <div className='sidefilterr' onClick={handelFilters}><span className='transaction-RiEqualizerLine'></span>{filters == true ? <> Filter <BsChevronUp /></>: <>Filter <BsChevronDown /></>}</div>
    </div>

    <> {filters
      ? <div className='slidefilter-popup-mainn'>
        <div className='slidefilter-popup-innerr'>
          <div className='slidedate-filterr'>
            <div className='date-filter-mainn'>
              <div className='date-filter-startdatee'>
                <div className='date-selectdivv'>
                {currentStartDate&&currentStartDate !== "All"?
                  <div className='Trans_30days' onClick={toggle} >{`Date:${currentStartDate==undefined?"":currentStartDate}-${currentEndDate==undefined?"":currentEndDate}`}</div>:
                  SessDates&&SessDates!==null&&SessDates!=="All"?
                  <div className='Trans_30days' onClick={toggle}>{`Date:${SessDates}-${sessEndDate}`}</div>:
                  <div className='Trans_30days' onClick={toggle} >{`Last 30 days`}</div>
                }

                  {open ?
                    // <OutsideClickHandler  onOutsideClick={closeDate}>
                    <div className="datePickerBlockAA">
                      <OutsideClickHandler onOutsideClick={closeDate}>
                        <DateRangePicker
                          onChange={(item) => { setDataState([item.range1]) }}
                          showSelectionPreview={true}
                          showDateDisplay={true}
                          months={2}
                          color="f6be00"
                          ranges={datastate}
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
              <div className='trans-acctype-country'>
              <div className='date-filter-startdatee'>
                <select
                  className='date-selectdivv'
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
              <div className='status-country-filterr'>
            <div className='status-filterr'>
              <select
                className='date-selectdivv'
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
            </div>
          </div>
         
        </div>
        <div className='apply-reset-btnt-trans'>
          <div className='reset-btn-mainnn'>
            <button onClick={handleTransFilterRemove}>Reset Filters</button>
          </div>&nbsp;&nbsp;
          <div className='apply-btn-mainnn'>
            <button onClick={handleTransFilterApply}>Apply Filters</button>
          </div>
        </div>
      </div>
      : null}
    </>
  </div>
  )
}

export default Filter