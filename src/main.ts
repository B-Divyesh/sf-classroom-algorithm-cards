import './styles.css';
import { challengeCount, chunk, roles, sanitizeSettings, sheetCount, themes, timingByMinutes, type KitSettings, type Minutes, type ThemeId } from './kit';

function requiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`The kit builder could not find ${selector}. Reload the page to try again.`);
  return element;
}

const form = requiredElement<HTMLFormElement>('#kit-form');
const preview = requiredElement<HTMLElement>('#print-preview');
const status = requiredElement<HTMLElement>('#builder-status');
const offlineNotice = requiredElement<HTMLElement>('#offline-notice');
const printButton = requiredElement<HTMLButtonElement>('#print-button');

const escapeHtml = (value: string): string => value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] ?? char);

function readSettings(): KitSettings {
  const data = new FormData(form);
  return sanitizeSettings({
    minutes: Number(data.get('minutes')) as Minutes,
    teams: Number(data.get('teams')),
    theme: String(data.get('theme')) as ThemeId,
    inkSaver: data.get('inkSaver') === 'on',
  });
}

function repeatForTeams<T>(items: T[], teams: number): Array<{ team: number; item: T }> {
  return Array.from({ length: teams }, (_, team) => items.map((item) => ({ team: team + 1, item }))).flat();
}

function renderGuide(settings: KitSettings): string {
  const theme = themes[settings.theme];
  const timings = timingByMinutes[settings.minutes];
  return `
    <section class="print-sheet guide-sheet" aria-label="Facilitation guide">
      <div class="sheet-kicker">Teacher guide · ${settings.minutes} minutes · ${settings.teams} ${settings.teams === 1 ? 'team' : 'teams'}</div>
      <h2>${escapeHtml(theme.title)}</h2>
      <p class="sheet-lead">${escapeHtml(theme.summary)}</p>
      <div class="guide-grid">
        <section><h3>Before students arrive</h3><ol><li>Print this kit, single-sided.</li><li>Cut card sheets on the dashed lines.</li><li>${escapeHtml(theme.prop)}</li><li>Put one command deck and role set at each team.</li></ol></section>
        <section><h3>Your minute plan</h3><ol class="timing-list">${timings.map(([time, label]) => `<li><strong>${time}</strong><span>${label}</span></li>`).join('')}</ol></section>
        <section><h3>Say this first</h3><blockquote>“An algorithm is a sequence someone can follow. A bug is a surprise in the result—not a bad idea or a person’s fault. We test the cards, not each other.”</blockquote></section>
        <section><h3>Manage the room</h3><ul><li>Teams of 3–5 work best; combine Card keeper and Reporter in smaller teams.</li><li>Rotate the Robot after every test.</li><li>Only the Robot moves objects during a test.</li><li>${escapeHtml(theme.safety)}</li></ul></section>
      </div>
      <aside class="valid-box"><strong>Multiple answers can be right.</strong> Ask only: Can another person follow it? Does it reach the goal? Can the team explain a useful change? Praise a clear test, not the shortest route.</aside>
      <footer class="sheet-footer"><span>Classroom Algorithm Cards</span><span>Guide · 1</span></footer>
    </section>`;
}

function renderChallenges(settings: KitSettings): string {
  const theme = themes[settings.theme];
  const selected = theme.challenges.slice(0, challengeCount(settings.minutes));
  return `
    <section class="print-sheet challenge-sheet" aria-label="Challenge cards">
      <div class="sheet-kicker">Challenge cards · Cut on dashed lines</div>
      <h2>${escapeHtml(theme.title)} missions</h2>
      <div class="challenge-grid">${selected.map((challenge, index) => `
        <article class="challenge-card">
          <div class="card-label">Mission ${index + 1}</div>
          <h3>${escapeHtml(challenge.title)}</h3>
          <p class="goal"><strong>Goal:</strong> ${escapeHtml(challenge.goal)}</p>
          <ul>${challenge.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join('')}</ul>
          <p class="teacher-nudge"><strong>Teacher nudge:</strong> ${escapeHtml(challenge.nudge)}</p>
          <div class="route-line" aria-hidden="true">START → □ → □ → □ → END</div>
        </article>`).join('')}</div>
      <footer class="sheet-footer"><span>Different working sequences are welcome.</span><span>Challenges · 2</span></footer>
    </section>`;
}

