import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../../components/Layout';
import { useLang } from '../../context/LangContext';
import { tierList, getCharacterById } from '../../utils/characters';
import { getAssetUrl } from '../../utils/asset';

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
      <div className="page-head">
        <div>
          <span className="eyebrow">Competitive Meta Rankings</span>
          <h1>{t('tierPage.title')}</h1>
          <p className="muted" style={{ marginTop: '6px' }}>{t('tierPage.desc')}</p>
        </div>
      </div>

      {/* Tabs in KRIDA style */}
      <div className="filters" style={{ marginBottom: '28px' }}>
        <button
          className={activeTab === 'survivors' ? 'is-on' : ''}
          onClick={() => setActiveTab('survivors')}
          style={{ fontSize: '14px', padding: '9px 18px' }}
        >
          🟢 {t('tierPage.survivorTab')}
        </button>
        <button
          className={activeTab === 'hunters' ? 'is-on-orange' : ''}
          onClick={() => setActiveTab('hunters')}
          style={{ fontSize: '14px', padding: '9px 18px' }}
        >
          🔴 {t('tierPage.hunterTab')}
        </button>
      </div>

      {/* Tier Group Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {tiers.map((tier) => {
          const charIds = currentData[tier] || [];
          if (charIds.length === 0 && tier === 'C') return null;

          return (
            <div key={tier} className="tier-group">
              <div className="tier-group-header">
                <div className={`tier-badge-krida ${tier.toLowerCase()}`}>
                  {tier}
                </div>
                <div>
                  <h3 style={{ font: '700 18px Outfit, Prompt, sans-serif' }}>
                    {tier === 'S'
                      ? (lang === 'th' ? 'ระดับ S (ท็อปเมต้า / แบนบ่อยที่สุด)' : 'Tier S (Dominant Meta / High Ban Rate)')
                      : tier === 'A'
                      ? (lang === 'th' ? 'ระดับ A (ประสิทธิภาพสูง / เมต้าแข่งขัน)' : 'Tier A (High Competitive Viability)')
                      : tier === 'B'
                      ? (lang === 'th' ? 'ระดับ B (เล่นได้ดีตามสถานการณ์ / คลาสสิก)' : 'Tier B (Situational / Classic)')
                      : (lang === 'th' ? 'ระดับ C (นอกเมต้า / ต้องอาศัยทักษะเฉพาะตัว)' : 'Tier C (Out of Meta / Specialist)')}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                    {charIds.length} {lang === 'th' ? 'ตัวละคร' : 'Characters'}
                  </div>
                </div>
              </div>

              <div className="tier-char-grid">
                {charIds.length > 0 ? (
                  charIds.map((id) => {
                    const char = getCharacterById(id);
                    if (!char) return null;

                    return (
                      <Link
                        key={id}
                        href={`/${char.type}s/${char.id}`}
                        className="tier-pill-card"
                      >
                        <div className="tier-avatar-mini">
                          <img
                            src={getAssetUrl(char.image || `/images/heroes/${char.id}.png`)}
                            alt={char.name[lang]}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.endsWith('.svg')) {
                                target.src = getAssetUrl(`/images/heroes/${char.id}.svg`);
                              }
                            }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {char.name[lang]}
                          </div>
                          {char.role && (
                            <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                              {t(`roles.${char.role}`)}
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--blue-lift)' }}>→</span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="empty" style={{ gridColumn: '1 / -1', padding: '18px' }}>
                    {lang === 'th' ? 'ไม่มีตัวละครในระดับนี้' : 'No characters in this tier'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meta advice footer in KRIDA panel */}
      <div className="panel" style={{ marginTop: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px' }}>💡</span>
          <h3 style={{ font: '700 17px Outfit, Prompt, sans-serif', color: 'var(--ink)' }}>
            {lang === 'th' ? 'คำแนะนำการเลือกตัวละครตามเมต้า' : 'Meta Drafting Strategy'}
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
          {lang === 'th'
            ? 'ระดับ Tier S คือตัวละครที่มักจะถูกแบนหรือเลือกเป็นอันดับแรกในการแข่งขันและการไต่แรงก์สูง เนื่องจากความสามารถในการพลิกเกมและลดความผิดพลาดได้ดีที่สุด ส่วน Tier A มีประสิทธิภาพยอดเยี่ยมเมื่อเล่นเข้ากับทีมชุดที่เหมาะสม'
            : 'Tier S characters define the competitive meta and are frequent first-pick/ban candidates due to unmatched game-turning potential. Tier A characters provide immense power when paired with synergistic team compositions.'}
        </p>
      </div>
    </Layout>
  );
}
