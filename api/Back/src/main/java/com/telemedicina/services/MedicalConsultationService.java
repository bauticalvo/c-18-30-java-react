package com.telemedicina.services;

import com.telemedicina.controllers.api.model.MedicalConsultationDTO;
import com.telemedicina.controllers.api.model.PatientDTO;
import com.telemedicina.entitys.MedicalConsultation;
import com.telemedicina.repositorys.MedicalConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalConsultationService {

    @Autowired
    private MedicalConsultationRepository medicalConsultationRepository;

    public MedicalConsultation saveMedicalConsultation(MedicalConsultation medicalConsultation) {
        return medicalConsultationRepository.save(medicalConsultation);
    }

    public List<MedicalConsultationDTO> getConsultationsForPatient(int patientId) {
        return medicalConsultationRepository.findConsultationsByPatientId(patientId);
    }

    public List<PatientDTO> getPatientsForDoctor(int doctorId) {
        return medicalConsultationRepository.findPatientsByDoctorId(doctorId);
    }
}
