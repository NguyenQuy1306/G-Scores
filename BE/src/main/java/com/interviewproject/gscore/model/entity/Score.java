package com.interviewproject.gscore.model.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "score")
public class Score {

    @EmbeddedId
    private ScoreId scoreId;

    @NotNull(message = "Score không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Score phải lớn hơn hoặc bằng 0")
    @DecimalMax(value = "10.0", inclusive = true, message = "Score phải nhỏ hơn hoặc bằng 10")
    @Column(name = "score", nullable = false)
    private Double score;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "studentId", nullable = false)
    private Student student;

    @ManyToOne
    @MapsId("subjectId")
    @JoinColumn(name = "subjectId", nullable = false)
    private Subject subject;

}
