package com.telemedicina.entitys;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferData {
    private String accountNumber;
    private String accountName;
    private String CVU;
}
