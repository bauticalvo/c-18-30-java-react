import React from 'react';

const SpecialtyModal = ({ doctor, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Más detalles</h2>
                <p className="text-gray-600 mb-2"><strong>Trabajo como:</strong> {doctor.specialty}</p>
                <p className="text-gray-600 mb-2"><strong>Especialista en:</strong></p>
                <ul className="list-disc list-inside">
                    {doctor.specialties.map((specialty, index) => (
                        <li key={index} className="text-gray-600">{specialty}</li>
                    ))}
                </ul>
                <div className="text-right mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecialtyModal;
