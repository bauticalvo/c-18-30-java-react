package com.telemedicina.controllers.api;

import com.telemedicina.entitys.ConsultatingRoom;
import com.telemedicina.repositorys.ConsultatingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


public class ConsultatingRoomController {
    
    @Autowired
    private ConsultatingRoomRepository CRR;
    

    @PostMapping
    public void ConsultatingRoomCreate(ConsultatingRoom cr){
        
        CRR.save(cr);
    }
    
    @PutMapping
    public void ConsultatingRoomEdit(ConsultatingRoom c){
        
        
    }
    
    @DeleteMapping("/Clientes/{id}")
    public void ConsultatingRoomDeleteById(@PathVariable("id") Integer id){
        
        CRR.deleteById(id);
    }
    
    @GetMapping
    public void ConsultatingRoomGet(){
        
        CRR.findAll();        
    }
    
    @GetMapping("/Clientes/{id}")
    public void ObtenerClientes(@PathVariable("id") Integer id){
        
        CRR.findById(id);        
    }
    
    
}
