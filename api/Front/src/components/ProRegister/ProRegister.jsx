import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PersonalInfo from './PersonalInfo';
import ProfesionalInfo from './ProfesionalInfo';
import StepIndicator from '../Utils/step';
import MedicConsultInfo from './MedicConsult';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { obrasArray } from './MedicConsult';
import { email } from '../Utils/emails';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  //Personal Info
  name: Yup.string().required('Ingrese un name'),
  lastname: Yup.string().required('Ingrese un lastname'),
  mail: Yup.string().email('Email inválido').required('Ingrese un mail')
  .test('mail-exists', 'Este mail ya está en uso', function (value) {
    return !email.includes(value);
  }),
  codigoPais: Yup.string().required('Ingrese un Codigo de pais'),
  phone: Yup.string().required('Ingrese un Numero de celular ')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  gender: Yup.string().required('Elija una opcion'),
  location: Yup.string().required('Seleccione una location'),
  country_name: Yup.string().required('Ingrese un country_name '),
  province_name: Yup.string().required('Ingrese un Estado/Provincia/Región '),
  area_code: Yup.string().required('Ingrese el codigo postal '),
  office_address: Yup.string().required('Ingrese el domicilio '),
  dni: Yup.string().required('Ingrese el DNI')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  birthdate: Yup.date(),
   profile_picture: Yup.mixed().required('Ingrese una foto de perfil'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
  confirmarPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
  .required('Ingrese la contraseña '),
  //ProfesionalInfo
  specialty: Yup.string().required('La especialización es obligatoria'),
  tuition: Yup.string().required('El número de matrícula es obligatorio')
  .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
  certification: Yup.mixed().required('El certificado profesional es obligatorio'),
  year_experience: Yup.string().required('Los años de year_experience son obligatorios'),
    university: Yup.string().required('La universidad es obligatoria'),
    date_of_graduation: Yup.number()
    .typeError('Debe ser un número')
    .required('El año de egreso es obligatorio')
    .min(1960, 'Debe ser un año válido')
    .max(new Date().getFullYear(), 'No puede ser un año futuro'),
    especialidadType: Yup.string().required('El tipo de especialidad es obligatoria'),
    experiencias: Yup.array().of(
      Yup.object().shape({
        cargo: Yup.string().required('El cargo es obligatorio'),
        lugar: Yup.string().required('El lugar es obligatorio'),
        Fechainicio: Yup.date()
          .typeError('Debe ser una fecha válida')
          .required('La fecha de inicio es obligatoria'),
        FechaFinal: Yup.date()
          .typeError('Debe ser una fecha válida')
          .nullable()
          .test('is-required-if-not-current', 'La fecha de finalización es obligatoria si no trabajas actualmente', function(value) {
            const { actualmente } = this.parent;
            return actualmente === 'No' ? value != null : true;
          })
          .test('is-after-start-date', 'La fecha de finalización debe ser posterior a la fecha de inicio', function(value) {
            const { Fechainicio, actualmente } = this.parent; 
            if (actualmente === 'Si') {
              return true;
            }
            return value && Fechainicio ? new Date(value) > new Date(Fechainicio) : true;
          }),
        actualmente: Yup.string().required('Este campo es obligatorio'),
      })
    ).max(3, 'Solo se pueden añadir hasta 3 experiencias laborales'),
    
    //MedicConsult
    consults:  Yup.array().of(
      Yup.object().shape({
        
        tipoConsulta: Yup.string().required('Selecciona un tipo de consulta').strict(),
        costoConsultaVirtual: Yup.number()
        .typeError('Debe ser un número')
        .test('is-required-virtual', 'Este campo es obligatorio', function(value) {
          const tipoConsulta = this.parent.tipoConsulta;
          return tipoConsulta === 'virtual' || tipoConsulta === 'ambas' ? !!value : true;
        }),
        days: Yup.array().of(Yup.string()).min(1, 'Selecciona al menos un dia de la semana'),
        startHour: Yup.string().required('Selecciona la hora de inicio'),
        finishHour: Yup.string().required('Selecciona la hora final'),
        
      costoConsultaPresencial: Yup.number()
        .typeError('Debe ser un número')
        .test('is-required-presencial', 'Este campo es obligatorio ', function(value) {
          const tipoConsulta = this.parent.tipoConsulta;
          return tipoConsulta === 'presencial' || tipoConsulta === 'ambas' ? !!value : true;
        }),
      
      consultaDuracion: Yup.string().required('Selecciona la duración de la consulta'),
      tipoPacientes: Yup.array().of(Yup.string()).min(1, 'Selecciona al menos un tipo de paciente'),
      metodoCobro: Yup.array()
      .of(Yup.string())
      .test('metodo-cobro-required', 'Selecciona al menos un método de cobro', function (value) {
        return value && value.length > 0;
      }),
        obraSocial: Yup.array().test('obra-social-required', 'Selecciona al menos una obra social válida', function(value) {
        const metodoCobro = this.parent.metodoCobro;
        const isObraSocialSelected = metodoCobro && metodoCobro.includes('obraSocial');
        const obraSocialValue = this.parent.obraSocial;
      
        if (isObraSocialSelected && Array.isArray(obraSocialValue)) {
          // Verifica si al menos uno de los elementos del array obraSocialValue está incluido en obrasArray
          const containsValidOption = obraSocialValue.some(option => obrasArray.includes(option));
          return containsValidOption;
        }
        return true; // No es necesario validar si no está seleccionada la obra social
      }),
    
        numeroCuenta: Yup.string().test('numero-cuenta-required', 'Ingresa el número de cuenta', function(value) {
          const metodoCobro = this.parent.metodoCobro;
          if (metodoCobro && metodoCobro.includes('transferencia')) {
            return !!value;
          }
          return true; 
        })
        .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
      nameTitular: Yup.string().test('name-titular-required', 'Ingresa el name del titular de la cuenta', function(value) {
          const metodoCobro = this.parent.metodoCobro;
          if (metodoCobro && metodoCobro.includes('transferencia')) {
            return !!value;
          }
          return true; 
        }),
      cvuAlias: Yup.string().test('cvu-alias-required', 'Ingresa el CVU o alias', function(value) {
          const metodoCobro = this.parent.metodoCobro;
          if (metodoCobro && metodoCobro.includes('transferencia')) {
            return !!value;
          }
          return true; 
        })
        .matches(/^[0-9]*$/, "No se permiten letras ni caracteres especiales"),
        efectivo: Yup.array().test('efectivo-required', 'Selecciona al menos una forma de pago válida', function(value) {
        const metodoCobro = this.parent.metodoCobro;
        const isefectivoSelected = metodoCobro && metodoCobro.includes('efectivo');
        const efectivoValue = this.parent.efectivo;
      
        if (isefectivoSelected && Array.isArray(efectivoValue)) {
          // Verifica si al menos uno de los elementos del array obraSocialValue está incluido en obrasArray
          const containsValidOption = efectivoValue.some(option => ['Pago Facil', 'Rapipago'].includes(option));
          return containsValidOption;
        }
        return true; // No es necesario validar si no está seleccionada la obra social
        }),
        })
        ).max(10),
        
        consentimiento: Yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones'),
        });
        
        const ProRegister = () => {
            const navigate = useNavigate()
            const handleNext = () => setStep(step + 1);
            const handlePrevious = () => setStep(step - 1);
            const handleSubmit = () => setSubmit(true)
            const [step, setStep] = useState(1);
            const [submit, setSubmit] = useState(false);

console.log(localStorage.getItem('doctor'));
  return (
    <div > 

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
          dni: '',
          birthdate: '',
          // doctor
          office_address: '',
           profile_picture: null,
          specialty: '',
          tuition: '',
          certification: null,
          year_experience: '',
          university: '',
          date_of_graduation: '',
          especialidadType: '',
          consentimiento: false,
          //otros entitys
          experiencias: [],
          consults:[],

        }}
        validationSchema={SignupSchema}
        
        onSubmit={(values, { setSubmitting }) => {
          if (submit && step === 3) {
            localStorage.setItem('doctor', JSON.stringify(values))
            alert('guardado en local storage')
            const formData = new FormData();
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
              dni: values.dni,
              birthdate: values.birthdate,
            };
        
            formData.append('office_address', values.office_address);
            formData.append('profile_picture', values.profile_picture);
            formData.append('specialty', values.specialty);
            formData.append('tuition', values.tuition);
            formData.append('certification', values.certification);
            formData.append('year_experience', values.year_experience);
            formData.append('university', values.university);
            formData.append('date_of_graduation', values.date_of_graduation);
            formData.append('office_province', values.province_name);
        
            try {
              axios
                .post('http://localhost:8080/auth/register/user', user)
                .then((response) => {
                  formData.append('id_user', response.data.id_user);
                  return axios.post('http://localhost:8080/auth/register/doctor', formData);
                })
                .then((response) => {
                  const id_doctor = response.data.id_doctor;
        
                  const workExperiencePromises = values.experiencias.map((experiencia) => {
                    const workExperience = {
                      charge: experiencia.cargo,
                      company: experiencia.lugar,
                      since: experiencia.Fechainicio,
                      until: experiencia.FechaFinal,
                      current_job: experiencia.actualmente == 'No' ? false : true,
                      doctor: {
                        id_doctor: id_doctor
                      }
                    };
                    return axios.post('http://localhost:8080/auth/register/work_experience', workExperience);
                  });
        
                  return Promise.all(workExperiencePromises).then(() => id_doctor);
                })
                .then((id_doctor) => {
                  const consultationDataPromises = values.consults.map((consult) => {
                    const consultationData = {
                      days: consult.days.join(','),
                      cost: consult.tipoConsulta === 'virtual' ? consult.costoConsultaVirtual : consult.costoConsultaPresencial,
                      mode: consult.tipoConsulta === 'virtual' ? "true" : "false",
                      duration: consult.consultaDuracion,
                      since: consult.startHour,
                      until: consult.finishHour,
                      pay_method: consult.metodoCobro.join(','),
                      type_of_patient: consult.tipoPacientes.join(','),
                      social_work: consult.obraSocial,
                      account_number: consult.numeroCuenta,
                      account_name: consult.nameTitular,
                      cvu: consult.cvuAlias,
                      doctor: {
                        id_doctor: id_doctor
                      },
                      cash: consult.efectivo.lenght > 0 ? "true" : "false"
                    };
                   
                    return axios.post('http://localhost:8080/auth/register/consultation_data', consultationData);
                    
                  });
        
                  return Promise.all(consultationDataPromises);
                })
                .then(() => {
                  Swal.fire('Registrado correctamente', '', 'success');
                 navigate('/')
                })
                .catch((error) => {
                  alert(`Error al registrar el usuario:`);
                  console.log ('todo ok', error.response, error.message)
                })
                .finally(() => {
                  setSubmitting(false);
                  setSubmit(false);
                });
            } catch (error) {
              alert('Error al registrar el usuario:', error);
              setSubmitting(false);
              setSubmit(false);
            }
          } else {
            return;
          }
        }}
        
        
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4" encType='multipart/form-data'>
            {step === 1 && <PersonalInfo  setFieldValue={setFieldValue} />}
            {step === 2 && <ProfesionalInfo  setFieldValue={setFieldValue} />}
            {step === 3 && <MedicConsultInfo  setFieldValue={setFieldValue} />}
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
              {step < 3 ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-[#407BFF] rounded-[30px] text-white"
                  onClick={handleNext}
                >
                  Continuar
                </button>
              ) : (<>                <button
                  type="submit"
                  className="px-10 py-2 bg-[#407BFF] rounded-[30px] text-white "
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
 </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};

export default ProRegister;
