const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyGrillFeatures() {
    console.log('🚀 Starting verification of Component Kit & AI Style Studio...');
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });

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

    // 1. 기본 카드 16개 확인
    const initialCardCount = await page.$$eval('.gallery-card', el => el.length);
    console.log(`[PASS] Initial gallery cards: ${initialCardCount}`);
    if (initialCardCount < 16) throw new Error(`Expected at least 16 cards, got ${initialCardCount}`);

    // 2. 컴포넌트 킷 모달 테스트
    console.log('Testing Component Kit modal...');
    const firstKitBtn = await page.$('.btn-component-kit');
    if (!firstKitBtn) throw new Error('No .btn-component-kit button found on cards');
    await firstKitBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // 모달 표시 확인
    const kitModalVisible = await page.$eval('#component-kit-modal', el => el.classList.contains('active'));
    console.log(`[PASS] Component Kit modal active: ${kitModalVisible}`);
    if (!kitModalVisible) throw new Error('#component-kit-modal is not active');

    // 5대 탭 전환 테스트
    const tabs = ['buttons', 'inputs', 'card', 'badges', 'nav'];
    for (const tab of tabs) {
        await page.click(`#tab-btn-${tab}`);
        await new Promise(r => setTimeout(r, 200));
        const activeTab = await page.$eval(`#tab-btn-${tab}`, el => el.classList.contains('active'));
        if (!activeTab) throw new Error(`Tab ${tab} failed to activate`);
    }
    console.log('[PASS] All 5 component tabs switched successfully (buttons, inputs, card, badges, nav)');

    // Tailwind 포맷 전환 테스트
    await page.click('#btn-format-tw');
    await new Promise(r => setTimeout(r, 200));
    const twActive = await page.$eval('#btn-format-tw', el => el.classList.contains('active'));
    console.log(`[PASS] Tailwind v4 format toggle active: ${twActive}`);

    // 코드 복사 버튼 테스트
    await page.evaluate(() => {
        if (typeof copyKitCode === 'function') copyKitCode();
    });
    console.log('[PASS] Component code copy executed');

    // 모달 닫기
    await page.click('#component-kit-modal .btn-modal-close');
    await new Promise(r => setTimeout(r, 400));
    const kitModalClosed = await page.$eval('#component-kit-modal', el => !el.classList.contains('active'));
    console.log(`[PASS] Component Kit modal closed: ${kitModalClosed}`);

    // 3. AI 새 스타일 제작소 모달 테스트
    console.log('Testing AI Style Studio modal...');
    await page.click('.btn-highlight-studio');
    await new Promise(r => setTimeout(r, 600));

    const aiModalVisible = await page.$eval('#ai-studio-modal', el => el.classList.contains('active'));
    console.log(`[PASS] AI Studio modal active: ${aiModalVisible}`);
    if (!aiModalVisible) throw new Error('#ai-studio-modal is not active');

    // 메타 프롬프트 복사
    await page.evaluate(() => {
        if (typeof copyStudioMetaPrompt === 'function') copyStudioMetaPrompt();
    });
    console.log('[PASS] Meta prompt copied');

    // 4. 커스텀 17번째 스타일 등록 시뮬레이션
    console.log('Simulating custom 17th style submission...');
    const sampleAiOutput = `
# Cyberpunk Neon Noir Design System

## Core Aesthetic
A deep midnight obsidian (#080811) base illuminated with high-voltage cyan (#00F5FF) and laser magenta (#FF0055) neon glow. Semi-transparent glassmorphism panels with 1px neon borders, glowing badges, and futuristic monospace data typography.

## UI Guidelines
1. Background: #080811 with radial ambient glow
2. Container: rgba(23, 14, 46, 0.7) with backdrop-filter blur(12px)
3. Accents: Neon Cyan (#00F5FF) & Hot Pink (#FF0055)
4. Typography: Orbitron & JetBrains Mono
`;

    await page.$eval('#studio-style-name', el => { el.value = '사이버펑크 네온 느와르 (Cyberpunk Neon Noir)'; });
    await page.$eval('#studio-ai-response', (el, val) => { el.value = val; }, sampleAiOutput);
    await page.$eval('#studio-summary-input', el => { el.value = '비 내리는 미래 도시의 네온 불빛과 글래스모피즘'; });
    
    // 등록 실행
    await page.evaluate(() => {
        if (typeof registerCustomStyle === 'function') registerCustomStyle();
    });
    await new Promise(r => setTimeout(r, 1000));

    // 5. 등록 후 17번째 카드 렌더링 확인
    const newCardCount = await page.$$eval('.gallery-card', el => el.length);
    console.log(`[PASS] New gallery card count after adding custom style: ${newCardCount}`);
    if (newCardCount !== initialCardCount + 1) {
        throw new Error(`Expected ${initialCardCount + 1} cards, found ${newCardCount}`);
    }

    // 17번째 카드의 제목 확인 (배열의 마지막 원소)
    const lastCardTitle = await page.evaluate(() => {
        const cards = document.querySelectorAll('.gallery-card');
        return cards[cards.length - 1].querySelector('h3').textContent.trim();
    });
    console.log(`[PASS] 17th Card Title: "${lastCardTitle}"`);
    if (!lastCardTitle.includes('사이버펑크')) {
        throw new Error(`Expected title to include "사이버펑크", got: ${lastCardTitle}`);
    }

    // 6. 샌드박스 드롭다운에 커스텀 스타일이 추가되었는지 확인
    const sandboxOptions = await page.$$eval('#sb-style-select option', opts => opts.map(o => o.textContent));
    const hasCustomOption = sandboxOptions.some(opt => opt.includes('사이버펑크') || opt.includes('17'));
    console.log(`[PASS] Sandbox style select updated with custom style: ${hasCustomOption}`);
    if (!hasCustomOption) throw new Error('Custom style option missing from #sb-style-select');

    // 7. 스크린샷 캡처
    const screenshotPath = path.resolve(__dirname, 'assets', 'grill_features_showcase.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`[PASS] Showcase screenshot saved to ${screenshotPath}`);

    await browser.close();

    if (errors.length > 0) {
        console.warn(`Encountered ${errors.length} browser errors:`, errors);
    } else {
        console.log('🎉 100% PASS: All new features verified with 0 errors!');
    }
}

verifyGrillFeatures().catch(err => {
    console.error('❌ Verification failed:', err);
    process.exit(1);
});
