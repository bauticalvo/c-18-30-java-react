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
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Ingrese un nombre'),
  lastname: Yup.string().required('Ingrese un apellido'),
  codigoPais: Yup.string().required('Ingrese un código de país'),
  phone: Yup.string().required('Ingrese un número de celular')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  mail: Yup.string().email('Email inválido').required('Ingrese un email')
  .test('email-exists', 'Este email ya está en uso', function (value) {
    return !email.includes(value);
  }),
  DNI: Yup.string().required('Ingrese el DNI'),
  birthdate: Yup.date().required('Ingrese una fecha de nacimiento'),
  gender: Yup.string().required('Seleccione un sexo'),
  domicilio: Yup.string().required('Ingrese el domicilio'),
  area_code: Yup.string().required('Ingrese el código postal'),
  location: Yup.string().required('Seleccione una localidad'),
  province_name: Yup.string().required('Seleccione una provincia'),
  country_name: Yup.string().required('Seleccione un país'),
  height: Yup.number().required('Ingrese la altura'),
  weight: Yup.number().required('Ingrese el peso'),
  blood_type: Yup.string().required('Seleccione el grupo sanguíneo'),
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
  enfermedadesCronicas: Yup.array().of(Yup.string()),
  otrasEnfermedades: Yup.string(),
  cirugiasAnteriores: Yup.string().test('cirugiasAnteriores-required', 'Indique la cirugía realizada', function(value) {
    const { cirugias } = this.parent;
    if (cirugias === 'si') {
      return !!value;
    }
    return true;
  }),
  historiaFamiliar: Yup.array().of(Yup.string()),
  otrasEnfermedadesFamilia: Yup.string(),
  alergias: Yup.array().of(Yup.string()).nullable(),
  alergiasMedicamentos: Yup.string().nullable(),
  alergiasAlimentos: Yup.string().nullable(),
  alergiasAmbientales: Yup.string().nullable(),
  otrasAlergias: Yup.string().nullable(),
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
          //user
          name: '',
          lastname: '',
          mail: '',
          codigoPais: '',
          phone: '',
          gender: '',
          location: '',
          country_name: '',
          province_name: '', 
          area_code: '',
          password: '',
          confirmarPassword: '',
          DNI: '',
          birthdate: '',
          domicilio: '',


//patient
          height: '',
          weight: '',
          blood_type: '',
          factor: '',


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
        onSubmit={(values, { setSubmitting }) => {
          if (submit && step === 2) {
            const user = {
              name: values.name,
              lastname: values.lastname,
              mail: values.mail,
              phone: values.phone,
              gender: values.gender,
              location: values.location,
              country_name: values.country_name,
              province_name: values.province_name,
              area_code: values.area_code,
              password: values.password,
              DNI: values.DNI,
              birthdate: values.birthdate,
            };
            axios
              .post(`http://localhost:8080/auth/register/user`, user)
              .then((response) => {
                const id_user = response.data.id_user
                axios.post(`http://localhost:8080/auth/register/patient`, {
                  height: values.height,
                  weight: values.weight,
                  blood_type: values.blood_type,
                  factor: values.factor,
                  id_user: id_user,  
                  alergic: `${values.alergiasAlimentosDescripcion},${values.alergiasMedicamentosDescripcion},${values.alergiasAmbientalesDescripcion},${values.otrasAlergiasDescripcion},`  ,
                  chronic_diseases: !values.enfermedadesCronicas.includes('ninguna') ?  values.enfermedadesCronicas.join(",") : 'Ninguno' ,
                  medicines: values.medicamento === '' ? 'Ninguno' : values.medicamento ,
                  family_history_of_diseases: !values.historiaFamiliar.includes('ninguna') ? values.historiaFamiliar.join(",") : 'Ninguno',
                })
                  .then(() => {
                    Swal.fire('Registrado correctamente', '', 'success');
                    navigate('/')
                  })
                  .catch((error) => {
                    alert('Error al registrar el usuario:', error);
                  });
              })
              .then(() => {
                Swal.fire("Registrado correctamente", "", "success");
                navigate("/");
              })
              .catch((error) => {
                console.error("Error al registrar el usuario:", error);
                alert("Error al registrar el usuario.");
              })
              .finally(() => {
                setSubmitting(false);
                setSubmit(false);
              });
          } else {
            return;
          }
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
                className="px-10 py-2 bg-white text-blue-40 rounded"
                onClick={handlePrevious}
              >
                Anterior
              </button>
              )}
              {step < 2 ? (
                <button
                    type="button"
                    className="px-4 py-2 bg-[#407BFF] rounded-[4px] text-white"
                    onClick={handleNext}
                  >
                    Continuar
                  </button>
                ) : (
                  <>
                  <button
                    type="submit"
                    className="px-10 py-2 bg-[#407BFF] rounded-[4px] text-white "
                    onClick={handleSubmit}
                  >
                    Enviar
              </button></>
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
