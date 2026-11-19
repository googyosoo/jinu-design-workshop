/**
 * JINWOO DESIGN WORKSHOP - Agentic UI & Multi-Agent Swarm Orchestrator
 * Module: src/agentic.js
 * 
 * Exports:
 * 1. extraAgenticCss: Polished dark-mode CSS for:
 *    - .btn-preset-swarm in .ai-tool-presets-bar
 *    - #agentic-critic-panel (inserted inside .sandbox-container before #sandbox-stage-wrapper)
 *    - .studio-persona-banner in #ai-studio-modal
 * 2. criticPanelHtml: HTML markup for #agentic-critic-panel
 * 3. clientAgenticScript: Client-side JS implementing Swarm Preset, Real-Time Self-Critique Agent Linter,
 *    and 3-Persona Consensus AI Style Studio with JSON token extraction.
 */

const extraAgenticCss = `
    /* ========================================================
       🐝 1. Swarm Blueprint Preset Button (.btn-preset-swarm)
       ======================================================== */
    .btn-preset-copy.btn-preset-swarm {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(236, 72, 153, 0.16) 100%);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #FBBF24;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }
    .btn-preset-copy.btn-preset-swarm:hover {
      background: linear-gradient(135deg, #F59E0B 0%, #EC4899 100%);
      color: #0B0E14;
      border-color: #F59E0B;
      box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
      transform: translateY(-1px);
    }

    /* ========================================================
       🛡️ 2. Real-Time Self-Critique Agent Linter Panel
       ======================================================== */
    .agentic-critic-panel {
      background: var(--bg-surface-elevated, #1B2132);
      border: 1px solid var(--border-strong, #333F59);
      border-radius: var(--radius-md, 14px);
      padding: 16px 20px;
      margin-top: 14px;
      margin-bottom: 8px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: criticFadeIn 0.3s ease-out;
    }
    @keyframes criticFadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .critic-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      border-bottom: 1px solid var(--border-subtle, #232B3E);
      padding-bottom: 10px;
    }
    .critic-title-box {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .critic-icon {
      font-size: 18px;
      line-height: 1;
    }
    .critic-title {
      font-size: 13px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.01em;
    }
    .critic-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
      transition: all 0.25s ease;
    }
    .critic-badge.status-pass {
      background: rgba(16, 185, 129, 0.16);
      color: #10B981;
      border: 1px solid rgba(16, 185, 129, 0.4);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.15);
    }
    .critic-badge.status-warn {
      background: rgba(245, 158, 11, 0.18);
      color: #F59E0B;
      border: 1px solid rgba(245, 158, 11, 0.45);
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.2);
    }
    .critic-score-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-main, #0B0E14);
      padding: 4px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-subtle, #232B3E);
    }
    .critic-score-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-dim, #64748B);
    }
    .critic-score-val {
      font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-size: 13px;
      font-weight: 800;
      color: var(--accent, #38BDF8);
    }

    .critic-panel-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .critic-issues-wrap {
      flex: 1;
      min-width: 260px;
    }
    .critic-issues-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .critic-issue-item {
      font-size: 12px;
      line-height: 1.5;
      padding: 6px 12px;
      border-radius: 6px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      word-break: keep-all;
    }
    .critic-issue-item.pass {
      color: #34D399;
      background: rgba(16, 185, 129, 0.08);
      border-left: 3px solid #10B981;
    }
    .critic-issue-item.warn {
      color: #FBBF24;
      background: rgba(245, 158, 11, 0.08);
      border-left: 3px solid #F59E0B;
    }
    .critic-actions-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn-critic-autofix {
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      font-family: inherit;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
    }
    .btn-critic-autofix:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
    }
    .btn-critic-autofix:active {
      transform: translateY(0);
    }

    /* ========================================================
       ✨ 3. AI Studio 3-Persona Consensus Banner
       ======================================================== */
    .studio-persona-banner {
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%);
      border: 1px solid rgba(236, 72, 153, 0.35);
      border-radius: var(--radius-md, 14px);
      padding: 12px 16px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .studio-persona-title {
      font-size: 13px;
      font-weight: 800;
      color: #F472B6;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .studio-persona-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .studio-persona-chip {
      background: var(--bg-surface, #141824);
      border: 1px solid var(--border-subtle, #232B3E);
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted, #94A3B8);
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .studio-persona-chip strong {
      color: var(--text-main, #F1F5F9);
    }
`;

const criticPanelHtml = `
      <div class="agentic-critic-panel" id="agentic-critic-panel">
        <div class="critic-panel-header">
          <div class="critic-title-box">
            <span class="critic-icon">🛡️</span>
            <span class="critic-title">실시간 디자인 가이드라인 린터 & 셀프-크리틱 에이전트</span>
            <span class="critic-badge status-pass" id="critic-status-badge">PASS ✓</span>
          </div>
          <div class="critic-score-box">
            <span class="critic-score-label">준수 점수:</span>
            <span class="critic-score-val" id="critic-score-val">100 / 100</span>
          </div>
        </div>
        <div class="critic-panel-body">
          <div class="critic-issues-wrap">
            <div class="critic-issues-list" id="critic-issues-list">
              <div class="critic-issue-item pass">✓ 모든 디자인 토큰이 가이드라인을 완벽히 준수하고 있습니다.</div>
            </div>
          </div>
          <div class="critic-actions-wrap">
            <button class="btn-critic-autofix" id="btn-critic-autofix" onclick="autoFixTokens()">
              ⚡ 원클릭 토큰 교정 (Auto-Fix)
            </button>
          </div>
        </div>
      </div>
`;

