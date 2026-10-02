import React from 'react';
import { TrickItem } from '../types';
import { useLang } from '../context/LangContext';

interface TricksPanelProps {
  tricks: TrickItem[];
  accentColor?: string;
}

export const TricksPanel: React.FC<TricksPanelProps> = ({ tricks, accentColor = '#8B5CF6' }) => {
  const { lang, t } = useLang();

  if (!tricks || tricks.length === 0) return null;

  return (
    <section className="guide-section">
      <h2 className="guide-section-title">
        <span style={{ color: accentColor }}>⚡</span>
        <span>{t('labels.tricks')}</span>
      </h2>

      <div>
        {tricks.map((trick, idx) => (
          <div
            key={idx}
            className="trick-item"
            style={{ borderLeftColor: accentColor }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div className="trick-title">{trick.title[lang]}</div>
              {trick.tag && (
                <span
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {trick.tag}
                </span>
              )}
            </div>
            <p className="trick-detail">{trick.detail[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
