import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import aboutImage from '../assets/about-image.jpg'; // optional

const About = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const WEB3FORMS_ACCESS_KEY = 'ab8e3778-586a-468f-805d-8ebd5db5480c';

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          email,
          subject: 'New Newsletter Subscription',
          message: 'New user subscribed to newsletter',
          data: { email },
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Subscribed successfully!');
        setEmail('');
      } else {
        toast.error('Subscription failed, please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while subscribing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
            About CivicTracker
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            CivicTracker is an innovative platform designed to empower citizens to report local civic issues efficiently. Our goal is to bridge the communication gap between residents and local authorities, facilitating quicker resolution of community problems such as potholes, broken streetlights, waste management, and more.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Through our user-friendly interface, citizens can submit detailed reports, including location, descriptions, and photographic evidence. These reports are then routed to the relevant municipal departments or designated workers for action. We believe that an informed and engaged citizenry is key to building better, more responsive communities.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            Join us in making our cities cleaner, safer, and more efficient for everyone!
          </p>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img 
            src="https://tse3.mm.bing.net/th/id/OIP.ccsUWCtCFwJsFHwbPjo51AHaDM?pid=Api&P=0&h=180" // replace with your image path
            alt="CivicTracker Overview" 
            className="rounded-xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </div>

      {/* Centered Subscribe Form */}
      <div className="mt-16 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 w-full max-w-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Subscribe to our Newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default About;
