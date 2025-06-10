package com.interviewproject.gscore.model.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScoreResponse implements Serializable {
    private String subjectName;
    private Double score;

}
