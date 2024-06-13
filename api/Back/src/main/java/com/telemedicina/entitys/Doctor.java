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
    private String year_experience;
    private String specialty;
    private String university;
    private String date_of_graduation;
    private String office_address;
    private String office_province;
    @Lob
    @Column (columnDefinition = "BLOB")
    private byte[] profile_picture; //picture

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private User user;
}
