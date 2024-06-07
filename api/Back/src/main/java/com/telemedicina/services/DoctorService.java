package com.telemedicina.services;

import com.telemedicina.controllers.api.model.DoctorWithUserDetails;
import com.telemedicina.repositorys.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    public List<DoctorWithUserDetails> getDoctorsBySpecialty(String specialty) {
        return doctorRepository.findDoctorsBySpecialty (specialty);
    }

    public List<DoctorWithUserDetails> getDoctorsByMode(boolean mode) {
        return doctorRepository.findDoctorsByMode (mode);
    }

    public List<DoctorWithUserDetails> getDoctorsByConsultationCost(double cost) {
        return doctorRepository.findDoctorsByConsultationCost(cost);
    }
}
