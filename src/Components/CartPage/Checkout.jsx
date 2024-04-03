import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import "../ProfilePage/ProfilePage.css";
import { userInfoURL } from "../../config/url";
import axios from "axios";

const Checkout = ({ selectedAddress, totalAmount }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  const user = JSON.parse(loggedInUser);
  const id = user?.id;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const paymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const submitOrder = async () => {
    if (!selectedPaymentMethod) {
      return;
    }

    const orderData = {
      paymentMethod: selectedPaymentMethod,
      totalAmount: totalAmount + 40,
    };

    try {
      const response = await axios.patch(`${userInfoURL}/${id}`, orderData);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <>
      <section className="checkout-page">
        <section className="top-part">
          <div className="py-3 d-flex justify-content-between align-items-center container">
            <Link className="nav-link">
              <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
            </Link>
            <span className="fw-bold mx-auto">Checkout</span>
          </div>
        </section>

        <section className="container">
          <div className="details-part">
            <p className="pt-3 fw-bold">Shipping address</p>
            {selectedAddress && (
              <div className="product">
                <div className="row mb-4 p-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">{selectedAddress.fullName}</span>
                    <Link to="/shippingaddress" className="nav-link">
                      <span className="change">Change</span>
                    </Link>
                  </div>
                  <div className="col-8">
                    <span>{`${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}, ${selectedAddress.country}`}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between">
              <p className="fw-bold">Payment</p>
            </div>

            <div className="payment-img-part">
              <img
                src="../images/mastercard.svg"
                alt="Mastercard"
                className={`payment-icon ${
                  selectedPaymentMethod === "mastercard" && "selected"
                }`}
                onClick={() => paymentMethodSelection("mastercard")}
              />
              <img
                src="../images/phonepe.svg"
                alt="icon not found"
                className={`payment-icon ${
                  selectedPaymentMethod === "phonepe" && "selected"
                }`}
                onClick={() => paymentMethodSelection("phonepe")}
              />
              <img
                src="../images/googlepay.svg"
                alt="icon not found"
                className={`payment-icon ${
                  selectedPaymentMethod === "googlepay" && "selected"
                }`}
                onClick={() => paymentMethodSelection("googlepay")}
              />
              <img
                src="../images/paytm.svg"
                alt="icon not found"
                className={`payment-icon ${
                  selectedPaymentMethod === "paytm" && "selected"
                }`}
                onClick={() => paymentMethodSelection("paytm")}
              />
            </div>

            <div className="mt-5">
              <div className="d-flex justify-content-between">
                <span className="color">Order:</span>
                <span className="fw-bold">{totalAmount}$</span>
              </div>
              <div className="d-flex justify-content-between my-2">
                <span className="color">Delivery:</span>
                <span className="fw-bold">40$</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="color fw-bold">Summary:</span>
                <span className="fw-bold">{totalAmount + 40}$</span>
              </div>
            </div>
            <div className="pb-3 ">
              <Link to="/success">
                <button className="checkout-btn" onClick={submitOrder}>
                  SUBMIT ORDER
                </button>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Checkout;
