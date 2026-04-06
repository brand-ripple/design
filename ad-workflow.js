(() => {
  const totalSteps = 5;
  let current = 1;

  const panels = document.querySelectorAll('.step-panel');
  const dots = document.querySelectorAll('.stepper-step');
  const fill = document.getElementById('stepperFill');
  const btnBack = document.getElementById('btnBack');
  const btnNext = document.getElementById('btnNext');
  const indicator = document.getElementById('currentStep');

  function goTo(step) {
    if (step < 1 || step > totalSteps) return;

    // If going to review, populate summary
    if (step === 5) populateReview();

    current = step;

    // Panels
    panels.forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-panel="${current}"]`).classList.add('active');

    // Stepper dots
    dots.forEach(d => {
      const s = +d.dataset.step;
      d.classList.remove('active', 'completed');
      if (s === current) d.classList.add('active');
      else if (s < current) d.classList.add('completed');
    });

    // Fill bar
    fill.style.width = ((current - 1) / (totalSteps - 1) * 100) + '%';

    // Buttons
    btnBack.disabled = current === 1;
    if (current === totalSteps) {
      btnNext.textContent = 'Launch';
      btnNext.classList.add('wf-btn-launch');
    } else {
      btnNext.innerHTML = 'Next &rarr;';
      btnNext.classList.remove('wf-btn-launch');
    }

    // Indicator
    indicator.textContent = current;
  }

  btnNext.addEventListener('click', () => {
    if (current === totalSteps) {
      alert('Ad creative launched successfully!');
      return;
    }
    goTo(current + 1);
  });

  btnBack.addEventListener('click', () => goTo(current - 1));

  // Allow clicking stepper dots to navigate
  dots.forEach(d => {
    d.addEventListener('click', () => {
      const target = +d.dataset.step;
      if (target <= current + 1) goTo(target);
    });
  });

  // Character counters
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

  // Logo position buttons
  document.querySelectorAll('.pos-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Drag-and-drop zone
  const zone = document.getElementById('uploadZone');
  if (zone) {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); });
  }

  // Populate review step
  function populateReview() {
    const val = id => {
      const el = document.getElementById(id);
      if (!el) return '--';
      if (el.tagName === 'SELECT') return el.options[el.selectedIndex]?.text || '--';
      return el.value || '--';
    };

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
