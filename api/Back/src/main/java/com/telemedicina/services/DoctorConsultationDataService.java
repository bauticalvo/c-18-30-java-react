package com.telemedicina.services;

import com.telemedicina.entitys.Doctor;
import com.telemedicina.entitys.DoctorConsultationData;
import com.telemedicina.repositorys.DoctorConsultationDataRepository;
import com.telemedicina.repositorys.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DoctorConsultationDataService {

    @Autowired
    DoctorConsultationDataRepository doctorConsultationDataRepository;

    @Autowired
    DoctorRepository doctorRepository;

    public DoctorConsultationData addConsultationData(DoctorConsultationData doctorConsultationData) {
        Doctor doctor_db = doctorRepository.findById_doctor(doctorConsultationData.getDoctor().getId_doctor());
        doctorConsultationData.setDoctor(doctor_db);
        return doctorConsultationDataRepository.save(doctorConsultationData);
    }
}
