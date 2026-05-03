// Stub modules: VAT, Customers, Vendors, Reports, Onboarding, Settings ----

function VAT() {
  const D = window.DG;
  const [period, setPeriod] = useState('2026-04');

  return (
    <div style={{ padding: 24, background: 'var(--paper-2)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>FIRS · TIN {D.TENANT.tin} · Standard rate 7.5%</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>VAT compliance · {D.VAT_SUMMARY.period}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost">VAT history</Btn>
          <Btn kind="ghost">Adjustment journal</Btn>
          <Btn kind="ghost">Export FIRS form</Btn>
          <Btn kind="primary">File return</Btn>
        </div>
      </div>

      {/* Filing card */}
      <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 20, marginBottom: 16, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net VAT liability</div>
          <div className="mono" style={{ fontSize: 36, fontWeight: 600, color: 'var(--rose)', letterSpacing: '-0.02em' }}>{D.fmt(D.VAT_SUMMARY.liability, {decimals: 0})}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Output ₦1.84M − Input ₦984K</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <span className="pill amber">Draft · 14 days to file</span>
            <span className="pill">4,128 transactions reconciled</span>
          </div>
        </div>
        <FilingStep n="1" label="Reconcile transactions" status="done" />
        <FilingStep n="2" label="Approver review" status="active" />
        <FilingStep n="3" label="File at FIRS portal" status="pending" />
      </div>

      {/* Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>VAT classification breakdown</div>
            <div className="pill teal">April 2026</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--ink-500)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500 }}>
                <th style={{ padding: '8px 16px' }}>Class</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Output VAT</th>
                <th style={{ textAlign: 'right' }}>Input VAT</th>
                <th style={{ textAlign: 'right' }}>Net</th>
                <th style={{ textAlign: 'right' }}>Txns</th>
              </tr>
            </thead>
            <tbody>
              {D.VAT_BREAKDOWN.map((b) => (
                <tr key={b.class} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px' }}><VatBadgeRow cls={b.class} /></td>
                  <td style={{ fontWeight: 500 }}>{b.label}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>{b.output ? `₦${b.output.toLocaleString()}` : '—'}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>{b.input ? `₦${b.input.toLocaleString()}` : '—'}</td>
                  <td className="mono" style={{ textAlign: 'right', color: b.net > 0 ? 'var(--rose)' : 'var(--ink-700)', fontWeight: 500 }}>{b.net ? `₦${b.net.toLocaleString()}` : '—'}</td>
                  <td className="mono" style={{ textAlign: 'right', color: 'var(--ink-500)' }}>{b.txns.toLocaleString()}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '2px solid var(--ink-900)', background: 'var(--paper-2)' }}>
                <td colSpan="2" style={{ padding: '12px 16px', fontWeight: 600 }}>Total</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>₦1,842,600</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>₦984,200</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 600, color: 'var(--rose)' }}>₦858,400</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>5,137</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 16 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Filing history</div>
          {D.VAT_HISTORY.map((h, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < D.VAT_HISTORY.length-1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{h.period}</div>
                <span className="pill green">Filed</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>Filed {h.filed} · <span className="mono">{h.ref}</span></div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>₦{h.liability.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilingStep({ n, label, status }) {
  const colors = {
    done:    { bg: 'var(--lime-600)', fg: 'white', txt: 'var(--ink-700)' },
    active:  { bg: 'var(--teal-700)', fg: 'white', txt: 'var(--ink-900)' },
    pending: { bg: 'var(--paper-3)',  fg: 'var(--ink-500)', txt: 'var(--ink-500)' },
  }[status];
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Step {n}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 99, background: colors.bg, color: colors.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
          {status === 'done' ? '✓' : n}
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: colors.txt }}>{label}</div>
      </div>
    </div>
  );
}

// Customers --------------------------------------------------
function Customers() {
  const D = window.DG;
  return (
    <div style={{ padding: 24, background: 'var(--paper-2)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Customer relationship · receivables</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600 }}>Customers</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost">Statements</Btn>
          <Btn kind="ghost">Aging report</Btn>
          <Btn kind="ghost">Import CSV</Btn>
          <Btn kind="primary">+ New customer</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <KPI label="Active customers" value="847" sub="+24 this month" delta={2.9} accent="teal" />
        <KPI label="Outstanding A/R" value="₦12.84M" sub="84 customers" delta={-1.8} accent="amber" />
        <KPI label="Overdue (>30d)" value="₦2.18M" sub="12 customers" delta={4.2} accent="rose" />
        <KPI label="Avg collection" value="18 days" sub="Target: 21 days" accent="lime" delta={-3.2}/>
      </div>

      <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <SearchInput value="" onChange={() => {}} placeholder="Search customers, phone, account..." />
          <Btn size="sm" kind="ghost">Tier ▾</Btn>
          <Btn size="sm" kind="ghost">Aging ▾</Btn>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--ink-500)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500, background: 'var(--paper-2)' }}>
              <th style={{ padding: '8px 16px' }}>Customer</th>
              <th>Tier</th>
              <th>Phone</th>
              <th style={{ textAlign: 'right' }}>Credit limit</th>
              <th style={{ textAlign: 'right' }}>Balance</th>
              <th style={{ textAlign: 'right' }}>Utilization</th>
              <th>Aging</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {D.CUSTOMERS.slice(1).map(c => {
              const util = c.credit > 0 ? (c.balance / c.credit) * 100 : 0;
              return (
                <tr key={c.id} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 99, background: 'var(--teal-100)', color: 'var(--teal-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
                        {c.name.split(' ').map(x => x[0]).slice(0,2).join('')}
                      </div>
                      {c.name}
                    </div>
                  </td>
                  <td><span className="pill">{c.tier}</span></td>
                  <td className="mono" style={{ color: 'var(--ink-500)', fontSize: 12 }}>{c.phone}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>₦{c.credit.toLocaleString()}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 500, color: c.balance > 0 ? 'var(--ink-900)' : 'var(--ink-400)' }}>₦{c.balance.toLocaleString()}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                      <div style={{ width: 60, height: 5, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(100, util)}%`, height: '100%', background: util > 80 ? 'var(--rose)' : util > 50 ? 'var(--amber)' : 'var(--lime-600)' }} />
                      </div>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', minWidth: 32 }}>{util.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 1 }}>
                      {[0, 30, 60, 90].map((d, i) => {
                        const has = c.balance > 0 && i < 2;
                        return <div key={d} style={{ width: 8, height: 14, background: has ? ['var(--lime-600)','var(--amber)','var(--rose)','var(--rose)'][i] : 'var(--paper-3)' }} title={`${d}+ days`}/>;
                      })}
                    </div>
                  </td>
                  <td><Btn size="sm" kind="soft">Statement</Btn></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Vendors -------------------------------------------------------
function Vendors() {
  const D = window.DG;
  return (
    <div style={{ padding: 24, background: 'var(--paper-2)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Suppliers · payables · purchasing</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600 }}>Vendors</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost">Bills</Btn>
          <Btn kind="ghost">Schedule payments</Btn>
          <Btn kind="primary">+ New vendor</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <KPI label="Active vendors" value="42" sub="+3 this quarter" accent="teal" />
        <KPI label="Outstanding A/P" value="₦7.54M" sub="6 vendors · 14 bills" accent="amber" />
        <KPI label="Due this week" value="₦2.84M" sub="Coca-Cola Hellenic · Eko" accent="rose" delta={null} />
        <KPI label="Avg payment days" value="22 days" sub="Within terms" accent="lime" />
      </div>

      <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--ink-500)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500, background: 'var(--paper-2)' }}>
              <th style={{ padding: '8px 16px' }}>Vendor</th>
              <th>Rating</th>
              <th>Terms</th>
              <th>Contact</th>
              <th>Since</th>
              <th style={{ textAlign: 'right' }}>Outstanding</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {D.VENDORS.map(v => (
              <tr key={v.name} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{v.name}</td>
                <td><span className="pill teal">{v.rating}</span></td>
                <td className="mono" style={{ color: 'var(--ink-700)' }}>{v.terms}</td>
                <td className="mono" style={{ color: 'var(--ink-500)', fontSize: 11.5 }}>{v.contact}</td>
                <td style={{ color: 'var(--ink-500)', fontSize: 12 }}>{v.since}</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>₦{v.balance.toLocaleString()}</td>
                <td><Btn size="sm" kind="soft">Pay bill</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Reports -------------------------------------------------------
function Reports() {
  const reports = [
    { group: 'Sales', items: [
      { title: 'Sales by product',  desc: 'Line-level revenue, qty, margin', icon: '⊞' },
      { title: 'Sales by category', desc: 'Aggregated by hierarchy',          icon: '◫' },
      { title: 'Sales by customer', desc: 'Top buyers, AOV, frequency',       icon: '◴' },
      { title: 'Sales by branch',   desc: 'Location performance vs target',   icon: '◐' },
      { title: 'Sales by staff',    desc: 'Cashier productivity, GP',         icon: '◍' },
    ]},
    { group: 'Inventory', items: [
      { title: 'Inventory valuation', desc: 'FIFO/LIFO/Avg/Std', icon: '⊟' },
      { title: 'Stock movement',      desc: 'In/out by reason',  icon: '⇄' },
      { title: 'Stock aging',         desc: 'Days on shelf',     icon: '◷' },
      { title: 'Reorder forecast',    desc: 'AI-suggested POs',  icon: '◑' },
    ]},
    { group: 'Finance', items: [
      { title: 'VAT report',          desc: 'FIRS-ready summary', icon: '%' },
      { title: 'Customer balances',   desc: 'A/R aging buckets',  icon: '⌬' },
      { title: 'Vendor balances',     desc: 'A/P aging',          icon: '⌭' },
      { title: 'Cash flow',           desc: 'Operating + investing',icon: '↯' },
      { title: 'Gross margin',        desc: 'By product/category',icon: '∿' },
      { title: 'Branch comparison',   desc: 'Side-by-side P&L',   icon: '◳' },
    ]},
  ];

  return (
    <div style={{ padding: 24, background: 'var(--paper-2)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>24 reports · scheduled & on-demand</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600 }}>Reporting center</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost">Scheduled (6)</Btn>
          <Btn kind="ghost">My favorites</Btn>
          <Btn kind="primary">+ Custom report</Btn>
        </div>
      </div>

      {reports.map(g => (
        <div key={g.group} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: 10 }}>{g.group}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {g.items.map(r => (
              <div key={r.title} className="hairline" style={{ background: 'var(--paper)', padding: 14, borderRadius: 'var(--r-md)', cursor: 'pointer', transition: 'transform 0.1s, border-color 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-700)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--teal-50)', color: 'var(--teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{r.icon}</div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{r.title}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 6 }}>{r.desc}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <span className="pill">CSV</span>
                  <span className="pill">PDF</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Onboarding ----------------------------------------------------
function Onboarding() {
  const steps = [
    { n: 1, label: 'Business registration',  status: 'done',    desc: 'CAC, RC, address' },
    { n: 2, label: 'Company profile',        status: 'done',    desc: 'Logo, branding, currency' },
    { n: 3, label: 'Tax & VAT setup',        status: 'done',    desc: 'TIN, VAT 7.5% default' },
    { n: 4, label: 'Branches',               status: 'done',    desc: '4 of 4 configured' },
    { n: 5, label: 'Bank accounts',          status: 'active',  desc: 'GTBank linked · Zenith pending' },
    { n: 6, label: 'POS terminals',          status: 'pending', desc: '4 terminals to register' },
    { n: 7, label: 'Costing method',         status: 'pending', desc: 'FIFO/LIFO/Avg/Std' },
    { n: 8, label: 'Invite staff',           status: 'pending', desc: 'Roles & permissions' },
    { n: 9, label: 'Subscription activation', status: 'pending', desc: 'Business plan annual' },
  ];

  return (
    <div style={{ padding: 24, background: 'var(--paper-2)' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Setup wizard · resume any time</div>
        <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600 }}>Welcome to Digitglance</h1>
      </div>

      <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>You're 4 of 9 steps in</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>Estimated 18 minutes remaining · You can save and resume</div>
          </div>
          <div className="mono" style={{ fontSize: 26, fontWeight: 600, color: 'var(--teal-700)' }}>44%</div>
        </div>
        <div style={{ height: 8, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '44%', height: '100%', background: 'linear-gradient(90deg, var(--teal-700), var(--lime-600))' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16 }}>
        <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 16 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < steps.length-1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 99,
                background: s.status === 'done' ? 'var(--lime-600)' : s.status === 'active' ? 'var(--teal-700)' : 'var(--paper-3)',
                color: s.status === 'pending' ? 'var(--ink-500)' : 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0,
              }}>{s.status === 'done' ? '✓' : s.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{s.desc}</div>
              </div>
              {s.status === 'active' && <Btn size="sm" kind="primary">Continue</Btn>}
              {s.status === 'done' && <span className="pill green">Done</span>}
            </div>
          ))}
        </div>

        <div className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Step 5 of 9</div>
          <h2 style={{ margin: '4px 0 16px', fontSize: 20, fontWeight: 600 }}>Connect your bank accounts</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {['GTBank','Zenith Bank','Access Bank','UBA','First Bank','Stanbic IBTC','Wema (ALAT)','Kuda'].map((b, i) => (
              <div key={b} style={{
                padding: 12, border: i === 0 ? '1.5px solid var(--teal-700)' : '1px solid var(--line)',
                borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                background: i === 0 ? 'var(--teal-50)' : 'var(--paper)',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--paper-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--ink-700)' }}>
                  {b.split(' ').map(x=>x[0]).slice(0,2).join('')}
                </div>
                <div style={{ flex: 1, fontSize: 12.5, fontWeight: 500 }}>{b}</div>
                {i === 0 && <span className="pill green">Connected</span>}
              </div>
            ))}
          </div>

          <div style={{ padding: 12, background: 'var(--paper-2)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 16, color: 'var(--teal-700)' }}>ⓘ</span>
            <div style={{ fontSize: 12, color: 'var(--ink-700)' }}>
              We use Mono / Okra for read-only bank reconciliation. Your credentials never touch Digitglance servers — connections renew via OAuth every 90 days.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
            <Btn kind="ghost">Skip for now</Btn>
            <Btn kind="ghost">Back</Btn>
            <Btn kind="primary">Continue · Step 6</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings -------------------------------------------------------
function Settings() {
  return (
    <div style={{ padding: 24, background: 'var(--paper-2)' }}>
      <h1 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 600 }}>Settings</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { g: 'Tenant', items: ['Business profile', 'Plan & billing', 'Branches', 'Currencies (NGN, USD, GBP)'] },
          { g: 'Operations', items: ['POS terminals', 'Cash drawers', 'Receipt templates', 'Barcode formats'] },
          { g: 'Tax & finance', items: ['VAT classifications', 'Chart of accounts', 'Bank accounts', 'Costing method'] },
          { g: 'People', items: ['Users (12)', 'Roles & permissions', 'Approval workflows', 'Audit log'] },
          { g: 'Inventory', items: ['Categories', 'Units of measure', 'Reorder rules', 'Batch & serial tracking'] },
          { g: 'Integrations', items: ['Mono · banking', 'Paystack · payments', 'WhatsApp Cloud API', 'FIRS e-invoicing'] },
        ].map(g => (
          <div key={g.g} className="hairline" style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, marginBottom: 8 }}>{g.g}</div>
            {g.items.map(it => (
              <div key={it} style={{ padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{it}</span>
                <span style={{ color: 'var(--ink-400)' }}>›</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

window.VAT = VAT;
window.Customers = Customers;
window.Vendors = Vendors;
window.Reports = Reports;
window.Onboarding = Onboarding;
window.Settings = Settings;
