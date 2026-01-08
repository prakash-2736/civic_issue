import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);

  const WEB3FORMS_ACCESS_KEY = 'ab8e3778-586a-468f-805d-8ebd5db5480c';

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !issue) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          message: issue,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Your issue has been submitted!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setIssue('');
      } else {
        toast.error('Failed to submit your issue.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
        <form onSubmit={submitHandler} className="space-y-4">

          {/* First Name */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Issue */}
          <div className="flex items-start border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
            <FaComment className="text-gray-400 mt-2 mr-2" />
            <textarea
              placeholder="Describe your issue..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full outline-none resize-none"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
