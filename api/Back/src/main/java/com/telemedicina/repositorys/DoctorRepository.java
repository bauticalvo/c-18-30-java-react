package com.telemedicina.repositorys;

import com.telemedicina.entitys.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository <Doctor, Integer> {
    @Query(value = "SELECT * FROM doctor WHERE id_doctor = ?1", nativeQuery = true)
    Doctor findById_doctor (int id_doctor);
}
