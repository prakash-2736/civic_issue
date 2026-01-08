import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      if (userInfo.role === 'citizen') navigate('/dashboard');
      else if (userInfo.role === 'admin') navigate('/admin');
      else if (userInfo.role === 'worker') navigate('/worker/dashboard');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Signing in...');
    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      if (data.role === 'citizen') {
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Login successful! Redirecting...', { id: toastId });
        navigate('/dashboard');
      } else {
        toast.error('Access Denied. Please use your designated portal.', { id: toastId });
      }

    } catch (error) {
      toast.error('Invalid credentials. Please try again.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Citizen Portal
        </h1>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
              <span className="px-3 text-gray-400"><FaEnvelope /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full py-2 px-2 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
              <span className="px-3 text-gray-400"><FaLock /></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full py-2 px-2 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>
            Don't have an account? <Link to="/register" className="text-orange-600 hover:underline">Register here</Link>
          </p>
        </div>
        <p className="mt-2 text-center text-gray-400 text-xs">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default Login;
