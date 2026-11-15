/**
 * Cosmic Insights & Astrology / Numerology Calculation Engine
 * V STAR Numerology & Astrology Platform
 */

export interface ZodiacSign {
  sign: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  tagline: string;
  strengths: string[];
  todayEnergy: string;
}

export interface LifePathData {
  number: number;
  archetype: string;
  summary: string;
  strengths: string[];
  growthAreas: string[];
  essence: string;
}

export interface DestinyData {
  number: number;
  archetype: string;
  description: string;
}

export interface LuckyColor {
  name: string;
  hex: string;
}

export interface CosmicProfile {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  formattedDate: string;
  zodiac: ZodiacSign;
  article: 'A' | 'AN';
  lifePath: LifePathData;
  destiny: DestinyData;
  career: {
    insight: string;
    roles: string[];
    learningStyle: string;
  };
  luckyNumbers: number[];
  luckyColors: LuckyColor[];
  quote: string;
}

export const ZODIAC_DATABASE: Record<string, ZodiacSign> = {
  Aries: {
    sign: 'Aries',
    symbol: '♈',
    element: 'Fire',
    rulingPlanet: 'Mars',
    tagline: 'The Fearless Catalyst & Cosmic Trailblazer',
    strengths: ['Pioneering Courage', 'Instinctive Initiative', 'Dynamic Resilience'],
    todayEnergy: 'Bold momentum is surging through your field. Trust your first instinct and initiate what you have hesitated to begin.'
  },
  Taurus: {
    sign: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    rulingPlanet: 'Venus',
    tagline: 'The Grounded Builder of Lasting Abundance',
    strengths: ['Steadfast Loyalty', 'Sensual Grace', 'Practical Mastery'],
    todayEnergy: 'Anchor your focus into tangible steps. Patient craftsmanship turns your vision into lasting prosperity today.'
  },
  Gemini: {
    sign: 'Gemini',
    symbol: '♊',
    element: 'Air',
    rulingPlanet: 'Mercury',
    tagline: 'The Radiant Weaver of Ideas & Connections',
    strengths: ['Agile Intellect', 'Expressive Wit', 'Versatile Curiosity'],
    todayEnergy: 'A sudden spark of dialogue or insight unlocks a fresh perspective. Embrace flexibility and let curiosity guide you.'
  },
  Cancer: {
    sign: 'Cancer',
    symbol: '♋',
    element: 'Water',
    rulingPlanet: 'Moon',
    tagline: 'The Sacred Guardian of Emotional Depth',
    strengths: ['Intuitive Empathy', 'Devoted Protection', 'Deep Emotional Memory'],
    todayEnergy: 'Listen to the whispers of your intuition today. Protect your sacred sanctuary and nurture genuine heart connections.'
  },
  Leo: {
    sign: 'Leo',
    symbol: '♌',
    element: 'Fire',
    rulingPlanet: 'Sun',
    tagline: 'The Sovereign Heart of Creative Radiance',
    strengths: ['Magnanimous Warmth', 'Creative Leadership', 'Inspiring Presence'],
    todayEnergy: 'Your natural radiance inspires those around you today. Lead with generous warmth and express your sovereign creative fire.'
  },
  Virgo: {
    sign: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    tagline: 'The Discerning Alchemist of Sacred Precision',
    strengths: ['Analytical Clarity', 'Devoted Service', 'Refined Craftsmanship'],
    todayEnergy: 'Clarity arrives through deliberate order. Your attention to sacred details turns complex situations into effortless harmony.'
  },
  Libra: {
    sign: 'Libra',
    symbol: '♎',
    element: 'Air',
    rulingPlanet: 'Venus',
    tagline: 'The Harmonizer of Cosmic Equilibrium',
    strengths: ['Diplomatic Elegance', 'Aesthetic Harmony', 'Objective Fairness'],
    todayEnergy: 'Graceful equilibrium is your superpower today. Seek balance between your inner needs and your outer commitments.'
  },
  Scorpio: {
    sign: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    rulingPlanet: 'Pluto & Mars',
    tagline: 'The Transformative Phoenix of Sacred Truth',
    strengths: ['Penetrating Insight', 'Indomitable Willpower', 'Magnetic Depth'],
    todayEnergy: 'A profound current of renewal surrounds you today. Shed old outworn attachments and step boldly into your personal power.'
  },
  Sagittarius: {
    sign: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    tagline: 'The Boundless Seeker of Higher Wisdom',
    strengths: ['Expansive Optimism', 'Philosophical Vision', 'Adventurous Spirit'],
    todayEnergy: 'Widen your horizons today. An inspiring philosophical truth or spontaneous opportunity illuminates your path forward.'
  },
  Capricorn: {
    sign: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    rulingPlanet: 'Saturn',
    tagline: 'The Master Architect of Destiny & Legacy',
    strengths: ['Strategic Discipline', 'Enduring Integrity', 'Executive Mastery'],
    todayEnergy: 'Your steady patience is building monumental foundations. Focus on long-term legacy rather than fleeting noise.'
  },
  Aquarius: {
    sign: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    rulingPlanet: 'Uranus & Saturn',
    tagline: 'The Visionary Pioneer of Collective Awakening',
    strengths: ['Inventive Originality', 'Humanitarian Vision', 'Unconventional Clarity'],
    todayEnergy: 'Look toward the future without boundaries. An unconventional breakthrough brings fresh liberation to your world.'
  },
  Pisces: {
    sign: 'Pisces',
    symbol: '♓',
    element: 'Water',
    rulingPlanet: 'Neptune & Jupiter',
    tagline: 'The Mystical Dreamer of Infinite Compassion',
    strengths: ['Transcendent Imagination', 'Compassionate Wisdom', 'Spiritual Receptivity'],
    todayEnergy: 'Surrender to the cosmic flow today. Your intuitive sensitivity detects hidden blessings in subtle coincidences.'
  }
};

