/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { LIVE_URL } from '../../Hooks/envConst'
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'
import LoadingIcons from 'react-loading-icons'
import FileBase64 from 'react-file-base64';
import { TiTick } from 'react-icons/ti'
import { GrFormClose } from 'react-icons/gr'
import bcrypt from 'bcryptjs'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

function CustomerListing(props) {
  const router = useRouter()

  const notverified = <GrFormClose />
  const { setCustomers, customers } = props
  useEffect(() => {
    handleCustomers()

  }, [])
  const deleteToast = () => toast.success("User deleted successfully")
  const updateToast = () => toast.success("User updated successfully")

  const [customersData, setCustomersData] = useState([])
  const [singleCustomer, setSingleCustomer] = useState([])
  const [customerEdit, setCustomerEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  // =============================================
  const [updcompanyName, setUpdCompanyName] = useState("")
  const [selectedUpdImage, setSelectedUpdImage] = useState(null);
  const [updemail, setUpdEmail] = useState("")
  const [updfrstName, setUpdFrstName] = useState("")
  const [updlastName, setUpdLastName] = useState("")
  const [updaccType, setUpdAccType] = useState("")
  const [updbillEmail, setUpdBillEmail] = useState("")
  const [updPubKey, setUpdPubKey] = useState("")
  const [updPrivKey, setUpdPrivKey] = useState("")
  const [updMonthLimit, setUpdMonthLimit] = useState("")
  // const [updLimitAdon, setLimitAdon] = useState("")
  const [password, setPassword] = useState("")
  const [deletePopup, setDeletePopup] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [suspendAcc,setSuspendAcc]=useState("")
  const [counsmed,setConsumed]=useState("")
  const [remaindata,setRemainData]=useState("")
  const [TmsAccess,setTmsAccess]=useState("")
  const consm=parseInt(counsmed)
  const updMonth=parseInt(updMonthLimit)
  const rmnData=parseInt(remaindata)
  // const lmtAdd=parseInt(updLimitAdon)
  // console.log("dd",typeof updMonth);
  function handleCustomers() {
    axios.get(`${LIVE_URL}/api/v1/customerdata`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    }).then((response) => {
      setCustomersData(response && response.data && response.data.data !== undefined ? response.data.data : null)
    })
  }
  function handleSingCust(ids) {
    axios.get(`${LIVE_URL}/api/v1/getuser/${ids}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    }).then((response) => {
      setSingleCustomer(response && response.data && response.data.data !== undefined ? response.data.data : null)
      let apiResp = response && response.data && response.data.data !== undefined ? response.data.data : null
      setUpdCompanyName(apiResp.companyname)
      setSelectedUpdImage(apiResp.logo)
      setUpdEmail(apiResp.email)
      setUpdFrstName(apiResp.firstname)
      setUpdLastName(apiResp.lastname)
      setUpdAccType(apiResp.accountType)
      setUpdBillEmail(apiResp.billsEmail)
      setUpdPubKey(apiResp?.public_key)
      setUpdPrivKey(apiResp?.private_key)
      setUpdMonthLimit(apiResp?.monthly_limit)
      // setLimitAdon(apiResp?.limit_adon)
      setPassword(apiResp?.password)
      setSuspendAcc(apiResp?.issuspended)
      setConsumed(apiResp?.consumed)
      setRemainData(apiResp?.remaining)
      setTmsAccess(apiResp?.tms_account)
      handleCustomerEdit()
    })
  }

  function handleUpdImage(data) {
    setSelectedUpdImage(data[0].base64)
  }
  const paccType = updaccType == "Sandbox" ? "Sandbox" : updaccType == "Live" ? "Live" : "Sandbox"
  const setSuspAcc=suspendAcc==true?"1":suspendAcc==false?"0":"0"
  const setTmsAcc=TmsAccess == true ? "true" : TmsAccess == false ? "false" : "false"

  function handleUpdCompanyName(e) {
    setUpdCompanyName(e.target.value)
  }
  function handleUpdEmail(e) {
    setUpdEmail(e.target.value)
  }
  function handleUpdFname(e) {
    setUpdFrstName(e.target.value)
  }
  function handleUpdLname(e) {
    setUpdLastName(e.target.value)
  }
  function handleUpdAcctype(e) {
    setUpdAccType(e.target.value)
  }
  function handleUpdBillEmail(e) {
    setUpdBillEmail(e.target.value)
  }
  function handlePubKey(e) {
    setUpdPubKey(e.target.value)
  }
  function handlePrivKey(e) {
    setUpdPrivKey(e.target.value)
  }
  function handleUpdLimit(e) {
    setUpdMonthLimit(e.target.value)
  }
  // function handleAdon(e) {
  //   setLimitAdon(e.target.value)
  // }
  function handleSuspend(e) {
    setSuspendAcc(e.target.checked)
}
function handleTms(e) {
  setTmsAccess(e.target.checked)
}


  function handleUpdateCustomer(e, updId,eml) {
    e.preventDefault();
    setLoading(true)
    const body = JSON.stringify({
      companyname: updcompanyName,
      logo: selectedUpdImage,
      email: updemail,
      firstname: updfrstName,
      lastname: updlastName,
      accountType: paccType,
      billsEmail: updbillEmail,
      publickey: updPubKey,
      privatekey: updPrivKey,
      monthlimit: updMonthLimit,
      // limitadon: updLimitAdon,
      password: password,
      suspended :setSuspAcc,
      idremain:consm==0?updMonthLimit:updMonth-consm,
      tms:setTmsAcc
    })
    axios.put(`${LIVE_URL}/api/v1/update/email/${updId}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    }).then((response) => {
      if (response && response.data && response.data !== undefined ? response.data.message == "data updated successfullly" : null) {
        updateToast()
        setCustomerEdit(false)
        setLoading(false)
        handleCustomers()
      }
    })
  }
  function handleCustomerEdit() {
    setCustomerEdit(true)
  }
  function handleClosepop() {
    setCustomerEdit(false)

  }
  function handleDelCust(id) {

    setDeleteId(id)
    setDeletePopup(true)
    // handleCustomerDelete(id)

  }
  function handleCloseDelPop() {
    setDeletePopup(false)
  }
  function handleCustomerDelete() {
    axios.delete(`${LIVE_URL}/api/v1/customer/delete/${deleteId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    }).then((resp) => {
      if (resp?.data?.message == "data deleted") {
        deleteToast()
        setDeleteId("")
        setDeletePopup(false)
        handleCustomers()
        // router.push(window.location, null, { shallow: true })
      }
    })
  }

  const customerLists = (
    <>
      <div className="customers-page-main1 userVerfiedData">

        <div className="customers-page-inner userVerfiedInner">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Logo</th>
                <th>Email</th>
                <th>First Name/Last Name</th>
                <th>Monthy Limit</th>
                <th>Account Type</th>
                <th>Bills Email</th>
                <th>Demo Account</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customersData !== undefined ? customersData.map((cusdata) => {
                const firstlastname = `${cusdata && cusdata.firstname !== undefined ? cusdata.firstname : null} ${cusdata && cusdata.lastname !== undefined ? cusdata.lastname : null}`
                return (
                  <>
                    {deletePopup ?
                      <div className="close-pop-main">
                        <div className="closse-popup-content">
                          <h1>Do you want to Delete? </h1>
                          <p>Are you sure you want to delete this customer? </p>
                          <div className="popbuttons-bottom">
                            <button className='cancel-btn-main' onClick={handleCloseDelPop}>Cancel</button>
                            <button className='delete-btn-main' onClick={() => handleCustomerDelete(cusdata && cusdata._id !== undefined ? cusdata._id : null)}>Delete</button>
                          </div>
                        </div>
                      </div>
                      : null}
                    <tr >
                      <td>{cusdata && cusdata.companyname !== undefined ? cusdata.companyname : null}</td>
                      <td className='logo-image'>
                        <img src={cusdata && cusdata.logo !== undefined ? cusdata.logo : null} />
                      </td>
                      <td>{cusdata && cusdata.email !== undefined ? cusdata.email : null}</td>
                      <td>{firstlastname}</td>
                      <td>{cusdata && cusdata.monthly_limit !== undefined ? cusdata.monthly_limit : null}</td>
                      <td>{cusdata && cusdata.accountType !== undefined ? cusdata.accountType : null}</td>
                      <td>{cusdata && cusdata.billsEmail !== undefined ? cusdata.billsEmail : null}</td>
                      <td>{cusdata && cusdata.sandbox_account !== undefined ? cusdata.sandbox_account == "true" ? <span className='sandbox-right-icon' ><TiTick /></span> : cusdata.sandbox_account == "false" ? <span className='sandbox-wrong-icon'>{notverified}</span> : <span className='sandbox-wrong-icon'>{notverified}</span> : null}</td>
                      <td className='edit-btn main' onClick={() => handleSingCust(cusdata && cusdata.email !== undefined ? cusdata.email : null)}><span className='cust-edit-btn'>Edit</span></td>
                      <td className='edit-btn main' onClick={() => handleDelCust(cusdata && cusdata._id !== undefined ? cusdata._id : null)}><span className='cust-edit-btn'>Delete</span></td>

                    </tr>
                    <tr className='blank-tr'></tr>
                  </>
                )
              }) : null}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
  const updateCustomer = (
    <>
      <div className="addverif-popup-main addclient-main">
        <div className="addverif-popup-main_inner_sec addclient-inner">
          <button className="close-btn-verif" id="closeButton" onClick={handleClosepop} ><AiOutlineClose /></button>
          <div className="addverif-popup">
            <h2>Edit Customer</h2>
            <form className="addverif-form">
              <div className="modal_form_verficatn_btn_main">
                <div className="modal_form_verficatn_btn_main_inner">
                  <label>
                    <span>Company Name</span></label>
                  <input type="text" name='company_name'
                    value={updcompanyName}
                    onChange={(e) => handleUpdCompanyName(e)} />

                </div>

                <div className="modal_form_verficatn_btn_main_inner">
                  <label><span>Logo</span></label>
                  <FileBase64
                    multiple={true}
                    onDone={handleUpdImage} />
                </div>
              </div>

              <div className="email-billing-email-fullwidth">
                <div className="modal_form_verficatn_btn_main_inner">
                  <label>
                    <span>Email</span> </label>
                  <input type="text" name='email'
                    value={updemail}
                    onChange={(e) => handleUpdEmail(e)} />

                </div>
                <div className="modal_form_verficatn_btn_main_inner">
                  <label><span>Billing Email</span></label>
                  <input type='text' name='bills_email'
                    value={updbillEmail}
                    onChange={(e) => handleUpdBillEmail(e)} />
                </div>
               
              </div>
              <div className="modal_form_verficatn_btn_main">
              <div className="modal_form_verficatn_btn_main_inner">
                  <label><span>First Name</span></label>
                  <input type="text" name='fname'
                    value={updfrstName}
                    onChange={(e) => handleUpdFname(e)} />
                </div>
                <div className="modal_form_verficatn_btn_main_inner">
                  <label>
                    <span>Last Name</span> </label>
                  <input type="text" name='last_name'
                    value={updlastName}
                    onChange={(e) => handleUpdLname(e)} />

                </div>
                
              </div>
              {/* {singleCustomer?.sandbox_account!=="true"? */}
              <div className="modal_form_verficatn_btn_main">
                <div className="modal_form_verficatn_btn_main_inner">
                  <label>
                    <span>Monthly Limit</span> </label>
                  <input type="number" name='last_name'
                    value={updMonthLimit}
                    onChange={(e) => handleUpdLimit(e)}
                  />

                </div>
                <div className="modal_form_verficatn_btn_main_inner">
                  <label>
                    <span>Account Type</span>
                  </label>
                  <select id='selectedType' onChange={(e) => handleUpdAcctype(e)} value={updaccType}>
                    <option>Sandbox</option>
                    <option>Live</option>

                  </select>
                </div>
                {/* <div className="modal_form_verficatn_btn_main_inner">
                  <label><span>Limit Addon</span></label>
                  <input type='number' name='bills_email'
                    value={0}
                    onChange={(e) => handleAdon(e)}
                  />
                </div> */}
              </div>

              <div className="modal_form_verficatn_btn_main">
                <div className="modal_form_verficatn_btn_main_inner">
                  <label>
                    <span>Public key</span></label>
                  <input type="text" name='pub_key' value={updPubKey} onChange={(e) => handlePubKey(e)} />

                </div>
                <div className="modal_form_verficatn_btn_main_inner">
                  <label><span>Private key</span></label>
                  <input type='text' name='priv_key' value={updPrivKey} onChange={(e) => handlePrivKey(e)} />
                </div>
              </div>
              <div className="modal_form_verficatn_btn_main">
                
                
              </div>
              <div className="sandbox-acc-checkbox">
                <label>Suspend Account</label>
                <input type="checkbox" checked={suspendAcc=="1"?true:false} onChange={handleSuspend} />
              </div>

              <div className="sandbox-acc-checkbox">
                <label>Tms</label>
                <input type="checkbox" checked={TmsAccess=="true"?true:TmsAccess=="false"?false:null} onChange={handleTms} />
              </div>

              <button className="loaderImageS images-upadtedbtn" onClick={(e) => handleUpdateCustomer(e, singleCustomer && singleCustomer._id !== undefined ? singleCustomer._id : null,singleCustomer && singleCustomer.email !== undefined ? singleCustomer.email : null)}>{loading ? <LoadingIcons.Bars /> : "update"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
  return (
    <>
      {customerLists}
      {customerEdit ?
        <>
          {updateCustomer}
        </>
        : null}
    </>
  )
}

export default CustomerListing
