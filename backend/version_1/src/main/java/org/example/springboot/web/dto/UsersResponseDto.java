package org.example.springboot.web.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
public class UsersResponseDto {
    private String userId;
    private String password;
    private String name;
    private Float drivingScore;
    private Long mileage;
}