package com.telemedicina.repositorys;

import com.telemedicina.entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Integer>{
    Optional<User> findByUsername (String username);
}
