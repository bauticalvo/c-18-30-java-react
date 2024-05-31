
package com.telemedicina.repositorys;

import com.telemedicina.entitys.ConsultatingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultatingRoomRepository 
        extends JpaRepository<ConsultatingRoom, Integer>{
    
}
