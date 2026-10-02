import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLang } from '../context/LangContext';
import { survivors, hunters } from '../utils/characters';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const router = useRouter();
  const { lang, setLang, t } = useLang();
  const [navOpen, setNavOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && router.pathname === '/') return true;
    if (path !== '/' && router.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="wordmark" onClick={() => setNavOpen(false)}>
          IDV<span className="dot">.</span>
          <span className="wordmark-sub">{lang === 'th' ? 'คู่มือมาสเตอร์' : 'Master Guide'}</span>
        </Link>

        {/* Global Search Bar embedded in header */}
        <div style={{ flex: 1, maxWidth: '360px', margin: '0 16px', display: 'none' }} className="header-search-desktop">
          <SearchBar />
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`site-nav ${navOpen ? 'open' : ''}`}>
          <Link
            href="/"
            className={isActive('/') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {t('nav.home')}
          </Link>

          <Link
            href="/survivors"
            className={isActive('/survivors') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {t('nav.survivors')}
            <span className="nav-tag-count">{survivors.length}</span>
          </Link>

          <Link
            href="/hunters"
            className={isActive('/hunters') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {t('nav.hunters')}
            <span className="nav-tag-count">{hunters.length}</span>
          </Link>

          <Link
            href="/tier-list"
            className={isActive('/tier-list') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {t('nav.tierList')}
          </Link>

          <Link
            href="/matchup"
            className={isActive('/matchup') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {lang === 'th' ? 'แก้ทาง' : 'Matchups'}
          </Link>

          <Link
            href="/team-builder"
            className={isActive('/team-builder') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {lang === 'th' ? 'สร้างทีม' : 'Team Builder'}
          </Link>

          <Link
            href="/quiz"
            className={isActive('/quiz') ? 'is-active' : ''}
            onClick={() => setNavOpen(false)}
          >
            {lang === 'th' ? 'ควิซ & ฝึกฝน' : 'Practice Quiz'}
          </Link>

          {/* Language Switcher pill in KRIDA style */}
          <div className="lang-switch" role="group" aria-label="Language selection">
            <button
              type="button"
              className={lang === 'th' ? 'is-on' : ''}
              onClick={() => {
                setLang('th');
                setNavOpen(false);
              }}
            >
              TH
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'is-on' : ''}
              onClick={() => {
                setLang('en');
                setNavOpen(false);
              }}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
