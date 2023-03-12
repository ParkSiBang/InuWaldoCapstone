package org.example.springboot.service.Links;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Path implements Comparable<Path>{
    private Integer start;
    private Integer dest;
    private Double weight;
    private Long linksId;

    @Override
    public int compareTo(Path o) {
        if(this.weight > o.weight)
            return 1;
        else if(this.weight < o.weight)
            return -1;
        else return 0;
    }
    @Builder
    public Path(Integer start, Integer dest, Double weight,Long linksId){
        this.start=start;
        this.dest=dest;
        this.weight = weight;
        this.linksId=linksId;
    }


}
