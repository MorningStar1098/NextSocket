import React, { useState } from 'react'
import Header from '../components/Header/header'
import CustomerListing from '../components/CustomerListing/customerlisting'
function CustomerList() {
    const [isLogged, setIsLogged] = useState(false)
    const [requests, setRequests] = useState(true)
    const [statics, setStatics] = useState(false)
    const [request, setRequest] = useState(true)
    const [singleCust, setSingleCust] = useState(false)
    const [customers, setCustomers] = useState(false)
    const [myProfile, setMyProfile] = useState(false)
    return (
        <>
        <div className="dashboard-header">
            <Header
                requests={requests}
                statics={statics}
                setRequests={setRequests}
                setRequest={setRequest}
                setStatics={setStatics}
                setSingleCust={setSingleCust}
                setIsLogged={setIsLogged}
                setCustomers={setCustomers}
                customers={customers}
                setMyProfile={setMyProfile}
                myProfile={myProfile}
            />
           
            </div>
            <CustomerListing />
           
        </>

    )
}
export default CustomerList