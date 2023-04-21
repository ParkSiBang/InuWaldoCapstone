package org.example.springboot.web;

import lombok.RequiredArgsConstructor;
import org.example.springboot.service.DrivingRecord.DrivingRecordService;
import org.example.springboot.web.dto.DrivingRecordDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DrivingRecordController {
    private final DrivingRecordService drivingRecordService;

    @PostMapping("/record")
    public double createDrivingScore(@RequestBody DrivingRecordDto drivingRecordDto) {
        System.out.println(drivingRecordDto.toString());
        Integer doubling = drivingRecordDto.getDoubling();
        Integer suddenDrive = drivingRecordDto.getSuddenDrive();
        Integer fallDown = drivingRecordDto.getFallDown();
        Integer speeding = drivingRecordDto.getSpeeding();

        double drivingScore = drivingRecordService.DrivingScore(doubling, suddenDrive, fallDown, speeding);
        return drivingScore;
    }
}
