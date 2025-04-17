package com.interviewproject.gscore.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studentId")
    private Long studentId;

    @Size(max = 255, message = "Name must be less than 255 characters")
    @Column(name = "studentName")
    private Long studentName;

    @NotNull(message = "Registration number không được để trống")
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    @Column(name = "registrationNumber", nullable = false)
    private Long registrationNumber;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Score> scores;
}
