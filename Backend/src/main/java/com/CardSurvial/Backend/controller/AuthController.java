package com.CardSurvial.Backend.controller;

import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserServices userServices;

    @Autowired
    public AuthController(UserServices userServices){
        this.userServices = userServices;
    }

    @PostMapping("/signup")
    public String addUser(@RequestBody User user){
        return userServices.addUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user){
        return userServices.login(user);
    }

}
