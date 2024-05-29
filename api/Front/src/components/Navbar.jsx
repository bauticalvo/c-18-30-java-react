import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">TeleMedicina</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <details className="relative inline-block w-40">
            <summary className="list-none text-white hover:text-gray-300 cursor-pointer">Soy Especialista</summary>
            <div className="absolute bg-white shadow-md py-2 px-4 mt-2 left-0 w-full rounded-xl">
              <a href="/ProfesionalRegister" className="text-gray-800 hover:text-gray-600 block">Registrarme</a>
              <a href="/login" className="text-gray-800 hover:text-gray-600 block">Iniciar Sesión</a>
            </div>
          </details>
          <details className="relative inline-block w-40">
            <summary className="list-none text-white hover:text-gray-300 cursor-pointer">Soy Paciente</summary>
            <div className="absolute bg-white shadow-md py-2 px-4 mt-2 left-0 w-full rounded-xl">
              <a href="/UserRegister" className="text-gray-800 hover:text-gray-600 block">Registrarme</a>
              <a href="/login" className="text-gray-800 hover:text-gray-600 block">Iniciar Sesión</a>
            </div>
          </details>
        </div>
        <div className="md:hidden">
          <details className="relative">
            <summary className="list-none text-white hover:text-gray-300 cursor-pointer">Menú</summary>
            <div className="absolute bg-white shadow-md py-2 px-4 mt-2 right-0 w-40 rounded-xl">
              <a href="/ProfesionalRegister" className="text-gray-800 hover:text-gray-600 block">Soy Especialista - Registrarme</a>
              <a href="/login" className="text-gray-800 hover:text-gray-600 block">Iniciar Sesión</a>
              <a href="/UserRegister" className="text-gray-800 hover:text-gray-600 block">Soy Paciente - Registrarme</a>
              <a href="/login" className="text-gray-800 hover:text-gray-600 block">Iniciar Sesión</a>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
