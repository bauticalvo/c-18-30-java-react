package com.telemedicina.repositorys;

import com.telemedicina.entitys.MedicalConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalConsultationRepository 
        extends JpaRepository <MedicalConsultation, Integer> {
    
}
