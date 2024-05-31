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
            Patient newPatient = patientService.registerPatient(patient, id_user);
            if (newPatient != null)
                return ResponseEntity.ok(newPatient);
            else
                return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
