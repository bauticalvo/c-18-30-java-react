import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const specialtyFilter = queryParams.get('specialty') || '';
    const cityFilter = queryParams.get('city') || '';

    useEffect(() => {
        fetch('/doctors.json')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const filteredDoctors = doctors.filter(doctor => {
        return (
            (specialtyFilter === '' || doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())) &&
            (cityFilter === '' || doctor.city.toLowerCase().includes(cityFilter.toLowerCase()))
        );
    });

    return (
        <div className="p-4">
            {(specialtyFilter || cityFilter) && (
                <div className="flex flex-row mb-4">
                    {specialtyFilter && <h1 className="text-lg"><span className="font-bold">{specialtyFilter}, &nbsp;</span></h1>}
                    {cityFilter && <h1 className="text-lg"><span className="font-bold">{cityFilter}</span></h1>}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                        <div className='flex justify-normal'>
                            <div className='pe-3'>
                                <img src={doctor.image} alt={doctor.name} className="w-full h-30 object-cover rounded-full shadow-md" style={{ width: '6rem', height: '6rem' }} />
                            </div>
                            <div>
                                {doctor.destacado && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 
                                                        rounded dark:bg-yellow-900 dark:text-yellow-300">
                                        DESTACADO
                                    </span>
                                )}
                                <Link to={`/doctor/${doctor.id}`}>
                                    <h2 className="text-xl font-semibold">{doctor.name}</h2>
                                </Link>
                                <p className="text-gray-600">{doctor.specialty}</p>
                                <div>
                                    <h3 className="font-semibold">Opiniones</h3>
                                    {doctor.reviews.length > 0 ? (
                                        <ul>
                                            {doctor.reviews.map((review, idx) => (
                                                <li key={idx} className="text-gray-600">{review}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600">Sin opiniones aún.</p>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="p-4">

                            <p className="text-gray-600"> {doctor.city}</p>

                            <p className="text-gray-600">Costo de la consulta: {doctor.consultationCost}</p>
                            <p className="text-gray-600">Dirección: {doctor.address}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
