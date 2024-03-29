import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import "../CategoryPage/CategoryPage.css";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import axios from "axios";

const CategoryList = () => {
  const [category, setcategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { parentId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products`)
      .then((response) => {
        const data = response.data.filter((res) => {
          return res.parentId == parentId;
        });
        setcategory(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = category.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container">
      <section className="top-part">
        <div className="pt-3 pb-2 d-flex justify-content-between">
          <Link to="/category" className="nav-link">
            <ArrowBackIosNewIcon />
          </Link>
          <h5 className="fw-bold">Categories</h5>
          <div>
            <SearchIcon
              className="fs-1"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {isSearchOpen && (
              <input
                className="border-0"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            )}
          </div>
        </div>
      </section>

      <section className="row">
        <div className="categorylist">
          <button className="w-100 viewall-btn p-2 rounded-pill border-0 mt-3">
            VIEW ALL ITEMS
          </button>
          <p className="text-secondary mt-2 ms-2 mb-4">Choose category</p>
          <div className="ms-4">
            {filteredCategories?.map((item) => (
              <div key={item.id}>
                <Link to={`/catalog/${item.productId}`} className="nav-link">
                  <p>{item.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default CategoryList;
