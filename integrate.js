/* ═══════════════════════════════════════════════ */
/* Coport Dashboard — JavaScript                   */
/* ═══════════════════════════════════════════════ */

/* ── AI Catalog ── */
const aiModels = {
  code: [
    { id:'claude', name:'Claude', desc:'Advanced coding, reasoning, and architecture', icon:'&#9733;', bestFor:'Code & Logic', enabled:true, color:'#e05a2b' },
    { id:'gpt4', name:'GPT-4o', desc:'General-purpose coding and analysis', icon:'&#9679;', bestFor:'General Code', enabled:false, color:'#10a37f' },
    { id:'gemini', name:'Gemini', desc:'Large context window, multimodal coding', icon:'&#9830;', bestFor:'Large Projects', enabled:false, color:'#4285f4' },
    { id:'codestral', name:'Codestral', desc:'Fast code completion by Mistral', icon:'&#9654;', bestFor:'Fast Completion', enabled:false, color:'#ff7000' },
    { id:'deepseek', name:'DeepSeek Coder', desc:'Specialized code generation and debugging', icon:'&#9670;', bestFor:'Debugging', enabled:false, color:'#0066ff' },
  ],
  images: [
    { id:'midjourney', name:'Midjourney', desc:'Stunning artistic and photorealistic images', icon:'&#9830;', bestFor:'Art & Photos', enabled:false, color:'#fff' },
    { id:'dall-e', name:'DALL-E 3', desc:'Creative image generation from text', icon:'&#9679;', bestFor:'Creative Images', enabled:false, color:'#10a37f' },
    { id:'flux', name:'Flux', desc:'Fast high-quality image generation', icon:'&#9889;', bestFor:'Fast Generation', enabled:true, color:'#a855f7' },
    { id:'stable-diffusion', name:'Stable Diffusion', desc:'Open-source image generation', icon:'&#9635;', bestFor:'Customizable', enabled:false, color:'#ff6b35' },
    { id:'ideogram', name:'Ideogram', desc:'Best at text in images and typography', icon:'&#65;', bestFor:'Text in Images', enabled:false, color:'#06b6d4' },
    { id:'leonardo', name:'Leonardo.ai', desc:'Game assets, textures, and concept art', icon:'&#127912;', bestFor:'Game Assets', enabled:false, color:'#8b5cf6' },
    { id:'fal', name:'fal.ai', desc:'Real-time image generation API', icon:'&#9889;', bestFor:'Real-time', enabled:false, color:'#f59e0b' },
  ],
  audio: [
    { id:'elevenlabs', name:'ElevenLabs', desc:'Ultra-realistic voice generation and cloning', icon:'&#127908;', bestFor:'Voice & Speech', enabled:true, color:'#000' },
    { id:'suno', name:'Suno', desc:'Generate full songs from text descriptions', icon:'&#127925;', bestFor:'Music Creation', enabled:false, color:'#ff3366' },
    { id:'udio', name:'Udio', desc:'AI music composition with high fidelity', icon:'&#127926;', bestFor:'Composition', enabled:false, color:'#7c3aed' },
    { id:'whisper', name:'Whisper', desc:'Speech-to-text transcription in any language', icon:'&#128266;', bestFor:'Transcription', enabled:true, color:'#10a37f' },
  ],
  video: [
    { id:'runway', name:'Runway Gen-3', desc:'Professional video generation and editing', icon:'&#127916;', bestFor:'Video Creation', enabled:false, color:'#06b6d4' },
    { id:'pika', name:'Pika', desc:'Creative video generation from text or images', icon:'&#127910;', bestFor:'Short Clips', enabled:false, color:'#f43f5e' },
    { id:'kling', name:'Kling', desc:'High-quality AI video generation', icon:'&#128253;', bestFor:'Long Videos', enabled:false, color:'#8b5cf6' },
    { id:'heygen', name:'HeyGen', desc:'AI avatar and talking head videos', icon:'&#128100;', bestFor:'Avatars', enabled:false, color:'#3b82f6' },
  ],
  research: [
    { id:'perplexity', name:'Perplexity', desc:'AI-powered search with citations', icon:'&#128270;', bestFor:'Web Search', enabled:true, color:'#06b6d4' },
    { id:'you', name:'You.com', desc:'Research assistant with web access', icon:'&#127758;', bestFor:'Research', enabled:false, color:'#7c3aed' },
    { id:'wolfram', name:'Wolfram Alpha', desc:'Computational knowledge and math', icon:'&#8721;', bestFor:'Math & Science', enabled:false, color:'#dd1100' },
  ],
  writing: [
    { id:'claude-writing', name:'Claude (Writing)', desc:'Long-form content, nuanced tone, creative writing', icon:'&#9733;', bestFor:'Long-form', enabled:true, color:'#e05a2b' },
    { id:'jasper', name:'Jasper', desc:'Marketing copy and brand voice content', icon:'&#9998;', bestFor:'Marketing', enabled:false, color:'#ff6b35' },
    { id:'copy-ai', name:'Copy.ai', desc:'Sales copy, emails, and ad content', icon:'&#128221;', bestFor:'Sales Copy', enabled:false, color:'#3b82f6' },
  ]
};

