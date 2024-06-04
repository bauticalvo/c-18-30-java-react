package com.telemedicina.services;

import com.telemedicina.Jwt.JwtService;
import com.telemedicina.controllers.auth.model.AuthResponse;
import com.telemedicina.controllers.auth.model.LoginRequest;
import com.telemedicina.entitys.Doctor;
import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.repositorys.DoctorRepository;
import com.telemedicina.repositorys.PatientRepository;
import com.telemedicina.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    UserRepository userRepository;

    private JwtService jwtService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    public AuthResponse registerUser (User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public Patient registerPatient (Patient patient, Integer id_user){
        Patient patient_db = patientRepository.findByIdPatient(id_user);
        if(patient_db != null) {
            patient.setId_user(id_user);
            return patientRepository.save(patient);
        }
        return null;
    }

    public Doctor registerDoctor (Doctor doctor, Integer id_user){
        Doctor doctor_db = doctorRepository.findByIdDoctor(id_user);
        if (doctor_db != null){
            doctor_db.setId_user(id_user);
            return doctorRepository.save(doctor);
        }
        return null;
    }

    public AuthResponse loginUser (LoginRequest loginRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

}
