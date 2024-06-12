import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage, useFormikContext, FieldArray } from 'formik';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";

const MedicConsultInfo = ({ setFieldValue }) => {
  const { values } = useFormikContext();
  const [active1 , setActive1] = useState(false)
  const [active2 , setActive2] = useState(false)
  const [active3, setActive3 ] = useState(false)
  const [active4, setActive4 ] = useState(false)
  const [active5, setActive5 ] = useState(false)
  const [consults, setConsult] = useState([]);
  const [openedNewConsult, setOpenedNewConsult] = useState(false);
  const hours =  [ "Seleccione una hora",
    "07:00","08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00","18:00",
    "19:00", "20:00", "21:00","22:00", "23:00"
  ]

  const addConsult = () => {
    if (consults.length < 10) {
      const newConsult = { tipoConsulta: '', costoConsultaVirtual: '', days: [], startHour: '', finishHour: '',
      costoConsultaPresencial: '', consultaDuracion: '', tipoPacientes: [], metodoCobro: [], obraSocial: [],
      numeroCuenta: '', nombreTitular: '', cvuAlias: '', efectivo: [], obraSocial: '', closed: false
       };
      const updatedConsults = [...consults, newConsult];
      setConsult(updatedConsults);
      setFieldValue('consults', updatedConsults);
      setOpenedNewConsult(true)
    }
  };



  const handleConsultChange = (index, field, value) => {
    const updatedConsults = consults.map((cons, i) => {
      if (i === index) {
        if (Array.isArray(cons[field])) {
          // Si el campo es un arreglo, agregar o quitar el valor según corresponda
          const newValue = cons[field].includes(value)
            ? cons[field].filter(item => item !== value)
            : [...cons[field], value];
          return { ...cons, [field]: newValue };
        } else {
          // Si no es un arreglo, actualizar el campo normalmente
          return { ...cons, [field]: value };
        }
      }
      return cons;
    });
  
    setConsult(updatedConsults);
    setFieldValue('consults', updatedConsults);
  };
  
  
  const handleConsultRemove = (index) => {
    const updatedConsults = consults.filter((_, i) => i !== index);
    setConsult(updatedConsults);
    setFieldValue('consults', updatedConsults);
    if(openedNewConsult) setOpenedNewConsult(!openedNewConsult)
  };

  const handleConsultClose = (index) => {
    const updatedConsults = consults.map((cons, i) => (i === index ? { ...cons, closed: true } : cons));
    setConsult(updatedConsults);
    setFieldValue('consults', updatedConsults);
    setActive1(false)
    setActive2(false)
    setActive3(false)
    setActive4(false)
    setActive5(false)
    // Resetear los campos del formulario
    const newConsult = { tipoConsulta: '', costoConsultaVirtual: '', days: [], startHour: '', finishHour: '', costoConsultaPresencial: '', consultaDuracion: '',
     tipoPacientes: [], metodoCobro: [], obraSocial: '', numeroCuenta: '', nombreTitular: '', cvuAlias: '', efectivo: [] };
    setFieldValue(`consult[${index}]`, newConsult);
    setOpenedNewConsult(false)

  };
  
  const handleEdit = (index) =>{
    
  }
 
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
  

    console.log(values);

  return (
    <div>
      {
        !openedNewConsult && (
          <div  className='w-full p-2 mb-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-black' onClick={addConsult}>
              <label>
                Añadir Consulta  </label>
                <FiPlusCircle/>
          </div>
        )
      }
        {
          consults.map((consult, index) => !consult.closed && (
            <div  key={index}>
      {/*primera linea */}
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
                    <Field type="radio" name={`consult[${index}].tipoConsulta`} value="virtual" onClick={(e) => handleConsultChange(index, 'tipoConsulta', e.target.value)}  />
                    <span className="ml-2 text-black">Consulta virtual</span>
                  </label>
                  <label className="flex items-center">
                    <Field type="radio" name={`consult[${index}].tipoConsulta`} value="presencial" onClick={(e) => handleConsultChange(index, 'tipoConsulta', e.target.value)} />
                    <span className="ml-2 text-black">Consulta presencial</span>
                  </label>
                </div>
              <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].tipoConsulta`} component="div" />

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
          { active2 && consult.tipoConsulta === 'virtual' && (
            <div className="mt-2">
              <Field  className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field'
               name={`consult[${index}].costoConsultaVirtual`} value={consult.costoConsultaVirtual} onChange={(e) => handleConsultChange(index, 'costoConsultaVirtual', e.target.value)} placeholder="Costo de la consulta virtual" />
              <ErrorMessage className="text-red-500 text-sm" name={`consult[${index}].costoConsultaVirtual`} component="div" />
            </div>
          )}
  
          { active2 && consult.tipoConsulta === 'presencial' && (
            <div className="mt-2">
              <Field  className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field'
                name={`consult[${index}].costoConsultaPresencial`} value={consult.costoConsultaPresencial} onChange={(e) => handleConsultChange(index, 'costoConsultaPresencial', e.target.value)}  placeholder="Costo de la consulta presencial" />
              <ErrorMessage className="text-red-500 text-sm" name={`consult[${index}].costoConsultaPresencial`} component="div" />
            </div>
          )}
  
          { active2 && consult.tipoConsulta === '' && (
            <div className="mt-2">
              <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].tipoConsulta`} component="div" />
            </div>
          )  }
        </div>
        </div>
      </div>
      {/*segunda linea */}
      <div className='w-full flex space-x-4 items-start justify-start'>
      <div className="mb-4 w-1/2 space-x-4 flex items-center justify-center flex-col ">
        <Field as="select" className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 "
        name={`consult[${index}].consultaDuracion`} value={consult.consultaDuracion} onChange={(e) => handleConsultChange(index, 'consultaDuracion', e.target.value)}  >
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
            <div className='w-full space-y-2'>
           <button  type='button'  onClick={() => handleActive(3)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 ">Tipo de pacientes que atiende</label>
              <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
            
            <FieldArray name={`consult[${index}].tipoPacientes`}>
              {({ push, remove }) => (
                <div className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field">
                  {['Neonatología', 'Niños', 'Adolescentes', 'Adultos', 'Mayores'].map((tipoPaciente, index2) => (
                    <label key={index2} className="flex items-center ">
                      <Field type="checkbox" name={`consult[${index}].tipoPacientes`} onClick={(e) => handleConsultChange(index, 'tipoPacientes', e.target.value)} value={tipoPaciente} />
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
      {/*tercera linea */}
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
          <div className='w-full space-y-2'>
            <button  type='button'  onClick={() => handleActive(4)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400 ">Dias disponibles</label>
              <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
          <FieldArray name={`consult[${index}].days`}>
          {({ push, remove }) => (
            <div className="w-full  p-2 border border-[#D9D9D9] rounded-[34px]  flex flex-col items-start justify-center  shadow-register-field">
              {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map((day, index2) => (
                <label key={index2} className="flex items-center space-x-2  ml-3 ">
                  <Field type="checkbox" name={`consult[${index}].days`} onClick={(e) => handleConsultChange(index, 'days', e.target.value)} value={day} />
                  <span className="">{day}</span>
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
                <Field as="select" className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400" 
                 name={`consult[${index}].startHour`} onClick={(e) => handleConsultChange(index, 'startHour', e.target.value)}>
                  {hours.map((opcion) => (
                    <option key={opcion} value={opcion} className={`${opcion != "Seleccione una hora" ? 'text-black'  : 'text-gray-400'}`}>
                      {opcion}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className="text-red-500 text-sm"  name={`consults[${index}].startHour`} component="div" />
              </div>
              <div className="mb-4 w-full space-x-4 flex items-center justify-center flex-col">
                <Field as="select" className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400" 
                name={`consult[${index}].finishHour`} onClick={(e) => handleConsultChange(index, 'finishHour', e.target.value)}>
                  {hours.map((opcion) => (
                    <option key={opcion} value={opcion} className={`${opcion != "Seleccione una hora" ? 'text-black'  : 'text-gray-400'}`}>
                      {opcion}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].finishHour`} component="div" />
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
            <div  className='w-full relative space-y-2 '>
             <button  type='button'  onClick={() => handleActive(5)}  className='w-full relative '>
              <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400">Métodos de cobro</label>
              <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px] ' />
            </button  >
            <div  className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  flex flex-col items-start justify-center shadow-register-field ">
              <div className="mb-2 ml-3">
                <label>
                  <Field type="checkbox" name={`consult[${index}].metodoCobro`} onClick={(e) => handleConsultChange(index, 'metodoCobro', e.target.value)} value="obraSocial" />
                  <span className="ml-2">Obra social</span>
                </label>
                {consult.metodoCobro && consult.metodoCobro.includes('obraSocial') && (
                  <div>
                    <div className="flex flex-wrap space-x-4 ">
                      {obrasArray.map((obraSocial, index2) => (
                        <label key={index2} className="flex items-center mb-2">
                          <Field
                            type="checkbox"
                            name={`consult[${index}].obraSocial`}
                            value={obraSocial}
                            onClick={(e) => handleConsultChange(index, 'obraSocial', e.target.value)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <span className="ml-2">{obraSocial}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                    <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].obraSocial`} component="div" />

              </div>
              <div className="mb-2  ml-3">
                <label>
                  <Field type="checkbox" name={`consult[${index}].metodoCobro`} onClick={(e) => handleConsultChange(index, 'metodoCobro', e.target.value)} value="transferencia" />
                  <span className="ml-2">Transferencia</span>
                </label>
                {consult.metodoCobro && consult.metodoCobro.includes('transferencia') && (
                  <>
                    <Field className="w-full px-3 py-2 border rounded mt-2" name={`consult[${index}].numeroCuenta`} onChange={(e) => handleConsultChange(index, 'numeroCuenta', e.target.value)} placeholder="Número de cuenta" />
                    <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].numeroCuenta`} component="div" />
                    <Field className="w-full px-3 py-2 border rounded mt-2" name={`consult[${index}].nombreTitular`} onChange={(e) => handleConsultChange(index, 'nombreTitular', e.target.value)} placeholder="Nombre del titular de la cuenta" />
                    <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].nombreTitular`} component="div" />
                    <Field className="w-full px-3 py-2 border rounded mt-2" name={`consult[${index}].cvuAlias`} onChange={(e) => handleConsultChange(index, 'cvuAlias', e.target.value)} placeholder="CVU o alias" />
                    <ErrorMessage className="text-red-500 text-sm" name={`consults[${index}].cvuAlias`} component="div" />
                  </>
                )}
              </div>
              <div className=' ml-3'>
                <label>
                  <Field type="checkbox" name={`consult[${index}].metodoCobro`} onClick={(e) => handleConsultChange(index, 'metodoCobro', e.target.value)} value="efectivo" />
                  <span className="ml-2 ">Pago en efectivo</span>
                </label>
                {consult.metodoCobro && consult.metodoCobro.includes('efectivo') && (
                  <div>
                    <div className="flex flex-wrap space-x-4">
                      {['Pago Facil', 'Rapipago'].map((pago, index2) => (
                        <label key={index2} className="flex items-center mb-2">
                          <Field
                            type="checkbox"
                            name={`consult[${index}].efectivo`}
                            value={pago}
                            onClick={(e) => handleConsultChange(index, 'efectivo', e.target.value)}
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
            </div>
          )
        }
        <ErrorMessage className="text-red-500 text-sm" name={`consult[${index}].metodoCobro`} component="div" />
      </div>
      </div>
      <div className='space-x-4 w-full flex  justify-end'>
        <button className="px-10 py-2 bg-gray-300 rounded-[30px] text-white " type='button' onClick={(e) => handleConsultClose(index)} >Guardar Consulta</button>
      </div>
            </div>         
        ))}
      <div className='mt-10 space-y-2 font-sans2 font-extrabold '>
        {
           consults.map((consult, index) => consult.closed && (
            <div  key={index} className=" border p-4 rounded-[14px] flex justify-between items-center bg-[rgba(64,123,255,0.07)] space-x-4 ">
              <div className='w-1/6 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around text-xs'>  
              <p className='text-gray-400 '>Tipo de consulta</p>
              <p>{consult.tipoConsulta}</p>
              </div>
              <div className='w-1/6 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around text-xs'>  
              <p className='text-gray-400 '>Costo</p>
              <p>{consult.tipoConsulta === 'presencial' ? consult.costoConsultaPresencial  : consult.costoConsultaVirtual}</p>
              </div>
              <div className='w-1/6 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around text-xs'>  
              <p className='text-gray-400 '>Duracion</p>
              <p>{consult.consultaDuracion}</p>
              </div>
              <div className='w-1/6 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around text-xs font-extrabold'>  
              <p className='text-gray-400 '>Paciente</p>
              {
                consult.tipoPacientes.length > 1 ? 
                    consult.tipoPacientes.map(met => met.slice(0,3)).join(', ')
                :(
                  <p>{consult.tipoPacientes}</p>
                )
              }
              </div>
              <div className='w-1/6 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around text-xs text-gray-400'>  
              {
                consult.days.length > 1 ? 
                    consult.days.map(met => met.slice(0,3)).join(', ')
                :(
                  <p>{consult.days}</p>
                )
              }
              <p className='text-black font-extrabold'>{consult.startHour} - {consult.finishHour}</p>
              </div>
              <div className='w-1/6 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around text-xs'>  
              <p className='text-gray-400 '>Cobro</p>
              {
                consult.metodoCobro.length > 1 ? 
                    consult.metodoCobro.map(met => met.slice(0,3)).join(', ')
                :(
                  <p>{consult.metodoCobro}</p>
                )
              }
              </div>
              <div className='flex flex-col space-y-2'>
                <button className='px-4 py-2 mx-1 bg-blue-40 text-white rounded'  type='button' onClick={(e) => handleConsultChange(index, 'closed', false)}>
                  <MdEdit /></button>
                <button type="button" className="px-4 py-2 mx-1 bg-red-600 text-white rounded" onClick={() => handleConsultRemove(index)}>
                  <MdDelete /></button>
              </div>
            </div>
           )
        )}        
      </div>




      <div className="flex items-center mt-4">
        <Field type="checkbox" name="consentimiento" className="mr-2" />
        <label className="text-gray-700">Acepto los términos y condiciones y doy mi consentimiento para el tratamiento virtual y el manejo de mis datos.</label>
        <ErrorMessage name="consentimiento" component="div" className="text-red-600 text-sm" />
      </div>
    </div>
  );
};

export default MedicConsultInfo;
export const obrasArray = ['OSDE', 'Sancor Salud', 'Swiss Medical'] 