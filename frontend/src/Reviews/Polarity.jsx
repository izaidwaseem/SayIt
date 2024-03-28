import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Polarity = () => {
  const data = [
    { name: "Positive Reviews", value: 60, color: "#82ca9d" },
    { name: "Negative Reviews", value: 40, color: "#ff6347" },
  ];

  const COLORS = ["#82ca9d", "#ff6347"];

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="mt-2 text-white bg-[#E97451] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
        onClick={toggleModal}
      >
        See Reviews Polarity
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-50 overflow-y-auto">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Polarity;