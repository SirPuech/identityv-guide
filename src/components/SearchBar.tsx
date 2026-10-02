import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLang } from '../context/LangContext';
import { searchCharacters } from '../utils/characters';
import { Character } from '../types';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Character[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t } = useLang();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const matches = searchCharacters(query, lang);
    setResults(matches);
    setIsOpen(true);
  }, [query, lang]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search when route changes
  useEffect(() => {
    setIsOpen(false);
    setQuery('');
  }, [router.asPath]);

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={t('nav.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              color: 'var(--text-dim)',
              fontSize: '14px',
              padding: '4px',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results-dropdown">
          {results.map((char) => (
            <Link
              key={char.id}
              href={`/${char.type}s/${char.id}`}
              className="search-result-item"
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: char.type === 'survivor' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${char.type === 'survivor' ? '#10B981' : '#EF4444'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  color: char.type === 'survivor' ? '#34D399' : '#F87171',
                }}
              >
                {char.name[lang].slice(0, 1)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {char.name[lang]}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                  {char.title[lang]} • {char.type === 'survivor' ? 'Survivor' : 'Hunter'}
                </div>
              </div>
              <span className={`tier-badge tier-${char.tier.toLowerCase()}`}>
                {char.tier}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div
          className="search-results-dropdown"
          style={{ padding: '16px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px' }}
        >
          {lang === 'th' ? `ไม่พบตัวละครที่ตรงกับ "${query}"` : `No characters found matching "${query}"`}
        </div>
      )}
    </div>
  );
};
