/* eslint-disable */
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst'
import LoadingIcons from 'react-loading-icons'
import FileBase64 from 'react-file-base64';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

function AddClient() {
    const router = useRouter()
    const createToast = () => toast.success("User created successfully")
    const errTost = () => toast.error("user already exist")
    const validationError = () => toast.error("Please fill all the fields first")

    const [clientPop, setClientPop] = useState(false)
    const [loading, setLoading] = useState(false)
    const [companyName, setCompanyName] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [email, setEmail] = useState("")
    const [frstName, setFrstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [accType, setAccType] = useState("")
    const [billEmail, setBillEmail] = useState("")
    const [pubKey, setPubKey] = useState("")
    const [privKey, setPrivKey] = useState("")
    // =======================================
    const [monthlyLimit, setMonthlyLimit] = useState("")
    // const [adonLimit, setAdonLimit] = useState("")
    // =================================================
    const [sandboxAcc, setSandboxAcc] = useState("")
    const [TmsAccess,setTmsAccess]=useState("")

    const paccType = accType == "Sandbox" ? "Sandbox" : accType == "Live" ? "Live" : "Sandbox"
    const setSandAcc = sandboxAcc == true ? "true" : sandboxAcc == false ? "false" : "false"
    const setTmsAcc= TmsAccess == true ? "true" : TmsAccess == false ? "false" : "false"
    // console.log("setTmsAcc",setTmsAcc);
    // const lmtAdon = adonLimit !== "" ? adonLimit : "0"
    const demoscan_limit = accType == "Sandbox" ? "100" : "100"

    const emlRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    function handleCompanyName(e) {
        setCompanyName(e.target.value)
    }
    function handleEmail(e) {
        e.target.style.borderColor = "white";
        setEmail(e.target.value)
    }
    function handleFname(e) {
        setFrstName(e.target.value)
    }
    function handleLname(e) {
        setLastName(e.target.value)
    }
    function handleAcctype(e) {
        setAccType(e.target.value)
    }
    function handleBillEmail(e) {
        setBillEmail(e.target.value)
    }

    function handleClientPop() {
        setClientPop(true)
    }
    function handelCloseVerif() {
        setClientPop(false)
    }
    let pdfUrl
    function handeImage(data) {
        setSelectedImage(data[0].base64)
    }



    function handlePubKey(e) {
        setPubKey(e.target.value)
    }

    function handlePrivKey(e) {
        setPrivKey(e.target.value);
    }

    // ==============================================================
    function handleSandbox(e) {
        setSandboxAcc(e.target.checked)
    }
    function handleMonthLimit(e) {
        setMonthlyLimit(e.target.value)
    }
    function handleTMS(e) {
        setTmsAccess(e.target.checked)
    }
    // function handleLimitAdon(e) {
    //     setAdonLimit(e.target.value)
    // }

    function handleCreateAcc(e) {

        e.preventDefault();
        if (email == "" || emlRegex.test(email) == false) {
            document.getElementById("uname").style.borderColor = "red"
        }

        else {
            setLoading(true)
            let body = JSON.stringify({
                companyname: companyName,
                logo: selectedImage,
                email: email,
                firstname: frstName,
                lastname: lastName,
                accountType: paccType,
                billsEmail: billEmail,
                publickey: pubKey,
                sandboxacc: setSandAcc,
                privatekey: privKey,
                monthlimit: sandboxAcc == true ? "5" : monthlyLimit,
                // limitadon: lmtAdon,
                scanLimit: demoscan_limit,
                tms:setTmsAcc

            })
            axios.post(`${LIVE_URL}/api/v1/customer/register`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors',
            }).then((response) => {
                if (response.data.message == "data register successfully") {
                    createToast()
                    setLoading(false)
                    setClientPop(false)
                    router.push(window.location, null, { shallow: true })
                }
                else {
                    setLoading(false)
                    errTost()
                }
            })
                .catch(() => {

                })
        }
    }

    // pdf code here

    // ends here

    return (
        <>
            {clientPop ?
                <div className="addverif-popup-main addclient-main">
                    <div className={sandboxAcc ? "addverif-popup-main_inner_sec addclient-inner" : "add-client-long-inner"}>
                        <button className="close-btn-verif" onClick={handelCloseVerif}><AiOutlineClose /></button>
                        <div className="addverif-popup">
                            <h2>Create a new client</h2>


                            <form className="addverif-form">
                                <div className="modal_form_verficatn_btn_main">
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label>
                                            <span>Company Name</span></label>
                                        <input type="text" name='company_name' onChange={(e) => handleCompanyName(e)} />
                                    </div>
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label><span>Logo</span></label>
                                        <FileBase64
                                            multiple={true}
                                            onDone={handeImage} />
                                    </div>
                                </div>
                                <div className='email-billing-email-fullwidth'>
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label>
                                            <span>Email</span> </label>
                                        <input type="text" name='email' id="uname" onChange={(e) => handleEmail(e)} />
                                    </div>
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label><span>Billing Email</span></label>
                                        <input type='text' name='bills_email' onChange={(e) => handleBillEmail(e)} />
                                    </div>
                                </div>
                                
                                <div className="modal_form_verficatn_btn_main">
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label><span>First Name</span></label>
                                        <input type="text" name='fname' onChange={(e) => handleFname(e)} />
                                    </div>
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label>
                                            <span>Last Name</span> </label>
                                        <input type="text" name='last_name' onChange={(e) => handleLname(e)} />

                                    </div>

                                </div>
                                {!sandboxAcc ?
                                    <div className="modal_form_verficatn_btn_main">
                                        <div className="modal_form_verficatn_btn_main_inner">
                                            <label>
                                                <span>Monthly Limit</span> </label>
                                            <input type="number" name='last_name' onChange={(e) => handleMonthLimit(e)} />

                                        </div>
                                        <div className="modal_form_verficatn_btn_main_inner">
                                            <label>
                                                <span>Account Type</span>
                                            </label>
                                            <select id='selectedType' onChange={(e) => handleAcctype(e)}>
                                                <option>Sandbox</option>
                                                <option>Live</option>
                                            </select>
                                        </div>
                                        {/* <div className="modal_form_verficatn_btn_main_inner">
                                            <label><span>Limit Addon</span></label>
                                            <input type='number' name='bills_email' onChange={(e) => handleLimitAdon(e)} />
                                        </div> */}
                                    </div> : null}

                                <div className="modal_form_verficatn_btn_main">
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label>
                                            <span>Public key</span></label>
                                        <input type="text" name='pub_key' onChange={(e) => handlePubKey(e)} />

                                    </div>
                                    <div className="modal_form_verficatn_btn_main_inner">
                                        <label><span>Private key</span></label>
                                        <input type='text' name='priv_key' onChange={(e) => handlePrivKey(e)} />
                                    </div>
                                </div>
                                {/* <div className="modal_form_verficatn_btn_main"> */}
                                <div className="sandbox-acc-checkbox">
                                    <label>Demo Account</label>
                                    <input type="checkbox" onChange={handleSandbox} />
                                </div>
                                <div className="sandbox-acc-checkbox">
                                    <label>TMS</label>
                                    <input type="checkbox" onChange={handleTMS} />
                                </div>
                                {/* </div> */}
                                <button className="loaderImageS" onClick={handleCreateAcc} >{loading ? <LoadingIcons.Bars /> : "create"}</button>
                            </form>
                        </div>
                    </div>
                </div>

                : null}

            <div className="addverification-button addclient-main">
                <button onClick={handleClientPop}>Add Client</button>
            </div>
        </>
    )
}
export default AddClient
