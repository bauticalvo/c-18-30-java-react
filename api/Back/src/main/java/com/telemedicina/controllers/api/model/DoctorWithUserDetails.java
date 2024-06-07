package com.telemedicina.controllers.api.model;

public interface DoctorWithUserDetails {
    String getName();
    String getLastname();
    int getTuition();
    String getSpecialty();
    String getUniversity();
    String getOfficeAddress();
    String getOfficeProvince();
    double getCost();
    boolean getMode();
}
