package org.example.springboot.web;
import org.example.springboot.web.dto.HelloResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.
        RestController;
@RestController //json을 반환하는 컨트롤러
public class HelloController {
    @GetMapping("/hello") //get의 요청을 받을 수 있는 api
    public String hello(){
        return "hello";
    }
    @GetMapping("/hello/dto")
    public HelloResponseDto helloDto(@RequestParam("name") String name,
                                     @RequestParam("amount") int amount) {
        return new HelloResponseDto(name,amount);
    }
}
