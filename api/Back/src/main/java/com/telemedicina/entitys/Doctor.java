package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

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
    private String certification;
    private int year_experience;
    private String specialty;
    private String field;
    private String university;
    private Date dateOfEntry;
    private Date dateOfGraduation;

    @JoinColumn
    private int id_social_work;

    @JoinColumn
    private int id_consultation_room;

    @JoinColumn
    private int id_user;
}
