import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
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
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/caduceo.png"
                            alt="Doctor"
                            style={{ width: '4rem', height: '4rem' }}
                        />
                        <span className="font-semibold text-xl tracking-tight ml-2">Doctor Che</span>
                    </Link>
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
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Selecciona una ciudad</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
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
        </div>
    );
};

export default Navbar;
