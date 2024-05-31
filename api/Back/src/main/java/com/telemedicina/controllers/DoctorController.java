/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.telemedicina.controllers;

import com.telemedicina.entitys.Doctor;
import com.telemedicina.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @PostMapping ("/")
    public ResponseEntity<Doctor> registerDoctor (@RequestBody Doctor doctor, @RequestParam Integer id_user){
        if (doctor != null){
            Doctor newDoctor = doctorService.registerDoctor (doctor, id_user);
            if (newDoctor!= null)
                return ResponseEntity.ok(newDoctor);
            else
                return ResponseEntity.notFound().build();

        }
        return ResponseEntity.badRequest().build();
    }
}
