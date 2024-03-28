import React, { useState } from 'react';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      const { token } = response.data;
      // Store the token in local storage
      localStorage.setItem('token', token);
      // Redirect to the explore page upon successful login
      window.location.href = '/explore';
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className='flex w-full items-center justify-center min-h-screen bg-[#EEEEEE]'>
      <div className='w-1/3 lg:block hidden'>
        <img src="login.png" alt="logo" className='w-[90%] h-auto' />
      </div>
      <div className='bg-[#FFFFFF] flex flex-col items-center justify-center gap-8 lg:w-1/2 w-full px-6 py-4'>
        <div className='flex flex-col items-center justify-center w-full gap-4 rounded-lg text-[#31363F] bg-opacity-40 p-4'>
          <p className='text-center text-[#87A922] font-bold text-3xl italic mt-4'>SayIt</p>
          <p className='text-xl text-[#87A922] font-semibold italic'>Where Apparel Meets Opinions</p>

          <p className='text-black text-lg font-semibold'>Email</p>
          <input
            className='p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className='text-black text-lg font-semibold'>Password</p>
          <input
            className='p-2 rounded-lg w-[80%] bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className='bg-[#E97451] text-white font-semibold p-2 w-[30%] rounded-full hover:bg-[#114232] hover:text-white relative' // Add relative positioning
            onClick={handleSubmit} // Call handleSubmit function on button click
          >
            Login
            {loading && ( // Conditionally render the loader inside the button
              <ScaleLoader
                color={"#ffffff"}
                loading={loading}
                height={15}
                width={2}
                radius={2}
                margin={2}
              />
            )}
          </button>
          <p>Or</p>
          <p>New on Say it ⁉ </p>
          <button
            onClick={() => (window.location.href = '/signup')}
            className='bg-[#E97451] text-white font-semibold p-2 w-[30%] rounded-full hover:bg-[#114232] hover:text-white mb-2'
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
