package org.example.springboot.domain.posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter //롬복 클래스내의 getter 자동생성
@NoArgsConstructor // 기본생성자 자동 추가
@Entity //테이블과 링크될 클래스임을 나타냄. 기본적으로 클래스이름을 언더스코어네이밍으로 바꿔 테이블과 매칭합니다.

public class Posts {
    @Id//pk 필드임을 나타냄
    @GeneratedValue(strategy = GenerationType.IDENTITY) //pk생성규칙
    private Long id;

    @Column(length = 500, nullable = false) //테이블의 칼럼(속성, 애트리뷰트)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder //롬복 해당클래스의 빌더패턴 클래스를 생성 (생성자 상단에 선언시 생성자에 포함된 필드만 빌드에 포함함)
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

}
