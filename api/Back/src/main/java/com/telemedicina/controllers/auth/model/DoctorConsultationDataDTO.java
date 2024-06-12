package com.telemedicina.controllers.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorConsultationDataDTO {private int id_consultation_data;

    private String days;
    private double cost;
    private String mode;
    private String duration;
    private String since;
    private String until;
    private String pay_method;
    private String specialty;
    private String[] social_work;
    private String account_number;
    private String account_name;
    private String cvu;
    private boolean cash;

}
