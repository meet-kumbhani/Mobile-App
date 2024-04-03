import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import "../ProfilePage/Setting.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { userInfoURL } from "../../config/url";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Setting = () => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    let storedData = localStorage.getItem("loggedInUser");
    if (storedData) {
      let userData = JSON.parse(storedData);
      let userId = userData.id;
      axios
        .get(`${userInfoURL}/${userId}`)
        .then((res) => {
          const userData = res.data;
          setLoggedInUserData(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("loggedInUser");
    if (storedData) {
      const userData = JSON.parse(storedData);
      setLoggedInUserData(userData);
    }
  }, []);

  useEffect(() => {
    if (passwordChangeSuccess) {
      setOldPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
      setSnackbarOpen(true);
    }
  }, [passwordChangeSuccess]);

  const Closesnackbar = () => {
    setSnackbarOpen(false);
  };

  const PasswordChange = async () => {
    if (
      oldPassword === loggedInUserData.Password &&
      newPassword === repeatNewPassword
    ) {
      const updatedUserData = { ...loggedInUserData, Password: newPassword };
      const { id } = updatedUserData;
      setPasswordChangeSuccess(true);
      try {
        const data = await axios.patch(`${userInfoURL}/${id}`, updatedUserData);
        setPasswordChangeSuccess(true);
        setLoggedInUserData(updatedUserData);
      } catch (error) {
        console.log(error, "err");
      }
    } else {
      setPasswordChangeSuccess(false);
    }
  };
  return (
    <section className="setting top-part">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={Closesnackbar}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={Closesnackbar}
          severity="success"
        >
          Password changed successfully!
        </MuiAlert>
      </Snackbar>

      <div className="container-fluid">
        <div className="pt-3 pb-2 d-flex justify-content-between">
          <Link to="/profile" className="nav-link">
            <ArrowBackIosNewIcon />
          </Link>
        </div>
        <h1 className="fw-bold mt-3 mb-3">Settings</h1>
        <h6 className="mb-4">Personal Information</h6>
      </div>

      <section className="form-part">
        <div className="container-fluid">
          <Form>
            <Form.Group className="mb-3">
              <TextField
                className="input-field bg-white w-100"
                label="Full name"
                variant="outlined"
                type="text"
                value={loggedInUserData ? loggedInUserData.Name : ""}
              />
            </Form.Group>
          </Form>
        </div>

        <section className="container-fluid">
          <div className="d-flex justify-content-between align-items-baseline mt-5">
            <h6>Password</h6>
            <p
              className="text-decoration-none text-dark"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
            >
              Change
            </p>
          </div>
          <Form.Group className="mt-3">
            <TextField
              className="input-field bg-white w-100"
              label="Password"
              variant="outlined"
              type="password"
            />
          </Form.Group>
        </section>
      </section>

      <section className="password-change">
        <div
          className="offcanvas offcanvas-bottom container-fluid pb-0"
          tabIndex="-1"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header pb-0">
            <h5
              className="offcanvas-title text-center"
              id="offcanvasBottomLabel"
            ></h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body small pb-3 pt-0">
            <h4 className="text-center">Password Change</h4>
            <div className="form-part">
              <Form.Group className="mt-3">
                <TextField
                  className="input-field bg-white w-100"
                  label="Old Password"
                  variant="outlined"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group className="mt-3">
              <TextField
                className="input-field bg-white w-100"
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <TextField
                className="input-field bg-white w-100"
                label="Repeat New Password"
                variant="outlined"
                type="password"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </Form.Group>
            <button
              className="border-0 rounded-pill savepassword-btn p-3 w-100 mt-5"
              onClick={PasswordChange}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              SAVE PASSWORD
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Setting;
