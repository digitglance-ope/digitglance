// Dashboard ----------------------------------------------------------------
function Dashboard({ density }) {
  const D = window.DG;
  const today = D.DAILY[D.DAILY.length - 1];
  const yest = D.DAILY[D.DAILY.length - 2];
  const delta = ((today.sales - yest.sales) / yest.sales) * 100;

  return (
    <div style={{ padding: 24, background: 'var(--paper-2)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Sunday · 03 May 2026 · {D.TENANT.branches[0]}</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>Good afternoon, Adaeze.</h1>
          <div style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-500)' }}>
            Day's takings are <span style={{ color: 'var(--lime-700)', fontWeight: 500 }} className="mono">{delta > 0 ? '+' : ''}{delta.toFixed(1)}%</span> vs yesterday. {' '}
            <span className="mono">421</span> transactions across <span className="mono">4</span> branches.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost" icon={<span style={{ fontSize: 13 }}>📅</span>}>Today</Btn>
          <Btn kind="ghost">Compare</Btn>
          <Btn kind="ghost">Export</Btn>
          <Btn kind="primary" icon={<span>+</span>}>New Sale</Btn>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
        <KPI label="Today's Sales" value={D.fmtK(today.sales)} sub={`${today.txn} transactions`} delta={delta} accent="teal"
             sparkline={<Sparkline data={D.DAILY.slice(-10).map(d => d.sales)} w={220} h={28} />} />
        <KPI label="Cash Position" value="₦4.28M" sub="Across 3 banks · 2 tills" delta={2.4} accent="lime" />
        <KPI label="Receivables" value="₦12.84M" sub="84 customers · 12 overdue" delta={-1.8} accent="amber" />
        <KPI label="Payables" value="₦7.54M" sub="6 vendors · ₦2.84M due 7d" delta={4.2} accent="rose" />
      </div>

      {/* Row 1: Sales chart + Cash composition */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
        <Card title="Sales Trend · last 14 days" action={
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="pill teal">Sales</button>
            <button className="pill">Transactions</button>
            <button className="pill">Gross Profit</button>
          </div>
        }>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <div className="mono" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{D.fmt(D.DAILY.reduce((s,d)=>s+d.sales,0), {decimals:0})}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>14-day total · <span style={{ color: 'var(--lime-700)' }} className="mono">+18.4% vs prior period</span></div>
          </div>
          <SalesChart data={D.DAILY} />
        </Card>

        <Card title="Cash & Bank Position">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Donut size={120} thickness={20} segments={[
              { value: 1850000, color: '#0E8383' },
              { value: 1420000, color: '#37D200' },
              { value:  680000, color: '#06504F' },
              { value:  330000, color: '#119999' },
            ]} label={
              <>
                <div className="mono" style={{ fontSize: 16, fontWeight: 600 }}>₦4.28M</div>
                <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>liquid</div>
              </>
            } />
            <div style={{ flex: 1, fontSize: 12 }}>
              <CashRow color="#0E8383" label="GTBank · ***4821" amt={1850000} />
              <CashRow color="#37D200" label="Zenith · ***1102" amt={1420000} />
              <CashRow color="#06504F" label="Cash on Hand"     amt={680000} />
              <CashRow color="#119999" label="POS Float (4)"    amt={330000} />
            </div>
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: 'var(--ink-500)' }}>Reconciled today</span>
            <span className="mono" style={{ fontWeight: 500 }}>3 of 4 accounts</span>
          </div>
        </Card>
      </div>

      {/* Row 2: Branch perf + Top products + Hourly */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.9fr', gap: 12, marginBottom: 12 }}>
        <Card title="Branch performance · today" action={<a className="pill">View all</a>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {D.BRANCH_PERF.map((b) => {
              const pct = (b.sales / b.target) * 100;
              return (
                <div key={b.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                    <div style={{ fontWeight: 500 }}>{b.name}</div>
                    <div className="mono"><span style={{ color: 'var(--ink-900)', fontWeight: 500 }}>{D.fmtK(b.sales)}</span> <span style={{ color: 'var(--ink-400)' }}>/ {D.fmtK(b.target)}</span></div>
                  </div>
                  <div style={{ height: 6, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, background: pct > 100 ? 'var(--lime-600)' : 'var(--teal-700)', borderRadius: 99 }} />
                    {pct > 100 && <div style={{ position: 'absolute', right: 0, top: -2, height: 10, width: 2, background: 'var(--lime-700)' }} />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>
                    <span>{b.txn} txn · ₦{(b.sales/b.txn).toFixed(0)} avg</span>
                    <span className="mono" style={{ color: pct >= 100 ? 'var(--lime-700)' : pct >= 80 ? 'var(--ink-700)' : 'var(--amber)' }}>
                      {pct.toFixed(0)}% of target
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Top sellers · today" action={<a className="pill">By revenue</a>}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {D.TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < D.TOP_PRODUCTS.length-1 ? '1px solid var(--line)' : 'none' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-400)', width: 16 }}>{(i+1).toString().padStart(2, '0')}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{p.units} units · {p.share}% mix</div>
                </div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{D.fmtK(p.revenue)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Hourly velocity · today">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>96</div>
            <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>peak · 6pm</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 88 }}>
            {D.HOURLY.map((h, i) => {
              const pct = (h.v / 100) * 100;
              const isPeak = h.v === Math.max(...D.HOURLY.map(x=>x.v));
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', height: `${pct}%`, background: isPeak ? 'var(--lime-600)' : 'var(--teal-700)', borderRadius: 1, opacity: isPeak ? 1 : 0.7 }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
            {D.HOURLY.map((h, i) => (
              <div key={i} className="mono" style={{ flex: 1, fontSize: 9, color: 'var(--ink-400)', textAlign: 'center' }}>{i % 2 === 0 ? h.h : ''}</div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--ink-500)' }}>
            <span>Avg basket</span>
            <span className="mono" style={{ color: 'var(--ink-900)' }}>₦2,964</span>
          </div>
          <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--ink-500)' }}>
            <span>Items / sale</span>
            <span className="mono" style={{ color: 'var(--ink-900)' }}>4.2</span>
          </div>
        </Card>
      </div>

      {/* Row 3: VAT + Stock alerts + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <Card title="VAT position · April 2026" action={<span className="pill amber">Draft · Due {D.VAT_SUMMARY.filingDue.split(',')[0]}</span>}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <VatTile label="Output VAT" value={D.fmtK(D.VAT_SUMMARY.outputVat)} sub="Collected" tone="teal" />
            <VatTile label="Input VAT" value={D.fmtK(D.VAT_SUMMARY.inputVat)} sub="Recoverable" tone="lime" />
          </div>
          <div style={{ background: 'var(--paper-3)', padding: 10, borderRadius: 'var(--r-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net liability</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--rose)' }}>{D.fmt(D.VAT_SUMMARY.liability, {decimals: 0})}</div>
            </div>
            <Btn kind="primary" size="sm">File at FIRS</Btn>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--ink-500)' }}>
            4,128 vatable transactions · 847 zero-rated · 124 exempt
          </div>
        </Card>

        <Card title="Stock alerts" action={<span className="pill rose">9 critical</span>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { p: 'Cadbury Bournvita 110g', stock: 6, reorder: 20, sev: 'rose' },
              { p: 'Dangote Sugar 1kg', stock: 9, reorder: 30, sev: 'rose' },
              { p: 'Martell VS 75cl', stock: 4, reorder: 3, sev: 'amber' },
              { p: 'Mama Gold Rice 50kg', stock: 18, reorder: 8, sev: 'teal' },
              { p: 'Three Crowns Cheese', stock: 17, reorder: 10, sev: 'amber' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: a.sev === 'rose' ? 'var(--rose-bg)' : a.sev === 'amber' ? 'var(--amber-bg)' : 'var(--teal-50)', borderRadius: 4 }}>
                <div style={{ width: 4, height: 28, background: a.sev === 'rose' ? 'var(--rose)' : a.sev === 'amber' ? 'var(--amber)' : 'var(--teal-700)', borderRadius: 99 }} />
                <div style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>{a.p}</div>
                <div className="mono" style={{ fontSize: 11.5 }}>
                  <span style={{ fontWeight: 600 }}>{a.stock}</span>
                  <span style={{ color: 'var(--ink-400)' }}> / {a.reorder} min</span>
                </div>
              </div>
            ))}
          </div>
          <Btn kind="ghost" size="sm" full style={{ marginTop: 8 }}>Generate purchase orders →</Btn>
        </Card>

        <Card title="Live activity" action={<span className="pill green" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--lime-600)' }} />4 terminals live</span>}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {D.RECENT_ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < D.RECENT_ACTIVITY.length-1 ? '1px solid var(--line)' : 'none' }}>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-400)', width: 38 }}>{a.t}</div>
                <div style={{ width: 6, height: 6, borderRadius: 99, background: a.type === 'sale' ? 'var(--lime-600)' : a.type === 'return' ? 'var(--rose)' : a.type === 'alert' ? 'var(--amber)' : 'var(--teal-700)' }} />
                <div style={{ flex: 1, minWidth: 0, fontSize: 12 }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.what}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-500)' }}>{a.who}</div>
                </div>
                {a.amt != null && (
                  <div className="mono" style={{ fontSize: 11.5, fontWeight: 500, color: a.amt < 0 ? 'var(--rose)' : 'var(--ink-900)' }}>{D.fmt(a.amt, {decimals: 0})}</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Staff perf */}
      <div style={{ marginTop: 12 }}>
        <Card title="Staff sales · today" action={<div style={{ display: 'flex', gap: 4 }}><button className="pill teal">All branches</button><button className="pill">By GP</button></div>}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--ink-500)', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '8px 4px' }}>Cashier</th>
                <th>Branch</th>
                <th style={{ textAlign: 'right' }}>Transactions</th>
                <th style={{ textAlign: 'right' }}>Sales</th>
                <th style={{ textAlign: 'right' }}>Avg basket</th>
                <th style={{ textAlign: 'right' }}>Gross profit</th>
                <th style={{ textAlign: 'right' }}>GP %</th>
                <th style={{ textAlign: 'right' }}>Shift</th>
              </tr>
            </thead>
            <tbody>
              {D.STAFF_PERF.map((s, i) => (
                <tr key={s.name} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '8px 4px', fontWeight: 500 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 99, background: ['#0E8383','#37D200','#119999','#06504F','#0E8383'][i], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>
                        {s.name.split(' ').map(x => x[0]).slice(0,2).join('')}
                      </div>
                      {s.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-500)' }}>{s.branch}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>{s.txn}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>{D.fmt(s.sales, {decimals: 0})}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>{D.fmt(Math.round(s.sales / s.txn), {decimals: 0})}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>{D.fmt(s.gp, {decimals: 0})}</td>
                  <td className="mono" style={{ textAlign: 'right', color: 'var(--lime-700)' }}>{((s.gp/s.sales)*100).toFixed(1)}%</td>
                  <td style={{ textAlign: 'right' }}><span className="pill green">Open</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

function VatTile({ label, value, sub, tone }) {
  const c = tone === 'lime' ? 'var(--lime-700)' : 'var(--teal-700)';
  return (
    <div style={{ padding: '10px 12px', background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)' }}>
      <div style={{ fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: c, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{sub}</div>
    </div>
  );
}

function CashRow({ color, label, amt }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
      <div style={{ width: 6, height: 6, borderRadius: 99, background: color }} />
      <div style={{ flex: 1, fontSize: 11.5 }}>{label}</div>
      <div className="mono" style={{ fontSize: 11.5, fontWeight: 500 }}>{window.DG.fmtK(amt)}</div>
    </div>
  );
}

function SalesChart({ data }) {
  const w = 720, h = 180, pad = { l: 40, r: 12, t: 12, b: 24 };
  const max = Math.max(...data.map(d => d.sales)) * 1.1;
  const min = 0;
  const dx = (w - pad.l - pad.r) / (data.length - 1);
  const ny = (v) => pad.t + (h - pad.t - pad.b) * (1 - (v - min) / (max - min));
  const pts = data.map((d, i) => `${pad.l + i*dx},${ny(d.sales)}`).join(' ');
  const area = `M ${pad.l},${h-pad.b} L ${pts} L ${pad.l + (data.length-1)*dx},${h-pad.b} Z`;
  const grids = [0.25, 0.5, 0.75, 1].map(p => max * p);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 200, display: 'block' }}>
      {grids.map((g, i) => (
        <g key={i}>
          <line x1={pad.l} x2={w-pad.r} y1={ny(g)} y2={ny(g)} stroke="var(--line)" strokeDasharray="2 3" />
          <text x={pad.l - 6} y={ny(g) + 3} textAnchor="end" fontSize="9" fill="var(--ink-400)" fontFamily="var(--font-mono)">
            {window.DG.fmtK(g).replace('₦','')}
          </text>
        </g>
      ))}
      <path d={area} fill="url(#salesGrad)" opacity="0.35" />
      <polyline points={pts} fill="none" stroke="var(--teal-700)" strokeWidth="1.8" />
      {data.map((d, i) => {
        const isLast = i === data.length - 1;
        return (
          <g key={i}>
            <circle cx={pad.l + i*dx} cy={ny(d.sales)} r={isLast ? 4 : 2.5} fill={isLast ? 'var(--lime-600)' : 'var(--teal-700)'} stroke="white" strokeWidth="1.5" />
            {i % 2 === 0 && <text x={pad.l + i*dx} y={h - 8} textAnchor="middle" fontSize="9" fill="var(--ink-400)" fontFamily="var(--font-mono)">{d.d}</text>}
          </g>
        );
      })}
      <defs>
        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E8383" />
          <stop offset="100%" stopColor="#0E8383" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

window.Dashboard = Dashboard;
