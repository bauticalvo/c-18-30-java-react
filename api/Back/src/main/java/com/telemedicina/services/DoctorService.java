package com.telemedicina.services;

import com.telemedicina.controllers.api.model.DoctorWithUserDetailsDTO;
import com.telemedicina.entitys.Doctor;
import com.telemedicina.repositorys.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    public List<DoctorWithUserDetailsDTO> getDoctorsBySpecialty(String specialty) {
        return doctorRepository.findDoctorsBySpecialty (specialty);
    }

    public List<DoctorWithUserDetailsDTO> getDoctorsByMode(boolean mode) {
        return doctorRepository.findDoctorsByMode (mode);
    }

    public List<DoctorWithUserDetailsDTO> getDoctorsByConsultationCost(double cost) {
        return doctorRepository.findDoctorsByConsultationCost(cost);
    }
}
