// package com.interviewproject.gscore.config;

// import com.interviewproject.gscore.model.entity.Score;
// import com.interviewproject.gscore.model.entity.ScoreId;
// import com.interviewproject.gscore.model.entity.Student;
// import com.interviewproject.gscore.model.entity.Subject;
// import com.interviewproject.gscore.repository.ScoreRepository;
// import com.interviewproject.gscore.repository.StudentRepository;
// import com.interviewproject.gscore.repository.SubjectRepository;
// import com.opencsv.CSVReader;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.core.io.ClassPathResource;
// import org.springframework.stereotype.Component;
// import org.springframework.transaction.annotation.Transactional;

// import java.io.InputStreamReader;
// import java.util.*;
// import java.util.stream.Collectors;

// @Component
// public class CsvSeeder implements CommandLineRunner {

// private final StudentRepository studentRepository;
// private final SubjectRepository subjectRepository;
// private final ScoreRepository scoreRepo;

// public CsvSeeder(StudentRepository studentRepository,
// SubjectRepository subjectRepository,
// ScoreRepository scoreRepo) {
// this.studentRepository = studentRepository;
// this.subjectRepository = subjectRepository;
// this.scoreRepo = scoreRepo;
// }

// private static final Map<String, String> SUBJECT_CODE_MAP = Map.of(
// "toan", "math",
// "ngu_van", "literature",
// "ngoai_ngu", "english",
// "vat_li", "physics",
// "hoa_hoc", "chemistry",
// "sinh_hoc", "biology",
// "lich_su", "history",
// "dia_li", "geography",
// "gdcd", "civic");

// @Override
// @Transactional
// public void run(String... args) throws Exception {
// SUBJECT_CODE_MAP.values().forEach(code -> {
// Subject subject = Subject.builder()
// .subjectName(code)
// .build();
// subjectRepository.save(subject);
// });

// // 2. Load CSV file
// try (CSVReader reader = new CSVReader(new InputStreamReader(
// new ClassPathResource("data/diem_thi_thpt_2024.csv").getInputStream()))) {

// String[] header = reader.readNext();
// List<String> subjectColumns = Arrays.asList(header).subList(1, header.length
// - 1);
// List<String> subjectNames = subjectColumns.stream()
// .map(col -> SUBJECT_CODE_MAP.getOrDefault(col, col))
// .collect(Collectors.toList());

// Map<String, Subject> subjectMap = subjectRepository
// .findBySubjectNameIn(subjectNames)
// .stream()
// .collect(Collectors.toMap(Subject::getSubjectName, s -> s));

// // 3. Read each row
// String[] row;
// while ((row = reader.readNext()) != null) {
// // 3.1 Insert student
// Long regNo = Long.valueOf(row[0]);
// Student student = studentRepository.findByRegistrationNumber(regNo);
// if (student == null) {
// student =
// studentRepository.save(Student.builder().registrationNumber(regNo).build());

// }

// // 3.2 Insert scores
// for (int i = 1; i < header.length - 1; i++) {
// String raw = row[i].trim();
// if (raw.isEmpty())
// continue;

// double scoreValue = Double.parseDouble(raw);
// String subjectColumn = header[i];
// String subjectName = SUBJECT_CODE_MAP.getOrDefault(subjectColumn,
// subjectColumn);
// Subject subject = subjectMap.get(subjectName);
// if (subject == null)
// continue;

// ScoreId scoreId = new ScoreId(student.getStudentId(),
// subject.getSubjectId());
// Score score = Score.builder()
// .scoreId(scoreId)
// .score(scoreValue)
// .student(student)
// .subject(subject)
// .build();
// scoreRepo.save(score);
// }

// // 3.3 (Tùy chọn) xử lý cột cuối nếu là mã ngoại ngữ
// }
// }
// }
// }
