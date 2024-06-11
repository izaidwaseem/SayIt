import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const ProductByCountPie = ({ width, height }) => {
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347", "#8884d8", "#82ca9d"];

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        dataKey="count"
        nameKey="brand"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ProductByCountPie;
