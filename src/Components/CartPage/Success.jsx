import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <section className="success-page">
      <div className="success-image">
        <img src="../images/bags.svg" className="mb-5" alt="not found" />
        <h1 className="fw-bold">Success!</h1>
        <p className="mt-2">
          Your order will be delivered soon. <br />
          Thank you for choosing our app!
        </p>
      </div>

      <div className="container">
        <Link to="/mainpage">
          <button className="shopping-btn">CONTINUE SHOPPING</button>
        </Link>
      </div>
    </section>
  );
};

export default Success;
