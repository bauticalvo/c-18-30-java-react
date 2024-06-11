package com.telemedicina.controllers.api.model;

import java.time.ZonedDateTime;

public interface PatientDTO {
    double getHeight();
    double getWeight();
    String getBloodType();
    int getFactor();
    String getAlergic();
    String getChronicDiseases();
    String getMedicines();
    String getFamilyHistoryOfDiseases();
    String getName();
    String getLastname();
    int getMode();
    int getTime();
    ZonedDateTime getHour();
    String getOfficeAddress();

}
