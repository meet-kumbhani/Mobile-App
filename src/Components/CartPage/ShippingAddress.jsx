import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "../CartPage/CartPage.css";
import axios from "axios";
import { userInfoURL } from "../../config/url";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../../toolkit/slice";

const ShippingAddress = ({ onSelectAddress }) => {
  const dispatch = useDispatch();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();
  const user = JSON.parse(loggedInUser);
  const id = user?.id;

  const [shippingAddressData, setShippingAddressData] = useState({
    shippingaddress: [],
  });

  useEffect(() => {
    axios
      .get(`${userInfoURL}/${id}`)
      .then((response) => {
        const shippingAddress = response.data.shippingaddress || [];
        setShippingAddressData({ shippingaddress: shippingAddress });
      })
      .catch((error) => {
        console.error("Error fetching shipping address:", error);
      });
  }, [id]);

  const [newAddress, setNewAddress] = useState({
    addressid: 1,
    address: "",
    fullName: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const EditAddress = (index) => {
    setSelectedAddressIndex(index);
    const selectedAddress = shippingAddressData.shippingaddress[index];
    setNewAddress(selectedAddress);
  };

  const SaveAddress = () => {
    let updatedShippingAddressData;
    const updatedAddress = { ...newAddress };

    if (selectedAddressIndex !== null) {
      const originalAddress =
        shippingAddressData.shippingaddress[selectedAddressIndex];
      updatedAddress.addressid = originalAddress.addressid;
      updatedShippingAddressData = {
        ...shippingAddressData,
        shippingaddress: shippingAddressData.shippingaddress.map(
          (address, index) =>
            index === selectedAddressIndex ? updatedAddress : address
        ),
      };
    } else {
      updatedAddress.addressid = shippingAddressData.shippingaddress.length + 1;
      updatedShippingAddressData = {
        ...shippingAddressData,
        shippingaddress: [
          ...shippingAddressData.shippingaddress,
          updatedAddress,
        ],
      };
    }

    axios
      .patch(`${userInfoURL}/${id}`, updatedShippingAddressData)
      .then((response) => {
        console.log("Address saved successfully:", response.data);
        dispatch(saveUserInfo());
        setShippingAddressData(updatedShippingAddressData);
        setNewAddress({
          address: "",
          fullName: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        });
        setSelectedAddressIndex(null);
      })
      .catch((error) => {
        console.error("Error saving address:", error);
      });
  };

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
  };

  return (
    <section className="shipping-address-page">
      <section className="top-part">
        <div className="py-3 d-flex justify-content-between align-items-center container">
          <Link className="nav-link">
            <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
          </Link>
          <span className="fw-bold mx-auto">Shipping Addresses</span>
        </div>
      </section>

      <section className="container">
        <div className="details-part">
          {shippingAddressData.shippingaddress?.map((address, index) => (
            <div className="product" key={index}>
              <div className="row mb-4 p-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">{user.Name}</span>
                  <span
                    className="change"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom"
                    onClick={() => EditAddress(index)}
                  >
                    Edit
                  </span>
                </div>
                <div className="col-8">
                  <span>
                    {`${address.address} ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
                  </span>
                </div>

                <div className="d-flex mt-3">
                  <Link to="/checkout">
                    <input
                      type="checkbox"
                      className="shipping-checkbox"
                      onChange={() => handleSelectAddress(address)}
                    />
                  </Link>
                  <label className="ms-2 form-check-label">
                    Use as the shipping address
                  </label>
                </div>
              </div>
            </div>
          ))}

          <div className="plus-image">
            <img
              src="../images/add.svg"
              alt="not found"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
              height={"55px"}
            />
          </div>

          <div className="container-fluid d-flex justify-content-end fixed-bottom address-offcanvas p-0">
            <div
              className="offcanvas offcanvas-bottom"
              tabIndex="-1"
              id="offcanvasBottom"
              aria-labelledby="offcanvasBottomLabel"
            >
              <div className="offcanvas-header">
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

              <h3 className="d-flex justify-content-center">
                Adding Shipping Address
              </h3>

              <div className="container address-text-field">
                <TextField
                  id="fullName"
                  name="fullName"
                  label="Full name"
                  variant="outlined"
                  className="w-100 my-3"
                  value={newAddress.fullName}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, fullName: e.target.value })
                  }
                />

                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  variant="outlined"
                  className="w-100"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                />

                <TextField
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  className="w-100 my-3"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                />

                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  variant="outlined"
                  className="w-100"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                />

                <TextField
                  id="zipCode"
                  name="zipCode"
                  label="Zip Code (Postal Code)"
                  variant="outlined"
                  className="w-100 my-3"
                  type="number"
                  value={newAddress.zipCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                />

                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  variant="outlined"
                  className="w-100"
                  value={newAddress.country}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, country: e.target.value })
                  }
                />
              </div>

              <div className="container">
                <button
                  className="saveaddress-btn"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={SaveAddress}
                >
                  SAVE ADDRESS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ShippingAddress;
