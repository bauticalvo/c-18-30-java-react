package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table (name = "medical_consultation")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicalConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_medical_consultation;
    private boolean mode;
    private int time;
    private ZonedDateTime hour;
    private String office_address;

    @JoinColumn
    private int id_patient;

    @JoinColumn
    private int id_doctor;
}
