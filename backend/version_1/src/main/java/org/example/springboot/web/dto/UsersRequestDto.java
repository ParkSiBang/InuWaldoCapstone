package org.example.springboot.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsersRequestDto {
    String userId;

    String password;

    String name;

    @Builder
    public UsersRequestDto(String userId, String password, String name){
        this.userId = userId;
        this.password = password;
        this.name = name;
    }
}
