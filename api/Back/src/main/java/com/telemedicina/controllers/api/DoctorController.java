/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.telemedicina.controllers.api;

import com.telemedicina.controllers.api.model.DoctorWithUserDetailsDTO;
import com.telemedicina.entitys.Doctor;
import com.telemedicina.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping ("/api/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @GetMapping("/specialty")
    public ResponseEntity<List<DoctorWithUserDetailsDTO>> getDoctorsBySpecialty (@RequestParam String specialty){
        List<DoctorWithUserDetailsDTO> doctors = doctorService.getDoctorsBySpecialty(specialty);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/mode")
    public ResponseEntity<List<DoctorWithUserDetailsDTO>> getDoctorsByMode (@RequestParam boolean mode){
        List<DoctorWithUserDetailsDTO> doctors = doctorService.getDoctorsByMode(mode);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return null;
    }

    @GetMapping("/cost")
    public ResponseEntity<List<DoctorWithUserDetailsDTO>> getDoctorsByConsultationCost (@RequestParam double cost){
        List<DoctorWithUserDetailsDTO> doctors = doctorService.getDoctorsByConsultationCost(cost);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }
}
