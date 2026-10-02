import React from 'react';
import Link from 'next/link';
import { Character } from '../types';
import { useLang } from '../context/LangContext';
import { getAssetUrl } from '../utils/asset';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { lang, t } = useLang();
  const isSurvivor = character.type === 'survivor';

  const roleKey = character.role ? `roles.${character.role}` : '';
  const roleLabel = roleKey ? t(roleKey) : '';

  return (
    <Link
      href={`/${character.type}s/${character.id}`}
      className="hero-card"
    >
      <div className="hero-card-banner">
        {character.image ? (
          <img src={getAssetUrl(character.image)} alt={character.name[lang]} loading="lazy" />
        ) : (
          <div className="hero-placeholder-art">
            {character.name[lang].slice(0, 1)}
          </div>
        )}
      </div>

      <div className="hero-card-header">
        <div>
          <h3 className="hero-card-title">{character.name[lang]}</h3>
          <div className="hero-card-subtitle">{character.title[lang]}</div>
        </div>

        <span className={`chip chip-tier ${character.tier.toLowerCase()}`}>
          Tier {character.tier}
        </span>
      </div>

      <div className="hero-card-chips">
        <span className={`chip ${isSurvivor ? 'chip-survivor' : 'chip-hunter'}`}>
          {isSurvivor ? 'Survivor' : 'Hunter'}
        </span>
        {roleLabel && (
          <span className="chip chip-role">
            {roleLabel}
          </span>
        )}
      </div>

      <p className="hero-card-desc">
        {character.overview[lang]}
      </p>

      <div className="hero-card-footer">
        <div style={{ color: '#FBBF24', fontSize: '13px' }}>
          {'★'.repeat(character.difficulty)}
          <span style={{ color: 'rgba(255,255,255,0.18)' }}>
            {'★'.repeat(5 - character.difficulty)}
          </span>
        </div>

        {character.youtubeVideoId && (
          <span className="hero-card-video-pill">
            <span>▶</span>
            <span>{lang === 'th' ? 'มีคลิปไกด์' : 'Video Guide'}</span>
          </span>
        )}
      </div>
    </Link>
  );
};
