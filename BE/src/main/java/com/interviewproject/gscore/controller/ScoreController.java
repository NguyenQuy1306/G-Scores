package com.interviewproject.gscore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;

import com.interviewproject.gscore.exception.TodoException;
import com.interviewproject.gscore.model.request.TaskRequest;
import com.interviewproject.gscore.model.response.ApiResponse;
import com.interviewproject.gscore.model.response.MetadataResponse;
import com.interviewproject.gscore.model.response.ScoreResponse;
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

    @PostMapping("/{registrationNumber}")
    public ResponseEntity<ApiResponse<ScoreResponse>> getScoreByRegistrationNumber(
            @Valid @RequestBody TaskRequest taskRequest) {
        ApiResponse<ScoreResponse> apiResponse = new ApiResponse<>();

        try {
            ScoreResponse taskResponse = taskService.createTask(taskRequest);
            apiResponse.ok(taskResponse);
            return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
        } catch (TodoException e) {
            apiResponse.error(Map.of("message", e.getMessage()));
            return ResponseEntity.status(e.getStatus()).body(apiResponse);
        } catch (Exception e) {
            apiResponse.error(Map.of("message", "Unexpected error occurred: " + e));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<List<ScoreResponse>>> getListTasks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) Integer priority,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        ApiResponse<List<ScoreResponse>> apiResponse = new ApiResponse<>();
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ScoreResponse> tasksPage = taskService.listTasks(title, status, priority, dueDate, pageable);

            MetadataResponse metadata = new MetadataResponse(
                    tasksPage.getTotalElements(),
                    tasksPage.getTotalPages(),
                    tasksPage.getNumber(),
                    tasksPage.getSize(),
                    (tasksPage.hasNext() ? "/api/tasks?page=" + (tasksPage.getNumber() + 1) : null),
                    (tasksPage.hasPrevious() ? "/api/tasks?page=" + (tasksPage.getNumber() - 1) : null),
                    "/api/tasks?page=" + (tasksPage.getTotalPages() - 1),
                    "/api/tasks?page=0");

            Map<String, Object> responseMetadata = new HashMap<>();
            responseMetadata.put("pagination", metadata);
            apiResponse.ok(tasksPage.getContent(), responseMetadata);
        } catch (TodoException e) {
            apiResponse.error(Map.of("message", e.getMessage()));
            return ResponseEntity.status(e.getStatus()).body(apiResponse);
        } catch (Exception e) {
            apiResponse.error(Map.of("message", "Unexpected error occurred: " + e));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
        }

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // @GetMapping("/top")
    // public ResponseEntity<ApiResponse<ScoreResponse>>
    // getScoreByGroupSubject(@RequestParam Long taskId,
    // @RequestParam Long limit) {
    // ApiResponse<ScoreResponse> apiResponse = new ApiResponse<>();

    // try {
    // ScoreResponse taskResponse = scoreService
    // apiResponse.ok(taskResponse);
    // return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    // } catch (TodoException e) {
    // apiResponse.error(Map.of("message", e.getMessage()));
    // return ResponseEntity.status(e.getStatus()).body(apiResponse);
    // } catch (Exception e) {
    // apiResponse.error(Map.of("message", "Unexpected error occurred"));
    // return
    // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    // }
    // }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<ApiResponse<Object>> deleteTask(@PathVariable Long taskId) {
        ApiResponse<Object> apiResponse = new ApiResponse<>();
        try {
            scoreService.(taskId);
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("message", "Task deleted successfully");
            apiResponse.ok(null, metadata);
            return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
        } catch (TodoException e) {
            apiResponse.error(Map.of("message", e.getMessage()));
            return ResponseEntity.status(e.getStatus()).body(apiResponse);
        } catch (Exception e) {
            apiResponse.error(Map.of("message", "Unexpected error occurred"));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
        }
    }

}
