import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';


const SearchBar = () => {
  
  const [specialty, setSpecialty] = useState('');
  const [officeProvince, setOfficeProvince] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetch('/doctors.json')
          .then(response => response.json())
          .then(data => {
              const uniqueSpecialties = [...new Set(data.map(doctor => doctor.specialty))];
              const uniqueCities = [...new Set(data.map(doctor => doctor.officeProvince))];
              setSpecialties(uniqueSpecialties);
              setCities(uniqueCities);
          })
          .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleSearch = () => {
      navigate(`/doctors?specialty=${specialty}&officeProvince=${officeProvince}`);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap  p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">

    </div>
    <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
    </div>
    <div className="flex items-center border p-2 rounded-[40px]">
        <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            className=" p-2 rounded-l-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Selecciona una especialidad</option>
            {specialties.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
            ))}
        </select>
        <select
            value={officeProvince}
            onChange={e => setOfficeProvince(e.target.value)}
            className=" p-2 rounded-r-[40px]  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Selecciona una ciudad</option>
            {cities.map((officeProvince, index) => (
                <option key={index} value={officeProvince}>{officeProvince}</option>
            ))}
        </select>
        <button
            onClick={handleSearch}
            className="border p-2 bg-green-sec text-black rounded-[50%] hover:bg-[#abc545]  focus:outline-none focus:ring-2 focus:ring-[#abc545]"
        >
            <IoSearch/>
        </button>
    </div>
</nav>
  );
}

export default SearchBar;


/*
           <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
       
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={specialty}
                        onChange={e => setSpecialty(e.target.value)}
                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Selecciona una especialidad</option>
                        {specialties.map((spec, index) => (
                            <option key={index} value={spec}>{spec}</option>
                        ))}
                    </select>
                    <select
                        value={officeProvince}
                        onChange={e => setOfficeProvince(e.target.value)}
                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Selecciona una ciudad</option>
                        {cities.map((officeProvince, index) => (
                            <option key={index} value={officeProvince}>{officeProvince}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="border p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Buscar
                    </button>
                </div>
            </nav>
    <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-md">
      <div className="flex flex-col items-center px-4">
        <label className="text-black">Fecha</label>
        <span className="text-gray-500">¿Cuándo?</span>
      </div>
      <div className="h-8 border-l border-gray-300"></div>
      <div className="flex flex-col items-center px-4">
        <label className="text-black">Especialidad</label>
        <span className="text-gray-500">¿Cuál?</span>
      </div>
      <div className="h-8 border-l border-gray-300"></div>
      <div className="flex flex-col items-center px-4">
        <label className="text-black">Precio</label>
        <span className="text-gray-500">¿Cuánto?</span>
      </div>
      <div className="h-8 border-l border-gray-300"></div>
      <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full ml-4">
      <IoSearch />
      </button>
    </div>
*/