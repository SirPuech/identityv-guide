import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLang } from '../context/LangContext';
import { survivors, hunters } from '../utils/characters';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { t, lang } = useLang();

  const isActive = (path: string) => {
    if (path === '/' && router.pathname === '/') return true;
    if (path !== '/' && router.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-icon">V</div>
        <div className="brand-text">
          <h1>Identity V</h1>
          <p>{lang === 'th' ? 'คู่มือ & มาสเตอร์ฮับ' : 'Master Guide Hub'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">{lang === 'th' ? 'เมนูหลัก' : 'Navigation'}</div>
        <Link
          href="/"
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={onClose}
        >
          <span style={{ fontSize: '18px' }}>🏰</span>
          <span>{t('nav.home')}</span>
        </Link>

        <Link
          href="/survivors"
          className={`nav-link ${isActive('/survivors') ? 'active' : ''}`}
          onClick={onClose}
        >
          <span style={{ fontSize: '18px' }}>🟢</span>
          <span>{t('nav.survivors')}</span>
          <span className="nav-badge survivor">{survivors.length}</span>
        </Link>

        <Link
          href="/hunters"
          className={`nav-link ${isActive('/hunters') ? 'active' : ''}`}
          onClick={onClose}
        >
          <span style={{ fontSize: '18px' }}>🔴</span>
          <span>{t('nav.hunters')}</span>
          <span className="nav-badge hunter">{hunters.length}</span>
        </Link>

        <Link
          href="/tier-list"
          className={`nav-link ${isActive('/tier-list') ? 'active' : ''}`}
          onClick={onClose}
        >
          <span style={{ fontSize: '18px' }}>📊</span>
          <span>{t('nav.tierList')}</span>
        </Link>

        <div className="nav-section-title" style={{ marginTop: '12px' }}>
          {lang === 'th' ? 'ตัวละครเด่น' : 'Quick Access'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {survivors.slice(0, 4).map((s) => (
            <Link
              key={s.id}
              href={`/survivors/${s.id}`}
              className={`nav-link ${router.asPath === `/survivors/${s.id}/` || router.asPath === `/survivors/${s.id}` ? 'active' : ''}`}
              onClick={onClose}
              style={{ fontSize: '13px', padding: '6px 12px' }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              <span>{s.name[lang]}</span>
            </Link>
          ))}
          {hunters.slice(0, 3).map((h) => (
            <Link
              key={h.id}
              href={`/hunters/${h.id}`}
              className={`nav-link ${router.asPath === `/hunters/${h.id}/` || router.asPath === `/hunters/${h.id}` ? 'active' : ''}`}
              onClick={onClose}
              style={{ fontSize: '13px', padding: '6px 12px' }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
              <span>{h.name[lang]}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
          {lang === 'th' ? 'สร้างด้วยใจเพื่อการฝึกฝน' : 'Crafted for victory'} 🎮
        </div>
      </div>
    </aside>
  );
};
