import React from 'react';
import '../styles/InformationComponent.css';

const InformationComponent = ({ label, value }) => {
  return (
    <div className='informationContainer'>
      <p className="informationLabel">{label}</p>
      <p className="informationAnswer">{value}</p>
    </div>
  );
};

export default InformationComponent;
