package com.interviewproject.gscore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.interviewproject.gscore.model.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByRegistrationNumber(Long registrationNumber);
}
