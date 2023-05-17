package org.example.springboot.service.LocalNodes;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Route {
    private Double startLatitude;
    private Double startLongitude;
    private Double destLatitude;
    private Double destLongitude;
    private boolean childZone;
    private Integer accidentNum;
    private Integer carEntranceNum;
    private Double score;
    @Builder
    public Route(Double startLatitude,
                 Double startLongitude,
                 Double destLatitude,
                 Double destLongitude,
                 boolean childZone,
                 Integer accidentNum,
                 Integer carEntranceNum,
                 Double score){
        this.startLatitude=startLatitude;
        this.startLongitude=startLongitude;
        this.destLatitude=destLatitude;
        this.destLongitude=destLongitude;
        this.childZone=childZone;
        this.accidentNum=accidentNum;
        this.carEntranceNum=carEntranceNum;
        this.score=score;

    }
}
