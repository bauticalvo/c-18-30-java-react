package com.telemedicina.repositorys;

import com.telemedicina.entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User, Integer>{
    
}
