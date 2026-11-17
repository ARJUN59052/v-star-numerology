/* ==========================================================================
   V STAR NUMEROLOGY & ASTROLOGY - FRONTEND APPLICATION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize celestial stars canvas
  initStarsCanvas();

  // Initialize mobile menu
  initMobileNav();

  // Initialize interactive life path calculator
  initLifePathCalculator();

  // Initialize service radio card selection
  initServiceRadioCards();

  // Initialize appointment booking form submission & validation
  initAppointmentForm();

  // Initialize FAQ accordion
  initFaqAccordion();

  // Initialize Admin Portal & Excel Download
  initAdminPortal();

  // Initialize Interactive Zodiac Modal & Explorer
  initZodiacModal();

  // Initialize Floating Controls (Back to top & Navbar scroll effect)
  initFloatingControls();

  // Initialize Smooth Scrolling & In-Page Navigation
  initSmoothScroll();

  // Initialize Mobile Branching Navigation (Landing + Booking + Address Flow)
  initMobileBranching();

  // Initialize Scroll-Spy for Navbar Links
  initNavbarScrollSpy();

  // Initialize IntersectionObserver Scroll Reveal
  initScrollReveal();

  // Initialize Birth Place 3-Box Smart Autocomplete for both Cosmic Snapshot & Consultation Form
  if (typeof window.initPobAutocomplete === 'function') {
    // 1. Cosmic Snapshot Birth Place
    window.initPobAutocomplete({
      countryInputId: 'inlineCountry',
      countryDropdownId: 'inlineCountrySuggestions',
      stateInputId: 'inlineState',
      stateDropdownId: 'inlineStateSuggestions',
      districtInputId: 'inlineDistrict',
      districtDropdownId: 'inlineDistrictSuggestions',
      hiddenPobId: 'inlinePob',
      onPobChange: function(pob) {
        const resultsCard = document.getElementById('inlineResultsCard');
        if (resultsCard && resultsCard.style.display !== 'none') {
          updateInlineSnapshot();
        }
      }
    });

    // 2. Consultation Appointment Booking Form Birth Place
    window.initPobAutocomplete({
      countryInputId: 'aptCountry',
      countryDropdownId: 'aptCountrySuggestions',
      stateInputId: 'aptState',
      stateDropdownId: 'aptStateSuggestions',
      districtInputId: 'aptDistrict',
      districtDropdownId: 'aptDistrictSuggestions',
      hiddenPobId: 'birthPlace'
    });
  }

  // Initialize Cosmic Snapshot Submit and Button Listeners
  initInlineSnapshot();

  // Initialize Cosmic Snapshot Accordion (Strengths, Growth Areas, Essence)
  initInlineAccordion();

  // Ensure form is fresh & clean on initial page load (no old cached data)
  resetCosmicForm();
});

// Reset form on page refresh / back navigation
window.addEventListener('pageshow', () => {
  resetCosmicForm();
});

function resetCosmicForm() {
  const form = document.getElementById('inlineSnapshotForm');
  if (form) {
    try { form.reset(); } catch (e) {}
  }

  const nameEl = document.getElementById('inlineName');
  const dobEl = document.getElementById('inlineDob');
  const tobEl = document.getElementById('inlineTob');
  const countryEl = document.getElementById('inlineCountry');
  const stateEl = document.getElementById('inlineState');
  const districtEl = document.getElementById('inlineDistrict');
  const pobEl = document.getElementById('inlinePob');

  if (nameEl) nameEl.value = '';
  if (dobEl) dobEl.value = '';
  if (tobEl) tobEl.value = '';
  if (countryEl) countryEl.value = '';
  if (stateEl) stateEl.value = '';
  if (districtEl) districtEl.value = '';
  if (pobEl) pobEl.value = '';

  const resultsCard = document.getElementById('inlineResultsCard');
  if (resultsCard) {
    resultsCard.style.display = 'none';
  }
  const wrapper = document.getElementById('cosmicSnapshotWrapper');
  if (wrapper) {
    wrapper.classList.remove('has-results');
  }

  const btn = document.getElementById('btnInlineGenerate');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<span>Generate Cosmic Snapshot</span> <i class="fa-solid fa-wand-magic-sparkles"></i>';
  }

  currentInlineProfile = null;
}

/* ==========================================================================
   1. CELESTIAL STARRY BACKGROUND CANVAS (CONTINUOUS UPWARD COSMIC DRIFT)
   ========================================================================== */
function initStarsCanvas() {
  const canvas = document.getElementById('starsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Dynamic cosmic drift booster for silky PC page/section transitions
  let driftMultiplier = 1.0;
  window.boostCosmicDrift = function(duration = 850) {
    driftMultiplier = 4.0;
    const startTime = performance.now();
    function decay(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      driftMultiplier = 1.0 + 3.0 * Math.pow(1 - progress, 2);
      if (progress < 1) {
        requestAnimationFrame(decay);
      } else {
        driftMultiplier = 1.0;
      }
    }
    requestAnimationFrame(decay);
  };

  // Generous count of celestial stars and golden sparkles
  const starCount = Math.floor((width * height) / 3800);
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    const isSpecialSparkle = Math.random() < 0.12; // 12% golden 4-point sparkles
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: isSpecialSparkle ? Math.random() * 2 + 1.8 : Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      twinkle: Math.random() * Math.PI * 2,
      // Continuous upward velocity (parallax layers)
      speedY: isSpecialSparkle ? (Math.random() * 0.5 + 0.5) : (Math.random() * 0.35 + 0.18),
      // Subtle gentle horizontal sway
      driftX: (Math.random() - 0.5) * 0.08,
      isSparkle: isSpecialSparkle,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.015
    });
  }

  function draw4PointStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // Move star upwards continuously (with cosmic transition booster)
      s.y -= s.speedY * driftMultiplier;
      s.x += s.driftX;
      s.twinkle += s.twinkleSpeed;
      s.rotation += s.rotSpeed;

      // Wrap around seamlessly to bottom when star reaches top
      if (s.y < -20) {
        s.y = height + 20;
        s.x = Math.random() * width;
      }
      if (s.x < -20) s.x = width + 20;
      if (s.x > width + 20) s.x = -20;

      const currentAlpha = Math.max(0.15, Math.min(1, s.alpha + Math.sin(s.twinkle) * 0.3));

      if (s.isSparkle) {
        // Draw elegant 4-point golden sparkle star
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(240, 81, 35, 0.4)';
        draw4PointStar(0, 0, 4, s.radius * 2.2, s.radius * 0.6, `rgba(223, 184, 114, ${currentAlpha})`);
        ctx.restore();
      } else {
        // Draw smooth celestial circular star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        if (s.radius > 1.2) {
          ctx.fillStyle = `rgba(236, 211, 157, ${currentAlpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(223, 184, 114, 0.5)';
        } else {
          ctx.fillStyle = `rgba(244, 239, 230, ${currentAlpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  render();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileNav');

  if (toggle && drawer) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('active');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });

    // Close mobile tab bar when clicking outside
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggle.contains(e.target)) {
        drawer.classList.remove('open');
        toggle.classList.remove('active');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }
}

