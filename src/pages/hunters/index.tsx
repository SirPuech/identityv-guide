import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { CharacterCard } from '../../components/CharacterCard';
import { useLang } from '../../context/LangContext';
import { hunters } from '../../utils/characters';
import { SearchBar } from '../../components/SearchBar';

export default function HuntersPage() {
  const { t, lang } = useLang();
  const [metaFilter, setMetaFilter] = useState<'all' | 'in-meta' | 'out-meta'>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const metaCounts = useMemo(() => {
    const inMeta = hunters.filter((h) => h.tier === 'S' || h.tier === 'A').length;
    const outMeta = hunters.filter((h) => h.tier === 'B' || h.tier === 'C').length;
    return { inMeta, outMeta, total: hunters.length };
  }, []);

  const filteredHunters = useMemo(() => {
    return hunters.filter((h) => {
      const matchMeta =
        metaFilter === 'all' ||
        (metaFilter === 'in-meta' && (h.tier === 'S' || h.tier === 'A')) ||
        (metaFilter === 'out-meta' && (h.tier === 'B' || h.tier === 'C'));
      const matchRole = roleFilter === 'all' || h.role === roleFilter;
      const matchTier = tierFilter === 'all' || h.tier === tierFilter;
      return matchMeta && matchRole && matchTier;
    });
  }, [metaFilter, roleFilter, tierFilter]);

  return (
    <Layout
      pageTitle={lang === 'th' ? 'ฮันเตอร์ (Hunters)' : 'Hunters'}
      pageDescription="คู่มือเจาะลึกฮันเตอร์ในเกม Identity V สกิล เทคนิคการไล่ล่า และสายพรสวรรค์"
    >
      <div className="page-head">
        <div>
          <span className="eyebrow" style={{ color: '#EF4444' }}>Official Fandom Wiki Roster</span>
          <h1>{t('nav.hunters')} ({hunters.length})</h1>
          <p className="muted" style={{ marginTop: '6px' }}>
            {lang === 'th'
              ? `รวบรวมข้อมูลฮันเตอร์ครบทั้ง ${hunters.length} ตัวละครจาก Official Wiki พร้อมสถานะ Meta, เทคนิคคุมเกม และวิดีโอแนะนำ`
              : `Complete roster of ${hunters.length} hunters from Official Wiki with competitive meta status, chase tactics, and video guides.`}
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
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Meta vs Out of Meta Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span className="section-label" style={{ marginRight: '6px' }}>
            {lang === 'th' ? 'สถานะ Meta:' : 'Meta Status:'}
          </span>
          <div className="filters">
            <button
              onClick={() => setMetaFilter('all')}
              className={metaFilter === 'all' ? 'is-on' : ''}
            >
              {lang === 'th' ? `ทั้งหมด (${metaCounts.total})` : `All (${metaCounts.total})`}
            </button>
            <button
              onClick={() => setMetaFilter('in-meta')}
              className={metaFilter === 'in-meta' ? 'is-on-orange' : ''}
            >
              🔥 {lang === 'th' ? `ใน Meta แข่งขัน (${metaCounts.inMeta})` : `In Meta Tier S/A (${metaCounts.inMeta})`}
            </button>
            <button
              onClick={() => setMetaFilter('out-meta')}
              className={metaFilter === 'out-meta' ? 'is-on' : ''}
            >
              📦 {lang === 'th' ? `นอก Meta / คลาสสิก (${metaCounts.outMeta})` : `Out of Meta / Tier B/C (${metaCounts.outMeta})`}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
          {/* Role Filter */}
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

          {/* Tier Filter */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="section-label" style={{ marginRight: '6px' }}>
              Tier:
            </span>
            <div className="filters">
              {['all', 'S', 'A', 'B', 'C'].map((tier) => (
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
