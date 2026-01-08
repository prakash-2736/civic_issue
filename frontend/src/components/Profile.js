import React from 'react';

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-800 font-semibold">{userInfo.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800 font-semibold">{userInfo.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Role:</span>
            <span className="text-gray-800 font-semibold">{userInfo.role}</span>
          </div>

          {/* Additional profile details can be added here */}
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors font-semibold"
            onClick={() => localStorage.removeItem('userInfo') || window.location.reload()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
