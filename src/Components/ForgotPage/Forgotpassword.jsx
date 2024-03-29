import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../ForgotPage/Forgotpassword.css";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const OTPref = useRef();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    emailjs.init("5DczCb4W-rlp2JjyY");
  }, []);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_kosk3ep";
    const templateId = "template_4hdz9rf";
    const otp = generateOTP();

    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        recipient: email,
        otp: otp,
      });
      setEmail(""); // Clear email field
      const snackbar = enqueueSnackbar("OTP Sent Successful", {
        variant: "success",
      });
      setTimeout(() => closeSnackbar(snackbar), 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

          <section className="form-part">
            <div>
              <h6>
                Please, enter your email address. You will receive a link to
                create a new password via email.
              </h6>
              <form className="for" onSubmit={handleSubmit}>
                <div className="form_group">
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
        </section>
      </section>
    </>
  );
};

export default Forgotpassword;
