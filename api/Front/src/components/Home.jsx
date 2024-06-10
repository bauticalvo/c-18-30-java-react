import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './DoctorSearch/SearchBar';

const Home = () => {
  return (
    <div>
      <div className="flex  space-y-6 items-center justify-center py-10 bg-custom-blue  lg:h-[400px] ">
         <div className="flex flex-col justify-center items-left font-sans  w-[30%] mx-10 h-[40%] p-10  ">
          <h1 className="xxl:text-4xl lg:text-2xl text-black mb-4 w-[80%] p-2 ">
            Busca, encuentra y agenda tu consulta con los mejores especialistas
          </h1>
          <p className=" text-black xxl:text-xl lg:text-xs  mb-4 w-[80%] flex justify-center text-left ">
            Agenda una cita con los especialistas desde la comodidad de tu hogar
          </p>
          <button className="bg-blue-500 xxl:text-xl lg:text-xs text-white w-[25%] px-6 py-2 rounded-[30px] mb-12 justify-center flex">
            Conocenos
          </button>    

        </div>

      <div className="bg-white p-8 my-4 rounded-[53px]  mx-10 shadow-custom-shadow-strong flex flex-col items-center">
            <div className="flex ">
              <SearchBar />
            </div>
            <div className="flex space-x-8  mt-4">
              <div className="flex flex-col items-center bg-custom-gray w-full h-[200px] rounded-[10px] border border-border-gray-custom shadow-custom-shadow px-8 py-4">
                <img src="/virtual-home.png" alt="Virtual" className="w-36 h-36  mt-8" />
                <span className='absolute text-[#666666]  mt-1'>Virtual</span>
              </div>
              <div className="flex flex-col items-center bg-custom-gray w-full  h-[200px] rounded-[10px] border border-border-gray-custom shadow-custom-shadow p-8 py-4">
                <img src="presencial-home.png" alt="Presencial" className="w-36 h-36 mt-8" />
                <span className='absolute text-[#666666] mt-1'>Presencial</span>
              </div>
            </div>
      </div>
      </div>
    </div>
  );
};

export default Home;