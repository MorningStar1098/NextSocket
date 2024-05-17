/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TransactionSidebar from "../TransactionSidebar/transactionSidebar"
import Transactions from "./transactions"
import {LIVE_URL} from "../../Hooks/envConst"
import axios from 'axios'
import Header from "../ScanDocument/ScanHeader"
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { checkLogin } from '../../Hooks/checkLogin'

function TransactionMonitoring() {
  const router = useRouter()
  const [proemail, setProEmail] = useState();
  const [transactionData,setTranscationData]=useState()
  const [isLogged, setIsLogged] = useState(false)
  const base64Email = Cookies.get('email')

  useEffect(() => {
    const token = Cookies.get('token')
    const eml = checkLogin(token, base64Email)
    // console.log("eml",eml);
    if (eml!==undefined) {
        setIsLogged(true)
        handleTransactions(eml)
        // setEmail(eml);
    }
    else {
        Cookies.remove('token');
        Cookies.remove('email');
        router.push('/')
    }
}, [proemail,isLogged])

  // console.log("dd",transactionData);
  function handleTransactions(email) {
    axios.get(`${LIVE_URL}/api/v1/ipass/monitoring/getall/transaction/${email}?startDate=${proemail?.date ? proemail?.date[0] : ""}&endDate=${proemail?.date ? proemail?.date[1] : ""}&actionType=${proemail?.actiontype !==undefined&&proemail?.actiontype!=="All"? proemail?.actiontype : ""}`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    }).then((response)=>{
      // console.log(response?.data?.data);
      const data=response?.data?.alltransactions
      setTranscationData(data)
    })
  }

  async function handletransfilApp(props){
    if (props.value === "transaction-filter") {
        console.log("date",props);
        setProEmail(props)
      }
 }
 async function handletransfilRest(value){
    if (value === "transaction-filter") {
       setProEmail()
    }
 }

  return (
    <>
    {isLogged?
    <>
    <Header/>
    <div className=' transaction-dashboard-main'>
        <TransactionSidebar />
        <div className='transaction-dashboard'>
            <Transactions 
              transactionData={transactionData}
              handleTransactions={handleTransactions}
              handletransfilApp={handletransfilApp}
              handletransfilRest={handletransfilRest}
            />
        </div>
    </div>
    </>
    :null}
    </>
  )
}

export default TransactionMonitoring