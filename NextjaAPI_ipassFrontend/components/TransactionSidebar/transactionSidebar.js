/* eslint-disable */
import React, { useEffect } from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSharpIcon from '@mui/icons-material/ListSharp';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useRouter } from 'next/router';
import { Divider } from '@mui/material';
import Header from '../ScanDocument/ScanHeader';
import { AiOutlineDashboard } from "react-icons/ai"
import LoadingIcons from 'react-loading-icons';


function SideBar() {
  const router = useRouter()
  useEffect(() => {
    if (router.pathname == "/trans") {
      router.push({
        pathname: "/transactionDashboard",
      })
    }
  }, [router.pathname])

  function handleNavigateClick(pageName) {
    router.push({
      pathname: pageName,
    })
  }
  return (
    <>
      {router.pathname !== "/trans" ?
        <div className='Sidebarflex'>
          {/* <Header/> */}
          <List>
            <Divider />
            <ListItem onClick={() => handleNavigateClick("/transactionDashboard")} className={router.pathname == "/transactionDashboard" ? "activeTab" : "transaction-dashboard_"}>
              <ListItemIcon>
                <AiOutlineDashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />

            <ListItem onClick={() => handleNavigateClick("/monitoringTransactions")} className={router.pathname == "/monitoringTransactions" ? "activeTab" : "transaction-monitoring"}>
              <ListItemIcon>
                <ListSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Transaction" />
            </ListItem>
            <Divider />

            <ListItem onClick={() => handleNavigateClick("/scoreEngine")} className={router.pathname == "/scoreEngine" ? "activeTab" : "transaction-scoreEngine"}>
              <ListItemIcon>
                <EngineeringIcon />
              </ListItemIcon>
              <ListItemText primary="Scoring Engine" />
            </ListItem>
            <Divider />

          </List>

        </div> : <div className="loading-request">
          <div className="loader-svg">
            <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" />
          </div>
        </div>}
    </>

  )
}

export default SideBar