/* ==========================================================================
   3. INTERACTIVE LIFE PATH NUMBER CALCULATOR
   ========================================================================== */
const LIFE_PATH_ARCHETYPES = {
  1: {
    title: '1 — The Leader & Independent Pioneer',
    desc: 'Ruled by the Sun. You possess raw drive, innovative willpower, and executive presence. When your name spelling aligns with Sun numbers, you attract authority and breakthrough success.'
  },
  2: {
    title: '2 — The Diplomat & Intuitive Peacemaker',
    desc: 'Ruled by the Moon. You carry high emotional sensitivity, artistic intuition, and natural partnership diplomacy. Balance your name to avoid emotional vulnerability.'
  },
  3: {
    title: '3 — The Creative Communicator & Expresser',
    desc: 'Ruled by Jupiter. Charisma, optimism, literary flair, and expressive joy flow naturally through you. Auspicious sound vibrations unlock grand wealth.'
  },
  4: {
    title: '4 — The Master Builder & Pragmatist',
    desc: 'Ruled by Rahu (Uranus). Highly disciplined, detail-oriented, and anchored in stability. Name balance removes unexpected delays and accelerates foundation milestones.'
  },
  5: {
    title: '5 — The Adventurer & Magnetic Catalyst',
    desc: 'Ruled by Mercury. Fast-thinking, versatile, magnetic, and adaptable to commerce and global travel. Your frequency thrives when connected with commerce numbers.'
  },
  6: {
    title: '6 — The Harmonizer & Nurturer of Abundance',
    desc: 'Ruled by Venus. Loving, artistic, community-focused, and family-oriented. You naturally attract domestic peace, wealth, and elegance when your letters are harmonized.'
  },
  7: {
    title: '7 — The Mystic & Seeker of Universal Truth',
    desc: 'Ruled by Ketu (Neptune). Deep philosophical intelligence, research instincts, and spiritual intuition. Alignment shields you from isolation and opens profound wisdom.'
  },
  8: {
    title: '8 — The Titan of Material Wealth & Karma',
    desc: 'Ruled by Saturn. Ambitious, strategic, resilient, and built for monumental executive achievements. Precise name numerology eliminates heavy karmic friction.'
  },
  9: {
    title: '9 — The Universal Humanitarian & Champion',
    desc: 'Ruled by Mars. Compassionate, courageous, visionary, and protective. Channel your intense fiery drive into high-impact global creation.'
  },
  11: {
    title: '11 — Master Number: The Spiritual Illuminator',
    desc: 'A rare master vibration of high intuition, spiritual illumination, and prophetic insight. Bridges earthly reality with celestial frequencies.'
  },
  22: {
    title: '22 — Master Number: The Master Architect of Dreams',
    desc: 'The most powerful builder number in numerology. Able to manifest monumental societal institutions, visionary systems, and enduring legacies.'
  },
  33: {
    title: '33 — Master Number: The Master Teacher & Cosmic Healer',
    desc: 'The avatar of selfless devotion, highest spiritual healing, and cosmic benevolence. Transmutes suffering into universal harmony.'
  }
};

function setupTriDobInputs(dayId, monthId, yearId, hiddenId, onValidChange) {
  const dayEl = document.getElementById(dayId);
  const monthEl = document.getElementById(monthId);
  const yearEl = document.getElementById(yearId);
  const hiddenEl = document.getElementById(hiddenId);

  if (!dayEl || !monthEl || !yearEl) return;

  function sync() {
    const d = dayEl.value.trim();
    const m = monthEl.value.trim();
    const y = yearEl.value.trim();
    if (d && m && y && y.length === 4 && hiddenEl) {
      // Store standard ISO YYYY-MM-DD format
      hiddenEl.value = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      if (onValidChange) onValidChange(hiddenEl.value);
    } else if (hiddenEl) {
      hiddenEl.value = '';
    }
  }

  // Auto-advance cursor to next field when 2 digits are entered
  dayEl.addEventListener('input', () => {
    if (dayEl.value.length >= 2) {
      const val = parseInt(dayEl.value, 10);
      if (val > 31) dayEl.value = '31';
      monthEl.focus();
    }
    sync();
  });

  monthEl.addEventListener('input', () => {
    if (monthEl.value.length >= 2) {
      const val = parseInt(monthEl.value, 10);
      if (val > 12) monthEl.value = '12';
      yearEl.focus();
    }
    sync();
  });

  yearEl.addEventListener('input', () => {
    if (yearEl.value.length > 4) {
      yearEl.value = yearEl.value.slice(0, 4);
    }
    sync();
  });

  // Backspace navigation back to previous field
  monthEl.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !monthEl.value) {
      dayEl.focus();
    }
  });

  yearEl.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !yearEl.value) {
      monthEl.focus();
    }
  });
}

function initLifePathCalculator() {
  const calcBtn = document.getElementById('btnCalculateLifePath');
  const dayEl = document.getElementById('calcDay');
  const monthEl = document.getElementById('calcMonth');
  const yearEl = document.getElementById('calcYear');
  const resultNumber = document.getElementById('resultNumber');
  const resultArchetype = document.getElementById('resultArchetype');
  const resultDesc = document.getElementById('resultDesc');

  setupTriDobInputs('calcDay', 'calcMonth', 'calcYear', 'calcDob');

  function calculate() {
    const d = dayEl ? dayEl.value.trim() : '';
    const m = monthEl ? monthEl.value.trim() : '';
    const y = yearEl ? yearEl.value.trim() : '';

    if (!d || !m || !y || y.length < 4) {
      showToast('Please enter your complete Date, Month, and Year [DD/MM/YYYY]', 'warning');
      if (!d && dayEl) dayEl.focus();
      else if (!m && monthEl) monthEl.focus();
      else if (yearEl) yearEl.focus();
      return;
    }

    const clean = `${d.padStart(2, '0')}${m.padStart(2, '0')}${y}`;
    let sum = clean.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    // Reduce unless master number 11, 22, 33
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }

    const info = LIFE_PATH_ARCHETYPES[sum] || LIFE_PATH_ARCHETYPES[6];
    if (resultNumber) resultNumber.textContent = sum;
    if (resultArchetype) resultArchetype.textContent = info.title;
    if (resultDesc) resultDesc.textContent = info.desc;

    // Trigger subtle pulse animation
    if (resultNumber && resultNumber.parentElement) {
      resultNumber.parentElement.classList.remove('pulse-animation');
      void resultNumber.parentElement.offsetWidth; // trigger reflow
      resultNumber.parentElement.classList.add('pulse-animation');
    }

    // Auto-sync Date of Birth to In-Page 2-Sided Cosmic Snapshot
    if (d && m && y && y.length === 4) {
      const formattedIso = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      const inlineDob = document.getElementById('inlineDob');
      if (inlineDob) {
        inlineDob.value = formattedIso;
        if (typeof updateInlineSnapshot === 'function') {
          updateInlineSnapshot();
        }
      }
    }
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', calculate);
  }
}

