/**
 * V STAR Numerology & Astrology
 * Country, State & District Smart Autocomplete with Rich Dataset
 */
(function(window) {
  'use strict';

  const POB_DATA = {
    countries: [
      'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
      'United Arab Emirates', 'Singapore', 'Malaysia', 'Saudi Arabia', 'Qatar',
      'Kuwait', 'Oman', 'Sri Lanka', 'Germany', 'France', 'South Africa',
      'New Zealand', 'Nepal', 'Bangladesh', 'Switzerland', 'Netherlands',
      'Italy', 'Japan', 'Ireland', 'Bahrain', 'Mauritius', 'Sweden', 'Norway'
    ],
    states: {
      'India': [
        'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana',
        'Maharashtra', 'Delhi', 'Gujarat', 'Uttar Pradesh', 'West Bengal',
        'Rajasthan', 'Punjab', 'Madhya Pradesh', 'Haryana', 'Bihar',
        'Odisha', 'Goa', 'Assam', 'Himachal Pradesh', 'Uttarakhand',
        'Jharkhand', 'Chhattisgarh', 'Jammu & Kashmir', 'Chandigarh', 'Puducherry'
      ],
      'United States': [
        'California', 'Texas', 'New York', 'Florida', 'Illinois',
        'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
        'New Jersey', 'Virginia', 'Washington', 'Massachusetts', 'Arizona'
      ],
      'United Kingdom': [
        'England', 'Scotland', 'Wales', 'Northern Ireland', 'Greater London'
      ],
      'Canada': [
        'Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'
      ],
      'Australia': [
        'New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'
      ],
      'United Arab Emirates': [
        'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'
      ],
      'Singapore': [
        'Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region'
      ],
      'Malaysia': [
        'Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Perak', 'Sabah', 'Sarawak'
      ]
    },
    districts: {
      'Tamil Nadu': [
        'Chennai', 'Dindigul', 'Tiruchirappalli (Trichy)', 'Madurai', 'Coimbatore',
        'Salem', 'Tirunelveli', 'Thanjavur', 'Erode', 'Vellore', 'Kanchipuram',
        'Tiruppur', 'Karur', 'Theni', 'Virudhunagar', 'Sivaganga', 'Ramanathapuram',
        'Thoothukudi', 'Cuddalore', 'Nagapattinam', 'Pudukkottai', 'Krishnagiri',
        'Dharmapuri', 'Namakkal', 'Nilgiris (Ooty)', 'Perambalur', 'Ariyalur',
        'Tiruvallur', 'Tiruvannamalai', 'Viluppuram', 'Kallakurichi', 'Ranipet',
        'Tirupathur', 'Chengalpattu', 'Tenkasi', 'Mayiladuthurai', 'Kanyakumari (Nagercoil)'
      ],
      'Kerala': [
        'Thiruvananthapuram', 'Kochi (Ernakulam)', 'Kozhikode', 'Thrissur', 'Kollam',
        'Palakkad', 'Malappuram', 'Kannur', 'Kottayam', 'Alappuzha', 'Idukki',
        'Pathanamthitta', 'Kasaragod', 'Wayanad'
      ],
      'Karnataka': [
        'Bengaluru (Bangalore)', 'Mysuru (Mysore)', 'Mangaluru', 'Hubballi-Dharwad',
        'Belagavi', 'Kalaburagi', 'Davanagere', 'Ballari', 'Shivamogga', 'Tumakuru',
        'Udupi', 'Hassan', 'Bidar', 'Raichur'
      ],
      'Andhra Pradesh': [
        'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati',
        'Kakinada', 'Rajahmundry', 'Kadapa', 'Anantapur', 'Eluru', 'Ongole'
      ],
      'Telangana': [
        'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam',
        'Secunderabad', 'Mahbubnagar', 'Nalgonda', 'Suryapet'
      ],
      'Maharashtra': [
        'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad (Chhatrapati Sambhajinagar)',
        'Solapur', 'Amravati', 'Kolhapur', 'Navi Mumbai', 'Sangli', 'Jalgaon'
      ],
      'Delhi': [
        'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi',
        'Central Delhi', 'South West Delhi', 'North West Delhi'
      ],
      'Gujarat': [
        'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
        'Junagadh', 'Gandhinagar', 'Anand', 'Navsari'
      ],
      'Uttar Pradesh': [
        'Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj (Allahabad)', 'Noida',
        'Ghaziabad', 'Meerut', 'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur'
      ],
      'West Bengal': [
        'Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'Darjeeling', 'Bardhaman'
      ],
      'Rajasthan': [
        'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar'
      ],
      'Punjab': [
        'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)'
      ],
      'California': [
        'Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento', 'Fresno', 'Oakland'
      ],
      'New York': [
        'New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany'
      ],
      'Texas': [
        'Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'
      ],
      'England': [
        'London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol', 'Newcastle'
      ],
      'Dubai': [
        'Downtown Dubai', 'Dubai Marina', 'Deira', 'Bur Dubai', 'Jumeirah', 'Business Bay'
      ]
    }
  };

  const ALL_DISTRICTS_FALLBACK = [
    'Chennai', 'Dindigul', 'Tiruchirappalli (Trichy)', 'Madurai', 'Coimbatore', 'Salem',
    'Tirunelveli', 'Thanjavur', 'Erode', 'Vellore', 'Bengaluru (Bangalore)', 'Mumbai',
    'Delhi', 'Hyderabad', 'Kolkata', 'Pune', 'Kochi (Ernakulam)', 'New York City',
    'London', 'Dubai', 'Singapore', 'Toronto', 'Sydney'
  ];

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const q = query.toLowerCase();
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return escapeHtml(text);
    const before = escapeHtml(text.substring(0, idx));
    const match = escapeHtml(text.substring(idx, idx + query.length));
    const after = escapeHtml(text.substring(idx + query.length));
    return `${before}<strong>${match}</strong>${after}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initPobAutocomplete(cfg) {
    const countryInput = document.getElementById(cfg.countryInputId);
    const countryDropdown = document.getElementById(cfg.countryDropdownId);
    const stateInput = document.getElementById(cfg.stateInputId);
    const stateDropdown = document.getElementById(cfg.stateDropdownId);
    const districtInput = document.getElementById(cfg.districtInputId);
    const districtDropdown = document.getElementById(cfg.districtDropdownId);
    const hiddenPob = cfg.hiddenPobId ? document.getElementById(cfg.hiddenPobId) : null;

    if (!countryInput || !stateInput || !districtInput) return;

    function getCombinedPob() {
      const country = countryInput.value.trim();
      const state = stateInput.value.trim();
      const district = districtInput.value.trim();
      const parts = [district, state, country].filter(Boolean);
      const combined = parts.join(', ');
      if (hiddenPob) hiddenPob.value = combined;
      if (typeof cfg.onPobChange === 'function') {
        cfg.onPobChange(combined);
      }
      return combined;
    }

    // Attach Autocomplete to an input & dropdown pair
    function attachFieldAutocomplete({ input, dropdown, getList, iconClass, onSelect }) {
      if (!input || !dropdown) return;
      let activeIndex = -1;

      // Prevent native browser autofill ("Saved info") aggressively
      input.setAttribute('autocomplete', 'new-password');
      input.setAttribute('data-lpignore', 'true');
      input.setAttribute('data-form-type', 'other');
      input.setAttribute('spellcheck', 'false');

      // Prevent Copy, Paste, Cut & Drag-and-Drop
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.showToast === 'function') {
          window.showToast('Copy-paste is disabled for accurate birth details.', 'warning');
        }
        return false;
      });

      input.addEventListener('copy', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });

      input.addEventListener('cut', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });

      input.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });

      function render(items, query) {
        if (!items || items.length === 0) {
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          activeIndex = -1;
          return;
        }

        const maxItems = 12;
        const visibleItems = items.slice(0, maxItems);

        dropdown.innerHTML = visibleItems.map((item, idx) => `
          <div class="pob-suggestion-item" data-idx="${idx}" data-val="${escapeHtml(item)}">
            <i class="${iconClass}"></i>
            <span>${highlightMatch(item, query)}</span>
          </div>
        `).join('');

        dropdown.style.display = 'block';
        activeIndex = -1;
      }

      function closeDropdown() {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        activeIndex = -1;
      }

      input.addEventListener('input', () => {
        const query = input.value.trim();
        const list = getList();
        const filtered = query
          ? list.filter(item => item.toLowerCase().includes(query.toLowerCase()))
          : list;
        render(filtered, query);
        getCombinedPob();
      });

      input.addEventListener('focus', () => {
        const query = input.value.trim();
        const list = getList();
        const filtered = query
          ? list.filter(item => item.toLowerCase().includes(query.toLowerCase()))
          : list;
        render(filtered, query);
      });

      // Click on item
      dropdown.addEventListener('mousedown', (e) => {
        const itemEl = e.target.closest('.pob-suggestion-item');
        if (!itemEl) return;
        e.preventDefault();
        const val = itemEl.getAttribute('data-val');
        input.value = val;
        closeDropdown();
        getCombinedPob();
        if (typeof onSelect === 'function') onSelect(val);
      });

      // Keyboard navigation & Shortcut Prevention
      input.addEventListener('keydown', (e) => {
        // Intercept and block Ctrl+V, Cmd+V, Shift+Insert (Paste shortcuts)
        if (((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) || (e.shiftKey && e.key === 'Insert')) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof window.showToast === 'function') {
            window.showToast('Copy-paste is disabled for accurate birth details.', 'warning');
          }
          return false;
        }

        // Intercept and block Ctrl+C, Cmd+C, Ctrl+X, Cmd+X (Copy/Cut shortcuts)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X')) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        const items = dropdown.querySelectorAll('.pob-suggestion-item');
        if (dropdown.style.display !== 'block' || items.length === 0) {
          if (e.key === 'ArrowDown') {
            const list = getList();
            render(list, input.value.trim());
          }
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIndex = (activeIndex + 1) % items.length;
          updateActive(items);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIndex = (activeIndex - 1 + items.length) % items.length;
          updateActive(items);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeIndex >= 0 && items[activeIndex]) {
            const val = items[activeIndex].getAttribute('data-val');
            input.value = val;
            closeDropdown();
            getCombinedPob();
            if (typeof onSelect === 'function') onSelect(val);
          } else if (items.length > 0) {
            const val = items[0].getAttribute('data-val');
            input.value = val;
            closeDropdown();
            getCombinedPob();
            if (typeof onSelect === 'function') onSelect(val);
          }
        } else if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      function updateActive(items) {
        items.forEach((it, idx) => {
          if (idx === activeIndex) {
            it.classList.add('active');
            it.scrollIntoView({ block: 'nearest' });
          } else {
            it.classList.remove('active');
          }
        });
      }

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
          closeDropdown();
        }
      });
    }

    // 1. Country Autocomplete
    attachFieldAutocomplete({
      input: countryInput,
      dropdown: countryDropdown,
      getList: () => POB_DATA.countries,
      iconClass: 'fa-solid fa-earth-americas',
      onSelect: (selectedCountry) => {
        // If state is not valid for this country, clear state & district
        const statesForCountry = POB_DATA.states[selectedCountry];
        if (statesForCountry && !statesForCountry.includes(stateInput.value.trim())) {
          stateInput.value = statesForCountry[0] || '';
          const districtsForState = POB_DATA.districts[stateInput.value.trim()];
          districtInput.value = districtsForState ? districtsForState[0] : '';
        }
        getCombinedPob();
        setTimeout(() => stateInput.focus(), 50);
      }
    });

    // 2. State Autocomplete
    attachFieldAutocomplete({
      input: stateInput,
      dropdown: stateDropdown,
      getList: () => {
        const country = countryInput.value.trim();
        if (POB_DATA.states[country]) {
          return POB_DATA.states[country];
        }
        // Fallback: all Indian states + top global states
        return POB_DATA.states['India'].concat(POB_DATA.states['United States'] || []);
      },
      iconClass: 'fa-solid fa-map-location-dot',
      onSelect: (selectedState) => {
        const districtsForState = POB_DATA.districts[selectedState];
        if (districtsForState && !districtsForState.includes(districtInput.value.trim())) {
          districtInput.value = districtsForState[0] || '';
        }
        getCombinedPob();
        setTimeout(() => districtInput.focus(), 50);
      }
    });

    // 3. District / City Autocomplete
    attachFieldAutocomplete({
      input: districtInput,
      dropdown: districtDropdown,
      getList: () => {
        const state = stateInput.value.trim();
        if (POB_DATA.districts[state]) {
          return POB_DATA.districts[state];
        }
        // Fallback to all Tamil Nadu districts + top major cities
        return POB_DATA.districts['Tamil Nadu'].concat(ALL_DISTRICTS_FALLBACK);
      },
      iconClass: 'fa-solid fa-city',
      onSelect: (selectedDistrict) => {
        getCombinedPob();
      }
    });

    // Initial combined sync
    getCombinedPob();
  }

  window.POB_DATA = POB_DATA;
  window.initPobAutocomplete = initPobAutocomplete;

})(window);
