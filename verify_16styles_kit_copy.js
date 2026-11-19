const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const EXPECTED_PRESETS = {
  1: 'preset-apple',
  2: 'preset-swiss',
  3: 'preset-barely',
  4: 'preset-disclosure',
  5: 'preset-material',
  6: 'preset-warm',
  7: 'preset-bento',
  8: 'preset-bauhaus',
  9: 'preset-brutal',
  10: 'preset-organic',
  11: 'preset-tactile',
  12: 'preset-retro',
  13: 'preset-editorial',
  14: 'preset-kinetic',
  15: 'preset-scrolly',
  16: 'preset-game'
};

const COMPONENT_TABS = ['buttons', 'inputs', 'card', 'badges', 'nav'];

async function run16StylesVerification() {
  console.log('🚀 Starting Comprehensive 16-Style & Component Kit Verification...');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  // Grant clipboard permissions
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('file://*', ['clipboard-read', 'clipboard-write']).catch(() => {});

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
  console.log('Loading page:', filePath);
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  // Override navigator.clipboard in page context to reliably capture copied text
  await page.evaluate(() => {
    window.__lastCopiedText = null;
    window.__copyHistory = [];
    if (!navigator.clipboard) {
      navigator.clipboard = {};
    }
    navigator.clipboard.writeText = async (text) => {
      window.__lastCopiedText = text;
      window.__copyHistory.push(text);
      return Promise.resolve();
    };
    // Also hook execCommand fallback
    const origExec = document.execCommand;
    document.execCommand = function(cmd) {
      if (cmd === 'copy') {
        const selection = window.getSelection().toString();
        if (selection) {
          window.__lastCopiedText = selection;
          window.__copyHistory.push(selection);
        }
      }
      return true;
    };
  });

  // Verify initial gallery cards
  const cardCount = await page.$$eval('.gallery-card', els => els.length);
  console.log(`[PASS] Gallery cards found: ${cardCount}`);
  if (cardCount !== 16) {
    throw new Error(`Expected 16 cards, found ${cardCount}`);
  }

  // Loop through all 16 styles
  for (let i = 1; i <= 16; i++) {
    const padNum = i < 10 ? '0' + i : String(i);
    const expectedClass = EXPECTED_PRESETS[i];

    console.log(`\n========================================`);
    console.log(`▶ Testing Style #${padNum} (${expectedClass})`);
    console.log(`========================================`);

    // 1. Sandbox Style Switch
    await page.select('#sb-style-select', padNum);
    await page.evaluate(() => {
      if (typeof onSandboxStyleChange === 'function') onSandboxStyleChange();
    });
    await new Promise(r => setTimeout(r, 120));

    const sandboxState = await page.evaluate((expectedClass) => {
      const wrapper = document.querySelector('.live-mockup-wrapper');
      const hasClass = wrapper ? wrapper.classList.contains(expectedClass) : false;
      const title = document.querySelector('.live-hero-title')?.innerText || '';
      const desc = document.querySelector('.live-hero-desc')?.innerText || '';
      const btn = document.querySelector('.live-btn')?.innerText || '';
      return { hasClass, title, desc, btn, classList: wrapper ? wrapper.className : '' };
    }, expectedClass);

    if (!sandboxState.hasClass) {
      throw new Error(`Style #${padNum} failed preset class check! Expected: ${expectedClass}, got: ${sandboxState.classList}`);
    }
    console.log(`  [PASS] Sandbox preset applied: ${expectedClass}`);
    console.log(`         Title: "${sandboxState.title}", Btn: "${sandboxState.btn}"`);

    // 2. Component Kit Modal for Style i
    // Open Component Kit modal directly via function or clicking card button
    await page.evaluate((idx) => {
      const btns = document.querySelectorAll('.btn-component-kit');
      if (btns[idx - 1]) {
        btns[idx - 1].click();
      } else {
        openComponentKitModal('style-' + idx, idx < 10 ? '0' + idx : String(idx), 'Style ' + idx, '스타일 ' + idx);
      }
    }, i);
    await new Promise(r => setTimeout(r, 300));

    const modalActive = await page.$eval('#component-kit-modal', el => el.classList.contains('active'));
    if (!modalActive) {
      throw new Error(`Component kit modal failed to open for style #${padNum}`);
    }

    // Test all 5 component tabs
    for (const tab of COMPONENT_TABS) {
      await page.evaluate((tabName) => {
        const btn = document.getElementById('tab-btn-' + tabName);
        if (btn) btn.click();
      }, tab);
      await new Promise(r => setTimeout(r, 100));

      const tabState = await page.evaluate(() => {
        const stage = document.getElementById('compkit-preview-stage');
        const code = document.getElementById('compkit-code-text');
        const text = code ? (code.textContent || code.innerText || '').trim() : '';
        const geoBadge = stage ? stage.querySelector('.geo-spec-style-badge')?.innerText : '';
        return {
          hasPreview: stage && stage.children.length > 0 && stage.innerText.trim().length > 0,
          hasCode: text.length > 0,
          codeLen: text.length,
          geoBadge
        };
      });

      if (!tabState.hasPreview || !tabState.hasCode) {
        throw new Error(`Tab '${tab}' for style #${padNum} is empty or unrendered! State: ${JSON.stringify(tabState)}`);
      }
      console.log(`  [PASS] Component Tab '${tab}' rendered (code length: ${tabState.codeLen})`);
    }

    // Test Tailwind v4 code format toggle
    await page.click('#btn-format-tw');
    await new Promise(r => setTimeout(r, 80));
    const twCode = await page.$eval('#compkit-code-text', el => (el.textContent || el.innerText || ''));
    if (!twCode || (!twCode.includes('class=') && !twCode.includes('className='))) {
      throw new Error(`Tailwind format toggle failed for style #${padNum}`);
    }
    console.log(`  [PASS] Tailwind v4 format toggle confirmed`);

    // Toggle back to HTML
    await page.click('#btn-format-html');
    await new Promise(r => setTimeout(r, 80));
    const htmlCode = await page.$eval('#compkit-code-text', el => (el.textContent || el.innerText || ''));

    // Test "코드 복사" button in Component Kit
    await page.evaluate(() => {
      const copyBtn = document.querySelector('#component-kit-modal .btn-copy-custom-prompt');
      if (copyBtn) copyBtn.click();
      else copyKitCode();
    });
    await new Promise(r => setTimeout(r, 100));

    const copiedKitCode = await page.evaluate(() => window.__lastCopiedText);
    if (!copiedKitCode || copiedKitCode.trim() !== htmlCode.trim()) {
      throw new Error(`Component Kit code copy mismatch for style #${padNum}! Copied length: ${copiedKitCode ? copiedKitCode.length : 0}, HTML length: ${htmlCode.length}`);
    }
    console.log(`  [PASS] Component Kit code copy verified (${copiedKitCode.length} chars)`);

    // Close Component Kit Modal
    await page.evaluate(() => closeComponentKitModal());
    await new Promise(r => setTimeout(r, 100));

    // 3. Test Prompt Copy button on gallery card i
    await page.evaluate((idx) => {
      const copyBtns = document.querySelectorAll('.gallery-card .btn-copy-prompt');
      if (copyBtns[idx - 1]) copyBtns[idx - 1].click();
    }, i);
    await new Promise(r => setTimeout(r, 80));

    const copiedPrompt = await page.evaluate(() => window.__lastCopiedText);
    if (!copiedPrompt || copiedPrompt.length < 50) {
      throw new Error(`Prompt copy failed on card #${padNum}`);
    }
    console.log(`  [PASS] Card prompt copy verified (${copiedPrompt.length} chars)`);
  }

  // 4. Screenshots: Desktop and Mobile
  console.log('\n========================================');
  console.log('📸 Capturing Desktop and Mobile Showcase Screenshots...');
  console.log('========================================');

  // Desktop showcase (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  // Scroll to sandbox section
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  const desktopPath = path.resolve(__dirname, 'assets', 'desktop_showcase.png');
  await page.screenshot({ path: desktopPath, fullPage: false });
  console.log(`[PASS] Desktop screenshot saved: ${desktopPath}`);

  // Mobile showcase (390x844)
  await page.setViewport({ width: 390, height: 844 });
  // Switch sandbox viewport to mobile
  await page.click('#btn-device-mobile').catch(() => {});
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  const mobilePath = path.resolve(__dirname, 'assets', 'mobile_showcase.png');
  await page.screenshot({ path: mobilePath, fullPage: false });
  console.log(`[PASS] Mobile screenshot saved: ${mobilePath}`);

  // Check console / page errors
  console.log(`\n========================================`);
  console.log(`Browser console errors encountered: ${errors.length}`);
  if (errors.length > 0) {
    throw new Error(`Encountered ${errors.length} browser errors during test run`);
  }

  console.log('🎉 100% SUCCESS: All 16 styles, 80 component previews, and code copy verified with 0 errors!');
  await browser.close();
}

run16StylesVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
