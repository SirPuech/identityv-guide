import survivorsData from '../data/survivors.json';
import huntersData from '../data/hunters.json';
import { Character, TierListMap } from '../types';

export const survivors: Character[] = survivorsData as Character[];
export const hunters: Character[] = huntersData as Character[];
export const allCharacters: Character[] = [...survivors, ...hunters];

export const tierList: TierListMap = {
  survivors: {
    S: survivors.filter((s) => s.tier === 'S').map((s) => s.id),
    A: survivors.filter((s) => s.tier === 'A').map((s) => s.id),
    B: survivors.filter((s) => s.tier === 'B').map((s) => s.id),
    C: survivors.filter((s) => s.tier === 'C').map((s) => s.id),
  },
  hunters: {
    S: hunters.filter((h) => h.tier === 'S').map((h) => h.id),
    A: hunters.filter((h) => h.tier === 'A').map((h) => h.id),
    B: hunters.filter((h) => h.tier === 'B').map((h) => h.id),
    C: hunters.filter((h) => h.tier === 'C').map((h) => h.id),
  },
};

export function getCharacterById(id: string): Character | undefined {
  return allCharacters.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export function getSurvivors(): Character[] {
  return survivors;
}

export function getHunters(): Character[] {
  return hunters;
}

export function getCharactersByTier(type: 'survivor' | 'hunter', tier: 'S' | 'A' | 'B' | 'C'): Character[] {
  const list = type === 'survivor' ? survivors : hunters;
  return list.filter((c) => c.tier === tier);
}

export function searchCharacters(query: string, lang: 'th' | 'en'): Character[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];

  return allCharacters.filter((char) => {
    const nameMatch =
      char.name.th.toLowerCase().includes(cleanQ) ||
      char.name.en.toLowerCase().includes(cleanQ);
    const titleMatch =
      char.title.th.toLowerCase().includes(cleanQ) ||
      char.title.en.toLowerCase().includes(cleanQ);
    const roleMatch = char.role?.toLowerCase().includes(cleanQ);
    const abilityMatch = char.abilities.some(
      (a) =>
        a.name.th.toLowerCase().includes(cleanQ) ||
        a.name.en.toLowerCase().includes(cleanQ) ||
        a.description.th.toLowerCase().includes(cleanQ) ||
        a.description.en.toLowerCase().includes(cleanQ)
    );

    return nameMatch || titleMatch || roleMatch || abilityMatch;
  });
}
