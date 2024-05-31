import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserInfo from './UserInfo';
import StepIndicator from '../Utils/step';
import MedicalHistory from './MedicalHistory';
import PaymentUser from './PaymentUser';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { email } from '../Utils/emails';

const validationSchema = Yup.object({
  nombre: Yup.string().required('Ingrese un nombre'),
  apellido: Yup.string().required('Ingrese un apellido'),
  codigoPais: Yup.string().required('Ingrese un código de país'),
  numeroCelular: Yup.string().required('Ingrese un número de celular')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  email: Yup.string().email('Email inválido').required('Ingrese un email')
  .test('email-exists', 'Este email ya está en uso', function (value) {
    return !email.includes(value);
  }),
  dni: Yup.string().required('Ingrese el DNI'),
  fechaNacimiento: Yup.date().required('Ingrese una fecha de nacimiento'),
  sexo: Yup.string().required('Seleccione un sexo'),
  domicilio: Yup.string().required('Ingrese el domicilio'),
  codigoPostal: Yup.string().required('Ingrese el código postal'),
  localidad: Yup.string().required('Seleccione una localidad'),
  provincia: Yup.string().required('Seleccione una provincia'),
  pais: Yup.string().required('Seleccione un país'),
  altura: Yup.number().required('Ingrese la altura'),
  peso: Yup.number().required('Ingrese el peso'),
  grupoSanguineo: Yup.string().required('Seleccione el grupo sanguíneo'),
  factor: Yup.string().required('Seleccione el factor'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
  confirmarPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirme la contraseña'),
  consentimiento: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones'),
  enfermedadesCronicas: Yup.array().of(Yup.string()),
  otrasEnfermedades: Yup.string(),
  cirugiasAnteriores: Yup.string().test('cirugiasAnteriores-required', 'Indique la cirugía', function(value) {
    const { cirugias } = this.parent;
    if (cirugias === 'si') {
      return !!value;
    }
    return true;
  }),
  historiaFamiliar: Yup.array().of(Yup.string()),
  otrasEnfermedadesFamilia: Yup.string(),
  alergias: Yup.array().of(Yup.string()),
  alergiasMedicamentos: Yup.string(),
  alergiasAlimentos: Yup.string(),
  alergiasAmbientales: Yup.string(),
  otrasAlergias: Yup.string(),
  alergiasMedicamentosDescripcion:  Yup.string().test('medicamento-description-required', 'Indique el medicamento', function(value) {
    const { alergiasMedicamentos } = this.parent;
    if (alergiasMedicamentos === 'si') {
      return !!value;
    }
    return true;
  }),
  alergiasAlimentosDescripcion: Yup.string().test('alimentos-description-required', 'Indique el medicamento', function(value) {
    const { alergiasAlimentos } = this.parent;
    if (alergiasAlimentos === 'si') {
      return !!value;
    }
    return true;
  }),
  alergiasAmbientalesDescripcion: Yup.string().test('ambiental-description-required', 'Indique el medicamento', function(value) {
    const { alergiasAmbientales } = this.parent;
    if (alergiasAmbientales === 'si') {
      return !!value;
    }
    return true;
  }),
  otrasAlergiasDescripcion: Yup.string().test('others-description-required', 'Indique el medicamento', function(value) {
    const { otrasAlergias } = this.parent;
    if (otrasAlergias === 'si') {
      return !!value;
    }
    return true;
  }),
  tomaMedicamento: Yup.string(),
  medicamento: Yup.string().test('medicamento-required', 'Indique el medicamento', function(value) {
    const { tomaMedicamento } = this.parent;
    if (tomaMedicamento === 'si') {
      return !!value;
    }
    return true;
  }),

  dosis: Yup.string().test('dosis-required', 'Indique la dosis', function(value) {
    const { tomaMedicamento } = this.parent;
    if (tomaMedicamento === 'si') {
      return !!value;
    }
    return true;
  }),

  frecuencia: Yup.string().test('frecuencia-required', 'Indique la frecuencia', function(value) {
    const { tomaMedicamento } = this.parent;
    if (tomaMedicamento === 'si') {
      return !!value;
    }
    return true;
  }),
  consentimiento: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones'),
  
});

const UserRegister = () => {
    const [step, setStep] = useState(1);
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate()
    
    
    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);
    const handleSubmit = () => {
      setSubmit(true)
    } 
    

  return (
    <div> 
      <p className='flex justify-center mt-6 font-bold text-2xl font-sans2'>Crea tu cuenta</p>
        <div className='  flex  justify-center items-center'>
            <StepIndicator step={step} setStep={setStep} />

        </div>
    <div className=" mx-32 p-6 bg-white">
      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          codigoPais: '',
          numeroCelular: '',
          email: '',
          dni: '',
          fechaNacimiento: '',
          sexo: '',
          domicilio: '',
          codigoPostal: '',
          localidad: '',
          provincia: '',
          pais: '',
          altura: '',
          peso: '',
          grupoSanguineo: '',
          factor: '',
          password: '',
          confirmarPassword: '',
          enfermedadesCronicas: [],
          otrasEnfermedades: '',
          cirugias: '',
          cirugiasAnteriores: '',
          historiaFamiliar: [],
          otrasEnfermedadesFamilia: '',
          alergias: [],
          alergiasMedicamentos: '',
          alergiasAlimentos: '',
          alergiasAmbientales: '',
          otrasAlergias: '',
          tomaMedicamento: '',
          medicamento: '',
          dosis: '',
          frecuencia: '',
          consentimiento: false,
          alergiasMedicamentosDescripcion: '',
          alergiasAlimentosDescripcion: '',
          alergiasAmbientalesDescripcion: '',
          otrasAlergiasDescripcion: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            if(submit && step=== 2){
              Swal.fire({
                title: 'Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Si',
                denyButtonText: 'No',
                cancelButtonText: 'Cancelar',
                customClass: {
                  actions: 'my-actions',
                  cancelButton: 'order-1 right-gap',
                  confirmButton: 'order-2',
                  denyButton: 'order-3',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Guardados!', '', 'success')
                  console.log(values);
                  
                } else if (result.isDenied) {
                  Swal.fire('Para registrarse es necesario guardar los datos', '', 'info')
                }
              })
              //navigate('/')
            } else return 
          }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {step === 1 &&  <UserInfo setFieldValue={setFieldValue} />}
            {step === 2 &&  <MedicalHistory setFieldValue={setFieldValue} values={values} />}
            <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'}`}>
              {step > 1 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={handlePrevious}
                >
                  Anterior
                </button>
              )}
              {step < 2 ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-[#407BFF] rounded-[4px] text-white "
                  onClick={handleNext}
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default UserRegister;
