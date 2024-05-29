import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { email } from "./Utils/emails";

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

const Login = () =>{
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = () => setSubmit(true)


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg ">
            <div className=" w-full justify-center flex p-5">
            <h2 className="text-xl font-bold">Iniciar Sesion</h2>
            </div>

            <Formik 
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if(submit){
                      console.log(values);
                      navigate('/')
                    } else return 
                  }}
            >
                <Form className="w-full">
                    <div>
                    <label>Correo electrónico</label>
                    <Field name="email" type="email" className="w-full p-2 border rounded-md" />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                    <label>Contraseña</label>
                    <Field name="password" type="password" className="w-full p-2 border rounded-md"  />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="justify-center flex pt-10">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                        onClick={handleSubmit}
                        >
                        Enviar
                    </button>                        
                    </div>

                </Form>

            </Formik>
        </div>
    )
}

export default Login