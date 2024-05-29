import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white via-slate-300 to-slate-500">
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">¡Bienvenidos!</h1>
        <p className="text-gray-600 mb-8 text-base sm:text-lg md:text-xl">
          Por favor, inicie sesión para continuar.
        </p>
        <Link to="/ProfesionalRegister">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 transition duration-300">
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
