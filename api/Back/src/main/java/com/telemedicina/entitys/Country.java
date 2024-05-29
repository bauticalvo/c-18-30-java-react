package com.telemedicina.entitys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table (name ="country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_country;
    private String name;
    private String areaCode;

    public Country(int id_country, String name, String areaCode) {
        this.id_country = id_country;
        this.name = name;
        this.areaCode = areaCode;
    }

    public Country() {
    }

    public int getId_country() {
        return id_country;
    }

    public void setId_country(int id_country) {
        this.id_country = id_country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }
    
}
