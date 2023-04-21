package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsersResponseDto {
    String userId;

    String password;

    String name;

    Float drivingScore;

    Long mileage;

    Float totalDistance;

    @Builder
    public UsersResponseDto(String userId, String password, String name, Float drivingScore, Long mileage, Float totalDistance){
        this.userId=userId;
        this.password=password;
        this.name=name;
        this.drivingScore=drivingScore;
        this.mileage=mileage;
        this.totalDistance = totalDistance;
    }
}
