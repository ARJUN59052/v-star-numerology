import React, { useState } from 'react';

export interface PredictFormData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

export const PredictPage: React.FC = () => {
  const [formData, setFormData] = useState<PredictFormData>({
    name: '',
    dob: '',
    tob: '12:00',
    pob: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.dob) {
      setError('Please select your date of birth.');
      return;
    }
    if (!formData.pob.trim()) {
      setError('Please enter your birth city and country.');
      return;
    }

    setLoading(true);

    const query = new URLSearchParams({
      name: formData.name.trim(),
      dob: formData.dob,
      tob: formData.tob || '12:00',
      pob: formData.pob.trim()
    }).toString();

    // Smooth navigation to /results preserving params
    window.location.href = `/results?${query}`;
  };

  return (
    <div className="min-h-screen bg-[#080516] text-[#f1f3f9] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl bg-[#120d2b]/80 border border-indigo-400/15 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative z-10 transition-all hover:border-[#dfb872]/40">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#dfb872]/10 border border-[#dfb872]/30 text-[#dfb872] mb-4">
          <span>✦</span>
          <span>Natal Cosmic Reading</span>
        </div>

        {/* Header */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white mb-2">
          Reveal Your{' '}
          <span className="bg-gradient-to-r from-[#dfb872] via-[#f6deb4] to-[#c4994e] bg-clip-text text-transparent">
            Cosmic Blueprint
          </span>
        </h1>
        <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed mb-6">
          Enter your birth details accurately to generate your personalized Cosmic Snapshot — discovering your true Sun Sign alignment, Life Path archetype, Pythagorean Destiny number, and auspicious resonances.
        </p>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold tracking-wider uppercase text-[#dfb872] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Eleanor Vance"
              required
              className="w-full bg-[#0a061a]/80 border border-indigo-400/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#dfb872] focus:ring-1 focus:ring-[#dfb872] transition-all"
            />
          </div>

          {/* DOB & TOB Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dob" className="block text-xs font-bold tracking-wider uppercase text-[#dfb872] mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full bg-[#0a061a]/80 border border-indigo-400/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#dfb872] focus:ring-1 focus:ring-[#dfb872] transition-all"
              />
            </div>

            <div>
              <label htmlFor="tob" className="block text-xs font-bold tracking-wider uppercase text-[#dfb872] mb-1.5">
                Time of Birth
              </label>
              <input
                type="time"
                id="tob"
                name="tob"
                value={formData.tob}
                onChange={handleChange}
                className="w-full bg-[#0a061a]/80 border border-indigo-400/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#dfb872] focus:ring-1 focus:ring-[#dfb872] transition-all"
              />
            </div>
          </div>

          {/* Place of Birth */}
          <div>
            <label htmlFor="pob" className="block text-xs font-bold tracking-wider uppercase text-[#dfb872] mb-1.5">
              Birth Place (City, Country)
            </label>
            <input
              type="text"
              id="pob"
              name="pob"
              value={formData.pob}
              onChange={handleChange}
              placeholder="e.g. Chennai, India"
              required
              className="w-full bg-[#0a061a]/80 border border-indigo-400/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#dfb872] focus:ring-1 focus:ring-[#dfb872] transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base tracking-wide text-white bg-gradient-to-r from-[#e06d2d] to-[#f08c35] hover:from-[#e77533] hover:to-[#f79946] shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Aligning Celestial Vibrations...</span>
            ) : (
              <>
                <span>Generate Cosmic Snapshot</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400/70">
          <span>🔒 Calculation performed client-side using deterministic Pythagorean and Vedic formulas.</span>
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
