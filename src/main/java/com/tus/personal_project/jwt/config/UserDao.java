package com.tus.personal_project.jwt.config;




import com.tus.personal_project.jwt.model.DAOUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Integer> {
    DAOUser findByUsername(String username);
    DAOUser findTypeByUsername(String username);
    
}