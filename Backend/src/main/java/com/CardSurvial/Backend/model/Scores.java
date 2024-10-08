package com.CardSurvial.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "scores")
@Entity
public class Scores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer score;
//   hh:mm:ss
    private LocalTime time;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private boolean complete;

    public Scores(Integer score, String username, boolean complete){
        this.score = score;
        this.username = username;
        this.complete = complete;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Scores scores = (Scores) o;
        return Objects.equals(id, scores.id) && Objects.equals(score, scores.score);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, score);
    }
}
