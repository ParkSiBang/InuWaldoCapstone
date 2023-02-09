package org.example.springboot.web;

import lombok.Getter;
import org.example.springboot.web.dto.HelloResponseDto;
import org.example.springboot.web.dto.JoinResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {
    @GetMapping("/users")
    public String users(){
        return "users";
    }
    @GetMapping("/users/join")
    public JoinResponseDto join(@RequestParam("userId") String userId,
                                     @RequestParam("password") String password,
                                     @RequestParam("name") String name,
                                     @RequestParam("drivingScore") Float drivingScore,
                                     @RequestParam("mileage") Long mileage
                                     ) {
        return new JoinResponseDto(userId,password,name,drivingScore,mileage);
    }
}
