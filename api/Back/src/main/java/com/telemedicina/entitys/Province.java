package com.telemedicina.entitys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;



@Entity
@Table (name = "Province")
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_province;
    private String name;
    @JoinColumn
    private int id_country;

    public Province(int id_province, String name, int id_country) {
        this.id_province = id_province;
        this.name = name;
        this.id_country = id_country;
    }

    public Province() {
    }

    public int getId_province() {
        return id_province;
    }

    public void setId_province(int id_province) {
        this.id_province = id_province;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId_country() {
        return id_country;
    }

    public void setId_country(int id_country) {
        this.id_country = id_country;
    }
    
    
}
