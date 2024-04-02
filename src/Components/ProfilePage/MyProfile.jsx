import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../ProfilePage/ProfilePage.css";
import Footer from "../Footerpart/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartData, fetchAllData } from "../../toolkit/slice";

const MyProfile = () => {
  const cartitem = useSelector((items) => items.data.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let orderlength = cartitem?.length;

  useEffect(() => {
    dispatch(cartData());
    dispatch(fetchAllData());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <section className="container-fluid profile-page">
      <section className="top-part mt-3">
        <h1 className="fw-bold mt-3 mb-4">My Profile</h1>
      </section>

      <section>
        <div className="d-flex mb-4">
          <img
            src="../K.jpg"
            className="rounded-circle"
            style={{ height: "60px", width: "60px" }}
          />
          <div className="d-flex flex-column ms-4">
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Kuntesh Kothiya
            </span>
            <span style={{ fontSize: "14px", color: "gray" }}>
              kkkothiya9@gmail.com
            </span>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <Link to="/myorder" className="nav-link">
          <div className="d-flex ps-2 mt-2 pt-3 pb-2">
            <div className="col-11 d-flex flex-column">
              <span className="order mb-1">My orders</span>
              <span className="order-number">
                Already have {orderlength} orders
              </span>
            </div>

            <div className="col-1 mt-2">
              <ChevronRightIcon className="right-icon" />
            </div>
          </div>
        </Link>

        <div className="d-flex ps-2 mt-2 pt-3 pb-2">
          <div className="col-11 d-flex flex-column">
            <span className="order">Shipping addresses</span>
            <span className="order-number">3 addresses</span>
          </div>
          <div className="col-1 mt-2">
            <ChevronRightIcon className="right-icon" />
          </div>
        </div>

        <Link to="/settings" className="nav-link">
          <div className="d-flex ps-2 mt-2 pt-3 pb-2">
            <div className="col-11 d-flex flex-column">
              <span className="order">Settings</span>
              <span className="order-number">Notifications, password</span>
            </div>
            <div className="col-1 mt-2">
              <ChevronRightIcon className="right-icon" />
            </div>
          </div>
        </Link>

        <div className="d-flex ps-2 mt-2 pt-3 pb-2" onClick={handleLogout}>
          <div className="col-11 d-flex flex-column">
            <span className="order">Log-out</span>
            <span className="order-number">Logout Your Account</span>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default MyProfile;
