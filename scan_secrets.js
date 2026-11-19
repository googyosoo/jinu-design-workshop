const fs = require('fs');
const path = require('path');

const secretPatterns = [
  /AIza[0-9A-Za-z-_]{35}/i,
  /sk-[a-zA-Z0-9]{20,}/i,
  /ghp_[a-zA-Z0-9]{20,}/i,
  /(?:api[_-]?key|secret[_-]?key|auth[_-]?token)\s*[:=]\s*['"][a-zA-Z0-9_\-]{8,}['"]/i,
  /\b\d{6}-[1-4]\d{6}\b/,
  /\b010-\d{4}-\d{4}\b/
];

function scanDir(dir) {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'assets') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      list = list.concat(scanDir(fullPath));
    } else if (entry.isFile()) {
      list.push(fullPath);
    }
  }
  return list;
}

const files = scanDir('.');
let violations = [];

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.ico')) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const pat of secretPatterns) {
    if (pat.test(content)) {
      violations.push({ file, pattern: pat.toString() });
    }
  }
}

console.log('Secret/PII Scan Results:');
console.log('Files scanned:', files.length);
console.log('Violations found:', violations.length);
if (violations.length > 0) {
  console.log('Violations:', violations);
  process.exit(1);
} else {
  console.log('✅ ZERO SECRETS / ZERO PERSONAL INFORMATION DETECTED! (0건)');
  process.exit(0);
}
