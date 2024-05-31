package com.telemedicina.services;

import com.telemedicina.entitys.Doctor;
import com.telemedicina.repositorys.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    public Doctor registerDoctor(Doctor doctor, Integer id_user) {
        Doctor doctor_db = doctorRepository.findByIdDoctor(id_user);
        if (doctor_db != null){
            doctor_db.setId_user(id_user);
            return doctorRepository.save(doctor);
        }
        return null;
    }
}