function renderRoleSheets(settings: KitSettings): string {
  const cards = repeatForTeams(roles, settings.teams);
  return chunk(cards, 6).map((page, pageIndex) => `
    <section class="print-sheet card-sheet role-sheet" aria-label="Role cards page ${pageIndex + 1}">
      <div class="sheet-kicker">Role cards · Cut on dashed lines</div>
      <div class="cards-grid roles-grid">${page.map(({ team, item }) => `
        <article class="role-card">
          <div class="team-tag">Team ${team}</div>
          <span class="role-icon" aria-hidden="true">${item.icon}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.action)}</p>
          <small>${escapeHtml(item.cue)}</small>
        </article>`).join('')}</div>
      <footer class="sheet-footer"><span>Swap roles after a successful test.</span><span>Roles · ${pageIndex + 3}</span></footer>
    </section>`).join('');
}

function commandSymbol(command: string): string {
  if (command.includes('LEFT')) return '←';
  if (command.includes('RIGHT')) return '→';
  if (command.includes('START')) return '▶';
  if (command.includes('END')) return '■';
  if (command.includes('CHECK')) return '?';
  if (command.includes('PICK') || command.includes('CHOOSE')) return '◇';
  if (command.includes('TURN OVER')) return '↻';
  if (command.includes('STACK') || command.includes('INSIDE')) return '▤';
  if (command.includes('REMOVE') || command.includes('SEPARATE')) return '↔';
  return '↓';
}

function renderCommandSheets(settings: KitSettings): string {
  const cards = repeatForTeams(themes[settings.theme].commands, settings.teams);
  const rolePageCount = Math.ceil((settings.teams * roles.length) / 6);
  return chunk(cards, 8).map((page, pageIndex) => `
    <section class="print-sheet card-sheet command-sheet" aria-label="Instruction cards page ${pageIndex + 1}">
      <div class="sheet-kicker">Instruction cards · Cut on dashed lines</div>
      <div class="cards-grid command-grid">${page.map(({ team, item }) => `
        <article class="command-card">
          <div class="team-tag">Team ${team}</div>
          <span class="command-symbol" aria-hidden="true">${commandSymbol(item)}</span>
          <h3>${escapeHtml(item)}</h3>
        </article>`).join('')}</div>
      <footer class="sheet-footer"><span>Read from START to END.</span><span>Instructions · ${pageIndex + rolePageCount + 3}</span></footer>
    </section>`).join('');
}

function render(): void {
  const settings = readSettings();
  preview.classList.toggle('ink-saver', settings.inkSaver);
  preview.innerHTML = renderGuide(settings) + renderChallenges(settings) + renderRoleSheets(settings) + renderCommandSheets(settings);
  const count = sheetCount(settings);
  status.textContent = `Ready: ${count} printable ${count === 1 ? 'page' : 'pages'} for ${settings.teams} ${settings.teams === 1 ? 'team' : 'teams'}.`;
  const teamInput = form.elements.namedItem('teams');
  if (teamInput instanceof HTMLInputElement) teamInput.value = String(settings.teams);
}

form.addEventListener('change', render);
form.addEventListener('input', (event) => {
  if ((event.target as HTMLInputElement).name === 'teams') render();
});

printButton.addEventListener('click', () => {
  status.textContent = 'Opening your browser’s print panel. Choose “Save as PDF” for a digital copy.';
  window.print();
});

function updateNetworkState(): void {
  const offline = !navigator.onLine;
  offlineNotice.hidden = !offline;
  if (offline) offlineNotice.textContent = 'Offline — your kit still works and prints from this device.';
}

window.addEventListener('online', updateNetworkState);
window.addEventListener('offline', updateNetworkState);
updateNetworkState();
render();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {
    status.textContent = 'The kit works, but offline setup was unavailable. Stay online until you print.';
  }));
}
