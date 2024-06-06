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
    @Lob
    @Column (columnDefinition = "BLOB")
    private byte[] certification; //picture
    private int year_experience;
    private String specialty;
    private String university;
    private Date dateOfGraduation;
    private String officeAddress;
    private String officeProvince;
    @Lob
    @Column (columnDefinition = "BLOB")
    private byte[] profilePicture; //picture

    @JoinColumn
    private int id_user;
}
