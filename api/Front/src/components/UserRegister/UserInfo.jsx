import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import axios from "axios";
import { GoPlus } from "react-icons/go";

const UserInfo = ({setFieldValue}) =>{

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

return(
  <>
    <h1 className="font-sans2">Datos de contacto</h1>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <Field name="nombre" className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" placeholder='Nombre' />
          <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/3">
          <Field name="apellido" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Apellido' />
          <ErrorMessage name="apellido" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/3">
        <Field name="email" type="email" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field " placeholder='Correo electrónico'/>
        <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
      </div>
        </div>
      <div className="flex space-x-4">
        <div className="w-[11%]">
          <label className="block text-gray-700"></label>
          <Field as="select" name="codigoPais" className="w-[100%] p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field  " >
            <option value="">+</option>
            <option value="52">México (+52)</option>
            <option value="54">Argentina (+54)</option>
            <option value="55">Brasil (+55)</option>
            <option value="56">Chile (+56)</option>
            <option value="57">Colombia (+57)</option>
            <option value="58">Venezuela (+58)</option>
          </Field>
          <ErrorMessage name="codigoPais" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-[21%]">
          <Field name="numeroCelular"  className="w-full  p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field"  placeholder='Número de Celular'/>
          <ErrorMessage name="numeroCelular" component="div" className="text-red-600 text-sm" />
        </div>
        
        <div className="w-1/3 mx-4">
        <Field name="dni" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Número de DNI' />
        <ErrorMessage name="dni" component="div" className="text-red-600 text-sm" />
      </div>
      <div className="w-1/3">
        <Field name="fechaNacimiento" type="date" placeholder='Fecha de nacimiento' className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field"  />
        <ErrorMessage name="fechaNacimiento" component="div" className="text-red-600 text-sm" />
      </div>
      </div>

      <h1 className="font-sans2">Datos de Localización</h1>

      <div className="flex">
      <div className="w-1/3">
        <label className="block text-gray-700">Sexo</label>
        <div className="flex space-x-4 ">
          <label>
            <Field type="radio" name="sexo" value="masculino" className="mr-2" />
            Masculino
          </label>
          <label>
            <Field type="radio" name="sexo" value="femenino" className="mr-2" />
            Femenino
          </label>
          <label>
            <Field type="radio" name="sexo" value="otro" className="mr-2" />
            Otro
          </label>
        </div>
        <ErrorMessage name="sexo" component="div" className="text-red-600 text-sm" />
      </div>
      <div className="w-1/3 mx-4">
        <Field as="select" className="w-full px-3 py-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field" name="pais" onChange={handleCountryChange}> 
          <option value="">País</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
        </Field>
        <ErrorMessage className="text-red-500 text-sm" name="pais" component="div" />
      </div>

      <div className="w-1/3 ">
        <Field className="w-full px-3 py-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field" name="codigoPostal" value={values.codigoPostal} onChange={handlePostCodeChange} placeholder='Código Postal'/>
        <ErrorMessage className="text-red-500 text-sm" name="codigoPostal" component="div" />
      </div>
      </div>
      <div  className="flex" >
        <div className="w-1/3 ">
          <Field as="select" className="w-full px-3 py-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field" name="estado">
            <option value="">Provincia</option>
            <option value={state}>{toLowerFunction(state)}</option>
          </Field>
          <ErrorMessage className="text-red-500 text-sm" name="estado" component="div" />
        </div>
        <div className="w-1/3 mx-4">
          <Field as="select" name="localidad" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" >
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
          <div className="w-1/3 ">
            <Field name="domicilio" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Domicilio' />
            <ErrorMessage name="domicilio" component="div" className="text-red-600 text-sm" />
          </div>
      </div>

      <h1 className="font-sans2">Datos del cuerpo humano</h1>
 

      <div className="flex space-x-4">
        <div className="w-1/3 flex">
        <div className="w-1/2">
          <Field name="altura" type='number' className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Altura' />
          <ErrorMessage name="altura" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/2">
          <Field name="peso" type='number' className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Peso' />
          <ErrorMessage name="peso" component="div" className="text-red-600 text-sm" />
        </div>          
        </div>

      <div className="flex space-x-4 w-2/3">
        <div className="w-1/2 ">
          <Field as="select" name="grupoSanguineo" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field">
            <option value="">Grupo Sanguíneo</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </Field>
          <ErrorMessage name="grupoSanguineo" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/2">
          <Field as="select" name="factor" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field">
            <option value="">Factor</option>
            <option value="positivo">Positivo</option>
            <option value="negativo">Negativo</option>
          </Field>
          <ErrorMessage name="factor" component="div" className="text-red-600 text-sm" />
        </div>
      </div>
      </div>
    <div className="flex  space-x-4 ">   
      <div className="w-1/2">
        <Field name="password" type="password" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Contraseña' />
        <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
      </div>
      <div className="w-1/2">
        <Field name="confirmarPassword" type="password" className="w-full  p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Confirmación de contraseña' />
        <ErrorMessage name="confirmarPassword" component="div" className="text-red-600 text-sm" />
      </div>
    </div>



  </>
    )
}


export default UserInfo;