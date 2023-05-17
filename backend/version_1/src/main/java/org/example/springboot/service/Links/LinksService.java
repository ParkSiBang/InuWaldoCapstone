package org.example.springboot.service.Links;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.links.Links;
import org.example.springboot.domain.links.LinksRepository;
import org.example.springboot.service.LocalNodes.Route;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.*;

@Service
@RequiredArgsConstructor
public class LinksService {
    private final LinksRepository linksRepository;
    public Queue<Links> getAll(){
        Queue<Links> result = new LinkedList<>();
        List<Links> links = linksRepository.findAll();
        for (Links l:links) {
            result.add(l);
        }

        return result;
    }
    public Double weightBySafe(Links link, Float drivingScore){
        Double result=0D;
        Double dist=link.getDistance();
        Integer accidentNum=link.getAccidentNum();
        Integer carEntrance=link.getCarEntranceNum();
        Integer childrenZone=link.getChildrenZone();
        Double rate = (100-(double)drivingScore)/100;
        //거리 가중치 0~300 -> 40 ~ 0
        if(dist < 500) result += (dist / 500) * 40;
        //사고횟수 0~2 -> 20~0
        if(accidentNum <= 2 ) result += (((double)accidentNum)/2)*20*rate;
        //차량출입구 0~4 -> 20~0
        if(carEntrance <= 4) result += (((double)accidentNum)/4)*20*rate;
        //어린이보호구역 = 0 or 20
        if(childrenZone == 1) result += 20*rate;;


        return result;
    }
    public Queue<Links> findPath(Integer start, Integer dest, boolean type , Float drivingScore){ //시작,목적지,타입 true=최단, false=안전
        List<Links> allLinks = linksRepository.findAll();


        //맵 초기화
        /*
        paths 구조
        해쉬 맵을 이용. nodeid가 key,
        path(시작노드id, 목적지노드id, 거리)를 list로 만들어 value
        */

        HashMap<Integer,List<Path>> paths = new HashMap<>();
        for(int i=0; i< allLinks.size(); i++){
            Links link=allLinks.get(i);
            Integer startIndex = link.getStartNode();
            Integer destIndex = link.getDestNode();
            Double weight;
            Long linksId=link.getId();
            if(type) {
                weight = link.getDistance();
            }else{
                weight = weightBySafe(link,drivingScore);
            }

            if(paths.containsKey(startIndex)){ //이미 등록된 노드면 path만 추가
                paths.get(startIndex).add(Path.builder()
                        .start(startIndex)
                        .dest(destIndex)
                        .weight(weight)
                        .linksId(linksId).build());

            }else{//새 노드 추가 (path도 함께 추가)
                List<Path> fp = new ArrayList<>();
                fp.add(Path.builder()
                        .start(startIndex)
                        .dest(destIndex)
                        .weight(weight)
                        .linksId(linksId).build());

                paths.put(startIndex,fp);
            }
        }
        //dist배열
        HashMap<Integer,Pair<Double,Long>> dist = new HashMap<>(); //<dest,<weight,linksId>
        dist.put(start,Pair.of(0D,0L)); //시작점-시작점 삽입
        //우선순위 큐
        PriorityQueue<Path> pq = new PriorityQueue<>();

        //시작 노드 경로들 삽입.
        paths.get(start).stream().forEach(p-> {
            pq.add(p); //우선순위 큐에 삽입
            }
        );


        while(!pq.isEmpty()){
            Path p = pq.poll(); //가장 짧은 경로Integer s=p.getStart();
            Integer s=p.getStart();
            Integer d=p.getDest();
            Double w= p.getWeight();
            Long linksId=p.getLinksId();
            //업데이트
            if(dist.containsKey(d)){
                if(dist.get(d).getFirst() < w){
                    dist.replace(d,Pair.of(w,linksId));
                }
            }
            else{
                dist.put(d,Pair.of(w,linksId));
            }
            //해당 노드(d)에서 다음 경로 찾기

            for (Path v:paths.get(d)
                 ) {
                Integer d1 =v.getDest();
                Double w1= v.getWeight();
                Double newWeight=dist.get(d).getFirst() + w1;

                if(dist.containsKey(d1)){
                    Double oldWeight=dist.get(d1).getFirst();
                    if(oldWeight > newWeight ){
                        //지금까지 아는 것보다 좋으면 삽입
                        v.setWeight(newWeight);
                        pq.add(v);
                    }

                }else{
                    v.setWeight(newWeight);
                    pq.add(v);
                }

            }

        }
        Queue<Links> linksQueue=new LinkedList<>();
        Long link=dist.get(dest).getSecond(); //링크아이디
        while(link!=0){
            Links l = linksRepository.findById(link).get();
            linksQueue.add(l);
            link=dist.get(l.getStartNode()).getSecond();
        }
        //

        return linksQueue;

    }


}