/* ── Skills (slash commands) ── */
const skills = [
  { id:'commit', name:'Auto Commit', desc:'Automatically create git commits with smart messages', icon:'&#128190;', enabled:true },
  { id:'review', name:'Code Review', desc:'Review code changes and suggest improvements', icon:'&#128269;', enabled:true },
  { id:'test', name:'Test Generator', desc:'Automatically write tests for your code', icon:'&#128300;', enabled:false },
  { id:'refactor', name:'Smart Refactor', desc:'Refactor code to be cleaner and more efficient', icon:'&#128295;', enabled:false },
  { id:'explain', name:'Code Explainer', desc:'Get plain-English explanations of complex code', icon:'&#128161;', enabled:true },
  { id:'debug', name:'Auto Debug', desc:'Find and fix bugs automatically', icon:'&#128027;', enabled:true },
  { id:'docs', name:'Doc Generator', desc:'Generate documentation for your codebase', icon:'&#128196;', enabled:false },
  { id:'optimize', name:'Performance Optimizer', desc:'Find and fix performance bottlenecks', icon:'&#128640;', enabled:false },
  { id:'security', name:'Security Scanner', desc:'Scan code for vulnerabilities and fix them', icon:'&#128274;', enabled:false },
  { id:'translate', name:'Code Translator', desc:'Convert code between programming languages', icon:'&#127760;', enabled:false },
  { id:'api', name:'API Builder', desc:'Generate API endpoints from descriptions', icon:'&#128268;', enabled:false },
  { id:'deploy', name:'One-Click Deploy', desc:'Deploy your project to the cloud instantly', icon:'&#9729;', enabled:false },
];

/* ── Connectors (MCP, plain language) ── */
const connectors = [
  { id:'files', name:'Your Files', desc:'Read and write files on your connected devices', icon:'&#128193;', enabled:true },
  { id:'github', name:'GitHub', desc:'Access repos, issues, pull requests, and actions', icon:'&#128025;', enabled:false },
  { id:'slack', name:'Slack', desc:'Send messages and read channels', icon:'&#128172;', enabled:false },
  { id:'notion', name:'Notion', desc:'Search and update your Notion pages', icon:'&#128221;', enabled:false },
  { id:'postgres', name:'Database', desc:'Query and manage your databases', icon:'&#128451;', enabled:false },
  { id:'google-drive', name:'Google Drive', desc:'Access your Google Docs, Sheets, and files', icon:'&#128194;', enabled:false },
  { id:'figma', name:'Figma', desc:'Read designs and export assets', icon:'&#127912;', enabled:false },
  { id:'linear', name:'Linear', desc:'Manage issues and project tracking', icon:'&#9670;', enabled:false },
  { id:'vercel', name:'Vercel', desc:'Deploy and manage web projects', icon:'&#9650;', enabled:false },
  { id:'discord', name:'Discord', desc:'Manage bots, messages, and servers', icon:'&#128172;', enabled:false },
  { id:'browser', name:'Web Browser', desc:'Browse the web, take screenshots, fill forms', icon:'&#127760;', enabled:true },
  { id:'email', name:'Email', desc:'Send and read emails on your behalf', icon:'&#128232;', enabled:false },
];

