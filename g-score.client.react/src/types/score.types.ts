export interface Subject {
  subjectName: string;
    score: number;
  }
  
  export interface Score {
    registrationNumber: string;
    scoreResponses: Subject[];
    totalScore: number;
    averageScore: number;
    studentName?: string; 

  }
  

  export interface ScoreState {
    currentScore: Score | null;
    error: string | null;
    loading: boolean;
  }
    