export const LIFE_PATH_DATABASE: Record<number, LifePathData> = {
  1: {
    number: 1,
    archetype: '1 — The Pioneer & Independent Leader',
    summary: 'Ruled by the Sun. You possess raw drive, innovative willpower, and executive presence. Your path demands carving original roads.',
    strengths: ['Unyielding self-reliance and initiative', 'Courage to pioneer where others hesitate', 'Direct, authoritative executive clarity'],
    growthAreas: ['Impatience with slower processes', 'Tendency toward isolated pride', 'Overcoming fear of dependency'],
    essence: 'The number 1 represents pure cosmic light and the primal spark of creation. You are here to master autonomy, inspire action, and remind humanity of the boundless power of personal willpower.'
  },
  2: {
    number: 2,
    archetype: '2 — The Diplomat & Intuitive Peacemaker',
    summary: 'Ruled by the Moon. You carry high emotional sensitivity, artistic intuition, and natural partnership diplomacy.',
    strengths: ['Deep empathic attunement and mediation', 'Collaborative grace and gentle influence', 'Subtle perception of hidden currents'],
    growthAreas: ['Avoiding emotional hypersensitivity', 'Setting firm energetic boundaries', 'Overcoming chronic people-pleasing'],
    essence: 'The number 2 represents the reflective waters of cosmic duality. You are here to bridge divides, cultivate harmonious sanctuaries, and demonstrate the quiet strength of compassionate presence.'
  },
  3: {
    number: 3,
    archetype: '3 — The Creative Expresser & Radiant Catalyst',
    summary: 'Ruled by Jupiter. You radiate contagious optimism, verbal brilliance, and natural artistic magnetism.',
    strengths: ['Spontaneous creative inspiration', 'Uplifting storytelling and charismatic communication', 'Transforming adversity into humorous wisdom'],
    growthAreas: ['Scattered focus and superficial distraction', 'Mood volatility and emotional suppression', 'Finishing what you energetically start'],
    essence: 'The number 3 embodies divine joy and generative self-expression. You are here to bring light into heavy spaces, illuminate collective imagination, and celebrate the beauty of human feeling.'
  },
  4: {
    number: 4,
    archetype: '4 — The Master Builder & Dedicated Grounder',
    summary: 'Ruled by Rahu & Uranus. Methodical, loyal, grounded, and structurally brilliant. You turn chaos into order.',
    strengths: ['Unmatched work ethic and practical reliability', 'Architectural systems thinking', 'Unwavering loyalty to chosen commitments'],
    growthAreas: ['Rigidity and resistance to sudden change', 'Stubborn attachment to outdated rules', 'Learning to balance duty with joyous play'],
    essence: 'The number 4 represents the square of physical stability and divine architecture. You are the rock upon which enduring institutions, families, and creations take root and withstand the test of time.'
  },
  5: {
    number: 5,
    archetype: '5 — The Freedom Catalyst & Dynamic Adventurer',
    summary: 'Ruled by Mercury. You thrive on adaptability, freedom, sensory exploration, and rapid evolutionary change.',
    strengths: ['Extraordinary versatility and resourcefulness', 'Inspiring progressive freedom in others', 'Quick-witted charisma across diverse cultures'],
    growthAreas: ['Restlessness and avoidance of routine', 'Impulsive escapism during emotional stagnation', 'Deepening long-term commitments'],
    essence: 'The number 5 is the cosmic pivot of life and metamorphosis. You are here to dissolve stale conventions, awaken stagnant energies, and demonstrate how to embrace change with courageous elegance.'
  },
  6: {
    number: 6,
    archetype: '6 — The Harmonizer & Nurturer of Abundance',
    summary: 'Ruled by Venus. Loving, artistic, community-focused, and family-oriented. You naturally attract domestic peace and beauty.',
    strengths: ['Profound devotion and selfless sanctuary creation', 'Refined aesthetic taste and healing aura', 'Natural advisory and protective mentorship'],
    growthAreas: ['Martyrdom and meddlesome perfectionism', 'Carrying responsibilities that belong to others', 'Accepting imperfection in loved ones'],
    essence: 'The number 6 reflects the sacred hexagon of love, cosmic responsibility, and domestic illumination. You are here to anchor unconditional sanctuary and model heart-centered stewardship.'
  },
  7: {
    number: 7,
    archetype: '7 — The Sacred Mystic & Truth Seeker',
    summary: 'Ruled by Ketu & Neptune. Analytical, intuitive, introspective, and contemplative. You seek the unseen truth behind physical reality.',
    strengths: ['Exceptional intellectual depth and analytical penetration', 'Profound spiritual intuition and esoteric understanding', 'Comfort with solitude and philosophical contemplation'],
    growthAreas: ['Aloof cynicism and emotional detachment', 'Analysis paralysis and overthinking', 'Difficulty trusting the physical world'],
    essence: 'The number 7 represents the seeker of divine mysteries and the bridge between intellect and spirit. You are here to pierce worldly illusions and reveal timeless spiritual wisdom.'
  },
  8: {
    number: 8,
    archetype: '8 — The Powerhouse & Manifestor of Abundance',
    summary: 'Ruled by Saturn. Executive mastery, financial wisdom, strategic authority, and cosmic law understanding.',
    strengths: ['Superb financial acumen and large-scale governance', 'Resilience through karmic tests and rebounds', 'Commanding leadership and ethical justice'],
    growthAreas: ['Obsession with status and material validation', 'Authoritarian ruthlessness when challenged', 'Reconnecting with spiritual vulnerability'],
    essence: 'The number 8 is the vertical infinity loop of karma, abundance, and divine stewardship. You are here to balance the material and spiritual realms through noble, responsible power.'
  },
  9: {
    number: 9,
    archetype: '9 — The Universal Humanitarian & Soul Alchemist',
    summary: 'Ruled by Mars. High spiritual evolution, creative compassion, global awareness, and selfless generosity.',
    strengths: ['Universal empathy that transcends social borders', 'Charismatic idealism and visionary artistry', 'Natural wisdom of life-cycle completions'],
    growthAreas: ['Bitter resentment when generosity is unreciprocated', 'Difficulty releasing the past and letting go', 'Preachiness or spiritual superiority'],
    essence: 'The number 9 represents completion, wisdom, and unconditional love. You have walked all paths and carry the collective wisdom of humanity to inspire global healing and self-realization.'
  },
  11: {
    number: 11,
    archetype: '11 — The Master Visionary & Intuitive Illuminator',
    summary: 'Master Number 11. Channel of direct spiritual insight, electric inspiration, and bridge between dimensions.',
    strengths: ['High-frequency intuition and telepathic empathy', 'Inspirational catalyst who ignites spiritual awakening', 'Artistic and inventive visionary genius'],
    growthAreas: ['Nervous system overwhelm and psychic hypersensitivity', 'Imposter syndrome under massive cosmic calling', 'Grounding lofty visions into practical daily steps'],
    essence: 'The Master 11 is the lightning rod of divine revelation. You are an awakened soul sent to shine a piercing beacon through darkness, elevating the collective consciousness through authentic vulnerability.'
  },
  22: {
    number: 22,
    archetype: '22 — The Master Architect & World Builder',
    summary: 'Master Number 22. The most powerful manifestation frequency in existence. Turns grand spiritual blueprints into reality.',
    strengths: ['Merging transcendent vision with flawless practical execution', 'Large-scale philanthropic and global structural impact', 'Unshakable poise in monumental undertakings'],
    growthAreas: ['Paralyzing fear of failing a monumental destiny', 'Impatience with short-sighted collaborators', 'Neglecting personal health for collective duty'],
    essence: 'The Master 22 turns ethereal dreams into concrete reality. You are gifted with both the visionary scope of the 11 and the structural groundedness of the 4, destined to build legacy institutions that serve generations.'
  },
  33: {
    number: 33,
    archetype: '33 — The Master Teacher & Universal Healer',
    summary: 'Master Number 33. The pinnacle of cosmic compassion and selfless avatar consciousness. Embodies universal love.',
    strengths: ['Christ-consciousness compassion and total healing presence', 'Inspiring mass emotional upliftment without dogma', 'Complete spiritual devotion to the welfare of all beings'],
    growthAreas: ['Extreme emotional burden of the world’s suffering', 'Self-sacrifice to the point of complete physical exhaustion', 'Knowing when to allow souls their own karmic lessons'],
    essence: 'The Master 33 is the spiritual teacher of teachers. Your life radiates unconditional love, transmuting collective despair into luminous hope through your mere presence and heart-centered guidance.'
  }
};

