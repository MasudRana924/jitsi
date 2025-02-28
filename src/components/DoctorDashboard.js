import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyUsers } from '../dummyUsers';

const DoctorDashboard = ({ user }) => {
  const [pendingCalls, setPendingCalls] = useState([]);
  const [status, setStatus] = useState('available');
  const navigate = useNavigate();
  const patients = dummyUsers.filter(user => user.role === 'patient');
  
  useEffect(() => {
    // Mock incoming calls for demonstration
    const mockIncomingCalls = () => {
      if (status === 'available') {
        // Simulate random incoming calls
        const random = Math.random();
        if (random > 0.7 && pendingCalls.length < 3) {
          const randomPatient = patients[Math.floor(Math.random() * patients.length)];
          
          const newCall = {
            id: Date.now(),
            patientName: randomPatient.name,
            patientId: randomPatient.id,
            patientImage: randomPatient.profileImage,
            timestamp: new Date().toLocaleTimeString(),
            roomName: `telemedicine-${randomPatient.id}-${user.id}-${Date.now()}`
          };
          
          setPendingCalls(prev => [...prev, newCall]);
        }
      }
    };

    const interval = setInterval(mockIncomingCalls, 10000); // Check every 10 seconds
    
    // Add an initial call for demo purposes
    if (pendingCalls.length === 0) {
      setTimeout(() => {
        const randomPatient = patients[Math.floor(Math.random() * patients.length)];
        
        const newCall = {
          id: Date.now(),
          patientName: randomPatient.name,
          patientId: randomPatient.id,
          patientImage: randomPatient.profileImage,
          timestamp: new Date().toLocaleTimeString(),
          roomName: `telemedicine-${randomPatient.id}-${user.id}-${Date.now()}`
        };
        
        setPendingCalls([newCall]);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [status, pendingCalls.length, user.id, patients]);

  const acceptCall = (call) => {
    // Remove from pending calls
    setPendingCalls(prev => prev.filter(c => c.id !== call.id));
    
    // Navigate to video call
    navigate(`/video-call/${call.roomName}/${call.patientId}`);
  };

  const rejectCall = (callId) => {
    // Remove from pending calls
    setPendingCalls(prev => prev.filter(c => c.id !== callId));
  };

  // Get stats for doctor dashboard
  const stats = {
    todayAppointments: patients.slice(0, 3).length,
    pendingConsultations: pendingCalls.length,
    completedToday: Math.floor(Math.random() * 6),
    totalPatients: Math.floor(Math.random() * 20) + 80
  };

  // Status options with icons and colors
  const statusOptions = [
    { value: 'available', label: 'Available for Consultations', color: 'bg-green-500' },
    { value: 'busy', label: 'Busy', color: 'bg-red-500' },
    { value: 'away', label: 'Away', color: 'bg-yellow-500' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h2>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="relative">
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${
              statusOptions.find(opt => opt.value === status).color
            } rounded-full border-2 border-white`}></div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-sm mb-10 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="relative">
              <img 
                src={user.profileImage || "/api/placeholder/96/96"} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                statusOptions.find(opt => opt.value === status).color
              } rounded-full border-2 border-white`}></div>
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{user.name}, MD</h3>
            <p className="text-blue-600 font-medium">{user.specialty}</p>
            <p className="text-gray-500 mt-1">Medical License: #MD12345678</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Appointments Today</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.todayAppointments}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Pending Calls</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pendingConsultations}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedToday}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalPatients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="border-b border-gray-100 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Pending Video Consultations</h3>
                {pendingCalls.length > 0 && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    {pendingCalls.length} Waiting
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {pendingCalls.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">No pending consultations</p>
                  <p className="text-gray-500 text-sm mt-1">When patients request a video call, they'll appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingCalls.map(call => (
                    <div key={call.id} className="bg-white border border-gray-100 rounded-lg shadow-sm p-5 transform transition-all hover:-translate-y-1 hover:shadow-md">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="relative">
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            <img 
                              src={call.patientImage || "/api/placeholder/48/48"} 
                              alt={call.patientName} 
                              className="w-12 h-12 rounded-full object-cover" 
                            />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-semibold text-gray-800">{call.patientName}</h4>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <p className="text-gray-500 text-sm">Requested at {call.timestamp}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => acceptCall(call)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Accept
                          </button>
                          <button 
                            onClick={() => rejectCall(call.id)}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="border-b border-gray-100 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Today's Schedule</h3>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {patients.slice(0, 3).length} Appointments
                </span>
              </div>
            </div>
            
            <div className="p-4">
              {patients.slice(0, 3).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No appointments scheduled for today</p>
              ) : (
                <div className="space-y-4">
                  {patients.slice(0, 3).map((patient, index) => {
                    const startTime = new Date(Date.now() + (index + 1) * 3600000);
                    const endTime = new Date(startTime.getTime() + 1800000);
                    const isPast = startTime < new Date();
                    const isCurrent = startTime <= new Date() && endTime >= new Date();
                    
                    return (
                      <div 
                        key={patient.id} 
                        className={`p-4 border rounded-lg ${
                          isCurrent 
                            ? 'border-green-300 bg-green-50'
                            : isPast
                              ? 'border-gray-200 bg-gray-50 opacity-60'
                              : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <img 
                            src={patient.profileImage || "/api/placeholder/48/48"} 
                            alt={patient.name} 
                            className="w-12 h-12 rounded-full object-cover mr-4" 
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                                <p className="text-gray-500 text-sm">
                                  {isCurrent ? (
                                    <span className="text-green-600 font-medium">In Progress</span>
                                  ) : isPast ? (
                                    <span className="text-gray-500">Completed</span>
                                  ) : (
                                    <span className="text-blue-600">Upcoming</span>
                                  )}
                                </p>
                              </div>
                              <div className="bg-white px-2 py-1 rounded-md shadow-sm text-sm">
                                {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                {' - '}
                                {endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <button className="w-full p-3 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Schedule Appointment
              </button>
              
              <button className="w-full p-3 flex items-center justify-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Patient Records
              </button>
              
              <button className="w-full p-3 flex items-center justify-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;