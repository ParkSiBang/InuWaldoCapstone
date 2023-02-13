package org.example.springboot.service.LocalNodes;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.localNodes.LocalNodes;
import org.example.springboot.domain.localNodes.LocalNodesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor //final이 선언된 모든 필드를 인자값으로하는 생성자를 대신 생성 (리포지토리를 대신 생성)
public class LocalNodesService {
    private final LocalNodesRepository localNodesRepository;

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
    static Double getDistance(Double lo,Double la, LocalNodes node) {
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
}
