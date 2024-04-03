import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../ProfilePage/ProfilePage.css";
import Footer from "../Footerpart/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartData } from "../../toolkit/slice";
import axios from "axios";
import { userInfoURL } from "../../config/url";

const MyProfile = () => {
  const [adresslength, setadresslength] = useState(0);
  const [user, setUser] = useState(null);
  const cartitem = useSelector((items) => items.data.cartData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let orderlength = cartitem?.length;

  useEffect(() => {
    let storedData = localStorage.getItem("loggedInUser");
    if (storedData) {
      let userData = JSON.parse(storedData);
      setUser(userData);
      let userId = userData.id;
      axios
        .get(`${userInfoURL}/${userId}`)
        .then((res) => {
          const userData = res?.data?.shippingaddress?.length;
          setadresslength(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    dispatch(cartData());
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
            src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            className="rounded-circle"
            style={{ height: "60px", width: "60px" }}
          />
          <div className="d-flex flex-column ms-4">
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {user && user.Name}
            </span>
            <span style={{ fontSize: "14px", color: "gray" }}>
              {user && user.Email}
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

        <Link className="nav-link" to={`/adress/${user?.id}`}>
          <div className="d-flex ps-2 mt-2 pt-3 pb-2">
            <div className="col-11 d-flex flex-column">
              <span className="order">Shipping addresses</span>
              <span className="order-number">{adresslength} addresses</span>
            </div>
            <div className="col-1 mt-2">
              <ChevronRightIcon className="right-icon" />
            </div>
          </div>
        </Link>

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
