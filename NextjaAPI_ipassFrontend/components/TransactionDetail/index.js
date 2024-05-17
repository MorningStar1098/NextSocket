/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { LIVE_URL } from "../../Hooks/envConst"
import TransactionSidebar from "../TransactionSidebar/transactionSidebar"
import axios from 'axios';
import { IoChevronBackOutline } from "react-icons/io"
import TransactionLeftsection from './transactionLeftsection';
import TransactionRightSection from './transactionRightSection';
import { useReactToPrint } from 'react-to-print';
import Header from "../ScanDocument/ScanHeader"
import ActivityData from './activityData';
import CustomerConnection from './customerConnection';
import Rawdata from './rawdata';
import { BiChevronLeft } from 'react-icons/bi';
import { checkLogin } from '../../Hooks/checkLogin'
import Cookies from 'js-cookie';

function TransactionDetail() {
  const componentRef = useRef(null);
  const router = useRouter()
  const transid = router?.query?.get
  const [isLogged, setIsLogged] = useState(false)
  const base64Email = Cookies.get('email')
  useEffect(() => {
    if (transid !== undefined) {
      handleSingleTransaction(transid)
    }
  }, [transid])

  useEffect(() => {
    const token = Cookies.get('token')
    const eml = checkLogin(token, base64Email)
    // console.log("eml",eml);
    if (eml !== undefined) {
      setIsLogged(true)
      handleAllTransactions(eml)
      // setEmail(eml);
    }
    else {
      Cookies.remove('token');
      Cookies.remove('email');
      router.push('/')
    }
  }, [isLogged])
  const [transactionData, setTranscationData] = useState()
  const [singleTransaction, setSingleTransavtion] = useState()
  const [details, setdetails] = useState(true)
  const [activity, setActivity] = useState(false)
  const [customer, setCustomer] = useState(false)
  const [rawData, setRawData] = useState(false)
  //  console.log("ff",transactionData);
  function handleDetails() {
    setdetails(true)
    setActivity(false)
    setCustomer(false)
    setRawData(false)
  }
  function handleActivity() {
    setdetails(false)
    setActivity(true)
    setCustomer(false)
    setRawData(false)
  }
  function handleCustomer() {
    setdetails(false)
    setActivity(false)
    setCustomer(true)
    setRawData(false)
  }
  function handleraw() {
    setdetails(false)
    setActivity(false)
    setCustomer(false)
    setRawData(true)
  }
  function handleSingleTransaction(transid) {
    // alert(1)
    axios.get(`${LIVE_URL}/api/v1/ipass/get/single/transaction/${transid}`, {
    }).then((response) => {
      const data = response?.data?.singletransaction
      setSingleTransavtion(data)
      // console.log("dd",response);
    })
  }
  function handleAllTransactions(email) {
    axios.get(`${LIVE_URL}/api/v1/ipass/monitoring/getall/transaction/${email}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      const data = response?.data?.alltransactions
      setTranscationData(data)
    })
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageSize: 'A4',
  });

  function handleBack(e) {
    e.preventDefault()
    router.push(`/monitoringTransactions`)
    Cookies.remove("comp")
    Cookies.remove("mId")
  }
  return (
    <div>
      {isLogged ?
        <>
          <Header />
          <div className='transaction-dashboard-main'>
            <TransactionSidebar />
            <div className='transaction-dashboard'>
              <div className='top-headder-back-main'>
                <div className='back-btn-icon'>
                  <div className='back-btn-tdspage' onClick={(e) => handleBack(e)}>
                    <a><BiChevronLeft /><span className='back-tt'>Back</span></a>
                  </div>
                </div>
                <div className='harder-tabs-main'>
                  <ul>
                    <li className={details ? "details-tab-active active" : "details-tab"} onClick={handleDetails}>details</li>
                    <li className={activity ? "activity-tab-active active" : "activity-tab"} onClick={handleActivity}>Activity</li>
                    <li className={customer ? "customer-yab-active active" : "customer-tab"} onClick={handleCustomer}>Customer connection</li>
                    <li className={rawData ? "raw-tab-active active" : "raw-tab"} onClick={handleraw}>Raw Data</li>
                  </ul>
                </div>
              </div>
              {details ?
                <div className='transactionlist-detail-main'>
                  <TransactionLeftsection
                    transactionData={transactionData}
                  />
                  <TransactionRightSection
                    ref={componentRef}
                    singleTransaction={singleTransaction}
                    handleSingleTransaction={handleSingleTransaction}
                    handlePrint={handlePrint}
                  />

                </div>
                : null}
              {activity ?
                <ActivityData
                  singleTransaction={singleTransaction}
                  setdetails={setdetails}
                  setActivity={setActivity}
                />
                : null}
              {rawData ?
                <Rawdata
                  singleTransaction={singleTransaction}
                />
                : null}
              {customer ?
                <CustomerConnection
                  setdetails={setdetails}
                  setCustomer={setCustomer}
                  singleTransaction={singleTransaction}
                />
                : null}

            </div>
          </div>
        </>
        : null}
    </div>
  )
}

export default TransactionDetail