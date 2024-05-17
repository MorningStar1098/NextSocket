/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { LIVE_URL } from '../../Hooks/envConst'
import axios from 'axios';
import OutsideClickHandler from 'react-outside-click-handler';
import { BiChevronDown } from 'react-icons/bi'
import { useRouter } from 'next/router';
import { isEmpty } from '../ipasslisting/ipasslisting';

function Filters() {
  const router = useRouter()

  const [filters, setFilters] = useState(false)
  const [countries, setCountries] = useState([])

  const [currentStartDate, setCurrentStartDate] = useState("All");
  const [currentEndDate, setCurrentEndDate] = useState("All");
  const [currentStatus, setCurrentStatus] = useState("All");
  const [currentCountry, setCurrentCountry] = useState("All");
  const [currentIdType, setCurrentIdType] = useState("All");

  //applied is to show filters data on filter pills after user has applied the filters
  const [appliedStartDate, setAppliedStartDate] = useState("All");
  const [appliedEndDate, setAppliedEndDate] = useState("All");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [appliedCountry, setAppliedCountry] = useState("All");
  const [appliedIdType, setAppliedIdType] = useState("All");

  useEffect(() => {
    handleFilterCountry()
  }, [])

  useEffect(() => {
    const sessionStartDate = sessionStorage.getItem("selectedStartDate");
    const sessionEndDate = sessionStorage.getItem("selectedEndDate");
    const sessionStatus = sessionStorage.getItem("selectedStatus");
    const sessionCountry = sessionStorage.getItem("selectedCountry");
    const sessionIdType = sessionStorage.getItem("selectedIdType");

    !isEmpty(sessionStartDate) && setCurrentStartDate(sessionStartDate);
    !isEmpty(sessionEndDate) && setCurrentEndDate(sessionEndDate);
    !isEmpty(sessionStatus) && setCurrentStatus(sessionStatus);
    !isEmpty(sessionCountry) && setCurrentCountry(sessionCountry);
    !isEmpty(sessionIdType) && setCurrentIdType(sessionIdType);

    !isEmpty(sessionStartDate) && setAppliedStartDate(sessionStartDate);
    !isEmpty(sessionEndDate) && setAppliedEndDate(sessionEndDate);
    !isEmpty(sessionStatus) && setAppliedStatus(sessionStatus);
    !isEmpty(sessionCountry) && setAppliedCountry(sessionCountry);
    !isEmpty(sessionIdType) && setAppliedIdType(sessionIdType);
  }, [])

  const handleOnFilterApply = () => {
    setAppliedStartDate(currentStartDate);
    setAppliedEndDate(currentEndDate);
    setAppliedStatus(currentStatus);
    setAppliedCountry(currentCountry);
    setAppliedIdType(currentIdType);

    sessionStorage.setItem("selectedStartDate", currentStartDate);
    sessionStorage.setItem("selectedEndDate", currentEndDate);
    sessionStorage.setItem("selectedStatus", currentStatus);
    sessionStorage.setItem("selectedCountry", currentCountry);
    sessionStorage.setItem("selectedIdType", currentIdType);

    router.push(window.location, null, { shallow: true })
    setFilters(false)
  }

  const handleOnFilterRemove = () => {
    sessionStorage.setItem("selectedStartDate", "All");
    sessionStorage.setItem("selectedEndDate", "All");
    sessionStorage.setItem("selectedStatus", "All");
    sessionStorage.setItem("selectedCountry", "All");
    sessionStorage.setItem("selectedIdType", "All");

    setCurrentStartDate("All");
    setCurrentEndDate("All");
    setCurrentStatus("All");
    setCurrentCountry("All");
    setCurrentIdType("All");

    setAppliedStartDate("All");
    setAppliedEndDate("All");
    setAppliedStatus("All");
    setAppliedCountry("All");
    setAppliedIdType("All");

    router.push(window.location, null, { shallow: true })
    setFilters(false)
  }

  function handleFilterCountry() {
    axios.get(`${LIVE_URL}/api/v1/getcountrydata`, {
    }).then((response) => {
      setCountries(response?.data?.data)
    })
  }
  function handelFilters() {
    setFilters(true)
  }
  function closeFilter() {
    setFilters(false)
  }
  function handleClearDate() {
    sessionStorage.setItem("selectedStartDate", "All");
    sessionStorage.setItem("selectedEndDate", "All");
    setCurrentStartDate("All");
    setCurrentEndDate("All");
    setAppliedStartDate("All");
    setAppliedEndDate("All");
    router.push(window.location, null, { shallow: true })
  }
  function handleClearStatus() {
    sessionStorage.setItem("selectedStatus", "All");
    setCurrentStatus("All");
    setAppliedStatus("All");
    router.push(window.location, null, { shallow: true })
  }
  function handleClearcountry() {
    sessionStorage.setItem("selectedCountry", "All");
    setCurrentCountry("All");
    setAppliedCountry("All");
    router.push(window.location, null, { shallow: true })
  }
  function handleClearID() {
    sessionStorage.setItem("selectedIdType", "All");
    setCurrentIdType("All");
    setAppliedIdType("All");
    router.push(window.location, null, { shallow: true })
  }

  return (
    <div className="selected-filter-list-filter-main">
      <div className='selected-filters'>
        {appliedStartDate && appliedEndDate && appliedStartDate !== "All" && appliedEndDate !== "All"
          ? <div className='status selected date-selected-filter'>
            <span className='filter-text'>{appliedStartDate} to {appliedEndDate}</span>
            <span className='close-btn1' onClick={handleClearDate}><AiOutlineClose /></span>
          </div>
          : null}
        {appliedStatus && appliedStatus !== "All"
          ? <div className='status selected'>
            <span className='filter-text'>{appliedStatus}</span>
            <span className='close-btn1' onClick={handleClearStatus}><AiOutlineClose /></span>
          </div>
          : null}
        {appliedCountry && appliedCountry !== "All"
          ? <div className='status selected'>
            <span className='filter-text'>{appliedCountry}</span>
            <span className='close-btn1' onClick={handleClearcountry}><AiOutlineClose /></span>
          </div>
          : null}
        {appliedIdType && appliedIdType !== "All"
          ? <div className='status selected'>
            <span className='filter-text'>{appliedIdType}</span>
            <span className='close-btn1' onClick={handleClearID}><AiOutlineClose /></span>
          </div>
          : null}
      </div>
      <div className='listing-filters-main'>
        <div className='listing-filter-inner'>
          <div className='filter-text-close-icon'>
            <h2 onClick={handelFilters}>Filters</h2>
            {filters
              ? <span className='filter-close-icon close-filter-cross' onClick={closeFilter}>
                <AiOutlineClose />
              </span>
              : <span className='filter-close-icon' onClick={handelFilters}>
                <BiChevronDown />
              </span>}
          </div>

          <OutsideClickHandler
            onOutsideClick={closeFilter}
          >
            <> {filters
              ? <div className='filter-popup-main'>
                <div className='filter-popup-inner'>
                  <div className='date-filter'>
                    <h3>By Date</h3>
                    <div className='date-filter-main'>
                      <div className='date-filter-startdate'>
                        <div className='start-datediv'>Start date</div>
                        <div className='date-selectdiv'>
                          <input
                            type="date"
                            id="startdate"
                            value={currentStartDate}
                            onChange={(e) => setCurrentStartDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='date-filter-startdate'>
                        <div className='start-datediv'>End date</div>
                        <div className='date-selectdiv'>
                          <input
                            type="date"
                            id="enddate"
                            value={currentEndDate}
                            onChange={(e) => setCurrentEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='status-country-filter'>
                    <div className='status-filter'>
                      <h3>By Status</h3>
                      <select
                        className='date-selectdiv'
                        id='seloption1'
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                      >
                        <option>All</option>
                        <option>PASSED</option>
                        <option>WARNING</option>
                        <option>REJECTED</option>
                      </select>
                    </div>
                    <div className="country-filter">
                      <h3>By country</h3>
                      <select
                        className='date-selectdiv'
                        id='seloption2'
                        value={currentCountry}
                        onChange={(e) => setCurrentCountry(e.target.value)}
                      >
                        <option>All</option>
                        {countries.map((country) => (<option key={country?.name}>{country?.name}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="country-filter">
                    <h3>By Id Type</h3>
                    <select
                      className='date-selectdiv'
                      id='seloption3'
                      value={currentIdType}
                      onChange={(e) => setCurrentIdType(e.target.value)}
                    >
                      <option>All</option>
                      <option>ID_CARD</option>
                      <option>PASSPORT</option>
                      <option>DRIVING_LICENSE</option>
                    </select>
                  </div>
                </div>
                <div className='apply-reset-btn'>
                  <div className='reset-btn-main'>
                    <button onClick={handleOnFilterRemove}>Reset Filters</button>
                  </div>
                  <div className='apply-btn-main'>
                    <button onClick={handleOnFilterApply}>Apply Filters</button>
                  </div>
                </div>
              </div>
              : null}
            </>
          </OutsideClickHandler>
        </div>
      </div>
      </div>
  )
}
export default Filters
