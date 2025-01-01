import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Settings, Layout, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api, { apiClient } from '@/lib/axios';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const DashboardLayout = ({ children, currentPath = '/' }: DashboardLayoutProps) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // axios.getをapiClient.getTopPageDataに変更
        const response = await apiClient.getTopPageData();
        setUsername(response.data.userName);
      } catch (error) {
        console.error('Session error:', error);
        router.push('/');
      }
    };

    fetchUserData();
  }, [router]);


  const menuItems = [
    {
      name: 'Top',
      icon: Layout,
      path: '/top'
    },
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
  const handleLogout = async () => {
    try {
      // axios.postをapiClient.logoutに変更
      await apiClient.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
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
                onClick={() => handleNavigate('/top')}
                className="ml-3 flex items-center"
              >
                <span className="text-3xl font-bold font-montserrat">KD.Lab Site</span>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-2xl">
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
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 text-left ${currentPath === item.path ? 'bg-gray-100' : ''
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
