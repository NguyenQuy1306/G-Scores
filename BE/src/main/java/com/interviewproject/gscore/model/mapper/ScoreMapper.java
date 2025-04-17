package com.interviewproject.gscore.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.interviewproject.gscore.model.entity.Student;
import com.interviewproject.gscore.model.response.ScoreResponse;

@Mapper(componentModel = "spring")
public interface ScoreMapper {
    ScoreMapper INSTANCE = Mappers.getMapper(ScoreMapper.class);

    ScoreResponse toResponse(Student task);

    List<ScoreResponse> toResponseList(List<Student> tasks);
}
