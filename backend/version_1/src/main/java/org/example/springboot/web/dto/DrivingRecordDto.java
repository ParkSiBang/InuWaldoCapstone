package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DrivingRecordDto {
    String userId; //유저아이디
    Long mileage; //과속

    Integer sharpSpeedingNum; //급가속
    Integer sharpBreakingNum; //금감속
    Integer sharpCurvingNum; //급커브
    Integer speedingNum; //과속
    Integer accidentNum; //사고횟수
    Integer drivingDistance; //주행거리

    CoordinateDto[] accidentCoordinates; //사고 좌표

    @Builder
    public DrivingRecordDto(String userId, Long mileage, Integer sharpSpeedingNum, Integer sharpBreakingNum,
                            Integer sharpCurvingNum, Integer speedingNum, Integer accidentNum,
                            Integer drivingDistance, CoordinateDto[] accidentCoordinates){
        this.userId = userId;
        this.mileage = mileage;
        this.sharpSpeedingNum = sharpSpeedingNum;
        this.sharpBreakingNum = sharpBreakingNum;
        this.sharpCurvingNum = sharpCurvingNum;
        this.speedingNum = speedingNum;
        this.accidentNum = accidentNum;
        this.drivingDistance = drivingDistance;
        this.accidentCoordinates = accidentCoordinates;
    }
}
