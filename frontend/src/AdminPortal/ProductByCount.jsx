import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";

const ProductByCount = ({ width, height }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBrandCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/brand-count");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching brand counts:", error);
      }
    };

    fetchBrandCounts();
  }, []);

  return (
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
      <XAxis dataKey="brand" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default ProductByCount;
