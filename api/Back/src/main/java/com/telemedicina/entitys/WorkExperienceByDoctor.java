package com.telemedicina.entitys;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "work_experience_by_doctor")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class WorkExperienceByDoctor {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id_work_experience_by_doctor;

    private String charge;
    private String company;
    private String since;
    private String until;
    private boolean current_job;

    @ManyToOne
    @JoinColumn (name = "id_doctor", nullable = false)
    private Doctor doctor;
}
