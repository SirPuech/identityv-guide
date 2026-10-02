import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLang } from '../context/LangContext';
import { searchCharacters } from '../utils/characters';
import { Character } from '../types';
import { getAssetUrl } from '../utils/asset';

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

  useEffect(() => {
    setIsOpen(false);
    setQuery('');
  }, [router.asPath]);

  return (
    <div className="search-bar-wrap" ref={dropdownRef}>
      <span className="search-icon-pos">🔍</span>
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
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--ink-3)',
            fontSize: '12px',
            padding: '4px',
          }}
        >
          ✕
        </button>
      )}

      {isOpen && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((char) => (
            <Link
              key={char.id}
              href={`/${char.type}s/${char.id}`}
              className="search-item"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: char.type === 'hunter'
                      ? 'radial-gradient(circle, rgba(239,68,68,0.25), #0f172a)'
                      : 'radial-gradient(circle, rgba(37,99,235,0.25), #0f172a)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    padding: '2px',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={getAssetUrl(char.image || `/images/heroes/${char.id}.png`)}
                    alt={char.name[lang]}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('.svg')) {
                        target.src = getAssetUrl(`/images/heroes/${char.id}.svg`);
                      }
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>
                    {char.name[lang]}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                    {char.title[lang]} • {char.type === 'survivor' ? 'Survivor' : 'Hunter'}
                  </div>
                </div>
              </div>

              <span className={`chip chip-tier ${char.tier.toLowerCase()}`}>
                {char.tier}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="search-dropdown" style={{ padding: '16px', textAlign: 'center', color: 'var(--ink-3)', fontSize: '13px' }}>
          {lang === 'th' ? `ไม่พบตัวละครที่ตรงกับ "${query}"` : `No characters found matching "${query}"`}
        </div>
      )}
    </div>
  );
};
