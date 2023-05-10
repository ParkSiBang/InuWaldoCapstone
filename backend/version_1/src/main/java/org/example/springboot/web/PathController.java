package org.example.springboot.web;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.links.Links;
import org.example.springboot.service.Links.LinksService;
import org.example.springboot.service.Links.Path;
import org.example.springboot.service.LocalNodes.LocalNodesService;
import org.example.springboot.service.LocalNodes.Route;
import org.example.springboot.service.Users.UsersService;
import org.example.springboot.web.dto.PathRequestDto;
import org.example.springboot.web.dto.PathResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Queue;



@RestController
@RequiredArgsConstructor
public class PathController {
    private final LocalNodesService localNodesService;
    private final LinksService linksService;
    private final UsersService usersService;

    /*
    @GetMapping("/path")
    public String findPath(@RequestParam("startLatitude") Double startLatitude,
                           @RequestParam("startLongitude") Double startLongitude){
        Integer startNode = localNodesService.closestNode(startLongitude,startLatitude);
        return startNode.toString();
    }
    public PathResponseDto findPath(@RequestBody PathRequestDto pathRequest) throws Exception {
        Double startLatitude= pathRequest.getStartLatitude();
        Double startLongitude= pathRequest.getStartLongitude();
        Double destLatitude= pathRequest.getDestLatitude();
        Double destLongitude= pathRequest.getDestLongitude();

        Integer startNode = localNodesService.closestNode(startLongitude,startLatitude);
        Integer destNode = localNodesService.closestNode(destLongitude,destLatitude);


        PathResponseDto response = new PathResponseDto(linksService.findPath(startNode,destNode,true));
        return response;
    }

     */
    @PostMapping("/path")
    public PathResponseDto findPath(@RequestBody PathRequestDto pathRequest){
        Double startLatitude= pathRequest.getStartLatitude();
        Double startLongitude= pathRequest.getStartLongitude();
        Double destLatitude= pathRequest.getDestLatitude();
        Double destLongitude= pathRequest.getDestLongitude();
        String userId= pathRequest.getUserId();
        System.out.println("param:"+pathRequest.getStartLatitude());
        // 노드 지정
        Integer startNode = localNodesService.closestNode(startLongitude,startLatitude);
        Integer destNode = localNodesService.closestNode(destLongitude,destLatitude);
        // 경로 탐색
        Float drivingScore = usersService.findByUserId(userId).get().getDrivingScore(); //운전점수 가져오기
        Queue<Links> fastest = linksService.findPath(startNode,destNode,false,drivingScore); //운전점수 반영
        ArrayList<Route> result=localNodesService.insertCoordinate(fastest);
        PathResponseDto response = new PathResponseDto(result);


        return response;
    }




}
