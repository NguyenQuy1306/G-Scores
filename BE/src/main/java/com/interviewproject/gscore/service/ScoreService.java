package com.interviewproject.gscore.service;

import org.springframework.stereotype.Service;

import com.interviewproject.gscore.model.response.StatisticBySubjectResponse;
import com.interviewproject.gscore.model.response.StudentScoreResponse;

import ch.qos.logback.core.spi.ScanException;

@Service
public interface ScoreService {
    public StudentScoreResponse getScoreByRegistrationNumber(Long registrationNumber);

    public StatisticBySubjectResponse getStatisticOverall();
}
