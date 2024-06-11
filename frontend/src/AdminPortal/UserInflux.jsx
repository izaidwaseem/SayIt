import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";

const UserInflux = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserInflux = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user-influx");
        const formattedData = response.data.map(item => ({
          month: new Date(0, item.month - 1).toLocaleString('default', { month: 'short' }),
          UsersVisited: item.count
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching user influx:", error);
      }
    };

    fetchUserInflux();
  }, []);

  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="UsersVisited" fill="#8884d8" />
    </BarChart>
  );
};

export default UserInflux;
