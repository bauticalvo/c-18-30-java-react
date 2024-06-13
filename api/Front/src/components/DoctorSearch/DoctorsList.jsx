import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import SearchBar from './SearchBar';
import DetailList from './DetailList';
import axios from 'axios';


const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [detail, setDetail] = useState();
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const specialtyFilter = queryParams.get('specialty') || '';
    const cityFilter = queryParams.get('officeProvince') || '';
    const stickyRef = useRef(null);
    const [certification, setCertification] = useState(false);


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                let response;
                if (specialtyFilter && !cityFilter) {
                    response = await axios.get(`http://localhost:8080/doctor/specialty?specialty=${specialtyFilter}`);
                } else if (specialtyFilter && cityFilter) {
                    response = await axios.get(`http://localhost:8080/doctor/specialty_and_city?specialty=${specialtyFilter}&city=${cityFilter}`);
                } else {
                    setDoctors([]);
                    return;
                }
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, [specialtyFilter, cityFilter]);

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

    const filteredDoctors = Array.isArray(doctors) ? doctors.filter(doctor => {
        return (
            (specialtyFilter === '' || doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())) &&
            (cityFilter === '' || doctor.officeProvince.toLowerCase().includes(cityFilter.toLowerCase()))
        );
    }) : [];
    
    return (
        <div className={`p-4 ml-36 mr-24 relative `}> 
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
                {certification && (
                    <img 
                    src={'/certificado.png'} 
                    className='absolute h-[500px] w-[800px] z-50 rounded-lg border border-gray-300 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-opacity duration-500' 
                    style={{ top: '50px', left: '50%', transform: 'translateX(-50%)' }} 
                    onClick={() => setCertification(!certification)}
                />
                

                )}
                <div className="w-1/2 space-y-4">
                    {doctors.map((doctor, index) => (
                        <DoctorCard doctor={doctor} key={index} setDetail={setDetail} />
                    ))}
                </div>
                {!detail ? (
                    <div className={`w-1/2 bg-slate-50 ${isSticky ? 'sticky top-0  h-[850px]' : 'h-[650px]'} transition-all duration-300`}>

                    </div>
                ) : (
                    <div 
                        ref={stickyRef} 
                        className={`w-1/2 bg-white ${isSticky ? 'sticky top-0  h-[850px]' : 'h-[650px]'} transition-all duration-300`}>
                        <DetailList detail={detail} key={detail.id_doctor} isSticky={isSticky} 
                        setCertification={setCertification} certification={certification} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsList;


//              
//  