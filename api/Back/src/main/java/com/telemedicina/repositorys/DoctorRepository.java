package com.telemedicina.repositorys;

import com.telemedicina.controllers.api.model.DoctorWithUserDetailsDTO;
import com.telemedicina.entitys.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository <Doctor, Integer> {
    @Query(value = "SELECT * FROM doctor WHERE id_doctor = ?1", nativeQuery = true)
    Doctor findById_doctor (int id_doctor);

    @Query("SELECT u.name, u.lastname, d.tuition, d.specialty, d.university, d.office_address, d.office_province, dc.cost " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE d.specialty = :specialty")
    List<DoctorWithUserDetailsDTO> findDoctorsBySpecialty(@Param("specialty") String specialty);

    @Query("SELECT u.name, u.lastname, d.tuition, d.specialty, d.university, d.office_address, d.office_province, dc.mode " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE dc.mode = :mode")
    List<DoctorWithUserDetailsDTO> findDoctorsByMode(@Param("mode") boolean mode);

    @Query("SELECT u.name, u.lastname, d.tuition, d.specialty, d.university, d.office_address, d.office_province, dc.cost " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE dc.cost >= :cost")
    List<DoctorWithUserDetailsDTO> findDoctorsByConsultationCost(@Param("cost") double cost);

}
