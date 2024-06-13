import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [doctor, setDoctor] = useState({})
  const [login, setLogin] =useState(false)

useEffect(() => {

},[])

  return (

    <nav >
      {
        !login && (
          <div className="bg-[#FDFDFD] h-10hv md:px-10 lg:px-20 flex justify-between items-center shadow-md">
            <div className="flex items-center h-[80px]  w-[100px]">
              <Link to='/'>
                <img src="/Logo_SO.png" className='' alt="Logo" />
              </Link>
            </div>
            <div className="flex items-center h-1/2">
              <a href="/profesionalLogin" className="text-[#989595] h-1/2 text-sm md:text-base lg:text-lg mr-4">Soy especialista</a>
              <a href="/login" className="bg-blue-500 text-white h-1/2 px-4 py-2 rounded-[57px] text-sm md:text-base lg:text-lg">Soy paciente</a>
            </div>
          </div>
        )
      }
      {
        
      }

    </nav>
  );
};

export default Navbar;



