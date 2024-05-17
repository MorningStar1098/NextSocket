/* eslint-disable */
import React from 'react'
import { toast } from 'react-toastify';

function Rawdata(props) {
    const { singleTransaction } = props
    const coppyToast=() => toast.success("Data Copy Successfully")
    const RawRequest={"ip":singleTransaction?.data?.ip_details?.ip,"gift":"","email":singleTransaction?.data?.email_details?.email,"items":[{"item_id":"","item_url":"","item_name":"","item_price":"","item_store":"","item_category":"","item_quantity":"","item_custom_fields":{},"item_store_country":""},{"item_id":"","item_url":"","item_name":"","item_price":"","item_store":"","item_category":"","item_quantity":"","item_custom_fields":{},"item_store_country":""}],"config":{"ip":{"include":"flags,history,id","timeout":2000,"version":"v1.1"},"email":{"include":"flags,history,id","timeout":2000,"version":"v2.2"},"phone":{"include":"flags,history,id","timeout":2000,"version":"v1.4"},"ip_api":true,"email_api":true,"phone_api":true,"response_fields":"id,state,fraud_score,ip_details,email_details,phone_details,bin_details,version,applied_rules,device_details,calculation_time,seon_id","device_fingerprinting":false,"ignore_velocity_rules":false},"session":"","user_id":"123abcd","brand_id":"","card_bin":"","user_dob":"","user_zip":"","card_hash":"","card_last":"","device_id":"4ee9","status_3d":"Y","user_city":"","user_name":" ","avs_result":"","cvv_result":"","order_memo":"","regulation":"","sca_method":"","action_type":singleTransaction?.data?.account_type,"billing_zip":"","card_expire":"","details_url":"","merchant_id":"ab01-cd23-4567","user_region":"","user_street":"","affiliate_id":"","billing_city":"","email_domain":singleTransaction?.data?.email_details?.domain_details?.domain,"gift_message":"","payment_mode":"","phone_number":singleTransaction?.data?.phone_details?.number,"shipping_zip":"","user_balance":"","user_country":"","user_created":"","user_street2":"","billing_phone":"","card_fullname":"","custom_fields":{"days_to_board":1,"arrival_airport":"MXP","departure_airport":"BUD","is_intangible_item":true,"is_pay_on_delivery":true},"discount_code":"","password_hash":"","shipping_city":"","user_category":"","user_fullname":" ","affiliate_name":"","billing_region":"","billing_street":"","shipping_phone":"","transaction_id":"","user_bank_name":"","billing_country":"","billing_street2":"","shipping_method":"","shipping_region":"","shipping_street":"","merchant_country":"","payment_provider":"","shipping_country":"","shipping_street2":"","transaction_type":"","bonus_campaign_id":"","merchant_category":"","receiver_fullname":"","shipping_fullname":"","user_bank_account":"","transaction_amount":"","merchant_created_at":"","user_account_status":"","transaction_currency":"","receiver_bank_account":"","user_verification_level":""}
    const newFormatCopyData = (elem) => {             //To copy the data on click
        const elTable = document.querySelector(elem);
        let range;
        let sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(elTable);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(elTable);
                sel.addRange(range);
            }
            document.execCommand('copy');
        }
        sel.removeAllRanges();
         coppyToast();
    }
    function handleCoppy() {
        alert(12)
        newFormatCopyData("#tab-textdata-id")
    }
    function handleCoppyReq() {
        alert(1)
        newFormatCopyData("#tab-textdata-id-request")
    }
    return (
        <div className='request-response-main'>
            <div className='request-section'>
            <div className='response-section request'>
                <div className='response-text'>
                    <span>Request</span>
                </div>
                <div className='response-coppy-button response'>
                    <div className='response-data' id='tab-textdata-id-request'>
                    <div className='coppy-button-request'>
                            <button onClick={handleCoppyReq}>Copy Json</button>
                        </div>
                        <pre className="layout__item u-1/2-lap-and-up">
                            {JSON.stringify(RawRequest, null, 2)}
                        </pre>
                       
                    </div>

                </div>
            </div>
            
            </div>
            <div className='response-section'>
                <div className='response-text'>
                    <span>Response</span>
                </div>
                <div className='response-coppy-button'>
                    <div className='response-data' id='tab-textdata-id'>
                        <pre className="layout__item u-1/2-lap-and-up">
                            {JSON.stringify(singleTransaction, null, 2)}
                        </pre>
                        <div className='coppy-button'>
                            <button onClick={handleCoppy}>Copy Json</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Rawdata