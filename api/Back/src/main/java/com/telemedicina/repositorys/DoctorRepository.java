package com.telemedicina.repositorys;

import com.telemedicina.controllers.api.model.DoctorWithUserDetails;
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

    @Query("SELECT u.name as name, u.lastname as lastname, u.id_user as idUser, d.tuition as tuition, d.specialty as specialty, d.university as university, d.office_address as officeAddress, d.office_province as officeProvince, d.id_doctor as idDoctor, d.year_experience as yearExperience, dc.cost as cost, dc.mode as mode, dc.pay_method as payMethod, dc.since as since, dc.until as until, dc.days as days, dc.duration as duration, dc.type_of_patient as typeOfPatient " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE d.specialty = :specialty")
    List<DoctorWithUserDetails> findDoctorsBySpecialty(@Param("specialty") String specialty);

    @Query("SELECT u.name as name, u.lastname as lastname, u.id_user as idUser, d.tuition as tuition, d.specialty as specialty, d.university as university, d.office_address as officeAddress, d.office_province as officeProvince, d.id_doctor as idDoctor, d.year_experience as yearExperience, dc.cost as cost, dc.mode as mode, dc.pay_method as payMethod, dc.since as since, dc.until as until, dc.days as days, dc.duration as duration, dc.type_of_patient as typeOfPatient " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE dc.mode = :mode")
    List<DoctorWithUserDetails> findDoctorsByMode(@Param("mode") boolean mode);

    @Query("SELECT u.name as name, u.lastname as lastname, u.id_user as idUser, d.tuition as tuition, d.specialty as specialty, d.university as university, d.office_address as officeAddress, d.office_province as officeProvince, d.id_doctor as idDoctor, d.year_experience as yearExperience, dc.cost as cost, dc.mode as mode, dc.pay_method as payMethod, dc.since as since, dc.until as until, dc.days as days, dc.duration as duration, dc.type_of_patient as typeOfPatient " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE dc.cost >= :cost")
    List<DoctorWithUserDetails> findDoctorsByConsultationCost(@Param("cost") double cost);


    @Query("SELECT u.name as name, u.lastname as lastname, u.id_user as idUser, d.tuition as tuition, d.specialty as specialty, d.university as university, d.office_address as officeAddress, d.office_province as officeProvince, d.id_doctor as idDoctor, d.year_experience as yearExperience, dc.cost as cost, dc.mode as mode, dc.pay_method as payMethod, dc.since as since, dc.until as until, dc.days as days, dc.duration as duration, dc.type_of_patient as typeOfPatient " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user " +
            "WHERE d.specialty = :specialty AND d.office_province = :city")
    List<DoctorWithUserDetails> findDoctorsBySpecialtyAndCity(String specialty, String city);

    @Query("SELECT u.name as name, u.lastname as lastname, u.id_user as idUser, d.tuition as tuition, d.specialty as specialty, d.university as university, d.office_address as officeAddress, d.office_province as officeProvince, d.id_doctor as idDoctor, d.year_experience as yearExperience, dc.cost as cost, dc.mode as mode, dc.pay_method as payMethod, dc.since as since, dc.until as until, dc.days as days, dc.duration as duration, dc.type_of_patient as typeOfPatient " +
            "FROM Doctor d " +
            "JOIN User u ON d.user.id_user = u.id_user " +
            "JOIN DoctorConsultationData dc ON d.user.id_user = dc.doctor.user.id_user ")
    List<DoctorWithUserDetails> getAllDoctors();

}
