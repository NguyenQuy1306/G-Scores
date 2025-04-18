package com.interviewproject.gscore.repository;

import com.interviewproject.gscore.model.entity.Score;
import com.interviewproject.gscore.model.entity.ScoreId;
import com.interviewproject.gscore.model.entity.Student;
import com.interviewproject.gscore.model.response.StatisticBySubjectResponse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends JpaRepository<Score, ScoreId> {
    List<Score> findByStudent(Student student);

    @Query("""
                SELECT new com.yourpackage.SubjectLevelStatsDTO(
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
                SELECT new com.yourpackage.SubjectLevelStatsDTO(
                    s.subject.name,
                    SUM(CASE WHEN s.score >= 8 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score >= 6 AND s.score < 8 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score >= 4 AND s.score < 6 THEN 1 ELSE 0 END),
                    SUM(CASE WHEN s.score < 4 THEN 1 ELSE 0 END)
                )
                FROM Score s
                GROUP BY s.subject.name
            """)
    List<StatisticBySubjectResponse> getSubjectStatistics();

}
