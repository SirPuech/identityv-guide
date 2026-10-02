import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { CharacterCard } from '../../components/CharacterCard';
import { useLang } from '../../context/LangContext';
import { hunters } from '../../utils/characters';
import { SearchBar } from '../../components/SearchBar';

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
      <div className="page-head">
        <div>
          <span className="eyebrow" style={{ color: '#EF4444' }}>Hunter Roster</span>
          <h1>{t('nav.hunters')}</h1>
          <p className="muted" style={{ marginTop: '6px' }}>
            {lang === 'th'
              ? `รวบรวมข้อมูลฮันเตอร์ ${hunters.length} ตัวละคร พร้อมเทคนิคคุมเกม คลิปการเล่น และสายล่า`
              : `Comprehensive database of ${hunters.length} hunters with map control tactics, chase tricks, and video guides.`}
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
            {['all', 'control', 'chase', 'camp', 'patrol'].map((role) => (
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
            {['all', 'S', 'A'].map((tier) => (
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
      {filteredHunters.length > 0 ? (
        <div className="character-grid">
          {filteredHunters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {lang === 'th' ? 'ไม่พบฮันเตอร์ที่ตรงกับตัวกรอง' : 'No hunters found matching the active filters.'}
        </div>
      )}
    </Layout>
  );
}
