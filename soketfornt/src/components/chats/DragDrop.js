import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import style from "../../cart.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { LIVE_URL } from "../BaseUrl";

const DragDrop = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [getall, setGetall] = useState();
  const [column, setcolumn] = useState();

 


  useEffect(() => {
    axios
      .get(`${LIVE_URL}/api/products/alluser`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setGetall(response.data.userdata);
      });
    getcolumn();
  }, [token]);
  const getcolumn = () => {
    axios
      .get(`${LIVE_URL}/api/products/getsequence`)
      .then((response) => {
        let res = response && response?.data &&response?.data?.sequence[0] !== undefined ? response?.data?.sequence[0] : null
        setcolumn(res);
      });
  };
  return (
    <>
      <TableContainer className={style.userbackground}>
        <button
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "150px",
            marginTop: "10px",
            WebkitTextStroke: "medium",
          }}
          className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => navigate("/productable")}
        >
          <KeyboardBackspaceIcon /> BACK
        </button>
        <center>
          <h1 className={style.heading}>USER DETAILS</h1>
        </center>

        <div
          style={{
            marginLeft: "295px",
            marginRight: "250px",
          }}
        >
          <Table className={style.card}>
            <TableHead>
              {column?.map((value) => (
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    WebkitTextStroke: "medium",
                  }}
                >
                  <TableRow>{value.column_name}</TableRow>
                </TableCell>
              ))}
            </TableHead>
            <DragDropContext>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {getall?.map((value, index) => (
                      <Draggable draggableId={value.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TableRow>
                              <TableCell>{value.username}</TableCell>
                              <TableCell>{value.firstname}</TableCell>
                              <TableCell>{value.lastname}</TableCell>
                              <TableCell>{value.email}</TableCell>
                              <TableCell>{value.role}</TableCell>
                            </TableRow>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </div>
      </TableContainer>
    </>
  );
};

export default DragDrop;
