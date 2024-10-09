package com.CardSurvial.Backend;

import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.repository.UserRepository;
import com.CardSurvial.Backend.service.UserServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class UserServiceTest {
    @InjectMocks
    private UserServices userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindByEmail_UserFound() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        user.setUsername("testUser");

        // Mock the repository behavior
        when(userRepository.findAll()).thenReturn(Arrays.asList(user));

        // Act
        User foundUser = userService.findByEmail(email);

        // Assert
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getEmail()).isEqualTo(email);
    }

    @Test
    public void testFindByEmail_UserNotFound() {
        // Arrange
        String email = "nonexistent@example.com";

        // Mock the repository behavior
        when(userRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        User foundUser = userService.findByEmail(email);

        // Assert
        assertThat(foundUser).isNull(); // Ensure null is returned when user is not found
    }
}