/* ── Page Navigation ── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelector(`.nav-item[onclick*="${pageId}"]`).classList.add('active');
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

/* ── AI Hub Rendering ── */
function renderAIHub() {
  const categories = { code:'ai-code', images:'ai-images', audio:'ai-audio', video:'ai-video', research:'ai-research', writing:'ai-writing' };
  const activeGrid = document.getElementById('active-ais');
  let activeHtml = '';

  for (const [cat, gridId] of Object.entries(categories)) {
    const grid = document.getElementById(gridId);
    let html = '';
    for (const ai of aiModels[cat]) {
      const card = makeAICard(ai, cat);
      html += card;
      if (ai.enabled) activeHtml += card;
    }
    grid.innerHTML = html;
  }
  activeGrid.innerHTML = activeHtml || '<p class="empty-sub">No AIs enabled yet. Browse below to turn them on.</p>';
}

function makeAICard(ai, cat) {
  return `
    <div class="ai-card${ai.enabled ? ' active-ai' : ''}" id="ai-${ai.id}">
      <div class="ai-avatar" style="background:${ai.color}">${ai.icon}</div>
      <div class="ai-details">
        <span class="ai-name">${ai.name}</span>
        <span class="ai-desc">${ai.desc}</span>
        <span class="ai-best-for">${ai.bestFor}</span>
      </div>
      <button class="ai-toggle${ai.enabled ? ' on' : ''}" onclick="toggleAI('${cat}','${ai.id}',this)"></button>
    </div>`;
}

function toggleAI(cat, id, btn) {
  const ai = aiModels[cat].find(a => a.id === id);
  ai.enabled = !ai.enabled;
  btn.classList.toggle('on');
  btn.closest('.ai-card').classList.toggle('active-ai');
  renderAIHub();
}

/* ── Superpowers Rendering ── */
function renderSuperpowers() {
  const skillsGrid = document.getElementById('skills-grid');
  const connectorsGrid = document.getElementById('connectors-grid');

  skillsGrid.innerHTML = skills.map(s => `
    <div class="power-card${s.enabled ? ' enabled' : ''}" id="skill-${s.id}">
      <div class="power-icon">${s.icon}</div>
      <div class="power-details">
        <span class="power-name">${s.name}</span>
        <span class="power-desc">${s.desc}</span>
      </div>
      <button class="power-toggle${s.enabled ? ' on' : ''}" onclick="toggleSkill('${s.id}',this)"></button>
    </div>`).join('');

  connectorsGrid.innerHTML = connectors.map(c => `
    <div class="power-card${c.enabled ? ' enabled' : ''}" id="conn-${c.id}">
      <div class="power-icon">${c.icon}</div>
      <div class="power-details">
        <span class="power-name">${c.name}</span>
        <span class="power-desc">${c.desc}</span>
      </div>
      <button class="power-toggle${c.enabled ? ' on' : ''}" onclick="toggleConnector('${c.id}',this)"></button>
    </div>`).join('');
}

function toggleSkill(id, btn) {
  const s = skills.find(x => x.id === id);
  s.enabled = !s.enabled;
  btn.classList.toggle('on');
  btn.closest('.power-card').classList.toggle('enabled');
}

function toggleConnector(id, btn) {
  const c = connectors.find(x => x.id === id);
  if (!c.enabled) {
    openConnectorModal(c, btn);
  } else {
    c.enabled = false;
    btn.classList.remove('on');
    btn.closest('.power-card').classList.remove('enabled');
  }
}

