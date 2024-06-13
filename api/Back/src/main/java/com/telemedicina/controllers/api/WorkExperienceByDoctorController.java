package com.telemedicina.controllers.api;

import com.telemedicina.services.WorkExperienceByDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/work_experience")

public class WorkExperienceByDoctorController {
    @Autowired
    WorkExperienceByDoctorService workExperienceByDoctorService;

}
