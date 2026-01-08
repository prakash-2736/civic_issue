import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaTasks, FaCheckCircle, FaUserShield, FaUserEdit, FaHardHat } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-page-container">

      {/* --- Hero Section --- */}
      <section className="hero-section bg-orange-100 py-32 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Building a Cleaner, Greener India, Together.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Your direct line to report civic issues like potholes, non-functional streetlights, or overflowing bins, and help us build a more responsive and efficient government.
        </p>
        <a 
          href="#portals" 
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Get Started
        </a>
      </section>

      {/* --- Portal Selection Section --- */}
      <section id="portals" className="portals-section py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Choose Your Portal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Admin Portal */}
          <Link to="/admin/login" className="choice-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <FaUserShield className="text-orange-600 text-5xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">Administrator</h2>
            <p className="text-gray-600">Login for municipal staff to manage and assign reports.</p>
          </Link>

          {/* Worker Portal */}
          <Link to="/worker/login" className="choice-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <FaHardHat className="text-orange-600 text-5xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">Field Worker</h2>
            <p className="text-gray-600">Login to view and resolve your assigned civic issues.</p>
          </Link>

          {/* Citizen Portal */}
          <Link to="/login" className="choice-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <FaUserEdit className="text-orange-600 text-5xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">Citizen</h2>
            <p className="text-gray-600">Login or Register here to report and track issues.</p>
          </Link>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="how-it-works-section py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">A Simple Three-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="step-card bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaCamera className="text-orange-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">1. Report the Issue</h3>
            <p className="text-gray-600">Snap a photo, and our AI will categorize it. Your location is automatically tagged for accuracy.</p>
          </div>

          <div className="step-card bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaTasks className="text-orange-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">2. Track its Progress</h3>
            <p className="text-gray-600">Follow your report's journey in real-time, from submission and acknowledgment to final resolution.</p>
          </div>

          <div className="step-card bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaCheckCircle className="text-orange-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">3. See the Resolution</h3>
            <p className="text-gray-600">The relevant department and workers are notified instantly, leading to faster action for everyone.</p>
          </div>
        </div>
      </section>

      {/* --- Mission Statement Section --- */}
      <section className="mission-section py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Commitment</h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed">
          This platform, an initiative under the "Clean & Green Technology" theme by the Department of Higher and Technical Education, Government of Jharkhand, aims to foster greater civic engagement and government accountability. By leveraging technology, we empower every citizen to become an active partner in creating a more sustainable and well-maintained environment.
        </p>
      </section>

    </div>
  );
};

export default HomePage;
