package com.telemedicina.controllers;

import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.repositorys.PatientRepository;
import com.telemedicina.repositorys.UserRepository;
import com.telemedicina.services.PatientService;
import com.telemedicina.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    PatientService patientService;


    @PostMapping ("/")
    public ResponseEntity<User> registerUser (@RequestBody User user){
        if (user != null) {
            return ResponseEntity.ok(userService.registerUser(user));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping ("/")
    public ResponseEntity<Patient> registerPatient (@RequestBody Patient patient, @RequestParam Integer id_user){
        if (patient != null) {
            return ResponseEntity.ok(patientService.registerPatient(patient, id_user));
        }
        return ResponseEntity.badRequest().build();
    }

}

