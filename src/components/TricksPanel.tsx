import React from 'react';
import { TrickItem } from '../types';
import { useLang } from '../context/LangContext';

interface TricksPanelProps {
  tricks: TrickItem[];
  accentColor?: string;
}

export const TricksPanel: React.FC<TricksPanelProps> = ({
  tricks,
  accentColor = 'var(--blue-lift)',
}) => {
  const { lang, t } = useLang();

  if (!tricks || tricks.length === 0) return null;

  return (
    <section className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <span style={{ fontSize: '18px', color: 'var(--orange)' }}>⚡</span>
        <h2 style={{ font: '700 20px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
          {t('labels.tricks')}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tricks.map((trick, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--onyx)',
              border: '1px solid var(--line)',
              borderLeft: '3px solid var(--orange)',
              borderRadius: 'var(--r-sm)',
              padding: '14px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>
                {trick.title[lang]}
              </div>
              {trick.tag && (
                <span className="chip" style={{ fontSize: '10px', textTransform: 'uppercase', background: 'var(--raise)', color: 'var(--ink-2)' }}>
                  {trick.tag}
                </span>
              )}
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
              {(trick.detail || trick.description)?.[lang] || ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
