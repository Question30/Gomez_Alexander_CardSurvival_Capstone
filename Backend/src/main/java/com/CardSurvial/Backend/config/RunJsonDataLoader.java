package com.CardSurvial.Backend.config;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.repository.ScoresRepository;
import com.CardSurvial.Backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Slf4j
@Configuration
public class RunJsonDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final ScoresRepository scoresRepository;

    public RunJsonDataLoader(UserRepository userRepository,
                             ScoresRepository scoresRepository,
                             ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.scoresRepository = scoresRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        loadScores();
        loadUsers();
    }

    public void loadUsers(){
        if(userRepository.count() == 0){
            try(InputStream inputStream = getClass().getResourceAsStream(
                    "/data/UserData.json")){
                List<User> userList = objectMapper.readValue(inputStream,
                        new TypeReference<List<User>>() {});
                log.info("Users loaded from Json File {}", userList);
                userRepository.saveAll(userList);
            }catch (IOException e){
                throw new RuntimeException("Unable to load data from file", e);
            }
        } else{
            log.info("Data already loaded");
        }
    }

    public void loadScores(){
        if(scoresRepository.count() == 0){
            try(InputStream inputStream = getClass().getResourceAsStream(
                    "/data/ScoresData.json")){
                List<Scores> scoresList = objectMapper.readValue(inputStream,
                        new TypeReference<List<Scores>>() {});
                log.info("Scores loaded from Json File {}", scoresList);
                scoresRepository.saveAll(scoresList);
            }catch (IOException e){
                throw new RuntimeException("Unable to load data from file", e);
            }
        } else{
            log.info("Scores Data already loaded");
        }
    }

}
