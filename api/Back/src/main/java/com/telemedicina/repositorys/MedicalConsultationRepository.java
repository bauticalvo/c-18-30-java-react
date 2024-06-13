package com.telemedicina.repositorys;

import com.telemedicina.controllers.api.model.MedicalConsultationDTO;
import com.telemedicina.controllers.api.model.PatientDTO;
import com.telemedicina.entitys.MedicalConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.repository.query.Param;

@Repository
public interface MedicalConsultationRepository extends JpaRepository<MedicalConsultation, Integer> {

     @Query("SELECT mc.id AS idMedicalConsultation, mc.mode AS mode, mc.time AS time, mc.hour AS hour, mc.office_address AS officeAddress, " +
           "u.name AS doctorName,u.lastname AS doctorLastName, d.specialty AS doctorSpecialty, dc.type_of_patient as typeOfPatient " +
           "FROM MedicalConsultation mc " +
           "JOIN mc.doctor d " +
           "JOIN d.user u " +
           "JOIN DoctorConsultationData dc " +
           "WHERE mc.patient.id = :patientId")
    List<MedicalConsultationDTO> findConsultationsByPatientId(int patientId);

    @Query("SELECT mc.mode as mode, mc.time as time, " +
           "mc.hour as hour, mc.office_address as officeAddress, " +
           "p.height as height, p.weight as weight, p.blood_type as bloodType, p.factor as factor, " +
           "p.alergic as alergic, p.chronic_diseases as chronicDiseases, p.medicines as medicines, " +
           "p.family_history_of_diseases as familyHistoryOfDiseases, u.name as name, u.lastname as lastname " +
           "FROM MedicalConsultation mc " +
           "JOIN mc.patient p " +
           "JOIN User u ON p.id_user = u.id " +
           "WHERE mc.doctor.id = :doctorId")
    List<PatientDTO> findPatientsByDoctorId(@Param("doctorId") int doctorId);
}