/* ==========================================================================
   4. SERVICE SELECTION & RADIO CARDS
   ========================================================================== */
function initServiceRadioCards() {
  const radioCards = document.querySelectorAll('.radio-card');
  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

// Global helper: called when clicking cards on the services section
window.chooseServiceAndScroll = function(serviceName) {
  selectServiceInForm(serviceName);
  if (window.innerWidth <= 768 && typeof window.setMobileBranch === 'function') {
    window.setMobileBranch('home', 'appointment');
    return;
  }
  const target = document.getElementById('appointment');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

function selectServiceInForm(serviceName) {
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
}

/* ==========================================================================
   5. APPOINTMENT FORM SUBMISSION & AUTOMATION PIPELINE
   ========================================================================== */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnText = btnSubmit.querySelector('.btn-text');
  const btnSpinner = btnSubmit.querySelector('.btn-spinner');

  // Modal elements
  const confirmModal = document.getElementById('confirmModal');
  const closeConfirmModal = document.getElementById('closeConfirmModal');
  const modalOkBtn = document.getElementById('modalOkBtn');

  if (closeConfirmModal) {
    closeConfirmModal.addEventListener('click', () => confirmModal.classList.remove('active'));
  }
  if (modalOkBtn) {
    modalOkBtn.addEventListener('click', () => confirmModal.classList.remove('active'));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset error messages
    clearErrors();

    // Collect values
    const fullName = form.fullName.value.trim();
    const countryCode = form.countryCode ? form.countryCode.value.trim() : '+91';
    const rawPhone = form.phone.value.trim();
    const phone = rawPhone ? (rawPhone.startsWith('+') ? rawPhone : `${countryCode} ${rawPhone}`) : '';
    const email = form.email.value.trim();
    const birthTime = form.birthTime ? form.birthTime.value : '';

    // Read DOB: from date input or fallback segmented boxes
    let dob = form.dob ? form.dob.value.trim() : '';
    const dobDay = document.getElementById('dobDay')?.value.trim();
    const dobMonth = document.getElementById('dobMonth')?.value.trim();
    const dobYear = document.getElementById('dobYear')?.value.trim();
    if (dobDay && dobMonth && dobYear && dobYear.length === 4) {
      dob = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;
    }

    // Assemble Birth Place from 3 segmented boxes (Country, State, District)
    let birthPlace = form.birthPlace ? form.birthPlace.value.trim() : '';
    if (!birthPlace) {
      const c = document.getElementById('aptCountry')?.value.trim();
      const s = document.getElementById('aptState')?.value.trim();
      const d = document.getElementById('aptDistrict')?.value.trim();
      const parts = [d, s, c].filter(Boolean);
      birthPlace = parts.join(', ');
      if (form.birthPlace) form.birthPlace.value = birthPlace;
    }

    const gender = form.gender.value;
    const consultationMode = form.consultationMode.value;
    const notes = form.notes.value.trim();
    const serviceType = form.querySelector('input[name="serviceType"]:checked')?.value || 'Full Astrology & Numerology';

    // Validation
    let hasError = false;
    if (!fullName) {
      showError('fullNameError', 'Please enter your full name');
      hasError = true;
    }
    if (!rawPhone || rawPhone.replace(/\D/g, '').length < 7) {
      showError('phoneError', 'Please enter a valid phone number');
      hasError = true;
    }
    if (!email || !isValidEmail(email)) {
      showError('emailError', 'Please enter a valid email address');
      hasError = true;
    }
    if (!dob) {
      showError('dobError', 'Please select or enter your date of birth');
      hasError = true;
    }
    if (!birthPlace) {
      showError('birthPlaceError', 'Please select or enter your birth place (Country, State, District)');
      hasError = true;
    }

    if (hasError) {
      showToast('Please correct the highlighted fields.', 'warning');
      return;
    }

    // Set UI loading state
    btnSubmit.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-flex';

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          dob,
          birthTime,
          birthPlace,
          gender,
          consultationMode,
          notes,
          serviceType
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Populate and open Confirmation Modal
        document.getElementById('modalApptId').textContent = data.appointmentId || '';
        document.getElementById('modalClientName').textContent = (data.clientData && data.clientData.fullName) || data.fullName || fullName;
        document.getElementById('modalServiceType').textContent = (data.clientData && data.clientData.serviceType) || data.serviceType || serviceType;
        document.getElementById('modalClientEmail').textContent = (data.clientData && data.clientData.email) || data.email || email;
        document.getElementById('modalDob').textContent = (data.clientData && data.clientData.dob) || data.dob || dob;
        
        const emailStatusEl = document.getElementById('modalEmailStatus');
        if (data.emailMode === 'smtp' || (data.emailStatus && data.emailStatus.includes('Live SMTP'))) {
          emailStatusEl.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Confirmation Email Sent to Inbox';
        } else {
          emailStatusEl.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Confirmation Email Dispatched';
        }

        // Show confirmation modal
        confirmModal.classList.add('active');
        showToast('Appointment request registered successfully!', 'success');

        // Reset form & 3 segmented POB boxes
        form.reset();
        const aptCountry = document.getElementById('aptCountry');
        const aptState = document.getElementById('aptState');
        const aptDistrict = document.getElementById('aptDistrict');
        if (aptCountry) aptCountry.value = '';
        if (aptState) aptState.value = '';
        if (aptDistrict) aptDistrict.value = '';
        if (form.birthPlace) form.birthPlace.value = '';
        document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
        const firstCard = document.querySelector('.radio-card');
        if (firstCard) {
          firstCard.classList.add('selected');
          firstCard.querySelector('input[type="radio"]').checked = true;
        }
      } else {
        showToast(data.message || 'Error booking appointment', 'error');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      showToast('Network error. Please ensure the server is active.', 'error');
    } finally {
      btnSubmit.disabled = false;
      btnText.style.display = 'inline-flex';
      btnSpinner.style.display = 'none';
    }
  });

  function showError(elId, message) {
    const el = document.getElementById(elId);
    if (el) {
      el.textContent = message;
      el.classList.add('visible');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-header-btn, .faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   7. ADMIN / EXCEL MANAGEMENT PORTAL
   ========================================================================== */
let cachedAppointments = [];

function initAdminPortal() {
  const adminModal = document.getElementById('adminModal');
  if (!adminModal) return;
  const openBtn = document.getElementById('adminPortalBtn');
  const closeBtn = document.getElementById('closeAdminModal');
  const refreshBtn = document.getElementById('btnRefreshList');
  const searchInput = document.getElementById('adminSearchInput');

  window.openAdminModal = function() {
    adminModal.classList.add('active');
    loadAdminAppointments();
  };

  if (openBtn) openBtn.addEventListener('click', window.openAdminModal);
  if (closeBtn) closeBtn.addEventListener('click', () => adminModal.classList.remove('active'));
  if (refreshBtn) refreshBtn.addEventListener('click', loadAdminAppointments);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = cachedAppointments.filter(item => {
        return (
          (item.fullName && item.fullName.toLowerCase().includes(q)) ||
          (item.email && item.email.toLowerCase().includes(q)) ||
          (item.phone && item.phone.toLowerCase().includes(q)) ||
          (item.serviceType && item.serviceType.toLowerCase().includes(q)) ||
          (item.id && item.id.toLowerCase().includes(q))
        );
      });
      renderAdminTable(filtered);
    });
  }
}

