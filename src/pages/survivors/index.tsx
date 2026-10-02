import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { CharacterCard } from '../../components/CharacterCard';
import { useLang } from '../../context/LangContext';
import { survivors } from '../../utils/characters';

export default function SurvivorsPage() {
  const { t, lang } = useLang();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const filteredSurvivors = useMemo(() => {
    return survivors.filter((s) => {
      const matchRole = roleFilter === 'all' || s.role === roleFilter;
      const matchTier = tierFilter === 'all' || s.tier === tierFilter;
      return matchRole && matchTier;
    });
  }, [roleFilter, tierFilter]);

  return (
    <Layout
      pageTitle={lang === 'th' ? 'ผู้รอดชีวิต (Survivors)' : 'Survivors'}
      pageDescription="คู่มือเจาะลึกผู้รอดชีวิตในเกม Identity V สกิล เทคนิค และสายพรสวรรค์"
    >
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="section-title">
            <span style={{ color: '#10B981' }}>🟢</span>
            <span>{t('nav.survivors')}</span>
          </h1>
          <p className="section-subtitle">
            {lang === 'th'
              ? `รวบรวมข้อมูลผู้รอดชีวิต ${survivors.length} ตัวละคร พร้อมทริคจู๊คและสายอัพเกรด`
              : `Comprehensive guide for ${survivors.length} survivors with kiting tips and persona trees`}
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
          {['all', 'decoder', 'rescuer', 'kiter', 'support'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: roleFilter === role ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                background: roleFilter === role ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: roleFilter === role ? '#34D399' : 'var(--text-muted)',
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
          {['all', 'S', 'A', 'B'].map((tier) => (
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
      {filteredSurvivors.length > 0 ? (
        <div className="character-grid">
          {filteredSurvivors.map((char) => (
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
