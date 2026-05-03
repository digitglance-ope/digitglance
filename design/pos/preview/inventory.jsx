// Inventory module ---------------------------------------------------------
function Inventory() {
  const D = window.DG;
  const [tab, setTab] = useState('products');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(new Set());

  const filtered = D.PRODUCTS.filter(p => {
    if (filter === 'low' && p.stock > p.reorder) return false;
    if (filter === 'out' && p.stock > 0) return false;
    if (query) {
      const q = query.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q);
    }
    return true;
  });

  const totalValue = D.PRODUCTS.reduce((s, p) => s + p.stock * p.cost, 0);
  const totalRetail = D.PRODUCTS.reduce((s, p) => s + p.stock * p.price, 0);
  const lowCount = D.PRODUCTS.filter(p => p.stock <= p.reorder).length;

  return (
    <div style={{ padding: 24, background: 'var(--paper-2)', minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Inventory · 4 branches · Weighted average costing</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Stock & products</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost" icon={<span>↑</span>}>Import CSV</Btn>
          <Btn kind="ghost" icon={<span>↓</span>}>Export</Btn>
          <Btn kind="ghost">Stock count</Btn>
          <Btn kind="ghost">New transfer</Btn>
          <Btn kind="primary" icon={<span>+</span>}>New product</Btn>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 16 }}>
        <KPI label="SKUs active" value="1,284" sub="98 categories · 4 warehouses" accent="teal" />
        <KPI label="Stock at cost" value={D.fmtK(totalValue)} sub="Weighted avg" delta={3.2} accent="teal" />
        <KPI label="Retail value" value={D.fmtK(totalRetail)} sub={`Margin ${(((totalRetail-totalValue)/totalRetail)*100).toFixed(1)}%`} accent="lime" />
        <KPI label="Below reorder" value={String(lowCount)} sub="9 critical · 6 warning" accent="amber" />
        <KPI label="Inbound (7d)" value="₦4.28M" sub="3 GRNs · 2 in transit" accent="teal" />
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--paper)', borderRadius: 'var(--r-md)', border: '1px solid var(--line)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', padding: '0 12px', gap: 4, alignItems: 'center' }}>
          {[
            { id: 'products', label: 'Products', count: '1,284' },
            { id: 'movements', label: 'Stock movements', count: '184' },
            { id: 'transfers', label: 'Transfers', count: '12' },
            { id: 'grn', label: 'Goods receipts', count: '8' },
            { id: 'count', label: 'Counts & adjustments', count: '4' },
            { id: 'valuation', label: 'Valuation', count: null },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: 'transparent', border: 'none', padding: '12px 12px',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              color: tab === t.id ? 'var(--ink-900)' : 'var(--ink-500)',
              borderBottom: tab === t.id ? '2px solid var(--teal-700)' : '2px solid transparent',
              marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {t.label}
              {t.count && <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{t.count}</span>}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <span className="pill">Costing: Weighted Avg</span>
        </div>

        {tab === 'products' && (
          <div>
            <div style={{ padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
              <SearchInput value={query} onChange={setQuery} placeholder="Search SKU, name, barcode…" kbd="⌘K" />
              <div style={{ display: 'flex', gap: 4 }}>
                {[{id:'all', l:'All', n: D.PRODUCTS.length}, {id:'low', l:'Low stock', n: lowCount}, {id:'out', l:'Out of stock', n: 0}].map(f => (
                  <button key={f.id} onClick={() => setFilter(f.id)} className="pill" style={{ background: filter === f.id ? 'var(--ink-900)' : 'var(--paper-3)', color: filter === f.id ? 'white' : 'var(--ink-700)', borderColor: 'transparent' }}>{f.l} · {f.n}</button>
                ))}
              </div>
              <span style={{ flex: 1 }} />
              <Btn kind="ghost" size="sm">All branches ▾</Btn>
              <Btn kind="ghost" size="sm">All categories ▾</Btn>
              <Btn kind="ghost" size="sm">VAT class ▾</Btn>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--ink-500)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500, background: 'var(--paper-2)' }}>
                  <th style={{ padding: '8px 12px', width: 28 }}><input type="checkbox" /></th>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>VAT</th>
                  <th style={{ textAlign: 'right' }}>Cost</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Margin</th>
                  <th style={{ textAlign: 'right' }}>On hand</th>
                  <th style={{ textAlign: 'right' }}>Reorder</th>
                  <th style={{ textAlign: 'right' }}>Value</th>
                  <th style={{ width: 32 }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 18).map((p) => {
                  const margin = ((p.price - p.cost) / p.price) * 100;
                  const low = p.stock <= p.reorder;
                  const cat = D.CATEGORIES.find(c => c.id === p.cat);
                  return (
                    <tr key={p.id} style={{ borderTop: '1px solid var(--line)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-2)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                      <td style={{ padding: '8px 12px' }}><input type="checkbox" /></td>
                      <td className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{p.sku}</td>
                      <td style={{ fontWeight: 500 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 4,
                            background: `repeating-linear-gradient(45deg, var(--paper-3) 0 4px, var(--paper-2) 4px 8px)`,
                          }} />
                          <div>
                            <div>{p.name}</div>
                            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-400)' }}>{p.barcode}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--ink-500)' }}>{cat?.name}</td>
                      <td><VatBadgeRow cls={p.vat} /></td>
                      <td className="mono" style={{ textAlign: 'right', color: 'var(--ink-500)' }}>₦{p.cost.toLocaleString()}</td>
                      <td className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>₦{p.price.toLocaleString()}</td>
                      <td className="mono" style={{ textAlign: 'right', color: margin > 20 ? 'var(--lime-700)' : 'var(--ink-700)' }}>{margin.toFixed(1)}%</td>
                      <td className="mono" style={{ textAlign: 'right', fontWeight: 500, color: low ? 'var(--rose)' : 'var(--ink-900)' }}>
                        {p.stock} {p.unit}
                      </td>
                      <td className="mono" style={{ textAlign: 'right', color: 'var(--ink-400)' }}>{p.reorder}</td>
                      <td className="mono" style={{ textAlign: 'right', fontWeight: 500 }}>₦{(p.stock * p.cost).toLocaleString()}</td>
                      <td style={{ color: 'var(--ink-400)', textAlign: 'center' }}>⋯</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-500)', borderTop: '1px solid var(--line)' }}>
              <span>Showing 1–18 of {filtered.length}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <Btn size="sm" kind="ghost">‹ Prev</Btn>
                <Btn size="sm" kind="ghost">Next ›</Btn>
              </div>
            </div>
          </div>
        )}

        {tab === 'movements' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--ink-500)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500, background: 'var(--paper-2)' }}>
                <th style={{ padding: '8px 12px' }}>Reference</th>
                <th>Date</th>
                <th>Type</th>
                <th>Source</th>
                <th>Destination</th>
                <th style={{ textAlign: 'right' }}>Items</th>
                <th style={{ textAlign: 'right' }}>Qty Δ</th>
                <th style={{ textAlign: 'right' }}>Value</th>
                <th>By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {D.STOCK_MOVES.map((m) => (
                <tr key={m.ref} style={{ borderTop: '1px solid var(--line)' }}>
                  <td className="mono" style={{ padding: '10px 12px', fontWeight: 500, color: 'var(--teal-700)' }}>{m.ref}</td>
                  <td className="mono" style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{m.date}</td>
                  <td><MoveTypeBadge type={m.type} /></td>
                  <td style={{ color: 'var(--ink-700)' }}>{m.src}</td>
                  <td style={{ fontWeight: 500 }}>{m.dst}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>{m.items}</td>
                  <td className="mono" style={{ textAlign: 'right', color: m.qty < 0 ? 'var(--rose)' : 'var(--ink-900)', fontWeight: 500 }}>{m.qty > 0 ? '+' : ''}{m.qty}</td>
                  <td className="mono" style={{ textAlign: 'right', color: m.value < 0 ? 'var(--rose)' : 'var(--ink-900)', fontWeight: 500 }}>{m.value < 0 ? '−' : ''}₦{Math.abs(m.value).toLocaleString()}</td>
                  <td style={{ color: 'var(--ink-500)', fontSize: 11.5 }}>{m.by}</td>
                  <td><span className="pill">View</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(tab === 'transfers' || tab === 'grn' || tab === 'count') && (
          <div style={{ padding: 32, textAlign: 'center' }}>
            <Placeholder label={`${tab.toUpperCase()} workspace · drag-drop builder, multi-line editor, approval workflow`} h={200} />
          </div>
        )}

        {tab === 'valuation' && (
          <div style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'FIFO', val: '₦18.42M', delta: 0, sub: 'Method default' },
                { label: 'LIFO', val: '₦18.96M', delta: 2.9, sub: '+₦540K vs FIFO' },
                { label: 'Weighted Avg', val: '₦18.61M', delta: 1.0, sub: 'Active method', active: true },
                { label: 'Standard cost', val: '₦18.20M', delta: -1.2, sub: 'Variance ₦220K' },
              ].map((m, i) => (
                <div key={i} className="hairline" style={{
                  padding: 14, borderRadius: 'var(--r-md)',
                  background: m.active ? 'var(--teal-50)' : 'var(--paper)',
                  borderColor: m.active ? 'var(--teal-700)' : 'var(--line)',
                  borderWidth: m.active ? 1.5 : 1,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: m.active ? 'var(--teal-900)' : 'var(--ink-700)' }}>{m.label}</span>
                    {m.active && <span className="pill teal">Active</span>}
                  </div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{m.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 14, background: 'var(--amber-bg)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>⚠</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Changing costing method recalculates inventory valuation across all branches.</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>Last recalculation: Jan 1, 2026 · 03:00 GMT · 14,284 records affected. A reversal journal will be posted automatically.</div>
              </div>
              <Btn kind="ghost" size="sm">Switch method</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VatBadgeRow({ cls }) {
  const m = { V: { l: 'V', c: 'var(--teal-700)' }, Z: { l: 'Z', c: 'var(--lime-600)' }, E: { l: 'E', c: 'var(--ink-500)' }, N: { l: 'N', c: 'var(--ink-500)' } }[cls];
  return <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 3, fontSize: 10, fontWeight: 600, background: 'var(--paper-3)', color: m.c }}>{m.l}</span>;
}

function MoveTypeBadge({ type }) {
  const map = {
    'Goods Receipt':    { bg: 'var(--lime-100)', fg: 'var(--teal-900)' },
    'Branch Transfer':  { bg: 'var(--teal-50)',  fg: 'var(--teal-900)' },
    'Stock Adjustment': { bg: 'var(--amber-bg)', fg: 'oklch(45% 0.12 70)' },
    'Stock Count':      { bg: 'var(--paper-3)',  fg: 'var(--ink-700)' },
    'Damaged Stock':    { bg: 'var(--rose-bg)',  fg: 'var(--rose)' },
  };
  const m = map[type] || { bg: 'var(--paper-3)', fg: 'var(--ink-700)' };
  return <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: m.bg, color: m.fg }}>{type}</span>;
}

window.Inventory = Inventory;
