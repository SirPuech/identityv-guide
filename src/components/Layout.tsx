import React, { useState } from 'react';
import Head from 'next/head';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, lang } = useLang();

  const title = pageTitle
    ? `${pageTitle} | Identity V Guide`
    : t('siteTitle');

  const desc = pageDescription || t('siteSubtitle');

  return (
    <div className="app-container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}

      <div className="main-wrapper">
        <TopHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="content-area">{children}</main>
        
        <footer style={{
          padding: '24px 32px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-dim)',
          background: 'rgba(9, 7, 16, 0.4)'
        }}>
          Identity V Player Guide Hub • Made for practice and mastery • {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};
