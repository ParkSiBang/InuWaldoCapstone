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
}
