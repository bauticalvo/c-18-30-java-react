package com.telemedicina.controllers.api.model;

public interface DoctorWithUserDetails {
    String getName();
    String getLastname();
    Integer getTuition();
    String getSpecialty();
    String getTypeOfPatient();
    String getUniversity();
    String getOfficeAddress();
    String getOfficeProvince();
    double getCost();
    Boolean getMode();
    String getPayMethod();
    Integer getIdDoctor();
    Integer getIdUser();
    String getSince();
    String getUntil();
    String getDays();
    String getDuration();
    String getYearExperience();
}
