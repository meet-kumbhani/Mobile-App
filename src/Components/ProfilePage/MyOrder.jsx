import React, { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../ProfilePage/ProfilePage.css";
import Footer from "../Footerpart/Footer";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "../ProfilePage/ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { cartData } from "../../toolkit/slice";

const MyOrder = () => {
  const cartdata = useSelector((cart) => cart.data.cartData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartData());
  }, [dispatch]);

  const time = moment().format("DD-MM-YYYY");

  const generateOrderID = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  return (
    <section className="container-fluid order-page">
      <section className="top-part">
        <div className="pt-3 pb-2 d-flex justify-content-between">
          <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
        </div>
        <h1 className="fw-bold mt-3 mb-4">My Orders</h1>
      </section>

      <section className="order-status">
        {cartdata?.map((item) => (
          <div className="mt-4 order-details" key={item.id}>
            <div className="d-flex justify-content-between ps-4 pe-4 pt-3 pb-2">
              <span>Order: {generateOrderID()}</span>
              <span className="order-number">{time}</span>
            </div>
            <div className="d-flex justify-content-between ps-4 pe-4 pb-2">
              <span className="order-number">
                Qunatity : <span className="text-dark">{item.quantity}</span>
              </span>
              <span className="order-number">
                Total Amount :{" "}
                <span className="text-dark fw-bold">
                  {item.price * item.quantity}$
                </span>
              </span>
            </div>
            <div className="d-flex justify-content-between ps-4 pe-4 pb-2">
              <Link to={`/orderdetails/${item.id}`}>
                <button className="details-btn">Details</button>
              </Link>
              <span className="text-success fw-bold">Delivered</span>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </section>
  );
};

export default MyOrder;
