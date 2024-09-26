package com.CardSurvial.Backend.controller;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.service.ScoresServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoresController {
    @Autowired
    ScoresServices scoresServices;

    @GetMapping("/topTimes")
    public List<Scores> findTopTimes(){
        return scoresServices.getTopTimes();
    }


    @GetMapping("/topScores")
    public List<Scores> findTopScores(){
        return scoresServices.getTopScores();
    }
}
