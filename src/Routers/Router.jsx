import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route
            path="/subcategory/:parentId"
            element={<CategoryList />}
          ></Route>
          <Route path="/catalog/:productId" element={<CatalogPage />}></Route>
          <Route path="/catalog2/:productId" element={<CatalogPage2 />}></Route>
          <Route
            path="/productdetails/:id"
            element={<ProductDetails />}
          ></Route>
          <Route path="/review/:id" element={<Review />}></Route>
          <Route path="/favourite" element={<FavouritePageList />}></Route>
          <Route path="/favouritegrid" element={<FavouriteGrid />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<MyProfile />}></Route>
          <Route path="/myorder" element={<MyOrder />}></Route>
          <Route path="/orderdetails/:id" element={<OrderDetail />}></Route>
          <Route path="/settings" element={<Setting />}></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
