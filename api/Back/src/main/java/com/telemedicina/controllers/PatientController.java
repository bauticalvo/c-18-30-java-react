package com.telemedicina.controllers;

import com.telemedicina.entitys.Patient;
import com.telemedicina.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    PatientService patientService;

    @PostMapping("/")
    public ResponseEntity<Patient> registerPatient (@RequestBody Patient patient, @RequestParam Integer id_user){
        if (patient != null) {
            return ResponseEntity.ok(patientService.registerPatient(patient, id_user));
        }
        return ResponseEntity.badRequest().build();
    }
}
