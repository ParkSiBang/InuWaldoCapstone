package org.example.springboot.domain.users;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
@Entity

public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //pk생성규칙
    private Long id;
    @Column
    private String userId;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private Float drivingScore;
    @Column
    private Long mileage;
    @Column
    private Integer totalDistance;
    @Column
    private Integer recentDistance;
    @Column
    private Integer totalSharpSpeedingNum;
    @Column
    private Integer totalSharpBrakingNum;
    @Column
    private Integer totalSharpCurvingNum;
    @Column
    private Integer totalSpeedingNum;
    @Column
    private Integer totalAccidentNum;
    @Column
    private Integer recentSharpSpeedingNum;
    @Column
    private Integer recentSharpBrakingNum;
    @Column
    private Integer recentSharpCurvingNum;
    @Column
    private Integer recentSpeedingNum;
    @Column
    private Integer recentAccidentNum;
    @Column
    private Integer totalDrivingTime;
    @Column
    private Integer recentDrivingTime;

    @Builder
    public Users(String userId, String password, String name, Float drivingScore, Long mileage, Integer totalDistance,
                 Integer recentDistance, Integer totalSharpSpeedingNum, Integer totalSharpBrakingNum, Integer totalSharpCurvingNum,
                 Integer totalSpeedingNum, Integer totalAccidentNum, Integer recentSharpSpeedingNum, Integer recentSharpBrakingNum,
                 Integer recentSharpCurvingNum, Integer recentSpeedingNum, Integer recentAccidentNum, Integer totalDrivingTime,
                 Integer recentDrivingTime){
        this.userId = userId;
        this.password=password;
        this.name=name;
        this.drivingScore=drivingScore;
        this.mileage=mileage;
        this.totalDistance = totalDistance;
        this.recentDistance = recentDistance;
        this.totalSharpSpeedingNum = totalSharpSpeedingNum;
        this.totalSharpBrakingNum = totalSharpBrakingNum;
        this.totalSharpCurvingNum = totalSharpCurvingNum;
        this.totalSpeedingNum = totalSpeedingNum;
        this.totalAccidentNum = totalAccidentNum;
        this.recentSharpSpeedingNum = recentSharpSpeedingNum;
        this.recentSharpBrakingNum = recentSharpBrakingNum;
        this.recentSharpCurvingNum = recentSharpCurvingNum;
        this.recentSpeedingNum = recentSpeedingNum;
        this.recentAccidentNum = recentAccidentNum;
        this.totalDrivingTime = totalDrivingTime;
        this.recentDrivingTime = recentDrivingTime;
    }
}