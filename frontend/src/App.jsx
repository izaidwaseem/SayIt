import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Landing from "./Components/Landing";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Review from "./Reviews/Review";
import Generate from "./Coupon/Generate";
import Explore from "./Explore/Explore";
import Admin from "./AdminPortal/Admin";
import UserManagement from "./AdminPortal/UserManagement";
import ProductManagement from "./AdminPortal/ProductManagement";
import ReviewManagement from "./AdminPortal/ReviewManagement";
import AnalyticsAndReporting from "./AdminPortal/AnalyticsAndReporting";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="generate/:productId" element={<GenerateCoupon />} />
          <Route path="explore" element={<Explore />} />
          <Route path="review/:productId" element={<ProductReview />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/userManagement" element={<UserManagement />} />
          <Route path="admin/productManagement" element={<ProductManagement />} />
          <Route path="admin/reviewManagement" element={<ReviewManagement />} />
          <Route path="admin/analyticsAndReporting" element={<AnalyticsAndReporting />} />
          
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

//fetching the product
const ProductReview = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getProductById/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  return product ? <Review product={product} /> : null;
};

const GenerateCoupon = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getProductById/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  return product ? <Generate product={product} /> : null;
};

export default App;
