package com.telemedicina.repositorys;

import com.telemedicina.entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository 
        extends JpaRepository <User, Integer>{
    
}
