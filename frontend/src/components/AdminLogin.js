import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Signing in...');
    try {
      const { data } = await API.post('/auth/login', { email, password });

      if (data.role === 'admin') {
        toast.success('Login successful! Redirecting...', { id: toastId });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/admin');
      } else {
        toast.error('Access Denied: Admins only.', { id: toastId });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials. Please try again.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Portal
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
                placeholder="admin@example.gov"
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
        <p className="mt-4 text-center text-gray-500 text-sm">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
