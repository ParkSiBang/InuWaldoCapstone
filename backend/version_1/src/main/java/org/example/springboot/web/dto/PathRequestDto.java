package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor

public class PathRequestDto {
    Double startLatitude;
    Double startLongitude;
    Double destLatitude;
    Double destLongitude;

    String userId;

    @Builder
    public PathRequestDto(Double startLatitude, Double startLongitude, Double destLatitude, Double destLongitude, String userId){
        this.startLatitude = startLatitude;
        this.startLongitude=startLongitude;
        this.destLatitude=destLatitude;
        this.destLongitude=destLongitude;
        this.userId=userId;
    }
}
