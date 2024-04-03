import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import "../CategoryPage/CategoryPage.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { mainURL } from "../../config/url";

const CategoryPage = () => {
  const [info, setInfo] = useState([]);
  const [searchitems, setsearchitems] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(mainURL)
      .then((response) => {
        const data = response.data;
        setInfo(data);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setloading(false);
      });
  }, []);

  const Search = (event) => {
    setsearchitems(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <section className="container category-page">
      <section className="top-part">
        <div className="pt-3 d-flex justify-content-between">
          <Link onClick={() => navigate(-1)} className="nav-link">
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
                value={searchitems}
                onChange={Search}
              />
            )}
          </div>
        </div>
      </section>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
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
                  item?.maintype
                    ?.toLowerCase()
                    ?.includes(searchitems?.toLowerCase())
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
        </>
      )}
      <Footer />
    </section>
  );
};

export default CategoryPage;
