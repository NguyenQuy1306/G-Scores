package com.interviewproject.gscore.repository;

import com.interviewproject.gscore.model.entity.Score;
import com.interviewproject.gscore.model.entity.ScoreId;
import com.interviewproject.gscore.model.entity.Student;
import com.interviewproject.gscore.model.response.ScoreResponse;
import com.interviewproject.gscore.model.response.StatisticBySubjectResponse;
import com.interviewproject.gscore.model.response.StudentResponse;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@Repository
public interface ScoreRepository extends JpaRepository<Score, ScoreId> {
    List<Score> findByStudent(Student student);

    @Query("""
                SELECT new com.interviewproject.gscore.model.response.StatisticBySubjectResponse(
                    "Overall",
                    SUM(CASE WHEN s.score >= 8 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score >= 6 AND s.score < 8 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score >= 4 AND s.score < 6 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score < 4 THEN 1 ELSE 0 END)
                )
                FROM Score s
            """)
    StatisticBySubjectResponse getStatistics();

    @Query("""
                SELECT new com.interviewproject.gscore.model.response.StatisticBySubjectResponse(
                    s.subject.subjectName,
                    SUM(CASE WHEN s.score >= 8 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score >= 6 AND s.score < 8 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score >= 4 AND s.score < 6 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score < 4 THEN 1 ELSE 0 END)
                )
                FROM Score s
                GROUP BY s.subject.subjectName
            """)
    List<StatisticBySubjectResponse> getSubjectStatistics();

    @Query("""
                        SELECT new com.interviewproject.gscore.model.response.StudentResponse(
              s.studentId,
              s.registrationNumber,
              SUM(sc.score),
              AVG(sc.score)
            )

                        FROM Score sc
                          JOIN sc.student s
                          JOIN sc.subject sub
                        WHERE (:subjects IS NULL OR sub.subjectName IN :subjects)
                        GROUP BY s.studentId, s.registrationNumber
                        ORDER BY SUM(sc.score) DESC
                      """)
    List<StudentResponse> findTopBySubjects(
            @Param("subjects") List<String> subjects,
            Pageable pageable);

    @Query("""
                SELECT new com.interviewproject.gscore.model.response.ScoreResponse(
                  sub.subjectName,
                  sc.score
                )
                FROM Score sc
                 JOIN sc.subject sub
                WHERE sc.student.studentId = :studentId
                  AND (:subjects IS NULL OR sub.subjectName IN :subjects)
            """)
    List<ScoreResponse> findScoresForStudentAndSubjects(
            @Param("studentId") Long studentId,
            @Param("subjects") List<String> subjects);
}
