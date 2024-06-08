package com.telemedicina.services;

import com.telemedicina.entitys.WorkExperienceByDoctor;
import com.telemedicina.repositorys.WorkExperienceByDoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkExperienceByDoctorService {
    @Autowired
    WorkExperienceByDoctorRepository workExperienceByDoctorRepository;


    public WorkExperienceByDoctor addOneDoctorWorkExperience(WorkExperienceByDoctor workExperienceByDoctor) {
        return workExperienceByDoctorRepository.save(workExperienceByDoctor);
    }
}
