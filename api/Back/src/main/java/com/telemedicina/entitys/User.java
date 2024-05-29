package com.telemedicina.entitys;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;


@Entity
@Table (name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_user;
    private String name;
    private String lastname;
    private int DNI;
    private String mail;
    private Date birthdate;
    private String gender;
    private String username;
    private String password;
    private int phone;

    @JoinColumn
    private int id_country;
    @JoinColumn
    private int id_province;
    @JoinColumn
    private int id_department;

    public User(int id_user, String name, String lastname, int DNI, String mail, Date birthdate, String gender, String username, String password, int phone, int id_country, int id_province, int id_department) {
        this.id_user = id_user;
        this.name = name;
        this.lastname = lastname;
        this.DNI = DNI;
        this.mail = mail;
        this.birthdate = birthdate;
        this.gender = gender;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.id_country = id_country;
        this.id_province = id_province;
        this.id_department = id_department;
    }

    public User() {
    }

    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public int getDNI() {
        return DNI;
    }

    public void setDNI(int DNI) {
        this.DNI = DNI;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public int getId_country() {
        return id_country;
    }

    public void setId_country(int id_country) {
        this.id_country = id_country;
    }

    public int getId_province() {
        return id_province;
    }

    public void setId_province(int id_province) {
        this.id_province = id_province;
    }

    public int getId_department() {
        return id_department;
    }

    public void setId_department(int id_department) {
        this.id_department = id_department;
    }
    


    
    
    
}
