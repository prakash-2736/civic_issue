import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import MapView from "./MapView";
import { FaTags, FaClock, FaExclamationTriangle, FaClipboardList } from "react-icons/fa";
import ImageModal from "./ImageModal";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const CitizenDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("/reports");
        setReports(data);
      } catch (error) {
        toast.error("Could not fetch your reports.");
        console.error("Failed to fetch reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">My Submitted Reports</h1>
          <Link
            to="/new-report"
            className="bg-orange-600 text-white px-4 py-2 rounded-md shadow hover:bg-orange-700 transition-colors font-semibold"
          >
            Report a New Issue
          </Link>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Map */}
            {reports.length > 0 && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                <MapView reports={reports} />
              </div>
            )}

            {/* Reports Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {report.photo && (
                      <img
                        src={report.photo}
                        alt={report.title}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => setSelectedImage(report.photo)}
                      />
                    )}
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{report.title}</h3>
                      <p className="flex items-center gap-2 text-gray-700 text-sm">
                        <FaTags className="text-orange-500" /> <span className="font-medium">Category:</span> {report.category}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 text-sm">
                        <FaClock className="text-gray-500" /> <span className="font-medium">Submitted:</span>{" "}
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 text-sm">
                        <FaExclamationTriangle className="text-red-500" /> <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-white text-xs font-semibold
                            ${report.status === "Submitted" ? "bg-gray-500" : report.status === "In Progress" ? "bg-yellow-500" : "bg-green-600"}`}
                        >
                          {report.status}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center mt-20 text-gray-500">
                  <FaClipboardList className="text-6xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">No Reports Submitted Yet</h3>
                  <p>Click "Report a New Issue" to get started.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Image Modal */}
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </div>
  );
};

export default CitizenDashboard;
