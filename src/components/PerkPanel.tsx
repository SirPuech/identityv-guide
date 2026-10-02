import React from 'react';
import { PerkBuild } from '../types';
import { useLang } from '../context/LangContext';

interface PerkPanelProps {
  perks: PerkBuild[];
  accentColor?: string;
}

export const PerkPanel: React.FC<PerkPanelProps> = ({
  perks,
  accentColor = 'var(--orange)',
}) => {
  const { lang, t } = useLang();

  return (
    <section className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <span style={{ fontSize: '18px', color: accentColor }}>🕸</span>
        <h2 style={{ font: '700 20px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
          {t('labels.perks')}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {perks.map((build, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: '20px',
              border: '1px solid var(--line-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ font: '700 16px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
                {build.name[lang]}
              </h3>
              <span className="chip chip-role" style={{ fontSize: '10px' }}>
                {build.direction}
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '14px' }}>
              {build.description[lang]}
            </p>

            <div>
              <span className="section-label" style={{ display: 'block', marginBottom: '6px' }}>
                {lang === 'th' ? 'สกิลจำเป็น (Key Talents):' : 'Key Talents:'}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {build.keyTalents.map((talent, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '12px',
                      background: 'var(--raise)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      color: 'var(--ink)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    ✓ {talent[lang]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
