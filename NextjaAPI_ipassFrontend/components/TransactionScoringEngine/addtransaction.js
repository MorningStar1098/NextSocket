/* eslint-disable */
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import { LIVE_URL } from "../../Hooks/envConst"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Addtransaction(props) {
    const { setIsTransactionPopup } = props
    const createToast = () => toast.success("Transaction created successfully")
    const emlRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const base64Email = atob(Cookies.get('email'))
    const currentDate = new Date();
    const currDate = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()
    const currMonth = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth()+1}` : currentDate.getMonth()+1
    const currYear = currentDate.getFullYear()
    const finalDate = `${currYear}-${currMonth}-${currDate}`
    console.log("currentDate", finalDate);

    const formik = useFormik({
        initialValues: {
            // Common fields
            user_ip: '',
            acc_type: '',
            affilated_id: '',
            affilated_name: '',
            email: '',
            email_domain: '',
            password_hash: '',
            full_name: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            user_dob: '',
            birth_place: '',
            photo_id: '',
            user_id: '',
            user_name: '',
            transaction_id: '',
            user_category: '',
            acc_status: '',
            user_created: '',
            user_country: '',
            user_city: '',
            region: '',
            user_zip: '',
            user_streat: '',
            user_streat2: '',
            transaction_type: '',
            phone_number: '',
            bonus_camping: '',
            merchant_id: '',
            // Payment Fields
            order_memo: '',
            payment_mode: '',
            card_fullName: '',
            card_bin: '',
            card_hash: '',
            card_last: '',
            card_expire: '',
            avs_result: '',
            cvv_result: '',
            payment_provider: '',
            transaction_amount: '',
            transaction_currency: '',
            brand_id: '',
            item_id: '',
            item_quantity: '',
            item_name: '',
            item_price: '',
            item_store: '',
            store_country: '',
            item_category: '',
            shipping_country: '',
            shipping_city: '',
            shipping_region: '',
            shipping_zip: '',
            shipping_streat: '',
            shipping_streat2: '',
            shipping_phone: '',
            shipping_fullName: '',
            shipping_method: '',
            billing_country: '',
            billing_city: '',
            billing_region: '',
            billing_zip: '',
            billing_streat: '',
            billing_phone: '',
            discount_code: '',
            gift: '',
            gift_message: '',
            // Withdrawl field
            user_bank_account: '',
            user_bank_name: '',
            user_balance: '',
            merchant_category: ''
        },
        onSubmit: values => {
            if (values.acc_type == "ACCOUNT_REGISTER" || values.acc_type == "ACCOUNT_LOGIN" || values.acc_type == '') {
                if (values.email == "" || emlRegex.test(values.email) == false) {
                    document.getElementById("email").style.borderColor = "red"
                } else if (values.user_ip == "" && values.email !== "") {
                    document.getElementById("user_ip").style.borderColor = "red"
                    document.getElementById("email").style.border = "#e6ebf4"
                } else if (values.phone_number == "" && values.user_ip !== "" && values.email !== "") {
                    document.getElementById("phone_number").style.borderColor = "red"
                    document.getElementById("email").style.border = "#e6ebf4"
                    document.getElementById("user_ip").style.border = "#e6ebf4"
                } else {
                    document.getElementById("phone_number").style.borderColor = "#e6ebf4"
                    document.getElementById("email").style.border = "#e6ebf4"
                    document.getElementById("user_ip").style.border = "#e6ebf4"
                    console.log("in else");
                    const body = {
                        "Ip": values.user_ip,
                        "action_type": values.acc_type == '' ? "ACCOUNT_REGISTER" : values.acc_type,
                        "Affiliate_id": values.affilated_id,
                        "Affiliate_name": values.affilated_name,
                        "email": values.email,
                        "email_domain": values.email_domain,
                        "password_hash": values.password_hash,
                        "user_fullname": values.full_name,
                        "user_firstname": values.first_name,
                        "user_middlename": values.middle_name,
                        "user_lastname": values.last_name,
                        "user_dob": values.user_dob,
                        "user_pob": values.birth_place,
                        "user_photoid_number": values.photo_id,
                        "user_id": values.user_id,
                        "user_name": values.user_name,
                        "transaction_id": values.transaction_id,
                        "user_category": values.user_category,
                        "user_account_status": values.acc_status,
                        "user_created": values.user_created,
                        "user_country": values.user_country,
                        "user_city": values.user_city,
                        "user_region": values.region,
                        "user_zip": values.user_zip,
                        "user_street": values.user_streat,
                        "user_street2": values.user_streat2,
                        "session": values.user_ip,
                        "phone_number": values.phone_number,
                        "transaction_type": values.transaction_type,
                        "bonus_campaign_id": values.bonus_camping,
                        "merchant_id": values.merchant_id,
                        "details_url": values.user_ip,
                        // "custom_fields": values.user_ip, 
                        "user_email": base64Email,
                        "date": finalDate,
                        "account_type": values.acc_type
                    }
                    // console.log("val", body);
                    axios.post(`${LIVE_URL}/api/v1/ipass/addtransaction/registerlogin`, body, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }).then((response) => {
                        // console.log("res", response);
                        if (response.data.success == true) {
                            setIsTransactionPopup(false)
                            createToast()
                        }
                    })
                }
                // console.log(body);
            }
            if (values.acc_type == "PAYMENT") {
                console.log("payment");
                if (values.email == "" || emlRegex.test(values.email) == false) {
                    document.getElementById("email").style.borderColor = "red"
                } else if (values.user_ip == "" && values.email !== "") {
                    document.getElementById("user_ip").style.borderColor = "red"
                    document.getElementById("email").style.border = "#e6ebf4"
                } else if (values.phone_number == "" && values.user_ip !== "" && values.email !== "") {
                    document.getElementById("phone_number").style.borderColor = "red"
                    document.getElementById("email").style.border = "#e6ebf4"
                    document.getElementById("user_ip").style.border = "#e6ebf4"
                } else {
                    const body = {
                        "Ip": values.user_ip,
                        "action_type": values.acc_type == '' ? "ACCOUNT_REGISTER" : values.acc_type,
                        "Affiliate_id": values.affilated_id,
                        "Affiliate_name": values.affilated_name,
                        "email": values.email,
                        "email_domain": values.email_domain,
                        "password_hash": values.password_hash,
                        "user_fullname": values.full_name,
                        "user_firstname": values.first_name,
                        "user_middlename": values.middle_name,
                        "user_lastname": values.last_name,
                        "user_dob": values.user_dob,
                        "user_pob": values.birth_place,
                        "user_photoid_number": values.photo_id,
                        "user_id": values.user_id,
                        "user_name": values.user_name,
                        "transaction_id": values.transaction_id,
                        "user_category": values.user_category,
                        "user_account_status": values.acc_status,
                        "user_created": values.user_created,
                        "user_country": values.user_country,
                        "user_city": values.user_city,
                        "user_region": values.region,
                        "user_zip": values.user_zip,
                        "user_street": values.user_streat,
                        "user_street2": values.user_streat2,
                        "session": values.user_ip,
                        "phone_number": values.phone_number,
                        "transaction_type": values.transaction_type,
                        "bonus_campaign_id": values.bonus_camping,
                        "merchant_id": values.merchant_id,
                        "details_url": values.user_ip,
                        // "custom_fields": payment, 
                        "order_memo": values.order_memo,
                        "payment_mode": values.payment_mode,
                        "card_fullname": values.card_fullName,
                        "card_bin": values.card_bin,
                        "card_hash": values.card_hash,
                        "card_last": values.card_last,
                        "card_expire": values.card_expire,
                        "avs_result": values.avs_result,
                        "cvv_result": values.cvv_result,
                        "payment_provider": values.payment_provider,
                        "transaction_amount": values.transaction_amount,
                        "transaction_currency": values.transaction_currency,
                        "brand_id": values.brand_id,
                        "item_id": values.item_id,
                        "item_quantity": values.item_quantity,
                        "item_name": values.item_name,
                        "item_price": values.item_price,
                        "item_store": values.item_store,
                        "item_store_country": values.store_country,
                        "item_category": values.item_category,
                        "shipping_country": values.shipping_country,
                        "shipping_city": values.shipping_city,
                        "shipping_region": values.shipping_region,
                        "shipping_zip": values.shipping_zip,
                        "shipping_street": values.shipping_streat,
                        "shipping_street2": values.shipping_streat,
                        "shipping_phone": values.shipping_phone,
                        "shipping_fullname": values.shipping_fullName,
                        "shipping_method": values.shipping_method,
                        "billing_country": values.billing_country,
                        "billing_city": values.billing_city,
                        "billing_region": values.billing_region,
                        "billing_zip": values.billing_zip,
                        "billing_street": values.billing_streat,
                        "billing_phone": values.billing_phone,
                        "discount_code": values.discount_code,
                        "gift": values.gift,
                        "gift_message": values.gift_message,
                        "user_email": base64Email,
                        "date": finalDate,
                        "account_type": values.acc_type
                    }
                    console.log(body);
                    axios.post(`${LIVE_URL}/api/v1/ipass/addtransaction/payment`, body, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }).then((response) => {
                        if (response.data.success == true) {
                            setIsTransactionPopup(false)
                            createToast()
                        }
                    })
                }
            }
            if (values.acc_type == "WITHDRAWAL") {
                console.log("withdrawl");
                if (values.email == "" || emlRegex.test(values.email) == false) {
                    document.getElementById("email").style.borderColor = "red"
                } else if (values.user_ip == "" && values.email !== "") {
                    document.getElementById("user_ip").style.borderColor = "red"
                    document.getElementById("email").style.border = "#e6ebf4"
                } else if (values.phone_number == "" && values.user_ip !== "" && values.email !== "") {
                    document.getElementById("phone_number").style.borderColor = "red"
                    document.getElementById("email").style.border = "#e6ebf4"
                    document.getElementById("user_ip").style.border = "#e6ebf4"
                } else {
                    const body = {
                        "Ip": values.user_ip,
                        "action_type": values.acc_type == '' ? "ACCOUNT_REGISTER" : values.acc_type,
                        "Affiliate_id": values.affilated_id,
                        "Affiliate_name": values.affilated_name,
                        "email": values.email,
                        "email_domain": values.email_domain,
                        "password_hash": values.password_hash,
                        "user_fullname": values.full_name,
                        "user_firstname": values.first_name,
                        "user_middlename": values.middle_name,
                        "user_lastname": values.last_name,
                        "user_dob": values.user_dob,
                        "user_pob": values.birth_place,
                        "user_photoid_number": values.photo_id,
                        "user_id": values.user_id,
                        "user_name": values.user_name,
                        "transaction_id": values.transaction_id,
                        "user_category": values.user_category,
                        "user_account_status": values.acc_status,
                        "user_created": values.user_created,
                        "user_country": values.user_country,
                        "user_city": values.user_city,
                        "user_region": values.region,
                        "user_zip": values.user_zip,
                        "user_street": values.user_streat,
                        "user_street2": values.user_streat2,
                        "session": values.user_ip,
                        "phone_number": values.phone_number,
                        "transaction_type": values.transaction_type,
                        "bonus_campaign_id": values.bonus_camping,
                        "merchant_id": values.merchant_id,
                        "details_url": values.user_ip,
                        // "custom_fields": payment, 
                        "order_memo": values.order_memo,
                        "payment_mode": values.payment_mode,
                        "payment_provider": values.payment_provider,
                        "transaction_amount": values.transaction_amount,
                        "transaction_currency": values.transaction_currency,
                        "billing_country": values.billing_country,
                        "billing_city": values.billing_city,
                        "billing_region": values.billing_region,
                        "billing_zip": values.billing_zip,
                        "billing_street": values.billing_streat,
                        "billing_phone": values.billing_phone,
                        "user_bank_account": values.user_bank_account,
                        "user_bank_name": values.user_bank_name,
                        "user_balance": values.user_balance,
                        "merchant_category": values.merchant_category,
                        "user_email": base64Email,
                        "date": finalDate,
                        "account_type": values.acc_type
                    }
                    console.log(body);
                    axios.post(`${LIVE_URL}/api/v1/ipass/addtransaction/withdrawl`, body, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }).then((response) => {
                        console.log("res", response);
                        if (response.data.success == true) {
                            setIsTransactionPopup(false)
                            createToast()
                        }
                    })
                }
            }
        },
    });
    function handleClose() {
        setIsTransactionPopup(false)
    }
    return (
        <>
            <div className='headding-close'>
                <h3>Add Transaction</h3>
                <div className='close-btn-addtransaction' onClick={handleClose}>
                    <AiOutlineClose />
                </div>
            </div>
            <div className='transaction-popup-inner'>

                <form className='add-transaction-form' onSubmit={formik.handleSubmit}>
                    {/* similar fields */}
                    <div>
                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Ip Address</label>
                                {/* {formik.touched.user_ip && formik.errors.user_ip ? (
                            <div>{formik.errors.user_ip}</div>
                        ) : null} */}
                                <input
                                    id="user_ip"
                                    name="user_ip"
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder='eg 1.1.1.1'
                                    value={formik.values.user_ip}
                                />
                            </div>
                            <div className='input-box-label'>
                                <label>Account Type</label>
                                <select id="acc_type" name="acc_type" as="select" className="my-select" onChange={formik.handleChange}>
                                    <option>ACCOUNT_LOGIN</option>
                                    <option>ACCOUNT_REGISTER</option>
                                    <option>PAYMENT</option>
                                    <option>WITHDRAWAL</option>
                                </select>
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Affilated Id</label>
                                <input
                                    id="affilated_id"
                                    name="affilated_id"
                                    type='text'
                                    onChange={formik.handleChange}
                                    placeholder='unique identifire'
                                    value={formik.values.affilated_id}
                                />
                            </div>
                            {formik.values.acc_type !== "Withdrawl" ?
                                <div className='input-box-label'>
                                    <label>Affilated Name</label>
                                    <input
                                        id="affilated_name"
                                        name="affilated_name"
                                        type='text'
                                        onChange={formik.handleChange}
                                        placeholder='eg jdoe345'
                                        value={formik.values.affilated_name}
                                    />
                                </div> : null}
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                {/* {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null} */}
                                <label>Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type='text'
                                    onChange={formik.handleChange}
                                    placeholder='xyz@abc.com'
                                    value={formik.values.email}
                                />
                            </div>
                            <div className='input-box-label'>
                                <label>Email Domain</label>
                                <input
                                    id="email_domain"
                                    name="email_domain"
                                    type='text'
                                    onChange={formik.handleChange}
                                    placeholder='@abc.com'
                                    value={formik.values.email_domain}
                                />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Password Hash</label>
                                <input
                                    id="password_hash"
                                    name="password_hash"
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.password_hash}
                                />
                            </div>
                            <div className='input-box-label'>
                                <label>Full Name</label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.full_name}
                                    placeholder='John Doe' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>First Name</label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.first_name}
                                    placeholder='John' />
                            </div>
                            <div className='input-box-label'>
                                <label>Middle Name</label>
                                <input
                                    id="middle_name"
                                    name="middle_name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.middle_name}
                                    placeholder='Something' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Last Name</label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.last_name}
                                    placeholder='Doe' />
                            </div>
                            <div className='input-box-label'>
                                <label>DOB</label>
                                <input
                                    id="user_dob"
                                    name="user_dob"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.user_dob}
                                    placeholder='YYYY-MM-DD' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Place of Birth</label>
                                <input
                                    id="birth_place"
                                    name="birth_place"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.birth_place}
                                    placeholder='IN' />
                            </div>
                            <div className='input-box-label'>
                                <label>Photo Id Number</label>
                                <input
                                    id="photo_id"
                                    name="photo_id"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.photo_id}
                                />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>User Id</label>
                                <input
                                    id="user_id"
                                    name="user_id"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_id}
                                    placeholder='eg 00ab11-as2233' />
                            </div>
                            <div className='input-box-label'>
                                <label>User Name</label>
                                <input
                                    id="user_name"
                                    name="user_name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_name}
                                    placeholder='jdoe325' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Transaction Id</label>
                                <input
                                    id="transaction_id"
                                    name="transaction_id"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.transaction_id}
                                    placeholder='eg:98db9a56b2e3' />
                            </div>
                            <div className='input-box-label'>
                                <label>User Category</label>
                                <input
                                    id="user_category"
                                    name="user_category"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_category}
                                    placeholder='eg:VIP' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>User Account Status</label>
                                <input
                                    id="acc_status"
                                    name="acc_status"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.acc_status}
                                    placeholder='eg:login_blocked' />
                            </div>
                            <div className='input-box-label'>
                                <label>User Created</label>
                                <input
                                    id="user_created"
                                    name="user_created"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_created}
                                    placeholder='eg:1446370717' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>User Country</label>
                                <input
                                    id="user_country"
                                    name="user_country"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_country}
                                    placeholder='eg:US' />
                            </div>
                            <div className='input-box-label'>
                                <label>User City</label>
                                <input
                                    id="user_city"
                                    name="user_city"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_city}
                                    placeholder='eg:London' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>User Region</label>
                                <input
                                    id="region"
                                    name="region"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.region}
                                    placeholder='eg:NY' />
                            </div>
                            <div className='input-box-label'>
                                <label>Zip Code</label>
                                <input
                                    id="user_zip"
                                    name="user_zip"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_zip}
                                    placeholder='eg:10005' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>User Streat</label>
                                <input
                                    id="user_streat"
                                    name="user_streat"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_streat}
                                    placeholder='eg:157 W 26th St' />
                            </div>
                            <div className='input-box-label'>
                                <label>User Streat2</label>
                                <input
                                    id="user_streat2"
                                    name="user_streat2"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_streat2}
                                    placeholder='eg:Apt. 432' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Transaction Type</label>
                                <input
                                    id="transaction_type"
                                    name="transaction_type"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.transaction_type}
                                    placeholder='eg:purchase' />
                            </div>
                            <div className='input-box-label'>
                                <label>Phone Number</label>
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone_number}
                                    placeholder='eg:36704316088' />
                            </div>
                        </div>

                        <div className='two-inputs-main'>
                            <div className='input-box-label'>
                                <label>Bonus Campaing Id</label>
                                <input
                                    id="bonus_camping"
                                    name="bonus_camping"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bonus_camping}
                                    placeholder='eg:bonus100' />
                            </div>
                            <div className='input-box-label'>
                                <label>Merchant Id</label>
                                <input
                                    id="merchant_id"
                                    name="merchant_id"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.merchant_id}
                                    placeholder='eg:ab01-cd23-4567' />
                            </div>
                        </div>
                    </div>
                    {/* payment fields */}
                    {formik.values.acc_type == "PAYMENT" ?
                        <>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Oredr Memo</label>
                                    <input
                                        id="order_memo"
                                        name="order_memo"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.order_memo}
                                    // placeholder='eg:bonus100' 

                                    />
                                </div>
                                <div className='input-box-label'>
                                    <label>Payment Mode</label>
                                    <input
                                        id="payment_mode"
                                        name="payment_mode"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.payment_mode}
                                        placeholder='eg:card,paypal' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Card FullName</label>
                                    <input
                                        id="card_fullName"
                                        name="card_fullName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.card_fullName}
                                        placeholder='eg:Jhon Doe'
                                    />
                                </div>
                                <div className='input-box-label'>
                                    <label>Card Bin </label>
                                    <input
                                        id="card_bin"
                                        name="card_bin"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.card_bin}
                                        placeholder='first 4,6-9 digit card number' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Card Hash</label>
                                    <input
                                        id="card_hash"
                                        name="card_hash"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.card_hash}
                                        placeholder='eg:bonus100' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Card Last</label>
                                    <input
                                        id="card_last"
                                        name="card_last"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.card_last}
                                        placeholder='last 4 digits of card number' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Card Expire</label>
                                    <input
                                        id="card_expire"
                                        name="card_expire"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.card_expire}
                                        placeholder='eg:2022-01' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Avs Result</label>
                                    <input
                                        id="avs_result"
                                        name="avs_result"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.avs_result}
                                        placeholder='eg:N,A' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>CVV Result</label>
                                    <input
                                        id="cvv_result"
                                        name="cvv_result"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.cvv_result}
                                        placeholder='eg:true,false' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Payment Provider</label>
                                    <input
                                        id="payment_provider"
                                        name="payment_provider"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.payment_provider}
                                        placeholder='eg:skrill' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Transaction Amount</label>
                                    <input
                                        id="transaction_amount"
                                        name="transaction_amount"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.transaction_amount}
                                        placeholder='eg:539.99' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Transaction Currency</label>
                                    <input
                                        id="transaction_currency"
                                        name="transaction_currency"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.transaction_currency}
                                        placeholder='eg:INR,USD' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Brand Id</label>
                                    <input
                                        id="brand_id"
                                        name="brand_id"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.brand_id}
                                        placeholder='eg:brand1230' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Item Id</label>
                                    <input
                                        id="item_id"
                                        name="item_id"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.item_id}
                                        placeholder='eg:unique id' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Item Quantity</label>
                                    <input
                                        id="item_quantity"
                                        name="item_quantity"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.item_quantity}
                                        placeholder='eg:1,2,4' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Item Name</label>
                                    <input
                                        id="item_name"
                                        name="item_name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.item_name}
                                        placeholder='eg:Apple iPhone 6S 128Gb Silver' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Item Price</label>
                                    <input
                                        id="item_price"
                                        name="item_price"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.item_price}
                                        placeholder='eg:539.99' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Item Store</label>
                                    <input
                                        id="item_store"
                                        name="item_store"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.item_store}
                                        placeholder='eg:Brooklyn Electronics' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Item Store Country</label>
                                    <input
                                        id="store_country"
                                        name="store_country"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.store_country}
                                        placeholder='eg:US,DE' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Item Category</label>
                                    <input
                                        id="item_category"
                                        name="item_category"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.item_category}
                                    // placeholder='eg:ab01-cd23-4567'
                                    />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Shipping Country</label>
                                    <input
                                        id="shipping_country"
                                        name="shipping_country"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_country}
                                        placeholder='eg:US,DE' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Shipping City</label>
                                    <input
                                        id="shipping_city"
                                        name="shipping_city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_city}
                                        placeholder='eg:London,New York' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Shipping Region</label>
                                    <input
                                        id="shipping_region"
                                        name="shipping_region"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_region}
                                        placeholder='eg:NY,DE' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Shipping Zip</label>
                                    <input
                                        id="shipping_zip"
                                        name="shipping_zip"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_zip}
                                        placeholder='eg: 10005,PH1 1EU' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Shipping Streat</label>
                                    <input
                                        id="shipping_streat"
                                        name="shipping_streat"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_streat}
                                        placeholder='eg:157 W 26th St' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Shipping Streat2</label>
                                    <input
                                        id="shipping_streat2"
                                        name="shipping_streat2"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_streat2}
                                        placeholder='eg:157 W 26th St' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Shipping Phone</label>
                                    <input
                                        id="shipping_phone"
                                        name="shipping_phone"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_phone}
                                        placeholder='eg:36704316088' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Shipping FullName</label>
                                    <input
                                        id="shipping_fullName"
                                        name="shipping_fullName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_fullName}
                                        placeholder='eg:John Doe' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Shipping Method</label>
                                    <input
                                        id="shipping_method"
                                        name="shipping_method"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_method}
                                        placeholder='eg: standard,UPS' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Billing Country</label>
                                    <input
                                        id="billing_country"
                                        name="billing_country"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_country}
                                        placeholder='eg:US,DE' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Billing City</label>
                                    <input
                                        id="billing_city"
                                        name="billing_city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_city}
                                        placeholder='eg:London,New York' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Billing Region</label>
                                    <input
                                        id="billing_region"
                                        name="billing_region"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_region}
                                        placeholder='eg:NY,DE' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Billing Zip</label>
                                    <input
                                        id="billing_zip"
                                        name="billing_zip"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_zip}
                                        placeholder='eg:10005,PH1 1EU' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Billing Streat</label>
                                    <input
                                        id="billing_streat"
                                        name="billing_streat"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_streat}
                                        placeholder='eg:157 W 26th St' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Billing Phone</label>
                                    <input
                                        id="billing_phone"
                                        name="billing_phone"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_phone}
                                        placeholder='eg:36704316088' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Discount Code</label>
                                    <input
                                        id="discount_code"
                                        name="discount_code"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.discount_code}
                                        placeholder='eg:ab01-cd23-4567' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Gift</label>
                                    <input
                                        id="gift"
                                        name="gift"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gift}
                                        placeholder='eg:true or false' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Gift Message</label>
                                    <input
                                        id="gift_message"
                                        name="gift_message"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gift_message}
                                        placeholder='eg:true or false' />
                                </div>
                            </div>
                        </>
                        : null}
                    {/* withdrawl fields */}
                    {formik.values.acc_type == "WITHDRAWAL" ?
                        <>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Oredr Memo</label>
                                    <input
                                        id="order_memo"
                                        name="order_memo"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.order_memo}
                                    // placeholder='eg:bonus100' 

                                    />
                                </div>
                                <div className='input-box-label'>
                                    <label>Payment Mode</label>
                                    <input
                                        id="payment_mode"
                                        name="payment_mode"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.payment_mode}
                                        placeholder='eg:card,paypal' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>User Bank Account</label>
                                    <input
                                        id="user_bank_account"
                                        name="user_bank_account"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.user_bank_account}
                                        placeholder='eg:IBAN'

                                    />
                                </div>
                                <div className='input-box-label'>
                                    <label>User Bank Name</label>
                                    <input
                                        id="user_bank_name"
                                        name="user_bank_name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.user_bank_name}
                                        placeholder='User’s bank account’s name' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>User Balance</label>
                                    <input
                                        id="user_balance"
                                        name="user_balance"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.user_balance}
                                        placeholder='eg:1010.25'

                                    />
                                </div>
                                <div className='input-box-label'>
                                    <label>Merchant Category</label>
                                    <input
                                        id="merchant_category"
                                        name="merchant_category"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.merchant_category}
                                        placeholder='eg:digital_item_seller' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Transaction Amount</label>
                                    <input
                                        id="transaction_amount"
                                        name="transaction_amount"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.transaction_amount}
                                        placeholder='eg:539.99' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Transaction Currency</label>
                                    <input
                                        id="transaction_currency"
                                        name="transaction_currency"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.transaction_currency}
                                        placeholder='eg:INR,USD' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Billing Zip</label>
                                    <input
                                        id="billing_zip"
                                        name="billing_zip"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_zip}
                                        placeholder='eg:10005,PH1 1EU' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Billing Streat</label>
                                    <input
                                        id="billing_streat"
                                        name="billing_streat"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_streat}
                                        placeholder='eg:157 W 26th St' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Billing City</label>
                                    <input
                                        id="billing_city"
                                        name="billing_city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_city}
                                        placeholder='eg:London,New York' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Billing Region</label>
                                    <input
                                        id="billing_region"
                                        name="billing_region"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_region}
                                        placeholder='eg:NY,DE' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Billing Country</label>
                                    <input
                                        id="billing_country"
                                        name="billing_country"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_country}
                                        placeholder='eg:US,DE' />
                                </div>
                                <div className='input-box-label'>
                                    <label>Billing Phone</label>
                                    <input
                                        id="billing_phone"
                                        name="billing_phone"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.billing_phone}
                                        placeholder='eg:36704316088' />
                                </div>
                            </div>
                            <div className='two-inputs-main'>
                                <div className='input-box-label'>
                                    <label>Payment Provider</label>
                                    <input
                                        id="payment_provider"
                                        name="payment_provider"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.payment_provider}
                                        placeholder='eg:skrill' />
                                </div>
                                {/* <div className='input-box-label'>
                                    <label>Payment Mode</label>
                                    <input
                                        id="payment_mode"
                                        name="payment_mode"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.payment_mode}
                                        placeholder='eg:card,paypal' />
                                </div> */}
                            </div>
                        </> : null}

                    <div className='add-button'>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Addtransaction