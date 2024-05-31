import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import DoctorsList from './components/DoctorsList';
import Navbar from './components/Navbar';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<><Navbar /><Login /></>} />
                <Route path="/profile" element={<><Navbar /><Profile /></>} />
                <Route path="/doctors" element={<><Navbar /><DoctorsList /></>} />
            </Routes>
        </div>
    );
}

export default App;
