package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Entity
@Table(name = "medical_consultation")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicalConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_medical_consultation;
    private int mode;
    private int time;
    private ZonedDateTime hour;
    private String office_address;

    @ManyToOne
    @JoinColumn(name = "id_patient", nullable = false)
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "id_doctor", nullable = false)
    private Doctor doctor;
}