function openConnectorModal(connector, toggleBtn) {
  document.getElementById('modal-title').textContent = 'Connect ' + connector.name;

  const fields = {
    github: { label: 'GitHub Account', placeholder: 'Sign in with GitHub', type: 'button' },
    slack: { label: 'Slack Workspace', placeholder: 'Sign in with Slack', type: 'button' },
    notion: { label: 'Notion Account', placeholder: 'Sign in with Notion', type: 'button' },
    postgres: { label: 'Database URL', placeholder: 'e.g. my-database.example.com', type: 'text' },
    'google-drive': { label: 'Google Account', placeholder: 'Sign in with Google', type: 'button' },
    figma: { label: 'Figma Account', placeholder: 'Sign in with Figma', type: 'button' },
    linear: { label: 'Linear Account', placeholder: 'Sign in with Linear', type: 'button' },
    vercel: { label: 'Vercel Account', placeholder: 'Sign in with Vercel', type: 'button' },
    discord: { label: 'Discord Server', placeholder: 'Sign in with Discord', type: 'button' },
    email: { label: 'Email Account', placeholder: 'Sign in with your email provider', type: 'button' },
  };

  const field = fields[connector.id];
  let bodyHtml = `<p>Allow Coco to access your ${connector.name} account. Your credentials stay on your device.</p>`;

  if (field) {
    if (field.type === 'button') {
      bodyHtml += `<button class="btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:8px" onclick="completeConnection('${connector.id}')">${field.placeholder}</button>`;
    } else {
      bodyHtml += `<div class="form-row"><label class="form-label">${field.label}</label><input class="form-input" type="text" placeholder="${field.placeholder}" /></div>`;
    }
  } else {
    bodyHtml += `<p>This will be configured automatically.</p>`;
  }

  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-action-btn').textContent = field && field.type === 'button' ? 'Done' : 'Connect';
  document.getElementById('modal-action-btn').onclick = () => completeConnection(connector.id);

  window._pendingConnector = { connector, toggleBtn };
  document.getElementById('modal-overlay').classList.add('visible');
}

function completeConnection(id) {
  if (window._pendingConnector) {
    const { connector, toggleBtn } = window._pendingConnector;
    connector.enabled = true;
    toggleBtn.classList.add('on');
    toggleBtn.closest('.power-card').classList.add('enabled');
  }
  closeModal();
}

/* ── Chat ── */
function prefillChat(text) {
  document.getElementById('chat-input').value = text;
  document.getElementById('chat-input').focus();
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';

  // Remove welcome
  const welcome = document.querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  addMessage('user', text);
  simulateResponse(text);
}

