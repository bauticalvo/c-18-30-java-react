import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoctorCard from './DoctorCard';

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
                    <DoctorCard  doctor={doctor} key={index}   />
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
