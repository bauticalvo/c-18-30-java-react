package com.telemedicina.controllers.api;

import com.telemedicina.controllers.api.model.MedicalConsultationDTO;
import com.telemedicina.controllers.api.model.PatientDTO;
import com.telemedicina.entitys.MedicalConsultation;
import com.telemedicina.services.MedicalConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-consultations")
public class MedicalConsultationController {

    @Autowired
    private MedicalConsultationService medicalConsultationService;

    @PostMapping("/schedule")
    public ResponseEntity<MedicalConsultation> createMedicalConsultation(@RequestBody MedicalConsultation medicalConsultation) {
        MedicalConsultation savedMedicalConsultation = medicalConsultationService.saveMedicalConsultation(medicalConsultation);
        return ResponseEntity.ok(savedMedicalConsultation);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalConsultationDTO>> getConsultationsForPatient(@PathVariable int patientId) {
        List<MedicalConsultationDTO> consultations = medicalConsultationService.getConsultationsForPatient(patientId);
        return ResponseEntity.ok(consultations);
    }
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<PatientDTO>> getPatientsForDoctor(@PathVariable int doctorId) {
        List<PatientDTO> patients = medicalConsultationService.getPatientsForDoctor(doctorId);
        return ResponseEntity.ok(patients);
    }

}