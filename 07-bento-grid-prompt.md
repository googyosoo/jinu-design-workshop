# 07. Bento Grid

- Category: modular, data-heavy, visual
- Intensity: balanced

---

07. Bento Grid
비주얼 스타일
정보 우선순위를 Block 크기로 표현하는 Bento Grid Interface.

디자인 핵심
Size communicates importance.

색상 구성
Neutral Base + Accent 1색.
Block마다 다른 색을 사용하지 않는다.

타이포그래피
Block 크기에 따라 Typographic Scale도 변화한다.
Primary Block에는 큰 Heading과 Metric 사용.

레이아웃 그리드
12-column 기반
Large: 2×2
Medium: 2×1
Small: 1×1
Consistent Gap
모든 정보를 같은 크기로 만들지 않는다.

Surface & Components
Bento Block은 단일 정보 단위
Card inside Card 금지
Radius 절제
Shadow 최소화
Primary Block만 시각적으로 강하게
이미지 / 일러스트레이션
큰 Block 안에서 Hero Image 또는 Illustration 활용 가능.

데이터 비주얼라이제이션
Metric 중요도에 따라 Block 크기를 결정한다.

Interaction & Motion
Hover 시 아주 미세한 변화만 허용한다.

Responsive
Mobile에서 Desktop Bento를 단순 Stack하지 않는다.
정보 Priority를 다시 계산한다.

Accessibility
Block 크기와 무관하게 Reading Order를 명확히 유지한다.

피해야 할 디자인
모든 Block 같은 크기
모든 Block 다른 색
Nested Cards
Excessive Radius
Decorative Bento
Dashboard Toy-like Look
톤 & 보이스
Modular
Organized
Modern
Visual
Clear
최종 검증
Block 크기만 봐도 중요도가 읽혀야 한다.

KOREAN TYPOGRAPHY / 07 BENTO GRID
Block 크기가 Korean Typographic Scale과 정보 우선순위에도 직접 반영되어야 한다.
Large Block은 강한 Korean Display Sans, Medium은 Heading Sans, Small은 Compact Korean UI Sans로 역할을 구분한다.
모든 Block에 동일한 size와 weight를 반복하지 않고 priority에 따라 weight, line-height, measure를 달리한다.
Body는 짧고 읽기 쉬운 Sans를 사용하며 좁은 Block의 Korean Label에 넓은 tracking을 강제하지 않는다.
Mobile에서는 Desktop Block을 단순 stack하지 말고 우선순위 변화에 맞춰 한국어 제목 크기와 줄 수를 다시 계산한다.

KOREAN TYPOGRAPHY / CJK LOCALIZATION — COMMON RULES
한국어 콘텐츠가 존재하면 영문 전용 Font를 한글에 억지로 적용하거나 browser default fallback에 맡기지 않는다.
프로젝트에 이미 좋은 Korean Typeface가 있으면 그것을 우선하고, 없을 때 해당 콘셉트와 어울리는 한국어 Font Family와 graceful fallback을 명시한다.
Font 선택 우선순위는 Existing Project Typeface → Style-compatible Korean Typeface → Recommended Fallback → System Korean Fallback이다.
Latin과 Korean을 한 Typeface로 강제 통일하기보다 각 언어에 자연스러운 Typeface를 선택하고 baseline, visual weight, size, line-height, density를 조율한다.
기본 Korean Sans 후보는 Pretendard Variable, SUIT Variable, Noto Sans KR, system Korean sans-serif다.
Serif가 적합한 콘셉트에서는 Noto Serif KR, MaruBuri, Source Han Serif K, system Korean serif를 고려한다.
외부 Font가 성능 또는 개인정보 정책과 충돌하면 무리하게 다운로드하지 않고 가장 가까운 기존 또는 system fallback을 사용한다.

Korean Heading
큰 한국어 제목은 영어용 tracking을 그대로 복제하지 않는다.
기본 범위는 letter-spacing -0.045em ~ -0.01em, line-height 1.05 ~ 1.2이며 콘셉트와 크기에 맞게 조정한다.
word-break: keep-all과 overflow-wrap: break-word를 우선하고 글자가 붙거나 한 글자씩 부자연스럽게 끊기지 않게 한다.

