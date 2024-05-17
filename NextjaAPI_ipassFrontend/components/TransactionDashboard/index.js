/* eslint-disable */
import React, { useEffect } from 'react'
import TransactionSidebar from "../TransactionSidebar/transactionSidebar"
import TransDashboardSections from './TransDashboardSections'
import Headder from "../ScanDocument/ScanHeader"
function TransactionDashboard() {
  return (
    <>
    <Headder/>
    <div className='transaction-dashboard-main'>
    <TransactionSidebar/>
    <div className="transaction-dashboard">
    <TransDashboardSections/>
    </div>
    </div>
    </>
  )
}

export default TransactionDashboard