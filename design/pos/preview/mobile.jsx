// Mobile manager + Tablet POS variants ------------------------------------

function MobileManager() {
  const D = window.DG;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, background: 'var(--paper-3)', minHeight: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 24, alignItems: 'flex-start' }}>
        {/* Phone 1: Manager dashboard */}
        <PhoneFrame title="Manager · Dashboard">
          <div style={{ background: 'var(--paper-2)', minHeight: '100%' }}>
            <div style={{ padding: '16px 16px 12px', background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <LogoFull height={18} />
                <div style={{ width: 28, height: 28, borderRadius: 99, background: 'var(--teal-700)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>AO</div>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today · 4 branches</div>
              <div className="mono" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>₦4.36M</div>
              <div style={{ fontSize: 12, color: 'var(--lime-700)' }} className="mono">+18.4% vs yesterday · 1,477 txn</div>
            </div>
            <div style={{ padding: 12, display: 'grid', gap: 8 }}>
              {D.BRANCH_PERF.map(b => {
                const pct = (b.sales / b.target) * 100;
                return (
                  <div key={b.name} className="hairline" style={{ background: 'var(--paper)', padding: 10, borderRadius: 'var(--r-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{b.name}</span>
                      <span className="mono" style={{ fontSize: 11, color: pct >= 100 ? 'var(--lime-700)' : 'var(--ink-700)' }}>{pct.toFixed(0)}%</span>
                    </div>
                    <div className="mono" style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{D.fmtK(b.sales)}</div>
                    <div style={{ marginTop: 4, height: 4, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, pct)}%`, height: '100%', background: pct >= 100 ? 'var(--lime-600)' : 'var(--teal-700)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '0 12px 12px' }}>
              <div className="hairline" style={{ background: 'var(--paper)', padding: 12, borderRadius: 'var(--r-sm)' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stock alerts</div>
                <div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }} className="mono">9 <span style={{ fontSize: 11, color: 'var(--rose)' }}>critical</span></div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>Bournvita, Sugar 1kg, Cheese...</div>
              </div>
            </div>
            <div style={{ padding: '0 12px 12px' }}>
              <div className="hairline" style={{ background: 'var(--ink-900)', color: 'white', padding: 12, borderRadius: 'var(--r-sm)' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>VAT due May 21</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>₦858,400</div>
                <button style={{ marginTop: 8, width: '100%', padding: 10, background: 'var(--lime-600)', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600 }}>File at FIRS</button>
              </div>
            </div>
          </div>
          <BottomNav active="Home" />
        </PhoneFrame>

        {/* Phone 2: Approvals */}
        <PhoneFrame title="Manager · Approvals">
          <div style={{ background: 'var(--paper-2)', minHeight: '100%' }}>
            <div style={{ padding: 16, background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Approvals</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>3 pending · 2 today</div>
            </div>
            <div style={{ padding: 12, display: 'grid', gap: 10 }}>
              {[
                { type: 'Discount', who: 'Adaeze · POS-03', amt: '15% on ₦284,200', desc: 'Bolanle Akin Caterers · large order', sev: 'amber' },
                { type: 'Refund',   who: 'Yetunde · POS-01', amt: '₦12,400',         desc: 'INV-58221 · expired item · 3 lines', sev: 'rose' },
                { type: 'Transfer', who: 'Tunde · Manager',  amt: '₦684,200',        desc: 'Surulere → Ikeja · 18 items',       sev: 'teal' },
              ].map((a, i) => (
                <div key={i} className="hairline" style={{ background: 'var(--paper)', padding: 12, borderRadius: 'var(--r-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={`pill ${a.sev}`}>{a.type}</span>
                    <span style={{ fontSize: 10, color: 'var(--ink-400)' }}>2m ago</span>
                  </div>
                  <div className="mono" style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{a.amt}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-700)', marginTop: 2 }}>{a.desc}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>{a.who}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    <button style={{ flex: 1, padding: 8, background: 'var(--paper-3)', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 500, color: 'var(--rose)' }}>Reject</button>
                    <button style={{ flex: 1, padding: 8, background: 'var(--lime-600)', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 500, color: 'white' }}>Approve</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomNav active="Approve" />
        </PhoneFrame>

        {/* Phone 3: Stock count */}
        <PhoneFrame title="Stock count · scan">
          <div style={{ background: '#0a1817', minHeight: '100%', color: 'white' }}>
            <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Count CNT-0045</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Beverages aisle · Surulere</div>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>87 / 142</div>
            </div>
            <div style={{ height: 240, background: '#000', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent 0 4px, rgba(55, 210, 0, 0.04) 4px 8px)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 220, height: 140, border: '2px solid var(--lime-600)', borderRadius: 8 }}>
                <div style={{ position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTop: '4px solid var(--lime-600)', borderLeft: '4px solid var(--lime-600)' }} />
                <div style={{ position: 'absolute', top: -1, right: -1, width: 20, height: 20, borderTop: '4px solid var(--lime-600)', borderRight: '4px solid var(--lime-600)' }} />
                <div style={{ position: 'absolute', bottom: -1, left: -1, width: 20, height: 20, borderBottom: '4px solid var(--lime-600)', borderLeft: '4px solid var(--lime-600)' }} />
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottom: '4px solid var(--lime-600)', borderRight: '4px solid var(--lime-600)' }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--lime-600)', boxShadow: '0 0 8px var(--lime-600)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>Position barcode within frame</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last scanned · 14:31:42</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Coca-Cola 50cl PET</div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>6154000123456 · BEV-CC-50CL</div>
              <div style={{ marginTop: 10, padding: 12, background: 'rgba(55, 210, 0, 0.12)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>System: 248 · Counted: 244</div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--lime-600)' }}>−4 variance</div>
                </div>
                <button style={{ padding: '8px 14px', background: 'white', color: 'var(--ink-900)', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 12 }}>Adjust</button>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                <button style={{ flex: 1, padding: 12, background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 4, color: 'white', fontWeight: 500 }}>Manual entry</button>
                <button style={{ flex: 1, padding: 12, background: 'var(--lime-600)', border: 'none', borderRadius: 4, color: 'white', fontWeight: 600 }}>Confirm count</button>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}

function PhoneFrame({ children, title }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, textAlign: 'center', fontWeight: 500 }}>{title}</div>
      <div style={{
        width: 320, height: 660,
        background: '#000', borderRadius: 36, padding: 8,
        boxShadow: '0 16px 48px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12)',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', background: 'var(--paper)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
            <span>14:32</span>
            <span style={{ display: 'flex', gap: 4 }}>
              <span>●●●●</span><span>📶</span><span>87%</span>
            </span>
          </div>
          <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active }) {
  const items = [
    { label: 'Home',    icon: '⌂' },
    { label: 'POS',     icon: '▭' },
    { label: 'Approve', icon: '✓' },
    { label: 'Stock',   icon: '◫' },
    { label: 'More',    icon: '⋯' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--paper)', borderTop: '1px solid var(--line)', display: 'flex', padding: '6px 0 12px' }}>
      {items.map(i => (
        <div key={i.label} style={{ flex: 1, textAlign: 'center', color: i.label === active ? 'var(--teal-700)' : 'var(--ink-500)' }}>
          <div style={{ fontSize: 16 }}>{i.icon}</div>
          <div style={{ fontSize: 9.5, fontWeight: 500, marginTop: 1 }}>{i.label}</div>
        </div>
      ))}
    </div>
  );
}

window.MobileManager = MobileManager;
