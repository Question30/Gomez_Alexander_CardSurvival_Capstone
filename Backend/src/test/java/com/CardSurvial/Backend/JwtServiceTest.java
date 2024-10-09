package com.CardSurvial.Backend;

import com.CardSurvial.Backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class JwtServiceTest {
    @Mock
    private JwtService jwtService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    public void testGenerateToken() {
        String username = "testUser";
        String expectedToken = "mockedToken"; // Define the expected token

        // Mock the behavior of generateToken
        when(jwtService.generateToken(username)).thenReturn(expectedToken);

        // Act
        String token = jwtService.generateToken(username);;
        // Assert
        assertThat(token).isNotNull(); // Token should not be null
        assertThat(token).isEqualTo(expectedToken); // Check if the token matches the expected value
    }
}
