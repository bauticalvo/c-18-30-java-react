import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage, useFormikContext, FieldArray } from 'formik';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const MedicConsultInfo = ({ setFieldValue }) => {
  const { values } = useFormikContext();
  const [days, setDays] = useState({ 
    lunes: { inicio: '', final: '' },
     martes: { inicio: '', final: '' },
     miercoles: { inicio: '', final: '' }, 
     jueves: { inicio: '', final: '' }, 
     viernes: { inicio: '', final: '' } 
    });

  const [active1 , setActive1] = useState(false)
  const [active2 , setActive2] = useState(false)
  const [active3, setActive3 ] = useState(false)
  const [active4, setActive4 ] = useState(false)
  const [active5, setActive5 ] = useState(false)
  const [consult, setConsult] = useState([]);

  const hours =  [ "Seleccione una hora",
    "07:00","08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00","18:00",
    "19:00", "20:00", "21:00","22:00", "23:00"
  ]

  const addConsult = () => {
    if (consult.length < 10) {
      const newConsult = { tipoConsulta: '', costoConsultaVirtual: '', days: [], startHour: '', finishHour: '',
      costoConsultaPresencial: '', consultaDuracion: '', tipoPacientes: [], metodoCobro: [], obraSocial: [],
      numeroCuenta: '', nombreTitular: '', cvuAlias: '', efectivo: [], obraSocial: '', closed: false
       };
      const updatedConsults = [...consult, newConsult];
      setConsult(updatedConsults);
      setFieldValue('consult', updatedConsults);
    }
  };

  const handleConsultChange = (index, field, value) => {
    const updatedConsults = consult.map((cons, i) => (i === index ? { ...cons, [field]: value } : cons));
    setConsult(updatedConsults);
    setFieldValue('consult', updatedConsults);
  };

  const handleConsultRemove = (index) => {
    const updatedConsults = consult.filter((_, i) => i !== index);
    setConsult(updatedConsults);
    setFieldValue('consult', updatedConsults);
  };

  useEffect(()=>{
    if(consult.length === 0){
      addConsult()
      console.log(consult);
    }
  },[consult])
 
    const handleActive = (num) =>{
      switch (num) {
        case 1:
          active1 ? setActive1(false) : setActive1(true)
          break;
        case 2:
          active2 ? setActive2(false) : setActive2(true)
          break;
        case 3:
          active3 ? setActive3(false) : setActive3(true)
          break;
        case 4:
          active4 ? setActive4(false) : setActive4(true)
          break;
        case 5:
          active5 ? setActive5(false) : setActive5(true)
          break;
        default:return
      }
  
    }
  


  return (
    <>
    
       <div className="mb-4 ">
        <div className='w-full flex space-x-4 relative items-start justify-start '>
          {
            !active1 && (
             <button type='button' className='w-1/2 relative items-center justify-center' onClick={() =>handleActive(1)}>
              <label className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'>Tipo de consulta</label>
              <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button >
            )
          }

        {active1 && (
                  <div className='flex w-1/2 flex-col space-y-2 '>
                  <div>
                  <button type='button' className='w-full relative items-center justify-center' onClick={() =>handleActive(1)}>
                    <label className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'>Tipo de consulta</label>
                    <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
                  </button >
                  </div >
                  <div  className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'>
                  <label className="flex items-center">
                    <Field type="radio" name="tipoConsulta" value="virtual"  />
                    <span className="ml-2 text-black">Consulta virtual</span>
                  </label>
                  <label className="flex items-center">
                    <Field type="radio" name="tipoConsulta" value="presencial" />
                    <span className="ml-2 text-black">Consulta presencial</span>
                  </label>
                </div>
                  </div>
        )}
        <div className='w-1/2 flex relative flex-col '>
          {
            !active2 && (
             <button type='button' className='w-full relative items-center justify-center' onClick={() =>handleActive(2)}>
              <label className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'>Costo de consulta</label>
              <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button >
            )
          }
          {active2 && (
              <button type='button' className='w-full relative items-center justify-center' onClick={() =>handleActive(2)}>
                <label className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'>Costo de consulta</label>
                <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
              </button >
          )}
          { active2 && values.tipoConsulta === 'virtual' && (
            <div className="mt-2">
              <Field  className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field' name="costoConsultaVirtual" placeholder="Costo de la consulta virtual" />
              <ErrorMessage className="text-red-500 text-sm" name="costoConsultaVirtual" component="div" />
            </div>
          )}
  
          { active2 && values.tipoConsulta === 'presencial' && (
            <div className="mt-2">
              <Field  className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field' name="costoConsultaPresencial" placeholder="Costo de la consulta presencial" />
              <ErrorMessage className="text-red-500 text-sm" name="costoConsultaPresencial" component="div" />
            </div>
          )}
  
          { active2 && values.tipoConsulta === '' && (
            <div className="mt-2">
              <ErrorMessage className="text-red-500 text-sm" name="tipoConsulta" component="div" />
            </div>
          )  }
        </div>


        </div>


      </div>
      <div className='w-full flex space-x-4 items-start justify-start'>
      <div className="mb-4 w-1/2 space-x-4 flex items-center justify-center flex-col ">
        <Field as="select" className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 " name="consultaDuracion">
          <option value="" className='w-full text-center'>Duración de la consulta</option>
          <option value="30min" className='text-black'>30 minutos</option>
          <option value="1hr"  className='text-black'>1 hora</option>
          <option value="mas1hr"  className='text-black'>Más de 1 hora</option>
        </Field>
          <ErrorMessage className="text-red-500 text-sm" name="consultaDuracion" component="div" />
      </div>

      <div className="mb-4 w-1/2 items-center justify-center  ">
        {
          !active3 && (
            <button  type='button'  onClick={() => handleActive(3)}  className='w-full relative'>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 ">Tipo de pacientes que atiende</label>
              <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
            
          )
        }
        
        {
          active3 && (
            <div className='w-full'>
           <button  type='button'  onClick={() => handleActive(3)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 ">Tipo de pacientes que atiende</label>
              <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
            
            <FieldArray name="tipoPacientes">
              {({ push, remove }) => (
                <div className="flex flex-wrap space-x-4">
                  {['Neonatología', 'Niños', 'Adolescentes', 'Adultos', 'Mayores'].map((tipoPaciente, index) => (
                    <label key={index} className="flex items-center mb-2">
                      <Field type="checkbox" name="tipoPacientes" value={tipoPaciente} />
                      <span className="ml-2">{tipoPaciente}</span>
                    </label>
                  ))}
                </div>
              )}
            </FieldArray>
          </div>

          )
        }
        <ErrorMessage className="text-red-500 text-sm" name="tipoPacientes" component="div" />
      </div>
      </div>


      <div className='mb-4 w-full flex space-x-4 items-start justify-center'>
      <div className='flex justify-between w-1/3'>
        {
          !active4 && (
            <button  type='button'  onClick={() => handleActive(4)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 ">Dias disponibles</label>
              <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
          )}
      {
        active4 && (
          <div className='w-full'>
            <button  type='button'  onClick={() => handleActive(4)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 ">Dias disponibles</label>
              <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
          <FieldArray name="days">
          {({ push, remove }) => (
            <div className="flex flex-wrap space-x-4">
              {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map((day, index) => (
                <label key={index} className="flex items-center mb-2">
                  <Field type="checkbox" name="days" value={day} />
                  <span className="ml-2">{day}</span>
                </label>
              ))}
            </div>
          )}
          </FieldArray>
          </div>
        )}
      </div>
      <div className='flex justify-between w-1/3'>
            <div className='w-full flex space-x-4'>
              <div className="mb-4 w-full space-x-4 flex items-center justify-center flex-col">
                <Field as="select" className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400" name="startHour">
                  {hours.map((opcion) => (
                    <option key={opcion} value={opcion} className={`${opcion != "Seleccione una hora" ? 'text-black'  : 'text-gray-400'}`}>
                      {opcion}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className="text-red-500 text-sm" name="startHour" component="div" />
              </div>
              <div className="mb-4 w-full space-x-4 flex items-center justify-center flex-col">
                <Field as="select" className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400" name="finishHour">
                  {hours.map((opcion) => (
                    <option key={opcion} value={opcion} className={`${opcion != "Seleccione una hora" ? 'text-black'  : 'text-gray-400'}`}>
                      {opcion}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className="text-red-500 text-sm" name="finishHour" component="div" />
              </div>
            </div>

      </div>
        

      <div className="mb-4 w-1/3 flex ">
        {
          !active5 && (
           <button  type='button'  onClick={() => handleActive(5)}  className='w-full relative '>
            <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400">Métodos de cobro</label>
            <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
          </button  >
          )
        }
        {
          active5 && (
            <div  className='w-full relative '>
             <button  type='button'  onClick={() => handleActive(5)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400">Métodos de cobro</label>
              <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
              <div className="mb-2">
                <label>
                  <Field type="checkbox" name="metodoCobro" value="obraSocial" />
                  <span className="ml-2">Obra social</span>
                </label>
                {values.metodoCobro && values.metodoCobro.includes('obraSocial') && (
                  <div>
                    <div className="flex flex-wrap space-x-4">
                      {obrasArray.map((obraSocial, index) => (
                        <label key={index} className="flex items-center mb-2">
                          <Field
                            type="checkbox"
                            name="obraSocial"
                            value={obraSocial}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <span className="ml-2">{obraSocial}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                    <ErrorMessage className="text-red-500 text-sm" name="obraSocial" component="div" />

              </div>
              <div className="mb-2">
                <label>
                  <Field type="checkbox" name="metodoCobro" value="transferencia" />
                  <span className="ml-2">Transferencia</span>
                </label>
                {values.metodoCobro && values.metodoCobro.includes('transferencia') && (
                  <>
                    <Field className="w-full px-3 py-2 border rounded mt-2" name="numeroCuenta" placeholder="Número de cuenta" />
                    <ErrorMessage className="text-red-500 text-sm" name="numeroCuenta" component="div" />
                    <Field className="w-full px-3 py-2 border rounded mt-2" name="nombreTitular" placeholder="Nombre del titular de la cuenta" />
                    <ErrorMessage className="text-red-500 text-sm" name="nombreTitular" component="div" />
                    <Field className="w-full px-3 py-2 border rounded mt-2" name="cvuAlias" placeholder="CVU o alias" />
                    <ErrorMessage className="text-red-500 text-sm" name="cvuAlias" component="div" />
                  </>
                )}
              </div>
              <div>
                <label>
                  <Field type="checkbox" name="metodoCobro" value="efectivo" />
                  <span className="ml-2">Pago en efectivo</span>
                </label>
                {values.metodoCobro && values.metodoCobro.includes('efectivo') && (
                  <div>
                    <div className="flex flex-wrap space-x-4">
                      {['Pago Facil', 'Rapipago'].map((pago, index) => (
                        <label key={index} className="flex items-center mb-2">
                          <Field
                            type="checkbox"
                            name="efectivo"
                            value={pago}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <span className="ml-2">{pago}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                    <ErrorMessage className="text-red-500 text-sm" name="efectivo" component="div" />

              </div>

            </div>
          )
        }

        <ErrorMessage className="text-red-500 text-sm" name="metodoCobro" component="div" />
      </div>

      </div>
      <div className="flex items-center">
        <Field type="checkbox" name="consentimiento" className="mr-2" />
        <label className="text-gray-700">Acepto los términos y condiciones y doy mi consentimiento para el tratamiento virtual y el manejo de mis datos.</label>
        <ErrorMessage name="consentimiento" component="div" className="text-red-600 text-sm" />
      </div>
    </>
  );
};

export default MedicConsultInfo;
export const obrasArray = ['OSDE', 'Sancor Salud', 'Swiss Medical']
