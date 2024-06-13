// import React, { useState } from "react";
// import "./Sidebar.css";

// const Sidebar = ({ brands, onFilterChange, genderOptions }) => {
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedType, setSelectedType] = useState("");

//   const handleBrandChange = (brand) => {
//     const newSelectedBrands = selectedBrands.includes(brand)
//       ? selectedBrands.filter((b) => b !== brand)
//       : [...selectedBrands, brand];
//     setSelectedBrands(newSelectedBrands);
//     onFilterChange(newSelectedBrands, selectedGender, selectedType);
//   };

//   const handleGenderChange = (gender) => {
//     setSelectedGender(gender);
//     onFilterChange(selectedBrands, gender, selectedType);
//   };

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     onFilterChange(selectedBrands, selectedGender, type);
//   };

//   return (
//     <div className="sidebar">
//       <div className="filter-section">
//         <h3>Brands</h3>
//         {brands.map((brand) => (
//           <div key={brand}>
//             <input
//               type="checkbox"
//               id={brand}
//               checked={selectedBrands.includes(brand)}
//               onChange={() => handleBrandChange(brand)}
//             />
//             <label htmlFor={brand}>{brand}</label>
//           </div>
//         ))}
//       </div>
//       <div className="filter-section">
//         <h3>Gender</h3>
//         {genderOptions.map((gender) => (
//           <div key={gender}>
//             <input
//               type="radio"
//               id={gender}
//               name="gender"
//               value={gender}
//               checked={selectedGender === gender}
//               onChange={() => handleGenderChange(gender)}
//             />
//             <label htmlFor={gender}>{gender}</label>
//           </div>
//         ))}
//       </div>
//       <div className="filter-section">
//         <h3>Type</h3>
//         <select
//           value={selectedType}
//           onChange={(e) => handleTypeChange(e.target.value)}
//         >
//           <option value="">Select Type</option>
//           <option value="Pant">Pant</option>
//           <option value="Shirt">Shirt</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import "./Sidebar.css";


const Sidebar = ({ brands, onFilterChange, genderOptions }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleBrandChange = (brand) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newSelectedBrands);
    onFilterChange(newSelectedBrands, selectedGender, selectedType);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    onFilterChange(selectedBrands, gender, selectedType);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onFilterChange(selectedBrands, selectedGender, type);
  };

  return (
    <div className="sidebar">
      <div className="filter-section">
        
        <h3 className="text-[#3C0663]">Brands</h3>
        {brands.map((brand) => (
          <div key={brand}>
            <input
              type="checkbox"
              id={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
      </div>
      <div className="filter-section">
        <h3 className="text-[#3C0663]">Gender</h3>
        {genderOptions.map((gender) => (
          <div key={gender}>
            <input
              type="radio"
              id={gender}
              name="gender"
              value={gender}
              checked={selectedGender === gender}
              onChange={() => handleGenderChange(gender)}
            />
            <label htmlFor={gender}>{gender}</label>
          </div>
        ))}
      </div>
      <div className="filter-section">
        <h3 className="text-[#3C0663]">Type</h3>
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Pant">Pant</option>
          <option value="Shirt">Shirt</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
