package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;

@Getter
@RequiredArgsConstructor
public class UsersResponseDto {
    private final String userId;

    private final String name;

    private final Float drivingScore;

    private final Long mileage;

    private final Integer totalDistance;

    private final Integer recentDistance;

    private final Integer totalSharpSpeedingNum;

    private final Integer totalSharpBrakingNum;

    private final Integer totalSharpCurvingNum;

    private final Integer totalSpeedingNum;

    private final Integer totalAccidentNum;

    private final Integer recentSharpSpeedingNum;

    private final Integer recentSharpBrakingNum;

    private final Integer recentSharpCurvingNum;

    private final Integer recentSpeedingNum;

    private final Integer recentAccidentNum;

    private final Integer totalDrivingTime;

    private final Integer recentDrivingTime;

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
