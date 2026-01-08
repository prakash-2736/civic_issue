import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const logoutHandler = () => {
    setIsMobileMenuOpen(false);
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const toggleProfileDropdown = () => setShowProfileDropdown(prev => !prev);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowProfileDropdown(false);
  }, [location]);

  const linkClasses =
    "relative text-black before:content-[''] before:absolute before:left-1/2 before:-bottom-1 before:h-[2px] before:w-0 before:bg-orange-600 before:transition-all before:duration-300 hover:before:w-full hover:before:-translate-x-1/2";

  return (
    <>
      {/* Navbar */}
      <nav className="relative bg-orange-50 text-black shadow-md px-6 py-4 flex items-center justify-between">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 h-full w-[150px] bg-orange-700 z-0 rounded-l-full pointer-events-none"></div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold relative z-10 text-orange-900">
          CivicTracker
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 relative z-10 font-medium">
          <li><Link to="/" className={linkClasses}>Home</Link></li>
          <li><Link to="/about" className={linkClasses}>About</Link></li>
          <li><Link to="/contact" className={linkClasses}>Contact</Link></li>

          {userInfo ? (
            <>
              <li><span className="text-black">Welcome, {userInfo.name}</span></li>
              {(userInfo.role === 'citizen' || userInfo.role === 'admin') && <li><Link to="/Leaderboard" className={linkClasses}>Leaderboard</Link></li>}
              {userInfo.role === 'admin' && <li><Link to="/admin" className={linkClasses}>Admin Dashboard</Link></li>}
              {userInfo.role === 'worker' && <li><Link to="/worker/dashboard" className={linkClasses}>Worker Dashboard</Link></li>}
              {userInfo.role === 'citizen' && <li><Link to="/dashboard" className={linkClasses}>My Reports</Link></li>}

              {/* Profile Dropdown */}
              <li className="relative">
                <FaUserCircle className="cursor-pointer text-2xl" onClick={toggleProfileDropdown} />
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg flex flex-col min-w-[150px] z-20">
                    <Link to="/profile" className="px-4 py-2 hover:bg-gray-200" onClick={() => setShowProfileDropdown(false)}>Profile</Link>
                    <Link to="/" onClick={logoutHandler} className="px-4 py-2 hover:bg-gray-200 text-left">Logout</Link>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li><Link to="/admin/login" className={linkClasses}>Admin Portal</Link></li>
              <li><Link to="/worker/login" className={linkClasses}>Worker Portal</Link></li>
              <li><Link to="/login" className={linkClasses}>Citizen Portal</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden relative z-10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white text-black flex flex-col items-center justify-center gap-6 z-50">
          <button
            className="absolute top-6 right-6 text-black z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes size={28} />
          </button>

          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Contact</Link>

          {userInfo ? (
            <>
              {(userInfo.role === 'citizen' || userInfo.role === 'admin') && <Link to="/Leaderboard" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Leaderboard</Link>}
              {userInfo.role === 'admin' && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Admin Dashboard</Link>}
              {userInfo.role === 'worker' && <Link to="/worker/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Worker Dashboard</Link>}
              {userInfo.role === 'citizen' && <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>My Reports</Link>}
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Profile</Link>
              <Link to="/" onClick={logoutHandler} className={`${linkClasses} text-xl`}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Admin Portal</Link>
              <Link to="/worker/login" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Worker Portal</Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`${linkClasses} text-xl`}>Citizen Portal</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
