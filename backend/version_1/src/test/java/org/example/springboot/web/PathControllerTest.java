package org.example.springboot.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import junit.framework.TestCase;
import org.example.springboot.domain.localNodes.LocalNodesRepository;
import org.example.springboot.web.dto.PathRequestDto;
import org.example.springboot.web.dto.PathResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) //webmvc 테스트로는 jpa가 작동하지 않음.

public class PathControllerTest extends TestCase {
    @LocalServerPort
    private int port;
    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    ObjectMapper objectMapper;
    @Test
    public void 경로탐색() throws Exception{

        //PathRequestDto pathRequestDto = new PathRequestDto(37.388485,126.641808,37.388334,126.642515);
        PathRequestDto pathRequestDto = PathRequestDto.builder()
                .startLatitude(37.388485)
                .startLongitude(126.641808)
                .destLatitude(37.388334)
                .destLongitude(126.642515)
                .userId("jo1234")
                .build();

        String url="http://localhost:" + port + "/path";

        //
        ResponseEntity<String> response = restTemplate.postForEntity(url,pathRequestDto, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);


        System.out.println("경로탐색테스트");
        System.out.println(response.getBody());



    }

}