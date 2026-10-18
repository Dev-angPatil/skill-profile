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
}

export interface SkillItem {
  id: string;
  name: string;
  score: number;
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
