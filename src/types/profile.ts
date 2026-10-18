export type EventType = 'github-repo' | 'hackathon' | 'test-suite' | 'production-impact' | 'certificate';

export interface SkillEvent {
  id: string;
  title: string;
  type: EventType;
  label: string;
  description: string;
  meta: string;
  link?: string;
  thumbnailUrl?: string; // certificate image preview
  delta?: number;
}

export interface SkillItem {
  id: string;
  name: string;
  score: number;
  category?: string;
  events: SkillEvent[];
}

export interface UserProfile {
  name: string;
  headline: string;
  company: string;
  location: string;
  avatarUrl: string;
  connectionsCount: number;
  about: string;
  skills: SkillItem[];
}
