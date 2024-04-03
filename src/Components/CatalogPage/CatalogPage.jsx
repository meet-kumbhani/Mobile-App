import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "../CatalogPage/CatalogPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import Slider from "@mui/material/Slider";
import { useDispatch } from "react-redux";
import Items from "./Items";
import { favouriteData } from "../../toolkit/slice";
import { CircularProgress } from "@mui/material";
import { mainURL } from "../../config/url";

const CatalogPage = () => {
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { productId } = useParams();
  const [value, setValue] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizefilter, setSizefilter] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(favouriteData());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(mainURL)
      .then((response) => {
        const data = response.data.filter((res) => {
          return res.productId == productId;
        });
        setProduct(data);
        const sizes = [...new Set(data.flatMap((item) => item.size))];
        setSizefilter(sizes);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setloading(false);
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
        item.size?.some((size) => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filteredData = filteredData.filter((item) =>
        item.color?.some((color) => selectedColors.includes(color))
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
    setValue([0, 1000]);
    setSelectedBrands([]);
    setFilterValue("");
  };

  const filteredProducts = product?.filter((item) =>
    item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <section className="container catalog-page">
          {/* Top Part */}

          <section className="top-part fixed-top pb-2 container-fluid">
            <div className="pt-3 d-flex justify-content-between ">
              <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
              <div className="search-bar">
                {isSearchOpen ? (
                  <input
                    className="border-0"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                ) : (
                  <SearchIcon onClick={handleSearchClick} />
                )}
              </div>
            </div>
            {product?.map((item) => (
              <>
                <h1 key={item.id} className="mt-4 fw-bold">
                  {item.name || item.hoodietype || item.blacktype}
                </h1>
              </>
            ))}

            <div className="d-flex mt-3 filter-part">
              <FilterListIcon
                className="filter-icon2"
                data-bs-toggle="offcanvas"
                data-bs-target="#AllFilters"
                aria-controls="offcanvasBottom"
              />
              <span>Filters</span>
              <SwapVertIcon
                className="swap-icon2 ms-auto"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
              />
              <span>{filterValue || "Sort By"}</span>
              <Link to={`/catalog2/${productId}`} className="nav-link ms-auto">
                <ViewModuleIcon className="view-icon2" />
              </Link>
            </div>
          </section>

          {/* Product List */}

          <section className="catalog-items">
            {filteredProducts
              ?.filter((item) => item.image)
              ?.map((item) => (
                <Items
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                  type={item.type}
                  brand={item.brand}
                  size={item.size}
                  color={item.color}
                  id={item.id}
                  productId={item.productId}
                  quantity={item.quantity}
                />
              ))}
          </section>
          <Footer />
        </section>
      )}

      {/* Sort By Filter */}

      <div className="container-fluid d-flex justify-content-end fixed-bottom">
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
            <p className="ps-4 py-3 m-0" onClick={handleSortByPopularity}>
              Popular
            </p>

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

            <div className="button-container p-3">
              {sizefilter.map(
                (size, index) =>
                  size && (
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
                        color: selectedSizes.includes(size) ? "white" : "black",
                        borderRadius: "5px",
                      }}
                    >
                      {size}
                    </button>
                  )
              )}
            </div>

            <div className="brands">
              <p className="fw-bold gray-title p-3 nav-link">Brand</p>
              <ul>
                {[
                  ...new Set(product?.slice(1)?.map((item) => item.brand)),
                ]?.map((brand) => (
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
      </div>
    </>
  );
};

export default CatalogPage;
