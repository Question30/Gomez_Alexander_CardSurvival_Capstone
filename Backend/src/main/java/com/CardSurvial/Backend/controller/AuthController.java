package com.CardSurvial.Backend.controller;

import com.CardSurvial.Backend.common.AuthRequest;
import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.service.JwtService;
import com.CardSurvial.Backend.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserServices userServices;

    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    public AuthController(UserServices userServices, JwtService jwtService){
        this.userServices = userServices;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public String addUser(@RequestBody User user){
        return userServices.addUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user){

        return userServices.login(user);
    }

    @PostMapping("/token")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        System.out.println(authentication.isAuthenticated());
                if(authentication.isAuthenticated()){
                    return jwtService.generateToken(authRequest.getUsername());
                }else {
                    throw new UsernameNotFoundException("Invalid user request");
                }

    }
}
