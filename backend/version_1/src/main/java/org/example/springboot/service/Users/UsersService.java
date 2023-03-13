package org.example.springboot.service.Users;

import org.example.springboot.domain.users.Users;
import org.example.springboot.domain.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public String join(Users users) {
        validateDuplicateUser(users); //중복 회원 검증
        usersRepository.save(users);
        return users.getUserId();
    }

    private void validateDuplicateUser(Users users) {
        usersRepository.findByUserId(users.getUserId())
                .ifPresent(u -> {
                    throw new IllegalStateException("이미 존재하는 회원 이름입니다.");
                });
    }

    public Optional<Users> findByUserId(String userId){
        return usersRepository.findByUserId(userId);
    }

    public Optional<Users> findByName(String name){
        return usersRepository.findByName(name);
    }

    public List<Users> findUsers() {
        return usersRepository.findAll();
    }
}
