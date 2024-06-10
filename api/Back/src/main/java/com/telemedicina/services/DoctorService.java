package com.telemedicina.services;

import com.telemedicina.entitys.Doctor;
import com.telemedicina.repositorys.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;
}
