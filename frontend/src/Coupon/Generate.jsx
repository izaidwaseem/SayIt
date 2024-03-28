import React, { useState } from "react";
import Reveal from "./Reveal";
import styled from "styled-components";

// Styled component for the message
const StyledMessage = styled.div`
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e53e3e; /* Change color on hover */
  }
`;

const Generate = ({ product }) => {
  const { name, imagePath, price } = product;

  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  const [coupon, setCoupon] = useState("");
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);

  const generateCoupon = () => {
    const randomCoupon = Math.random().toString(36).substr(2, 18).toUpperCase();
    setCoupon(randomCoupon);
    setToggle(true);
  };

  return (
    <div className="p-12 flex flex-col items-center justify-center gap-4 w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 ">
      <div className="p-8 flex flex-col items-center justify-center bg-[#FFFFFF] text-[#87A922] rounded-md gap-4">
        <img src={getImageUrl(imagePath)} className="w-full h-auto rounded-md" alt={name} />
        <p className="font-extrabold text-2xl text-underline ">{name}</p>
        <p className="text-lg">Price: ${price}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {show ? (
          <>
            {toggle ? (
              <Reveal coupon={coupon} />
            ) : (
              <button
                className="bg-[#E97451] text-black rounded-full p-4 hover:bg-teal-800 hover:text-white hover:font-bold"
                onClick={generateCoupon}
              >
                Get Discount Coupon
              </button>
            )}
          </>
        ) : (
          <>
            {/* Using StyledMessage instead of p */}
            <StyledMessage onClick={() => setShow(true)}>
              Click here to get your exclusive offer! 😻
            </StyledMessage>
          </>
        )}
      </div>
    </div>
  );
};

export default Generate;
