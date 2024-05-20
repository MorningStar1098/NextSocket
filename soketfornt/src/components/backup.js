// useEffect(() => {
//     dispatch(cartadd())
//     // axios
//     //   .get("${LIVE_URL}/api/products/showcart", {
//     //     headers: { Authorization: ` ${token}` },
//     //   })
//     //   .then((response) => {
//     //     setCart(response?.data?.products);
//     //     toast.success(response.data.message);
//     //   })
//     //   .catch((error) => {
//     //     toast.error(error.response.data.message);
//     //   });
//   }, [deleteData, token,dispatch]);

// ---orderdetail ....
// const url = "http://localhost:4545/api/products/images";
// const token = localStorage.getItem("token");

// const singleorder=()=>{
//   axios
//   .get("http://localhost:4545/api/products/singleordersuccess",{
//     headers: { Authorization: ` ${token}` },
//   }).then((response)=>{
//     console.log(response.data.)
//   })
// }
// ===================================payment.js=========================================================
// const Payment = () => {
//     const Navigate = useNavigate();
//     // const [checkout, setCheckout] = useState();

//     // const url = "http://localhost:4545/api/products/images";

//     const token = localStorage.getItem("token");

//     const stripepublish =
//       "pk_test_51OU6RHEGEcAgpKUXAp1d2TXdQ1mFtENKLKKvCKHgI4nKSuZCr1zuF9POZyV6MKm6Tgk02NR9SoLz5PDQC0jmMNws00o7veVcdH";

//     useEffect(() => {
//       axios
//         .get("${LIVE_URL}/api/products/showcart", {
//           headers: { Authorization: ` ${token}` },
//         })
//         .then((response) => {
//           setCheckout(response?.data?.products);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }, [token]);

//     const totalPrice = checkout?.reduce((counttotal, item) => {
//       return counttotal + item.quantity * item.price;
//     }, 0);

//     const payment = async () => {
//       const stripe = await loadStripe(stripepublish);

//       const body = {
//         products: checkout,
//       };
//       try {
//         const response = await axios.post(
//           "${LIVE_URL}/api/products/payment",
//           body,
//           {
//             headers: { Authorization: ` ${token}` },
//           }
//         );

//         const session = response.data;

//         const result = await stripe.redirectToCheckout({
//           sessionId: session.id,
//         });
//         console.log(result, "resiljjhsgfdhd");

//       } catch (error) {
//         console.error("Payment error", error);
//       }
//     };

//     return (
//       <div>

//         <TableContainer className={style.background}>
//         <div style={{ display: "flex" ,marginLeft: '240px' }} >
//           <button
//             style={{
//               fontWeight: "bold",
//               fontSize: "20px",
//               marginLeft: "150px",
//               marginTop: "10px",
//               WebkitTextStroke: "medium",
//             }}
//             className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//             onClick={() => Navigate("/cart")}
//           >
//             <KeyboardBackspaceIcon /> BACK
//           </button>

//           <h1
//             style={{
//               marginLeft: "420px",
//               // fontWeight: "bold",
//               fontSize: "40px",
//               textDecoration: "underline",
//               WebkitTextStroke: "medium",
//             }}
//           >
//             ORDER DETAIL
//           </h1>
//         </div>
//   <div style={{marginLeft: '300px',marginRight:"60px"}} className={style.settingcart}>

