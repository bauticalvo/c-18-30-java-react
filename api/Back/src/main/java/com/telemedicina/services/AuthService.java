package com.telemedicina.services;

import com.telemedicina.entitys.Doctor;
import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.repositorys.DoctorRepository;
import com.telemedicina.repositorys.PatientRepository;
import com.telemedicina.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    UserRepository userRepository;

    public User registerUser (User user){
        return this.userRepository.save(user);
    }

    public Patient registerPatient (Patient patient, Integer id_user){
        Patient patient_db = patientRepository.findByIdPatient(id_user);
        if(patient_db != null) {
            patient.setId_user(id_user);
            return this.patientRepository.save(patient);
        }
        return null;
    }

    public Doctor registerDoctor(Doctor doctor, Integer id_user) {
        Doctor doctor_db = doctorRepository.findByIdDoctor(id_user);
        if (doctor_db != null){
            doctor_db.setId_user(id_user);
            return doctorRepository.save(doctor);
        }
        return null;
    }
}