function addMessage(role, text) {
  const container = document.getElementById('chat-messages');
  const avatar = role === 'user' ? 'U' : 'C';
  const msg = document.createElement('div');
  msg.className = `msg ${role}`;
  msg.innerHTML = `<div class="msg-avatar">${avatar}</div><div class="msg-body">${text}</div>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function simulateResponse(userText) {
  const lower = userText.toLowerCase();

  // Determine which AIs to route to
  let steps = [];
  let response = '';

  if (lower.includes('image') || lower.includes('photo') || lower.includes('design') || lower.includes('logo')) {
    steps = [
      { label: 'Understanding your request', ai: 'Claude' },
      { label: 'Generating image concepts', ai: 'Flux' },
      { label: 'Creating variations', ai: 'Flux' },
      { label: 'Finalizing output', ai: 'Claude' },
    ];
    response = "I've generated your images using Flux for the best quality. Here are 4 variations — click any to download or refine further.";
  } else if (lower.includes('website') || lower.includes('build') || lower.includes('app')) {
    steps = [
      { label: 'Planning the architecture', ai: 'Claude' },
      { label: 'Writing the code', ai: 'Claude' },
      { label: 'Generating design assets', ai: 'Flux' },
      { label: 'Running tests', ai: 'Claude' },
      { label: 'Deploying to your device', ai: 'Claude' },
    ];
    response = "Your website is built and running on your Mac mini. I used Claude for the code and Flux for the hero image. Want to make any changes?";
  } else if (lower.includes('music') || lower.includes('song') || lower.includes('audio')) {
    steps = [
      { label: 'Understanding the vibe', ai: 'Claude' },
      { label: 'Composing the track', ai: 'Suno' },
      { label: 'Generating vocals', ai: 'ElevenLabs' },
      { label: 'Mixing and mastering', ai: 'Suno' },
    ];
    response = "Your track is ready! I used Suno for composition and ElevenLabs for the vocals. Play it below or download the file.";
  } else if (lower.includes('video')) {
    steps = [
      { label: 'Planning the video', ai: 'Claude' },
      { label: 'Generating scenes', ai: 'Runway Gen-3' },
      { label: 'Adding voiceover', ai: 'ElevenLabs' },
      { label: 'Editing and compositing', ai: 'Claude' },
    ];
    response = "Your video is complete! I used Runway for generation and ElevenLabs for the voiceover. Preview it below.";
  } else if (lower.includes('research') || lower.includes('search') || lower.includes('find')) {
    steps = [
      { label: 'Searching the web', ai: 'Perplexity' },
      { label: 'Analyzing sources', ai: 'Claude' },
      { label: 'Compiling report', ai: 'Claude' },
    ];
    response = "Here's what I found. Perplexity searched the web and I compiled the key findings into a summary with sources.";
  } else if (lower.includes('data') || lower.includes('analyz') || lower.includes('report')) {
    steps = [
      { label: 'Reading your data', ai: 'Claude' },
      { label: 'Running analysis', ai: 'Claude' },
      { label: 'Creating visualizations', ai: 'Claude' },
      { label: 'Writing the report', ai: 'Claude' },
    ];
    response = "Analysis complete! I've created charts and a summary report. The key insight: your metrics are trending up 23% month-over-month.";
  } else {
    steps = [
      { label: 'Thinking...', ai: 'Claude' },
      { label: 'Working on it', ai: 'Claude' },
    ];
    response = "Done! Let me know if you'd like me to adjust anything or take it further.";
  }

  showTaskPanel(steps, response);
}

function showTaskPanel(steps, finalResponse) {
  const panel = document.getElementById('task-panel');
  const stepsEl = document.getElementById('task-steps');
  const badgeEl = document.getElementById('task-ai-badge');

  panel.classList.remove('hidden');
  document.getElementById('task-title').textContent = 'Coco is working...';

  stepsEl.innerHTML = steps.map(s => `
    <div class="task-step">
      <span class="step-status"></span>
      <span class="step-label">${s.label}</span>
    </div>`).join('');

  let i = 0;
  const stepEls = stepsEl.querySelectorAll('.task-step');

  function runStep() {
    if (i >= steps.length) {
      document.getElementById('task-title').textContent = 'Done';
      document.querySelector('.task-pulse').style.background = '#4ade80';
      badgeEl.innerHTML = '';
      setTimeout(() => {
        panel.classList.add('hidden');
        document.querySelector('.task-pulse').style.background = '#e05a2b';
        addMessage('assistant', finalResponse);
      }, 800);
      return;
    }

    const step = stepEls[i];
    step.classList.add('running');
    step.querySelector('.step-status').classList.add('running');
    badgeEl.innerHTML = `<span class="ai-badge-icon" style="background:${getAIColor(steps[i].ai)};color:#fff;border-radius:50%;width:14px;height:14px;font-size:8px">&#9733;</span> Using ${steps[i].ai}`;

    setTimeout(() => {
      step.classList.remove('running');
      step.classList.add('done');
      step.querySelector('.step-status').classList.remove('running');
      step.querySelector('.step-status').classList.add('done');
      i++;
      runStep();
    }, 900 + Math.random() * 700);
  }

  runStep();
}

function getAIColor(name) {
  const colors = { Claude:'#e05a2b', Flux:'#a855f7', Suno:'#ff3366', ElevenLabs:'#52525b', Perplexity:'#06b6d4', 'Runway Gen-3':'#06b6d4' };
  return colors[name] || '#52525b';
}

function toggleTaskPanel() {
  const steps = document.getElementById('task-steps');
  steps.style.display = steps.style.display === 'none' ? '' : 'none';
}

/* ── Automations ── */
const automations = [];

function createAutomation() {
  const trigger = document.getElementById('auto-trigger').value;
  const action = document.getElementById('auto-action').value;
  if (!trigger || !action) return;

  const triggerNames = { 'file-change':'A file changes', 'git-push':'Code is pushed', 'git-pr':'A PR is opened', 'error':'An error is detected', 'schedule':'On a schedule', 'new-issue':'A new issue is created', 'deploy':'A deploy finishes', 'message':'A Slack message arrives' };
  const actionNames = { 'run-tests':'Run tests', 'fix-errors':'Fix errors', 'review-code':'Review code', 'send-summary':'Send summary', 'deploy':'Deploy', 'create-pr':'Create a PR', 'notify':'Notify me', 'generate-docs':'Generate docs', 'optimize':'Optimize' };

  automations.push({ trigger: triggerNames[trigger], action: actionNames[action] });
  renderAutomations();
  document.getElementById('auto-trigger').value = '';
  document.getElementById('auto-action').value = '';
}

