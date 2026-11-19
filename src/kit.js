/**
 * ==============================================================================
 * JINWOO DESIGN WORKSHOP - 5-Core UI Component Kit Module (src/kit.js)
 * ==============================================================================
 * Provides authentic style geometry differentiation across all 16 design systems:
 * - Geometric specifications: border-radius, border-width, drop-shadow, typography
 * - Live interactive preview rendering in #compkit-preview-stage
 * - Clean semantic HTML+CSS and Tailwind CSS v4 (React JSX) code generation
 * - 5 core UI components: Buttons, Inputs, Cards, Badges, Navigation
 * ==============================================================================
 */

const extraKitCss = `
/* ========================================================
   Component Kit Advanced Geometry & Spec Bar Styles
   ======================================================== */

.compkit-geo-spec {
  width: 100%;
  max-width: 480px;
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(56, 189, 248, 0.28);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.25s ease;
  user-select: none;
}

.compkit-geo-spec:hover {
  border-color: rgba(56, 189, 248, 0.55);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55), 0 0 16px rgba(56, 189, 248, 0.15);
}

.geo-spec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.geo-spec-style-badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--accent, #38BDF8);
  background: rgba(56, 189, 248, 0.12);
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.geo-spec-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted, #94A3B8);
}

.geo-spec-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.geo-spec-item {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.geo-spec-label {
  font-size: 9px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.geo-spec-val {
  font-size: 11px;
  font-family: 'SF Mono', Consolas, Monaco, monospace;
  font-weight: 800;
  color: #F1F5F9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Interactive Component Preview Container */
.compkit-preview-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

.compkit-interactive-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Tactile / Neo-brutalist / Glowing Feedback States */
.compkit-btn-brutal {
  transition: transform 0.12s ease, box-shadow 0.12s ease !important;
}
.compkit-btn-brutal:hover {
  transform: translate(-2px, -2px) !important;
  box-shadow: 6px 6px 0px #000000 !important;
}
.compkit-btn-brutal:active {
  transform: translate(1px, 1px) !important;
  box-shadow: 2px 2px 0px #000000 !important;
}

.compkit-btn-tactile {
  transition: all 0.15s ease !important;
}
.compkit-btn-tactile:hover {
  filter: brightness(1.12);
  box-shadow: 0 6px 14px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.25) !important;
}
.compkit-btn-tactile:active {
  transform: translateY(1px) !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.8), inset 0 2px 5px rgba(0,0,0,0.6) !important;
}

.compkit-btn-retro {
  transition: all 0.2s ease !important;
}
.compkit-btn-retro:hover {
  box-shadow: 0 0 22px rgba(0, 240, 255, 0.7), inset 0 0 10px rgba(0, 240, 255, 0.4) !important;
  text-shadow: 0 0 10px rgba(0, 240, 255, 1) !important;
}

.compkit-btn-apple {
  transition: transform 0.15s ease, opacity 0.15s ease !important;
}
.compkit-btn-apple:hover {
  opacity: 0.94;
}
.compkit-btn-apple:active {
  transform: scale(0.98) !important;
}

.compkit-btn-swiss {
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease !important;
}
.compkit-btn-swiss:hover {
  background: #FF2A00 !important;
  border-color: #FF2A00 !important;
  color: #FFFFFF !important;
}

.compkit-btn-bauhaus {
  transition: background 0.15s ease, transform 0.15s ease !important;
}
.compkit-btn-bauhaus:hover {
  background: #D62839 !important;
  transform: translateY(-1px) !important;
}

.compkit-btn-kinetic {
  transition: background 0.15s ease, color 0.15s ease !important;
}
.compkit-btn-kinetic:hover {
  background: #FFFFFF !important;
  color: #000000 !important;
}

@media (max-width: 600px) {
  .geo-spec-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

const clientKitScript = `
(function() {
  // Guard for non-browser environments
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // ========================================================
  // 1. STYLE GEOMETRY MAP FOR ALL 16 DESIGN SYSTEMS
  // ========================================================
  const styleGeometryMap = {
    '01': {
      num: '01',
      name: 'Apple-inspired Premium Minimal',
      shortName: 'Apple Minimal',
      category: 'Minimal Refined',
      buttonRadius: '999px',
      cardRadius: '18px',
      inputRadius: '10px',
      badgeRadius: '999px',
      navRadius: '12px',
      radiusBadge: 'Pill / 18px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderBadge: 'Hairline 1px',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      shadowBadge: 'Subtle 2px',
      typography: 'SF Pro / Pretendard Variable',
      typeBadge: 'Sans -0.03em',
      tracking: '-0.4px',
      lineHeight: '1.2',
      bg: '#FFFFFF',
      surface: '#F5F5F7',
      text: '#1D1D1F',
      subtext: '#6E6E73',
      accent: '#0071E3',
      btnClass: 'compkit-btn-apple'
    },
    '02': {
      num: '02',
      name: 'Swiss International Functional UI',
      shortName: 'Swiss Functional',
      category: 'Functional Grid',
      buttonRadius: '0px',
      cardRadius: '0px',
      inputRadius: '0px',
      badgeRadius: '0px',
      navRadius: '0px',
      radiusBadge: '0px (Sharp)',
      border: '2px solid #000000',
      borderBadge: 'Bold 2px #000',
      shadow: 'none',
      shadowBadge: 'None (0px)',
      typography: 'Neutral Grotesk Sans 900',
      typeBadge: 'Grotesk -0.04em',
      tracking: '-0.8px',
      lineHeight: '1.1',
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      text: '#000000',
      subtext: '#222222',
      accent: '#FF2A00',
      btnClass: 'compkit-btn-swiss'
    },
    '03': {
      num: '03',
      name: 'Barely-there UI',
      shortName: 'Barely-there',
      category: 'Restrained Quiet',
      buttonRadius: '6px',
      cardRadius: '8px',
      inputRadius: '6px',
      badgeRadius: '4px',
      navRadius: '6px',
      radiusBadge: '6-8px Restrained',
      border: '1px solid #E4E4E7',
      borderBadge: 'Subtle 1px #E4E4E7',
      shadow: 'none',
      shadowBadge: 'None (0px)',
      typography: 'Quiet Sans 500',
      typeBadge: 'Sans 0.0em',
      tracking: '0.0px',
      lineHeight: '1.6',
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#18181B',
      subtext: '#71717A',
      accent: '#18181B',
      btnClass: 'compkit-btn-barely'
    },
    '04': {
      num: '04',
      name: 'Progressive Disclosure',
      shortName: 'Progressive',
      category: 'System Hierarchy',
      buttonRadius: '8px',
      cardRadius: '12px',
      inputRadius: '8px',
      badgeRadius: '6px',
      navRadius: '8px',
      radiusBadge: '8-12px Standard',
      border: '1px solid #CBD5E1',
      borderBadge: '1px Slate-300',
      shadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
      shadowBadge: 'Soft Elevation',
      typography: 'Functional System Sans',
      typeBadge: 'Levels 0.0em',
      tracking: '0.0px',
      lineHeight: '1.5',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      subtext: '#64748B',
      accent: '#2563EB',
      btnClass: 'compkit-btn-disclosure'
    },
    '05': {
      num: '05',
      name: 'Material 3 Expressive',
      shortName: 'Material 3',
      category: 'Expressive Motion',
      buttonRadius: '24px',
      cardRadius: '28px',
      inputRadius: '16px',
      badgeRadius: '999px',
      navRadius: '20px',
      radiusBadge: '24-28px Pill',
      border: 'none',
      borderBadge: 'Tonal Surface',
      shadow: '0 4px 12px rgba(103, 80, 164, 0.18)',
      shadowBadge: 'Tonal Ambient',
      typography: 'Expressive Sans 700-800',
      typeBadge: 'Dynamic 0.2px',
      tracking: '0.2px',
      lineHeight: '1.3',
      bg: '#FEF7FF',
      surface: '#F3EDF7',
      text: '#21005D',
      subtext: '#49454F',
      accent: '#6750A4',
      btnClass: 'compkit-btn-material'
    },
    '06': {
      num: '06',
      name: 'Human-centered Warm UI',
      shortName: 'Warm & Cozy',
      category: 'Human Natural',
      buttonRadius: '14px',
      cardRadius: '18px',
      inputRadius: '12px',
      badgeRadius: '8px',
      navRadius: '12px',
      radiusBadge: '14-18px Warm',
      border: '1px solid #EADBCC',
      borderBadge: '1px Warm Sand',
      shadow: '0 4px 16px rgba(196, 104, 73, 0.08)',
      shadowBadge: 'Gentle Glow',
      typography: 'Warm Serif / Sans',
      typeBadge: 'Cozy 1.75 LH',
      tracking: '0.0px',
      lineHeight: '1.75',
      bg: '#FAF7F2',
      surface: '#FFFDFB',
      text: '#362B24',
      subtext: '#6E6157',
      accent: '#C46849',
      btnClass: 'compkit-btn-warm'
    },
    '07': {
      num: '07',
      name: 'Modern Bento Grid',
      shortName: 'Bento Grid',
      category: 'Modular Bento',
      buttonRadius: '12px',
      cardRadius: '22px',
      inputRadius: '12px',
      badgeRadius: '8px',
      navRadius: '12px',
      radiusBadge: '22px Modular',
      border: '1px solid #283044',
      borderBadge: '1px Slate-800',
      shadow: '0 12px 30px -10px rgba(0, 0, 0, 0.6)',
      shadowBadge: 'Deep Bento Elevation',
      typography: 'Inter / Pretendard Sans',
      typeBadge: 'Scale -0.2px',
      tracking: '-0.2px',
      lineHeight: '1.4',
      bg: '#0F1117',
      surface: '#181C27',
      text: '#FFFFFF',
      subtext: '#94A3B8',
      accent: '#38BDF8',
      btnClass: 'compkit-btn-bento'
    },
    '08': {
      num: '08',
      name: 'Bauhaus Functional UI',
      shortName: 'Bauhaus',
      category: 'Geometric Functional',
      buttonRadius: '0px',
      cardRadius: '0px',
      inputRadius: '0px',
      badgeRadius: '0px',
      navRadius: '0px',
      radiusBadge: '0px Geometric',
      border: '3px solid #111111',
      borderBadge: '3px Solid #111',
      shadow: 'none',
      shadowBadge: 'Flat 0px',
      typography: 'Bold Geometric Sans 900',
      typeBadge: 'Form Follows Function',
      tracking: '0.5px',
      lineHeight: '1.1',
      bg: '#F4F4F0',
      surface: '#FFFFFF',
      text: '#111111',
      subtext: '#333333',
      accent: '#E63946',
      btnClass: 'compkit-btn-bauhaus'
    },
    '09': {
      num: '09',
      name: 'Modern Neo-Brutalism',
      shortName: 'Neo-Brutalism',
      category: 'Bold Youthful',
      buttonRadius: '4px',
      cardRadius: '6px',
      inputRadius: '4px',
      badgeRadius: '3px',
      navRadius: '4px',
      radiusBadge: '4px Hard Corner',
      border: '3px solid #000000',
      borderBadge: '3px Bold #000',
      shadow: '4px 4px 0px #000000',
      shadowBadge: '4px Hard Offset (0 Blur)',
      typography: 'Heavyweight Sans 900',
      typeBadge: 'Direct -0.5px',
      tracking: '-0.5px',
      lineHeight: '1.15',
      bg: '#FFFBEB',
      surface: '#FFFFFF',
      text: '#000000',
      subtext: '#1F2937',
      accent: '#FFE600',
      btnClass: 'compkit-btn-brutal'
    },
    '10': {
      num: '10',
      name: 'Organic / Anti-grid',
      shortName: 'Organic Anti-grid',
      category: 'Fluid Natural',
      buttonRadius: '24px 8px 28px 12px',
      cardRadius: '28px 12px 32px 16px',
      inputRadius: '14px 6px 16px 8px',
      badgeRadius: '16px 6px',
      navRadius: '16px 8px',
      radiusBadge: 'Asymmetric Fluid Blob',
      border: '1px solid #D5CEC0',
      borderBadge: 'Earth Tone 1px',
      shadow: '0 8px 24px rgba(70, 83, 64, 0.08)',
      shadowBadge: 'Organic Soft 8px',
      typography: 'Natural Organic Sans',
      typeBadge: 'Rhythm 0.2px',
      tracking: '0.2px',
      lineHeight: '1.65',
      bg: '#F5F2EB',
      surface: '#FAF8F3',
      text: '#2A2D28',
      subtext: '#6B7863',
      accent: '#465340',
      btnClass: 'compkit-btn-organic'
    },
    '11': {
      num: '11',
      name: 'Tactile / Analog UI',
      shortName: 'Tactile Analog',
      category: 'Physical Skeuomorphic',
      buttonRadius: '8px',
      cardRadius: '12px',
      inputRadius: '6px',
      badgeRadius: '4px',
      navRadius: '8px',
      radiusBadge: '8px Machined',
      border: '1px solid #484B52',
      borderBadge: 'Physical Inset Bevel',
      shadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
      shadowBadge: 'Physical Bevel & Glow',
      typography: 'Instrument / Technical Sans',
      typeBadge: 'Dial Track 0.0px',
      tracking: '0.0px',
      lineHeight: '1.4',
      bg: '#242528',
      surface: '#2D2F34',
      text: '#E1DFDD',
      subtext: '#9E9C98',
      accent: '#E5A93C',
      btnClass: 'compkit-btn-tactile'
    },
    '12': {
      num: '12',
      name: 'Retrofuturism',
      shortName: 'Retrofuturism',
      category: 'Synthwave Dark',
      buttonRadius: '4px',
      cardRadius: '6px',
      inputRadius: '4px',
      badgeRadius: '3px',
      navRadius: '4px',
      radiusBadge: '4px Neon Frame',
      border: '1px solid rgba(0, 240, 255, 0.6)',
      borderBadge: 'Neon Glow Border 1px',
      shadow: '0 0 14px rgba(0, 240, 255, 0.35)',
      shadowBadge: 'Cyber Cyan Glow',
      typography: 'Technical Monospace / Sans',
      typeBadge: 'Mono Track 1.0px',
      tracking: '1.0px',
      lineHeight: '1.4',
      bg: '#0B0D17',
      surface: '#141828',
      text: '#FFFFFF',
      subtext: '#94A3B8',
      accent: '#00F0FF',
      btnClass: 'compkit-btn-retro'
    },
    '13': {
      num: '13',
      name: 'Contemporary Editorial Design',
      shortName: 'Contemporary Editorial',
      category: 'Editorial Publication',
      buttonRadius: '2px',
      cardRadius: '2px',
      inputRadius: '2px',
      badgeRadius: '2px',
      navRadius: '2px',
      radiusBadge: '2px Hairline Corner',
      border: '1px solid #1C1A17',
      borderBadge: 'Hairline Rule 1px',
      shadow: 'none',
      shadowBadge: 'None (Print Flat)',
      typography: 'Noto Serif KR / Editorial Serif',
      typeBadge: 'Editorial Serif 1.75 LH',
      tracking: '0.4px',
      lineHeight: '1.75',
      bg: '#F9F8F6',
      surface: '#FFFFFF',
      text: '#1C1A17',
      subtext: '#57514A',
      accent: '#A65839',
      btnClass: 'compkit-btn-editorial'
    },
    '14': {
      num: '14',
      name: 'Kinetic Typography',
      shortName: 'Kinetic Typography',
      category: 'Bold Typographic',
      buttonRadius: '0px',
      cardRadius: '0px',
      inputRadius: '0px',
      badgeRadius: '0px',
      navRadius: '0px',
      radiusBadge: '0px (Hard Edge)',
      border: '2px solid #FFFFFF',
      borderBadge: '2px Solid High Contrast',
      shadow: 'none',
      shadowBadge: 'None (Flat Impact)',
      typography: 'Ultra Bold Variable Sans 900',
      typeBadge: 'Kinetic 1.5px Tracking',
      tracking: '1.5px',
      lineHeight: '1.0',
      bg: '#000000',
      surface: '#141414',
      text: '#FFFFFF',
      subtext: '#888888',
      accent: '#FFE500',
      btnClass: 'compkit-btn-kinetic'
    },
    '15': {
      num: '15',
      name: 'Narrative Scrollytelling',
      shortName: 'Scrollytelling',
      category: 'Narrative Cinematic',
      buttonRadius: '12px',
      cardRadius: '16px',
      inputRadius: '10px',
      badgeRadius: '999px',
      navRadius: '12px',
      radiusBadge: '12-16px Cinematic',
      border: '1px solid rgba(56, 189, 248, 0.25)',
      borderBadge: '1px Ambient Obsidian',
      shadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
      shadowBadge: 'Atmospheric 12px',
      typography: 'Cinematic Serif / Sans',
      typeBadge: 'Narrative Flow -0.2px',
      tracking: '-0.2px',
      lineHeight: '1.6',
      bg: '#0E131F',
      surface: '#151C2C',
      text: '#F8FAFC',
      subtext: '#94A3B8',
      accent: '#38BDF8',
      btnClass: 'compkit-btn-scrolly'
    },
    '16': {
      num: '16',
      name: 'Light Gamification',
      shortName: 'Gamification',
      category: 'Progress Friendly',
      buttonRadius: '16px',
      cardRadius: '20px',
      inputRadius: '12px',
      badgeRadius: '999px',
      navRadius: '14px',
      radiusBadge: '16-20px Bouncy Pill',
      border: '2px solid #E2E8F0',
      borderBadge: '2px Solid Clean Border',
      shadow: '0 6px 16px rgba(99, 102, 241, 0.22)',
      shadowBadge: 'Playful Elevation 6px',
      typography: 'Friendly Motivating Sans',
      typeBadge: 'Progress 0.0px',
      tracking: '0.0px',
      lineHeight: '1.4',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      subtext: '#64748B',
      accent: '#6366F1',
      btnClass: 'compkit-btn-game'
    }
  };

  // Helper to resolve geometry and metadata
  function getStyleGeometry(styleId) {
    const targetId = styleId || (typeof currentCompStyleId !== 'undefined' ? currentCompStyleId : '01');
    let num = '01';

    if (typeof targetId === 'string') {
      const match = targetId.match(/^(\\d{2})/);
      if (match) {
        num = match[1];
      } else if (targetId.startsWith('custom-')) {
        num = targetId.replace('custom-', '');
      } else if (!isNaN(parseInt(targetId, 10))) {
        num = parseInt(targetId, 10).toString().padStart(2, '0');
      }
    } else if (typeof targetId === 'number') {
      num = targetId.toString().padStart(2, '0');
    }

    if (styleGeometryMap[num]) {
      return Object.assign({}, styleGeometryMap[num]);
    }

    // Dynamic fallback for custom styles (17+)
    const cleanId = (typeof targetId === 'string' ? targetId : '').replace(/-prompt$/, '');
    const meta = (typeof styleMetaStore !== 'undefined' && styleMetaStore[cleanId]) || {
      num: num,
      korTitle: '커스텀 디자인 시스템',
      colorSwatches: ['#0B0E14', '#151A29', '#EC4899', '#38BDF8', '#FFFFFF']
    };

    const bg = meta.colorSwatches[0] || '#0B0E14';
    const surface = meta.colorSwatches[1] || '#151A29';
    const accent = meta.colorSwatches[meta.colorSwatches.length - 1] || '#EC4899';
    const text = meta.colorSwatches[meta.colorSwatches.length - 2] || '#FFFFFF';

    return {
      num: num,
      name: meta.korTitle || 'Custom AI Design System',
      shortName: meta.korTitle || 'Custom Style',
      category: 'Custom AI Extension',
      buttonRadius: '14px',
      cardRadius: '18px',
      inputRadius: '10px',
      badgeRadius: '999px',
      navRadius: '12px',
      radiusBadge: '14-18px Dynamic',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderBadge: 'Custom Surface 1px',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      shadowBadge: 'Dynamic Glow',
      typography: 'Pretendard Variable / Modern Sans',
      typeBadge: 'Custom 0.0px',
      tracking: '0.0px',
      lineHeight: '1.5',
      bg: bg,
      surface: surface,
      text: text,
      subtext: '#94A3B8',
      accent: accent,
      btnClass: 'compkit-btn-custom'
    };
  }

  // ========================================================
  // 2. TAB COMPONENT RENDERERS
  // ========================================================

  // Tab: Buttons
  function renderTabButtons(geo) {
    const isBrutal = geo.num === '09';
    const isSwiss = geo.num === '02';
    const isBauhaus = geo.num === '08';
    const isKinetic = geo.num === '14';
    const isTactile = geo.num === '11';
    const isRetro = geo.num === '12';
    const isEditorial = geo.num === '13';
    const isMaterial = geo.num === '05';

    // Style-specific styling definitions
    let primaryBtnStyle = '';
    let secondaryBtnStyle = '';
    let disabledBtnStyle = '';

    if (isBrutal) {
      primaryBtnStyle = \`background: \${geo.accent}; color: #000000; border: 3px solid #000000; border-radius: 4px; box-shadow: 4px 4px 0px #000000; font-weight: 900; font-size: 14px; padding: 12px 24px; cursor: pointer; text-transform: uppercase;\`;
      secondaryBtnStyle = \`background: #FFFFFF; color: #000000; border: 3px solid #000000; border-radius: 4px; box-shadow: 4px 4px 0px #000000; font-weight: 800; font-size: 14px; padding: 12px 24px; cursor: pointer;\`;
      disabledBtnStyle = \`background: #E5E7EB; color: #9CA3AF; border: 3px solid #9CA3AF; border-radius: 4px; box-shadow: 2px 2px 0px #9CA3AF; font-weight: 700; font-size: 14px; padding: 12px 24px; cursor: not-allowed;\`;
    } else if (isSwiss || isBauhaus || isKinetic) {
      const pBg = isKinetic ? '#FFE500' : (isBauhaus ? '#E63946' : '#000000');
      const pColor = isKinetic ? '#000000' : '#FFFFFF';
      const bColor = isKinetic ? '#FFE500' : '#000000';
      primaryBtnStyle = \`background: \${pBg}; color: \${pColor}; border: \${geo.border}; border-radius: 0px; font-weight: 900; font-size: 14px; padding: 13px 24px; cursor: pointer; text-transform: uppercase; letter-spacing: \${geo.tracking};\`;
      secondaryBtnStyle = \`background: transparent; color: \${geo.text}; border: \${geo.border}; border-radius: 0px; font-weight: 800; font-size: 14px; padding: 12px 24px; cursor: pointer; text-transform: uppercase;\`;
      disabledBtnStyle = \`background: rgba(128,128,128,0.2); color: #888; border: 2px solid #888; border-radius: 0px; font-weight: 700; font-size: 14px; padding: 12px 24px; cursor: not-allowed; text-transform: uppercase;\`;
    } else if (isTactile) {
      primaryBtnStyle = \`background: linear-gradient(180deg, #3A3D44 0%, #26272B 100%); color: \${geo.accent}; border: 1px solid #4E525C; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2); font-weight: 800; font-size: 14px; padding: 12px 24px; cursor: pointer; text-shadow: 0 1px 2px #000;\`;
      secondaryBtnStyle = \`background: #242528; color: #E1DFDD; border: 1px solid #3E4147; border-radius: 8px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.08); font-weight: 600; font-size: 14px; padding: 12px 24px; cursor: pointer;\`;
      disabledBtnStyle = \`background: #1C1D20; color: #555; border: 1px solid #2A2C30; border-radius: 8px; font-weight: 600; font-size: 14px; padding: 12px 24px; cursor: not-allowed;\`;
    } else if (isRetro) {
      primaryBtnStyle = \`background: transparent; color: #00F0FF; border: 2px solid #00F0FF; border-radius: 4px; box-shadow: 0 0 14px rgba(0,240,255,0.4), inset 0 0 8px rgba(0,240,255,0.2); font-family: monospace; font-weight: 800; font-size: 14px; padding: 12px 24px; cursor: pointer; text-shadow: 0 0 8px #00F0FF; letter-spacing: 1px;\`;
      secondaryBtnStyle = \`background: transparent; color: #FF007F; border: 2px solid #FF007F; border-radius: 4px; box-shadow: 0 0 10px rgba(255,0,127,0.3); font-family: monospace; font-weight: 700; font-size: 14px; padding: 12px 24px; cursor: pointer;\`;
      disabledBtnStyle = \`background: transparent; color: #475569; border: 2px solid #334155; border-radius: 4px; font-family: monospace; font-weight: 600; font-size: 14px; padding: 12px 24px; cursor: not-allowed;\`;
    } else if (isEditorial) {
      primaryBtnStyle = \`background: #1C1A17; color: #F9F8F6; border: 1px solid #1C1A17; border-radius: 2px; font-family: 'Noto Serif KR', Georgia, serif; font-weight: 600; font-size: 14px; padding: 11px 24px; cursor: pointer; letter-spacing: 0.02em;\`;
      secondaryBtnStyle = \`background: transparent; color: #A65839; border: 1px solid #A65839; border-radius: 2px; font-family: 'Noto Serif KR', Georgia, serif; font-weight: 600; font-size: 14px; padding: 11px 24px; cursor: pointer;\`;
      disabledBtnStyle = \`background: transparent; color: #A8A29E; border: 1px solid #D6D3D1; border-radius: 2px; font-family: 'Noto Serif KR', Georgia, serif; font-weight: 500; font-size: 14px; padding: 11px 24px; cursor: not-allowed;\`;
    } else if (isMaterial) {
      primaryBtnStyle = \`background: #6750A4; color: #FFFFFF; border: none; border-radius: 24px; box-shadow: 0 4px 12px rgba(103,80,164,0.25); font-weight: 700; font-size: 14px; padding: 13px 28px; cursor: pointer;\`;
      secondaryBtnStyle = \`background: #E8DEF8; color: #21005D; border: none; border-radius: 24px; font-weight: 700; font-size: 14px; padding: 13px 28px; cursor: pointer;\`;
      disabledBtnStyle = \`background: rgba(29,27,32,0.12); color: rgba(29,27,32,0.38); border: none; border-radius: 24px; font-weight: 600; font-size: 14px; padding: 13px 28px; cursor: not-allowed;\`;
    } else {
      primaryBtnStyle = \`background: \${geo.accent}; color: #FFFFFF; border: none; border-radius: \${geo.buttonRadius}; box-shadow: \${geo.shadow === 'none' ? 'none' : geo.shadow}; font-weight: 700; font-size: 14px; padding: 12px 24px; cursor: pointer; letter-spacing: \${geo.tracking};\`;
      secondaryBtnStyle = \`background: transparent; color: \${geo.text}; border: 1px solid \${geo.accent}; border-radius: \${geo.buttonRadius}; font-weight: 600; font-size: 14px; padding: 11px 24px; cursor: pointer;\`;
      disabledBtnStyle = \`background: rgba(128,128,128,0.18); color: #888; border: none; border-radius: \${geo.buttonRadius}; font-weight: 600; font-size: 14px; padding: 12px 24px; cursor: not-allowed;\`;
    }

    const previewHtml = \`
      <div style="display:flex; flex-direction:column; gap:16px; align-items:center; width:100%; max-width:320px;">
        <button class="\${geo.btnClass}" style="width:100%; \${primaryBtnStyle}">
          Primary Action
        </button>
        <button class="\${geo.btnClass}" style="width:100%; \${secondaryBtnStyle}">
          Secondary Outline
        </button>
        <button style="width:100%; \${disabledBtnStyle}" disabled>
          Disabled Button
        </button>
      </div>
    \`;

    const codeHtml = \`<!-- STYLE #\${geo.num} \${geo.name} Button Suite -->
<button class="btn-primary">Primary Action</button>
<button class="btn-secondary">Secondary Outline</button>
<button class="btn-disabled" disabled>Disabled Action</button>

<style>
.btn-primary {
  \${primaryBtnStyle.replace(/;/g, ';\\n  ').trim()}
  transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
}
.btn-primary:hover {
  \${isBrutal ? 'transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #000;' : 'opacity: 0.92; transform: translateY(-1px);'}
}
.btn-secondary {
  \${secondaryBtnStyle.replace(/;/g, ';\\n  ').trim()}
}
.btn-disabled {
  \${disabledBtnStyle.replace(/;/g, ';\\n  ').trim()}
}
</style>\`;

    let twPrimary = '';
    let twSecondary = '';

    if (isBrutal) {
      twPrimary = \`bg-[\${geo.accent}] text-black font-black py-3 px-6 rounded-[4px] border-[3px] border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all uppercase tracking-wider\`;
      twSecondary = \`bg-white text-black font-extrabold py-3 px-6 rounded-[4px] border-[3px] border-black shadow-[4px_4px_0px_#000] hover:bg-slate-50 transition-all\`;
    } else if (isSwiss) {
      twPrimary = \`bg-black hover:bg-[#FF2A00] text-white font-black py-3.5 px-6 rounded-none border-2 border-black uppercase tracking-tighter transition-colors\`;
      twSecondary = \`bg-transparent hover:bg-black hover:text-white text-black font-black py-3 px-6 rounded-none border-2 border-black uppercase tracking-tighter transition-colors\`;
    } else if (isMaterial) {
      twPrimary = \`bg-[#6750A4] hover:bg-[#573F94] text-white font-bold py-3.5 px-7 rounded-[24px] shadow-[0_4px_12px_rgba(103,80,164,0.25)] active:scale-95 transition-all\`;
      twSecondary = \`bg-[#E8DEF8] text-[#21005D] font-bold py-3.5 px-7 rounded-[24px] hover:bg-[#DBCDE8] transition-colors\`;
    } else if (isTactile) {
      twPrimary = \`bg-gradient-to-b from-[#3A3D44] to-[#26272B] text-[#E5A93C] font-extrabold py-3 px-6 rounded-[8px] border border-[#4E525C] shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-[#42464E] hover:to-[#2B2D32] transition-all\`;
      twSecondary = \`bg-[#242528] text-[#E1DFDD] font-semibold py-3 px-6 rounded-[8px] border border-[#3E4147] hover:border-[#5A5E66] transition-all\`;
    } else if (isRetro) {
      twPrimary = \`bg-transparent hover:bg-[#00F0FF]/10 text-[#00F0FF] font-mono font-bold py-3 px-6 rounded-[4px] border-2 border-[#00F0FF] shadow-[0_0_14px_rgba(0,240,255,0.4),inset_0_0_8px_rgba(0,240,255,0.2)] tracking-wider transition-all\`;
      twSecondary = \`bg-transparent hover:bg-[#FF007F]/10 text-[#FF007F] font-mono font-bold py-3 px-6 rounded-[4px] border-2 border-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.3)] transition-all\`;
    } else if (isEditorial) {
      twPrimary = \`bg-[#1C1A17] hover:bg-[#A65839] text-[#F9F8F6] font-serif font-semibold py-2.5 px-6 rounded-[2px] border border-[#1C1A17] transition-colors\`;
      twSecondary = \`bg-transparent hover:bg-[#A65839]/10 text-[#A65839] font-serif font-semibold py-2.5 px-6 rounded-[2px] border border-[#A65839] transition-colors\`;
    } else {
      const radiusClass = geo.buttonRadius === '999px' ? 'rounded-full' : \`rounded-[\${geo.buttonRadius}]\`;
      twPrimary = \`bg-[\${geo.accent}] hover:opacity-90 text-white font-bold py-3 px-6 \${radiusClass} transition-transform active:scale-95 shadow-md\`;
      twSecondary = \`border border-[\${geo.accent}] text-[\${geo.text}] font-semibold py-2.5 px-6 \${radiusClass} hover:bg-[\${geo.accent}]/10 transition-colors\`;
    }

    const codeTw = \`// Tailwind CSS v4 / React
// Style #\${geo.num} (\${geo.name}) Button Group
export function ButtonGroup() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <button className="\${twPrimary}">
        Primary Action
      </button>
      <button className="\${twSecondary}">
        Secondary Outline
      </button>
    </div>
  );
}\`;

    return { previewHtml, codeHtml, codeTw };
  }

  // Tab: Inputs
  function renderTabInputs(geo) {
    const isBrutal = geo.num === '09';
    const isSwiss = geo.num === '02';
    const isRetro = geo.num === '12';
    const isEditorial = geo.num === '13';
    const isMaterial = geo.num === '05';

    let inputStyle = '';
    let labelStyle = \`font-size:12px; font-weight:700; color:\${geo.text}; margin-bottom:6px; display:block;\`;

    if (isBrutal) {
      inputStyle = \`background:#FFFFFF; border:3px solid #000000; border-radius:4px; box-shadow:3px 3px 0px #000000; padding:10px 14px; color:#000000; font-size:14px; font-weight:700; outline:none;\`;
      labelStyle = \`font-size:12px; font-weight:900; color:#000000; text-transform:uppercase; margin-bottom:6px; display:block;\`;
    } else if (isSwiss) {
      inputStyle = \`background:#FFFFFF; border:2px solid #000000; border-radius:0px; padding:10px 14px; color:#000000; font-size:14px; font-weight:600; outline:none;\`;
      labelStyle = \`font-size:12px; font-weight:900; color:#000000; text-transform:uppercase; margin-bottom:6px; display:block; letter-spacing:-0.5px;\`;
    } else if (isRetro) {
      inputStyle = \`background:#0B0D17; border:1px solid rgba(0,240,255,0.6); border-radius:4px; box-shadow:inset 0 0 8px rgba(0,240,255,0.15); padding:10px 14px; color:#00F0FF; font-family:monospace; font-size:14px; outline:none;\`;
      labelStyle = \`font-size:12px; font-family:monospace; font-weight:700; color:#00F0FF; margin-bottom:6px; display:block; text-shadow:0 0 6px rgba(0,240,255,0.4);\`;
    } else if (isEditorial) {
      inputStyle = \`background:#FFFFFF; border:1px solid #1C1A17; border-radius:2px; padding:10px 14px; color:#1C1A17; font-family:'Noto Serif KR', Georgia, serif; font-size:14px; outline:none;\`;
      labelStyle = \`font-size:12px; font-family:'Noto Serif KR', Georgia, serif; font-weight:700; color:#1C1A17; margin-bottom:6px; display:block;\`;
    } else if (isMaterial) {
      inputStyle = \`background:#F3EDF7; border:none; border-bottom:2px solid #6750A4; border-radius:14px 14px 0 0; padding:12px 14px; color:#21005D; font-size:14px; font-weight:600; outline:none;\`;
      labelStyle = \`font-size:12px; font-weight:700; color:#6750A4; margin-bottom:4px; display:block;\`;
    } else {
      inputStyle = \`background:rgba(128,128,128,0.08); border:1px solid \${geo.accent}; border-radius:\${geo.inputRadius}; padding:10px 14px; color:\${geo.text}; font-size:14px; outline:none;\`;
    }

    const previewHtml = \`
      <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:340px;">
        <div>
          <label style="\${labelStyle}">이메일 주소</label>
          <input type="text" placeholder="name@example.com" value="jinwoo@studio.dev" style="width:100%; \${inputStyle}">
        </div>
        <div>
          <label style="\${labelStyle}">실시간 검색</label>
          <input type="text" placeholder="키워드를 입력하세요..." style="width:100%; \${inputStyle}">
        </div>
      </div>
    \`;

    const codeHtml = \`<!-- STYLE #\${geo.num} \${geo.name} Input Group -->
<div class="input-group">
  <label for="email">이메일 주소</label>
  <input type="email" id="email" placeholder="name@example.com" value="jinwoo@studio.dev">
</div>

<style>
.input-group label {
  \${labelStyle.replace(/;/g, ';\\n  ').trim()}
}
.input-group input {
  width: 100%;
  \${inputStyle.replace(/;/g, ';\\n  ').trim()}
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input-group input:focus {
  \${isBrutal ? 'box-shadow: 4px 4px 0px #000;' : \`box-shadow: 0 0 0 3px \${geo.accent}33;\`}
}
</style>\`;

    let twInput = '';
    if (isBrutal) {
      twInput = 'w-full bg-white border-[3px] border-black rounded-[4px] shadow-[3px_3px_0px_#000] px-3.5 py-2.5 text-sm font-bold text-black focus:shadow-[4px_4px_0px_#000] outline-none';
    } else if (isSwiss) {
      twInput = 'w-full bg-white border-2 border-black rounded-none px-3.5 py-2.5 text-sm font-semibold text-black focus:border-[#FF2A00] outline-none';
    } else if (isRetro) {
      twInput = 'w-full bg-[#0B0D17] border border-[#00F0FF]/60 rounded-[4px] shadow-[inset_0_0_8px_rgba(0,240,255,0.15)] px-3.5 py-2.5 text-sm font-mono text-[#00F0FF] outline-none';
    } else {
      twInput = \`w-full bg-slate-500/10 border border-[\${geo.accent}] rounded-[\${geo.inputRadius}] px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[\${geo.accent}]/30 outline-none\`;
    }

    const codeTw = \`// Tailwind CSS v4 / React
// Style #\${geo.num} (\${geo.name}) Custom Input
export function CustomInput() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className="text-xs font-bold text-[\${geo.text}]">이메일 주소</label>
      <input 
        type="email" 
        placeholder="name@example.com" 
        className="\${twInput}"
      />
    </div>
  );
}\`;

    return { previewHtml, codeHtml, codeTw };
  }

  // Tab: Card
  function renderTabCard(geo) {
    const isBrutal = geo.num === '09';
    const isSwiss = geo.num === '02';
    const isMaterial = geo.num === '05';
    const isBento = geo.num === '07';
    const isTactile = geo.num === '11';
    const isRetro = geo.num === '12';
    const isEditorial = geo.num === '13';

    let cardStyle = '';
    let badgeStyle = \`display:inline-block; font-size:11px; font-weight:800; background:\${geo.accent}; color:#fff; padding:3px 10px; border-radius:\${geo.badgeRadius}; margin-bottom:12px;\`;

    if (isBrutal) {
      cardStyle = \`background:#FFFBEB; border:3px solid #000000; border-radius:6px; box-shadow:5px 5px 0px #000000; padding:24px; width:100%; max-width:350px;\`;
      badgeStyle = \`display:inline-block; font-size:11px; font-weight:900; background:#FFE600; color:#000000; border:2px solid #000000; box-shadow:2px 2px 0px #000000; padding:2px 8px; border-radius:3px; margin-bottom:12px; text-transform:uppercase;\`;
    } else if (isSwiss) {
      cardStyle = \`background:#FFFFFF; border:3px solid #000000; border-radius:0px; padding:24px; width:100%; max-width:350px; box-shadow:none;\`;
      badgeStyle = \`display:inline-block; font-size:11px; font-weight:900; background:#FF2A00; color:#FFFFFF; border:2px solid #000000; padding:2px 8px; border-radius:0px; margin-bottom:12px; text-transform:uppercase;\`;
    } else if (isMaterial) {
      cardStyle = \`background:#F3EDF7; border:none; border-radius:28px; box-shadow:0 6px 16px rgba(103,80,164,0.12); padding:24px; width:100%; max-width:350px;\`;
      badgeStyle = \`display:inline-block; font-size:11px; font-weight:700; background:#E8DEF8; color:#21005D; padding:4px 12px; border-radius:999px; margin-bottom:12px;\`;
    } else if (isBento) {
      cardStyle = \`background:#181C27; border:1px solid #283044; border-radius:22px; box-shadow:0 12px 30px -10px rgba(0,0,0,0.6); padding:24px; width:100%; max-width:350px;\`;
    } else if (isTactile) {
      cardStyle = \`background:linear-gradient(180deg, #2D2F34 0%, #202124 100%); border:1px solid #484B52; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15); padding:24px; width:100%; max-width:350px;\`;
      badgeStyle = \`display:inline-block; font-size:11px; font-weight:800; background:#242528; color:#E5A93C; border:1px solid #E5A93C; padding:3px 10px; border-radius:4px; margin-bottom:12px;\`;
    } else if (isRetro) {
      cardStyle = \`background:#0B0D17; border:1px solid rgba(0,240,255,0.6); border-radius:6px; box-shadow:0 0 20px rgba(0,240,255,0.2), inset 0 0 10px rgba(0,240,255,0.08); padding:24px; width:100%; max-width:350px;\`;
      badgeStyle = \`display:inline-block; font-family:monospace; font-size:11px; font-weight:800; background:rgba(0,240,255,0.15); color:#00F0FF; border:1px solid #00F0FF; padding:3px 10px; border-radius:3px; margin-bottom:12px;\`;
    } else if (isEditorial) {
      cardStyle = \`background:#F9F8F6; border:1px solid #1C1A17; border-radius:2px; padding:24px; width:100%; max-width:350px; box-shadow:none;\`;
      badgeStyle = \`display:inline-block; font-family:'Noto Serif KR', serif; font-size:11px; font-weight:700; background:#A65839; color:#fff; padding:2px 8px; border-radius:2px; margin-bottom:12px;\`;
    } else {
      cardStyle = \`background:rgba(128,128,128,0.06); border:1px solid rgba(128,128,128,0.2); border-radius:\${geo.cardRadius}; padding:24px; width:100%; max-width:350px; box-shadow:\${geo.shadow === 'none' ? 'none' : geo.shadow};\`;
    }

    const previewHtml = \`
      <div style="\${cardStyle}">
        <div style="\${badgeStyle}">STYLE #\${geo.num}</div>
        <div style="font-size:18px; font-weight:800; color:\${geo.text}; margin-bottom:8px;">\${geo.name}</div>
        <p style="font-size:13px; color:\${geo.subtext}; line-height:1.55; margin-bottom:18px;">\${geo.shortName}의 조형미와 곡률(\${geo.radiusBadge}), 외곽선(\${geo.borderBadge})이 반영된 카드입니다.</p>
        <button style="background:transparent; color:\${geo.accent}; border:none; font-weight:700; font-size:13px; cursor:pointer; padding:0;">자세히 보기 ➔</button>
      </div>
    \`;

    const codeHtml = \`<!-- STYLE #\${geo.num} \${geo.name} Signature Card -->
<div class="feature-card">
  <span class="badge">STYLE #\${geo.num}</span>
  <h3>\${geo.name}</h3>
  <p>\${geo.shortName}의 조형미와 곡률(\${geo.radiusBadge}), 외곽선(\${geo.borderBadge})이 반영된 카드입니다.</p>
  <a href="#" class="card-link">자세히 보기 ➔</a>
</div>

<style>
.feature-card {
  \${cardStyle.replace(/;/g, ';\\n  ').trim()}
}
.feature-card .badge {
  \${badgeStyle.replace(/;/g, ';\\n  ').trim()}
}
.feature-card h3 {
  font-size: 18px;
  font-weight: 800;
  color: \${geo.text};
  margin: 12px 0 6px 0;
}
.feature-card p {
  font-size: 13px;
  color: \${geo.subtext};
  line-height: 1.55;
  margin-bottom: 16px;
}
.feature-card .card-link {
  color: \${geo.accent};
  font-weight: 700;
  text-decoration: none;
  font-size: 13px;
}
</style>\`;

    let twCard = '';
    if (isBrutal) {
      twCard = 'bg-[#FFFBEB] border-[3px] border-black rounded-[6px] shadow-[5px_5px_0px_#000] p-6 max-w-sm';
    } else if (isSwiss) {
      twCard = 'bg-white border-[3px] border-black rounded-none shadow-none p-6 max-w-sm';
    } else if (isMaterial) {
      twCard = 'bg-[#F3EDF7] rounded-[28px] shadow-md p-6 max-w-sm text-[#21005D]';
    } else if (isBento) {
      twCard = 'bg-[#181C27] border border-[#283044] rounded-[22px] shadow-xl p-6 max-w-sm text-white';
    } else {
      twCard = \`bg-slate-500/5 border border-slate-500/20 rounded-[\${geo.cardRadius}] p-6 shadow-sm max-w-sm\`;
    }

    const codeTw = \`// Tailwind CSS v4 / React
// Style #\${geo.num} (\${geo.name}) Feature Card
export function FeatureCard() {
  return (
    <div className="\${twCard}">
      <span className="bg-[\${geo.accent}] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
        STYLE #\${geo.num}
      </span>
      <h3 className="text-lg font-bold text-[\${geo.text}] mt-3 mb-1.5">\${geo.name}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">
        \${geo.shortName}의 조형미가 담긴 시그니처 카드 컴포넌트입니다.
      </p>
      <a href="#" className="text-sm font-bold text-[\${geo.accent}] hover:underline inline-flex items-center gap-1">
        자세히 보기 &rarr;
      </a>
    </div>
  );
}\`;

    return { previewHtml, codeHtml, codeTw };
  }

  // Tab: Badges
  function renderTabBadges(geo) {
    const isBrutal = geo.num === '09';
    const isSwiss = geo.num === '02';
    const isRetro = geo.num === '12';

    let bPrimary = '';
    let bNeutral = '';
    let bSuccess = '';
    let bAlert = '';

    if (isBrutal) {
      bPrimary = \`background:\${geo.accent}; color:#000; border:2px solid #000; box-shadow:2px 2px 0px #000; font-size:12px; font-weight:900; padding:4px 12px; border-radius:3px;\`;
      bNeutral = \`background:#FFF; color:#000; border:2px solid #000; box-shadow:2px 2px 0px #000; font-size:12px; font-weight:800; padding:4px 12px; border-radius:3px;\`;
      bSuccess = \`background:#34D399; color:#000; border:2px solid #000; box-shadow:2px 2px 0px #000; font-size:12px; font-weight:900; padding:4px 12px; border-radius:3px;\`;
      bAlert = \`background:#F87171; color:#000; border:2px solid #000; box-shadow:2px 2px 0px #000; font-size:12px; font-weight:900; padding:4px 12px; border-radius:3px;\`;
    } else if (isSwiss) {
      bPrimary = \`background:#000; color:#fff; border:2px solid #000; font-size:12px; font-weight:900; padding:4px 12px; border-radius:0px; text-transform:uppercase;\`;
      bNeutral = \`background:transparent; color:#000; border:2px solid #000; font-size:12px; font-weight:800; padding:4px 12px; border-radius:0px;\`;
      bSuccess = \`background:#FF2A00; color:#fff; border:2px solid #FF2A00; font-size:12px; font-weight:900; padding:4px 12px; border-radius:0px; text-transform:uppercase;\`;
      bAlert = \`background:#000; color:#FF2A00; border:2px solid #FF2A00; font-size:12px; font-weight:900; padding:4px 12px; border-radius:0px; text-transform:uppercase;\`;
    } else if (isRetro) {
      bPrimary = \`background:rgba(0,240,255,0.15); color:#00F0FF; border:1px solid #00F0FF; font-family:monospace; font-size:12px; font-weight:800; padding:4px 12px; border-radius:3px; box-shadow:0 0 8px rgba(0,240,255,0.3);\`;
      bNeutral = \`background:rgba(255,255,255,0.08); color:#CBD5E1; border:1px solid #475569; font-family:monospace; font-size:12px; font-weight:600; padding:4px 12px; border-radius:3px;\`;
      bSuccess = \`background:rgba(52,211,153,0.15); color:#34D399; border:1px solid #34D399; font-family:monospace; font-size:12px; font-weight:700; padding:4px 12px; border-radius:3px;\`;
      bAlert = \`background:rgba(255,0,127,0.15); color:#FF007F; border:1px solid #FF007F; font-family:monospace; font-size:12px; font-weight:700; padding:4px 12px; border-radius:3px;\`;
    } else {
      bPrimary = \`background:\${geo.accent}; color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:\${geo.badgeRadius};\`;
      bNeutral = \`background:rgba(128,128,128,0.15); color:\${geo.text}; font-size:12px; font-weight:600; padding:4px 12px; border-radius:\${geo.badgeRadius}; border:1px solid rgba(128,128,128,0.3);\`;
      bSuccess = \`background:rgba(16,185,129,0.15); color:#10B981; font-size:12px; font-weight:700; padding:4px 12px; border-radius:\${geo.badgeRadius};\`;
      bAlert = \`background:rgba(239,68,68,0.15); color:#EF4444; font-size:12px; font-weight:700; padding:4px 12px; border-radius:\${geo.badgeRadius};\`;
    }

    const previewHtml = \`
      <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; max-width:340px;">
        <span style="\${bPrimary}">Primary Pill</span>
        <span style="\${bNeutral}">Neutral Tag</span>
        <span style="\${bSuccess}">Active ●</span>
        <span style="\${bAlert}">Alert ✕</span>
      </div>
    \`;

    const codeHtml = \`<!-- STYLE #\${geo.num} \${geo.name} Badges & Tags -->
<span class="badge-primary">Primary Pill</span>
<span class="badge-neutral">Neutral Tag</span>
<span class="badge-success">Active ●</span>
<span class="badge-alert">Alert ✕</span>

<style>
.badge-primary { \${bPrimary.replace(/;/g, ';\\n  ').trim()} }
.badge-neutral { \${bNeutral.replace(/;/g, ';\\n  ').trim()} }
.badge-success { \${bSuccess.replace(/;/g, ';\\n  ').trim()} }
.badge-alert { \${bAlert.replace(/;/g, ';\\n  ').trim()} }
</style>\`;

    const codeTw = \`// Tailwind CSS v4 / React
// Style #\${geo.num} (\${geo.name}) Badges
export function BadgeCollection() {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <span className="bg-[\${geo.accent}] text-white text-xs font-bold px-3 py-1 rounded-[\${geo.badgeRadius}]">Primary Pill</span>
      <span className="bg-slate-500/15 text-[\${geo.text}] text-xs font-medium px-2.5 py-1 rounded-[\${geo.badgeRadius}] border border-slate-500/20">Neutral</span>
      <span className="bg-emerald-500/15 text-emerald-500 text-xs font-bold px-3 py-1 rounded-[\${geo.badgeRadius}]">Active ●</span>
    </div>
  );
}\`;

    return { previewHtml, codeHtml, codeTw };
  }

  // Tab: Navigation
  function renderTabNav(geo) {
    const isBrutal = geo.num === '09';
    const isSwiss = geo.num === '02';
    const isApple = geo.num === '01';
    const isMaterial = geo.num === '05';

    let navWrapStyle = '';
    let navActiveStyle = '';
    let navItemStyle = '';

    if (isBrutal) {
      navWrapStyle = \`width:100%; max-width:340px; background:#FFFFFF; border:3px solid #000000; border-radius:4px; box-shadow:3px 3px 0px #000000; padding:4px; display:flex; gap:4px;\`;
      navActiveStyle = \`flex:1; background:\${geo.accent}; color:#000000; border:2px solid #000000; text-align:center; padding:8px 0; border-radius:3px; font-weight:900; font-size:13px; cursor:pointer;\`;
      navItemStyle = \`flex:1; color:#000000; text-align:center; padding:8px 0; border-radius:3px; font-weight:700; font-size:13px; cursor:pointer;\`;
    } else if (isSwiss) {
      navWrapStyle = \`width:100%; max-width:340px; background:#FFFFFF; border:2px solid #000000; border-radius:0px; padding:0; display:flex;\`;
      navActiveStyle = \`flex:1; background:#000000; color:#FFFFFF; text-align:center; padding:10px 0; border-radius:0px; font-weight:900; font-size:13px; text-transform:uppercase; cursor:pointer;\`;
      navItemStyle = \`flex:1; color:#000000; text-align:center; padding:10px 0; border-radius:0px; font-weight:800; font-size:13px; border-left:1px solid #000; text-transform:uppercase; cursor:pointer;\`;
    } else if (isApple) {
      navWrapStyle = \`width:100%; max-width:340px; background:rgba(0,0,0,0.06); border-radius:12px; padding:4px; display:flex; gap:4px;\`;
      navActiveStyle = \`flex:1; background:#FFFFFF; color:#1D1D1F; text-align:center; padding:8px 0; border-radius:9px; font-weight:700; font-size:13px; box-shadow:0 2px 6px rgba(0,0,0,0.12); cursor:pointer;\`;
      navItemStyle = \`flex:1; color:#6E6E73; text-align:center; padding:8px 0; border-radius:9px; font-weight:600; font-size:13px; cursor:pointer;\`;
    } else if (isMaterial) {
      navWrapStyle = \`width:100%; max-width:340px; background:#F3EDF7; border-radius:20px; padding:4px; display:flex; gap:4px;\`;
      navActiveStyle = \`flex:1; background:#6750A4; color:#FFFFFF; text-align:center; padding:8px 0; border-radius:16px; font-weight:700; font-size:13px; cursor:pointer;\`;
      navItemStyle = \`flex:1; color:#49454F; text-align:center; padding:8px 0; border-radius:16px; font-weight:600; font-size:13px; cursor:pointer;\`;
    } else {
      navWrapStyle = \`width:100%; max-width:340px; background:rgba(128,128,128,0.06); border-radius:\${geo.navRadius}; padding:6px; display:flex; gap:6px;\`;
      navActiveStyle = \`flex:1; background:\${geo.accent}; color:#fff; text-align:center; padding:8px 0; border-radius:calc(\${geo.navRadius} - 4px); font-weight:700; font-size:13px; cursor:pointer;\`;
      navItemStyle = \`flex:1; color:#888; text-align:center; padding:8px 0; border-radius:calc(\${geo.navRadius} - 4px); font-weight:600; font-size:13px; cursor:pointer;\`;
    }

    const previewHtml = \`
      <div style="\${navWrapStyle}">
        <div style="\${navActiveStyle}">개요</div>
        <div style="\${navItemStyle}">상세스펙</div>
        <div style="\${navItemStyle}">설정</div>
      </div>
    \`;

    const codeHtml = \`<!-- STYLE #\${geo.num} \${geo.name} Segmented Nav -->
<nav class="nav-segmented">
  <a href="#" class="nav-item active">개요</a>
  <a href="#" class="nav-item">상세스펙</a>
  <a href="#" class="nav-item">설정</a>
</nav>

<style>
.nav-segmented {
  \${navWrapStyle.replace(/;/g, ';\\n  ').trim()}
}
.nav-item {
  \${navItemStyle.replace(/;/g, ';\\n  ').trim()}
  text-decoration: none;
}
.nav-item.active {
  \${navActiveStyle.replace(/;/g, ';\\n  ').trim()}
}
</style>\`;

    const codeTw = \`// Tailwind CSS v4 / React
// Style #\${geo.num} (\${geo.name}) Segmented Navigation
export function SegmentedNav() {
  return (
    <nav className="flex bg-slate-500/10 p-1 rounded-[\${geo.navRadius}] max-w-sm w-full">
      <button className="flex-1 bg-[\${geo.accent}] text-white py-2 text-xs font-bold rounded-lg shadow-sm">개요</button>
      <button className="flex-1 text-slate-400 py-2 text-xs font-medium hover:text-white transition-colors">상세스펙</button>
      <button className="flex-1 text-slate-400 py-2 text-xs font-medium hover:text-white transition-colors">설정</button>
    </nav>
  );
}\`;

    return { previewHtml, codeHtml, codeTw };
  }

  // ========================================================
  // 3. MASTER RENDER COMPONENT KIT VIEW OVERRIDE
  // ========================================================
  function renderComponentKitView() {
    const previewStage = document.getElementById('compkit-preview-stage');
    const codeTextEl = document.getElementById('compkit-code-text');
    if (!previewStage || !codeTextEl) return;

    const styleId = (typeof currentCompStyleId !== 'undefined') ? currentCompStyleId : '01';
    const activeTab = (typeof currentCompTab !== 'undefined') ? currentCompTab : 'buttons';
    const format = (typeof currentCodeFormat !== 'undefined') ? currentCodeFormat : 'html';

    const geo = getStyleGeometry(styleId);

    // Build the geometry specification bar
    const specBarHtml = \`
      <div class="compkit-geo-spec">
        <div class="geo-spec-header">
          <span class="geo-spec-style-badge">STYLE #\${geo.num} \${geo.shortName}</span>
          <span class="geo-spec-tag">\${geo.category}</span>
        </div>
        <div class="geo-spec-grid">
          <div class="geo-spec-item">
            <span class="geo-spec-label">Radius</span>
            <span class="geo-spec-val" title="\${geo.radiusBadge}">\${geo.radiusBadge}</span>
          </div>
          <div class="geo-spec-item">
            <span class="geo-spec-label">Border</span>
            <span class="geo-spec-val" title="\${geo.borderBadge}">\${geo.borderBadge}</span>
          </div>
          <div class="geo-spec-item">
            <span class="geo-spec-label">Shadow</span>
            <span class="geo-spec-val" title="\${geo.shadowBadge}">\${geo.shadowBadge}</span>
          </div>
          <div class="geo-spec-item">
            <span class="geo-spec-label">Typography</span>
            <span class="geo-spec-val" title="\${geo.typeBadge}">\${geo.typeBadge}</span>
          </div>
        </div>
      </div>
    \`;

    let rendered = null;
    if (activeTab === 'inputs') {
      rendered = renderTabInputs(geo);
    } else if (activeTab === 'card') {
      rendered = renderTabCard(geo);
    } else if (activeTab === 'badges') {
      rendered = renderTabBadges(geo);
    } else if (activeTab === 'nav') {
      rendered = renderTabNav(geo);
    } else {
      rendered = renderTabButtons(geo);
    }

    previewStage.innerHTML = specBarHtml + '<div class="compkit-preview-container">' + rendered.previewHtml + '</div>';
    codeTextEl.innerText = format === 'html' ? rendered.codeHtml : rendered.codeTw;
  }

  // Export to global scope for seamless compatibility
  window.renderComponentKitView = renderComponentKitView;
  window.getStyleGeometry = getStyleGeometry;
  window.styleGeometryMap = styleGeometryMap;

  // Re-render if modal is already active
  const kitModal = document.getElementById('component-kit-modal');
  if (kitModal && kitModal.classList.contains('active')) {
    renderComponentKitView();
  }
})();
`;

module.exports = {
  extraKitCss,
  clientKitScript
};
