import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api'; // Import the API instance

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Use the imported API instance for consistency
      const { data } = await API.post(
        '/auth/register',
        { name, email, password }
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response ? error.response.data.message : error.message
      );
      alert('Registration failed. The email may already be in use.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Citizen Account
        </h1>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Full Name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors font-semibold"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>
            Already have an account? <Link to="/login" className="text-orange-600 hover:underline">Login here</Link>
          </p>
        </div>
        <p className="mt-2 text-center text-gray-400 text-xs">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default Register;
