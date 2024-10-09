package com.CardSurvial.Backend.common;

import com.CardSurvial.Backend.model.Scores;

import java.util.Comparator;

public class ScoreComparator implements Comparator<Scores> {

    @Override
    public int compare(Scores o1, Scores o2) {
        return o2.getScore() - o1.getScore();
    }
}
