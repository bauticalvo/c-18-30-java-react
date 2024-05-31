import React from 'react';
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-md">
      <div className="flex flex-col items-center px-4">
        <label className="text-black">Fecha</label>
        <span className="text-gray-500">¿Cuándo?</span>
      </div>
      <div className="h-8 border-l border-gray-300"></div>
      <div className="flex flex-col items-center px-4">
        <label className="text-black">Especialidad</label>
        <span className="text-gray-500">¿Cuál?</span>
      </div>
      <div className="h-8 border-l border-gray-300"></div>
      <div className="flex flex-col items-center px-4">
        <label className="text-black">Precio</label>
        <span className="text-gray-500">¿Cuánto?</span>
      </div>
      <div className="h-8 border-l border-gray-300"></div>
      <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full ml-4">
      <IoSearch />
      </button>
    </div>
  );
}

export default SearchBar;
