/**
 * V STAR Cosmic Insights - Frontend Calculation Engine
 * Mirrors src/lib/cosmic.ts exactly for browser-side instant reactive generation
 */
(function(window) {
  'use strict';

  const ZODIAC_DATABASE = {
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

  const LIFE_PATH_DATABASE = {
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

  const DESTINY_DATABASE = {
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

  const PYTHAGOREAN_MAP = {
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

  function getZodiacSign(month, day) {
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

    for (let i = 0; i < dates.length; i++) {
      const item = dates[i];
      if (
        (month === item.start[0] && day >= item.start[1]) ||
        (month === item.end[0] && day <= item.end[1])
      ) {
        return ZODIAC_DATABASE[item.sign] || ZODIAC_DATABASE['Aries'];
      }
    }
    return ZODIAC_DATABASE['Aries'];
  }

  function reduceToMaster(num) {
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

  function calculateLifePath(year, month, day) {
    const rDay = reduceToMaster(day);
    const rMonth = reduceToMaster(month);
    const rYear = reduceToMaster(year);

    const total = rDay + rMonth + rYear;
    const lpNum = reduceToMaster(total);

    return LIFE_PATH_DATABASE[lpNum] || LIFE_PATH_DATABASE[1];
  }

  function calculateDestiny(fullName) {
    const clean = (fullName || '').toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    for (let i = 0; i < clean.length; i++) {
      sum += PYTHAGOREAN_MAP[clean[i]] || 0;
    }
    if (sum === 0) sum = 1;
    const destNum = reduceToMaster(sum);
    return DESTINY_DATABASE[destNum] || DESTINY_DATABASE[1];
  }

  function calculateCareerTendencies(zodiac, lifePath) {
    const rolesMap = {
      Fire: ['Entrepreneurial Strategist', 'Executive Director', 'Creative Visionary', 'Innovation Leader'],
      Earth: ['Operations Architect', 'Financial Consultant', 'Sustainable Systems Designer', 'Managing Partner'],
      Air: ['Strategic Communications Director', 'Global Analyst', 'Brand & Media Strategist', 'Research Futurist'],
      Water: ['Holistic Advisory Specialist', 'Psychological Counsellor', 'Creative Director', 'Intuitive Brand Strategist']
    };

    const learningMap = {
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

  function calculateLuckyNumbers(lifePathNum, destinyNum, day) {
    const seed = lifePathNum * 7 + destinyNum * 5 + day;
    const pool = [lifePathNum, destinyNum, (day % 9) + 1, (seed % 28) + 1, ((seed * 3) % 45) + 1, 7, 11, 21, 28, 33, 42];
    const unique = Array.from(new Set(pool.filter(n => n > 0 && n <= 50)));
    while (unique.length < 5) {
      unique.push(unique.length * 9 + 3);
    }
    return unique.slice(0, 5);
  }

  function calculateLuckyColors(element, lifePathNum) {
    const palette = {
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

  function getPersonalizedQuote(zodiac, lifePath) {
    const quotes = [
      '"WHEN YOUR COMPOUND FREQUENCY ALIGNS WITH CELESTIAL TIMING, EVERY OBSTACLE TRANSMUTES INTO SACRED MOMENTUM."',
      '"YOU ARE NOT A PASSIVE WANDERER IN THE UNIVERSE; YOU ARE THE COSMOS OBSERVING ITS OWN SOVEREIGN UNFOLDING."',
      '"HARMONY ARISES THE MOMENT YOU CEASE DILUTING YOUR SACRED GIFTS TO COMFORT A HASTY WORLD."',
      '"THE STARS DO NOT COMPEL THE AWAKENED SOUL; THEY ILLUMINATE THE ARCHITECTURE YOU WERE BORN TO BUILD."',
      '"IN THE SACRED GEOMETRY OF DESTINY, PATIENCE IS NOT WAITING—IT IS THE QUIET RECEPTIVITY OF ALIGNED CERTAINTY."'
    ];
    const idx = (zodiac.sign.length + lifePath.number) % quotes.length;
    return quotes[idx];
  }

  function parseDateCoordinates(dobString) {
    let year = 1995, month = 11, day = 14;
    if (!dobString) return { year, month, day };

    const str = String(dobString).trim();
    // Match any 3 groups of digits (e.g. 2005-01-20, 01/20/2005, 20/01/2005, 2005.01.20)
    const nums = str.match(/\d+/g);
    if (nums && nums.length >= 3) {
      const n0 = parseInt(nums[0], 10);
      const n1 = parseInt(nums[1], 10);
      const n2 = parseInt(nums[2], 10);

      if (n0 > 31) {
        // Format: YYYY-MM-DD or YYYY/MM/DD
        year = n0;
        month = n1;
        day = n2;
      } else if (n2 > 31) {
        // Format with Year at end (e.g. DD/MM/YYYY or MM/DD/YYYY)
        year = n2;
        if (n0 > 12) {
          // First number is definitely Day (e.g. 20/01/2005)
          day = n0;
          month = n1;
        } else if (n1 > 12) {
          // Second number is definitely Day (e.g. 01/20/2005)
          month = n0;
          day = n1;
        } else {
          // Ambiguous (both <= 12): check standard US mm/dd/yyyy vs dd/mm/yyyy
          month = n0;
          day = n1;
        }
      } else {
        year = n0;
        month = n1;
        day = n2;
      }
    }

    if (isNaN(year) || year < 1850 || year > 2150) year = 1995;
    if (isNaN(month) || month < 1 || month > 12) month = 11;
    if (isNaN(day) || day < 1 || day > 31) day = 14;

    return { year, month, day };
  }

  function generateCosmicProfile(name, dobString, tobString, pobString) {
    const cleanName = (name || 'Cosmic Traveler').trim();
    const { year, month, day } = parseDateCoordinates(dobString);

    const zodiac = getZodiacSign(month, day);
    const article = /^[AEIOU]/i.test(zodiac.sign) ? 'AN' : 'A';

    const lifePath = calculateLifePath(year, month, day);
    const destiny = calculateDestiny(cleanName);
    const career = calculateCareerTendencies(zodiac, lifePath);
    const luckyNumbers = calculateLuckyNumbers(lifePath.number, destiny.number, day);
    const luckyColors = calculateLuckyColors(zodiac.element, lifePath.number);
    const quote = getPersonalizedQuote(zodiac, lifePath);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${day < 10 ? '0' + day : day} ${months[month - 1] || 'November'} ${year}`;
    const tob = (tobString || '10:00').trim();
    const pob = (pobString || 'Celestial Horizon').trim();

    return {
      name: cleanName,
      dob: dobString,
      tob: tob,
      pob: pob,
      formattedDate: formattedDate,
      zodiac: zodiac,
      article: article,
      lifePath: lifePath,
      destiny: destiny,
      career: career,
      luckyNumbers: luckyNumbers,
      luckyColors: luckyColors,
      quote: quote
    };
  }

  function escPdf(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Generates and downloads a high-fidelity 2-page Cosmic Reading PDF
   * Matching the V STAR luxury dark celestial gold branding
   */
  function exportCosmicPdf(p, btnElement) {
    if (!p) return;

    var originalBtnHtml = '';
    if (btnElement) {
      originalBtnHtml = btnElement.innerHTML;
      btnElement.disabled = true;
      btnElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
    }

    try {
      // Visual feedback overlay so user sees active generation
      var overlay = document.createElement('div');
      overlay.id = 'vstar-pdf-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(5, 3, 15, 0.78)';
      overlay.style.backdropFilter = 'blur(6px)';
      overlay.style.zIndex = '999998';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.color = '#dfb872';
      overlay.style.fontFamily = "'Cinzel', Georgia, serif";
      overlay.innerHTML = `
        <div style="text-align: center; padding: 24px;">
          <div style="font-size: 38px; color: #dfb872; margin-bottom: 14px; animation: pulse 1.5s infinite;">✦ ◈ ✦</div>
          <div style="font-size: 17px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;">GENERATING SACRED BLUEPRINT</div>
          <div style="font-size: 13px; color: #a2acc7; margin-top: 10px; font-family: 'Plus Jakarta Sans', sans-serif;">Formatting planetary ephemeris houses &amp; high-res PDF...</div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Create hidden offscreen wrapper and in-flow PDF container
      var wrapper = document.createElement('div');
      wrapper.id = 'vstar-pdf-hidden-wrapper';
      wrapper.style.position = 'absolute';
      wrapper.style.left = '0';
      wrapper.style.top = '-99999px';
      wrapper.style.width = '750px';
      wrapper.style.height = 'auto';
      wrapper.style.overflow = 'hidden';

      var container = document.createElement('div');
      container.id = 'vstar-pdf-render-box';
      container.style.width = '740px';
      container.style.position = 'relative';
      container.style.backgroundColor = '#0b0f19';
      container.style.color = '#f1f3f9';
      container.style.fontFamily = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
      container.style.padding = '0';
      container.style.margin = '0';
      container.style.boxSizing = 'border-box';

      wrapper.appendChild(container);
      document.body.appendChild(wrapper);

      var currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

      container.innerHTML = `
        <div style="background: #0b0f19; color: #f1f3f9; box-sizing: border-box; width: 740px; margin: 0; padding: 0;">
          <!-- PAGE 1 -->
          <div style="box-sizing: border-box; width: 740px; padding: 26px 30px; background: #0b0f19;">
            <div>
              <!-- HEADER BAR -->
              <table style="width: 100%; border-bottom: 2px solid #dfb872; padding-bottom: 14px; margin-bottom: 18px; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="font-family: 'Cinzel', Georgia, serif; font-size: 21px; font-weight: 800; letter-spacing: 2px; color: #dfb872; text-transform: uppercase;">
                      V STAR NUMEROLOGY &amp; ASTROLOGY
                    </div>
                    <div style="font-size: 11px; letter-spacing: 1.5px; color: #c8d0e7; text-transform: uppercase; margin-top: 4px;">
                      Sacred Numerology Blueprint &middot; Ephemeris Astrological Report
                    </div>
                  </td>
                  <td style="text-align: right; vertical-align: middle; font-size: 10px; color: #a2acc7; line-height: 1.5;">
                    <div>Vivian Press Garden, Dindigul, Tamil Nadu 624001</div>
                    <div><strong style="color: #dfb872;">+91 93608 81788</strong> | <strong style="color: #dfb872;">+91 74492 48588</strong></div>
                    <div style="color: #dfb872;">www.vstarnumerology.com</div>
                  </td>
                </tr>
              </table>

              <!-- HERO CLIENT BANNER -->
              <div style="background: linear-gradient(135deg, rgba(223, 184, 114, 0.12) 0%, rgba(24, 29, 46, 0.95) 100%); border: 1px solid rgba(223, 184, 114, 0.4); border-radius: 12px; padding: 18px 22px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 10px; font-weight: 700; letter-spacing: 3px; color: #dfb872; text-transform: uppercase; margin-bottom: 6px;">
                  YOUR PERSONALIZED COSMIC SNAPSHOT
                </div>
                <div style="font-family: 'Cinzel', Georgia, serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.8px; margin-bottom: 6px;">
                  <span style="color: #dfb872;">${escPdf(p.name.toUpperCase())}</span>, THE COSMOS SEES YOU AS ${p.article} <span style="color: #dfb872;">${p.zodiac.sign.toUpperCase()}</span>.
                </div>
                <div style="font-size: 12px; color: #c8d0e7;">
                  Born <strong>${p.formattedDate}</strong> at <strong>${p.tob}</strong> &middot; <strong>${escPdf(p.pob)}</strong>
                </div>
              </div>

              <!-- CORE NUMBERS (2 COLUMNS) -->
              <table style="width: 100%; border-collapse: separate; border-spacing: 12px; margin-left: -12px; margin-right: -12px; margin-bottom: 14px;">
                <tr>
                  <td style="width: 50%; vertical-align: top; background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 16px;">
                    <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #dfb872; text-transform: uppercase; margin-bottom: 10px;">
                      CORE LIFE PATH NUMBER
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 52px; vertical-align: top;">
                          <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #dfb872 0%, #c4994e 100%); color: #0b071c; font-family: 'Cinzel', Georgia, serif; font-size: 24px; font-weight: 800; line-height: 48px; text-align: center;">
                            ${p.lifePath.number}
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 10px;">
                          <div style="font-family: 'Cinzel', Georgia, serif; font-size: 13px; font-weight: 700; color: #ffffff;">
                            ${p.lifePath.archetype}
                          </div>
                          <div style="font-size: 11px; color: #c8d0e7; margin-top: 4px; line-height: 1.4;">
                            ${p.lifePath.summary}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="width: 50%; vertical-align: top; background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 16px;">
                    <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #dfb872; text-transform: uppercase; margin-bottom: 10px;">
                      DESTINY EXPRESSION NUMBER
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 52px; vertical-align: top;">
                          <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #dfb872 0%, #c4994e 100%); color: #0b071c; font-family: 'Cinzel', Georgia, serif; font-size: 24px; font-weight: 800; line-height: 48px; text-align: center;">
                            ${p.destiny.number}
                          </div>
                        </td>
                        <td style="vertical-align: top; padding-left: 10px;">
                          <div style="font-family: 'Cinzel', Georgia, serif; font-size: 13px; font-weight: 700; color: #ffffff;">
                            ${p.destiny.archetype}
                          </div>
                          <div style="font-size: 11px; color: #c8d0e7; margin-top: 4px; line-height: 1.4;">
                            ${p.destiny.description}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ZODIAC OVERVIEW CARD -->
              <div style="background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 18px; margin-bottom: 16px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="width: 60px; vertical-align: top; text-align: center;">
                      <div style="font-size: 40px; line-height: 44px; color: #dfb872;">${p.zodiac.symbol}</div>
                    </td>
                    <td style="vertical-align: top; padding-left: 14px;">
                      <div style="display: flex; align-items: baseline; gap: 10px;">
                        <span style="font-family: 'Cinzel', Georgia, serif; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: 1px;">
                          ${p.zodiac.sign.toUpperCase()}
                        </span>
                        <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #dfb872; text-transform: uppercase;">
                          ${p.zodiac.element.toUpperCase()} &middot; RULED BY ${p.zodiac.rulingPlanet.toUpperCase()}
                        </span>
                      </div>
                      <div style="font-style: italic; color: #f1f3f9; font-size: 12px; margin-top: 4px; margin-bottom: 8px;">
                        "${p.zodiac.tagline}"
                      </div>
                      <div style="font-size: 11px; color: #c8d0e7; margin-bottom: 5px;">
                        <strong style="color: #dfb872;">Strengths &middot; </strong> ${p.zodiac.strengths.join(' &middot; ')}
                      </div>
                      <div style="font-size: 11px; color: #c8d0e7; line-height: 1.4;">
                        <strong style="color: #dfb872;">Today's Planetary Energy &middot; </strong> ${p.zodiac.todayEnergy}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- PAGE 1 FOOTER -->
            <div style="border-top: 1px solid rgba(223, 184, 114, 0.25); padding-top: 12px; margin-top: 24px; font-size: 10px; color: #8893b0; display: table; width: 100%;">
              <div style="display: table-cell; text-align: left; vertical-align: middle;">V STAR Numerology &amp; Astrology &middot; Confidential Snapshot</div>
              <div style="display: table-cell; text-align: right; vertical-align: middle;">Document Page 1 of 2</div>
            </div>
          </div>

          <!-- HARD PAGE BREAK -->
          <div class="html2pdf__page-break" style="page-break-before: always; height: 1px; line-height: 1px; margin: 0; padding: 0;"></div>

          <!-- PAGE 2 -->
          <div style="box-sizing: border-box; width: 740px; padding: 26px 30px; background: #0b0f19;">
            <div>
              <!-- PAGE 2 TOP BAR -->
              <div style="border-bottom: 1px solid rgba(223, 184, 114, 0.25); padding-bottom: 10px; margin-bottom: 18px; display: table; width: 100%; font-size: 11px; color: #a2acc7;">
                <div style="display: table-cell; text-align: left; vertical-align: middle;">
                  <span style="font-family: 'Cinzel', Georgia, serif; font-weight: 700; color: #dfb872; letter-spacing: 1.5px;">
                    V STAR &middot; DESTINY &amp; VOCATIONAL BLUEPRINT
                  </span>
                </div>
                <div style="display: table-cell; text-align: right; vertical-align: middle;">
                  Client: <strong style="color: #ffffff;">${escPdf(p.name)}</strong>
                </div>
              </div>

              <!-- CAREER TENDENCIES -->
              <div style="background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 18px; margin-bottom: 16px;">
                <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #dfb872; text-transform: uppercase; margin-bottom: 8px;">
                  CAREER TENDENCIES &amp; VOCATIONAL ALIGNMENT
                </div>
                <p style="font-size: 12px; color: #e1e6f5; line-height: 1.55; margin: 0 0 10px 0;">
                  ${p.career.insight}
                </p>
                <div style="font-size: 11px; color: #c8d0e7; margin-bottom: 5px;">
                  <strong style="color: #dfb872;">Roles to Explore:</strong> ${p.career.roles.join(', ')}
                </div>
                <div style="font-size: 11px; color: #c8d0e7;">
                  <strong style="color: #dfb872;">Learning &amp; Execution Style:</strong> ${p.career.learningStyle}
                </div>
              </div>

              <!-- LIFE PATH INDICATORS -->
              <div style="background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 18px; margin-bottom: 16px;">
                <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #dfb872; text-transform: uppercase; margin-bottom: 10px;">
                  LIFE PATH INDICATORS &amp; SACRED BLUEPRINT
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.5;">
                  <tr>
                    <td style="width: 50%; vertical-align: top; padding-right: 14px;">
                      <div style="color: #dfb872; font-weight: 700; text-transform: uppercase; font-size: 10px; margin-bottom: 5px;">
                        Core Strengths:
                      </div>
                      ${p.lifePath.strengths.map(s => '<div style="margin-bottom: 4px; color: #c8d0e7;">✦ ' + escPdf(s) + '</div>').join('')}
                    </td>
                    <td style="width: 50%; vertical-align: top; padding-left: 14px; border-left: 1px solid rgba(223, 184, 114, 0.2);">
                      <div style="color: #dfb872; font-weight: 700; text-transform: uppercase; font-size: 10px; margin-bottom: 5px;">
                        Growth &amp; Expansion Areas:
                      </div>
                      ${p.lifePath.growthAreas.map(g => '<div style="margin-bottom: 4px; color: #c8d0e7;">✦ ' + escPdf(g) + '</div>').join('')}
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(223, 184, 114, 0.15); font-size: 11px; color: #c8d0e7;">
                  <strong style="color: #dfb872;">Sacred Essence:</strong> ${p.lifePath.essence}
                </div>
              </div>

              <!-- LUCKY NUMBERS & COLORS (2 COLUMNS) -->
              <table style="width: 100%; border-collapse: separate; border-spacing: 12px; margin-left: -12px; margin-right: -12px; margin-bottom: 16px;">
                <tr>
                  <!-- LUCKY NUMBERS -->
                  <td style="width: 50%; vertical-align: top; background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 16px;">
                    <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #dfb872; text-transform: uppercase; margin-bottom: 12px;">
                      HARMONIOUS LUCKY NUMBERS
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-start; flex-wrap: wrap;">
                      ${p.luckyNumbers.map(n => `
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #dfb872 0%, #c4994e 100%); color: #0b071c; font-family: 'Cinzel', Georgia, serif; font-size: 17px; font-weight: 800; line-height: 36px; text-align: center;">
                          ${n}
                        </div>
                      `).join('')}
                    </div>
                  </td>
                  <!-- LUCKY COLORS -->
                  <td style="width: 50%; vertical-align: top; background: #121727; border: 1px solid rgba(223, 184, 114, 0.3); border-radius: 10px; padding: 16px;">
                    <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #dfb872; text-transform: uppercase; margin-bottom: 10px;">
                      SACRED RESONANCE COLORS
                    </div>
                    <div style="font-size: 11px; line-height: 1.8;">
                      ${p.luckyColors.map(c => `
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${c.hex}; border: 1px solid #dfb872;"></span>
                          <span style="color: #ffffff; font-weight: 500;">${escPdf(c.name)}</span>
                        </div>
                      `).join('')}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- PERSONALIZED GUIDANCE QUOTE -->
              <div style="background: linear-gradient(135deg, rgba(224, 109, 45, 0.12) 0%, rgba(223, 184, 114, 0.12) 100%); border: 1px solid rgba(223, 184, 114, 0.4); border-radius: 10px; padding: 16px 20px; text-align: center; margin-bottom: 16px;">
                <div style="font-size: 14px; color: #dfb872; margin-bottom: 4px;">✦ ◈ ✦</div>
                <div style="font-family: 'Cinzel', Georgia, serif; font-size: 13px; font-style: italic; color: #ffffff; line-height: 1.5; letter-spacing: 0.3px;">
                  "${p.quote}"
                </div>
              </div>
            </div>

            <!-- PAGE 2 FOOTER & VERIFICATION -->
            <div style="border-top: 1px solid rgba(223, 184, 114, 0.3); padding-top: 12px; margin-top: 20px; display: table; width: 100%;">
              <div style="display: table-cell; vertical-align: top; font-size: 9px; color: #8893b0; line-height: 1.4;">
                <strong>Disclaimer:</strong> For personal guidance and self-reflection only. Does not replace professional medical, legal, or financial counsel.<br>
                Issued by <strong>V STAR Numerology &amp; Astrology</strong> &middot; Vivian Press Garden, Dindigul, Tamil Nadu 624001.
              </div>
              <div style="display: table-cell; vertical-align: top; text-align: right; font-size: 9px; color: #dfb872; white-space: nowrap; padding-left: 16px;">
                <div style="font-weight: 700; letter-spacing: 1px;">OFFICIALLY VERIFIED</div>
                <div style="color: #8893b0;">Date: ${currentDate}</div>
              </div>
            </div>
          </div>
        </div>
      `;

      function cleanupPdfDom() {
        if (overlay && document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        if (wrapper && document.body.contains(wrapper)) {
          document.body.removeChild(wrapper);
        }
        if (btnElement) {
          btnElement.disabled = false;
          btnElement.innerHTML = originalBtnHtml;
        }
      }

      // PDF options with high-resolution canvas capture
      var filename = 'VSTAR_Cosmic_Reading_' + (p.name ? p.name.trim().replace(/\s+/g, '_') : 'Seeker') + '.pdf';
      var opt = {
        margin: [4, 4, 4, 4],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0b0f19',
          scrollX: 0,
          scrollY: 0,
          logging: false
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      var isFinished = false;
      var timeoutTimer = setTimeout(function() {
        if (!isFinished) {
          isFinished = true;
          cleanupPdfDom();
          fallbackPrintPdf(p, btnElement, originalBtnHtml);
        }
      }, 7000);

      if (window.html2pdf) {
        window.html2pdf().set(opt).from(container).save().then(function() {
          if (isFinished) return;
          isFinished = true;
          clearTimeout(timeoutTimer);
          cleanupPdfDom();
          if (typeof window.showToast === 'function') {
            window.showToast('Your Cosmic Reading PDF has been downloaded successfully!', 'success');
          }
        }).catch(function(err) {
          if (isFinished) return;
          isFinished = true;
          clearTimeout(timeoutTimer);
          console.error('html2pdf generation error:', err);
          cleanupPdfDom();
          fallbackPrintPdf(p, btnElement, originalBtnHtml);
        });
      } else {
        clearTimeout(timeoutTimer);
        cleanupPdfDom();
        fallbackPrintPdf(p, btnElement, originalBtnHtml);
      }
    } catch (err) {
      console.error('exportCosmicPdf caught error:', err);
      if (typeof cleanupPdfDom === 'function') cleanupPdfDom();
      fallbackPrintPdf(p, btnElement, originalBtnHtml);
    }
  }

  function fallbackPrintPdf(p, btnElement, originalBtnHtml) {
    if (btnElement) {
      btnElement.disabled = false;
      btnElement.innerHTML = originalBtnHtml;
    }

    // Try popup window first
    var printWin = null;
    try {
      printWin = window.open('', '_blank');
    } catch (e) {
      printWin = null;
    }

    var reportHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>V STAR Cosmic Reading - ${escPdf(p.name)}</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #0b0f19; color: #f1f3f9; padding: 24px; margin: 0; line-height: 1.6; }
    .pdf-wrap { max-width: 780px; margin: 0 auto; }
    h1, h2, h3 { color: #dfb872; font-family: Georgia, serif; }
    .card { background: #121727; border: 1px solid rgba(223, 184, 114, 0.4); border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .badge { display: inline-block; width: 36px; height: 36px; border-radius: 50%; background: #dfb872; color: #0b071c; text-align: center; line-height: 36px; font-weight: bold; margin-right: 8px; }
    .btn-print { display: inline-block; background: #dfb872; color: #0b0f19; padding: 10px 20px; font-weight: bold; border-radius: 6px; text-decoration: none; margin-bottom: 20px; cursor: pointer; border: none; }
    @media print {
      body { background: #ffffff !important; color: #111111 !important; }
      .card { background: #fdfdfd !important; border: 1px solid #ccc !important; color: #111111 !important; }
      h1, h2, h3 { color: #885e13 !important; }
      .btn-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="pdf-wrap">
    <button class="btn-print" onclick="window.print()">✦ Print / Save as PDF</button>
    <h2>V STAR NUMEROLOGY & ASTROLOGY</h2>
    <p>Personalized Cosmic Snapshot for <strong>${escPdf(p.name)}</strong></p>
    <div class="card">
      <h3>${p.article} ${p.zodiac.sign.toUpperCase()} (${p.zodiac.symbol})</h3>
      <p><strong>Born:</strong> ${p.formattedDate} at ${p.tob} &middot; ${escPdf(p.pob)}</p>
      <p><strong>Element & Ruler:</strong> ${p.zodiac.element} &middot; Ruled by ${p.zodiac.rulingPlanet}</p>
      <p><strong>Life Path:</strong> ${p.lifePath.number} &mdash; ${p.lifePath.archetype}</p>
      <p><strong>Destiny:</strong> ${p.destiny.number} &mdash; ${p.destiny.archetype}</p>
    </div>
    <div class="card">
      <h3>Career &amp; Vocational Alignment</h3>
      <p>${p.career.insight}</p>
      <p><strong>Roles to explore:</strong> ${p.career.roles.join(', ')}</p>
      <p><strong>Learning style:</strong> ${p.career.learningStyle}</p>
    </div>
    <div class="card">
      <h3>Sacred Resonance</h3>
      <p><strong>Lucky Numbers:</strong> ${p.luckyNumbers.join(', ')}</p>
      <p><strong>Lucky Colors:</strong> ${p.luckyColors.map(c => c.name).join(', ')}</p>
    </div>
    <div class="card">
      <p><em>"${p.quote}"</em></p>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

    if (printWin) {
      try {
        printWin.document.write(reportHtml);
        printWin.document.close();
        return;
      } catch (e) {}
    }

    // Direct HTML/Text download if popup is blocked
    try {
      var blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'VSTAR_Cosmic_Reading_' + (p.name ? p.name.trim().replace(/\s+/g, '_') : 'Seeker') + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (typeof window.showToast === 'function') {
        window.showToast('Reading report downloaded! Open file to view & Save as PDF.', 'success');
      }
    } catch (err) {
      if (typeof window.showToast === 'function') {
        window.showToast('Please enable popups or downloads to save your PDF reading.', 'warning');
      }
    }
  }

  window.CosmicEngine = {
    generateCosmicProfile: generateCosmicProfile,
    getZodiacSign: getZodiacSign,
    calculateLifePath: calculateLifePath,
    calculateDestiny: calculateDestiny,
    exportCosmicPdf: exportCosmicPdf
  };

})(window);
