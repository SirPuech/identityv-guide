export type Language = 'th' | 'en';

export interface LocalizedString {
  th: string;
  en: string;
}

export interface Ability {
  id: string;
  name: LocalizedString;
  type: 'active' | 'passive' | 'external';
  description: LocalizedString;
  cooldown?: string;
  tips?: LocalizedString[];
}

export interface CounterInfo {
  characterId: string;
  characterName: LocalizedString;
  reason: LocalizedString;
  tip: LocalizedString;
}

export interface PartnerInfo {
  characterId: string;
  characterName: LocalizedString;
  synergy: LocalizedString;
}

export interface TrickItem {
  title: LocalizedString;
  detail: LocalizedString;
  tag?: 'kiting' | 'rescuing' | 'decoding' | 'patrolling' | 'chasing' | 'camping' | 'general';
}

export interface PerkBuild {
  name: LocalizedString;
  direction: string; // e.g. "36 (Borrowed Time + Tide Turner)"
  keyTalents: LocalizedString[];
  description: LocalizedString;
}

export interface Character {
  id: string;
  name: LocalizedString;
  title: LocalizedString;
  type: 'survivor' | 'hunter';
  role?: 'decoder' | 'rescuer' | 'kiter' | 'support' | 'patrol' | 'chase' | 'camp' | 'control';
  difficulty: 1 | 2 | 3 | 4 | 5;
  tier: 'S' | 'A' | 'B' | 'C';
  quote: LocalizedString;
  overview: LocalizedString;
  colorAccent?: string;
  stats: {
    decoding?: number;
    kiting?: number;
    rescuing?: number;
    support?: number;
    chase?: number;
    camping?: number;
    mobility?: number;
    control?: number;
  };
  abilities: Ability[];
  recommendedPerks: PerkBuild[];
  tricks: TrickItem[];
  counters: CounterInfo[];      // Who counters this character
  counteredBy?: CounterInfo[];  // Who this character counters
  partners?: PartnerInfo[];     // Best allies
  youtubeVideoId?: string;
}

export interface TierListMap {
  survivors: {
    S: string[];
    A: string[];
    B: string[];
    C: string[];
  };
  hunters: {
    S: string[];
    A: string[];
    B: string[];
    C: string[];
  };
}
