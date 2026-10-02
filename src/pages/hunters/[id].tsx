import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Layout } from '../../components/Layout';
import { AbilityPanel } from '../../components/AbilityPanel';
import { PerkPanel } from '../../components/PerkPanel';
import { TricksPanel } from '../../components/TricksPanel';
import { RelationsPanel } from '../../components/RelationsPanel';
import { useLang } from '../../context/LangContext';
import { getCharacterById, getHunters } from '../../utils/characters';
import { Character } from '../../types';
import { getAssetUrl } from '../../utils/asset';

interface HunterDetailProps {
  character: Character;
}

export default function HunterDetailPage({ character }: HunterDetailProps) {
  const { lang, t } = useLang();

  if (!character) return null;

  return (
    <Layout
      pageTitle={character.name[lang]}
      pageDescription={character.overview[lang]}
    >
      <div style={{ marginBottom: '20px' }}>
        <Link href="/hunters" className="btn btn-sm btn-ghost">
          <span>←</span>
          <span>{t('labels.backToList')}</span>
        </Link>
      </div>

      {/* KRIDA Hero Detail Banner */}
      <div className="hero-detail-banner" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <div className="hero-detail-portrait" style={{ borderColor: '#EF4444', background: 'radial-gradient(circle at 50% 35%, rgba(239, 68, 68, 0.22) 0%, rgba(15, 23, 42, 0.95) 75%)' }}>
          <img
            src={getAssetUrl(character.image || `/images/heroes/${character.id}.png`)}
            alt={character.name[lang]}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('.svg')) {
                target.src = getAssetUrl(`/images/heroes/${character.id}.svg`);
              }
            }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
            <span className="chip chip-hunter">Hunter</span>
            <span className={`chip chip-tier ${character.tier.toLowerCase()}`}>Tier {character.tier}</span>
            {character.role && <span className="chip chip-role">{t(`roles.${character.role}`)}</span>}

            <div style={{ marginLeft: 'auto', color: '#FBBF24', fontSize: '13px' }}>
              {'★'.repeat(character.difficulty)}
              <span style={{ color: 'rgba(255,255,255,0.18)' }}>
                {'★'.repeat(5 - character.difficulty)}
              </span>
            </div>
          </div>

          <h1 style={{ font: '800 clamp(26px, 3.5vw, 40px) Outfit, Prompt, sans-serif', marginBottom: '4px' }}>
            {character.name[lang]}
          </h1>
          <div className="mono" style={{ fontSize: '14px', color: '#F87171', marginBottom: '16px' }}>
            {character.title[lang]}
          </div>

          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>
            {character.overview[lang]}
          </p>

          {character.quote && (
            <div className="notice" style={{ fontStyle: 'italic', borderColor: 'rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.07)' }}>
              "{character.quote[lang]}"
            </div>
          )}
        </div>
      </div>

      {/* Video Guide Embed */}
      {character.youtubeVideoId && (
        <section style={{ marginBottom: '32px' }}>
          <div className="page-head" style={{ marginBottom: '14px' }}>
            <div>
              <span className="eyebrow" style={{ color: '#EF4444' }}>{lang === 'th' ? 'วิดีโอเทคนิคฮันเตอร์' : 'Hunter Video Guide'}</span>
              <h2 style={{ font: '700 22px Outfit, Prompt, sans-serif' }}>
                {lang === 'th' ? 'คลิปแนะนำเทคนิคและการไล่ล่าจริง' : 'Mastery Video Guide'}
              </h2>
            </div>
          </div>

          <div className="video-embed-box" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${character.youtubeVideoId}?rel=0`}
              title={`${character.name[lang]} Hunter Guide Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={`https://www.youtube.com/watch?v=${character.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost"
              style={{ gap: '6px', fontSize: '13px' }}
            >
              <span>↗</span>
              <span>{lang === 'th' ? 'เปิดดูบน YouTube' : 'Watch on YouTube'}</span>
            </a>
          </div>
        </section>
      )}

      {/* Main Guide Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <AbilityPanel abilities={character.abilities} accentColor="#EF4444" />
        <PerkPanel perks={character.recommendedPerks} accentColor="var(--orange)" />
        <TricksPanel tricks={character.tricks} accentColor="#EF4444" />
        <RelationsPanel
          counters={character.counters}
          partners={character.partners}
          accentColor="#EF4444"
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const list = getHunters();
  const paths = list.map((h) => ({
    params: { id: h.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const character = getCharacterById(id);

  if (!character) {
    return { notFound: true };
  }

  return {
    props: {
      character,
    },
  };
};
