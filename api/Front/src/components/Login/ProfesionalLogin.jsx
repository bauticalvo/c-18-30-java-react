import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { email } from "../Utils/emails";
import axios from 'axios'
import Swal from 'sweetalert2'  


const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Ingrese un email')
    .test('email-exists', 'Este email ya está en uso', function (value) {
      return !email.includes(value);
    }),
    password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
});

const Login = () => {
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => setSubmit(true);

    return (
        <div className="h-90vh w-full flex p-16 justify-center items-center ">
            <div className=" w-2/3 h-2/3 p-20 border  border-[#407BFF33] border-opacity-20 shadow-login-div rounded-[40px]  ">
                <div className="text-center mb-14 font-sans">
                    <h2 className=" text-4xl font-semibold">Iniciar sesión</h2>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={ async (values) => {
                        if (submit) {
                            try {
                                const response = await axios.post('http://localhost:8080/auth/login/user', {
                                    username: values.email, 
                                    password: values.password 
                                });
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Inicio de sesion exitoso!',
                                    background: '#a5dc86',
                                })
                                localStorage.setItem('token_user', JSON.stringify(response.data))
                            } catch (error) {
                                alert('No se logro iniciar sesion ')
                            }
                            console.log(values);
                        }
                    }}
                >
                    <Form className="space-y-6 flex flex-col items-center ">
                        <div className="flex items-center justify-normal w-4/6">
                            <Field 
                                name="email" 
                                type="email" 
                                placeholder='Email'
                                className=" w-full  px-6 py-6 border border-gray-300 rounded-[40px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="flex items-center justify-normal w-4/6">
                            <Field 
                                name="password" 
                                type="password" 
                                placeholder='Contraseña'
                                className=" w-full  px-6 py-6  border border-gray-300 rounded-[40px]  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 

                            />
                            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="flex w-4/6  items-end justify-end">
                            <button
                                type="submit"
                                className="w-1/3 px-3 py-2  border border-transparent rounded-[45px] shadow-sm font-medium text-white bg-blue-40 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={handleSubmit}
                            >
                                Ingresar
                            </button>
                        </div>
                    </Form>
                </Formik>
                <div className="mt-10 text-center">
                    <p className="text-sm text-black font-sans2 ">
                        ¿Olvidaste tu contraseña? <a href="#" className="text-blue-40 hover:text-blue-500 font-sans2">Genera una nueva</a>
                    </p>
                    <p className="mt-2 text-sm text-black font-sans2">
                        ¿Todavía no tienes una cuenta? <a href="/profesionalRegister" className="text-blue-40 hover:text-blue-500 font-sans2">¡Regístrate ahora!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
