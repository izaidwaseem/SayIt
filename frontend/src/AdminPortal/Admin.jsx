import React, { useState } from "react";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import ReviewManagement from "./ReviewManagement";
import AnalyticsAndReporting from "./AnalyticsAndReporting";

const AdminPortal = () => {
  const [selectedTab, setSelectedTab] = useState("userManagement");

  return (
    <div className="admin-portal min-h-screen bg-[#F0F8FF] ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">Admin Portal</h1>
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center space-x-4 space-y-4 mb-8 font-semibold">
          <button
            className={`bg-[#3C0663] text-[#F8F6E3] w-36 mt-3 md:ml-0 ml-3 h-auto font-semibold p-3  rounded-lg hover:bg-[#114232] hover:text-white tab-btn ${
              selectedTab === "userManagement" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("userManagement")}
          >
            User Management
          </button>
          <button
            className={`bg-[#3C0663] text-[#F8F6E3] w-36 h-auto  font-semibold p-3  rounded-lg hover:bg-[#114232] hover:text-white tab-btn ${
              selectedTab === "productManagement" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("productManagement")}
          >
            Product Management
          </button>
          <button
            className={`bg-[#3C0663] text-[#F8F6E3] w-36 h-auto  font-semibold p-3  rounded-lg hover:bg-[#114232] hover:text-white tab-btn ${
              selectedTab === "reviewManagement" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("reviewManagement")}
          >
            Review Management
          </button>
          <button
            className={`bg-[#3C0663] text-[#F8F6E3] w-36 h-auto  font-semibold p-3  rounded-lg hover:bg-[#114232] hover:text-white tab-btn ${
              selectedTab === "analyticsAndReporting" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("analyticsAndReporting")}
          >
            Analytics and Reporting
          </button>
        </div>
        <div className="tab-content">
          {selectedTab === "userManagement" && <UserManagement />}
          {selectedTab === "productManagement" && <ProductManagement />}
          {selectedTab === "reviewManagement" && <ReviewManagement />}
          {selectedTab === "analyticsAndReporting" && <AnalyticsAndReporting />}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
