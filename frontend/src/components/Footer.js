import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";

const Footer = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    if (userInfo) {
      toast.error("Please logout from current portal");
    } else {
      navigate(path); // navigate to the link
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top smoothly
    }
  };

  return (
    <footer className="bg-black text-white mt-10 w-full">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- Left Section --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CivicTracker</h2>
          <p className="text-gray-200">
            CivicTracker is a platform to report and track civic issues in your city.
            Empowering citizens, workers, and administrators to collaborate for better communities.
          </p>
        </div>

        {/* --- Right Section --- */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLinkClick("/")} className="hover:underline hover:text-orange-300 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/about")} className="hover:underline hover:text-orange-300 transition">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/contact")} className="hover:underline hover:text-orange-300 transition">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/login")} className="hover:underline hover:text-orange-300 transition">
                  Citizen Login
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Portals</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLinkClick("/admin/login")} className="hover:underline hover:text-orange-300 transition">
                  Admin Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/worker/login")} className="hover:underline hover:text-orange-300 transition">
                  Worker Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/login")} className="hover:underline hover:text-orange-300 transition">
                  Citizen Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-300 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Copyright --- */}
      <div className="border-t border-orange-700 mt-6 py-4 text-center text-gray-200 w-full">
        &copy; {new Date().getFullYear()} CivicTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
