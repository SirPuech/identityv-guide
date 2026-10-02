import React from 'react';
import { PerkBuild } from '../types';
import { useLang } from '../context/LangContext';

interface PerkPanelProps {
  perks: PerkBuild[];
  accentColor?: string;
}

export const PerkPanel: React.FC<PerkPanelProps> = ({ perks, accentColor = '#8B5CF6' }) => {
  const { lang, t } = useLang();

  return (
    <section className="guide-section">
      <h2 className="guide-section-title">
        <span style={{ color: accentColor }}>🕸</span>
        <span>{t('labels.perks')}</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {perks.map((build, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(16, 12, 30, 0.6)',
              border: '1px solid rgba(139, 92, 246, 0.18)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#EDE9FE' }}>
                {build.name[lang]}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#C4B5FD',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}
              >
                {build.direction}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px' }}>
              {build.description[lang]}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', fontWeight: 600 }}>
                {lang === 'th' ? 'สกิลสำคัญที่ต้องอัพ' : 'Key Talents'}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {build.keyTalents.map((talent, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '12px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      color: '#E0E7FF',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
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
