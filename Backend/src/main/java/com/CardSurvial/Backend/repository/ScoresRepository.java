package com.CardSurvial.Backend.repository;

import com.CardSurvial.Backend.model.Scores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoresRepository extends JpaRepository<Scores, Integer> {
}
