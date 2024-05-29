import React from 'react';
import { useLocation } from 'react-router-dom';

const StepIndicator = ({ step, setStep }) => {

  const location = useLocation()
  return (
    <div className="relative flex justify-center items-center m-10">
      { location.pathname === '/ProfesionalRegister' ? (
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
  return (
    <div className={`relative m-5 border rounded-full w-20 h-20 flex justify-center items-center text-2xl font-bold ${active ? 'bg-[#06AACE] border-[#06AACE] text-white' : 'bg-[#CFD2DC] border-[#CFD2DC] text-white'}`}>
      <button onClick={() => setStep(number)} className="w-full h-full flex justify-center items-center focus:outline-none">
        {number}
      </button>
      {number < 3 && location.pathname === '/ProfesionalRegister' &&  <span className={`absolute left-full top-1/2 transform -translate-y-1/2 w-10 h-1 ${active ? 'bg-[#06AACE]' : 'bg-[#CFD2DC]'}`}></span>}
      {number < 2 && location.pathname === '/UserRegister' && <span className={`absolute left-full top-1/2 transform -translate-y-1/2 w-10 h-1 ${active ? 'bg-[#06AACE]' : 'bg-[#CFD2DC]'}`}></span>}
    </div>
  );
};

export default StepIndicator;
