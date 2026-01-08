import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import MapView from './MapView';
import ImageModal from './ImageModal';
import { 
  FaUserCheck, 
  FaTags, 
  FaExclamationTriangle, 
  FaClipboardList, 
  FaCalendarAlt
} from 'react-icons/fa';

const WorkerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchWorkerReports = useCallback(async () => {
    try {
      const { data } = await API.get('/reports/worker');
      setReports(data);
    } catch (error) {
      toast.error('Could not fetch your assigned reports.');
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('userInfo');
        navigate('/worker/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    fetchWorkerReports();
  }, [fetchWorkerReports]);

  const handleStatusChange = async (id, status) => {
    const toastId = toast.loading('Updating status...');
    try {
      await API.put(`/reports/${id}`, { status });
      toast.success('Status updated!', { id: toastId });
      fetchWorkerReports();
    } catch {
      toast.error('Failed to update status.', { id: toastId });
    }
  };

  // Map status to Tailwind colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-green-500';
      case 'In Progress': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:px-12 md:px-16 lg:px-24 py-9">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">My Assigned Tasks</h1>
      </div>

      {loading ? (
        <div className="flex justify-center"><Spinner /></div>
      ) : (
        <>
          {reports.length > 0 && <MapView reports={reports} />}

          {reports.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {reports.map((report) => (
                <div key={report._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  {report.photo && (
                    <img 
                      src={report.photo} 
                      alt={report.title} 
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => setSelectedImage(report.photo)}
                    />
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                    
                    <div className="space-y-1 text-gray-600">
                      <p className="flex items-center gap-2">
                        <FaTags className="text-orange-500" /> <span><strong>Category:</strong> {report.category}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaUserCheck className="text-green-500" /> <span><strong>Submitted By:</strong> {report.submittedBy.name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" /> <span><strong>Date:</strong> {new Date(report.createdAt).toLocaleDateString()}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaExclamationTriangle className="text-red-500" /> <span><strong>Status:</strong> 
                          <span className={`ml-1 px-2 py-0.5 rounded-full text-white text-sm ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <label className="block text-gray-700 font-medium mb-1">Update Status:</label>
                    <select 
                      defaultValue={report.status} 
                      onChange={(e) => handleStatusChange(report._id, e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
              <FaClipboardList className="text-6xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Assigned Reports</h3>
              <p>You currently have no tasks assigned to your category.</p>
            </div>
          )}
        </>
      )}

      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

export default WorkerDashboard;
