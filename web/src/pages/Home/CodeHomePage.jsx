/*
Copyright (C) 2025 QuantumNous – AGPL-3.0
For commercial licensing, contact support@quantumnous.com
*/

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { copy, showSuccess } from '../../helpers';
import { useTranslation } from 'react-i18next';
import { useActualTheme } from '../../context/Theme';

/* ─── theme tokens ───────────────────────────────────── */
const DARK = {
  bg:          '#0a0a0b',
  bgSection:   'rgba(255,255,255,0.01)',
  text:        '#e2e2e7',
  textMuted:   'rgba(255,255,255,0.4)',
  textFaint:   'rgba(255,255,255,0.25)',
  border:      'rgba(255,255,255,0.07)',
  borderMid:   'rgba(255,255,255,0.08)',
  cardBg:      'rgba(255,255,255,0.025)',
  codeBg:      'rgba(14,14,16,0.9)',
  codeBar:     'rgba(0,0,0,0.25)',
  gridLine:    'rgba(255,255,255,0.04)',
  heroFade:    'linear-gradient(to bottom, transparent, #0a0a0b)',
  marqueeBg:   'rgba(255,255,255,0.03)',
  marqueeBorder:'rgba(255,255,255,0.1)',
  marqueeText: 'rgba(255,255,255,0.75)',
  pillBorder:  'rgba(245,158,11,0.3)',
  pillBg:      'rgba(245,158,11,0.07)',
  ctaBorder:   'rgba(255,255,255,0.12)',
  ctaBg:       'rgba(255,255,255,0.04)',
  ctaText:     'rgba(255,255,255,0.8)',
  iconBg:      'rgba(245,158,11,0.1)',
  codePre:     '#cdd3de',
  vibeBg:      'rgba(14,14,16,0.95)',
  statusBg:    'rgba(34,197,94,0.07)',
  statusBorder:'rgba(34,197,94,0.15)',
  statusText:  '#86efac',
};

const LIGHT = {
  bg:          '#fafaf8',
  bgSection:   'rgba(0,0,0,0.015)',
  text:        '#111110',
  textMuted:   'rgba(0,0,0,0.5)',
  textFaint:   'rgba(0,0,0,0.3)',
  border:      'rgba(0,0,0,0.08)',
  borderMid:   'rgba(0,0,0,0.09)',
  cardBg:      'rgba(255,255,255,0.8)',
  codeBg:      'rgba(248,248,246,0.98)',
  codeBar:     'rgba(0,0,0,0.04)',
  gridLine:    'rgba(0,0,0,0.04)',
  heroFade:    'linear-gradient(to bottom, transparent, #fafaf8)',
  marqueeBg:   'rgba(0,0,0,0.03)',
  marqueeBorder:'rgba(0,0,0,0.1)',
  marqueeText: 'rgba(0,0,0,0.65)',
  pillBorder:  'rgba(245,158,11,0.4)',
  pillBg:      'rgba(245,158,11,0.08)',
  ctaBorder:   'rgba(0,0,0,0.12)',
  ctaBg:       'rgba(0,0,0,0.04)',
  ctaText:     'rgba(0,0,0,0.75)',
  iconBg:      'rgba(245,158,11,0.1)',
  codePre:     '#374151',
  vibeBg:      'rgba(255,255,255,0.98)',
  statusBg:    'rgba(34,197,94,0.08)',
  statusBorder:'rgba(34,197,94,0.2)',
  statusText:  '#15803d',
};

