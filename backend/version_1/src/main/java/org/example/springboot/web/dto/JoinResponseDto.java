package org.example.springboot.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class JoinResponseDto {
    private final String userId;
    private final String password;
    private final String name;
    private final Float drivingScore;
    private final Long mileage;
}
