const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const styles = [
  {
    id: '01',
    name: 'Apple-inspired Premium Minimal',
    subtitle: '정제된 공간과 절제의 미학, 강력한 타이포그래피',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#FFFFFF; color:#1D1D1F; font-family:-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; padding:60px 80px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
        <!-- Top Nav -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #D2D2D7; padding-bottom:24px;">
          <div style="font-size:20px; font-weight:600; letter-spacing:-0.03em;">지누의 디자인 공작소</div>
          <div style="display:flex; gap:36px; font-size:14px; color:#6E6E73; font-weight:400;">
            <span style="color:#1D1D1F; font-weight:500;">스튜디오 개요</span>
            <span>디자인 원칙</span>
            <span>인터랙션 쇼케이스</span>
            <span>아카이브</span>
          </div>
          <button style="background:#0071E3; color:#fff; border:none; padding:10px 22px; border-radius:980px; font-size:14px; font-weight:500; cursor:pointer;">워크스페이스 시작</button>
        </div>

        <!-- Hero Section -->
        <div style="max-width:820px; margin-top:20px;">
          <div style="font-size:14px; font-weight:600; color:#0071E3; letter-spacing:-0.01em; margin-bottom:16px; text-transform:uppercase;">Vision Pro Era Studio</div>
          <div style="font-size:62px; font-weight:700; line-height:1.08; letter-spacing:-0.04em; margin-bottom:24px; color:#1D1D1F;">
            군더더기 없는 본질.<br>정교하게 빚어낸 디지털 감각.
          </div>
          <p style="font-size:19px; line-height:1.6; color:#6E6E73; font-weight:400; max-width:640px; margin-bottom:32px; letter-spacing:-0.02em;">
            장식적인 그래디언트나 불필요한 컨테이너를 배제하고, 넓은 여백과 명확한 타이포그래피로 사용자의 의도에 온전히 집중합니다.
          </p>
          <div style="display:flex; gap:20px; align-items:center;">
            <span style="font-size:15px; font-weight:500; color:#0071E3; display:flex; align-items:center; gap:6px;">디자인 시스템 살펴보기 →</span>
            <span style="font-size:15px; font-weight:400; color:#6E6E73;">버전 2.4 최적화 사양</span>
          </div>
        </div>

        <!-- Metric Grid -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:48px; border-top:1px solid #E5E5EA; padding-top:40px;">
          <div>
            <div style="font-size:48px; font-weight:700; letter-spacing:-0.03em; color:#1D1D1F;">99.8%</div>
            <div style="font-size:14px; color:#6E6E73; margin-top:6px; font-weight:400;">시각적 노이즈 제거율</div>
          </div>
          <div>
            <div style="font-size:48px; font-weight:700; letter-spacing:-0.03em; color:#1D1D1F;">120px</div>
            <div style="font-size:14px; color:#6E6E73; margin-top:6px; font-weight:400;">최대 헤드라인 스케일 리듬</div>
          </div>
          <div>
            <div style="font-size:48px; font-weight:700; letter-spacing:-0.03em; color:#0071E3;">#F5F5F7</div>
            <div style="font-size:14px; color:#6E6E73; margin-top:6px; font-weight:400;">미묘한 계층의 세컨더리 서피스</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: '02',
    name: 'Swiss International Functional UI',
    subtitle: '엄격한 그리드, 굵은 룰, 객관적 기능주의 타이포그래피',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#FFFFFF; color:#000000; font-family:'Helvetica Neue', Arial, 'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; border:8px solid #000;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:4px solid #000; padding-bottom:16px;">
          <div>
            <div style="font-size:13px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase;">SWISS TYPOGRAPHIC ARCHIVE / REF. 2026</div>
            <div style="font-size:32px; font-weight:900; letter-spacing:-0.03em;">지누의 디자인 공작소 — SCHWEIZ FUNCTIONAL</div>
          </div>
          <div style="font-size:16px; font-weight:700; background:#FF2A00; color:#fff; padding:6px 16px;">SYS.GRID 12-COL</div>
        </div>

        <!-- 4-Column Strict Layout -->
        <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr; gap:0; border-bottom:4px solid #000; height:460px;">
          <!-- Col 1 -->
          <div style="border-right:2px solid #000; padding:24px 30px 24px 0; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; font-weight:700; margin-bottom:12px;">[01] THE MANIFESTO</div>
              <div style="font-size:52px; font-weight:900; line-height:1.02; letter-spacing:-0.04em; text-transform:uppercase;">
                GRID OVER CARDS.<br>FORM IS FUNCTION.
              </div>
            </div>
            <p style="font-size:15px; line-height:1.5; font-weight:500; color:#222;">
              장식은 배제하고 구조를 드러낸다. 정밀한 수직·수평 정렬 라인과 헬베티카 산세리프의 질서가 정보를 가장 투명하게 전달합니다.
            </p>
          </div>

          <!-- Col 2 -->
          <div style="border-right:2px solid #000; padding:24px 24px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; font-weight:700; margin-bottom:12px;">[02] PARAMETERS</div>
              <div style="font-size:24px; font-weight:800; margin-bottom:16px;">모듈러 비례계</div>
              <div style="font-size:13px; line-height:1.8; font-family:monospace;">
                BASE_UNIT = 8px<br>
                GUTTER = 24px<br>
                HEADING = 700wt<br>
                STROKE = 2.0px solid<br>
                ACCENT = #FF2A00
              </div>
            </div>
            <div style="background:#000; color:#fff; padding:12px; font-size:12px; font-weight:700;">ACCENT INTERACTION</div>
          </div>

          <!-- Col 3 -->
          <div style="border-right:2px solid #000; padding:24px 24px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; font-weight:700; margin-bottom:12px;">[03] DATA DENSITY</div>
              <div style="font-size:24px; font-weight:800; margin-bottom:16px;">명확한 정보 분할</div>
              <div style="font-size:44px; font-weight:900; color:#FF2A00;">0.00ms</div>
              <div style="font-size:13px; color:#555; margin-top:4px;">불필요한 시각적 지연 제로</div>
            </div>
            <div style="border-top:2px solid #000; padding-top:12px; font-size:12px; font-weight:600;">OBJECTIVE COMPOSITION</div>
          </div>

          <!-- Col 4 -->
          <div style="padding:24px 0 24px 24px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; font-weight:700; margin-bottom:12px;">[04] VERIFICATION</div>
              <div style="font-size:18px; font-weight:700; line-height:1.4;">
                타이포그래피가 모든 장식을 압도하는가?
              </div>
            </div>
            <div style="border:2px solid #000; padding:16px; text-align:center; font-weight:800; font-size:14px; background:#F2F2F2;">
              PROCEED TEST →
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; padding-top:14px;">
          <span>ZURICH / BASEL DESIGN STANDARD 2026</span>
          <span>JINWOO DESIGN WORKSHOP — INTERNATIONAL STYLE</span>
        </div>
      </div>
    `
  },
  {
    id: '03',
    name: 'Barely-there UI',
    subtitle: '콘텐츠 자체가 인터페이스가 되는 극도의 투명성',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#FAFAFA; color:#18181B; font-family:-apple-system, 'Pretendard', sans-serif; padding:70px 100px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Top minimalist header -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:15px; color:#71717A; font-weight:500;">지누의 공작소 / 아이디어 캔버스</div>
          <div style="font-size:13px; color:#A1A1AA; font-weight:400;">자동 저장됨 09:25</div>
        </div>

        <!-- Pure Content Area -->
        <div style="max-width:780px; margin:auto 0;">
          <div style="font-size:13px; color:#A1A1AA; letter-spacing:0.02em; margin-bottom:16px;">NO BORDERS. NO CARDS. PURE FOCUS.</div>
          <div style="font-size:56px; font-weight:600; letter-spacing:-0.035em; line-height:1.15; color:#09090B; margin-bottom:28px;">
            디자인의 군더더기가 사라지면,<br>비로소 당신의 생각이 시작됩니다.
          </div>
          <div style="font-size:18px; line-height:1.7; color:#52525B; font-weight:400; margin-bottom:40px;">
            우리는 버튼 테두리와 카드 박스로 가득 찬 복잡한 화면을 걷어냈습니다.<br>
            콘텐츠와 여백의 리듬만으로 가장 깊은 몰입을 경험해 보세요.
          </div>

          <!-- Seamless input line -->
          <div style="display:flex; align-items:center; gap:16px; border-bottom:1px solid #E4E4E7; padding-bottom:16px; max-width:600px;">
            <span style="color:#A1A1AA; font-size:16px;">→</span>
            <input type="text" placeholder="새로운 아이디어를 입력하세요..." style="background:transparent; border:none; outline:none; font-size:16px; color:#18181B; width:100%; font-family:inherit;" value="미니멀한 교육 워크스페이스를 구상 중입니다." readonly>
            <span style="font-size:13px; color:#71717A; font-weight:500;">Enter</span>
          </div>
        </div>

        <!-- Bottom quiet notes -->
        <div style="display:flex; gap:60px; font-size:13px; color:#71717A;">
          <div><strong style="color:#18181B; font-weight:600;">90%</strong> 여백 비율</div>
          <div><strong style="color:#18181B; font-weight:600;">0px</strong> 카드 보더</div>
          <div><strong style="color:#18181B; font-weight:600;">초경량</strong> 시각적 인지 부하 감소</div>
        </div>
      </div>
    `
  },
  {
    id: '04',
    name: 'Progressive Disclosure',
    subtitle: '지금 필요한 것만 직관적으로, 복잡성은 단계적으로 확장',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#F8FAFC; color:#0F172A; font-family:'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Top Nav -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:20px; font-weight:700;">지누의 디자인 공작소 <span style="font-size:13px; font-weight:500; color:#64748B; background:#E2E8F0; padding:4px 10px; border-radius:6px; margin-left:8px;">단계적 정보 구조</span></div>
          <div style="font-size:14px; color:#475569;">계층 1: 기본 요약 ➔ 계층 2: 컨텍스트 확장</div>
        </div>

        <!-- Main Workspace -->
        <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:32px; align-items:center;">
          <!-- Left: Primary Summary -->
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            <div style="display:inline-block; font-size:12px; font-weight:700; color:#2563EB; background:#EFF6FF; padding:4px 12px; border-radius:999px; margin-bottom:16px;">1단계: 즉시 실행</div>
            <div style="font-size:32px; font-weight:800; letter-spacing:-0.03em; margin-bottom:12px;">프롬프트 배포 엔진</div>
            <p style="font-size:15px; color:#64748B; line-height:1.6; margin-bottom:24px;">초기 진입 시에는 사용자에게 가장 중요한 단 하나의 메인 버튼과 상태만 보여줍니다.</p>
            <div style="background:#F1F5F9; border-radius:10px; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
              <div>
                <div style="font-size:13px; color:#64748B;">현재 빌드 상태</div>
                <div style="font-size:16px; font-weight:700; color:#059669;">● 운영 준비 완료 (100%)</div>
              </div>
              <button style="background:#2563EB; color:#fff; border:none; padding:10px 18px; border-radius:8px; font-weight:600; font-size:14px;">원클릭 배포</button>
            </div>
            <div style="font-size:14px; color:#2563EB; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <span>▼ 고급 튜닝 옵션 보기 (클릭하여 확장됨)</span>
            </div>
          </div>

          <!-- Right: Revealed Complexity -->
          <div style="background:#FFFFFF; border:2px solid #3B82F6; border-radius:16px; padding:32px; box-shadow:0 12px 28px rgba(59,130,246,0.08); position:relative;">
            <div style="position:absolute; top:-12px; right:24px; background:#2563EB; color:#fff; font-size:11px; font-weight:700; padding:4px 12px; border-radius:999px;">2단계: 요청 시 공개</div>
            <div style="font-size:20px; font-weight:700; margin-bottom:16px;">심층 매개변수 제어판</div>
            
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div style="border-bottom:1px solid #F1F5F9; padding-bottom:12px;">
                <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:6px;">
                  <span>타이포그래피 트래킹 강도</span>
                  <span style="color:#2563EB;">-0.035em</span>
                </div>
                <div style="height:6px; background:#E2E8F0; border-radius:3px; overflow:hidden;">
                  <div style="width:70%; height:100%; background:#2563EB;"></div>
                </div>
              </div>
              <div style="border-bottom:1px solid #F1F5F9; padding-bottom:12px;">
                <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:6px;">
                  <span>반응형 브레이크포인트 자동 감쇄</span>
                  <span style="color:#059669;">활성화됨</span>
                </div>
              </div>
              <div style="background:#F8FAFC; padding:14px; border-radius:8px; font-size:13px; color:#475569;">
                <strong>💡 인지 부하 원칙:</strong> 사용자가 필요성을 느끼기 전까지 3단계 전문 진단 로직은 배경에 안전하게 감춰집니다.
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="font-size:13px; color:#64748B; border-top:1px solid #E2E8F0; padding-top:16px;">
          복잡한 시스템일수록 직관적인 점진적 노출 설계가 사용자 실수를 85% 이상 방지합니다.
        </div>
      </div>
    `
  },
  {
    id: '05',
    name: 'Material 3 Expressive',
    subtitle: '유기적인 톤온톤 컨테이너, 다이내믹 컬러 토큰, 볼드한 표정',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#FEF7FF; color:#1D1B20; font-family:'Roboto', 'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Header with M3 Shape -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:48px; height:48px; background:#6750A4; border-radius:16px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:24px; font-weight:700;">지</div>
            <div>
              <div style="font-size:22px; font-weight:700; color:#1D1B20;">지누의 디자인 공작소</div>
              <div style="font-size:13px; color:#49454F;">Material 3 Expressive System</div>
            </div>
          </div>
          <div style="background:#E8DEF8; color:#1D192B; padding:10px 24px; border-radius:24px; font-size:14px; font-weight:600;">
            동적 컬러 팔레트 활성
          </div>
        </div>

        <!-- M3 Dynamic Container Cards -->
        <div style="display:grid; grid-template-columns:1.2fr 1fr 1fr; gap:24px; margin:20px 0;">
          <!-- Hero M3 Card -->
          <div style="background:#EADDFF; border-radius:32px; padding:36px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span style="background:#21005D; color:#fff; font-size:12px; font-weight:700; padding:6px 16px; border-radius:20px; display:inline-block; margin-bottom:20px;">Primary Surface</span>
              <div style="font-size:36px; font-weight:800; line-height:1.2; color:#21005D; margin-bottom:16px;">
                부드럽고 대담한<br>표현주의 디자인
              </div>
              <p style="font-size:15px; color:#49454F; line-height:1.6;">
                M3의 진화된 라운딩 토큰과 감성적인 톤 컨테이너로 프로덕트에 생동감과 친근함을 부여합니다.
              </p>
            </div>
            <button style="background:#6750A4; color:#fff; border:none; padding:14px 28px; border-radius:28px; font-size:15px; font-weight:600; align-self:flex-start; margin-top:20px; box-shadow:0 4px 8px rgba(0,0,0,0.15);">
              스튜디오 탐색
            </button>
          </div>

          <!-- Secondary Card -->
          <div style="background:#F3EDF7; border-radius:32px; padding:32px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; font-weight:700; color:#6750A4; margin-bottom:8px;">Secondary Container</div>
              <div style="font-size:24px; font-weight:700; margin-bottom:12px;">풍부한 모션 피드백</div>
              <div style="height:8px; background:#E8DEF8; border-radius:4px; margin:24px 0; overflow:hidden;">
                <div style="width:68%; height:100%; background:#6750A4; border-radius:4px;"></div>
              </div>
              <div style="font-size:14px; color:#49454F;">Spring Physics 기반 인터랙션</div>
            </div>
            <div style="background:#E8DEF8; border-radius:20px; padding:16px; text-align:center; font-weight:600; color:#1D192B;">
              88% 토큰 적합도
            </div>
          </div>

          <!-- Tertiary Card -->
          <div style="background:#FFD8E4; border-radius:32px; padding:32px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:14px; font-weight:700; color:#7D5260; margin-bottom:8px;">Tertiary Highlight</div>
              <div style="font-size:24px; font-weight:700; color:#31111D; margin-bottom:12px;">따뜻한 하이라이트</div>
              <p style="font-size:14px; color:#633B48; line-height:1.5;">
                단조로운 차가운 그레이에서 탈피하여 정서적 만족감을 선사합니다.
              </p>
            </div>
            <div style="width:56px; height:56px; background:#7D5260; border-radius:20px; align-self:flex-end; display:flex; align-items:center; justify-content:center; color:#fff; font-size:24px; box-shadow:0 6px 12px rgba(125,82,96,0.3);">
              +
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:13px; color:#79747E;">
          <span>Google Material Design 3 Spec 2026</span>
          <span>지누의 디자인 공작소 — Dynamic Expressive UI</span>
        </div>
      </div>
    `
  },
  {
    id: '06',
    name: 'Human-Centered Warm UI',
    subtitle: '차분한 어스톤과 온기 있는 텍스처, 편안함이 우선하는 인터페이스',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#FAF7F2; color:#2E2824; font-family:'Pretendard', serif, sans-serif; padding:55px 75px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #EADBCC; padding-bottom:20px;">
          <div style="font-size:22px; font-weight:700; color:#423730;">지누의 디자인 공작소 <span style="font-size:14px; font-weight:400; color:#8C7E74; margin-left:8px;">따스한 숨결을 담다</span></div>
          <div style="display:flex; gap:28px; font-size:15px; color:#6B5E55;">
            <span>우리의 철학</span>
            <span>따뜻한 에듀테크</span>
            <span>공방 기록</span>
          </div>
        </div>

        <!-- Warm Centerpiece -->
        <div style="display:grid; grid-template-columns:1.3fr 1fr; gap:40px; align-items:center;">
          <div>
            <div style="font-size:14px; font-weight:600; color:#C46849; letter-spacing:0.02em; margin-bottom:12px;">COMFORT BEFORE SPECTACLE</div>
            <div style="font-size:48px; font-weight:700; line-height:1.2; color:#362B24; margin-bottom:20px; font-family:'Noto Serif KR', Georgia, serif;">
              차가운 화면 너머로<br>전해지는 사람의 온기.
            </div>
            <p style="font-size:17px; line-height:1.7; color:#6E6157; margin-bottom:30px;">
              강한 네온과 차가운 메탈 대신, 손으로 빚은 듯한 내추럴 린넨과 웜 베이지 톤을 머금었습니다. 교육과 쉼, 사유를 위한 가장 편안한 공간입니다.
            </p>
            <div style="display:flex; gap:16px;">
              <button style="background:#C46849; color:#fff; border:none; padding:12px 26px; border-radius:12px; font-size:15px; font-weight:600; cursor:pointer;">
                이야기 나누기
              </button>
              <button style="background:#EFE8DE; color:#423730; border:1px solid #DFD5C6; padding:12px 22px; border-radius:12px; font-size:15px; font-weight:500;">
                서재 둘러보기
              </button>
            </div>
          </div>

          <!-- Warm Note Cards -->
          <div style="background:#FFFDF9; border:1px solid #EAE1D5; border-radius:20px; padding:32px; box-shadow:0 8px 24px rgba(66,55,48,0.04);">
            <div style="font-size:13px; font-weight:700; color:#8A9A86; text-transform:uppercase; margin-bottom:10px;">SEEKING BALANCE</div>
            <div style="font-size:20px; font-weight:700; color:#362B24; margin-bottom:16px;">선생님과 아이들의 눈이 피로하지 않도록</div>
            <p style="font-size:14px; line-height:1.6; color:#6E6157; margin-bottom:20px;">
              지나친 대비를 지양하고 1.6~1.8의 여유로운 행간과 천연 광물에서 영감을 얻은 세이지 그린, 테라코타 컬러로 시각적 평온함을 선사합니다.
            </p>
            <div style="display:flex; gap:12px;">
              <span style="background:#F2EBE1; color:#5A4D43; font-size:12px; padding:6px 14px; border-radius:8px;">#FAF7F2 베이지</span>
              <span style="background:#F5ECE8; color:#C46849; font-size:12px; padding:6px 14px; border-radius:8px;">#C46849 테라코타</span>
              <span style="background:#EBF0EA; color:#587053; font-size:12px; padding:6px 14px; border-radius:8px;">#587053 세이지</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:13px; color:#96887D;">
          <span>지누의 디자인 공작소 — Human-Centered Natural Palette</span>
          <span>자연의 조화를 닮은 UI</span>
        </div>
      </div>
    `
  },
  {
    id: '07',
    name: 'Bento Grid',
    subtitle: '크기로 중요성을 전달하는 현대적 모듈형 벤토 인터페이스',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#0F1117; color:#FFFFFF; font-family:'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:22px; font-weight:800; letter-spacing:-0.03em;">지누의 디자인 공작소 <span style="font-size:13px; font-weight:600; color:#38BDF8; background:rgba(56,189,248,0.1); padding:4px 12px; border-radius:999px; border:1px solid rgba(56,189,248,0.2); margin-left:8px;">Bento Modular Grid</span></div>
          <div style="font-size:13px; color:#94A3B8;">16개 디자인 파이프라인 통합 관리</div>
        </div>

        <!-- Bento Grid 6-Module Setup -->
        <div style="display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:1fr 1fr; gap:20px; height:520px; margin:20px 0;">
          <!-- Bento 1: Large Feature (2x2 span) -->
          <div style="grid-row:span 2; background:#181C27; border:1px solid #283044; border-radius:24px; padding:36px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
            <div style="position:absolute; top:-30px; right:-30px; width:160px; height:160px; background:radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%); border-radius:50%;"></div>
            <div>
              <span style="font-size:12px; font-weight:700; color:#38BDF8; letter-spacing:0.05em; text-transform:uppercase;">Primary Hero Box</span>
              <div style="font-size:36px; font-weight:800; line-height:1.15; margin:16px 0 12px 0;">
                한눈에 파악하는<br>모듈러 대시보드
              </div>
              <p style="font-size:15px; color:#94A3B8; line-height:1.6;">
                크기가 곧 계층입니다. 가장 중요한 데이터를 가장 큰 벤토 블록에 담고, 유기적인 비례로 정보를 배치합니다.
              </p>
            </div>
            <div style="background:#111520; border:1px solid #232B3E; border-radius:16px; padding:20px;">
              <div style="font-size:13px; color:#64748B; margin-bottom:6px;">실시간 엔진 처리량</div>
              <div style="font-size:28px; font-weight:800; color:#38BDF8;">4.8M ops/sec</div>
            </div>
          </div>

          <!-- Bento 2: Stats Top -->
          <div style="background:#181C27; border:1px solid #283044; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="font-size:13px; color:#94A3B8; font-weight:600;">타이포 반응도</div>
            <div style="font-size:40px; font-weight:900; color:#10B981;">100%</div>
            <div style="font-size:12px; color:#64748B;">모든 디바이스 완벽 비율</div>
          </div>

          <!-- Bento 3: Quick Action -->
          <div style="background:#181C27; border:1px solid #283044; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="font-size:13px; color:#94A3B8; font-weight:600;">글로벌 표준화</div>
            <div style="font-size:24px; font-weight:800;">2026 Ready</div>
            <div style="font-size:12px; color:#38BDF8;">FCAH 규격 충족</div>
          </div>

          <!-- Bento 4: Wide Module -->
          <div style="grid-column:span 2; background:#181C27; border:1px solid #283044; border-radius:24px; padding:24px 32px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:18px; font-weight:700;">직관적인 모듈 제어 시스템</div>
              <div style="font-size:13px; color:#94A3B8; margin-top:4px;">블록 간격 20px, 일관된 곡률 반경(24px)으로 완성된 조화</div>
            </div>
            <button style="background:#38BDF8; color:#0F172A; border:none; padding:12px 24px; border-radius:12px; font-weight:700; font-size:14px; cursor:pointer;">
              상세 분석 ➔
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748B;">
          <span>지누의 디자인 공작소 — Bento Grid Spec</span>
          <span>Apple & Linear Inspired Layout</span>
        </div>
      </div>
    `
  },
  {
    id: '08',
    name: 'Bauhaus Functional UI',
    subtitle: '형태는 기능을 따른다. 기하학 기본 도형과 삼원색의 엄격한 조화',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#F4F4F0; color:#111111; font-family:'Futura', 'Trebuchet MS', 'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; border:10px solid #111;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:6px solid #111; padding-bottom:16px;">
          <div style="font-size:28px; font-weight:900; letter-spacing:-0.02em;">STAATLICHES BAUHAUS 1919-2026</div>
          <div style="display:flex; gap:12px;">
            <div style="width:24px; height:24px; background:#E63946; border-radius:50%;"></div>
            <div style="width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:24px solid #FFB703;"></div>
            <div style="width:24px; height:24px; background:#1D3557;"></div>
          </div>
        </div>

        <!-- Main Bauhaus Geometry Area -->
        <div style="display:grid; grid-template-columns:1.4fr 1fr; gap:40px; align-items:stretch; margin:30px 0;">
          <!-- Left: Radical Functionalism -->
          <div style="border-right:4px solid #111; padding-right:40px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:15px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:12px; color:#E63946;">지누의 디자인 공작소 — DESSAU</div>
              <div style="font-size:54px; font-weight:900; line-height:1.05; letter-spacing:-0.03em; margin-bottom:20px;">
                FORM FOLLOWS<br>FUNCTION.
              </div>
              <p style="font-size:16px; line-height:1.6; font-weight:600; color:#333;">
                장식은 죄악이다. 순수한 원, 삼각형, 사각형과 원색 삼원색(Red, Yellow, Blue)의 기능적 결합만이 인터페이스의 본질을 설명한다.
              </p>
            </div>
            <div style="display:flex; gap:0; border:4px solid #111;">
              <div style="flex:1; background:#E63946; color:#fff; padding:16px; font-weight:900; text-align:center;">RED: ACTION</div>
              <div style="flex:1; background:#FFB703; color:#111; padding:16px; font-weight:900; text-align:center;">YELLOW: WARN</div>
              <div style="flex:1; background:#1D3557; color:#fff; padding:16px; font-weight:900; text-align:center;">BLUE: FOCUS</div>
            </div>
          </div>

          <!-- Right: Geometric Modules -->
          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
            <div style="background:#111; color:#fff; padding:24px;">
              <div style="font-size:12px; font-weight:700; color:#FFB703;">GEOMETRIC RULE 01</div>
              <div style="font-size:24px; font-weight:800; margin-top:8px;">불필요한 곡선 배제</div>
              <div style="font-size:13px; color:#bbb; margin-top:6px;">명확한 기능적 필요가 없는 장식성 라운딩 금지</div>
            </div>
            <div style="background:#E63946; color:#fff; padding:24px;">
              <div style="font-size:12px; font-weight:700;">GEOMETRIC RULE 02</div>
              <div style="font-size:24px; font-weight:800; margin-top:8px;">명확한 대조와 질서</div>
              <div style="font-size:13px; color:#fce; margin-top:6px;">흑과 백, 원색이 만드는 가시성 100% 보장</div>
            </div>
            <div style="border:4px solid #111; padding:20px; font-weight:900; text-align:center; font-size:18px;">
              기능적 조작부 실행 ➔
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:13px; border-top:4px solid #111; padding-top:14px;">
          <span>지누의 디자인 공작소 — WEIMAR / DESSAU / BERLIN</span>
          <span>BAUHAUS MODERN FUNCTIONAL UI</span>
        </div>
      </div>
    `
  },
  {
    id: '09',
    name: 'Modern Neo-Brutalism',
    subtitle: '두꺼운 블랙 아웃라인, 하드 드롭 섀도우, 직관적이고 위트 있는 볼드함',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#FFFBEB; color:#000000; font-family:'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="background:#FFE600; border:3px solid #000; box-shadow:4px 4px 0px #000; padding:10px 20px; font-weight:900; font-size:20px;">
            ⚡ 지누의 디자인 공작소
          </div>
          <div style="display:flex; gap:16px;">
            <span style="background:#FF5483; color:#fff; border:3px solid #000; box-shadow:3px 3px 0px #000; padding:8px 16px; font-weight:800; font-size:13px;">NEO-BRUTALISM</span>
            <span style="background:#4DEEEA; border:3px solid #000; box-shadow:3px 3px 0px #000; padding:8px 16px; font-weight:800; font-size:13px;">RAW & BOLD</span>
          </div>
        </div>

        <!-- Main Brutal Cards -->
        <div style="display:grid; grid-template-columns:1.4fr 1fr; gap:36px; align-items:center;">
          <!-- Big Card -->
          <div style="background:#FFFFFF; border:4px solid #000; box-shadow:8px 8px 0px #000; padding:40px; position:relative;">
            <div style="background:#74F0ED; border:3px solid #000; display:inline-block; padding:4px 14px; font-weight:900; font-size:13px; margin-bottom:16px;">
              규칙 따윈 잊어라!
            </div>
            <div style="font-size:46px; font-weight:900; line-height:1.1; letter-spacing:-0.03em; margin-bottom:18px;">
              부드러운 그라데이션에<br>지치셨나요?
            </div>
            <p style="font-size:16px; line-height:1.6; font-weight:600; color:#222; margin-bottom:28px;">
              선명한 4px 블랙 스트로크와 단호한 하드 섀도우. 2026년 가장 솔직하고 시선을 강탈하는 현대적 네오 브루탈리즘의 세계입니다.
            </p>
            <div style="display:flex; gap:16px;">
              <button style="background:#FFE600; color:#000; border:3px solid #000; box-shadow:4px 4px 0px #000; padding:14px 28px; font-size:16px; font-weight:900; cursor:pointer;">
                지금 당장 써보기 🔥
              </button>
              <button style="background:#FFFFFF; color:#000; border:3px solid #000; box-shadow:4px 4px 0px #000; padding:14px 24px; font-size:16px; font-weight:800;">
                더 알아보기
              </button>
            </div>
          </div>

          <!-- Stack of brutal components -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div style="background:#FF90E8; border:3px solid #000; box-shadow:5px 5px 0px #000; padding:20px;">
              <div style="font-size:13px; font-weight:900;">HIGH CONTRAST</div>
              <div style="font-size:24px; font-weight:900; margin-top:4px;">100% 순수 원색 배합</div>
            </div>
            <div style="background:#90FFA9; border:3px solid #000; box-shadow:5px 5px 0px #000; padding:20px;">
              <div style="font-size:13px; font-weight:900;">HARD OFFSET SHADOW</div>
              <div style="font-size:24px; font-weight:900; margin-top:4px;">흐림 효과 제로 (Blur 0px)</div>
            </div>
            <div style="background:#FFFFFF; border:3px solid #000; box-shadow:5px 5px 0px #000; padding:20px;">
              <div style="font-size:13px; font-weight:900; color:#FF5483;">GUMROAD & FIGMA VIBE</div>
              <div style="font-size:20px; font-weight:900; margin-top:4px;">개성 넘치는 영크리에이터 감성</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:14px; border-top:3px solid #000; padding-top:16px;">
          <span>지누의 디자인 공작소 — MODERN NEO-BRUTALISM</span>
          <span>NO BLUR, NO GRADIENT, JUST RAW IMPACT</span>
        </div>
      </div>
    `
  },
  {
    id: '10',
    name: 'Organic Anti-Grid',
    subtitle: '획일화된 그리드를 벗어난 물결 곡선과 자연주의 유기적 레이아웃',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#F5F2EB; color:#2A2D28; font-family:'Pretendard', sans-serif; padding:55px 75px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
        <!-- Organic Blobs in Background -->
        <div style="position:absolute; top:-50px; right:-80px; width:450px; height:450px; background:radial-gradient(circle, #E3DCCE 0%, rgba(227,220,206,0) 70%); border-radius:40% 60% 70% 30% / 40% 50% 60% 50%; z-index:0;"></div>
        <div style="position:absolute; bottom:-60px; left:100px; width:380px; height:380px; background:radial-gradient(circle, #EAE4D6 0%, rgba(234,228,214,0) 70%); border-radius:60% 40% 30% 70% / 60% 30% 70% 40%; z-index:0;"></div>

        <!-- Header -->
        <div style="position:relative; z-index:1; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:22px; font-weight:700; color:#232721;">지누의 디자인 공작소 <span style="font-size:13px; font-weight:500; color:#5D6657; margin-left:8px;">자연을 닮은 안티 그리드</span></div>
          <div style="background:#E2DDD0; padding:8px 20px; border-radius:30px 15px 25px 10px; font-size:13px; font-weight:600; color:#3C4436;">유기적 조화</div>
        </div>

        <!-- Organic Flow Section -->
        <div style="position:relative; z-index:1; display:grid; grid-template-columns:1.2fr 1fr; gap:48px; align-items:center;">
          <div>
            <div style="font-size:13px; font-weight:600; color:#6B7863; letter-spacing:0.04em; margin-bottom:12px;">ORGANIC FLUID FLOW</div>
            <div style="font-size:50px; font-weight:800; line-height:1.15; letter-spacing:-0.03em; margin-bottom:20px; color:#1E221C;">
              인위적인 사각틀을<br>넘어선 유려한 흐름.
            </div>
            <p style="font-size:16px; line-height:1.7; color:#555E50; margin-bottom:30px;">
              정형화된 사각 박스 대신, 바람과 대지의 곡선을 차용했습니다. 그리드를 탈피하되 시선 흐름의 가독성은 엄격하게 유지합니다.
            </p>
            <div style="display:flex; gap:16px; align-items:center;">
              <button style="background:#465340; color:#fff; border:none; padding:14px 30px; border-radius:40px 15px 35px 20px; font-size:15px; font-weight:600; cursor:pointer;">
                자연의 리듬 체험
              </button>
              <span style="font-size:14px; color:#6B7863; font-weight:500;">자유 비대칭 구조</span>
            </div>
          </div>

          <!-- Fluid Organic Cards -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div style="background:#FAF8F5; border-radius:50px 20px 45px 15px; padding:32px; box-shadow:0 12px 30px rgba(42,45,40,0.05); border:1px solid #E5E0D5;">
              <div style="font-size:13px; font-weight:700; color:#6B7863;">비정형 모듈 01</div>
              <div style="font-size:22px; font-weight:700; margin:8px 0; color:#232721;">물 흐르듯 이어지는 시각 동선</div>
              <div style="font-size:14px; color:#667060; line-height:1.5;">모서리 곡률이 요소마다 유기적으로 호흡하며 화면에 생명력을 더합니다.</div>
            </div>
            <div style="background:#E7E1D4; border-radius:20px 50px 15px 45px; padding:24px 32px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; font-size:16px; color:#2A3125;">조화로운 비대칭 균형</div>
                <div style="font-size:13px; color:#606A58;">수학적 그리드가 아닌 시각적 무게감 중심</div>
              </div>
              <div style="font-size:24px; color:#465340;">🌿</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="position:relative; z-index:1; display:flex; justify-content:space-between; font-size:13px; color:#788470;">
          <span>지누의 디자인 공작소 — ORGANIC & ANTI-GRID PHILOSOPHY</span>
          <span>HUMAN & NATURE HARMONY 2026</span>
        </div>
      </div>
    `
  },
  {
    id: '11',
    name: 'Tactile Analog UI',
    subtitle: '스큐어모픽 아날로그 감성, 가죽·종이·금속 노브의 촉각적 경험',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#242528; color:#E1DFDD; font-family:'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; border:12px solid #1A1A1C; box-shadow:inset 0 0 40px rgba(0,0,0,0.8);">
        <!-- Top Analog Rack Faceplate -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #383A40; padding-bottom:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:12px; height:12px; background:#FF453A; border-radius:50%; box-shadow:0 0 10px #FF453A;"></div>
            <div style="font-size:18px; font-weight:800; letter-spacing:0.06em; color:#ECE9E6;">JINWOO ANALOG AUDIO-LAB / MODEL 16</div>
          </div>
          <div style="font-family:monospace; font-size:13px; color:#A19F9D; background:#18181A; border:1px solid #333; padding:6px 14px; border-radius:4px;">
            VU-METER ACTIVE [48kHz / 24-BIT]
          </div>
        </div>

        <!-- Hardware Knobs and Tactile Controls -->
        <div style="display:grid; grid-template-columns:1.3fr 1fr; gap:40px; align-items:center;">
          <!-- Left: Brushed Steel Control Deck -->
          <div style="background:#2D2F34; border:1px solid #44474E; border-radius:12px; padding:36px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5);">
            <div style="font-size:12px; font-weight:700; color:#E5A93C; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:8px;">MASTER CONSOLE</div>
            <div style="font-size:36px; font-weight:800; color:#FFFFFF; margin-bottom:12px; letter-spacing:-0.02em;">
              손끝에 닿는<br>물리적 정밀성.
            </div>
            <p style="font-size:14px; line-height:1.6; color:#A19F9D; margin-bottom:28px;">
              플랫한 디지털 세계에 촉각적 생기를 불어넣습니다. 정밀한 음각 다이얼, 널링 금속 노브, 묵직한 토글 스위치의 아날로그 피드백.
            </p>
            <!-- Physical Knobs Representation -->
            <div style="display:flex; gap:32px;">
              <div style="text-align:center;">
                <div style="width:64px; height:64px; border-radius:50%; background:conic-gradient(#555, #222, #888, #333); border:3px solid #111; box-shadow:0 6px 12px rgba(0,0,0,0.6); margin:0 auto 8px auto; position:relative;">
                  <div style="position:absolute; top:4px; left:50%; width:3px; height:18px; background:#E5A93C; transform:translateX(-50%);"></div>
                </div>
                <div style="font-size:11px; font-weight:700; color:#A19F9D;">RESONANCE</div>
              </div>
              <div style="text-align:center;">
                <div style="width:64px; height:64px; border-radius:50%; background:conic-gradient(#555, #222, #888, #333); border:3px solid #111; box-shadow:0 6px 12px rgba(0,0,0,0.6); margin:0 auto 8px auto; position:relative;">
                  <div style="position:absolute; top:4px; left:50%; width:3px; height:18px; background:#FF453A; transform:translateX(-50%) rotate(45deg);"></div>
                </div>
                <div style="font-size:11px; font-weight:700; color:#A19F9D;">OUTPUT GAIN</div>
              </div>
              <div style="text-align:center;">
                <div style="width:64px; height:64px; border-radius:50%; background:conic-gradient(#555, #222, #888, #333); border:3px solid #111; box-shadow:0 6px 12px rgba(0,0,0,0.6); margin:0 auto 8px auto; position:relative;">
                  <div style="position:absolute; top:4px; left:50%; width:3px; height:18px; background:#30D158; transform:translateX(-50%) rotate(-30deg);"></div>
                </div>
                <div style="font-size:11px; font-weight:700; color:#A19F9D;">WARMTH</div>
              </div>
            </div>
          </div>

          <!-- Right: Analog VU Level Meter -->
          <div style="background:#1C1D20; border:2px solid #333; border-radius:12px; padding:28px; box-shadow:inset 0 4px 15px rgba(0,0,0,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span style="font-size:12px; font-weight:700; color:#E5A93C;">VU METER</span>
              <span style="font-size:11px; color:#666;">STEREO LEVEL</span>
            </div>
            <!-- Vintage Meter Display -->
            <div style="background:#EFEAD8; border-radius:8px; padding:20px; color:#111; border:2px solid #888; position:relative; overflow:hidden;">
              <div style="display:flex; justify-content:space-between; font-family:monospace; font-weight:700; font-size:12px;">
                <span>-20</span><span>-10</span><span>-5</span><span>-1</span><span style="color:#D32F2F;">0</span><span style="color:#D32F2F;">+3</span>
              </div>
              <div style="height:3px; background:#D32F2F; width:75%; margin:16px 0 6px 0; border-radius:2px;"></div>
              <div style="text-align:center; font-size:11px; font-weight:800; color:#444;">VOLUME UNIT</div>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:space-around;">
              <button style="background:#33363D; color:#fff; border:1px solid #555; padding:8px 20px; border-radius:4px; font-size:12px; font-weight:700; box-shadow:0 4px 0 #111;">POWER ON</button>
              <button style="background:#33363D; color:#E5A93C; border:1px solid #555; padding:8px 20px; border-radius:4px; font-size:12px; font-weight:700; box-shadow:0 4px 0 #111;">ANALOG 96k</button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#777; border-top:1px solid #333; padding-top:14px;">
          <span>지누의 디자인 공작소 — Tactile Analog Engineering</span>
          <span>Skeuomorphic Touch & Sound Architecture</span>
        </div>
      </div>
    `
  },
  {
    id: '12',
    name: 'Retrofuturism',
    subtitle: '80년대 신스웨이브와 사이버 네온 그리드, 레트로 퓨처 감성',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#0B0D17; color:#E2E8F0; font-family:'Pretendard', monospace, sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
        <!-- Neon Horizon Background -->
        <div style="position:absolute; bottom:0; left:0; width:100%; height:260px; background:linear-gradient(to top, rgba(0,240,255,0.08) 0%, transparent 100%); pointer-events:none;"></div>
        <div style="position:absolute; top:-100px; right:100px; width:300px; height:300px; background:radial-gradient(circle, rgba(255,0,127,0.2) 0%, transparent 70%);"></div>

        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,240,255,0.3); padding-bottom:16px;">
          <div style="font-size:24px; font-weight:900; letter-spacing:0.08em; color:#00F0FF; text-shadow:0 0 12px rgba(0,240,255,0.6);">
            지누의 공작소 // RETROFUTURISM
          </div>
          <div style="font-family:monospace; color:#FF007F; font-size:14px; letter-spacing:0.1em; border:1px solid #FF007F; padding:4px 12px; border-radius:2px; box-shadow:0 0 10px rgba(255,0,127,0.4);">
            SYS: 1984_SYNTHWAVE
          </div>
        </div>

        <!-- Cyber Centerpiece -->
        <div style="display:grid; grid-template-columns:1.3fr 1fr; gap:40px; align-items:center; position:relative; z-index:1;">
          <div>
            <div style="font-size:13px; font-family:monospace; color:#00F0FF; margin-bottom:12px; letter-spacing:0.15em;">
              &gt; INITIALIZING SYNTH-CORE PROTOCOL...
            </div>
            <div style="font-size:52px; font-weight:900; line-height:1.08; letter-spacing:-0.02em; margin-bottom:20px; color:#FFFFFF; text-shadow:0 0 20px rgba(255,255,255,0.2);">
              과거가 꿈꿨던<br>찬란한 미래의 풍경.
            </div>
            <p style="font-size:16px; line-height:1.6; color:#94A3B8; margin-bottom:28px;">
              CRT 스캔라인, 일렉트릭 사이안과 마젠타 네온의 대비. 아케이드 게임과 미래 비행체가 교차하던 시대의 낭만을 현대 웹으로 소환합니다.
            </p>
            <div style="display:flex; gap:16px;">
              <button style="background:transparent; color:#00F0FF; border:2px solid #00F0FF; padding:12px 28px; font-size:14px; font-weight:800; letter-spacing:0.08em; box-shadow:0 0 16px rgba(0,240,255,0.4); cursor:pointer;">
                HYPERDRIVE ENGAGE
              </button>
              <button style="background:rgba(255,0,127,0.1); color:#FF007F; border:1px solid #FF007F; padding:12px 24px; font-size:14px; font-weight:700;">
                스캔라인 토글
              </button>
            </div>
          </div>

          <!-- Retro Cyber Panel -->
          <div style="background:rgba(18,22,36,0.8); border:1px solid rgba(0,240,255,0.4); border-radius:8px; padding:32px; box-shadow:0 0 30px rgba(0,240,255,0.15);">
            <div style="font-family:monospace; font-size:12px; color:#FF007F; margin-bottom:12px;">TELEMETRY STATS</div>
            <div style="font-size:32px; font-weight:900; color:#00F0FF; margin-bottom:6px;">88.4 MPH</div>
            <div style="font-size:13px; color:#64748B; margin-bottom:24px;">시간 도약 임계 속도 도달</div>
            
            <div style="border-top:1px dashed rgba(255,255,255,0.15); padding-top:16px; display:flex; flex-direction:column; gap:10px; font-family:monospace; font-size:13px;">
              <div style="display:flex; justify-content:space-between;">
                <span style="color:#94A3B8;">NEON PURITY</span>
                <span style="color:#00F0FF;">99.4% OK</span>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:#94A3B8;">GRID PERSPECTIVE</span>
                <span style="color:#FF007F;">ROTATION -15°</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748B; font-family:monospace; border-top:1px solid rgba(255,255,255,0.1); padding-top:14px;">
          <span>지누의 디자인 공작소 — CYBERNETIC NOSTALGIA</span>
          <span>OUTRUN / SYNTHWAVE DESIGN SPEC</span>
        </div>
      </div>
    `
  },
  {
    id: '13',
    name: 'Contemporary Editorial Design',
    subtitle: '하이엔드 매거진 감성, 우아한 세리프 타이포와 비대칭 에디토리얼 그리드',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#F9F8F6; color:#1C1A17; font-family:'Pretendard', serif, sans-serif; padding:55px 75px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:1px solid #1C1A17; padding-bottom:16px;">
          <div>
            <div style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#78726A;">THE DESIGN WORKSHOP JOURNAL — VOL. 16</div>
            <div style="font-size:26px; font-weight:800; font-family:'Noto Serif KR', Georgia, serif; letter-spacing:-0.02em;">지누의 디자인 공작소</div>
          </div>
          <div style="font-size:13px; font-family:serif; font-style:italic; color:#555;">Autumn / Winter Edition 2026</div>
        </div>

        <!-- Editorial Feature Columns -->
        <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:36px; margin:24px 0;">
          <!-- Main Big Headline -->
          <div style="border-right:1px solid #E5E1DA; padding-right:36px;">
            <div style="font-size:12px; font-weight:700; color:#A65839; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:14px;">SPECIAL ESSAY</div>
            <div style="font-size:52px; font-weight:700; font-family:'Noto Serif KR', Georgia, serif; line-height:1.1; letter-spacing:-0.03em; margin-bottom:20px;">
              활자가 전하는<br>침묵의 깊이.
            </div>
            <p style="font-size:16px; line-height:1.75; color:#57514A; font-family:'Noto Serif KR', Georgia, serif;">
              우아한 세리프와 볼드한 산세리프가 교차하며 만들어내는 서사. 단순한 인터페이스를 넘어, 한 편의 정제된 책을 읽는 듯한 지적 충만함을 선사합니다.
            </p>
          </div>

          <!-- Column 2 -->
          <div style="border-right:1px solid #E5E1DA; padding-right:36px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:11px; font-weight:700; letter-spacing:0.1em; color:#78726A; margin-bottom:12px;">CRITIQUE / 01</div>
              <div style="font-size:20px; font-weight:700; font-family:'Noto Serif KR', serif; margin-bottom:12px;">
                여백은 빈자리가 아닌 호흡이다
              </div>
              <p style="font-size:14px; line-height:1.7; color:#6B645D;">
                에디토리얼 레이아웃의 본질은 정보의 빽빽한 채움이 아니라, 독자의 시선이 머무를 수 있는 우아한 여백의 리듬에 있습니다.
              </p>
            </div>
            <div style="font-size:13px; font-weight:700; color:#1C1A17; border-top:1px solid #1C1A17; padding-top:12px;">
              READ ESSAY ➔
            </div>
          </div>

          <!-- Column 3 -->
          <div style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:11px; font-weight:700; letter-spacing:0.1em; color:#78726A; margin-bottom:12px;">TYPOGRAPHY SPEC</div>
              <div style="font-size:36px; font-weight:800; color:#A65839; font-family:serif;">1.75 em</div>
              <div style="font-size:13px; color:#78726A; margin-top:4px;">최적의 장문 행간 비례</div>
            </div>
            <div style="background:#EFECE6; padding:20px; border-radius:4px;">
              <div style="font-size:12px; font-weight:700; margin-bottom:6px;">에디토리얼 팔레트</div>
              <div style="font-size:13px; color:#555;">페이퍼 아이보리, 잉크 챠콜, 테라코타</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#78726A; border-top:1px solid #1C1A17; padding-top:14px;">
          <span>지누의 디자인 공작소 — CONTEMPORARY EDITORIAL UI</span>
          <span>CURATED BY JINWOO STUDIO</span>
        </div>
      </div>
    `
  },
  {
    id: '14',
    name: 'Kinetic Typography',
    subtitle: '타이포그래피 자체가 비주얼 히어로, 역동적인 모션과 거대 활자',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#000000; color:#FFFFFF; font-family:'Pretendard', 'Impact', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; position:relative;">
        <!-- Top marquee banner -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #222; padding-bottom:16px;">
          <div style="font-size:20px; font-weight:900; letter-spacing:0.05em; color:#FFE500;">
            ⚡ JINWOO KINETIC TYPE LAB
          </div>
          <div style="font-size:13px; font-weight:700; color:#888;">
            VARIABLE WEIGHT: 100 ➔ 900 ACTIVE
          </div>
        </div>

        <!-- Giant Kinetic Type Center -->
        <div style="margin:20px 0;">
          <div style="font-size:82px; font-weight:900; line-height:0.95; letter-spacing:-0.05em; text-transform:uppercase; color:#FFFFFF;">
            LET THE TYPE<br>
            <span style="color:#FFE500; -webkit-text-stroke:2px #FFE500;">MOVE THE SOUL.</span>
          </div>
          <div style="font-size:18px; font-weight:500; color:#888; margin-top:24px; max-width:650px; line-height:1.6;">
            이미지나 아이콘 뒤에 숨지 않는 활자의 당당한 외침. 크기와 리듬, 속도 변화만으로 화면 전체를 장악하는 강렬한 비주얼 임팩트를 선사합니다.
          </div>
        </div>

        <!-- Marquee Strip Mock -->
        <div style="background:#FFE500; color:#000; padding:12px 0; font-size:16px; font-weight:900; letter-spacing:0.1em; display:flex; gap:40px; overflow:hidden; white-space:nowrap;">
          <span>지누의 디자인 공작소</span> ✦ <span>KINETIC MOTION</span> ✦ <span>DYNAMIC SCALE</span> ✦ <span>VARIABLE WEIGHT</span> ✦ <span>TYPOGRAPHY FIRST</span> ✦ <span>지누의 디자인 공작소</span>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:13px; color:#666; padding-top:14px;">
          <span>지누의 디자인 공작소 — Kinetic Typography System</span>
          <span>HIGH IMPACT VISUAL COMMUNICATION</span>
        </div>
      </div>
    `
  },
  {
    id: '15',
    name: 'Scrollytelling',
    subtitle: '스크롤과 함께 펼쳐지는 하나의 서사, 몰입형 스토리텔링 인터페이스',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#0E131F; color:#F8FAFC; font-family:'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; position:relative;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1E293B; padding-bottom:16px;">
          <div style="font-size:22px; font-weight:800; color:#38BDF8;">
            지누의 디자인 공작소 <span style="font-size:13px; font-weight:500; color:#94A3B8; margin-left:8px;">내러티브 스크롤리텔링</span>
          </div>
          <div style="font-size:13px; color:#38BDF8; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); padding:4px 14px; border-radius:999px;">
            CHAPTER 02 / 03 PROCEEDING
          </div>
        </div>

        <!-- Scrollytelling Interactive Timeline -->
        <div style="display:grid; grid-template-columns:1fr 1.4fr; gap:48px; align-items:center;">
          <!-- Left: Chapter Progress Track -->
          <div style="display:flex; flex-direction:column; gap:28px; border-left:3px solid #1E293B; padding-left:24px;">
            <div style="opacity:0.5;">
              <div style="font-size:12px; font-weight:700; color:#64748B;">01 PROBLEM</div>
              <div style="font-size:18px; font-weight:700; color:#94A3B8;">파편화된 디자인 프롬프트</div>
            </div>
            <div style="border-left:3px solid #38BDF8; margin-left:-27px; padding-left:24px;">
              <div style="font-size:12px; font-weight:700; color:#38BDF8;">02 APPROACH (ACTIVE)</div>
              <div style="font-size:22px; font-weight:800; color:#FFFFFF;">체계화된 16대 스타일 공작소</div>
              <div style="font-size:13px; color:#94A3B8; margin-top:4px;">스크롤 인터랙션과 함께 동적으로 확장되는 인사이트</div>
            </div>
            <div style="opacity:0.5;">
              <div style="font-size:12px; font-weight:700; color:#64748B;">03 OUTCOME</div>
              <div style="font-size:18px; font-weight:700; color:#94A3B8;">완벽한 프롬프트 자산화 및 복사</div>
            </div>
          </div>

          <!-- Right: Visual Card Triggered by Chapter -->
          <div style="background:#151C2C; border:1px solid #29354E; border-radius:20px; padding:36px; box-shadow:0 16px 36px rgba(0,0,0,0.4);">
            <div style="font-size:13px; font-weight:700; color:#38BDF8; margin-bottom:12px;">SCENE TRANSITION</div>
            <div style="font-size:32px; font-weight:800; line-height:1.2; margin-bottom:16px;">
              스크롤을 내릴 때마다<br>이야기가 입체적으로 열립니다.
            </div>
            <p style="font-size:15px; color:#94A3B8; line-height:1.6; margin-bottom:24px;">
              정적인 페이지를 넘어, 사용자의 탐색 속도에 맞춰 시각적 요소와 데이터가 한 편의 영화처럼 연출됩니다.
            </p>
            <div style="height:6px; background:#29354E; border-radius:3px; overflow:hidden;">
              <div style="width:65%; height:100%; background:#38BDF8;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748B; margin-top:8px;">
              <span>전체 스토리 진행도</span>
              <span style="color:#38BDF8; font-weight:700;">65%</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748B; border-top:1px solid #1E293B; padding-top:14px;">
          <span>지누의 디자인 공작소 — Narrative Scrollytelling Architecture</span>
          <span>Scroll-Driven Immersive Web</span>
        </div>
      </div>
    `
  },
  {
    id: '16',
    name: 'Light Gamification',
    subtitle: '성취와 보상의 즐거운 자극, 스트릭과 레벨 배지가 이끄는 프로그레스 UI',
    renderHtml: () => `
      <div style="width:1200px; height:750px; background:#F8FAFC; color:#0F172A; font-family:'Pretendard', sans-serif; padding:50px 70px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="background:#6366F1; color:#fff; font-size:20px; font-weight:900; width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(99,102,241,0.3);">
              🏆
            </div>
            <div>
              <div style="font-size:20px; font-weight:800;">지누의 디자인 공작소</div>
              <div style="font-size:13px; color:#64748B;">게이미피케이션 동기부여 스튜디오</div>
            </div>
          </div>
          <!-- Streak & Level Badge -->
          <div style="display:flex; gap:16px; align-items:center;">
            <div style="background:#FFF1F2; border:1px solid #FFE4E6; color:#E11D48; padding:8px 16px; border-radius:999px; font-size:14px; font-weight:700; display:flex; align-items:center; gap:6px;">
              <span>🔥</span> 14일 연속 스트릭!
            </div>
            <div style="background:#EEF2FF; border:1px solid #E0E7FF; color:#4F46E5; padding:8px 16px; border-radius:999px; font-size:14px; font-weight:700;">
              Level 7 Master Creator
            </div>
          </div>
        </div>

        <!-- Main Gamified Centerpiece -->
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:36px; align-items:center;">
          <!-- Progress Card -->
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:24px; padding:36px; box-shadow:0 10px 25px rgba(0,0,0,0.04);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:14px; font-weight:700; color:#4F46E5;">오늘의 디자인 퀘스트</span>
              <span style="font-size:14px; font-weight:800; color:#059669;">80% 완료</span>
            </div>
            <div style="font-size:32px; font-weight:800; margin-bottom:12px;">16개 스타일 정복 챌린지</div>
            <p style="font-size:15px; color:#64748B; line-height:1.6; margin-bottom:24px;">
              프롬프트를 탐색하고 복사할 때마다 경험치(XP)가 쌓입니다. 학습의 즐거움을 배가시키는 가벼운 게이미피케이션 인터페이스.
            </p>
            <!-- XP Progress Bar -->
            <div style="background:#F1F5F9; height:12px; border-radius:6px; overflow:hidden; margin-bottom:8px;">
              <div style="width:80%; height:100%; background:linear-gradient(90deg, #6366F1, #8B5CF6); border-radius:6px;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; color:#94A3B8; font-weight:600;">
              <span>1,600 XP</span>
              <span>다음 레벨까지 400 XP 남음</span>
            </div>
          </div>

          <!-- Badges & Rewards -->
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:18px; padding:20px; display:flex; align-items:center; gap:16px;">
              <div style="font-size:32px;">🎖️</div>
              <div>
                <div style="font-size:16px; font-weight:700;">미니멀 마스터 뱃지 획득</div>
                <div style="font-size:13px; color:#64748B;">Apple & Swiss 스타일 프롬프트 복사 완료</div>
              </div>
            </div>
            <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:18px; padding:20px; display:flex; align-items:center; gap:16px;">
              <div style="font-size:32px;">⚡</div>
              <div>
                <div style="font-size:16px; font-weight:700;">익스프레시브 크리에이터</div>
                <div style="font-size:13px; color:#64748B;">네오 브루탈리즘 & 키네틱 타이포 적용 성공</div>
              </div>
            </div>
            <div style="background:#EEF2FF; border:1px dashed #6366F1; border-radius:18px; padding:16px 20px; text-align:center; color:#4F46E5; font-size:14px; font-weight:700;">
              🎉 다음 퀘스트: 갤러리 웹페이지 배포 완료 시 +500 XP 지급!
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#64748B; border-top:1px solid #E2E8F0; padding-top:14px;">
          <span>지누의 디자인 공작소 — Light Gamification UI System</span>
          <span>Intrinsic Motivation & Progress Feedback</span>
        </div>
      </div>
    `
  }
];

async function generateAll() {
  console.log('Launching headless browser via Puppeteer...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750, deviceScaleFactor: 2 });

  for (const item of styles) {
    const filename = `mockup-${item.id}.png`;
    const outputPath = path.join(__dirname, 'assets', 'images', filename);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { 
            width:1200px; 
            height:750px; 
            overflow:hidden; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Malgun Gothic", "맑은 고딕", "Pretendard", sans-serif;
          }
        </style>
      </head>
      <body>
        ${item.renderHtml()}
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded', timeout: 10000 });
    // small wait for layout
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Saved: assets/images/${filename} [${item.name}]`);
  }

  await browser.close();
  console.log('All 16 mockups generated successfully!');
}

generateAll().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
