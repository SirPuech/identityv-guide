import React from 'react';
import { Ability } from '../types';
import { useLang } from '../context/LangContext';

interface AbilityPanelProps {
  abilities: Ability[];
  accentColor?: string;
}

export const AbilityPanel: React.FC<AbilityPanelProps> = ({
  abilities,
  accentColor = 'var(--blue-lift)',
}) => {
  const { lang, t } = useLang();

  return (
    <section className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <span style={{ fontSize: '18px', color: accentColor }}>✦</span>
        <h2 style={{ font: '700 20px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
          {t('labels.abilities')}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {abilities.map((ability) => (
          <div
            key={ability.id}
            style={{
              background: 'var(--onyx)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r)',
              padding: '16px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: accentColor }} />
                <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>
                  {ability.name[lang]}
                </span>
                <span
                  className="chip"
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    background: ability.type === 'active' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    color: ability.type === 'active' ? 'var(--blue-lift)' : 'var(--ink-2)',
                  }}
                >
                  {ability.type}
                </span>
              </div>

              {ability.cooldown && (
                <span className="mono" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                  ⏱ {ability.cooldown}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
              {ability.description[lang]}
            </p>

            {ability.tips && ability.tips.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {ability.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--orange)',
                      background: 'rgba(249, 115, 22, 0.08)',
                      padding: '5px 12px',
                      borderRadius: '6px',
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
