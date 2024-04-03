import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShareIcon from "@mui/icons-material/Share";
import Rating from "@mui/material/Rating";
import "../ProductDetail/ProductDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { mainURL } from "../../config/url";
import Fab from "@mui/material/Fab";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToFavourites,
  cartData,
  favouriteData,
} from "../../toolkit/slice";

const ProductDetails = () => {
  const [details, setDetails] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setliked] = useState({});
  const [addcart, setAddcart] = useState(false);
  const [addfavourite, setAddfavourite] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.data?.cartData);
  const favoritedata = useSelector((state) => state.data.favouriteData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartData());
    dispatch(favouriteData());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${mainURL}/${id}`)
      .then((response) => {
        setDetails(response.data);

        axios
          .get(`${mainURL}`)
          .then((res) => {
            const relatedProducts = res.data.filter(
              (product) => product.productId === response.data.productId
            );
            setRelated(relatedProducts);
          })
          .catch((err) => {
            console.error("Error ==>", err);
          });
      })
      .catch((error) => {
        console.error("Error ==> ", error);
      });
  }, [id]);

  useEffect(() => {
    const isProductInCart = cartItems?.some(
      (item) =>
        item.productId === details?.productId &&
        item.brand === details?.brand &&
        item.type === details?.type &&
        item.price === details?.price &&
        item.color === selectedColor[0] &&
        item.size === selectedSizes[0]
    );
    setAddcart(isProductInCart);

    const isProductInFavourite = favoritedata?.some(
      (item) =>
        item.productId === details?.productId &&
        item.brand === details?.brand &&
        item.type === details?.type &&
        item.price === details?.price &&
        item.color === selectedColor[0] &&
        item.size === selectedSizes[0]
    );
    setAddfavourite(isProductInFavourite);
  }, [cartItems, details, favoritedata, addcart, selectedColor, selectedSizes]);

  const SizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes([size]);
    }
  };

  const ColorSelection = (color) => {
    if (selectedColor.includes(color)) {
      setSelectedColor([]);
    } else {
      setSelectedColor([color]);
    }
  };

  let addProduct = () => {
    if (selectedSizes && selectedColor) {
      dispatch(
        addToCart({
          ...details,
          size: selectedSizes[0],
          color: selectedColor[0],
        })
      );
      setAddcart(true);
      setSelectedSizes([]);
      setSelectedColor([]);
      dispatch(cartData());
    } else {
      console.log("Product Not Add");
    }
  };

  let addFavourites = () => {
    if (details && selectedSizes.length > 0 && selectedColor.length > 0) {
      dispatch(
        addToFavourites({
          ...details,
          size: selectedSizes[0],
          color: selectedColor[0],
        })
      );
      setAddfavourite(true);
      setliked(true);
      setSelectedSizes([]);
      setSelectedColor([]);
      dispatch(favouriteData());
    } else {
      console.log("Product Not Add");
    }
  };

  return (
    <section className="productdetails-part">
      {/* Top Part */}

      <section className="top-part container-fluid">
        <div className="pt-3 pb-3 d-flex justify-content-between">
          <ArrowBackIosNewIcon onClick={() => navigate(-1)} />

          {details ? (
            <span className="fw-bold">{details.type}</span>
          ) : (
            "Loading..."
          )}
          {/* <ShareIcon /> */}
          <p></p>
        </div>
      </section>

      {/* Product Details */}

      <section className="productdetails">
        {details ? (
          <Link to={`/productdetails/${details.id}`} className="nav-link">
            <div>
              <div className="image-part">
                <img src={details.image} alt="" width="100%" height="430px" />
              </div>

              <div className="text-end container-fluid mt-3">
                <span
                  aria-label="like"
                  className="favoutite-icon"
                  data-bs-toggle="offcanvas"
                  data-bs-target={`#${details.id}`}
                  aria-controls="offcanvasBottom"
                  style={{
                    backgroundColor: liked[details.id] ? "orange" : "white",
                    color: liked[details.id] ? "white" : "orange",
                  }}
                  onClick={(event) => event.preventDefault()}
                >
                  <FavoriteBorderOutlinedIcon />
                </span>
              </div>

              {/* Favourite Size and Color */}

              <div
                className="offcanvas offcanvas-bottom pb-0"
                tabIndex="-1"
                id={details.id}
                aria-labelledby="offcanvasBottomLabel"
              >
                <div className="offcanvas-header">
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body small pt-0">
                  <h5 className="text-center">Select size</h5>

                  <div className="button-container pb-3 mt-4">
                    {details &&
                      details?.size?.map((size, index) => (
                        <button
                          key={index}
                          className={`size-button w-100 ${
                            selectedSizes.includes(size) ? "selected" : ""
                          }`}
                          onClick={() => SizeSelection(size)}
                          style={{
                            backgroundColor: selectedSizes.includes(size)
                              ? "#FF7F00"
                              : "white",
                            color: selectedSizes.includes(size)
                              ? "white"
                              : "black",
                            borderRadius: "5px",
                          }}
                        >
                          {size}
                        </button>
                      ))}
                  </div>

                  <hr />

                  <h5>Color</h5>
                  <div className="color-container d-flex justify-content-between">
                    {details &&
                      details?.color &&
                      details?.color?.map((color, index) => (
                        <button
                          key={index}
                          className={`color-button ${
                            selectedColor.includes(color) ? "selected" : ""
                          }`}
                          onClick={() => ColorSelection(color)}
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: color,
                            border: "none",
                            borderRadius: "50%",
                          }}
                        ></button>
                      ))}
                  </div>
                </div>
                <div className="pb-3 container-fluid">
                  {addfavourite ? (
                    <Link
                      to="/favourite"
                      className="border-0 rounded-pill w-100 nav-link p-3 addtocart-btn text-center"
                    >
                      GO TO FAVOURITE
                    </Link>
                  ) : (
                    <button
                      className="border-0 rounded-pill w-100 p-3 btn"
                      style={{
                        backgroundColor: "rgba(255, 127, 0, 1)",
                        color: "white",
                      }}
                      disabled={
                        selectedSizes.length === 0 || selectedColor.length === 0
                      }
                      onClick={() => addFavourites(details.id)}
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      ADD FAVOURITE
                    </button>
                  )}
                </div>
              </div>

              <div className="details mt-3 container-fluid">
                <div className="d-flex justify-content-between">
                  <div>
                    <h1>{details.brand}</h1>
                    <p className="productname">{details.type}</p>
                    <Link to={`/review/${id}`}>
                      <Rating
                        name="read-only"
                        value={details?.rating}
                        readOnly
                      />
                    </Link>
                  </div>
                  <h1>${details.price}</h1>
                </div>
                <p>{details.description}</p>

                <div>
                  <button
                    className="border-0 rounded-pill w-100 p-3 addtocart-btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#size-color"
                    aria-controls="offcanvasBottom"
                  >
                    ADD TO CART
                  </button>
                </div>

                {/* Color and Size */}

                <div
                  className="offcanvas offcanvas-bottom"
                  tabIndex="-1"
                  id="size-color"
                  aria-labelledby="offcanvasBottomLabel"
                >
                  <div className="offcanvas-header">
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body small pt-0">
                    <p className="fw-bold gray-title p-2 m-0">Colors</p>

                    <div className="color-container d-flex justify-content-between">
                      {details &&
                        details?.color &&
                        details?.color?.map((color, index) => (
                          <button
                            key={index}
                            className={`color-button ${
                              selectedColor.includes(color) ? "selected" : ""
                            }`}
                            onClick={() => ColorSelection(color)}
                            style={{
                              width: "30px",
                              height: "30px",
                              backgroundColor: color,
                              border: "none",
                              borderRadius: "50%",
                            }}
                          ></button>
                        ))}
                    </div>

                    <hr />
                    <p className="fw-bold gray-title p-2 m-0">Sizes</p>

                    <div className="button-container pb-3 mt-4">
                      {details &&
                        details?.size?.map((size, index) => (
                          <button
                            key={index}
                            className={`size-button w-100 ${
                              selectedSizes.includes(size) ? "selected" : ""
                            }`}
                            onClick={() => SizeSelection(size)}
                            style={{
                              backgroundColor: selectedSizes.includes(size)
                                ? "#FF7F00"
                                : "white",
                              color: selectedSizes.includes(size)
                                ? "white"
                                : "black",
                              borderRadius: "5px",
                            }}
                          >
                            {size}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="pb-3 container-fluid">
                    {addcart ? (
                      <Link
                        to="/cart"
                        className="border-0 rounded-pill w-100 nav-link p-3 addtocart-btn text-center"
                      >
                        GO TO CART
                      </Link>
                    ) : (
                      <button
                        className="border-0 rounded-pill w-100 p-3 btn"
                        style={{
                          backgroundColor: "rgba(255, 127, 0, 1)",
                          color: "white",
                        }}
                        disabled={
                          selectedSizes.length === 0 ||
                          selectedColor.length === 0
                        }
                        onClick={addProduct}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#size-color"
                        aria-controls="offcanvasBottom"
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="">
                <div className="shiping-support container-fluid">
                  <h5>Shipping info</h5>
                  <span>Ship From:- RK COLLECTION</span>
                  <p>Sold by:- MK</p>
                </div>

                <hr />
              </div>
            </div>
          </Link>
        ) : (
          "Loading..."
        )}
      </section>

      {/* Related Products */}

      <section className="sale-part">
        <div className="container-fluid new-collection mt-3 d-flex justify-content-between align-items-baseline">
          <div className="new-leftpart">
            <h3 className="sub-title">You can also like this</h3>
          </div>
          <div className="new-rightpart">{related.length - 1} items</div>
        </div>

        <section className="pt-3 product-part d-flex pe-2 ps-2">
          {related
            ? related.slice(1)?.map((item) => (
                <div key={item.id}>
                  <Link to={`/productdetails/${item.id}`} className="nav-link">
                    <div className="pb-4 mx-2">
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={item.image || item.img}
                          className="product-image2"
                          height={"160px"}
                          width={"130px"}
                        />

                        <Fab
                          aria-label="like"
                          className="favoutite-icon"
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            right: 0,
                            zIndex: "1",
                            color: "orange",
                            backgroundColor: "white",
                            height: "38px",
                            width: "38px",
                          }}
                        >
                          <FavoriteBorderOutlinedIcon className="fs-5 related-icon" />
                        </Fab>
                      </div>
                      <div className="d-flex flex-column">
                        <Rating
                          name="size-small"
                          className="mt-1 mb-1"
                          defaultValue={item.rating}
                          size="small"
                        />
                        <span>{item.brand}</span>
                        <span className="fs-3 fw-bold">{item.type}</span>
                        <div className="d-flex">
                          <div className="price">{item.price}₹</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : "loading"}
        </section>
      </section>
    </section>
  );
};

export default ProductDetails;
