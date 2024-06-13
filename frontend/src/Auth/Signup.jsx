import React, { useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";
import ScrollReveal from "../Scroll/Reveal";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator


  const override = css`
    display: block;
    margin: 0 auto;
  `;
  

  const handleSignup = async () => {
    setLoading(true);
    try {
      // Check if password matches confirmPassword
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        setLoading(false); // Reset loading state
        return;
      }

      // Send POST request to create user
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
        confirmPassword,
      });
      // Handle successful signup
      alert("User created successfully");
      // Redirect to login page or do something else
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error, e.g., display error message to user
      alert("Failed to create user");
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };
  
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-[#F0F8FF] ">
      <div className="w-[40%] lg:block hidden">
      <ScrollReveal>
        <img src="hanger.png" alt="logo" className="w-[90%] h-auto" />
      </ScrollReveal>
      </div>
      <div className="md:w-[10%] w-0" ></div>
    
      <div className="flex flex-col items-center justify-center gap-8 lg:w-[40%] w-full px-6 py-4">
        <div className="bg-[#F4E9E8] flex flex-col items-center justify-center w-full gap-4 rounded-lg text-[#31363F] bg-opacity-80 p-4">
        <ScrollReveal>
          <p className="text-center text-[#3C0663] font-bold text-3xl italic mt-4">SayIt</p>
          <p className="text-xl text-[#3C0663] font-semibold italic">Where Apparel Meets Opinions</p>
        </ScrollReveal>

          <p className="text-black text-lg font-semibold">Username</p>
          <input
            className="p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-black text-lg font-semibold">Email</p>
          <input
            className="p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="text-black text-lg font-semibold">Password</p>
          <input
            className="p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-black text-lg font-semibold">Confirm Password</p>
          <input
            className="p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="bg-[#3C0663] text-[#F8F6E3] font-semibold p-2 md:w-[30%] w-[50%] rounded-full hover:bg-[#114232] hover:text-white"
            onClick={handleSignup}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <ScaleLoader color={"#fff"} loading={true} css={override} size={10} />
            ) : (
              "Create Account"
            )}
          </button>
          <p>Or</p>
          <p>Already have an account💨 </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-[#3C0663] text-[#F8F6E3] font-semibold p-2 md:w-[30%] w-[50%] rounded-full hover:bg-[#114232] hover:text-white mb-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
