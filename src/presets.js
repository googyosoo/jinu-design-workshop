/**
 * Presets Module for Jinwoo's Design Workshop Sandbox
 * Exports:
 *  - extraPresetCss: Complete sandbox CSS presets (04, 10, 11, 13, 15, custom 17+) + responsive viewport styles
 *  - clientPresetPatchScript: Browser JS defining getPresetClassForStyle(num) and authentic renderMockupHtml
 */

const extraPresetCss = `
    /* ======================================================== */
    /* 🌟 Additional Sandbox Style Presets (04, 10, 11, 13, 15, 17+) */
    /* ======================================================== */

    /* 04. Progressive Disclosure (단계적 정보 공개) */
    .preset-disclosure {
      background: #F8FAFC;
      color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
      border: 1px solid #CBD5E1;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
    }
    .preset-disclosure .live-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 12px;
      font-size: 13px;
      color: #475569;
    }
    .preset-disclosure .live-hero-title {
      font-size: 34px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
      letter-spacing: -0.03em;
      margin: 18px 0 10px 0;
    }
    .preset-disclosure .live-hero-desc {
      font-size: 15px;
      color: #64748B;
      line-height: 1.6;
      max-width: 620px;
      margin-bottom: 18px;
    }
    .preset-disclosure .live-btn {
      background: #2563EB;
      color: #FFFFFF;
      border: none;
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .preset-disclosure .lm-disclosure-bar {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-left: 3px solid #2563EB;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
    }

    /* 10. Organic / Anti-grid (오가닉 & 안티 그리드) */
    .preset-organic {
      background: #F5F2EB;
      color: #2A2D28;
      font-family: 'Pretendard', -apple-system, sans-serif;
      border: 1px solid #E5E0D5;
      position: relative;
      overflow: hidden;
    }
    .preset-organic::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle at top right, rgba(107, 120, 99, 0.18) 0%, transparent 70%);
      border-radius: 0 0 0 100px;
      pointer-events: none;
      z-index: 0;
    }
    .preset-organic .live-nav {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #5D6657;
      border-bottom: 1px solid #E5E0D5;
      padding-bottom: 12px;
    }
    .preset-organic .live-hero-title {
      position: relative;
      z-index: 1;
      font-size: 36px;
      font-weight: 800;
      color: #1E221C;
      line-height: 1.2;
      letter-spacing: -0.03em;
      margin: 18px 0 10px 0;
    }
    .preset-organic .live-hero-desc {
      position: relative;
      z-index: 1;
      font-size: 15px;
      color: #555E50;
      line-height: 1.7;
      max-width: 620px;
      margin-bottom: 20px;
    }
    .preset-organic .live-btn {
      position: relative;
      z-index: 1;
      background: #465340;
      color: #FFFFFF;
      border: none;
      padding: 12px 28px;
      border-radius: 30px 14px 26px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .preset-organic .lm-organic-card {
      position: relative;
      z-index: 1;
      background: #FAF8F5;
      border: 1px solid #E5E0D5;
      border-radius: 32px 14px 28px 12px;
      padding: 14px 20px;
      margin: 14px 0;
      font-size: 13px;
      color: #465340;
      box-shadow: 0 4px 14px rgba(42, 45, 40, 0.04);
    }

    /* 11. Tactile / Analog UI (촉각적 아날로그) */
    .preset-tactile {
      background: linear-gradient(145deg, #242528 0%, #2D2F34 100%);
      color: #E1DFDD;
      font-family: -apple-system, 'Pretendard', sans-serif;
      border: 8px solid #1A1A1C;
      box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    .preset-tactile .live-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #383A40;
      padding-bottom: 12px;
      font-size: 12px;
      font-weight: 700;
      color: #A19F9D;
      font-family: monospace;
    }
    .preset-tactile .live-hero-title {
      font-size: 34px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      line-height: 1.2;
      margin: 18px 0 10px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    }
    .preset-tactile .live-hero-desc {
      font-size: 14px;
      color: #A19F9D;
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: 20px;
    }
    .preset-tactile .live-btn {
      background: #33363D;
      color: #E5A93C;
      border: 1px solid #555;
      padding: 11px 24px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 0 #111, inset 0 1px 0 rgba(255, 255, 255, 0.15);
      cursor: pointer;
    }
    .preset-tactile .lm-analog-deck {
      background: #1C1D20;
      border: 1px solid #383A40;
      border-radius: 8px;
      padding: 12px 18px;
      margin: 14px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
    }

    /* 13. Contemporary Editorial Design (에디토리얼) */
    .preset-editorial {
      background: #F9F8F6;
      color: #1C1A17;
      font-family: 'Noto Serif KR', Georgia, serif, -apple-system, sans-serif;
      border: 1px solid #E5E1DA;
    }
    .preset-editorial .live-nav {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid #1C1A17;
      padding-bottom: 12px;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #78726A;
      font-family: -apple-system, 'Pretendard', sans-serif;
    }
    .preset-editorial .live-hero-title {
      font-size: 38px;
      font-weight: 700;
      color: #1C1A17;
      line-height: 1.15;
      letter-spacing: -0.025em;
      margin: 20px 0 12px 0;
      font-family: 'Noto Serif KR', Georgia, serif;
    }
    .preset-editorial .live-hero-desc {
      font-size: 16px;
      color: #57514A;
      line-height: 1.75;
      max-width: 620px;
      margin-bottom: 22px;
      font-family: 'Noto Serif KR', Georgia, serif;
    }
    .preset-editorial .live-btn {
      background: #1C1A17;
      color: #F9F8F6;
      border: 1px solid #1C1A17;
      padding: 10px 22px;
      border-radius: 2px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.06em;
      cursor: pointer;
      text-transform: uppercase;
      font-family: -apple-system, 'Pretendard', sans-serif;
    }
    .preset-editorial .lm-editorial-spec {
      border-top: 1px solid #E5E1DA;
      border-bottom: 1px solid #E5E1DA;
      padding: 10px 0;
      margin: 14px 0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #78726A;
      font-family: -apple-system, 'Pretendard', sans-serif;
    }

    /* 15. Scrollytelling (내러티브 스크롤리텔링) */
    .preset-scrolly {
      background: radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 60%), #0E131F;
      color: #F8FAFC;
      font-family: -apple-system, 'Pretendard', sans-serif;
      border: 1px solid #1E293B;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
    }
    .preset-scrolly .live-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1E293B;
      padding-bottom: 12px;
      font-size: 13px;
      color: #94A3B8;
    }
    .preset-scrolly .live-hero-title {
      font-size: 34px;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin: 18px 0 10px 0;
      text-shadow: 0 4px 16px rgba(56, 189, 248, 0.2);
    }
    .preset-scrolly .live-hero-desc {
      font-size: 15px;
      color: #94A3B8;
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: 20px;
    }
    .preset-scrolly .live-btn {
      background: #38BDF8;
      color: #0E131F;
      border: none;
      padding: 11px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
    }
    .preset-scrolly .lm-scrolly-rail {
      background: rgba(21, 28, 44, 0.8);
      border: 1px solid #29354E;
      border-radius: 10px;
      padding: 12px 16px;
      margin: 14px 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* 17+ Custom User Style (사용자 커스텀 스타일) */
    .preset-custom {
      background: linear-gradient(135deg, #0A0D17 0%, #170E2E 100%);
      color: #F1F5F9;
      font-family: -apple-system, 'Pretendard', sans-serif;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      position: relative;
      overflow: hidden;
    }
    .preset-custom::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 160px;
      height: 160px;
      background: radial-gradient(circle at top right, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
      border-radius: 0 0 0 80px;
      pointer-events: none;
    }
    .preset-custom .live-nav {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
      font-size: 13px;
      color: #F472B6;
    }
    .preset-custom .live-hero-title {
      position: relative;
      z-index: 1;
      font-size: 36px;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.2;
      margin: 18px 0 10px 0;
      text-shadow: 0 0 20px rgba(244, 114, 182, 0.35);
    }
    .preset-custom .live-hero-desc {
      position: relative;
      z-index: 1;
      font-size: 15px;
      color: #CBD5E1;
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: 20px;
    }
    .preset-custom .live-btn {
      position: relative;
      z-index: 1;
      background: var(--tk-primary, #EC4899);
      color: #FFFFFF;
      border: none;
      padding: 12px 26px;
      border-radius: var(--tk-radius, 12px);
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(236, 72, 153, 0.4);
    }
    .preset-custom .lm-custom-panel {
      position: relative;
      z-index: 1;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 18px;
      margin: 14px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #A5F3FC;
      backdrop-filter: blur(8px);
    }

    /* ======================================================== */
    /* 📱 Responsive Viewport Styles (Tablet 768px & Mobile 390px) */
    /* ======================================================== */
    .sandbox-stage-wrapper.viewport-tablet .live-mockup-wrapper {
      padding: 26px 28px;
      min-height: 380px;
    }
    .sandbox-stage-wrapper.viewport-tablet .live-hero-title {
      font-size: clamp(24px, 4vw, 30px);
      line-height: 1.2;
      margin: 14px 0 8px 0;
    }
    .sandbox-stage-wrapper.viewport-tablet .live-hero-desc {
      font-size: 14px;
      line-height: 1.55;
      margin-bottom: 18px;
    }
    .sandbox-stage-wrapper.viewport-tablet .lm-metrics-grid {
      gap: 12px;
    }

    .sandbox-stage-wrapper.viewport-mobile .live-mockup-wrapper {
      padding: 16px 14px;
      min-height: 360px;
      overflow-x: hidden;
    }
    .sandbox-stage-wrapper.viewport-mobile .live-nav {
      font-size: 11px;
      padding-bottom: 8px;
      flex-wrap: wrap;
      gap: 6px;
    }
    .sandbox-stage-wrapper.viewport-mobile .live-hero-title {
      font-size: clamp(20px, 5.5vw, 24px);
      line-height: 1.25;
      margin: 10px 0 8px 0;
      word-break: keep-all;
    }
    .sandbox-stage-wrapper.viewport-mobile .live-hero-desc {
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 14px;
      word-break: keep-all;
    }
    .sandbox-stage-wrapper.viewport-mobile .live-btn {
      padding: 8px 18px;
      font-size: 13px;
      width: 100%;
      text-align: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .sandbox-stage-wrapper.viewport-mobile .lm-metrics-grid,
    .sandbox-stage-wrapper.viewport-mobile .lm-split-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sandbox-stage-wrapper.viewport-mobile .lm-hide-mobile {
      display: none !important;
    }

    /* ======================================================== */
    /* 🎛️ Token Override Hook Preservation                      */
    /* ======================================================== */
    .live-mockup-wrapper {
      border-radius: var(--tk-radius, 16px);
      filter: brightness(var(--tk-surface-brightness, 1));
      word-break: keep-all;
      overflow-wrap: break-word;
      overflow: hidden;
    }
    .live-mockup-wrapper .live-btn {
      background: var(--tk-primary, #0071E3) !important;
      border-radius: var(--tk-radius, 999px) !important;
      box-shadow: var(--tk-shadow, none) !important;
      letter-spacing: var(--tk-tracking, 0px) !important;
    }
    .live-mockup-wrapper .live-hero-title,
    .live-mockup-wrapper .live-hero-desc {
      letter-spacing: var(--tk-tracking, 0px) !important;
    }
`;

