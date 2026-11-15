import React, { useEffect, useState, useMemo } from 'react';
import { generateCosmicProfile, CosmicProfile } from '../lib/cosmic';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';

export const ResultsPage: React.FC = () => {
  const [profile, setProfile] = useState<CosmicProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract query parameters & redirect if missing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const dob = params.get('dob');
    const tob = params.get('tob') || '12:00';
    const pob = params.get('pob');

    if (!name || !dob || !pob) {
      window.location.replace('/predict');
      return;
    }

    try {
      const generated = generateCosmicProfile(name, dob, tob, pob);
      setProfile(generated);
    } catch (err) {
      console.error('Error generating cosmic profile:', err);
      window.location.replace('/predict');
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSaveReading = () => {
    if (!profile) return;
    try {
      localStorage.setItem(
        'vstar_last_reading',
        JSON.stringify({
          name: profile.name,
          dob: profile.dob,
          tob: profile.tob,
          pob: profile.pob,
          savedAt: new Date().toISOString()
        })
      );

      // Generate clean summary text
      const summaryText = [
        '====================================================',
        '        V STAR NUMEROLOGY & ASTROLOGY',
        '           YOUR COSMIC SNAPSHOT & READING',
        '====================================================',
        '',
        `NAME: ${profile.name.toUpperCase()}`,
        `BIRTH DATA: Born ${profile.formattedDate} at ${profile.tob} · ${profile.pob}`,
        `SUN SIGN: ${profile.zodiac.sign.toUpperCase()} (${profile.zodiac.symbol})`,
        `ELEMENT: ${profile.zodiac.element} | RULING PLANET: ${profile.zodiac.rulingPlanet}`,
        `TAGLINE: "${profile.zodiac.tagline}"`,
        '',
        '--- CORE NUMBERS ---',
        `LIFE PATH NUMBER: ${profile.lifePath.number} (${profile.lifePath.archetype})`,
        `DESTINY NUMBER:   ${profile.destiny.number} (${profile.destiny.archetype})`,
        '',
        '--- ZODIAC STRENGTHS & DAILY ENERGY ---',
        `STRENGTHS: ${profile.zodiac.strengths.join(' · ')}`,
        `TODAY'S ENERGY: ${profile.zodiac.todayEnergy}`,
        '',
        '--- CAREER TENDENCIES ---',
        `${profile.career.insight}`,
        `Roles to explore: ${profile.career.roles.join(', ')}`,
        `Learning style:   ${profile.career.learningStyle}`,
        '',
        '--- LUCKY RESONANCE ---',
        `Lucky Numbers: ${profile.luckyNumbers.join(', ')}`,
        `Lucky Colors:  ${profile.luckyColors.map((c) => c.name).join(', ')}`,
        '',
        '--- PERSONALIZED GUIDANCE ---',
        `"${profile.quote}"`,
        '',
        '====================================================',
        'For entertainment and self-reflection only — not professional, medical, legal, or financial advice.'
      ].join('\n');

      const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `VSTAR_Cosmic_Snapshot_${profile.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      triggerToast('Reading saved and downloaded successfully!');
    } catch {
      triggerToast('Reading saved to your browser session.');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: `Cosmic Snapshot of ${profile?.name || 'V STAR'}`,
          text: `Discover your personalized cosmic snapshot and life path reading.`,
          url
        })
        .catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        triggerToast('Shareable reading link copied to clipboard!');
      });
    } else {
      triggerToast('Shareable reading link copied!');
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#080516] flex items-center justify-center text-slate-300">
        <div className="flex items-center gap-3">
          <span className="text-[#dfb872] animate-spin text-xl">✦</span>
          <span>Aligning your celestial coordinates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080516] text-[#f1f3f9] py-16 px-4 sm:px-6 relative overflow-x-hidden font-sans">
      {/* Starry Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[400px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        {/* ========================================================
             1. HERO HEADER ("YOUR COSMIC SNAPSHOT")
             ======================================================== */}
        <header className="text-center pt-6 pb-2">
          <div className="text-xs font-bold tracking-[0.25em] text-[#dfb872] uppercase mb-3">
            YOUR COSMIC SNAPSHOT
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white leading-tight mb-3">
            <span>{profile.name.toUpperCase()}</span>, THE COSMOS SEES YOU AS{' '}
            {profile.article}{' '}
            <span className="bg-gradient-to-r from-[#dfb872] via-[#f6deb4] to-[#c4994e] bg-clip-text text-transparent">
              {profile.zodiac.sign.toUpperCase()}
            </span>
            .
          </h1>
          <div className="text-sm sm:text-base text-slate-300/80 flex items-center justify-center gap-2 mb-6">
            <span>✦</span>
            <span>Born {profile.formattedDate} at {profile.tob} · {profile.pob}</span>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleSaveReading}
              className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#0c0721] bg-gradient-to-r from-[#dfb872] to-[#c4994e] hover:brightness-110 shadow-lg shadow-[#dfb872]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>↓</span> Save Reading
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-white/5 border border-indigo-400/25 hover:border-[#dfb872] hover:text-[#dfb872] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>↗</span> Share
            </button>
            <a
              href="/predict"
              className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-white/5 border border-indigo-400/25 hover:border-[#dfb872] hover:text-[#dfb872] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>↺</span> New Reading
            </a>
          </div>
        </header>

        {/* ========================================================
             2. CORE NUMBER HIGHLIGHT CARDS (STACKED FULL-WIDTH)
             ======================================================== */}
        <section className="space-y-4" aria-label="Core Numbers Highlight">
          {/* LIFE PATH */}
          <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl text-center shadow-xl hover:border-[#dfb872]/40 transition-all relative overflow-hidden">
            <div className="text-xs font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-1">
              LIFE PATH
            </div>
            <div className="font-serif text-5xl sm:text-6xl text-white font-bold my-1">
              {profile.lifePath.number}
            </div>
            <div className="text-sm sm:text-base text-slate-300 font-medium">
              {profile.lifePath.archetype}
            </div>
          </div>

          {/* DESTINY */}
          <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl text-center shadow-xl hover:border-[#dfb872]/40 transition-all relative overflow-hidden">
            <div className="text-xs font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-1">
              DESTINY
            </div>
            <div className="font-serif text-5xl sm:text-6xl text-white font-bold my-1">
              {profile.destiny.number}
            </div>
            <div className="text-sm sm:text-base text-slate-300 font-medium">
              {profile.destiny.archetype}
            </div>
          </div>
        </section>

        {/* ========================================================
             3. ZODIAC OVERVIEW
             ======================================================== */}
        <section>
          <div className="flex items-center gap-3 font-serif text-sm font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[#dfb872]/40 after:to-transparent">
            ZODIAC OVERVIEW
          </div>
          <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-[#dfb872]/40 transition-all text-center">
            {/* Emblem badge */}
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#dfb872] bg-gradient-to-b from-[#dfb872]/20 to-transparent flex items-center justify-center text-3xl text-[#dfb872] shadow-lg shadow-[#dfb872]/20 mb-3">
              {profile.zodiac.symbol}
            </div>
            <div className="font-serif text-2xl font-bold tracking-wider text-white uppercase mb-1">
              {profile.zodiac.sign}
            </div>
            <div className="text-xs font-bold tracking-[0.15em] text-[#dfb872] uppercase mb-6">
              {profile.zodiac.element.toUpperCase()} · RULED BY {profile.zodiac.rulingPlanet.toUpperCase()}
            </div>

            <div className="border-t border-indigo-400/15 pt-5 text-left space-y-3">
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {profile.zodiac.tagline}
              </p>
              <div className="text-sm text-slate-300/80 leading-relaxed">
                <strong className="text-[#dfb872] font-semibold">Strengths · </strong>
                <span>{profile.zodiac.strengths.join(' · ')}</span>
              </div>
              <div className="text-sm text-slate-300/80 leading-relaxed">
                <strong className="text-[#dfb872] font-semibold">Today's energy · </strong>
                <span>{profile.zodiac.todayEnergy}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
             4. NUMEROLOGY SUMMARY
             ======================================================== */}
        <section>
          <div className="flex items-center gap-3 font-serif text-sm font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[#dfb872]/40 after:to-transparent">
            NUMEROLOGY SUMMARY
          </div>
          <div className="space-y-4">
            {/* Life Path Card */}
            <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:border-[#dfb872]/40 transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfb872] to-[#c4994e] text-[#0b061e] font-serif text-2xl font-bold flex items-center justify-center shrink-0 shadow-md shadow-[#dfb872]/30">
                {profile.lifePath.number}
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="text-xs font-bold tracking-[0.18em] text-[#dfb872] uppercase mb-1">
                  LIFE PATH
                </div>
                <div className="font-serif text-lg font-bold text-white mb-1">
                  {profile.lifePath.archetype}
                </div>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {profile.lifePath.summary}
                </p>
              </div>
            </div>

            {/* Destiny Card */}
            <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:border-[#dfb872]/40 transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfb872] to-[#c4994e] text-[#0b061e] font-serif text-2xl font-bold flex items-center justify-center shrink-0 shadow-md shadow-[#dfb872]/30">
                {profile.destiny.number}
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="text-xs font-bold tracking-[0.18em] text-[#dfb872] uppercase mb-1">
                  DESTINY
                </div>
                <div className="font-serif text-lg font-bold text-white mb-1">
                  {profile.destiny.archetype}
                </div>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {profile.destiny.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
             5. CAREER TENDENCIES
             ======================================================== */}
        <section>
          <div className="flex items-center gap-3 font-serif text-sm font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[#dfb872]/40 after:to-transparent">
            CAREER TENDENCIES
          </div>
          <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-[#dfb872]/40 transition-all">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-5">
              {profile.career.insight}
            </p>
            <div className="space-y-2 border-t border-indigo-400/15 pt-4 text-sm text-slate-300/80">
              <div>
                <strong className="text-[#dfb872] font-semibold">Roles to explore · </strong>
                <span>{profile.career.roles.join(', ')}</span>
              </div>
              <div>
                <strong className="text-[#dfb872] font-semibold">Learning style · </strong>
                <span>{profile.career.learningStyle}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
             6. LIFE PATH INDICATORS (ACCORDION)
             ======================================================== */}
        <section>
          <div className="flex items-center gap-3 font-serif text-sm font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[#dfb872]/40 after:to-transparent">
            LIFE PATH INDICATORS
          </div>
          <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl">
            <Accordion type="single" collapsible defaultValue="strengths">
              <AccordionItem value="strengths">
                <AccordionTrigger value="strengths">STRENGTHS</AccordionTrigger>
                <AccordionContent value="strengths">
                  <ul className="space-y-2">
                    {profile.lifePath.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#dfb872] text-xs mt-1">✦</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="growth">
                <AccordionTrigger value="growth">GROWTH AREAS</AccordionTrigger>
                <AccordionContent value="growth">
                  <ul className="space-y-2">
                    {profile.lifePath.growthAreas.map((gr, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#dfb872] text-xs mt-1">✦</span>
                        <span>{gr}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="essence">
                <AccordionTrigger value="essence">ESSENCE</AccordionTrigger>
                <AccordionContent value="essence">
                  <p className="italic text-slate-300 leading-relaxed">
                    {profile.lifePath.essence}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ========================================================
             7. LUCKY NUMBERS & COLORS
             ======================================================== */}
        <section>
          <div className="flex items-center gap-3 font-serif text-sm font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[#dfb872]/40 after:to-transparent">
            LUCKY NUMBERS &amp; COLORS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: NUMBERS */}
            <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 backdrop-blur-xl shadow-xl text-center">
              <div className="text-xs font-bold tracking-[0.18em] text-[#dfb872] uppercase mb-4 font-serif">
                NUMBERS
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {profile.luckyNumbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#dfb872] to-[#c4994e] text-[#0b061e] font-serif text-xl font-bold flex items-center justify-center shadow-md shadow-[#dfb872]/20 hover:scale-110 transition-transform cursor-default"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: COLORS */}
            <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
              <div className="text-xs font-bold tracking-[0.18em] text-[#dfb872] uppercase mb-4 font-serif text-center">
                COLORS
              </div>
              <div className="space-y-3">
                {profile.luckyColors.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shrink-0 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
             8. PERSONALIZED GUIDANCE
             ======================================================== */}
        <section>
          <div className="flex items-center gap-3 font-serif text-sm font-bold tracking-[0.2em] text-[#dfb872] uppercase mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[#dfb872]/40 after:to-transparent">
            PERSONALIZED GUIDANCE
          </div>
          <div className="bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-8 backdrop-blur-xl shadow-xl text-center hover:border-[#dfb872]/40 transition-all">
            <div className="text-3xl text-[#dfb872] mb-3 animate-pulse">✦</div>
            <p className="font-serif text-base sm:text-lg lg:text-xl font-semibold tracking-wide text-white uppercase max-w-xl mx-auto leading-relaxed">
              "{profile.quote}"
            </p>
          </div>
        </section>

        {/* ========================================================
             9. FOOTER DISCLAIMER
             ======================================================== */}
        <footer className="text-center text-xs text-slate-400/50 pt-4 pb-8 max-w-lg mx-auto leading-normal">
          For entertainment and self-reflection only — not professional, medical, legal, or financial advice.
        </footer>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#120d2b]/95 border border-[#dfb872] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm z-50 animate-bounce">
          <span className="text-[#dfb872]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