async function loadAdminAppointments() {
  const tableBody = document.getElementById('adminTableBody');
  const countEl = document.getElementById('adminTotalCount');
  if (!tableBody) return;

  try {
    const res = await fetch('/api/appointments/list');
    const data = await res.json();

    if (data.success) {
      cachedAppointments = data.appointments || [];
      if (countEl) countEl.textContent = data.total;
      renderAdminTable(cachedAppointments);
    } else {
      tableBody.innerHTML = `<tr><td colspan="10" class="text-center py-4" style="color:#f87171;">Failed to load records: ${escapeHtml(data.message || 'Unknown error')}</td></tr>`;
    }
  } catch (err) {
    console.error('Failed to load admin list:', err);
    tableBody.innerHTML = `<tr><td colspan="10" class="text-center py-4" style="color:#f87171;">Server connection error.</td></tr>`;
  }
}

function renderAdminTable(list) {
  const tableBody = document.getElementById('adminTableBody');
  if (!tableBody) return;

  if (list.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="10" class="text-center py-4 text-muted">
          No appointments recorded yet. New bookings will automatically generate and update appointments.xlsx.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = list.map(item => `
    <tr>
      <td><strong style="color:var(--gold-bright);">${escapeHtml(item.id || '')}</strong></td>
      <td style="white-space:nowrap;">${escapeHtml(item.submittedAt || '')}</td>
      <td><strong>${escapeHtml(item.fullName || '')}</strong></td>
      <td>${escapeHtml(item.phone || '')}</td>
      <td>${escapeHtml(item.email || '')}</td>
      <td>${escapeHtml(item.dob || '')}</td>
      <td>${escapeHtml(item.birthPlace || '')}</td>
      <td><span class="badge-service">${escapeHtml(item.serviceType || '')}</span></td>
      <td>${escapeHtml(item.consultationMode || '')}</td>
      <td><span style="color:#4ade80;"><i class="fa-solid fa-check-circle"></i> ${escapeHtml(item.emailStatus || 'Sent')}</span></td>
    </tr>
  `).join('');
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'error') icon = 'fa-circle-xmark';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}



/* ==========================================================================
   INTERACTIVE ZODIAC MODAL & EXPLORER
   ========================================================================== */
