package org.example.springboot.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PathRequestDto {
    private final Double startLatitude;
    private final Double startLongitude;
    private final Double destLatitude;
    private final Double destLongitude;
}
