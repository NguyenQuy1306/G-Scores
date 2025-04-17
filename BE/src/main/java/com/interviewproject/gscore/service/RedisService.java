package com.interviewproject.gscore.service;

public interface RedisService {
    public boolean isTaskSent(Long taskId, String topic);

    public void markTaskAsSent(Long taskId, String topic);
}
