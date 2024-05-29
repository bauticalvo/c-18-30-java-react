import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import axios from "axios";


const PersonalInfo = ({ setFieldValue }) => {
  
  const [places, setPlaces] = useState([])
  const [postCode, setPostCode] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [status, setStatus] = useState(false)
  const {  values } = useFormikContext();

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFieldValue('pais', value);
    setCountry(value)
    setStatus(true)
  };

  const handlePostCodeChange = (e) => {
    const { value } = e.target;
    setFieldValue('codigoPostal', value);
    setPostCode(value)
  };
useEffect(() => {
  if (postCode.length >= 4 && country ) {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.zippopotam.us/${country}/${postCode}`);
        setPlaces(response.data.places);
        setState(response.data.places[0].state);
        setStatus(false)
        console.log(places);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Debounce the API call
    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceFetch); // Cleanup the debounce
  }
}, [postCode, country]);

  const toLowerFunction = (name) =>{
    const aux = name.slice(1).toLowerCase()
    return name[0] + aux
  }
  
  return (  
  <>
    <h1 className="text-2xl font-bold mb-6 text-purple-600">Datos Personales</h1>
    <div className="flex space-x-4">
      <div className="w-1/2">
        <Field className="w-full px-3 py-2 border rounded" name="nombre" placeholder='Nombre' />
        <ErrorMessage className="text-red-500 text-sm" name="nombre" component="div" />
      </div>
      <div className="w-1/2">
        <Field className="w-full px-3 py-2 border rounded" name="apellido" placeholder='Apellido' />
        <ErrorMessage className="text-red-500 text-sm" name="apellido" component="div" />
      </div>
    </div>

    <div className="flex space-x-4">
      <div className="w-1/2">
        <Field as="select" className="w-full px-3 py-2 border rounded" name="codigoPais"  >
          <option value="">Código de País</option>
          <option value="52">México (+52)</option>
          <option value="54">Argentina (+54)</option>
          <option value="55">Brasil (+55)</option>
          <option value="56">Chile (+56)</option>
          <option value="57">Colombia (+57)</option>
          <option value="58">Venezuela (+58)</option>
        </Field>
        <ErrorMessage className="text-red-500 text-sm" name="codigoPais" component="div" />
      </div>
      <div className="w-1/2">
        <Field className="w-full px-3 py-2 border rounded" name="numeroCelular" type='tel' placeholder='Número de Celular' />
        <ErrorMessage className="text-red-500 text-sm" name="numeroCelular" component="div" />
      </div>
    </div>
       <div>
          <Field className="w-full px-3 py-2 border rounded" name="email" type="email" placeholder='Email'/>
          <ErrorMessage className="text-red-500 text-sm" name="email" component="div" />
       </div>
    <div>
    <div>
      <Field className="w-full px-3 py-2 border rounded" name="dni" placeholder='DNI'/>
      <ErrorMessage className="text-red-500 text-sm" name="dni" component="div" />
    </div>
    <div>
      <label className="block text-gray-700 mt-3">Fecha de nacimiento:</label>
      <Field className="w-full px-3 py-2 border mt-1 rounded" name="nacimiento" type="date" />
      <ErrorMessage className="text-red-500 text-sm" name="nacimiento" component="div" />
    </div>
      <label className="block text-gray-700">Sexo</label>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <Field type="radio" name="sexo" value="Femenino" className="mr-2" />
          Femenino
        </label>
        <label className="flex items-center">
          <Field type="radio" name="sexo" value="Masculino" className="mr-2" />
          Masculino
        </label>
        <label className="flex items-center">
          <Field type="radio" name="sexo" value="Otro" className="mr-2" />
          Otro
        </label>
      </div>
      <ErrorMessage className="text-red-500 text-sm" name="sexo" component="div" />
    </div>

    <div>
      <Field className="w-full px-3 py-2 border rounded" name="domicilio" placeholder='Domicilio del Consultorio' />
      <ErrorMessage className="text-red-500 text-sm" name="domicilio" component="div" />
    </div>
    <div>
      <Field className="w-full px-3 py-2 border rounded" name="codigoPostal" value={values.codigoPostal} onChange={handlePostCodeChange} placeholder='Código Postal'/>
      <ErrorMessage className="text-red-500 text-sm" name="codigoPostal" component="div" />
    </div>
    <div>
      <Field as="select" className="w-full px-3 py-2 border rounded" name="pais" onChange={handleCountryChange}> 
        <option value="">País</option>
        <option value="MX">México</option>
        <option value="AR">Argentina</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="pais" component="div" />
    </div>

    <div>
      <Field as="select" className="w-full px-3 py-2 border rounded" name="estado">
        <option value="">Estado/Provincia/Región</option>
        <option value={state}>{toLowerFunction(state)}</option>
      </Field>
      <ErrorMessage className="text-red-500 text-sm" name="estado" component="div" />
    </div>
    <div>
              <Field as="select" name="localidad" className="w-full p-2 border rounded-md" >
                <option value="">Localidad</option>
                {places.map((place,index) => (
                  <option
                  key={index}
                  value={place["place name"]}
                  >
                    {toLowerFunction(place["place name"])}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="localidad" component="div" className="text-red-600 text-sm" />
    </div>

    <div>
      <label className="block text-gray-700">Foto de Perfil</label>
      <input
        name="fotoPerfil"
        type="file"
        className="w-full px-3 py-2 border rounded"
        onChange={(event) => {
          setFieldValue("fotoPerfil", event.currentTarget.files[0]);
        }}
      />
      <ErrorMessage className="text-red-500 text-sm" name="fotoPerfil" component="div" />
      </div> 
    <div>
      <Field className="w-full px-3 py-2 border rounded" name="password" type="password"  placeholder='Contraseña'/>
      <ErrorMessage className="text-red-500 text-sm" name="password" component="div" />
    </div>
    <div>
      <Field className="w-full px-3 py-2 border rounded" name="confirmarPassword" type="password" placeholder='Confirmar Contraseña' />
      <ErrorMessage className="text-red-500 text-sm" name="confirmarPassword" component="div" />
    </div>
  </>
)}

export default PersonalInfo;
