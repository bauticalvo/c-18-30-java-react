package com.telemedicina.repositorys;

import com.telemedicina.entitys.WorkExperienceByDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkExperienceByDoctorRepository extends JpaRepository<WorkExperienceByDoctor, Integer> {
}
