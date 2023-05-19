package org.example.springboot.web;

import junit.framework.TestCase;
import org.example.springboot.domain.users.Users;
import org.example.springboot.web.dto.UsersRequestDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UsersControllerTest extends TestCase {
    @LocalServerPort
    private int port;
    @Autowired
    TestRestTemplate restTemplate;

    @Test
    public void 유저컨트롤러_회원가입테스트() throws Exception {
        UsersRequestDto usersRequestDto = UsersRequestDto.builder()
                .userId("joinTest1234")
                .password("joinTest5678")
                .name("joinTest")
                .build();

        String url="http://localhost:" + port + "/join";

        ResponseEntity<String> response = restTemplate.postForEntity(url, usersRequestDto, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        System.out.println("유저컨트롤러_회원가입테스트");
    }

    @Test
    public void 유저컨트롤러_회원탈퇴테스트() throws Exception {
        UsersRequestDto usersRequestDto = UsersRequestDto.builder()
                .userId("joinTest1234")
                .password("joinTest5678")
                .build();

        String url="http://localhost:" + port + "/deleteUser";

        ResponseEntity<String> response = restTemplate.postForEntity(url, usersRequestDto, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        System.out.println("유저컨트롤러_회원탈퇴테스트");
    }

    @Test
    public void 유저컨트롤러_로그인테스트() throws Exception {
        String loginId = "qwer";
        String loginPassword = "1234";

        UsersRequestDto usersRequestDto = UsersRequestDto.builder()
                .userId(loginId)
                .password(loginPassword)
                .build();

        String url="http://localhost:" + port + "/login";

        ResponseEntity<String> response = restTemplate.postForEntity(url, usersRequestDto, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        System.out.println("유저컨트롤러_로그인테스트");
    }


    @Test
    public void 유저컨트롤러_로그아웃테스트() throws Exception {
        System.out.println("유저컨트롤러_로그아웃테스트");
    }

    @Test
    public void 유저컨트롤러_회원조회테스트() throws Exception {
        String loginId = "qwer";

        UsersRequestDto usersRequestDto = UsersRequestDto.builder()
                .userId(loginId)
                .build();

        String url="http://localhost:" + port + "/userInfo";

        ResponseEntity<String> response = restTemplate.postForEntity(url, usersRequestDto, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        System.out.println("유저컨트롤러_회원조회테스트");
    }
}