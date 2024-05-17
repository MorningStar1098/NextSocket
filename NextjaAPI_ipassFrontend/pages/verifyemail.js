/* eslint-disable */
import React, { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import { LIVE_URL } from '../Hooks/envConst'
import Logo from '../public/images/logo.png'
import Link from 'next/link'
import Select from 'react-select'
import Cookies from 'js-cookie';
import PhoneInput from 'react-phone-input-2'
import LoadingIcons from 'react-loading-icons'

// import Cookies from 'js-cookie';

function VerifyEmail() {
  if (typeof window !== "undefined") {
    document.body.classList.remove('dashboard-custom-body')
  }
  const history = useRouter();
  const { id, tok, eml, sup, acc } = history.query;

  // const parseJSON = JSON.parse(eml);
  // const decodEmail=atob(parseJSON);
  const [loadingErr, setLoadingErr] = useState(true)
  useLayoutEffect(() => {
    Cookies.set('pubprivkey', tok)
    if (eml !== undefined) {
      Cookies.set('email', eml)
    }
    if (acc !== undefined) {
      Cookies.set("acc_type", acc)
    }
    Cookies.set('issup', sup)
    if (id !== undefined) {
      handleSidCond(id)
      handleWorkflowId(id)

    }
  }, [id])
  const [sidCond, setSidCond] = useState([])
  async function handleSidCond(id) {
    await axios.get(`${LIVE_URL}/api/v1/ipass/getsid/data?sid=${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'

    }).then((resp) => {
      setSidCond(resp?.data)
      setTimeout(()=>{
        setLoadingErr(false)
      },500)


    })
  }
  // const getTok=Cookies.get('pubprivkey')
  // const getEml=Cookies.get('email')
  // const getAcc=Cookies.get('acc_type')
  // const getIssup=Cookies.get('issup')

  const [verifEmail, setVerifEmail] = useState("")
  const [verifPhone, setVerifPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [phoneCode, setPhoneCode] = useState("44")
  const [ipAdd, setIpAdd] = useState("")
  const [matchId, setMatchId] = useState("")
  const exactPhone = `+${phoneCode}${verifPhone}`

  const unameRef = useRef(null);
  const phnoRef = useRef(null);
  const phnoCodRef = useRef(null)
  const emlRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function phonesSet(e) {
    e.target.style.borderColor = "#c4cad4";
    setVerifPhone(e.target.value)

  }

  function phonesCodeSet(e) {
    setPhoneCode(e)
  }
  function emailSet(e) {
    e.target.style.borderColor = "#c4cad4";
    setVerifEmail(e.target.value)
  }
  function handleIpAdd() {
    axios.get("https://geolocation-db.com/json/", {

    }).then((ipResp) => {
      setIpAdd(ipResp?.data)
    })
  }
  async function handleWorkflowId(id) {
    await axios.get(`${LIVE_URL}/api/v1/ipass/workflowid/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'

    }).then((resp) => {
      const wid = resp && resp.data && resp.data.data !== undefined ? resp.data.data._id : null
      setMatchId(wid)
      handleIpAdd()
    })
  }
  // console.log("dd",ipAdd);
  async function handelnext(e) {
    e.preventDefault();
    if (verifEmail == "" || emlRegex.test(verifEmail) == false) {
      unameRef.current.style.borderColor = 'red';
      return
    }
    if (verifPhone == "") {
      phnoRef.current.style.borderColor = 'red';
      return
    }
    if (phoneCode == "" || phoneCode == "Select country code") {
      phnoCodRef.current.style.borderColor = 'red';
      return
    }
    setLoading(true)
    let body = JSON.stringify({
      email: verifEmail,
      phone_number: exactPhone,
      ipadd: ipAdd.IPv4,
      sid: id
    })

    // let response = await axios.post(`${LIVE_URL}/api/v1/ipass/seon`, body, {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   mode: 'no-cors',
    // })
    // let resp = response;

    // if (resp.status == 200) {
      setLoading(false)

      history.push({
        pathname: "/sessionpage",
        query: { id: id }

      })
    // }
  }
  const options = [
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "376", label: '+376' },
    { value: '244', label: '+244' },
    { value: "962", label: "+962" },
    { value: '1264', label: '+1264' },
    { value: "1268", label: '+1268' },
    { value: '54', label: '+54' },
    { value: '374', label: '+374' },
    { value: "297", label: '+297' },
    { value: '61', label: '+61' },
    { value: '43', label: '+43' },
    { value: "994", label: '+994' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "44", label: '+44' },
    { value: '1', label: '+44' },
    { value: '213', label: '+213' },
    { value: "1242", label: "+1242" },
    { value: "973", label: "+973" },
    { value: "880", label: "+880" },
    { value: "1246", label: "+1246" },
    { value: "375", label: "+375" },
    { value: "32", label: "+32" },
    { value: "501", label: "+501" },
    { value: "229", label: "+229" },
    { value: "1441", label: "+1441" },
    { value: "975", label: "+975" },
    { value: "591", label: "+591" },
    { value: "387", label: "+387" },
    { value: "267", label: "+267" },
    { value: "55", label: "+55" },
    { value: "673", label: "+673" },
    { value: "359", label: "+359" },
    { value: "226", label: "+226" },
    { value: "257", label: "+257" },
    { value: "855", label: "+855" },
    { value: "237", label: "+237" },
    { value: "1", label: "+1" },
    { value: "238", label: "+238" },
    { value: "1345", label: "+1345" },
    { value: "236", label: "+236" },
    { value: "56", label: "+56" },
    { value: "86", label: "+86" },
    { value: "57", label: "+5" },
    { value: "269", label: "+269" },
    { value: "242", label: "+242" },
    { value: "682", label: '+682' },
    { value: "506", label: "+506" },
    { value: "385", label: "+385" },
    { value: "53", label: "+53" },
    { value: "90392", label: "+90392" },
    { value: "90392", label: "+90392" },
    { value: "357", label: "+357" },
    { value: "42", label: " +42" },
    { value: "45", label: "+45" },
    { value: "253", label: "+253" },
    { value: "1809", label: "+1809" },
    { value: "593", label: "+593" },
    { value: "20", label: "+20" },
    { value: "503", label: "+503" },
    { value: "240", label: " +240" },
    { value: "266", label: "+266" },
    { value: "231", label: "+231" },
    { value: "218", label: "+218" },
    { value: "417", label: "+417" },
    { value: "370", label: "+370" },
    { value: "352", label: "+352" },
    { value: "853", label: "+853" },
    { value: "389", label: "+389" },
    { value: "261", label: "+261" },
    { value: "265", label: "+265" },
    { value: "60", label: "+60" },
    { value: "960", label: "+960" },
    { value: "223", label: "+223" },
    { value: "356", label: "+356" },
    { value: "692", label: "+692" },
    { value: "596", label: "+596" },
    { value: "222", label: "+222" },
    { value: "269", label: "+269" },
    { value: "52", label: "+52" },
    { value: "691", label: "+691" },
    { value: "373", label: "+373" },
    { value: "377", label: "+377" },
    { value: "976", label: "+976" },
    { value: "1664", label: "+1664" },
    { value: "212", label: "+212" },
    { value: "258", label: "+258" },
    { value: "95", label: "+95" },
    { value: "264", label: "+264" },
    { value: "674", label: "+674" },
    { value: "977", label: "+977" },
    { value: "31", label: "+31" },
    { value: "687", label: "+687" },
    { value: "64", label: "+64" },
    { value: "505", label: "+505" },
    { value: "227", label: "+227" },
    { value: "234", label: "+234" },
    { value: "683", label: "+683" },
    { value: "672", label: "+672" },
    { value: "670", label: "+670" },
    { value: "47", label: "+47" },
    { value: "968", label: "+968" },
    { value: "680", label: "+680" },
    { value: "507", label: "+507" },
    { value: "675", label: "+675" },
    { value: "595", label: "+595" },
    { value: "51", label: "+51" },
    { value: "63", label: "+63" },
    { value: "48", label: "+48" },
    { value: "351", label: "+351" },
    { value: "1787", label: "+1787" },
    { value: "974", label: "+974" },
    { value: "262", label: "+262" },
    { value: "40", label: "+40" },
    { value: "7", label: "+7" },
    { value: "250", label: "+250" },
    { value: "378", label: "+378" },
    { value: "239", label: "+239" },
    { value: "966", label: "+966" },
    { value: "221", label: "+221" },
    { value: "381", label: "+381" },
    { value: "248", label: "+248" },
    { value: "232", label: "+232" },
    { value: "65", label: "+65" },
    { value: "421", label: "+421" },
    { value: "386", label: "+386" },
    { value: "677", label: "+677" },
    { value: "252", label: "+252" },
    { value: "27", label: "+27" },
    { value: "34", label: "+34" },
    { value: "94", label: "+94" },
    { value: "91", label: "+91" },
    { value: "290", label: "+290" },
    { value: "1869", label: "+1869" },
    { value: "1758", label: "+1758" },
    { value: "249", label: "+249" },
    { value: "597", label: "+597" },
    { value: "268", label: "+268" },
    { value: "46", label: "+46" },
    { value: "41", label: "+41" },
    { value: "963", label: "+963" },
    { value: "886", label: "+886" },
    { value: "7", label: "+7" },
    { value: "66", label: "+66" },
    { value: "228", label: "+228" },
    { value: "676", label: "+676" },
    { value: "1868", label: "+1868" },
    { value: "216", label: "+216" },
    { value: "90", label: "+90" },
    { value: "7", label: "+7" },
    { value: "993", label: "+993" },
    { value: "1649", label: "+1649" },
    { value: "688", label: "+688" },
    { value: "256", label: "+256" },
    { value: "44", label: "+44" },
    { value: "380", label: "+380" },
    { value: "971", label: "+971" },
    { value: "598", label: "+598" },
    { value: "1", label: "+1" },
    { value: "7", label: "+7" },
    { value: "678", label: "+678" },
    { value: "379", label: "+379" },
    { value: "58", label: "+58" },
    { value: "84", label: "+84" },
    { value: "84", label: "+1284" },
    { value: "84", label: "+1340" },
    { value: "681", label: "+681" },
    { value: "969", label: "+969" },
    { value: "967", label: "+967" },
    { value: "260", label: "+260" },
  ]

  return (

    <>
      {id == undefined ?
        null :
        <>

          {sidCond?.message == "Data not exists" ?
            <>
              {matchId == id ?
                <div className='login-formmain details'>

                  <div className='login-form'>
                    <div className="logoBlock">
                      <Link href="/dashboard">
                        <img src={Logo.src} />
                      </Link>
                    </div>
                    <h1>Please enter your email and phone number</h1>
                    <form>

                      <div className='loginuser-name'>

                        <input type="text" ref={unameRef} name="email" placeholder="Enter your email" onChange={(e) => emailSet(e)} /><br />
                      </div>
                      <div className='socialmedia-loginuser-password'>
                        <div className='loginuser-phone-code'>
                          <PhoneInput
                            country={'us'}
                             value={phoneCode}
                            onChange={phonesCodeSet}
                          />
                          {/* <Select defaultValue={phoneCode} options={options} onChange={phonesCodeSet} /> */}


                        </div>
                        <div className="login-user-phone-number">
                          <input type="number" ref={phnoRef} name="number" pattern="[0-9]*" placeholder="Enter mobile number" onChange={(e) => phonesSet(e)} />
                        </div>
                      </div>


                      <div className="button-container">

                        <button className="loaderImageS-socialmedia" onClick={handelnext}>{loading ? <LoadingIcons.Bars /> :
                          "Next"}</button>
                      </div>

                    </form>
                  </div>
                </div> : <h2>404 page not found</h2>}</>
            : <h2>Link Expired</h2>}
            {loadingErr ?
        <div className="loading-request">
          <div className="loader-svg"> <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
        </div>
        : null}
        </>
      }
    </>
  )
}

export default VerifyEmail;