import React, { useState } from 'react';
import { Menu, X, LogOut, Settings, Layout, User } from 'lucide-react';

const DashboardLayout = ({ children, currentPath = '/', onNavigate = (path) => console.log('Navigate to:', path) }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const username = 'John Doe'; // Replace with actual user data

  const menuItems = [
    { 
      name: 'Whiteboard (YSJ)', 
      icon: Layout,
      path: '/whiteboard-ysj'
    },
    { 
      name: 'Whiteboard (Automerge)', 
      icon: Layout,
      path: '/whiteboard-automerge'
    },
    { 
      name: 'Settings', 
      icon: Settings,
      path: '/settings'
    },
  ];

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar - Fixed */}
      <nav style={{ backgroundColor: '#2B2A52' }} className="fixed top-0 left-0 right-0 text-white shadow-xl z-50">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              <button 
                onClick={() => onNavigate('/')}
                className="ml-4 flex items-center"
              >
                <span className="text-xl font-semibold">KD Lab</span>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{username}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white transition-transform duration-300 ease-in-out z-40 shadow-lg`}
      >
        <div style={{ backgroundColor: '#2B2A52' }} className="h-16 flex items-center justify-between px-4">
          <span className="text-white text-xl font-semibold">Menu</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 text-left ${
                currentPath === item.path ? 'bg-gray-100' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 text-left"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <div style={{ paddingLeft: '4cm', paddingRight: '4cm', paddingTop: '1cm' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
