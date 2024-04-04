import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../ForgotPage/Forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { userInfoURL } from "../../config/url";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    emailjs.init("5DczCb4W-rlp2JjyY");
  }, []);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const Submitemail = async (e) => {
    e.preventDefault();
    const serviceId = "service_kosk3ep";
    const templateId = "template_4hdz9rf";
    const otpValue = generateOTP();
    setOtpValue(otpValue);
    console.log(otpValue, "<<<<<<");

    try {
      const response = await axios.get(userInfoURL);
      const userData = response.data;

      const foundUser = userData.find((user) => user.Email === email);

      if (foundUser) {
        const { id } = foundUser;
        localStorage.setItem("Forgotuser", JSON.stringify({ id }));
        await emailjs.send(serviceId, templateId, {
          recipient: email,
          otp: otpValue,
        });
        setEmail("");
        setOtpSent(true);
        const snackbar = enqueueSnackbar("OTP Sent Successful", {
          variant: "success",
        });
        setTimeout(() => closeSnackbar(snackbar), 2000);
      } else {
        console.log("User not found");
        const snackbar = enqueueSnackbar("User not found.", {
          variant: "error",
        });
        setTimeout(() => closeSnackbar(snackbar), 2000);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("An error occurred. Please try again later.", {
        variant: "error",
      });
    } finally {
      console.log("finally called.");
    }
  };

  const Submitotp = (e) => {
    e.preventDefault();
    if (otp === otpValue.toString()) {
      const snackbar = enqueueSnackbar("OTP is Correct", {
        variant: "success",
      });
      setTimeout(() => closeSnackbar(snackbar), 2000);
      navigate("/newpassword");
    } else {
      const snackbar = enqueueSnackbar("Incorrect OTP. Please try again.", {
        variant: "error",
      });
      setTimeout(() => closeSnackbar(snackbar), 2000);
    }
  };

  return (
    <>
      <section className="forgotpassword-page">
        <section className="container signup-page">
          <section className="top-part">
            <div>
              <div className="pt-2">
                <Link to="/login" className="nav-link">
                  <ArrowBackIosNewIcon />
                </Link>
                <h1 className="mt-4 fw-bold">Forgot password</h1>
              </div>
            </div>
          </section>

          {!otpSent ? (
            <section className="form-part">
              <div>
                <h6>
                  Please, enter your email address. You will receive a link to
                  create a new password via email.
                </h6>
                <form className="for" onSubmit={Submitemail}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="w-100 input-field"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button className="w-100 sign-up-btn p-2 rounded-pill border-0 mt-5">
                    SEND
                  </button>
                </form>
              </div>
            </section>
          ) : (
            <section className="form-part">
              <div>
                <h6>Please enter the OTP sent to your email.</h6>
                <form className="for" onSubmit={Submitotp}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="w-100 input-field"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button className="w-100 sign-up-btn p-2 rounded-pill border-0 mt-5">
                    VERIFY
                  </button>
                </form>
              </div>
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default Forgotpassword;
