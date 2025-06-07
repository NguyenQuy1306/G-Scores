package com.interviewproject.gscore.model.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class ScoreId implements Serializable {
    private Long studentId;
    private Long subjectId;
}
