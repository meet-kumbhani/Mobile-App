import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import "../LoginPage/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  const ChangeValue = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/userInfo");
      const userData = response.data;

      const foundUser = userData.find(
        (user) =>
          user.Email === loginData.Email && user.Password === loginData.Password
      );

      if (foundUser) {
        const { id, Name, Email } = foundUser;
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ Name, id, Email })
        );
        const snackbar = enqueueSnackbar("Login Successful", {
          variant: "success",
        });
        setTimeout(() => closeSnackbar(snackbar), 2000);
        navigate("/mainpage");
      } else {
        console.log("Incorrect");
        const snackbar = enqueueSnackbar("Enter Valid Input.", {
          variant: "error",
        });
        setTimeout(() => closeSnackbar(snackbar), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("An error occurred. Please try again later.", {
        variant: "error",
      });
    }
  };

  return (
    <section className="login-page">
      <section className="container" style={{ backgroundColor: "#F9F9F9" }}>
        <section className="top-part">
          <div className="pt-3">
            <Link to="/signup">
              <ArrowBackIosNewIcon className="text-dark" />
            </Link>
            <h1 className="mt-5 fw-bold">Login</h1>
          </div>
        </section>

        <section className="form-part">
          <div className="mt-5">
            <Form onSubmit={Submit}>
              <Form.Group className="mb-3">
                <TextField
                  className="input-field bg-white w-100"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="Email"
                  value={loginData.Email}
                  onChange={ChangeValue}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  className="input-field bg-white w-100"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="Password"
                  value={loginData.Password}
                  onChange={ChangeValue}
                />
              </Form.Group>
            </Form>

            <Link
              to="/forgotpassword"
              className="h6 d-flex justify-content-end text-dark text-decoration-none"
            >
              Forgot your password?{" "}
              <span className="ms-2">
                {" "}
                <img
                  src="../images/Vector.png"
                  alt="logo"
                  width={30}
                  height={15}
                />{" "}
              </span>
            </Link>
          </div>
        </section>

        <button
          className="w-100 sign-up-btn p-2 rounded-pill border-0 mt-4"
          onClick={Submit}
        >
          LOGIN
        </button>

        <section className="footer">
          <div>
            <h6 className="text-center mt-5 social-media">
              Or sign up with social account{" "}
            </h6>
            <div className="footer-logo d-flex justify-content-center">
              <img src="../images/Google.png" alt="" />
              <img src="../images/Facebook.png" alt="" />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Login;
