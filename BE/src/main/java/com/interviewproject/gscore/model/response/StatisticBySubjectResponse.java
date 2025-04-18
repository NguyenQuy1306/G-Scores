package com.interviewproject.gscore.model.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticBySubjectResponse {

    private String subjectName;
    private Long level1;
    private Long level2;
    private Long level3;
    private Long level4;
}
