import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dashboardData, setDashboardData] = useState(()=>
  {
    const savedData = sessionStorage.getItem('dashboardData');
    if(savedData){
      return JSON.parse(savedData)
    }
    return null;
  
  });

  //to sync state to the HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if(dashboardData){
      sessionStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }
    else{
      sessionStorage.removeItem('dashboardData');
    }
  }, [isDarkMode, dashboardData]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 font-sans">
      
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main>
        {!dashboardData ? (
          <FileUpload onUploadSuccess={(data) => { 
            console.log("Setting dashboard data:", data); 
            setDashboardData(data)}} />
        ) : (
          <Dashboard data={dashboardData} isDarkMode={isDarkMode}/>
        )}
      </main>

    </div>
  );
}