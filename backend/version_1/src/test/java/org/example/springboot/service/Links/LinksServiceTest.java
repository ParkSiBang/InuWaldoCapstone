package org.example.springboot.service.Links;

import junit.framework.TestCase;
import org.example.springboot.domain.links.Links;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Queue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LinksServiceTest extends TestCase {
    @Autowired
    private LinksService linksService;
    @Test
    public void testFindPath() {
        Queue<Links> q= linksService.findPath(3001,3005,true);
    }
}