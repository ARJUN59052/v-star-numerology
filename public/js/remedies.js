/**
 * V STAR Numerology & Astrology - Sacred Remedy & Ratna Recommender
 * Classical Vedic Ephemeris & Ratna Pariksha Engine
 */

(function(window) {
  'use strict';

  // 1. Graha & Ratna Database (9 Planets)
  const GRAHA_REMEDY_DATABASE = {
    1: {
      number: 1,
      planet: 'Sun',
      sanskritPlanet: 'Surya (सूर्य)',
      gemstone: 'Natural Ruby',
      sanskritGem: 'Manikya / Padmaraga (माणिक्य)',
      symbol: '☉',
      element: 'Agni (Fire)',
      primaryColor: '#e11d48',
      metal: '22K Gold or Pure Copper',
      finger: 'Ring Finger (Right Hand / Anamika)',
      dayHora: 'Sunday Morning during Surya Hora (Within 1 hr after Sunrise)',
      rudraksha: '1 Mukhi (Ek Mukhi) or 12 Mukhi (Barah Mukhi Surya)',
      rudrakshaName: '1 or 12 Mukhi Rudraksha',
      yantra: 'Consecrated Surya Yantra',
      yantraPlacement: 'East / North-East Altar at Eye Level on Red Silk Cloth',
      beejMantra: 'Om Hram Hreem Hroum Sah Suryaya Namah',
      devata: 'Lord Surya Narayana',
      intentions: {
        wealth: 'Activates sovereign career authority, government favor, and executive leadership prosperity.',
        love: 'Fosters noble respect, mutual admiration, and removes ego conflicts from marriage.',
        health: 'Boosts cardiac vitality, solar plexus prana, eye strength, and physical endurance.',
        spiritual: 'Awakens Atma-Jnana (Self-realization), radiant confidence, and solar illumination.'
      }
    },
    2: {
      number: 2,
      planet: 'Moon',
      sanskritPlanet: 'Chandra (चन्द्र)',
      gemstone: 'Natural South Sea Pearl',
      sanskritGem: 'Moti / Mukta (मोती)',
      symbol: '☽',
      element: 'Jala (Water)',
      primaryColor: '#e0e7ff',
      metal: 'Pure Silver (Chandi)',
      finger: 'Little Finger (Kanishtha)',
      dayHora: 'Monday Morning during Chandra Hora (At Sunrise / Shukla Paksha)',
      rudraksha: '2 Mukhi (Do-Mukhi Ardhanarishwara)',
      rudrakshaName: '2 Mukhi Rudraksha',
      yantra: 'Consecrated Chandra Yantra',
      yantraPlacement: 'North-West or North Altar on White Silk Cloth',
      beejMantra: 'Om Shram Shreem Shroum Sah Chandraya Namah',
      devata: 'Lord Chandra & Goddess Parvati',
      intentions: {
        wealth: 'Stabilizes fluctuating revenues, nurtures business partnerships, and inspires artistic profits.',
        love: 'Deepens emotional empathy, heals intimacy wounds, and restores gentle marital peace.',
        health: 'Harmonizes lymphatic fluids, psychological tranquility, sleep quality, and digestion.',
        spiritual: 'Awakens psychic intuition, meditative stillness, and devotion (Bhakti).'
      }
    },
    3: {
      number: 3,
      planet: 'Jupiter',
      sanskritPlanet: 'Guru / Brihaspati (गुरु)',
      gemstone: 'Natural Ceylon Yellow Sapphire',
      sanskritGem: 'Pukhraj / Pushparaga (पुखराज)',
      symbol: '♃',
      element: 'Akasha (Ether)',
      primaryColor: '#facc15',
      metal: '22K Gold or Panchdhatu',
      finger: 'Index Finger (Tarjani)',
      dayHora: 'Thursday Morning during Guru Hora (Shukla Paksha)',
      rudraksha: '5 Mukhi (Pancha-Mukhi Rudra)',
      rudrakshaName: '5 Mukhi Rudraksha',
      yantra: 'Consecrated Brihaspati Yantra',
      yantraPlacement: 'North-East (Ishanya) Altar on Yellow Cloth',
      beejMantra: 'Om Gram Greem Groum Sah Gurave Namah',
      devata: 'Lord Brihaspati & Lord Shiva',
      intentions: {
        wealth: 'Magnifies enterprise expansion, investment acumen, wealth houses, and financial windfall.',
        love: 'Attracts an honorable life partner, marital sanctity, and blessed family lineage.',
        health: 'Fortifies liver function, cellular longevity, metabolic balance, and positive aura.',
        spiritual: 'Deepens dharmic wisdom, scriptural mastery, and divine Guru grace.'
      }
    },
    4: {
      number: 4,
      planet: 'Rahu',
      sanskritPlanet: 'Rahu (राहु)',
      gemstone: 'Natural Hessonite Garnet',
      sanskritGem: 'Gomed / Gomedha (गोमेद)',
      symbol: '☊',
      element: 'Vayu (Air/Shadow)',
      primaryColor: '#c2410c',
      metal: 'Pure Silver or Ashtadhatu',
      finger: 'Middle Finger (Madhyama)',
      dayHora: 'Saturday Evening during Rahu/Shani Hora (After Sunset)',
      rudraksha: '8 Mukhi (Ashta-Mukhi Ganesha)',
      rudrakshaName: '8 Mukhi Rudraksha',
      yantra: 'Consecrated Rahu Yantra',
      yantraPlacement: 'South-West Direction Altar on Dark Blue or Black Cloth',
      beejMantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
      devata: 'Lord Ganesha & Goddess Saraswati',
      intentions: {
        wealth: 'Neutralizes sudden commercial obstacles, ignites technological, trading, and foreign gains.',
        love: 'Clears karmic misunderstandings, illusions, and ungrounded romantic obsessions.',
        health: 'Soothes nervous system anxiety, phobias, and unexplained psychosomatic fatigue.',
        spiritual: 'Dissolves material maya, develops occult shields, and awakens rapid kundalini breakthroughs.'
      }
    },
    5: {
      number: 5,
      planet: 'Mercury',
      sanskritPlanet: 'Budha (बुध)',
      gemstone: 'Natural Emerald',
      sanskritGem: 'Panna / Markata (पन्ना)',
      symbol: '☿',
      element: 'Prithvi (Earth)',
      primaryColor: '#10b981',
      metal: 'Gold or Panchdhatu',
      finger: 'Little Finger (Kanishtha)',
      dayHora: 'Wednesday Morning during Budha Hora',
      rudraksha: '4 Mukhi (Char-Mukhi Brahma)',
      rudrakshaName: '4 Mukhi Rudraksha',
      yantra: 'Consecrated Budha Yantra',
      yantraPlacement: 'North Direction Altar on Green Silk Cloth',
      beejMantra: 'Om Bram Breem Broum Sah Budhaya Namah',
      devata: 'Lord Budha & Lord Vishnu',
      intentions: {
        wealth: 'Sharpens commercial negotiation, trading profits, analytical intellect, and venture marketing.',
        love: 'Enriches witty, stimulating communication and heals misunderstandings in couplehood.',
        health: 'Calms nervous system tremors, skin allergies, respiratory health, and mental sharpness.',
        spiritual: 'Cultivates Buddhi (discriminative intellect), discernment, and mantra siddhi.'
      }
    },
    6: {
      number: 6,
      planet: 'Venus',
      sanskritPlanet: 'Shukra (शुक्र)',
      gemstone: 'Natural Diamond / White Sapphire',
      sanskritGem: 'Heera / Safed Pukhraj (हीरा)',
      symbol: '♀',
      element: 'Jala (Water)',
      primaryColor: '#e0f2fe',
      metal: 'Platinum, White Gold, or Pure Silver',
      finger: 'Middle or Ring Finger',
      dayHora: 'Friday Morning during Shukra Hora (Sunrise)',
      rudraksha: '6 Mukhi (Shad-Mukhi Kartikeya)',
      rudrakshaName: '6 Mukhi Rudraksha',
      yantra: 'Consecrated Shukra Yantra',
      yantraPlacement: 'South-East (Agneya) Altar on White or Silk Cloth',
      beejMantra: 'Om Dram Dreem Droum Sah Shukraya Namah',
      devata: 'Lord Shukracharya & Goddess Mahalakshmi',
      intentions: {
        wealth: 'Draws opulence, luxury assets, creative monetization, and magnetic brand appeal.',
        love: 'Deepens marital passion, mutual attraction, aesthetic harmony, and relationship bliss.',
        health: 'Harmonizes reproductive hormonal health, kidney vitality, and youthful radiant skin.',
        spiritual: 'Transforms sensory desire into divine aesthetic devotion and universal unconditional love.'
      }
    },
    7: {
      number: 7,
      planet: 'Ketu',
      sanskritPlanet: 'Ketu (केतु)',
      gemstone: 'Chrysoberyl Cat’s Eye',
      sanskritGem: 'Lehsunia / Vaidurya (लहसुनिया)',
      symbol: '☋',
      element: 'Agni (Spiritual Fire)',
      primaryColor: '#84cc16',
      metal: 'Pure Silver or Panchdhatu',
      finger: 'Middle or Little Finger',
      dayHora: 'Tuesday or Thursday Night (During Ketu Hora / Dasha)',
      rudraksha: '9 Mukhi (Nau-Mukhi Durga)',
      rudrakshaName: '9 Mukhi Rudraksha',
      yantra: 'Consecrated Ketu Yantra',
      yantraPlacement: 'North-East Direction Altar on Smoky or Multi-Colored Cloth',
      beejMantra: 'Om Sram Sreem Sroum Sah Ketave Namah',
      devata: 'Lord Ganesha & Matsya Avatar',
      intentions: {
        wealth: 'Shields earned wealth from sudden theft, deceit, and speculative collapse.',
        love: 'Removes toxic karmic bonds, detachments, and spiritual codependency.',
        health: 'Strengthens spine, nervous meridians, and guards against obscure illnesses.',
        spiritual: 'Accelerates Moksha (liberation), yogic ascension, and third-eye clairvoyance.'
      }
    },
    8: {
      number: 8,
      planet: 'Saturn',
      sanskritPlanet: 'Shani (शनि)',
      gemstone: 'Natural Blue Sapphire / Amethyst',
      sanskritGem: 'Neelam / Katela (नीलम)',
      symbol: '♄',
      element: 'Vayu (Air)',
      primaryColor: '#3b82f6',
      metal: 'Pure Silver, Panchdhatu, or Iron',
      finger: 'Middle Finger (Madhyama)',
      dayHora: 'Saturday Evening during Shani Hora (At Sunset)',
      rudraksha: '7 Mukhi (Sapta-Mukhi Mahalakshmi) or 14 Mukhi',
      rudrakshaName: '7 or 14 Mukhi Rudraksha',
      yantra: 'Consecrated Shani Yantra',
      yantraPlacement: 'West Direction Altar on Dark Blue or Black Cloth',
      beejMantra: 'Om Pram Preem Proum Sah Shanaischaraya Namah',
      devata: 'Lord Shani & Lord Hanuman',
      intentions: {
        wealth: 'Builds generational legacy, massive industrial/real-estate enterprise, and karmic prosperity.',
        love: 'Instills steadfast loyalty, enduring patience, and weathering life’s trials together.',
        health: 'Strengthens bone density, teeth, neuromuscular joints, and chronic resilience.',
        spiritual: 'Instills profound detachment (Vairagya), karmic debt purification, and meditative mastery.'
      }
    },
    9: {
      number: 9,
      planet: 'Mars',
      sanskritPlanet: 'Mangal (मंगल)',
      gemstone: 'Natural Italian Red Coral',
      sanskritGem: 'Moonga / Praval (मूंगा)',
      symbol: '♂',
      element: 'Agni (Fire)',
      primaryColor: '#ef4444',
      metal: 'Copper or 22K Gold',
      finger: 'Ring Finger (Right Hand / Anamika)',
      dayHora: 'Tuesday Morning during Mangal Hora',
      rudraksha: '3 Mukhi (Teen-Mukhi Agni)',
      rudrakshaName: '3 Mukhi Rudraksha',
      yantra: 'Consecrated Mangal Yantra',
      yantraPlacement: 'South Direction Altar on Bright Red Cloth',
      beejMantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
      devata: 'Lord Mangala & Lord Kartikeya',
      intentions: {
        wealth: 'Drives pioneering courage, commercial victory over competitors, and property acquisition.',
        love: 'Balances Manglik sensitivities, ignites healthy passion, and burns away passive inertia.',
        health: 'Boosts hemoglobin, muscular vitality, bone marrow, and regenerative stamina.',
        spiritual: 'Ignites Kundalini Agni, burns away karmic lethargy, and shields against psychic negativity.'
      }
    }
  };

  // 2. Rashi to Ruling Planet Database (12 Signs)
  const RASHI_DATABASE = {
    Aries: { name: 'Aries', sanskrit: 'Mesha (मेष)', ruler: 'Mars', element: 'Fire' },
    Taurus: { name: 'Taurus', sanskrit: 'Vrishabha (वृषभ)', ruler: 'Venus', element: 'Earth' },
    Gemini: { name: 'Gemini', sanskrit: 'Mithuna (मिथुन)', ruler: 'Mercury', element: 'Air' },
    Cancer: { name: 'Cancer', sanskrit: 'Karka (कर्क)', ruler: 'Moon', element: 'Water' },
    Leo: { name: 'Leo', sanskrit: 'Simha (सिंह)', ruler: 'Sun', element: 'Fire' },
    Virgo: { name: 'Virgo', sanskrit: 'Kanya (कन्या)', ruler: 'Mercury', element: 'Earth' },
    Libra: { name: 'Libra', sanskrit: 'Tula (तुला)', ruler: 'Venus', element: 'Air' },
    Scorpio: { name: 'Scorpio', sanskrit: 'Vrischika (वृश्चिक)', ruler: 'Mars', element: 'Water' },
    Sagittarius: { name: 'Sagittarius', sanskrit: 'Dhanu (धनु)', ruler: 'Jupiter', element: 'Fire' },
    Capricorn: { name: 'Capricorn', sanskrit: 'Makara (मकर)', ruler: 'Saturn', element: 'Earth' },
    Aquarius: { name: 'Aquarius', sanskrit: 'Kumbha (कुम्भ)', ruler: 'Saturn', element: 'Air' },
    Pisces: { name: 'Pisces', sanskrit: 'Meena (मीन)', ruler: 'Jupiter', element: 'Water' }
  };

  // 3. Vedic Naisargika Planetary Friendship Matrix
  const PLANET_RELATIONSHIPS = {
    Sun: {
      friends: ['Moon', 'Mars', 'Jupiter'],
      enemies: ['Venus', 'Saturn', 'Rahu', 'Ketu'],
      neutrals: ['Mercury']
    },
    Moon: {
      friends: ['Sun', 'Mercury'],
      enemies: ['Rahu', 'Ketu'],
      neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn']
    },
    Mars: {
      friends: ['Sun', 'Moon', 'Jupiter', 'Ketu'],
      enemies: ['Mercury', 'Rahu'],
      neutrals: ['Venus', 'Saturn']
    },
    Mercury: {
      friends: ['Sun', 'Venus', 'Rahu'],
      enemies: ['Moon'],
      neutrals: ['Mars', 'Jupiter', 'Saturn', 'Ketu']
    },
    Jupiter: {
      friends: ['Sun', 'Moon', 'Mars'],
      enemies: ['Mercury', 'Venus'],
      neutrals: ['Saturn', 'Rahu', 'Ketu']
    },
    Venus: {
      friends: ['Mercury', 'Saturn', 'Rahu', 'Ketu'],
      enemies: ['Sun', 'Moon'],
      neutrals: ['Mars', 'Jupiter']
    },
    Saturn: {
      friends: ['Mercury', 'Venus', 'Rahu'],
      enemies: ['Sun', 'Moon', 'Mars'],
      neutrals: ['Jupiter', 'Ketu']
    },
    Rahu: {
      friends: ['Venus', 'Saturn', 'Mercury'],
      enemies: ['Sun', 'Moon', 'Mars'],
      neutrals: ['Jupiter', 'Ketu']
    },
    Ketu: {
      friends: ['Mars', 'Venus', 'Saturn'],
      enemies: ['Sun', 'Moon'],
      neutrals: ['Mercury', 'Jupiter', 'Rahu']
    }
  };

  // Pythagorean / Chaldean Name Reduction
  function calculateDestinyNumber(name) {
    if (!name || typeof name !== 'string') return 1;
    const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
    if (!clean.length) return 1;
    const CHALDEAN_MAP = {
      A:1, I:1, J:1, Q:1, Y:1,
      B:2, K:2, R:2,
      C:3, G:3, L:3, S:3,
      D:4, M:4, T:4,
      E:5, H:5, N:5, X:5,
      U:6, V:6, W:6,
      O:7, Z:7,
      F:8, P:8
    };
    let sum = 0;
    for (let i = 0; i < clean.length; i++) {
      sum += CHALDEAN_MAP[clean[i]] || 1;
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum > 9 ? (sum % 9 || 9) : sum;
  }

  // Life Path Number Calculation (1-9)
  function calculateLifePathNumber(dobString) {
    if (!dobString) return 1;
    const parts = dobString.split(/[-/]/);
    if (parts.length < 3) return 1;
    const [y, m, d] = parts.length === 3 && parts[0].length === 4
      ? [parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)]
      : [parseInt(parts[2], 10), parseInt(parts[1], 10), parseInt(parts[0], 10)];

    function reduceNum(n) {
      while (n > 9) {
        n = String(n).split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
      }
      return n;
    }

    const yearSum = reduceNum(y);
    const monthSum = reduceNum(m);
    const daySum = reduceNum(d);
    return reduceNum(yearSum + monthSum + daySum) || 1;
  }

  // Harmonic Compatibility Evaluator
  function evaluateHarmonicSynergy(lifePathPlanet, rashiPlanet) {
    if (lifePathPlanet === rashiPlanet) {
      return {
        status: 'synergy-high',
        badge: 'High Planetary Synergy',
        type: 'identical',
        icon: 'fa-wand-magic-sparkles',
        summary: `Life Path Graha (${lifePathPlanet}) and Rashi Lord (${rashiPlanet}) are identical. Celestial amplification is at its absolute peak.`
      };
    }
    const rel = PLANET_RELATIONSHIPS[lifePathPlanet];
    if (rel && rel.friends && rel.friends.includes(rashiPlanet)) {
      return {
        status: 'synergy-high',
        badge: 'High Planetary Synergy',
        type: 'friendly',
        icon: 'fa-handshake-angle',
        summary: `Life Path Graha (${lifePathPlanet}) and Rashi Lord (${rashiPlanet}) share an intimate, auspicious Vedic alliance. Rapid results and heightened prana.`
      };
    }
    if (rel && rel.enemies && rel.enemies.includes(rashiPlanet)) {
      return {
        status: 'synergy-caution',
        badge: 'Planetary Friction · Caution Advised',
        type: 'conflicting',
        icon: 'fa-triangle-exclamation',
        summary: `Sacred Caution: ${lifePathPlanet} and ${rashiPlanet} possess conflicting cosmic polarities. Prior to wearing a primary gemstone, Kundli Dasha verification or wearing the recommended Rudraksha/Yantra first is strongly advised.`
      };
    }
    return {
      status: 'synergy-neutral',
      badge: 'Balanced Planetary Synergy',
      type: 'neutral',
      icon: 'fa-scale-balanced',
      summary: `Life Path Graha (${lifePathPlanet}) and Rashi Lord (${rashiPlanet}) maintain a balanced, supportive neutral rapport. Energize during the prescribed hora.`
    };
  }

  // Core Engine: Prescribe Vedic Remedies
  function prescribeVedicRemedies({ name, dob, rashiName, intention, weightKg }) {
    const cleanName = (name || 'Cosmic Traveler').trim();
    const lifePathNum = calculateLifePathNumber(dob);
    const destinyNum = calculateDestinyNumber(cleanName);
    const grahaData = GRAHA_REMEDY_DATABASE[lifePathNum] || GRAHA_REMEDY_DATABASE[1];
    const rashiData = RASHI_DATABASE[rashiName] || RASHI_DATABASE['Capricorn'];
    const synergy = evaluateHarmonicSynergy(grahaData.planet, rashiData.ruler);

    const caratSize = '5.25 – 6.5';
    const rattiSize = '4.75 – 6.0';

    const intentionKey = (intention || 'wealth').toLowerCase();
    const intentionBenefit = grahaData.intentions[intentionKey] || grahaData.intentions.wealth;

    const intentionLabels = {
      wealth: 'Wealth & Career Acceleration',
      love: 'Love & Relational Harmony',
      health: 'Health & Vital Protection',
      spiritual: 'Spiritual Enlightenment & Moksha'
    };

    return {
      name: cleanName,
      dob: dob,
      lifePath: lifePathNum,
      destiny: destinyNum,
      graha: grahaData,
      rashi: rashiData,
      synergy: synergy,
      caratSize: caratSize,
      rattiSize: rattiSize,
      caratStandard: 'Auspicious Adult Standard (5.25 – 6.5 Carats)',
      intentionKey: intentionKey,
      intentionLabel: intentionLabels[intentionKey] || intentionLabels.wealth,
      benefit: intentionBenefit
    };
  }

  // Active in-memory state
  let currentRemedyProfile = null;

  // Render Prescription to UI
  function renderRemedyPrescription(p) {
    currentRemedyProfile = p;

    // 1. Headline & Client Name
    const nameEl = document.getElementById('remedyPrescriptionName');
    if (nameEl) nameEl.textContent = p.name;

    // 2. Synergy Badge & Subtitle
    const synergyBox = document.getElementById('remedySynergyBox');
    if (synergyBox) {
      synergyBox.className = `remedy-synergy-banner ${p.synergy.status}`;
      synergyBox.innerHTML = `
        <div class="synergy-badge-pill">
          <i class="fa-solid ${p.synergy.icon}"></i> ${p.synergy.badge}
        </div>
        <div class="synergy-details-text">
          <strong>${p.graha.planet} (${p.graha.sanskritPlanet})</strong> vs <strong>${p.rashi.ruler} (${p.rashi.sanskrit})</strong>:
          ${p.synergy.summary}
        </div>
      `;
    }

    // 3. Card 1: Primary Ratna
    const gemCard = document.getElementById('remedyGemCard');
    if (gemCard) {
      gemCard.innerHTML = `
        <div class="prescription-card-header">
          <div class="ratna-gem-icon" style="color: ${p.graha.primaryColor}; text-shadow: 0 0 16px ${p.graha.primaryColor}80;">
            <i class="fa-solid fa-gem"></i>
          </div>
          <div class="ratna-title-wrap">
            <span class="ratna-eyebrow">PILLAR 1 · SACRED VEDIC GEMSTONE</span>
            <h4 class="ratna-name">${p.graha.gemstone}</h4>
            <div class="ratna-sanskrit">${p.graha.sanskritGem}</div>
          </div>
        </div>

        <div class="ratna-specs-grid">
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-sun"></i> Ruling Graha</span>
            <span class="spec-val"><strong style="color:var(--gold-champagne);">${p.graha.sanskritPlanet}</strong> (Life Path ${p.lifePath})</span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-scale-balanced"></i> Recommended Size</span>
            <span class="spec-val highlight-val">${p.caratSize} Carats <small>(${p.rattiSize} Ratti · Auspicious Vedic Standard)</small></span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-ring"></i> Consecrated Metal</span>
            <span class="spec-val">${p.graha.metal}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-hand"></i> Wearing Finger</span>
            <span class="spec-val">${p.graha.finger}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-clock"></i> Auspicious Day & Hora</span>
            <span class="spec-val">${p.graha.dayHora}</span>
          </div>
        </div>

        <div class="remedy-mantra-box">
          <div class="mantra-label">
            <span><i class="fa-solid fa-om"></i> SACRED GRAHA BEEJ MANTRA</span>
            <small>Chant 108 Times During Hora</small>
          </div>
          <div class="mantra-text" id="remedyMantraText">${p.graha.beejMantra}</div>
          <button type="button" class="btn-copy-mantra" onclick="copyRemedyMantra()" aria-label="Copy Sacred Beej Mantra to clipboard">
            <i class="fa-solid fa-copy"></i> <span>Copy Mantra</span>
          </button>
        </div>
      `;
    }

    // 4. Card 2: Rudraksha & Yantra
    const rudraCard = document.getElementById('remedyRudraCard');
    if (rudraCard) {
      rudraCard.innerHTML = `
        <div class="prescription-card-header">
          <div class="ratna-gem-icon" style="color: #f59e0b; text-shadow: 0 0 16px rgba(245, 158, 11, 0.4);">
            <i class="fa-solid fa-dharmachakra"></i>
          </div>
          <div class="ratna-title-wrap">
            <span class="ratna-eyebrow">PILLAR 2 · SHIELD & CONSECRATION</span>
            <h4 class="ratna-name">${p.graha.rudrakshaName}</h4>
            <div class="ratna-sanskrit">${p.graha.yantra}</div>
          </div>
        </div>

        <div class="ratna-specs-grid">
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-certificate"></i> Sacred Bead</span>
            <span class="spec-val"><strong style="color:var(--gold-champagne);">${p.graha.rudraksha}</strong></span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-compass"></i> Energized Yantra</span>
            <span class="spec-val">${p.graha.yantra}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-location-crosshairs"></i> Altar Placement</span>
            <span class="spec-val">${p.graha.yantraPlacement}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label"><i class="fa-solid fa-bullseye"></i> Intention Alignment</span>
            <span class="spec-val highlight-val">${p.intentionLabel}</span>
          </div>
        </div>

        <div class="remedy-intention-highlight">
          <div class="intention-tag"><i class="fa-solid fa-sparkles"></i> Vedic Energy Resonance</div>
          <p class="intention-benefit-text">${p.benefit}</p>
        </div>
      `;
    }

    // 5. Card 3: Consultation & Store CTA (Monetization)
    const ctaCard = document.getElementById('remedyCtaCard');
    if (ctaCard) {
      ctaCard.innerHTML = `
        <div class="prescription-card-header">
          <div class="ratna-gem-icon" style="color: var(--accent-orange); text-shadow: 0 0 16px rgba(196, 58, 18, 0.5);">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div class="ratna-title-wrap">
            <span class="ratna-eyebrow">PILLAR 3 · VEDIC AUDIT & PROCUREMENT</span>
            <h4 class="ratna-name">Kundli Alignment Audit</h4>
            <div class="ratna-sanskrit">Certified Prana Pratishtha Consecration</div>
          </div>
        </div>

        <div class="remedy-warning-banner">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>
            <strong>Crucial Astrological Rule:</strong> Never wear a primary gemstone without checking retrograde (Vakri) status, combust degrees, and 6th/8th/12th trik houses in your natal Kundli chart.
          </p>
        </div>

        <ul class="remedy-perks-list">
          <li><i class="fa-solid fa-check-circle"></i> <span>Complete Kundli Ascendant & Mahadasha Verification</span></li>
          <li><i class="fa-solid fa-check-circle"></i> <span>100% Natural, Unheated & Untreated Certificate</span></li>
          <li><i class="fa-solid fa-check-circle"></i> <span>Vedic Puja Energization Done on Client Nakshatra</span></li>
        </ul>

        <div class="remedy-action-buttons">
          <button type="button" class="btn-primary-radiant full-width" onclick="bookRatnaConsultation()" aria-label="Book Gemstone and Kundli Consultation">
            <i class="fa-solid fa-calendar-check"></i>
            <span>Book Energized Ratna & Kundli Audit</span>
          </button>
          <button type="button" class="btn-secondary-outline full-width" onclick="openRatnaStoreModal()" aria-label="Explore Lab Certified Gemstones and Yantras">
            <i class="fa-solid fa-gem"></i>
            <span>Explore Lab-Certified Stones & Yantras</span>
          </button>
        </div>
      `;
    }

    // Show results with smooth transition
    const resultsContainer = document.getElementById('remedyResultsContainer');
    if (resultsContainer) {
      resultsContainer.classList.add('active');
      setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  // Handle Form Submit
  function handleRemedySubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const name = document.getElementById('remedyName')?.value || '';
    const dob = document.getElementById('remedyDob')?.value || '';
    const rashi = document.getElementById('remedyRashi')?.value || 'Capricorn';
    const intention = document.getElementById('remedyIntention')?.value || 'wealth';
    const weight = document.getElementById('remedyWeight')?.value || '65';

    if (!name.trim()) {
      if (typeof window.showToast === 'function') window.showToast('Please enter your full name.', 'warning');
      document.getElementById('remedyName')?.focus();
      return;
    }

    if (!dob) {
      if (typeof window.showToast === 'function') window.showToast('Please select your birth date.', 'warning');
      document.getElementById('remedyDob')?.focus();
      return;
    }

    const prescription = prescribeVedicRemedies({
      name: name,
      dob: dob,
      rashiName: rashi,
      intention: intention,
      weightKg: weight
    });

    renderRemedyPrescription(prescription);
    if (typeof window.showToast === 'function') {
      window.showToast('Sacred Vedic Remedies prescribed successfully!', 'success');
    }
  }

  // Auto-Sync from Cosmic Blueprint (Session Storage & active inputs)
  function syncRemedyWithBlueprint(silent = false) {
    let name = '';
    let dob = '';
    let rashi = '';

    // 1. Check in-memory profile if user calculated in current session
    if (window.currentInlineProfile) {
      const p = window.currentInlineProfile;
      name = p.name || '';
      dob = p.dob || '';
      if (p.zodiac && p.zodiac.sign) {
        rashi = p.zodiac.sign;
      }
    }

    // 2. Fallback to inline calculator inputs
    if (!name) name = document.getElementById('inlineName')?.value || '';
    if (!dob) dob = document.getElementById('inlineDob')?.value || '';

    let anySynced = false;
    const remNameEl = document.getElementById('remedyName');
    const remDobEl = document.getElementById('remedyDob');
    const remRashiEl = document.getElementById('remedyRashi');
    const hintEl = document.getElementById('remedySyncHint');

    if (remNameEl && name) {
      remNameEl.value = name;
      anySynced = true;
    }
    if (remDobEl && dob) {
      remDobEl.value = dob;
      anySynced = true;
    }
    if (remRashiEl && rashi) {
      // Find matching option
      for (let i = 0; i < remRashiEl.options.length; i++) {
        if (remRashiEl.options[i].value.toLowerCase() === rashi.toLowerCase()) {
          remRashiEl.selectedIndex = i;
          anySynced = true;
          break;
        }
      }
    }

    if (anySynced) {
      if (hintEl) {
        hintEl.textContent = `Synced with Cosmic Blueprint (${name || 'Active Profile'})`;
        hintEl.classList.add('synced');
      }
      if (!silent && typeof window.showToast === 'function') {
        window.showToast('Coordinates synced from your Cosmic Blueprint!', 'success');
      }
      // Auto-trigger remedy calculation if complete
      if (name && dob) {
        handleRemedySubmit();
      }
    } else {
      if (!silent && typeof window.showToast === 'function') {
        window.showToast('No active Cosmic Blueprint found. Please enter details or calculate above first.', 'info');
      }
    }
  }

  // Copy Beej Mantra Handler
  function copyRemedyMantra() {
    const mantraEl = document.getElementById('remedyMantraText');
    const text = mantraEl ? mantraEl.textContent.trim() : '';
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (typeof window.showToast === 'function') {
          window.showToast('Sacred Beej Mantra copied to clipboard! Chant 108 times during auspicious hora.', 'success');
        }
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }

    function fallbackCopy(str) {
      const ta = document.createElement('textarea');
      ta.value = str;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        if (typeof window.showToast === 'function') {
          window.showToast('Sacred Beej Mantra copied to clipboard! Chant 108 times during auspicious hora.', 'success');
        }
      } catch (e) {
        window.prompt('Copy your Beej Mantra:', str);
      }
      document.body.removeChild(ta);
    }
  }

  // Monetization CTA: Book Consultation with prefilled metadata
  function bookRatnaConsultation() {
    // 1. Close reading modal if open
    if (typeof window.closeCosmicReadingModal === 'function') {
      window.closeCosmicReadingModal();
    }

    const p = currentRemedyProfile;
    const stone = (p && p.graha && p.graha.gemstone) ? p.graha.gemstone : 'Vedic Ratna';
    const lp = (p && p.lifePath) ? p.lifePath : '1';
    const planet = (p && p.graha && p.graha.planet) ? p.graha.planet : 'Sun';
    const rashi = (p && p.rashi && p.rashi.name) ? p.rashi.name : 'Makara';
    const intention = (p && p.intentionLabel) ? p.intentionLabel : 'Wealth & Career';
    const rudraksha = (p && p.graha && p.graha.rudrakshaName) ? p.graha.rudrakshaName : '5 Mukhi Rudraksha';
    const yantra = (p && p.graha && p.graha.yantra) ? p.graha.yantra : 'Shree Yantra';
    const carats = (p && p.caratSize) ? p.caratSize : '6.5';

    // 2. Select service in appointment form
    const serviceName = 'Career, Wealth & Gemstone Consultation';
    const radios = document.querySelectorAll('input[name="serviceType"]');
    radios.forEach(radio => {
      const parentCard = radio.closest('.radio-card');
      if (radio.value === serviceName) {
        radio.checked = true;
        if (parentCard) parentCard.classList.add('selected');
      } else {
        if (parentCard) parentCard.classList.remove('selected');
      }
    });

    // 3. Pre-fill consultation notes with complete Cosmic & Remedy profile
    const notesEl = document.getElementById('notes');
    if (notesEl) {
      notesEl.value = `[Sacred Blueprint & Remedy Request] Recommended Gemstone: ${stone} (${carats} Carats) | Life Path: ${lp} (${planet}) | Rashi: ${rashi} | Rudraksha: ${rudraksha} | Yantra: ${yantra} | Intention: ${intention}. Please evaluate natal chart planetary degrees and verify gemstone/rudraksha suitability.`;
    }

    // 4. Pre-fill name and dob
    const aptName = document.getElementById('fullName');
    const remName = document.getElementById('inlineName')?.value || document.getElementById('remedyName')?.value;
    if (aptName && remName) {
      aptName.value = remName;
    }

    const aptDob = document.getElementById('dob');
    const remDob = document.getElementById('inlineDob')?.value || document.getElementById('remedyDob')?.value;
    if (aptDob && remDob) {
      aptDob.value = remDob;
    }

    // 5. Pre-fill birth time
    const aptTob = document.getElementById('birthTime');
    const remTob = document.getElementById('inlineTob')?.value;
    if (aptTob && remTob) {
      aptTob.value = remTob;
    }

    // 6. Pre-fill birth place components
    const remCountry = document.getElementById('inlineCountry')?.value || '';
    const remState = document.getElementById('inlineState')?.value || '';
    const remDistrict = document.getElementById('inlineDistrict')?.value || '';
    
    const aptCountry = document.getElementById('aptCountry');
    const aptState = document.getElementById('aptState');
    const aptDistrict = document.getElementById('aptDistrict');
    const aptBirthPlace = document.getElementById('birthPlace');

    if (aptCountry && remCountry) aptCountry.value = remCountry;
    if (aptState && remState) aptState.value = remState;
    if (aptDistrict && remDistrict) aptDistrict.value = remDistrict;
    
    if (aptBirthPlace) {
      const parts = [remDistrict, remState, remCountry].filter(Boolean);
      if (parts.length > 0) {
        aptBirthPlace.value = parts.join(', ');
      }
    }

    // 7. Guaranteed smooth scroll to appointment booking section after modal close transition
    setTimeout(function() {
      const aptSection = document.getElementById('appointment');
      if (aptSection) {
        const headerOffset = window.innerWidth <= 768 ? 68 : 76;
        const targetPos = Math.max(0, aptSection.getBoundingClientRect().top + window.pageYOffset - headerOffset);
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, null, '#appointment');
        }
      }
    }, 120);

    if (typeof window.showToast === 'function') {
      window.showToast('Your Sacred Blueprint & Remedy details have been transferred to the appointment booking form!', 'success');
    }
  }

  window.bookRatnaConsultation = bookRatnaConsultation;

  // Modal Handlers for Ratna Store
  function openRatnaStoreModal() {
    const modal = document.getElementById('ratnaStoreModal');
    if (modal) modal.classList.add('active');
  }

  function closeRatnaStoreModal() {
    const modal = document.getElementById('ratnaStoreModal');
    if (modal) modal.classList.remove('active');
  }

  // Intention Pill Selection setup
  function initIntentionPills() {
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
    const pills = document.querySelectorAll('.intention-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const intention = pill.getAttribute('data-intention') || 'wealth';
        const inlineHidden = document.getElementById('inlineIntention');
        const remHidden = document.getElementById('remedyIntention');
        if (inlineHidden) inlineHidden.value = intention;
        if (remHidden) remHidden.value = intention;
      });
    });
  }

  // Initialization
  function initRemedies() {
    if (typeof document === 'undefined' || !document.getElementById) return;
    initIntentionPills();
    // Default preview calculation for initial aesthetic engagement
    const defaultPrescription = prescribeVedicRemedies({
      name: 'Arjun GS',
      dob: '2005-01-20',
      rashiName: 'Capricorn',
      intention: 'wealth',
      weightKg: '65'
    });
    renderRemedyPrescription(defaultPrescription);

    // Auto-sync if profile already generated in session
    if (window.currentInlineProfile) {
      syncRemedyWithBlueprint(true);
    }
  }

  // Expose to window
  window.RemedyEngine = {
    prescribeVedicRemedies,
    renderRemedyPrescription,
    syncRemedyWithBlueprint,
    copyRemedyMantra,
    bookRatnaConsultation,
    openRatnaStoreModal,
    closeRatnaStoreModal,
    initRemedies
  };

  window.syncRemedyWithBlueprint = syncRemedyWithBlueprint;
  window.handleRemedySubmit = handleRemedySubmit;
  window.copyRemedyMantra = copyRemedyMantra;
  window.bookRatnaConsultation = bookRatnaConsultation;
  window.openRatnaStoreModal = openRatnaStoreModal;
  window.closeRatnaStoreModal = closeRatnaStoreModal;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRemedies);
  } else {
    initRemedies();
  }

})(window);
