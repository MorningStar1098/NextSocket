import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableContainer,
} from "@mui/material";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import style from "../../cart.module.css";
import { io } from "socket.io-client";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { VideoCall } from "@mui/icons-material";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import Peer from "simple-peer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alluser, user } from "../redux/actions/Actions";
import { LIVE_URL, getmessages } from "../BaseUrl";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const Showchat = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const getalluser = useSelector((state) => state?.getchats?.chatarr);
  const userName = useSelector((state) => state?.getchats?.userarr);
  const [allMessages, setAllMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [showWebcam, setShowWebcam] = useState(false);
  const [stream, setStream] = useState();
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [typing, settyping] = useState(false);
  const [Acceptcall, setAcceptcall] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const videoRef = useRef();
  const socket = io("http://localhost:7654");



  const userchat = (_id) => {
    socket.emit("user_connected", {
      userId: userName._id,
    });
    axios
      .get(
        `${getmessages}/${_id}`,
        {
          headers: { Authorization: ` ${token}` },
        }
      )
      .then((response) => {
        setSelectedUserId(_id);
        setAllMessages(response?.data?.getallmessage);
      });
  };
  console.log("selectedUserId", selectedUserId, "allMessages", allMessages);
  const handleSend = () => {
    if (selectedUserId && inputValue && socket) {
      axios
        .post(
          `${LIVE_URL}/api/products/savechats`,
          {
            To: selectedUserId,
            message: inputValue,
          },
          {
            headers: { Authorization: ` ${token}` },
          }
        )
        .then((res) => {
          socket.emit("sendMessage", {
            receiverId: selectedUserId,
            senderId: userName._id,
            message: inputValue,
          });
          setAllMessages((prevMessages) => [...prevMessages, res?.data]);
          setInputValue("");
        });
    }
  };

  ;

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        setAllMessages(data);
      });
      socket.on("typingResponse", (data) => {
        console.log(data, "jkhjh");
        settyping(`${data} is typing...`);
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);

  useEffect(() => {
    dispatch(user());
    dispatch(alluser());
  }, [dispatch]);
  const handleInputChange = (event) => {
    if (selectedUserId) {
      socket.emit("typing", {
        senderId: userName.username,
        receiverId: selectedUserId,
      });
    }
    setInputValue(event.target.value);
  };
  const callUser = () => {
    socket.emit("user_connected", {
      userId: userName._id,
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    socket.emit("Calling", {
      senderId: userName._id,
      receiverId: selectedUserId,
    });
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (socket) {
      socket.on("incomingCall", (data) => {
        setAcceptcall(data.callerId, userName._id);
      });

      socket.on("callAccepted", (data) => {
        setAccepted(data);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket, stream, getalluser]);

  const acceptCall = () => {
    socket.emit("acceptCall", {
      senderId: userName._id,
      receiverId: selectedUserId,
    });
    // setAccepted(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const endcall = (isCallEnded) => {
    setIsCallEnded(isCallEnded);
    if (isCallEnded && socket) {
      socket.emit("endCall", {
        senderId: userName._id,
      });
      setStream(null);
      setIsCallEnded(false);
      setAccepted(false);
    }
  };


  const [open, setOpen] = React.useState(false);
  function depdown(e) {
    if (e == e) {
      setOpen(true)
    }
  }
  function handleTooltipClose() {
    setOpen(false)
  }
  function deleteicon(e) {
    axios.delete(`${LIVE_URL}/api/products/Msgdelete/?e=${e.message}`).then((res) => {
      if (res.status === 200) {
        setOpen(false)
        userchat(e.From)
      }
    })
  }
  return (
    <TableContainer className={style.chatpage}>
      <div style={{ marginLeft: "540px", display: "flex", marginTop: "150px" }}>
        <div className={style.chatcontainer}>
          <div className={style.chatcard}>
            <Grid>
              <List style={{ display: "flex" }}>
                <ListItem>
                  <Avatar
                    alt={userName?.username}
                    src={`${userName?.image}`}
                    sx={{ width: 56, height: 56 }}
                  />
                  &nbsp;&nbsp;
                  <ListItemText primary={`${userName?.username}`} />
                </ListItem>
              </List>
              <Divider />
              <Divider />
              <List>
                {getalluser

                  ?.map((value, i) => (
                    <>
                      <ListItemButton
                        key={i}
                        onClick={() => {
                          userchat(value._id);
                          setSelectedIndex(i);
                        }}
                        style={{
                          height: "50px",
                          backgroundColor:
                            selectedIndex === i ? "#808080" : "black",
                        }}
                      >
                        <Avatar
                          alt={value?.username}
                          src={`${value?.image}`}
                          sx={{ width: 40, height: 40 }}
                        />
                        &nbsp;&nbsp;
                        {value.username}
                      </ListItemButton>
                      <Divider />
                    </>
                  ))}
              </List>
            </Grid>
          </div>
        </div>
        <div className={style.showchatcontainer}>
          <div className={style.showchatcard}>

            <Grid item xs={9}>
              <div style={{ display: "flex" }}>
                {allMessages?.map((value) => (<>
                  <Avatar
                    alt={value?.username}
                    src={`${value?.image}`}
                    sx={{ width: 56, height: 56 }}
                  />
                  &nbsp;&nbsp;
                  <div style={{ gap:"10%",marginTop:"2%;" }}>{value.username}</div>
                </>
                ))}
              </div>
              <Divider />
              <Grid>
                <Grid item xs={12}>
                  <List>
                    <div className={style.scrollbar}>
                      {allMessages?.map((message, index) => (
                        <div className={style.diss} onClickAway={handleTooltipClose}>
                          <ListItem
                            key={index}
                            style={{
                              backgroundColor:
                                message.From === selectedUserId
                                  ? "green"
                                  : "#A9A9A9",
                              maxWidth: "30%",
                              width: "fit-content",
                              borderRadius: "10px",
                              marginBottom: "10px",
                              marginLeft:
                                message.From === selectedUserId ? "0" : "auto",
                            }}
                          >
                            <h1>{message?.message}</h1>
                          </ListItem>
                          {open && <Tooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            onClose={handleTooltipClose}
                          >
                            <IconButton aria-label="delete">
                              <DeleteIcon onClick={() => deleteicon(message)} />
                            </IconButton>
                          </Tooltip>
                          }
                          <MoreVertIcon onClick={() => depdown(message?.message)} />
                        </div>
                      ))}
                    </div>
                  </List>
                </Grid>
              </Grid>
            </Grid>
            {showWebcam ? (
              <>
                <video ref={videoRef} autoPlay style={{ width: "300px" }} />
                <Button type="button" onClick={() => setShowWebcam(false)}>
                  {" "}
                  <PhoneDisabledIcon />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  setShowWebcam(!showWebcam);
                  callUser();
                }}
              >
                <VideoCall />
              </Button>
            )}

            {Acceptcall && (
              <>
                <video ref={videoRef} autoPlay style={{ width: "300px" }} />
                {!accepted && (
                  <Button type="button" onClick={acceptCall}>
                    Accept Call
                  </Button>
                )}
              </>
            )}
            {accepted && (
              <Button type="button" onClick={() => endcall(true)}>
                <PhoneDisabledIcon />
              </Button>
            )}

            <h1>{typing}</h1>

            <div style={{ display: "flex" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button type="button" onClick={handleSend}>
                send
              </Button>
              <NotificationsIcon color="success" fontSize="large" />
            </div>
          </div>
        </div>
      </div>
    </TableContainer>
  );
};

export default Showchat;
