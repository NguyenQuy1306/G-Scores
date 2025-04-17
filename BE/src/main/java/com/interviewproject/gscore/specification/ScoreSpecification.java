// package com.interviewproject.gscore.specification;

// import java.time.LocalDate;
// import java.util.ArrayList;
// import java.util.List;
// import jakarta.persistence.criteria.Predicate;

// import org.springframework.data.jpa.domain.Specification;

// import com.interviewproject.gscore.model.entity.Student;
// import com.interviewproject.gscore.model.entity.TaskStatus;

// public class ScoreSpecification {
// public static Specification<Student> filterTasks(String title, TaskStatus
// status, Integer priority,
// LocalDate dueDate) {
// return (root, query, criteriaBuilder) -> {
// List<Predicate> predicates = new ArrayList<>();

// if (title != null && !title.isEmpty()) {
// predicates.add(criteriaBuilder.like(root.get("title"), "%" + title + "%"));
// }
// if (status != null) {
// predicates.add(criteriaBuilder.equal(root.get("status"), status));
// }
// if (priority != null) {
// predicates.add(criteriaBuilder.equal(root.get("priority"), priority));
// }
// if (dueDate != null) {
// predicates.add(criteriaBuilder.equal(root.get("dueDate"), dueDate));
// }

// return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
// };
// }

// }
