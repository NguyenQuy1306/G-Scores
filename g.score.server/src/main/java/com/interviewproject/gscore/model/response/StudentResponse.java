package com.interviewproject.gscore.model.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponse {
    private Long studentId;
    private Long registrationNumber;
    private List<ScoreResponse> scores;
    private Double totalScore;
    private Double average;

    public StudentResponse(Long studentId,
            Long registrationNumber,
            Double totalScore,
            Double average) {
        this.studentId = studentId;
        this.registrationNumber = registrationNumber;
        this.totalScore = totalScore;
        this.average = average;
    }
}
