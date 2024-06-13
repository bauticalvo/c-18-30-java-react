import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './DoctorSearch/SearchBar';
import { FaFacebookF , FaInstagram , FaXTwitter ,FaYoutube    } from "react-icons/fa6"

const Home = () => {
  return (
    <div className='h-screen'>
      <div className="flex  items-center justify-center py-10 bg-custom-blue  h-[600] ">
         <div className="flex flex-col justify-center items-left font-sans  w-[30%] mx-10 h-[40%] p-10  ">
          <h1 className="xxl:text-4xl lg:text-2xl text-black mb-4 w-[80%] p-2 ">
            Busca, encuentra y agenda tu consulta con los mejores especialistas
          </h1>
          <p className=" text-black xxl:text-xl lg:text-xs  mb-4 w-[80%] flex justify-center text-left ">
            Agenda una cita con los especialistas desde la comodidad de tu hogar
          </p>
          <button className="bg-green-sec xxl:text-xl lg:text-xs text-black w-[25%] px-14 py-2 rounded-[30px] mb-12 justify-center flex">
            Conocenos
          </button>    

        </div>

      <div className="bg-white p-6  rounded-[53px]  mx-10 shadow-custom-shadow-strong flex flex-col items-center">
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
      <div className='flex flex-col items-center justify-center w-full py-14 h-[600]'>
        <p className='font-sans text-3xl m-6 my-10 font-medium'>¿Como se utiliza?</p>
        <div className='flex space-x-72 px-16 mx-20'>
          <div className='w-1/3 flex flex-col items-center justify-center h-full space-y-6'>
            <img src="/home-1.png" alt="" className='w-[226px] h-[226px]' />
            <p className='font-semibold font-sans text-lg text-center'>Encuentra tu especialista</p>
            <p className='text-[#6D6D6D] text-sm text-center'>Encuentra al especialista ideal y mas cercano. Decide cuánto quieres pagar por tu consulta</p>
          </div>
          <div className='w-1/3 flex flex-col items-center justify-center h-full space-y-6'>
            <img src="/home-2.png" alt=""  className='w-[226px] h-[226px]' />
            <p className='font-semibold font-sans text-lg text-center'>Reserva tu consulta online</p>
            <p className='text-[#6D6D6D] text-sm text-center'>Reserva tu consulta a través de la App. Elige la fecha, el horario y la especialidad que buscas </p>
          </div>
          <div className='w-1/3 flex flex-col items-center justify-center h-full space-y-6'>
            <img src="/home-3.png" alt="" className='w-[226px] h-[226px]'/>
            <p className='font-semibold font-sans text-lg text-center'>Opina sobre los Especialistas </p>
            <p className='text-[#6D6D6D] text-sm text-center'>Comenta sobre tu experiencia para que más usuario conozcan la calidad de la atención</p>
          </div>
        </div>

      </div>
      <div className='bg-custom-blue p-8 flex font-sans h-[600] justify-center items-center'>
        <div className='flex-col px-36 py-20 w-1/2 space-y-10 justify-end'>
          <p className='font-medium font-sans text-3xl '>Próximamente disponible en versión Mobile</p>
          <p className='text-[#6D6D6D] font-sans text-base text-start font-light'>Continuamos mejorando y trabajando en la calidad de nuestro producto. Queremos que nuestro usuarios disfruten de la mejor exeperiencia.</p>
        </div>
        <div className='w-1/2 justify-start'>
          <img src="/home-4.png" className='h-[441px] w-[588px]' alt="" />
        </div>
      </div>
      <div className='h-[600px] flex justify-center items-center space-x-20'>
        <div className='w-1/2 flex justify-end mr-10'>
          <img src="/home-5.png" alt="" className='h-[406px] w-[406px] ' />
        </div>
        <div className='font-sans w-1/2 space-y-8'>
          <p className='font-medium text-3xl'>Regístrate como Especialista</p>
          <p className='text-[#666666] w-1/2'>
            Súmate a la comunidad de Especialistas que brindan su servicio a través de{' '}
            <span className="font-semibold text-black">SaludOnline</span>. Regístrate{' '}
            <Link to="/profesionalRegister" className="text-blue-500 underline">
              GRATIS
            </Link>
            , ofrece los servicios que brindas y atiende a tus pacientes de una forma rápida y efectiva.
          </p>
          <Link to='/profesionalRegister'>
            <button className='py-2 px-6 bg-green-sec rounded-[30px] text-black font-sans text-sm mt-8 font-medium'>
              Registrarme Gratis
            </button>
          </Link>
        </div>
      </div>



      <footer className='bg-[#1B1E27] h-[328px] flex p-20 text-white font-inter'>
        <div className='px-20 space-y-8 w-1/3 mx-32 text-white'>
          <img src="/Logo_SO_W.png" alt=""  className='h-[60px] w-[60px] text-white'/>
          <div>
            <p>Copyright © 2020 Landify UI Kit.</p>
            <p>All rights reserved</p>
          </div>  
          <div className='flex space-x-6 '>
            <p className='rounded-[50%] h-[30px] bg-[#32343D] flex items-center justify-center  w-[30px]'>< FaFacebookF  className='h-[20] w-[20px]'  /> </p>
            <p className='rounded-[50%] h-[30px] bg-[#32343D] flex items-center justify-center  w-[30px]'>< FaInstagram  className='h-[20] w-[20px]'  /> </p>
            <p className='rounded-[50%] h-[30px] bg-[#32343D] flex items-center justify-center  w-[30px]'> < FaXTwitter  className='h-[20] w-[20px]'  /></p>
            <p className='rounded-[50%] h-[30px] bg-[#32343D] flex items-center justify-center  w-[30px]'> < FaYoutube    className='h-[20] w-[20px]'  /></p>
          </div>
        </div>
        <div className='flex space-x-32'>
          <div className='flex-col  '>
            <p className='mb-10 text-xl font-semibold '>Salud Online</p>
            <div className='space-y-2 font-normal text-sm'>
            <p>Nosotros</p>
            <p>Blog</p>
            <p>Contáctanos</p>
            <p>Premium</p>
            <p>Reseñas</p>
            </div>
          </div>
          <div className='flex-col  '>
            <p className='mb-10 text-xl font-semibold '>Soporte</p>
            <div className='space-y-2 font-normal text-sm'>
            <p>Atención al cliente</p>
            <p>Términos y condiciones</p>
            <p>Legal</p>
            <p>Privacidad</p>
            <p>Estado</p>
            </div>
          </div>
          <div></div>
        </div>
      </footer>
    </div>
  );
};

export default Home;