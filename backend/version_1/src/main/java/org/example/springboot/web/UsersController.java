package org.example.springboot.web;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.users.Users;
import org.example.springboot.service.Users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UsersController {

    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/users/join")
    public void join(@RequestParam("userId") String userId,
                     @RequestParam("password") String password,
                     @RequestParam("name") String name,
                     @RequestParam("drivingScore") Float drivingScore,
                     @RequestParam("mileage") Long mileage){
        Users user = new Users();
        user.setUserId(userId);
        user.setPassword(password);
        user.setName(name);
        user.setDrivingScore(drivingScore);
        user.setMileage(mileage);
        usersService.join(user);

        //return "redirect:/"; 홈화면으로 이동
    }
}
