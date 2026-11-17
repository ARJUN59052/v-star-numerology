/**
 * V STAR Numerology & Astrology
 * Country, State & District / City Smart Autocomplete with Global Dataset & Free Typing Support
 */
(function(window) {
  'use strict';

  const POB_DATA = {
    countries: [
      'India', 'Australia', 'United States', 'United Kingdom', 'Canada',
      'United Arab Emirates', 'Singapore', 'Malaysia', 'Saudi Arabia', 'Qatar',
      'Kuwait', 'Oman', 'Sri Lanka', 'Germany', 'France', 'South Africa',
      'New Zealand', 'Nepal', 'Bangladesh', 'Switzerland', 'Netherlands',
      'Italy', 'Japan', 'Ireland', 'Bahrain', 'Mauritius', 'Sweden', 'Norway',
      'Spain', 'Thailand', 'Indonesia', 'Philippines'
    ],
    states: {
      'Australia': [
        'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
        'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
      ],
      'India': [
        'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana',
        'Maharashtra', 'Delhi', 'Gujarat', 'Uttar Pradesh', 'West Bengal',
        'Rajasthan', 'Punjab', 'Madhya Pradesh', 'Haryana', 'Bihar',
        'Odisha', 'Goa', 'Assam', 'Himachal Pradesh', 'Uttarakhand',
        'Jharkhand', 'Chhattisgarh', 'Jammu & Kashmir', 'Chandigarh', 'Puducherry'
      ],
      'United States': [
        'California', 'Texas', 'Florida', 'New York', 'Illinois',
        'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
        'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts'
      ],
      'United Kingdom': [
        'England', 'Greater London', 'Scotland', 'Wales', 'Northern Ireland'
      ],
      'Canada': [
        'Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'
      ],
      'United Arab Emirates': [
        'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
      ],
      'Singapore': [
        'Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region'
      ],
      'Malaysia': [
        'Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Perak', 'Sabah', 'Sarawak'
      ],
      'New Zealand': [
        'Auckland', 'Wellington', 'Canterbury', 'Waikato', 'Bay of Plenty', 'Otago'
      ],
      'Sri Lanka': [
        'Western Province', 'Central Province', 'Southern Province', 'Northern Province', 'Eastern Province'
      ],
      'Germany': [
        'Bavaria', 'Berlin', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hesse', 'Hamburg'
      ],
      'France': [
        'Île-de-France (Paris)', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Occitanie'
      ],
      'South Africa': [
        'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'
      ]
    },
    districts: {
      // AUSTRALIA
      'New South Wales': [
        'Sydney', 'Newcastle', 'Central Coast', 'Wollongong', 'Albury',
        'Wagga Wagga', 'Tamworth', 'Port Macquarie', 'Orange', 'Dubbo',
        'Bathurst', 'Coffs Harbour', 'Tweed Heads', 'Maitland', 'Byron Bay'
      ],
      'Victoria': [
        'Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton',
        'Mildura', 'Warrnambool', 'Wodonga', 'Traralgon', 'Wangaratta'
      ],
      'Queensland': [
        'Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns',
        'Toowoomba', 'Mackay', 'Rockhampton', 'Bundaberg', 'Hervey Bay', 'Gladstone'
      ],
      'Western Australia': [
        'Perth', 'Mandurah', 'Bunbury', 'Geraldton', 'Kalgoorlie',
        'Albany', 'Busselton', 'Broome', 'Port Hedland'
      ],
      'South Australia': [
        'Adelaide', 'Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Lincoln', 'Port Augusta', 'Victor Harbor'
      ],
      'Tasmania': [
        'Hobart', 'Launceston', 'Devonport', 'Burnie'
      ],
      'Australian Capital Territory': [
        'Canberra', 'Belconnen', 'Tuggeranong', 'Gungahlin', 'Woden Valley'
      ],
      'Northern Territory': [
        'Darwin', 'Alice Springs', 'Palmerston', 'Katherine'
      ],

      // INDIA
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
      'Madhya Pradesh': [
        'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Ratlam'
      ],
      'Haryana': [
        'Gurugram (Gurgaon)', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Rohtak', 'Hisar', 'Sonipat'
      ],
      'Bihar': [
        'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif'
      ],
      'Odisha': [
        'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore'
      ],
      'Goa': [
        'North Goa (Panaji)', 'South Goa (Margao)', 'Vasco da Gama', 'Mapusa', 'Ponda'
      ],
      'Assam': [
        'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur'
      ],
      'Himachal Pradesh': [
        'Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Manali', 'Bilaspur'
      ],
      'Uttarakhand': [
        'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Rishikesh', 'Nainital'
      ],
      'Jharkhand': [
        'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'
      ],
      'Chhattisgarh': [
        'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon'
      ],
      'Jammu & Kashmir': [
        'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'
      ],
      'Chandigarh': [
        'Chandigarh'
      ],
      'Puducherry': [
        'Pondicherry', 'Karaikal', 'Mahe', 'Yanam'
      ],

      // UNITED STATES
      'California': [
        'Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento',
        'Fresno', 'Oakland', 'Long Beach', 'Bakersfield', 'Anaheim', 'Irvine'
      ],
      'Texas': [
        'Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth',
        'El Paso', 'Arlington', 'Plano', 'Corpus Christi', 'Lubbock'
      ],
      'Florida': [
        'Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg',
        'Fort Lauderdale', 'Tallahassee', 'Cape Coral', 'Port St. Lucie'
      ],
      'New York': [
        'New York City (NYC)', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'White Plains'
      ],
      'Illinois': [
        'Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield', 'Peoria'
      ],
      'Pennsylvania': [
        'Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Lancaster'
      ],
      'Ohio': [
        'Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'
      ],
      'Georgia': [
        'Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs'
      ],
      'North Carolina': [
        'Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary'
      ],
      'Michigan': [
        'Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing'
      ],
      'New Jersey': [
        'Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison', 'Woodbridge', 'Trenton'
      ],
      'Virginia': [
        'Virginia Beach', 'Chesapeake', 'Norfolk', 'Richmond', 'Newport News', 'Alexandria'
      ],
      'Washington': [
        'Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett'
      ],
      'Arizona': [
        'Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Tempe'
      ],
      'Massachusetts': [
        'Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton', 'Quincy'
      ],

      // UNITED KINGDOM
      'England': [
        'London', 'Birmingham', 'Manchester', 'Leeds', 'Liverpool', 'Bristol',
        'Newcastle', 'Sheffield', 'Nottingham', 'Leicester', 'Southampton', 'Oxford', 'Cambridge'
      ],
      'Greater London': [
        'City of London', 'Westminster', 'Croydon', 'Barnet', 'Ealing', 'Bromley', 'Camden', 'Greenwich'
      ],
      'Scotland': [
        'Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness', 'Stirling', 'Perth'
      ],
      'Wales': [
        'Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Bangor'
      ],
      'Northern Ireland': [
        'Belfast', 'Derry (Londonderry)', 'Lisburn', 'Newry', 'Armagh'
      ],

      // CANADA
      'Ontario': [
        'Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Windsor'
      ],
      'Quebec': [
        'Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke'
      ],
      'British Columbia': [
        'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Victoria', 'Kelowna', 'Abbotsford'
      ],
      'Alberta': [
        'Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat'
      ],
      'Manitoba': [
        'Winnipeg', 'Brandon', 'Steinbach'
      ],

      // UNITED ARAB EMIRATES
      'Dubai': [
        'Downtown Dubai', 'Dubai Marina', 'Deira', 'Bur Dubai', 'Jumeirah', 'Business Bay', 'Al Barsha', 'JLT'
      ],
      'Abu Dhabi': [
        'Abu Dhabi City', 'Al Ain', 'Al Dhafra', 'Yas Island', 'Khalifa City', 'Mussafah'
      ],
      'Sharjah': [
        'Sharjah City', 'Khor Fakkan', 'Kalba', 'Al Dhaid'
      ],
      'Ajman': [
        'Ajman City', 'Al Manama', 'Masfout'
      ],
      'Ras Al Khaimah': [
        'RAK City', 'Al Hamra', 'Mina Al Arab'
      ],
      'Fujairah': [
        'Fujairah City', 'Dibba Al-Fujairah'
      ],
      'Umm Al Quwain': [
        'UAQ City', 'Falaj Al Mualla'
      ],

      // SINGAPORE
      'Central Region': [
        'Downtown Core', 'Orchard', 'Marina Bay', 'Tanjong Pagar', 'Bukit Merah', 'Queenstown', 'Novena'
      ],
      'East Region': [
        'Tampines', 'Bedok', 'Pasir Ris', 'Changi'
      ],
      'North Region': [
        'Woodlands', 'Yishun', 'Sembawang'
      ],
      'North-East Region': [
        'Ang Mo Kio', 'Hougang', 'Sengkang', 'Punggol', 'Serangoon'
      ],
      'West Region': [
        'Jurong East', 'Jurong West', 'Clementi', 'Bukit Batok', 'Choa Chu Kang'
      ],

      // MALAYSIA
      'Kuala Lumpur': [
        'Bukit Bintang', 'Bangsar', 'Cheras', 'Kepong', 'Setapak', 'Mont Kiara'
      ],
      'Selangor': [
        'Petaling Jaya', 'Subang Jaya', 'Shah Alam', 'Klang', 'Ampang', 'Kajang', 'Puchong'
      ],
      'Penang': [
        'George Town', 'Butterworth', 'Bayan Lepas', 'Bukit Mertajam'
      ],
      'Johor': [
        'Johor Bahru', 'Iskandar Puteri', 'Muar', 'Batu Pahat', 'Kluang'
      ],
      'Perak': [
        'Ipoh', 'Taiping', 'Teluk Intan'
      ],
      'Sabah': [
        'Kota Kinabalu', 'Sandakan', 'Tawau'
      ],
      'Sarawak': [
        'Kuching', 'Miri', 'Sibu', 'Bintulu'
      ],

      // NEW ZEALAND
      'Auckland': ['Auckland Central', 'North Shore', 'Manukau', 'Waitakere'],
      'Wellington': ['Wellington City', 'Lower Hutt', 'Porirua', 'Upper Hutt'],
      'Canterbury': ['Christchurch', 'Timaru', 'Ashburton'],
      'Waikato': ['Hamilton', 'Taupo', 'Cambridge'],

      // SRI LANKA
      'Western Province': ['Colombo', 'Negombo', 'Gampaha', 'Kalutara', 'Dehiwala-Mount Lavinia'],
      'Central Province': ['Kandy', 'Matale', 'Nuwara Eliya'],
      'Southern Province': ['Galle', 'Matara', 'Hambantota'],
      'Northern Province': ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya'],
      'Eastern Province': ['Batticaloa', 'Trincomalee', 'Ampara']
    }
  };

  // Top Major Cities Fallback per Country (used when state is generic or missing)
  const COUNTRY_CITIES_FALLBACK = {
    'Australia': [
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
      'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Geelong', 'Hobart', 'Darwin'
    ],
    'United States': [
      'New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
      'Austin', 'Miami', 'San Francisco', 'Seattle', 'Atlanta', 'Boston'
    ],
    'United Kingdom': [
      'London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow',
      'Liverpool', 'Newcastle', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff', 'Belfast'
    ],
    'Canada': [
      'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
      'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton'
    ],
    'United Arab Emirates': [
      'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Al Ain'
    ],
    'Singapore': [
      'Central Singapore', 'Jurong', 'Tampines', 'Woodlands', 'Ang Mo Kio', 'Bedok'
    ],
    'Malaysia': [
      'Kuala Lumpur', 'George Town (Penang)', 'Petaling Jaya', 'Johor Bahru', 'Shah Alam', 'Ipoh'
    ],
    'New Zealand': [
      'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Dunedin'
    ],
    'Sri Lanka': [
      'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Batticaloa'
    ],
    'Germany': [
      'Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart', 'Düsseldorf'
    ],
    'France': [
      'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg'
    ],
    'South Africa': [
      'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'
    ],
    'Saudi Arabia': [
      'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar'
    ],
    'Qatar': [
      'Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor'
    ],
    'Kuwait': [
      'Kuwait City', 'Hawalli', 'Salmiya', 'Al Ahmadi'
    ],
    'Oman': [
      'Muscat', 'Salalah', 'Sohar', 'Nizwa'
    ],
    'India': [
      'Chennai', 'Bengaluru (Bangalore)', 'Mumbai', 'New Delhi', 'Hyderabad',
      'Kolkata', 'Pune', 'Ahmedabad', 'Coimbatore', 'Madurai', 'Tiruchirappalli (Trichy)', 'Kochi (Ernakulam)'
    ]
  };

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

    // Attach Autocomplete to an input & dropdown pair (Fully enables free typing)
    function attachFieldAutocomplete({ input, dropdown, getList, iconClass, onSelect }) {
      if (!input || !dropdown) return;
      let activeIndex = -1;

      // Ensure input is freely editable and non-readonly
      input.removeAttribute('readonly');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('data-lpignore', 'true');
      input.setAttribute('data-form-type', 'other');
      input.setAttribute('spellcheck', 'false');

      function render(items, query) {
        if (!items || items.length === 0) {
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          activeIndex = -1;
          return;
        }

        const maxItems = 15;
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

      // Free typing input handler
      input.addEventListener('input', () => {
        const query = input.value.trim();
        const list = getList() || [];
        const filtered = query
          ? list.filter(item => item.toLowerCase().includes(query.toLowerCase()))
          : list;
        render(filtered, query);
        getCombinedPob();
      });

      input.addEventListener('focus', () => {
        const query = input.value.trim();
        const list = getList() || [];
        const filtered = query
          ? list.filter(item => item.toLowerCase().includes(query.toLowerCase()))
          : list;
        render(filtered, query);
      });

      // Click or Tap on suggestion item
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

      // Keyboard navigation
      input.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.pob-suggestion-item');
        if (dropdown.style.display !== 'block' || items.length === 0) {
          if (e.key === 'ArrowDown') {
            const list = getList() || [];
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
          // If a suggestion was explicitly highlighted with arrow keys, select it; otherwise keep user's typed text!
          if (activeIndex >= 0 && items[activeIndex]) {
            e.preventDefault();
            const val = items[activeIndex].getAttribute('data-val');
            input.value = val;
            closeDropdown();
            getCombinedPob();
            if (typeof onSelect === 'function') onSelect(val);
          } else {
            closeDropdown();
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

      // Close dropdown when clicking outside
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
        // If state is not valid for this country, clear state & district so user can choose or type freely
        const statesForCountry = POB_DATA.states[selectedCountry];
        if (statesForCountry && !statesForCountry.includes(stateInput.value.trim())) {
          stateInput.value = '';
          districtInput.value = '';
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
        if (country && POB_DATA.states[country]) {
          return POB_DATA.states[country];
        }
        // Fallback: If country is India or blank, return Indian states; otherwise return empty list for custom typing
        if (!country || country.toLowerCase() === 'india') {
          return POB_DATA.states['India'];
        }
        return [];
      },
      iconClass: 'fa-solid fa-map-location-dot',
      onSelect: (selectedState) => {
        // Clear district if not belonging to this state
        const districtsForState = POB_DATA.districts[selectedState];
        if (districtsForState && !districtsForState.includes(districtInput.value.trim())) {
          districtInput.value = '';
        }
        getCombinedPob();
        setTimeout(() => districtInput.focus(), 50);
      }
    });

    // 3. District / City Autocomplete (Country & State matched, never dumping Tamil Nadu on other countries!)
    attachFieldAutocomplete({
      input: districtInput,
      dropdown: districtDropdown,
      getList: () => {
        const state = stateInput.value.trim();
        const country = countryInput.value.trim();

        // A. If state is known and has districts in dictionary, return exact districts
        if (state && POB_DATA.districts[state]) {
          return POB_DATA.districts[state];
        }

        // B. If country is known and has cities fallback, return cities of that specific country
        if (country && COUNTRY_CITIES_FALLBACK[country]) {
          return COUNTRY_CITIES_FALLBACK[country];
        }

        // C. If country is India or blank, return Tamil Nadu + top Indian cities
        if (!country || country.toLowerCase() === 'india') {
          return POB_DATA.districts['Tamil Nadu'].concat(COUNTRY_CITIES_FALLBACK['India']);
        }

        // D. For any other international country, return empty list (enables 100% free manual typing)
        return [];
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
  window.COUNTRY_CITIES_FALLBACK = COUNTRY_CITIES_FALLBACK;
  window.initPobAutocomplete = initPobAutocomplete;

})(window);
