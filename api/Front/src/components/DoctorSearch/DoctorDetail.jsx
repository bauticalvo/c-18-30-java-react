import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpecialtyModal from './SpecialtyModal';
import AppointmentForm from './AppointmentForm';

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [appointmentOpen, setAppointmentOpen] = useState(false);

    useEffect(() => {
        const fetchDoctorById = async (id) => {
            try {
                const response = await fetch(`/doctors.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const foundDoctor = data.find(doc => doc.id === parseInt(id));
                if (!foundDoctor) {
                    throw new Error(`No doctor found with ID ${id}`);
                }
                setDoctor(foundDoctor);
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        fetchDoctorById(id);
    }, [id]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenAppointment = () => {
        setAppointmentOpen(true);
    };

    const handleCloseAppointment = () => {
        setAppointmentOpen(false);
    };

    if (!doctor) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="p-4 flex justify-center">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-start">
                    <img src={doctor.image} alt={doctor.name} className="w-32 h-32 object-cover rounded-full shadow-md" />
                </div>
                <h1 className="text-2xl font-bold text-left mt-4">{doctor.name}</h1>
                <p className="text-left text-gray-600 mt-2">
                    {doctor.specialty}
                    <button
                        className="text-blue-500 ml-2"
                        onClick={handleOpenModal}
                    >
                        Ver más
                    </button>
                </p>
                <p className="text-left text-gray-600 mt-2">{doctor.address}</p>
                <p className="text-left text-gray-600 mt-2">Cédula: {doctor.licenseNumber}</p>
                <div className="text-left text-gray-600 mt-2">
                    <span className="text-yellow-500">★★★★★</span> ({doctor.reviews.length} opiniones)
                </div>
                <div className="text-left mt-4">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleOpenAppointment}
                    >
                        Agendar cita
                    </button>
                </div>
                {modalOpen && <SpecialtyModal doctor={doctor} onClose={handleCloseModal} />}
                {appointmentOpen && <AppointmentForm doctor={doctor} onClose={handleCloseAppointment} />}
            </div>
        </div>
    );
};

export default DoctorDetail;