export const DESTINY_DATABASE: Record<number, DestinyData> = {
  1: {
    number: 1,
    archetype: '1 — The Independent Pioneer',
    description: 'Your name frequency drives you to establish original frontiers, embody executive courage, and step forward as an undisputed leader in your field.'
  },
  2: {
    number: 2,
    archetype: '2 — The Sacred Peacemaker',
    description: 'Your name vibration attracts collaborative alliances, relational harmony, and artistic sensitivity, bringing balance wherever conflict arises.'
  },
  3: {
    number: 3,
    archetype: '3 — The Inspired Communicator',
    description: 'Your name frequency awakens creative brilliance, verbal mastery, and uplifting charm, inspiring joy and optimism across communities.'
  },
  4: {
    number: 4,
    archetype: '4 — The Master of Foundation',
    description: 'Your name frequency grounds ideas into enduring structural reality with methodical integrity, exceptional craftsmanship, and rock-solid loyalty.'
  },
  5: {
    number: 5,
    archetype: '5 — The Catalyst of Evolution',
    description: 'Your name frequency propels progressive freedom, cultural exploration, and multi-dimensional adaptability that liberates stagnant frameworks.'
  },
  6: {
    number: 6,
    archetype: '6 — The Loving Guardian',
    description: 'Your name frequency emanates healing stewardship, domestic beauty, and protective mentorship that shields and elevates those under your care.'
  },
  7: {
    number: 7,
    archetype: '7 — The Solitary Sage',
    description: 'Your name frequency invites deep intellectual specialization, esoteric research, and spiritual contemplation that discovers what lies beneath.'
  },
  8: {
    number: 8,
    archetype: '8 — The Sovereign Manifestor',
    description: 'Your name frequency commands executive authority, financial prosperity, and ethical mastery that builds influential worldly empires.'
  },
  9: {
    number: 9,
    archetype: '9 — The Universal Humanitarian',
    description: 'Your name frequency calls you to selfless global contribution, soul alchemy, and compassionate philanthropy that leaves the world elevated.'
  },
  11: {
    number: 11,
    archetype: '11 — The Luminous Channel',
    description: 'Your name frequency is a master beacon of intuitive revelation and artistic illumination, destined to awaken higher spiritual consciousness.'
  },
  22: {
    number: 22,
    archetype: '22 — The Master Builder',
    description: 'Your name frequency carries the monumental power to turn world-changing spiritual ideals into tangible, lasting physical systems.'
  },
  33: {
    number: 33,
    archetype: '33 — The Master Healer',
    description: 'Your name frequency radiates universal love, spiritual teaching, and divine comfort, healing hearts through compassionate wisdom.'
  }
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

export function getZodiacSign(month: number, day: number): ZodiacSign {
  const dates = [
    { sign: 'Capricorn', start: [1, 1], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    { sign: 'Capricorn', start: [12, 22], end: [12, 31] }
  ];

  for (const item of dates) {
    if (
      (month === item.start[0] && day >= item.start[1]) ||
      (month === item.end[0] && day <= item.end[1])
    ) {
      return ZODIAC_DATABASE[item.sign] || ZODIAC_DATABASE['Aries'];
    }
  }
  return ZODIAC_DATABASE['Aries'];
}

export function reduceToMaster(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    if (num === 11 || num === 22 || num === 33) return num;
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    num = sum;
  }
  return num;
}

export function calculateLifePath(year: number, month: number, day: number): LifePathData {
  const rDay = reduceToMaster(day);
  const rMonth = reduceToMaster(month);
  const rYear = reduceToMaster(year);

  let total = rDay + rMonth + rYear;
  const lpNum = reduceToMaster(total);

  return LIFE_PATH_DATABASE[lpNum] || LIFE_PATH_DATABASE[1];
}

export function calculateDestiny(fullName: string): DestinyData {
  const clean = (fullName || '').toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (let i = 0; i < clean.length; i++) {
    sum += PYTHAGOREAN_MAP[clean[i]] || 0;
  }
  if (sum === 0) sum = 1;
  const destNum = reduceToMaster(sum);
  return DESTINY_DATABASE[destNum] || DESTINY_DATABASE[1];
}

export function calculateCareerTendencies(zodiac: ZodiacSign, lifePath: LifePathData) {
  const rolesMap: Record<string, string[]> = {
    Fire: ['Entrepreneurial Strategist', 'Executive Director', 'Creative Visionary', 'Innovation Leader'],
    Earth: ['Operations Architect', 'Financial Consultant', 'Sustainable Systems Designer', 'Managing Partner'],
    Air: ['Strategic Communications Director', 'Global Analyst', 'Brand & Media Strategist', 'Research Futurist'],
    Water: ['Holistic Advisory Specialist', 'Psychological Counsellor', 'Creative Director', 'Intuitive Brand Strategist']
  };

  const learningMap: Record<string, string> = {
    Fire: 'Action-oriented immersion: Learns rapidly through direct execution, high-stakes trial, and visionary autonomy.',
    Earth: 'Methodical empirical mastery: Synthesizes complex frameworks through structured observation, hands-on practice, and verified real-world metrics.',
    Air: 'Conceptual & dialectic synthesis: Thrives on multi-disciplinary cross-pollination, deep dialogue, and conceptual mind-mapping.',
    Water: 'Intuitive & experiential absorption: Internalizes knowledge through emotional resonance, deep atmospheric immersion, and unconscious pattern recognition.'
  };

  const insight = `Your planetary ${zodiac.sign} alignment governed by ${zodiac.rulingPlanet} merged with the foundational frequency of Life Path ${lifePath.number} creates an extraordinary synthesis of ${zodiac.element.toLowerCase()} vitality and executive intention. In professional landscapes, you thrive when granted sovereign creative autonomy to architect solutions rather than adhering to rigid, uninspired hierarchies.`;

  return {
    insight,
    roles: (rolesMap[zodiac.element] || rolesMap['Fire']).slice(0, 3),
    learningStyle: learningMap[zodiac.element] || learningMap['Fire']
  };
}

export function calculateLuckyNumbers(lifePathNum: number, destinyNum: number, day: number): number[] {
  const seed = lifePathNum * 7 + destinyNum * 5 + day;
  const pool = [lifePathNum, destinyNum, (day % 9) + 1, (seed % 28) + 1, ((seed * 3) % 45) + 1, 7, 11, 21, 28, 33, 42];
  const unique = Array.from(new Set(pool.filter(n => n > 0 && n <= 50)));
  while (unique.length < 5) {
    unique.push(unique.length * 9 + 3);
  }
  return unique.slice(0, 5);
}

export function calculateLuckyColors(element: string, lifePathNum: number): LuckyColor[] {
  const palette: Record<string, LuckyColor[]> = {
    Fire: [
      { name: 'Celestial Gold', hex: '#dfb872' },
      { name: 'Radiant Amber', hex: '#f59e0b' },
      { name: 'Crimson Sunstone', hex: '#ef4444' }
    ],
    Earth: [
      { name: 'Emerald Velvet', hex: '#10b981' },
      { name: 'Champagne Sand', hex: '#fef08a' },
      { name: 'Deep Obsidian', hex: '#64748b' }
    ],
    Air: [
      { name: 'Sky Azure', hex: '#38bdf8' },
      { name: 'Liquid Silver', hex: '#e2e8f0' },
      { name: 'Soft Lavender', hex: '#c084fc' }
    ],
    Water: [
      { name: 'Mystic Indigo', hex: '#6366f1' },
      { name: 'Moonlit Pearl', hex: '#f1f5f9' },
      { name: 'Aquamarine Shimmer', hex: '#2dd4bf' }
    ]
  };

  return palette[element] || palette['Fire'];
}

export function getPersonalizedQuote(zodiac: ZodiacSign, lifePath: LifePathData): string {
  const quotes = [
    `"WHEN YOUR COMPOUND FREQUENCY ALIGNS WITH CELESTIAL TIMING, EVERY OBSTACLE TRANSMUTES INTO SACRED MOMENTUM."`,
    `"YOU ARE NOT A PASSIVE WANDERER IN THE UNIVERSE; YOU ARE THE COSMOS OBSERVING ITS OWN SOVEREIGN UNFOLDING."`,
    `"HARMONY ARISES THE MOMENT YOU CEASE DILUTING YOUR SACRED GIFTS TO COMFORT A HASTY WORLD."`,
    `"THE STARS DO NOT COMPEL THE AWAKENED SOUL; THEY ILLUMINATE THE ARCHITECTURE YOU WERE BORN TO BUILD."`,
    `"IN THE SACRED GEOMETRY OF DESTINY, PATIENCE IS NOT WAITING—IT IS THE QUIET RECEPTIVITY OF ALIGNED CERTAINTY."`
  ];
  const idx = (zodiac.sign.length + lifePath.number) % quotes.length;
  return quotes[idx];
}

export function generateCosmicProfile(name: string, dobString: string, tobString: string, pobString: string): CosmicProfile {
  const cleanName = (name || 'Cosmic Traveler').trim();
  const dateObj = new Date(dobString || '1995-11-14');
  const validDate = isNaN(dateObj.getTime()) ? new Date('1995-11-14') : dateObj;

  const year = validDate.getFullYear();
  const month = validDate.getMonth() + 1;
  const day = validDate.getDate();

  const zodiac = getZodiacSign(month, day);
  const article: 'A' | 'AN' = /^[AEIOU]/i.test(zodiac.sign) ? 'AN' : 'A';

  const lifePath = calculateLifePath(year, month, day);
  const destiny = calculateDestiny(cleanName);
  const career = calculateCareerTendencies(zodiac, lifePath);
  const luckyNumbers = calculateLuckyNumbers(lifePath.number, destiny.number, day);
  const luckyColors = calculateLuckyColors(zodiac.element, lifePath.number);
  const quote = getPersonalizedQuote(zodiac, lifePath);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${day < 10 ? '0' + day : day} ${months[month - 1]} ${year}`;
  const tob = (tobString || '10:00').trim();
  const pob = (pobString || 'Celestial Horizon').trim();

  return {
    name: cleanName,
    dob: dobString,
    tob,
    pob,
    formattedDate,
    zodiac,
    article,
    lifePath,
    destiny,
    career,
    luckyNumbers,
    luckyColors,
    quote
  };
}
