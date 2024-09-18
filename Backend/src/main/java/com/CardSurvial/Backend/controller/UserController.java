package com.CardSurvial.Backend.controller;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserServices userServices;

    @Autowired
    public UserController( UserServices userServices){
        this.userServices = userServices;
    }

    //Get all users

    @GetMapping("")
    public List<User> getAllUsers(){
        return  userServices.getAllUsers();
    }

    //Get user by Email
    @GetMapping("/{username}")
    public User getUserByEmail(@PathVariable String username){
        return userServices.findByUsername(username);
    }

    //Post user
    @PostMapping("")
    public String addUser(@RequestBody User user){
        return userServices.addUser(user);
    }



    @PutMapping("/score/{username}")
    public String addScore(@PathVariable String username,
                           @RequestBody Scores score){
        return userServices.addScore(username, score);
    }

    //Put update user
    @PutMapping("/{username}")
    public String updateUser(@PathVariable String username,
                             @RequestBody User user){
        return userServices.updateUser(username, user);
    }

    //delete User
    @DeleteMapping("/{username}")
    public String deleteUserById(@PathVariable String username){
       return userServices.deleteUser(username);
    }

}
