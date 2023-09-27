import React from 'react';
import Sidebar from '../components/Sidebar';
import TemplateSpace from '../components/TemplateSpace';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className='homePageBody'>
      <Sidebar/>
      <TemplateSpace/>
    </div>
  );
}

export default HomePage;