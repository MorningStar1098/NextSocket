/* eslint-disable */
import React from 'react'
import MUIDataTable from 'mui-datatables'
import Switch from "@material-ui/core/Switch";
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst';
import { useEffect } from 'react';
import { useState } from 'react';
function transExcluderulse() {
  const [excludeRules,setExcludeRules]=useState()
  useEffect(()=>{
    handleExcludeRules()
  },[])
  function handleExcludeRules() {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/exclude/rules`).then((response)=>{
      setExcludeRules(response?.data?.data)
    })
  }
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
    {
      name: "DATE",
      label: "Date",
      options: {
        filter: true,
        searchable: true,
        sort: true,

      }
    },

  ];
  function handleSwitchChange(e){
    console.log(e.target.value);
  }
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
  return (
    <div className='Muidata-table-CustomExcluderules-test Muidata-table-Allrule'><MUIDataTable columns={columns} options={options} data={excludeRules}/></div>

  )
}

export default transExcluderulse