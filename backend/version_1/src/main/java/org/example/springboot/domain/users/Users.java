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


    @Builder
    public Users(String userId, String password, String name, Float drivingScore, Long mileage, Integer totalDistance){
        this.userId=userId;
        this.password=password;
        this.name=name;
        this.drivingScore=drivingScore;
        this.mileage=mileage;
        this.totalDistance = totalDistance;
    }
}