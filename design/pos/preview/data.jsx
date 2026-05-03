// Realistic Nigerian SME supermarket data ----------------------------------

const NAIRA = '₦';
const fmt = (n, opts = {}) => {
  const { decimals = 2, signed = false, naira = true } = opts;
  const sign = n < 0 ? '−' : (signed && n > 0 ? '+' : '');
  const abs = Math.abs(n);
  const s = abs.toLocaleString('en-NG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${sign}${naira ? NAIRA : ''}${s}`;
};
const fmtK = (n) => {
  const abs = Math.abs(n);
  if (abs >= 1e9) return `₦${(n/1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `₦${(n/1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `₦${(n/1e3).toFixed(1)}K`;
  return `₦${n.toFixed(0)}`;
};

const TENANT = {
  name: 'Mama Ngozi Supermarket',
  plan: 'Business · Annual',
  tin: '20-2847163-0001',
  branches: ['Surulere · HQ', 'Ikeja City Mall', 'Lekki Phase 1', 'Yaba Tech'],
  vatRate: 7.5,
};

const USER = {
  name: 'Adaeze Okafor',
  role: 'Cashier',
  branch: 'Surulere · HQ',
  terminal: 'POS-03',
  shiftId: 'SH-2026-0503-03',
  shiftOpen: '08:14',
  openingFloat: 50000,
};

// Product catalogue — supermarket
const CATEGORIES = [
  { id: 'all',       name: 'All',          count: 1284, color: '#0E8383' },
  { id: 'beverages', name: 'Beverages',    count: 142, color: '#0E8383' },
  { id: 'staples',   name: 'Staples',      count: 89,  color: '#37D200' },
  { id: 'dairy',     name: 'Dairy & Eggs', count: 67,  color: '#0E8383' },
  { id: 'snacks',    name: 'Snacks',       count: 211, color: '#37D200' },
  { id: 'household', name: 'Household',    count: 178, color: '#0E8383' },
  { id: 'personal',  name: 'Personal Care',count: 134, color: '#37D200' },
  { id: 'frozen',    name: 'Frozen',       count: 52,  color: '#0E8383' },
  { id: 'bakery',    name: 'Bakery',       count: 41,  color: '#37D200' },
  { id: 'alcohol',   name: 'Wines & Spirits', count: 76, color: '#0E8383' },
];

// VAT classifications: V = vatable (7.5%), Z = zero-rated, E = exempt, N = non-vatable
const PRODUCTS = [
  { id: 'p001', sku: 'BEV-CC-50CL',  barcode: '6154000123456', name: 'Coca-Cola 50cl PET',         cat: 'beverages', price:  300, cost:  220, stock: 248, reorder: 60, vat: 'V', unit: 'btl' },
  { id: 'p002', sku: 'BEV-FNT-50CL', barcode: '6154000123457', name: 'Fanta Orange 50cl',          cat: 'beverages', price:  300, cost:  220, stock: 192, reorder: 60, vat: 'V', unit: 'btl' },
  { id: 'p003', sku: 'BEV-SPT-50CL', barcode: '6154000123458', name: 'Sprite 50cl',                cat: 'beverages', price:  300, cost:  220, stock:  87, reorder: 60, vat: 'V', unit: 'btl' },
  { id: 'p004', sku: 'BEV-PSI-1L',   barcode: '6154000223451', name: 'Pepsi 1.5L',                 cat: 'beverages', price:  850, cost:  640, stock: 156, reorder: 40, vat: 'V', unit: 'btl' },
  { id: 'p005', sku: 'BEV-EYA-75',   barcode: '6154000223452', name: 'Eva Water 75cl',             cat: 'beverages', price:  250, cost:  180, stock: 312, reorder:100, vat: 'V', unit: 'btl' },
  { id: 'p006', sku: 'BEV-FMS-1L',   barcode: '6154000223453', name: 'Five Alive Pulpy 1L',        cat: 'beverages', price: 1200, cost:  900, stock:  68, reorder: 30, vat: 'V', unit: 'pck' },
  { id: 'p007', sku: 'BEV-MLO-500',  barcode: '6154000223454', name: 'Milo Refill 500g',           cat: 'beverages', price: 4500, cost: 3650, stock:  44, reorder: 20, vat: 'V', unit: 'pck' },
  { id: 'p008', sku: 'BEV-NES-100',  barcode: '6154000223455', name: 'Nescafé Classic 100g',       cat: 'beverages', price: 5800, cost: 4700, stock:  29, reorder: 15, vat: 'V', unit: 'jar' },

  { id: 'p010', sku: 'STA-RIC-50K',  barcode: '6154000334451', name: 'Mama Gold Rice 50kg',        cat: 'staples',   price: 92000, cost: 84500, stock: 18, reorder:  8, vat: 'Z', unit: 'bag' },
  { id: 'p011', sku: 'STA-RIC-25',   barcode: '6154000334452', name: 'Mama Gold Rice 25kg',        cat: 'staples',   price: 47500, cost: 43000, stock: 31, reorder: 10, vat: 'Z', unit: 'bag' },
  { id: 'p012', sku: 'STA-GAR-5K',   barcode: '6154000334453', name: 'Ijebu Garri 5kg',            cat: 'staples',   price: 6800, cost:  5400, stock: 67, reorder: 25, vat: 'Z', unit: 'bag' },
  { id: 'p013', sku: 'STA-BNS-5K',   barcode: '6154000334454', name: 'Honey Beans 5kg',            cat: 'staples',   price: 12500, cost:11000, stock: 22, reorder: 12, vat: 'Z', unit: 'bag' },
  { id: 'p014', sku: 'STA-PAL-5L',   barcode: '6154000334455', name: 'Palm Oil 5L (Bottle)',       cat: 'staples',   price: 13500, cost:11800, stock: 41, reorder: 15, vat: 'V', unit: 'btl' },
  { id: 'p015', sku: 'STA-VEG-5L',   barcode: '6154000334456', name: 'Devon King Veg Oil 5L',      cat: 'staples',   price: 14200, cost:12400, stock: 28, reorder: 12, vat: 'V', unit: 'btl' },
  { id: 'p016', sku: 'STA-SLT-1K',   barcode: '6154000334457', name: 'Mr Chef Salt 1kg',           cat: 'staples',   price:  600, cost:   420, stock: 134, reorder: 40, vat: 'Z', unit: 'pck' },
  { id: 'p017', sku: 'STA-SUG-1K',   barcode: '6154000334458', name: 'Dangote Sugar 1kg',          cat: 'staples',   price: 1450, cost:  1180, stock:  9, reorder: 30, vat: 'V', unit: 'pck' },

  { id: 'p020', sku: 'DAI-PEK-900', barcode: '6154000445451', name: 'Peak Milk Powder 900g',       cat: 'dairy',     price: 8400, cost:  7200, stock: 38, reorder: 20, vat: 'V', unit: 'tin' },
  { id: 'p021', sku: 'DAI-EGG-30',  barcode: '6154000445452', name: 'Crate of Eggs (Large × 30)',  cat: 'dairy',     price: 5200, cost:  4400, stock: 24, reorder: 15, vat: 'Z', unit: 'crate' },
  { id: 'p022', sku: 'DAI-CHE-200', barcode: '6154000445453', name: 'Three Crowns Cheese 200g',    cat: 'dairy',     price: 2800, cost:  2350, stock: 17, reorder: 10, vat: 'V', unit: 'pck' },
  { id: 'p023', sku: 'DAI-YGT-1L',  barcode: '6154000445454', name: 'Hollandia Yoghurt 1L',        cat: 'dairy',     price: 2400, cost:  1950, stock: 41, reorder: 18, vat: 'V', unit: 'btl' },

  { id: 'p030', sku: 'SNK-IND-70',  barcode: '6154000556451', name: 'Indomie Chicken 70g',         cat: 'snacks',    price:  450, cost:  340, stock: 422, reorder:120, vat: 'V', unit: 'pck' },
  { id: 'p031', sku: 'SNK-IND-CTN', barcode: '6154000556452', name: 'Indomie Chicken Carton',      cat: 'snacks',    price: 8900, cost:  7600, stock:  46, reorder: 20, vat: 'V', unit: 'ctn' },
  { id: 'p032', sku: 'SNK-PRG-70',  barcode: '6154000556453', name: 'Pringles Original 70g',       cat: 'snacks',    price: 2400, cost:  2050, stock:  58, reorder: 25, vat: 'V', unit: 'tin' },
  { id: 'p033', sku: 'SNK-GLB-50',  barcode: '6154000556454', name: 'Gala Sausage Roll',           cat: 'snacks',    price:  200, cost:  150, stock: 312, reorder:100, vat: 'V', unit: 'pck' },
  { id: 'p034', sku: 'SNK-CHC-110', barcode: '6154000556455', name: 'Cadbury Bournvita 110g',      cat: 'snacks',    price: 1800, cost:  1450, stock:  6, reorder: 20, vat: 'V', unit: 'pck' },

  { id: 'p040', sku: 'HSE-OMO-1K',  barcode: '6154000667451', name: 'Omo Detergent 1kg',           cat: 'household', price: 2100, cost:  1700, stock:  74, reorder: 30, vat: 'V', unit: 'pck' },
  { id: 'p041', sku: 'HSE-MGL-CTN', barcode: '6154000667452', name: 'Maggi Cubes 200pcs',          cat: 'household', price: 3400, cost:  2900, stock: 112, reorder: 40, vat: 'V', unit: 'box' },
  { id: 'p042', sku: 'HSE-TIS-9R',  barcode: '6154000667453', name: 'Rose Tissue × 9 Rolls',       cat: 'household', price: 2800, cost:  2350, stock:  62, reorder: 25, vat: 'V', unit: 'pck' },
  { id: 'p043', sku: 'HSE-DET-3L',  barcode: '6154000667454', name: 'Mr Clean Liquid 3L',          cat: 'household', price: 4500, cost:  3800, stock:  31, reorder: 15, vat: 'V', unit: 'btl' },

  { id: 'p050', sku: 'PER-CLG-200', barcode: '6154000778451', name: 'Colgate Total 200ml',         cat: 'personal',  price: 2300, cost:  1900, stock:  54, reorder: 25, vat: 'V', unit: 'tube' },
  { id: 'p051', sku: 'PER-DOV-250', barcode: '6154000778452', name: 'Dove Soap 4-pack',            cat: 'personal',  price: 3800, cost:  3100, stock:  37, reorder: 20, vat: 'V', unit: 'pck' },
  { id: 'p052', sku: 'PER-DET-50',  barcode: '6154000778453', name: 'Pampers Newborn 50ct',        cat: 'personal',  price: 12500, cost: 10800, stock: 19, reorder: 10, vat: 'E', unit: 'pck' },

  { id: 'p060', sku: 'BAK-BRD-PRM', barcode: '6154000889451', name: 'Premium Sliced Bread',        cat: 'bakery',    price: 1500, cost:  1100, stock:  82, reorder: 40, vat: 'Z', unit: 'loaf' },
  { id: 'p061', sku: 'BAK-CRO-6P',  barcode: '6154000889452', name: 'Croissant 6-pack',            cat: 'bakery',    price: 2400, cost:  1900, stock:  18, reorder: 15, vat: 'V', unit: 'pck' },

  { id: 'p070', sku: 'ALC-HEN-65',  barcode: '6154000990451', name: 'Heineken 65cl',               cat: 'alcohol',   price: 1500, cost:  1180, stock:  92, reorder: 40, vat: 'V', unit: 'btl' },
  { id: 'p071', sku: 'ALC-MAR-75',  barcode: '6154000990452', name: 'Martell VS 75cl',             cat: 'alcohol',   price: 78000, cost: 68000, stock:  4, reorder:  3, vat: 'V', unit: 'btl' },

  { id: 'p080', sku: 'FRZ-CHK-1K',  barcode: '6154001012345', name: 'Frozen Chicken 1kg',          cat: 'frozen',    price: 4200, cost:  3500, stock:  47, reorder: 20, vat: 'V', unit: 'pck' },
  { id: 'p081', sku: 'FRZ-FSH-1K',  barcode: '6154001012346', name: 'Croaker Fish 1kg',            cat: 'frozen',    price: 5800, cost:  4900, stock:  22, reorder: 15, vat: 'V', unit: 'pck' },
];

const FAVORITES = ['p001', 'p030', 'p033', 'p014', 'p010', 'p005', 'p041', 'p016', 'p020', 'p042', 'p070', 'p060'];

const CUSTOMERS = [
  { id: 'c001', name: 'Walk-in Customer', phone: '—', credit: 0, balance: 0, tier: 'Walk-in' },
  { id: 'c002', name: 'Chinedu Eze',          phone: '0803 412 8821', credit: 50000,  balance: 18500, tier: 'Regular' },
  { id: 'c003', name: 'Funke Adeleke',        phone: '0816 220 3441', credit: 100000, balance: 67200, tier: 'VIP' },
  { id: 'c004', name: 'Bolanle Akin Caterers',phone: '0901 778 1190', credit: 250000, balance: 142800, tier: 'Wholesale' },
  { id: 'c005', name: 'St. Saviour School',   phone: '0807 552 0021', credit: 500000, balance: 0, tier: 'Wholesale' },
  { id: 'c006', name: 'Tunde Bakare',         phone: '0703 891 2245', credit: 30000,  balance: 4200, tier: 'Regular' },
];

const PAYMENT_METHODS = [
  { id: 'cash',     label: 'Cash',         icon: '₦', shortcut: 'F1' },
  { id: 'card',     label: 'POS Card',     icon: '▭', shortcut: 'F2' },
  { id: 'transfer', label: 'Bank Transfer',icon: '⇄', shortcut: 'F3' },
  { id: 'ussd',     label: 'USSD',         icon: '#', shortcut: 'F4' },
  { id: 'opay',     label: 'OPay / Wallet',icon: '◉', shortcut: 'F5' },
  { id: 'credit',   label: 'On Credit',    icon: '⏳', shortcut: 'F6' },
  { id: 'voucher',  label: 'Voucher',      icon: '◊', shortcut: 'F7' },
];

const SHORTCUTS = [
  { keys: ['F2'], desc: 'Focus product search' },
  { keys: ['F4'], desc: 'Open customer picker' },
  { keys: ['F8'], desc: 'Apply discount' },
  { keys: ['F9'], desc: 'Suspend transaction' },
  { keys: ['F10'], desc: 'Charge / pay' },
  { keys: ['Esc'], desc: 'Clear cart' },
  { keys: ['Ctrl', 'P'], desc: 'Reprint last receipt' },
  { keys: ['Ctrl', 'R'], desc: 'Return mode' },
  { keys: ['Ctrl', 'D'], desc: 'Open cash drawer' },
  { keys: ['↑', '↓'], desc: 'Navigate cart lines' },
];

// Dashboard time-series — last 14 days
const DAILY = [
  { d: 'Apr 20', sales: 842500,  txn: 287, gp: 178400 },
  { d: 'Apr 21', sales: 916200,  txn: 312, gp: 192800 },
  { d: 'Apr 22', sales: 1024800, txn: 358, gp: 218600 },
  { d: 'Apr 23', sales: 887400,  txn: 304, gp: 184200 },
  { d: 'Apr 24', sales: 1142300, txn: 411, gp: 246800 },
  { d: 'Apr 25', sales: 1488700, txn: 502, gp: 318200 },
  { d: 'Apr 26', sales: 1287400, txn: 458, gp: 268900 },
  { d: 'Apr 27', sales: 904200,  txn: 311, gp: 188100 },
  { d: 'Apr 28', sales: 1058600, txn: 367, gp: 224400 },
  { d: 'Apr 29', sales: 1187300, txn: 412, gp: 252100 },
  { d: 'Apr 30', sales: 1342800, txn: 461, gp: 287600 },
  { d: 'May 01', sales: 1620400, txn: 561, gp: 348900 },
  { d: 'May 02', sales: 1742900, txn: 598, gp: 374200 },
  { d: 'May 03', sales: 1247600, txn: 421, gp: 268400 },
];

const HOURLY = [
  { h: '08', v: 12 }, { h: '09', v: 28 }, { h: '10', v: 47 }, { h: '11', v: 62 },
  { h: '12', v: 78 }, { h: '13', v: 91 }, { h: '14', v: 64 }, { h: '15', v: 52 },
  { h: '16', v: 71 }, { h: '17', v: 88 }, { h: '18', v: 96 }, { h: '19', v: 74 },
  { h: '20', v: 41 }, { h: '21', v: 18 },
];

const TOP_PRODUCTS = [
  { name: 'Indomie Chicken 70g', units: 412, revenue: 185400, share: 14.8 },
  { name: 'Coca-Cola 50cl PET',  units: 287, revenue:  86100, share:  6.9 },
  { name: 'Premium Sliced Bread',units: 124, revenue: 186000, share: 14.9 },
  { name: 'Eva Water 75cl',      units: 318, revenue:  79500, share:  6.4 },
  { name: 'Gala Sausage Roll',   units: 287, revenue:  57400, share:  4.6 },
  { name: 'Maggi Cubes 200pcs',  units:  64, revenue: 217600, share: 17.4 },
];

const BRANCH_PERF = [
  { name: 'Surulere · HQ',    sales: 1247600, txn: 421, target: 1400000 },
  { name: 'Ikeja City Mall',  sales:  984200, txn: 358, target: 1100000 },
  { name: 'Lekki Phase 1',    sales: 1602400, txn: 487, target: 1500000 },
  { name: 'Yaba Tech',        sales:  527800, txn: 211, target:  600000 },
];

const STAFF_PERF = [
  { name: 'Adaeze Okafor',    txn: 142, sales: 487200, gp: 102400, branch: 'Surulere' },
  { name: 'Emeka Nwosu',      txn: 128, sales: 412800, gp:  87600, branch: 'Surulere' },
  { name: 'Yetunde Bello',    txn: 117, sales: 398400, gp:  84200, branch: 'Ikeja' },
  { name: 'Musa Ibrahim',     txn:  94, sales: 312600, gp:  68400, branch: 'Lekki' },
  { name: 'Grace Ojo',        txn:  87, sales: 287400, gp:  61200, branch: 'Yaba' },
];

const RECENT_ACTIVITY = [
  { t: '14:32', who: 'Adaeze O.',  what: 'Sale #INV-58241',     amt:  4850, type: 'sale' },
  { t: '14:29', who: 'Emeka N.',   what: 'Sale #INV-58240',     amt: 12400, type: 'sale' },
  { t: '14:27', who: 'System',     what: 'Low stock: Sugar 1kg',amt: null,  type: 'alert' },
  { t: '14:24', who: 'Yetunde B.', what: 'Return #RET-1124',    amt: -2400, type: 'return' },
  { t: '14:21', who: 'Adaeze O.',  what: 'Sale #INV-58239',     amt:  8920, type: 'sale' },
  { t: '14:18', who: 'Manager',    what: 'GRN #GRN-0884',       amt: 284500,type: 'grn' },
  { t: '14:14', who: 'Emeka N.',   what: 'Sale #INV-58238',     amt:  3600, type: 'sale' },
];

// VAT module data
const VAT_SUMMARY = {
  period: 'April 2026',
  outputVat: 1842600,
  inputVat:  984200,
  liability: 858400,
  filingDue: 'May 21, 2026',
  status: 'Draft',
};

const VAT_BREAKDOWN = [
  { class: 'V', label: 'Standard Vatable (7.5%)',  output: 1842600, input: 984200,  net:   858400, txns: 4128 },
  { class: 'Z', label: 'Zero-rated (0%)',          output: 0,       input: 0,       net:        0, txns:  847 },
  { class: 'E', label: 'Exempted',                 output: 0,       input: 0,       net:        0, txns:  124 },
  { class: 'N', label: 'Non-vatable',              output: 0,       input: 0,       net:        0, txns:   38 },
];

const VAT_HISTORY = [
  { period: 'Mar 2026',  liability: 742800,  filed: 'Apr 18, 2026', ref: 'FIRS-VAT-202603-2841',  status: 'Filed & Paid' },
  { period: 'Feb 2026',  liability: 681400,  filed: 'Mar 19, 2026', ref: 'FIRS-VAT-202602-1944',  status: 'Filed & Paid' },
  { period: 'Jan 2026',  liability: 612200,  filed: 'Feb 17, 2026', ref: 'FIRS-VAT-202601-0837',  status: 'Filed & Paid' },
  { period: 'Dec 2025',  liability: 894600,  filed: 'Jan 19, 2026', ref: 'FIRS-VAT-202512-9921',  status: 'Filed & Paid' },
];

// Inventory module data
const STOCK_MOVES = [
  { ref: 'GRN-0884', date: '2026-05-03 14:18', type: 'Goods Receipt',    src: 'Eko Distribution Ltd', dst: 'Surulere · HQ', items: 32, qty: 1284, value: 2845000, by: 'Manager Tunde' },
  { ref: 'TRF-0231', date: '2026-05-03 11:42', type: 'Branch Transfer',  src: 'Surulere · HQ',        dst: 'Ikeja City Mall', items: 18, qty: 412, value: 684200, by: 'Manager Tunde' },
  { ref: 'ADJ-0118', date: '2026-05-02 17:08', type: 'Stock Adjustment', src: '—',                    dst: 'Lekki Phase 1',   items: 4, qty: -22, value: -48400, by: 'Audit · Bola' },
  { ref: 'GRN-0883', date: '2026-05-02 09:24', type: 'Goods Receipt',    src: 'Mama Gold Distrib.',   dst: 'Lekki Phase 1',   items: 12, qty: 487, value: 1842000, by: 'Manager Tunde' },
  { ref: 'CNT-0044', date: '2026-05-01 19:00', type: 'Stock Count',      src: '—',                    dst: 'Yaba Tech',       items: 124, qty: 0, value: -12400, by: 'Audit · Bola' },
  { ref: 'DMG-0017', date: '2026-05-01 15:34', type: 'Damaged Stock',    src: 'Surulere · HQ',        dst: 'Write-off',       items: 3, qty: -8,  value: -18200, by: 'Cashier · Adaeze' },
  { ref: 'TRF-0230', date: '2026-04-30 16:12', type: 'Branch Transfer',  src: 'Lekki Phase 1',        dst: 'Yaba Tech',       items: 9, qty: 184, value: 312800, by: 'Manager Tunde' },
];

const VENDORS = [
  { name: 'Eko Distribution Ltd',        balance: 1842000,  terms: 'Net 30',  rating: 'A',  contact: 'sales@eko.ng',     since: 'Mar 2022' },
  { name: 'Mama Gold Distributors',      balance: 2640000,  terms: 'Net 14',  rating: 'A',  contact: 'orders@mamagold.com', since: 'Aug 2021' },
  { name: 'Coca-Cola Hellenic NG',       balance:  847200,  terms: 'Net 7',   rating: 'A+', contact: 'finance@cchel.ng', since: 'Jan 2021' },
  { name: 'Dangote Sugar Refinery',      balance: 1284000,  terms: 'COD',     rating: 'A',  contact: 'b2b@dangotesugar.com', since: 'Jun 2022' },
  { name: 'Hollandia Dairy Ltd',         balance:  248400,  terms: 'Net 14',  rating: 'B+', contact: 'orders@hollandia.ng', since: 'Feb 2023' },
  { name: 'Pampers Nigeria',             balance:  680000,  terms: 'Net 30',  rating: 'A',  contact: 'pg@pg.ng',         since: 'Sep 2022' },
];

window.DG = {
  TENANT, USER, CATEGORIES, PRODUCTS, FAVORITES, CUSTOMERS, PAYMENT_METHODS, SHORTCUTS,
  DAILY, HOURLY, TOP_PRODUCTS, BRANCH_PERF, STAFF_PERF, RECENT_ACTIVITY,
  VAT_SUMMARY, VAT_BREAKDOWN, VAT_HISTORY, STOCK_MOVES, VENDORS,
  fmt, fmtK,
};
