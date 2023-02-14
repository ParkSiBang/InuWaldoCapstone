package org.example.springboot.domain.links;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity

public class Links {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer startNode;

    @Column
    private Integer destNode;

    @Column
    private Boolean childrenZone;

    @Column
    private Integer accidentNum;

    @Column
    private Integer carEntranceNum;

    @Column
    private Integer distance;

    @Column
    private Double weight;

    @Builder
    public Links(Integer startNode, Integer destNode, Boolean childrenZone, Integer accidentNum
    , Integer carEntranceNum, Integer distance, Double weight){
        this.startNode = startNode;
        this.destNode = destNode;
        this.childrenZone = childrenZone;
        this.accidentNum = accidentNum;
        this.carEntranceNum = carEntranceNum;
        this.distance = distance;
        this.weight = weight;
    }

}


