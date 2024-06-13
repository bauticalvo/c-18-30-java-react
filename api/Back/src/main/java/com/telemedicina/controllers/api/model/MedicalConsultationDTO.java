package com.telemedicina.controllers.api.model;

import java.time.ZonedDateTime;

public interface MedicalConsultationDTO {
   int getIdMedicalConsultation();
    int getMode();
    int getTime();
    ZonedDateTime getHour();
    String getOfficeAddress();
    String getDoctorName();
    String getDoctorLastName();
    String getDoctorSpecialty();
    String getTypeOfPatient ();
}
