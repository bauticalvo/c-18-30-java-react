import React from 'react';
import { useLocation } from 'react-router-dom';

const StepIndicator = ({ step, setStep }) => {

  const location = useLocation()
  return (
    <div className="relative flex justify-center items-center m-6">
      { location.pathname === '/profesionalRegister' ? (
        <>
        <Step number={1} active={step === 1} setStep={setStep} />
        <Step number={2} active={step === 2} setStep={setStep} />
        <Step number={3} active={step === 3} setStep={setStep} />        
        </>

      ):(
        <>
      <Step number={1} active={step === 1} setStep={setStep} />
      <Step number={2} active={step === 2} setStep={setStep} />
        </>
      )}

    </div>
  );
};

const Step = ({ number, active, setStep }) => {

  const isProfessionalRegister = location.pathname === '/profesionalRegister';
  const isUserRegister = location.pathname === '/UserRegister';
  return (
    <div>
    <div className={`relative  border  rounded-[4px] mx-48  w-12 h-12 flex justify-center items-center text-2xl font-bold ${active ? 'bg-green-sec text-black border border-black ' : 'bg-[#CFD2DC] border-[#CFD2DC] text-white'}`}>
      <button onClick={() => setStep(number)} className="w-full h-full flex justify-center items-center focus:outline-none">
        {number}
      </button>

      { number > 1 && isProfessionalRegister &&  <span className={`absolute right-full top-1/2 transform  w-96 h-1 ${active  ? 'bg-green-sec text-black ' : 'bg-[#CFD2DC]'}`}></span>}
      {number < 2 &&isUserRegister && <span className={`absolute left-full top-1/2 transform  -translate-y-1/2 w-96 h-1 ${active ? 'bg-[#CFD2DC]' : 'bg-green-sec text-black'}`}></span>}
    </div>
    <div className='flex justify-around'>
    {number === 1 &&isUserRegister &&   <h1 className={`text-xl font-normal font-sans2 ${active ? 'text-black' : 'text-black-60'} `}>Datos Personales</h1>}
    {number === 2 &&isUserRegister &&   <h1 className={`text-xl font-normal font-sans2 ${active ? 'text-black' : 'text-black-60'} `}>Datos de Salud</h1>}
    
    {number === 1 && isProfessionalRegister &&   <h1 className={`text-xl font-normal font-sans2 ${active ? 'text-black' : 'text-black-60'} `}>Datos Personales</h1>}
    {number === 2 && isProfessionalRegister &&   <h1 className={`text-xl font-normal font-sans2 ${active ? 'text-black' : 'text-black-60'} `}>Datos  Profesionales</h1>}
    {number === 3 && isProfessionalRegister &&   <h1 className={`text-xl font-normal font-sans2 ${active ? 'text-black' : 'text-black-60'} `}>Datos de consultas</h1>}

    </div>
    </div>
  );
};

export default StepIndicator;
