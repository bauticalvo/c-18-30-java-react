import React, { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { FileInputField } from '../Utils/FileInputField';
import universidades from '../Utils/Universidades'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ProfesionalInfo =({ setFieldValue }) => {

  const { values } = useFormikContext();
  const [experiencias, setExperiencias] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedFinal, setIsFocusedFinal] = useState(false);
  const [actually, setActually] = useState(false)
  const [active, setActive ] = useState(false)

  const addExperience = () => {
    if (experiencias.length < 3) {
      const newExperience = { cargo: '', lugar: '', Fechainicio: '', FechaFinal: '', actualmente: 'No', closed: false };
      const updatedExperiences = [...experiencias, newExperience];
      setExperiencias(updatedExperiences);
      setFieldValue('experiencias', updatedExperiences);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiencias.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp));
    setExperiencias(updatedExperiences);
    setFieldValue('experiencias', updatedExperiences);
  };

  const handleExperienceRemove = (index) => {
    const updatedExperiences = experiencias.filter((_, i) => i !== index);
    setExperiencias(updatedExperiences);
    setFieldValue('experiencias', updatedExperiences);
  };

  const handleActually = (index)=> {
    if(!actually){
      setActually(true)
      handleExperienceChange(index, 'actualmente', 'Si')
    } else {
      setActually(false)
      handleExperienceChange(index, 'actualmente', 'No')
    }
  }

  const handleActive = () => {
    setActive(!active);
  };
    return (
    <div className=' h-90vh'>
    <h1 className="text-xl font-sans2 mb-4  text-black border-b-2 border-b-[rgba(64,123,255,0.4)]">Perfil profesional</h1>
    <div className="flex flex-col space-y-4 m-4">
      <div className='w-full flex space-x-4'>

        <div className="w-1/2">
            <Field as="select" className="w-full p-2 border border-[#D9D9D9]   rounded-[34px] shadow-register-field text-gray-400" name="specialty">
            <option  className='text-black'  value="">Especializacion</option>
            <option  className='text-black' value="Medico Clinico">Medico Clinico</option>
            <option  className='text-black' value="Psicólogo">Psicólogo</option>
            <option  className='text-black' value="Nutricionista">Nutricionista</option>

            </Field>
            <ErrorMessage className="text-red-500 text-sm" name="specialty" component="div" />
        </div>
        <div className="w-1/2">
        <Field className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" name="tuition" placeholder='Número de Matricula' />
        <ErrorMessage className="text-red-500 text-sm" name="tuition" component="div" />
        </div>
      </div>

    
        <div className="mb-4 w-1/2 space-x-4">
            <Field name="certification" component={FileInputField} />
            <ErrorMessage name="certification" component="div" className="text-red-600 text-sm" />
      </div>
    </div> 
    <div className='flex w-full space-x-4 m-4'>
      <div className='w-1/2 '>
      <Field as="select" className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="year_experience">
        <option  className='text-black' value="">Años de experiencia</option>
        <option  className='text-black' value="1-2">1 a 2 años</option>
        <option  className='text-black' value="3-5">3 a 5 años</option>
        <option  className='text-black' value="6-10">6 a 10 años</option>
        <option  className='text-black' value="mas">Mas</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="year_experience" component="div" />
      </div>
      <div className='w-1/2 '>
          <Field className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="especialidadType" placeholder='Habilidades especiales o intereses' />
        <ErrorMessage className="text-red-500 text-sm" name="especialidadType" component="div" />
      </div>
  
    </div>
    <h1 className="text-xl font-sans2 my-4  border-b-2 border-b-[rgba(64,123,255,0.4)] text-black">Estudios</h1>
    <div className='flex w-full space-x-4'> 
    <div className='w-1/2 '>
            <Field as="select" className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center shadow-register-field text-gray-400' name="university">
                <option className='text-black' value="">Universidad</option>
                {universidades.map((universidad, index) => (
                    <option key={index} className='text-black' value={universidad.nombre}>{universidad.nombre}</option>
                ))}
            </Field>
            <ErrorMessage className="text-red-500 text-sm" name="university" component="div" />
        </div>
      <div className='w-1/2 '>
      <Field className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="date_of_graduation" placeholder='Año de egreso' />
        <ErrorMessage className="text-red-500 text-sm" name="date_of_graduation" component="div" />
      </div>
    </div>

    <div>
      <div className='flex justify-between'>
    <h1 className="text-xl font-sans2 my-4  border-b-2 border-b-[rgba(64,123,255,0.4)] text-black">Experiencia Laboral</h1>

    {experiencias.length < 3 && (
        <button
          type="button"
          className="px-4 py-2 flex items-center justify-center  text-black rounded"
          onClick={addExperience}
        >
        Añadir más <FiPlusCircle className='ml-2' />
        </button>
      )}
      </div>

      {experiencias.length < 1 && (
        <div className='h-[100px] bg-white'>

        </div>
      )}
      {experiencias.map((experiencia, index) => !experiencia.closed && (
        <div key={index} className="mb-6  p-4 ">
          <div className='flex w-full space-x-4 '>
          <Field
            className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'
            name={`experiencias[${index}].lugar`}
            placeholder="Empresa / Organización "
            value={experiencia.lugar}
            onChange={(e) => handleExperienceChange(index, 'lugar', e.target.value)}
          />
          <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].lugar`} component="div" />
          <Field
            className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'
            name={`experiencias[${index}].cargo`}
            placeholder="Cargo"
            value={experiencia.cargo}
            onChange={(e) => handleExperienceChange(index, 'cargo', e.target.value)}
          />
          <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].cargo`} component="div" />
          </div>
          <div className="flex mt-5 w-full space-x-4">
            {
              !active && (
                <div className='w-full flex space-x-4'>
                    <button type='button' onClick={handleActive} className='w-full relative items-start justify-between'>
                      <div className="w-full space-x-4 p-2 border border-[#D9D9D9] rounded-[34px] flex  shadow-register-field text-gray-400">
                      <label >Tiempo</label>
                      <label >Desde</label>
                      <label > {'   /    '}   </label>
                      <label >Hasta</label>

                      </div>
                      <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px]' />
                    </button>
                  <div className='w-full  p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex justify-center  shadow-register-field text-gray-400'>
                      <button type='button' onClick={()=> handleActually(index)} className={`${actually ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `}></button>
                      <label className=" w-full text-gray-700 ">Actualmente trabajo aquí</label>
                  </div>

                    </div>
              )
            }
            {
              active && (
                <div className='w-full flex space-x-4'>
                  <div className='w-1/2 space-y-2'>
                    <button type='button' onClick={handleActive} className='w-full relative items-start justify-between'>
                      <div className="w-full space-x-4 p-2 border border-[#D9D9D9] rounded-[34px] flex  shadow-register-field text-gray-400">
                      <label >Tiempo</label>
                      <label >Desde</label>
                      <label > {'   /    '}   </label>
                      <label >Hasta</label>

                      </div>
                      <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px]' />
                    </button>
                <div className='flex space-x-4'>
                  <div className="w-1/2  relative">
                    <Field
                      className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'
                      type="date"
                      name={`experiencias[${index}].Fechainicio`}
                      value={experiencia.Fechainicio}
                      onChange={(e) => handleExperienceChange(index, 'Fechainicio', e.target.value)}
                
                    />
                    <ErrorMessage className="text-red-500 text-sm m-4" name={`experiencias[${index}].Fechainicio`} component="div" />

                  </div>
                  <div className="w-1/2 relative">
                    <Field
                      className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'
                      type="date"
                      name={`experiencias[${index}].FechaFinal`}
                      placeholder="Fecha de finalización"
                      value={experiencia.FechaFinal}
                      onChange={(e) => handleExperienceChange(index, 'FechaFinal', e.target.value)}

                      disabled={experiencia.actualmente === 'Si'}
                    />
              
                    <ErrorMessage className="text-red-500 text-sm" name={`experiencias[${index}].FechaFinal`} component="div" />
                  </div>
                  </div>
                  </div>

                  <div className='w-1/2 h-1/2 p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex justify-center  shadow-register-field text-gray-400'>
                        <button type='button' onClick={()=> handleActually(index)} className={`${actually ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `}></button>
                        <label className=" w-full text-gray-700 ">Actualmente trabajo aquí</label>
                  </div>
                </div>
              )
            }


       

          </div>

        <div className='flex flex-col items-end w-full  '>
  
          <div >

          <button
            type="button"
            className="mt-4 ml-4 px-4 py-2 bg-gray-300 text-white rounded-[30px]"
            onClick={(e) => handleExperienceChange(index, 'closed', true)}
          >
            Guardar Experiencia
          </button>       
          </div>
        </div>

        </div>
      ))}
            {experiencias.map((experiencia,index) => experiencia.closed && (
        <div key={index} className="mb-6 border p-4 rounded-[14px] flex justify-between items-center bg-[rgba(64,123,255,0.07)] space-x-4 ">
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p className='text-gray-400'>Empresa</p>
          <p>{experiencia.lugar}</p>
          </div>
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p className='text-gray-400'>Cargo</p>
          <p>{experiencia.cargo}</p>
          </div>
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p className='text-gray-400'>Fecha de inicio</p>
          <p>{experiencia.Fechainicio}</p>
          </div>
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p className='text-gray-400'>Fecha Final</p>
          <p>{experiencia.actualmente === 'No' ? experiencia.FechaFinal  : 'Trabajo actual' }</p>
          </div>
          <div className='flex flex-col space-y-2'>
            <button className='px-4 py-2 mx-1 bg-blue-40 text-white rounded'  type='button' onClick={(e) => handleExperienceChange(index, 'closed', false)}>
              <MdEdit /></button>
            <button type="button" className="px-4 py-2 mx-1 bg-red-600 text-white rounded" onClick={() => handleExperienceRemove(index)}>
              <MdDelete /></button>
          </div>
        </div>
      ))}


    </div>
    </div>
)
}
export default ProfesionalInfo;