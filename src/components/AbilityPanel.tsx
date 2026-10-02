import React from 'react';
import { Ability } from '../types';
import { useLang } from '../context/LangContext';

interface AbilityPanelProps {
  abilities: Ability[];
  accentColor?: string;
}

export const AbilityPanel: React.FC<AbilityPanelProps> = ({ abilities, accentColor = '#8B5CF6' }) => {
  const { lang, t } = useLang();

  return (
    <section className="guide-section">
      <h2 className="guide-section-title">
        <span style={{ color: accentColor }}>✦</span>
        <span>{t('labels.abilities')}</span>
      </h2>

      <div className="ability-list">
        {abilities.map((ability) => (
          <div key={ability.id} className="ability-item">
            <div className="ability-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: accentColor,
                  }}
                />
                <span className="ability-name">{ability.name[lang]}</span>
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    color: ability.type === 'active' ? '#38BDF8' : '#A78BFA',
                    background: ability.type === 'active' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(167, 139, 250, 0.12)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  {ability.type}
                </span>
              </div>
              {ability.cooldown && (
                <span className="ability-cooldown">⏱ {ability.cooldown}</span>
              )}
            </div>

            <p className="ability-desc">{ability.description[lang]}</p>

            {ability.tips && ability.tips.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {ability.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: '12px',
                      color: '#C4B5FD',
                      background: 'rgba(139, 92, 246, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    💡 {tip[lang]}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
