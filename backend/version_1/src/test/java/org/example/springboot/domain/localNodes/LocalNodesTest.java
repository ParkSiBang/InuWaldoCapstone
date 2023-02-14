package org.example.springboot.domain.localNodes;

import junit.framework.TestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LocalNodesTest extends TestCase {
    @Autowired
    LocalNodesRepository localNodesRepository;

    @Test
    public void 노드삽입테스트(){
        localNodesRepository.save(LocalNodes.builder()
                .nodeId(1001)
                .latitude(98.2)
                .longitude(99.9).build());
        List<LocalNodes> localNodesList = localNodesRepository.findAll();
        Optional<LocalNodes> localNodes = localNodesList.stream()
                .filter(localnode -> localnode.getNodeId().equals(1001)).findAny();

        assertThat(localNodes.get().getNodeId()).isEqualTo(1001);
        assertThat(localNodes.get().getLatitude()).isEqualTo(98.2);
        assertThat(localNodes.get().getLongitude()).isEqualTo(99.9);

    }
}