package com.CardSurvial.Backend.service;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.repository.ScoresRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

     public void addScore(Scores scores){
        scoresRepository.save(scores);
     }

     public void updateScore(Scores scores, Integer id){
        Optional<Scores> score = scoresRepository.findById(id);

        if (score.isPresent()){
            Scores newScore = score.get();
            newScore.setScore(scores.getScore());
            newScore.setTime(scores.getTime());
            newScore.setId(scores.getId());
            newScore.setUsername(scores.getUsername());
            newScore.setComplete(scores.isComplete());
            scoresRepository.save(newScore);
        }

     }

     public void deleteSCore(Integer id){
        Optional<Scores> score = scoresRepository.findById(id);
        if(score.isPresent()){
            scoresRepository.deleteById(id);
        }
     }

}
