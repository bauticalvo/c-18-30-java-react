package com.telemedicina.entitys;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.text.DecimalFormat;

@Entity
@Table (name="patient")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_patient;
    private double height;
    private double weight;
    private String blood_type;
    private String factor;
    private String alergic;
    private String chronic_diseases;
    private String medicines;
    private String family_history_of_diseases;

    @JoinColumn
    private int id_user;    
    
}