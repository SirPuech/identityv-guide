import React from 'react';
import Head from 'next/head';
import { Header } from './Header';
import { useLang } from '../context/LangContext';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  pageDescription,
}) => {
  const { t, lang } = useLang();

  const title = pageTitle
    ? `${pageTitle} · IDV Master Guide`
    : `IDV Master Guide · คู่มือเจาะลึก Identity V`;

  const desc = pageDescription || t('siteSubtitle');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
      </Head>

      <a className="skip-link" href="#main">
        {lang === 'th' ? 'ข้ามไปยังเนื้อหา' : 'Skip to content'}
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <div className="wrap">
          {children}
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>
            {lang === 'th'
              ? 'Identity V Master Guide · ออกแบบและสร้างขึ้นเพื่อฝึกฝนและพิชิตแรงก์สูงสุด'
              : 'Identity V Master Guide · Built for learning and competitive mastery'}
          </span>
          <span className="mono" id="footer-meta">
            v2.0 · Prompt / Outfit / KRIDA UI
          </span>
        </div>
      </footer>
    </>
  );
};
