package com.CardSurvial.Backend;

import com.CardSurvial.Backend.controller.ScoresController;
import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.service.ScoresServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class ScoreControllerTest {
    private MockMvc mockMvc;

    @Mock
    private ScoresServices scoresServices;

    @InjectMocks
    private ScoresController scoresController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(scoresController).build();
    }

    @Test
    public void testFindTopTimes() throws Exception {
        Scores score1 = new Scores(100, "user1", false);
        Scores score2 = new Scores(95, "user2", true);
        List<Scores> topTimes = Arrays.asList(score1, score2);

        when(scoresServices.getTopTimes()).thenReturn(topTimes);

        mockMvc.perform(get("/api/scores/topTimes"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].username").value("user1"))
                .andExpect(jsonPath("$[1].username").value("user2"));
    }

    @Test
    public void testFindTopScores() throws Exception {
        Scores score1 = new Scores(100, "user1", false);
        Scores score2 = new Scores(95, "user2", true);
        List<Scores> topScores = Arrays.asList(score1, score2);

        when(scoresServices.getTopScores()).thenReturn(topScores);

        mockMvc.perform(get("/api/scores/topScores"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].username").value("user1"))
                .andExpect(jsonPath("$[1].username").value("user2"));
    }

    @Test
    public void testAddScore() throws Exception {
        // Arrange
        Scores newScore = new Scores(150,"user3", false);
        String json = "{\"username\":\"user3\", \"score\":150}"; // Adjust based on your Scores class

        // Act & Assert
        mockMvc.perform(post("/api/scores/addScore")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());

        verify(scoresServices, times(1)).addScore(any(Scores.class));
    }

    @Test
    public void testUpdateScore() throws Exception {
        // Arrange
        Scores score1 = new Scores(100, "user1", false);
        String json = "{\"username\":\"user1\", \"score\":110}"; // Adjust based on your Scores class
        Integer id = 1; // Example ID

        // Act & Assert
        mockMvc.perform(put("/api/scores/updateScore/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());

        verify(scoresServices, times(1)).updateScore(any(Scores.class), eq(id));
    }
}
