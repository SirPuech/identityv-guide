import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { CharacterCard } from '../components/CharacterCard';
import { useLang } from '../context/LangContext';
import { survivors, hunters } from '../utils/characters';

export default function Home() {
  const { t, lang } = useLang();

  // Top meta picks
  const featuredSurvivors = survivors.filter((s) => s.tier === 'S').slice(0, 3);
  const featuredHunters = hunters.filter((h) => h.tier === 'S' || h.id === 'geisha').slice(0, 3);

  return (
    <Layout
      pageTitle={lang === 'th' ? 'หน้าแรก' : 'Home'}
      pageDescription={t('home.heroDesc')}
    >
      {/* Gothic Hero Banner */}
      <section className="hero-banner">
        <div className="hero-glow" />
        <div className="hero-glow-alt" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span>
            <span>{t('home.badge')}</span>
          </div>

          <h1 className="hero-title">{t('home.heroTitle')}</h1>
          <p className="hero-desc">{t('home.heroDesc')}</p>

          <div className="hero-actions">
            <Link href="/survivors" className="btn-primary">
              <span>🟢</span>
              <span>{t('home.exploreSurvivors')}</span>
            </Link>

            <Link href="/hunters" className="btn-primary btn-hunter">
              <span>🔴</span>
              <span>{t('home.exploreHunters')}</span>
            </Link>

            <Link href="/tier-list" className="btn-secondary">
              <span>📊</span>
              <span>{t('home.viewTierList')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            background: 'rgba(23, 18, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            🟢
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-gothic)', color: '#34D399' }}>
              {survivors.length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {lang === 'th' ? 'ผู้รอดชีวิตในคู่มือ' : 'Survivors Guided'}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(23, 18, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            🔴
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-gothic)', color: '#F87171' }}>
              {hunters.length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {lang === 'th' ? 'ฮันเตอร์ในคู่มือ' : 'Hunters Guided'}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(23, 18, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-gothic)', color: '#FBBF24' }}>
              {survivors.length + hunters.length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {lang === 'th' ? 'ตัวละครพร้อมทริคและ Perk' : 'Characters with Full Data'}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(23, 18, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid #8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            🏆
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-gothic)', color: '#C084FC' }}>
              S & A
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {lang === 'th' ? 'เน้นเมต้าทัวร์นาเมนต์' : 'Meta & Tournament Picks'}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Survivors */}
      <section style={{ marginBottom: '40px' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span style={{ color: '#10B981' }}>🟢</span>
              <span>{lang === 'th' ? 'ผู้รอดชีวิตระดับท็อปเมต้า' : 'Top Meta Survivors'}</span>
            </h2>
            <p className="section-subtitle">
              {lang === 'th' ? 'ตัวละครที่ถูกเลือกมากที่สุดในการแข่งและแรงก์สูง' : 'Most picked in high-tier rank and tournaments'}
            </p>
          </div>
          <Link href="/survivors" style={{ fontSize: '13px', color: 'var(--accent-purple-light)', fontWeight: 600 }}>
            {lang === 'th' ? 'ดูทั้งหมด 10 ตัว →' : 'View all 10 →'}
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
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span style={{ color: '#EF4444' }}>🔴</span>
              <span>{lang === 'th' ? 'ฮันเตอร์สุดแกร่งที่พบบ่อย' : 'Deadliest Meta Hunters'}</span>
            </h2>
            <p className="section-subtitle">
              {lang === 'th' ? 'คุมเกมเร็ว ไล่ล่าดุเดือด และพลังเฝ้าเก้าอี้สูง' : 'Fast-paced map control and punishing chase potential'}
            </p>
          </div>
          <Link href="/hunters" style={{ fontSize: '13px', color: 'var(--accent-purple-light)', fontWeight: 600 }}>
            {lang === 'th' ? 'ดูฮันเตอร์ทั้งหมด 5 ตัว →' : 'View all 5 →'}
          </Link>
        </div>

        <div className="character-grid">
          {featuredHunters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section style={{ marginBottom: '32px' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span>📖</span>
              <span>{t('home.featuresHeader')}</span>
            </h2>
          </div>
        </div>

        <div className="feature-box-grid">
          <div className="feature-box">
            <div className="feature-box-icon">⚡</div>
            <h3>{t('home.feat1Title')}</h3>
            <p>{t('home.feat1Desc')}</p>
          </div>

          <div className="feature-box">
            <div className="feature-box-icon">🕸</div>
            <h3>{t('home.feat2Title')}</h3>
            <p>{t('home.feat2Desc')}</p>
          </div>

          <div className="feature-box">
            <div className="feature-box-icon">🛡️</div>
            <h3>{t('home.feat3Title')}</h3>
            <p>{t('home.feat3Desc')}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
