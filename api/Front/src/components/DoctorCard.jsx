import React, { useEffect, useState } from 'react';
import { IoMdStar } from "react-icons/io";
import { FaHandshakeSimple } from "react-icons/fa6";
import { consultations } from './Utils/doctorConsultation'; 
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";


const DoctorCard = ({ doctor }) => {
  const [promedioReviews, setPromedioReviews] = useState(null);
  const [doctorConsultations, setDoctorConsultations] = useState([]);

  useEffect(() => {
    const calculateReview = () => {
      const reviews = doctor.reviews;
      if (reviews.length > 0) {
        const suma = reviews.reduce((total, calificacion) => total + calificacion, 0);
        const promedio = suma / reviews.length;
        setPromedioReviews(promedio.toFixed(1)); 
      } else {
        setPromedioReviews(null); 
      }
    };

    const filterConsultations = () => {
      const filteredConsultations = consultations.filter(
        consultation => consultation.fk_id_doctor === doctor.id_doctor
      );
      setDoctorConsultations(filteredConsultations);
    };

    calculateReview();
    filterConsultations();
  }, [doctor.reviews, doctor.id_doctor]);

  return (
    <div className='w-full'>
      <div className="bg-[rgba(255,255,255,1)] font-sans2 shadow-md rounded-[21px] overflow-hidden p-6 items-center flex space-x-4">
        <div className='w-[150px] h-[150px] flex items-center'>
          <img src={doctor.profilePicture} alt={doctor.name} className="object-cover rounded-[24px] shadow-doctor-photo" style={{ width: '6rem', height: '6rem' }} />
        </div>
        <div className='flex justify-normal flex-col w-full'>
          <div className='w-full flex justify-between'>
            <h2 className="text-2xl font-bold">Dr. {doctor.name}{' '}{doctor.lastname}</h2>
            <div className='flex justify-end'>
              {doctor.reviews.length > 0 ? (
                <div className='bg-[#F1F3F9] flex items-center justify-center rounded-[3px] py-3 px-2 space-x-1 h-4'>
                  <span className='text-sm'>{promedioReviews}</span>
                  <h1 className="flex"><IoMdStar className="text-[#407BFF] text-lg h-10" /></h1>
                </div>
              ) : (
                <p className="text-gray-600">Sin opiniones aún.</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-[rgba(102,102,102,1)]">{doctor.specialty}</p>
          </div>
          <div className="mt-4">
            <p className="text-[rgba(147,147,147,1)] flex"><FaMapMarkerAlt className='mr-2 text-[rgba(35,38,47,1)]' />{doctor.officeAddress}, {doctor.officeProvince}</p>
            {doctorConsultations.map((consultation, index) => (
              <div key={index} className="text-[rgba(147,147,147,1)] mt-2">
                <p className="text-[rgba(147,147,147,1)] flex"><FaHandshakeSimple className='mr-2 text-[rgba(35,38,47,1)]' />{consultation.pay_method.join(', ')} </p>
                <div className='flex space-x-4 mt-4 items-center'>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center '>
                  <p className='text-xs'>Precio</p>
                  <p className='text-black text-base'> ${consultation.cost}  </p>
                  </div>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center'>
                  <p  className='text-xs'>Paciente</p>
                  <p className='text-black text-base'> {consultation.speciality.map(spe => spe.slice(0,3)).join(', ')}</p>
                  </div>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center'>
                  <p  className='text-xs'>Modalidad</p>
                  <p className='text-black text-base'> {consultation.mode}</p>
                  </div>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center'>
                  <p  className='text-xs'>Disponibilidad</p>
                  <p className='text-black text-base'> {consultation.since} - {consultation.until}</p>
                  </div>
                  <button type='button' className='bg-green-sec rounded-[6px]  h-[25px] text-black text-2xl p-0 flex items-center justify-center'>
                    <GoArrowRight  />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
