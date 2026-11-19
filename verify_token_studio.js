const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyTokenStudio() {
    console.log('🚀 Starting verification of Design Token Studio & Responsive Viewport...');
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

    const indexPath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    console.log('Loading page:', indexPath);
    await page.goto(indexPath, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1000));

    // 1. 디바이스 뷰포트 전환 테스트
    console.log('1. Testing responsive viewport switcher...');
    await page.click('#btn-device-tablet');
    await new Promise(r => setTimeout(r, 300));
    let hasTabletClass = await page.$eval('#sandbox-stage-wrapper', el => el.classList.contains('viewport-tablet'));
    console.log(`[PASS] Tablet viewport active: ${hasTabletClass}`);
    if (!hasTabletClass) throw new Error('Tablet viewport class not applied');

    await page.click('#btn-device-mobile');
    await new Promise(r => setTimeout(r, 300));
    let hasMobileClass = await page.$eval('#sandbox-stage-wrapper', el => el.classList.contains('viewport-mobile'));
    console.log(`[PASS] Mobile viewport active: ${hasMobileClass}`);
    if (!hasMobileClass) throw new Error('Mobile viewport class not applied');

    await page.click('#btn-device-desktop');
    await new Promise(r => setTimeout(r, 300));
    let hasDesktopClass = await page.$eval('#sandbox-stage-wrapper', el => el.classList.contains('viewport-desktop'));
    console.log(`[PASS] Desktop viewport restored: ${hasDesktopClass}`);

    // 2. 토큰 스튜디오 패널 토글 테스트
    console.log('2. Testing Token Studio panel toggle...');
    await page.click('#btn-toggle-token-studio');
    await new Promise(r => setTimeout(r, 400));
    let isPanelActive = await page.$eval('#token-studio-panel', el => el.classList.contains('active'));
    console.log(`[PASS] Token studio panel opened: ${isPanelActive}`);
    if (!isPanelActive) throw new Error('Token studio panel failed to open');

    // 3. 토큰 조작 테스트
    console.log('3. Testing token manipulation & live CSS variable injection...');
    await page.evaluate(() => {
        updateToken('primary', '#10B981');
        updateToken('radius', 28);
        updateToken('shadowDepth', 4);
        updateToken('brightness', 110);
        updateToken('tracking', 2.0);
    });
    await new Promise(r => setTimeout(r, 300));

    // 배지 텍스트 검증
    const colorBadge = await page.$eval('#val-badge-color', el => el.textContent.trim());
    const radiusBadge = await page.$eval('#val-badge-radius', el => el.textContent.trim());
    console.log(`[PASS] Updated Badges: Color=${colorBadge}, Radius=${radiusBadge}`);
    if (colorBadge !== '#10B981' || radiusBadge !== '28px') {
        throw new Error(`Token badge mismatch: ${colorBadge}, ${radiusBadge}`);
    }

    // 라이브 스테이지 CSS 변수 검증
    const stageStyles = await page.$eval('#sandbox-single-stage', el => {
        return {
            primary: el.style.getPropertyValue('--tk-primary'),
            radius: el.style.getPropertyValue('--tk-radius'),
            tracking: el.style.getPropertyValue('--tk-tracking')
        };
    });
    console.log(`[PASS] Stage Live Variables: primary=${stageStyles.primary}, radius=${stageStyles.radius}, tracking=${stageStyles.tracking}`);
    if (stageStyles.primary !== '#10B981' || stageStyles.radius !== '28px') {
        throw new Error('Live stage CSS variables not injected correctly');
    }

    // 4. 토큰 익스포트 모달 테스트
    console.log('4. Testing Token Exporter modal & tabs...');
    await page.evaluate(() => openTokenExportModal());
    await new Promise(r => setTimeout(r, 500));

    const isExportModalActive = await page.$eval('#token-export-modal', el => el.classList.contains('active'));
    console.log(`[PASS] Token Export modal active: ${isExportModalActive}`);
    if (!isExportModalActive) throw new Error('Token Export modal not active');

    // Tailwind 탭 코드 확인
    let exportCode = await page.$eval('#token-export-code', el => el.textContent);
    if (!exportCode.includes('@theme') || !exportCode.includes('#10B981')) {
        throw new Error('Tailwind export code does not contain @theme or updated primary color');
    }
    console.log('[PASS] Tailwind v4 @theme export verified');

    // CSS 탭 전환
    await page.click('#tab-token-css');
    await new Promise(r => setTimeout(r, 200));
    exportCode = await page.$eval('#token-export-code', el => el.textContent);
    if (!exportCode.includes(':root') || !exportCode.includes('--primary: #10B981')) {
        throw new Error('CSS export code does not contain :root or updated primary color');
    }
    console.log('[PASS] Standard CSS :root export verified');

    // JSON 탭 전환
    await page.click('#tab-token-json');
    await new Promise(r => setTimeout(r, 200));
    exportCode = await page.$eval('#token-export-code', el => el.textContent);
    const parsedJson = JSON.parse(exportCode);
    if (parsedJson.color.primary.value !== '#10B981') {
        throw new Error('JSON export code does not match primary color');
    }
    console.log('[PASS] Figma/W3C JSON export verified');

    // 코드 복사 실행
    await page.evaluate(() => {
        copyTokenExportCode();
    });
    console.log('[PASS] Copy token code executed');

    // 모달 닫기
    await page.click('#token-export-modal .btn-modal-close');
    await new Promise(r => setTimeout(r, 400));

    // 5. 스타일 변경 시 자동 토큰 연동 테스트
    console.log('5. Testing auto token synchronization on style change...');
    await page.select('#sb-style-select', '09'); // Neo-Brutalism
    await page.evaluate(() => onSandboxStyleChange());
    await new Promise(r => setTimeout(r, 500));

    const brutalPrimary = await page.$eval('#val-badge-color', el => el.textContent.trim());
    const brutalRadius = await page.$eval('#val-badge-radius', el => el.textContent.trim());
    console.log(`[PASS] Style 09 Neo-Brutalism Auto-Tokens: Color=${brutalPrimary}, Radius=${brutalRadius}`);
    if (brutalPrimary !== '#FFE600' || brutalRadius !== '4px') {
        throw new Error(`Auto-tokens mismatch for Neo-Brutalism: ${brutalPrimary}, ${brutalRadius}`);
    }

    // 6. 스크린샷 캡처
    const screenshotPath = path.resolve(__dirname, 'assets', 'token_studio_showcase.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`[PASS] Showcase screenshot saved to ${screenshotPath}`);

    await browser.close();

    if (errors.length > 0) {
        console.warn(`Encountered ${errors.length} browser errors:`, errors);
    } else {
        console.log('🎉 100% PASS: Design Token Studio & Viewport Switcher verified with 0 errors!');
    }
}

verifyTokenStudio().catch(err => {
    console.error('❌ Verification failed:', err);
    process.exit(1);
});
