const fs = require('fs');
const path = require('path');

const { extraPresetCss, clientPresetPatchScript } = require('./src/presets');
const { extraKitCss, clientKitScript } = require('./src/kit');
const { extraAgenticCss, criticPanelHtml, clientAgenticScript } = require('./src/agentic');

const promptsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'prompts_data.json'), 'utf-8'));

// Supplementary metadata for cards
const styleMeta = {
  '01-apple-inspired-premium-minimal': {
    num: '01',
    korTitle: '애플 감성 프리미엄 미니멀',
    colorSwatches: ['#FFFFFF', '#F5F5F7', '#1D1D1F', '#6E6E73', '#0071E3'],
    filterGroup: 'minimal',
    oneLiner: '장식을 덜어내고 여백과 타이포그래피로 프로덕트의 본질을 극대화한 정제된 UI',
    highlights: ['Clarity & Focus', '극도의 여백 비율', 'SF/Pretendard 헤드라인', '카드 없는 서피스']
  },
  '02-swiss-international-functional-ui': {
    num: '02',
    korTitle: '스위스 인터내셔널 기능주의',
    colorSwatches: ['#FFFFFF', '#000000', '#FF2A00', '#F2F2F2', '#222222'],
    filterGroup: 'functional',
    oneLiner: '엄격한 12-컬럼 그리드와 굵은 룰 라인, 객관적이고 명확한 산세리프 정보 구성',
    highlights: ['Grid over Cards', '객관적 정보 계층', '볼드 블랙 스트로크', '비비드 레드 포인트']
  },
  '03-barely-there-ui': {
    num: '03',
    korTitle: '극도의 투명성 베어리-데어 UI',
    colorSwatches: ['#FAFAFA', '#18181B', '#71717A', '#A1A1AA', '#E4E4E7'],
    filterGroup: 'minimal',
    oneLiner: '인터페이스 크롬을 완전히 걷어내어 콘텐츠 자체가 UI가 되는 궁극의 몰입감',
    highlights: ['The Content is the UI', '보더 제로 (0px)', '90% 여백 비중', '인지 부하 최소화']
  },
  '04-progressive-disclosure': {
    num: '04',
    korTitle: '단계적 정보 공개 (점진적 노출)',
    colorSwatches: ['#F8FAFC', '#0F172A', '#2563EB', '#64748B', '#059669'],
    filterGroup: 'functional',
    oneLiner: '지금 필요한 것만 직관적으로 보여주고, 복잡성은 사용자의 요청 시 단계적으로 확장',
    highlights: ['3단계 정보 계층', '인지 과부하 방지', '컨텍스트 기반 드릴다운', '실수 예방 설계']
  },
  '05-material-3-expressive': {
    num: '05',
    korTitle: '머티리얼 3 익스프레시브',
    colorSwatches: ['#FEF7FF', '#6750A4', '#E8DEF8', '#21005D', '#FFD8E4'],
    filterGroup: 'expressive',
    oneLiner: '유기적인 톤온톤 컨테이너와 감성적인 다이내믹 컬러 토큰, 볼드한 표정의 디자인',
    highlights: ['32px 유기적 라운딩', '다이내믹 컬러 토큰', '스프링 모션 피직스', '감성적 톤 컨테이너']
  },
  '06-human-centered-warm-ui': {
    num: '06',
    korTitle: '인간 중심 웜 & 코지 UI',
    colorSwatches: ['#FAF7F2', '#362B24', '#C46849', '#587053', '#EFE8DE'],
    filterGroup: 'warm',
    oneLiner: '눈이 편안한 따뜻한 어스톤과 온기 있는 텍스처, 환대와 쉼을 전하는 인터페이스',
    highlights: ['Comfort over Spectacle', '오트밀 & 웜 베이지', '테라코타/세이지 악센트', '여유로운 행간(1.7)']
  },
  '07-bento-grid': {
    num: '07',
    korTitle: '현대적 벤토 모듈러 그리드',
    colorSwatches: ['#0F1117', '#181C27', '#38BDF8', '#10B981', '#94A3B8'],
    filterGroup: 'functional',
    oneLiner: '크기로 중요성을 전달하는 2x2, 2x1 모듈러 박스 그리드로 완성된 현대적 대시보드',
    highlights: ['Size Communicates Value', '2x2 / 1x1 모듈 밸런스', '24px 곡률 일관성', '높은 시각적 완성도']
  },
  '08-bauhaus-functional-ui': {
    num: '08',
    korTitle: '바우하우스 기능주의 UI',
    colorSwatches: ['#F4F4F0', '#111111', '#E63946', '#FFB703', '#1D3557'],
    filterGroup: 'functional',
    oneLiner: '형태는 기능을 따른다. 원·삼각·사각 기본 도형과 삼원색으로 구조화된 기능미',
    highlights: ['Form Follows Function', '삼원색(Red, Yellow, Blue)', '장식 곡선 배제', '엄격한 기하학적 질서']
  },
  '09-modern-neo-brutalism': {
    num: '09',
    korTitle: '모던 네오-브루탈리즘',
    colorSwatches: ['#FFFBEB', '#000000', '#FFE600', '#FF5483', '#74F0ED'],
    filterGroup: 'expressive',
    oneLiner: '4px 볼드 블랙 스트로크, 하드 드롭 섀도우, 타협 없는 원색과 위트 있는 키치함',
    highlights: ['Bold & Direct', '하드 드롭 섀도우(5px)', '블러 제로(0px)', '쨍한 네온 하이라이트']
  },
  '10-organic-anti-grid': {
    num: '10',
    korTitle: '오가닉 & 안티 그리드',
    colorSwatches: ['#F5F2EB', '#2A2D28', '#465340', '#6B7863', '#E7E1D4'],
    filterGroup: 'warm',
    oneLiner: '인위적인 사각틀을 벗어난 유선형 아메바 블롭과 대지의 온기를 머금은 유기적 플로우',
    highlights: ['Structured but Human', '물결 곡선 컨테이너', '자연주의 어스톤', '조화로운 비대칭 균형']
  },
  '11-tactile-analog-ui': {
    num: '11',
    korTitle: '촉각적 아날로그 & 스큐어모피즘',
    colorSwatches: ['#242528', '#2D2F34', '#E5A93C', '#FF453A', '#E1DFDD'],
    filterGroup: 'tactile',
    oneLiner: '널링 금속 노브, 엠보싱 스위치, 빈티지 VU 레벨 미터로 구현한 손끝에 닿는 물리성',
    highlights: ['Physical Precision', '브러시드 메탈 질감', '아날로그 로터리 노브', '스큐어모픽 피드백']
  },
  '12-retrofuturism': {
    num: '12',
    korTitle: '레트로 퓨처리즘 (신스웨이브)',
    colorSwatches: ['#0B0D17', '#00F0FF', '#FF007F', '#181C2C', '#E2E8F0'],
    filterGroup: 'future',
    oneLiner: '80년대 사이버 네온 그리드와 CRT 스캔라인, 과거가 상상한 찬란한 미래의 정취',
    highlights: ['Outrun & Synthwave', '네온 사이안 & 마젠타', 'CRT 스캔라인 이펙트', '사이버 그리드 원근법']
  },
  '13-contemporary-editorial-design': {
    num: '13',
    korTitle: '컨템포러리 에디토리얼 디자인',
    colorSwatches: ['#F9F8F6', '#1C1A17', '#A65839', '#57514A', '#EFECE6'],
    filterGroup: 'future',
    oneLiner: '하이엔드 잡지 레이아웃, 우아한 세리프 활자와 에디토리얼 칼럼이 빚어낸 깊이',
    highlights: ['Editorial Journaling', '우아한 세리프 타이포', '여유로운 1.75 행간', '지적이고 클래식한 감성']
  },
  '14-kinetic-typography': {
    num: '14',
    korTitle: '키네틱 타이포그래피',
    colorSwatches: ['#000000', '#FFFFFF', '#FFE500', '#888888', '#222222'],
    filterGroup: 'expressive',
    oneLiner: '활자 자체가 거대한 비주얼 히어로가 되어 화면 전체를 장악하는 역동적인 타이포 UI',
    highlights: ['Type is the Hero', '초대형 헤드라인 스케일', '마키(Marquee) 텍스트 띠', '가변 폰트 리듬']
  },
  '15-scrollytelling': {
    num: '15',
    korTitle: '내러티브 스크롤리텔링',
    colorSwatches: ['#0E131F', '#38BDF8', '#151C2C', '#F8FAFC', '#94A3B8'],
    filterGroup: 'future',
    oneLiner: '스크롤을 내릴 때마다 한 편의 이야기처럼 전개되는 단계별 타임라인과 몰입형 인터페이스',
    highlights: ['One Scroll, One Story', '단계별 챕터 진행', '스크롤 트리거 연동', '내러티브 시각화']
  },
  '16-light-gamification': {
    num: '16',
    korTitle: '라이트 게이미피케이션',
    colorSwatches: ['#F8FAFC', '#6366F1', '#E11D48', '#059669', '#EEF2FF'],
    filterGroup: 'future',
    oneLiner: '스트릭(연속 달성), XP 게이지, 레벨 뱃지가 사용자의 몰입과 학습 동기를 이끄는 UI',
    highlights: ['Progress over Competition', '14일 스트릭 시스템', '레벨 & 업적 뱃지', '경험치(XP) 마이크로 인터랙션']
  }
};

const fullCardsHtml = promptsData.map(p => {
  const cleanId = p.id.replace(/-prompt$/, '');
  const meta = styleMeta[cleanId] || {
    num: p.id.split('-')[0],
    korTitle: p.title,
    colorSwatches: ['#1E293B', '#3B82F6', '#10B981', '#F1F5F9', '#FFFFFF'],
    filterGroup: 'all',
    oneLiner: p.visualStyle || p.title,
    highlights: ['Custom Concept']
  };

  const imagePath = `assets/images/mockup-${meta.num}.png`;
  const escapedContent = p.fullContent
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const swatchesHtml = meta.colorSwatches.map(c => `
    <div class="swatch" style="background:${c};" title="클릭하여 ${c} 복사" onclick="copyHex('${c}', event)">
      <span class="swatch-tip">${c}</span>
    </div>
  `).join('');

  const highlightsHtml = meta.highlights.map(h => `
    <span class="highlight-tag">${h}</span>
  `).join('');

  return `
    <article class="gallery-card" data-filter="${meta.filterGroup}" data-search="${p.title.toLowerCase()} ${meta.korTitle.toLowerCase()} ${p.category.toLowerCase()} ${meta.oneLiner.toLowerCase()}">
      <!-- Image Header Box -->
      <div class="card-image-box">
        <img src="${imagePath}" alt="${p.title} 구현 모습" class="mockup-img">
        <div class="image-overlay">
          <button class="btn-overlay-zoom" onclick="openZoomModal('${imagePath}', '${p.title}')" title="고화질 확대 보기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            확대 보기
          </button>
          <a href="${imagePath}" download="지누의디자인공작소_${meta.num}_${p.id}.png" class="btn-overlay-dl" title="이미지 다운로드">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            다운로드
          </a>
        </div>
        <div class="card-badge-num">STYLE #${meta.num}</div>
      </div>

      <!-- Card Body Content -->
      <div class="card-body">
        <div class="card-meta-row">
          <span class="badge-category">${p.category}</span>
          <span class="badge-intensity">Intensity: ${p.intensity}</span>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <div class="card-kor-title">${meta.korTitle}</div>
        
        <p class="card-summary">${meta.oneLiner}</p>

        <!-- Highlights Tags -->
        <div class="highlights-container">
          ${highlightsHtml}
        </div>

        <!-- Color Palette Swatches -->
        <div class="palette-section">
          <div class="palette-label">주요 컬러 팔레트 <span class="tip-inline">(클릭 시 HEX 복사)</span></div>
          <div class="swatches-row">
            ${swatchesHtml}
          </div>
        </div>

        <!-- Action Bar: Prompt Copy & Customizer & Component Kit & Starter Download -->
        <div class="card-action-bar">
          <button class="btn-customizer-open" onclick="openCustomizerModal('${p.id}', '${p.title}', '${meta.korTitle}')" title="내 프로젝트에 맞춘 프롬프트 생성">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            맞춤 프롬프트 ➔
          </button>
          <button class="btn-component-kit" onclick="openComponentKitModal('${p.id}', '${meta.num}', '${p.title}', '${meta.korTitle}')" title="5대 핵심 UI 컴포넌트 킷 및 코드 뷰어">
            🧩 컴포넌트 킷
          </button>
          <button class="btn-send-sandbox" onclick="sendToSandbox('${meta.num}')" title="샌드박스에서 즉시 실시간 렌더링">
            ⚡ 샌드박스
          </button>
          <button class="btn-download-starter" onclick="downloadStarterTemplate('${p.id}', '${meta.num}', '${p.title}')" title="실제 동작하는 독립 실행형 HTML/CSS 보일러플레이트 다운로드">
            📦 템플릿 다운로드 (.html)
          </button>
        </div>

        <!-- Prompt Section Area with AI Tool Preset Buttons -->
        <div class="prompt-section">
          <div class="prompt-header">
            <span class="prompt-title-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              프롬프트 전문 (${(p.contentLength / 1024).toFixed(1)} KB)
            </span>
            <div class="prompt-copy-group">
              <button class="btn-copy-prompt" onclick="copyPromptText(this, '${p.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                기본 복사
              </button>
            </div>
          </div>

          <!-- 🌟 3번: AI 도구별 맞춤 프리셋 원클릭 복사 바 -->
          <div class="ai-tool-presets-bar">
            <span class="preset-label">도구별 복사:</span>
            <button class="btn-preset-copy" onclick="copyAIToolPrompt('${p.id}', 'v0')" title="v0, Lovable, Bolt.new용 Tailwind + React 프롬프트 복사">
              🚀 v0 / Lovable
            </button>
            <button class="btn-preset-copy" onclick="copyAIToolPrompt('${p.id}', 'claude')" title="Claude Artifacts 및 ChatGPT용 마스터 지침 프롬프트 복사">
              🤖 Claude / GPT
            </button>
            <button class="btn-preset-copy" onclick="copyAIToolPrompt('${p.id}', 'cursor')" title="Cursor 및 Antigravity 시스템 룰(.cursorrules) 복사">
              ⚡ Cursor / AGY
            </button>
            <button class="btn-preset-copy btn-preset-swarm" onclick="copyAIToolPrompt('${p.id}', 'swarm')">🐝 Swarm 팀</button>
          </div>

          <!-- Prompt Preview Box -->
          <div class="prompt-preview-wrap">
            <pre class="prompt-code-block" id="prompt-pre-${p.id}">${escapedContent}</pre>
          </div>

          <button class="btn-expand-toggle" onclick="togglePromptExpand('${p.id}', this)">
            <span class="toggle-text">프롬프트 전체 펼쳐보기 (한국어 규칙 포함)</span>
            <span class="toggle-icon">▼</span>
          </button>
        </div>
      </div>
    </article>
  `;
}).join('\n');

// Style options for select box in sandbox
const styleOptionsHtml = promptsData.map(p => {
  const cleanId = p.id.replace(/-prompt$/, '');
  const meta = styleMeta[cleanId] || { num: p.id.split('-')[0], korTitle: p.title };
  return `<option value="${meta.num}">${meta.num}. ${p.title} (${meta.korTitle})</option>`;
}).join('\n');

