import React, { useEffect, useState } from 'react'
import axios from 'axios'
import queryString from 'query-string';
import { LIVE_URL } from '../Hooks/envConst'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

import LoadingIcons from 'react-loading-icons'
const Success = () => {
  if (typeof window !== "undefined") {
    document.body.classList.remove('dashboard-custom-body')
  }
  const [loading, setLoading] = useState(false)
  // const [pageState, setPageState] = useState({})
  const history = useRouter();
  const Uid = Cookies.get('Uid')
  const tokpubPrivkey = Cookies.get('pubprivkey')
  const isSupAdmin = Cookies.get('issup')
  const eml = Cookies.get('email')
  const acct=Cookies.get("acc_type")
  let email
  let accType
  if (eml !== undefined) {
    email = atob(eml)
  }
  if(acct!==undefined&&isSupAdmin=="1"){
    accType=atob(acct)
  }
  useEffect(() => {
    let params = queryString.parse(location.search)
    let accountId = params.accountId
    let workflowExecutionId = params.workflowExecutionId
    Cookies.set('accountId', accountId)
    Cookies.set('workflowExecutionId', workflowExecutionId)
    sendParms(accountId, workflowExecutionId)
  }, [])

  async function sendParms(accountId, workflowExecutionId) {
    setLoading(true)
    let body = {
      "sesId": Uid,
      "tokpubpriv": tokpubPrivkey,
      "isSup": isSupAdmin,
      "eml": email,
      "acc_type":accType
    }
    await axios.post(`${LIVE_URL}/api/v1/jumio/success?accountId=${accountId}&workflowExecutionId=${workflowExecutionId}`, body, {

    })
      .then(res => {
        if (res.status == 200) {
          history.push({
            pathname: "/processingscreen",
            query: { accountId: accountId, workflowExecutionId: workflowExecutionId }
          })
        }
      }).catch(err => {
        console.log(err);
      })
  }
  return (
    <>

      {loading ?
        <div className="loading-request">
          <div className="loader-svg"> <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
        </div>
        : null}
    </>
  )
}

export default Success