function useTemplate(id) {
  const templates = {
    'auto-test': { trigger: 'A file changes', action: 'Run tests' },
    'auto-fix': { trigger: 'An error is detected', action: 'Fix errors' },
    'pr-review': { trigger: 'A PR is opened', action: 'Review code' },
    'daily-summary': { trigger: 'On a schedule', action: 'Send summary' },
    'error-alert': { trigger: 'An error is detected', action: 'Notify me' },
    'auto-docs': { trigger: 'Code is pushed', action: 'Generate docs' },
  };
  const t = templates[id];
  if (!t) return;
  automations.push(t);
  renderAutomations();
}

function renderAutomations() {
  const list = document.getElementById('automations-list');
  if (automations.length === 0) {
    list.innerHTML = '<div class="empty-state"><span class="empty-icon">&#9889;</span><p class="empty-text">No automations yet</p><p class="empty-sub">Create your first automation below</p></div>';
    return;
  }
  list.innerHTML = automations.map((a, i) => `
    <div class="automation-row">
      <span class="automation-trigger">${a.trigger}</span>
      <span class="automation-arrow">&#8594;</span>
      <span class="automation-action">${a.action}</span>
      <button class="power-toggle on" onclick="removeAutomation(${i},this)"></button>
    </div>`).join('');
}

function removeAutomation(i, btn) {
  automations.splice(i, 1);
  renderAutomations();
}

