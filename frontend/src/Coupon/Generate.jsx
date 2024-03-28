import React, { useState } from "react";
import Reveal from "./Reveal";

const Generate = ([product]) => {
  const { name, imagePath, price } = product; // Destructure product properties

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
    <div className="flex flex-col items-center justify-center gap-4 w-full min-h-screen bg-[#98CABD]">
      <div className="flex flex-col items-center justify-center bg-[#FFFFFF] text-[#87A922] rounded-md h-72 gap-4">
        {/* <img src="tshirt.png" className="w-80 " />*/}
        <img src={getImageUrl(imagePath)} className="w-[100%] h-auto" />
        <p className="font-extrabold text-2xl text-underline ">{name}</p>
        <p className="text-lg">Price: ${price}</p> {/* Use price from props */}
          
      </div>
      {show ? (
        <>
          {toggle ? (
            <Reveal coupon={coupon} />
          ) : (
            <button
              className="bg-[#E97451] text-black rounded-full p-4 hover:bg-blue-800 hover:text-white hover:font-bold"
              onClick={generateCoupon}
            >
              Get Discount Coupon
            </button>
          )}
        </>
      ) : (
        <>
          <p
            onClick={() => setShow(true)}
            className="text-center text-2xl mt-4 cursor-pointer underline"
          >
            I want to buy this product 😻{" "}
          </p>
        </>
      )}
    </div>
  );
};

export default Generate;
