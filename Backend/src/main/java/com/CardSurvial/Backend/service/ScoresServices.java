package com.CardSurvial.Backend.service;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.repository.ScoresRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoresServices {

    ScoresRepository scoresRepository;

    public ScoresServices(ScoresRepository scoresRepository){
        this.scoresRepository =scoresRepository;
    }

    public List<Scores> getTopScores(){
        List <Scores> scores = scoresRepository.findAll(Sort.by(Sort.Direction.DESC, "score")).stream().limit(5).toList();
        return scores;
     }

     public List<Scores> getTopTimes(){
        List<Scores> scores = scoresRepository.findAll(Sort.by(Sort.Direction.DESC, "time")).stream().filter(Scores::isComplete).toList();
        return scores;
     }
}
