export interface Subject {
    name: string;
    score: number;
  }
  
  export interface Score {
    studentName: string;
    registrationNumber: string;
    subjects: Subject[];
    totalScore: number;
    average: number;
  }
  
  export interface ScoreState {
    currentScore: Score | null;
    error: string | null;
    loading: boolean;
  }
  