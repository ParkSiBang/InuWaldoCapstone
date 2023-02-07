package org.example.springboot.domain.users;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter //롬복 클래스내의 getter 자동생성
@NoArgsConstructor // 기본생성자 자동 추가
@Entity //테이블과 링크될 클래스임을 나타냄. 기본적으로 클래스이름을 언더스코어네이밍으로 바꿔 테이블과 매칭합니다.

public class Users {
    @Id
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Float drivingScore;

    @Column(nullable = false)
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
