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
    private Integer childrenZone;

    @Column
    private Integer accidentNum;

    @Column
    private Integer carEntranceNum;

    @Column
    private Double distance;



    @Builder
    public Links(Integer startNode, Integer destNode, Integer childrenZone, Integer accidentNum
    , Integer carEntranceNum, Double distance){
        this.startNode = startNode;
        this.destNode = destNode;
        this.childrenZone = childrenZone;
        this.accidentNum = accidentNum;
        this.carEntranceNum = carEntranceNum;
        this.distance = distance;

    }

}


