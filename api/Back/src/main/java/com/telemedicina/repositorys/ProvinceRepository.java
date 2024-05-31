package com.telemedicina.repositorys;

import com.telemedicina.entitys.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProvinceRepository 
        extends JpaRepository <Province, Integer> {
    
}
