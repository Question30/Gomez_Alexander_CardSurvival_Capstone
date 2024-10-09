package com.CardSurvial.Backend;

import com.CardSurvial.Backend.controller.UserController;
import com.CardSurvial.Backend.model.Scores;
import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.service.UserServices;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest {
    private MockMvc mockMvc;

    @Mock
    private UserServices userServices;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testGetAllUsers() throws Exception {
        User user1 = new User("user1", "user1@example.com", "password1");
        User user2 = new User("user2", "user2@example.com", "password2");
        List<User> users = Arrays.asList(user1, user2);

        when(userServices.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].username").value("user1"))
                .andExpect(jsonPath("$[1].username").value("user2"));
    }

    @Test
    public void testGetUserByEmail() throws Exception {
        User user = new User("user1", "user1@example.com", "password1");

        when(userServices.findByUsername("user1")).thenReturn(user);

        mockMvc.perform(get("/api/users/user1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("user1"));
    }

    @Test
    public void testAddScore() throws Exception {
        Scores score = new Scores(10, "user1", false); // Assuming Scores has a constructor that takes a score

        when(userServices.addScore("user1", score)).thenReturn("Score added");

        mockMvc.perform(put("/api/users/score/user1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"score\":10}")) // Assuming Scores can be serialized from this JSON
                .andExpect(status().isOk())
                .andExpect(content().string("Score added"));
    }

    @Test
    public void testUpdateUser() throws Exception {
        User user = new User("user1", "user1@example.com", "password1");

        when(userServices.updateUser("user1", user)).thenReturn("User updated");

        mockMvc.perform(put("/api/users/user1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user1\", \"email\":\"user1@example.com\",\"password\":\"password1\"}")) // Adjust based on your User class fields
                .andExpect(status().isOk())
                .andExpect(content().string("User updated"));
    }

    @Test
    public void testDeleteUserById() throws Exception {
        when(userServices.deleteUser("user1")).thenReturn("User deleted");

        mockMvc.perform(delete("/api/users/user1"))
                .andExpect(status().isOk())
                .andExpect(content().string("User deleted"));
    }
}

