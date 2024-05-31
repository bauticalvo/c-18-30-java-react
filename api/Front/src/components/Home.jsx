import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [specialty, setSpecialty] = useState('');
    const [city, setCity] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/doctors.json')
            .then(response => response.json())
            .then(data => {
                const uniqueSpecialties = [...new Set(data.map(doctor => doctor.specialty))];
                const uniqueCities = [...new Set(data.map(doctor => doctor.city))];
                setSpecialties(uniqueSpecialties);
                setCities(uniqueCities);
            })
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleSearch = () => {
        navigate(`/doctors?specialty=${specialty}&city=${city}`);
    };

    

    return (
      <div>
          <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
              <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
                  <img
                      src="/caduceo.png"
                      alt="Doctor"
                      style={{ width: '4rem', height: '4rem' }}
                  />
                  <span className="font-semibold text-xl tracking-tight">Doctor Che</span>
              </Link>
          </nav>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-4">Encuentra el mejor especialista</h1>
                  <div className="flex space-x-4">
                      <select
                          value={specialty}
                          onChange={e => setSpecialty(e.target.value)}
                          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                      >
                          <option value="">Selecciona una especialidad</option>
                          {specialties.map((spec, index) => (
                              <option key={index} value={spec}>{spec}</option>
                          ))}
                      </select>
                      <select
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                      >
                          <option value="">Selecciona una ciudad</option>
                          {cities.map((city, index) => (
                              <option key={index} value={city}>{city}</option>
                          ))}
                      </select>
                      <button
                          onClick={handleSearch}
                          className="border p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                          Search
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Home;
