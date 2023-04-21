package org.example.springboot.service.Users;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.users.Users;
import org.example.springboot.domain.users.UsersRepository;
import org.example.springboot.web.dto.UsersRequestDto;
import org.example.springboot.web.dto.UsersResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;

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

    public void deleteUser(Long Id) {
        Long deleteId = usersRepository.findById(Id).get().getId();
        usersRepository.deleteById(deleteId);
    }

    public Users login(String loginId, String loginPassword){
        return usersRepository.findByUserId(loginId)
                .filter(m -> m.getPassword().equals(loginPassword))
                .orElse(null);
    }

    public Optional<Users> findByUserId(String userId){return usersRepository.findByUserId(userId);
    }
    public List<Users> findUsers() {return usersRepository.findAll();
    }
}
