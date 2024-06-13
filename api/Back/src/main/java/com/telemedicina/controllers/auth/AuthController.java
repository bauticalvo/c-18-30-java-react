package com.telemedicina.controllers.auth;

import com.telemedicina.controllers.auth.model.AuthResponse;
import com.telemedicina.controllers.auth.model.DoctorConsultationDataDTO;
import com.telemedicina.controllers.auth.model.LoginRequest;
import com.telemedicina.entitys.*;
import com.telemedicina.services.AuthService;
import com.telemedicina.services.DoctorConsultationDataService;
import com.telemedicina.services.WorkExperienceByDoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;


@RestController
@RequestMapping ("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    AuthService authService;

    @Autowired
    DoctorConsultationDataService doctorConsultationDataService;

    @Autowired
    WorkExperienceByDoctorService workExperienceByDoctorService;

    @PostMapping("/register/doctor")
    public ResponseEntity<Doctor> registerDoctor( @RequestParam("certification") MultipartFile certificationFile,
                                                  @RequestParam("profile_picture") MultipartFile profilePictureFile,
                                                  @RequestParam("tuition") int tuition,
                                                  @RequestParam("year_experience") String yearExperience,
                                                  @RequestParam("specialty") String specialty,
                                                  @RequestParam("university") String university,
                                                  @RequestParam("date_of_graduation") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String dateOfGraduation,
                                                  @RequestParam("office_address") String officeAddress,
                                                  @RequestParam("office_province") String officeProvince,
                                                  @RequestParam("id_user") int idUser) {
        try{
            Doctor doctor = new Doctor();
            doctor.setTuition(tuition);
            doctor.setYear_experience(yearExperience);
            doctor.setSpecialty(specialty);
            doctor.setUniversity(university);
            doctor.setDate_of_graduation(dateOfGraduation);
            doctor.setOffice_address(officeAddress);
            doctor.setOffice_province(officeProvince);

            byte[] certificationBytes = certificationFile.getBytes();
            byte[] profilePictureBytes = profilePictureFile.getBytes();

            doctor.setCertification(certificationBytes);
            doctor.setProfile_picture(profilePictureBytes);

            Doctor newDoctor = authService.registerDoctor(doctor, idUser);
            if (newDoctor != null)
                return ResponseEntity.ok(newDoctor);
            else
                return ResponseEntity.notFound().build();
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping ("/register/consultation_data")
    public ResponseEntity <DoctorConsultationData> addConsultationData (@RequestBody DoctorConsultationData doctorConsultationData) {
        System.out.println("HOLA ENTRE AL RECURSO");
        if (doctorConsultationData != null) {
            System.out.println("HOLA ENTRE AL IF");
            return ResponseEntity.ok(doctorConsultationDataService.addConsultationData(doctorConsultationData));
        }
        System.out.println("HOLA SALI DE IF");
        return ResponseEntity.badRequest().build();
    }

    @PostMapping ("/register/work_experience")
    public ResponseEntity<WorkExperienceByDoctor> addOneDoctorWorkExperience (@RequestBody WorkExperienceByDoctor workExperienceByDoctor){
        if (workExperienceByDoctor != null){
            return ResponseEntity.ok(workExperienceByDoctorService.addOneDoctorWorkExperience(workExperienceByDoctor));
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
    public ResponseEntity<User> registerUser (@RequestBody User user){
        try {
            if (user != null) {
                return ResponseEntity.ok(authService.registerUser(user));
            }
            return ResponseEntity.badRequest().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @PostMapping ("/login/user")
    public ResponseEntity <AuthResponse> loginUser (@RequestBody LoginRequest loginRequest){
        if (loginRequest == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(authService.loginUser(loginRequest));
    }
}
