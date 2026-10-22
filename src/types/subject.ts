export type GroupType = 'Group 1' | 'Group 2';

export interface Chapter {
  id: string;
  name: string;
  category: 'A' | 'B' | 'C'; // ICAI ABC Analysis weightage
  weightageMarks: string;
  subtopics?: string[];
}

export interface Subject {
  id: string;
  paperNumber: number;
  code: string;
  title: string;
  group: GroupType;
  mcqMarks: number; // 30
  descriptiveMarks: number; // 70
  color: string;
  icon: string;
  chapters: Chapter[];
  sectionsCount?: number;
  standardsCount?: number;
}
