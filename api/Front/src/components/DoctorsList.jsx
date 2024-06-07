import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoctorCard from './DoctorCard';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const specialtyFilter = queryParams.get('specialty') || '';
    const cityFilter = queryParams.get('officeProvince') || '';

    useEffect(() => {
        fetch('/doctors.json')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const filteredDoctors = doctors.filter(doctor => {
        return (
            (specialtyFilter === '' || doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())) &&
            (cityFilter === '' || doctor.officeProvince.toLowerCase().includes(cityFilter.toLowerCase()))
        );
    });

    return (
        <div className="p-4 mx-32 ">
            {(specialtyFilter || cityFilter) && (
                <div className="flex flex-row mb-4">
                    {specialtyFilter && <h1 className="text-lg"><span className="font-bold">{specialtyFilter}, &nbsp;</span></h1>}
                    {cityFilter && <h1 className="text-lg"><span className="font-bold">{cityFilter}</span></h1>}
                </div>
            )}
            <div className='w-full flex space-x-20'>
            <div className="w-1/2 space-y-4">
                {filteredDoctors.map((doctor, index) => (
                    <DoctorCard  doctor={doctor} key={index}   />
                ))}
            </div>
            <div className='w-1/2 bg-slate-600'>
                <p>sdvfasdf</p>
            </div>                
            </div>

        </div>
    );
};

export default DoctorsList;
