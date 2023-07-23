import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import FoodPage from "./Pages/Food/FoodPage";
import Cart from "./Pages/Cart/CartPage";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default AppRoutes;
