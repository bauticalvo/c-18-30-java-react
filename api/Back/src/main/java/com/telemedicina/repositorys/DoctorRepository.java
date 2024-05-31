package com.telemedicina.repositorys;

import com.telemedicina.entitys.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository <Doctor, Integer> {
    Doctor findByIdDoctor (int id_doctor);
}