const htmlTemplate = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>지누의 디자인 공작소 — 16대 디자인 시스템 & 라이브 샌드박스</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <style>
    :root {
      --bg-main: #0B0E14;
      --bg-surface: #141824;
      --bg-surface-elevated: #1B2132;
      --bg-card: #151A29;
      --border-subtle: #232B3E;
      --border-strong: #333F59;
      --text-main: #F1F5F9;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      --accent: #38BDF8;
      --accent-hover: #0EA5E9;
      --accent-glow: rgba(56, 189, 248, 0.25);
      --success: #10B981;
      --warning: #F59E0B;
      --danger: #EF4444;
      --purple: #A855F7;
      --pink: #EC4899;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-xl: 28px;
      --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      word-break: keep-all;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg-main); }
    ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

    /* Top Sticky Header */
    header.site-header {
      background: rgba(11, 14, 20, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 40px;
    }
    .header-inner {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .brand-logo-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
      text-decoration: none;
    }
    .brand-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #38BDF8 0%, #6366F1 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0 4px 16px rgba(56, 189, 248, 0.35);
    }
    .brand-title-box h1 {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-badge {
      font-size: 11px;
      font-weight: 700;
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 2px 8px;
      border-radius: 999px;
    }
    .brand-title-box p { font-size: 12px; color: var(--text-muted); }

    .header-nav-links {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .nav-btn-jump {
      background: transparent;
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      font-family: inherit;
    }
    .nav-btn-jump:hover {
      background: var(--bg-surface-elevated);
      border-color: var(--accent);
      color: var(--accent);
    }
    .btn-highlight-studio {
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.18) 0%, rgba(168, 85, 247, 0.18) 100%) !important;
      border: 1px solid #EC4899 !important;
      color: #F472B6 !important;
      font-weight: 700 !important;
    }
    .btn-highlight-studio:hover {
      background: #EC4899 !important;
      color: #FFFFFF !important;
      box-shadow: 0 4px 14px rgba(236, 72, 153, 0.35) !important;
    }

    .search-box {
      position: relative;
      width: 260px;
    }
    .search-box svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-dim);
    }
    .search-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      padding: 9px 16px 9px 40px;
      font-size: 13px;
      color: var(--text-main);
      outline: none;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .search-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
      background: var(--bg-surface-elevated);
    }

    /* Hero Banner */
    .hero-banner {
      max-width: 1600px;
      margin: 32px auto 16px auto;
      padding: 0 40px;
    }
    .hero-card {
      background: linear-gradient(135deg, rgba(20, 24, 36, 0.9) 0%, rgba(27, 33, 50, 0.7) 100%);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      padding: 40px 48px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--accent);
      font-size: 13px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 999px;
      margin-bottom: 14px;
    }
    .hero-title {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.25;
      margin-bottom: 12px;
      color: #FFFFFF;
    }
    .hero-desc {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 900px;
      line-height: 1.6;
      margin-bottom: 22px;
    }
    .hero-features {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      font-size: 13px;
    }
    .hero-feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.04);
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .hero-feature-item span.icon { color: var(--accent); }

    /* 1번: 실시간 라이브 샌드박스 & A/B 비교 스튜디오 */
    section.sandbox-section {
      max-width: 1600px;
      margin: 30px auto;
      padding: 0 40px;
    }
    .sandbox-container {
      background: var(--bg-surface);
      border: 2px solid var(--accent);
      box-shadow: 0 16px 48px rgba(56, 189, 248, 0.12);
      border-radius: var(--radius-xl);
      padding: 36px 40px;
      position: relative;
    }
    .sandbox-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 22px;
      margin-bottom: 26px;
    }
    .sandbox-title-wrap h2 {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .sandbox-title-wrap p {
      font-size: 14px;
      color: var(--text-muted);
      margin-top: 4px;
    }
    .sandbox-mode-toggles {
      display: flex;
      background: var(--bg-main);
      padding: 4px;
      border-radius: 12px;
      border: 1px solid var(--border-subtle);
      gap: 6px;
    }
    .btn-sandbox-mode {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .btn-sandbox-mode.active {
      background: var(--accent);
      color: #0B0E14;
      box-shadow: 0 2px 8px var(--accent-glow);
    }

    .sandbox-inputs-grid {
      display: grid;
      grid-template-columns: 1.5fr 2fr 1fr;
      gap: 18px;
      background: var(--bg-main);
      padding: 20px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-subtle);
      margin-bottom: 24px;
    }
    .input-field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .input-field-group label {
      font-size: 12px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .sandbox-text-input {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 10px 14px;
      color: var(--text-main);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    .sandbox-text-input:focus { border-color: var(--accent); }

    .sandbox-selector-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 16px;
      flex-wrap: wrap;
    }
    .style-select-box { display: flex; align-items: center; gap: 10px; }
    .style-select-box label { font-size: 13px; font-weight: 700; color: var(--text-muted); }
    .style-dropdown {
      background: var(--bg-main);
      border: 1px solid var(--border-strong);
      color: var(--text-main);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      font-family: inherit;
    }

    .sandbox-stage-wrapper {
      background: #000;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      min-height: 440px;
      display: flex;
      position: relative;
    }
    #sandbox-single-stage {
      width: 100%;
      min-height: 440px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    #sandbox-ab-stage {
      width: 100%;
      display: none;
      grid-template-columns: 1fr 1fr;
    }
    .ab-side-pane {
      padding: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .ab-side-header {
      background: rgba(11, 14, 20, 0.85);
      border-bottom: 1px solid var(--border-subtle);
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 700;
    }
    .ab-stage-box {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      overflow: hidden;
    }

    /* Live Mockup Presets */
    .live-mockup-wrapper {
      width: 100%;
      min-height: 420px;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      transition: all 0.3s ease;
    }

    .preset-apple { background: #FFFFFF; color: #1D1D1F; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; }
    .preset-apple .live-nav { display: flex; justify-content: space-between; border-bottom: 1px solid #D2D2D7; padding-bottom: 14px; font-size: 14px; color: #6E6E73; }
    .preset-apple .live-hero-title { font-size: 38px; font-weight: 700; letter-spacing: -0.04em; line-height: 1.15; color: #1D1D1F; margin: 20px 0 12px 0; }
    .preset-apple .live-hero-desc { font-size: 16px; color: #6E6E73; line-height: 1.6; max-width: 600px; margin-bottom: 24px; }
    .preset-apple .live-btn { background: #0071E3; color: #FFFFFF; border: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 600; cursor: pointer; align-self: flex-start; }

    .preset-swiss { background: #FFFFFF; color: #000000; font-family: 'Helvetica Neue', Arial, sans-serif; border: 6px solid #000; }
    .preset-swiss .live-nav { display: flex; justify-content: space-between; border-bottom: 3px solid #000; padding-bottom: 10px; font-weight: 800; font-size: 13px; text-transform: uppercase; }
    .preset-swiss .live-hero-title { font-size: 36px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase; line-height: 1.05; margin: 20px 0 12px 0; }
    .preset-swiss .live-hero-desc { font-size: 14px; font-weight: 600; color: #222; border-left: 3px solid #FF2A00; padding-left: 14px; margin-bottom: 24px; }
    .preset-swiss .live-btn { background: #000000; color: #FFFFFF; border: 2px solid #000; padding: 12px 24px; font-size: 14px; font-weight: 900; text-transform: uppercase; }

    .preset-barely { background: #FAFAFA; color: #18181B; font-family: -apple-system, sans-serif; }
    .preset-barely .live-nav { display: flex; justify-content: space-between; font-size: 13px; color: #A1A1AA; }
    .preset-barely .live-hero-title { font-size: 36px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.2; margin: 30px 0 16px 0; }
    .preset-barely .live-hero-desc { font-size: 15px; color: #52525B; line-height: 1.7; margin-bottom: 24px; }
    .preset-barely .live-btn { background: transparent; color: #18181B; border: none; border-bottom: 2px solid #18181B; padding: 6px 0; font-size: 15px; font-weight: 600; }

    .preset-material { background: #FEF7FF; color: #1D1B20; border-radius: 28px; }
    .preset-material .live-nav { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #49454F; }
    .preset-material .live-hero-title { font-size: 34px; font-weight: 800; color: #21005D; line-height: 1.2; margin: 18px 0 12px 0; }
    .preset-material .live-hero-desc { font-size: 15px; color: #49454F; line-height: 1.6; margin-bottom: 24px; }
    .preset-material .live-btn { background: #6750A4; color: #FFFFFF; border: none; padding: 12px 28px; border-radius: 24px; font-size: 14px; font-weight: 700; box-shadow: 0 4px 8px rgba(0,0,0,0.15); }

    .preset-warm { background: #FAF7F2; color: #362B24; font-family: serif, sans-serif; }
    .preset-warm .live-nav { display: flex; justify-content: space-between; border-bottom: 1px solid #EADBCC; padding-bottom: 12px; font-size: 14px; color: #6E6157; }
    .preset-warm .live-hero-title { font-size: 34px; font-weight: 700; color: #362B24; line-height: 1.2; margin: 20px 0 12px 0; }
    .preset-warm .live-hero-desc { font-size: 15px; color: #6E6157; line-height: 1.7; margin-bottom: 24px; }
    .preset-warm .live-btn { background: #C46849; color: #FFFFFF; border: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; }

    .preset-bento { background: #0F1117; color: #FFFFFF; }
    .preset-bento .live-nav { display: flex; justify-content: space-between; font-size: 13px; color: #94A3B8; }
    .preset-bento .live-hero-title { font-size: 34px; font-weight: 800; line-height: 1.2; margin: 18px 0 12px 0; color: #38BDF8; }
    .preset-bento .live-hero-desc { font-size: 15px; color: #94A3B8; line-height: 1.6; margin-bottom: 24px; }
    .preset-bento .live-btn { background: #181C27; color: #38BDF8; border: 1px solid #283044; padding: 10px 22px; border-radius: 12px; font-size: 14px; font-weight: 700; }

    .preset-bauhaus { background: #F4F4F0; color: #111111; border: 6px solid #111; }
    .preset-bauhaus .live-nav { display: flex; justify-content: space-between; border-bottom: 4px solid #111; padding-bottom: 10px; font-weight: 900; }
    .preset-bauhaus .live-hero-title { font-size: 36px; font-weight: 900; line-height: 1.1; margin: 20px 0 12px 0; text-transform: uppercase; }
    .preset-bauhaus .live-hero-desc { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 24px; }
    .preset-bauhaus .live-btn { background: #E63946; color: #FFFFFF; border: 3px solid #111; padding: 12px 24px; font-weight: 900; font-size: 14px; }

    .preset-brutal { background: #FFFBEB; color: #000000; border: 4px solid #000; box-shadow: 6px 6px 0px #000; }
    .preset-brutal .live-nav { display: flex; justify-content: space-between; font-weight: 900; font-size: 14px; }
    .preset-brutal .live-hero-title { font-size: 34px; font-weight: 900; line-height: 1.1; margin: 18px 0 12px 0; }
    .preset-brutal .live-hero-desc { font-size: 15px; font-weight: 600; margin-bottom: 24px; }
    .preset-brutal .live-btn { background: #FFE600; color: #000; border: 3px solid #000; box-shadow: 4px 4px 0px #000; padding: 12px 24px; font-size: 15px; font-weight: 900; cursor: pointer; }

    .preset-retro { background: #0B0D17; color: #FFFFFF; border: 1px solid rgba(0,240,255,0.4); box-shadow: 0 0 20px rgba(0,240,255,0.15); }
    .preset-retro .live-nav { display: flex; justify-content: space-between; font-family: monospace; color: #00F0FF; font-size: 13px; }
    .preset-retro .live-hero-title { font-size: 34px; font-weight: 900; color: #00F0FF; text-shadow: 0 0 10px rgba(0,240,255,0.6); margin: 20px 0 12px 0; }
    .preset-retro .live-hero-desc { font-size: 14px; color: #94A3B8; margin-bottom: 24px; }
    .preset-retro .live-btn { background: transparent; color: #FF007F; border: 2px solid #FF007F; box-shadow: 0 0 10px rgba(255,0,127,0.4); padding: 10px 24px; font-weight: 800; font-family: monospace; }

    .preset-kinetic { background: #000000; color: #FFFFFF; }
    .preset-kinetic .live-nav { display: flex; justify-content: space-between; font-weight: 900; color: #FFE500; }
    .preset-kinetic .live-hero-title { font-size: 44px; font-weight: 900; line-height: 0.95; letter-spacing: -0.04em; text-transform: uppercase; margin: 18px 0 12px 0; }
    .preset-kinetic .live-hero-desc { font-size: 14px; color: #888; margin-bottom: 24px; }
    .preset-kinetic .live-btn { background: #FFE500; color: #000; border: none; padding: 12px 28px; font-weight: 900; font-size: 15px; letter-spacing: 0.05em; }

    .preset-game { background: #F8FAFC; color: #0F172A; border: 1px solid #E2E8F0; }
    .preset-game .live-nav { display: flex; justify-content: space-between; font-weight: 700; color: #4F46E5; }
    .preset-game .live-hero-title { font-size: 32px; font-weight: 800; margin: 18px 0 12px 0; }
    .preset-game .live-hero-desc { font-size: 15px; color: #64748B; margin-bottom: 24px; }
    .preset-game .live-btn { background: #6366F1; color: #FFFFFF; border: none; padding: 12px 26px; border-radius: 12px; font-weight: 700; box-shadow: 0 4px 12px rgba(99,102,241,0.3); }

    /* Filter Nav Tabs */
    .filter-nav {
      max-width: 1600px;
      margin: 40px auto 24px auto;
      padding: 0 40px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .filter-tabs-group { display: flex; gap: 8px; flex-wrap: wrap; }
    .filter-tab {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .filter-tab:hover {
      color: var(--text-main);
      background: var(--bg-surface-elevated);
      border-color: var(--border-strong);
    }
    .filter-tab.active {
      background: var(--accent);
      color: #0B0E14;
      border-color: var(--accent);
      box-shadow: 0 2px 12px var(--accent-glow);
    }
    .view-toggles {
      display: flex;
      gap: 6px;
      background: var(--bg-surface);
      padding: 4px;
      border-radius: 10px;
      border: 1px solid var(--border-subtle);
    }
    .btn-view-toggle {
      background: transparent;
      border: none;
      color: var(--text-dim);
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    .btn-view-toggle.active {
      background: var(--bg-card);
      color: var(--text-main);
    }

    /* Gallery Grid */
    main.gallery-container {
      max-width: 1600px;
      margin: 0 auto 80px auto;
      padding: 0 40px;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
      gap: 36px;
      transition: all 0.3s ease;
    }
    .gallery-grid.view-wide { grid-template-columns: repeat(auto-fill, minmax(680px, 1fr)); }
    .gallery-grid.view-single { grid-template-columns: 1fr; max-width: 1080px; margin: 0 auto; }

    /* Card Component */
    .gallery-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .gallery-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
      border-color: var(--border-strong);
    }

    .card-image-box {
      width: 100%;
      height: 280px;
      background: #000;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    .view-wide .card-image-box { height: 380px; }
    .view-single .card-image-box { height: 520px; }
    .mockup-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.4s ease;
    }
    .card-image-box:hover .mockup-img { transform: scale(1.025); }
    .image-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(11, 14, 20, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      opacity: 0;
      transition: opacity 0.25s ease;
      padding: 20px;
    }
    .card-image-box:hover .image-overlay { opacity: 1; }
    .btn-overlay-zoom, .btn-overlay-dl {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 10px 18px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-overlay-zoom:hover, .btn-overlay-dl:hover {
      background: var(--accent);
      color: #0B0E14;
      border-color: var(--accent);
      transform: scale(1.05);
    }
    .card-badge-num {
      position: absolute;
      top: 14px; left: 14px;
      background: rgba(11, 14, 20, 0.75);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.05em;
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .card-body {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .card-meta-row { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .badge-category {
      font-size: 11px; font-weight: 700;
      background: rgba(56, 189, 248, 0.12); color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.25); padding: 3px 10px; border-radius: 6px;
      text-transform: uppercase;
    }
    .badge-intensity {
      font-size: 11px; font-weight: 600;
      background: var(--bg-surface); color: var(--text-muted);
      border: 1px solid var(--border-subtle); padding: 3px 10px; border-radius: 6px;
    }
    .card-title { font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
    .card-kor-title { font-size: 14px; font-weight: 600; color: var(--accent); margin-top: 3px; margin-bottom: 12px; }
    .card-summary { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 18px; }
    .highlights-container { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
    .highlight-tag {
      font-size: 12px; background: var(--bg-surface); color: var(--text-main);
      padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border-subtle);
    }

    /* Palette Swatches */
    .palette-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      margin-bottom: 18px;
    }
    .palette-label {
      font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;
      display: flex; justify-content: space-between;
    }
    .palette-label .tip-inline { font-size: 11px; font-weight: 400; color: var(--text-dim); }
    .swatches-row { display: flex; gap: 10px; align-items: center; }
    .swatch {
      width: 32px; height: 32px; border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      cursor: pointer; position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .swatch:hover { transform: scale(1.18); z-index: 5; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
    .swatch-tip {
      display: none; position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%);
      background: #000; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px;
      white-space: nowrap; pointer-events: none;
    }
    .swatch:hover .swatch-tip { display: block; }

    /* Action Bar (Customizer + Sandbox + Component Kit + Starter Download) */
    .card-action-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .btn-customizer-open {
      flex: 1.1;
      background: linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(99,102,241,0.15) 100%);
      border: 1px solid var(--accent);
      color: #FFFFFF;
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .btn-customizer-open:hover {
      background: var(--accent);
      color: #0B0E14;
      box-shadow: 0 4px 12px var(--accent-glow);
    }
    .btn-component-kit {
      background: rgba(168, 85, 247, 0.12);
      border: 1px solid rgba(168, 85, 247, 0.35);
      color: #C084FC;
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .btn-component-kit:hover {
      background: #A855F7;
      color: #0B0E14;
      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.25);
    }
    .btn-send-sandbox {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .btn-send-sandbox:hover {
      background: var(--bg-surface-elevated);
      color: var(--text-main);
      border-color: var(--border-strong);
    }
    .btn-download-starter {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #10B981;
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .btn-download-starter:hover {
      background: #10B981;
      color: #0B0E14;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
    }

    /* 3번: AI Tool Presets Bar */
    .ai-tool-presets-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      flex-wrap: wrap;
      background: rgba(0, 0, 0, 0.25);
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px dashed var(--border-subtle);
    }
    .preset-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-dim);
    }
    .btn-preset-copy {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .btn-preset-copy:hover {
      background: var(--accent);
      color: #0B0E14;
      border-color: var(--accent);
      box-shadow: 0 2px 6px var(--accent-glow);
    }

    /* Prompt Section */
    .prompt-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 18px;
      margin-top: auto;
      display: flex;
      flex-direction: column;
    }
    .prompt-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px; gap: 10px; flex-wrap: wrap;
    }
    .prompt-title-tag {
      font-size: 13px; font-weight: 700; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
    }
    .btn-copy-prompt {
      background: var(--accent); color: #0B0E14; border: none;
      padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: all 0.2s ease; font-family: inherit;
    }
    .btn-copy-prompt:hover { background: var(--accent-hover); box-shadow: 0 2px 10px var(--accent-glow); }
    .btn-copy-prompt.copied { background: var(--success); color: #FFFFFF; }

    .prompt-preview-wrap {
      background: #0A0D14;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      overflow: hidden; max-height: 160px;
      transition: max-height 0.4s ease;
    }
    .prompt-preview-wrap.expanded { max-height: 600px; overflow-y: auto; }
    .prompt-code-block {
      padding: 14px; font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-size: 12px; line-height: 1.6; color: #CBD5E1;
      white-space: pre-wrap; word-break: break-all;
    }
    .btn-expand-toggle {
      background: transparent; border: 1px solid var(--border-subtle); color: var(--accent);
      margin-top: 10px; padding: 8px 14px; border-radius: var(--radius-sm);
      font-size: 12px; font-weight: 600; cursor: pointer; display: flex;
      align-items: center; justify-content: center; gap: 8px;
      transition: all 0.2s ease; font-family: inherit;
    }
    .btn-expand-toggle:hover { background: var(--bg-surface-elevated); border-color: var(--accent); }

    /* Modals Base */
    .customizer-modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(7, 9, 13, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 2500;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.25s ease;
    }
    .customizer-modal-backdrop.active { opacity: 1; visibility: visible; }
    .customizer-modal-window {
      max-width: 1040px;
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-xl);
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 90vh;
    }
    .customizer-header {
      padding: 20px 28px;
      background: var(--bg-main);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .customizer-header h3 {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .customizer-body {
      padding: 28px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 28px;
    }
    .customizer-controls { display: flex; flex-direction: column; gap: 18px; }
    .form-group-custom { display: flex; flex-direction: column; gap: 8px; }
    .form-group-custom label { font-size: 13px; font-weight: 700; color: var(--accent); }
    .custom-input {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 10px 14px;
      color: var(--text-main);
      font-size: 14px;
      font-family: inherit;
      outline: none;
    }
    .custom-input:focus { border-color: var(--accent); }

    .tag-selector-group { display: flex; gap: 8px; flex-wrap: wrap; }
    .tag-choice-btn {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }
    .tag-choice-btn.selected {
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent);
      border-color: var(--accent);
      font-weight: 700;
    }

    .color-picker-row { display: flex; gap: 12px; align-items: center; }
    .color-picker-input { width: 44px; height: 38px; border: none; background: transparent; cursor: pointer; }

    .customizer-output-pane {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .customizer-output-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .custom-prompt-result-box {
      background: #080B10;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 14px;
      font-family: monospace;
      font-size: 12px;
      color: #A5F3FC;
      line-height: 1.6;
      flex-grow: 1;
      overflow-y: auto;
      max-height: 360px;
      white-space: pre-wrap;
      margin-bottom: 16px;
    }
    .btn-copy-custom-prompt {
      background: var(--accent);
      color: #0B0E14;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-copy-custom-prompt:hover {
      background: var(--accent-hover);
      box-shadow: 0 4px 14px var(--accent-glow);
    }

    /* Component Kit Modal Styles */
    .compkit-modal-window {
      max-width: 1100px;
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-xl);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 92vh;
    }
    .compkit-tabs-bar {
      display: flex;
      background: var(--bg-main);
      padding: 8px 24px;
      gap: 10px;
      border-bottom: 1px solid var(--border-subtle);
      overflow-x: auto;
    }
    .compkit-tab-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      font-family: inherit;
    }
    .compkit-tab-btn:hover { color: var(--text-main); background: var(--bg-surface-elevated); }
    .compkit-tab-btn.active {
      background: var(--accent);
      color: #0B0E14;
      border-color: var(--accent);
      box-shadow: 0 2px 8px var(--accent-glow);
    }
    .compkit-body {
      padding: 28px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .compkit-preview-panel {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 320px;
    }
    .compkit-code-panel {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .compkit-code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .code-format-toggles {
      display: flex;
      gap: 4px;
      background: var(--bg-surface);
      padding: 3px;
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
    }
    .btn-format-toggle {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }
    .btn-format-toggle.active {
      background: var(--accent);
      color: #0B0E14;
    }
    .compkit-code-display {
      background: #080B10;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 14px;
      font-family: monospace;
      font-size: 12px;
      color: #A5F3FC;
      line-height: 1.5;
      max-height: 280px;
      overflow-y: auto;
      white-space: pre-wrap;
      flex-grow: 1;
      margin-bottom: 14px;
    }

    /* AI Studio Modal Styles */
    .studio-step-card {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 18px;
    }
    .studio-step-badge {
      display: inline-block;
      background: rgba(236, 72, 153, 0.15);
      color: #F472B6;
      border: 1px solid rgba(236, 72, 153, 0.3);
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      margin-bottom: 10px;
    }

    /* Zoom Modal & Toast */
    .modal-backdrop {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(7, 9, 13, 0.88); backdrop-filter: blur(12px);
      z-index: 2000; display: flex; align-items: center; justify-content: center;
      padding: 40px; opacity: 0; visibility: hidden; transition: all 0.25s ease;
    }
    .modal-backdrop.active { opacity: 1; visibility: visible; }
    .modal-content-wrap {
      max-width: 1300px; width: 100%; background: var(--bg-card);
      border: 1px solid var(--border-strong); border-radius: var(--radius-xl);
      overflow: hidden; display: flex; flex-direction: column;
    }
    .modal-header {
      padding: 16px 24px; border-bottom: 1px solid var(--border-subtle);
      display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface);
    }
    .modal-title { font-size: 17px; font-weight: 700; color: #FFFFFF; }
    .btn-modal-close {
      background: transparent; border: none; color: var(--text-muted);
      cursor: pointer; font-size: 24px; line-height: 1; padding: 4px;
    }
    .btn-modal-close:hover { color: #FFFFFF; }
    .modal-image-display {
      width: 100%; max-height: 80vh; overflow-y: auto; background: #000;
      display: flex; align-items: center; justify-content: center;
    }
    .modal-image-display img { max-width: 100%; height: auto; display: block; }

    .toast-container {
      position: fixed; bottom: 30px; right: 30px; z-index: 3000;
      display: flex; flex-direction: column; gap: 10px; pointer-events: none;
    }
    .toast-msg {
      background: #10B981; color: #FFFFFF; padding: 14px 22px; border-radius: 12px;
      font-size: 14px; font-weight: 700; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      display: flex; align-items: center; gap: 10px; animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      pointer-events: auto;
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes toastOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(-10px) scale(0.95); }
    }

    footer.site-footer {
      border-top: 1px solid var(--border-subtle); background: var(--bg-surface);
      padding: 50px 40px; text-align: center; color: var(--text-dim); font-size: 14px;
    }
    .footer-inner {
      max-width: 1600px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; align-items: center;
    }
    .footer-brand { font-size: 18px; font-weight: 800; color: var(--text-main); }

    /* 🌟 디자인 토큰 스튜디오 & 반응형 뷰포트 스타일 */
    .viewport-controls-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 8px 16px;
      margin-top: 14px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .device-buttons-group {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .device-btn {
      background: transparent;
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      font-family: inherit;
    }
    .device-btn:hover {
      color: var(--text-main);
      background: var(--bg-surface-elevated);
    }
    .device-btn.active {
      background: var(--accent);
      color: #0B0E14;
      border-color: var(--accent);
      box-shadow: 0 2px 8px var(--accent-glow);
    }
    .token-toolbar-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .btn-token-studio-toggle {
      background: linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(168,85,247,0.15) 100%);
      border: 1px solid rgba(56,189,248,0.4);
      color: #38BDF8;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-token-studio-toggle:hover {
      background: linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(168,85,247,0.25) 100%);
      transform: translateY(-1px);
    }
    .btn-token-export-open {
      background: var(--accent);
      border: none;
      color: #0B0E14;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-token-export-open:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    /* 토큰 스튜디오 접이식 패널 */
    .token-studio-panel {
      background: #0D111A;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-top: 14px;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
      display: none;
      animation: fadeInSlide 0.25s ease-out;
    }
    .token-studio-panel.active {
      display: block;
    }
    @keyframes fadeInSlide {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .token-studio-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 10px;
    }
    .token-controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .token-control-item {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .token-control-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
    }
    .token-val-badge {
      background: #080B10;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      color: #38BDF8;
      border: 1px solid var(--border-subtle);
    }
    .token-slider {
      width: 100%;
      accent-color: var(--accent);
      cursor: pointer;
    }
    .token-color-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .token-color-picker {
      -webkit-appearance: none;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      cursor: pointer;
      background: transparent;
    }
    .token-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
    .token-color-picker::-webkit-color-swatch { border: 1px solid var(--border-strong); border-radius: 6px; }

    /* 반응형 뷰포트 컨테이너 스타일 */
    .sandbox-stage-wrapper {
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      margin: 0 auto;
    }
    .sandbox-stage-wrapper.viewport-desktop {
      max-width: 100%;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
    .sandbox-stage-wrapper.viewport-tablet {
      max-width: 768px;
      border: 10px solid #1E293B;
      border-radius: 28px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8);
      overflow: hidden;
    }
    .sandbox-stage-wrapper.viewport-mobile {
      max-width: 390px;
      border: 12px solid #0F172A;
      border-radius: 38px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.9);
      overflow: hidden;
      position: relative;
    }
    .sandbox-stage-wrapper.viewport-mobile::before {
      content: '';
      display: block;
      width: 90px;
      height: 18px;
      background: #000;
      border-radius: 12px;
      margin: 8px auto 4px auto;
      z-index: 10;
      position: relative;
    }

    /* 토큰 오버라이드 실시간 주입 */
    .live-mockup-wrapper {
      border-radius: var(--tk-radius, 16px);
      filter: brightness(var(--tk-surface-brightness, 1));
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

    @media (max-width: 900px) {
      .sandbox-inputs-grid { grid-template-columns: 1fr; }
      .customizer-body { grid-template-columns: 1fr; }
      .compkit-body { grid-template-columns: 1fr; }
      #sandbox-ab-stage { grid-template-columns: 1fr; }
      .gallery-grid { grid-template-columns: 1fr; }
    }

    /* Injected Presets, Component Kit, and Agentic Critic CSS */
    ${extraPresetCss}
    ${extraKitCss}
    ${extraAgenticCss}
  </style>
</head>
<body>

  <!-- Top Sticky Header -->
  <header class="site-header">
    <div class="header-inner">
      <div class="brand-logo-wrap">
        <div class="brand-icon">🎨</div>
        <div class="brand-title-box">
          <h1>지누의 디자인 공작소 <span class="brand-badge">PRO v3.0</span></h1>
          <p>16대 디자인 시스템 · 실시간 샌드박스 · 컴포넌트 킷 · AI 새 스타일 제작소</p>
        </div>
      </div>

      <div class="header-nav-links">
        <button class="nav-btn-jump" onclick="scrollToElement('sandbox-anchor')">
          ⚡ 실시간 샌드박스
        </button>
        <button class="nav-btn-jump" onclick="scrollToElement('gallery-grid')">
          🖼️ 16대 갤러리 아카이브
        </button>
        <button class="nav-btn-jump btn-highlight-studio" onclick="openAIStudioModal()">
          ✨ AI 새 스타일 제작소
        </button>

        <div class="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="search-input" id="search-input" placeholder="스타일, 키워드 검색..." oninput="handleSearch()">
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Intro Banner -->
  <section class="hero-banner">
    <div class="hero-card">
      <div class="hero-tag">✨ ALL-IN-ONE VIBE CODING DESIGN LAB</div>
      <h2 class="hero-title">상상하던 디자인 시스템을<br>실시간 샌드박스로 테스트하고 5대 컴포넌트 킷으로 즉시 구현하세요.</h2>
      <p class="hero-desc">
        '지누의 디자인 공작소'가 <strong>[5대 UI 컴포넌트 킷]</strong>과 <strong>[AI 새 스타일 제작소 & 동적 갤러리 확장]</strong>을 탑재하여 완벽하게 고도화되었습니다.
        버튼·입력폼·카드·배지 코드를 원클릭으로 복사하고, 당신만의 17번째 스타일을 정의하여 갤러리에 영구 보관해 보세요.
      </p>
      <div class="hero-features">
        <div class="hero-feature-item">
          <span class="icon">🧩</span>
          <span><strong>1번:</strong> 버튼·인풋·카드·배지·네비 5대 실무 컴포넌트 킷 & Tailwind/HTML 코드</span>
        </div>
        <div class="hero-feature-item">
          <span class="icon">✨</span>
          <span><strong>2번:</strong> 무설치 AI 새 스타일 생성기 & 17번째 커스텀 카드 동적 등록</span>
        </div>
        <div class="hero-feature-item">
          <span class="icon">⚡</span>
          <span><strong>기존:</strong> 실시간 샌드박스 & A/B 비교, 도구별(v0/Claude/Cursor) 내보내기, 템플릿 다운로드</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 1번 고도화: 실시간 인터랙티브 샌드박스 & A/B 비교 영역 -->
  <div id="sandbox-anchor"></div>
  <section class="sandbox-section">
    <div class="sandbox-container">
      <div class="sandbox-header-row">
        <div class="sandbox-title-wrap">
          <h2>⚡ 실시간 인터랙티브 샌드박스 & A/B 비교 스튜디오</h2>
          <p>내 프로젝트 제목과 소개 문구를 입력하면 선택한 디자인 스타일로 즉시 실시간 렌더링됩니다.</p>
        </div>

        <div class="sandbox-mode-toggles">
          <button class="btn-sandbox-mode active" id="btn-mode-single" onclick="setSandboxMode('single')">
            단일 스타일 라이브 뷰
          </button>
          <button class="btn-sandbox-mode" id="btn-mode-ab" onclick="setSandboxMode('ab')">
            ⚖️ A/B 스플릿 비교 모드
          </button>
        </div>
      </div>

      <div class="sandbox-inputs-grid">
        <div class="input-field-group">
          <label>프로젝트 / 서비스 타이틀</label>
          <input type="text" class="sandbox-text-input" id="sb-input-title" value="지누의 차세대 AI 공작소" oninput="updateLiveRender()">
        </div>
        <div class="input-field-group">
          <label>서브 카피 & 안내 설명</label>
          <input type="text" class="sandbox-text-input" id="sb-input-desc" value="인공지능과 디자인의 본질이 만나는 가장 직관적인 창작 공간입니다." oninput="updateLiveRender()">
        </div>
        <div class="input-field-group">
          <label>CTA 액션 버튼 문구</label>
          <input type="text" class="sandbox-text-input" id="sb-input-btn" value="스튜디오 시작하기 ➔" oninput="updateLiveRender()">
        </div>
      </div>

      <div class="sandbox-selector-bar">
        <div class="style-select-box" id="sb-single-selector-wrap">
          <label>적용할 디자인 스타일:</label>
          <select class="style-dropdown" id="sb-style-select" onchange="onSandboxStyleChange()">
            ${styleOptionsHtml}
          </select>
        </div>

        <div class="style-select-box" id="sb-ab-selector-wrap" style="display:none; gap:20px;">
          <div>
            <label style="color:#38BDF8;">Style A:</label>
            <select class="style-dropdown" id="sb-style-a" onchange="updateLiveRender()">
              ${styleOptionsHtml}
            </select>
          </div>
          <div>
            <label style="color:#F59E0B;">Style B:</label>
            <select class="style-dropdown" id="sb-style-b" onchange="updateLiveRender()">
              <option value="09" selected>09. Modern Neo-Brutalism (모던 네오-브루탈리즘)</option>
              ${styleOptionsHtml}
            </select>
          </div>
        </div>

        <div style="font-size:12px; color:var(--text-dim);">
          💡 입력창을 수정하면 아래 렌더링 화면에 실시간 동기화됩니다.
        </div>
      </div>

      <!-- 🌟 디바이스 뷰포트 스위처 & 토큰 스튜디오 툴바 -->
      <div class="viewport-controls-bar">
        <div class="device-buttons-group">
          <span style="font-size:11px; font-weight:800; color:var(--text-dim); margin-right:4px;">VIEWPORT:</span>
          <button class="device-btn active" id="btn-device-desktop" onclick="setViewportMode('desktop')">💻 Desktop (Full)</button>
          <button class="device-btn" id="btn-device-tablet" onclick="setViewportMode('tablet')">📱 Tablet (768px)</button>
          <button class="device-btn" id="btn-device-mobile" onclick="setViewportMode('mobile')">📱 Mobile (390px)</button>
        </div>

        <div class="token-toolbar-actions">
          <button class="btn-token-studio-toggle" id="btn-toggle-token-studio" onclick="toggleTokenStudio()">
            🎛️ 디자인 토큰 스튜디오 <span style="font-size:10px; opacity:0.8;">(실시간 튜닝)</span>
          </button>
          <button class="btn-token-export-open" onclick="openTokenExportModal()">
            📋 토큰 코드 내보내기
          </button>
        </div>
      </div>

      <!-- 🌟 디자인 토큰 스튜디오 접이식 패널 -->
      <div class="token-studio-panel" id="token-studio-panel">
        <div class="token-studio-header">
          <div>
            <span style="font-size:14px; font-weight:800; color:#38BDF8;">🎛️ 실시간 디자인 토큰 튜너</span>
            <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">슬라이더를 움직이면 아래 샌드박스와 컴포넌트에 즉시 반영됩니다.</span>
          </div>
          <button onclick="resetTokensToDefault()" style="background:transparent; border:1px solid var(--border-subtle); color:var(--text-muted); font-size:11px; padding:4px 10px; border-radius:6px; cursor:pointer;">
            ↺ 프리셋 기본값 리셋
          </button>
        </div>

        <div class="token-controls-grid">
          <!-- 1. Primary Accent Color -->
          <div class="token-control-item">
            <div class="token-control-label">
              <span>🎨 프라이머리 컬러 (Accent)</span>
              <span class="token-val-badge" id="val-badge-color">#0071E3</span>
            </div>
            <div class="token-color-wrap">
              <input type="color" class="token-color-picker" id="tk-picker-color" value="#0071E3" oninput="updateToken('primary', this.value)">
              <input type="text" class="custom-input" id="tk-input-color-hex" value="#0071E3" style="padding:6px 10px; font-size:12px; font-family:monospace;" onchange="updateToken('primary', this.value)">
            </div>
          </div>

          <!-- 2. Border Radius -->
          <div class="token-control-item">
            <div class="token-control-label">
              <span>🔲 모서리 곡률 (Radius)</span>
              <span class="token-val-badge" id="val-badge-radius">16px</span>
            </div>
            <input type="range" class="token-slider" id="tk-slider-radius" min="0" max="32" value="16" oninput="updateToken('radius', this.value)">
          </div>

          <!-- 3. Shadow / Elevation -->
          <div class="token-control-item">
            <div class="token-control-label">
              <span>🌫️ 그림자 깊이 (Elevation)</span>
              <span class="token-val-badge" id="val-badge-shadow">Level 2</span>
            </div>
            <input type="range" class="token-slider" id="tk-slider-shadow" min="0" max="4" value="2" oninput="updateToken('shadowDepth', this.value)">
          </div>

          <!-- 4. Surface Brightness -->
          <div class="token-control-item">
            <div class="token-control-label">
              <span>🌓 서피스 명도 (Brightness)</span>
              <span class="token-val-badge" id="val-badge-brightness">100%</span>
            </div>
            <input type="range" class="token-slider" id="tk-slider-brightness" min="80" max="120" value="100" oninput="updateToken('brightness', this.value)">
          </div>

          <!-- 5. Letter Spacing -->
          <div class="token-control-item">
            <div class="token-control-label">
              <span>🔤 타이포 자간 (Tracking)</span>
              <span class="token-val-badge" id="val-badge-tracking">0.0px</span>
            </div>
            <input type="range" class="token-slider" id="tk-slider-tracking" min="-10" max="30" value="0" step="5" oninput="updateToken('tracking', this.value / 10)">
          </div>
        </div>
      </div>

      <!-- 🌟 Agentic Real-time Critic & Auto-Fix Panel -->
      ${criticPanelHtml}

      <div class="sandbox-stage-wrapper viewport-desktop" id="sandbox-stage-wrapper">
        <div id="sandbox-single-stage"></div>
        <div id="sandbox-ab-stage">
          <div class="ab-side-pane">
            <div class="ab-side-header">
              <span id="ab-label-a" style="color:#38BDF8;">STYLE A</span>
              <span>LIVE RENDER</span>
            </div>
            <div class="ab-stage-box" id="ab-box-a"></div>
          </div>
          <div class="ab-side-pane">
            <div class="ab-side-header">
              <span id="ab-label-b" style="color:#F59E0B;">STYLE B</span>
              <span>LIVE RENDER</span>
            </div>
            <div class="ab-stage-box" id="ab-box-b"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter Navigation & View Controls -->
  <section class="filter-nav">
    <div class="filter-tabs-group">
      <button class="filter-tab active" onclick="setFilter('all', this)">전체 보기</button>
      <button class="filter-tab" onclick="setFilter('minimal', this)">미니멀 & 절제</button>
      <button class="filter-tab" onclick="setFilter('functional', this)">기능주의 & 그리드</button>
      <button class="filter-tab" onclick="setFilter('expressive', this)">익스프레시브 & 볼드</button>
      <button class="filter-tab" onclick="setFilter('warm', this)">내추럴 & 웜 UI</button>
      <button class="filter-tab" onclick="setFilter('tactile', this)">촉각 아날로그</button>
      <button class="filter-tab" onclick="setFilter('future', this)">퓨처 & 내러티브</button>
      <button class="filter-tab" onclick="setFilter('custom', this)" id="tab-custom-filter" style="display:none; color:#EC4899; border-color:#EC4899;">✨ 내 커스텀 스타일</button>
    </div>

    <div class="view-toggles">
      <button class="btn-view-toggle active" id="btn-view-grid" onclick="setViewMode('grid')">그리드 뷰</button>
      <button class="btn-view-toggle" id="btn-view-wide" onclick="setViewMode('wide')">와이드 뷰</button>
      <button class="btn-view-toggle" id="btn-view-single" onclick="setViewMode('single')">포커스 뷰</button>
    </div>
  </section>

  <!-- Gallery Main Area -->
  <main class="gallery-container">
    <div class="gallery-grid" id="gallery-grid">
      ${fullCardsHtml}
    </div>
  </main>

  <!-- 2번: 프로젝트 맞춤형 프롬프트 생성기 모달 -->
  <div class="customizer-modal-backdrop" id="customizer-modal" onclick="closeCustomizerModal(event)">
    <div class="customizer-modal-window" onclick="event.stopPropagation()">
      <div class="customizer-header">
        <h3>🎯 프로젝트 맞춤형 프롬프트 생성기</h3>
        <button class="btn-modal-close" onclick="closeCustomizerModal()">&times;</button>
      </div>

      <div class="customizer-body">
        <div class="customizer-controls">
          <div class="form-group-custom">
            <label>기반 디자인 스타일</label>
            <div id="cust-selected-style-name" style="font-size:15px; font-weight:800; color:#FFFFFF;">01. Apple-inspired Premium Minimal</div>
          </div>

          <div class="form-group-custom">
            <label>프로젝트 / 프로덕트 명칭</label>
            <input type="text" class="custom-input" id="cust-project-name" value="진우의 차세대 AI 교육 플랫폼" oninput="regenerateCustomPrompt()">
          </div>

          <div class="form-group-custom">
            <label>프로젝트 도메인 (유형)</label>
            <div class="tag-selector-group" id="cust-domain-tags">
              <button class="tag-choice-btn selected" onclick="selectDomainTag(this, '에듀테크 및 교사·학생 학습 플랫폼')">📚 에듀테크/학습</button>
              <button class="tag-choice-btn" onclick="selectDomainTag(this, '생산성 SaaS 및 데이터 대시보드')">💻 SaaS/대시보드</button>
              <button class="tag-choice-btn" onclick="selectDomainTag(this, '크리에이티브 포트폴리오 및 갤러리')">🎨 포트폴리오</button>
              <button class="tag-choice-btn" onclick="selectDomainTag(this, '스타트업 공식 서비스 랜딩페이지')">🚀 서비스 랜딩</button>
              <button class="tag-choice-btn" onclick="selectDomainTag(this, '디지털 굿즈 및 프롬프트 마켓플레이스')">🛍️ 이커머스</button>
            </div>
          </div>

          <div class="form-group-custom">
            <label>브랜드 메인 악센트 컬러</label>
            <div class="color-picker-row">
              <input type="color" class="color-picker-input" id="cust-color-picker" value="#38BDF8" onchange="onColorPicked(this.value)">
              <span id="cust-color-hex" style="font-family:monospace; font-weight:700; font-size:14px; color:var(--accent);">#38BDF8</span>
              <button class="tag-choice-btn" onclick="setCustColor('#0071E3')">Apple Blue</button>
              <button class="tag-choice-btn" onclick="setCustColor('#6750A4')">M3 Purple</button>
              <button class="tag-choice-btn" onclick="setCustColor('#FFE600')">Brutal Yellow</button>
              <button class="tag-choice-btn" onclick="setCustColor('#C46849')">Terracotta</button>
            </div>
          </div>

          <div class="form-group-custom">
            <label>주요 타깃 사용자</label>
            <select class="custom-input" id="cust-target-user" onchange="regenerateCustomPrompt()">
              <option value="고등학교 교사 및 중고등학생">고등학교 교사 및 중고등학생 (가독성 & 신뢰감 최우선)</option>
              <option value="테크 얼리어답터 및 크리에이터">테크 얼리어답터 및 크리에이터 (감각적 완성도)</option>
              <option value="일반 대중 및 초보자">일반 대중 및 초보자 (직관적 쉬운 UI)</option>
              <option value="기업 B2B 실무자 및 의사결정권자">기업 B2B 실무자 (데이터 밀도 & 기능성)</option>
            </select>
          </div>

          <div class="form-group-custom">
            <label>구현할 핵심 기능 (자유 서술)</label>
            <input type="text" class="custom-input" id="cust-core-features" value="수능 영어 지문 분석, 변형문제 생성, 실시간 프롬프트 복사 기능" oninput="regenerateCustomPrompt()">
          </div>
        </div>

        <div class="customizer-output-pane">
          <div>
            <div class="customizer-output-title">
              <span>생성된 실전 마스터 프롬프트</span>
              <span style="color:var(--accent); font-size:11px;">READY TO PASTE</span>
            </div>
            <div class="custom-prompt-result-box" id="cust-prompt-output"></div>
          </div>

          <button class="btn-copy-custom-prompt" onclick="copyCustomPrompt()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            맞춤형 프롬프트 복사하기 📋
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 🌟 고도화 1: 5대 핵심 UI 컴포넌트 킷 모달 -->
  <div class="modal-backdrop" id="component-kit-modal" onclick="closeComponentKitModal(event)">
    <div class="compkit-modal-window" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div>
          <div class="modal-title" id="compkit-title">UI 컴포넌트 킷</div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:2px;" id="compkit-subtitle">실시간 인터랙티브 프리뷰 & 코드 복사</div>
        </div>
        <button class="btn-modal-close" onclick="closeComponentKitModal()">&times;</button>
      </div>

      <div class="compkit-tabs-bar">
        <button class="compkit-tab-btn active" id="tab-btn-buttons" onclick="switchKitTab('buttons', this)">🔘 버튼 (Buttons)</button>
        <button class="compkit-tab-btn" id="tab-btn-inputs" onclick="switchKitTab('inputs', this)">📝 입력 폼 (Inputs)</button>
        <button class="compkit-tab-btn" id="tab-btn-card" onclick="switchKitTab('card', this)">🃏 카드 (Cards)</button>
        <button class="compkit-tab-btn" id="tab-btn-badges" onclick="switchKitTab('badges', this)">🏷️ 배지/태그 (Badges)</button>
        <button class="compkit-tab-btn" id="tab-btn-nav" onclick="switchKitTab('nav', this)">🧭 네비게이션 (Navigation)</button>
      </div>

      <div class="compkit-body">
        <div class="compkit-preview-panel" id="compkit-preview-stage"></div>

        <div class="compkit-code-panel">
          <div>
            <div class="compkit-code-header">
              <span style="font-size:12px; font-weight:700; color:var(--text-muted);">컴포넌트 소스코드</span>
              <div class="code-format-toggles">
                <button class="btn-format-toggle active" id="btn-format-html" onclick="switchKitCodeFormat('html')">HTML+CSS</button>
                <button class="btn-format-toggle" id="btn-format-tw" onclick="switchKitCodeFormat('tailwind')">Tailwind v4</button>
              </div>
            </div>
            <pre class="compkit-code-display" id="compkit-code-text"></pre>
          </div>

          <button class="btn-copy-custom-prompt" onclick="copyKitCode()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            컴포넌트 코드 복사하기 📋
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 🌟 고도화 2: AI 새 스타일 제작소 & 동적 갤러리 등록 모달 -->
  <div class="modal-backdrop" id="ai-studio-modal" onclick="closeAIStudioModal(event)">
    <div class="customizer-modal-window" style="max-width:1150px;" onclick="event.stopPropagation()">
      <div class="customizer-header" style="background:linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.15) 100%);">
        <h3>✨ AI 새 스타일 제작소 (Style Generator & Gallery Extender)</h3>
        <button class="btn-modal-close" onclick="closeAIStudioModal()">&times;</button>
      </div>

      <div class="customizer-body" style="grid-template-columns:1fr 1fr;">
        <!-- Step 1 Meta Prompt -->
        <div class="studio-step-card">
          <span class="studio-step-badge">STEP 1. 메타 프롬프트 생성</span>
          <div style="font-size:15px; font-weight:800; color:#FFFFFF; margin-bottom:8px;">원하는 새 스타일 정의하기</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
            새로운 디자인 아이디어를 적으면 Claude / ChatGPT에 바로 붙여넣을 수 있는 정교한 메타 프롬프트를 완성해 드립니다.
          </p>

          <div class="form-group-custom" style="margin-bottom:12px;">
            <label>새 스타일 명칭 (예: Cyberpunk Noir, Kinfolk Minimal)</label>
            <input type="text" class="custom-input" id="studio-style-name" value="사이버펑크 네온 느와르 (Cyberpunk Neon Noir)" oninput="updateStudioMetaPrompt()">
          </div>

          <div class="form-group-custom" style="margin-bottom:12px;">
            <label>핵심 감성 & 디자인 키워드</label>
            <input type="text" class="custom-input" id="studio-style-keywords" value="비 내리는 미래 도시의 네온 불빛, 딥 다크 퍼플, 사이안 포인트, 미세한 노이즈" oninput="updateStudioMetaPrompt()">
          </div>

          <div class="form-group-custom" style="margin-bottom:14px;">
            <label>메인 컬러 팔레트</label>
            <input type="text" class="custom-input" id="studio-style-colors" value="#0A0714, #170E2E, #00F5FF, #FF0055, #E2D9F3" oninput="updateStudioMetaPrompt()">
          </div>

          <div style="margin-bottom:10px;">
            <div style="font-size:11px; font-weight:700; color:var(--text-dim); margin-bottom:6px;">생성된 메타 프롬프트 (클릭하여 복사 후 AI에 붙여넣기):</div>
            <pre class="compkit-code-display" id="studio-meta-output" style="max-height:160px; font-size:11px;"></pre>
          </div>

          <button class="btn-copy-custom-prompt" style="background:#EC4899; color:#fff;" onclick="copyStudioMetaPrompt()">
            📋 1단계 프롬프트 복사 (AI에 질문하기)
          </button>
        </div>

        <!-- Step 2 Register -->
        <div class="studio-step-card">
          <span class="studio-step-badge" style="background:rgba(16,185,129,0.15); color:#10B981; border-color:rgba(16,185,129,0.3);">STEP 2. 갤러리에 영구 등록</span>
          <div style="font-size:15px; font-weight:800; color:#FFFFFF; margin-bottom:8px;">AI 답변 붙여넣고 17번 카드로 등록</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
            AI(Claude/GPT)가 작성해 준 스타일 가이드를 아래에 붙여넣고 등록하면, 갤러리에 17번째 카드로 즉각 추가되며 샌드박스에서도 바로 렌더링됩니다.
          </p>

          <div class="form-group-custom" style="margin-bottom:12px;">
            <label>AI 응답 전문 붙여넣기 (가이드라인 텍스트)</label>
            <textarea class="custom-input" id="studio-ai-response" rows="7" style="resize:vertical; font-family:monospace; font-size:11px;" placeholder="Claude나 ChatGPT가 출력한 디자인 시스템 프롬프트 전체를 여기에 붙여넣으세요..."></textarea>
          </div>

          <div class="form-group-custom" style="margin-bottom:16px;">
            <label>한 줄 소개 문구 (요약)</label>
            <input type="text" class="custom-input" id="studio-summary-input" placeholder="비 내리는 밤 네온 불빛과 딥 다크 퍼플이 교차하는 미래지향적 감각">
          </div>

          <button class="btn-copy-custom-prompt" style="background:#10B981; color:#fff;" onclick="registerCustomStyle()">
            ✨ 갤러리에 새 스타일 추가 & 영구 저장!
          </button>

          <div id="custom-styles-mgr" style="margin-top:20px; border-top:1px solid var(--border-subtle); padding-top:14px; display:none;">
            <div style="font-size:12px; font-weight:700; color:var(--text-muted); margin-bottom:8px; display:flex; justify-content:space-between;">
              <span>내가 등록한 커스텀 스타일</span>
              <button onclick="clearCustomStyles()" style="background:transparent; border:none; color:#EF4444; font-size:11px; cursor:pointer;">전체 초기화</button>
            </div>
            <div id="custom-styles-list" style="display:flex; flex-direction:column; gap:6px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 🌟 디자인 토큰 코드 익스포터 모달 -->
  <div class="modal-backdrop" id="token-export-modal" onclick="closeTokenExportModal(event)">
    <div class="customizer-modal-window" style="max-width:850px;" onclick="event.stopPropagation()">
      <div class="customizer-header" style="background:linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(99,102,241,0.15) 100%);">
        <div>
          <div class="modal-title" style="color:#38BDF8;">📋 디자인 토큰 코드 내보내기 (Export Tokens)</div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">실시간으로 튜닝된 컬러, 곡률, 그림자 토큰을 실무 프로젝트에 즉시 붙여넣으세요.</div>
        </div>
        <button class="btn-modal-close" onclick="closeTokenExportModal()">&times;</button>
      </div>

      <div style="padding:20px 28px;">
        <div class="code-format-toggles" style="margin-bottom:14px; width:fit-content;">
          <button class="btn-format-toggle active" id="tab-token-tailwind" onclick="switchTokenExportTab('tailwind')">Tailwind CSS v4 (@theme)</button>
          <button class="btn-format-toggle" id="tab-token-css" onclick="switchTokenExportTab('css')">표준 CSS (:root)</button>
          <button class="btn-format-toggle" id="tab-token-json" onclick="switchTokenExportTab('json')">Figma / W3C (JSON)</button>
        </div>

        <pre class="compkit-code-display" id="token-export-code" style="max-height:340px; font-size:12px;"></pre>

        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
          <button class="btn-copy-custom-prompt" style="background:#38BDF8; color:#0B0E14; width:auto; padding:10px 24px;" onclick="copyTokenExportCode()">
            토큰 코드 복사하기 📋
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Zoom Modal -->
  <div class="modal-backdrop" id="zoom-modal" onclick="closeZoomModal(event)">
    <div class="modal-content-wrap" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div class="modal-title" id="modal-title">디자인 구현 고해상도 확대</div>
        <button class="btn-modal-close" onclick="closeZoomModal()">&times;</button>
      </div>
      <div class="modal-image-display">
        <img id="modal-img" src="" alt="확대 이미지">
      </div>
    </div>
  </div>

  <!-- Toast Notification Center -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">지누의 디자인 공작소 (JINWOO'S DESIGN WORKSHOP)</div>
      <p>16 Core Design System Frameworks for Advanced AI Prompting & Next-Gen Interface Crafting</p>
      <p style="font-size:12px; color:#475569;">© 2026 JINWOO STUDIO. All prompts and mockups are crafted for high-performance creative production.</p>
    </div>
  </footer>

  <!-- Interactive JavaScript -->
  <script>
    const promptDataStore = ${JSON.stringify(promptsData.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      intensity: p.intensity,
      visualStyle: p.visualStyle,
      coreConcept: p.coreConcept,
      fullContent: p.fullContent
    })))};

    const styleMetaStore = ${JSON.stringify(styleMeta)};

    let currentCustomizerStyleId = '01-apple-inspired-premium-minimal-prompt';
    let currentDomain = '에듀테크 및 교사·학생 학습 플랫폼';
    let currentBrandColor = '#38BDF8';
    let sandboxMode = 'single';

    // ==========================================
    // 🌟 1번: 실시간 인터랙티브 샌드박스
    // ==========================================
    function setSandboxMode(mode) {
      sandboxMode = mode;
      document.getElementById('btn-mode-single').classList.toggle('active', mode === 'single');
      document.getElementById('btn-mode-ab').classList.toggle('active', mode === 'ab');

      const singleWrap = document.getElementById('sandbox-single-stage');
      const abWrap = document.getElementById('sandbox-ab-stage');
      const singleSel = document.getElementById('sb-single-selector-wrap');
      const abSel = document.getElementById('sb-ab-selector-wrap');

      if (mode === 'single') {
        singleWrap.style.display = 'flex';
        abWrap.style.display = 'none';
        singleSel.style.display = 'flex';
        abSel.style.display = 'none';
      } else {
        singleWrap.style.display = 'none';
        abWrap.style.display = 'grid';
        singleSel.style.display = 'none';
        abSel.style.display = 'flex';
      }
      updateLiveRender();
    }

    function renderMockupHtml(num, title, desc, btnText) {
      const n = parseInt(num, 10);
      let presetClass = 'preset-apple';
      if (n === 2) presetClass = 'preset-swiss';
      else if (n === 3) presetClass = 'preset-barely';
      else if (n === 5) presetClass = 'preset-material';
      else if (n === 6) presetClass = 'preset-warm';
      else if (n === 7) presetClass = 'preset-bento';
      else if (n === 8) presetClass = 'preset-bauhaus';
      else if (n === 9) presetClass = 'preset-brutal';
      else if (n === 12) presetClass = 'preset-retro';
      else if (n === 14) presetClass = 'preset-kinetic';
      else if (n === 16) presetClass = 'preset-game';

      return \`
        <div class="live-mockup-wrapper \${presetClass}">
          <div class="live-nav">
            <div><strong>\${title}</strong> / STUDIO</div>
            <div>VER. 2026 REF</div>
          </div>
          <div>
            <div class="live-hero-title">\${title}</div>
            <div class="live-hero-desc">\${desc}</div>
            <button class="live-btn">\${btnText}</button>
          </div>
          <div style="font-size:12px; opacity:0.6; display:flex; justify-content:space-between; margin-top:20px;">
            <span>STYLE #\${num.toString().padStart(2, '0')}</span>
            <span>JINWOO WORKSHOP ENGINE</span>
          </div>
        </div>
      \`;
    }

    function updateLiveRender() {
      const title = document.getElementById('sb-input-title').value || '지누의 디자인 공작소';
      const desc = document.getElementById('sb-input-desc').value || '디자인과 인공지능이 만나는 곳';
      const btnText = document.getElementById('sb-input-btn').value || '시작하기';

      if (sandboxMode === 'single') {
        const styleNum = document.getElementById('sb-style-select').value;
        const stage = document.getElementById('sandbox-single-stage');
        stage.innerHTML = renderMockupHtml(styleNum, title, desc, btnText);
      } else {
        const styleA = document.getElementById('sb-style-a').value;
        const styleB = document.getElementById('sb-style-b').value;
        
        document.getElementById('ab-label-a').innerText = 'STYLE #' + styleA;
        document.getElementById('ab-label-b').innerText = 'STYLE #' + styleB;

        document.getElementById('ab-box-a').innerHTML = renderMockupHtml(styleA, title, desc, btnText);
        document.getElementById('ab-box-b').innerHTML = renderMockupHtml(styleB, title, desc, btnText);
      }
      applyTokensToLiveStage();
    }

    // ==========================================
    // 🌟 고도화: 디자인 토큰 스튜디오 & 뷰포트
    // ==========================================
    let currentViewport = 'desktop';
    let isTokenStudioOpen = false;
    let currentTokenExportTab = 'tailwind';

    const styleDefaultTokens = {
      '01': { primary: '#0071E3', radius: 18, shadowDepth: 2, brightness: 100, tracking: -0.4 },
      '02': { primary: '#FF2A00', radius: 0, shadowDepth: 0, brightness: 100, tracking: -0.8 },
      '03': { primary: '#18181B', radius: 8, shadowDepth: 1, brightness: 100, tracking: 0.0 },
      '04': { primary: '#2563EB', radius: 12, shadowDepth: 2, brightness: 100, tracking: 0.0 },
      '05': { primary: '#6750A4', radius: 28, shadowDepth: 3, brightness: 100, tracking: 0.2 },
      '06': { primary: '#D97706', radius: 20, shadowDepth: 2, brightness: 100, tracking: 0.0 },
      '07': { primary: '#3B82F6', radius: 24, shadowDepth: 2, brightness: 98, tracking: -0.2 },
      '08': { primary: '#DC2626', radius: 0, shadowDepth: 0, brightness: 100, tracking: 0.5 },
      '09': { primary: '#FFE600', radius: 4, shadowDepth: 4, brightness: 100, tracking: -0.5 },
      '10': { primary: '#10B981', radius: 32, shadowDepth: 1, brightness: 100, tracking: 0.2 },
      '11': { primary: '#B45309', radius: 14, shadowDepth: 3, brightness: 95, tracking: 0.0 },
      '12': { primary: '#EC4899', radius: 8, shadowDepth: 4, brightness: 90, tracking: 1.0 },
      '13': { primary: '#0F172A', radius: 2, shadowDepth: 1, brightness: 100, tracking: 0.4 },
      '14': { primary: '#F43F5E', radius: 0, shadowDepth: 2, brightness: 100, tracking: 1.5 },
      '15': { primary: '#8B5CF6', radius: 16, shadowDepth: 2, brightness: 95, tracking: -0.2 },
      '16': { primary: '#10B981', radius: 20, shadowDepth: 3, brightness: 100, tracking: 0.0 }
    };

    let activeTokens = Object.assign({}, styleDefaultTokens['01']);

    function setViewportMode(mode) {
      currentViewport = mode;
      const wrapper = document.getElementById('sandbox-stage-wrapper');
      wrapper.className = 'sandbox-stage-wrapper viewport-' + mode;
      
      document.querySelectorAll('.device-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById('btn-device-' + mode);
      if (activeBtn) activeBtn.classList.add('active');
      showToast('뷰포트 전환: ' + mode.toUpperCase() + ' 📱');
    }

    function toggleTokenStudio() {
      isTokenStudioOpen = !isTokenStudioOpen;
      const panel = document.getElementById('token-studio-panel');
      const btn = document.getElementById('btn-toggle-token-studio');
      if (isTokenStudioOpen) {
        panel.classList.add('active');
        btn.style.borderColor = '#38BDF8';
        btn.style.boxShadow = '0 0 12px rgba(56,189,248,0.4)';
      } else {
        panel.classList.remove('active');
        btn.style.borderColor = '';
        btn.style.boxShadow = '';
      }
    }

    function syncTokensToInputs() {
      document.getElementById('tk-picker-color').value = activeTokens.primary;
      document.getElementById('tk-input-color-hex').value = activeTokens.primary;
      document.getElementById('val-badge-color').innerText = activeTokens.primary;

      document.getElementById('tk-slider-radius').value = activeTokens.radius;
      document.getElementById('val-badge-radius').innerText = activeTokens.radius + 'px';

      document.getElementById('tk-slider-shadow').value = activeTokens.shadowDepth;
      document.getElementById('val-badge-shadow').innerText = 'Level ' + activeTokens.shadowDepth;

      document.getElementById('tk-slider-brightness').value = activeTokens.brightness;
      document.getElementById('val-badge-brightness').innerText = activeTokens.brightness + '%';

      document.getElementById('tk-slider-tracking').value = Math.round(activeTokens.tracking * 10);
      document.getElementById('val-badge-tracking').innerText = activeTokens.tracking + 'px';
    }

    function updateToken(key, val) {
      if (key === 'radius') {
        activeTokens.radius = parseInt(val, 10);
        document.getElementById('val-badge-radius').innerText = activeTokens.radius + 'px';
      } else if (key === 'primary') {
        activeTokens.primary = val;
        document.getElementById('tk-picker-color').value = val;
        document.getElementById('tk-input-color-hex').value = val;
        document.getElementById('val-badge-color').innerText = val;
      } else if (key === 'shadowDepth') {
        activeTokens.shadowDepth = parseInt(val, 10);
        document.getElementById('val-badge-shadow').innerText = 'Level ' + activeTokens.shadowDepth;
      } else if (key === 'brightness') {
        activeTokens.brightness = parseInt(val, 10);
        document.getElementById('val-badge-brightness').innerText = activeTokens.brightness + '%';
      } else if (key === 'tracking') {
        activeTokens.tracking = parseFloat(val);
        document.getElementById('val-badge-tracking').innerText = activeTokens.tracking.toFixed(1) + 'px';
      }
      applyTokensToLiveStage();
    }

    function getShadowCss(depth, primaryColor) {
      if (depth === 0) return 'none';
      if (depth === 1) return '0 2px 8px rgba(0,0,0,0.12)';
      if (depth === 2) return '0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.15)';
      if (depth === 3) return '0 20px 35px -8px rgba(0,0,0,0.3), 0 10px 14px -5px ' + primaryColor + '33';
      return '0 25px 50px -12px ' + primaryColor + '66, 0 0 20px ' + primaryColor + '44';
    }

    function applyTokensToLiveStage() {
      const targets = [
        document.getElementById('sandbox-single-stage'),
        document.getElementById('ab-box-a'),
        document.getElementById('ab-box-b')
      ];

      const shadowCss = getShadowCss(activeTokens.shadowDepth, activeTokens.primary);
      const brightnessVal = (activeTokens.brightness / 100).toFixed(2);

      targets.forEach(stage => {
        if (!stage) return;
        stage.style.setProperty('--tk-primary', activeTokens.primary);
        stage.style.setProperty('--tk-radius', activeTokens.radius + 'px');
        stage.style.setProperty('--tk-shadow', shadowCss);
        stage.style.setProperty('--tk-surface-brightness', brightnessVal);
        stage.style.setProperty('--tk-tracking', activeTokens.tracking + 'px');
      });
    }

    function resetTokensToDefault() {
      const currentStyle = document.getElementById('sb-style-select').value;
      const def = styleDefaultTokens[currentStyle] || styleDefaultTokens['01'];
      activeTokens = Object.assign({}, def);
      syncTokensToInputs();
      applyTokensToLiveStage();
      showToast('스타일 #' + currentStyle + '의 기본 토큰으로 초기화되었습니다! ↺');
    }

    function openTokenExportModal() {
      renderTokenExportCode();
      document.getElementById('token-export-modal').classList.add('active');
    }

    function closeTokenExportModal(e) {
      if (!e || e.target.id === 'token-export-modal' || e.target.classList.contains('btn-modal-close')) {
        document.getElementById('token-export-modal').classList.remove('active');
      }
    }

    function switchTokenExportTab(tab) {
      currentTokenExportTab = tab;
      document.getElementById('tab-token-tailwind').classList.toggle('active', tab === 'tailwind');
      document.getElementById('tab-token-css').classList.toggle('active', tab === 'css');
      document.getElementById('tab-token-json').classList.toggle('active', tab === 'json');
      renderTokenExportCode();
    }

    function renderTokenExportCode() {
      const shadowCss = getShadowCss(activeTokens.shadowDepth, activeTokens.primary);
      const codeEl = document.getElementById('token-export-code');
      if (!codeEl) return;

      if (currentTokenExportTab === 'tailwind') {
        codeEl.textContent = [
          '/* Tailwind CSS v4 Theme Token Definition */',
          '@theme {',
          '  --color-primary: ' + activeTokens.primary + ';',
          '  --radius-custom: ' + activeTokens.radius + 'px;',
          '  --shadow-custom: ' + shadowCss + ';',
          '  --tracking-custom: ' + activeTokens.tracking + 'px;',
          '  --filter-brightness: ' + (activeTokens.brightness / 100).toFixed(2) + ';',
          '}',
          '',
          '/* 사용 예시:',
          '   <button class="bg-primary rounded-custom shadow-custom tracking-custom">',
          '     실행하기',
          '   </button>',
          '*/'
        ].join('\\n');
      } else if (currentTokenExportTab === 'css') {
        codeEl.textContent = [
          '/* Standard CSS Custom Properties (:root) */',
          ':root {',
          '  --primary: ' + activeTokens.primary + ';',
          '  --border-radius: ' + activeTokens.radius + 'px;',
          '  --box-shadow: ' + shadowCss + ';',
          '  --letter-spacing: ' + activeTokens.tracking + 'px;',
          '  --surface-brightness: ' + (activeTokens.brightness / 100).toFixed(2) + ';',
          '}',
          '',
          '/* 컴포넌트 적용 예시 */',
          '.btn-primary {',
          '  background-color: var(--primary);',
          '  border-radius: var(--border-radius);',
          '  box-shadow: var(--box-shadow);',
          '  letter-spacing: var(--letter-spacing);',
          '}'
        ].join('\\n');
      } else {
        codeEl.textContent = JSON.stringify({
          "$schema": "https://design-tokens.github.io/community-group/format/",
          "color": {
            "primary": { "value": activeTokens.primary, "type": "color" }
          },
          "borderRadius": {
            "base": { "value": activeTokens.radius + "px", "type": "dimension" }
          },
          "shadow": {
            "elevation": { "value": shadowCss, "type": "shadow" }
          },
          "typography": {
            "letterSpacing": { "value": activeTokens.tracking + "px", "type": "dimension" }
          }
        }, null, 2);
      }
    }

    function copyTokenExportCode() {
      const text = document.getElementById('token-export-code').textContent;
      const notify = () => showToast('디자인 토큰 코드가 클립보드에 복사되었습니다! 📋');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(notify).catch(() => {
          fallbackCopyText(text);
          notify();
        });
      } else {
        fallbackCopyText(text);
        notify();
      }
    }

    function onSandboxStyleChange() {
      const styleNum = document.getElementById('sb-style-select').value;
      const def = styleDefaultTokens[styleNum] || styleDefaultTokens['01'];
      activeTokens = Object.assign({}, def);
      syncTokensToInputs();
      updateLiveRender();
    }

    function sendToSandbox(styleNum) {
      document.getElementById('sb-style-select').value = styleNum.toString().padStart(2, '0');
      setSandboxMode('single');
      onSandboxStyleChange();
      scrollToElement('sandbox-anchor');
      showToast('스타일 #' + styleNum + '이 실시간 샌드박스에 로드되었습니다! ⚡');
    }

    // ==========================================
    // 🌟 2번: 맞춤형 프롬프트 커스터마이저
    // ==========================================
    function openCustomizerModal(promptId, title, korTitle) {
      currentCustomizerStyleId = promptId;
      document.getElementById('cust-selected-style-name').innerText = title + ' (' + korTitle + ')';
      regenerateCustomPrompt();
      document.getElementById('customizer-modal').classList.add('active');
    }

    function closeCustomizerModal() {
      document.getElementById('customizer-modal').classList.remove('active');
    }

    function selectDomainTag(btn, domainText) {
      document.querySelectorAll('#cust-domain-tags .tag-choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentDomain = domainText;
      regenerateCustomPrompt();
    }

    function onColorPicked(hex) {
      currentBrandColor = hex;
      document.getElementById('cust-color-hex').innerText = hex;
      regenerateCustomPrompt();
    }

    function setCustColor(hex) {
      document.getElementById('cust-color-picker').value = hex;
      onColorPicked(hex);
    }

    function regenerateCustomPrompt() {
      const projName = document.getElementById('cust-project-name').value || '지누의 프로젝트';
      const targetUser = document.getElementById('cust-target-user').value;
      const coreFeatures = document.getElementById('cust-core-features').value || '핵심 업무 및 인터랙션 기능';

      const promptItem = promptDataStore.find(p => p.id === currentCustomizerStyleId) || promptDataStore[0];

      const customPrompt = 
\`# [PROJECT SPEC] \${projName}
- Target Domain: \${currentDomain}
- Target Audience: \${targetUser}
- Primary Accent Color: \${currentBrandColor}
- Key Features: \${coreFeatures}
- Applied Design System: \${promptItem.title}

=======================================================
[MASTER DESIGN SYSTEM & EXECUTION RULES]
=======================================================
당신은 세계 최고 수준의 프론티어 프론트엔드 UI/UX 아키텍트입니다.
현재 프로젝트 '\${projName}'을(를) 구축할 때, 아래의 [\${promptItem.title}] 디자인 철학과 한국어 타이포그래피 규칙을 100% 엄격히 준수하여 구현하십시오.

1. 브랜드 컬러 및 톤앤매너
- 메인 강조 컬러(Primary Accent): \${currentBrandColor}
- 도메인 특성 반영: \${currentDomain}의 사용성을 해치지 않도록 직관적 정보 계층을 우선합니다.
- 대상 사용자: \${targetUser}를 고려하여 명확한 텍스트 대비(Contrast)와 가독성을 보장합니다.

2. 비주얼 스타일 핵심 지침
\${promptItem.visualStyle || '장식을 절제하고 정보와 기능의 본질을 드러냅니다.'}
\${promptItem.coreConcept ? '디자인 철학: ' + promptItem.coreConcept : ''}

3. 한국어 타이포그래피 (CJK) 규칙
- 서체: Pretendard Variable 또는 SUIT 우선 적용
- 큰 제목(Heading): letter-spacing -0.035em ~ -0.02em, line-height 1.1 ~ 1.2
- 본문(Body): line-height 1.6 ~ 1.75, letter-spacing -0.015em ~ 0
- 단어 분절: word-break: keep-all; overflow-wrap: break-word 적용

4. 구현 대상 기능
\${coreFeatures}

-------------------------------------------------------
[ORIGINAL BASE DESIGN PROMPT SPECIFICATION]
-------------------------------------------------------
\${promptItem.fullContent}
\`;

      document.getElementById('cust-prompt-output').innerText = customPrompt;
    }

    function copyCustomPrompt() {
      const text = document.getElementById('cust-prompt-output').innerText;
      function notify() { showToast('맞춤형 마스터 프롬프트가 복사되었습니다! 📋'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(notify).catch(() => { fallbackCopyText(text); notify(); });
      } else { fallbackCopyText(text); notify(); }
    }

    // ==========================================
    // 🌟 고도화 1: 5대 UI 컴포넌트 킷 로직
    // ==========================================
    let currentCompStyleId = '01-apple-inspired-premium-minimal-prompt';
    let currentCompTab = 'buttons';
    let currentCodeFormat = 'html';

    function openComponentKitModal(promptId, styleNum, title, korTitle) {
      currentCompStyleId = promptId;
      document.getElementById('compkit-title').innerText = 'STYLE #' + styleNum + '. ' + title;
      document.getElementById('compkit-subtitle').innerText = korTitle + ' — 5대 실무 UI 컴포넌트 킷';
      renderComponentKitView();
      document.getElementById('component-kit-modal').classList.add('active');
    }

    function closeComponentKitModal() {
      document.getElementById('component-kit-modal').classList.remove('active');
    }

    function switchKitTab(tabName, btn) {
      document.querySelectorAll('.compkit-tab-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      currentCompTab = tabName;
      renderComponentKitView();
    }

    function switchKitCodeFormat(format) {
      currentCodeFormat = format;
      document.getElementById('btn-format-html').classList.toggle('active', format === 'html');
      document.getElementById('btn-format-tw').classList.toggle('active', format === 'tailwind');
      renderComponentKitView();
    }

    function renderComponentKitView() {
      const cleanId = currentCompStyleId.replace(/-prompt$/, '');
      const meta = styleMetaStore[cleanId] || {
        num: currentCompStyleId.split('-')[0],
        korTitle: '디자인 시스템',
        colorSwatches: ['#0B0E14', '#141824', '#38BDF8', '#FFFFFF']
      };

      const bg = meta.colorSwatches[0] || '#FFFFFF';
      const text = meta.colorSwatches[2] || '#111111';
      const accent = meta.colorSwatches[meta.colorSwatches.length - 1] || '#38BDF8';

      const previewStage = document.getElementById('compkit-preview-stage');
      const codeTextEl = document.getElementById('compkit-code-text');

      let previewHtml = '';
      let codeHtml = '';
      let codeTw = '';

      if (currentCompTab === 'buttons') {
        previewHtml = \`
          <div style="display:flex; flex-direction:column; gap:16px; align-items:center; width:100%; max-width:320px;">
            <button style="width:100%; background:\${accent}; color:#fff; border:none; padding:12px 24px; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              Primary Action
            </button>
            <button style="width:100%; background:transparent; color:\${text}; border:1px solid \${accent}; padding:11px 24px; border-radius:8px; font-weight:600; cursor:pointer; font-size:14px;">
              Secondary Outline
            </button>
            <button style="width:100%; background:rgba(128,128,128,0.2); color:#888; border:none; padding:12px 24px; border-radius:8px; font-weight:600; cursor:not-allowed; font-size:14px;" disabled>
              Disabled Button
            </button>
          </div>
        \`;
        codeHtml = \`<!-- Primary Button -->
<button class="btn-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn-secondary">Secondary Outline</button>

<style>
.btn-primary {
  background-color: \${accent};
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s;
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

.btn-secondary {
  background-color: transparent;
  color: \${text};
  border: 1px solid \${accent};
  padding: 11px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
</style>\`;
        codeTw = \`// Tailwind CSS v4 / React
export function ButtonGroup() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <button className="bg-[\${accent}] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-transform active:scale-95 shadow-md">
        Primary Action
      </button>
      <button className="border border-[\${accent}] text-[\${text}] font-semibold py-2.5 px-6 rounded-lg hover:bg-[\${accent}]/10 transition-colors">
        Secondary Outline
      </button>
    </div>
  );
}\`;
      } else if (currentCompTab === 'inputs') {
        previewHtml = \`
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:340px;">
            <div>
              <label style="font-size:12px; font-weight:700; color:\${text}; margin-bottom:6px; display:block;">이메일 주소</label>
              <input type="text" placeholder="name@example.com" value="jinwoo@studio.dev" style="width:100%; background:rgba(128,128,128,0.08); border:1px solid \${accent}; border-radius:8px; padding:10px 14px; color:\${text}; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="font-size:12px; font-weight:700; color:\${text}; margin-bottom:6px; display:block;">실시간 검색</label>
              <input type="text" placeholder="키워드를 입력하세요..." style="width:100%; background:rgba(128,128,128,0.08); border:1px solid rgba(128,128,128,0.25); border-radius:8px; padding:10px 14px; color:\${text}; font-size:14px; outline:none;">
            </div>
          </div>
        \`;
        codeHtml = \`<!-- Styled Text Input -->
<div class="input-group">
  <label for="email">이메일 주소</label>
  <input type="email" id="email" placeholder="name@example.com">
</div>

<style>
.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: \${text};
  margin-bottom: 6px;
}
.input-group input {
  width: 100%;
  background: rgba(128, 128, 128, 0.08);
  border: 1px solid \${accent};
  border-radius: 8px;
  padding: 10px 14px;
  color: \${text};
  font-size: 14px;
  outline: none;
}
.input-group input:focus {
  box-shadow: 0 0 0 3px \${accent}33;
}
</style>\`;
        codeTw = \`// Tailwind CSS v4 / React
export function CustomInput() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className="text-xs font-bold text-[\${text}]">이메일 주소</label>
      <input 
        type="email" 
        placeholder="name@example.com" 
        className="w-full bg-slate-500/10 border border-[\${accent}] rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[\${accent}]/30 outline-none transition-all"
      />
    </div>
  );
}\`;
      } else if (currentCompTab === 'card') {
        previewHtml = \`
          <div style="background:rgba(128,128,128,0.06); border:1px solid rgba(128,128,128,0.2); border-radius:14px; padding:24px; width:100%; max-width:340px; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
            <div style="display:inline-block; font-size:11px; font-weight:800; background:\${accent}; color:#fff; padding:3px 10px; border-radius:999px; margin-bottom:12px;">FEATURE CARD</div>
            <div style="font-size:18px; font-weight:800; color:\${text}; margin-bottom:8px;">\${meta.korTitle}</div>
            <p style="font-size:13px; color:#888; line-height:1.5; margin-bottom:18px;">디자인 시스템의 조형미와 여백의 미학이 담긴 시그니처 카드 컴포넌트입니다.</p>
            <button style="background:transparent; color:\${accent}; border:none; font-weight:700; font-size:13px; cursor:pointer; padding:0;">자세히 보기 ➔</button>
          </div>
        \`;
        codeHtml = \`<!-- Signature Feature Card -->
<div class="feature-card">
  <span class="badge">FEATURE</span>
  <h3>\${meta.korTitle}</h3>
  <p>디자인 시스템의 조형미가 담긴 시그니처 카드 컴포넌트입니다.</p>
  <a href="#" class="card-link">자세히 보기 ➔</a>
</div>

<style>
.feature-card {
  background: rgba(128, 128, 128, 0.06);
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 14px;
  padding: 24px;
}
.feature-card .badge {
  background: \${accent};
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
}
.feature-card h3 { font-size: 18px; color: \${text}; margin: 12px 0 6px 0; }
.feature-card p { font-size: 13px; color: #888; line-height: 1.5; margin-bottom: 16px; }
.feature-card .card-link { color: \${accent}; font-weight: 700; text-decoration: none; font-size: 13px; }
</style>\`;
        codeTw = \`// Tailwind CSS v4 / React
export function FeatureCard() {
  return (
    <div className="bg-slate-500/5 border border-slate-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <span className="bg-[\${accent}] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
        FEATURE
      </span>
      <h3 className="text-lg font-bold text-[\${text}] mt-3 mb-1.5">\${meta.korTitle}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">
        디자인 시스템의 조형미가 담긴 시그니처 카드 컴포넌트입니다.
      </p>
      <a href="#" className="text-sm font-bold text-[\${accent}] hover:underline inline-flex items-center gap-1">
        자세히 보기 &rarr;
      </a>
    </div>
  );
}\`;
      } else if (currentCompTab === 'badges') {
        previewHtml = \`
          <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; max-width:320px;">
            <span style="background:\${accent}; color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:999px;">Primary Pill</span>
            <span style="background:rgba(128,128,128,0.15); color:\${text}; font-size:12px; font-weight:600; padding:4px 12px; border-radius:6px; border:1px solid rgba(128,128,128,0.3);">Neutral Tag</span>
            <span style="background:rgba(16,185,129,0.15); color:#10B981; font-size:12px; font-weight:700; padding:4px 12px; border-radius:999px;">Active ●</span>
            <span style="background:rgba(239,68,68,0.15); color:#EF4444; font-size:12px; font-weight:700; padding:4px 12px; border-radius:999px;">Alert ✕</span>
          </div>
        \`;
        codeHtml = \`<!-- Badges and Status Pills -->
<span class="badge-primary">Primary Pill</span>
<span class="badge-neutral">Neutral Tag</span>
<span class="badge-success">Active ●</span>

<style>
.badge-primary { background: \${accent}; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
.badge-neutral { background: rgba(128,128,128,0.15); color: \${text}; padding: 4px 12px; border-radius: 6px; font-size: 12px; }
.badge-success { background: rgba(16,185,129,0.15); color: #10B981; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
</style>\`;
        codeTw = \`// Tailwind CSS v4 / React
export function BadgeCollection() {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <span className="bg-[\${accent}] text-white text-xs font-bold px-3 py-1 rounded-full">Primary Pill</span>
      <span className="bg-slate-500/15 text-[\${text}] text-xs font-medium px-2.5 py-1 rounded-md border border-slate-500/20">Neutral</span>
      <span className="bg-emerald-500/15 text-emerald-500 text-xs font-bold px-3 py-1 rounded-full">Active ●</span>
    </div>
  );
}\`;
      } else if (currentCompTab === 'nav') {
        previewHtml = \`
          <div style="width:100%; max-width:340px; background:rgba(128,128,128,0.06); border-radius:10px; padding:6px; display:flex; gap:6px;">
            <div style="flex:1; background:\${accent}; color:#fff; text-align:center; padding:8px 0; border-radius:6px; font-weight:700; font-size:13px;">개요</div>
            <div style="flex:1; color:#888; text-align:center; padding:8px 0; border-radius:6px; font-weight:600; font-size:13px;">상세스펙</div>
            <div style="flex:1; color:#888; text-align:center; padding:8px 0; border-radius:6px; font-weight:600; font-size:13px;">설정</div>
          </div>
        \`;
        codeHtml = \`<!-- Segmented Navigation Tab -->
<nav class="nav-segmented">
  <a href="#" class="nav-item active">개요</a>
  <a href="#" class="nav-item">상세스펙</a>
  <a href="#" class="nav-item">설정</a>
</nav>

<style>
.nav-segmented {
  display: flex;
  background: rgba(128, 128, 128, 0.08);
  padding: 4px;
  border-radius: 10px;
}
.nav-item {
  flex: 1;
  text-align: center;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #888;
  text-decoration: none;
  border-radius: 6px;
}
.nav-item.active {
  background: \${accent};
  color: #FFFFFF;
  font-weight: 700;
}
</style>\`;
        codeTw = \`// Tailwind CSS v4 / React
export function SegmentedNav() {
  return (
    <nav className="flex bg-slate-500/10 p-1 rounded-xl max-w-sm w-full">
      <button className="flex-1 bg-[\${accent}] text-white py-2 text-xs font-bold rounded-lg shadow-sm">개요</button>
      <button className="flex-1 text-slate-400 py-2 text-xs font-medium hover:text-white transition-colors">상세스펙</button>
      <button className="flex-1 text-slate-400 py-2 text-xs font-medium hover:text-white transition-colors">설정</button>
    </nav>
  );
}\`;
      }

      previewStage.innerHTML = previewHtml;
      codeTextEl.innerText = currentCodeFormat === 'html' ? codeHtml : codeTw;
    }

    function copyKitCode() {
      const codeEl = document.getElementById('compkit-code-text');
      const text = (codeEl ? (codeEl.textContent || codeEl.innerText) : '') || '';
      function notify() { showToast('컴포넌트 소스코드가 복사되었습니다! 📋'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(notify).catch(() => { fallbackCopyText(text); notify(); });
      } else { fallbackCopyText(text); notify(); }
    }

    // ==========================================
    // 🌟 고도화 2: AI 새 스타일 제작소 & 동적 갤러리 등록
    // ==========================================
    function openAIStudioModal() {
      updateStudioMetaPrompt();
      renderCustomStylesManager();
      document.getElementById('ai-studio-modal').classList.add('active');
    }

    function closeAIStudioModal() {
      document.getElementById('ai-studio-modal').classList.remove('active');
    }

    function updateStudioMetaPrompt() {
      const name = document.getElementById('studio-style-name').value || '새 디자인 시스템';
      const keywords = document.getElementById('studio-style-keywords').value || '감각적이고 미려한 디자인';
      const colors = document.getElementById('studio-style-colors').value || '#FFFFFF, #000000, #38BDF8';

      const metaPrompt = 
\`# [TASK: ADVANCED DESIGN SYSTEM GENERATION]
You are a Principal Frontier Design Architect for 'JINWOO DESIGN WORKSHOP'.
Create a comprehensive, production-grade Design System Prompt Specification following the exact 16-standard structure below.

# TARGET CONCEPT
- Style Name: \${name}
- Aesthetic Keywords: \${keywords}
- Color Palette: \${colors}

# REQUIRED OUTPUT SPECIFICATION (Output in Korean, Markdown format):
# 17. \${name}
- Category: [Choose from: minimal / functional / expressive / warm / tactile / future / editorial]
- Intensity: [refined / structured / bold / gentle / atmospheric / kinetic]

---

17. \${name}
비주얼 스타일:
[\${name}의 철학과 시각적 특성을 3~4문장으로 서술]

디자인 핵심:
- [핵심 원칙 1]
- [핵심 원칙 2]
- [Less UI / More Focus 등의 원칙]

색상 구성:
Background: [Hex]
Secondary Background: [Hex]
Primary Text: [Hex]
Secondary Text: [Hex]
Accent: [Hex]

타이포그래피:
- Display / Hero: [px]
- Page Title: [px]
- Body: [px]
- Line-height & Letter-spacing 규칙

컴포넌트 지오메트리 & 표면:
- Border / Radius: [px]
- Shadow: [특성]
- Card vs Whitespace 규칙

피해야 할 디자인:
- [피해야 할 SaaS 클리셰 5개 명시]

KOREAN TYPOGRAPHY / CJK RULES:
- Pretendard / CJK 서체 최적화 및 word-break: keep-all 규칙
\`;

      document.getElementById('studio-meta-output').innerText = metaPrompt;
    }

    function copyStudioMetaPrompt() {
      const text = document.getElementById('studio-meta-output').innerText;
      function notify() { showToast('1단계 메타 프롬프트가 복사되었습니다! AI에 질문해 보세요. 🤖'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(notify).catch(() => { fallbackCopyText(text); notify(); });
      } else { fallbackCopyText(text); notify(); }
    }

    function registerCustomStyle() {
      const aiResponse = document.getElementById('studio-ai-response').value.trim();
      const summaryInput = document.getElementById('studio-summary-input').value.trim();
      const styleName = document.getElementById('studio-style-name').value.trim() || '커스텀 스타일';

      if (!aiResponse) {
        alert('AI가 생성한 가이드라인 텍스트를 붙여넣어 주세요!');
        return;
      }

      const existing = JSON.parse(localStorage.getItem('jinwoo_custom_styles') || '[]');
      const newNum = (17 + existing.length).toString().padStart(2, '0');
      const customId = 'custom-' + newNum;

      const newStyleObj = {
        id: customId,
        num: newNum,
        title: styleName,
        korTitle: styleName,
        category: 'custom, creative, user-defined',
        intensity: 'custom',
        summary: summaryInput || '사용자가 AI를 통해 직접 생성하고 공작소에 영구 등록한 17번째 커스텀 디자인 시스템입니다.',
        colorSwatches: ['#0B0E14', '#151A29', '#EC4899', '#38BDF8', '#FFFFFF'],
        fullContent: aiResponse
      };

      existing.push(newStyleObj);
      localStorage.setItem('jinwoo_custom_styles', JSON.stringify(existing));

      appendCustomCardToDOM(newStyleObj);
      addCustomOptionToSandbox(newStyleObj);

      showToast('스타일 #' + newNum + ' [' + styleName + '] 갤러리 등록 완료! 🎉');
      closeAIStudioModal();
      scrollToElement('card-' + customId);
    }

    function appendCustomCardToDOM(styleObj) {
      const grid = document.getElementById('gallery-grid');
      const article = document.createElement('article');
      article.className = 'gallery-card';
      article.id = 'card-' + styleObj.id;
      article.setAttribute('data-filter', 'custom');
      article.setAttribute('data-search', styleObj.title.toLowerCase() + ' custom 커스텀');

      const swatches = styleObj.colorSwatches.map(c => \`
        <div class="swatch" style="background:\${c};" title="클릭하여 \${c} 복사" onclick="copyHex('\${c}', event)">
          <span class="swatch-tip">\${c}</span>
        </div>
      \`).join('');

      article.innerHTML = \`
        <div class="card-image-box" style="background:linear-gradient(135deg, #170E2E 0%, #0A0714 100%); display:flex; align-items:center; justify-content:center;">
          <div style="text-align:center; padding:20px;">
            <div style="font-size:36px; margin-bottom:10px;">✨</div>
            <div style="font-size:20px; font-weight:800; color:#F472B6;">\${styleObj.title}</div>
            <div style="font-size:12px; color:#A5F3FC; margin-top:4px;">사용자 제작 AI 커스텀 스타일</div>
          </div>
          <div class="card-badge-num" style="background:#EC4899;">CUSTOM #\${styleObj.num}</div>
        </div>

        <div class="card-body">
          <div class="card-meta-row">
            <span class="badge-category" style="color:#F472B6; border-color:#F472B6;">CUSTOM AI</span>
            <span class="badge-intensity">Intensity: \${styleObj.intensity}</span>
          </div>
          <h3 class="card-title">\${styleObj.title}</h3>
          <div class="card-kor-title" style="color:#F472B6;">\${styleObj.korTitle}</div>
          <p class="card-summary">\${styleObj.summary}</p>

          <div class="palette-section">
            <div class="palette-label">팔레트 스와치</div>
            <div class="swatches-row">\${swatches}</div>
          </div>

          <div class="card-action-bar">
            <button class="btn-component-kit" onclick="openComponentKitModal('\${styleObj.id}', '\${styleObj.num}', '\${styleObj.title}', '\${styleObj.korTitle}')">
              🧩 컴포넌트 킷
            </button>
            <button class="btn-send-sandbox" onclick="sendToSandbox('\${styleObj.num}')">
              ⚡ 샌드박스
            </button>
            <button class="btn-download-starter" onclick="downloadStarterTemplate('\${styleObj.id}', '\${styleObj.num}', '\${styleObj.title}')">
              📦 템플릿 다운로드
            </button>
          </div>

          <div class="prompt-section">
            <div class="prompt-header">
              <span class="prompt-title-tag">커스텀 프롬프트 전문</span>
              <button class="btn-copy-prompt" onclick="copyPromptText(this, '\${styleObj.id}')">복사</button>
            </div>
            <div class="prompt-preview-wrap">
              <pre class="prompt-code-block" id="prompt-pre-\${styleObj.id}">\${styleObj.fullContent}</pre>
            </div>
          </div>
        </div>
      \`;

      grid.appendChild(article);
      document.getElementById('tab-custom-filter').style.display = 'block';
    }

    function addCustomOptionToSandbox(styleObj) {
      ['sb-style-select', 'sb-style-a', 'sb-style-b'].forEach(selId => {
        const select = document.getElementById(selId);
        if (select) {
          const opt = document.createElement('option');
          opt.value = styleObj.num;
          opt.innerText = styleObj.num + '. ' + styleObj.title + ' (커스텀)';
          select.appendChild(opt);
        }
      });

      promptDataStore.push({
        id: styleObj.id,
        title: styleObj.title,
        category: styleObj.category,
        intensity: styleObj.intensity,
        visualStyle: styleObj.summary,
        coreConcept: styleObj.title,
        fullContent: styleObj.fullContent
      });

      styleMetaStore[styleObj.id] = {
        num: styleObj.num,
        korTitle: styleObj.korTitle,
        colorSwatches: styleObj.colorSwatches
      };
    }

    function loadCustomStyles() {
      const list = JSON.parse(localStorage.getItem('jinwoo_custom_styles') || '[]');
      if (list.length > 0) {
        list.forEach(item => {
          appendCustomCardToDOM(item);
          addCustomOptionToSandbox(item);
        });
      }
    }

    function renderCustomStylesManager() {
      const list = JSON.parse(localStorage.getItem('jinwoo_custom_styles') || '[]');
      const mgr = document.getElementById('custom-styles-mgr');
      const listEl = document.getElementById('custom-styles-list');
      if (list.length === 0) {
        mgr.style.display = 'none';
        return;
      }
      mgr.style.display = 'block';
      listEl.innerHTML = list.map(item => \`
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface); padding:6px 12px; border-radius:6px; font-size:12px;">
          <span>#\${item.num} \${item.title}</span>
          <span style="color:#10B981;">등록됨 ✓</span>
        </div>
      \`).join('');
    }

    function clearCustomStyles() {
      if (confirm('등록된 모든 커스텀 스타일을 삭제하시겠습니까?')) {
        localStorage.removeItem('jinwoo_custom_styles');
        location.reload();
      }
    }

    // ==========================================
    // 🌟 3번 & 4번 로직
    // ==========================================
    function copyAIToolPrompt(promptId, toolType) {
      const promptItem = promptDataStore.find(p => p.id === promptId) || promptDataStore[0];
      const cleanId = promptId.replace(/-prompt$/, '');
      const meta = styleMetaStore[cleanId] || {
        num: promptId.split('-')[0],
        korTitle: promptItem.title,
        colorSwatches: ['#FFFFFF', '#000000', '#38BDF8']
      };

      let output = '';
      let toolName = '';

      if (toolType === 'v0') {
        toolName = 'v0 / Lovable / Bolt';
        output = \`# ROLE & TARGET SPECIFICATION
You are an expert Frontend Architect specializing in React 19, Tailwind CSS v4, Lucide React icons, and modern full-stack web applications (compatible with v0.dev, Lovable, and Bolt.new).

# TASK
Build a high-performance, visually stunning, fully responsive UI component adhering strictly to the design system rules below.
- Framework: React 19 / Modern Component Architecture
- Styling: Tailwind CSS v4 utility classes with semantic color tokens
- Icons: lucide-react (stroke-width={1.75})
- Typography: Pretendard Variable & Korean CJK typography optimization
- Primary Accent: \${meta.colorSwatches[meta.colorSwatches.length - 1]}
- Surface Colors: \${meta.colorSwatches.slice(0, 3).join(', ')}

# DESIGN SYSTEM SPECIFICATION: \${promptItem.title} (\${meta.korTitle})
\${promptItem.fullContent}
\`;
      } else if (toolType === 'claude') {
        toolName = 'Claude Artifacts / ChatGPT';
        output = \`# CLAUDE / CHATGPT MASTER SYSTEM INSTRUCTION
You are an elite Principal UI/UX Designer and Frontend Software Architect.
Your mission is to construct a production-ready, interactive web application based on the design system below.

# EXECUTION GUIDELINES
1. Design Before Decoration: Follow the exact typography hierarchy, geometric spacing, and surface depth rules.
2. Korean Typography (CJK): Apply word-break: keep-all, appropriate letter-spacing (-0.03em), and comfortable line-height (1.6~1.75).
3. Interactive Polish: Ensure all buttons, forms, and cards feature delightful micro-interactions and accessible focus states.

# DESIGN SYSTEM SPECIFICATION: \${promptItem.title}
\${promptItem.fullContent}
\`;
      } else if (toolType === 'cursor') {
        toolName = 'Cursor / Antigravity (.cursorrules)';
        output = \`# .cursorrules / AGENTS.md - UI ARCHITECTURE RULES
# Target Style: \${promptItem.title} (\${meta.korTitle})

[CORE DESIGN TOKENS]
- Category: \${promptItem.category}
- Intensity: \${promptItem.intensity}
- Recommended Palette: \${meta.colorSwatches.join(', ')}

[TYPOGRAPHY & LOCALIZATION STANDARDS]
- Heading font-family: Pretendard, -apple-system, sans-serif
- Heading letter-spacing: -0.035em to -0.02em
- Body line-height: 1.6 to 1.75
- Word break: keep-all; overflow-wrap: break-word;

[DESIGN SYSTEM SPECIFICATION]
\${promptItem.fullContent}
\`;
      }

      function notify() { showToast(toolName + ' 맞춤 프롬프트 복사 완료! 🚀'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output).then(notify).catch(() => { fallbackCopyText(output); notify(); });
      } else { fallbackCopyText(output); notify(); }
    }

    function downloadStarterTemplate(promptId, styleNum, title) {
      const promptItem = promptDataStore.find(p => p.id === promptId) || promptDataStore[0];
      const cleanId = promptId.replace(/-prompt$/, '');
      const meta = styleMetaStore[cleanId] || {
        num: styleNum,
        korTitle: title,
        colorSwatches: ['#0B0E14', '#141824', '#38BDF8', '#FFFFFF']
      };

      const bg = meta.colorSwatches[0] || '#FFFFFF';
      const text = meta.colorSwatches[2] || '#111111';
      const accent = meta.colorSwatches[meta.colorSwatches.length - 1] || '#38BDF8';

      const starterHtml = \`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${title} — 스타터 보일러플레이트</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <style>
    :root {
      --bg-color: \${bg};
      --text-color: \${text};
      --accent-color: \${accent};
      --font-stack: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background: var(--bg-color);
      color: var(--text-color);
      font-family: var(--font-stack);
      line-height: 1.6;
      word-break: keep-all;
      padding: 40px 20px;
    }
    .container { max-width: 1080px; margin: 0 auto; }
    header {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 2px solid rgba(128,128,128,0.2); padding-bottom: 20px; margin-bottom: 40px;
    }
    .brand { font-size: 20px; font-weight: 800; }
    .badge { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: var(--accent-color); color: #fff; }
    .hero { margin-bottom: 50px; }
    .hero h1 { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.2; margin-bottom: 16px; }
    .hero p { font-size: 18px; opacity: 0.8; max-width: 650px; margin-bottom: 24px; }
    .btn-action {
      background: var(--accent-color); color: #fff; border: none; padding: 12px 28px; border-radius: 8px;
      font-size: 15px; font-weight: 700; cursor: pointer; transition: transform 0.2s;
    }
    .btn-action:hover { transform: translateY(-2px); }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .card { border: 1px solid rgba(128,128,128,0.2); border-radius: 12px; padding: 24px; background: rgba(128,128,128,0.05); }
    .card h3 { font-size: 20px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">지누의 디자인 공작소</div>
      <div class="badge">STYLE #\${styleNum} — \${title}</div>
    </header>
    <main>
      <section class="hero">
        <h1>\${meta.korTitle}</h1>
        <p>\${promptItem.visualStyle || '디자인의 본질과 직관적 사용성을 구현하는 스타터 템플릿입니다.'}</p>
        <button class="btn-action" onclick="alert('인터랙션 준비 완료!')">프로덕트 시작하기</button>
      </section>
      <section class="card-grid">
        <div class="card">
          <h3>01. 디자인 철학</h3>
          <p>\${promptItem.coreConcept || '기능과 형태의 완벽한 조화'}</p>
        </div>
        <div class="card">
          <h3>02. 컬러 토큰</h3>
          <p>Primary Accent: \${accent}</p>
        </div>
        <div class="card">
          <h3>03. 반응형 지원</h3>
          <p>모바일, 태블릿, 데스크톱 완벽 대응 그리드</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>\`;

      const blob = new Blob([starterHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jinwoo-template-style-' + styleNum.toString().padStart(2, '0') + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('스타일 #' + styleNum + ' 스타터 템플릿(.html) 다운로드 완료! 📦');
    }

    function fallbackCopyText(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch (err) { console.warn('copy failed', err); }
      document.body.removeChild(textarea);
    }

    function scrollToElement(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function copyHex(hex, e) {
      if (e) e.stopPropagation();
      navigator.clipboard.writeText(hex).then(() => { showToast('컬러 코드 ' + hex + ' 복사 완료! 🎨'); });
    }

    function copyPromptText(btn, promptId) {
      const pre = document.getElementById('prompt-pre-' + promptId);
      if (!pre) return;
      const text = pre.innerText;

      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '✓ 복사완료!';
        btn.classList.add('copied');
        showToast('프롬프트 전문이 복사되었습니다! 📋');
        setTimeout(() => { btn.innerHTML = originalHtml; btn.classList.remove('copied'); }, 2500);
      }).catch(() => {
        fallbackCopyText(text);
        showToast('프롬프트 복사 완료! 📋');
      });
    }

    function togglePromptExpand(promptId, btn) {
      const wrap = btn.previousElementSibling;
      const isExpanded = wrap.classList.contains('expanded');
      if (isExpanded) {
        wrap.classList.remove('expanded');
        btn.querySelector('.toggle-text').innerText = '프롬프트 전체 펼쳐보기 (한국어 규칙 포함)';
        btn.querySelector('.toggle-icon').innerText = '▼';
      } else {
        wrap.classList.add('expanded');
        btn.querySelector('.toggle-text').innerText = '프롬프트 접기';
        btn.querySelector('.toggle-icon').innerText = '▲';
      }
    }

    function showToast(message) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.innerHTML = '<span>⚡</span> ' + message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
      }, 2500);
    }

    function openZoomModal(imgSrc, title) {
      const modal = document.getElementById('zoom-modal');
      const modalImg = document.getElementById('modal-img');
      const modalTitle = document.getElementById('modal-title');
      modalImg.src = imgSrc;
      modalTitle.innerText = title + ' — 실구현 고해상도 뷰';
      modal.classList.add('active');
    }
    function closeZoomModal() { document.getElementById('zoom-modal').classList.remove('active'); }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeZoomModal();
        closeCustomizerModal();
        closeComponentKitModal();
        closeAIStudioModal();
      }
    });

    function setFilter(filterType, tabElement) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      if (tabElement) tabElement.classList.add('active');

      const cards = document.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        const cardFilter = card.getAttribute('data-filter');
        card.style.display = (filterType === 'all' || cardFilter === filterType) ? 'flex' : 'none';
      });
    }

    function handleSearch() {
      const query = document.getElementById('search-input').value.toLowerCase().trim();
      const cards = document.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        const searchText = card.getAttribute('data-search') || '';
        card.style.display = (!query || searchText.includes(query)) ? 'flex' : 'none';
      });
    }

    function setViewMode(mode) {
      const grid = document.getElementById('gallery-grid');
      document.querySelectorAll('.btn-view-toggle').forEach(b => b.classList.remove('active'));
      grid.classList.remove('view-wide', 'view-single');

      if (mode === 'grid') document.getElementById('btn-view-grid').classList.add('active');
      else if (mode === 'wide') { document.getElementById('btn-view-wide').classList.add('active'); grid.classList.add('view-wide'); }
      else if (mode === 'single') { document.getElementById('btn-view-single').classList.add('active'); grid.classList.add('view-single'); }
    }

    /* Injected Client Module Scripts: Presets patch, Component Kit engine, Agentic Critic & Swarm */
    ${clientPresetPatchScript}

    ${clientKitScript}

    ${clientAgenticScript}

    window.addEventListener('DOMContentLoaded', () => {
      syncTokensToInputs();
      updateLiveRender();
      loadCustomStyles();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlTemplate, 'utf-8');
console.log('Successfully built index.html with Component Kit & AI Style Studio!');
