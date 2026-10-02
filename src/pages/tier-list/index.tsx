import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../../components/Layout';
import { useLang } from '../../context/LangContext';
import { tierList, getCharacterById } from '../../utils/characters';

export default function TierListPage() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<'survivors' | 'hunters'>('survivors');

  const tiers: Array<'S' | 'A' | 'B' | 'C'> = ['S', 'A', 'B', 'C'];
  const currentData = tierList[activeTab];

  return (
    <Layout
      pageTitle={t('tierPage.title')}
      pageDescription={t('tierPage.desc')}
    >
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title">
            <span>📊</span>
            <span>{t('tierPage.title')}</span>
          </h1>
          <p className="section-subtitle">{t('tierPage.desc')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'survivors' ? 'active' : ''}`}
          onClick={() => setActiveTab('survivors')}
        >
          🟢 {t('tierPage.survivorTab')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'hunters' ? 'active' : ''}`}
          onClick={() => setActiveTab('hunters')}
        >
          🔴 {t('tierPage.hunterTab')}
        </button>
      </div>

      {/* Tier Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {tiers.map((tier) => {
          const charIds = currentData[tier] || [];
          if (charIds.length === 0 && tier === 'C') return null;

          return (
            <div key={tier} className="tier-row">
              <div className={`tier-label tier-${tier.toLowerCase()}`}>
                {tier}
              </div>

              <div className="tier-chars">
                {charIds.length > 0 ? (
                  charIds.map((id) => {
                    const char = getCharacterById(id);
                    if (!char) return null;

                    const accent = char.colorAccent || (activeTab === 'survivors' ? '#10B981' : '#EF4444');

                    return (
                      <Link
                        key={id}
                        href={`/${char.type}s/${char.id}`}
                        className="tier-char-pill"
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: `${accent}22`,
                            border: `1px solid ${accent}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '14px',
                            color: accent,
                          }}
                        >
                          {char.name[lang].slice(0, 1)}
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)' }}>
                            {char.name[lang]}
                          </div>
                          {char.role && (
                            <div style={{ fontSize: '10.5px', color: 'var(--text-dim)' }}>
                              {t(`roles.${char.role}`)}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div style={{ color: 'var(--text-dim)', fontSize: '13px', fontStyle: 'italic' }}>
                    {lang === 'th' ? 'ไม่มีตัวละครในระดับนี้' : 'No characters in this tier'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meta advice footer */}
      <div
        style={{
          marginTop: '36px',
          padding: '24px',
          background: 'rgba(23, 18, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#EDE9FE', marginBottom: '8px' }}>
          💡 {lang === 'th' ? 'คำแนะนำการเลือกตัวละครตามเมต้า' : 'Meta Ranking Guide'}
        </h3>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {lang === 'th'
            ? 'ระดับ Tier S คือตัวละครที่มักจะถูกแบนหรือเลือกเป็นอันดับแรกในการแข่งขันและการไต่แรงก์สูง เนื่องจากความสามารถในการพลิกเกมและลดความผิดพลาดได้ดีที่สุด ส่วน Tier A มีประสิทธิภาพยอดเยี่ยมเมื่อเล่นเข้ากับทีม'
            : 'Tier S characters define the competitive meta and are frequent first-pick/ban candidates due to unmatched game-turning potential. Tier A characters provide immense power when paired with appropriate team compositions.'}
        </p>
      </div>
    </Layout>
  );
}
