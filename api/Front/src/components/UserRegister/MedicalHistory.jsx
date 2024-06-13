import React, { useState } from 'react';
import {  Field, ErrorMessage } from 'formik';



const MedicalHistory = ({values, setFieldValue }) => {
  const [medication, setMedication] = useState(false);
  const [active1, setActive1 ] = useState(false)
  const [active2, setActive2 ] = useState(false)
  const [active3, setActive3 ] = useState(false)
  const [active4, setActive4 ] = useState(false)


  const handleChronicDiseases = () =>{
    if (values.enfermedadesCronicas.includes('ninguna') && values.enfermedadesCronicas.includes('Diabetes') ) {
      const array = values.enfermedadesCronicas.filter((element) => element !== 'Diabetes')
      setFieldValue('enfermedadesCronicas', array);
    }
    setFieldValue('enfermedadesCronicas', ['ninguna'])
    setFieldValue('otrasEnfermedades', '')

  }
  const handleFamilyHistory = () =>{
    setFieldValue('historiaFamiliar', ['ninguna'])
    setFieldValue('otrasEnfermedadesFamilia', '')
   
  }

  const handleAlergy = () =>{
    setFieldValue('alergias', ['ninguna'])
    setFieldValue('alergiasMedicamentosDescripcion', '')
    setFieldValue('alergiasAlimentosDescripcion', '')
    setFieldValue('alergiasAmbientalesDescripcion', '')
    setFieldValue('otrasAlergiasDescripcion', '')
    setFieldValue('alergiasMedicamentos', 'no')
    setFieldValue('alergiasAlimentos', 'no')
    setFieldValue('alergiasAmbientales', 'no')
    setFieldValue('otrasAlergias', 'no')
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
      default:return
    }
    }
    
  return (
    <div className="space-y-8 p-6 flex flex-col items-center justify-center">          
      <div className="flex items-start justify-center space-x-4  w-[70%]">
        <div className='w-1/2  '>
          <div className='p-2 flex items-center space-x-4 border border-[#D9D9D9]  rounded-[34px] shadow-register-field'>
          <button type='button' className={`${active1 ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `} onClick={() => handleActive(1)}></button>
          <p className="block text-gray-700 font-sans2">¿Enfermedades crónicas?    </p>
          </div>
          {active1 && (
            <div>
        <div className="flex items-center space-x-4  p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field w-1/8 mt-4" > 
        <label className="   w-1/8">
          <Field type="checkbox" name="enfermedadesCronicas" value="Diabetes" className="mr-2" disabled={values.enfermedadesCronicas.includes('ninguna')} />
          Diabetes
        </label>
        <label className="   w-1/8">
          <Field type="checkbox" name="enfermedadesCronicas" value="Hipertensión" className="mr-2" disabled={values.enfermedadesCronicas.includes('ninguna')} />
          Hipertensión
        </label>
        <label className="   w-1/8">
          <Field type="checkbox" name="enfermedadesCronicas" value="Asma" className="mr-2" disabled={values.enfermedadesCronicas.includes('ninguna')} />
          Asma
        </label>
        <label className="   w-1/8">
          <Field type="checkbox" name="enfermedadesCronicas" value="ninguna" className="mr-2"  onClick={handleChronicDiseases} />
            Ninguna
        </label>        
  
        </div> 
          <div className='w-full flex items-center justify-center'>
            <Field name="otrasEnfermedades" className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field mt-4"  placeholder='Otras'/>
            <ErrorMessage name="otrasEnfermedades" component="div" className="text-red-600 text-sm" />
          </div>
              <div className="flex flex-col items-center  space-x-4 p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field w-1/8 mt-4">
              <div className='flex items-center justify-around  w-full'>
              <label className="block text-gray-700 ">Cirugías anteriores:</label>
              <label>
                <Field type="radio" name="cirugias" value="si" className="mr-2 " />
                Sí
              </label>
              <label>
                <Field type="radio" name="cirugias" value="no" className="mr-2 " />
                No
              </label>
              </div>
            {values.cirugias === 'si' && (
              <div className='w-full mt-4'>
                <Field name="cirugiasAnteriores" className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field " placeholder='Indique la cirugia' />
                <ErrorMessage name="cirugiasAnteriores" component="div" className="text-red-600 text-sm text-center" />
              </div>
            )}
            </div>
            </div>                
          )}


        </div>

      <div className='w-1/2'>
      <div className='p-2 flex space-x-4 border items-center  border-[#D9D9D9]  rounded-[34px] shadow-register-field'>
      <button type='button' className={`${active2 ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `} onClick={() => handleActive(2)}></button>
      <p className="block text-gray-700 font-sans2">Antecedentes médicos familiares</p>
      </div>
      {
        active2 && (
          <div className='space-y-4'>
        <div className="flex items-center space-x-4  p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field w-1/8 mt-4">
        <label>
          <Field type="checkbox" name="historiaFamiliar" value="Diabetes" className="mr-2" disabled={values.historiaFamiliar.includes('ninguna')}  />
          Diabetes
        </label>
        <label>
          <Field type="checkbox" name="historiaFamiliar" value="Hipertensión" className="mr-2" disabled={values.historiaFamiliar.includes('ninguna')} />
          Hipertensión
        </label>
        <label>
          <Field type="checkbox" name="historiaFamiliar" value="Asma" className="mr-2" disabled={values.historiaFamiliar.includes('ninguna')} />
          Asma
        </label>         
        <label>
          <Field type="checkbox" name="historiaFamiliar" value="ninguna" className="mr-2"  onClick={handleFamilyHistory} />
          Ninguna
        </label>
      </div>
      <div>
        <Field name="otrasEnfermedadesFamilia" className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field " placeholder='Otras' />
        <ErrorMessage name="otrasEnfermedadesFamilia" component="div" className="text-red-600 text-sm" />
      </div>
          </div>
        )
      }
 

      </div>
      </div>
      <div className="flex items-start justify-center space-x-4  w-[70%]">

      <div className='w-1/2'>
          <div className='p-2 flex items-center space-x-4 border border-[#D9D9D9]  rounded-[34px] shadow-register-field'>
          <button type='button' className={`${active3 ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `} onClick={() => handleActive(3)}></button>
          <p className="block text-gray-700 font-sans2">¿Alergias?    </p>
          </div>
          {
            active3 && (
              <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-4 p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" >
                <label className="block text-gray-700">Medicamentos:</label>
                <label>
                  <Field type="radio" name="alergiasMedicamentos" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="alergiasMedicamentos" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.alergiasMedicamentos === 'si'  && !values.alergias.includes('ninguna') && (
                <div>
                  
                  <Field name="alergiasMedicamentosDescripcion" placeholder='Cual' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" />
                  <ErrorMessage name="alergiasMedicamentosDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4 p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field">
                <label className="block text-gray-700">Alimentos:</label>
                <label>
                  <Field type="radio" name="alergiasAlimentos" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="alergiasAlimentos" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.alergiasAlimentos === 'si'  && !values.alergias.includes('ninguna') && (
                <div>
                  
                  <Field name="alergiasAlimentosDescripcion"  placeholder='Cual' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field"/>
                  <ErrorMessage name="alergiasAlimentosDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4 p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field">
                <label className="block text-gray-700">Ambientales:</label>
                <label>
                  <Field type="radio" name="alergiasAmbientales" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="alergiasAmbientales" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.alergiasAmbientales === 'si'  && !values.alergias.includes('ninguna') && (
                <div>
                  
                  <Field name="alergiasAmbientalesDescripcion" placeholder='Cual' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field"/>
                  <ErrorMessage name="alergiasAmbientalesDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4 p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field">
                <label className="block text-gray-700">Otros:</label>
                <label>
                  <Field type="radio" name="otrasAlergias" value="si" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  Sí
                </label>
                <label>
                  <Field type="radio" name="otrasAlergias" value="no" className="mr-2" disabled={values.alergias.includes('ninguna')} />
                  No
                </label>
              </div>
              {values.otrasAlergias === 'si' && !values.alergias.includes('ninguna') && (
                <div >
                  <Field name="otrasAlergiasDescripcion" placeholder='Cual' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" />
                  <ErrorMessage name="otrasAlergiasDescripcion" component="div" className="text-red-600 text-sm" />
                </div>
              )}
              <div className="flex items-center space-x-4 p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field">
                <label>
                  <Field type="checkbox" name="alergias" value="ninguna" onClick={handleAlergy} />
                  Ninguna
                </label>
              </div>
            </div>
            )
          }
      
      </div>
      <div className='w-1/2'>
          <div className='p-2 flex items-center space-x-4 mb-4 border border-[#D9D9D9]  rounded-[34px] shadow-register-field'>
            <button type='button' className={`${active4 ? 'bg-blue-40' : 'bg-white'}  border border-black border-opacity-50   rounded-[50%] w-[25px] h-[25px] ml-4 `} onClick={() => handleActive(4)}></button>
            <p className="block text-gray-700 font-sans2">¿Tomas medicamento?   </p>
          </div>
          {
            active4 && (
           <div className="flex items-center space-x-4 my-4  p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field">
            <label>
              <Field type="radio" name="tomaMedicamento" value="si" className="mr-2" onClick={() => setMedication(true)} />
              Sí
            </label>
            <label>
              <Field type="radio" name="tomaMedicamento" value="no" className="mr-2" onClick={() => setMedication(false)} />
              No
            </label>
          </div>
        )}
          {medication && (
            <div className='space-y-2'>
              <div>
                <Field name="medicamento" placeholder='Medicamento' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" />
                <ErrorMessage name="medicamento" component="div" className="text-red-600 text-sm" />
              </div>
              <div>
                <Field name="dosis" placeholder='Dosis' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" />
                <ErrorMessage name="dosis" component="div" className="text-red-600 text-sm" />
              </div>
              <div>
                <Field name="frecuencia" placeholder='Frecuencia' className="w-full   p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" />
                <ErrorMessage name="frecuencia" component="div" className="text-red-600 text-sm" />
              </div>
            </div>
          )        } 
        </div>


      </div>
       <div className="flex flex-col items-start w-[70%]">
        <div>
        <Field type="checkbox" name="consentimiento" className="mr-2 mt-3" />
        <label className="text-black mt-3">Acepto los términos y condiciones.</label>          
        </div>

        <ErrorMessage name="consentimiento" component="div" className="text-red-600 text-sm" />
      </div>
    </div>
  );
};

export default MedicalHistory;
