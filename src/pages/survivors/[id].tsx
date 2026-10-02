import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Layout } from '../../components/Layout';
import { AbilityPanel } from '../../components/AbilityPanel';
import { PerkPanel } from '../../components/PerkPanel';
import { TricksPanel } from '../../components/TricksPanel';
import { RelationsPanel } from '../../components/RelationsPanel';
import { useLang } from '../../context/LangContext';
import { getCharacterById, getSurvivors } from '../../utils/characters';
import { Character } from '../../types';

interface SurvivorDetailProps {
  character: Character;
}

export default function SurvivorDetailPage({ character }: SurvivorDetailProps) {
  const { lang, t } = useLang();

  if (!character) return null;

  return (
    <Layout
      pageTitle={character.name[lang]}
      pageDescription={character.overview[lang]}
    >
      <div style={{ marginBottom: '20px' }}>
        <Link href="/survivors" className="btn btn-sm btn-ghost">
          <span>←</span>
          <span>{t('labels.backToList')}</span>
        </Link>
      </div>

      {/* KRIDA Hero Detail Banner */}
      <div className="hero-detail-banner">
        <div className="hero-detail-portrait">
          <img
            src={character.image || `/images/heroes/${character.id}.svg`}
            alt={character.name[lang]}
          />
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
            <span className="chip chip-survivor">Survivor</span>
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
          <div className="mono" style={{ fontSize: '14px', color: 'var(--blue-lift)', marginBottom: '16px' }}>
            {character.title[lang]}
          </div>

          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>
            {character.overview[lang]}
          </p>

          {character.quote && (
            <div className="notice" style={{ fontStyle: 'italic' }}>
              "{character.quote[lang]}"
            </div>
          )}
        </div>
      </div>

      {/* Responsive Video Guide Embed if available */}
      {character.youtubeVideoId && (
        <section style={{ marginBottom: '32px' }}>
          <div className="page-head" style={{ marginBottom: '14px' }}>
            <div>
              <span className="eyebrow">{lang === 'th' ? 'วิดีโอแนะนำ' : 'Video Tutorial'}</span>
              <h2 style={{ font: '700 22px Outfit, Prompt, sans-serif' }}>
                {lang === 'th' ? 'คลิปแนะนำเทคนิคและการเล่นจริง' : 'Mastery Video Guide'}
              </h2>
            </div>
          </div>

          <div className="video-embed-box">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${character.youtubeVideoId}?rel=0`}
              title={`${character.name[lang]} Guide Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Main Guide Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <AbilityPanel abilities={character.abilities} accentColor="var(--blue-lift)" />
        <PerkPanel perks={character.recommendedPerks} accentColor="var(--orange)" />
        <TricksPanel tricks={character.tricks} accentColor="var(--blue-lift)" />
        <RelationsPanel
          counters={character.counters}
          partners={character.partners}
          accentColor="var(--orange)"
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const list = getSurvivors();
  const paths = list.map((s) => ({
    params: { id: s.id },
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
