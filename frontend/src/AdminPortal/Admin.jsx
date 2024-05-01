import React, { useState } from "react";
import UserManagement from "./UserManagement";
// import ProductManagement from "./ProductManagement";
// import ReviewManagement from "./ReviewManagement";
// import AnalyticsAndReporting from "./AnalyticsAndReporting";

const AdminPortal = () => {
  const [selectedTab, setSelectedTab] = useState("userManagement");

  return (
    <div className="admin-portal bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Admin Portal</h1>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <button
            className={`tab-btn ${selectedTab === "userManagement" ? "active" : ""}`}
            onClick={() => setSelectedTab("userManagement")}
          >
            User Management
          </button>
          <button
            className={`tab-btn ${selectedTab === "productManagement" ? "active" : ""}`}
            onClick={() => setSelectedTab("productManagement")}
          >
            Product Management
          </button>
          <button
            className={`tab-btn ${selectedTab === "reviewManagement" ? "active" : ""}`}
            onClick={() => setSelectedTab("reviewManagement")}
          >
            Review Management
          </button>
          <button
            className={`tab-btn ${selectedTab === "analyticsAndReporting" ? "active" : ""}`}
            onClick={() => setSelectedTab("analyticsAndReporting")}
          >
            Analytics and Reporting
          </button>
        </div>
        <div className="tab-content">
          {selectedTab === "userManagement" && <UserManagement />}
          {/* {selectedTab === "productManagement" && <ProductManagement />}
          {selectedTab === "reviewManagement" && <ReviewManagement />}
          {selectedTab === "analyticsAndReporting" && <AnalyticsAndReporting />} */}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
