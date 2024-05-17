/* eslint-disable */
import React, { useState } from 'react'
import DefaultAllRulse from '../TransactionDefaultReules/transAllrulse'
import DefaultEmailRulse from '../TransactionDefaultReules/transEmailrules'
import DefaultIPRulse from '../TransactionDefaultReules/transIprulse'
import DefaultPhoneRulse from '../TransactionDefaultReules/transPhonerules'
import DefaultOtherRulse from '../TransactionDefaultReules/transOtherrules'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

function transDefaultrules() {
  const [allrules, setAllRulse] = useState(true)
  const [emailrulse, setEmailRules] = useState(false)
  const [iprules, setIpRules] = useState(false)
  const [phonrules, setphoneRules] = useState(false)
  const [othersrules, setOthersRules] = useState(false)

  function handelAllrules() {
    setAllRulse(true)
    setEmailRules(false)
    setIpRules(false)
    setphoneRules(false)
    setOthersRules(false)
  }
  function handelEmailrules() {
    setAllRulse(false)
    setEmailRules(true)
    setIpRules(false)
    setphoneRules(false)
    setOthersRules(false)
  }
  function handedivPrulse() {
    setAllRulse(false)
    setEmailRules(false)
    setIpRules(true)
    setphoneRules(false)
    setOthersRules(false)
  }
  function handelPhonerules() {
    setAllRulse(false)
    setEmailRules(false)
    setIpRules(false)
    setphoneRules(true)
    setOthersRules(false)
  }
  function handelOtherrules() {
    setAllRulse(false)
    setEmailRules(false)
    setIpRules(false)
    setphoneRules(false)
    setOthersRules(true)
  }

  return (
    <div className='default-dashboard-main'>
      <div className='default-dashboard'>
         <ul>
            <li className={allrules ? "allrules-tab-active active" : "allrules-tab"} onClick={handelAllrules}><FolderRoundedIcon />All Rules</li>
            <li className={emailrulse ? "emailrulse-tab-active active" : "emailrulse-tab"} onClick={handelEmailrules}><FolderRoundedIcon />Email Rules</li>
            <li className={iprules ? "iprules-tab-active active" : "iprules-tab"} onClick={handedivPrulse}><FolderRoundedIcon />IP Rules</li>
            <li className={phonrules ? "phonrules-tab-active active" : "phonrules-tab"} onClick={handelPhonerules}><FolderRoundedIcon />Phone Rules</li>
            <li className={othersrules ? "othersrules-tab-active active" : "othersrules-tab"} onClick={handelOtherrules}><FolderRoundedIcon />Others Rules</li>
          </ul>
      </div>
      {allrules ? <><DefaultAllRulse /></> : null}
      {emailrulse ? <><DefaultEmailRulse /></> : null}
      {iprules ? <><DefaultIPRulse /></> : null}
      {phonrules ? <><DefaultPhoneRulse /></> : null}
      {othersrules ? <><DefaultOtherRulse /></> : null}
    </div>
  )
}

export default transDefaultrules