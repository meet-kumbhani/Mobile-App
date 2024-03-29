import React from "react";
import "../Footerpart/footer.css";
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section>
      <div className="footer-part p-3 fixed-bottom d-flex justify-content-around align-items-center">
        <Link to="/mainpage" className="nav-link">
          <div className="d-flex flex-column icons">
            <span className="text-center">
              <IoHomeOutline className="fs-1" />
            </span>
            <span className="text-center text">Home</span>
          </div>
        </Link>

        <Link to="/category" className="nav-link">
          <div className="d-flex flex-column icons">
            <span className="text-center">
              <BsCart3 className="fs-1" />
            </span>
            <span className="text-center text">Shop</span>
          </div>
        </Link>

        <Link to="/cart" className="nav-link">
          <div className="d-flex flex-column icons">
            <span className="text-center">
              <HiOutlineShoppingBag className="fs-1" />
            </span>
            <span className="text-center text">Bag</span>
          </div>
        </Link>

        <Link to="/favourite" className="nav-link">
          <div className="d-flex flex-column icons">
            <span className="text-center">
              <IoIosHeartEmpty className="fs-1" />
            </span>
            <span className="text-center text">Favourites</span>
          </div>
        </Link>

        <Link to="/profile" className="nav-link">
          <div className="d-flex flex-column icons">
            <span className="text-center">
              <HiOutlineUser className="fs-1" />
            </span>
            <span className="text-center text">Profile</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Footer;
