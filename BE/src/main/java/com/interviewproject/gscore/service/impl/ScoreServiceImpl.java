package com.interviewproject.gscore.service.impl;

import java.util.List;

import org.hibernate.cfg.StatisticsSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.NotFound;

import com.interviewproject.gscore.exception.NotFoundException;
import com.interviewproject.gscore.model.entity.Score;
import com.interviewproject.gscore.model.entity.ScoreId;
import com.interviewproject.gscore.model.entity.Student;
import com.interviewproject.gscore.model.mapper.ScoreMapper;
import com.interviewproject.gscore.model.mapper.StudentMapper;
import com.interviewproject.gscore.model.response.ScoreResponse;
import com.interviewproject.gscore.model.response.StatisticBySubjectResponse;
import com.interviewproject.gscore.model.response.StudentResponse;
import com.interviewproject.gscore.model.response.StudentScoreResponse;
import com.interviewproject.gscore.repository.ScoreRepository;
import com.interviewproject.gscore.repository.StudentRepository;
import com.interviewproject.gscore.service.ScoreService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoreServiceImpl implements ScoreService {

        @Autowired
        private StudentRepository studentRepository;
        @Autowired
        private ScoreRepository scoreRepository;

        @Autowired
        private StudentMapper studentMapper;

        private ScoreResponse mapScoreToScoreResponse(Score score) {
                return ScoreResponse.builder()
                                .subjectName(score.getSubject().getSubjectName())
                                .score(score.getScore())
                                .build();
        }

        @Override
        public StudentScoreResponse getScoreByRegistrationNumber(Long registrationNumber) {
                Student student = studentRepository.findByRegistrationNumber(registrationNumber);
                if (student == null) {
                        throw new NotFoundException(
                                        "Student not found with registration number: " + registrationNumber);
                }

                if (student.getScores().isEmpty()) {
                        throw new NotFoundException(
                                        "Score not found for student with registration number: " + registrationNumber);
                }

                List<ScoreResponse> scoreResponses = student.getScores().stream()
                                .map(this::mapScoreToScoreResponse)
                                .toList();

                double total = student.getScores().stream()
                                .mapToDouble(s -> s.getScore() != null ? s.getScore() : 0)
                                .sum();

                double average = student.getScores().stream()
                                .mapToDouble(s -> s.getScore() != null ? s.getScore() : 0)
                                .average()
                                .orElse(0.0);

                return StudentScoreResponse.builder()
                                .registrationNumber(student.getRegistrationNumber())
                                .scoreResponses(scoreResponses)
                                .totalScore(total)
                                .averageScore(average)
                                .build();
        }

        @Override
        public StatisticBySubjectResponse getStatisticOverall() {
                try {
                        StatisticBySubjectResponse result = scoreRepository.getStatistics();
                        if (result == null) {
                                return StatisticBySubjectResponse.builder()
                                                .subjectName("Overall")
                                                .level1(0L)
                                                .level2(0L)
                                                .level3(0L)
                                                .level4(0L)
                                                .build();
                        }
                        return result;
                } catch (Exception e) {
                        log.error("Failed to get overall statistics", e);

                        throw new RuntimeException("Could not get score statistics", e);
                }
        }

        @Override
        public List<StatisticBySubjectResponse> getStatisticBySubject() {
                try {
                        List<StatisticBySubjectResponse> result = scoreRepository.getSubjectStatistics();
                        for (StatisticBySubjectResponse statistic : result) {
                                if (statistic.getSubjectName() == null) {
                                        statistic.setSubjectName(statistic.getSubjectName());
                                        statistic.setLevel1(0L);
                                        statistic.setLevel2(0L);
                                        statistic.setLevel3(0L);
                                        statistic.setLevel4(0L);
                                }
                        }

                        return result;
                } catch (Exception e) {
                        log.error("Failed to get overall statistics", e);

                        throw new RuntimeException("Could not get score statistics", e);
                }
        }

        @Override
        public List<StudentResponse> getTopStudentByGroup(List<String> subjects, Integer limit)

        {
                try {
                        Pageable page = PageRequest.of(0, limit);
                        List<StudentResponse> tops = scoreRepository.findTopBySubjects(subjects, page);
                        return tops.stream()
                                        .map(student -> {
                                                List<ScoreResponse> scores = scoreRepository
                                                                .findScoresForStudentAndSubjects(student.getStudentId(),
                                                                                subjects);
                                                student.setScores(scores);
                                                return student;
                                        })
                                        .toList();
                } catch (Exception e) {
                        log.error("Failed to get overall statistics", e);

                        throw new RuntimeException("Could not get score statistics", e);
                }
        }
}
