import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const UserInfo = ({setFieldValue}) =>{

  const [places, setPlaces] = useState([])
  const [postCode, setPostCode] = useState('')
  const [state, setState] = useState('')
  const [status, setStatus] = useState(false)
  const {  values } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false)
  const [activeS, setActiveS] = useState(false);
  const [bornDate, setBornDate] = useState(false);



  const handlePostCodeChange = (e) => {
    const { value } = e.target;
    setFieldValue('area_code', value);
    setPostCode(value)
  };

useEffect(() => {
  if (postCode.length >= 4   ) {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.zippopotam.us/AR/${postCode}`);
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
}, [postCode]);

  const toLowerFunction = (name) =>{
    const aux = name.slice(1).toLowerCase()
    return name[0] + aux
  }

  const handleShowPassword = ()=>{
    showPassword ? setShowPassword(false) : setShowPassword(true)
  }
  const handleActive = () => {
    setActiveS(!activeS);
  };
  const handleBornDate = () => {
    setBornDate(!bornDate);
  };

return(
  <>
    <h1 className="font-sans2  my-4  border-b-2 border-b-[rgba(64,123,255,0.4)] text-black ">Datos de contacto</h1>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <Field name="name" className="w-full p-2 border border-[#D9D9D9]  rounded-[34px] shadow-register-field" placeholder='Nombre' />
          <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/3">
          <Field name="lastname" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Apellido' />
          <ErrorMessage name="lastname" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/3">
        <Field name="mail" type="email" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field " placeholder='Correo electrónico'/>
        <ErrorMessage name="mail" component="div" className="text-red-600 text-sm" />
      </div>
        </div>
      <div className="flex space-x-4">
      <div className="w-1/3 flex space-x-4">
        <div className="w-1/6">
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
        <div className="w-5/6">
          <Field name="phone"  className="w-full  p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field"  placeholder='Número de Celular'/>
          <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
        </div>
        </div>
        <div className="w-1/3 mx-4">
        <Field name="DNI" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Número de DNI' />
        <ErrorMessage name="DNI" component="div" className="text-red-600 text-sm" />
      </div>
      <div className="w-1/3">
      {
        !bornDate && (
          <button type='button' onClick={handleBornDate} className='w-full relative flex justify-start items-start '>
            <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] flex  shadow-register-field text-gray-400">Fecha de nacimiento</label>
            <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px]' />
          </button>
        )
      }
      {
        bornDate && (
          <div className="space-y-2">
          <button type='button' onClick={handleBornDate} className='w-full relative flex justify-start items-start'>
            <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] flex  shadow-register-field text-gray-400">Fecha de nacimiento</label>
            <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px]' />
          </button>
          <div>
            <Field name="birthdate" type="date"  className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field"  />
            <ErrorMessage name="birthdate" component="div" className="text-red-600 text-sm" />            
          </div>

          </div>
        )
      }

      </div>
      </div>

      <h1 className="font-sans2  my-4  border-b-2 border-b-[rgba(64,123,255,0.4)] text-black">Datos de Localización</h1>

      <div className="flex">
      <div className="w-1/3 relative">
            {!activeS ? (
              <button type='button' onClick={handleActive} className='w-full relative'>
                <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] flex items-start justify-start shadow-register-field text-gray-400">Sexo</label>
                <IoIosArrowDown className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px]' />
              </button>
            ) : (
              <div className="space-y-2">
                <button type='button' onClick={handleActive} className='w-full relative'>
                  <label className="w-full p-2 border border-[#D9D9D9] rounded-[34px] flex items-start justify-start shadow-register-field text-gray-400">Sexo</label>
                  <IoIosArrowUp className='absolute right-2 top-1/3 text-gray-400 w-[13px] h-[15px]' />
                </button>
                <div className='w-full p-2 border space-x-4 border-[#D9D9D9] rounded-[34px] flex items-center justify-center shadow-register-field text-gray-400'>
                  <label>
                    <Field type="radio" name="gender" value="masculino" className="mr-2" />
                    Masculino
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="femenino" className="mr-2" />
                    Femenino
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="otro" className="mr-2" />
                    Otro
                  </label>
                </div>
              </div>
            )}
            <ErrorMessage name="gender" component="div" className="text-red-600 text-sm" />
          </div>
      <div className="w-1/3 mx-4">
        <Field as="select" className="w-full px-3 py-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field text-gray-400" name="country_name" > 
          <option value="">País</option>
          <option className=" text-black" value="AR">Argentina</option>
        </Field>
        <ErrorMessage className="text-red-500 text-sm" name="country_name" component="div" />
      </div>

      <div className="w-1/3 ">
        <Field className="w-full px-3 py-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field" name="area_code" value={values.codigoPostal} onChange={handlePostCodeChange} placeholder='Código Postal'/>
        <ErrorMessage className="text-red-500 text-sm" name="area_code" component="div" />
      </div>
      </div>
      <div  className="flex" >
        <div className="w-1/3 ">
          <Field as="select" className="w-full px-3 py-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field text-gray-400" name="province_name">
            <option value="">Provincia</option>
            <option className=" text-black" value={state}>{toLowerFunction(state)}</option>
          </Field>
          <ErrorMessage className="text-red-500 text-sm" name="province_name" component="div" />
        </div>
        <div className="w-1/3 mx-4">
          <Field as="select" name="location" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field text-gray-400" >
            <option value="">Localidad</option>
            {places.map((place,index) => (
              <option
              key={index}
              value={place["place name"]}
              className=" text-black"
              >
                {toLowerFunction(place["place name"])}
              </option>
            ))}
          </Field>
          <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
        </div>       
          <div className="w-1/3 ">
            <Field name="domicilio" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Domicilio' />
            <ErrorMessage name="domicilio" component="div" className="text-red-600 text-sm" />
          </div>
      </div>

      <h1 className="font-sans2  my-4  border-b-2 border-b-[rgba(64,123,255,0.4)] text-black">Datos del cuerpo humano</h1>
 

      <div className="flex space-x-4">
        <div className="w-1/3 flex space-x-4">
        <div className="w-1/2">
          <Field name="height" type='number' className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Altura' />
          <ErrorMessage name="height" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/2">
          <Field name="weight" type='number' className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" placeholder='Peso' />
          <ErrorMessage name="weight" component="div" className="text-red-600 text-sm" />
        </div>          
        </div>

      <div className="flex space-x-4 w-2/3">
        <div className="w-1/2 ">
          <Field as="select" name="blood_type" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field text-gray-400">
            <option value="">Grupo Sanguíneo</option>
            <option  className=" text-black" value="A">A</option>
            <option  className=" text-black" value="B">B</option>
            <option  className=" text-black" value="AB">AB</option>
            <option  className=" text-black" value="O">O</option>
          </Field>
          <ErrorMessage name="blood_type" component="div" className="text-red-600 text-sm" />
        </div>
        <div className="w-1/2">
          <Field as="select" name="factor" className="w-full p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field text-gray-400">
            <option value="">Factor</option>
            <option className=" text-black" value="positivo">Positivo</option>
            <option className=" text-black" value="negativo">Negativo</option>
          </Field>
          <ErrorMessage name="factor" component="div" className="text-red-600 text-sm" />
        </div>
      </div>
      </div>
      <div className="flex  space-x-4 ">   
      <div className="w-1/2 relative">
        <div >
        <Field name="password" type={showPassword ? 'text' : 'password'}  placeholder='Contraseña' className="w-full flex items-center justify-between p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field" />
        <button className=" h-[25px] w-[25px] absolute top-2 right-2 " type='button'  onClick={handleShowPassword}>
        {
            !showPassword ? (<IoEyeOffOutline className=" h-full w-full "/> ) : (<IoEyeOutline className=" h-full w-full " />)
        }
        </button>
        </div>
        <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
      </div>
      <div className="w-1/2 relative">
        <div  >
        <Field name="confirmarPassword" type={showPassword ? 'text' : 'password'} placeholder='Confirmación de contraseña'className="w-full flex items-center justify-between p-2 border border-[#D9D9D9] rounded-[34px]  shadow-register-field"  />
        <button className=" h-[25px] w-[25px] absolute top-2 right-2" type='button'  onClick={handleShowPassword}>
        {
            !showPassword ? (<IoEyeOffOutline className=" h-full w-full "  /> ) : (<IoEyeOutline className=" h-full w-full "/>)
        }          
        </button>
        </div>
        <ErrorMessage name="confirmarPassword" component="div" className="text-red-600 text-sm" />
      </div>
    </div>
    



  </>
    )
}


export default UserInfo;