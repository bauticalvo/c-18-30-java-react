package com.telemedicina.repositorys;

import com.telemedicina.entitys.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository <Patient, Integer> {
    @Query(value = "SELECT * FROM patient WHERE id_patient = ?1", nativeQuery = true)
    Patient findByIdPatient (int id_patient);


    @Query("SELECT p.id_patient FROM Patient p WHERE p.id_user = :idUser")
    Integer findByIdUser(int idUser);
}
