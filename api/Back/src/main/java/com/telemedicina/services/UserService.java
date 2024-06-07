package com.telemedicina.services;

import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

}
