/* eslint-disable */
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'

function TransactionLeftsection(props) {
    const {transactionData}=props
    const router = useRouter()

    // console.log("trans",transactionData);
    function handleDetail(e, id) {
        router.push(`/transactionDetail?get=${id}`)
        Cookies.set("mId",id)
    }
    
// Get today's date
const today = new Date();
// Get current year
const year = today.getFullYear()-1;
const prevYearStartDate=`01-01-${year}`
const prevYearEndDate=`31-12-${year}`
console.log('prevYearStartDate: ',prevYearStartDate,"prevYearEndDate",prevYearEndDate);

  return (
    <div className='all-transaction'>
        <div className='transaction-inner'>
            {transactionData&&transactionData?.map((transactions)=>{
                return(
                    <div className='allTransHalfB' onClick={(e) => handleDetail(e, transactions?._id)}>
                        <div className='email-id-main'>
                            <span>{transactions?.data?.email_details?.email}</span>
                            <span>{transactions?.data?.id}</span>
                        </div>
                        <div className='score-status-main'>
                            <span>{transactions?.data?.fraud_score}</span>
                            <span className={transactions?.data?.state=="APPROVE"?"transaction-approved approvedB":transactions?.data?.state=="DECLINE"?"transaction-decline declineB":"transaction-review reviewB"}></span>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default TransactionLeftsection