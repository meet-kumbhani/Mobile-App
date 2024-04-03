import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userInfoURL } from "../../config/url";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Adress = () => {
  const [useradress, setuserAdress] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${userInfoURL}/${id}`)
      .then((res) => {
        setuserAdress(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="shipping-address container-fluid">
      <div className="shipping fixed-top px-2">
        <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
        <h2 className="fw-bold">Shipping Address</h2>
        <p></p>
      </div>
      <div className="adress-part">
        <div className="mb-4">
          {useradress ? (
            useradress.shippingaddress.map((address, index) => (
              <div className="product" key={index}>
                <div>
                  <h5>
                    {address.address}, {address.city}, {address.state},{" "}
                    {address.zipCode}, {address.country}
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adress;

// {useradress.shippingaddress?.map((add) => (
//      <div key={add.id}>
//        <h4>
//          {add.address},{add.city},{add.state},{add.zipCode},
//          {add.country}
//        </h4>
//      </div>
//    ))}