function initZodiacModal() {
  const zodiacCards = document.querySelectorAll('.zodiac-card, .zodiac-item');
  const modal = document.getElementById('zodiacModal');
  const closeBtn = document.getElementById('closeZodiacModal');
  const bookBtn = document.getElementById('btnBookFromZodiac');

  if (!modal) return;

  let activeSignName = 'Aries';

  function openSignModal(sign) {
    const card = document.querySelector(`.zodiac-card[data-sign="${sign}"]`);
    if (!card) return;

    const glyph = card.getAttribute('data-glyph') || '♈';
    const sanskrit = card.getAttribute('data-sanskrit') || '';
    const ruler = card.getAttribute('data-ruler') || '';
    const element = card.getAttribute('data-element') || '';
    const lucky = card.getAttribute('data-lucky') || '';
    const gem = card.getAttribute('data-gem') || '';
    const trait = card.getAttribute('data-trait') || '';

    activeSignName = sign;

    const titleEl = document.getElementById('zodiacModalTitle');
    const symbolEl = document.getElementById('zodiacModalSymbol');
    const rulerEl = document.getElementById('zodiacModalRuler');
    const elementEl = document.getElementById('zodiacModalElement');
    const luckyEl = document.getElementById('zodiacModalLucky');
    const gemEl = document.getElementById('zodiacModalGem');
    const traitEl = document.getElementById('zodiacModalTrait');

    if (titleEl) titleEl.textContent = `${sign} (${sanskrit})`;
    if (symbolEl) {
      symbolEl.innerHTML = `<span style="font-size:2rem; font-family:'DM Serif Display', Georgia, serif; line-height:1; color:var(--accent-orange);">${glyph}</span>`;
    }
    if (rulerEl) rulerEl.textContent = ruler;
    if (elementEl) elementEl.textContent = element;
    if (luckyEl) luckyEl.textContent = lucky;
    if (gemEl) gemEl.textContent = gem;
    if (traitEl) traitEl.textContent = trait;

    modal.classList.add('active');
  }

  zodiacCards.forEach(item => {
    item.addEventListener('click', () => {
      const sign = item.getAttribute('data-sign') || 'Aries';
      openSignModal(sign);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      const notesInput = document.getElementById('notes');
      if (notesInput) {
        notesInput.value = `Consultation focused on ${activeSignName} Rashi / Sun sign alignment`;
      }
      const apptSection = document.getElementById('appointment');
      if (apptSection) {
        apptSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   FLOATING CONTROLS & NAVBAR SCROLL DYNAMICS (THROTTLED & ULTRA SMOOTH)
   ========================================================================== */
function initFloatingControls() {
  const topBtn = document.getElementById('btnBackToTop');
  const navbar = document.getElementById('mainNavbar');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar background blur enhancement
        if (navbar) {
          navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Back to top button visibility
        if (topBtn) {
          topBtn.classList.toggle('visible', scrollY > 380);
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  if (topBtn) {
    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   SMOOTH IN-PAGE SCROLL NAVIGATION WITH FIXED HEADER OFFSET & PC ANIMATIONS
   ========================================================================== */
function smoothScrollToTarget(targetPosition, duration = 800, onComplete = null) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  if (Math.abs(distance) < 4) {
    if (onComplete) onComplete();
    return;
  }

  let startTime = null;
  let cancelled = false;

  const cancelScroll = () => {
    cancelled = true;
    window.removeEventListener('wheel', cancelScroll);
    window.removeEventListener('touchstart', cancelScroll);
    window.removeEventListener('keydown', cancelScroll);
  };

  window.addEventListener('wheel', cancelScroll, { passive: true });
  window.addEventListener('touchstart', cancelScroll, { passive: true });
  window.addEventListener('keydown', cancelScroll, { passive: true });

  // Silky cubic-bezier ease-in-out curve
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    if (cancelled) return;
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      window.removeEventListener('wheel', cancelScroll);
      window.removeEventListener('touchstart', cancelScroll);
      window.removeEventListener('keydown', cancelScroll);
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(step);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const rawKey = targetId.replace('#', '');

      // On mobile screens <= 768px: delegate to mobile branching
      if (window.innerWidth <= 768 && typeof window.setMobileBranch === 'function') {
        e.preventDefault();
        window.setMobileBranch(rawKey);
        return;
      }

      // Desktop: Animated cinematic section shifting
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 74;
        const elementPosition = target.getBoundingClientRect().top;
        const targetPosition = Math.max(0, elementPosition + window.pageYOffset - headerOffset);

        // 1. Accelerate celestial background star drift
        if (typeof window.boostCosmicDrift === 'function') {
          window.boostCosmicDrift(850);
        }

        // 2. Trigger ethereal cosmic shift veil
        const veil = document.getElementById('cosmicShiftVeil');
        if (veil) {
          veil.classList.add('active');
          setTimeout(() => veil.classList.remove('active'), 500);
        }

        // 3. Silky kinetic eased scroll
        smoothScrollToTarget(targetPosition, 800, () => {
          // 4. On arrival: trigger target section celestial glow & card lift
          target.classList.remove('section-target-highlight');
          void target.offsetWidth; // Force CSS reflow
          target.classList.add('section-target-highlight');

          setTimeout(() => {
            target.classList.remove('section-target-highlight');
          }, 1300);
        });

        // Safely update URL hash
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }

        // Close mobile drawer smoothly if open
        const drawer = document.getElementById('mobileNav');
        if (drawer && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
        }
      }
    });
  });
}

/* ==========================================================================
   MOBILE BRANCHED NAVIGATION (LANDING + BOOKING + ADDRESS FLOW)
   ========================================================================== */
const MOBILE_BRANCHES = {
  'services': { title: 'Consultation Services' },
  'zodiac-belt': { title: 'Zodiac Signs' },
  'zodiac': { title: 'Zodiac Signs', aliasOf: 'zodiac-belt' },
  'transformation': { title: 'Transformations' },
  'destiny': { title: 'Destiny Showcase' },
  'calculator': { title: 'Life Path Tool' },
  'philosophy': { title: 'Sacred Wisdom' },
  'testimonials': { title: 'Client Reviews' },
  'faq': { title: 'FAQ' }
};

function initMobileBranching() {
  const branchBar = document.getElementById('mobileBranchBar');
  if (branchBar) branchBar.style.display = 'none';

  window.setMobileBranch = function(targetKey, scrollTarget = null) {
    let key = (targetKey || 'home').toLowerCase().replace('#', '');
    if (MOBILE_BRANCHES[key] && MOBILE_BRANCHES[key].aliasOf) {
      key = MOBILE_BRANCHES[key].aliasOf;
    }

    // Close mobile nav drawer if open
    const drawer = document.getElementById('mobileNav');
    const toggle = document.getElementById('mobileToggle');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (toggle) {
        toggle.classList.remove('active');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    }

    if (key === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.pushState) history.pushState(null, null, '#home');
      return;
    }

    const dest = document.getElementById(key) || document.getElementById(scrollTarget);
    if (dest) {
      const headerOffset = window.innerWidth <= 768 ? 68 : 76;
      const pos = Math.max(0, dest.getBoundingClientRect().top + window.pageYOffset - headerOffset);
      window.scrollTo({ top: pos, behavior: 'smooth' });
      if (history.pushState) history.pushState(null, null, `#${key}`);
    }
  };

  // Logo click returns to top
  document.querySelectorAll('.brand-logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.pushState) history.pushState(null, null, '#home');
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const dest = document.getElementById(hash);
      if (dest) {
        const headerOffset = window.innerWidth <= 768 ? 68 : 76;
        const pos = Math.max(0, dest.getBoundingClientRect().top + window.pageYOffset - headerOffset);
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Check initial hash on load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && initialHash !== 'home') {
    setTimeout(() => {
      const dest = document.getElementById(initialHash);
      if (dest) {
        const headerOffset = window.innerWidth <= 768 ? 68 : 76;
        const pos = Math.max(0, dest.getBoundingClientRect().top + window.pageYOffset - headerOffset);
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }, 200);
  }
}

/* ==========================================================================
   NAVBAR SCROLL-SPY & MAGNETIC ACTIVE PILL (SMOOTH ACTIVE LINK TRACKER)
   ========================================================================== */
function initNavbarScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const activePill = document.getElementById('navActivePill');
  const navLinksContainer = document.querySelector('.nav-links');
  if (!sections.length || !navLinks.length) return;

  function updateActivePill(activeLink) {
    if (!activePill || !navLinksContainer || window.innerWidth <= 1100) return;
    if (activeLink) {
      const containerRect = navLinksContainer.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const left = linkRect.left - containerRect.left;
      const width = linkRect.width;

      activePill.style.left = `${left}px`;
      activePill.style.width = `${width}px`;
      activePill.style.opacity = '1';
    } else {
      activePill.style.opacity = '0';
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let currentId = '';
        const scrollPos = window.scrollY + 140;

        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentId = sec.getAttribute('id');
          }
        });

        let activeFound = null;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${currentId}`) {
            link.classList.add('active-nav-link');
            activeFound = link;
          } else {
            link.classList.remove('active-nav-link');
          }
        });

        updateActivePill(activeFound);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial pill placement and resize tracking
  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-links a.active-nav-link');
    updateActivePill(active);
  });

  setTimeout(() => {
    const initialActive = document.querySelector('.nav-links a.active-nav-link') || navLinks[0];
    updateActivePill(initialActive);
  }, 250);
}

/* ==========================================================================
   INTERSECTION OBSERVER SCROLL REVEAL (BUTTERY SMOOTH CARD ENTRANCES)
   ========================================================================== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.slate-card, .zodiac-card, .testimonial-card, .mini-card, ' +
    '.section-header, .stats-counter-strip, .calc-panel, ' +
    '.transformation-card-wrapper, .destiny-content, .faq-item, ' +
    '.appointment-container-card, .philosophy-quote'
  );

  targets.forEach((el) => {
    el.classList.add('reveal-init');
    const parent = el.parentElement;
    if (parent) {
      const idx = Array.from(parent.children).indexOf(el);
      if (idx % 4 === 1) el.classList.add('stagger-1');
      else if (idx % 4 === 2) el.classList.add('stagger-2');
      else if (idx % 4 === 3) el.classList.add('stagger-3');
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

/* ==========================================================================
   GLOBAL MODAL ESCAPE KEY LISTENER (SMOOTH CLOSING)
   ========================================================================== */
function initModalEscapeHandler() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });
}


/* ==========================================================================
   IN-PAGE 2-SIDED COSMIC SNAPSHOT LOGIC
   ========================================================================== */
let currentInlineProfile = null;

function scrollToCosmicSnapshot(e) {
  if (e) e.preventDefault();
  const target = document.getElementById('cosmicSnapshotSection');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const nameInput = document.getElementById('inlineName');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 600);
    }
  }
}

function getInlinePob() {
  const countryEl = document.getElementById('inlineCountry');
  const stateEl = document.getElementById('inlineState');
  const districtEl = document.getElementById('inlineDistrict');
  const pobEl = document.getElementById('inlinePob');

  const country = countryEl ? countryEl.value.trim() : '';
  const state = stateEl ? stateEl.value.trim() : '';
  const district = districtEl ? districtEl.value.trim() : '';

  const parts = [district, state, country].filter(Boolean);
  const combined = parts.join(', ');
  if (pobEl) pobEl.value = combined;
  return combined;
}

function updateInlineSnapshot() {
  const nameEl = document.getElementById('inlineName');
  const dobEl = document.getElementById('inlineDob');
  const tobEl = document.getElementById('inlineTob');

  const name = nameEl ? nameEl.value.trim() : '';
  let dob = dobEl ? dobEl.value : '';
  if (!dob && dobEl) {
    dob = dobEl.getAttribute('value') || '';
  }
  const tob = tobEl && tobEl.value ? tobEl.value : '12:00';
  const pob = getInlinePob();

  if (!name || !dob) return;
  if (!window.CosmicEngine || !window.CosmicEngine.generateCosmicProfile) return;

  const p = window.CosmicEngine.generateCosmicProfile(name, dob, tob, pob || 'Earth');
  currentInlineProfile = p;

  // 1. Hero Header
  const headline = document.getElementById('inlineHeroHeadline');
  if (headline) {
    headline.innerHTML = `<span>${escapeHtmlInline(p.name.toUpperCase())}</span>, THE COSMOS SEES YOU AS ${p.article} <span class="gold-gradient-text">${p.zodiac.sign.toUpperCase()}</span>.`;
  }
  const birthDetails = document.getElementById('inlineBirthDetails');
  if (birthDetails) {
    birthDetails.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> Born ${p.formattedDate} at ${p.tob} · ${escapeHtmlInline(p.pob)}`;
  }

  // 2. Core Numbers
  const lpNum = document.getElementById('inlineLifePathNum');
  const lpArch = document.getElementById('inlineLifePathArchetype');
  if (lpNum) lpNum.textContent = p.lifePath.number;
  if (lpArch) lpArch.textContent = p.lifePath.archetype;

  const destNum = document.getElementById('inlineDestinyNum');
  const destArch = document.getElementById('inlineDestinyArchetype');
  if (destNum) destNum.textContent = p.destiny.number;
  if (destArch) destArch.textContent = p.destiny.archetype;

  // 3. Zodiac Overview
  const emblem = document.getElementById('inlineZodiacEmblem');
  const signName = document.getElementById('inlineZodiacName');
  const meta = document.getElementById('inlineZodiacMeta');
  const tagline = document.getElementById('inlineZodiacTagline');
  const strengths = document.getElementById('inlineZodiacStrengths');
  const energy = document.getElementById('inlineZodiacEnergy');
  if (emblem) emblem.textContent = p.zodiac.symbol;
  if (signName) signName.textContent = p.zodiac.sign.toUpperCase();
  if (meta) meta.textContent = `${p.zodiac.element.toUpperCase()} · RULED BY ${p.zodiac.rulingPlanet.toUpperCase()}`;
  if (tagline) tagline.textContent = p.zodiac.tagline;
  if (strengths) strengths.textContent = p.zodiac.strengths.join(' · ');
  if (energy) energy.textContent = p.zodiac.todayEnergy;

  // 4. Numerology Summary
  const sumLpBadge = document.getElementById('inlineSummaryLifePathBadge');
  const sumLpTitle = document.getElementById('inlineSummaryLifePathTitle');
  const sumLpDesc = document.getElementById('inlineSummaryLifePathDesc');
  if (sumLpBadge) sumLpBadge.textContent = p.lifePath.number;
  if (sumLpTitle) sumLpTitle.textContent = p.lifePath.archetype;
  if (sumLpDesc) sumLpDesc.textContent = p.lifePath.summary;

  const sumDestBadge = document.getElementById('inlineSummaryDestinyBadge');
  const sumDestTitle = document.getElementById('inlineSummaryDestinyTitle');
  const sumDestDesc = document.getElementById('inlineSummaryDestinyDesc');
  if (sumDestBadge) sumDestBadge.textContent = p.destiny.number;
  if (sumDestTitle) sumDestTitle.textContent = p.destiny.archetype;
  if (sumDestDesc) sumDestDesc.textContent = p.destiny.description;

  // 5. Career Tendencies
  const careerPara = document.getElementById('inlineCareerPara');
  const careerRoles = document.getElementById('inlineCareerRoles');
  const careerLearning = document.getElementById('inlineCareerLearning');
  if (careerPara) careerPara.textContent = p.career.insight;
  if (careerRoles) careerRoles.textContent = p.career.roles.join(', ');
  if (careerLearning) careerLearning.textContent = p.career.learningStyle;

  // 6. Accordion
  const strList = document.getElementById('inlineStrengthsList');
  if (strList) {
    strList.innerHTML = p.lifePath.strengths.map(s => `<li>✦ ${escapeHtmlInline(s)}</li>`).join('');
  }
  const growthList = document.getElementById('inlineGrowthList');
  if (growthList) {
    growthList.innerHTML = p.lifePath.growthAreas.map(g => `<li>✦ ${escapeHtmlInline(g)}</li>`).join('');
  }
  const essenceText = document.getElementById('inlineEssenceText');
  if (essenceText) essenceText.textContent = p.lifePath.essence;

  // 7. Lucky Numbers & Colors
  const numWrap = document.getElementById('inlineLuckyNumbers');
  if (numWrap) {
    numWrap.innerHTML = p.luckyNumbers.map(n => `<span class="gold-gradient-pill" title="Lucky Vibration">${n}</span>`).join('');
  }
  const colorWrap = document.getElementById('inlineLuckyColors');
  if (colorWrap) {
    colorWrap.innerHTML = p.luckyColors.map(c => `
      <div class="inline-color-item">
        <span class="color-swatch-dot" style="background-color: ${c.hex};"></span>
        <span>${escapeHtmlInline(c.name)}</span>
      </div>
    `).join('');
  }

  // 8. Guidance Quote
  const quoteEl = document.getElementById('inlineGuidanceQuote');
  if (quoteEl) quoteEl.textContent = `"${p.quote}"`;
}

function handleInlineSnapshotSubmit(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  
  const nameEl = document.getElementById('inlineName');
  const dobEl = document.getElementById('inlineDob');
  const tobEl = document.getElementById('inlineTob');
  const countryEl = document.getElementById('inlineCountry');
  const stateEl = document.getElementById('inlineState');
  const districtEl = document.getElementById('inlineDistrict');

  const name = nameEl ? nameEl.value.trim() : '';
  let dob = dobEl ? dobEl.value : '';
  if (!dob && dobEl) {
    dob = dobEl.getAttribute('value') || '';
  }
  const tob = tobEl ? tobEl.value : '12:00';
  const country = countryEl ? countryEl.value.trim() : '';
  const state = stateEl ? stateEl.value.trim() : '';
  const district = districtEl ? districtEl.value.trim() : '';
  const pob = getInlinePob();

  if (!name) {
    showToast('Please enter your full name.', 'warning');
    if (nameEl) nameEl.focus();
    return;
  }
  if (!dob) {
    showToast('Please select your date of birth.', 'warning');
    if (dobEl) dobEl.focus();
    return;
  }
  if (!country) {
    showToast('Please specify your Country.', 'warning');
    if (countryEl) countryEl.focus();
    return;
  }
  if (!state) {
    showToast('Please specify your State.', 'warning');
    if (stateEl) stateEl.focus();
    return;
  }
  if (!district) {
    showToast('Please specify your District / City.', 'warning');
    if (districtEl) districtEl.focus();
    return;
  }

  const btn = document.getElementById('btnInlineGenerate');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Aligning Celestial Vibrations...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  }

  setTimeout(() => {
    try {
      // Reveal Results Card and expand into 2-sided view
      const resultsCard = document.getElementById('inlineResultsCard');
      const wrapper = document.getElementById('cosmicSnapshotWrapper');
      if (resultsCard) {
        resultsCard.style.display = 'block';
      }
      if (wrapper) {
        wrapper.classList.add('has-results');
      }

      updateInlineSnapshot();

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>Update Cosmic Snapshot</span> <i class="fa-solid fa-wand-magic-sparkles"></i>';
      }

      showToast('Your Cosmic Snapshot has been generated!', 'success');

      if (resultsCard) {
        setTimeout(() => {
          resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    } catch (err) {
      console.error('Error generating Cosmic Snapshot:', err);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>Generate Cosmic Snapshot</span> <i class="fa-solid fa-wand-magic-sparkles"></i>';
      }
      showToast('Could not calculate reading. Please check your inputs.', 'error');
    }
  }, 350);
}

function initInlineSnapshot() {
  const form = document.getElementById('inlineSnapshotForm');
  const btn = document.getElementById('btnInlineGenerate');
  const savePdfBtn = document.getElementById('btnInlineSavePdf');
  const shareBtn = document.getElementById('btnInlineShare');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleInlineSnapshotSubmit(e);
    });
  }
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleInlineSnapshotSubmit(e);
    });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleInlineSnapshotSubmit(e);
    });
  }
  if (savePdfBtn) {
    savePdfBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleInlineSaveReading();
    });
    savePdfBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleInlineSaveReading();
    });
  }
  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleInlineShareReading();
    });
    shareBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleInlineShareReading();
    });
  }

  // Initialize Accordion within Snapshot
  initInlineAccordion();
}

