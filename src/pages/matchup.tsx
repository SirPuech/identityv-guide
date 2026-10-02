import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { useLang } from '../context/LangContext';
import { hunters, survivors } from '../utils/characters';
import { getAssetUrl } from '../utils/asset';

export default function MatchupPage() {
  const { lang, t } = useLang();
  const [selectedHunterId, setSelectedHunterId] = useState<string>(hunters[0]?.id || 'sculptor');

  const hunter = hunters.find((h) => h.id === selectedHunterId) || hunters[0];

  // Find survivors countered by this hunter (survivors whose counters include this hunter)
  const survivorsStruggling = survivors.filter((s) =>
    s.counters.some((c) => c.characterId === hunter.id)
  );

  // Find survivors who counter this hunter (from hunter's counters)
  const survivorsAdvantage = hunter.counters.map((c) => {
    const sObj = survivors.find((s) => s.id === c.characterId);
    return {
      survivor: sObj,
      info: c,
    };
  });

  return (
    <Layout
      pageTitle={lang === 'th' ? 'ตารางแก้ทาง (Matchup Chart)' : 'Hunter vs Survivor Matchups'}
      pageDescription="วิเคราะห์ความได้เปรียบ-เสียเปรียบระหว่างฮันเตอร์และผู้รอดชีวิตเพื่อการดราฟท์ตัว"
    >
      <div className="page-head">
        <div>
          <span className="eyebrow">Matchup & Counter Matrix</span>
          <h1>{lang === 'th' ? 'ตารางวิเคราะห์การแก้ทาง (Matchup Chart)' : 'Hunter vs Survivor Matchup Matrix'}</h1>
          <p className="muted" style={{ marginTop: '6px' }}>
            {lang === 'th'
              ? 'เลือกฮันเตอร์ที่คุณต้องเจอเพื่อดูว่าเซอร์ไวเวอร์คนไหนได้เปรียบ และคนไหนที่ต้องระวังเป็นพิเศษ'
              : 'Select a hunter to inspect direct counter advantages and vulnerable survivor picks.'}
          </p>
        </div>
      </div>

      {/* Hunter Selector Pills (KRIDA filters style) */}
      <div style={{ marginBottom: '28px' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '10px' }}>
          {lang === 'th' ? 'เลือกฮันเตอร์ที่ต้องการวิเคราะห์:' : 'Select Target Hunter:'}
        </span>
        <div className="filters">
          {hunters.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHunterId(h.id)}
              className={selectedHunterId === h.id ? 'is-on-orange' : ''}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>🔴</span>
              <span>{h.name[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Hunter Overview Card */}
      {hunter && (
        <div className="card" style={{ marginBottom: '28px', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--r)',
                  background: '#1e293b',
                  overflow: 'hidden',
                  border: '2px solid #EF4444',
                }}
              >
                <img
                  src={getAssetUrl(hunter.image || `/images/heroes/${hunter.id}.png`)}
                  alt={hunter.name[lang]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('.svg')) {
                      target.src = getAssetUrl(`/images/heroes/${hunter.id}.svg`);
                    }
                  }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="chip chip-hunter">Hunter</span>
                  <span className={`chip chip-tier ${hunter.tier.toLowerCase()}`}>Tier {hunter.tier}</span>
                </div>
                <h2 style={{ font: '800 24px Outfit, Prompt, sans-serif', marginTop: '4px' }}>
                  {hunter.name[lang]}
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{hunter.title[lang]}</div>
              </div>
            </div>

            <Link href={`/hunters/${hunter.id}`} className="btn btn-sm btn-ghost">
              <span>{lang === 'th' ? 'เปิดคู่มือเต็มของฮันเตอร์ตัวนี้ →' : 'View Full Hunter Guide →'}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Two Column Grid: Survivors with Advantage VS Survivors in Danger */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Survivors that COUNTER this hunter */}
        <div className="panel" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '20px' }}>🟢</span>
            <div>
              <h3 style={{ font: '700 18px Outfit, Prompt, sans-serif', color: '#34D399' }}>
                {lang === 'th' ? 'ตัวละครที่ได้เปรียบ (Counters Hunter)' : 'Survivors with Advantage'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                {lang === 'th' ? 'หยิบตัวละครเหล่านี้มาแก้ทางได้ผลชะงัด' : 'Recommended picks to neutralize this hunter'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {survivorsAdvantage.length > 0 ? (
              survivorsAdvantage.map(({ survivor, info }, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--onyx)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r)',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#6EE7B7' }}>
                      {info.characterName[lang]}
                    </div>
                    {survivor && (
                      <Link href={`/survivors/${survivor.id}`} style={{ fontSize: '12px', color: 'var(--blue-lift)' }}>
                        {lang === 'th' ? 'ดูไกด์ →' : 'Guide →'}
                      </Link>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '6px' }}>
                    {info.reason[lang]}
                  </div>
                  {info.tip && (
                    <div style={{ fontSize: '12px', color: 'var(--orange)', background: 'rgba(249, 115, 22, 0.08)', padding: '6px 10px', borderRadius: '6px' }}>
                      💡 <strong>Tip:</strong> {info.tip[lang]}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty">
                {lang === 'th' ? 'ไม่มีตัวเคาน์เตอร์ที่เด่นชัด ต้องอาศัยการสื่อสารในทีม' : 'No distinct hard counters; rely on coordinated team rotations.'}
              </div>
            )}
          </div>
        </div>

        {/* Survivors that STRUGGLE against this hunter */}
        <div className="panel" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <h3 style={{ font: '700 18px Outfit, Prompt, sans-serif', color: '#F87171' }}>
                {lang === 'th' ? 'ตัวละครที่เสียเปรียบ (Struggles Against)' : 'Survivors at High Risk'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                {lang === 'th' ? 'ควรหลีกเลี่ยงหรือต้องเล่นอย่างระมัดระวังเป็นพิเศษ' : 'High vulnerability against this hunter kit'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {survivorsStruggling.length > 0 ? (
              survivorsStruggling.map((s, idx) => {
                const cInfo = s.counters.find((c) => c.characterId === hunter.id);
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--onyx)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r)',
                      padding: '14px 16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#FCA5A5' }}>
                        {s.name[lang]}
                      </div>
                      <Link href={`/survivors/${s.id}`} style={{ fontSize: '12px', color: 'var(--blue-lift)' }}>
                        {lang === 'th' ? 'ดูไกด์ →' : 'Guide →'}
                      </Link>
                    </div>
                    {cInfo && (
                      <>
                        <div style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '6px' }}>
                          {cInfo.reason[lang]}
                        </div>
                        {cInfo.tip && (
                          <div style={{ fontSize: '12px', color: 'var(--blue-lift)', background: 'rgba(37, 99, 235, 0.08)', padding: '6px 10px', borderRadius: '6px' }}>
                            🛡️ <strong>{lang === 'th' ? 'คำแนะนำเอาตัวรอด:' : 'Survival advice:'}</strong> {cInfo.tip[lang]}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="empty">
                {lang === 'th' ? 'ไม่มีตัวละครที่เสียเปรียบโดยตรงเป็นพิเศษ' : 'No explicit hard disadvantages logged.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
