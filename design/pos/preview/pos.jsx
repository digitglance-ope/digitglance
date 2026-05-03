// POS Terminal -------------------------------------------------------------
function POS({ density, layout = 'classic' }) {
  const D = window.DG;
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [cart, setCart] = useState([
    { id: 'p030', qty: 6,  lineDisc: 0 },
    { id: 'p001', qty: 12, lineDisc: 0 },
    { id: 'p014', qty: 1,  lineDisc: 0 },
    { id: 'p042', qty: 2,  lineDisc: 0 },
    { id: 'p060', qty: 3,  lineDisc: 0 },
  ]);
  const [customer, setCustomer] = useState(D.CUSTOMERS[2]);
  const [invoiceDisc, setInvoiceDisc] = useState(0);
  const [showPay, setShowPay] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [held, setHeld] = useState([
    { id: 'HOLD-1', cust: 'Walk-in', items: 4, total: 8400 },
    { id: 'HOLD-2', cust: 'Funke A.', items: 11, total: 23800 },
  ]);
  const searchRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'F2') { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === 'F10') { e.preventDefault(); setShowPay(true); }
      if (e.key === 'Escape') setShowPay(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const products = useMemo(() => {
    let list = D.PRODUCTS;
    if (activeCat !== 'all') list = list.filter(p => p.cat === activeCat);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q));
    }
    return list;
  }, [query, activeCat]);

  const cartLines = cart.map(c => {
    const p = D.PRODUCTS.find(x => x.id === c.id);
    const gross = p.price * c.qty;
    const lineDisc = (gross * c.lineDisc) / 100;
    const net = gross - lineDisc;
    const vat = p.vat === 'V' ? net * 0.075 / 1.075 : 0;
    return { ...c, p, gross, lineDisc, net, vat };
  });
  const subtotal  = cartLines.reduce((s, l) => s + l.net, 0);
  const totalVat  = cartLines.reduce((s, l) => s + l.vat, 0);
  const invDisc   = (subtotal * invoiceDisc) / 100;
  const grand     = subtotal - invDisc;
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  const addProduct = (id) => {
    setCart(c => {
      const ex = c.find(x => x.id === id);
      if (ex) return c.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { id, qty: 1, lineDisc: 0 }];
    });
    setActiveLine(0);
  };
  const updateQty = (idx, delta) => setCart(c => c.map((x, i) => i === idx ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  const removeLine = (idx) => setCart(c => c.filter((_, i) => i !== idx));

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: layout === 'list-first' ? '1fr 480px' : '1.4fr 460px',
      height: '100%', background: 'var(--paper-3)',
    }}>
      {/* LEFT: Catalogue */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* POS Toolbar */}
        <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <SearchInput
            inputRef={searchRef}
            value={query} onChange={setQuery}
            placeholder="Scan barcode or search by name, SKU…"
            kbd="F2" large autoFocus
          />
          <Btn kind="ghost" size="md" icon={<span>⌕</span>}>Browse</Btn>
          <div style={{ width: 1, height: 24, background: 'var(--line)' }} />
          <Btn kind="ghost" size="md" kbd="F4" icon={<span>👤</span>}>{customer.name}</Btn>
          <Btn kind="ghost" size="md" icon={<span>🛍️</span>}>Held ({held.length})</Btn>
        </div>

        {/* Category strip */}
        <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '8px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {D.CATEGORIES.map(cat => {
            const active = cat.id === activeCat;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                background: active ? 'var(--ink-900)' : 'var(--paper-2)',
                color: active ? 'white' : 'var(--ink-700)',
                border: 'none', borderRadius: 'var(--r-sm)', fontSize: 12.5, fontWeight: 500,
                whiteSpace: 'nowrap', cursor: 'pointer',
              }}>
                {cat.name}
                <span style={{ fontSize: 10.5, color: active ? 'rgba(255,255,255,0.6)' : 'var(--ink-400)', fontFamily: 'var(--font-mono)' }}>{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Quick rows */}
        <div style={{ padding: '12px 14px 6px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
          <span>★ Favorites</span>
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', textTransform: 'none', letterSpacing: 0 }}>tap or press 1-9</span>
        </div>
        <div style={{ padding: '0 14px 12px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {D.FAVORITES.slice(0, 12).map((id, i) => {
            const p = D.PRODUCTS.find(x => x.id === id);
            return <FavBtn key={id} p={p} idx={i+1} onClick={() => addProduct(id)} />;
          })}
        </div>

        {/* Product grid */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0 14px 14px' }}>
          <div style={{ padding: '6px 0 8px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
            <span>{activeCat === 'all' ? 'All products' : D.CATEGORIES.find(c=>c.id===activeCat)?.name}</span>
            <span className="mono" style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-400)' }}>· {products.length}</span>
            <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-400)' }}>{query ? `Filtered: "${query}"` : 'Tap to add'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))', gap: 8 }}>
            {products.slice(0, 30).map(p => (
              <ProductCard key={p.id} p={p} onClick={() => addProduct(p.id)} />
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--ink-500)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--lime-600)' }} />Online</span>
          <span>Terminal <span className="mono" style={{ color: 'var(--ink-900)' }}>{D.USER.terminal}</span></span>
          <span>Shift <span className="mono" style={{ color: 'var(--ink-900)' }}>{D.USER.shiftId}</span></span>
          <span>Opened <span className="mono">{D.USER.shiftOpen}</span></span>
          <span style={{ flex: 1 }} />
          <span>Cash drawer · <span className="mono" style={{ color: 'var(--ink-900)' }}>₦{(D.USER.openingFloat + 184600).toLocaleString()}</span></span>
          <span>Last sync <span className="mono">14:32:08</span></span>
        </div>
      </div>

      {/* RIGHT: Cart */}
      <div style={{ background: 'var(--paper)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
        {/* Cart header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Sale · INV-58242</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{customer.name}</div>
            {customer.tier !== 'Walk-in' && (
              <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>
                {customer.tier} · Credit limit ₦{customer.credit.toLocaleString()} · Balance ₦{customer.balance.toLocaleString()}
              </div>
            )}
          </div>
          <Btn size="sm" kind="soft" icon={<span>✎</span>}>Edit</Btn>
        </div>

        {/* Cart lines */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {cartLines.length === 0 ? (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--ink-500)', fontSize: 13 }}>
              Cart is empty. Scan or search to add items.
            </div>
          ) : (
            <div>
              <div style={{ padding: '8px 16px', display: 'grid', gridTemplateColumns: '1fr 80px 80px 96px', gap: 8, fontSize: 10.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>
                <span>Item</span>
                <span style={{ textAlign: 'center' }}>Qty</span>
                <span style={{ textAlign: 'right' }}>Price</span>
                <span style={{ textAlign: 'right' }}>Total</span>
              </div>
              {cartLines.map((l, i) => (
                <div key={i} onClick={() => setActiveLine(i)} style={{
                  padding: '10px 16px',
                  display: 'grid', gridTemplateColumns: '1fr 80px 80px 96px', gap: 8,
                  alignItems: 'center', cursor: 'pointer',
                  background: activeLine === i ? 'var(--teal-50)' : 'transparent',
                  borderLeft: activeLine === i ? '3px solid var(--teal-700)' : '3px solid transparent',
                  borderBottom: '1px solid var(--line)',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.p.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-500)', display: 'flex', gap: 8, marginTop: 2 }}>
                      <span className="mono">{l.p.sku}</span>
                      <VatBadge cls={l.p.vat} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <button onClick={(e) => { e.stopPropagation(); updateQty(i, -1); }} style={qtyBtn}>−</button>
                    <span className="mono" style={{ minWidth: 22, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>{l.qty}</span>
                    <button onClick={(e) => { e.stopPropagation(); updateQty(i, 1); }} style={qtyBtn}>+</button>
                  </div>
                  <div className="mono" style={{ textAlign: 'right', fontSize: 12, color: 'var(--ink-500)' }}>{l.p.price.toLocaleString()}</div>
                  <div className="mono" style={{ textAlign: 'right', fontSize: 13, fontWeight: 500 }}>
                    ₦{l.net.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discount/notes row */}
        <div style={{ borderTop: '1px solid var(--line)', padding: '10px 16px', display: 'flex', gap: 8 }}>
          <Btn size="sm" kind="soft" kbd="F8">Discount</Btn>
          <Btn size="sm" kind="soft">Note</Btn>
          <Btn size="sm" kind="soft">Tax override</Btn>
          <span style={{ flex: 1 }} />
          <Btn size="sm" kind="ghost" kbd="F9">Hold</Btn>
          <Btn size="sm" kind="ghost" style={{ color: 'var(--rose)' }}>Void</Btn>
        </div>

        {/* Totals */}
        <div style={{ background: 'var(--paper-2)', padding: '14px 16px', borderTop: '1px solid var(--line)' }}>
          <TotalRow label="Items" value={`${cart.length} lines · ${itemCount} units`} mono={false} />
          <TotalRow label="Subtotal (excl. VAT)" value={`₦${(subtotal - totalVat).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <TotalRow label="VAT (7.5%)" value={`₦${totalVat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          {invoiceDisc > 0 && <TotalRow label={`Discount (${invoiceDisc}%)`} value={`−₦${invDisc.toLocaleString()}`} tone="rose" />}
        </div>

        {/* Pay */}
        <div style={{ background: 'var(--ink-900)', color: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total due</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>
              ₦{grand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <button onClick={() => setShowPay(true)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--lime-600)', color: 'white', border: 'none',
            padding: '14px 20px', borderRadius: 'var(--r-sm)', fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
          }}>
            Charge <span style={{ marginLeft: 4, padding: '2px 6px', background: 'rgba(0,0,0,0.18)', borderRadius: 3, fontSize: 11, fontFamily: 'var(--font-mono)' }}>F10</span>
          </button>
        </div>
      </div>

      {/* Payment modal */}
      {showPay && <PaymentModal grand={grand} onClose={() => setShowPay(false)} />}
    </div>
  );
}

const qtyBtn = {
  width: 22, height: 22, borderRadius: 4,
  border: '1px solid var(--line-2)', background: 'var(--paper)',
  fontSize: 13, color: 'var(--ink-700)', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, lineHeight: 1,
};

function VatBadge({ cls }) {
  const m = {
    V: { label: 'VAT 7.5%', bg: 'var(--teal-50)', fg: 'var(--teal-900)' },
    Z: { label: 'Zero-rated', bg: 'var(--lime-100)', fg: 'var(--teal-900)' },
    E: { label: 'Exempt',     bg: 'var(--paper-3)', fg: 'var(--ink-700)' },
    N: { label: 'Non-vat',    bg: 'var(--paper-3)', fg: 'var(--ink-700)' },
  }[cls];
  return <span style={{ padding: '1px 5px', borderRadius: 3, background: m.bg, color: m.fg, fontSize: 9.5, fontWeight: 600, letterSpacing: '0.02em' }}>{m.label}</span>;
}

function FavBtn({ p, idx, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'relative', textAlign: 'left', padding: '8px 10px',
      background: 'var(--paper)', border: '1px solid var(--line)',
      borderRadius: 'var(--r-sm)', cursor: 'pointer', overflow: 'hidden',
    }}>
      <div className="mono" style={{ position: 'absolute', top: 4, right: 6, fontSize: 9, color: 'var(--ink-400)' }}>{idx}</div>
      <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 12 }}>{p.name}</div>
      <div className="mono" style={{ fontSize: 11.5, color: 'var(--teal-700)', fontWeight: 600, marginTop: 2 }}>₦{p.price.toLocaleString()}</div>
    </button>
  );
}

function ProductCard({ p, onClick }) {
  const low = p.stock <= p.reorder;
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', padding: 0, background: 'var(--paper)',
      border: '1px solid var(--line)', borderRadius: 'var(--r-sm)',
      cursor: 'pointer', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 64,
        background: `repeating-linear-gradient(45deg, var(--paper-3) 0 6px, var(--paper-2) 6px 12px)`,
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-400)',
      }}>
        product
        {low && <span className="pill rose" style={{ position: 'absolute', top: 4, right: 4 }}>Low</span>}
        <VatBadge cls={p.vat} />
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ fontSize: 11.5, fontWeight: 500, lineHeight: 1.2, height: 28, overflow: 'hidden' }}>{p.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
          <span className="mono" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--teal-700)' }}>₦{p.price.toLocaleString()}</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-400)' }}>×{p.stock}</span>
        </div>
      </div>
    </button>
  );
}

function TotalRow({ label, value, tone, mono = true }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, padding: '3px 0' }}>
      <span style={{ color: 'var(--ink-500)' }}>{label}</span>
      <span className={mono ? 'mono' : ''} style={{ color: tone === 'rose' ? 'var(--rose)' : 'var(--ink-900)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function PaymentModal({ grand, onClose }) {
  const D = window.DG;
  const [tendered, setTendered] = useState(grand);
  const [splits, setSplits] = useState([{ method: 'cash', amount: grand }]);
  const totalSplit = splits.reduce((s, x) => s + Number(x.amount || 0), 0);
  const change = totalSplit - grand;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 720, background: 'var(--paper)', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Collect payment</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>INV-58242 · Funke Adeleke</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18, color: 'var(--ink-500)', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ padding: 20, borderRight: '1px solid var(--line)' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Method</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {D.PAYMENT_METHODS.map((m, i) => (
                <button key={m.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                  background: i === 0 ? 'var(--teal-50)' : 'var(--paper)',
                  border: i === 0 ? '1px solid var(--teal-700)' : '1px solid var(--line)',
                  borderRadius: 'var(--r-sm)', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 16, color: 'var(--teal-700)' }}>{m.icon}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{m.label}</span>
                  <span className="kbd">{m.shortcut}</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 16, fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Split payment</div>
            <div style={{ background: 'var(--paper-2)', borderRadius: 'var(--r-sm)', padding: 10 }}>
              {splits.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                  <span className="pill teal">{D.PAYMENT_METHODS.find(m => m.id === s.method)?.label}</span>
                  <span style={{ flex: 1 }} />
                  <span className="mono" style={{ fontWeight: 500 }}>₦{Number(s.amount).toLocaleString()}</span>
                </div>
              ))}
              <button style={{ marginTop: 6, fontSize: 12, color: 'var(--teal-700)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>+ Add another method</button>
            </div>
          </div>

          <div style={{ padding: 20, background: 'var(--paper-2)' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount due</div>
            <div className="mono" style={{ fontSize: 32, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.02em' }}>₦{grand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

            <div style={{ marginTop: 16, fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cash tendered</div>
            <input value={tendered} onChange={e => setTendered(Number(e.target.value) || 0)} type="number"
              className="mono"
              style={{ width: '100%', height: 56, fontSize: 26, fontWeight: 600, padding: '0 14px', border: '1px solid var(--teal-700)', borderRadius: 'var(--r-sm)', background: 'var(--paper)' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginTop: 8 }}>
              {[5000, 10000, 20000, 50000, 100000, Math.ceil(grand/1000)*1000, 'Exact', 'Clear'].map((q, i) => (
                <button key={i} onClick={() => {
                  if (q === 'Exact') setTendered(grand);
                  else if (q === 'Clear') setTendered(0);
                  else setTendered(Number(q));
                }} style={{
                  height: 36, background: 'var(--paper)', border: '1px solid var(--line)',
                  borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-mono)', cursor: 'pointer',
                }}>{typeof q === 'number' ? `+₦${q.toLocaleString()}` : q}</button>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: 12, background: change >= 0 ? 'var(--lime-100)' : 'var(--rose-bg)', borderRadius: 'var(--r-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--ink-700)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{change >= 0 ? 'Change due' : 'Short by'}</span>
              <span className="mono" style={{ fontSize: 22, fontWeight: 600, color: change >= 0 ? 'var(--teal-900)' : 'var(--rose)' }}>₦{Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Btn kind="ghost" full size="lg" onClick={onClose}>Cancel</Btn>
              <Btn kind="success" full size="lg" disabled={change < 0}>Complete sale · F10</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.POS = POS;
