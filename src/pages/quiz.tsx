import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { useLang } from '../context/LangContext';
import quizData from '../data/quiz.json';

export default function QuizPage() {
  const { lang, t } = useLang();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = quizData[currentIdx];
  const total = quizData.length;

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <Layout
      pageTitle={lang === 'th' ? 'แบบฝึกหัด & ควิซวัดระดับ' : 'Interactive Quiz & Practice'}
      pageDescription="ทดสอบความรู้และเทคนิคเกม Identity V ทั้งสกิล การแก้ทาง และสายพรสวรรค์"
    >
      <div className="page-head">
        <div>
          <span className="eyebrow">Interactive Training</span>
          <h1>{lang === 'th' ? 'ควิซฝึกฝน & ทดสอบความรู้' : 'Mastery Quiz & Practice'}</h1>
          <p className="muted" style={{ marginTop: '6px' }}>
            {lang === 'th'
              ? 'ทบทวนความจำเกี่ยวกับตัวละคร สกิล การแก้ทาง และสายพรสวรรค์เพื่อเตรียมตัวลงแรงก์'
              : 'Test your knowledge on hero abilities, counter matchups, and optimal persona builds.'}
          </p>
        </div>

        {!showResult && (
          <div style={{ textAlign: 'right' }}>
            <span className="section-label">{lang === 'th' ? 'คะแนนปัจจุบัน' : 'Current Score'}</span>
            <div style={{ font: '800 24px var(--mono)', color: 'var(--orange)' }}>
              {score} / {total}
            </div>
          </div>
        )}
      </div>

      {!showResult ? (
        <div className="quiz-card card">
          {/* Progress bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
              <span className="mono" style={{ color: 'var(--ink-2)' }}>
                {lang === 'th' ? `คำถามที่ ${currentIdx + 1} จาก ${total}` : `Question ${currentIdx + 1} of ${total}`}
              </span>
              <span className="mono" style={{ color: 'var(--orange)' }}>
                {Math.round(((currentIdx + 1) / total) * 100)}%
              </span>
            </div>
            <div className="bar" style={{ height: '6px' }}>
              <i style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
            </div>
          </div>

          <h2 style={{ font: '700 22px Prompt, Outfit, sans-serif', marginBottom: '24px', lineHeight: 1.4 }}>
            {question.question[lang]}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {question.options.map((opt, idx) => {
              let optClass = 'quiz-option';
              if (selectedOpt !== null) {
                if (idx === question.correctIndex) {
                  optClass += ' correct';
                } else if (idx === selectedOpt) {
                  optClass += ' wrong';
                }
              }

              return (
                <button
                  key={idx}
                  className={optClass}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOpt !== null}
                >
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'grid',
                      placeItems: 'center',
                      font: '700 13px var(--mono)',
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ flex: 1 }}>{opt[lang]}</span>
                  {selectedOpt !== null && idx === question.correctIndex && <span>✓</span>}
                  {selectedOpt !== null && idx === selectedOpt && idx !== question.correctIndex && <span>✕</span>}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--r)',
                background: selectedOpt === question.correctIndex ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                border: `1px solid ${selectedOpt === question.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                marginBottom: '20px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: selectedOpt === question.correctIndex ? '#34D399' : '#F87171' }}>
                {selectedOpt === question.correctIndex ? (lang === 'th' ? '🎉 ถูกต้อง!' : '🎉 Correct!') : (lang === 'th' ? '❌ ยังไม่ถูกต้อง' : '❌ Incorrect')}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                {question.explanation[lang]}
              </p>
            </div>
          )}

          {selectedOpt !== null && (
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-accent" onClick={handleNext}>
                <span>{currentIdx + 1 < total ? (lang === 'th' ? 'ข้อถัดไป →' : 'Next Question →') : (lang === 'th' ? 'ดูผลคะแนน' : 'View Results')}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-card card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>
            {score >= total - 1 ? '🏆' : score >= Math.ceil(total / 2) ? '🎯' : '📚'}
          </div>

          <span className="eyebrow">{lang === 'th' ? 'ผลการทดสอบ' : 'Assessment Result'}</span>
          <h2 style={{ font: '800 32px Outfit, Prompt, sans-serif', marginTop: '8px', marginBottom: '12px' }}>
            {lang === 'th' ? `คุณได้ ${score} เต็ม ${total} คะแนน!` : `You Scored ${score} / ${total}!`}
          </h2>

          <p style={{ color: 'var(--ink-2)', maxWidth: '480px', margin: '0 auto 28px', fontSize: '15px' }}>
            {score === total
              ? (lang === 'th' ? 'ยอดเยี่ยมมาก! คุณมีความรู้ระดับทัวร์นาเมนต์มาสเตอร์ พร้อมลงแรงก์แล้ว' : 'Flawless! You possess tournament-level knowledge. Ready for high-tier rank!')
              : (lang === 'th' ? 'เก่งมาก! ทบทวนจุดที่พลาดในคู่มือตัวละครเพิ่มเติมเพื่อพัฒนาสู่ระดับสูงสุด' : 'Great effort! Revisit character guide pages to polish counter tactics.')}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-accent" onClick={handleRestart}>
              <span>🔄</span>
              <span>{lang === 'th' ? 'ทำแบบทดสอบอีกครั้ง' : 'Retry Quiz'}</span>
            </button>
            <Link href="/survivors" className="btn btn-ghost">
              <span>{lang === 'th' ? 'กลับไปอ่านคู่มือตัวละคร' : 'Explore Character Guides'}</span>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
