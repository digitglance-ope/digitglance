// App shell ----------------------------------------------------------------

const NAV = [
  { group: 'Operations', items: [
    { id: 'dashboard', label: 'Dashboard', icon: '⌂', shortcut: 'G D' },
    { id: 'pos',       label: 'POS Terminal', icon: '▭', shortcut: 'G P', accent: true },
  ]},
  { group: 'Catalogue', items: [
    { id: 'inventory', label: 'Inventory',   icon: '◫', count: '1,284' },
    { id: 'customers', label: 'Customers',   icon: '◍', count: '847' },
    { id: 'vendors',   label: 'Vendors',     icon: '⌭', count: '42' },
  ]},
  { group: 'Finance', items: [
    { id: 'vat',       label: 'VAT & FIRS',  icon: '%', badge: 'Due 21' },
    { id: 'reports',   label: 'Reports',     icon: '◳' },
  ]},
  { group: 'Account', items: [
    { id: 'onboarding', label: 'Setup wizard', icon: '✓', sub: '5 of 9' },
    { id: 'mobile',     label: 'Mobile views', icon: '◰' },
    { id: 'settings',   label: 'Settings',     icon: '⚙' },
  ]},
];

function App() {
  const T = window.Tweaks ? window.Tweaks.useTweaks(TWEAK_DEFAULTS) : { tweaks: TWEAK_DEFAULTS, setTweak: () => {} };
  const [route, setRoute] = useState('dashboard');
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setPaletteOpen(true); }
      if (e.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = T.tweaks.theme;
    document.body.dataset.density = T.tweaks.density;
  }, [T.tweaks.theme, T.tweaks.density]);

  const Page = {
    dashboard: <Dashboard density={T.tweaks.density} />,
    pos:       <POS density={T.tweaks.density} layout={T.tweaks.posLayout} />,
    inventory: <Inventory />,
    customers: <Customers />,
    vendors:   <Vendors />,
    vat:       <VAT />,
    reports:   <Reports />,
    onboarding:<Onboarding />,
    mobile:    <MobileManager />,
    settings:  <Settings />,
  }[route];

  const isPOS = route === 'pos';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '232px 1fr', height: '100vh', overflow: 'hidden' }}>
      <Sidebar route={route} setRoute={setRoute} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <Topbar route={route} onPalette={() => setPaletteOpen(true)} />
        <div style={{ flex: 1, overflow: isPOS ? 'hidden' : 'auto' }}>
          {Page}
        </div>
      </div>

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} setRoute={setRoute} />}
      {window.Tweaks && (
        <window.Tweaks.TweaksPanel title="Tweaks">
          <window.Tweaks.TweakRadio  label="Theme"      value={T.tweaks.theme}     onChange={v => T.setTweak('theme', v)}     options={[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]} />
          <window.Tweaks.TweakRadio  label="Density"    value={T.tweaks.density}   onChange={v => T.setTweak('density', v)}   options={[{value:'comfortable',label:'Comfort'},{value:'compact',label:'Compact'}]} />
          <window.Tweaks.TweakSelect label="POS layout" value={T.tweaks.posLayout} onChange={v => T.setTweak('posLayout', v)} options={[{value:'classic',label:'Classic split'},{value:'list-first',label:'List-first (wide cart)'}]} />
          <window.Tweaks.TweakRadio  label="Brand mode" value={T.tweaks.brand}     onChange={v => T.setTweak('brand', v)}     options={[{value:'restrained',label:'Restrained'},{value:'vibrant',label:'Vibrant'}]} />
          <window.Tweaks.TweakRadio  label="Industry preset" value={T.tweaks.industry} onChange={v => T.setTweak('industry', v)} options={[{value:'super',label:'Supermarket'},{value:'pharm',label:'Pharmacy'},{value:'rest',label:'Restaurant'}]} />
        </window.Tweaks.TweaksPanel>
      )}
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfortable",
  "posLayout": "classic",
  "brand": "restrained",
  "industry": "super"
}/*EDITMODE-END*/;

