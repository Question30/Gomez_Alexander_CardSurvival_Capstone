package com.CardSurvial.Backend;

import com.CardSurvial.Backend.model.User;
import com.CardSurvial.Backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test") // Ensure it uses the test profile
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll(); // Clean the repository before each test
    }

    @Test
    public void testSaveUser() {
        // Arrange
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("password1");
        user.setEmail("test@example.com");
        // Act
        User savedUser = userRepository.save(user);

        // Assert
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getId()).isGreaterThan(0);
        assertThat(savedUser.getUsername()).isEqualTo("testUser");
    }

    @Test
    public void testFindByUsername() {
        // Arrange
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("password1");
        user.setEmail("test@example.com");
        userRepository.save(user);

        // Act
        Optional<User> foundUser = userRepository.findByUsername("testUser");

        // Assert
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getUsername()).isEqualTo("testUser");
    }

    @Test
    public void testFindByUsername_NotFound() {
        // Act
        Optional<User> foundUser = userRepository.findByUsername("nonExistentUser");

        // Assert
        assertThat(foundUser).isNotPresent();
    }

    @Test
    public void testDeleteUser() {
        // Arrange
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("password1");
        user.setEmail("test@example.com");
        User savedUser = userRepository.save(user);

        // Act
        userRepository.deleteById(savedUser.getId());
        Optional<User> foundUser = userRepository.findByUsername("testUser");

        // Assert
        assertThat(foundUser).isNotPresent();
    }
}
