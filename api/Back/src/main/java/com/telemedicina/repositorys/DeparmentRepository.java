package com.telemedicina.repositorys;

import com.telemedicina.entitys.Deparment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeparmentRepository extends JpaRepository <Deparment, Integer> {
    
}
