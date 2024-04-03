import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../../toolkit/slice";
import Form from "react-bootstrap/Form";
import "../SignUpPage/Signup.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const ChangeValue = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.Name || !userData.Email || !userData.Password) {
      const snackbar = enqueueSnackbar("Enter Valid Input.", {
        variant: "error",
      });
      setTimeout(() => closeSnackbar(snackbar), 2000);
      return;
    }
    dispatch(saveUserInfo(userData));
    setUserData({
      Name: "",
      Email: "",
      Password: "",
    });
    navigate("/login");
  };

  return (
    <section className="container signup-page">
      <section>
        <div className="pt-3">
          <h1 className="mt-4 fw-bold">Sign up</h1>
        </div>
      </section>

      <section className="form-part">
        <div className="mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <TextField
                className="input-field bg-white w-100"
                label="Name"
                variant="outlined"
                type="text"
                name="Name"
                value={userData.Name}
                onChange={ChangeValue}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <TextField
                className="input-field bg-white w-100"
                label="Email"
                variant="outlined"
                type="email"
                name="Email"
                value={userData.Email}
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
                value={userData.Password}
                onChange={ChangeValue}
              />
            </Form.Group>
          </Form>

          <Link
            to="/login"
            className="h6 d-flex justify-content-end text-dark text-decoration-none"
          >
            Already have an account?
            <span className="ms-2">
              {" "}
              <img
                src="../images/Vector.png"
                alt="logo"
                width={30}
                height={15}
              />{" "}
            </span>{" "}
          </Link>
        </div>
      </section>

      <button
        className="w-100 sign-up-btn p-2 rounded-pill border-0 mt-4"
        onClick={handleSubmit}
      >
        SIGN UP
      </button>

      <section className="footer">
        <div>
          <h6 className="text-center social-media">
            Or sign up with social account{" "}
          </h6>
          <div className="footer-logo d-flex justify-content-center">
            <img src="../images/Google.png" alt="" />
            <img src="../images/Facebook.png" alt="" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Signup;
