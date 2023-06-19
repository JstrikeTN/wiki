import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/main/Footer';

const MainContent = () => {
  return(
    //Content of the main page
    <div className='app'>
      <Dashboard />
      <Footer />
    </div>
  )
};

export default MainContent;
