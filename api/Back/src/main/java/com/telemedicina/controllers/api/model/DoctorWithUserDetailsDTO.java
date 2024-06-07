package com.telemedicina.controllers.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorWithUserDetailsDTO {
    private String name;
    private String lastname;
    private int tuition;
    private String specialty;
    private String university;
    private String office_address;
    private String office_province;
    private boolean mode;
}
