package com.CardSurvial.Backend;

import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.repository.UserRepository;
import com.CardSurvial.Backend.service.UserInfoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class UserInfoServiceTest {
    @InjectMocks
    private UserInfoService userService;

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder encoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddUser() {
        // Arrange
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("plainPassword");

        // Mock the password encoder to return the encoded password
        String encodedPassword = "encodedPassword";
        when(encoder.encode(user.getPassword())).thenReturn(encodedPassword);

        // Act
        String result = userService.addUser(user);

        // Assert
        assertThat(result).isEqualTo("User Added Successfully");
        assertThat(user.getPassword()).isEqualTo(encodedPassword); // Verify password is encoded
        verify(repository, times(1)).save(user); // Verify save was called once
    }
}
