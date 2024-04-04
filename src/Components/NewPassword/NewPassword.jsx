import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../NewPassword/NewPassword.css";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { userInfoURL } from "../../config/url";
import { useSnackbar } from "notistack";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("Forgotuser");
  const user = JSON.parse(loggedInUser);
  const id = user?.id;

  const Savepassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    user.Password = newPassword;

    axios
      .patch(`${userInfoURL}/${id}`, user)
      .then((res) => {
        const snackbar = enqueueSnackbar("Password Changed Successfully", {
          variant: "success",
        });
        setTimeout(() => closeSnackbar(snackbar), 2000);

        navigate("/login");
      })
      .catch((err) => {
        const snackbar = enqueueSnackbar("Password Not Changed", {
          variant: "error",
        });
        setTimeout(() => closeSnackbar(snackbar), 2000);
      });
  };

  return (
    <section className="newpassword-page">
      <section className="container">
        <section className="top-part">
          <div className="pt-3">
            <Link to="/signup">
              <ArrowBackIosNewIcon className="text-dark" />
            </Link>
            <h1 className="mt-3 mb-5 fw-bold">Change Password</h1>
          </div>
        </section>

        <section>
          <Form>
            <Form.Group className="mb-3">
              <TextField
                className="input-field bg-white w-100"
                label="New Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <TextField
                className="input-field bg-white w-100"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </section>

        <button
          className="w-100 save-btn p-2 rounded-pill border-0 mt-4"
          onClick={Savepassword}
        >
          {" "}
          SAVE{" "}
        </button>
      </section>
    </section>
  );
};

export default NewPassword;
