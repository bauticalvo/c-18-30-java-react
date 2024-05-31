import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { email } from "../Utils/emails";

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

})

const ProfesionalLogin = () =>{
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = () => setSubmit(true)


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
        <div className="max-w-md w-full  ">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Iniciar sesión</h2>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (submit) {
                        console.log(values);
                    }
                }}
            >
                <Form className="space-y-6">
                    <div>
                        <Field 
                            name="email" 
                            type="email" 
                            placeholder='Email'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    <div>
                        <Field 
                            name="password" 
                            type="password" 
                            placeholder='Contraseña'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                        <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleSubmit}
                        >
                            Ingresar
                        </button>
                    </div>
                </Form>
            </Formik>
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    ¿Olvidaste tu contraseña? <a href="#" className="text-blue-600 hover:text-blue-500">Genera una nueva</a>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                    ¿Todavía no tienes una cuenta? <a href="#" className="text-blue-600 hover:text-blue-500">¡Regístrate ahora!</a>
                </p>
            </div>
        </div>
    </div>
    )
}

export default ProfesionalLogin