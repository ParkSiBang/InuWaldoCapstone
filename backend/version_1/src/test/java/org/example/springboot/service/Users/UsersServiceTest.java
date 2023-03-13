package org.example.springboot.service.Users;

import junit.framework.TestCase;
import org.example.springboot.domain.users.Users;
import org.example.springboot.domain.users.UsersRepository;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;


import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UsersServiceTest extends TestCase {

    @Autowired
    UsersService usersService;

    @Test
    public void 회원가입테스트() {

        //given
        Users users = new Users();
        users.setUserId("qwer");
        //when
        String Id = usersService.join(users);

        //then
        Users findUsers = usersService.findByUserId(Id).get();
        assertThat(findUsers.getUserId()).isEqualTo(findUsers.getUserId());
    }

    @Test
    public void 중복회원예외테스트() {
        //given
        Users user1 = new Users();
        user1.setUserId("qwer");

        Users user2 = new Users();
        user2.setUserId("qwer");
        //when
        usersService.join(user1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> usersService.join(user2));

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원 이름입니다.");
    }

    @Test
    public void userId찾기테스트() {
        Users users = new Users();
        users.setUserId("qwer");

        usersService.join(users);

        Users findUsersId = usersService.findByUserId("qwer").get();
        assertThat(findUsersId).isEqualTo(users);
    }

    @Test
    public void name찾기테스트() {

        Users users = new Users();
        users.setName("tomas");

        usersService.join(users);

        Users findUsersName = usersService.findByName("tomas").get();
        assertThat(findUsersName).isEqualTo(users);
    }

    @Test
    public void 전체유저찾기테스트() {
        //given
        Users users = new Users();
        users.setUserId("한명만 가입");

        usersService.join(users);

        List<Users> result = usersService.findUsers();
        assertThat(result.size()).isEqualTo(1);
    }
}
