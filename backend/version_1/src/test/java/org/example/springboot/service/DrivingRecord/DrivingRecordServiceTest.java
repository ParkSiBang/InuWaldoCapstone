package org.example.springboot.service.DrivingRecord;

import junit.framework.TestCase;
import org.example.springboot.domain.users.UsersRepository;
import org.example.springboot.web.dto.CoordinateDto;
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

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DrivingRecordServiceTest extends TestCase {
    @Autowired
    private DrivingRecordService drivingRecordService;
    @Autowired
    UsersRepository usersRepository;
    @Test
    public void 운전점수테스트() throws Exception {
        DrivingRecordDto drivingRecordDto = DrivingRecordDto.builder()
                .userId("test")
                .mileage(1200L)
                .sharpSpeedingNum(1)
                .sharpBrakingNum(1)
                .sharpCurvingNum(1)
                .speedingNum(1)
                .accidentNum(1)
                .drivingDistance(12)
                .build();

        Float drivingScore = drivingRecordService.drivingScore(drivingRecordDto.getSharpSpeedingNum(), drivingRecordDto.getSharpBrakingNum(),
                drivingRecordDto.getSharpCurvingNum(), drivingRecordDto.getSpeedingNum(), drivingRecordDto.getAccidentNum());

        System.out.println("운전점수테스트" + drivingScore);
    }

    @Test
    public void 유저정보업데이트테스트() throws Exception {
        DrivingRecordDto drivingRecordDto = DrivingRecordDto.builder()
                .userId("joinTestplease")
                .mileage(1200L)
                .drivingDistance(12)
                .sharpSpeedingNum(1)
                .sharpBrakingNum(0)
                .sharpCurvingNum(0)
                .speedingNum(0)
                .accidentNum(1)
                .build();

        Float drivingScore = 70f;
        drivingRecordService.infoUpdate(drivingRecordDto.getUserId(), drivingRecordDto.getMileage(), drivingRecordDto.getDrivingDistance(), drivingScore,
                drivingRecordDto.getSharpSpeedingNum(), drivingRecordDto.getSharpBrakingNum(), drivingRecordDto.getSharpCurvingNum(),
                drivingRecordDto.getSpeedingNum(), drivingRecordDto.getAccidentNum());
    }

    @Test
    public void 링크업데이트테스트() throws Exception {
        CoordinateDto coordinateDto1 = CoordinateDto.builder()
                .latitude(37.372597)
                .longitude(126.632243)
                .build();

        CoordinateDto coordinateDto2 = CoordinateDto.builder()
                .latitude(37.372345)
                .longitude(126.632754)
                .build();

        CoordinateDto[] coordinates = {coordinateDto1, coordinateDto2};
        drivingRecordService.linkUpdate(coordinates);
    }
}
