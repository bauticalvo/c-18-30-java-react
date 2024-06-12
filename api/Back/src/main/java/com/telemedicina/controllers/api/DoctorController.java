
package com.telemedicina.controllers.api;

import com.telemedicina.controllers.api.model.DoctorWithUserDetails;
import com.telemedicina.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;


@RestController
@RequestMapping ("/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @GetMapping("/specialty")
    public ResponseEntity<List<DoctorWithUserDetails>> getDoctorsBySpecialty (@RequestParam String specialty){
        List<DoctorWithUserDetails> doctors = doctorService.getDoctorsBySpecialty(specialty);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping ("/")
    public ResponseEntity <List<DoctorWithUserDetails>> getAllDoctors (){
        List<DoctorWithUserDetails> doctors = doctorService.getAllDoctors ();
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/specialty_and_city")
    public ResponseEntity<List<DoctorWithUserDetails>> getDoctorsBySpecialtyAndCity (@RequestParam String specialty, @RequestParam String city){
        List<DoctorWithUserDetails> doctors = doctorService.getDoctorsBySpecialtyAndCity(specialty, city);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/mode")
    public ResponseEntity<List<DoctorWithUserDetails>> getDoctorsByMode (@RequestParam boolean mode){
        List<DoctorWithUserDetails> doctors = doctorService.getDoctorsByMode(mode);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/cost")
    public ResponseEntity<List<DoctorWithUserDetails>> getDoctorsByConsultationCost (@RequestParam double cost){
        List<DoctorWithUserDetails> doctors = doctorService.getDoctorsByConsultationCost(cost);
        if (doctors.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(doctors);
    }
}
