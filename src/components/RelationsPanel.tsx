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
  accentColor = 'var(--blue-lift)',
}) => {
  const { lang, t } = useLang();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Counters Section */}
      {counters && counters.length > 0 && (
        <section className="panel" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <span style={{ fontSize: '18px', color: '#EF4444' }}>⚠️</span>
            <h2 style={{ font: '700 20px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
              {t('labels.counters')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {counters.map((c, idx) => {
              const targetChar = getCharacterById(c.characterId);
              const targetLink = targetChar ? `/${targetChar.type}s/${targetChar.id}` : '#';

              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--onyx)',
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid #EF4444',
                    borderRadius: 'var(--r-sm)',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: '#FCA5A5' }}>
                      {targetChar ? targetChar.name[lang] : c.characterName?.[lang] || c.characterId}
                    </span>
                    {targetChar && (
                      <Link href={targetLink} style={{ fontSize: '12px', color: 'var(--blue-lift)' }}>
                        {lang === 'th' ? 'ดูไกด์ →' : 'Guide →'}
                      </Link>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '8px' }}>
                    {c.reason?.[lang] || c.note?.[lang] || ''}
                  </p>
                  {c.tip && (
                    <div style={{ fontSize: '12px', color: 'var(--orange)', background: 'rgba(249, 115, 22, 0.08)', padding: '6px 10px', borderRadius: '6px' }}>
                      🛡️ <strong>{lang === 'th' ? 'วิธีรับมือ:' : 'Tip:'}</strong> {c.tip[lang]}
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
        <section className="panel" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <span style={{ fontSize: '18px', color: '#10B981' }}>🤝</span>
            <h2 style={{ font: '700 20px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
              {t('labels.partners')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {partners.map((p, idx) => {
              const targetChar = getCharacterById(p.characterId);
              const targetLink = targetChar ? `/${targetChar.type}s/${targetChar.id}` : '#';

              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--onyx)',
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid #10B981',
                    borderRadius: 'var(--r-sm)',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: '#6EE7B7' }}>
                      {targetChar ? targetChar.name[lang] : p.characterName?.[lang] || p.characterId}
                    </span>
                    {targetChar && (
                      <Link href={targetLink} style={{ fontSize: '12px', color: 'var(--blue-lift)' }}>
                        {lang === 'th' ? 'ดูไกด์ →' : 'Guide →'}
                      </Link>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                    {p.synergy?.[lang] || p.reason?.[lang] || ''}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
