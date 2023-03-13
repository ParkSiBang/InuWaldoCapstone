package org.example.springboot.domain.users;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "users")
@Entity

public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //pk생성규칙
    private Long id;

    @Column
    private String userId;
    public void setUserId(String userId){
        this.userId = userId;
    }

    @Column
    private String password;
    public void setPassword(String password){
        this.password = password;
    }

    @Column
    private String name;
    public void setName(String name){
        this.name = name;
    }

    @Column
    private Float drivingScore;
    public void setDrivingScore(Float drivingScore){
        this.drivingScore = drivingScore;
    }

    @Column
    private Long mileage;
    public void setMileage(Long userId){
        this.mileage = mileage;
    }

    @Builder
    public Users(String userId, String password, String name, Float drivingScore, Long mileage){
        this.userId=userId;
        this.password=password;
        this.name=name;
        this.drivingScore=drivingScore;
        this.mileage=mileage;
    }
}