import React, { useState, useEffect } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
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
import Navbar from "./Components/Navbar";
import EditProduct from './AdminPortal/EditProduct';
import Predict from "./Predict/Predict";
import Pricing from "./Components/Pricing";

const App = () => {
  return (
    <div className="h-[100vh]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="generate/:productId" element={<GenerateCoupon />} />
          <Route path="explore" element={<Explore />} />
          <Route path="review/:productId" element={<ProductReview />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/userManagement" element={<UserManagement />} />
          <Route path="admin/productManagement" element={<ProductManagement />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="admin/reviewManagement" element={<ReviewManagement />} />
          <Route path="admin/analyticsAndReporting" element={<AnalyticsAndReporting />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// Fetching the product for review
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

// Fetching the product for generating coupon
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
