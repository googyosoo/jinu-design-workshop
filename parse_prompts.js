const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.md') && !f.includes('README') && !f.includes('AGENTS'));
console.log('Found markdown files:', files.length);

const parsed = files.sort().map(f => {
  const content = fs.readFileSync(path.join(__dirname, f), 'utf-8');
  const lines = content.split('\n');
  const titleLine = lines.find(l => l.startsWith('# ')) || '';
  const title = titleLine.replace('# ', '').trim();
  const categoryLine = lines.find(l => l.includes('Category:')) || '';
  const category = categoryLine.replace(/.*Category:\s*/, '').trim();
  const intensityLine = lines.find(l => l.includes('Intensity:')) || '';
  const intensity = intensityLine.replace(/.*Intensity:\s*/, '').trim();
  
  // Extract key concept / philosophy
  let visualStyle = '';
  let coreConcept = '';
  let colors = [];
  
  let inVisual = false;
  let inCore = false;
  let inColors = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('비주얼 스타일')) {
      inVisual = true; inCore = false; inColors = false;
      continue;
    }
    if (line.includes('디자인 핵심')) {
      inVisual = false; inCore = true; inColors = false;
      continue;
    }
    if (line.includes('색상 구성')) {
      inVisual = false; inCore = false; inColors = true;
      continue;
    }
    if (line.includes('타이포그래피') || line.includes('레이아웃') || line.includes('피해야 할 디자인') || line.includes('---')) {
      inVisual = false; inCore = false; inColors = false;
    }

    if (inVisual && line && !visualStyle) visualStyle = line;
    if (inCore && line && !coreConcept) coreConcept = line;
    if (inColors && line && (line.includes('#') || line.includes(':') || line.includes('Background') || line.includes('Text'))) {
      colors.push(line);
    }
  }

  return {
    id: f.replace('.md', ''),
    filename: f,
    title,
    category,
    intensity,
    visualStyle,
    coreConcept,
    colors: colors.slice(0, 5),
    fullContent: content
  };
});

fs.writeFileSync(path.join(__dirname, 'prompts_data.json'), JSON.stringify(parsed, null, 2), 'utf-8');
console.log('Saved prompts_data.json successfully with', parsed.length, 'prompts.');
