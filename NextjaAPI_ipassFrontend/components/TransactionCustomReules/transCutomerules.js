/* eslint-disable */
import React, { useState } from 'react'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import CustomAllRulse from'../TransactionCustomReules/transAllrulse'
import CustomExcludeRulse from'../TransactionCustomReules/transExcluderulse'
import CustomGenvrules from'../TransactionCustomReules/transGenvilorules'
import CustomTestRulse from'../TransactionCustomReules/transTestrulse'

function transCutomerules() {
    const [allrules, setAllRulse] = useState(true)
    const [excluderulse, setExcluderulse] = useState(false)
    const [genvrules, setGenvrules] = useState(false)
    const [testrules, setTestrules] = useState(false)

    function handelAllrules() {
        setAllRulse(true)
        setExcluderulse(false)
        setGenvrules(false)
        setTestrules(false)
    }
    function handelExcluderules(){
        setAllRulse(false)
        setExcluderulse(true)
        setGenvrules(false)
        setTestrules(false)
    }
    function handelGenvrules(){
        setAllRulse(false)
        setExcluderulse(false)
        setGenvrules(true)
        setTestrules(false)
    }
    function handelTestrules(){
        setAllRulse(false)
        setExcluderulse(false)
        setGenvrules(false)
        setTestrules(true)
    }

    return (
        <div className='Customrule-dashboard-main'>
            <div className='Customrule-dashboard'>
                <ul>
                    <li className={allrules ? "allrules-tab-active active" : "allrules-tab"} onClick={handelAllrules}><FolderRoundedIcon />All Rules</li>
                    <li className={excluderulse ? "emailrulse-tab-active active" : "emailrulse-tab"} onClick={handelExcluderules}><FolderRoundedIcon />Exclude Rules</li>
                    <li className={genvrules ? "iprules-tab-active active" : "iprules-tab"} onClick={handelGenvrules}><FolderRoundedIcon />General velocity rules</li>
                    <li className={testrules ? "phonrules-tab-active active" : "phonrules-tab"} onClick={handelTestrules}><FolderRoundedIcon />Test</li>
                </ul>
            </div>
            {allrules ? <><CustomAllRulse /></> : null}
            {excluderulse ? <><CustomExcludeRulse /></> : null}
            {genvrules ? <><CustomGenvrules /></> : null}
            {testrules ? <><CustomTestRulse /></> : null}
            </div>
    )
}

export default transCutomerules