package org.example.springboot.web;

import lombok.RequiredArgsConstructor;
import org.example.springboot.domain.users.Users;
import org.example.springboot.service.Users.UsersService;
import org.example.springboot.web.dto.UsersRequestDto;
import org.example.springboot.web.dto.UsersResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    //회원가입
    @PostMapping("/join")
    public String join(@RequestBody UsersRequestDto usersRequestDto) {
        try {
            Users user = new Users();
            user.setUserId(usersRequestDto.getUserId());
            user.setPassword(usersRequestDto.getPassword());
            user.setName(usersRequestDto.getName());
            user.setDrivingScore(100F);
            user.setMileage(0L);
            user.setTotalDistance(0);
            user.setRecentDistance(0);
            user.setTotalSharpSpeedingNum(0);
            user.setTotalSharpBrakingNum(0);
            user.setTotalSharpCurvingNum(0);
            user.setTotalSpeedingNum(0);
            user.setTotalAccidentNum(0);
            user.setRecentSharpSpeedingNum(0);
            user.setRecentSharpBrakingNum(0);
            user.setRecentSharpCurvingNum(0);
            user.setRecentSpeedingNum(0);
            user.setRecentAccidentNum(0);
            user.setTotalDrivingTime(0);
            user.setRecentDrivingTime(0);


            usersService.join(user);
        }catch(IllegalStateException e){
            System.out.println(e);
            return "fail";

        }
        return "success";
    }

    //회원탈퇴
    @PostMapping("/deleteUser")
    public String deleteUser(@RequestBody UsersRequestDto usersRequestDto){
        Users loginUser = usersService.login(usersRequestDto.getUserId(), usersRequestDto.getPassword());

        if (loginUser == null){
            return "redirect:/error";
        }
        else {
            usersService.deleteUser(loginUser.getId());
            return "redirect:/";
        }
    }

    //로그인
    @PostMapping("/login")
    public String login(@RequestBody UsersRequestDto usersRequestDto, HttpSession session) {
        Users loginUser = usersService.login(usersRequestDto.getUserId(), usersRequestDto.getPassword());

        if (loginUser == null) {
            return "없는 유저입니다.";
        }
        else {
            session.setAttribute("userId", loginUser.getUserId());
            return "success";
        }
    }

    //로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }

    //유저정보조회
    @PostMapping("/userInfo")
    public UsersResponseDto UserInfo(@RequestBody UsersRequestDto usersRequestDto) {
        String userId = usersRequestDto.getUserId();

        Optional<Users> optional = usersService.findByUserId(userId);
        Users FindUser = optional.get();

        UsersResponseDto usersResponseDto = new UsersResponseDto(FindUser.getUserId(), FindUser.getName(), FindUser.getDrivingScore(),
                FindUser.getMileage(), FindUser.getTotalDistance(), FindUser.getRecentDistance(), FindUser.getTotalSharpSpeedingNum(),
                FindUser.getTotalSharpBrakingNum(), FindUser.getTotalSharpCurvingNum(), FindUser.getTotalSpeedingNum(),
                FindUser.getTotalAccidentNum(), FindUser.getRecentSharpSpeedingNum(), FindUser.getRecentSharpBrakingNum(),
                FindUser.getRecentSharpCurvingNum(), FindUser.getRecentSpeedingNum(), FindUser.getRecentAccidentNum(), FindUser.getTotalDrivingTime(),
                FindUser.getRecentDrivingTime());

        return usersResponseDto;
    }

    @PostMapping("/isLogin")
    public String isLogin(@RequestBody UsersRequestDto usersRequestDto, HttpSession session) {

        if (usersRequestDto.getUserId().equals((String)session.getAttribute("userId"))){
            return "success";
        }
        else {
            return "fail";
        }
    }
}