/* ── Devices ── */
function startDeviceSetup(type) {
  const names = { mac: 'Mac', windows: 'Windows PC', linux: 'Linux Server', cloud: 'Cloud Server' };
  document.getElementById('setup-title').textContent = 'Set up your ' + (names[type] || 'device');
  document.getElementById('device-setup').classList.remove('hidden');
  document.querySelectorAll('.setup-step').forEach(s => s.classList.remove('active'));
  document.getElementById('ds-step-1').classList.add('active');

  // Update download button text
  const dlNames = { mac: 'Download for Mac', windows: 'Download for Windows', linux: 'Download for Linux', cloud: 'Get install link' };
  const btn = document.querySelector('#ds-step-1 .btn-primary');
  if (btn) btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;margin-right:8px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>${dlNames[type] || 'Download'}`;
}

function advanceDeviceSetup(step) {
  document.querySelectorAll('.setup-step').forEach(s => s.classList.remove('active'));
  document.getElementById('ds-step-' + step).classList.add('active');

  if (step === 2) {
    // Simulate auto-detection after 3s
    setTimeout(() => advanceDeviceSetup(3), 3000);
  }
}

function closeDeviceSetup() {
  document.getElementById('device-setup').classList.add('hidden');
}

function manageDevice(id) {
  // Placeholder
}

/* ── Modal ── */
function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('visible');
}

function modalAction() {
  if (window._pendingConnector) {
    completeConnection(window._pendingConnector.connector.id);
  } else {
    closeModal();
  }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Search ── */
function filterSuperpowers(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.power-card').forEach(card => {
    const name = card.querySelector('.power-name').textContent.toLowerCase();
    const desc = card.querySelector('.power-desc').textContent.toLowerCase();
    card.style.display = (name.includes(q) || desc.includes(q)) ? '' : 'none';
  });
}

/* ── Agent Builder ── */
const customAgents = [];

function advanceAgentBuilder(step) {
  document.querySelectorAll('.builder-step').forEach(s => s.classList.remove('active'));
  document.getElementById('ab-step-' + step).classList.add('active');

  if (step === 2) renderAIPicker();
  if (step === 3) renderAccessPicker();
}

function renderAIPicker() {
  const picker = document.getElementById('ai-picker');
  let html = '';
  for (const cat of Object.values(aiModels)) {
    for (const ai of cat) {
      html += `<div class="picker-item${ai.enabled ? ' picked' : ''}" onclick="togglePicker(this)">
        <span class="picker-item-icon" style="color:${ai.color}">${ai.icon}</span>
        <span class="picker-item-name">${ai.name}</span>
        <span class="picker-check">&#10003;</span>
      </div>`;
    }
  }
  picker.innerHTML = html;
}

function renderAccessPicker() {
  const picker = document.getElementById('access-picker');
  const items = [...connectors, ...skills.slice(0, 6)];
  picker.innerHTML = items.map(item => `
    <div class="picker-item${item.enabled ? ' picked' : ''}" onclick="togglePicker(this)">
      <span class="picker-item-icon">${item.icon}</span>
      <span class="picker-item-name">${item.name}</span>
      <span class="picker-check">&#10003;</span>
    </div>`).join('');
}

function togglePicker(el) {
  el.classList.toggle('picked');
}

function pickPersonality(btn, type) {
  document.querySelectorAll('.personality-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function createAgent() {
  const name = document.getElementById('agent-name').value || 'New Agent';
  const purpose = document.getElementById('agent-purpose').value || 'Custom agent';

  const pickedAIs = document.querySelectorAll('#ai-picker .picker-item.picked');
  const pickedAccess = document.querySelectorAll('#access-picker .picker-item.picked');

  customAgents.push({ name, purpose, aiCount: pickedAIs.length, accessCount: pickedAccess.length });
  renderAgentList();

  // Reset builder
  document.getElementById('agent-name').value = '';
  document.getElementById('agent-purpose').value = '';
  advanceAgentBuilder(1);
}

function renderAgentList() {
  const list = document.getElementById('agent-list');
  const cocoCard = `
    <div class="agent-card featured">
      <div class="agent-avatar coco-avatar">C</div>
      <div class="agent-info">
        <span class="agent-name">Coco</span>
        <span class="agent-role">Your personal AI assistant</span>
        <span class="agent-desc">General-purpose agent that routes tasks to the best AI automatically. Handles code, images, research, and more.</span>
      </div>
      <div class="agent-stats">
        <div class="agent-stat"><span class="stat-num">${Object.values(aiModels).flat().filter(a=>a.enabled).length}</span><span class="stat-label">AIs connected</span></div>
        <div class="agent-stat"><span class="stat-num">${skills.filter(s=>s.enabled).length}</span><span class="stat-label">Skills enabled</span></div>
      </div>
      <span class="agent-badge default-badge">Default</span>
    </div>`;

  const customCards = customAgents.map((a, i) => `
    <div class="agent-card">
      <div class="agent-avatar" style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff">${a.name.charAt(0).toUpperCase()}</div>
      <div class="agent-info">
        <span class="agent-name">${a.name}</span>
        <span class="agent-role">Custom Agent</span>
        <span class="agent-desc">${a.purpose}</span>
      </div>
      <div class="agent-stats">
        <div class="agent-stat"><span class="stat-num">${a.aiCount}</span><span class="stat-label">AIs</span></div>
        <div class="agent-stat"><span class="stat-num">${a.accessCount}</span><span class="stat-label">Access</span></div>
      </div>
    </div>`).join('');

  list.innerHTML = cocoCard + customCards;
}

function useAgentTemplate(id) {
  const templates = {
    designer: { name: 'Designer', purpose: 'Creates images, logos, and visual assets using the best image AIs' },
    coder: { name: 'Full-Stack Dev', purpose: 'Builds complete web apps, writes code, runs tests, and deploys' },
    researcher: { name: 'Researcher', purpose: 'Deep research from the web, analyzes sources, creates reports with citations' },
    content: { name: 'Content Creator', purpose: 'Writes blog posts, social media content, marketing copy, and scripts' },
    data: { name: 'Data Analyst', purpose: 'Analyzes data, creates visualizations, and writes insight reports' },
    devops: { name: 'DevOps', purpose: 'Manages deployments, monitors errors, and maintains infrastructure' },
  };
  const t = templates[id];
  if (!t) return;
  document.getElementById('agent-name').value = t.name;
  document.getElementById('agent-purpose').value = t.purpose;
  advanceAgentBuilder(1);
  document.querySelector('.agent-builder').scrollIntoView({ behavior: 'smooth' });
}

/* ── Init ── */
function init() {
  renderAIHub();
  renderSuperpowers();
  renderAgentList();

  // Set greeting based on time
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  document.querySelector('.topbar-title').textContent = greeting;
}

init();
