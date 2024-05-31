package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "social_work")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SocialWork {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id_social_work;
    private String name;
    private int phone;
    private String direction;

    @JoinColumn
    private int id_country;
}
