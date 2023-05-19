package org.example.springboot.service.LocalNodes;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.links.Links;
import org.example.springboot.domain.localNodes.LocalNodes;
import org.example.springboot.domain.localNodes.LocalNodesRepository;
import org.example.springboot.service.Links.LinksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Service
@RequiredArgsConstructor //final이 선언된 모든 필드를 인자값으로하는 생성자를 대신 생성 (리포지토리를 대신 생성)
public class LocalNodesService {
    private final LocalNodesRepository localNodesRepository;
    private final LinksService linksService;

    //경도와 위도를 받아서 가장 가까운 노드 nodeId반환
    public List<LocalNodes> getAll(){
        return localNodesRepository.findAll();
    }

    public Integer closestNode(Double longitude, Double latitude){
        List<LocalNodes> localNodesList= localNodesRepository.findAll();
        Integer result = null;
        Double distance_min = Double.MAX_VALUE;
        for (LocalNodes node: localNodesList
             ) {
            Double distance = getDistance(longitude,latitude,node);
            if(distance < distance_min) {
                result = node.getNodeId();
                distance_min = distance;
            }

        }
        return result;

    }
    //다익스트라 이용 최단거리 반환.

    public Double getDistance(Double lo,Double la, LocalNodes node) {
        // Math.pow() <- 제곱
        // Math.sqrt() <- 루트
        Double nodeLo, nodeLa;
        Double lad,lod;
        Double d;
        nodeLo=node.getLongitude();
        nodeLa=node.getLatitude();


        lad = (Double) Math.pow((la-nodeLa),2);
        lod = (Double) Math.pow((lo-nodeLo),2);
        d = Math.sqrt(lad+lod);
        return d;
    }
    public ArrayList<Route> insertCoordinate(Queue<Links> input,Float drivingScore){
        ArrayList<Route> result = new ArrayList<>();
        while(!input.isEmpty()){
            Links l = input.poll();
            Integer s= l.getStartNode();
            Integer d= l.getDestNode();
            boolean childZone=false;
            if(l.getChildrenZone() != 0) childZone=true;
            boolean crossWalk=false;
            if(l.getCrossWalk() != 0) crossWalk=true;
            LocalNodes sNode=localNodesRepository.findByNodeId(s).get();
            LocalNodes dNode=localNodesRepository.findByNodeId(d).get();
            Double score = linksService.weightBySafe(l,drivingScore);
            Route r = Route.builder()
                    .startLatitude(sNode.getLatitude())
                    .startLongitude(sNode.getLongitude())
                    .destLatitude(dNode.getLatitude())
                    .destLongitude(dNode.getLongitude())
                    .childZone(childZone)
                    .accidentNum(l.getAccidentNum())
                    .carEntranceNum(l.getCarEntranceNum())
                    .crossWalk(crossWalk)
                    .score(score)
                    .build();
            result.add(0,r);
        }
        return result;
    }
}
