import axios from "axios";
import { Button, Table, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Field, Form, Formik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../../cart.module.css";
import { LIVE_URL } from "../BaseUrl";
const UserLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    axios
      .post(`${LIVE_URL }/api/products/login`, {
        email: values?.email,
        password: values?.password,
      })
      .then((response) => {
        const token = response?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          resetForm();
          // toast.success("Login successfully");
          navigate("/show");
        }
      })
      .catch((error) => {
        setError(error.response?.data.message);
      });
  };

  // const validationSchema = Yup.object().shape({
  //     email: Yup.string().email('Invalid email').required('email is required'),
  //     password: Yup.string().required('No password provided.') .min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  // });
  return (
    <center>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <TableContainer component={Paper} className={style.loginpage}>
              <h1 className={style.heading}>SIGN IN TO YOUR ACCOUNT </h1>
              <div className={style.enimate}>
              <div className={style.logincontainer}>
                <div className={style.logincard}>
                  <TableRow>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>
                      <Field
                        type="email"
                        name="email"
                        placeholder="email"
                        className={style.input}
                      />
                      {/* <ErrorMessage name='email'/> */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PASSWORD</TableCell>
                    <TableCell>
                      <Field
                        type="password"
                        className={style.input}
                        name="password"
                        placeholder="password"
                      />
                      {/* <ErrorMessage name='password' /> */}
                    </TableCell>
                  </TableRow>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    style={{ backgroundColor: "black" }}
                  >
                    Submit
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    style={{ backgroundColor: "black" }}
                    type="submit"
                    variant="contained"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </div>
              </div>
              </div>
              <div style={{ color: "red" }}>{error && error}</div>
            </TableContainer>
          </Form>
        </Formik>
      </div>
    </center>
  );
};

export default UserLogin;
