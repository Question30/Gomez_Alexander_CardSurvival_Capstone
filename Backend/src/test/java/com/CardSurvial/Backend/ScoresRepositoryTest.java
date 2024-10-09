package com.CardSurvial.Backend;

import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.repository.ScoresRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ScoresRepositoryTest {
    @Autowired
    private ScoresRepository scoresRepository;

    @BeforeEach
    public void setUp() {
        scoresRepository.deleteAll(); // Clean the repository before each test
    }

    @Test
    public void testSaveScore() {
        // Arrange
        Scores score = new Scores();
        score.setUsername("user1");
        score.setScore(100);

        // Act
        Scores savedScore = scoresRepository.save(score);

        // Assert
        assertThat(savedScore).isNotNull();
        assertThat(savedScore.getId()).isGreaterThan(0);
        assertThat(savedScore.getUsername()).isEqualTo("user1");
        assertThat(savedScore.getScore()).isEqualTo(100);
    }

    @Test
    public void testFindByUsername() {
        // Arrange
        Scores score1 = new Scores();
        score1.setUsername("user1");
        score1.setScore(100);
        scoresRepository.save(score1);

        Scores score2 = new Scores();
        score2.setUsername("user2");
        score2.setScore(200);
        scoresRepository.save(score2);

        // Act
        List<Scores> result = scoresRepository.findByUsername("user1");

        // Assert
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getUsername()).isEqualTo("user1");
    }

    @Test
    public void testDeleteScore() {
        // Arrange
        Scores score = new Scores();
        score.setUsername("user1");
        score.setScore(100);
        Scores savedScore = scoresRepository.save(score);

        // Act
        scoresRepository.deleteById(savedScore.getId());
        List<Scores> result = scoresRepository.findByUsername("user1");

        // Assert
        assertThat(result).isEmpty();
    }
}
