package org.example.springboot.service.Users;

import org.example.springboot.domain.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.Basic;
import javax.persistence.EntityManager;
import javax.swing.text.html.parser.Entity;

@Configuration
public class SpringConfig {

    private final UsersRepository usersRepository;

    @Autowired
    public SpringConfig(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }
    @Bean
    public UsersService usersService() {
        return new UsersService(usersRepository);
    }
}
