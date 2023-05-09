package org.example.springboot.domain.users;

import junit.framework.TestCase;
import org.example.springboot.domain.localNodes.LocalNodes;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
//@Transactional
public class UsersRepositoryTest extends TestCase {
    @Autowired
    UsersRepository usersRepository;
    @Test
    public void 유저테이블테스트() {
        usersRepository.save(Users.builder()
                .userId("qwer")
                .password("1234")
                .name("tomas")
                .drivingScore(10F)
                .mileage(10L)
                .totalDistance(10F)
                .build());
        List<Users> usersList = usersRepository.findAll();
        Optional<Users> users = usersList.stream()
                .filter(user -> user.getUserId().equals("qwer")).findAny();

        assertThat(users.get().getUserId()).isEqualTo("qwer");
    }
}