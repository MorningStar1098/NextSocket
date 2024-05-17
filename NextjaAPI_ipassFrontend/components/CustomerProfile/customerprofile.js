import React, { useEffect, useState } from 'react'
// import Logo from '../public/images/logo.png'
import Link from 'next/link'
import { LIVE_URL } from '../../Hooks/envConst'
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'
import FileBase64 from 'react-file-base64';
import { toast } from 'react-toastify';

function CustomerProfile(props) {
    useEffect(() => {
        const { email } = props
        handleSingCust(email)
    }, [])
    const updateToast = () => toast.success("User updated successfully")

    const [customerprofileData, setCustomerProfileData] = useState([])
    const [editCustomer, setEditCustomer] = useState(false)
    const [profcompanyName, setProfCompanyName] = useState("")
    const [selectedProfImage, setSelectedProfImage] = useState(null);
    const [profemail, setProfEmail] = useState("")
    const [ProffrstName, setProfFrstName] = useState("")
    const [ProflastName, setProfLastName] = useState("")
    const [profmonthBal, setProfMonthBal] = useState("")
    const [profaccType, setProfAccType] = useState("")
    const [profbillEmail, setProfBillEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profPubKey, SetProfPubKey] = useState("")

    function handleSingCust(email) {
        axios.get(`${LIVE_URL}/api/v1/getuser/${email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {

            setCustomerProfileData(response && response.data && response.data.data !== undefined ? response.data.data : null)
            let apiResp = response && response.data && response.data.data !== undefined ? response.data.data : null
            setProfCompanyName(apiResp.companyname)
            setProfEmail(apiResp.email)
            setSelectedProfImage(apiResp.logo)
            setProfFrstName(apiResp.firstname)
            setProfLastName(apiResp.lastname)
            setProfMonthBal(apiResp.monthly_limit)
            SetProfPubKey(apiResp.token)
            //    setProfPrivKey(apiResp.private_key)
            setProfAccType(apiResp.accountType)
            setProfBillEmail(apiResp.billsEmail)
            setPassword(apiResp?.password)

        })
    }
    function handleEditCust() {
        setEditCustomer(true)
    }
    function handleClosepop() {
        setEditCustomer(false)

    }

    function handleProfCompanyName(e) {
        setProfCompanyName(e.target.value)
    }
    function handleProfImage(data) {
        setSelectedProfImage(data[0].base64)
    }
    function handleProfEmail(e) {
        setProfEmail(e.target.value)
    }
    function handleProfFname(e) {
        setProfFrstName(e.target.value)
    }
    function handleProfLname(e) {
        setProfLastName(e.target.value)
    }

    function handleUpdateCustomer(e, updId) {
        e.preventDefault();
        let body = JSON.stringify({
            companyname: profcompanyName,
            logo: selectedProfImage,
            email: profemail,
            firstname: ProffrstName,
            lastname: ProflastName,
            password: password
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
                setEditCustomer(false)
                handleSingCust(profemail)
                // window.location.reload(false);
            }
        })
    }

    const customerLists = (
        <>
            <div className="profile-page-main">
                <div className='profilepage-heading'>
                    <h2>Profile Information</h2>
                </div>
                <div className='profile-detail-main'>
                    <div className='profile-detail-inner'>
                        <div className='company-logo-main'>
                            <div className='company-name'>
                                <span>{customerprofileData && customerprofileData.companyname !== undefined ? customerprofileData.companyname : null}</span>
                            </div>
                            <div className='profile-logo'>
                                <img src={customerprofileData && customerprofileData.logo !== undefined ? customerprofileData.logo : null} />
                            </div>
                        </div>
                        <div className='email-billemail-main'>
                            <div className='customer-email'>
                                <span>{customerprofileData && customerprofileData.email !== undefined ? customerprofileData.email : null}</span>
                            </div>
                            <div className='customer-bills-email'>
                                <span>{customerprofileData && customerprofileData.billsEmail !== undefined ? customerprofileData.billsEmail : null}</span>
                            </div>
                        </div>
                        <div className='customer-firsrlast-name-main'>
                            <div className='customer-firstname'>
                                <span>{customerprofileData && customerprofileData.firstname !== undefined ? customerprofileData.firstname : null}</span>
                            </div>
                            <div className='customer-lastname'>
                                <span>{customerprofileData && customerprofileData.lastname !== undefined ? customerprofileData.lastname : null}</span>
                            </div>
                        </div>
                        <div className='monthbal-threshold-main'>
                            <div className='monthly-balance'>
                                <span>{customerprofileData && customerprofileData.monthly_limit !== undefined ? customerprofileData.monthly_limit : null}</span>
                            </div>
                            {/* <div className='customer-threshold'>
                            <span>{customerprofileData && customerprofileData.Threshold !== undefined ? customerprofileData.Threshold : null}</span>
                        </div> */}
                        </div>

                        <div className='monthbal-threshold-main'>
                            <div className='monthly-balance'>
                                <span>{customerprofileData && customerprofileData.token !== undefined ? customerprofileData.token : null}</span>
                            </div>
                            {/* <div className='customer-threshold'>
                            <span>{customerprofileData && customerprofileData.private_key !== undefined ? customerprofileData.private_key : null}</span>
                        </div> */}
                        </div>

                        <div className='customer-account-type'>
                            <span>{customerprofileData && customerprofileData.accountType !== undefined ? customerprofileData.accountType : null}</span>
                        </div>
                    </div>
                    <div className='edit-button-main'>
                        <button onClick={handleEditCust}>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
    const updateCustomer = (
        <>
            <div className="addverif-popup-main profcust-edit">
                <div className="addverif-popup-main_inner_sec addclient-inner">
                    <button className="close-btn-verif" id="closeButton" onClick={handleClosepop} ><AiOutlineClose /></button>
                    <div className="addverif-popup">
                        <h2>Edit Profile</h2>
                        <form className="addverif-form">
                            <div className="modal_form_verficatn_btn_main">
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label>
                                        <span>Company Name</span></label>
                                    <input type="text" name='company_name'
                                        value={profcompanyName}
                                        onChange={(e) => handleProfCompanyName(e)} />

                                </div>

                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label><span>Logo</span></label>
                                    <FileBase64
                                        multiple={true}
                                        onDone={handleProfImage}

                                    />
                                </div>
                            </div>

                            <div className="modal_form_verficatn_btn_main">
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label>
                                        <span>Email</span> </label>
                                    <input type="text" name='email'
                                        value={profemail}
                                        onChange={(e) => handleProfEmail(e)} />

                                </div>
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label><span>First Name</span></label>
                                    <input type="text" name='fname'
                                        value={ProffrstName}
                                        onChange={(e) => handleProfFname(e)} />
                                </div>
                            </div>
                            <div className="modal_form_verficatn_btn_main">
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label>
                                        <span>Last Name</span> </label>
                                    <input type="text" name='last_name'
                                        value={ProflastName}
                                        onChange={(e) => handleProfLname(e)} />

                                </div>
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label>
                                        <span>Monthly limit</span></label>
                                    <input type="text" name='last_name'
                                        value={profmonthBal} disabled="disabled"
                                    />

                                </div>
                            </div>
                            <div className="modal_form_verficatn_btn_main">
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label>
                                        <span>Api Token</span> </label>
                                    <input type="text" name='last_name'
                                        value={profPubKey} disabled="disabled"
                                    />

                                </div>
                                {/* <div className="modal_form_verficatn_btn_main_inner">
                                            <label>
                                                <span>Private key</span></label>
                                            <input type="text" name='last_name'
                                             value={profPrivkey} disabled="disabled"
                                             />

                                        </div> */}
                            </div>

                            {/* <div className="modal_form_verficatn_btn_main"> */}

                            {/* <div className="modal_form_verficatn_btn_main_inner">
                                            <label><span>Threshold</span></label>
                                            <input type='text' name='threshold'
                                             value={profthresHolds}
                                             onChange={(e) => handleProfThreshold(e)} />
                                        </div> */}
                            {/* </div> */}

                            <div className="modal_form_verficatn_btn_main">
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label>
                                        <span>Account Type</span>
                                    </label>
                                    <input type='text' disabled="disabled" value={profaccType} />

                                </div>
                                <div className="modal_form_verficatn_btn_main_inner">
                                    <label><span>Billing Email</span></label>
                                    <input type='text' name='bills_email'
                                        value={profbillEmail} disabled="disabled"
                                    //  onChange={(e) => handleProfBillEmail(e)}

                                    />
                                </div>
                            </div>
                            {/* <div className='myProfile-btn-update'> */}
                            <button className="loaderImageS images-upadtedbtn" onClick={(e) => handleUpdateCustomer(e, customerprofileData && customerprofileData._id !== undefined ? customerprofileData._id : null)}>update</button>
                            {/* </div> */}
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
    return (
        <>
            {/* <div className="logoBlock">
    <Link href="/dashboard">
      <img src={Logo.src} />
    </Link>
  </div> */}
            {customerLists}
            {editCustomer ?
                <>
                    {updateCustomer}
                </> : null
            }
        </>
    )
}
export default CustomerProfile