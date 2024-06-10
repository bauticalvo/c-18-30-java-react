package com.telemedicina.controllers.api;

import com.telemedicina.entitys.DoctorConsultationData;
import com.telemedicina.services.DoctorConsultationDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consultation_data")
public class DoctorConsultationDataController {

    @Autowired
    DoctorConsultationDataService doctorConsultationDataService;
}
