package com.interviewproject.gscore.model.response;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentScoreResponse implements Serializable {
    private Long registrationNumber;
    private List<ScoreResponse> scoreResponses;
    private Double totalScore;
    private Double averageScore;

}
