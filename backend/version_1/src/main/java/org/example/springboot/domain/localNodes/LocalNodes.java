package org.example.springboot.domain.localNodes;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Getter //롬복 클래스내의 getter 자동생성
@NoArgsConstructor // 기본생성자 자동 추가
@Entity //테이블과 링크될 클래스임을 나타냄. 기본적으로 클래스이름을 언더스코어네이밍으로 바꿔 테이블과 매칭합니다.

public class LocalNodes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //pk생성규칙
    private Long id;

    @Column
    private Integer nodeId;

    @Column
    private Double longitude;

    @Column
    private Double latitude;

    @Builder
    public LocalNodes(Integer nodeId, Double longitude, Double latitude){
        this.nodeId = nodeId;
        this.longitude=longitude;
        this.latitude=latitude;
    }

    public void closestNode(){


    }
}
