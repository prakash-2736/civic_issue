import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api';
import { FaFileUpload, FaHeading } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CATEGORIES = ['Pothole', 'Streetlight', 'Trash', 'Water Leakage', 'Other'];
const GEMINI_KEYS = (process.env.REACT_APP_GEMINI_API_KEY || "").split(",");
let keyIndex = 0;
const getNextKey = () => { const key = GEMINI_KEYS[keyIndex]; keyIndex = (keyIndex + 1) % GEMINI_KEYS.length; return key; };
const createAIInstance = () => { const key = getNextKey(); console.log("Using Gemini API Key:", key.slice(0, 6) + "..."); return new GoogleGenerativeAI(key); };

const ReportForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

  const analyzePhoto = useCallback(async (file) => {
    if (!file) return;
    setIsAnalyzing(true);
    toast.loading('Analyzing image...', { id: 'ai-toast' });
    try {
      const base64Data = await fileToBase64(file);
      const ai = createAIInstance();
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are an image analysis assistant. Your task is to classify the primary issue visible in the image into exactly ONE of these categories:

- Pothole  
- Streetlight  
- Trash  
- Water Leakage  

If the image does not clearly show any of the above, or if you are uncertain, respond strictly with "Other".

⚠ Rules:
- Respond with ONLY one word, exactly matching the category name.  
- Do not add explanations, extra words, punctuation, or sentences.  
- Examples of valid answers: "Pothole", "Trash", "Streetlight", "Water Leakage", "Other".`;
      const result = await model.generateContent([prompt, { inlineData: { data: base64Data, mimeType: file.type } }]);
      let detectedCategory = (await result.response).text().trim();
      if (!CATEGORIES.includes(detectedCategory)) detectedCategory = 'Other';
      setCategory(detectedCategory);
      toast.success(`AI detected: ${detectedCategory}`, { id: 'ai-toast' });
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast.error('Image analysis failed.', { id: 'ai-toast' });
      setCategory('Other');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) { toast.error('Geolocation is not supported by your browser.'); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation({ type: 'Point', coordinates: [position.coords.longitude, position.coords.latitude] }),
      () => toast.error('Please enable location services to submit a report.'),
      { timeout: 10000 }
    );
  }, []);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setPhoto(data);
      toast.success('Image uploaded successfully!');
      await analyzePhoto(file);
    } catch {
      toast.error('Image upload failed.');
      setFileName(''); setPhoto('');
    } finally { setIsUploading(false); }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!location) { toast.error('Location data not available yet. Please wait.'); return; }
    const toastId = toast.loading('Submitting report...');
    try {
      await API.post('/reports', { title, description, category, location, photo });
      toast.success('Report submitted successfully!', { id: toastId });
      navigate('/dashboard');
    } catch {
      toast.error('Failed to submit report.', { id: toastId });
    }
  };

  const isProcessing = isUploading || isAnalyzing;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-10 mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Report a New Civic Issue</h1>
      <form onSubmit={submitHandler} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
            <FaHeading className="px-3 text-gray-400" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Large pothole on Main Street"
              required
              disabled={isProcessing}
              className="w-full py-2 px-2 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide additional details..."
            required
            disabled={isProcessing}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
            rows={4}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Issue Photo (Optional)</label>
          <label
            htmlFor="image-file"
            className={`flex items-center gap-2 cursor-pointer border border-dashed border-gray-400 rounded-md py-2 px-3 hover:bg-gray-50 transition-colors ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaFileUpload className="text-gray-500" />
            <span>{fileName || 'Select Photo'}</span>
          </label>
          <input
            type="file"
            id="image-file"
            onChange={uploadFileHandler}
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
            disabled={isProcessing}
          />
          {(isUploading || isAnalyzing) && (
            <p className="text-sm text-gray-500 mt-1">{isUploading ? 'Uploading image...' : 'Analyzing image...'}</p>
          )}
        </div>

        {location && (
          <p className="text-center text-green-600 text-sm -mt-2 mb-4">Location captured successfully!</p>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
