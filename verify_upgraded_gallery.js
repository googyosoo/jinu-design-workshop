const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyUpgraded() {
  console.log('Testing upgraded index.html with Sandbox & Customizer...');
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

  // 1. Check title & base cards
  const title = await page.title();
  console.log('Title:', title);
  const cardCount = await page.$$eval('.gallery-card', el => el.length);
  console.log('Cards Count:', cardCount);

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
  console.log('Broken images count:', brokenCount);

  // 3. Test 1번: Live Sandbox Single View
  const initialSingleTitle = await page.$eval('#sandbox-single-stage .live-hero-title', el => el.innerText);
  console.log('Initial Sandbox Hero Title:', initialSingleTitle);

  // Type new title
  await page.$eval('#sb-input-title', el => el.value = '지누의 Vibe Coding 마스터클래스');
  await page.evaluate(() => updateLiveRender());
  const updatedSingleTitle = await page.$eval('#sandbox-single-stage .live-hero-title', el => el.innerText);
  console.log('Updated Sandbox Hero Title:', updatedSingleTitle);

  // Test 1번: Live Sandbox A/B Mode Toggle
  await page.click('#btn-mode-ab');
  const abDisplay = await page.$eval('#sandbox-ab-stage', el => window.getComputedStyle(el).display);
  console.log('A/B Stage Display mode after toggle:', abDisplay);

  const labelA = await page.$eval('#ab-label-a', el => el.innerText);
  const labelB = await page.$eval('#ab-label-b', el => el.innerText);
  console.log('A/B Mode Labels:', labelA, 'vs', labelB);

  // 4. Test 2번: Prompt Customizer Modal
  console.log('Opening Customizer Modal from first card...');
  await page.click('.btn-customizer-open');
  const modalActive = await page.$eval('#customizer-modal', el => el.classList.contains('active'));
  console.log('Customizer Modal Active:', modalActive);

  // Change project name inside customizer
  await page.$eval('#cust-project-name', el => el.value = '수능 영어 변형문제 AI 스튜디오');
  await page.evaluate(() => regenerateCustomPrompt());
  const customPromptResult = await page.$eval('#cust-prompt-output', el => el.innerText);
  const containsCustomName = customPromptResult.includes('수능 영어 변형문제 AI 스튜디오');
  console.log('Generated custom prompt contains new name:', containsCustomName);

  // Test Copy Custom Prompt
  await page.click('.btn-copy-custom-prompt');
  await page.waitForSelector('.toast-msg', { timeout: 4000 });
  const toastText = await page.$eval('.toast-msg', el => el.innerText);
  console.log('Toast triggered after copy:', toastText);

  // Close Customizer Modal
  await page.click('#customizer-modal .btn-modal-close');
  const modalClosed = await page.$eval('#customizer-modal', el => !el.classList.contains('active'));
  console.log('Customizer Modal Closed successfully:', modalClosed);

  // 5. Check Console Errors
  console.log('Total Console Errors:', errors.length);

  // 6. Screenshot of upgraded page
  await page.screenshot({ path: path.join(__dirname, 'assets', 'upgraded_overview.png'), fullPage: false });
  console.log('Saved assets/upgraded_overview.png');

  await browser.close();

  if (cardCount === 16 && brokenCount === 0 && errors.length === 0 && updatedSingleTitle.includes('Vibe Coding') && containsCustomName) {
    console.log('✅ ALL 1번 & 2번 VERIFICATION TESTS PASSED (100% PASS)');
    process.exit(0);
  } else {
    console.error('❌ Verification failed!');
    process.exit(1);
  }
}

verifyUpgraded().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