// Global window bindings for inline HTML attributes
window.handleInlineSnapshotSubmit = handleInlineSnapshotSubmit;
window.updateInlineSnapshot = updateInlineSnapshot;
window.initInlineSnapshot = initInlineSnapshot;
window.initInlineAccordion = initInlineAccordion;
window.toggleInlineAcc = toggleInlineAcc;
window.handleInlineSaveReading = handleInlineSaveReading;
window.handleInlineShareReading = handleInlineShareReading;

function toggleInlineAcc(id) {
  const item = document.getElementById(id);
  if (!item) return;

  const accordion = item.closest('.inline-accordion') || document.querySelector('.inline-accordion');
  const wasActive = item.classList.contains('active');

  if (accordion) {
    accordion.querySelectorAll('.inline-acc-item').forEach(i => i.classList.remove('active'));
  }

  if (!wasActive) {
    item.classList.add('active');
  }
}

function initInlineAccordion() {
  const accordion = document.querySelector('.inline-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.inline-acc-item');
  items.forEach(item => {
    const btn = item.querySelector('.inline-acc-btn');
    if (!btn) return;

    // Remove any previously attached duplicate listeners by cloning or direct reference
    btn.onclick = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const wasActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    };
  });
}

function handleInlineSaveReading() {
  if (!currentInlineProfile) {
    updateInlineSnapshot();
  }
  const p = currentInlineProfile;
  if (!p) {
    showToast('Please generate your Cosmic Snapshot first.', 'warning');
    return;
  }

  const btn = document.getElementById('btnInlineSavePdf');
  if (window.CosmicEngine && typeof window.CosmicEngine.exportCosmicPdf === 'function') {
    window.CosmicEngine.exportCosmicPdf(p, btn);
  } else {
    // Immediate clean fallback download
    const summary = [
      '====================================================',
      '        V STAR NUMEROLOGY & ASTROLOGY',
      '           YOUR COSMIC SNAPSHOT & READING',
      '====================================================',
      '',
      `NAME: ${p.name.toUpperCase()}`,
      `BIRTH DATA: Born ${p.formattedDate} at ${p.tob} · ${p.pob}`,
      `SUN SIGN: ${p.zodiac.sign.toUpperCase()} (${p.zodiac.symbol})`,
      `ELEMENT: ${p.zodiac.element} | RULING PLANET: ${p.zodiac.rulingPlanet}`,
      `TAGLINE: "${p.zodiac.tagline}"`,
      '',
      '--- CORE NUMBERS ---',
      `LIFE PATH NUMBER: ${p.lifePath.number} (${p.lifePath.archetype})`,
      `DESTINY NUMBER:   ${p.destiny.number} (${p.destiny.archetype})`,
      '',
      '--- ZODIAC STRENGTHS & DAILY ENERGY ---',
      `STRENGTHS: ${p.zodiac.strengths.join(' · ')}`,
      `TODAY\'S ENERGY: ${p.zodiac.todayEnergy}`,
      '',
      '--- CAREER TENDENCIES ---',
      `${p.career.insight}`,
      `Roles to explore: ${p.career.roles.join(', ')}`,
      `Learning style:   ${p.career.learningStyle}`,
      '',
      '--- LUCKY RESONANCE ---',
      `Lucky Numbers: ${p.luckyNumbers.join(', ')}`,
      `Lucky Colors:  ${p.luckyColors.map(c => c.name).join(', ')}`,
      '',
      '--- PERSONALIZED GUIDANCE ---',
      `"${p.quote}"`,
      '',
      '====================================================',
      'For personal reflection and entertainment only.',
      'V STAR Numerology & Astrology · https://vstarnumerology.com'
    ].join('\n');

    try {
      const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VSTAR_Cosmic_Snapshot_${p.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Reading saved and downloaded!', 'success');
    } catch (err) {
      showToast('Reading saved to your browser.', 'info');
    }
  }
}

function handleInlineShareReading() {
  if (!currentInlineProfile) {
    updateInlineSnapshot();
  }
  const p = currentInlineProfile;
  const name = p && p.name ? p.name : (document.getElementById('inlineName')?.value || 'Seeker');
  const dob = p && p.dob ? p.dob : (document.getElementById('inlineDob')?.value || '');
  const tob = p && p.tob ? p.tob : (document.getElementById('inlineTob')?.value || '12:00');
  const pob = p && p.pob ? p.pob : getInlinePob();

  const shareUrl = window.location.origin + '/results?' + new URLSearchParams({
    name: name,
    dob: dob,
    tob: tob,
    pob: pob
  }).toString();

  const shareTitle = `V STAR Cosmic Reading - ${name}`;
  const shareText = `✨ Discover ${name}'s Cosmic Blueprint on V STAR Numerology ✨\nSun Sign: ${p ? p.zodiac.sign.toUpperCase() : ''} (${p ? p.zodiac.symbol : ''})\nLife Path: ${p ? p.lifePath.number : ''}\nDestiny: ${p ? p.destiny.number : ''}\n\nExplore your reading here:`;

  // Native Mobile Web Share API (WhatsApp, Instagram, Messages, etc.)
  if (navigator.share && typeof navigator.share === 'function') {
    navigator.share({
      title: shareTitle,
      text: shareText,
      url: shareUrl
    }).then(() => {
      showToast('Reading shared successfully!', 'success');
    }).catch((err) => {
      if (!err || err.name !== 'AbortError') {
        copyShareUrl(shareUrl);
      }
    });
  } else {
    copyShareUrl(shareUrl);
  }
}

function copyShareUrl(url) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Shareable reading link copied to clipboard!', 'success');
    }).catch(() => {
      fallbackCopyText(url);
    });
  } else {
    fallbackCopyText(url);
  }
}

