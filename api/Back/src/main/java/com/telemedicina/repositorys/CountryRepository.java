package com.telemedicina.repositorys;

import com.telemedicina.entitys.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository 
        extends JpaRepository <Country, Integer>{
    
}
