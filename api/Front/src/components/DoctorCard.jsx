import React, { useEffect, useState } from 'react';
import { IoMdStar } from "react-icons/io";

const DoctorCard = ({ doctor }) => {
  const [promedioReviews, setPromedioReviews] = useState(null);

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

    calculateReview();
  }, [doctor.reviews]);

  return (
    <div>
      <div className="bg-white shadow-md rounded-[21px] overflow-hidden p-6 items-center flex space-x-4">
        <div className='w-[150px] h-[150px] flex items-center'>
          <img src={doctor.image} alt={doctor.name} className="object-cover rounded-[24px] shadow-md" style={{ width: '6rem', height: '6rem' }} />
        </div>
        <div className='flex justify-normal flex-col w-full'>
          <div className='w-full flex justify-between'>
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <div className='flex justify-end'>
              {doctor.reviews.length > 0 ? (
                <div className='bg-[#F1F3F9] flex items-center justify-center h-4'>
                  <span >{promedioReviews}</span>
                  <h1 className="flex"><IoMdStar className="text-[#407BFF] h-10" /></h1>
                </div>
              ) : (
                <p className="text-gray-600">Sin opiniones aún.</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-600">{doctor.city}</p>
            <p className="text-gray-600">Costo de la consulta: {doctor.consultationCost}</p>
            <p className="text-gray-600">Dirección: {doctor.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
