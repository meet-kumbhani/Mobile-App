import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import Form from "react-bootstrap/Form";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";
import "../CatalogPage/CatalogPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Slider from "@mui/material/Slider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavourites } from "../../toolkit/slice";
import { useDispatch } from "react-redux";

const CatelogPage2 = () => {
  const [product, setProduct] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [liked, setliked] = useState({});
  const { productId } = useParams();
  const [value, setValue] = useState([200, 370]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products`)
      .then((response) => {
        const data = response.data.filter((res) => {
          return res.productId == productId;
        });
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productId]);

  const sortProductsByPrice = (order) => {
    const sortedProducts = [...product].sort((a, b) => {
      if (order === "lowest to high") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProduct(sortedProducts);
    setFilterValue(`Price:-${order}`);
  };

  const handleSort = () => {
    const newSortOrder =
      sortOrder === "lowest to high" ? "highest to Low" : "lowest to high";
    sortProductsByPrice(newSortOrder);
    setSortOrder(newSortOrder);
  };

  const sortProductsByPopularity = () => {
    const sortedProducts = [...product].sort((a, b) => {
      return b.rating - a.rating;
    });
    setFilterValue("Popular");
    setProduct(sortedProducts);
  };

  const handleSortByPopularity = () => {
    sortProductsByPopularity();
  };

  let addFavourites = (productId) => {
    const selectedProduct = product.find((item) => item.id === productId);

    if (selectedProduct && selectedSizes && selectedColors) {
      dispatch(
        addToFavourites({
          ...selectedProduct,
          size: selectedSizes,
          color: selectedColors,
        })
      );
      setliked((prevLiked) => ({ ...prevLiked, [productId]: true }));
    } else {
      console.log("Product Not Add");
    }
  };

  const applyFilter = () => {
    let filteredData = product.filter((item) => {
      return item.price >= value[0] && item.price <= value[1];
    });

    if (selectedBrands.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedBrands.includes(item.brand)
      );
    }

    if (selectedSizes.length > 0) {
      filteredData = filteredData.filter((item) =>
        item.size.some((size) => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filteredData = filteredData.filter((item) =>
        item.color.some((color) => selectedColors.includes(color))
      );
    }

    setProduct(filteredData);
  };

  const handleSizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(
        selectedSizes.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    applyFilter();
  };

  const handleBrandSelection = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const discardFilters = () => {
    setValue([200, 370]);
    setSelectedBrands([]);
    setFilterValue("");
  };

  return (
    <section className="container catalog-page">
      {/* Top Part */}

      <section className="top-part">
        <div className="pt-3 d-flex justify-content-between">
          <ArrowBackIosNewIcon />
          <SearchIcon className="fs-1" />
        </div>

        {product.map((item) => (
          <h1 key={item.id} className="mt-4 fw-bold">
            {item.name || item.hoodietype || item.blacktype}
          </h1>
        ))}

        <div className="d-flex mt-3 filter-part">
          <FilterListIcon
            className="filter-icon2"
            data-bs-toggle="offcanvas"
            data-bs-target="#AllFilter"
            aria-controls="offcanvasBottom"
          />
          <Form.Control
            type="text"
            className="w-25 filter"
            placeholder="Filters"
          />
          <SwapVertIcon
            className="swap-icon2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          />
          <span>{filterValue || "Sort By"}</span>
          <Link to={`/catalog/${productId}`} className="nav-link ms-auto">
            <ViewModuleIcon className="view-icon2" />
          </Link>
        </div>
      </section>

      {/* Product List */}

      <section className="row pt-4 product-part">
        {product
          .filter((item) => item.image)
          .map((item) => (
            <div className="col-6 pb-4" key={item.id}>
              <Link to={`/productdetails/${item.id}`} className="nav-link">
                <div style={{ position: "relative" }}>
                  <img
                    src={item.image}
                    className="product-image2"
                    height={"160px"}
                    width={"100%"}
                  />
                  <Fab
                    style={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "0",
                      zIndex: "1",
                      color: "orange",
                      backgroundColor: "white",
                      height: "45px",
                      width: "45px",
                      backgroundColor: liked[item.id] ? "orange" : "white",
                      color: liked[item.id] ? "white" : "orange",
                    }}
                    aria-label="like"
                    className="favoutite-icon"
                    data-bs-toggle="offcanvas"
                    data-bs-target={`#${item.id}`}
                    aria-controls="offcanvasBottom"
                    onClick={(event) => event.preventDefault()}
                  >
                    <FavoriteBorderOutlinedIcon />
                  </Fab>

                  {/* Size Offcanvas */}
                  <div
                    className="offcanvas offcanvas-bottom pb-0"
                    tabIndex="-1"
                    id={item.id}
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
                        <button
                          className="XS w-100"
                          onClick={() => handleSizeSelection("XS")}
                        >
                          <b>XS</b>
                        </button>
                        <button
                          className="S w-100"
                          onClick={() => handleSizeSelection("S")}
                        >
                          <b>S</b>
                        </button>
                        <button
                          className="M w-100"
                          onClick={() => handleSizeSelection("M")}
                        >
                          <b>M</b>
                        </button>
                        <button
                          className="L w-100"
                          onClick={() => handleSizeSelection("L")}
                        >
                          <b>L</b>
                        </button>
                        <button
                          className="XL w-100"
                          onClick={() => handleSizeSelection("XL")}
                        >
                          <b>XL</b>
                        </button>
                      </div>

                      <hr />

                      <h5>Color</h5>
                      <div className="color-button p-3">
                        <button
                          className="yellow"
                          onClick={() => handleColorSelection("yellow")}
                        ></button>
                        <button
                          className="blue"
                          onClick={() => handleColorSelection("blue")}
                        ></button>
                        <button
                          className="white"
                          onClick={() => handleColorSelection("white")}
                        ></button>
                        <button
                          className="black"
                          onClick={() => handleColorSelection("black")}
                        ></button>
                        <button
                          className="green"
                          onClick={() => handleColorSelection("green")}
                        ></button>
                        <button
                          className="red"
                          onClick={() => handleColorSelection("red")}
                        ></button>
                      </div>
                    </div>
                    <div className="pb-3">
                      <button
                        className="border-0 rounded-pill w-100 p-3 addtocart-btn"
                        onClick={() => addFavourites(item.id)}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        ADD FAVOURITE
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <Rating
                    name="size-small"
                    className="mt-1 mb-1"
                    defaultValue={item.rating}
                    size="small"
                    readOnly
                  />
                  <span>{item.brand}</span>
                  <span className="fs-5 fw-bold">{item.type}</span>
                  <span className="fs-6 fw-bold">${item.price}</span>
                </div>
              </Link>

              <div className="container-fluid d-flex justify-content-end fixed-bottom">
                <div
                  className="offcanvas offcanvas-bottom"
                  tabIndex="-1"
                  id="AllFilter"
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

                    <p className="fw-bold mt-3 gray-title p-3 m-0">
                      Price range
                    </p>

                    <div className="px-3 py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="price-range">${value[0]}</p>
                        <p className="price-range">${value[1]}</p>
                      </div>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        onChange={handleChange}
                        max={2000}
                        getAriaValueText={valuetext}
                      />
                    </div>

                    <p className="fw-bold gray-title p-3 m-0">Colors</p>

                    <div className="color-button p-3">
                      <button
                        className={`yellow ${
                          selectedColors.includes("yellow") ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelection("yellow")}
                      ></button>
                      <button
                        className={`green ${
                          selectedColors.includes("green") ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelection("green")}
                      ></button>
                      <button
                        className={`white ${
                          selectedColors.includes("white") ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelection("white")}
                      ></button>
                      <button
                        className={`red ${
                          selectedColors.includes("red") ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelection("red")}
                      ></button>
                      <button
                        className={`blue ${
                          selectedColors.includes("blue") ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelection("blue")}
                      ></button>
                      <button
                        className={`black ${
                          selectedColors.includes("black") ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelection("black")}
                      ></button>
                    </div>

                    <p className="fw-bold gray-title p-3 m-0">Sizes</p>

                    {/* <div className="size-button-container p-3">
              <button
                className={`XS size-button ${
                  selectedSizes.includes("XS") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("XS")}
              >
                XS
              </button>
              <button
                className={`S size-button ${
                  selectedSizes.includes("S") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("S")}
              >
                S
              </button>
              <button
                className={`M size-button ${
                  selectedSizes.includes("M") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("M")}
              >
                M
              </button>
              <button
                className={`L size-button ${
                  selectedSizes.includes("L") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("L")}
              >
                L
              </button>
              <button
                className={`XL size-button ${
                  selectedSizes.includes("XL") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("XL")}
              >
                XL
              </button>
            </div> */}

                    <div className="container-fluid button-container pb-3 mt-4">
                      {item &&
                        item?.size?.map((size, index) => (
                          <button
                            key={index}
                            className={`size-button w-100 ${
                              selectedSizes.includes(size) ? "selected" : ""
                            }`}
                            onClick={() => handleSizeSelection(size)}
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

                    <div className="brands">
                      <p className="fw-bold gray-title p-3 nav-link">Brand</p>
                      <ul>
                        {[
                          ...new Set(
                            product.slice(1).map((item) => item.brand)
                          ),
                        ].map((brand) => (
                          <li
                            className="d-flex justify-content-between pt-3 pb-2"
                            key={brand}
                          >
                            <label>{brand}</label>
                            <input
                              type="checkbox"
                              onChange={() => handleBrandSelection(brand)}
                              checked={selectedBrands.includes(brand)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="d-flex justify-content-between fixed-bottom px-3 bg-white filter-buttons">
                      <button
                        className="discard-btn w-50 me-2"
                        onClick={discardFilters}
                      >
                        Discard
                      </button>
                      <button
                        className="apply-btn w-50 ms-2"
                        onClick={applyFilter}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        Apply
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          ))}
      </section>
      <Footer />

      {/* Sort By Filter */}

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
            <p className="ps-4 py-3 m-0" onClick={handleSortByPopularity}>
              Popular
            </p>
            <p className="ps-4 py-3 m-0">Newest</p>
            <p className="ps-4 py-3 m-0">Customer review</p>
            <p
              className="ps-4 py-3 m-0"
              onClick={() => handleSort("lowest to high")}
            >
              Price: lowest to high
            </p>
            <p
              className="ps-4 py-3 m-0"
              onClick={() => handleSort("highest to Low")}
            >
              Price: highest to low
            </p>
          </div>
        </div>
      </div>

      {/* All Filters */}

      {/* <div className="container-fluid d-flex justify-content-end fixed-bottom">
        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="AllFilter"
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
                  selectedColors.includes("yellow") ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("yellow")}
              ></button>
              <button
                className={`green ${
                  selectedColors.includes("green") ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("green")}
              ></button>
              <button
                className={`white ${
                  selectedColors.includes("white") ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("white")}
              ></button>
              <button
                className={`red ${
                  selectedColors.includes("red") ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("red")}
              ></button>
              <button
                className={`blue ${
                  selectedColors.includes("blue") ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("blue")}
              ></button>
              <button
                className={`black ${
                  selectedColors.includes("black") ? "selected" : ""
                }`}
                onClick={() => handleColorSelection("black")}
              ></button>
            </div>

            <p className="fw-bold gray-title p-3 m-0">Sizes</p>

            <div className="size-button-container p-3">
              <button
                className={`XS size-button ${
                  selectedSizes.includes("XS") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("XS")}
              >
                XS
              </button>
              <button
                className={`S size-button ${
                  selectedSizes.includes("S") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("S")}
              >
                S
              </button>
              <button
                className={`M size-button ${
                  selectedSizes.includes("M") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("M")}
              >
                M
              </button>
              <button
                className={`L size-button ${
                  selectedSizes.includes("L") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("L")}
              >
                L
              </button>
              <button
                className={`XL size-button ${
                  selectedSizes.includes("XL") ? "selected" : ""
                }`}
                onClick={() => handleSizeSelection("XL")}
              >
                XL
              </button>
            </div>

            <div className="brands">
              <p className="fw-bold gray-title p-3 nav-link">Brand</p>
              <ul>
                {[...new Set(product.slice(1).map((item) => item.brand))].map(
                  (brand) => (
                    <li
                      className="d-flex justify-content-between pt-3 pb-2"
                      key={brand}
                    >
                      <label>{brand}</label>
                      <input
                        type="checkbox"
                        onChange={() => handleBrandSelection(brand)}
                        checked={selectedBrands.includes(brand)}
                      />
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="d-flex justify-content-between py-3 px-3 fixed-bottom bg-white">
              <button
                className="discard-btn w-50 me-2"
                onClick={discardFilters}
              >
                Discard
              </button>
              <button
                className="apply-btn w-50 ms-2"
                onClick={applyFilter}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Apply
              </button>
            </div>
          </section>
        </div>
      </div> */}
    </section>
  );
};

export default CatelogPage2;
