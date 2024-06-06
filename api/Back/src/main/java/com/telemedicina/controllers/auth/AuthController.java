package com.telemedicina.controllers.auth;

import com.telemedicina.controllers.auth.model.AuthResponse;
import com.telemedicina.controllers.auth.model.LoginRequest;
import com.telemedicina.entitys.Doctor;
import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.services.AuthService;
import com.telemedicina.services.DoctorService;
import com.telemedicina.services.PatientService;
import com.telemedicina.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping ("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/register/doctor")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
        if (doctor != null) {
            Doctor newDoctor = authService.registerDoctor(doctor, doctor.getId_user());
            if (newDoctor != null)
                return ResponseEntity.ok(newDoctor);
            else
                return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register/patient")
    public ResponseEntity<Patient> registerPatient (@RequestBody Patient patient){
        if (patient != null) {
            Patient newPatient = authService.registerPatient(patient, patient.getId_user());
            if (newPatient != null)
                return ResponseEntity.ok(newPatient);
            else
                return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping ("/register/user")
    public ResponseEntity<AuthResponse> registerUser (@RequestBody User user){
        if (user != null) {
            return ResponseEntity.ok(authService.registerUser(user));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping ("/login/user")
    public ResponseEntity <AuthResponse> loginUser (@RequestBody LoginRequest loginRequest){
        if (loginRequest == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(authService.loginUser(loginRequest));
    }
}
