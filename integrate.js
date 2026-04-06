/* ── Claude Code Integration Interface ── */

let currentStep = 1;
let selectedDevice = null;
let selectedConnection = null;
let currentMode = 'devices';
let currentModalServer = null;

/* ── Mode Switching ── */
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mode-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`.mode-tab[onclick*="${mode}"]`).classList.add('active');
  document.getElementById('mode-' + mode).classList.add('active');
}

/* ── Device Selection (Step 1) ── */
function selectDevice(el) {
  document.querySelectorAll('.device-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedDevice = el.dataset.device;
  document.getElementById('btn-to-step2').disabled = false;

  const names = {
    'mac-mini': 'Mac mini',
    'mac-desktop': 'Mac Desktop',
    'linux-server': 'Linux Server',
    'windows': 'Windows PC',
    'raspberry-pi': 'Raspberry Pi',
    'cloud-vm': 'Cloud VM'
  };
  document.getElementById('device-label').textContent = names[selectedDevice] || 'device';
}

/* ── Wizard Navigation ── */
function goToStep(step) {
  // Mark previous steps as done
  document.querySelectorAll('.wizard-step-indicator').forEach(ind => {
    const s = parseInt(ind.dataset.step);
    ind.classList.remove('active', 'done');
    if (s < step) ind.classList.add('done');
    if (s === step) ind.classList.add('active');
  });

  // Show correct panel
  document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('step-' + step).classList.add('active');
  currentStep = step;

  // Auto-run config when entering step 3
  if (step === 3) runConfig();
}

/* ── Connection Selection (Step 2) ── */
function selectConnection(el, type) {
  document.querySelectorAll('.connect-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedConnection = type;

  const form = document.getElementById('connect-form');
  const scan = document.getElementById('scan-container');

  form.classList.add('hidden');
  scan.classList.add('hidden');

  if (type === 'auto') {
    scan.classList.remove('hidden');
    document.getElementById('discovered-devices').classList.add('hidden');
    // Simulate scan
    setTimeout(() => {
      document.getElementById('discovered-devices').classList.remove('hidden');
      document.querySelector('.scan-text').textContent = '2 devices found';
    }, 2500);
  } else {
    form.classList.remove('hidden');
    document.getElementById('auth-row').style.display = type === 'ssh' ? '' : 'none';
  }

  document.getElementById('btn-to-step3').disabled = type === 'auto';
}

function pickDiscovered(el) {
  document.querySelectorAll('.discovered-device').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn-to-step3').disabled = false;
}

function browsePath() {
  // Simulated file picker
  document.getElementById('auth-input').value = '~/.ssh/id_ed25519';
}

/* ── Configuration Tasks (Step 3) ── */
function runConfig() {
  const tasks = document.querySelectorAll('.config-task');
  let i = 0;

  // Reset all tasks
  tasks.forEach(t => {
    t.classList.remove('running', 'done');
    t.querySelector('.task-status').className = 'task-status pending';
  });
  document.getElementById('btn-to-step4').classList.add('hidden');

  function nextTask() {
    if (i >= tasks.length) {
      document.getElementById('btn-to-step4').classList.remove('hidden');
      return;
    }
    const task = tasks[i];
    task.classList.add('running');
    task.querySelector('.task-status').className = 'task-status running';

    setTimeout(() => {
      task.classList.remove('running');
      task.classList.add('done');
      task.querySelector('.task-status').className = 'task-status done';
      i++;
      nextTask();
    }, 800 + Math.random() * 600);
  }

  nextTask();
}

/* ── Quick Actions (Step 4) ── */
function quickAction(action) {
  alert('Opening ' + action + '...');
}

function addAnother() {
  goToStep(1);
  document.querySelectorAll('.device-card').forEach(c => c.classList.remove('selected'));
  selectedDevice = null;
  document.getElementById('btn-to-step2').disabled = true;
}

/* ── MCP Server Setup ── */
const mcpConfigs = {
  filesystem: { name: 'Filesystem', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/allowed/dir'] },
  github: { name: 'GitHub', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-github'], env: { GITHUB_TOKEN: 'your-token-here' } },
  postgres: { name: 'PostgreSQL', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://localhost/mydb'] },
  slack: { name: 'Slack', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-slack'], env: { SLACK_TOKEN: 'xoxb-your-token' } },
  puppeteer: { name: 'Puppeteer', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-puppeteer'] },
  memory: { name: 'Memory', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-memory'] },
  sqlite: { name: 'SQLite', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-sqlite', './database.db'] },
  redis: { name: 'Redis', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-redis', 'redis://localhost:6379'] },
  mysql: { name: 'MySQL', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-mysql', 'mysql://localhost/mydb'] },
  docker: { name: 'Docker', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-docker'] },
  kubernetes: { name: 'Kubernetes', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-kubernetes'] },
  git: { name: 'Git', cmd: 'npx', args: ['-y', '@modelcontextprotocol/server-git'] }
};

function openMcpSetup(server) {
  currentModalServer = server;
  const config = mcpConfigs[server];
  if (!config) return;

  document.getElementById('modal-title').textContent = 'Connect ' + config.name;

  const configObj = {
    mcpServers: {}
  };
  configObj.mcpServers[server] = { command: config.cmd, args: config.args };
  if (config.env) configObj.mcpServers[server].env = config.env;

  const codeEl = document.getElementById('modal-code');
  codeEl.innerHTML = '<button class="copy-btn" onclick="copyCode()">Copy</button>' +
    JSON.stringify(configObj, null, 2);

  document.getElementById('modal-overlay').classList.add('visible');
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('visible');
  currentModalServer = null;
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function copyCode() {
  const code = document.getElementById('modal-code').textContent.replace('Copy', '').trim();
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('#modal-code .copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
}

function installIntegration() {
  const btn = document.getElementById('modal-install-btn');
  btn.textContent = 'Installing...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Installed!';
    btn.style.background = '#4ade80';

    // Update the card to show connected state
    if (currentModalServer) {
      const cards = document.querySelectorAll('.integration-card');
      cards.forEach(card => {
        const name = card.querySelector('.int-name');
        if (name && mcpConfigs[currentModalServer] &&
            name.textContent === mcpConfigs[currentModalServer].name) {
          card.classList.add('connected');
          const status = card.querySelector('.int-status');
          if (status) status.classList.add('live');
          const actionBtn = card.querySelector('.int-action-btn');
          if (actionBtn) {
            actionBtn.textContent = 'Connected';
            actionBtn.classList.add('connected-btn');
          }
        }
      });
      updateLearnCount();
    }

    setTimeout(() => {
      closeModal();
      btn.textContent = 'One-Click Install';
      btn.disabled = false;
      btn.style.background = '';
    }, 1200);
  }, 1500);
}

/* ── App Setup ── */
function openAppSetup(app) {
  currentModalServer = null;
  const names = {
    vscode: 'VS Code', jetbrains: 'JetBrains', neovim: 'Neovim',
    notion: 'Notion', linear: 'Linear', 'google-drive': 'Google Drive',
    discord: 'Discord', vercel: 'Vercel', aws: 'AWS',
    cloudflare: 'Cloudflare', supabase: 'Supabase', figma: 'Figma',
    sentry: 'Sentry'
  };

  document.getElementById('modal-title').textContent = 'Connect ' + (names[app] || app);

  const instructions = {
    vscode: 'Install the Claude Code extension from the VS Code marketplace, then sign in.',
    jetbrains: 'Install the Claude Code plugin from the JetBrains marketplace.',
    neovim: 'Add the Claude Code plugin to your Neovim config.',
    notion: 'Authorize Claude Code to access your Notion workspace.',
    linear: 'Generate an API key in Linear settings and paste it below.',
    'google-drive': 'Sign in with Google and grant file access.',
    discord: 'Add the Claude Code bot to your Discord server.',
    vercel: 'Connect your Vercel account for seamless deployments.',
    aws: 'Configure your AWS credentials for cloud access.',
    cloudflare: 'Add your Cloudflare API token for Workers and Pages.',
    supabase: 'Enter your Supabase project URL and API key.',
    figma: 'Generate a Figma access token and connect.',
    sentry: 'Add your Sentry DSN for error tracking integration.'
  };

  document.getElementById('modal-body').innerHTML = `
    <p>${instructions[app] || 'Connect this app to Claude Code.'}</p>
    <div class="connect-form" style="margin-top:16px;padding:20px">
      <div class="form-row">
        <label class="form-label">API Key or Token</label>
        <input class="form-input" type="password" placeholder="Paste your key here..." />
      </div>
    </div>
    <p style="margin-top:12px;font-size:12px;color:#555">Your credentials are encrypted and stored securely on your machine.</p>
  `;

  document.getElementById('modal-install-btn').textContent = 'Connect';
  document.getElementById('modal-overlay').classList.add('visible');
}

/* ── Custom MCP ── */
function connectCustomMcp() {
  const url = document.getElementById('mcp-url-input').value;
  const name = document.getElementById('mcp-name-input').value;
  if (!url) return;

  alert(`Custom MCP server "${name || 'Custom'}" added:\n${url}`);
  document.getElementById('mcp-url-input').value = '';
  document.getElementById('mcp-name-input').value = '';
  updateLearnCount();
}

/* ── Search / Filter ── */
function filterIntegrations(input, mode) {
  const query = input.value.toLowerCase();
  const section = document.getElementById('mode-' + mode);
  const cards = section.querySelectorAll('.integration-card');

  cards.forEach(card => {
    const name = card.querySelector('.int-name').textContent.toLowerCase();
    const desc = card.querySelector('.int-desc').textContent.toLowerCase();
    card.style.display = (name.includes(query) || desc.includes(query)) ? '' : 'none';
  });
}

/* ── Learning Hub ── */
function updateLearnCount() {
  const connected = document.querySelectorAll('.integration-card.connected').length;
  const el = document.getElementById('learn-int-count');
  if (el) el.textContent = connected + ' connected';

  const patterns = document.getElementById('learn-patterns');
  if (patterns) {
    if (connected >= 3) patterns.textContent = 'Actively learning';
    else if (connected >= 1) patterns.textContent = 'Warming up';
    else patterns.textContent = 'Getting started';
  }
}

function setLearnMode(btn, mode) {
  const row = btn.parentElement;
  row.querySelectorAll('.int-action-btn').forEach(b => b.classList.remove('connected-btn'));
  btn.classList.add('connected-btn');
}

function setSuggestions(btn, on) {
  const row = btn.parentElement;
  row.querySelectorAll('.int-action-btn').forEach(b => b.classList.remove('connected-btn'));
  btn.classList.add('connected-btn');
  const el = document.getElementById('learn-suggestions');
  if (el) el.textContent = on ? 'Enabled' : 'Disabled';
}

function setAutoConnect(btn, on) {
  const row = btn.parentElement;
  row.querySelectorAll('.int-action-btn').forEach(b => b.classList.remove('connected-btn'));
  btn.classList.add('connected-btn');
}
