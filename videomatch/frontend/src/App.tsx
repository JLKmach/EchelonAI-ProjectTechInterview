import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import VideoUpload from './pages/VideoUpload';
import Verification from './pages/Verification';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/profile" />} />
      
      {/* Protected routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/video-upload" element={isAuthenticated ? <VideoUpload /> : <Navigate to="/login" />} />
        <Route path="/matches" element={isAuthenticated ? <Matches /> : <Navigate to="/login" />} />
        <Route path="/chat/:matchId?" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/verification" element={isAuthenticated ? <Verification /> : <Navigate to="/login" />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
