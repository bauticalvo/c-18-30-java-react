import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile';
import DoctorsList from './components/DoctorSearch/DoctorsList';
import Navbar from './components/Navbar';
import ProfesionalLogin from './components/Login/ProfesionalLogin'
import ProRegister from './components/ProRegister/ProRegister'
import UserRegister from './components/UserRegister/UserRegister'
import DoctorDetail from './components/DoctorSearch/DoctorDetail';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/doctors" element={<DoctorsList />} />
                <Route path='/profesionalRegister' element={<ProRegister/>} />  
                <Route path="/doctor/:id_doctor" element={<DoctorDetail />} /> {/* Envolver DoctorDetail en una función */}
                <Route path='/ProfesionalRegister' element={<ProRegister/>} />  
                <Route path='/UserRegister' element={<UserRegister />} />
                <Route path='/profesionalLogin' element={<ProfesionalLogin />} />
        </Routes>
        </div>
    );
}

export default App;
