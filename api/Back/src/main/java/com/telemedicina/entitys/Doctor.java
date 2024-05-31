package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "doctor")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_doctor;
    private int tuition;
    private int year_experience;
    private String certification;
    private String specialty;
    private String field;

    @JoinColumn
    private int id_social_work;

    @JoinColumn
    private int id_consultation_room;

    @JoinColumn
    private int id_user;
}
