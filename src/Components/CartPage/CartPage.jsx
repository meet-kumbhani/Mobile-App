import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "../CartPage/CartPage.css";
import Form from "react-bootstrap/Form";
import Footer from "../Footerpart/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  updateCartItemQuantity,
  removeFromCart,
  addToFavourites,
} from "../../toolkit/slice";
import { cartURL } from "../../config/url";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = ({ setTotalAmount }) => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const cartdata = useSelector((state) => state.data.cartData);
  console.log(cartdata, "Cartdata");

  useEffect(() => {
    dispatch(cartData());
  }, [dispatch]);

  const increaseQuantity = (itemId, currentQuantity) => {
    const updatedQuantity = currentQuantity + 1;
    dispatch(updateCartItemQuantity({ itemId, quantity: updatedQuantity }));
  };

  const decreseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      dispatch(updateCartItemQuantity({ itemId, quantity: updatedQuantity }));
    }
  };

  const calculateTotalAmount = () => {
    return cartdata.reduce(
      (total, item) => total + (item?.price * item?.quantity || 0),
      0
    );
  };

  let allitemtotal = cartdata
    ? cartdata.reduce(
        (total, item) => total + (item?.price * item?.quantity || 0),
        0
      )
    : 0;

  if (!allitemtotal) {
    return (
      <>
        <div className="empty-cart container">
          <div className="text-center">
            <img
              src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="No items"
              className="w-100"
            />
            <h2>Your Cart is empty</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const deleteProduct = (itemId) => {
    axios
      .delete(`${cartURL}/${itemId}`)
      .then(() => {
        dispatch(removeFromCart(itemId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let addToFavorites = (productId) => {
    const selectedProduct = cartdata.find((item) => item.id === productId);

    if (selectedProduct) {
      dispatch(addToFavourites(selectedProduct));
    } else {
      console.log("Product Not Add");
    }
  };

  const applyPromoCode = () => {
    if (promoCode.trim() !== "") {
      if (promoCode === "MK") {
        const discountAmount = allitemtotal * 0.05;
        const discountedTotalAmount = allitemtotal - discountAmount;
        setDiscountedTotal(discountedTotalAmount);
      } else {
        alert("Invalid promo code!");
        setDiscountedTotal(0);
      }
    } else {
      setDiscountedTotal(0);
    }
  };

  const PromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const totalAmount = calculateTotalAmount();
  setTotalAmount(totalAmount);

  return (
    <>
      <section className="container-fluid cart-page">
        <section className="top-part">
          <div className="d-flex justify-content-end">
            <SearchIcon className="search-icon" />
          </div>
          <h1 className="fw-bold mt-3 mb-4">My Bag</h1>
        </section>
        <section className="cartprouct-part">
          {cartdata?.map((cartitems) => (
            <div className="product" key={cartitems.id}>
              <div className="row mb-4">
                <div className="col-3">
                  <img
                    src={cartitems.image}
                    alt="not found"
                    className="cartproduct-image"
                  />
                </div>
                <div className="col-9 ps-5">
                  <div className="d-flex justify-content-between">
                    <h3 className="mt-2">{cartitems.type}</h3>
                    <MoreVertIcon
                      className="more-icon"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <div className="dropdown-menu">
                      <div className="d-grid p-2">
                        <button
                          className="dropdown-item text-center"
                          onClick={() => addToFavorites(cartitems.id)}
                        >
                          Add to favorites
                        </button>
                        <hr />
                        <button
                          className="dropdown-item text-center"
                          onClick={() => deleteProduct(cartitems.id)}
                        >
                          Remove item
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="me-1 color">Color:</p>
                    <p>{cartitems.color}</p>
                    <p className="ms-3 me-1 size">Size:</p>
                    <p>{cartitems.size}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-end">
                      <img
                        src="../minus.svg"
                        alt="minus not found"
                        onClick={() =>
                          decreseQuantity(cartitems.id, cartitems.quantity)
                        }
                      />
                      <p> {cartitems.quantity}</p>
                      <img
                        src="../plus.svg"
                        alt="plus not found"
                        onClick={() =>
                          increaseQuantity(cartitems.id, cartitems.quantity)
                        }
                      />
                      <h1>{cartitems?.added}</h1>
                    </div>
                    <div className="fw-bold product-price me-3">
                      {cartitems.price * cartitems.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ position: "relative", width: "100%" }}>
            <Form.Control
              type="text"
              className="promocode-field mb-4"
              placeholder="Enter your promo code"
              value={promoCode}
              onChange={PromoCodeChange}
            />
            <ArrowCircleRightIcon
              className="right-arrow"
              onClick={applyPromoCode}
            />
          </div>

          <div className="d-flex justify-content-between">
            <h4 className="color">Total amount:</h4>
            <h4 className="fw-bold">{discountedTotal || allitemtotal}$</h4>
          </div>
          {discountedTotal > 0 ? (
            <p className="discount text-end">(5% discount applied)</p>
          ) : (
            ""
          )}

          <Link to="/shippingaddress">
            <button className="checkout-btn">CHECK OUT</button>
          </Link>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default CartPage;
