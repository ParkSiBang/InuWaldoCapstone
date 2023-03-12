package org.example.springboot.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.links.Links;

import java.util.Queue;

@Getter
@RequiredArgsConstructor
public class PathResponseDto {
    private final Queue<Links> fastestPath;
    //private final Queue<Links> safestPath;
}
