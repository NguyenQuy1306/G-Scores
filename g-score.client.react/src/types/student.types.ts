import { Subject } from './score.types';

export interface Student {
  studentId: number;
  registrationNumber: string;
  scores: Subject[]; 
  totalScore: number;
  average: number;
}
