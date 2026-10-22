export type GameMode = 'section_blitz' | 'boss_battle' | 'adjustment_detective';

export interface SectionMatchCard {
  id: string;
  code: string; // e.g. "Section 135" or "SA 705" or "AS 2"
  title: string; // e.g. "Corporate Social Responsibility"
  subjectId: string;
}

export interface BossBattleQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
  damage: number;
}

export interface AdjustmentItem {
  id: string;
  description: string;
  category: 'PGBP' | 'Cash Flow' | 'Cost Sheet';
  correctAction: 'ADD' | 'DEDUCT' | 'IGNORE'; // e.g. Fine paid for law violation -> ADD to Net profit
  reason: string;
  sectionOrStandard: string;
}

export interface GameState {
  xp: number;
  level: number;
  rankTitle: string;
  streakDays: number;
  bossWins: number;
  sectionBlitzHighScore: number;
  badgesUnlocked: string[];
}
