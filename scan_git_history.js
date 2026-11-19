const { execSync } = require('child_process');

console.log('🔍 Scanning full git commit history (git log -p)...');
const logDiff = execSync('git log -p', { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

const secretPatterns = [
  { name: 'Google API Key (AIza...)', regex: /AIza[0-9A-Za-z-_]{35}/i },
  { name: 'OpenAI Secret Key (sk-...)', regex: /sk-[a-zA-Z0-9]{20,}/i },
  { name: 'GitHub Personal Access Token (ghp_...)', regex: /ghp_[a-zA-Z0-9]{20,}/i },
  { name: '주민등록번호', regex: /\b\d{6}-[1-4]\d{6}\b/ },
  { name: '휴대폰 번호', regex: /\b010-\d{4}-\d{4}\b/ }
];

let violations = [];

for (const pat of secretPatterns) {
  const matches = logDiff.match(pat.regex);
  if (matches) {
    violations.push({ pattern: pat.name, match: matches[0] });
  }
}

console.log('Git Log Diff Length:', logDiff.length, 'characters');
console.log('Violations Count:', violations.length);

if (violations.length > 0) {
  console.error('❌ CRITICAL: Secrets or personal info detected in git log history:');
  console.error(violations);
  process.exit(1);
} else {
  console.log('✅ ZERO SECRETS / ZERO PERSONAL INFORMATION in full git history! (0건)');
  process.exit(0);
}
