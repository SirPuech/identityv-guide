import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { CharacterCard } from '../../components/CharacterCard';
import { useLang } from '../../context/LangContext';
import { survivors } from '../../utils/characters';
import { SearchBar } from '../../components/SearchBar';

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
      <div className="page-head">
        <div>
          <span className="eyebrow">Character Directory</span>
          <h1>{t('nav.survivors')}</h1>
          <p className="muted" style={{ marginTop: '6px' }}>
            {lang === 'th'
              ? `รวบรวมข้อมูลผู้รอดชีวิต ${survivors.length} ตัวละคร พร้อมทริคจู๊ค วิดีโอแนะนำ และสายพรสวรรค์`
              : `Comprehensive database of ${survivors.length} survivors with abilities, persona builds, and video guides.`}
          </p>
        </div>

        <div style={{ minWidth: '280px' }}>
          <SearchBar />
        </div>
      </div>

      {/* Filter Bar (KRIDA style) */}
      <div
        className="card"
        style={{
          marginBottom: '28px',
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span className="section-label" style={{ marginRight: '6px' }}>
            {t('labels.filterRole')}:
          </span>
          <div className="filters">
            {['all', 'decoder', 'rescuer', 'kiter', 'support'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={roleFilter === role ? 'is-on' : ''}
              >
                {role === 'all' ? t('labels.all') : t(`roles.${role}`)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="section-label" style={{ marginRight: '6px' }}>
            Tier:
          </span>
          <div className="filters">
            {['all', 'S', 'A', 'B'].map((tier) => (
              <button
                key={tier}
                onClick={() => setTierFilter(tier)}
                className={tierFilter === tier ? 'is-on-orange' : ''}
              >
                {tier === 'all' ? t('labels.all') : `Tier ${tier}`}
              </button>
            ))}
          </div>
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
        <div className="empty">
          {lang === 'th' ? 'ไม่พบตัวละครที่ตรงกับตัวกรอง' : 'No characters found matching the active filters.'}
        </div>
      )}
    </Layout>
  );
}
