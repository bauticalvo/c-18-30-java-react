import React, { useState } from 'react';
import { Field, ErrorMessage, useFormikContext, FieldArray } from 'formik';
import { FaPlus } from "react-icons/fa6";



const MedicConsultInfo = ({ setFieldValue }) => {
  const { values } = useFormikContext();
  const [days, setDays] = useState({ 
    lunes: { inicio: '', final: '' },
     martes: { inicio: '', final: '' },
     miercoles: { inicio: '', final: '' }, 
     jueves: { inicio: '', final: '' }, 
     viernes: { inicio: '', final: '' } });

     const handleDayChange = (dayOfWeek, field, value) => {
      const updatedDays = {
        ...days,
        [dayOfWeek]: {
          ...days[dayOfWeek],
          [field]: value
        }
      };
      setDays(updatedDays);
      setFieldValue('days', updatedDays);
      console.log(days);
    };
  


  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-purple-600">Consultas Médicas</h1>
      
       <div className="mb-4">
        <label className="block text-gray-700 mb-2">Costo de la consulta</label>
        
        <div className="flex space-x-4 mb-2">
          <label className="flex items-center">
            <Field type="radio" name="tipoConsulta" value="virtual" />
            <span className="ml-2">Consulta virtual</span>
          </label>
          <label className="flex items-center">
            <Field type="radio" name="tipoConsulta" value="presencial" />
            <span className="ml-2">Consulta presencial</span>
          </label>
          <label className="flex items-center">
            <Field type="radio" name="tipoConsulta" value="ambas" />
            <span className="ml-2">Ambas</span>
          </label>
        </div>

        {values.tipoConsulta === 'virtual' && (
          <div className="mt-2">
            <Field className="w-full px-3 py-2 border rounded" name="costoConsultaVirtual" placeholder="Costo de la consulta virtual" />
            <ErrorMessage className="text-red-500 text-sm" name="costoConsultaVirtual" component="div" />
          </div>
        )}

        {values.tipoConsulta === 'presencial' && (
          <div className="mt-2">
            <Field className="w-full px-3 py-2 border rounded" name="costoConsultaPresencial" placeholder="Costo de la consulta presencial" />
            <ErrorMessage className="text-red-500 text-sm" name="costoConsultaPresencial" component="div" />
          </div>
        )}

        {values.tipoConsulta === 'ambas' && (
          <div className="mt-2">
            <Field className="w-full px-3 py-2 border rounded" name="costoConsultaVirtual" placeholder="Costo de la consulta virtual" />
            <ErrorMessage className="text-red-500 text-sm" name="costoConsultaVirtual" component="div" />
            <Field className="w-full px-3 py-2 border rounded mt-2" name="costoConsultaPresencial" placeholder="Costo de la consulta presencial" />
            <ErrorMessage className="text-red-500 text-sm" name="costoConsultaPresencial" component="div" />
          </div>
        )}
        {values.tipoConsulta === '' && (
          <div className="mt-2">
            <ErrorMessage className="text-red-500 text-sm" name="tipoConsulta" component="div" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Duración de la consulta</label>
        <Field as="select" className="w-full px-3 py-2 border rounded" name="consultaDuracion">
          <option value="">Seleccionar duración</option>
          <option value="30min">30 minutos</option>
          <option value="1hr">1 hora</option>
          <option value="mas1hr">Más de 1 hora</option>
        </Field>
        <ErrorMessage className="text-red-500 text-sm" name="consultaDuracion" component="div" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tipo de pacientes que atiende</label>
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
        <ErrorMessage className="text-red-500 text-sm" name="tipoPacientes" component="div" />
      </div>
      <div className='mb-4'>
      <div className='flex justify-between'>
        <label className="block text-gray-700 mb-2">Días y horarios disponibles</label>
      </div>
      {Object.keys(days).map((dayOfWeek) => (
        <div key={dayOfWeek} className="mb-2 border p-1 rounded">
          <span className="ml-2 capitalize">{dayOfWeek}</span>
          <div className="flex justify-center">
            <label className="mr-2 pr-2">
              De:
            </label>
              <Field
                type="time"
                name={`days.${dayOfWeek}.inicio`}
                value={days[dayOfWeek].inicio}
                onChange={(e) => handleDayChange(dayOfWeek, 'inicio', e.target.value)}
              />
            <ErrorMessage className="text-red-500 text-sm" name={`days.${dayOfWeek}.inicio`} component="div" />
            <label className="mr-2 pr-2">
              Hasta:
            </label>
              <Field
                type="time"
                name={`days.${dayOfWeek}.final`}
                value={days[dayOfWeek].final}
                onChange={(e) => handleDayChange(dayOfWeek, 'final', e.target.value)}
              />
            <ErrorMessage className="text-red-500 text-sm" name={`days.${dayOfWeek}.final`} component="div" />
          </div>
        </div>
      ))}
    </div>
      <div className="mb-4">
        <label className="block text-gray-700">Métodos de cobro</label>
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
        <ErrorMessage className="text-red-500 text-sm" name="metodoCobro" component="div" />
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
