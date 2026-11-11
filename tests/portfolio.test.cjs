const {test, before, after} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

// Compile the actual app components in memory, with the same source alias as Next.
const previousTs = require.extensions['.ts'];
const previousTsx = require.extensions['.tsx'];
let icons;
function compile(module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2020, esModuleInterop: true,
  }}).outputText;
  const originalRequire = module.require.bind(module);
  module.require = id => id === 'lucide-react' ? icons : originalRequire(id.startsWith('@/') ? path.resolve(__dirname, '../src', id.slice(2)) : id);
  module._compile(compiled, filename);
}
require.extensions['.ts'] = compile;
require.extensions['.tsx'] = compile;
const {profile, projects, personal, recognition} = require('../src/data/portfolio.ts');
let html;
before(async () => {
  icons = await import('lucide-react');
  const Portfolio = require('../src/components/Portfolio.tsx').default;
  html = renderToStaticMarkup(React.createElement(Portfolio));
});
after(() => {
  if (previousTs) require.extensions['.ts'] = previousTs; else delete require.extensions['.ts'];
  if (previousTsx) require.extensions['.tsx'] = previousTsx; else delete require.extensions['.tsx'];
});

test('portfolio renders its primary sections and navigation targets', () => {
  for (const id of ['main', 'work', 'about', 'expertise', 'experience', 'beyond', 'contact']) {
    assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`);
  }
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `Broken navigation target ${id}`);
  }
});
test('all project case-study buttons remain available', () => {
  assert.equal((html.match(/class="project-open"/g) || []).length, projects.length);
  for (const project of projects) assert.ok(html.includes(`View case study: ${project.subtitle.replaceAll('&', '&amp;')}`));
});
test('project filters cover every project category', () => {
  for (const category of new Set(projects.map(p => p.category))) assert.ok(html.includes(`>${category}</button>`));
  assert.ok(html.includes('aria-pressed="true"'));
});
test('contact, resume, LinkedIn and YouTube destinations remain connected', () => {
  for (const url of [profile.linkedin, profile.resume, personal.youtube, `mailto:${profile.email}`]) {
    assert.ok(url && html.includes(`href="${url}"`), `Missing destination ${url}`);
  }
  assert.ok(html.includes('Watch my travel stories'));
});
test('personal interests and engineering focus render from the editable data', () => {
  for (const interest of personal.interests) assert.ok(html.includes(interest.title.replaceAll('&', '&amp;')));
  for (const role of profile.focus) assert.ok(html.includes(role));
});
test('recognition entries remain visible', () => {
  assert.equal((html.match(/class="recognition-card"/g) || []).length, recognition.length);
});
test('interactive controls retain accessible names and initial states', () => {
  assert.ok(html.includes('aria-label="Open navigation" aria-expanded="false"'));
  assert.ok(html.includes('aria-labelledby="case-title"'));
  assert.equal((html.match(/aria-label="Explore (?:Source code|Dependencies|Business rules|Specifications|Evidence)"/g) || []).length, 5);
  assert.ok(html.includes('aria-controls="expertise-0"'));
  assert.ok(html.includes('Copy email'));
});
test('development and production caches are separated', async () => {
  const {default: config} = await import('../next.config.mjs');
  assert.equal(config.distDir, '.next-build');
  assert.equal(config.output, 'export');
});
