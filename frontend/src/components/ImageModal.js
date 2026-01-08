import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full mx-4 sm:mx-6 md:mx-0 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full transition"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt="Report view"
          className="w-full h-auto object-contain max-h-[80vh] bg-gray-100"
        />
      </div>
    </div>
  );
};

export default ImageModal;
