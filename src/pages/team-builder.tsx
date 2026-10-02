import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { useLang } from '../context/LangContext';
import { survivors } from '../utils/characters';
import { Character } from '../types';

export default function TeamBuilderPage() {
  const { lang, t } = useLang();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'mercenary',
    'seer',
    'mechanic',
    'perfumer',
  ]);

  const toggleSurvivor = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedTeam: Character[] = selectedIds
    .map((id) => survivors.find((s) => s.id === id))
    .filter(Boolean) as Character[];

  // Calculate team balance metrics
  const avgDecoding = selectedTeam.length
    ? Math.round((selectedTeam.reduce((acc, s) => acc + (s.stats.decoding || 3), 0) / selectedTeam.length) * 20)
    : 0;

  const avgRescuing = selectedTeam.length
    ? Math.round((selectedTeam.reduce((acc, s) => acc + (s.stats.rescuing || 3), 0) / selectedTeam.length) * 20)
    : 0;

  const avgKiting = selectedTeam.length
    ? Math.round((selectedTeam.reduce((acc, s) => acc + (s.stats.kiting || 3), 0) / selectedTeam.length) * 20)
    : 0;

  const avgSupport = selectedTeam.length
    ? Math.round((selectedTeam.reduce((acc, s) => acc + (s.stats.support || 3), 0) / selectedTeam.length) * 20)
    : 0;

  // Synergies detected
  const synergiesFound: Array<{ char1: string; char2: string; text: string }> = [];
  selectedTeam.forEach((c1) => {
    c1.partners?.forEach((p) => {
      if (selectedIds.includes(p.characterId)) {
        synergiesFound.push({
          char1: c1.name[lang],
          char2: p.characterName[lang],
          text: p.synergy[lang],
        });
      }
    });
  });

  return (
    <Layout
      pageTitle={lang === 'th' ? 'สร้างทีม & วิเคราะห์คอมโบ' : 'Team Builder & Synergy Analyzer'}
      pageDescription="จัดทีมผู้รอดชีวิต 4 คนพร้อมคำนวณสมดุลการปั่นเครื่อง การช่วยเก้าอี้ และคอมโบเสริมพลัง"
    >
      <div className="page-head">
        <div>
          <span className="eyebrow">Strategic Team Composition</span>
          <h1>{lang === 'th' ? 'จำลองจัดทีม & วิเคราะห์คอมโบ (Team Builder)' : 'Survivor Team Builder'}</h1>
          <p className="muted" style={{ marginTop: '6px' }}>
            {lang === 'th'
              ? 'เลือกผู้รอดชีวิต 4 ตัวละครเพื่อคำนวณสมดุลของทีม ตรวจสอบบทบาท และเช็คคอมโบที่เกิดระหว่างเพื่อนร่วมทีม'
              : 'Select 4 survivors to calculate team balance, role distribution, and active synergies.'}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className="section-label">{lang === 'th' ? 'สมาชิกในทีม' : 'Selected Roster'}</span>
          <div style={{ font: '800 24px var(--mono)', color: selectedIds.length === 4 ? '#34D399' : 'var(--orange)' }}>
            {selectedIds.length} / 4
          </div>
        </div>
      </div>

      {/* Selected Team 4 Slots */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {[0, 1, 2, 3].map((slotIdx) => {
          const char = selectedTeam[slotIdx];
          return (
            <div
              key={slotIdx}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                borderColor: char ? 'rgba(37, 99, 235, 0.4)' : 'var(--line)',
                background: char ? 'rgba(15, 23, 42, 0.9)' : 'rgba(11, 18, 32, 0.4)',
              }}
            >
              {char ? (
                <>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: '#1e293b',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid var(--blue-lift)',
                    }}
                  >
                    <img src={char.image || `/images/heroes/${char.id}.svg`} alt={char.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '14.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {char.name[lang]}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                      {char.role ? t(`roles.${char.role}`) : 'Survivor'}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSurvivor(char.id)}
                    style={{
                      color: 'var(--ink-3)',
                      fontSize: '16px',
                      padding: '4px',
                    }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <div style={{ width: '100%', textAlign: 'center', color: 'var(--ink-3)', fontSize: '13px', paddingBlock: '8px' }}>
                  + {lang === 'th' ? `เลือกตำแหน่งที่ ${slotIdx + 1}` : `Slot ${slotIdx + 1}`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Team Balance Metrics & Synergies Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        {/* Balance Metrics */}
        <div className="panel">
          <h3 style={{ font: '700 18px Outfit, Prompt, sans-serif', marginBottom: '16px' }}>
            📊 {lang === 'th' ? 'การประเมินสมดุลของทีม' : 'Team Balance Metrics'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span>⚡ {lang === 'th' ? 'ความเร็วการถอดรหัส (Cipher Rush)' : 'Cipher Rush'}</span>
                <span className="mono" style={{ fontWeight: 700, color: 'var(--orange)' }}>{avgDecoding}%</span>
              </div>
              <div className="bar"><i style={{ width: `${avgDecoding}%`, background: 'var(--orange)' }} /></div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span>🛡️ {lang === 'th' ? 'ความปลอดภัยในการช่วยเก้าอี้ (Rescuing)' : 'Rescue Safety'}</span>
                <span className="mono" style={{ fontWeight: 700, color: '#34D399' }}>{avgRescuing}%</span>
              </div>
              <div className="bar is-blue"><i style={{ width: `${avgRescuing}%`, background: '#10B981' }} /></div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span>🏃 {lang === 'th' ? 'ประสิทธิภาพการจู๊กดึงเวลา (Kiting)' : 'Kiting Stamina'}</span>
                <span className="mono" style={{ fontWeight: 700, color: 'var(--blue-lift)' }}>{avgKiting}%</span>
              </div>
              <div className="bar is-blue"><i style={{ width: `${avgKiting}%` }} /></div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span>✨ {lang === 'th' ? 'การซัพพอร์ตและฟื้นฟู (Support/Sustain)' : 'Support & Sustain'}</span>
                <span className="mono" style={{ fontWeight: 700, color: '#A78BFA' }}>{avgSupport}%</span>
              </div>
              <div className="bar"><i style={{ width: `${avgSupport}%`, background: '#8B5CF6' }} /></div>
            </div>
          </div>
        </div>

        {/* Synergies Detected */}
        <div className="panel">
          <h3 style={{ font: '700 18px Outfit, Prompt, sans-serif', marginBottom: '16px' }}>
            🤝 {lang === 'th' ? 'คอมโบที่เกิดในทีมชุดนี้' : 'Active Synergies'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {synergiesFound.length > 0 ? (
              synergiesFound.map((syn, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--onyx)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r)',
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#6EE7B7', marginBottom: '4px' }}>
                    {syn.char1} + {syn.char2}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--ink-2)', lineHeight: 1.4 }}>
                    {syn.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty" style={{ padding: '24px' }}>
                {lang === 'th'
                  ? 'ยังไม่พบคู่คอมโบหลัก ลองจัด Seer, Mercenary หรือ Mechanic ร่วมกับตัวจู๊ค'
                  : 'No direct major synergies detected. Try pairing Seer, Mercenary, or Mechanic.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Survivor Picker Grid */}
      <div>
        <h3 style={{ font: '700 20px Outfit, Prompt, sans-serif', marginBottom: '16px' }}>
          {lang === 'th' ? 'คลิกเลือกผู้รอดชีวิตเข้าทีม (สูงสุด 4 คน):' : 'Click to Toggle Survivors in Team (Max 4):'}
        </h3>

        <div className="character-grid">
          {survivors.map((s) => {
            const isSelected = selectedIds.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => toggleSurvivor(s.id)}
                className="hero-card"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--orange)' : 'var(--line)',
                  background: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'var(--onyx)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: '#1e293b',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img src={s.image || `/images/heroes/${s.id}.svg`} alt={s.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{s.name[lang]}</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                      {s.role ? t(`roles.${s.role}`) : 'Survivor'} • Tier {s.tier}
                    </div>
                  </div>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `1px solid ${isSelected ? 'var(--orange)' : 'var(--line-2)'}`,
                      background: isSelected ? 'var(--orange)' : 'none',
                      color: isSelected ? 'var(--onyx)' : 'transparent',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 900,
                      fontSize: '12px',
                    }}
                  >
                    ✓
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
