import { Fab, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, favouriteData } from "../../toolkit/slice";
import { Link } from "react-router-dom";

const Items = (props) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [addfavourite, setAddfavourite] = useState(false);
  const favourites = useSelector((i) => i.data.favouriteData);
  const dispatch = useDispatch();

  useEffect(() => {
    const isProductInFavourite = favourites?.some(
      (item) =>
        item.productId === props?.productId &&
        item.brand === props?.brand &&
        item.type === props?.type &&
        item.quantity === props?.quantity &&
        item.price === props?.price &&
        item.size === selectedSizes[0] &&
        item.color === selectedColors[0]
    );
    setAddfavourite(isProductInFavourite);
  }, [favourites, props, selectedColors, selectedSizes]);

  const ColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([color]);
    }
  };

  const SizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([size]);
    }
  };

  let AddToFavorites = () => {
    if (props && selectedSizes.length > 0 && selectedColors.length > 0) {
      dispatch(
        addToFavourites({
          ...props,
          size: selectedSizes[0],
          color: selectedColors[0],
        })
      );
      setSelectedSizes([]);
      setSelectedColors([]);
      dispatch(favouriteData(props));
    } else {
      console.log("Product Not Add");
    }
  };

  return (
    <div>
      <Link to={`/productdetails/${props.id}`} className="nav-link">
        <div className="product">
          <div className="row mb-4" style={{ position: "relative" }}>
            <div className="col-3">
              <img
                src={props.image}
                className="product-image"
                height={"120px"}
                width={"100px"}
              />
            </div>
            <div className="col-9 ps-5">
              <div className="d-flex flex-column">
                <span className="mt-2 fs-3 fw-bold">{props.brand}</span>
                <span>{props.type}</span>
                <Rating
                  name="size-small"
                  className="mt-1 mb-1"
                  defaultValue={props.rating}
                  size="small"
                  readOnly
                />
                <span className="fs-6 fw-bold">${props.price}</span>
              </div>
            </div>
            <Fab
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "14px",
                zIndex: "1",
                color: "orange",
                backgroundColor: "white",
                height: "45px",
                width: "45px",
              }}
              aria-label="like"
              className="favoutite-icon"
              data-bs-toggle="offcanvas"
              data-bs-target={`#size_${props.id}`}
              aria-controls="offcanvasBottom"
              onClick={(event) => event.preventDefault()}
            >
              <FavoriteBorderOutlinedIcon />
            </Fab>
          </div>
        </div>
      </Link>

      {/* Size Offcanvas */}

      <div
        className="offcanvas offcanvas-bottom mb-0 pb-0"
        tabIndex="-1"
        id={`size_${props.id}`}
        aria-labelledby={`offcanvasBottomLabel_${props.id}`}
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
            {props &&
              props?.size &&
              props?.size?.map((size, index) => (
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
                    color: selectedSizes.includes(size) ? "white" : "black",
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
            {props &&
              props?.color &&
              props?.color?.map((color, index) => (
                <button
                  key={index}
                  className={`color-button ${
                    selectedColors.includes(color) ? "selected" : ""
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
        <div className="pb-3 container">
          {addfavourite ? (
            <Link
              to="/favourite"
              className="border-0 rounded-pill w-100 nav-link p-3 addtocart-btn text-center"
            >
              GO TO FAVOURITE
            </Link>
          ) : (
            <button
              className="border-0 rounded-pill w-100 p-3 btn addtocart-btn"
              style={{
                backgroundColor: "rgba(255, 127, 0, 1)",
                color: "white",
              }}
              disabled={
                selectedSizes.length === 0 || selectedColors.length === 0
              }
              onClick={AddToFavorites}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              ADD FAVOURITE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
