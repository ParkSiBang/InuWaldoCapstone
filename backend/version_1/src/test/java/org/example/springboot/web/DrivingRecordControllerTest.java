package org.example.springboot.web;

import junit.framework.TestCase;
import org.example.springboot.web.dto.DrivingRecordDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DrivingRecordControllerTest extends TestCase {
    @LocalServerPort
    private int port;

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    public void 운전기록컨트롤러테스트() throws Exception {
        DrivingRecordDto drivingRecordDto = DrivingRecordDto.builder()
                .doubling(0)
                .suddenDrive(0)
                .fallDown(1)
                .speeding(0)
                .build();

        String url="http://localhost:" + port + "/record";

        ResponseEntity<String> response = restTemplate.postForEntity(url, drivingRecordDto, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        System.out.println("운전기록컨트롤러테스트");
    }
}
