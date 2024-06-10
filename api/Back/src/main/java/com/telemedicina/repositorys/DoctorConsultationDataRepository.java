package com.telemedicina.repositorys;

import com.telemedicina.entitys.DoctorConsultationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorConsultationDataRepository extends JpaRepository<DoctorConsultationData, Integer> {

}
