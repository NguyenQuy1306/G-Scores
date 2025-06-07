package com.interviewproject.gscore.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.interviewproject.gscore.model.entity.Score;
import com.interviewproject.gscore.model.entity.Student;
import com.interviewproject.gscore.model.response.ScoreResponse;
import com.interviewproject.gscore.model.response.StudentScoreResponse;

@Mapper(componentModel = "spring", uses = ScoreMapper.class)
public interface StudentMapper {
    StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

    // @Mapping(source = "Registrationnumber", target = "registrationNumber")
    // @Mapping(source = "scores", target = "scoreResponses")
    // @Mapping(target = "totalScore", expression = "java(calculateTotal(student))")
    // @Mapping(target = "averageScore", expression =
    // "java(calculateAverage(student))")
    // StudentScoreResponse toStudentScoreResponse(Student student);

    default double calculateTotal(Student student) {
        return student.getScores()
                .stream()
                .mapToDouble(s -> s.getScore() != null ? s.getScore() : 0)
                .sum();
    }

    default double calculateAverage(Student student) {
        return student.getScores()
                .stream()
                .mapToDouble(s -> s.getScore() != null ? s.getScore() : 0)
                .average()
                .orElse(0.0);
    }
}
