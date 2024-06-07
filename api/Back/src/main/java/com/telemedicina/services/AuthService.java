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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService; // Asegúrate de que JwtService esté correctamente inyectado aquí

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse registerUser (User user){
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return AuthResponse.builder()
                    .token(jwtService.getToken(user))
                    .build();
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Username already exists");
        }
    }

    public Patient registerPatient (Patient patient, Integer id_user){
        patient.setId_user(id_user);
        return patientRepository.save(patient);
    }

    public Doctor registerDoctor(Doctor doctor, Integer id_user) {
        doctor.setId_user(id_user);
        return doctorRepository.save(doctor);
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
