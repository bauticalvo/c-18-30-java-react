package com.telemedicina.controllers.api;

import com.telemedicina.entitys.Patient;
import com.telemedicina.entitys.User;
import com.telemedicina.repositorys.PatientRepository;
import com.telemedicina.repositorys.UserRepository;
import com.telemedicina.services.PatientService;
import com.telemedicina.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping ("/welcome")
    public String welcome (){
        return "Welcome";
    }
}

