import React, { useEffect, useState } from 'react';
import { consultations } from '../Utils/doctorConsultation'; 
import { experiencies } from '../Utils/experience';
import { users } from '../Utils/User';
import { IoMdStar, IoIosSearch } from "react-icons/io";
import { RiMoneyDollarCircleFill,RiGraduationCapFill } from "react-icons/ri";
import { HiVideoCamera, HiIdentification } from "react-icons/hi2";
import { FaMapMarkerAlt, FaClock  } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { LuStethoscope } from "react-icons/lu";
import { PiHospitalFill } from "react-icons/pi";
import { TbNurse } from "react-icons/tb";
import { Form, Formik  } from 'formik';
import { GoArrowRight } from "react-icons/go";
import Swal from 'sweetalert2'  
import axios from 'axios'

const DetailList = ({detail, isSticky, setCertification,certification }) => {
  const [promedioReviews, setPromedioReviews] = useState(null);
  const [doctorConsultations, setDoctorConsultations] = useState([]);
  const [consultation, setConsultation] =useState({})
  const [prices, setPrices] = useState({ virtual: [], presencial: [] });
  const [user, setUser] = useState({})
  const [experiencie, setExperiencie] = useState([])
  const [virtualDays, setVirtualDays] = useState([])
  const [presencialDays, setPresencialDays] = useState([])
  const [submit, setSubmit] = useState(false)
  const [virtualHours, setVirtualHours] = useState([])
  const [presencialHours, setPresencialHours] = useState([])

    useEffect(() => {
        const calculateReview = () => {
          const reviews = detail.reviews;
          if (reviews.length > 0) {
            const suma = reviews.reduce((total, calificacion) => total + calificacion, 0);
            const promedio = suma / reviews.length;
            setPromedioReviews(promedio.toFixed(1)); 
          } else {
            setPromedioReviews(null); 
          }
        };
    
        const filterConsultations = () => {
          const filteredConsultations = consultations.filter(
            consultation => consultation.fk_id_doctor === detail.id_doctor
          );
          setDoctorConsultations(filteredConsultations);
        };
    
        const filterUser = () => {
          const filterUser = users.filter(
            user => user.id_user == detail.id_user
          );
          setUser(filterUser[0]);
        };
    
        const filterExperiencies = () => {
          const filterExp = experiencies.filter(
            exp => exp.id_work_experience_by_doctor == detail.id_doctor
          );
          setExperiencie(filterExp);
        };



    
        calculateReview();
        filterConsultations();
        filterUser()
        filterExperiencies()
      }, [  detail]);


      useEffect(() => {
        if (doctorConsultations.length > 0) {
          const combinedConsultation = doctorConsultations.reduce((acc, curr) => {
            acc.speciality = Array.from(new Set([...(acc.speciality || []), ...curr.speciality]));
            acc.pay_method = Array.from(new Set([...(acc.pay_method || []), ...curr.pay_method]));
            acc.days = Array.from(new Set([...(acc.days || []), ...curr.days]));
            acc.mode = Array.from(new Set([...(acc.mode || []), curr.mode]));
            return acc;
          }, {});
          setConsultation(combinedConsultation);
    
          const virtualPrices = doctorConsultations.filter(c => c.mode === 'Virtual').map(c => c.cost);
          const PresencialPrices = doctorConsultations.filter(c => c.mode === 'Presencial').map(c => c.cost);
          setPrices({ virtual: virtualPrices, presencial: PresencialPrices });
        }
        const handleDays = ()=>{
          doctorConsultations.map( cons => {
            cons.mode === 'Virtual' ? setVirtualDays(getDatesForDays(cons.days))  : setPresencialDays(getDatesForDays(cons.days))
          })
        }
        handleDays()
        
        const handleHours = ()=>{
          doctorConsultations.map( cons => {
            cons.mode === 'Virtual' ? setVirtualHours(generateIntermediateHours(cons.since, cons.until))  : setPresencialHours(generateIntermediateHours(cons.since, cons.until))
          })
        }

        handleHours()

      }, [doctorConsultations]);


      

      const fullStars = () => {
        const star = [];
        for (let i = 1; i <= 5; i++) {
          i <= promedioReviews
            ? star.push(
                <span>
                  <IoMdStar className=" text-blue-40 " />
                </span>
              )
            : star.push(
                <span>
                  <IoMdStar className=" text-black " />
                </span>
              );
        }
        return star;
      };

      const handleCertification = ()=>{
        setCertification(!certification)
      }

      function generateIntermediateHours(start, end) {
        let startTime = new Date(`1970-01-01T${start}:00`);
        let endTime = new Date(`1970-01-01T${end}:00`);
      
        let hours = [];
      
        while (startTime < endTime) {
          let hoursString = startTime.toTimeString().slice(0, 5);
          hours.push(hoursString);
      
          startTime.setHours(startTime.getHours() + 1);
        }
      
      
        return hours;
      }

      function getDatesForDays(days) {
        const daysOfWeek = {
          "Lunes": 1,
          "Martes": 2,
          "Miércoles": 3,
          "Jueves": 4,
          "Viernes": 5,
          "Sábado": 6,
          "Domingo": 0
        };
      
        const today = new Date();
        const currentDay = today.getDay();
        const currentDate = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
      
        return days.map(day => {
          const targetDay = daysOfWeek[day];
          const diff = (targetDay + 7 - currentDay) % 7;
          const targetDate = new Date(today);
          targetDate.setDate(currentDate + diff);
      
          const formattedDate = `${String(targetDate.getDate()).padStart(2, '0')}-${String(targetDate.getMonth() + 1).padStart(2, '0')}`;
      
          return {
            day,
            date: formattedDate
          };
        });
      }
      const handleSubmit = () => setSubmit(true)



const showErrorAlert = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: 'Por favor, completa todos los campos.',
    background: '#DDFC5C',
    toast: true,
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'swal2-smaller-popup', 
      timerProgressBar: 'swal2-timer-bar',
    }
  });
};

