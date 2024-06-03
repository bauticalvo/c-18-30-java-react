import React, { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { FileInputField } from '../Utils/FileInputField';


const ProfesionalInfo =({ setFieldValue }) => {

  const { values } = useFormikContext();
  const [experiencias, setExperiencias] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedFinal, setIsFocusedFinal] = useState(false);
  const [actually, setActually] = useState(false)

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
    return (
    <>
    <h1 className="text-xl font-sans2  text-black">Perfil profesional</h1>
    <div className="flex space-x-4">
        <div className="w-1/2">
            <Field as="select" className="w-full p-2 border border-[#D9D9D9]   rounded-[34px] shadow-register-field text-gray-400" name="especialidad">
            <option  className='text-black'  value="">Especializacion</option>
            <option  className='text-black' value="Medico Clinico">Medico Clinico</option>
            <option  className='text-black' value="Psicologo">Psicologo</option>
            <option  className='text-black' value="Nutricionista">Nutricionista</option>

            </Field>
            <ErrorMessage className="text-red-500 text-sm" name="especialidad" component="div" />
        </div>
        <div className="w-1/2">
        <Field className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" name="numeroMatricula" placeholder='Número de Matricula' />
        <ErrorMessage className="text-red-500 text-sm" name="numeroMatricula" component="div" />
        </div>

    </div> 
  <div>
      <div className="mb-4">
            <Field name="certificado" component={FileInputField} />
            <ErrorMessage name="certificado" component="div" className="text-red-600 text-sm" />
      </div>
    </div>
    <div className='flex w-full space-x-4'>
      <div className='w-1/2 '>
      <Field as="select" className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="experiencia">
        <option  className='text-black' value="">Años de experiencia</option>
        <option  className='text-black' value="1-2">1 a 2 años</option>
        <option  className='text-black' value="3-5">3 a 5 años</option>
        <option  className='text-black' value="6-10">6 a 10 años</option>
        <option  className='text-black' value="mas">Mas</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="experiencia" component="div" />
      </div>
      <div className='w-1/2 '>
          <Field className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="especialidadType" placeholder='Habilidades especiales o intereses' />
        <ErrorMessage className="text-red-500 text-sm" name="especialidadType" component="div" />
      </div>
  
    </div>
    <h1 className="text-xl font-sans2  text-black">Estudios</h1>
    <div className='flex w-full space-x-4'> 
      <div className='w-1/2 '>
      <Field as="select" className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="universidad">
        <option  className='text-black' value="">Universidad</option>
        <option  className='text-black' value="Universidad de Cuyo">Universidad de Cuyo</option>
        <option  className='text-black' value="Universidad de Mexico">Universidad de Mexico</option>
        <option  className='text-black' value="Universidad de Buenos Aires">Universidad de Buenos Aires</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="universidad" component="div" />
      </div>
      <div className='w-1/2 '>
      <Field className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400' name="egreso" placeholder='Año de egreso' />
        <ErrorMessage className="text-red-500 text-sm" name="egreso" component="div" />
      </div>
    </div>

    <div>
      <div className='flex justify-between'>
    <h1 className="text-xl font-sans2 mb-3  text-black">Experiencia Laboral</h1>

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
            <div className="w-1/2 pr-2 relative">
              <Field
                className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'
                type="date"
                name={`experiencias[${index}].Fechainicio`}
                value={experiencia.Fechainicio}
                onChange={(e) => handleExperienceChange(index, 'Fechainicio', e.target.value)}
          
              />
              <ErrorMessage className="text-red-500 text-sm m-4" name={`experiencias[${index}].Fechainicio`} component="div" />

            </div>
            <div className="w-1/2 pl-2 relative">
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
       
            <div className='w-full h-1/2 p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex justify-center  shadow-register-field text-gray-400'>
                <button type='button' onClick={()=> handleActually(index)} className={`${actually ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `}></button>
                <label className=" w-full text-gray-700 ">Actualmente trabajo aquí</label>

          </div>
          </div>

        <div className='flex flex-col items-center w-full '>
  
          <div >
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => handleExperienceRemove(index)}
          >
            Eliminar Experiencia
          </button>
          <button
            type="button"
            className="mt-4 ml-4 px-4 py-2 bg-blue-400 text-white rounded"
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
          <p>Empresa</p>
          <p>{experiencia.lugar}</p>
          </div>
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p>Cargo</p>
          <p>{experiencia.cargo}</p>
          </div>
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p>Fecha de inicio</p>
          <p>{experiencia.Fechainicio}</p>
          </div>
          <div className='w-1/4 bg-[rgba(64,123,255,0.08)] rounded-[54px] p-4 flex items-center justify-around'>  
          <p>Fecha Final</p>
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
    </>
)
}
export default ProfesionalInfo;