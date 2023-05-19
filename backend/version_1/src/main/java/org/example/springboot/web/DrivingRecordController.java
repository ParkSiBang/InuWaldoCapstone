package org.example.springboot.web;

import lombok.RequiredArgsConstructor;
import org.example.springboot.service.DrivingRecord.DrivingRecordService;
import org.example.springboot.web.dto.CoordinateDto;
import org.example.springboot.web.dto.DrivingRecordDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DrivingRecordController {
    private final DrivingRecordService drivingRecordService;

    @PostMapping("/record")
    public void DrivingRecord(@RequestBody DrivingRecordDto drivingRecordDto) {
        String userId = drivingRecordDto.getUserId();
        Long mileage  = drivingRecordDto.getMileage();

        Integer sharpSpeedingNum  = drivingRecordDto.getSharpSpeedingNum();
        Integer sharpBreakingNum  = drivingRecordDto.getSharpBreakingNum ();
        Integer sharpCurvingNum  = drivingRecordDto.getSharpCurvingNum();
        Integer speedingNum  = drivingRecordDto.getSpeedingNum();
        Integer accidentNum  = drivingRecordDto.getAccidentNum();
        Integer drivingDistance  = drivingRecordDto.getDrivingDistance();

        CoordinateDto[] accidentCoordinates = drivingRecordDto.getAccidentCoordinates();

        Float drivingScore = drivingRecordService.drivingScore(sharpSpeedingNum, sharpBreakingNum, sharpCurvingNum, speedingNum, accidentNum);
        drivingRecordService.infoUpdate(userId, mileage, drivingDistance, drivingScore);
        drivingRecordService.linkUpdate(accidentCoordinates);
    }
}
