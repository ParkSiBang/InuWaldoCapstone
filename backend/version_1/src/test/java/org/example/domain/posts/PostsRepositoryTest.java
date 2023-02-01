package org.example.domain.posts;

import org.example.springboot.domain.posts.Posts;
import org.example.springboot.domain.posts.PostsRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest //h2데이터베이스 자동실행
public class PostsRepositoryTest {
    @Autowired
    PostsRepository postsRepository;

    @After // Junit에서 단위테스트 종료시마다 수행되는 메소드. 여기서는 작성된 데이터를 전부 지워준다.
    public void cleanup(){
        postsRepository.deleteAll();
    }

    @Test
    public void 게시글저장_불러오기(){
        //리포지토리에 인스턴스 생성해서 삽입. (save)
        String title ="테스트 게시글";
        String content="테스트 본문";

        postsRepository.save(Posts.builder()
                .title(title)
                .content(content)
                .author("abcd@gmail.com")
                .build());

        //when 리포지토리에서 posts 테이블에 있는 인스턴스 모두 불러옴
        List<Posts> postsList = postsRepository.findAll();

        //then 0번 인스턴스 불러와서 검증
        Posts posts = postsList.get(0);
        assertThat(posts.getTitle()).isEqualTo(title);
        assertThat(posts.getContent()).isEqualTo(content);
    }

}
