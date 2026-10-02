import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { CharacterCard } from '../components/CharacterCard';
import { useLang } from '../context/LangContext';
import { survivors, hunters } from '../utils/characters';
import { SearchBar } from '../components/SearchBar';
import { getAssetUrl } from '../utils/asset';

export default function Home() {
  const { t, lang } = useLang();

  const featuredSurvivors = survivors.filter((s) => s.tier === 'S').slice(0, 3);
  const featuredHunters = hunters.filter((h) => h.tier === 'S').slice(0, 3);

  return (
    <Layout
      pageTitle={lang === 'th' ? 'หน้าแรก' : 'Home'}
      pageDescription={t('home.heroDesc')}
    >
      {/* KRIDA Hero Section */}
      <section className="hero">
        <div>
          <div className="hero-badge">
            <span>●</span>
            <span>{lang === 'th' ? 'คู่มือผู้เล่น IDENTITY V ระดับมาสเตอร์' : 'IDENTITY V COMPETITIVE COMPANION'}</span>
          </div>

          <h1>
            {lang === 'th' ? (
              <>
                เรียนรู้ ทริคจู๊ค และก้าวสู่ <em>ระดับท็อปแรงก์</em>
              </>
            ) : (
              <>
                Master Every Hero, Counter & <em>Climb to Top Tier</em>
              </>
            )}
          </h1>

          <p className="lede">
            {lang === 'th'
              ? 'เจาะลึกทุกตัวละครทั้ง Survivor และ Hunter — สกิล, สาย Persona 36/39, ทริคระดับโปร, ตารางแก้ทาง และวิดีโอแนะนำ'
              : 'Deep dive into Survivors and Hunters — abilities, 36/39 persona builds, pro tricks, matchup counters, and video guides.'}
          </p>

          <div style={{ marginTop: '20px', maxWidth: '440px' }}>
            <SearchBar />
          </div>

          <div className="hero-cta">
            <Link href="/survivors" className="btn btn-accent">
              <span>🟢</span>
              <span>{t('home.exploreSurvivors')} ({survivors.length})</span>
            </Link>

            <Link href="/hunters" className="btn btn-primary">
              <span>🔴</span>
              <span>{t('home.exploreHunters')} ({hunters.length})</span>
            </Link>

            <Link href="/quiz" className="btn btn-ghost">
              <span>🎯</span>
              <span>{lang === 'th' ? 'ทำควิซทดสอบ' : 'Practice Quiz'}</span>
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <b style={{ color: 'var(--orange)' }}>{survivors.length}</b>
              <span>{lang === 'th' ? 'ผู้รอดชีวิต' : 'Survivors'}</span>
            </div>
            <div>
              <b style={{ color: 'var(--blue-lift)' }}>{hunters.length}</b>
              <span>{lang === 'th' ? 'ฮันเตอร์' : 'Hunters'}</span>
            </div>
            <div>
              <b style={{ color: '#F8FAFC' }}>100%</b>
              <span>{lang === 'th' ? 'มีคลิป & ไกด์' : 'Full Guides'}</span>
            </div>
          </div>
        </div>

        {/* Unlock-style Side Card in KRIDA */}
        <div className="unlock-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="eyebrow">{lang === 'th' ? 'ตัวละครเมต้าท็อปปิค' : 'Meta Priority Picks'}</span>
            <span className="mono" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>TIER S / A</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[...survivors.slice(0, 3), ...hunters.slice(0, 2)].map((char, idx) => (
              <Link
                key={char.id}
                href={`/${char.type}s/${char.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--raise)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: char.type === 'hunter'
                      ? 'radial-gradient(circle, rgba(239,68,68,0.25), #0f172a)'
                      : 'radial-gradient(circle, rgba(37,99,235,0.25), #0f172a)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    padding: '2px',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={getAssetUrl(char.image || `/images/heroes/${char.id}.png`)}
                    alt={char.name[lang]}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('.svg')) {
                        target.src = getAssetUrl(`/images/heroes/${char.id}.svg`);
                      }
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {char.name[lang]}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                    {char.type === 'survivor' ? 'Survivor' : 'Hunter'} • Tier {char.tier}
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--orange)' }}>→</span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/team-builder" style={{ fontSize: '12px', color: 'var(--blue-lift)', fontWeight: 600 }}>
              {lang === 'th' ? '🛠️ เปิดโหมดจัดทีม 4 คน →' : '🛠️ Open Team Builder →'}
            </Link>
            <Link href="/matchup" style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600 }}>
              {lang === 'th' ? '⚡ ดูตารางแก้ทาง →' : '⚡ View Matchup Chart →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Tool Banner Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '44px' }}>
        <Link href="/matchup" className="panel" style={{ display: 'block', transition: 'transform 0.2s', borderColor: 'rgba(37, 99, 235, 0.3)' }}>
          <div style={{ fontSize: '26px', marginBottom: '8px' }}>⚔️</div>
          <h3 style={{ fontSize: '17px', color: 'var(--ink)', marginBottom: '4px' }}>
            {lang === 'th' ? 'ตารางวิเคราะห์การแก้ทาง' : 'Hunter vs Survivor Matchup'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
            {lang === 'th' ? 'เลือกฮันเตอร์เพื่อดูว่าเซอร์ไวเวอร์คนไหนได้เปรียบ และคนไหนเสียเปรียบ' : 'Direct counters and matchup matrix for every hunter.'}
          </p>
        </Link>

        <Link href="/team-builder" className="panel" style={{ display: 'block', transition: 'transform 0.2s', borderColor: 'rgba(249, 115, 22, 0.3)' }}>
          <div style={{ fontSize: '26px', marginBottom: '8px' }}>🛡️</div>
          <h3 style={{ fontSize: '17px', color: 'var(--ink)', marginBottom: '4px' }}>
            {lang === 'th' ? 'จำลองจัดทีม & คอมโบ' : 'Team Builder & Synergies'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
            {lang === 'th' ? 'จัดทีม 4 คนเพื่อคำนวณสมดุลการปั่นเครื่องและคอมโบสกิล' : 'Draft 4 survivors to measure cipher rush and rescue safety.'}
          </p>
        </Link>

        <Link href="/quiz" className="panel" style={{ display: 'block', transition: 'transform 0.2s', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '26px', marginBottom: '8px' }}>🎯</div>
          <h3 style={{ fontSize: '17px', color: 'var(--ink)', marginBottom: '4px' }}>
            {lang === 'th' ? 'ควิซฝึกฝน & วัดระดับ' : 'Interactive Practice Quiz'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
            {lang === 'th' ? 'ทดสอบความรู้เรื่องสกิลและการแก้ทาง พร้อมเฉลยละเอียด' : 'Practice questions with instant score and gameplay tips.'}
          </p>
        </Link>
      </div>

      {/* Featured Survivors */}
      <section style={{ marginBottom: '48px' }}>
        <div className="page-head" style={{ marginBottom: '20px' }}>
          <div>
            <span className="eyebrow">{lang === 'th' ? 'เมต้าท็อปเทียร์' : 'S-Tier Picks'}</span>
            <h2>{lang === 'th' ? 'ผู้รอดชีวิตระดับท็อปเมต้า' : 'Featured Meta Survivors'}</h2>
          </div>
          <Link href="/survivors" className="btn btn-sm btn-ghost">
            {lang === 'th' ? `ดูทั้งหมด (${survivors.length}) →` : `View all (${survivors.length}) →`}
          </Link>
        </div>

        <div className="character-grid">
          {featuredSurvivors.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>

      {/* Featured Hunters */}
      <section style={{ marginBottom: '48px' }}>
        <div className="page-head" style={{ marginBottom: '20px' }}>
          <div>
            <span className="eyebrow">{lang === 'th' ? 'ฮันเตอร์สุดอันตราย' : 'Deadliest Killers'}</span>
            <h2>{lang === 'th' ? 'ฮันเตอร์ระดับท็อปเมต้า' : 'Featured Meta Hunters'}</h2>
          </div>
          <Link href="/hunters" className="btn btn-sm btn-ghost">
            {lang === 'th' ? `ดูทั้งหมด (${hunters.length}) →` : `View all (${hunters.length}) →`}
          </Link>
        </div>

        <div className="character-grid">
          {featuredHunters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
