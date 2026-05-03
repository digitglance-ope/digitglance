// Shared primitives -------------------------------------------------------
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Inline SVG logo mark (recreated, not the raster logo)
function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 6 H14 a10 10 0 0 1 10 10 v0 a10 10 0 0 1 -10 10 H4 Z" stroke="#0E8383" strokeWidth="3" fill="none" strokeLinejoin="round"/>
      <circle cx="22" cy="16" r="2.6" fill="#37D200"/>
    </svg>
  );
}

function LogoFull({ height = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <LogoMark size={height} />
      <div style={{ fontWeight: 600, fontSize: height * 0.78, letterSpacing: '-0.01em', color: 'var(--ink-900)', display: 'flex', alignItems: 'baseline' }}>
        <span style={{ color: '#0E8383' }}>digit</span>
        <span style={{ color: '#37D200' }}>glance</span>
        <span style={{ color: '#37D200' }}>.</span>
      </div>
    </div>
  );
}

// Card with optional title row
function Card({ title, action, children, pad = true, style = {}, className = '' }) {
  return (
    <div className={`hairline ${className}`} style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', overflow: 'hidden', ...style }}>
      {title && (
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</div>
          {action}
        </div>
      )}
      <div style={pad ? { padding: 16 } : undefined}>{children}</div>
    </div>
  );
}

// KPI tile
function KPI({ label, value, delta, sub, accent = 'teal', sparkline, big = false }) {
  const accentColor = accent === 'lime' ? 'var(--lime-600)' : accent === 'amber' ? 'var(--amber)' : accent === 'rose' ? 'var(--rose)' : 'var(--teal-700)';
  const dColor = !delta ? null : delta > 0 ? 'var(--lime-700)' : 'var(--rose)';
  return (
    <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 14, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{label}</div>
        <div style={{ width: 6, height: 6, borderRadius: 999, background: accentColor }} />
      </div>
      <div className="mono" style={{ fontSize: big ? 28 : 22, fontWeight: 600, marginTop: 6, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, gap: 8 }}>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{sub}</div>
        {delta != null && (
          <div className="mono" style={{ fontSize: 11.5, color: dColor, fontWeight: 500 }}>
            {delta > 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
          </div>
        )}
      </div>
      {sparkline}
    </div>
  );
}

function Sparkline({ data, w = 120, h = 32, color = 'var(--teal-700)' }) {
  if (!data?.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const dx = w / (data.length - 1);
  const norm = (v) => h - 2 - ((v - min) / Math.max(1, max - min)) * (h - 4);
  const pts = data.map((v, i) => `${i * dx},${norm(v)}`).join(' ');
  const area = `M0,${h} L ${pts} L ${w},${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block', marginTop: 6 }}>
      <path d={area} fill={color} opacity="0.10" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Bars
function Bars({ data, height = 80, accessor = (d) => d, color = 'var(--teal-700)', highlight = -1 }) {
  const max = Math.max(...data.map(accessor));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height }}>
      {data.map((d, i) => {
        const v = accessor(d);
        const h = (v / max) * (height - 4);
        const isHi = i === highlight;
        return (
          <div key={i} style={{
            flex: 1, height: Math.max(2, h),
            background: isHi ? 'var(--teal-700)' : 'var(--teal-100)',
            borderRadius: 2,
          }} title={String(v)} />
        );
      })}
    </div>
  );
}

// Button
function Btn({ kind = 'ghost', size = 'md', children, icon, kbd, onClick, style = {}, disabled, full, type='button' }) {
  const palette = {
    primary: { bg: 'var(--teal-700)', fg: 'white', border: 'var(--teal-700)' },
    success: { bg: 'var(--lime-600)', fg: 'white', border: 'var(--lime-600)' },
    danger:  { bg: 'var(--rose)',     fg: 'white', border: 'var(--rose)' },
    solid:   { bg: 'var(--ink-900)',  fg: 'white', border: 'var(--ink-900)' },
    ghost:   { bg: 'var(--paper)',    fg: 'var(--ink-900)', border: 'var(--line-2)' },
    soft:    { bg: 'var(--paper-3)',  fg: 'var(--ink-900)', border: 'transparent' },
    tealsoft:{ bg: 'var(--teal-50)',  fg: 'var(--teal-900)',border: 'transparent' },
  }[kind] || {};
  const sz = { sm: { h: 28, px: 10, fs: 12 }, md: { h: 34, px: 12, fs: 13 }, lg: { h: 44, px: 16, fs: 14 } }[size];
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      height: sz.h, padding: `0 ${sz.px}px`, fontSize: sz.fs,
      background: palette.bg, color: palette.fg, border: `1px solid ${palette.border}`,
      borderRadius: 'var(--r-sm)', fontWeight: 500, letterSpacing: '-0.005em',
      width: full ? '100%' : 'auto',
      opacity: disabled ? 0.45 : 1,
      transition: 'transform 0.06s, filter 0.12s',
      ...style,
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(0.5px)'}
    onMouseUp={(e) => e.currentTarget.style.transform = ''}
    onMouseLeave={(e) => e.currentTarget.style.transform = ''}
    >
      {icon}{children}
      {kbd && <span className="kbd" style={{ marginLeft: 4, opacity: 0.7 }}>{kbd}</span>}
    </button>
  );
}

// Empty/placeholder
function Placeholder({ label, h = 120 }) {
  return (
    <div style={{
      height: h, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `repeating-linear-gradient(45deg, var(--paper-3) 0 8px, var(--paper-2) 8px 16px)`,
      borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)',
    }}>{label}</div>
  );
}

// Search input
function SearchInput({ value, onChange, placeholder, kbd, autoFocus, large, onKeyDown, inputRef }) {
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)', fontSize: 14 }}>⌕</span>
      <input
        ref={inputRef}
        value={value} onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        placeholder={placeholder}
        style={{
          width: '100%', height: large ? 44 : 36,
          padding: large ? '0 80px 0 36px' : '0 60px 0 32px',
          background: 'var(--paper)', border: '1px solid var(--line-2)',
          borderRadius: 'var(--r-sm)', fontSize: large ? 14 : 13, color: 'var(--ink-900)',
        }}
      />
      {kbd && (
        <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
          <span className="kbd">{kbd}</span>
        </span>
      )}
    </div>
  );
}

// Donut chart
function Donut({ segments, size = 120, thickness = 18, label }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--paper-3)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const dasharray = `${len} ${c - len}`;
          const dashoffset = -acc;
          acc += len;
          return (
            <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
              stroke={s.color} strokeWidth={thickness} strokeDasharray={dasharray} strokeDashoffset={dashoffset}/>
          );
        })}
      </svg>
      {label && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {label}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LogoMark, LogoFull, Card, KPI, Sparkline, Bars, Btn, Placeholder, SearchInput, Donut });
