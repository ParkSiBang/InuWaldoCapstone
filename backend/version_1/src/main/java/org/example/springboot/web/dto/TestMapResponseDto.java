package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.links.Links;
import org.example.springboot.domain.localNodes.LocalNodes;
import org.example.springboot.service.LocalNodes.Route;

import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class TestMapResponseDto {
    ArrayList<Route> testLinks;
    List<LocalNodes> testNodes;
    @Builder
    public TestMapResponseDto(ArrayList<Route> testLinks, List<LocalNodes> testNodes) {
        this.testLinks = testLinks;
        this.testNodes = testNodes;
    }

}
