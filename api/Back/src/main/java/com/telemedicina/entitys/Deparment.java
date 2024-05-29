package com.telemedicina.entitys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;


@Entity
@Table (name = "deparment")
public class Deparment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_deparment;
    private String name;
    @JoinColumn
    private int id_province;

    public Deparment(int id_deparment, String name, int id_province) {
        this.id_deparment = id_deparment;
        this.name = name;
        this.id_province = id_province;
    }

    public Deparment() {
    }

    public int getId_deparment() {
        return id_deparment;
    }

    public void setId_deparment(int id_deparment) {
        this.id_deparment = id_deparment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId_province() {
        return id_province;
    }

    public void setId_province(int id_province) {
        this.id_province = id_province;
    }
    
}
