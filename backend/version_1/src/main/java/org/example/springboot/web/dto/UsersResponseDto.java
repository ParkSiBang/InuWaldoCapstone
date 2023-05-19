package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
public class UsersResponseDto {
    String userId;

    String name;

    Float drivingScore;

    Long mileage;

    Integer totalDistance;

    Integer recentDistance;

    Integer totalSharpSpeedingNum;

    Integer totalSharpBrakingNum;

    Integer totalSharpCurvingNum;

    Integer totalSpeedingNum;

    Integer totalAccidentNum;

    Integer recentSharpSpeedingNum;

    Integer recentSharpBrakingNum;

    Integer recentSharpCurvingNum;

    Integer recentSpeedingNum;

    Integer recentAccidentNum;

    Integer totalDrivingTime;

    Integer recentDrivingTime;

    @Builder
    public UsersResponseDto(String userId, String name, Float drivingScore, Long mileage, Integer totalDistance,
                            Integer recentDistance, Integer totalSharpSpeedingNum, Integer totalSharpBrakingNum, Integer totalSharpCurvingNum,
                            Integer totalSpeedingNum, Integer totalAccidentNum, Integer recentSharpSpeedingNum, Integer recentSharpBrakingNum,
                            Integer recentSharpCurvingNum, Integer recentSpeedingNum, Integer recentAccidentNum, Integer totalDrivingTime,
                            Integer recentDrivingTime) {
        this.userId=userId;
        this.name=name;
        this.drivingScore=drivingScore;
        this.mileage=mileage;
        this.totalDistance = totalDistance;
        this.recentDistance = recentDistance;
        this.totalSharpSpeedingNum = totalSharpSpeedingNum;
        this.totalSharpBrakingNum = totalSharpBrakingNum;
        this.totalSharpCurvingNum = totalSharpCurvingNum;
        this.totalSpeedingNum = totalSpeedingNum;
        this.totalAccidentNum = totalAccidentNum;
        this.recentSharpSpeedingNum = recentSharpSpeedingNum;
        this.recentSharpBrakingNum = recentSharpBrakingNum;
        this.recentSharpCurvingNum = recentSharpCurvingNum;
        this.recentSpeedingNum = recentSpeedingNum;
        this.recentAccidentNum = recentAccidentNum;
        this.totalDrivingTime = totalDrivingTime;
        this.recentDrivingTime = recentDrivingTime;
    }
}
