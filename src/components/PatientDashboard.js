import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyUsers } from '../dummyUsers';

const PatientDashboard = ({ user }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  
  // Get doctors from dummy users
  const doctors = dummyUsers
    .filter(user => user.role === 'doctor')
    .map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      profileImage: doctor.profileImage,
      available: Math.random() > 0.3, // Randomly set availability for demo
      rating: (Math.random() * 2 + 3).toFixed(1) // Random rating between 3.0-5.0
    }));

  const startVideoCall = () => {
    if (selectedDoctor) {
      // Generate a unique room name based on patient and doctor IDs
      const roomName = `telemedicine-${user.id}-${selectedDoctor.id}-${Date.now()}`;
      navigate(`/video-call/${roomName}/${selectedDoctor.id}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Patient Dashboard</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm mb-10 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-4 md:mb-0 md:mr-8">
            <div className="relative">
              <img 
                src={user.profileImage || "/api/placeholder/96/96"} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}</h3>
            <p className="text-gray-600 mt-1 mb-3">We hope you're feeling well today</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="block text-sm text-gray-500">Next Appointment</span>
                <span className="font-semibold">No upcoming appointments</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="block text-sm text-gray-500">Medical Records</span>
                <span className="font-semibold text-blue-600 cursor-pointer">View History</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Available Specialists</h3>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 bg-white text-gray-700 text-sm">
              <option>All Specialties</option>
              <option>Cardiology</option>
              <option>Dermatology</option>
              <option>Family Medicine</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-700 text-sm">
              Filter
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div 
              key={doctor.id}
              onClick={() => doctor.available && setSelectedDoctor(doctor)}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border transition-all ${
                selectedDoctor?.id === doctor.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-transparent hover:shadow-md'
              } ${!doctor.available ? 'opacity-60' : ''}`}
            >
              <div className={`h-2 ${doctor.available ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className="p-5">
                <div className="flex items-start">
                  <img 
                    src={doctor.profileImage || "/api/placeholder/64/64"} 
                    alt={doctor.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100" 
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{doctor.name}</h4>
                    <p className="text-gray-600 font-medium">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="text-yellow-500 mr-1">★</div>
                      <span className="text-gray-700">{doctor.rating}</span>
                      <span className="text-gray-400 text-sm ml-1">(124 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {doctor.available ? 'Available Now' : 'Unavailable'}
                  </span>
                  {doctor.available && selectedDoctor?.id !== doctor.id && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDoctor(doctor);
                      }}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800"
                    >
                      Select
                    </button>
                  )}
                  {selectedDoctor?.id === doctor.id && (
                    <span className="text-blue-600 text-sm font-medium">
                      ✓ Selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedDoctor && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={selectedDoctor.profileImage || "/api/placeholder/48/48"} 
              alt={selectedDoctor.name} 
              className="w-12 h-12 rounded-full mr-4" 
            />
            <div>
              <p className="text-gray-500 text-sm">Selected Doctor</p>
              <p className="font-bold text-lg">{selectedDoctor.name}</p>
              <p className="text-gray-600">{selectedDoctor.specialty}</p>
            </div>
          </div>
          
          <button
            onClick={startVideoCall}
            disabled={!selectedDoctor.available}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              selectedDoctor.available 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
            Start Video Consultation
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3">Recent Activity</h4>
          <div className="text-gray-500 text-sm">
            <p>No recent consultations found</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3">Prescriptions</h4>
          <div className="text-gray-500 text-sm">
            <p>No active prescriptions</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3">Health Tips</h4>
          <div className="text-gray-600 text-sm">
            <p>Remember to stay hydrated and maintain a balanced diet for optimal health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;