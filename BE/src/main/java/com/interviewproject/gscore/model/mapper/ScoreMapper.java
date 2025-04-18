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

@Mapper(componentModel = "spring")
public interface ScoreMapper {
    ScoreMapper INSTANCE = Mappers.getMapper(ScoreMapper.class);

    // @Mapping(source = "subjectname", target = "subjectName")
    // @Mapping(source = "score", target = "score")
    // ScoreResponse toResponse(Score score);
}
