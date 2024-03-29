import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Form from "react-bootstrap/Form";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import "../FavouritePage/FavouritePage.css";
import Footer from "../Footerpart/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import {
  addToCart,
  favouriteData,
  removeFromFavourite,
} from "../../toolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import { favouriteURL } from "../../config/url";

const FavouriteGrid = () => {
  const [value, setValue] = useState([200, 370]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSorting, setSelectedSorting] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const favoritedata = useSelector((state) => state.data.favouriteData);

  useEffect(() => {
    dispatch(favouriteData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(favoritedata);
  }, [favoritedata]);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
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

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sortByPrice = (order) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredData(sortedData);
    setSelectedSorting(
      `Price: ${order === "asc" ? "lowest to high" : "highest to low"}`
    );
  };

  const sortByPopularity = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return b.rating - a.rating;
    });
    setFilteredData(sortedData);
    setSelectedSorting("Popular");
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  const applyFilter = () => {
    let filteredProducts = favoritedata.filter(
      (product) => product.price >= value[0] && product.price <= value[1]
    );

    if (selectedSize) {
      filteredProducts = filteredProducts.filter((product) =>
        product.size.includes(selectedSize)
      );
    }

    if (selectedColor) {
      filteredProducts = filteredProducts.filter((product) =>
        product.color.includes(selectedColor)
      );
    }

    setFilteredData(filteredProducts);
  };

  const filterByBrand = () => {
    if (searchQuery.trim() === "") {
      setFilteredData(favoritedata);
    } else {
      const filteredProducts = favoritedata.filter((product) =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredProducts);
    }
  };

  const handleSearch = () => {
    filterByBrand();
  };

  if (filteredData?.length == 0) {
    return (
      <>
        <div className="empty-cart container">
          <div className="text-center">
            <img
              src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="No items"
              className="w-100"
            />
            <h2>Empty Favourite Page</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <section className="container favourite-page">
      {/* Top Part */}

      <section className="top-part">
        <div className="pt-1 d-flex justify-content-between align-items-baseline">
          <span className="fw-bold mx-auto">Favourites</span>
          <div className="pt-3 d-flex justify-content-end align-items-center">
            <Form.Control
              type="text"
              className="w-50"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="fs-1" onClick={handleSearch} />
          </div>
        </div>
        <div className="d-flex mt-3 filter-part justify-content-between">
          <FilterListIcon
            className="filter-icon2"
            data-bs-toggle="offcanvas"
            data-bs-target="#AllFilters"
            aria-controls="offcanvasBottom"
          />

          <p className="m-0">Filters</p>
          <SwapVertIcon
            className="swap-icon2 ms-auto"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          />
          <p className="p-0 m-0">{selectedSorting || "Sort By"}</p>
          <Link to="/favourite" className="nav-link ms-auto">
            <ViewModuleIcon className="view-icon2" />
          </Link>
        </div>
      </section>

      {/* Favourite items */}

      <section className="row pt-4">
        {filteredData?.map((item) => (
          <div className="col-6 pb-4" key={item.id}>
            <div style={{ position: "relative" }}>
              <img
                src={item.image}
                className="product-image2"
                height={"200px"}
                width={"100%"}
              />
              <CloseIcon
                className="closeicon"
                onClick={() => deleteProduct(item.id)}
              />
              <Fab
                aria-label="like"
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "0px",
                  zIndex: "1",
                  color: "orange",
                  backgroundColor: "white",
                  height: "45px",
                  width: "45px",
                }}
                onClick={() => addToCartHandler(item)}
              >
                <img
                  src="../cart.svg"
                  style={{ height: "56px", width: "56px", marginTop: "11px" }}
                />
              </Fab>
            </div>
            <div className="d-flex flex-column">
              <Rating
                name="size-small"
                className="my-1"
                defaultValue={item.rating}
                size="small"
              />
              <span className="color">{item.brand}</span>
              <span className="fs-3 fw-bold">{item.type}</span>
              <div className="d-flex">
                <span className="me-1 color">Color:</span>
                <span>{item.color}</span>
                <span className="ms-3 color">Size: </span>
                <span>{item.size}</span>
              </div>
              <span className="fs-5 fw-bold">$ {item.price}</span>
            </div>
          </div>
        ))}
      </section>

      <Footer />

      {/* All Filters */}

      <div className="container-fluid d-flex justify-content-end fixed-bottom">
        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="AllFilters"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title text-center"
              id="offcanvasBottomLabel"
            ></h5>
            <button
              type="button"
              className="btn-close text-reset pb-0"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <section className="product-filter">
            <h4 className="text-center pb-3 m-0">Filters</h4>

            <p className="fw-bold mt-3 gray-title p-3 m-0">Price range</p>

            <div className="px-3 py-2">
              <div className="d-flex justify-content-between align-items-center">
                <p className="price-range">${value[0]}</p>
                <p className="price-range">${value[1]}</p>
              </div>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                max={500}
                getAriaValueText={valuetext}
              />
            </div>

            <p className="fw-bold gray-title p-3 m-0">Colors</p>

            <div className="color-button p-3">
              <button
                className={`yellow ${
                  selectedColor === "yellow" ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("yellow")}
              ></button>
              <button
                className={`green ${
                  selectedColor === "green" ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("green")}
              ></button>
              <button
                className={`white ${
                  selectedColor === "white" ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("white")}
              ></button>
              <button
                className={`red ${selectedColor === "red" ? "selected" : ""}`}
                onClick={() => handleColorSelection("red")}
              ></button>
              <button
                className={`blue ${selectedColor === "blue" ? "selected" : ""}`}
                onClick={() => handleColorSelection("blue")}
              ></button>
              <button
                className={`black ${
                  selectedColor === "black" ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("black")}
              ></button>
            </div>

            <p className="fw-bold gray-title p-3 m-0">Sizes</p>

            <div className="size-button-container p-3">
              <button
                className={`XS size-button ${
                  selectedSize === "XS" ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("XS")}
              >
                XS
              </button>
              <button
                className={`S size-button ${
                  selectedSize === "S" ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("S")}
              >
                S
              </button>
              <button
                className={`M size-button ${
                  selectedSize === "M" ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("M")}
              >
                M
              </button>
              <button
                className={`L size-button ${
                  selectedSize === "L" ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("L")}
              >
                L
              </button>
              <button
                className={`XL size-button ${
                  selectedSize === "XL" ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("XL")}
              >
                XL
              </button>
            </div>

            <div className="brands">
              <p className="fw-bold gray-title p-3 nav-link">Brand</p>

              <ul>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
              </ul>
            </div>

            <div className="d-flex justify-content-between py-3 px-3 fixed-bottom bg-white">
              <button className="discard-btn w-50 me-2">Discard</button>
              <button
                className="apply-btn w-50 ms-2"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={applyFilter}
              >
                Apply
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Sort By Filters */}

      <div className="container-fluid d-flex justify-content-end fixed-bottom">
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
          <div className="small mb-3">
            <p className="d-flex justify-content-center fw-bold">Sort by</p>
            <p className="ps-4 py-3 m-0" onClick={sortByPopularity}>
              Popular
            </p>
            <p className="ps-4 py-3 m-0">Newest</p>
            <p className="ps-4 py-3 m-0">Customer review</p>
            <p className="ps-4 py-3 m-0" onClick={() => sortByPrice("asc")}>
              Price: lowest to high
            </p>
            <p className="ps-4 py-3 m-0" onClick={() => sortByPrice("desc")}>
              Price: highest to low
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavouriteGrid;
