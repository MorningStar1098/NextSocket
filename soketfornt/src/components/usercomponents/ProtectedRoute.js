import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../Header";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../productcomponents/Header";
import { LIVE_URL } from "../BaseUrl";

const ProtectedRoute = (props) => {
  const [verified, setVerified] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const url = `${LIVE_URL}/api/products/user`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      location.pathname === "/register"
        ? navigate("/register")
        : navigate("/login");
      return;
    }
    axios
      .get(url, { headers: { Authorization: ` ${token}` } })
      .then((res) => {
        setVerified(true);
        setUserRole(res?.data?.newuser?.role.toLowerCase());
      })
      .catch((error) => {
        setVerified(false);
        localStorage.removeItem("token");

        navigate("/login");
        toast.error(error.response?.data?.error);
      });
  }, [url, token, navigate]);

  if (
    !token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <props.Component />;
  }

  if (
    verified &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    navigate(-1);
    return null;
  }
  if (verified && userRole === "admin") {
    return (
      <div>
        {
          <>
            <Header role="admin" /> <props.Component />
          </>
        }{" "}
      </div>
    );
  } else {
    if (verified && userRole === "user") {
      if (
        location.pathname === "/setting" 
        ||
        location.pathname === "/alluser"||
        location.pathname === "/addproducts"||
        location.pathname === "/adduser"
      ) {
        return navigate("/show");
      } else {
        return (
          <div>
            {
              <>
                <Header />
                <props.Component />
              </>
            }{" "}
          </div>
        );
      }
    }
  }
};

export default ProtectedRoute;
