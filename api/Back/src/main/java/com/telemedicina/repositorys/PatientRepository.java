package com.telemedicina.repositorys;

import com.telemedicina.entitys.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository <Patient, Integer> {
    Patient findByPatientId (int id_patient);
}
