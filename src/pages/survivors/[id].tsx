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

  const accentColor = character.colorAccent || '#10B981';

  return (
    <Layout
      pageTitle={character.name[lang]}
      pageDescription={character.overview[lang]}
    >
      {/* Back button */}
      <div style={{ marginBottom: '18px' }}>
        <Link
          href="/survivors"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'var(--text-dim)',
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span>←</span>
          <span>{t('labels.backToList')}</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div
        className="detail-header"
        style={{
          borderLeft: `4px solid ${accentColor}`,
        }}
      >
        <div className="detail-header-top">
          <div
            className="detail-avatar"
            style={{
              borderColor: accentColor,
              boxShadow: `0 0 25px ${accentColor}44`,
            }}
          >
            {character.name[lang].slice(0, 1)}
          </div>

          <div className="detail-title-area">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <span className={`tier-badge tier-${character.tier.toLowerCase()}`}>
                Tier {character.tier}
              </span>
              {character.role && (
                <span className="role-badge" style={{ color: '#34D399', borderColor: '#10B98144' }}>
                  {t(`roles.${character.role}`)}
                </span>
              )}
              <div
                className="difficulty-stars"
                title={`${t('labels.difficulty')}: ${character.difficulty}/5`}
                style={{ marginLeft: 'auto' }}
              >
                {'★'.repeat(character.difficulty)}
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>
                  {'★'.repeat(5 - character.difficulty)}
                </span>
              </div>
            </div>

            <h1 className="detail-name">{character.name[lang]}</h1>
            <div className="detail-subname">{character.title[lang]}</div>

            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '14px' }}>
              {character.overview[lang]}
            </p>

            {character.quote && (
              <blockquote className="detail-quote" style={{ borderLeftColor: accentColor }}>
                "{character.quote[lang]}"
              </blockquote>
            )}
          </div>
        </div>
      </div>

      {/* Main Guide Content Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Abilities */}
        <AbilityPanel abilities={character.abilities} accentColor={accentColor} />

        {/* Perks / Persona */}
        <PerkPanel perks={character.recommendedPerks} accentColor={accentColor} />

        {/* Tricks */}
        <TricksPanel tricks={character.tricks} accentColor={accentColor} />

        {/* Relations: Counters and Partners */}
        <RelationsPanel
          counters={character.counters}
          partners={character.partners}
          accentColor={accentColor}
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
