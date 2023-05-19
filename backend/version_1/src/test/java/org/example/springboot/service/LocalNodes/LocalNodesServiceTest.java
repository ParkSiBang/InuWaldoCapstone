package org.example.springboot.service.LocalNodes;

import junit.framework.TestCase;
import org.example.springboot.domain.links.Links;
import org.example.springboot.service.Links.LinksService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;
import java.util.Queue;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LocalNodesServiceTest extends TestCase {
    @Autowired
    LocalNodesService localNodesService;

    @Autowired
    LinksService linksService;

    @Test
    public void testClosestNode() {
        //given
        Double longitude = 126.6439799;
        Double latitude = 37.3795179;
        //when
        Optional<Integer> closestNodeId =Optional.ofNullable(localNodesService.closestNode(longitude,latitude));
        //
        assertThat(closestNodeId.get()).isEqualTo(2084);

    }
    /*
    @Test
    public void insertCoordinateTest(){
        //given
        Queue<Links> q = linksService.findPath(3001,3005,true);
        //when
        Queue<Route> r = localNodesService.insertCoordinate(q);
        //
        r.stream().forEach(i->{
            System.out.println("startNode:"+i.getStartLongitude());
        });
    */




}