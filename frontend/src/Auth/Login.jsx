import React, { useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import ScrollReveal from "../Scroll/Reveal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
        isAdmin,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.href = isAdmin ? "/admin" : "/explore";
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-[#F0F8FF]">
      <div className="w-1/3 lg:block hidden">
        <ScrollReveal>
          <img src="login.png" alt="logo" className="w-[90%] h-auto" />
        </ScrollReveal>
      </div>
      <div className="md:w-[10%] w-0" ></div>
      <div className="bg-[#F4E9E8] border border-[#310055] flex flex-col items-center justify-center gap-8 lg:w-[40%] w-full px-6 py-4">
        <div className="flex flex-col items-center justify-center w-full gap-4 rounded-lg text-[#31363F] bg-opacity-40 p-4">
          <ScrollReveal>
            <p className="text-center text-[#3C0663] font-bold text-3xl italic mt-4">SayIt</p>
            <p className="text-xl text-[#3C0663] font-semibold italic">Where Apparel Meets Opinions</p>
          </ScrollReveal>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-black text-lg font-semibold">Email</p>
          <input
            className="p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <p className="text-black text-lg font-semibold">Password</p>
          <input
            className="p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="flex items-center mb-4">
            <input
              id="admin-checkbox"
              type="checkbox"
              className="mr-2 leading-tight h-6 w-6 text-[#E97451] focus:ring-[#E97451] border-gray-300 rounded"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label htmlFor="admin-checkbox" className="text-black text-lg font-semibold ml-2">
              Login as Admin
            </label>
          </div>
          <button
            className="bg-[#3C0663] text-[#F8F6E3] font-semibold p-2 w-[30%] rounded-full hover:bg-[#114232] hover:text-white relative"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ScaleLoader
                color={"#ffffff"}
                loading={loading}
                height={15}
                width={2}
                radius={2}
                margin={2}
              />
            ) : (
              "Login"
            )}
          </button>
          <p>Or</p>
          <p>New on Say it ⁉ </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-[#3C0663] text-[#F8F6E3] font-semibold p-2 w-[30%] rounded-full hover:bg-[#114232] hover:text-white mb-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
