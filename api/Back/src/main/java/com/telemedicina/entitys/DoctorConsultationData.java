package com.telemedicina.entitys;

import com.telemedicina.repositorys.DoctorRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table(name = "doctor_consultation_data")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class DoctorConsultationData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_consultation_data;

    private String days;
    private double cost;
    private boolean mode;
    private String duration;
    private String since;
    private String until;
    private String pay_method;
    private String type_of_patient;
    private String social_work;
    private String account_number;
    private String account_name;
    private String cvu;
    private String cash;

    @OneToOne
    @JoinColumn (name = "id_doctor", referencedColumnName = "id_doctor")
    private Doctor doctor;
}
