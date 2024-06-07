package com.telemedicina.controllers.api.model;

public interface DoctorWithUserDetails {
    String getName();
    String getLastname();
    Integer getTuition();
    String getSpecialty();
    String getUniversity();
    String getOfficeAddress();
    String getOfficeProvince();
    double getCost();
    Boolean getMode();
}
