package com.telemedicina.repositorys;

import com.telemedicina.entitys.Deparment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeparmentRepository 
        extends JpaRepository <Deparment, Integer> {
    
}
