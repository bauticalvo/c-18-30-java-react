package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table (name = "doctor_consultation_data")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class DoctorConsultationData {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id_consultation_data;
    private String days;
    private double cost;
    private int duration;
    private Date since;
    private Date until;
    private String pay_method;
    private String especiality;

    @JoinColumn
    private int id_doctor;
}
