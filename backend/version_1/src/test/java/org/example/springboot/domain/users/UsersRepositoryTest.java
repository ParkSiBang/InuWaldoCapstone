package org.example.springboot.domain.users;

import junit.framework.TestCase;
import org.example.springboot.domain.users.UsersRepository;
import org.example.springboot.domain.users.Users;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UsersRepositoryTest extends TestCase {
    @Autowired
    UsersRepository usersRepository;
    @After
    public void cleanup(){usersRepository.deleteAll();}
    @Test
    public void 회원가입테스트(){
        //given
        String userId="thomas123";
        String password="abcd";
        String name="thomas";
        Float drivingScore=98.2f;
        Long mileage=200l;

        //when
        usersRepository.save(Users.builder()
                .userId(userId)
                .password(password)
                .name(name)
                .drivingScore(drivingScore)
                .mileage(mileage)
                .build());
        List<Users> usersList = usersRepository.findAll();
        Optional<Users> users = usersList.stream()
                .filter(user -> user.getUserId().equals("thomas123")).findAny();

        //
        assertThat(users.get().getUserId()).isEqualTo(userId);
        assertThat(users.get().getPassword()).isEqualTo(password);
        assertThat(users.get().getName()).isEqualTo(name);
        assertThat(users.get().getDrivingScore()).isEqualTo(drivingScore);
        assertThat(users.get().getMileage()).isEqualTo(mileage);


    }
}