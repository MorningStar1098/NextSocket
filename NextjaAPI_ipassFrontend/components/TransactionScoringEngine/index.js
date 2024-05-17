/* eslint-disable */
import React, { useState } from 'react'
import TransactionSidebar from "../TransactionSidebar/transactionSidebar"
import Header from "../ScanDocument/ScanHeader"
import ScoreDashboard from './scoreDashboard'
import Defaultrules from '../TransactionDefaultReules/transDefaultrules'
import CustomRules from '../TransactionCustomReules/transCutomerules'
import Addtransaction from './addtransaction'

function TransactionScoringEngine() {
  const [dashbaord, setDashbaord] = useState(true)
  const [defaultrules, setDefaultrules] = useState(false)
  const [coustomrules, setCoustomrules] = useState(false)
  const [isTransactionPopup,setIsTransactionPopup]=useState(false)
  function handelDashboard() {
    setDashbaord(true)
    setDefaultrules(false)
    setCoustomrules(false)
  }
  function handelDefault() {
    setDashbaord(false)
    setDefaultrules(true)
    setCoustomrules(false)
  }
  function handleCustom() {
    setDashbaord(false)
    setCoustomrules(true)
    setDefaultrules(false)
  }

  function handleAddTransaction() {
    setIsTransactionPopup(true)
  }
  return (
    <>
      <Header />
      <div className='transaction-dashboard-main'>
        <TransactionSidebar />
        <div className='transaction-dashboard'>
          <div className='top-headder-back-main'>
            <div className='harder-tabs-main sore-engine'>
              <ul>
                <li className={dashbaord ? "defaultrules-tab-active active" : "defaultrules-tab"} onClick={handelDashboard}>Dashboard</li>
                <li className={defaultrules ? "coustomrules-tab-active active" : "coustomrules-tab"} onClick={handelDefault}>Default Rules</li>
                <li className={coustomrules ? "coustomrules-tab-active active" : "coustomrules-tab"} onClick={handleCustom}>Custom Rules</li>
              </ul>
              <div className='add-transaction-btn'>
                <button onClick={handleAddTransaction}>Add Transaction</button>
              </div>
            </div>
          </div>
          {isTransactionPopup?
                <div className='transaction-popup-main'>
              <Addtransaction
              isTransactionPopup={isTransactionPopup}
              setIsTransactionPopup={setIsTransactionPopup}
              />
              </div>
              :null}
          {dashbaord ? <ScoreDashboard /> : null}
          {defaultrules ? <><Defaultrules /></> : null}
          {coustomrules ? <><CustomRules /></> : null}
        </div>
      </div>
    </>
  )
}

export default TransactionScoringEngine