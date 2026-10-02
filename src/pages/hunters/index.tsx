import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { CharacterCard } from '../../components/CharacterCard';
import { useLang } from '../../context/LangContext';
import { hunters } from '../../utils/characters';

export default function HuntersPage() {
  const { t, lang } = useLang();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const filteredHunters = useMemo(() => {
    return hunters.filter((h) => {
      const matchRole = roleFilter === 'all' || h.role === roleFilter;
      const matchTier = tierFilter === 'all' || h.tier === tierFilter;
      return matchRole && matchTier;
    });
  }, [roleFilter, tierFilter]);

  return (
    <Layout
      pageTitle={lang === 'th' ? 'ฮันเตอร์ (Hunters)' : 'Hunters'}
      pageDescription="คู่มือเจาะลึกฮันเตอร์ในเกม Identity V สกิล เทคนิคการไล่ล่า และสายพรสวรรค์"
    >
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="section-title">
            <span style={{ color: '#EF4444' }}>🔴</span>
            <span>{t('nav.hunters')}</span>
          </h1>
          <p className="section-subtitle">
            {lang === 'th'
              ? `รวบรวมข้อมูลฮันเตอร์ ${hunters.length} ตัวละคร พร้อมเทคนิคคุมเกมและสายล่า`
              : `Comprehensive guide for ${hunters.length} deadly hunters with map control tactics`}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          padding: '16px',
          background: 'rgba(23, 18, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        {/* Role Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600, marginRight: '4px' }}>
            {t('labels.filterRole')}:
          </span>
          {['all', 'control', 'chase', 'patrol'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: roleFilter === role ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
                background: roleFilter === role ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: roleFilter === role ? '#F87171' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {role === 'all' ? t('labels.all') : t(`roles.${role}`)}
            </button>
          ))}
        </div>

        {/* Tier Filters */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600, marginRight: '4px' }}>
            Tier:
          </span>
          {['all', 'S', 'A'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: tierFilter === tier ? 'var(--accent-purple-light)' : 'rgba(255, 255, 255, 0.1)',
                background: tierFilter === tier ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: tierFilter === tier ? '#EDE9FE' : 'var(--text-muted)',
              }}
            >
              {tier === 'all' ? t('labels.all') : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredHunters.length > 0 ? (
        <div className="character-grid">
          {filteredHunters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '48px',
            textAlign: 'center',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-dim)',
          }}
        >
          {lang === 'th' ? 'ไม่พบตัวละครที่ตรงกับตัวกรอง' : 'No characters found matching these filters'}
        </div>
      )}
    </Layout>
  );
}