const clientAgenticScript = `
(function initAgenticModule() {
  // ========================================================
  // WCAG 2.1 Relative Luminance & Contrast Utilities
  // ========================================================
  function parseHexColor(hex) {
    if (!hex || typeof hex !== 'string') return [0, 0, 0];
    var c = hex.replace('#', '').trim();
    if (c.length === 3) c = c.split('').map(function(ch) { return ch + ch; }).join('');
    if (c.length !== 6) return [0, 0, 0];
    var num = parseInt(c, 16);
    if (isNaN(num)) return [0, 0, 0];
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function getChannelLuminance(v) {
    var s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }

  function getRelativeLuminance(hex) {
    var rgb = parseHexColor(hex);
    var r = getChannelLuminance(rgb[0]);
    var g = getChannelLuminance(rgb[1]);
    var b = getChannelLuminance(rgb[2]);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function getWcagContrastRatio(hex1, hex2) {
    var l1 = getRelativeLuminance(hex1);
    var l2 = getRelativeLuminance(hex2);
    var lighter = Math.max(l1, l2);
    var darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // ========================================================
  // 1. Real-Time Self-Critique Agent Linter
  // ========================================================
  function runDesignCritique() {
    var panel = document.getElementById('agentic-critic-panel');
    if (!panel) return;

    var badge = document.getElementById('critic-status-badge');
    var scoreVal = document.getElementById('critic-score-val');
    var issuesList = document.getElementById('critic-issues-list');
    var autoFixBtn = document.getElementById('btn-critic-autofix');

    var styleSelect = document.getElementById('sb-style-select');
    var styleNum = styleSelect ? styleSelect.value : '01';
    var tokens = (typeof activeTokens !== 'undefined') ? activeTokens : {
      primary: '#0071E3', radius: 18, shadowDepth: 2, brightness: 100, tracking: -0.4
    };

    var issues = [];

    // --- Style-specific Rule Engine ('01' ~ '16') ---
    if (styleNum === '01') {
      // 01. Apple-inspired Premium Minimal
      if (tokens.tracking > 0.5) {
        issues.push('Apple 미니멀(01) 자간 경고: 정제된 가독성을 위해 자간은 0.5px 이하여야 합니다. (현재: ' + tokens.tracking + 'px)');
      }
      if (tokens.shadowDepth > 2) {
        issues.push('Apple 미니멀(01) 그림자 경고: 절제된 서피스 원칙상 그림자 깊이는 Level 2 이하여야 합니다. (현재: Level ' + tokens.shadowDepth + ')');
      }
    } else if (styleNum === '02') {
      // 02. Swiss International Functional UI
      if (tokens.radius > 6) {
        issues.push('스위스 기능주의(02) 곡률 위반: 엄격한 직각 그리드 원칙상 모서리 곡률(Radius)은 0~6px 이내여야 합니다. (현재: ' + tokens.radius + 'px)');
      }
      if (tokens.shadowDepth > 0) {
        issues.push('스위스 기능주의(02) 그림자 위반: 2D 평면 그리드 질서상 그림자(Elevation)는 없어야 합니다. (현재: Level ' + tokens.shadowDepth + ')');
      }
    } else if (styleNum === '03') {
      // 03. Barely-there UI
      if (tokens.tracking > 0.5) {
        issues.push('베어리-데어(03) 자간 경고: 고요한 몰입을 위해 자간은 0.5px 이하여야 합니다. (현재: ' + tokens.tracking + 'px)');
      }
      if (tokens.shadowDepth > 2) {
        issues.push('베어리-데어(03) 그림자 경고: UI 크롬 최소화 원칙상 그림자는 Level 2 이하여야 합니다. (현재: Level ' + tokens.shadowDepth + ')');
      }
    } else if (styleNum === '04') {
      // 04. Progressive Disclosure
      if (tokens.radius > 20) {
        issues.push('점진적 노출(04) 곡률 경고: 기능 계층의 단단한 구조를 위해 곡률은 20px 이하여야 합니다. (현재: ' + tokens.radius + 'px)');
      }
    } else if (styleNum === '05') {
      // 05. Material 3 Expressive
      if (tokens.radius < 12) {
        issues.push('머티리얼 3 익스프레시브(05) 곡률 위반: 유기적 톤 컨테이너는 12px 이상의 넉넉한 곡률이 필요합니다. (현재: ' + tokens.radius + 'px < 12px)');
      }
    } else if (styleNum === '06') {
      // 06. Human-centered Warm UI
      if (tokens.radius < 8) {
        issues.push('인간 중심 웜 UI(06) 곡률 경고: 편안하고 따뜻한 인상을 위해 8px 이상의 곡률이 권장됩니다. (현재: ' + tokens.radius + 'px)');
      }
    } else if (styleNum === '07') {
      // 07. Bento Grid
      if (tokens.radius < 14) {
        issues.push('벤토 모듈러 그리드(07) 곡률 경고: 2x2/1x1 모듈러 밸런스를 위해 14px 이상의 곡률이 권장됩니다. (현재: ' + tokens.radius + 'px)');
      }
    } else if (styleNum === '08') {
      // 08. Bauhaus Functional UI
      if (tokens.radius > 6) {
        issues.push('바우하우스(08) 곡률 위반: 형태는 기능을 따른다는 원칙상 사각 요소의 곡률은 0~6px 이내여야 합니다. (현재: ' + tokens.radius + 'px)');
      }
      if (tokens.shadowDepth > 0) {
        issues.push('바우하우스(08) 그림자 위반: 순수 기하학적 기능미를 위해 그림자는 배제(Level 0)해야 합니다. (현재: Level ' + tokens.shadowDepth + ')');
      }
    } else if (styleNum === '09') {
      // 09. Modern Neo-Brutalism
      if (tokens.shadowDepth < 3) {
        issues.push('모던 네오-브루탈리즘(09) 그림자 위반: 하드 드롭 섀도우 규격상 그림자 깊이는 Level 3 이상이어야 합니다. (현재: Level ' + tokens.shadowDepth + ')');
      }
      if (tokens.radius > 8) {
        issues.push('모던 네오-브루탈리즘(09) 곡률 위반: 굵은 스트로크의 볼드한 캐릭터를 위해 곡률은 0~8px 이내여야 합니다. (현재: ' + tokens.radius + 'px)');
      }
    } else if (styleNum === '10') {
      // 10. Organic / Anti-grid
      if (tokens.radius < 12) {
        issues.push('오가닉 안티 그리드(10) 곡률 위반: 인위적인 사각틀을 탈피하기 위해 12px 이상의 유선형 곡률이 필요합니다. (현재: ' + tokens.radius + 'px < 12px)');
      }
    } else if (styleNum === '11') {
      // 11. Tactile / Analog UI
      if (tokens.shadowDepth < 2) {
        issues.push('촉각 아날로그(11) 그림자 경고: 손끝에 닿는 물리적 입체감을 위해 Level 2 이상의 그림자가 권장됩니다.');
      }
    } else if (styleNum === '12') {
      // 12. Retrofuturism
      if (tokens.shadowDepth < 2) {
        issues.push('레트로 퓨처리즘(12) 섀도우 경고: 사이버 네온 발광 질감을 위해 Level 2 이상의 깊이가 권장됩니다.');
      }
    } else if (styleNum === '13') {
      // 13. Contemporary Editorial Design
      if (tokens.radius > 8) {
        issues.push('컨템포러리 에디토리얼(13) 곡률 경고: 지면 인쇄물의 품격을 위해 모서리 곡률은 0~8px 수준을 권장합니다.');
      }
      if (tokens.shadowDepth > 1) {
        issues.push('컨템포러리 에디토리얼(13) 그림자 경고: 클래식 저널 감성을 위해 그림자는 Level 1 이하를 권장합니다.');
      }
    } else if (styleNum === '14') {
      // 14. Kinetic Typography
      if (tokens.radius > 6) {
        issues.push('키네틱 타이포(14) 곡률 경고: 거대한 헤드라인과의 조화를 위해 직선형(0~6px) 모서리를 권장합니다.');
      }
    } else if (styleNum === '15') {
      // 15. Scrollytelling
      if (tokens.brightness > 110) {
        issues.push('내러티브 스크롤리텔링(15) 명도 경고: 딥 다크 캔버스의 몰입감을 위해 서피스 명도는 110% 이하여야 합니다.');
      }
    } else if (styleNum === '16') {
      // 16. Light Gamification
      if (tokens.radius < 8) {
        issues.push('라이트 게이미피케이션(16) 곡률 경고: 친근한 뱃지와 진행도 바를 위해 8px 이상의 곡률이 권장됩니다.');
      }
    }

    // --- Font Tracking Bounds (-1.0px ~ 2.0px) ---
    if (tokens.tracking < -1.0 || tokens.tracking > 2.0) {
      issues.push('타이포 자간(Tracking) 허용 범위 초과: 현재 ' + tokens.tracking + 'px (허용 권장: -1.0px ~ 2.0px, 한국어 CJK 가독성 저하 위험)');
    }

    // --- WCAG 2.1 Relative Luminance Contrast Check ---
    var primaryColor = tokens.primary || '#0071E3';
    // Style 09 and 14 use black button text (#000000), others use white (#FFFFFF)
    var btnTextColor = (styleNum === '09' || styleNum === '14') ? '#000000' : '#FFFFFF';
    var contrastRatio = getWcagContrastRatio(primaryColor, btnTextColor);

    if (contrastRatio < 3.0) {
      issues.push('WCAG 대비(Contrast) 경고: Accent 컬러(' + primaryColor + ')와 버튼 텍스트(' + btnTextColor + ') 간 대비율이 ' + contrastRatio.toFixed(2) + ':1로 낮아 시인성이 저하될 수 있습니다.');
    }

    // --- Scoring & UI Update ---
    var score = 100;
    for (var i = 0; i < issues.length; i++) {
      score -= 15;
    }
    if (score < 0) score = 0;

    if (scoreVal) scoreVal.innerText = score + ' / 100';

    var isPass = score >= 90;
    if (badge) {
      if (isPass) {
        badge.className = 'critic-badge status-pass';
        badge.innerText = 'PASS ✓';
      } else {
        badge.className = 'critic-badge status-warn';
        badge.innerText = 'WARN ⚠️';
      }
    }

    if (issuesList) {
      if (issues.length === 0) {
        issuesList.innerHTML = '<div class="critic-issue-item pass">✓ 모든 디자인 토큰이 가이드라인을 완벽히 준수하고 있습니다.</div>';
      } else {
        issuesList.innerHTML = issues.map(function(msg) {
          return '<div class="critic-issue-item warn">⚠️ ' + msg + '</div>';
        }).join('');
      }
    }

    if (autoFixBtn) {
      autoFixBtn.style.opacity = isPass ? '0.75' : '1';
    }
  }

  // --- Auto-Fix Action ---
  function autoFixTokens() {
    var styleSelect = document.getElementById('sb-style-select');
    var styleNum = styleSelect ? styleSelect.value : '01';

    var def = (typeof styleDefaultTokens !== 'undefined' && styleDefaultTokens[styleNum])
      ? styleDefaultTokens[styleNum]
      : (typeof styleDefaultTokens !== 'undefined' && styleDefaultTokens['01'])
        ? styleDefaultTokens['01']
        : { primary: '#0071E3', radius: 16, shadowDepth: 2, brightness: 100, tracking: 0.0 };

    if (typeof activeTokens !== 'undefined') {
      for (var k in def) {
        if (Object.prototype.hasOwnProperty.call(def, k)) {
          activeTokens[k] = def[k];
        }
      }
    }

    if (typeof syncTokensToInputs === 'function') syncTokensToInputs();
    if (typeof applyTokensToLiveStage === 'function') applyTokensToLiveStage();

    runDesignCritique();

    if (typeof showToast === 'function') {
      showToast('스타일 #' + styleNum + ' 표준 토큰으로 자동 교정 완료! ⚡');
    }
  }

  // Expose to window for inline onclick handlers
  window.runDesignCritique = runDesignCritique;
  window.autoFixTokens = autoFixTokens;

  // ========================================================
  // 2. Swarm Blueprint Preset ('swarm' in copyAIToolPrompt)
  // ========================================================
  function injectSwarmButtons() {
    var bars = document.querySelectorAll('.ai-tool-presets-bar');
    bars.forEach(function(bar) {
      if (bar.querySelector('.btn-preset-swarm')) return;

      // Extract promptId from sibling copy button or container
      var promptId = '';
      var siblingCopyBtn = bar.querySelector('.btn-preset-copy');
      if (siblingCopyBtn) {
        var onclickAttr = siblingCopyBtn.getAttribute('onclick') || '';
        var match = onclickAttr.match(/copyAIToolPrompt\\(\\s*['"]([^'"]+)['"]/);
        if (match) promptId = match[1];
      }

      if (!promptId) {
        var card = bar.closest('.gallery-card');
        if (card && card.id) {
          promptId = card.id.replace(/^card-/, '');
        }
      }

      if (!promptId) promptId = '01-apple-inspired-premium-minimal-prompt';

      var swarmBtn = document.createElement('button');
      swarmBtn.className = 'btn-preset-copy btn-preset-swarm';
      swarmBtn.setAttribute('onclick', "copyAIToolPrompt('" + promptId + "', 'swarm')");
      swarmBtn.setAttribute('title', 'Antigravity /swarm 멀티 에이전트 오케스트레이션 프롬프트 복사');
      swarmBtn.innerHTML = '🐝 Swarm 팀';
      bar.appendChild(swarmBtn);
    });
  }

  // Wrap copyAIToolPrompt
  var origCopyAIToolPrompt = window.copyAIToolPrompt;
  window.copyAIToolPrompt = function(promptId, toolType) {
    if (toolType === 'swarm') {
      var promptItem = null;
      if (typeof promptDataStore !== 'undefined' && Array.isArray(promptDataStore)) {
        promptItem = promptDataStore.find(function(p) { return p.id === promptId; });
      }
      if (!promptItem && typeof promptDataStore !== 'undefined' && promptDataStore[0]) {
        promptItem = promptDataStore[0];
      }
      if (!promptItem) {
        promptItem = {
          title: 'Design System',
          category: 'system',
          intensity: 'refined',
          visualStyle: 'Clarity and Focus',
          coreConcept: 'Functional excellence',
          fullContent: 'Base design system specification.'
        };
      }

      var cleanId = promptId.replace(/-prompt$/, '');
      var meta = (typeof styleMetaStore !== 'undefined' && styleMetaStore[cleanId])
        ? styleMetaStore[cleanId]
        : {
            num: promptId.split('-')[0],
            korTitle: promptItem.title,
            colorSwatches: ['#0B0E14', '#151A29', '#38BDF8', '#FFFFFF']
          };

      var swatchesStr = (meta.colorSwatches && meta.colorSwatches.join(', ')) || '#38BDF8, #FFFFFF';
      var primaryAccent = (meta.colorSwatches && meta.colorSwatches[meta.colorSwatches.length - 1]) || '#38BDF8';

      var swarmPrompt = [
        '# [ANTIGRAVITY /SWARM MULTI-AGENT ORCHESTRATION BRIEF]',
        '# Target Design System: ' + promptItem.title + ' (' + meta.korTitle + ')',
        '',
        '## 1. SWARM MISSION & ROSTER CONFIGURATION',
        'You are the Swarm Coordinator orchestrating a 3-agent specialized engineering team for Antigravity.',
        'Build a production-grade, pixel-perfect frontend interface adhering 100% to the [' + promptItem.title + '] design language.',
        '',
        '### 🐝 Swarm Member Assignments:',
        '1. @layout-architect:',
        '   - Owns responsive layout, spacing rhythm, and grid structure (Desktop 1440px, Tablet 768px, Mobile 390px).',
        '   - Enforces "Anti AI-Generated UI": No generic 3-card loops, no nested card containers, generous negative space.',
        '',
        '2. @component-engineer:',
        '   - Owns atomic UI components (Buttons, Form Inputs, Cards, Badges, Navigation) with exact geometry.',
        '   - Primary Accent: ' + primaryAccent + ' | Recommended Palette: ' + swatchesStr,
        '   - Enforces elevation, radius consistency, tactile borders, and micro-interaction states.',
        '',
        '3. @cjk-a11y-verifier:',
        '   - Owns CJK Korean typography standards and WCAG 2.1 AA accessibility (Contrast >= 4.5:1).',
        '   - Enforces CJK rules: word-break: keep-all; overflow-wrap: break-word;',
        '   - Heading letter-spacing -0.035em ~ -0.02em, line-height 1.1 ~ 1.25',
        '   - Body letter-spacing -0.015em ~ 0, line-height 1.6 ~ 1.75',
        '   - Fallback type stack: Pretendard Variable, SUIT, -apple-system, sans-serif',
        '',
        '## 2. FINAL VISUAL VALIDATION GATES (Must verify before landing work)',
        '[1] Can the design direction be recognized immediately without seeing the style name?',
        '[2] Did layout structure and typography change substantially, not just surface colors?',
        '[3] Does component geometry clearly embody this system character?',
        '[4] Is this free of generic AI SaaS templates or repetitive card-in-card patterns?',
        '[5] Does applying a different prompt yield a distinct visual identity?',
        '[6] Is Korean typography reading flow comfortable and free of awkward line breaks?',
        '[7] Does the style strictly serve content clarity and user task completion?',
        '',
        '-------------------------------------------------------',
        '[ORIGINAL DESIGN SYSTEM SPECIFICATION]',
        '-------------------------------------------------------',
        promptItem.fullContent
      ].join('\\n');

      var notify = function() {
        if (typeof showToast === 'function') {
          showToast('Swarm 팀 브리프 복사 완료! 🐝');
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(swarmPrompt).then(notify).catch(function() {
          if (typeof fallbackCopyText === 'function') fallbackCopyText(swarmPrompt);
          notify();
        });
      } else {
        if (typeof fallbackCopyText === 'function') fallbackCopyText(swarmPrompt);
        notify();
      }
      return;
    }

    if (typeof origCopyAIToolPrompt === 'function') {
      return origCopyAIToolPrompt.apply(this, arguments);
    }
  };

  // ========================================================
  // 3. 3-Persona Consensus AI Style Studio
  // ========================================================
  // Override updateStudioMetaPrompt with 3-Persona Consensus Protocol
  window.updateStudioMetaPrompt = function() {
    var nameEl = document.getElementById('studio-style-name');
    var keywordsEl = document.getElementById('studio-style-keywords');
    var colorsEl = document.getElementById('studio-style-colors');

    var name = (nameEl && nameEl.value) ? nameEl.value : '새 디자인 시스템';
    var keywords = (keywordsEl && keywordsEl.value) ? keywordsEl.value : '감각적이고 미려한 디자인';
    var colors = (colorsEl && colorsEl.value) ? colorsEl.value : '#FFFFFF, #000000, #38BDF8';

    var fenceTag = String.fromCharCode(96, 96, 96);

    var metaPrompt = [
      '# [TASK: 3-PERSONA CONSENSUS DESIGN SYSTEM ARCHITECTURE]',
      "You are a 3-Persona Frontier Design Committee for 'JINWOO DESIGN WORKSHOP':",
      '1. [Visual Director]: Defines high-level aesthetic philosophy, emotional resonance, and distinctive visual motifs.',
      '2. [Anti-Cliche Critic]: Strictly eliminates AI slop (repetitive card grids, nested cards, ubiquitous purple/blue gradients, floating glass panels).',
      '3. [CJK Typography & Token Engineer]: Calibrates Pretendard Variable typography, Korean word-break: keep-all rules, and generates exact mathematical design tokens.',
      '',
      '# TARGET CONCEPT',
      '- Style Name: ' + name,
      '- Aesthetic Keywords: ' + keywords,
      '- Color Palette: ' + colors,
      '',
      '# REQUIRED OUTPUT SPECIFICATION (Korean, Markdown format):',
      '# 17. ' + name,
      '- Category: [minimal / functional / expressive / warm / tactile / future / editorial]',
      '- Intensity: [refined / structured / bold / gentle / atmospheric / kinetic]',
      '',
      '---',
      '',
      '17. ' + name,
      '비주얼 스타일:',
      '[' + name + '의 철학과 시각적 특성을 3~4문장으로 서술]',
      '',
      '디자인 핵심 (3대 페르소나 합의):',
      '- [비주얼 디렉터 원칙]',
      '- [안티-클리셰 원칙: 금지 패턴 5가지 명시]',
      '- [토큰 엔지니어 원칙]',
      '',
      '색상 구성:',
      'Background: [Hex]',
      'Secondary Background: [Hex]',
      'Primary Text: [Hex]',
      'Secondary Text: [Hex]',
      'Accent: [Hex]',
      '',
      '타이포그래피 & CJK 규칙:',
      '- Heading: letter-spacing -0.035em ~ -0.02em, line-height 1.1 ~ 1.25',
      '- Body: line-height 1.6 ~ 1.75, letter-spacing -0.015em ~ 0',
      '- Word-break: keep-all; overflow-wrap: break-word;',
      '',
      '컴포넌트 지오메트리 & 표면:',
      '- Border / Radius: [px]',
      '- Shadow: [특성]',
      '',
      '# MANDATORY DESIGN TOKENS (Fenced JSON Block):',
      fenceTag + 'json',
      '{',
      '  "primary": "#38BDF8",',
      '  "radius": 16,',
      '  "shadowDepth": 2,',
      '  "brightness": 100,',
      '  "tracking": 0.0,',
      '  "colorSwatches": ["#0B0E14", "#151A29", "#38BDF8", "#EC4899", "#FFFFFF"]',
      '}',
      fenceTag
    ].join('\\n');

    var outputEl = document.getElementById('studio-meta-output');
    if (outputEl) outputEl.innerText = metaPrompt;
  };

  // Inject 3-Persona banner into #ai-studio-modal if missing
  function injectStudioPersonaBanner() {
    var modalWindow = document.querySelector('#ai-studio-modal .customizer-modal-window');
    if (modalWindow && !modalWindow.querySelector('.studio-persona-banner')) {
      var body = modalWindow.querySelector('.customizer-body');
      if (body) {
        var banner = document.createElement('div');
        banner.className = 'studio-persona-banner';
        banner.innerHTML = [
          '<span class="studio-persona-title">✨ 3-페르소나 합의 프로토콜 가동 중</span>',
          '<div class="studio-persona-chips">',
          '  <span class="studio-persona-chip">🎨 <strong>1. 비주얼 디렉터</strong></span>',
          '  <span class="studio-persona-chip">🧐 <strong>2. 안티-클리셰 비평가</strong></span>',
          '  <span class="studio-persona-chip">⚙️ <strong>3. CJK & 토큰 엔지니어</strong></span>',
          '</div>'
        ].join('');
        modalWindow.insertBefore(banner, body);
      }
    }
  }

  // Wrap registerCustomStyle to extract JSON tokens & hex colors
  var origRegisterCustomStyle = window.registerCustomStyle;
  window.registerCustomStyle = function() {
    var aiResponseEl = document.getElementById('studio-ai-response');
    var aiResponse = aiResponseEl ? aiResponseEl.value.trim() : '';
    var summaryInputEl = document.getElementById('studio-summary-input');
    var summaryInput = summaryInputEl ? summaryInputEl.value.trim() : '';
    var styleNameEl = document.getElementById('studio-style-name');
    var styleName = (styleNameEl && styleNameEl.value.trim()) ? styleNameEl.value.trim() : '커스텀 스타일';

    if (!aiResponse) {
      alert('AI가 생성한 가이드라인 텍스트를 붙여넣어 주세요!');
      return;
    }

    // 1. Try to extract fenced JSON tokens
    var extractedTokens = null;
    var fenceStr = String.fromCharCode(96, 96, 96);
    var jsonBlockMatch = aiResponse.match(new RegExp(fenceStr + '(?:json)?\\\\s*([\\\\s\\\\S]*?)\\\\s*' + fenceStr));
    if (jsonBlockMatch) {
      try {
        extractedTokens = JSON.parse(jsonBlockMatch[1]);
      } catch (e1) {
        var innerBrace = jsonBlockMatch[1].match(/\\{[\\s\\S]*\\}/);
        if (innerBrace) {
          try { extractedTokens = JSON.parse(innerBrace[0]); } catch (e2) {}
        }
      }
    }

    if (!extractedTokens) {
      var rawBraceMatch = aiResponse.match(/\\{[\\s\\r\\n]*"primary"[\\s\\S]*?\\}/);
      if (rawBraceMatch) {
        try { extractedTokens = JSON.parse(rawBraceMatch[0]); } catch (e3) {}
      }
    }

    // 2. Extract hex color codes as fallback or supplement
    var hexMatches = aiResponse.match(/#[0-9a-fA-F]{6}\\b/g) || [];
    var uniqueHexes = [];
    hexMatches.forEach(function(h) {
      if (uniqueHexes.indexOf(h) === -1) uniqueHexes.push(h);
    });

    var colorSwatches = ['#0B0E14', '#151A29', '#EC4899', '#38BDF8', '#FFFFFF'];
    if (extractedTokens && Array.isArray(extractedTokens.colorSwatches) && extractedTokens.colorSwatches.length >= 3) {
      colorSwatches = extractedTokens.colorSwatches;
    } else if (uniqueHexes.length >= 3) {
      colorSwatches = uniqueHexes.slice(0, 5);
      while (colorSwatches.length < 5) colorSwatches.push('#FFFFFF');
    }

    var primaryColor = (extractedTokens && extractedTokens.primary)
      ? extractedTokens.primary
      : (colorSwatches[2] || '#EC4899');

    var existing = JSON.parse(localStorage.getItem('jinwoo_custom_styles') || '[]');
    var newNum = (17 + existing.length).toString().padStart(2, '0');
    var customId = 'custom-' + newNum;

    var registeredTokens = {
      primary: primaryColor,
      radius: (extractedTokens && typeof extractedTokens.radius === 'number') ? extractedTokens.radius : 16,
      shadowDepth: (extractedTokens && typeof extractedTokens.shadowDepth === 'number') ? extractedTokens.shadowDepth : 2,
      brightness: (extractedTokens && typeof extractedTokens.brightness === 'number') ? extractedTokens.brightness : 100,
      tracking: (extractedTokens && typeof extractedTokens.tracking === 'number') ? extractedTokens.tracking : 0.0
    };

    // Register into global store
    if (typeof styleDefaultTokens !== 'undefined') {
      styleDefaultTokens[newNum] = Object.assign({}, registeredTokens);
    }
    if (typeof styleMetaStore !== 'undefined') {
      styleMetaStore[customId] = {
        num: newNum,
        korTitle: styleName,
        colorSwatches: colorSwatches
      };
    }

    var newStyleObj = {
      id: customId,
      num: newNum,
      title: styleName,
      korTitle: styleName,
      category: 'custom, creative, user-defined',
      intensity: 'custom',
      summary: summaryInput || '사용자가 3-페르소나 합의 AI를 통해 직접 생성하고 공작소에 영구 등록한 ' + newNum + '번째 커스텀 디자인 시스템입니다.',
      colorSwatches: colorSwatches,
      tokens: registeredTokens,
      fullContent: aiResponse
    };

    existing.push(newStyleObj);
    localStorage.setItem('jinwoo_custom_styles', JSON.stringify(existing));

    if (typeof appendCustomCardToDOM === 'function') appendCustomCardToDOM(newStyleObj);
    if (typeof addCustomOptionToSandbox === 'function') addCustomOptionToSandbox(newStyleObj);

    if (typeof showToast === 'function') {
      showToast('스타일 #' + newNum + ' [' + styleName + '] 갤러리 등록 완료! 🎉');
    }
    if (typeof closeAIStudioModal === 'function') closeAIStudioModal();
    if (typeof scrollToElement === 'function') scrollToElement('card-' + customId);

    injectSwarmButtons();
  };

  // Wrap appendCustomCardToDOM so custom cards get Swarm buttons and registered tokens
  var origAppendCustomCardToDOM = window.appendCustomCardToDOM;
  window.appendCustomCardToDOM = function(styleObj) {
    if (typeof origAppendCustomCardToDOM === 'function') {
      origAppendCustomCardToDOM.apply(this, arguments);
    }

    if (styleObj && styleObj.tokens && typeof styleDefaultTokens !== 'undefined') {
      styleDefaultTokens[styleObj.num] = Object.assign({}, styleObj.tokens);
    }

    // Ensure .ai-tool-presets-bar exists on custom card if missing
    var cardEl = document.getElementById('card-' + styleObj.id);
    if (cardEl) {
      var promptSection = cardEl.querySelector('.prompt-section');
      if (promptSection && !promptSection.querySelector('.ai-tool-presets-bar')) {
        var previewWrap = promptSection.querySelector('.prompt-preview-wrap');
        var presetsBar = document.createElement('div');
        presetsBar.className = 'ai-tool-presets-bar';
        presetsBar.innerHTML = [
          '<span class="preset-label">도구별 복사:</span>',
          '<button class="btn-preset-copy" onclick="copyAIToolPrompt(\\'' + styleObj.id + '\\', \\'v0\\')">🚀 v0 / Lovable</button>',
          '<button class="btn-preset-copy" onclick="copyAIToolPrompt(\\'' + styleObj.id + '\\', \\'claude\\')">🤖 Claude / GPT</button>',
          '<button class="btn-preset-copy" onclick="copyAIToolPrompt(\\'' + styleObj.id + '\\', \\'cursor\\')">⚡ Cursor / AGY</button>',
          '<button class="btn-preset-copy btn-preset-swarm" onclick="copyAIToolPrompt(\\'' + styleObj.id + '\\', \\'swarm\\')">🐝 Swarm 팀</button>'
        ].join('');
        if (previewWrap) {
          promptSection.insertBefore(presetsBar, previewWrap);
        } else {
          promptSection.appendChild(presetsBar);
        }
      }
    }

    injectSwarmButtons();
  };

  // ========================================================
  // 4. Hook Token & Style Changes to Critic Linter
  // ========================================================
  var origUpdateLiveRender = window.updateLiveRender;
  window.updateLiveRender = function() {
    if (typeof origUpdateLiveRender === 'function') origUpdateLiveRender.apply(this, arguments);
    runDesignCritique();
  };

  var origUpdateToken = window.updateToken;
  window.updateToken = function() {
    if (typeof origUpdateToken === 'function') origUpdateToken.apply(this, arguments);
    runDesignCritique();
  };

  var origOnSandboxStyleChange = window.onSandboxStyleChange;
  window.onSandboxStyleChange = function() {
    if (typeof origOnSandboxStyleChange === 'function') origOnSandboxStyleChange.apply(this, arguments);
    runDesignCritique();
  };

  var origResetTokensToDefault = window.resetTokensToDefault;
  window.resetTokensToDefault = function() {
    if (typeof origResetTokensToDefault === 'function') origResetTokensToDefault.apply(this, arguments);
    runDesignCritique();
  };

  var origSetSandboxMode = window.setSandboxMode;
  if (typeof origSetSandboxMode === 'function') {
    window.setSandboxMode = function() {
      origSetSandboxMode.apply(this, arguments);
      runDesignCritique();
    };
  }

  // Restore custom styles tokens from localStorage on startup
  function restoreCustomTokens() {
    try {
      var list = JSON.parse(localStorage.getItem('jinwoo_custom_styles') || '[]');
      if (Array.isArray(list)) {
        list.forEach(function(item) {
          if (item && item.num && item.tokens && typeof styleDefaultTokens !== 'undefined') {
            styleDefaultTokens[item.num] = Object.assign({}, item.tokens);
          }
        });
      }
    } catch (e) {}
  }

  // ========================================================
  // 5. DOM Initialization & Injection
  // ========================================================
  function setupCriticPanel() {
    if (!document.getElementById('agentic-critic-panel')) {
      var stageWrapper = document.getElementById('sandbox-stage-wrapper');
      if (stageWrapper && stageWrapper.parentNode) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = [
          '<div class="agentic-critic-panel" id="agentic-critic-panel">',
          '  <div class="critic-panel-header">',
          '    <div class="critic-title-box">',
          '      <span class="critic-icon">🛡️</span>',
          '      <span class="critic-title">실시간 디자인 가이드라인 린터 & 셀프-크리틱 에이전트</span>',
          '      <span class="critic-badge status-pass" id="critic-status-badge">PASS ✓</span>',
          '    </div>',
          '    <div class="critic-score-box">',
          '      <span class="critic-score-label">준수 점수:</span>',
          '      <span class="critic-score-val" id="critic-score-val">100 / 100</span>',
          '    </div>',
          '  </div>',
          '  <div class="critic-panel-body">',
          '    <div class="critic-issues-wrap">',
          '      <div class="critic-issues-list" id="critic-issues-list">',
          '        <div class="critic-issue-item pass">✓ 모든 디자인 토큰이 가이드라인을 완벽히 준수하고 있습니다.</div>',
          '      </div>',
          '    </div>',
          '    <div class="critic-actions-wrap">',
          '      <button class="btn-critic-autofix" id="btn-critic-autofix" onclick="autoFixTokens()">',
          '        ⚡ 원클릭 토큰 교정 (Auto-Fix)',
          '      </button>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('\\n');
        stageWrapper.parentNode.insertBefore(tempDiv.firstElementChild, stageWrapper);
      }
    }
  }

  function initAgentic() {
    restoreCustomTokens();
    setupCriticPanel();
    injectSwarmButtons();
    injectStudioPersonaBanner();
    runDesignCritique();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgentic);
  } else {
    initAgentic();
  }
})();
`;

module.exports = {
  extraAgenticCss,
  criticPanelHtml,
  clientAgenticScript
};
