import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import SearchBar from './SearchBar';
import DetailList from './DetailList';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [detail, setDetail] = useState();
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const specialtyFilter = queryParams.get('specialty') || '';
    const cityFilter = queryParams.get('officeProvince') || '';
    const stickyRef = useRef(null);

    useEffect(() => {
        fetch('/doctors.json')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (stickyRef.current) {
                const stickyElement = stickyRef.current;
                const sticky = stickyElement.getBoundingClientRect().top <= 0;
                setIsSticky(sticky);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const filteredDoctors = doctors.filter(doctor => {
        return (
            (specialtyFilter === '' || doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())) &&
            (cityFilter === '' || doctor.officeProvince.toLowerCase().includes(cityFilter.toLowerCase()))
        );
    });

    return (
        <div className="p-4 ml-36 mr-24">
            <div className="w-full flex items-center justify-center">
                <SearchBar />
            </div>
            {(specialtyFilter || cityFilter) && (
                <div className="flex flex-row mb-4">
                    {specialtyFilter && <h1 className="text-lg"><span className="font-bold font-sans text-3xl">{specialtyFilter}, &nbsp;</span></h1>}
                    {cityFilter && <h1 className="text-lg"><span className="font-bold font-sans text-3xl">{cityFilter}</span></h1>}
                </div>
            )}
            <div className="rounded-[20px]"></div>
            <div className="w-full flex space-x-20">
                <div className="w-1/2 space-y-4">
                    {filteredDoctors.map((doctor, index) => (
                        <DoctorCard doctor={doctor} key={index} setDetail={setDetail} />
                    ))}
                </div>
                {
                    !detail ? (
                        <div className={`w-1/2 bg-slate-50 ${isSticky ? 'sticky top-0  h-[850px]' : 'h-[650px]'} transition-all duration-300`}>

                        </div>
                    ) : (
                        <div 
                            ref={stickyRef} 
                            className={`w-1/2 bg-slate-600 ${isSticky ? 'sticky top-0  h-[850px]' : 'h-[650px]'} transition-all duration-300`}>
                            <DetailList detail={detail} key={detail.id_doctor} isSticky={isSticky} />
                        </div>                        
                    )
                }

            </div>
        </div>
    );
};

export default DoctorsList;
