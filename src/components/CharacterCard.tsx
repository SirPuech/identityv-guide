import React from 'react';
import Link from 'next/link';
import { Character } from '../types';
import { useLang } from '../context/LangContext';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { lang, t } = useLang();
  const isSurvivor = character.type === 'survivor';
  const accentColor = character.colorAccent || (isSurvivor ? '#10B981' : '#EF4444');

  // Role display label
  const roleKey = character.role ? `roles.${character.role}` : '';
  const roleLabel = roleKey ? t(roleKey) : '';

  return (
    <Link
      href={`/${character.type}s/${character.id}`}
      className="character-card"
      style={{ '--card-accent': accentColor } as React.CSSProperties}
    >
      <div className="card-top">
        <div
          className="card-avatar"
          style={{
            borderColor: `${accentColor}55`,
            boxShadow: `0 0 15px ${accentColor}33`,
          }}
        >
          {character.name[lang].slice(0, 1)}
        </div>
        <div className="card-info">
          <h3 className="card-name">{character.name[lang]}</h3>
          <div className="card-title-sub">{character.title[lang]}</div>
          <div className="badge-row">
            {roleLabel && <span className="role-badge">{roleLabel}</span>}
            <span className={`tier-badge tier-${character.tier.toLowerCase()}`}>
              Tier {character.tier}
            </span>
          </div>
        </div>
      </div>

      <p className="card-desc">
        {character.overview[lang]}
      </p>

      <div className="card-footer">
        <div className="difficulty-stars" title={`${t('labels.difficulty')}: ${character.difficulty}/5`}>
          {'★'.repeat(character.difficulty)}
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>
            {'★'.repeat(5 - character.difficulty)}
          </span>
        </div>

        <span className="view-guide-link">
          <span>{t('labels.viewDetails')}</span>
          <span>→</span>
        </span>
      </div>
    </Link>
  );
};
