package org.example.springboot.domain.users;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter //롬복 클래스내의 getter 자동생성
@NoArgsConstructor // 기본생성자 자동 추가
@Entity //테이블과 링크될 클래스임을 나타냄. 기본적으로 클래스이름을 언더스코어네이밍으로 바꿔 테이블과 매칭합니다.

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

    @Builder
    public Users(String userId, String password, String name, Float drivingScore, Long mileage){
        this.userId=userId;
        this.password=password;
        this.name=name;
        this.drivingScore=drivingScore;
        this.mileage=mileage;
    }
}