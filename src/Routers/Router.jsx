import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Review from "../Components/ReviewPart/Review";
import ProductDetails from "../Components/ProductDetail/ProductDetails";
import Setting from "../Components/ProfilePage/Setting";
import OrderDetail from "../Components/ProfilePage/OrderDetail";
import MyOrder from "../Components/ProfilePage/MyOrder";
import MyProfile from "../Components/ProfilePage/MyProfile";
import FavouriteGrid from "../Components/FavouritePage/FavouriteGrid";
import FavouritePageList from "../Components/FavouritePage/FavouritePageList";
import CatalogPage from "../Components/CatalogPage/CatalogPage";
import CatalogPage2 from "../Components/CatalogPage/CatelogPage2";
import CartPage from "../Components/CartPage/CartPage";
import MainPage from "../Components/MainPage/MainPage";
import CategoryPage from "../Components/CategoryPage/CategoryPage";
import CategoryList from "../Components/CategoryPage/CategoryList";
import Forgotpassword from "../Components/ForgotPage/Forgotpassword";
import Signup from "../Components/SignUpPage/Signup";
import Login from "../Components/LoginPage/Login";
import Protected from "../Components/ProtectedRoute/Protected";
import ShippingAddress from "../Components/CartPage/ShippingAddress";
import Success from "../Components/CartPage/Success";
import Checkout from "../Components/CartPage/Checkout";
import Adress from "../Components/ProfilePage/Adress";

const Router = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const Totalamount = (amount) => {
    setTotalAmount(amount);
  };

  const Selectedadress = (address) => {
    setSelectedAddress(address);
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/mainpage"
            element={<Protected element={<MainPage />} />}
          ></Route>
          <Route
            path="/category"
            element={<Protected element={<CategoryPage />} />}
          ></Route>
          <Route
            path="/subcategory/:parentId"
            element={<Protected element={<CategoryList />} />}
          ></Route>
          <Route
            path="/catalog/:productId"
            element={<Protected element={<CatalogPage />} />}
          ></Route>
          <Route
            path="/catalog2/:productId"
            element={<Protected element={<CatalogPage2 />} />}
          ></Route>
          <Route
            path="/productdetails/:id"
            element={<Protected element={<ProductDetails />} />}
          ></Route>
          <Route
            path="/review/:id"
            element={<Protected element={<Review />} />}
          ></Route>
          <Route
            path="/favourite"
            element={<Protected element={<FavouritePageList />} />}
          ></Route>
          <Route
            path="/favouritegrid"
            element={<Protected element={<FavouriteGrid />} />}
          ></Route>
          <Route
            path="/cart"
            element={
              <Protected element={<CartPage setTotalAmount={Totalamount} />} />
            }
          ></Route>
          <Route
            path="/profile"
            element={<Protected element={<MyProfile />} />}
          ></Route>
          <Route
            path="/adress/:id"
            element={<Protected element={<Adress />} />}
          ></Route>
          <Route
            path="/myorder"
            element={<Protected element={<MyOrder />} />}
          ></Route>
          <Route
            path="/orderdetails/:id"
            element={<Protected element={<OrderDetail />} />}
          ></Route>
          <Route
            path="/settings"
            element={<Protected element={<Setting />} />}
          ></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
          <Route
            path="/checkout"
            element={
              <Protected
                element={
                  <Checkout
                    selectedAddress={selectedAddress}
                    totalAmount={totalAmount}
                  />
                }
              />
            }
          ></Route>

          <Route
            path="/shippingaddress"
            element={
              <Protected
                element={<ShippingAddress onSelectAddress={Selectedadress} />}
              />
            }
          ></Route>
          <Route
            path="/success"
            element={<Protected element={<Success />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
