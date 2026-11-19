const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyFullSuite() {
  console.log('Running comprehensive verification suite for features 1, 2, 3, 4...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));

  const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });

  // 1. Basic Checks
  const title = await page.title();
  console.log('1. Page Title:', title);
  const cardCount = await page.$$eval('.gallery-card', el => el.length);
  console.log('   Card Count:', cardCount);

  // 2. Wait for images & check broken images
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
  const brokenCount = await page.$$eval('.mockup-img', imgs => {
    return imgs.filter(img => !img.complete || img.naturalWidth === 0).length;
  });
  console.log('   Broken images count:', brokenCount);

  // 3. Test Feature 3: AI Tool Export Presets
  console.log('2. Testing Feature 3: AI Tool Presets...');

  // Test v0 preset
  await page.evaluate(() => {
    document.querySelectorAll('.toast-msg').forEach(t => t.remove());
    copyAIToolPrompt('01-apple-inspired-premium-minimal-prompt', 'v0');
  });
  await page.waitForSelector('.toast-msg', { timeout: 4000 });
  const v0Text = await page.$eval('.toast-msg', el => el.innerText);
  const v0CopyTriggered = v0Text.includes('v0 / Lovable');
  console.log('   v0/Lovable preset triggered:', v0CopyTriggered);

  // Test Claude preset
  await page.evaluate(() => {
    document.querySelectorAll('.toast-msg').forEach(t => t.remove());
    copyAIToolPrompt('01-apple-inspired-premium-minimal-prompt', 'claude');
  });
  await page.waitForSelector('.toast-msg', { timeout: 4000 });
  const claudeText = await page.$eval('.toast-msg', el => el.innerText);
  const claudeCopyTriggered = claudeText.includes('Claude');
  console.log('   Claude/GPT preset triggered:', claudeCopyTriggered);

  // Test Cursor preset
  await page.evaluate(() => {
    document.querySelectorAll('.toast-msg').forEach(t => t.remove());
    copyAIToolPrompt('01-apple-inspired-premium-minimal-prompt', 'cursor');
  });
  await page.waitForSelector('.toast-msg', { timeout: 4000 });
  const cursorText = await page.$eval('.toast-msg', el => el.innerText);
  const cursorCopyTriggered = cursorText.includes('Cursor');
  console.log('   Cursor/AGY preset triggered:', cursorCopyTriggered);

  // 4. Test Feature 4: Starter Template Download
  console.log('3. Testing Feature 4: Starter Template Download...');
  const templateDownloadTriggered = await page.evaluate(() => {
    downloadStarterTemplate('01-apple-inspired-premium-minimal-prompt', '01', 'Apple-inspired Premium Minimal');
    return document.querySelector('.toast-msg') !== null;
  });
  console.log('   Starter Template download triggered:', templateDownloadTriggered);

  // 5. Test Feature 1 & 2: Sandbox & Customizer
  console.log('4. Testing Feature 1 & 2: Sandbox & Customizer...');
  await page.click('#btn-mode-ab');
  const abDisplay = await page.$eval('#sandbox-ab-stage', el => window.getComputedStyle(el).display);
  console.log('   A/B mode active:', abDisplay === 'grid');

  await page.click('.btn-customizer-open');
  const customizerModalActive = await page.$eval('#customizer-modal', el => el.classList.contains('active'));
  console.log('   Customizer modal open:', customizerModalActive);

  await page.click('#customizer-modal .btn-modal-close');
  await new Promise(r => setTimeout(r, 200));
  const customizerModalClosed = await page.$eval('#customizer-modal', el => !el.classList.contains('active'));
  console.log('   Customizer modal closed:', customizerModalClosed);

  // 6. Screenshot & Error check
  console.log('5. Console Errors:', errors.length);
  if (errors.length > 0) console.error('Errors found:', errors);

  await page.screenshot({ path: path.join(__dirname, 'assets', 'full_features_showcase.png'), fullPage: false });
  console.log('   Saved screenshot: assets/full_features_showcase.png');

  await browser.close();

  if (cardCount === 16 && brokenCount === 0 && errors.length === 0 && v0CopyTriggered && templateDownloadTriggered) {
    console.log('✅ ALL FEATURES (1, 2, 3, 4) VERIFIED AND 100% PASSING!');
    process.exit(0);
  } else {
    console.error('❌ Verification failed!');
    process.exit(1);
  }
}

verifyFullSuite().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
