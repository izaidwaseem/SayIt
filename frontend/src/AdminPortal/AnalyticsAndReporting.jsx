import React from "react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Pie from "./Extras/Pie";

const AnalyticsAndReporting = () => {
  const [performance, setPerformance] = useState(false);

  const data = [
    { name: "Jan", UsersVisited: 370 },
    { name: "Feb", UsersVisited: 300 },
    { name: "Mar", UsersVisited: 200 },
    { name: "Apr", UsersVisited: 278 },
    { name: "May", UsersVisited: 189 },
    { name: "Jun", UsersVisited: 239 },
    { name: "Jul", UsersVisited: 349 },
    { name: "Aug", UsersVisited: 349 },
    { name: "Sep", UsersVisited: 239 },
    { name: "Oct", UsersVisited: 189 },
    { name: "Nov", UsersVisited: 278 },
    { name: "Dec", UsersVisited: 300 },
  ];

  const toggling = () => {
    console.log("toggling");
    setPerformance(!performance);
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
    <div className="flex flex-col items-center justify-center h-[68vh] w-full  space-y-8">
      {performance ? (
        <>
          <Pie />
        </>
      ) : (
        <>
          <BarChart
            width={width}
            height={height}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="UsersVisited" fill="#8884d8" />
          </BarChart>
        </>
      )}
      <button
        onClick={toggling}
        className="bg-orange-600 text-[#F8F6E3] font-semibold p-3  rounded-full hover:bg-[#114232] hover:text-white"
      >
        {performance ? "Show User Influx" : "Show Brands by Products"}
      </button>
    </div>
  );
};

export default AnalyticsAndReporting;
