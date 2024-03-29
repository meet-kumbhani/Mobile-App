import React, { useEffect, useRef, useState } from "react";
import "../ReviewPart/Review.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Rating from "@mui/material/Rating";
import EditIcon from "@mui/icons-material/Edit";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { mainURL } from "../../config/url";
import moment from "moment";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [imgs, setImgs] = useState([]);
  const [product, setProduct] = useState(null);
  const [showWithPhotoOnly, setShowWithPhotoOnly] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    axios
      .get(`${mainURL}/${id}`)
      .then((response) => {
        const filteredReviews = response.data.review.filter(
          (review) => review.reviewid !== 0
        );
        setProduct({ ...response.data, review: filteredReviews });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleFileChange = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const data = new FileReader();
      data.onload = () => {
        const base64Image = data.result;
        setImgs((prevImages) => [...prevImages, data.result]);
      };
      data.readAsDataURL(files[i]);
    }
  };

  const handleReviewSubmit = () => {
    const newReview = {
      reviewid: product.review.length + 1,
      reviewrating: rating,
      reviewimage: imgs,
      reviewdescription: text,
    };

    const updatedProduct = {
      ...product,
      review: [...product.review, newReview],
    };

    axios
      .patch(`${mainURL}/${id}`, updatedProduct)
      .then((response) => {
        setProduct(updatedProduct);
        setRating(0);
        setText("");
        setImgs([]);
      })
      .catch((error) => {
        console.error("Error updating review:", error);
      });
  };

  const decodeBase64Image = (base64Image) => {
    return `${base64Image}`;
  };

  const countRatings = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (product && product.review) {
      product.review.forEach((review) => {
        counts[review.reviewrating]++;
      });
    }
    return counts;
  };
  const ratingsCounts = countRatings();

  const countTotalRatings = () => {
    let total = 0;
    for (let i = 1; i <= 5; i++) {
      total += ratingsCounts[i] * i;
    }
    return total;
  };

  const totalRatings = countTotalRatings();

  const average = totalRatings / 5;

  const time = moment().format("MMM DD, YYYY");

  return (
    <section className="review-part">
      <div className="pt-3 container-fluid">
        <Link to="/productdetails" className="nav-link">
          <ArrowBackIosNewIcon />
        </Link>
      </div>

      <section className="heading">
        <div className="container-fluid">
          <h1>Rating&Reviews</h1>
        </div>
      </section>

      {/* Allover Review */}

      <section className="allover-review">
        <div className="container-fluid d-flex justify-content-between mt-5">
          <div>
            <h1 className="total-rating">{average}</h1>
            <p className="rating-count">{totalRatings} ratings</p>
          </div>

          <div>
            <div className="d-flex justify-content-end align-items-baseline">
              <img src="../../images/5-stars.png" alt="hlo" className="me-1" />
              <div className="progress" style={{ width: "200px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(ratingsCounts[5] / totalRatings) * 100}% `,
                  }}
                  aria-valuenow={(ratingsCounts[5] / totalRatings) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="m-0 text-end ms-4">{ratingsCounts[5]}</p>
            </div>

            <div className="d-flex justify-content-end align-items-baseline">
              <img src="../../images/4-stars.png" alt="hlo" className="me-1" />
              <div className="progress" style={{ width: "200px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(ratingsCounts[4] / totalRatings) * 100}% `,
                  }}
                  aria-valuenow={(ratingsCounts[4] / totalRatings) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="m-0 text-end ms-4">{ratingsCounts[4]}</p>
            </div>

            <div className="d-flex justify-content-end align-items-baseline">
              <img src="../../images/3-stars.png" alt="hlo" className="me-1" />
              <div className="progress" style={{ width: "200px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(ratingsCounts[3] / totalRatings) * 100}% `,
                  }}
                  aria-valuenow={(ratingsCounts[3] / totalRatings) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="m-0 text-end ms-4">{ratingsCounts[3]}</p>
            </div>

            <div className="d-flex justify-content-end align-items-baseline">
              <img src="../../images/2-stars.png" alt="hlo" className="me-1" />
              <div className="progress" style={{ width: "200px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(ratingsCounts[2] / totalRatings) * 100}% `,
                  }}
                  aria-valuenow={(ratingsCounts[2] / totalRatings) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="m-0 text-end ms-4">{ratingsCounts[2]}</p>
            </div>

            <div className="d-flex justify-content-end align-items-baseline">
              <img src="../../images/1star.png" alt="hlo" className="me-1" />
              <div className="progress" style={{ width: "200px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(ratingsCounts[1] / totalRatings) * 100}% `,
                  }}
                  aria-valuenow={(ratingsCounts[1] / totalRatings) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="m-0 text-end ms-4">{ratingsCounts[1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Total Review */}

      <section className="review-count">
        <div className="container-fluid mt-4 d-flex justify-content-between align-items-center">
          <h1>
            {product && product.review ? product.review.length : 0} reviews
          </h1>

          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={() => setShowWithPhotoOnly(!showWithPhotoOnly)}
            />
            <label className="ms-2 form-check-label" htmlFor="exampleCheck1">
              With Photo
            </label>
          </div>
        </div>
      </section>

      {/* All review */}

      <section className="all-review">
        {product &&
          product?.review &&
          product?.review?.map((review) => (
            <div
              key={review.reviewid}
              className="container review-content mt-4"
            >
              <h6 className="pt-2">K.K.K</h6>
              <div className="d-flex justify-content-between">
                <Rating name="read-only" value={review.reviewrating} readOnly />
                <span className="review-date">{time}</span>
              </div>
              <p>{review.reviewdescription}</p>

              <div className="reivewimages">
                {showWithPhotoOnly &&
                  review?.reviewimage?.map((image, index) => (
                    <img
                      key={index}
                      src={decodeBase64Image(image)}
                      alt="Review"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        margin: "5px",
                      }}
                    />
                  ))}
              </div>
            </div>
          ))}
      </section>

      <div className="container-fluid d-flex justify-content-end fixed-bottom">
        <button
          className="border-0 py-2 px-4 review-btn rounded-pill mb-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          <EditIcon /> Write a review
        </button>
      </div>

      {/* Review Form */}

      <div
        className="offcanvas offcanvas-bottom container-fluid"
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
        <div className="offcanvas-body small pb-3 pt-0">
          <div className="text-center">
            <h4>What is you rate?</h4>

            <Rating
              name="simple-controlled"
              className="mt-3"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <h5 className="mt-3">
              Please share your opinion about the product
            </h5>
            <div className="text-area mt-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Your review"
                  className="outline-0"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="camera-icon" onClick={handleLogoClick}>
            <img
              src="../../images/Camera.svg"
              alt=""
              style={{ cursor: "pointer" }}
              height="60px"
              width="60px"
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
            <h6 className="mt-2">Add your photos</h6>
          </div>

          <button
            className="border-0 rounded-pill send-review-btn p-3 w-100 mt-5"
            onClick={handleReviewSubmit}
          >
            SEND REVIEW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
