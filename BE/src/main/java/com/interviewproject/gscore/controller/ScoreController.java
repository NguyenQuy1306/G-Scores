package com.interviewproject.gscore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;

import com.interviewproject.gscore.exception.ScoreException;
import com.interviewproject.gscore.model.request.TaskRequest;
import com.interviewproject.gscore.model.response.ApiResponse;
import com.interviewproject.gscore.model.response.MetadataResponse;
import com.interviewproject.gscore.model.response.ScoreResponse;
import com.interviewproject.gscore.model.response.StatisticBySubjectResponse;
import com.interviewproject.gscore.model.response.StudentResponse;
import com.interviewproject.gscore.model.response.StudentScoreResponse;
import com.interviewproject.gscore.service.ScoreService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/scores")
@RequiredArgsConstructor
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @GetMapping("/{registrationNumber}")
    public ResponseEntity<ApiResponse<StudentScoreResponse>> getScoreByRegistrationNumber(
            @PathVariable Long registrationNumber) {
        ApiResponse<StudentScoreResponse> apiResponse = new ApiResponse<>();

        // try {
        StudentScoreResponse studentScoreResponse = scoreService.getScoreByRegistrationNumber(registrationNumber);
        apiResponse.ok(studentScoreResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);

    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<StatisticBySubjectResponse>> getStatisticOverall() {
        ApiResponse<StatisticBySubjectResponse> apiResponse = new ApiResponse<>();
        StatisticBySubjectResponse statisticBySubjectResponse = scoreService.getStatisticOverall();
        apiResponse.ok(statisticBySubjectResponse);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/statistics/subjects")
    public ResponseEntity<ApiResponse<List<StatisticBySubjectResponse>>> getStatisticBySubject() {
        ApiResponse<List<StatisticBySubjectResponse>> apiResponse = new ApiResponse<>();
        List<StatisticBySubjectResponse> statisticBySubjectResponse = scoreService.getStatisticBySubject();

        apiResponse.ok(statisticBySubjectResponse);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);

    }

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getTopStudentByGroup(
            @RequestParam(required = false) List<String> subjects,
            @RequestParam(defaultValue = "10") Integer limit) {
        System.err.println("subjects: " + subjects.size());
        System.err.println("subjects: " + subjects.get(0));
        System.err.println("subjects: " + subjects.get(1));
        ApiResponse<List<StudentResponse>> apiResponse = new ApiResponse<>();
        List<StudentResponse> studentResponses = scoreService.getTopStudentByGroup(subjects, limit);
        apiResponse.ok(studentResponses);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    // @DeleteMapping("/{taskId}")
    // public ResponseEntity<ApiResponse<Object>> deleteTask(@PathVariable Long
    // taskId) {
    // ApiResponse<Object> apiResponse = new ApiResponse<>();
    // try {
    // scoreService.(taskId);
    // Map<String, Object> metadata = new HashMap<>();
    // metadata.put("message", "Task deleted successfully");
    // apiResponse.ok(null, metadata);
    // return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    // } catch (ScoreException e) {
    // apiResponse.error(Map.of("message", e.getMessage()));
    // return ResponseEntity.status(e.getStatus()).body(apiResponse);
    // } catch (Exception e) {
    // apiResponse.error(Map.of("message", "Unexpected error occurred"));
    // return
    // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    // }
    // }

}
