package org.example.springboot.service.LocalNodes;

import junit.framework.TestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LocalNodesServiceTest extends TestCase {
    @Autowired
    LocalNodesService localNodesService;
    /*임시테스트
    @Test
    public void testClosestNode() {
        //given
        Double longitude = 59.3;
        Double latitude = 10.2;
        //when
        Optional<Integer> closestNodeId =Optional.ofNullable(localNodesService.closestNode(longitude,latitude));
        //
        assertThat(closestNodeId.get()).isEqualTo(1003);

    }
    */



}