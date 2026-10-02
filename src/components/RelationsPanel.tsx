import React from 'react';
import Link from 'next/link';
import { CounterInfo, PartnerInfo } from '../types';
import { useLang } from '../context/LangContext';
import { getCharacterById } from '../utils/characters';

interface RelationsPanelProps {
  counters: CounterInfo[];
  partners?: PartnerInfo[];
  accentColor?: string;
}

export const RelationsPanel: React.FC<RelationsPanelProps> = ({
  counters,
  partners,
  accentColor = '#8B5CF6',
}) => {
  const { lang, t } = useLang();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Counters Section */}
      {counters && counters.length > 0 && (
        <section className="guide-section">
          <h2 className="guide-section-title">
            <span style={{ color: '#EF4444' }}>⚠️</span>
            <span>{t('labels.counters')}</span>
          </h2>

          <div className="relation-grid">
            {counters.map((c, idx) => {
              const targetChar = getCharacterById(c.characterId);
              const targetLink = targetChar ? `/${targetChar.type}s/${targetChar.id}` : '#';

              return (
                <div key={idx} className="relation-card danger">
                  <div className="relation-card-name">
                    <span style={{ color: '#FCA5A5' }}>{c.characterName[lang]}</span>
                    {targetChar && (
                      <Link
                        href={targetLink}
                        style={{
                          fontSize: '11px',
                          color: 'var(--accent-purple-light)',
                          textDecoration: 'underline',
                        }}
                      >
                        {lang === 'th' ? 'ดูไกด์ตัวนี้ →' : 'View guide →'}
                      </Link>
                    )}
                  </div>
                  <p className="relation-text">{c.reason[lang]}</p>
                  {c.tip && (
                    <div className="relation-tip">
                      🛡️ <strong>{lang === 'th' ? 'วิธีแก้ทาง:' : 'Counter strategy:'}</strong> {c.tip[lang]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners && partners.length > 0 && (
        <section className="guide-section">
          <h2 className="guide-section-title">
            <span style={{ color: '#10B981' }}>🤝</span>
            <span>{t('labels.partners')}</span>
          </h2>

          <div className="relation-grid">
            {partners.map((p, idx) => {
              const targetChar = getCharacterById(p.characterId);
              const targetLink = targetChar ? `/${targetChar.type}s/${targetChar.id}` : '#';

              return (
                <div key={idx} className="relation-card synergy">
                  <div className="relation-card-name">
                    <span style={{ color: '#6EE7B7' }}>{p.characterName[lang]}</span>
                    {targetChar && (
                      <Link
                        href={targetLink}
                        style={{
                          fontSize: '11px',
                          color: 'var(--accent-purple-light)',
                          textDecoration: 'underline',
                        }}
                      >
                        {lang === 'th' ? 'ดูไกด์ตัวนี้ →' : 'View guide →'}
                      </Link>
                    )}
                  </div>
                  <p className="relation-text">{p.synergy[lang]}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
