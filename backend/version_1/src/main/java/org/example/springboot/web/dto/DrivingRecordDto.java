package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor

public class DrivingRecordDto {
    Integer doubling; //급회전
    Integer suddenDrive; //급가속+급감속
    Integer fallDown; //넘어짐
    Integer speeding; //과속

    @Builder
    public DrivingRecordDto(Integer doubling, Integer suddenDrive, Integer fallDown, Integer speeding){
        this.doubling = doubling;
        this.suddenDrive = suddenDrive;
        this.fallDown = fallDown;
        this.speeding = speeding;
    }
}
