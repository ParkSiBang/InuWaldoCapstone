package org.example.springboot.domain.links;

import junit.framework.TestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class LinksTest extends  TestCase {
    @Autowired
    LinksRepository linksRepository;

    @Test
    public void 링크삽입테스트() {
        linksRepository.save(Links.builder()
                .startNode(1050)
                .destNode(1051)
                .childrenZone(0)
                .accidentNum(1)
                .carEntranceNum(1)
                .distance(3.0D)
                .crossWalk(1)
                .build());
        List<Links> linksList = linksRepository.findAll();
        Optional<Links> links = linksList.stream()
                .filter(link -> link.getStartNode().equals(1050)).findAny();

        assertThat(links.get().getStartNode()).isEqualTo(1050);
        assertThat(links.get().getDestNode()).isEqualTo(1051);
        assertThat(links.get().getChildrenZone()).isEqualTo(0);
        assertThat(links.get().getAccidentNum()).isEqualTo(1);
        assertThat(links.get().getCarEntranceNum()).isEqualTo(1);
        assertThat(links.get().getDistance()).isEqualTo(3.0D);
        assertThat(links.get().getCrossWalk()).isEqualTo(1);
    }
}
