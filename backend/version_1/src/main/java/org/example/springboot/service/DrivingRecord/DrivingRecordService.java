package org.example.springboot.service.DrivingRecord;

import org.springframework.stereotype.Service;

@Service
public class DrivingRecordService {
    public double DrivingScore(Integer doubling, Integer suddenDrive, Integer fallDown, Integer speeding) {
        double DrivingScore = 100;

        //점수 생성 공식
        if (doubling > 0) {
            DrivingScore -= 1;
        }
        if (suddenDrive > 0) {
            DrivingScore -= 1;
        }
        if (fallDown > 0) {
            DrivingScore -= 1;
        }
        if (speeding > 0) {
            DrivingScore -= 1;
        }

        return DrivingScore;
    }
}
