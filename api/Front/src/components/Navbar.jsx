import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#FDFDFD] h-10hv md:px-10 lg:px-20 flex justify-between items-center shadow-md">
      <div className="flex items-center h-[80px]  w-[100px]">
        <Link to='/'>
          <img src="/saludonline.png" className='' alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center h-1/2">
        <a href="/profesionalLogin" className="text-[#989595] h-1/2 text-sm md:text-base lg:text-lg mr-4">Soy especialista</a>
        <a href="/login" className="bg-blue-500 text-white h-1/2 px-4 py-2 rounded-[57px] text-sm md:text-base lg:text-lg">Soy paciente</a>
      </div>
    </nav>
  );
};

export default Navbar;




/*
<div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to='/'>
            <img src="/logo.saludonline.png" className='h-[80px] p-[20px, 140px, 20px, 140px] gap-[658px]'/>
          </Link>
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
*/