const clientPresetPatchScript = [
  '/* Preset Engine Patch: getPresetClassForStyle and renderMockupHtml */',
  '(function() {',
  '  var root = typeof window !== "undefined" ? window : (typeof global !== "undefined" ? global : this);',
  '',
  '  function escapeHtml(str) {',
  '    if (str === null || str === undefined) return "";',
  '    return String(str)',
  '      .replace(/&/g, "&amp;")',
  '      .replace(/</g, "&lt;")',
  '      .replace(/>/g, "&gt;")',
  '      .replace(/"/g, "&quot;")',
  '      .replace(/\'/g, "&#39;");',
  '  }',
  '',
  '  function getPresetClassForStyle(num) {',
  '    var n = parseInt(num, 10);',
  '    if (isNaN(n) || n >= 17) return "preset-custom";',
  '    switch (n) {',
  '      case 1: return "preset-apple";',
  '      case 2: return "preset-swiss";',
  '      case 3: return "preset-barely";',
  '      case 4: return "preset-disclosure";',
  '      case 5: return "preset-material";',
  '      case 6: return "preset-warm";',
  '      case 7: return "preset-bento";',
  '      case 8: return "preset-bauhaus";',
  '      case 9: return "preset-brutal";',
  '      case 10: return "preset-organic";',
  '      case 11: return "preset-tactile";',
  '      case 12: return "preset-retro";',
  '      case 13: return "preset-editorial";',
  '      case 14: return "preset-kinetic";',
  '      case 15: return "preset-scrolly";',
  '      case 16: return "preset-game";',
  '      default: return "preset-custom";',
  '    }',
  '  }',
  '',
  '  function renderMockupHtml(num, title, desc, btnText) {',
  '    var n = parseInt(num, 10);',
  '    var safeNum = isNaN(n) ? "01" : (n < 10 ? "0" + n : String(n));',
  '    var presetClass = getPresetClassForStyle(num);',
  '    var sTitle = escapeHtml(title || "지누의 디자인 공작소");',
  '    var sDesc = escapeHtml(desc || "디자인과 인공지능이 만나는 곳");',
  '    var sBtn = escapeHtml(btnText || "시작하기");',
  '',
  '    var navHtml = "";',
  '    var middleDetailHtml = "";',
  '    var footerHtml = "";',
  '',
  '    switch (n) {',
  '      case 1:',
  '        navHtml = \'<div><strong>\' + sTitle + \'</strong> / PREMIUM</div><div>CLARITY &amp; RESTRAINT</div>\';',
  '        middleDetailHtml = \'<div class="lm-metrics-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin:16px 0; border-top:1px solid #E5E5EA; padding-top:14px; font-size:12px; color:#6E6E73;">\' +',
  '          \'<div><strong style="display:block; font-size:20px; color:#1D1D1F; font-weight:700;">99.8%</strong>노이즈 제로</div>\' +',
  '          \'<div><strong style="display:block; font-size:20px; color:#1D1D1F; font-weight:700;">120px</strong>타이포 리듬</div>\' +',
  '          \'<div><strong style="display:block; font-size:20px; color:#0071E3; font-weight:700;">#F5F5F7</strong>미묘한 서피스</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #\' + safeNum + \' — APPLE MINIMAL</span><span>REFINED TYPOGRAPHY</span>\';',
  '        break;',
  '',
  '      case 2:',
  '        navHtml = \'<div>[SWISS 12-COL GRID] \' + sTitle + \'</div><div style="background:#FF2A00; color:#fff; padding:2px 8px; font-size:11px; font-weight:900;">SYS.GRID 12</div>\';',
  '        middleDetailHtml = \'<div class="lm-metrics-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin:14px 0; border:2px solid #000; padding:10px; font-size:12px; font-weight:700;">\' +',
  '          \'<div>BASE_UNIT: 8px</div>\' +',
  '          \'<div>STROKE: 2px solid</div>\' +',
  '          \'<div style="color:#FF2A00;">LATENCY: 0.00ms</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>SWISS FUNCTIONAL 2026 REF</span><span>ZURICH / BASEL ORDER</span>\';',
  '        break;',
  '',
  '      case 3:',
  '        navHtml = \'<div>\' + sTitle + \' / 아이디어 캔버스</div><div style="font-size:12px; color:#A1A1AA;">자동 저장됨 09:25</div>\';',
  '        middleDetailHtml = \'<div style="margin:14px 0; padding-bottom:8px; border-bottom:1px solid #E4E4E7; display:flex; align-items:center; gap:8px; font-size:13px; color:#71717A;">\' +',
  '          \'<span>&rarr;</span><span>콘텐츠 중심 입력창: 카드와 보더 없는 순수한 몰입</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #\' + safeNum + \' — BARELY-THERE</span><span>CONTENT IS THE UI</span>\';',
  '        break;',
  '',
  '      case 4:',
  '        navHtml = \'<div><strong>\' + sTitle + \'</strong> <span style="font-size:11px; background:#E2E8F0; padding:2px 8px; border-radius:4px; margin-left:6px;">단계적 정보 구조</span></div><div style="color:#2563EB; font-weight:600;">1단계: 기본 &rarr; 2단계: 확장</div>\';',
  '        middleDetailHtml = \'<div class="lm-disclosure-bar">\' +',
  '          \'<div><strong>▼ 고급 매개변수 제어판</strong> <span style="color:#64748B; font-size:12px; margin-left:8px;">(클릭 시 세부 튜닝 모듈 확장)</span></div>\' +',
  '          \'<span style="color:#059669; font-weight:700; font-size:12px;">● 준비 완료 (100%)</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #04 — PROGRESSIVE DISCLOSURE</span><span>CLARITY-FIRST SYSTEM</span>\';',
  '        break;',
  '',
  '      case 5:',
  '        navHtml = \'<div style="display:flex; align-items:center; gap:8px;"><span style="width:24px; height:24px; background:#6750A4; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:800;">M3</span><strong>\' + sTitle + \'</strong></div><div style="background:#E8DEF8; color:#1D192B; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">DYNAMIC TONAL</div>\';',
  '        middleDetailHtml = \'<div style="background:#F3EDF7; border-radius:16px; padding:12px 18px; margin:14px 0; display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#49454F;">\' +',
  '          \'<span>Secondary Container (32px 라운딩)</span>\' +',
  '          \'<span style="color:#6750A4; font-weight:700;">Spring Physics 연동</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #05 — MATERIAL 3 EXPRESSIVE</span><span>TONAL CONTAINER HARMONY</span>\';',
  '        break;',
  '',
  '      case 6:',
  '        navHtml = \'<div><strong>\' + sTitle + \'</strong> <span style="font-size:12px; color:#8C7E74; margin-left:6px;">따스한 숨결을 담다</span></div><div>우리의 철학 · 편안한 쉼</div>\';',
  '        middleDetailHtml = \'<div style="background:#FFFDF9; border:1px solid #EAE1D5; border-radius:12px; padding:12px 16px; margin:14px 0; font-size:13px; color:#6E6157; display:flex; gap:12px; flex-wrap:wrap;">\' +',
  '          \'<span style="background:#F2EBE1; padding:3px 8px; border-radius:6px;">#FAF7F2 베이지</span>\' +',
  '          \'<span style="background:#F5ECE8; color:#C46849; padding:3px 8px; border-radius:6px;">#C46849 테라코타</span>\' +',
  '          \'<span style="background:#EBF0EA; color:#587053; padding:3px 8px; border-radius:6px;">#587053 세이지</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #06 — HUMAN-CENTERED WARM UI</span><span>COMFORT BEFORE SPECTACLE</span>\';',
  '        break;',
  '',
  '      case 7:',
  '        navHtml = \'<div><strong>\' + sTitle + \'</strong> <span style="font-size:11px; background:rgba(56,189,248,0.15); color:#38BDF8; padding:2px 8px; border-radius:999px; margin-left:6px;">BENTO GRID</span></div><div>2x2 / 2x1 MODULAR</div>\';',
  '        middleDetailHtml = \'<div class="lm-metrics-grid" style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:12px; margin:14px 0;">\' +',
  '          \'<div style="background:#181C27; border:1px solid #283044; border-radius:12px; padding:10px 14px; font-size:12px; color:#94A3B8;"><strong style="display:block; font-size:16px; color:#38BDF8; margin-bottom:2px;">4.8M ops</strong>Primary Hero Box</div>\' +',
  '          \'<div style="background:#181C27; border:1px solid #283044; border-radius:12px; padding:10px 14px; font-size:12px; color:#94A3B8;"><strong style="display:block; font-size:16px; color:#10B981; margin-bottom:2px;">100%</strong>반응도</div>\' +',
  '          \'<div style="background:#181C27; border:1px solid #283044; border-radius:12px; padding:10px 14px; font-size:12px; color:#94A3B8;"><strong style="display:block; font-size:16px; color:#FFFFFF; margin-bottom:2px;">24px</strong>곡률 통일</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #07 — BENTO MODULAR GRID</span><span>SIZE COMMUNICATES VALUE</span>\';',
  '        break;',
  '',
  '      case 8:',
  '        navHtml = \'<div>STAATLICHES BAUHAUS &mdash; \' + sTitle + \'</div><div style="display:flex; gap:6px;"><span style="display:inline-block; width:12px; height:12px; background:#E63946; border-radius:50%;"></span><span style="display:inline-block; width:12px; height:12px; background:#FFB703;"></span><span style="display:inline-block; width:12px; height:12px; background:#1D3557;"></span></div>\';',
  '        middleDetailHtml = \'<div style="display:flex; border:3px solid #111; margin:14px 0; font-size:12px; font-weight:900; text-align:center;">\' +',
  '          \'<div style="flex:1; background:#E63946; color:#fff; padding:8px 4px;">RED: ACTION</div>\' +',
  '          \'<div style="flex:1; background:#FFB703; color:#111; padding:8px 4px;">YELLOW: WARN</div>\' +',
  '          \'<div style="flex:1; background:#1D3557; color:#fff; padding:8px 4px;">BLUE: FOCUS</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>WEIMAR / DESSAU / BERLIN 1919-2026</span><span>GEOMETRY SERVES FUNCTION</span>\';',
  '        break;',
  '',
  '      case 9:',
  '        navHtml = \'<div>⚡ \' + sTitle + \'</div><div style="background:#FF5483; color:#fff; border:2px solid #000; box-shadow:2px 2px 0px #000; padding:2px 8px; font-size:11px; font-weight:900;">RAW &amp; BOLD</div>\';',
  '        middleDetailHtml = \'<div class="lm-metrics-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:14px 0;">\' +',
  '          \'<div style="background:#FF90E8; border:2px solid #000; box-shadow:3px 3px 0 #000; padding:8px 12px; font-size:12px; font-weight:900;">HARD OFFSET 4px</div>\' +',
  '          \'<div style="background:#90FFA9; border:2px solid #000; box-shadow:3px 3px 0 #000; padding:8px 12px; font-size:12px; font-weight:900;">BLUR ZERO (0px)</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #09 — MODERN NEO-BRUTALISM</span><span>NO BLUR, NO COMPROMISE</span>\';',
  '        break;',
  '',
  '      case 10:',
  '        navHtml = \'<div><strong>\' + sTitle + \'</strong> <span style="font-size:12px; color:#5D6657; margin-left:6px;">자연주의 안티 그리드</span></div><div style="background:#E2DDD0; padding:3px 10px; border-radius:18px 8px 14px 6px; font-size:12px; color:#3C4436; font-weight:600;">유기적 조화 🌿</div>\';',
  '        middleDetailHtml = \'<div class="lm-organic-card">\' +',
  '          \'<strong>물결 곡선 컨테이너:</strong> 정형화된 사각 박스를 탈피하여 시각적 긴장을 풀고 편안한 호흡을 제공합니다.\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #10 — ORGANIC &amp; ANTI-GRID</span><span>STRUCTURED BUT HUMAN</span>\';',
  '        break;',
  '',
  '      case 11:',
  '        navHtml = \'<div style="display:flex; align-items:center; gap:8px;"><span style="width:8px; height:8px; background:#FF453A; border-radius:50%; box-shadow:0 0 6px #FF453A;"></span><strong>\' + sTitle + \'</strong> / ANALOG</div><div>VU-METER ACTIVE [48kHz]</div>\';',
  '        middleDetailHtml = \'<div class="lm-analog-deck">\' +',
  '          \'<div style="font-size:11px; font-weight:700; color:#E5A93C;">MASTER CONSOLE / RACK</div>\' +',
  '          \'<div style="background:#EFEAD8; color:#111; padding:4px 12px; border-radius:4px; font-family:monospace; font-weight:700; font-size:11px; border:1px solid #888;">VU: -3dB [OK]</div>\' +',
  '          \'<div style="font-size:11px; color:#A19F9D;">WARMTH: 96%</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #11 — TACTILE ANALOG UI</span><span>PHYSICAL PRECISION</span>\';',
  '        break;',
  '',
  '      case 12:',
  '        navHtml = \'<div>\' + sTitle + \' // RETROFUTURISM</div><div style="color:#FF007F; border:1px solid #FF007F; padding:2px 8px; border-radius:2px; font-size:11px; box-shadow:0 0 6px rgba(255,0,127,0.3);">SYS: 1984_SYNTH</div>\';',
  '        middleDetailHtml = \'<div style="background:rgba(18,22,36,0.85); border:1px solid rgba(0,240,255,0.4); border-radius:6px; padding:10px 14px; margin:14px 0; font-family:monospace; font-size:12px; display:flex; justify-content:space-between; color:#00F0FF; box-shadow:0 0 16px rgba(0,240,255,0.15); font-weight:700;">\' +',
  '          \'<span>&gt; SPEED: 88.4 MPH</span>\' +',
  '          \'<span style="color:#FF007F;">NEON PURITY: 99.4%</span>\' +',
  '          \'<span>CRT SCAN: ACTIVE</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #12 — RETROFUTURISM</span><span>OUTRUN &amp; SYNTHWAVE</span>\';',
  '        break;',
  '',
  '      case 13:',
  '        navHtml = \'<div>THE DESIGN WORKSHOP JOURNAL &mdash; \' + sTitle + \'</div><div style="font-style:italic;">Autumn / Winter 2026</div>\';',
  '        middleDetailHtml = \'<div class="lm-editorial-spec">\' +',
  '          \'<span style="color:#A65839; font-weight:700;">SPECIAL ESSAY</span>\' +',
  '          \'<span>SERIF TYPOGRAPHY 1.75em 행간</span>\' +',
  '          \'<span>페이퍼 아이보리 &amp; 테라코타</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #13 — CONTEMPORARY EDITORIAL</span><span>TYPOGRAPHY IS THE INTERFACE</span>\';',
  '        break;',
  '',
  '      case 14:',
  '        navHtml = \'<div>⚡ JINWOO KINETIC TYPE LAB &mdash; \' + sTitle + \'</div><div style="color:#FFE500;">VARIABLE WEIGHT: 100 &rarr; 900</div>\';',
  '        middleDetailHtml = \'<div style="background:#FFE500; color:#000; padding:6px 12px; font-size:12px; font-weight:900; letter-spacing:0.08em; text-transform:uppercase; margin:14px 0;">\' +',
  '          \'LET THE TYPE MOVE THE SOUL &bull; KINETIC ENERGY &bull; SCALE DYNAMICS\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #14 — KINETIC TYPOGRAPHY</span><span>TYPE IS THE HERO</span>\';',
  '        break;',
  '',
  '      case 15:',
  '        navHtml = \'<div><strong>\' + sTitle + \'</strong> <span style="font-size:11px; color:#94A3B8; margin-left:6px;">내러티브 스크롤리텔링</span></div><div style="color:#38BDF8; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); padding:2px 8px; border-radius:999px; font-size:11px;">CHAPTER 02 / 03</div>\';',
  '        middleDetailHtml = \'<div class="lm-scrolly-rail">\' +',
  '          \'<div style="display:flex; justify-content:space-between; font-size:12px; color:#94A3B8;"><span>스크롤 스토리 진행도</span><span style="color:#38BDF8; font-weight:700;">65%</span></div>\' +',
  '          \'<div style="height:5px; background:#29354E; border-radius:3px; overflow:hidden;"><div style="width:65%; height:100%; background:#38BDF8;"></div></div>\' +',
  '          \'<div style="font-size:11px; color:#64748B;">01 문제정의 &rarr; <span style="color:#38BDF8; font-weight:700;">02 해결접근 (활성)</span> &rarr; 03 기대성과</div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #15 — SCROLLYTELLING</span><span>ONE SCROLL, ONE STORY</span>\';',
  '        break;',
  '',
  '      case 16:',
  '        navHtml = \'<div style="display:flex; align-items:center; gap:6px;"><span>🏆</span><strong>\' + sTitle + \'</strong></div><div style="display:flex; gap:8px;"><span style="background:#FFF1F2; color:#E11D48; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:700;">🔥 14일 스트릭!</span><span style="background:#EEF2FF; color:#4F46E5; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:700;">Lv.7 Master</span></div>\';',
  '        middleDetailHtml = \'<div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 14px; margin:14px 0; font-size:12px;">\' +',
  '          \'<div style="display:flex; justify-content:space-between; margin-bottom:4px; font-weight:700; color:#4F46E5;"><span>오늘의 디자인 퀘스트</span><span style="color:#059669;">80% 완료</span></div>\' +',
  '          \'<div style="height:6px; background:#F1F5F9; border-radius:3px; overflow:hidden;"><div style="width:80%; height:100%; background:linear-gradient(90deg, #6366F1, #8B5CF6);"></div></div>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #16 — LIGHT GAMIFICATION</span><span>PROGRESS OVER COMPETITION</span>\';',
  '        break;',
  '',
  '      default:',
  '        navHtml = \'<div>✨ <strong>\' + sTitle + \'</strong></div><div style="font-size:11px; color:#F472B6; font-weight:700;">CUSTOM AI STUDIO</div>\';',
  '        middleDetailHtml = \'<div class="lm-custom-panel">\' +',
  '          \'<span>사용자 등록 커스텀 스타일</span>\' +',
  '          \'<span style="color:#F472B6; font-weight:700;">STYLE #\' + safeNum + \'</span>\' +',
  '          \'</div>\';',
  '        footerHtml = \'<span>STYLE #\' + safeNum + \' — USER DEFINED</span><span>JINWOO WORKSHOP ENGINE</span>\';',
  '        break;',
  '    }',
  '',
  '    var html = [',
  '      \'<div class="live-mockup-wrapper \' + presetClass + \'">\',',
  '      \'  <div class="live-nav">\',',
  '      \'    \' + navHtml,',
  '      \'  </div>\',',
  '      \'  <div style="position:relative; z-index:1;">\',',
  '      \'    <div class="live-hero-title">\' + sTitle + \'</div>\',',
  '      \'    <div class="live-hero-desc">\' + sDesc + \'</div>\',',
  '      \'    \' + middleDetailHtml,',
  '      \'    <button class="live-btn">\' + sBtn + \'</button>\',',
  '      \'  </div>\',',
  '      \'  <div style="font-size:12px; opacity:0.65; display:flex; justify-content:space-between; margin-top:18px; position:relative; z-index:1;">\',',
  '      \'    \' + footerHtml,',
  '      \'  </div>\',',
  '      \'</div>\'',
  '    ].join("\\n");',
  '',
  '    return html;',
  '  }',
  '',
  '  root.getPresetClassForStyle = getPresetClassForStyle;',
  '  root.renderMockupHtml = renderMockupHtml;',
  '})();'
].join('\n');

module.exports = {
  extraPresetCss: extraPresetCss.trim(),
  clientPresetPatchScript: clientPresetPatchScript.trim()
};
