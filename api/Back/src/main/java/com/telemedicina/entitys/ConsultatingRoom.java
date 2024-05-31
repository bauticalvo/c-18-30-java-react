package com.telemedicina.entitys;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "consultating_room")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ConsultatingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_consultating_room;
    private String name;

    @JoinColumn
    private int id_department;
}
