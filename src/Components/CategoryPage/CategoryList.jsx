import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import "../CategoryPage/CategoryPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import axios from "axios";
import { mainURL } from "../../config/url";

const CategoryList = () => {
  const [category, setcategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { parentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(mainURL)
      .then((response) => {
        const data = response.data.filter((res) => {
          return res.parentId == parentId;
        });
        setcategory(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const Search = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = category.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container">
      <section className="top-part">
        <div className="pt-3 pb-2 d-flex justify-content-between">
          <ArrowBackIosNewIcon onClick={() => navigate(-1)} />

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
                onChange={Search}
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
