package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CoordinateDto {
    Double longitude;
    Double latitude;

    @Builder
    public CoordinateDto(Double longitude, Double latitude){
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
