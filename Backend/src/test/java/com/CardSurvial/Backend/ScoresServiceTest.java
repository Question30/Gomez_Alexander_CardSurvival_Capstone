package com.CardSurvial.Backend;

import com.CardSurvial.Backend.common.ScoreComparator;
import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.repository.ScoresRepository;
import com.CardSurvial.Backend.service.ScoresServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class ScoresServiceTest {
    @InjectMocks
    private ScoresServices scoresService;

    @Mock
    private ScoresRepository scoresRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTopScores() {
        // Arrange
        Scores score1 = new Scores();
        score1.setScore(100);
        score1.setUsername("user1");
        score1.setComplete(false);

        Scores score2 = new Scores();
        score2.setScore(200);
        score2.setUsername("user1");
        score2.setComplete(false);

        Scores score3 = new Scores();
        score3.setScore(150);
        score3.setUsername("user1");
        score3.setComplete(false);

        Scores score4 = new Scores();
        score4.setScore(250);
        score4.setUsername("user1");
        score4.setComplete(false);

        Scores score5 = new Scores();
        score5.setScore(300);
        score5.setUsername("user1");
        score5.setComplete(false);

        Scores score6 = new Scores();
        score6.setScore(50);
        score6.setUsername("user1");
        score6.setComplete(false);

        List<Scores> allScores = Arrays.asList(score1, score2, score3, score4, score5, score6);

        Collections.sort(allScores, new ScoreComparator());
        System.out.println(allScores);

        // Mock the repository behavior
        when(scoresRepository.findAll(Sort.by(Sort.Direction.DESC, "score"))).thenReturn(allScores);

        // Act
        List<Scores> topScores = scoresService.getTopScores();
        // Assert
        assertThat(topScores).hasSize(5);
        assertThat(topScores.get(0).getScore()).isEqualTo(300); // Highest score
        assertThat(topScores.get(1).getScore()).isEqualTo(250);
        assertThat(topScores.get(2).getScore()).isEqualTo(200);
        assertThat(topScores.get(3).getScore()).isEqualTo(150);
        assertThat(topScores.get(4).getScore()).isEqualTo(100);
    }
}
