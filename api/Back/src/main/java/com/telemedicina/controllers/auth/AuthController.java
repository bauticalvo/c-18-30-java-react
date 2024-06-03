package com.telemedicina.controllers.auth;

import com.telemedicina.entitys.Doctor;
import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.services.AuthService;
import com.telemedicina.services.DoctorService;
import com.telemedicina.services.PatientService;
import com.telemedicina.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping ("/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/doctor")
    public ResponseEntity<Doctor> registerDoctor (@RequestBody Doctor doctor, @RequestParam Integer id_user){
        if (doctor != null){
            Doctor newDoctor = authService.registerDoctor (doctor, id_user);
            if (newDoctor!= null)
                return ResponseEntity.ok(newDoctor);
            else
                return ResponseEntity.notFound().build();

        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/patient")
    public ResponseEntity<Patient> registerPatient (@RequestBody Patient patient, @RequestParam Integer id_user){
        if (patient != null) {
            Patient newPatient = authService.registerPatient(patient, id_user);
            if (newPatient != null)
                return ResponseEntity.ok(newPatient);
            else
                return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping ("/user")
    public ResponseEntity<User> registerUser (@RequestBody User user){
        if (user != null) {
            return ResponseEntity.ok(authService.registerUser(user));
        }
        return ResponseEntity.badRequest().build();
    }

}