function Sidebar({ route, setRoute }) {
  const D = window.DG;
  return (
    <aside style={{
      background: 'var(--paper)', borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--line)' }}>
        <LogoFull height={20} />
        <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--paper-2)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, background: 'var(--teal-700)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>MN</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{D.TENANT.name}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>{D.TENANT.plan}</div>
          </div>
          <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>▾</span>
        </div>
      </div>

      {/* Branch quick-switcher */}
      <div style={{ padding: '12px 12px 0' }}>
        <div style={{ fontSize: 10, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, padding: '0 4px 6px' }}>Branch</div>
        <div style={{ padding: '8px 10px', background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--lime-600)' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Surulere · HQ</div>
            <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>Terminal POS-03 · 4 branches</div>
          </div>
          <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>▾</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflow: 'auto', padding: '12px 8px' }}>
        {NAV.map(group => (
          <div key={group.group} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, padding: '8px 8px 4px' }}>{group.group}</div>
            {group.items.map(it => {
              const active = route === it.id;
              return (
                <button key={it.id} onClick={() => setRoute(it.id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 10px', textAlign: 'left', cursor: 'pointer',
                  background: active ? 'var(--teal-50)' : 'transparent',
                  color: active ? 'var(--teal-900)' : 'var(--ink-700)',
                  border: 'none', borderRadius: 'var(--r-sm)',
                  fontSize: 12.5, fontWeight: active ? 600 : 500,
                  position: 'relative',
                }}>
                  {active && <div style={{ position: 'absolute', left: -8, top: 6, bottom: 6, width: 2, background: 'var(--teal-700)', borderRadius: 2 }} />}
                  <span style={{ width: 18, fontSize: 14, color: active ? 'var(--teal-700)' : 'var(--ink-500)' }}>{it.icon}</span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.count && <span className="mono" style={{ fontSize: 10, color: 'var(--ink-400)' }}>{it.count}</span>}
                  {it.badge && <span className="pill amber" style={{ fontSize: 9.5 }}>{it.badge}</span>}
                  {it.sub && <span className="mono" style={{ fontSize: 10, color: 'var(--teal-700)' }}>{it.sub}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 99, background: 'linear-gradient(135deg, var(--teal-700), var(--lime-600))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>AO</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{D.USER.name}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>{D.USER.role} · {D.USER.terminal}</div>
        </div>
        <span style={{ color: 'var(--ink-400)', fontSize: 12 }}>⏻</span>
      </div>
    </aside>
  );
}

function Topbar({ route, onPalette }) {
  const D = window.DG;
  const crumbs = {
    dashboard: ['POS Module', 'Dashboard'],
    pos:       ['POS Module', 'Terminal'],
    inventory: ['POS Module', 'Inventory'],
    customers: ['POS Module', 'Customers'],
    vendors:   ['POS Module', 'Vendors'],
    vat:       ['POS Module', 'VAT & FIRS'],
    reports:   ['POS Module', 'Reports'],
    onboarding:['Setup wizard'],
    mobile:    ['Mobile views'],
    settings:  ['POS Module', 'Settings'],
  }[route];

  return (
    <div style={{
      height: 48, background: 'var(--paper)', borderBottom: '1px solid var(--line)',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0,
    }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'var(--ink-400)' }}>app.digitglance.com</span>
        <span style={{ color: 'var(--ink-300)' }}>/</span>
        {crumbs.map((c, i) => (
          <React.Fragment key={c}>
            {i > 0 && <span style={{ color: 'var(--ink-300)' }}>/</span>}
            <span style={{ color: i === crumbs.length - 1 ? 'var(--ink-900)' : 'var(--ink-500)', fontWeight: i === crumbs.length - 1 ? 500 : 400 }}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <span style={{ flex: 1 }} />

      <button onClick={onPalette} style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', height: 28,
        background: 'var(--paper-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)',
        fontSize: 11.5, color: 'var(--ink-500)', cursor: 'pointer', minWidth: 220,
      }}>
        <span>⌕</span>
        <span>Search products, customers, invoices…</span>
        <span style={{ flex: 1 }} />
        <span className="kbd">⌘K</span>
      </button>

      <button title="Branch" className="hairline" style={{ height: 28, padding: '0 10px', background: 'var(--paper)', borderRadius: 'var(--r-sm)', fontSize: 11.5, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--lime-600)' }} />
        <span style={{ fontWeight: 500 }}>Surulere · HQ</span>
        <span style={{ color: 'var(--ink-400)' }}>▾</span>
      </button>

      <button title="Notifications" style={{ width: 28, height: 28, background: 'transparent', border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)', cursor: 'pointer', position: 'relative' }}>
        ◔
        <span style={{ position: 'absolute', top: -3, right: -3, width: 14, height: 14, borderRadius: 99, background: 'var(--rose)', color: 'white', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
      </button>
      <button title="Help" style={{ width: 28, height: 28, background: 'transparent', border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>?</button>
    </div>
  );
}

function CommandPalette({ onClose, setRoute }) {
  const [q, setQ] = useState('');
  const cmds = [
    { id: 'dashboard',  label: 'Go to Dashboard',          group: 'Navigate' },
    { id: 'pos',        label: 'Open POS Terminal',        group: 'Navigate' },
    { id: 'inventory',  label: 'Browse Inventory',         group: 'Navigate' },
    { id: 'customers',  label: 'View Customers',           group: 'Navigate' },
    { id: 'vat',        label: 'VAT & FIRS compliance',    group: 'Navigate' },
    { id: 'reports',    label: 'Reports center',           group: 'Navigate' },
    { _action: 'sale',    label: 'New sale',                group: 'Actions', kbd: 'N S' },
    { _action: 'po',      label: 'New purchase order',      group: 'Actions', kbd: 'N P' },
    { _action: 'count',   label: 'Start stock count',       group: 'Actions', kbd: 'N C' },
    { _action: 'transfer',label: 'New branch transfer',     group: 'Actions', kbd: 'N T' },
    { _action: 'invite',  label: 'Invite a teammate',       group: 'Actions' },
    { _action: 'reprint', label: 'Reprint last receipt',    group: 'Actions', kbd: '⌘P' },
  ].filter(c => !q || c.label.toLowerCase().includes(q.toLowerCase()));

  const grouped = cmds.reduce((a, c) => ({ ...a, [c.group]: [...(a[c.group] || []), c] }), {});

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)', zIndex: 200, paddingTop: 100, display: 'flex', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 560, height: 'fit-content', maxHeight: '60vh', background: 'var(--paper)', borderRadius: 'var(--r-lg)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--ink-400)' }}>⌕</span>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Type a command, page, or search…" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: 'var(--ink-900)' }} />
          <span className="kbd">esc</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
          {Object.entries(grouped).map(([g, items]) => (
            <div key={g}>
              <div style={{ fontSize: 10, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 10px 4px', fontWeight: 500 }}>{g}</div>
              {items.map(c => (
                <button key={c.label} onClick={() => { if (c.id) setRoute(c.id); onClose(); }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', background: 'transparent', border: 'none', textAlign: 'left',
                  borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: 13,
                }} onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-2)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <span style={{ width: 18, color: 'var(--ink-500)', fontSize: 13 }}>{c.id ? '→' : '⏵'}</span>
                  <span style={{ flex: 1 }}>{c.label}</span>
                  {c.kbd && <span className="kbd">{c.kbd}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById('__boot')?.remove();
root.render(<App />);
