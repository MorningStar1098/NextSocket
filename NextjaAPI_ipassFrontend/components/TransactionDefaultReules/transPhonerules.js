/* eslint-disable */
import axios from 'axios'
import MUIDataTable from 'mui-datatables';
import React ,{ useEffect,useState }from 'react'
import { LIVE_URL } from '../../Hooks/envConst';
import Switch from "@material-ui/core/Switch";

function transPhonerules() {
  const [phoneruledata,setPhoneruleData]=useState()
  useEffect(()=>{
    axios.get(`${LIVE_URL}/api/v1/ipass/get/phonerules`).then((res)=>{
      setPhoneruleData(res.data.data)
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
          return <div>
              <Switch  color="primary" checked={value}/>
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
    responsive: "scroll"
}

  return (
    <div className='Muidata-table-phonerule Muidata-table-Allrule'><MUIDataTable columns={columns} options={options} data={phoneruledata}/></div>

  )
}

export default transPhonerules