/* ─── inline CSS ──────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

.hp-root { font-family: 'Space Grotesk', system-ui, sans-serif; }

/* grid bg */
.hp-grid-bg-dark {
  background-image:
    linear-gradient(to right,  rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}
.hp-grid-bg-light {
  background-image:
    linear-gradient(to right,  rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* logo marquee */
@keyframes hp-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.hp-marquee-track { animation: hp-marquee 28s linear infinite; }
.hp-marquee-track:hover { animation-play-state: paused; }

/* fade-up */
@keyframes hp-fade-up { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
.hp-fade-up { animation: hp-fade-up .7s cubic-bezier(.2,.8,.2,1) both; }
.hp-d1 { animation-delay: .05s }
.hp-d2 { animation-delay: .15s }
.hp-d3 { animation-delay: .25s }
.hp-d4 { animation-delay: .38s }
.hp-d5 { animation-delay: .50s }
.hp-d6 { animation-delay: .62s }

/* code tab */
.hp-code-tab-active { background: rgba(255,255,255,0.06); border-bottom: 2px solid #f59e0b; color:#fff; }
.hp-code-tab { color: rgba(255,255,255,0.4); border-bottom: 2px solid transparent; }
.hp-code-tab:hover { color: rgba(255,255,255,0.7); }

/* typing cursor */
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.hp-cursor { animation: blink 1s step-end infinite; }

/* glow */
.hp-glow-amber { box-shadow: 0 0 60px -20px rgba(245,158,11,.55); }
.hp-glow-btn { box-shadow: 0 8px 32px -12px rgba(245,158,11,.5); }
.hp-glow-btn:hover { box-shadow: 0 12px 40px -12px rgba(245,158,11,.7); }

/* ── aurora breathing bg ── */
@keyframes hp-aurora {
  0%,100% { opacity:.5; transform: translate(-10%,-8%) scale(1) }
  50%     { opacity:.8; transform: translate(8%,6%) scale(1.15) }
}
.hp-aurora-orb {
  position:absolute; border-radius:9999px; filter:blur(90px); pointer-events:none;
  animation: hp-aurora 8s ease-in-out infinite;
}
.hp-aurora-1 { width:500px;height:500px;top:-12%;left:15%;background:rgba(245,158,11,.12); }
.hp-aurora-2 { width:400px;height:400px;top:10%;right:10%;background:rgba(251,191,36,.07);animation-delay:-4s;animation-duration:10s; }
.hp-aurora-3 { width:350px;height:350px;bottom:5%;left:40%;background:rgba(249,115,22,.06);animation-delay:-2s;animation-duration:12s; }

/* ── floating code card ── */
@keyframes hp-float {
  0%,100% { transform: translateY(0) }
  50%     { transform: translateY(-8px) }
}
.hp-float { animation: hp-float 5s ease-in-out infinite; }

/* ── CTA shimmer ── */
@keyframes hp-shimmer {
  0%   { background-position: -200% center }
  100% { background-position: 200% center }
}
.hp-shimmer-btn {
  background-size: 200% auto;
  background-image: linear-gradient(90deg,#f59e0b 0%,#fde68a 25%,#f59e0b 50%,#f97316 100%);
  animation: hp-shimmer 3s linear infinite;
}

/* ── scroll reveal ── */
@keyframes hp-scroll-in {
  from { opacity:0; transform:translateY(32px) }
  to   { opacity:1; transform:translateY(0) }
}
.hp-scroll-hidden { opacity:0; }
.hp-scroll-visible { animation: hp-scroll-in .7s cubic-bezier(.2,.8,.2,1) both; }

/* ── feature card hover ── */
.hp-feature-card { transition: all .35s cubic-bezier(.2,.8,.2,1); }
.hp-feature-card:hover { box-shadow: 0 20px 60px -24px rgba(245,158,11,.2); }
.hp-feature-icon { transition: transform .35s cubic-bezier(.2,.8,.2,1); }
.hp-feature-card:hover .hp-feature-icon { transform: scale(1.12) rotate(6deg); }

/* ── stat counter pulse ── */
@keyframes hp-count-pop {
  0%   { transform: scale(1) }
  50%  { transform: scale(1.08) }
  100% { transform: scale(1) }
}
.hp-count-pop { animation: hp-count-pop .4s ease-out; }

/* ── dot world map ── */
@keyframes hp-wdot-dk { 0%{background:#f59e0b;box-shadow:0 0 10px rgba(245,158,11,.8)} 100%{background:#444;box-shadow:0 0 2px rgba(245,158,11,.1)} }
@keyframes hp-wdot-lt { 0%{background:#f59e0b;box-shadow:0 0 10px rgba(245,158,11,.5)} 100%{background:#ccc;box-shadow:0 0 2px rgba(245,158,11,.05)} }
.hp-wdot-dark { animation: hp-wdot-dk 4s linear infinite; }
.hp-wdot-light { animation: hp-wdot-lt 4s linear infinite; }
`;

/* ─── data ────────────────────────────────────────────── */
const MODELS = [
  { name: 'OpenAI',    color: '#10a37f' },
  { name: 'Claude',   color: '#d97757' },
  { name: 'Gemini',   color: '#4285f4' },
  { name: 'DeepSeek', color: '#4d6bfe' },
  { name: 'Qwen',     color: '#6554c0' },
  { name: 'Kimi',     color: '#1677ff' },
  { name: 'Doubao',   color: '#0066ff' },
  { name: 'Zhipu',    color: '#3b82f6' },
  { name: 'Mistral',  color: '#f97316' },
  { name: 'Grok',     color: '#fff' },
];

const CODE_TABS = ['Python', 'Node.js', 'cURL'];

const CODE_SNIPPETS = {
  'Python': [
    { t: 'keyword',  v: 'from' },
    { t: 'plain',    v: ' openai ' },
    { t: 'keyword',  v: 'import' },
    { t: 'plain',    v: ' OpenAI\n\nclient = OpenAI(\n    base_url=' },
    { t: 'string',   v: '"https://api.tokenbar.org/v1"' },
    { t: 'plain',    v: ',\n    api_key=' },
    { t: 'string',   v: '"<YOUR_API_KEY>"' },
    { t: 'plain',    v: '\n)\n\nresponse = client.chat.completions.create(\n    model=' },
    { t: 'string',   v: '"openai/gpt-4o"' },
    { t: 'plain',    v: ',\n    messages=[{' },
    { t: 'string',   v: '"role"' },
    { t: 'plain',    v: ': ' },
    { t: 'string',   v: '"user"' },
    { t: 'plain',    v: ', ' },
    { t: 'string',   v: '"content"' },
    { t: 'plain',    v: ': ' },
    { t: 'string',   v: '"Hello!"' },
    { t: 'plain',    v: '}])\n\nprint(response.choices[0].message.content)' },
  ],
  'Node.js': [
    { t: 'keyword',  v: 'import' },
    { t: 'plain',    v: ' OpenAI ' },
    { t: 'keyword',  v: 'from' },
    { t: 'string',   v: ' "openai"' },
    { t: 'plain',    v: ';\n\n' },
    { t: 'keyword',  v: 'const' },
    { t: 'plain',    v: ' client = ' },
    { t: 'keyword',  v: 'new' },
    { t: 'plain',    v: ' OpenAI({\n  baseURL: ' },
    { t: 'string',   v: '"https://api.tokenbar.org/v1"' },
    { t: 'plain',    v: ',\n  apiKey: ' },
    { t: 'string',   v: '"<YOUR_API_KEY>"' },
    { t: 'plain',    v: ',\n});\n\n' },
    { t: 'keyword',  v: 'const' },
    { t: 'plain',    v: ' res = ' },
    { t: 'keyword',  v: 'await' },
    { t: 'plain',    v: ' client.chat.completions.create({\n  model: ' },
    { t: 'string',   v: '"openai/gpt-4o"' },
    { t: 'plain',    v: ',\n  messages: [{ role: ' },
    { t: 'string',   v: '"user"' },
    { t: 'plain',    v: ', content: ' },
    { t: 'string',   v: '"Hello!"' },
    { t: 'plain',    v: ' }],\n});\nconsole.log(res.choices[0].message.content);' },
  ],
  'cURL': [
    { t: 'plain',    v: 'curl https://api.tokenbar.org/v1/chat/completions \\\n  -H ' },
    { t: 'string',   v: '"Authorization: Bearer <YOUR_API_KEY>"' },
    { t: 'plain',    v: ' \\\n  -H ' },
    { t: 'string',   v: '"Content-Type: application/json"' },
    { t: 'plain',    v: " \\\n  -d '{\n    " },
    { t: 'string',   v: '"model"' },
    { t: 'plain',    v: ': ' },
    { t: 'string',   v: '"openai/gpt-4o"' },
    { t: 'plain',    v: ',\n    ' },
    { t: 'string',   v: '"messages"' },
    { t: 'plain',    v: ': [{' },
    { t: 'string',   v: '"role"' },
    { t: 'plain',    v: ':' },
    { t: 'string',   v: '"user"' },
    { t: 'plain',    v: ',' },
    { t: 'string',   v: '"content"' },
    { t: 'plain',    v: ':' },
    { t: 'string',   v: '"Hello!"' },
    { t: 'plain',    v: "}]\n  }'" },
  ],
};

const TOKEN_COLOR = { keyword: '#c792ea', string: '#c3e88d', plain: '#cdd3de' };

/* ─── marquee row ─────────────────────────────────────── */
const ModelMarquee = ({ C }) => {
  const doubled = [...MODELS, ...MODELS];
  return (
    <div className='relative overflow-hidden py-6' style={{ maskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)' }}>
      <div className='hp-marquee-track flex gap-4 w-max'>
        {doubled.map((m, i) => (
          <div
            key={i}
            className='flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors cursor-default'
            style={{ borderColor: C.marqueeBorder, background: C.marqueeBg, color: C.marqueeText }}
          >
            <span className='h-2 w-2 rounded-full' style={{ background: m.color }} />
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── code block ──────────────────────────────────────── */
const TOKEN_COLOR_LIGHT = { keyword: '#7c3aed', string: '#15803d', plain: '#374151' };

const CodeBlock = ({ tab, onCopy, endpointAddr, isDark }) => {
  const tokens = CODE_SNIPPETS[tab] || CODE_SNIPPETS['Python'];
  const colors = isDark ? TOKEN_COLOR : TOKEN_COLOR_LIGHT;
  return (
    <pre
      className='text-[13px] leading-6 overflow-x-auto px-5 py-4'
      style={{ fontFamily: "'Space Grotesk', monospace", background: 'transparent' }}
    >
      {tokens.map((tk, i) => (
        <span key={i} style={{ color: colors[tk.t] || colors.plain }}>
          {tk.v}
        </span>
      ))}
    </pre>
  );
};

/* ─── dot world map ──────────────────────────────────── */
const WORLD_DOTS = new Set([
  /* North America */
  19,20,21,73,74,75,76,77,123,124,127,128,129,130,131,132,177,178,179,181,182,
  183,184,185,186,187,188,228,229,230,231,232,233,234,237,238,239,240,241,242,
  243,283,284,285,286,287,288,289,293,294,295,296,297,332,333,334,337,339,340,
  341,342,343,348,349,350,351,352,387,388,389,390,391,392,393,394,395,396,397,
  398,399,404,405,406,407,441,442,443,444,445,446,447,448,449,450,451,452,453,
  454,455,459,460,497,498,499,500,501,502,503,504,505,506,507,509,510,511,514,
  552,553,554,555,556,557,558,559,560,561,562,564,565,566,607,610,611,612,613,
  614,615,616,619,620,621,622,666,667,668,669,670,671,672,674,675,676,722,723,
  724,725,726,727,728,729,730,731,778,779,780,781,782,783,784,785,786,834,835,
  836,837,838,839,889,890,891,892,893,894,944,945,946,947,948,949,1000,1001,
  1002,1005,1056,1057,1112,1113,1114,1169,
  /* South America */
  1225,1226,1227,1228,1229,1281,1282,1283,1284,1285,1335,1336,1337,1338,1339,
  1340,1341,1342,1390,1391,1392,1393,1394,1395,1396,1397,1446,1447,1448,1449,
  1450,1451,1502,1503,1504,1505,1506,1557,1558,1559,1560,1612,1613,1614,1666,
  1667,1668,1721,1722,1776,1777,1831,1832,1887,
  /* Europe */
  251,311,312,361,362,365,415,416,417,418,421,469,470,471,472,473,474,475,476,
  477,519,520,523,524,525,527,528,529,530,531,578,579,580,582,583,584,585,586,
  631,632,634,636,637,638,639,640,641,686,687,688,689,690,691,692,693,694,695,
  696,742,743,744,745,746,747,748,749,750,751,795,796,797,798,799,800,801,802,
  803,804,805,850,851,854,856,857,911,
  /* Africa */
  961,962,963,965,1015,1016,1017,1018,1019,1020,1021,1069,1070,1071,1072,1073,
  1074,1075,1076,1077,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1179,
  1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1235,1236,1237,1238,1239,
  1240,1241,1242,1243,1244,1293,1294,1295,1296,1297,1298,1348,1349,1350,1351,
  1352,1404,1405,1406,1407,1459,1460,1461,1462,1514,1515,1516,1518,1569,1570,
  1571,1573,1624,1625,
  /* Asia */
  154,208,209,210,262,263,264,265,314,315,316,317,318,319,320,321,322,323,325,
  326,369,370,371,372,373,374,375,376,377,378,379,380,381,382,423,424,425,426,
  427,428,429,430,431,432,433,434,435,436,437,438,439,440,478,479,480,481,482,
  483,484,485,486,487,488,489,490,491,492,493,494,495,532,533,534,535,536,537,
  538,539,540,541,542,543,544,545,546,547,548,549,550,587,588,589,590,591,592,
  593,594,595,596,597,598,599,600,601,603,642,643,644,645,646,647,648,649,650,
  651,652,653,654,657,658,697,698,699,700,701,702,703,704,705,706,707,708,709,
  712,752,753,754,755,756,757,758,759,760,761,762,763,764,807,808,809,810,811,
  812,813,814,815,816,817,818,819,821,859,860,861,862,863,864,865,866,867,868,
  869,870,871,872,873,876,913,914,916,917,918,919,920,921,922,923,924,925,926,
  928,930,967,968,969,970,972,973,974,975,976,977,978,979,980,981,982,1022,
  1023,1024,1025,1026,1027,1029,1030,1031,1034,1035,1036,1037,1079,1080,1081,
  1085,1089,1090,1135,1144,1145,1200,1202,1203,1255,1256,1257,1311,
  /* Australia */
  1206,1262,1263,1317,1369,1370,1372,1422,1423,1424,1425,1426,1427,1428,1476,
  1477,1478,1479,1480,1481,1482,1483,1531,1532,1533,1534,1535,1536,1537,1538,
  1586,1587,1590,1591,1592,1645,1646,1650,1705,
]);

const DotWorldMap = React.memo(({ isDark }) => {
  const dots = useMemo(() =>
    [...WORLD_DOTS].map(i => ({
      i,
      x: ((i - 1) % 55) / 54 * 100,
      y: Math.floor((i - 1) / 55) / 34 * 100,
      d: -(Math.random() * 4).toFixed(2),
    }))
  , []);
  const cls = isDark ? 'hp-wdot-dark' : 'hp-wdot-light';
  return (
    <div className='pointer-events-none absolute inset-0 flex items-center justify-center' style={{ opacity: isDark ? 0.22 : 0.15 }}>
      <div style={{ position: 'relative', width: 'min(96%, 1400px)', aspectRatio: '55/35' }}>
        {dots.map(d => (
          <div
            key={d.i}
            className={cls}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: 'calc(100% / 55 * 0.7)',
              height: 'calc(100% / 35 * 0.7)',
              borderRadius: '50%',
              animationDelay: `${d.d}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
/* ── scroll-triggered reveal hook ── */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

/* ── animated counter ── */
const AnimatedStat = ({ value, label, color, mutedColor }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const [popped, setPopped] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const match = value.match(/(.*?)(\d+\.?\d*)(.*)/);  
      if (!match) { setDisplay(value); setPopped(true); return; }
      const [, prefix, numStr, suffix] = match;
      const target = parseFloat(numStr);
      const isFloat = numStr.includes('.');
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = target * eased;
        setDisplay(`${prefix}${isFloat ? cur.toFixed(1) : Math.round(cur)}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
        else { setDisplay(value); setPopped(true); }
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className='text-center'>
      <div className={`text-2xl font-bold ${popped ? 'hp-count-pop' : ''}`} style={{ color }}>{display}</div>
      <div className='text-xs mt-1' style={{ color: mutedColor }}>{label}</div>
    </div>
  );
};

const CodeHomePage = ({ status, docsLink, serverAddress, endpointValue }) => {
  const { t, i18n } = useTranslation();
  const actualTheme  = useActualTheme();
  const isDark       = actualTheme !== 'light';
  const C            = isDark ? DARK : LIGHT;
  const systemName   = status?.system_name || 'Token吧';
  const logo         = status?.logo || '/tokenbar-logo.png';
  const endpointAddr = `${serverAddress}${endpointValue}`;

  const [activeTab, setActiveTab]   = useState('Python');
  const [copied,    setCopied]      = useState(false);

  const [featRef, featVis]   = useScrollReveal();
  const [vibeRef, vibeVis]   = useScrollReveal();
  const [priceRef, priceVis] = useScrollReveal();
  const [ctaRef, ctaVis]     = useScrollReveal();

  const handleCopy = async () => {
    if (await copy(endpointAddr)) {
      setCopied(true);
      showSuccess(t('已复制到剪切板'));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyCode = async () => {
    const snippetText = CODE_SNIPPETS[activeTab].map(tk => tk.v).join('');
    const cleaned = snippetText
      .replace(/"https:\/\/api\.(ofox|tokenbar)\..*?\/v1"/g, `"${endpointAddr}"`)
      .replace(/"<(?:YOUR_API_KEY|OFOXAI_API_KEY)>"/g, '"<YOUR_API_KEY>"');
    await copy(cleaned);
    showSuccess(t('已复制'));
  };

  return (
    <div className='hp-root relative overflow-x-hidden' style={{ background: C.bg, color: C.text, minHeight: '100vh', transition: 'background .3s,color .3s' }}>
      <style>{STYLES}</style>

      {/* ══════════════ HERO ══════════════════════════════ */}
      <section className={`relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden ${isDark ? 'hp-grid-bg-dark' : 'hp-grid-bg-light'}`}>
        {/* aurora orbs */}
        <div className='hp-aurora-orb hp-aurora-1' />
        <div className='hp-aurora-orb hp-aurora-2' />
        <div className='hp-aurora-orb hp-aurora-3' />
        {/* dot world map */}
        <DotWorldMap isDark={isDark} />
        {/* fade edges */}
        <div className='pointer-events-none absolute bottom-0 inset-x-0 h-32' style={{ background: C.heroFade }} />

        <div className='relative z-10 mx-auto w-full max-w-6xl px-5 py-16 lg:px-8 text-center'>
          {/* status pill */}
          <div className='hp-fade-up inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold mb-8'
            style={{ borderColor: C.pillBorder, background: C.pillBg, color: '#d97706' }}>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full opacity-75' style={{ background: '#f59e0b' }} />
              <span className='relative inline-flex h-2 w-2 rounded-full' style={{ background: '#f59e0b' }} />
            </span>
            {t('全系统正常运行')}
          </div>

          {/* headline */}
          <h1 className='hp-fade-up hp-d1 text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-tight tracking-tight mb-4'
            style={{ letterSpacing: '-0.03em', color: C.text }}>
            {t('3分钟，接入')}
            {' '}
            <span style={{
              background: 'linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}>{t('世界模型')}</span>
          </h1>

          <p className='hp-fade-up hp-d2 text-base sm:text-lg max-w-xl mx-auto mb-3' style={{ color: C.textMuted }}>
            {t('官方渠道 · 稳定高速 · 不限量')}
          </p>
          <p className='hp-fade-up hp-d2 text-sm max-w-2xl mx-auto mb-10' style={{ color: C.textFaint }}>
            {t('全球主流云厂商官方授权服务商，100+ 大模型一站接入，完全兼容 OpenAI / Anthropic / Gemini 协议')}
          </p>

          {/* CTAs */}
          <div className='hp-fade-up hp-d3 flex flex-wrap items-center justify-center gap-4 mb-14'>
            <Link
              to='/register'
              className='hp-shimmer-btn inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5'
            >
              {t('获取 API Key')}
              <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2.5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
              </svg>
            </Link>
            <Link
              to='/playground'
              className='inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:border-amber-500/40'
              style={{ borderColor: C.ctaBorder, background: C.ctaBg, color: C.ctaText }}
            >
              {t('探索模型')}
            </Link>
            {docsLink && (
              <a
                href={docsLink}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-amber-400'
                style={{ color: C.textMuted }}
              >
                {t('开发文档')}
                <svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
                </svg>
              </a>
            )}
          </div>

          {/* stats row */}
          <div className='hp-fade-up hp-d4 flex flex-wrap justify-center gap-8 mb-14'>
            {[
              { v: '100+', label: t('顶级模型') },
              { v: '99.9%', label: t('可用性') },
              { v: '~300ms', label: t('全球延迟') },
            ].map(({ v, label }) => (
              <AnimatedStat key={label} value={v} label={label} color='#d97706' mutedColor={C.textMuted} />
            ))}
          </div>

          {/* code card */}
          <div className='hp-fade-up hp-d5 hp-float mx-auto max-w-2xl text-left'>
            <div
              className='hp-glow-amber overflow-hidden rounded-2xl border'
              style={{ borderColor: C.borderMid, background: C.codeBg, backdropFilter: 'blur(12px)' }}
            >
              {/* window bar */}
              <div className='flex items-center justify-between px-4 py-3 border-b' style={{ borderColor: C.border }}>
                <div className='flex items-center gap-1.5'>
                  <span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
                  <span className='h-3 w-3 rounded-full bg-[#ffbd2e]' />
                  <span className='h-3 w-3 rounded-full bg-[#28c840]' />
                </div>
                {/* tabs */}
                <div className='flex gap-1'>
                  {CODE_TABS.map(tab => (
                    <button
                      key={tab}
                      type='button'
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs font-semibold rounded-t transition-colors ${activeTab === tab ? 'hp-code-tab-active' : 'hp-code-tab'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* copy btn */}
                <button
                  type='button'
                  onClick={handleCopyCode}
                  className='flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition-colors hover:text-amber-400'
                  style={{ color: C.textFaint, border: `1px solid ${C.border}` }}
                >
                  <svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184' />
                  </svg>
                  {t('复制')}
                </button>
              </div>
              {/* code */}
              <CodeBlock tab={activeTab} endpointAddr={endpointAddr} isDark={isDark} />
              {/* endpoint bar */}
              <div className='flex items-center gap-3 border-t px-4 py-3' style={{ borderColor: C.border, background: C.codeBar }}>
                <span className='text-[11px] font-semibold uppercase tracking-widest' style={{ color: C.textFaint }}>Base URL</span>
                <span className='flex-1 font-mono text-xs truncate' style={{ color: '#f59e0b' }}>{endpointAddr}</span>
                <button
                  type='button'
                  onClick={handleCopy}
                  className='rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors'
                  style={{
                    background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.12)',
                    color: copied ? '#22c55e' : '#f59e0b',
                    border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.25)'}`,
                  }}
                >
                  {copied ? t('已复制 ✓') : t('复制')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ MODEL MARQUEE ══════════════════════ */}
      <section className='border-y' style={{ borderColor: C.border, background: C.bgSection }}>
        <div className='mx-auto max-w-7xl py-2'>
          <p className='text-center text-[11px] font-semibold uppercase tracking-widest mb-3 mt-4' style={{ color: C.textFaint }}>
            {t('全球主流云厂商官方授权服务商 · 100+ 大模型一站接入')}
          </p>
          <ModelMarquee C={C} />
        </div>
      </section>

      {/* ══════════════ FEATURES GRID ══════════════════════ */}
      <section ref={featRef} className={`py-24 ${featVis ? 'hp-scroll-visible' : 'hp-scroll-hidden'}`}>
        <div className='mx-auto max-w-6xl px-5 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-3xl font-bold' style={{ letterSpacing: '-0.02em', color: C.text }}>
              {t('为什么选择')}{' '}
              <span style={{
                background: 'linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline',
              }}>
                {t('我们')}
              </span>
              {t('？')}
            </h2>

            <p className='mt-3 text-sm' style={{ color: C.textMuted }}>{t('一个 API Key，解决所有模型接入问题')}</p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {[
              {
                icon: (
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' />
                  </svg>
                ),
                title: t('统一 API 入口'),
                desc: t('完全兼容 OpenAI / Anthropic / Gemini 协议，零改动迁移，一个 Key 调用 100+ 模型。'),
              },
              {
                icon: (
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' />
                  </svg>
                ),
                title: t('稳定高速不限量'),
                desc: t('全球加速节点，~300ms 全球延迟，无 RPM/TPM 限额，支撑大并发场景。'),
              },
              {
                icon: (
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' />
                  </svg>
                ),
                title: t('官方授权渠道'),
                desc: t('直连全球主流云厂商官方账号，无中间商，账号分层路由，自动熔断切换。'),
              },
              {
                icon: (
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z' />
                  </svg>
                ),
                title: t('按需付费透明计费'),
                desc: t('与官方同步计费规则，无月费无套路，随充随用，用量明细随时可查。'),
              },
              {
                icon: (
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z' />
                  </svg>
                ),
                title: t('支持 Vibe Coding'),
                desc: t('两行配置接入 Claude Code、Cursor、Chatbox、Cline、Windsurf 等所有主流 AI 编程工具。'),
              },
              {
                icon: (
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                ),
                title: t('全栈可观测'),
                desc: t('请求追踪、费用分析、异常告警、每模型性能指标，用量面板一目了然。'),
              },
            ].map((card) => (
              <div
                key={card.title}
                className='group hp-feature-card rounded-xl border p-6 hover:border-amber-500/30 hover:-translate-y-1'
                style={{
                  borderColor: C.border,
                  background: C.cardBg,
                }}
              >
                <div
                  className='hp-feature-icon mb-4 flex h-11 w-11 items-center justify-center rounded-xl'
                  style={{ background: C.iconBg, color: '#d97706' }}
                >
                  {card.icon}
                </div>
                <h3 className='mb-2 text-base font-semibold' style={{ color: C.text }}>{card.title}</h3>
                <p className='text-sm leading-6' style={{ color: C.textMuted }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VIBE CODING ════════════════════════ */}
      <section ref={vibeRef} className={`py-20 border-t ${vibeVis ? 'hp-scroll-visible' : 'hp-scroll-hidden'}`} style={{ borderColor: C.border }}>
        <div className='mx-auto max-w-6xl px-5 lg:px-8'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            <div>
              <span
                className='inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-4'
                style={{ background: C.iconBg, color: '#d97706', border: '1px solid rgba(245,158,11,0.25)' }}
              >
                Vibe Coding
              </span>
              <h2 className='text-3xl font-bold mb-4' style={{ letterSpacing: '-0.02em', color: C.text }}>
                {t('AI 编程工具')}<br />{t('不再卡速率限制')}
              </h2>
              <p className='text-base leading-7 mb-6' style={{ color: C.textMuted }}>
                {t('两行配置，让 Claude Code、Cursor、Chatbox、Cline、Windsurf 等工具全速运行，不再被 429 / Rate Limit 打断工作流。')}
              </p>
              <div className='space-y-2 mb-8'>
                {['Claude Code', 'Cursor', 'Chatbox', 'Cline', 'Windsurf', 'Codex / Zed'].map(tool => (
                  <div key={tool} className='flex items-center gap-2.5 text-sm' style={{ color: C.text }}>
                    <svg className='h-4 w-4 shrink-0' style={{ color: '#22c55e' }} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2.5'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                    {tool}
                  </div>
                ))}
              </div>
              <Link
                to='/register'
                className='inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5'
                style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)' }}
              >
                {t('立即免费使用')}
              </Link>
            </div>

            {/* mini config card */}
            <div
              className='rounded-2xl border p-6 font-mono text-sm'
              style={{ borderColor: C.borderMid, background: C.vibeBg, color: C.text }}
            >
              <div className='mb-3 text-[11px] uppercase tracking-widest' style={{ color: C.textFaint }}>
                {t('# ~/.zshrc 或 ~/.bashrc')}
              </div>
              <div className='space-y-1'>
                <div>
                  <span style={{ color: '#c792ea' }}>export</span>
                  <span style={{ color: '#cdd3de' }}> ANTHROPIC_BASE_URL=</span>
                  <span style={{ color: '#c3e88d' }}>https://api.tokenbar.org/anthropic</span>
                </div>
                <div>
                  <span style={{ color: '#c792ea' }}>export</span>
                  <span style={{ color: '#cdd3de' }}> ANTHROPIC_API_KEY=</span>
                  <span style={{ color: '#c3e88d' }}>&lt;YOUR_API_KEY&gt;</span>
                </div>
                <div className='pt-2'>
                  <span style={{ color: '#cdd3de', opacity: .35 }}>{t('# OpenAI 兼容工具')}</span>
                </div>
                <div>
                  <span style={{ color: '#c792ea' }}>export</span>
                  <span style={{ color: '#cdd3de' }}> OPENAI_BASE_URL=</span>
                  <span style={{ color: '#c3e88d' }}>{endpointAddr}</span>
                </div>
                <div>
                  <span style={{ color: '#c792ea' }}>export</span>
                  <span style={{ color: '#cdd3de' }}> OPENAI_API_KEY=</span>
                  <span style={{ color: '#c3e88d' }}>&lt;YOUR_API_KEY&gt;</span>
                </div>
              </div>
              <div className='mt-5 flex items-center gap-2 rounded-lg p-3' style={{ background: C.statusBg, border: `1px solid ${C.statusBorder}` }}>
                <span className='h-2 w-2 rounded-full bg-green-500' />
                <span className='text-xs' style={{ color: C.statusText }}>{t('两行搞定，零代码改动，完全兼容原生协议')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING TIERS ══════════════════════ */}
      <section ref={priceRef} className={`py-24 border-t ${priceVis ? 'hp-scroll-visible' : 'hp-scroll-hidden'}`} style={{ borderColor: C.border, background: C.bgSection }}>
        <div className='mx-auto max-w-5xl px-5 lg:px-8'>
          <div className='mb-14 text-center'>
            <h2 className='text-3xl font-bold' style={{ letterSpacing: '-0.02em', color: C.text }}>{t('简单透明的定价')}</h2>
            <p className='mt-3 text-sm' style={{ color: C.textMuted }}>{t('按量付费，无月费，随时充值')}</p>
          </div>
          <div className='grid gap-5 md:grid-cols-3'>
            {[
              {
                name: t('免费版'),
                price: '¥0',
                period: t('永久免费'),
                highlight: false,
                features: [t('10+ 免费模型'), t('所有模型可访问'), t('3 个 RAG 知识库'), t('基础 MCP 工具'), t('社区支持')],
                cta: t('免费注册'),
                to: '/register',
              },
              {
                name: t('专业版'),
                price: t('按量计费'),
                period: t('无月费'),
                highlight: true,
                features: [t('旗舰模型享 8 折'), t('开源模型最高 3 折'), t('无限 RAG 知识库'), t('完整 MCP 工具'), t('工单 + 在线支持'), '99.9% SLA'],
                cta: t('立即开始'),
                to: '/register',
              },
              {
                name: t('企业版'),
                price: t('定制'),
                period: t('联系销售'),
                highlight: false,
                features: [t('自定义阶梯定价'), t('私有云 / 混合云'), t('定制 RAG 方案'), 'SSO/SAML', t('专属成功经理'), '99.99% SLA'],
                cta: t('联系我们'),
                to: '/contact',
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className='relative rounded-2xl border p-6 flex flex-col'
                style={{
                  borderColor: plan.highlight ? 'rgba(245,158,11,0.5)' : C.border,
                  background: plan.highlight ? 'rgba(245,158,11,0.05)' : C.cardBg,
                  boxShadow: plan.highlight ? '0 0 40px -20px rgba(245,158,11,0.3)' : 'none',
                }}
              >
                {plan.highlight && (
                  <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                    <span className='rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black' style={{ background: '#f59e0b' }}>
                      {t('推荐')}
                    </span>
                  </div>
                )}
                <div className='mb-5'>
                  <p className='text-sm font-semibold mb-1' style={{ color: plan.highlight ? '#d97706' : C.textMuted }}>{plan.name}</p>
                  <p className='text-3xl font-bold' style={{ color: C.text }}>{plan.price}</p>
                  <p className='text-xs mt-1' style={{ color: C.textFaint }}>{plan.period}</p>
                </div>
                <ul className='space-y-2.5 mb-6 flex-1'>
                  {plan.features.map(f => (
                    <li key={f} className='flex items-start gap-2 text-sm' style={{ color: C.textMuted }}>
                      <svg className='h-4 w-4 shrink-0 mt-0.5' style={{ color: '#f59e0b' }} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2.5'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.to}
                  className='block text-center rounded-lg py-2.5 text-sm font-bold transition-all'
                  style={plan.highlight
                    ? { background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#000' }
                    : { border: `1px solid ${C.border}`, color: C.ctaText, background: C.ctaBg }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ═════════════════════════ */}
      <section ref={ctaRef} className={`py-28 text-center ${ctaVis ? 'hp-scroll-visible' : 'hp-scroll-hidden'}`} style={{ background: C.bg }}>
        <div className='mx-auto max-w-2xl px-5'>
          <h2 className='text-4xl font-bold mb-4' style={{ letterSpacing: '-0.03em', color: C.text }}>
            {t('3分钟上手，')}
            <span style={{ background: 'linear-gradient(90deg,#f59e0b,#fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('立即接入世界模型')}
            </span>
          </h2>
          <p className='text-base mb-10' style={{ color: C.textMuted }}>
            {t('加入数万名开发者，用 {{name}} 构建下一代 AI 应用', { name: systemName })}
          </p>
          <Link
            to='/register'
            className='hp-shimmer-btn inline-flex items-center gap-2 rounded-lg px-10 py-4 text-base font-bold text-black transition-all hover:-translate-y-0.5'
          >
            {t('免费注册')}
            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2.5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </Link>
          <p className='mt-4 text-xs' style={{ color: C.textFaint }}>{t('无需信用卡 · 免费额度开箱即用')}</p>
        </div>
      </section>
    </div>
  );
};

export default CodeHomePage;
