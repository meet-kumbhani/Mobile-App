import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../ProfilePage/ProfilePage.css";
import Footer from "../Footerpart/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { cartURL } from "../../config/url";
import moment from "moment";

const OrderDetail = () => {
  const [orderdetails, setorderdetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${cartURL}/${id}`)
      .then((res) => {
        setorderdetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const time = moment().format("DD-MM-YYYY");

  return (
    <div className="order-details-page">
      <section className="container">
        <section className="top-part fixed-top container-fluid">
          <div className="pt-3 pb-2 d-flex justify-content-between">
            <ArrowBackIosNewIcon onClick={() => navigate(-1)} />

            <h5 className="fw-bold">Order Details</h5>
            <p></p>
          </div>
        </section>

        <section className="order-status">
          <div>
            <div className="d-flex justify-content-between ps-2 pe-2 pt-3 pb-2">
              <span className="fw-bold">Order: 12345678</span>
              <span className="order-number">{time}</span>
            </div>
            <div className="d-flex justify-content-between ps-2 pe-2 pb-2">
              <span className="order-number">
                Tracking number:
                <span className="text-dark fw-bold ps-2">IW3475453455</span>
              </span>
              <span className="text-success fw-bold">Delivered</span>
            </div>
          </div>

          <p className="ms-2 fw-bold">1 items</p>

          <div className="order-product">
            {orderdetails ? (
              <div className="product" key={orderdetails.id}>
                <div className="row mb-4">
                  <div className="col-3">
                    <img
                      src={orderdetails.image}
                      className="cartproduct-image"
                      height={"130px"}
                      width={"100px"}
                    />
                  </div>
                  <div className="col-9 ps-5">
                    <div>
                      <h5 className="mt-2 fw-bold">{orderdetails.brand}</h5>
                      <span className="mt-2 color">{orderdetails.type}</span>
                    </div>
                    <div className="d-flex">
                      <span className="me-1 color">Color :</span>
                      <span>{orderdetails.color}</span>
                      <span className="ms-3 me-1 color">Size :</span>
                      <span>{orderdetails.size}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <span className="color">
                        Units : {orderdetails.quantity}
                      </span>
                      <span className="fw-bold product-price me-3 fw-bold">
                        {orderdetails.price * orderdetails.quantity}$
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Loding..."
            )}
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
};

export default OrderDetail;
