import React, { useEffect } from "react";
import "../MainPage/MainPage.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Footer from "../Footerpart/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../../toolkit/slice";
import { Box, CircularProgress, LinearProgress } from "@mui/material";

const MainPage = () => {
  const dispatch = useDispatch();

  const allData = useSelector((state) => state.data.allData);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  return (
    <section className="main-page">
      {/* Top Part */}

      <section className="fashion-sale-part">
        <div className="image-content-part">
          <div className="container-fluid">
            <h1 className="text-white banner-text">
              Fashion
              <br />
              sale
            </h1>

            {allData
              ?.filter((check) => check.check == "Check")
              ?.map((check) => (
                <div className="" key={check.id}>
                  <Link
                    to={`/catalog/${check.productId}`}
                    className="text-decoration-none text-dark"
                  >
                    <button className="rounded-pill w-50 Check-button p-2">
                      {check.check}
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Mix Collections */}

      <section className="all-collection">
        <div className="college-items mt-3">
          <div>
            {allData
              ?.filter((newitem) => newitem.maintype === "New")
              .map((newitem) => (
                <div key={newitem.id}>
                  <Link to={`/subcategory/${newitem.parentId}`}>
                    <img src={newitem.img} alt="" width="100%" />
                  </Link>
                </div>
              ))}
          </div>
          <div className="row">
            <div className="col col-sm-6 d-flex flex-column">
              <div className="container d-flex justify-content-start mt-auto">
                <Link to="/sale" className="summersale">
                  {allData
                    ?.filter((summer) => summer.summertype === "Summer")
                    .map((summer) => (
                      <div key={summer.id} className="">
                        <Link
                          to={`/subcategory/${summer.parentId}`}
                          className="nav-link"
                        >
                          <h1 className="summersale-text">
                            Summer <br />
                            Sale
                          </h1>
                        </Link>
                      </div>
                    ))}
                </Link>
              </div>
              <div className="mt-auto">
                {allData
                  ?.filter((black) => black.blacktype === "Black")
                  .map((black) => (
                    <div key={black.id}>
                      <Link to={`/subcategory/${black.parentId}`}>
                        <img src={black.img} alt="" width="100%" />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col col-sm-6 hoodie-part">
              {allData
                ?.filter((hoodie) => hoodie.hoodietype === "Mens Hoodies")
                .map((hoodie) => (
                  <div key={hoodie.id}>
                    <Link to={`/catalog/${hoodie.productId}`}>
                      <img src={hoodie.img} alt="" width="100%" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sale Collection */}

      <section className="sale-part mt-3">
        {allData
          ?.filter((sale) => sale.id === 612)
          ?.map((sale) => (
            <div className="d-flex justify-content-between align-items-center container-fluid">
              <h1 className="page-title">{sale.salename}</h1>
              <div className="new-rightpart">
                <Link
                  to={`/catalog/${sale.productId}`}
                  className="text-decoration-none text-dark "
                >
                  <p className="sale-viewall m-0 p-0">{sale.viewall}</p>
                </Link>
              </div>
            </div>
          ))}

        <section className="pt-3 product-part d-flex pe-2 ps-2">
          {allData ? (
            allData
              ?.filter((salecollection) => salecollection.productId === 32)
              ?.slice(1)
              ?.map((salecollection) => (
                <Link
                  to={`/productdetails/${salecollection.id}`}
                  className="nav-link d-flex justify-content-between"
                  key={salecollection.id}
                >
                  <div key={salecollection.id}>
                    <div className="pb-4 mx-2">
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={salecollection.image}
                          className="product-image2"
                          height={"160px"}
                          width={"130px"}
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <Rating
                          name="size-small"
                          className="mt-1 mb-1"
                          defaultValue={salecollection.rating}
                          size="small"
                        />
                        <span>{salecollection.brand}</span>
                        <span className="fs-3 fw-bold">
                          {salecollection.type}
                        </span>
                        <div className="d-flex">
                          <div className=" strike">{salecollection.price}₹</div>
                          <div className="mx-2 price">
                            {salecollection.discount}₹
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="success" />
            </Box>
          )}
        </section>
      </section>

      {/* New Collection */}

      <section className="new-collection-part">
        {allData
          ?.filter((newitem) => newitem.id == 611)
          ?.map((newitem) => (
            <div
              className="d-flex justify-content-between align-items-center container-fluid"
              key={newitem.id}
            >
              <h1 className="page-title">{newitem.newname}</h1>
              <div className="new-rightpart">
                <Link
                  to={`/catalog/${newitem.productId}`}
                  className="text-decoration-none text-dark "
                >
                  <p className="sale-viewall m-0 p-0">{newitem.viewall}</p>
                </Link>
              </div>
            </div>
          ))}

        <section className="pt-3 product-part d-flex pe-2 ps-2">
          {allData
            ? allData
                .filter((newcollection) => newcollection.productId === 33)
                .slice(1)
                .map((newcollection) => (
                  <Link
                    to={`/productdetails/${newcollection.id}`}
                    className="nav-link d-flex justify-content-between"
                    key={newcollection.id}
                  >
                    <div key={newcollection.id}>
                      <div className="pb-4 mx-2">
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={newcollection.image}
                            className="product-image2"
                            height={"160px"}
                            width={"130px"}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <Rating
                            name="size-small"
                            className="mt-1 mb-1"
                            defaultValue={newcollection.rating}
                            size="small"
                          />
                          <span>{newcollection.brand}</span>
                          <span className="fs-3 fw-bold">
                            {newcollection.type}
                          </span>
                          <div className="d-flex">
                            <div className="price">{newcollection.price}₹</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
            : ""}
        </section>
      </section>

      <Footer />
    </section>
  );
};

export default MainPage;
