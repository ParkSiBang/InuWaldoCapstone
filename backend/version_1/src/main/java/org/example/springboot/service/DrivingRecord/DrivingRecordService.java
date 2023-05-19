package org.example.springboot.service.DrivingRecord;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.users.Users;
import org.example.springboot.domain.users.UsersRepository;
import org.example.springboot.service.Links.LinksService;
import org.example.springboot.service.LocalNodes.LocalNodesService;
import org.example.springboot.web.dto.CoordinateDto;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DrivingRecordService {

    private final UsersRepository usersRepository;
    private final LinksService linksService;
    private final LocalNodesService localNodesService;

    //운전 점수 생성
    public Float drivingScore(Integer sharpSpeedingNum, Integer sharpBreakingNum, Integer sharpCurvingNum,
                              Integer speedingNum, Integer accidentNum) {
        Float DrivingScore = 100F;

        //점수 생성 공식
        if (sharpSpeedingNum > 0) //급가속 -10점
            DrivingScore -= 10;
        if (sharpBreakingNum > 0) //급감속 -10점
            DrivingScore -= 10;
        if (sharpCurvingNum > 0) //급커드 -10점
            DrivingScore -= 10;
        if (speedingNum > 0) //과속 -10점
            DrivingScore -= 10;
        if (accidentNum > 0) //사고횟수 -20점
            DrivingScore -= 20;

        return DrivingScore;
    }

    //유저 정보 갱신
    public void infoUpdate(String userId, Long mileage, Integer drivingDistance, Float DrivingScore) {
        Optional<Users> updateUser = usersRepository.findByUserId(userId);

        //운전점수 갱신
        Integer beforeDrivingDistance = updateUser.get().getTotalDistance();
        Float beforeDrivingScore = updateUser.get().getDrivingScore();
        Float DrivingScoreUpdate = ((beforeDrivingDistance * beforeDrivingScore) + (drivingDistance * DrivingScore)) / (beforeDrivingDistance + drivingDistance);
        //(기존 주행거리 x 기존 평균점수) + (새롭게 추가된 주행거리 * 새롭게 추가된 운전점수) / (총 주행거리)
        updateUser.get().setDrivingScore(DrivingScoreUpdate);

        //마일리지 갱신
        Long totalMileage = updateUser.get().getMileage();
        Long updateMileage = totalMileage + mileage;
        updateUser.get().setMileage(updateMileage);


        //주행거리 갱신
        Integer updateDistance = beforeDrivingDistance + drivingDistance;
        updateUser.get().setTotalDistance(updateDistance);

        usersRepository.save(updateUser.get());
    }

    //사고난 좌표를 통한 링크 갱신
    public void linkUpdate(CoordinateDto[] accidentCoordinates) {
        double accidentLatitude = 0;
        double accidentLongitude = 0;
        int accidentNodeId = 0;

        for(int i=0; i<accidentCoordinates.length; i++){
            accidentLatitude = accidentCoordinates[i].getLatitude();
            accidentLongitude = accidentCoordinates[i].getLongitude();
            accidentNodeId = localNodesService.closestNode(accidentLatitude, accidentLongitude);

            linksService.accidentNumIncrease(accidentNodeId);
        }
    }
}
