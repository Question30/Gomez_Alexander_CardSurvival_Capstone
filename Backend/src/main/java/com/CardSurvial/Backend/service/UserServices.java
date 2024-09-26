package com.CardSurvial.Backend.service;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.repository.ScoresRepository;
import com.CardSurvial.Backend.repository.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@NoArgsConstructor
@Service
public class UserServices {
    UserRepository userRepository;
    ScoresRepository scoresRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;


    @Autowired
    public UserServices(UserRepository userRepository,
                        ScoresRepository scoresRepository){
        this.userRepository = userRepository;
        this.scoresRepository =scoresRepository;
    }
    //Get all users
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //Get user by id
    public Optional<User> getByID(Integer id){
        return userRepository.findById(id);
    }

    //Gets all users and filters for a specified email
    public User findByEmail(String email){
        List<User> users = this.getAllUsers();
        return users.stream().filter(user -> user.getEmail().equals(email)).findFirst().get();
    }

    //Get all users and filters for a specified username
    public User findByUsername(String username){
        List<User> users = this.getAllUsers();
        Optional<User> userInfo =
                users.stream().filter(user -> user.getUsername().equals(username)).findFirst();
        if(userInfo.isPresent()){
            return userInfo.get();
        }
        else return null;
    }

    //Add user to database
    public Integer addUser(User user){
        if(userExists(user)){
            return -1;
        }
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return user.getId();
    }
    //Login user
    public Integer login(User user){

        User foundUser = this.findByUsername(user.getUsername());
        if(foundUser != null){
            if(encoder.matches(user.getPassword(), foundUser.getPassword())){
                return 1;
            }
        }

        return -1;
    }


    //update User by email
    public String updateUser(String username, User user){
        User u = this.findByUsername(username);

        if(Objects.nonNull(u)){
            u.setId(user.getId());
            u.setUsername(user.getUsername());
            u.setEmail(user.getEmail());
            u.setPassword(user.getPassword());
            u.setScores(user.getScores());
            userRepository.save(u);
            return "Updated " + u.getUsername();
        }

        return "User not found";
    }

    //Delete User by username
    public String deleteUser(String username){
        User user = this.findByUsername(username);
        userRepository.deleteById(user.getId());
        return user.getUsername() + " has been deleted";
    }

    //Add Score
    public String addScore(String username, Scores score){
        scoresRepository.save(score);
        User user = this.findByUsername(username);
        user.addScore(score);
        userRepository.save(user);

        return "Scores: " + user.getScores();
    }



    private boolean userExists(User user){
        User userOptional = findByUsername(user.getUsername());

        return userOptional != null;
    }
}
