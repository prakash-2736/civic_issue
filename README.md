# 🏙️ Civic Issue Reporting System

A comprehensive web application for reporting and managing civic issues like potholes, streetlight problems, garbage collection, and other municipal concerns. This platform connects citizens, administrators, and workers to efficiently resolve community issues.

## 🌟 Features

### For Citizens

- 📝 Report civic issues with photos and location
- 🗺️ Interactive map view of reported issues
- 📊 Track issue status in real-time
- 👤 User profile and report history
- 🏆 Leaderboard for active contributors
- 🤖 AI-powered chatbot assistance

### For Administrators

- 🎯 Dashboard for managing all reports
- 👷 Assign issues to workers
- 📈 View analytics and statistics
- ✅ Approve or reject reports
- 🔍 Filter and search functionality

### For Workers

- 📋 View assigned tasks
- 🔄 Update issue status
- 📸 Upload completion photos
- ⏱️ Track work history

## 🛠️ Tech Stack

### Frontend

- **React** - UI library
- **React Router** - Navigation
- **Leaflet** - Interactive maps
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Styling
- **Google Generative AI** - Chatbot functionality

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File uploads
- **Helmet** - Security

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account (for image storage)
- Google Generative AI API key (for chatbot)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd sihfinal2025
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Seed Database (Optional)

```bash
cd backend
npm run seed
```

## 🎯 Running the Application

### Development Mode

**Backend:**

```bash
cd backend
npm run dev
```

Server runs on `http://localhost:5000`

**Frontend:**

```bash
cd frontend
npm start
```

App runs on `http://localhost:3000`

### Production Mode

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
sihfinal2025/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   ├── server.js        # Entry point
│   └── package.json
│
└── frontend/
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # React components
    │   ├── api.js       # API configuration
    │   └── App.js       # Main component
    └── package.json
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/worker/login` - Worker login

### Reports

- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report
- `PUT /api/reports/:id/assign` - Assign worker
- `PUT /api/reports/:id/status` - Update status

### Upload

- `POST /api/upload` - Upload image to Cloudinary

## 👥 Default Users (After Seeding)

### Admin

- Email: `admin@civic.com`
- Password: `admin123`

### Worker

- Email: `worker@civic.com`
- Password: `worker123`

### Citizen

- Email: `user@civic.com`
- Password: `user123`

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Helmet for HTTP headers security
- CORS configuration
- Input validation
- Protected routes

## 🌐 Deployment

The application is configured for deployment on Vercel:

- Backend: See [backend/vercel.json](backend/vercel.json)
- Frontend: See [frontend/vercel.json](frontend/vercel.json)

## 📝 Environment Variables

### Backend Required

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Frontend Required

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_GEMINI_API_KEY` - Google Gemini API key

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for Smart India Hackathon 2025
- Maps powered by Leaflet
- Image storage by Cloudinary
- AI chatbot powered by Google Generative AI

## 📞 Support

For support, email support@civicissue.com or create an issue in the repository.

---

Made with ❤️ for better civic engagement
