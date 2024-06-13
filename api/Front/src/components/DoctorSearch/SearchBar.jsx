import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'  


const SearchBar = () => {
  const [specialty, setSpecialty] = useState('');
  const [officeProvince, setOfficeProvince] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    axios.get(`http://localhost:8080/doctor/`)
      .then(response => {
        const uniqueSpecialties = [...new Set(response.data.map(doctor => doctor.specialty))];
        const uniqueCities = [...new Set(response.data.map(doctor => doctor.officeProvince))];
        setSpecialties(uniqueSpecialties);
        setCities(uniqueCities);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
    

  const handleSearch = () => {
    if( specialty != ""  ){
      navigate(`/doctors?specialty=${specialty}&officeProvince=${officeProvince}`);
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Por favor, seleccione una especialidad',
        background: '#DDFC5C',
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-smaller-popup', 
          timerProgressBar: 'swal2-timer-bar',
        }
      });
    }
  };
  
  return (
    <nav className="flex items-center justify-between flex-wrap  p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6"></div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="flex items-center border p-2 rounded-[40px]">
        <select
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className="p-2 rounded-l-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Especialidad</option>
          {specialties.map((spec, index) => (
            <option key={index} value={spec}>{spec}</option>
          ))}
        </select>
        <select
          value={officeProvince}
          onChange={e => setOfficeProvince(e.target.value)}
          className="p-2 rounded-r-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Ciudad</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="border p-2 bg-green-sec text-black rounded-[50%] hover:bg-[#abc545] focus:outline-none focus:ring-2 focus:ring-[#abc545]"
        >
          <IoSearch />
        </button>
      </div>
    </nav>
  );
};

export default SearchBar;
