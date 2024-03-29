import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import "../CategoryPage/CategoryPage.css";
import { Link } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import axios from "axios";
import { TextField } from "@mui/material";

const CategoryPage = () => {
  const [info, setInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products`)
      .then((response) => {
        const data = response.data;
        setInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Toggles the search field visibility
  };

  return (
    <section className="container category-page">
      <section className="top-part">
        <div className="pt-3 d-flex justify-content-between">
          <Link to="/mainpage" className="nav-link">
            <ArrowBackIosNewIcon />
          </Link>
          <h5 className="fw-bold">Categories</h5>
          <div className="search-container d-flex">
            <SearchIcon className="fs-1" onClick={toggleSearch} />
            {isSearchOpen && (
              <input
                className="border-0"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearch}
              />
            )}
          </div>
        </div>
      </section>

      <section className="categoryname-part row">
        <div className="mt-3">
          <button className="summer-sales-btn w-100">
            <span>SUMMER SALES</span>
            <br /> Up to 50% off
          </button>
        </div>

        <div>
          {info
            ?.filter((item) =>
              item?.maintype?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            )
            ?.map((item) => (
              <Link
                to={`/subcategory/${item.parentId}`}
                key={item.id}
                className="nav-link"
              >
                <div className="bg-white d-flex mt-2 categories-name">
                  <div className="col-5 py-2">
                    <div className="d-flex justify-content-center align-items-center h-100 fw-bold">
                      {item.maintype}
                    </div>
                  </div>
                  <div className="col-7">
                    <img
                      src={item.img}
                      className="categories-image"
                      alt="Product Image"
                      style={{ height: "100px", width: "100%" }}
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default CategoryPage;