//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     WebkitTextStroke: "medium",
//                   }}
//                 >
//                   TITLE
//                 </TableCell>
//                 <TableCell
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     WebkitTextStroke: "medium",
//                   }}
//                 >
//                   DESCRIPTION
//                 </TableCell>
//                 <TableCell
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     WebkitTextStroke: "medium",
//                   }}
//                 >
//                   QUANTITY
//                 </TableCell>
//                 <TableCell
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     WebkitTextStroke: "medium",
//                   }}
//                 >
//                   PRICE
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {checkout?.map((value, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{value?.title}</TableCell>
//                   <TableCell>{value?.description}</TableCell>
//                   {/* <TableCell>
//                                 <img
//                                   src={`${url}/${value.image}`}
//                                   alt={value.title}
//                                   style={{
//                                     maxWidth: "300px",
//                                     maxHeight: "250px",
//                                     borderRadius: "10px",
//                                   }}
//                                   className="mb-5 "
//                                 />
//                               </TableCell> */}
//                   <TableCell>
//                     {value?.quantity} x ${value.price?.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     ${(value?.price * value.quantity).toFixed(2)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div >
//             <h1
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "20px",
//                 marginLeft: "1235px",
//                 textDecoration: "underline",
//               }}
//             >
//               SUBTOTAL :-${totalPrice?.toFixed(2)}
//             </h1>
//             <button
//               style={{ marginLeft: "1364px", WebkitTextStroke: "medium" }}
//               type="button"
//               onClick={payment}
//               className="text-gray-900 bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//             >
//               pay
//               <KeyboardTabIcon />
//             </button>
//           </div>
//         </div>

//         </TableContainer>

//       </div>
//     );
//   };

//   export default Payment;

////=======================================showchat.js==================
// import {
//     Avatar,
//     Button,
//     Divider,
//     Grid,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemText,
//     TableContainer,
//   } from "@mui/material";

//   import React, { useEffect, useState, useRef } from "react";
//   import axios from "axios";
//   import style from "../../cart.module.css";
//   import { io } from "socket.io-client";
//   import NotificationsIcon from "@mui/icons-material/Notifications";
//   import { VideoCall } from "@mui/icons-material";
//   import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
//   import Peer from "simple-peer";
//   import { useDispatch } from "react-redux";
//   import { useSelector } from "react-redux";
//   import { alluser, user } from "../redux/actions/Actions";
//   const Showchat = () => {
//     const token = localStorage.getItem("token");
//     const dispatch = useDispatch();
//     const getalluser = useSelector((state) => state?.getchats?.chatarr);
//     const userName = useSelector((state) => state?.getchats?.userarr);

//     // const [userName, setUserName] = useState();
//     // const [getalluser, Setgetaluser] = useState();
//     const [allMessages, setAllMessages] = useState([]);
//     const [inputValue, setInputValue] = useState("");
//     const [selectedUserId, setSelectedUserId] = useState("");
//     const [selectedIndex, setSelectedIndex] = useState();
//     const [showWebcam, setShowWebcam] = useState(false);
//     const [stream, setStream] = useState();
//     const [isCallEnded, setIsCallEnded] = useState(false);
//     const [typing, settyping] = useState(false);
//     const [Acceptcall, setAcceptcall] = useState(false);
//     const [accepted, setAccepted] = useState(false);
//     const videoRef = useRef();
//     const socket = io("http://localhost:7654");

//     console.log(socket);
//     // const getallusers = () => {
//     //   axios
//     //     .get("${LIVE_URL}/api/products/alluser", {
//     //       headers: { Authorization: ` ${token}` },
//     //     })
//     //     .then((response) => {
//     //       Setgetaluser(response?.data?.userdata);
//     //     });
//     // };

//     const userchat = (_id) => {
//       socket.emit("user_connected", {
//         userId: userName._id,
//       });
//       axios
//         .get(
//           `${LIVE_URL}/api/products/getmessage/${_id}`,
//           {
//             headers: { Authorization: ` ${token}` },
//           }
//         )
//         .then((response) => {
//           setSelectedUserId(_id);
//           setAllMessages(response?.data?.getallmessage);
//         });
//     };

//     const handleSend = () => {
//       if (selectedUserId && inputValue && socket) {
//         axios
//           .post(
//             "${LIVE_URL}/api/products/savechats",
//             {
//               To: selectedUserId,
//               message: inputValue,
//             },
//             {
//               headers: { Authorization: ` ${token}` },
//             }
//           )
//           .then((res) => {
//             socket.emit("sendMessage", {
//               receiverId: selectedUserId,
//               senderId: userName._id,
//               message: inputValue,
//             });
//             setAllMessages((prevMessages) => [...prevMessages, res?.data]);
//             setInputValue("");
//           });
//       }
//     };

//     // const getusersdata = () => {
//     //   axios
//     //     .get("${LIVE_URL}/api/products/user", {
//     //       headers: { Authorization: ` ${token}` },
//     //     })
//     //     .then((response) => {
//     //       setUserName(response?.data?.newuser);
//     //     });
//     // };

//     useEffect(() => {
//       if (socket) {
//         socket.on("receiveMessage", (data) => {
//           console.log(data);
//           setAllMessages(data);
//         });
//         socket.on("typingResponse", (data) => {
//           console.log(data, "jkhjh");
//           settyping(`${data} is typing...`);
//         });
//         socket.on("disconnect", () => {
//           console.log("Disconnected from server");
//         });
//       }
//     }, [socket]);

//     useEffect(() => {
//       // getusersdata();
//       dispatch(user());
//       dispatch(alluser());
//     }, [dispatch]);
//     const handleInputChange = (event) => {
//       if (selectedUserId) {
//         socket.emit("typing", {
//           senderId: userName.username,
//           receiverId: selectedUserId,
//         });
//       }
//       setInputValue(event.target.value);
//     };
//     const callUser = () => {
//       socket.emit("user_connected", {
//         userId: userName._id,
//       });
//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream: stream,
//       });
//       socket.emit("Calling", {
//         senderId: userName._id,
//         receiverId: selectedUserId,
//       });
//       navigator.mediaDevices
//         .getUserMedia({ audio: true, video: true })
//         .then((stream) => {
//           setStream(stream);
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };

//     useEffect(() => {
//       if (socket) {
//         socket.on("incomingCall", (data) => {
//           setAcceptcall(data.callerId, userName._id);
//         });

//         socket.on("callAccepted", (data) => {
//           setAccepted(data);
//         });

//         socket.on("disconnect", () => {
//           console.log("Disconnected from server");
//         });
//       }
//     }, [socket, stream]);

//     const acceptCall = () => {
//       socket.emit("acceptCall", {
//         senderId: userName._id,
//         receiverId: selectedUserId,
//       });
//       // setAccepted(true);
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: true })
//         .then((stream) => {
//           setStream(stream);
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((error) => {
//           console.error("Error accessing camera:", error);
//         });
//     };

//     const endcall = (isCallEnded) => {
//       setIsCallEnded(isCallEnded);
//       if (isCallEnded && socket) {
//         socket.emit("endCall", {
//           senderId: userName._id,
//         });
//         setStream(null);
//         setIsCallEnded(false);
//         setAccepted(false);
//       }
//     };

//     return (
//       <TableContainer className={style.chatpage}>
//         <div style={{ marginLeft: "540px", display: "flex", marginTop: "150px" }}>
//           <div className={style.chatcontainer}>
//             <div className={style.chatcard}>
//               <Grid>
//                 <List style={{ display: "flex" }}>
//                   <ListItem>
//                     <Avatar
//                       alt={userName?.username}
//                       src={userName?.image}
//                       sx={{ width: 56, height: 56 }}
//                     />
//                     &nbsp;&nbsp;
//                     <ListItemText primary={`${userName?.username}`} />
//                   </ListItem>
//                 </List>
//                 <Divider />
//                 <Divider />
//                 <List>
//                   {getalluser
//                     ?.filter((user) => user?._id !== userName?._id)
//                     ?.map((value, i) => (
//                       <>
//                         <ListItemButton
//                           key={i}
//                           onClick={() => {
//                             userchat(value._id);
//                             setSelectedIndex(i);
//                           }}
//                           style={{
//                             height: "50px",
//                             backgroundColor:
//                               selectedIndex === i ? "#808080" : "black",
//                           }}
//                         >
//                           <Avatar
//                             alt={value?.username}
//                             src={value?.image}
//                             sx={{ width: 40, height: 40 }}
//                           />
//                           &nbsp;&nbsp;
//                           {value.username}
//                         </ListItemButton>
//                         <Divider />
//                       </>
//                     ))}
//                 </List>
//               </Grid>
//             </div>
//           </div>
//           <div className={style.showchatcontainer}>
//             <div className={style.showchatcard}>
//               {allMessages?.map((value) => {
//                 <Avatar
//                   alt={value?.username}
//                   src={value?.image}
//                   sx={{ width: 56, height: 56 }}
//                 />;
//               })}
//               <Grid item xs={9}>
//                 <div style={{ display: "flex", gap: "85%" }}>
//                   <Avatar />
//                 </div>
//                 <Divider />
//                 <Grid>
//                   <Grid item xs={12}>
//                     <List>
//                       <div className={style.scrollbar}>
//                         {allMessages?.map((message, index) => (
//                           <ListItem
//                             key={index}
//                             style={{
//                               backgroundColor:
//                                 message.From === selectedUserId
//                                   ? "green"
//                                   : "#A9A9A9",
//                               maxWidth: "30%",
//                               width: "fit-content",
//                               borderRadius: "10px",
//                               marginBottom: "10px",
//                               marginLeft:
//                                 message.From === selectedUserId ? "0" : "auto",
//                             }}
//                           >
//                             <h1>{message?.message}</h1>
//                           </ListItem>
//                         ))}
//                       </div>
//                     </List>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               {showWebcam ? (
//                 <>
//                   <video ref={videoRef} autoPlay style={{ width: "300px" }} />
//                   <Button type="button" onClick={() => setShowWebcam(false)}>
//                     {" "}
//                     <PhoneDisabledIcon />
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   type="button"
//                   onClick={() => {
//                     setShowWebcam(!showWebcam);
//                     callUser();
//                   }}
//                 >
//                   <VideoCall />
//                 </Button>
//               )}

//               {Acceptcall && (
//                 <>
//                   <video ref={videoRef} autoPlay style={{ width: "300px" }} />
//                   {!accepted && (
//                     <Button type="button" onClick={acceptCall}>
//                       Accept Call
//                     </Button>
//                   )}
//                 </>
//               )}
//               {accepted && (
//                 <Button type="button" onClick={() => endcall(true)}>
//                   <PhoneDisabledIcon />
//                 </Button>
//               )}

//               <h1>{typing}</h1>

//               <div style={{ display: "flex" }}>
//                 <input
//                   style={{ width: "100%" }}
//                   type="text"
//                   value={inputValue}
//                   onChange={handleInputChange}
//                 />
//                 <Button type="button" onClick={handleSend}>
//                   send
//                 </Button>
//                 <NotificationsIcon color="success" fontSize="large" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </TableContainer>
//     );
//   };

//   export default Showchat;
//   -----------------------------------------animation----------------------------------------

// import React from "react";
// import style from "../../cart.module.css";
// const Anim = () => {
//   return (
//     <>
//       <div className={style.cards}>
//         <div className={style.wrapper}>
//           <img
//             src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg"
//             className={style.new}
//           />
//         </div>
//         <img
//           src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp"
//           className={style.character}
//         />
//       </div>
//       <div className={style.containers}>
//         <div className={style.cube}>
//           <div className={style.cube_face}>

//           <div className={style.cube_face_bottom_shadow}>
//           <div className={style.cube_face_left}>
//             <span className={style.text}>left</span>
//           </div>
//           <div className={style.cube__face_front}>
//             <span className={style.text}>front</span>
//           </div>
//           <div className={style.cube_face_back}>
//             <span className={style.text}>back</span>
//           </div>
//           <div className={style.cube_face_right}>
//             <span className={style.text}>right</span>
//           </div>
//           <div className={style.cube_face_top}>
//             <span className={style.text}>top</span>
//           </div>
//           <div className={style.cube_face_bottom}>
//             <span className={style.text}>bottom</span>
//           </div>

//           </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Anim;
// ---------------------------------------tailwind---------------------------------------

/* <h1 className="ml-9 mt-10 bg-gradient-to-r from-red-500 via-red-500 to-red-700 w-10 p-1.5 text-center text-white rounded-2xl	">
          {count}
        </h1>
        <div className="inline-flex gap-x-2 mt-10 ">
          <button
            type="button"
            onClick={increement}
            className="text-white  text-center rounded-2xl w-40 p-1.6	 bg-gradient-to-r from-green-500  via-green-600  to-green-700 hover:bg-gradient-to-br "
          >
            increement
          </button>

          <button
            type="button"
            onClick={decreement}
            className="text-white rounded-2xl  text-center w-40 p-1.6	 bg-gradient-to-r from-red-500  via-red-600  to-red-700 hover:bg-gradient-to-br "
          >
           // const [count, setCount] = useState(0);

  // const increement = () => {
  //   setCount(count + 1);
  // };

  // const decreement = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   }
  // };
            decreement
          </button>
        </div> */