Korean Body
장문 본문은 line-height 1.55 ~ 1.8, letter-spacing -0.015em ~ 0을 기본 범위로 삼고 영문보다 여유 있는 행간을 우선한다.
본문의 reading measure와 문단 간격까지 한국어 읽기 흐름에 맞춘다.

Korean UI Labels
Button, Navigation, Tab, Metadata, Status는 Display Typeface보다 읽기 쉬운 Korean UI Sans를 우선한다.
영문 Label의 .12em 같은 넓은 tracking을 한국어에 그대로 적용하지 않고 -0.01em ~ 0.04em 범위에서 다시 설계한다.

Mixed Korean + English
혼합 문장과 UI에서는 baseline, weight, size, line-height, visual density를 조정한다.
필요하면 lang=ko, lang=en 또는 :lang() selector를 사용하고 문서의 실제 언어에 맞는 html lang 속성을 설정한다.

Responsive Korean Typography
Mobile에서 Desktop Typography를 단순 축소하지 않는다.
한국어 제목의 font-size, max-width, line-break, line-height를 다시 계산하고 화면 밖 잘림과 의미 없는 한 글자 단위 줄바꿈을 방지한다.

AVOID
영문 Display Font 뒤에 Korean fallback을 지정하지 않는 것.
모든 한글을 browser default serif 또는 sans-serif에 맡기는 것.
한글 제목에 영어용 +0.1em 이상의 tracking을 적용하는 것.
한국어 전체를 monospace로 만드는 것.
18개 콘셉트 모두를 동일한 Pretendard 스타일로 평준화하는 것.
읽기 어려운 장식용 한글 Font와 글자 단위의 부자연스러운 줄바꿈.
Mobile에서 한글 Heading이 잘리거나 Latin과 Korean의 weight와 크기가 현저히 어긋나는 것.

공통 적용 명령
위 디자인 프롬프트를 사용할 때 항상 다음 규칙을 함께 적용한다.

PRESERVE
기존 프로젝트의

기능
데이터
API
상태 관리
사용자 흐름
Navigation Structure
Form Logic
Business Logic
은 임의로 변경하지 않는다.

DESIGN BEFORE DECORATION
스타일 이름만 적용하지 않는다.
반드시 다음 요소를 실제로 변화시킨다.

Typography
Color
Layout
Grid
Spacing
Surface
Component Geometry
Border / Radius / Shadow
Image Treatment
Interaction
단순히 배경색과 Button 색상만 변경해서는 안 된다.

INFORMATION FIRST
스타일보다 정보 전달과 사용성을 우선한다.
Table, Form, Chart, Navigation의 기능적 명료성을 스타일 때문에 훼손하지 않는다.

ANTI AI-GENERATED UI
명확한 이유가 없다면 다음 패턴을 자동으로 사용하지 않는다.

모든 콘텐츠 Card 처리
Card inside Card
Purple / Blue Gradient
Glow
Glass
Excessive Radius
Excessive Pill
Floating Panels
Colored Icon Boxes
Decorative Blobs
동일한 3-column Feature Card 반복
Generic shadcn / Tailwind Dashboard Layout
모든 Section을 Bento Grid로 만드는 것
FINAL VISUAL VALIDATION
디자인 완료 후 반드시 다음 질문으로 자체 검토한다.

스타일 이름을 가려도 어떤 Design Direction인지 구별 가능한가?
색상뿐 아니라 Layout과 Typography도 달라졌는가?
Component Geometry에서 해당 스타일의 성격이 드러나는가?
기존 UI를 그대로 두고 CSS만 살짝 변경한 수준은 아닌가?
다른 디자인 프롬프트를 적용했을 때 확실히 다른 결과가 나올 수 있는가?
Generic AI SaaS Template 느낌이 남아 있지 않은가?
Style이 콘텐츠와 사용성을 방해하지 않는가?
하나라도 만족하지 않는다면 디자인을 다시 조정한다.
