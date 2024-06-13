import React, { useEffect, useState } from 'react';
import { IoMdStar } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor, setDetail }) => {
  const [promedioReviews, setPromedioReviews] = useState(null);



  return (
    <div className='w-full shadow-doctor-list rounded-[21px]' onClick={() => setDetail(doctor)}>
      <div className="bg-[rgba(255,255,255,1)] font-sans2 shadow-md rounded-[21px] overflow-hidden p-6 items-center flex space-x-4">
        <div className='w-[150px] h-[150px] flex items-center'>
          {
            !doctor.profilePicture ? (
              <img src={'/doctor-default.jpg'} alt={doctor.name} className="object-cover rounded-[24px] shadow-doctor-photo" style={{ width: '6rem', height: '6rem' }} />
            ) :(
              <img src={doctor.profilePicture} alt={doctor.name} className="object-cover rounded-[24px] shadow-doctor-photo" style={{ width: '6rem', height: '6rem' }} />
            )
          }
        </div>
        <div className='flex justify-normal flex-col w-full'>
          <div className='w-full flex justify-between'>
            <h2 className="text-2xl font-bold">Dr. {doctor.name}{' '}{doctor.lastname}</h2>
 
          </div>
          <div>
            <p className="text-[rgba(102,102,102,1)]">{doctor.specialty}</p>
          </div>
          <div className="mt-4">
            <p className="text-[rgba(147,147,147,1)] flex"><FaMapMarkerAlt className='mr-2 text-[rgba(35,38,47,1)]' />{doctor.officeAddress}, {doctor.officeProvince}</p>
              <div  className="text-[rgba(147,147,147,1)] mt-2">
                <p className="text-[rgba(147,147,147,1)] flex"><RiMoneyDollarCircleFill className='mr-2 text-[rgba(35,38,47,1)]' /> {doctor.payMethod} </p>
                <div className='flex space-x-4 mt-4 items-center'>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center '>
                  <p className='text-xs'>Precio</p>
                  <p className='text-black text-xs font-medium'> ${doctor.cost}  </p>
                  </div>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center'>
                  <p  className='text-xs'>Paciente</p>
                  <p className='text-black text-xs font-medium'>{doctor.typeOfPatient} </p>
                  </div>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center'>
                  <p  className='text-xs'>Modalidad</p>
                  <p className='text-black text-xs font-medium'> {doctor.mode ? 'Virtual' : "Presencial"}</p>
                  </div>
                  <div className='bg-[#F1F3F9] rounded-[3px]  px-4 flex flex-col items-center'>
                  <p  className='text-xs'>Disponibilidad</p>
                  <p className='text-black text-xs font-medium'> {doctor.since} - {doctor.until}</p>
                  </div>
                  <button type='button' onClick={() => setDetail(doctor)} >
                    <div className='bg-green-sec rounded-[6px]  h-[25px] text-black text-2xl p-0 flex items-center justify-center'>
                      <GoArrowRight  />
                    </div>                  
                  </button >

                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
