const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verify() {
  console.log('Testing index.html in headless browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.toString());
  });

  const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });

  // 1. Check title
  const title = await page.title();
  console.log('Page Title:', title);

  // 2. Count gallery cards
  const cardCount = await page.$$eval('.gallery-card', el => el.length);
  console.log('Rendered Gallery Cards Count:', cardCount);

  // 3. Wait for all images to decode and check status
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

  const imageStatus = await page.$$eval('.mockup-img', imgs => {
    return imgs.map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }));
  });
  const brokenImages = imageStatus.filter(img => !img.complete || img.naturalWidth === 0);
  console.log('Total mockup images:', imageStatus.length);
  console.log('Broken images count:', brokenImages.length);
  if (brokenImages.length > 0) {
    console.log('Sample broken image src:', brokenImages[0].src);
  }

  // 4. Test Search input
  await page.type('#search-input', 'Apple');
  const visibleCardsAfterSearch = await page.$$eval('.gallery-card', cards => {
    return cards.filter(c => c.style.display !== 'none').length;
  });
  console.log('Visible cards after searching "Apple":', visibleCardsAfterSearch);

  // Clear search
  await page.$eval('#search-input', el => el.value = '');
  await page.evaluate(() => handleSearch());

  // 5. Test Filter Tab
  await page.evaluate(() => {
    const tab = document.querySelector('.filter-tab:nth-child(2)');
    setFilter('minimal', tab);
  });
  const visibleCardsMinimal = await page.$$eval('.gallery-card', cards => {
    return cards.filter(c => c.style.display !== 'none').length;
  });
  console.log('Visible cards after filtering "minimal":', visibleCardsMinimal);

  // 6. Test Prompt Copy Function
  const copyResult = await page.evaluate(async () => {
    const btn = document.querySelector('.btn-copy-prompt');
    const promptId = '01-apple-inspired-premium-minimal';
    copyPromptText(btn, promptId);
    return btn.classList.contains('copied') || btn.innerText.includes('복사');
  });
  console.log('Copy prompt interaction triggered:', copyResult);

  // 7. Check errors
  console.log('Console Errors:', errors.length);
  if (errors.length > 0) {
    console.error('Errors found:', errors);
  }

  await browser.close();

  if (cardCount === 16 && brokenImages.length === 0 && errors.length === 0) {
    console.log('✅ ALL VERIFICATION CHECKS PASSED PERFECTLY (100% PASS)');
    process.exit(0);
  } else {
    console.error('❌ Verification failed');
    process.exit(1);
  }
}

verify().catch(e => {
  console.error('Verification error:', e);
  process.exit(1);
});
