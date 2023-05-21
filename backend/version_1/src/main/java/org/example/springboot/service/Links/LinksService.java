package org.example.springboot.service.Links;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.links.Links;
import org.example.springboot.domain.links.LinksRepository;
import org.example.springboot.domain.localNodes.LocalNodesRepository;
import org.example.springboot.domain.users.Users;
import org.example.springboot.service.LocalNodes.Route;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.*;

@Service
@RequiredArgsConstructor
public class LinksService {
    private final LinksRepository linksRepository;
    private final LocalNodesRepository localNodesRepository;
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
        Double rate = 0d;
        if (drivingScore <= 99){
            rate = ((100-(double)drivingScore) / (double)100);
        }
        //거리 가중치 0~300 -> 40 ~ 0
        if(dist < 500) result += ((double)dist / 500) * 40;
        //사고횟수 0~2 -> 20~0
        if(accidentNum <= 2 ) result += (((double)accidentNum)/2)*20*rate;
        //차량출입구 0~4 -> 20~0
        if(carEntrance <= 4) result += (((double)accidentNum)/4)*20*rate;
        //어린이보호구역 = 0 or 20
        if(childrenZone == 1) result += 100*rate;;


        return result;
    }
    public Queue<Links> findPath(Integer start, Integer dest, boolean type, Float drivingScore) {
        List<Links> allLinks = linksRepository.findAll();

        // 맵 초기화 및 방문한 노드 추적을 위한 Set 생성
        HashMap<Integer, List<Path>> paths = new HashMap<>();
        Set<Integer> visitedNodes = new HashSet<>();

        for (int i = 0; i < allLinks.size(); i++) {
            Links link = allLinks.get(i);
            Integer startIndex = link.getStartNode();
            Integer destIndex = link.getDestNode();
            Double weight;
            Long linksId = link.getId();

            if (type) {
                weight = link.getDistance();
            } else {
                weight = weightBySafe(link, drivingScore);
            }

            if (paths.containsKey(startIndex)) {
                paths.get(startIndex).add(Path.builder()
                        .start(startIndex)
                        .dest(destIndex)
                        .weight(weight)
                        .linksId(linksId)
                        .build());
            } else {
                List<Path> fp = new ArrayList<>();
                fp.add(Path.builder()
                        .start(startIndex)
                        .dest(destIndex)
                        .weight(weight)
                        .linksId(linksId)
                        .build());
                paths.put(startIndex, fp);
            }
        }

        // dist 배열
        HashMap<Integer, Pair<Double, Long>> dist = new HashMap<>();
        dist.put(start, Pair.of(0D, 0L)); // 시작점-시작점 삽입

        // 우선순위 큐
        PriorityQueue<Path> pq = new PriorityQueue<>();

        // 시작 노드 경로들 삽입
        paths.get(start).forEach(p -> {
            pq.add(p);
            visitedNodes.add(p.getDest()); // 방문한 노드로 추가
        });

        while (!pq.isEmpty()) {
            Path p = pq.poll();
            Integer s = p.getStart();
            Integer d = p.getDest();
            Double w = p.getWeight();
            Long linksId = p.getLinksId();

            // 업데이트
            if (dist.containsKey(d)) {
                if (dist.get(d).getFirst() > w) { // 최단 경로를 찾기 위해 수정
                    dist.replace(d, Pair.of(w, linksId));
                }
            } else {
                dist.put(d, Pair.of(w, linksId));
            }

            // 해당 노드(d)에서 다음 경로 찾기
            for (Path v : paths.get(d)) {
                Integer d1 = v.getDest();
                Double w1 = v.getWeight();
                Double newWeight = dist.get(d).getFirst() + w1;

                if (!dist.containsKey(d1) || dist.get(d1).getFirst() > newWeight) {
                    v.setWeight(newWeight);
                    if (!visitedNodes.contains(d1)) {
                        pq.add(v);
                        visitedNodes.add(d1); // 방문한 노드로 추가
                    }
                }
            }
        }

        Queue<Links> linksQueue = new LinkedList<>();
        Long link = dist.get(dest).getSecond(); // 링크 아이디

        while (link != 0) {
            Links l = linksRepository.findById(link).orElse(null);
            if (l != null) {
                linksQueue.add(l);
                link = dist.get(l.getStartNode()).getSecond();
            }
        }

        return linksQueue;
    }

    public void accidentNumIncrease(int nodeId) {
        List<Links> linkIdList = new ArrayList<>();

        linkIdList = linksRepository.findAllByStartNode(nodeId);

        for(int i = 0; i<linkIdList.size(); i++){
            Optional<Links> updateStartNodeLink = linksRepository.findById(linkIdList.get(i).getId());
            int AccidentNum = updateStartNodeLink.get().getAccidentNum();
            AccidentNum = AccidentNum + 1;
            updateStartNodeLink.get().setAccidentNum(AccidentNum);
            linksRepository.save(updateStartNodeLink.get());
        }

        linkIdList = linksRepository.findAllByDestNode(nodeId);

        for(int i = 0; i<linkIdList.size(); i++){
            Optional<Links> updateDestNodeLink = linksRepository.findById(linkIdList.get(i).getId());
            int AccidentNum = updateDestNodeLink.get().getAccidentNum();
            AccidentNum = AccidentNum + 1;
            updateDestNodeLink.get().setAccidentNum(AccidentNum);
            linksRepository.save(updateDestNodeLink.get());
        }
    }
}
