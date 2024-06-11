import React, { useState } from "react";
import ProductByCount from "./ProductByCount"; // Correct the import
import ProductByCountPie from "./ProductByCountPie"; // Correct the import
import UserInflux from "./UserInflux";

const AnalyticsAndReporting = () => {
  const [performance, setPerformance] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);

  const togglePerformance = () => {
    setPerformance(!performance);
  };

  const toggleChartType = () => {
    setShowPieChart(!showPieChart);
  };

  const isMobile = window.innerWidth <= 768; // Adjust this value for mobile screens
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Adjust this value for tablet screens

  let width, height;

  if (isMobile) {
    width = 390; // Set mobile width
    height = 300; // Set mobile height
  } else if (isTablet) {
    width = 500; // Set tablet width
    height = 300; // Set tablet height
  } else {
    width = 600; // Set laptop width
    height = 400; // Set laptop height
  }

  return (
    <div className="flex flex-col items-center justify-center h-[68vh] w-full space-y-8">
      {performance ? (
        <UserInflux />
      ) : (
        <>
          {showPieChart ? (
            <ProductByCountPie width={width} height={height} />
          ) : (
            <ProductByCount width={width} height={height} />
          )}
        </>
      )}
      <div className="flex space-x-4">
        <button
          onClick={togglePerformance}
          className="bg-orange-600 text-[#F8F6E3] font-semibold p-3 rounded-full hover:bg-[#114232] hover:text-white"
        >
          {performance ? "Show Products By Brands" : "Show User Influx"}
        </button>
        {!performance && (
          <button
            onClick={toggleChartType}
            className="bg-blue-600 text-[#F8F6E3] font-semibold p-3 rounded-full hover:bg-[#114232] hover:text-white"
          >
            {showPieChart ? "Show Bar Chart For Brands Count " : "Show Pie Chart For Brands Count"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalyticsAndReporting;