const styles = `
  .swal2-smaller-popup {
    width: 250px !important;
    padding: 1rem !important;
    font-size: 0.875rem !important;
  }
  .swal2-timer-bar {
    background-color: #9AB8FB !important;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

      
  return (
    <div key={detail.id_doctor}>

        {
            !detail && (
                <div>
                    <p>Cargando...</p>
                </div>
            )
        }
        {
            detail && (
                <div className={`bg-white font-sans2 p-16 space-y-4 ${isSticky ? 'sticky top-0  h-[850px]' : 'h-[850px]'}  shadow-doctor-list`}>
                    <h1 className='font-bold text-3xl'> Dr. {user.name} {user.lastname}</h1>
                    <div className='flex space-x-2 mt-2 items-center'>
                        <h1 className='text-[rgba(102,102,102,1)] text-base mr-6'> {detail.specialty} </h1>
                               <p className='flex'> {fullStars()}</p>
                        {
                          detail.reviews.length > 0 && detail.reviews.length !=  1  && (
                            <p className='text-sm  bg-[#D9D9D9] rounded-[3px] text-black px-1'>{detail.reviews.length} opiniones</p>
                          )
                        }
                        {
                          detail.reviews.length === 1 && (
                            <p className='text-sm  bg-[#D9D9D9] rounded-[3px] text-black px-1'>{detail.reviews.length} opinion</p>
                          )
                        }
                    </div>
                    <div className='w-full flex mt-8'>
                      <div className='flex flex-col  w-1/2 justify-start text-xs space-y-2'   >
                        <p className="text-[rgba(147,147,147,1)] flex items-center"><FaMapMarkerAlt className='mr-2 text-[rgba(35,38,47,1)]' />{detail.officeAddress}, {detail.officeProvince}</p>
                        <p className="text-[rgba(147,147,147,1)] flex items-center"><MdPeople className='mr-2 text-[rgba(35,38,47,1)] ' /> {consultation.speciality?.join(', ')}</p>
                        <p className="text-[rgba(147,147,147,1)] flex items-center"><RiMoneyDollarCircleFill className='mr-2 text-[rgba(35,38,47,1)]' />{consultation.pay_method?.join(', ')}</p>
                      </div>
                      <div className='w-1/2 flex  justify-end  '>
                      <div className='flex-col space-y-2'>
                        {
                          consultation?.mode?.includes("Virtual") && (
                            <div className='flex h-1/2 items-center justify-center space-x-2 '>
                              <p className='text-[#666666] text-xs'> ${prices?.virtual}</p>
                              <p className='flex space-x-2 bg-[#CCDCFF] rounded-[6px] p-1' ><HiVideoCamera className='text-xl '  /> </p>
                            </div>
                          )
                        }
                        {
                          consultation?.mode?.includes("Presencial") && (
                            <div className='flex h-1/2 items-center justify-center space-x-2 '>
                              <p className='text-[#666666] text-xs'> ${prices?.presencial}</p>
                              <p className='flex space-x-2 bg-[#F3FFC2] rounded-[6px] p-1' ><MdPeople  className='text-xl ' /> </p>
                            </div>
                          )
                        }

                      </div>
                      </div>
                    </div>
                    <div className='bg-[#F1F5FF] flex rounded-[10px] h-1/6'>
                      <div className='w-1/2 flex flex-col space-y-2 p-4'>
                        <p className='flex text-sm'><HiIdentification className='mr-2 text-lg' /> M.N {detail.tuition}</p>
                        <p className='flex text-sm'><LuStethoscope className='mr-2 text-lg'/>{detail.year_experience} años de experiencia</p>
                        <p className='flex text-sm'><RiGraduationCapFill className='mr-2 text-lg'/>{detail.university}</p>
                      </div>
                      <div className='flex justify-end items-center w-1/2'>
                          <button type='button' onClick={() => handleCertification()} className='relative  items-center'>
                              <img src={detail.certification} className='h-[50px] m-6 opacity-[0.8] border rounded-[5px ] border-[#23262F2B] border-opacity-15' alt="certification" />
                              <IoIosSearch className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400' />
                          </button>
                      </div>
                    </div>
                      {
                        experiencie?.length >0 && (
                          <div className='bg-[rgba(243,255,194,0.24)] p-2 rounded-[10px] space-y-2 overflow-y-scroll h-1/6'>
                            <p className='text-[rgba(152,149,149,1)]'>Experiencia</p>
                            {
                              experiencie.map((exp, index) => (
                                <div className='flex items-center space-x-4 bg-[rgba(255,255,255,1)] rounded-[10px] w-full' key={index}>
                                  <p className='flex p-2 w-3/6  items-center' ><PiHospitalFill className='mr-2' />{exp.company}</p>
                                  <p className='flex p-2 w-3/12 items-center ' ><TbNurse className='mr-2' />{exp.charge}</p>
                                  <p className='flex p-2 w-3/12 items-center  ' ><FaClock className='mr-2' />{exp.since.slice(6)}-{exp.current_job === "No" ? exp.until.slice(6)   : "2024"  }</p>
                                </div>
                              )
                            )}

                          </div>
                        )
                      }
                      <div className='p-2 m-2'>
                        <h1 className='font-medium text-xl'>Solicitar Turno</h1>
                        <Formik
                        initialValues={{
                          mode: "",
                          day: "",
                          hour: "",
                          speciality: ""
                        }}
                        onSubmit={(values) => {
                          if (submit) {
                            const hasEmptyFields = (obj) => {
                              for (let key in obj) {
                                if (obj[key].trim() === '') {
                                  return true;
                                }
                              }
                              return false;
                            };
                        
                            if (hasEmptyFields(values)) {
                              showErrorAlert();
                              return; 
                            }

                            Swal.fire({
                              title: '¿Estás seguro de guardar los cambios realizados?',
                              showDenyButton: false,
                              showCancelButton: true,
                              confirmButtonText: 'Yes',
                              denyButtonText: 'No',
                              width:   '900px' ,
                              
                              customClass: {
                                actions: 'my-actions',
                                cancelButton: 'order-1 right-gap',
                                confirmButton: 'order-2',
                                denyButton: 'order-3',
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                try {
                                  axios.post(`http://localhost:8080//api/medical-consultations/schedule` , values)
                                  .then((response) => 
                                    Swal.fire('Turno Solicitado!', '', 'success')
                                  )
                                  
                                } catch (error) {
                                  alert('Error al agendar consulta')
                                }
                              } 
                            })
                            console.log(values);
                            setSubmit(false);
                          }
                        }}
                        
                        >
                          {({ setFieldValue, values }) => (
                            <Form>
                              <div className='flex space-x-2 mt-4 flex-col'>
                                <div className='w-4/6 space-x-4 flex h-1/3'>
                                {consultation?.mode?.includes("Virtual") && (
                                  <button
                                  type='button'
                                  className={`p-1 w-1/2 rounded ${values.mode === 'Virtual' && values.mode != '' ? 'bg-blue-sec text-black' : 'bg-gray-sec text-[rgba(147,147,147,1)]'}`}
                                  onClick={() => setFieldValue('mode', 'Virtual')}
                                  >
                                    Virtual
                                  </button>

                                )}
                                {consultation?.mode?.includes("Presencial") && (
                                  <button
                                  type='button'
                                  className={`p-1 w-1/2 rounded ${values.mode === 'Presencial' && values.mode != '' ? 'bg-blue-sec text-black' : 'bg-gray-sec text-[rgba(147,147,147,1)]'}`}
                                  onClick={() => setFieldValue('mode', 'Presencial')}
                                  >
                                    Presencial
                                  </button>
                                )}
                              </div>
                              <div className='flex space-x-4 m-4 h-1/3 text-black font-medium'>
                                <div className='flex overflow-x-scroll w-1/2 flex-col'>
                                  <h1 className='text-[rgba(102,102,102,1)]'>Día del turno</h1>
                                  <div className='flex space-x-4'>
                                  {
                                     values?.mode?.includes("Virtual") && virtualDays?.map((virtual,index)=> (
                                      <button type='button'  key={index} onClick={() => setFieldValue('day', virtual.date)}
                                      className={` ${values.day === virtual.date ?  'bg-blue-sec' : 'bg-gray-sec '}    rounded-[6px] px-2 py-[2px] flex flex-col items-center m-2`}>
                                        <p className='text-[10px] ' > {virtual.day}</p>
                                        <p className='text-xs'>{virtual.date}</p>
                                      </button>
                                      ))
                                  }
                                  {
                                    values?.mode?.includes("Presencial") && presencialDays.map((presencial,index) => (
                                      <button type='button'  key={index} onClick={() => setFieldValue('day', presencial.date)}
                                      className={` ${values.day === presencial.date ?  'bg-blue-sec' : 'bg-gray-sec '}    rounded-[6px] px-2 py-[2px] flex flex-col items-center m-2`}>
                                        <p className='text-[10px] ' > {presencial.day}</p>
                                        <p className='text-xs'>{presencial.date}</p>
                                      </button>
                                      ))
                                  }
                                  </div>
                                </div>
                                <div className='flex flex-col overflow-x-scroll w-1/2'>
                                  <h1 className='text-[rgba(102,102,102,1)]'>Hora del turno</h1>
                                  <div className='flex'>
                                  {
                                    values?.mode?.includes("Virtual") && virtualHours.map((hour, index) => (
                                      <div>
                                       <button type='button'  key={index} onClick={() => setFieldValue('hour', hour )}
                                          className={` ${values.hour === hour ?  'bg-blue-sec' : 'bg-gray-sec '}    rounded-[6px] px-2 py-[2px] flex flex-col items-center m-2`}>
                                        {hour}
                                          </button>
                                      </div>
                                    ))
                                  }
                                  {
                                   values?.mode?.includes("Presencial") && presencialHours.map((hour, index) => (
                                      <div>
                                       <button type='button'  key={index} onClick={() => setFieldValue('hour', hour )}
                                          className={` ${values.hour === hour ?  'bg-blue-sec' : 'bg-gray-sec '}    rounded-[6px] px-2 py-[2px] flex flex-col items-center m-2`}>
                                        {hour}
                                          </button>
                                      </div>
                                    ))
                                  }
                                  </div>
                                </div>
                                </div>
                                <div className='h-1/3'>
                                <h1 className='text-[rgba(102,102,102,1)]'>Tipo de pacientes</h1>
                                <div className='flex space-x-2'> 
                                  {
                                    consultation?.speciality?.map((pacient, index) => (
                                      <button type='button'  key={index} onClick={() => setFieldValue('speciality', pacient)}
                                        className={` ${values.speciality === pacient ?  'bg-blue-sec' : 'bg-gray-sec '}    rounded-[6px] px-2 py-[2px] flex flex-col items-center m-2`}
                                      >
                                        {pacient}
                                      </button >
                                    ))
                                    }
                                </div>
                                </div>
                                <div className='w-full flex items-center justify-end '>
                                  <button type='submit' onClick={() => handleSubmit()}
                                    className='flex items-center space-x-2 bg-green-sec rounded-[38px] px-4 py-2'
                                    >
                                    <p>Solicitar</p> < GoArrowRight />
                                  </button>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      
                      </div>

                </div>  
            )
        }

    </div>

  )
}

export default DetailList

