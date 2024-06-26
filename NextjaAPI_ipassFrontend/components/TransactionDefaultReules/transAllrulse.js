/* eslint-disable */
import MUIDataTable from 'mui-datatables'
import React, { useState,useEffect } from 'react'
import { LIVE_URL } from '../../Hooks/envConst';
import Switch from "@material-ui/core/Switch";
import axios from 'axios';
function transAllrulse() {
  const[allruledata,setAllruleData]=useState()
  useEffect(()=>{
    axios.get(`${LIVE_URL}/api/v1/ipass/get/allrules`).then((res)=>{
      setAllruleData(res.data.data);
    })
  },[])

  const columns = [
    {
      name: "",
      label: "ON/OFF",
      options: {
        filter: false,
        searchable: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log("tableMeta",tableMeta);
          
          return <div>
              <Switch  color="primary" checked={value}   value={value ? true : false} onChange={(e)=>handleSwitchChange(e)}/>
          </div>;
      }
      }
    },
    {
      name: "ID",
      label: "ID",
      options: {
        filter: true,
        searchable: true,
        sort: true,

      }
    },
    {
      name: "NAME",
      label: "Name",
      options: {
        filter: true,
        searchable: true,
        sort: true,

      }
    },
    {
      name: "ACTION",
      label: "Action",
      options: {
        filter: true,
        searchable: true,
        sort: true,

      }
    },
    {
      name: "CATEGORY",
      label: "Category",
      options: {
        filter: true,
        searchable: true,
        sort: true,

      }
    },
  

  ];

  const options={
    filterType: "checkbox",
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    search:true,
    pagination: false,
    responsive: "scroll",
}


function handleSwitchChange(e){
  console.log(e.target.value);
}
  return (
    <div className='Muidata-table-Allrule'><MUIDataTable columns={columns} options={options}  data={allruledata}/></div>
  )
}

export default transAllrulse