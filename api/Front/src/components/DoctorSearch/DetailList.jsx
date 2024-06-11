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

const DetailList = ({detail, isSticky, setCertification,certification }) => {
  const [promedioReviews, setPromedioReviews] = useState(null);
  const [doctorConsultations, setDoctorConsultations] = useState([]);
  const [consultation, setConsultation] =useState({})
  const [prices, setPrices] = useState({ virtual: [], presencial: [] });
  const [user, setUser] = useState({})
  const [experiencie, setExperiencie] = useState([])
  const [virtualDays, setVirtualDays] = useState([])
  const [presencialDays, setPresencialDays] = useState([])
  


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

        const handleDays = ()=>{
          doctorConsultations.map( cons => {
            cons.mode === 'Virtual' ? setVirtualDays(cons.days)  : setPresencialDays(cons.days)
          })
        }

    
        calculateReview();
        filterConsultations();
        filterUser()
        filterExperiencies()
        handleDays()
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
      
          const formattedDate = `${String(targetDate.getDate()).padStart(2, '0')}/${String(targetDate.getMonth() + 1).padStart(2, '0')}/${targetDate.getFullYear()}`;
      
          return {
            day,
            date: formattedDate
          };
        });
      }


      
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
                          time: "",
                          speciality: ""
                        }}
                        >
                          {({ setFieldValue, values }) => (
                            <Form>
                              <div className='flex space-x-2 mt-4 flex-col'>
                                <div className='w-4/6 space-x-4 flex'>
                                {consultation?.mode?.includes("Virtual") && (
                                  <button
                                  type='button'
                                  className={`p-2 w-1/2 rounded ${values.mode === 'Presencial' ? 'bg-[rgba(241,245,255,1)] text-[rgba(147,147,147,1)]' : 'bg-[rgba(154,184,251,1)] text-black'}`}
                                  onClick={() => setFieldValue('mode', 'Virtual')}
                                  >
                                    Virtual
                                  </button>

                                )}
                                {consultation?.mode?.includes("Presencial") && (
                                  <button
                                  type='button'
                                  className={`p-2 w-1/2 rounded ${values.mode === 'Virtual' || values.mode === '' ? 'bg-[rgba(241,245,255,1)] text-[rgba(147,147,147,1)]' : 'bg-[rgba(154,184,251,1)] text-black'}`}
                                  onClick={() => setFieldValue('mode', 'Presencial')}
                                  >
                                    Presencial
                                  </button>
                                )}
                              </div>
                              <div className='flex space-x-4 m-4'>
                                <div className='flex overflow-x-scroll w-1/2 flex-col'>
                                  <h1 className='text-[rgba(102,102,102,1)]'>Día del turno</h1>
                                  <div className='flex space-x-4'>
                                  {
                                    virtualDays &&  virtualDays.map((day,index)=> (
                                      <p key={index}> {day}</p>
                                      
                                      ))
                                      }
                                  </div>
                                </div>
                                <div className='flex overflow-x-scroll w-1/2'>
                                  <h1 className='text-[rgba(102,102,102,1)]'>Hora del turno</h1>

                                </div>
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

