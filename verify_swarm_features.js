const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifySwarmFeatures() {
  console.log('🚀 Starting Swarm Features E2E Verification...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('Browser console error:', msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.toString());
    console.error('Browser page error:', err);
  });

  const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log('Loading:', filePath);
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  // Ensure clean localStorage at start
  const hadStoredCustom = await page.evaluate(() => {
    const prev = localStorage.getItem('jinwoo_custom_styles');
    if (prev) {
      localStorage.removeItem('jinwoo_custom_styles');
      return true;
    }
    return false;
  });
  if (hadStoredCustom) {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
  }

  // 0. Baseline card count & image health check
  const initialCardCount = await page.$$eval('.gallery-card', els => els.length);
  console.log(`0. Initial gallery cards: ${initialCardCount}`);
  if (initialCardCount !== 16) {
    throw new Error(`Expected 16 initial cards, got ${initialCardCount}`);
  }

  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('.mockup-img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));
  });
  const brokenCount = await page.$$eval('.mockup-img', imgs =>
    imgs.filter(img => !img.complete || img.naturalWidth === 0).length
  );
  console.log(`   Broken .mockup-img count: ${brokenCount}`);
  if (brokenCount !== 0) {
    throw new Error(`Found ${brokenCount} broken .mockup-img elements`);
  }

  // 1. All 16 styles in #sb-style-select switching cleanly + non-fallback presets for 04, 10, 11, 13, 15
  console.log('1. Testing all 16 sandbox presets & responsive viewports...');
  const expectedPresets = {
    '01': 'preset-apple',
    '02': 'preset-swiss',
    '03': 'preset-barely',
    '04': 'preset-disclosure',
    '05': 'preset-material',
    '06': 'preset-warm',
    '07': 'preset-bento',
    '08': 'preset-bauhaus',
    '09': 'preset-brutal',
    '10': 'preset-organic',
    '11': 'preset-tactile',
    '12': 'preset-retro',
    '13': 'preset-editorial',
    '14': 'preset-kinetic',
    '15': 'preset-scrolly',
    '16': 'preset-game'
  };

  for (const [num, expectedClass] of Object.entries(expectedPresets)) {
    await page.select('#sb-style-select', num);
    await page.evaluate(() => onSandboxStyleChange());
    await new Promise(r => setTimeout(r, 80));

    const check = await page.evaluate((cls) => {
      const wrap = document.querySelector('#sandbox-single-stage .live-mockup-wrapper');
      if (!wrap) return { ok: false, reason: 'missing .live-mockup-wrapper' };
      const classes = Array.from(wrap.classList);
      const hasNav = !!wrap.querySelector('.live-nav');
      const hasTitle = !!wrap.querySelector('.live-hero-title');
      const hasDesc = !!wrap.querySelector('.live-hero-desc');
      const hasBtn = !!wrap.querySelector('.live-btn');
      return {
        ok: classes.includes(cls) && hasNav && hasTitle && hasDesc && hasBtn,
        classes,
        hasNav,
        hasTitle,
        hasDesc,
        hasBtn
      };
    }, expectedClass);

    if (!check.ok) {
      throw new Error(`Style ${num} failed preset check (expected ${expectedClass}): ${JSON.stringify(check)}`);
    }
    if (num !== '01' && check.classes.includes('preset-apple')) {
      throw new Error(`Style ${num} incorrectly fell back to .preset-apple: ${check.classes.join(', ')}`);
    }
  }
  console.log('   [PASS] All 16 styles applied distinct preset classes (incl. 04, 10, 11, 13, 15)');

  // Responsive viewport check on newly added presets
  for (const vp of ['tablet', 'mobile']) {
    await page.click(`#btn-device-${vp}`);
    await new Promise(r => setTimeout(r, 180));
    for (const num of ['04', '10', '11', '13', '15']) {
      await page.select('#sb-style-select', num);
      await page.evaluate(() => onSandboxStyleChange());
      await new Promise(r => setTimeout(r, 80));
      const overflowCheck = await page.evaluate(() => {
        const wrapper = document.getElementById('sandbox-stage-wrapper');
        const mockup = document.querySelector('#sandbox-single-stage .live-mockup-wrapper');
        return {
          wrapperHasClass: wrapper.className,
          scrollWidth: mockup ? mockup.scrollWidth : 0,
          clientWidth: mockup ? mockup.clientWidth : 0
        };
      });
      if (overflowCheck.scrollWidth > overflowCheck.clientWidth + 4) {
        throw new Error(`Responsive overflow on ${vp} for style ${num}: ${JSON.stringify(overflowCheck)}`);
      }
    }
  }
  await page.click('#btn-device-desktop');
  await new Promise(r => setTimeout(r, 150));
  console.log('   [PASS] Tablet & Mobile responsive viewports fit without overflow');

  // 2. Component Kit geometric differentiation (02 Swiss vs 05 Material vs 09 Neo-Brutalism)
  console.log('2. Testing Component Kit geometric differentiation...');
  async function inspectKit(cardIdxZeroBased) {
    const btnSelector = `.gallery-card:nth-child(${cardIdxZeroBased + 1}) .btn-component-kit`;
    await page.click(btnSelector);
    await new Promise(r => setTimeout(r, 250));

    const isActive = await page.$eval('#component-kit-modal', el => el.classList.contains('active'));
    if (!isActive) throw new Error(`Component Kit modal did not open for card index ${cardIdxZeroBased}`);

    // Ensure Buttons tab & HTML format first
    await page.click('#tab-btn-buttons');
    await page.click('#btn-format-html');
    await new Promise(r => setTimeout(r, 150));

    const htmlData = await page.evaluate(() => {
      const stage = document.getElementById('compkit-preview-stage');
      const btn = stage.querySelector('button');
      const style = btn ? window.getComputedStyle(btn) : null;
      return {
        hasGeoSpec: !!stage.querySelector('.compkit-geo-spec'),
        geoSpecText: stage.querySelector('.compkit-geo-spec')?.innerText || '',
        previewHtml: stage.innerHTML,
        btnRadius: style ? style.borderRadius : '',
        btnBorderWidth: style ? style.borderWidth : '',
        btnBorderColor: style ? style.borderColor : '',
        btnShadow: style ? style.boxShadow : '',
        codeHtml: document.getElementById('compkit-code-text').innerText
      };
    });

    await page.click('#btn-format-tw');
    await new Promise(r => setTimeout(r, 120));
    const codeTw = await page.$eval('#compkit-code-text', el => el.innerText);

    // Check Card tab geometry too
    await page.click('#tab-btn-card');
    await page.click('#btn-format-html');
    await new Promise(r => setTimeout(r, 120));
    const cardHtml = await page.$eval('#compkit-preview-stage', el => el.innerHTML);

    await page.click('#component-kit-modal .btn-modal-close');
    await new Promise(r => setTimeout(r, 200));

    return { ...htmlData, codeTw, cardHtml };
  }

  const swissKit = await inspectKit(1);    // Style 02
  const materialKit = await inspectKit(4); // Style 05
  const brutalKit = await inspectKit(8);   // Style 09

  if (!swissKit.hasGeoSpec || !materialKit.hasGeoSpec || !brutalKit.hasGeoSpec) {
    throw new Error('Missing .compkit-geo-spec bar in Component Kit preview');
  }

  const swissRadiusNum = parseFloat(swissKit.btnRadius);
  const materialRadiusNum = parseFloat(materialKit.btnRadius);
  const brutalBorderNum = parseFloat(brutalKit.btnBorderWidth);

  if (swissRadiusNum !== 0) {
    throw new Error(`Swiss 02 button radius should be 0px, got ${swissKit.btnRadius}`);
  }
  if (!swissKit.codeHtml.includes('0px') && !swissKit.codeHtml.includes('border-radius: 0')) {
    throw new Error(`Swiss 02 HTML code should reflect 0px radius: ${swissKit.codeHtml}`);
  }
  if (materialRadiusNum < 16) {
    throw new Error(`Material 05 button radius should be rounded (>=16px), got ${materialKit.btnRadius}`);
  }
  if (brutalBorderNum < 2 || !brutalKit.btnShadow || brutalKit.btnShadow === 'none') {
    throw new Error(`Neo-Brutalism 09 button should have hard border & shadow, got border=${brutalKit.btnBorderWidth}, shadow=${brutalKit.btnShadow}`);
  }
  if (
    swissKit.codeHtml === materialKit.codeHtml ||
    materialKit.codeHtml === brutalKit.codeHtml ||
    swissKit.codeTw === materialKit.codeTw ||
    materialKit.codeTw === brutalKit.codeTw
  ) {
    throw new Error('Component Kit generated identical code across distinct styles');
  }

  // Test all 5 tabs on Neo-Brutalism 09
  await page.click('.gallery-card:nth-child(9) .btn-component-kit');
  await new Promise(r => setTimeout(r, 200));
  const tabOutputs = new Set();
  for (const tab of ['buttons', 'inputs', 'card', 'badges', 'nav']) {
    await page.click(`#tab-btn-${tab}`);
    await new Promise(r => setTimeout(r, 100));
    const codeText = await page.$eval('#compkit-code-text', el => el.innerText);
    tabOutputs.add(codeText);
  }
  if (tabOutputs.size !== 5) {
    throw new Error(`Expected 5 distinct code outputs across tabs, got ${tabOutputs.size}`);
  }
  await page.click('#component-kit-modal .btn-modal-close');
  await new Promise(r => setTimeout(r, 200));
  console.log(`   [PASS] Component Kit geometry verified (Swiss=${swissKit.btnRadius}, Material=${materialKit.btnRadius}, Brutal border=${brutalKit.btnBorderWidth}, shadow=${brutalKit.btnShadow})`);

  // 3. Swarm team preset copy button & toast
  console.log('3. Testing 🐝 Swarm 팀 preset copy button...');
  const swarmBtnCount = await page.$$eval('.btn-preset-swarm', els => els.length);
  console.log(`   .btn-preset-swarm count: ${swarmBtnCount}`);
  if (swarmBtnCount < 16) {
    throw new Error(`Expected at least 16 .btn-preset-swarm buttons, got ${swarmBtnCount}`);
  }

  await page.evaluate(() => {
    document.querySelectorAll('.toast-msg').forEach(t => t.remove());
  });
  await page.click('.btn-preset-swarm');
  await page.waitForSelector('.toast-msg', { timeout: 4000 });
  const swarmToastText = await page.$eval('.toast-msg', el => el.innerText);
  console.log(`   Swarm toast text: "${swarmToastText}"`);
  if (!swarmToastText.includes('Swarm')) {
    throw new Error(`Expected Swarm toast message, got: ${swarmToastText}`);
  }

  // Verify existing v0 preset still delegates properly
  await page.evaluate(() => {
    document.querySelectorAll('.toast-msg').forEach(t => t.remove());
    copyAIToolPrompt('01-apple-inspired-premium-minimal-prompt', 'v0');
  });
  await page.waitForSelector('.toast-msg', { timeout: 4000 });
  const v0Toast = await page.$eval('.toast-msg', el => el.innerText);
  if (!v0Toast.includes('v0 / Lovable')) {
    throw new Error(`v0 preset delegation broke: ${v0Toast}`);
  }
  console.log('   [PASS] Swarm 팀 preset copy & delegation verified');

  // 4. Real-Time Self-Critique Linter (#agentic-critic-panel)
  console.log('4. Testing Real-Time Self-Critique Linter (#agentic-critic-panel)...');
  const criticElements = await page.evaluate(() => ({
    panel: !!document.getElementById('agentic-critic-panel'),
    badge: !!document.getElementById('critic-status-badge'),
    score: !!document.getElementById('critic-score-val'),
    issues: !!document.getElementById('critic-issues-list'),
    autofix: !!document.getElementById('btn-critic-autofix')
  }));
  if (!Object.values(criticElements).every(Boolean)) {
    throw new Error(`Missing critic panel elements: ${JSON.stringify(criticElements)}`);
  }

  // Open Token Studio panel for visual inspection & interaction
  const panelOpen = await page.$eval('#token-studio-panel', el => el.classList.contains('active'));
  if (!panelOpen) {
    await page.click('#btn-toggle-token-studio');
    await new Promise(r => setTimeout(r, 250));
  }

  // Set Swiss '02' + conflicting radius 28px
  await page.select('#sb-style-select', '02');
  await page.evaluate(() => {
    onSandboxStyleChange();
    updateToken('radius', 28);
  });
  await new Promise(r => setTimeout(r, 200));

  const warnState = await page.evaluate(() => ({
    badge: document.getElementById('critic-status-badge').innerText.trim(),
    score: document.getElementById('critic-score-val').innerText.trim(),
    issues: document.getElementById('critic-issues-list').innerText.trim()
  }));
  console.log('   Warn state on Style 02 + radius 28px:', warnState);
  if (!warnState.badge.toUpperCase().includes('WARN') || !warnState.issues.length) {
    throw new Error(`Expected WARN state for Swiss 02 + 28px radius, got: ${JSON.stringify(warnState)}`);
  }

  // Click autofix
  await page.evaluate(() => document.querySelectorAll('.toast-msg').forEach(t => t.remove()));
  await page.click('#btn-critic-autofix');
  await new Promise(r => setTimeout(r, 250));

  const fixedState = await page.evaluate(() => ({
    badge: document.getElementById('critic-status-badge').innerText.trim(),
    score: document.getElementById('critic-score-val').innerText.trim(),
    radiusBadge: document.getElementById('val-badge-radius').innerText.trim(),
    stageRadius: document.getElementById('sandbox-single-stage').style.getPropertyValue('--tk-radius')
  }));
  console.log('   After #btn-critic-autofix:', fixedState);
  if (!fixedState.badge.toUpperCase().includes('PASS') || fixedState.radiusBadge !== '0px' || fixedState.stageRadius !== '0px') {
    throw new Error(`Auto-fix failed to restore compliant Swiss tokens: ${JSON.stringify(fixedState)}`);
  }
  console.log('   [PASS] Self-Critique Linter WARN -> Auto-Fix PASS verified');

  // 5. 3-Persona Consensus AI Style Studio + JSON token extraction for style #17
  console.log('5. Testing 3-Persona Consensus AI Style Studio & JSON extraction...');
  await page.click('.btn-highlight-studio');
  await new Promise(r => setTimeout(r, 300));

  const aiModalActive = await page.$eval('#ai-studio-modal', el => el.classList.contains('active'));
  if (!aiModalActive) throw new Error('#ai-studio-modal failed to open');

  const metaPromptText = await page.$eval('#studio-meta-output', el => el.innerText);
  const hasPersonas =
    metaPromptText.includes('Visual Director') &&
    metaPromptText.includes('Anti-Cliche Critic') &&
    (metaPromptText.includes('CJK Typography') || metaPromptText.includes('Token Engineer'));
  const hasJsonSchemaPrompt =
    metaPromptText.includes('primary') &&
    metaPromptText.includes('radius') &&
    metaPromptText.includes('colorSwatches');

  if (!hasPersonas || !hasJsonSchemaPrompt) {
    throw new Error(`Meta prompt missing 3-persona or JSON token instructions:\n${metaPromptText.slice(0, 400)}`);
  }
  console.log('   [PASS] 3-Persona Consensus meta-prompt verified');

  const sampleConsensusResponse = `# 17. 사이버펑크 네온 느와르 (Cyberpunk Neon Noir)
- Category: future, expressive
- Intensity: atmospheric

비 내리는 미래 도시의 네온 불빛과 딥 퍼플 섀도우를 결합한 고대비 인터페이스입니다.

\`\`\`json
{
  "primary": "#00F5FF",
  "radius": 10,
  "shadowDepth": 3,
  "brightness": 94,
  "tracking": 0.5,
  "colorSwatches": ["#080811", "#170E2E", "#00F5FF", "#FF0055", "#E2D9F3"]
}
\`\`\`
`;

  await page.$eval('#studio-style-name', el => { el.value = '사이버펑크 네온 느와르 (Cyberpunk Neon Noir)'; });
  await page.$eval('#studio-summary-input', el => { el.value = '3인 페르소나 합의로 생성된 17번째 네온 느와르 디자인 토큰 스타일'; });
  await page.$eval('#studio-ai-response', (el, v) => { el.value = v; }, sampleConsensusResponse);

  await page.click('#ai-studio-modal button[onclick="registerCustomStyle()"]');
  await new Promise(r => setTimeout(r, 600));

  const customCheck = await page.evaluate(() => {
    const cards = document.querySelectorAll('.gallery-card');
    const customCard = document.getElementById('card-custom-17');
    const hasSwarmOnCustom = customCard ? !!customCard.querySelector('.btn-preset-swarm') : false;
    const swatches = customCard ? Array.from(customCard.querySelectorAll('.swatch-tip')).map(el => el.innerText.trim().toUpperCase()) : [];
    const tokens17 = typeof styleDefaultTokens !== 'undefined' ? styleDefaultTokens['17'] : null;
    const meta17 = typeof styleMetaStore !== 'undefined' ? styleMetaStore['custom-17'] : null;
    return {
      cardCount: cards.length,
      customCardExists: !!customCard,
      hasSwarmOnCustom,
      swatches,
      tokens17,
      meta17
    };
  });
  console.log('   Custom #17 registration result:', JSON.stringify(customCheck));

  if (
    customCheck.cardCount !== 17 ||
    !customCheck.customCardExists ||
    !customCheck.hasSwarmOnCustom ||
    !customCheck.tokens17 ||
    customCheck.tokens17.primary.toUpperCase() !== '#00F5FF' ||
    Number(customCheck.tokens17.radius) !== 10 ||
    !customCheck.meta17 ||
    !customCheck.swatches.includes('#00F5FF')
  ) {
    throw new Error(`Custom style #17 JSON token registration failed: ${JSON.stringify(customCheck)}`);
  }

  // Test applying style 17 in Sandbox
  await page.select('#sb-style-select', '17');
  await page.evaluate(() => onSandboxStyleChange());
  await new Promise(r => setTimeout(r, 200));

  const sandbox17 = await page.evaluate(() => {
    const wrap = document.querySelector('#sandbox-single-stage .live-mockup-wrapper');
    const stage = document.getElementById('sandbox-single-stage');
    return {
      hasCustomPresetClass: wrap ? wrap.classList.contains('preset-custom') : false,
      tkPrimary: stage.style.getPropertyValue('--tk-primary'),
      tkRadius: stage.style.getPropertyValue('--tk-radius')
    };
  });
  console.log('   Sandbox Style #17 active state:', sandbox17);
  if (!sandbox17.hasCustomPresetClass || sandbox17.tkPrimary.toUpperCase() !== '#00F5FF' || sandbox17.tkRadius !== '10px') {
    throw new Error(`Sandbox style #17 rendering/tokens failed: ${JSON.stringify(sandbox17)}`);
  }
  console.log('   [PASS] Custom style #17 JSON token extraction & sandbox rendering verified');

  // 6. Scroll to sandbox for clean showcase screenshot
  await page.evaluate(() => {
    const anchor = document.getElementById('sandbox-anchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 400));

  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  const screenshotPath = path.join(assetsDir, 'swarm_features_showcase.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`6. Saved showcase screenshot: ${screenshotPath}`);

  // Clean up localStorage before closing
  await page.evaluate(() => localStorage.removeItem('jinwoo_custom_styles'));
  await browser.close();

  console.log(`7. Browser console/page errors: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Errors:', errors);
    process.exit(1);
  }

  console.log('✅ ALL SWARM FEATURES VERIFIED AND 100% PASSING!');
  process.exit(0);
}

verifySwarmFeatures().catch(err => {
  console.error('❌ Swarm verification failed:', err);
  process.exit(1);
});
