import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartData, removeFromFavourite } from "../../toolkit/slice";
import axios from "axios";
import { favouriteURL } from "../../config/url";
import { closeSnackbar, enqueueSnackbar } from "notistack";

const Favitem = (props) => {
  const dispatch = useDispatch();
  const [addcart, setAddcart] = useState(false);
  const cartdata = useSelector((i) => i.data.cartData);

  useEffect(() => {
    const isProductInCart = cartdata?.some(
      (item) =>
        item.productId === props?.productId &&
        item.brand === props?.brand &&
        item.type === props?.type &&
        item.quantity === props?.quantity &&
        item.price === props?.price &&
        item.color === props?.color &&
        item.size === props?.size
    );
    setAddcart(isProductInCart);
  }, [cartdata, props]);

  const addToCartHandler = () => {
    if (props) {
      dispatch(addToCart(props));
      dispatch(cartData(props));
    }
  };

  const deleteProduct = (itemId) => {
    axios
      .delete(`${favouriteURL}/${itemId}`)
      .then(() => {
        dispatch(removeFromFavourite(itemId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const alredypresent = () => {
    const snackbar = enqueueSnackbar("This Product is Alredy in cart", {
      variant: "success",
    });
    setTimeout(() => closeSnackbar(snackbar), 2000);
  };
  return (
    <div className="product mt-4" key={props.id}>
      <div className="row mb-4" style={{ position: "relative" }}>
        <div className="col-3">
          <img
            src={props.image}
            className="product-image"
            height={"140px"}
            width={"100px"}
          />
        </div>
        <div className="col-9 ps-5">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <span className="mt-2 color">{props.type}</span>
              <CloseIcon
                className="mt-2 me-2 color"
                onClick={() => deleteProduct(props.id)}
              />
            </div>
            <span className="fs-3 fw-bold">{props.brand}</span>
            <div className="d-flex">
              <span className="me-1 color">Color : </span>
              <span>{props.color}</span>
              <span className="ms-3 me-1 color">Size : </span>
              <span>{props.size}</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span className="fs-6 fw-bold">$ {props.price}</span>
              <Rating
                name="size-small"
                className="mt-1 mb-1 me-5"
                defaultValue={props.rating}
                size="small"
              />
            </div>
          </div>
        </div>

        {addcart ? (
          <Fab
            aria-label="like"
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "13px",
              zIndex: "1",
              color: "orange",
              backgroundColor: "white",
              height: "45px",
              width: "45px",
            }}
            onClick={alredypresent}
          >
            <img
              src="../cart.svg"
              style={{ height: "56px", width: "56px", marginTop: "11px" }}
            />
          </Fab>
        ) : (
          <>
            <Fab
              aria-label="like"
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "13px",
                zIndex: "1",
                color: "orange",
                backgroundColor: "white",
                height: "45px",
                width: "45px",
              }}
              onClick={addToCartHandler}
            >
              <img
                src="../cart.svg"
                style={{ height: "56px", width: "56px", marginTop: "11px" }}
              />
            </Fab>
          </>
        )}
      </div>
    </div>
  );
};

export default Favitem;
