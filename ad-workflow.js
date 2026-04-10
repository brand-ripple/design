(() => {
  const totalSteps = 6;
  let current = 1;
  let selectedTemplate = null;
  const filters = { platform: 'all', industry: 'all', q: '' };

  const panels = document.querySelectorAll('.step-panel');
  const dots = document.querySelectorAll('.stepper-step');
  const fill = document.getElementById('stepperFill');
  const btnBack = document.getElementById('btnBack');
  const btnNext = document.getElementById('btnNext');
  const indicator = document.getElementById('currentStep');

  // ── Inspiration dataset ──
  const inspirations = [
    {
      id: 'vault-fin',
      brand: 'Vault Financial',
      headline: 'Your money, on autopilot. Open a high-yield account in 90 seconds.',
      platform: 'meta',
      platformLabel: 'Meta',
      industry: 'fintech',
      format: 'single-image',
      ratio: '1:1',
      cta: 'sign-up',
      primary: 'Move your savings into an account that works as hard as you do. No fees, no minimums, 4.5% APY.',
      impressions: '2.1M',
      ctr: '3.8%',
      bg: '#0a1628',
      accent: '#4ea8de',
      libraryUrl: 'https://www.facebook.com/ads/library/',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><circle cx="50" cy="38" r="16" stroke="${c.accent}" stroke-width="2" fill="none"/><path d="M42 38 L48 44 L58 32" stroke="${c.accent}" stroke-width="2.5" fill="none"/><rect x="22" y="62" width="56" height="6" fill="${c.accent}" opacity="0.7"/><rect x="22" y="72" width="40" height="4" fill="${c.accent}" opacity="0.4"/><rect x="22" y="80" width="28" height="6" fill="${c.accent}"/>`,
    },
    {
      id: 'peak-run',
      brand: 'Peak Athletics',
      headline: 'Run further. Recover faster. 30% off all trainers.',
      platform: 'tiktok',
      platformLabel: 'TikTok',
      industry: 'fitness',
      format: 'video',
      ratio: '9:16',
      cta: 'shop-now',
      primary: 'Engineered for runners who refuse to stop. Shop the collection today and save 30%.',
      impressions: '5.4M',
      ctr: '6.2%',
      bg: '#1a0d00',
      accent: '#ff7a1a',
      libraryUrl: 'https://library.tiktok.com/ads',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><polygon points="40,30 40,70 72,50" fill="${c.accent}"/><circle cx="50" cy="50" r="30" stroke="${c.accent}" stroke-width="2" fill="none" opacity="0.5"/><rect x="10" y="84" width="80" height="2" fill="${c.accent}" opacity="0.6"/><rect x="10" y="84" width="52" height="2" fill="${c.accent}"/>`,
    },
    {
      id: 'notion-flow',
      brand: 'Flowdesk',
      headline: 'One workspace. Every tool. Unlimited flow.',
      platform: 'linkedin',
      platformLabel: 'LinkedIn',
      industry: 'saas',
      format: 'carousel',
      ratio: '4:5',
      cta: 'learn-more',
      primary: 'Replace 7 tools with one. Teams using Flowdesk ship projects 3x faster. Start free.',
      impressions: '1.8M',
      ctr: '4.1%',
      bg: '#0f0f14',
      accent: '#8b5cf6',
      libraryUrl: 'https://www.linkedin.com/ad-library/home',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><rect x="14" y="20" width="22" height="30" rx="2" stroke="${c.accent}" stroke-width="1.5" fill="none"/><rect x="40" y="20" width="22" height="30" rx="2" stroke="${c.accent}" stroke-width="1.5" fill="${c.accent}" fill-opacity="0.15"/><rect x="66" y="20" width="22" height="30" rx="2" stroke="${c.accent}" stroke-width="1.5" fill="none"/><rect x="20" y="62" width="60" height="4" fill="${c.accent}"/><rect x="20" y="72" width="42" height="3" fill="${c.accent}" opacity="0.5"/><rect x="20" y="80" width="30" height="5" fill="${c.accent}" opacity="0.8"/>`,
    },
    {
      id: 'shoplocal',
      brand: 'Orbit Commerce',
      headline: 'Launch your store in 10 minutes. No code required.',
      platform: 'google',
      platformLabel: 'Google',
      industry: 'ecommerce',
      format: 'banner',
      ratio: '16:9',
      cta: 'get-started',
      primary: 'From side project to storefront in minutes. Built-in payments, shipping, and analytics.',
      impressions: '8.2M',
      ctr: '2.9%',
      bg: '#001a14',
      accent: '#10b981',
      libraryUrl: 'https://adstransparency.google.com/',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><rect x="10" y="28" width="80" height="44" rx="3" stroke="${c.accent}" stroke-width="1.5" fill="none"/><rect x="18" y="36" width="18" height="28" rx="2" fill="${c.accent}" opacity="0.25"/><rect x="42" y="38" width="40" height="4" fill="${c.accent}"/><rect x="42" y="46" width="32" height="3" fill="${c.accent}" opacity="0.6"/><rect x="42" y="54" width="24" height="7" rx="1" fill="${c.accent}"/>`,
    },
    {
      id: 'stride',
      brand: 'Stride',
      headline: '60-day challenge. Real coaches. Real results.',
      platform: 'meta',
      platformLabel: 'Meta',
      industry: 'fitness',
      format: 'stories',
      ratio: '9:16',
      cta: 'sign-up',
      primary: 'Join 40,000 members who transformed their routine in 60 days. First week free.',
      impressions: '3.6M',
      ctr: '5.1%',
      bg: '#1a0b14',
      accent: '#ec4899',
      libraryUrl: 'https://www.facebook.com/ads/library/',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><circle cx="50" cy="42" r="18" stroke="${c.accent}" stroke-width="2" fill="none"/><path d="M35 42 L50 28 L65 42 L50 56 Z" fill="${c.accent}" opacity="0.3"/><text x="50" y="46" text-anchor="middle" fill="${c.accent}" font-size="14" font-weight="700" font-family="sans-serif">60</text><rect x="20" y="72" width="60" height="4" fill="${c.accent}"/><rect x="20" y="82" width="36" height="5" fill="${c.accent}" opacity="0.7"/>`,
    },
    {
      id: 'cryptowise',
      brand: 'Ledgerly',
      headline: 'Track every wallet. Tax-ready in one click.',
      platform: 'google',
      platformLabel: 'Google',
      industry: 'fintech',
      format: 'native',
      ratio: '1:1',
      cta: 'download',
      primary: 'The crypto portfolio tracker accountants trust. Supports 300+ exchanges and wallets.',
      impressions: '940K',
      ctr: '4.7%',
      bg: '#0d1117',
      accent: '#f59e0b',
      libraryUrl: 'https://adstransparency.google.com/',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><polyline points="12,68 28,52 44,58 60,38 76,44 88,28" stroke="${c.accent}" stroke-width="2.5" fill="none"/><circle cx="60" cy="38" r="3" fill="${c.accent}"/><circle cx="76" cy="44" r="3" fill="${c.accent}"/><rect x="12" y="78" width="44" height="4" fill="${c.accent}"/><rect x="12" y="86" width="28" height="3" fill="${c.accent}" opacity="0.6"/>`,
    },
    {
      id: 'bloomkit',
      brand: 'Bloomkit',
      headline: 'Beautiful email, zero design skill needed.',
      platform: 'linkedin',
      platformLabel: 'LinkedIn',
      industry: 'saas',
      format: 'single-image',
      ratio: '1:1',
      cta: 'learn-more',
      primary: 'Drag, drop, done. The email builder that turns marketers into designers. Free forever plan.',
      impressions: '1.2M',
      ctr: '3.4%',
      bg: '#120a1f',
      accent: '#a78bfa',
      libraryUrl: 'https://www.linkedin.com/ad-library/home',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><rect x="18" y="16" width="64" height="68" rx="3" stroke="${c.accent}" stroke-width="1.5" fill="none"/><rect x="24" y="22" width="52" height="18" fill="${c.accent}" opacity="0.3"/><rect x="24" y="46" width="36" height="3" fill="${c.accent}"/><rect x="24" y="54" width="44" height="3" fill="${c.accent}" opacity="0.6"/><rect x="24" y="62" width="28" height="3" fill="${c.accent}" opacity="0.6"/><rect x="24" y="72" width="22" height="6" rx="1" fill="${c.accent}"/>`,
    },
    {
      id: 'tiktrend',
      brand: 'Trendline',
      headline: 'Spot viral trends 72 hours before your competitors.',
      platform: 'tiktok',
      platformLabel: 'TikTok',
      industry: 'saas',
      format: 'video',
      ratio: '9:16',
      cta: 'get-started',
      primary: 'Our AI scans 2M creators daily. Get the trends your brand needs, delivered each morning.',
      impressions: '4.1M',
      ctr: '7.3%',
      bg: '#0a0a0a',
      accent: '#00f5a0',
      libraryUrl: 'https://library.tiktok.com/ads',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><polyline points="8,72 20,60 32,64 44,48 56,52 68,36 80,42 92,22" stroke="${c.accent}" stroke-width="2.5" fill="none"/><circle cx="92" cy="22" r="4" fill="${c.accent}"/><circle cx="92" cy="22" r="8" stroke="${c.accent}" stroke-width="1" fill="none" opacity="0.4"/><rect x="12" y="82" width="50" height="4" fill="${c.accent}"/>`,
    },
    {
      id: 'homecook',
      brand: 'Pantry Club',
      headline: 'Fresh ingredients. Family recipes. Delivered weekly.',
      platform: 'meta',
      platformLabel: 'Meta',
      industry: 'ecommerce',
      format: 'carousel',
      ratio: '4:5',
      cta: 'shop-now',
      primary: 'Skip the grocery run. Get hand-picked ingredients and chef-designed recipes at your door.',
      impressions: '2.8M',
      ctr: '4.4%',
      bg: '#1a1505',
      accent: '#fbbf24',
      libraryUrl: 'https://www.facebook.com/ads/library/',
      thumb: (c) => `<rect width="100" height="100" fill="${c.bg}"/><rect x="14" y="20" width="28" height="40" rx="3" stroke="${c.accent}" stroke-width="1.5" fill="${c.accent}" fill-opacity="0.1"/><rect x="44" y="20" width="28" height="40" rx="3" stroke="${c.accent}" stroke-width="1.5" fill="${c.accent}" fill-opacity="0.2"/><rect x="74" y="20" width="22" height="40" rx="3" stroke="${c.accent}" stroke-width="1.5" fill="none"/><circle cx="28" cy="36" r="6" fill="${c.accent}" opacity="0.7"/><circle cx="58" cy="36" r="6" fill="${c.accent}"/><rect x="16" y="70" width="60" height="4" fill="${c.accent}"/><rect x="16" y="78" width="36" height="6" rx="1" fill="${c.accent}"/>`,
    },
  ];

  // ── Render gallery ──
  const gallery = document.getElementById('inspireGallery');

  function renderGallery() {
    const q = filters.q.trim().toLowerCase();
    const matches = inspirations.filter(ad => {
      if (filters.platform !== 'all' && ad.platform !== filters.platform) return false;
      if (filters.industry !== 'all' && ad.industry !== filters.industry) return false;
      if (q) {
        const hay = (ad.brand + ' ' + ad.headline + ' ' + ad.primary).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!matches.length) {
      gallery.innerHTML = '<div class="inspire-empty">No ads match these filters. Try broadening your search or browse the live ad libraries above.</div>';
      return;
    }

    gallery.innerHTML = matches.map(ad => {
      const isSelected = selectedTemplate && selectedTemplate.id === ad.id;
      return `
        <div class="inspire-card ${isSelected ? 'selected' : ''}" data-id="${ad.id}">
          <div class="inspire-thumb">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              ${ad.thumb(ad)}
            </svg>
            <span class="inspire-platform-badge">${ad.platformLabel}</span>
          </div>
          <div class="inspire-meta">
            <span class="inspire-brand">${ad.brand}</span>
            <span class="inspire-headline">${ad.headline}</span>
            <div class="inspire-stats">
              <span class="inspire-stat">Impr <span class="inspire-stat-val">${ad.impressions}</span></span>
              <span class="inspire-stat">CTR <span class="inspire-stat-val">${ad.ctr}</span></span>
            </div>
            <div class="inspire-actions">
              <button class="inspire-btn inspire-btn-primary" data-action="use" data-id="${ad.id}">
                ${isSelected ? 'Selected' : 'Use template'}
              </button>
              <a class="inspire-btn" href="${ad.libraryUrl}" target="_blank" rel="noopener">View source &#8599;</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Filter chip handlers
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      const v = chip.dataset.value;
      document.querySelectorAll(`.chip[data-filter="${f}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filters[f] = v;
      renderGallery();
    });
  });

  // Search input
  const searchInput = document.getElementById('inspireSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filters.q = searchInput.value;
      renderGallery();
    });
  }

  // Gallery click (template select)
  gallery.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="use"]');
    if (!btn) return;
    const ad = inspirations.find(a => a.id === btn.dataset.id);
    if (!ad) return;
    selectTemplate(ad);
  });

  function selectTemplate(ad) {
    selectedTemplate = ad;
    // Pre-fill downstream fields
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val != null) el.value = val;
    };
    setVal('platform', ad.platform);
    setVal('aspectRatio', ad.ratio);
    setVal('headline', ad.headline);
    setVal('primaryText', ad.primary);
    setVal('ctaButton', ad.cta);

    // Trigger character counters
    ['headline', 'primaryText', 'description'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.dispatchEvent(new Event('input'));
    });

    // Ad format radio
    const radio = document.querySelector(`input[name="adFormat"][value="${ad.format}"]`);
    if (radio) radio.checked = true;

    // Banner
    const banner = document.getElementById('selectedBanner');
    document.getElementById('selectedTitle').textContent = `${ad.brand} — ${ad.platformLabel}`;
    banner.hidden = false;

    renderGallery();
  }

  // Clear template
  document.getElementById('selectedClear').addEventListener('click', () => {
    selectedTemplate = null;
    document.getElementById('selectedBanner').hidden = true;
    renderGallery();
  });

  renderGallery();

  // ── Stepper navigation ──
  function goTo(step) {
    if (step < 1 || step > totalSteps) return;

    if (step === totalSteps) populateReview();

    current = step;

    panels.forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-panel="${current}"]`).classList.add('active');

    dots.forEach(d => {
      const s = +d.dataset.step;
      d.classList.remove('active', 'completed');
      if (s === current) d.classList.add('active');
      else if (s < current) d.classList.add('completed');
    });

    fill.style.width = ((current - 1) / (totalSteps - 1) * 100) + '%';

    btnBack.disabled = current === 1;
    if (current === totalSteps) {
      btnNext.textContent = 'Launch';
      btnNext.classList.add('wf-btn-launch');
    } else {
      btnNext.innerHTML = 'Next &rarr;';
      btnNext.classList.remove('wf-btn-launch');
    }

    indicator.textContent = current;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnNext.addEventListener('click', () => {
    if (current === totalSteps) {
      alert('Ad creative launched successfully!');
      return;
    }
    goTo(current + 1);
  });

  btnBack.addEventListener('click', () => goTo(current - 1));

  dots.forEach(d => {
    d.addEventListener('click', () => {
      const target = +d.dataset.step;
      if (target <= current + 1) goTo(target);
    });
  });

  // ── Character counters ──
  const counters = [
    ['headline', 'headlineCount'],
    ['primaryText', 'primaryCount'],
    ['description', 'descCount'],
  ];
  counters.forEach(([inputId, countId]) => {
    const input = document.getElementById(inputId);
    const count = document.getElementById(countId);
    if (input && count) {
      input.addEventListener('input', () => {
        count.textContent = input.value.length;
      });
    }
  });

  // ── Logo position buttons ──
  document.querySelectorAll('.pos-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Drag-and-drop zone ──
  const zone = document.getElementById('uploadZone');
  if (zone) {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); });
  }

  // ── Populate review step ──
  function populateReview() {
    const val = id => {
      const el = document.getElementById(id);
      if (!el) return '--';
      if (el.tagName === 'SELECT') return el.options[el.selectedIndex]?.text || '--';
      return el.value || '--';
    };

    // Inspiration
    if (selectedTemplate) {
      document.getElementById('revTemplate').textContent = `${selectedTemplate.brand} — ${selectedTemplate.headline.slice(0, 40)}${selectedTemplate.headline.length > 40 ? '…' : ''}`;
      document.getElementById('revSource').textContent = selectedTemplate.platformLabel + ' Ad Library';
    } else {
      document.getElementById('revTemplate').textContent = 'None (built from scratch)';
      document.getElementById('revSource').textContent = '--';
    }

    document.getElementById('revName').textContent = val('campaignName');
    document.getElementById('revObjective').textContent = val('objective');
    document.getElementById('revPlatform').textContent = val('platform');
    document.getElementById('revBudget').textContent = val('budget');

    const start = val('startDate');
    const end = val('endDate');
    document.getElementById('revSchedule').textContent =
      (start !== '--' || end !== '--') ? `${start} — ${end}` : '--';

    const format = document.querySelector('input[name="adFormat"]:checked');
    document.getElementById('revFormat').textContent = format
      ? format.parentElement.querySelector('.format-name').textContent
      : '--';

    document.getElementById('revRatio').textContent = val('aspectRatio');
    document.getElementById('revPlacement').textContent = val('placement');
    document.getElementById('revOverlay').textContent = val('overlayStyle');
    document.getElementById('revHeadline').textContent = val('headline');
    document.getElementById('revPrimary').textContent = val('primaryText');
    document.getElementById('revCta').textContent = val('ctaButton');
    document.getElementById('revUrl').textContent = val('destUrl');
  }

  // Init
  goTo(1);
})();
