import { DeleteForever } from "@mui/icons-material";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../cart.module.css";
import { LIVE_URL } from "../BaseUrl";

const   AdminSetting = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [prodcutDetail, setProductDetail] = useState();
  const [deleteproducts, setDeleteproducts] = useState();
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  useEffect(() => {
    axios.get(`${LIVE_URL}/api/products/showall`).then((response) => {
      setProductDetail(response?.data?.product);
    });
  }, [navigate, deleteproducts]);

  const deleteitem = (id) => {
    axios
      .delete(`${LIVE_URL}/api/products/productdelete/${id}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setDeleteproducts(!deleteproducts);
        console.log(response.data.message);
      });
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      {" "}
      <TableContainer className={style.background}>
        <div
          style={{
            marginLeft: "375px",
            marginTop: "30px",
            display: "flex",
            gap: "30px",
          }}

        >
          <Button
            variant="contained"
            className="text-green-900 bg-green-to-r from-green-500 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => navigate("/alluser")}
          >
            All USER
          </Button>
          <Button
            variant="contained"
            className="text-cyan-900 bg-cyan-to-r from-cyan-500 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => navigate("/addproducts")}
          >
            Add Products
          </Button>
          <Button
            variant="contained"
            className="text-gray-900 bg-purple-to-r from-purple-500 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => navigate("/adduser")}
          >
            ADD USER
          </Button>
        </div>

        <div style={{ marginLeft: "370px", marginRight: "90px" }}>
          <Table
            style={{ marginTop: "30px" }}
            className={style.settingcart}
          >
            <TableHead>
              <TableRow
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  WebkitTextStroke: "medium",
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>IMAGE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prodcutDetail
                ?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                ?.map((value, i) => (
                  <TableRow  key={i}>
                    <TableCell>{value?._id}</TableCell>
                    <TableCell>{value?.PRO_NAME}</TableCell>
                    <TableCell>{value?.Description}</TableCell>
                    <TableCell>{value?.Price}</TableCell>
                    <TableCell>
                      <img
                        src={`${value?.Img}`}
                        style={{ height: "100px", width: "100px" }}
                        alt={value.title}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        onClick={() => deleteitem(value?._id)}
                      >
                        <DeleteForever style={{ color: "red" }} />{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        
            <Pagination
              defaultPage={1}
              page={page}
              count={Math.ceil(prodcutDetail?.length / rowsPerPage)}
              shape="rounded"
              onChange={handleChange}
              color="secondary"
              className={style.paginationbackground}
            />
          
        </div>
      </TableContainer>
    </div>
  );
};

export default AdminSetting;
