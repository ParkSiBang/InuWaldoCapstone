package org.example.springboot.service.DrivingRecord;

import junit.framework.TestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DrivingRecordServiceTest extends TestCase {
    @Autowired
    private DrivingRecordService drivingRecordService;

    @Test
    public void 운전점수서비스테스트() {
        double DrivingScore = drivingRecordService.DrivingScore(1,1,1,1);
        System.out.println(DrivingScore);
    }
}
