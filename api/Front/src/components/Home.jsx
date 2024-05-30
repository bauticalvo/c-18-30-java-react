import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Home = () => {
  return (
    <div >
      <main className="flex  items-center justify-center py-20 bg-custom-blue ">
      <div className="flex flex-col justify-center items-left font-sans  w-[30%] p-12  ">
          <h1 className="text-3xl text-black mb-4 w-[80%] p-2 ">
            Busca, encuentra y agenda tu consulta con los mejores especialistas
          </h1>
          <p className=" text-black mb-4 w-[80%] flex justify-center text-left ">
            Agenda una cita con los especialistas desde la comodidad de tu hogar
          </p>
          <button className="bg-blue-500 text-white w-[25%] px-6 py-2 rounded-[30px] mb-12 justify-center flex">
            Conocenos
          </button>    

        </div>

      <div className="bg-white p-12 rounded-[53px] shadow-custom-shadow-strong flex flex-col items-center">
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
      </main>
    </div>
  );
};

export default Home;