function fallbackCopyText(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(ta);
    if (successful) {
      showToast('Shareable reading link copied to clipboard!', 'success');
    } else {
      window.prompt('Copy your Cosmic Reading link:', text);
    }
  } catch (err) {
    window.prompt('Copy your Cosmic Reading link:', text);
  }
}

function escapeHtmlInline(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ==========================================================================
   PRIVACY & COOKIE CONSENT BANNER & MODALS
   ========================================================================== */
function getStoredCookieConsent() {
  try {
    const val = localStorage.getItem('vstar_cookie_consent');
    if (val) return val;
  } catch (e) {}
  try {
    const val = sessionStorage.getItem('vstar_cookie_consent');
    if (val) return val;
  } catch (e) {}
  try {
    const match = document.cookie.match(/vstar_cookie_consent=([^;]+)/);
    if (match) return match[1];
  } catch (e) {}
  return null;
}

window.handleCookieChoice = function(accepted) {
  const choice = accepted ? 'granted' : 'denied';
  try { localStorage.setItem('vstar_cookie_consent', choice); } catch (e) {}
  try { sessionStorage.setItem('vstar_cookie_consent', choice); } catch (e) {}
  try { document.cookie = `vstar_cookie_consent=${choice}; path=/; max-age=31536000; SameSite=Lax`; } catch (e) {}

  const banner = document.getElementById('vstarCookieBanner');
  if (banner) {
    banner.style.display = 'none';
    banner.classList.remove('active');
  }

  try {
    if (typeof showToast === 'function') {
      if (accepted) {
        showToast('Preferences saved: Essential storage active.', 'success');
      } else {
        showToast('Preferences saved: Non-essential storage disabled.', 'info');
      }
    }
  } catch (e) {}
};

function initCookieConsent() {
  const consent = getStoredCookieConsent();
  const banner = document.getElementById('vstarCookieBanner');
  if (!consent && banner) {
    setTimeout(() => {
      banner.style.display = 'flex';
      banner.classList.add('active');
    }, 800);
  }

  const acceptBtn = document.getElementById('btnCookieAccept');
  const declineBtn = document.getElementById('btnCookieDecline');
  const closeBtn = document.getElementById('btnCookieClose');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', (e) => { e.preventDefault(); window.handleCookieChoice(true); });
    acceptBtn.addEventListener('touchend', (e) => { e.preventDefault(); window.handleCookieChoice(true); });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', (e) => { e.preventDefault(); window.handleCookieChoice(false); });
    declineBtn.addEventListener('touchend', (e) => { e.preventDefault(); window.handleCookieChoice(false); });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => { e.preventDefault(); window.handleCookieChoice(true); });
    closeBtn.addEventListener('touchend', (e) => { e.preventDefault(); window.handleCookieChoice(true); });
  }
}

document.addEventListener('DOMContentLoaded', initCookieConsent);

window.openPrivacyModal = function() {
  const modal = document.getElementById('privacyModal');
  if (modal) modal.classList.add('active');
};

window.closePrivacyModal = function() {
  const modal = document.getElementById('privacyModal');
  if (modal) modal.classList.remove('active');
};

window.openTermsModal = function() {
  const modal = document.getElementById('termsModal');
  if (modal) modal.classList.add('active');
};

window.closeTermsModal = function() {
  const modal = document.getElementById('termsModal');
  if (modal) modal.classList.remove('active');
};
