package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TestMapRequestDto {
    String userId;



    @Builder
    public TestMapRequestDto(String userId){
        this.userId=userId;
    }
}
