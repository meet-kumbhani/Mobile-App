import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Form from "react-bootstrap/Form";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "../FavouritePage/FavouritePage.css";
import Footer from "../Footerpart/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import {
  addToCart,
  cartData,
  favouriteData,
  removeFromFavourite,
} from "../../toolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import Favitem from "./Favitem";

const FavouritePageList = () => {
  const [value, setValue] = useState([200, 370]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSorting, setSelectedSorting] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const favoritedata = useSelector((state) => state.data.favouriteData);
  const cartdata = useSelector((i) => i.data.cartData);

  useEffect(() => {
    dispatch(favouriteData());
    dispatch(cartData(cartdata));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(favoritedata);
  }, [favoritedata]);

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
    <section className="container catalog-page">
      {/* Top Part */}

      <section className="top-part">
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
        <h1 className="mt-4 fw-bold">Favourites</h1>

        <div className="d-flex mt-3 filter-part align-items-center">
          <FilterListIcon
            className="filter-icon2"
            data-bs-toggle="offcanvas"
            data-bs-target="#AllFilters"
            aria-controls="offcanvasBottom"
          />
          <p className="w-25 filter m-0">Filters</p>
          <SwapVertIcon
            className="swap-icon2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          />
          <p className="p-0 m-0">{selectedSorting || "Sort By"}</p>
          <Link to="/favouritegrid" className="nav-link ms-auto">
            <ViewModuleIcon className="view-icon2 " />
          </Link>
        </div>
      </section>

      {/* Favourites Items */}

      <section>
        {filteredData?.map((item, index) => (
          <>
            <Favitem
              image={item.image}
              rating={item.rating}
              price={item.price}
              type={item.type}
              brand={item.brand}
              size={item.size}
              id={item.id}
              productId={item.productId}
              quantity={item.quantity}
              color={item.color}
            />
          </>
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

      <div className="container-fluid d-flex justify-content-end fixed-bottom ">
        <div
          className="offcanvas offcanvas-bottom pb-0"
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
            <p className="ps-4 py-3 m-0" onClick={() => sortByPrice("desc")}>
              Price: lowest to high
            </p>
            <p className="ps-4 py-3 m-0" onClick={() => sortByPrice("asc")}>
              Price: highest to low
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavouritePageList;
