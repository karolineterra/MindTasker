import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import HomePage from './containers/HomePage.js';
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>
      </Routes>
    </Router>  
  );
}

export default App;
