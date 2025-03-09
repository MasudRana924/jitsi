import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Shield,
  Clock,
  Heart,
  Mic,
  Menu,
  X,
  Home as HomeIcon,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/api/placeholder/50/50"
            alt="Telemedicine Logo"
            className="h-10 w-10 mr-3 rounded-full"
          />
          <span className="text-xl font-bold text-blue-800">Telemedicine</span>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="/"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <HomeIcon size={20} className="mr-1" /> Home
          </a>
          <a
            href="/services"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <MessageSquare size={20} className="mr-1" /> Services
          </a>
          <a
            href="/support"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <HelpCircle size={20} className="mr-1" /> Support
          </a>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-2">
              <a
                href="/"
                className="flex items-center py-2 text-gray-700 hover:bg-blue-50"
              >
                <HomeIcon size={20} className="mr-2" /> Home
              </a>
              <a
                href="/services"
                className="flex items-center py-2 text-gray-700 hover:bg-blue-50"
              >
                <MessageSquare size={20} className="mr-2" /> Services
              </a>
              <a
                href="/support"
                className="flex items-center py-2 text-gray-700 hover:bg-blue-50"
              >
                <HelpCircle size={20} className="mr-2" /> Support
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleVideoCallClick = () => {
    const roomName = `telemedicine-room-${Math.random()
      .toString(36)
      .substring(7)}`;
    navigate(`/video-call/${roomName}`);
  };

  const handleAudioCallClick = () => {
    const roomName = `telemedicine-audio-${Math.random()
      .toString(36)
      .substring(7)}`;
    navigate(`/audio-call/${roomName}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4 pt-24">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            Welcome to Telemedicine
          </h1>

          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex flex-col items-center">
              <Shield className="text-green-500 mb-2" size={40} />
              <p className="text-sm text-gray-600">Secure</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="text-blue-500 mb-2" size={40} />
              <p className="text-sm text-gray-600">Convenient</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="text-red-500 mb-2" size={40} />
              <p className="text-sm text-gray-600">Professional</p>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleVideoCallClick}
              className="flex-1 flex items-center justify-center py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              <Video className="mr-2" size={24} />
              Video Call
            </button>
            <button
              onClick={handleAudioCallClick}
              className="flex-1 flex items-center justify-center py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
            >
              <Mic className="mr-2" size={24} />
              Audio Call
            </button>
          </div>

          <p className="text-sm text-gray-500 italic">
            Connecting you with healthcare professionals
          </p>
        </div>

        <div className="mt-8 text-center max-w-xl w-full bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Why Choose Telemedicine?
          </h2>
          <ul className="space-y-2 text-left text-gray-600">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Convenient consultations from anywhere
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Reduced waiting times
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              High-quality, secure video consultations
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
