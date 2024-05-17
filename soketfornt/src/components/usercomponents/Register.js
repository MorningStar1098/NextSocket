import { Button, Table, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import style from "../../cart.module.css";
import { LIVE_URL } from "../BaseUrl";

const Register = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const initialValue = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    image: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", images);
    axios
      .post(
        `${LIVE_URL}/api/products/usersave`,
        formData
      )
      .then((response) => {
        console.log(response.data.user);
        toast.success(response?.data?.message);
        resetForm();
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
      });
  };

  const validation = Yup.object().shape({
    username: Yup.string()
      .min(4, "Too Short!")
      .max(10, "Too Long!")
      .required("username requied"),
    firstname: Yup.string()
      .min(4, "Too Short!")
      .max(10, "Too Long!")
      .required("first name is required"),
    lastname: Yup.string()
      .min(5, "Too Short!")
      .max(10, "Too Long!")
      .required("lasname is required"),
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string()
      .required("password is required.")
      .min(6, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <div>
      <center>
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={validation}
        >
          <Form>
            <TableContainer component={Paper} className={style.loginpage}>
              <h1 className={style.heading}>SIGN UP TO YOUR ACCOUNT </h1>
              <div className={style.logincontainer}>
                <div className={style.registercard}>
                  <TableRow>
                    <TableCell> USERNAME</TableCell>
                    <TableCell>
                      <Field
                        type="text"
                        name="username"
                        placeholder="username"
                        className={style.input}
                      />
                      <ErrorMessage name="username" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FIRST NAME</TableCell>
                    <TableCell>
                      {" "}
                      <Field
                        type="firstname"
                        name="firstname"
                        placeholder="firstname"
                        className={style.input}
                      />
                      <ErrorMessage name="firstname" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> LAST NAME</TableCell>
                    <TableCell>
                      {" "}
                      <Field
                        type="lastname"
                        name="lastname"
                        placeholder="lastname"
                        className={style.input}
                      />
                      <ErrorMessage name="lastname" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> EMAIL</TableCell>
                    <TableCell>
                      {" "}
                      <Field
                        type="email"
                        name="email"
                        placeholder="email"
                        className={style.input}
                      />
                      <ErrorMessage name="email" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> PASSWORD</TableCell>
                    <TableCell>
                      {" "}
                      <Field
                        type="password"
                        name="password"
                        placeholder="password"
                        className={style.input}
                      />
                      <ErrorMessage name="password" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> IMAGE</TableCell>
                    <TableCell colSpan={2}>
                      <Field
                        type="file"
                        name="image"
                        onChange={(e) => setImages(e.target.files[0])}
                      />
                    </TableCell>
                  </TableRow>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    SUBMIT
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={() => navigate("/login")}
                  >
                    LOGIN
                  </Button>
                </div>
              </div>
            </TableContainer>
          </Form>
        </Formik>
      </center>
    </div>
  );
};

export default Register;
