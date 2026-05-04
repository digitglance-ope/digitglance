// Central product registry — all products, plans, nav items, and limits defined here.
// Every file in the platform imports from this file. Nothing is hardcoded elsewhere.

export type ProductSlug = 'invoice' | 'pos' | 'accounting' | 'school'
export type PlanSlug = 'free' | 'starter' | 'pro'
export type ProductStatus = 'live' | 'coming_soon'

export interface NavItem {
  label: string
  href: string
  iconPath: string
}

export interface ProductPlan {
  slug: PlanSlug
  name: string
  price: number           // Monthly price in Naira
  originalPrice: number   // Pre-discount price shown with strikethrough
  invoiceLimit: number | null  // null = unlimited
  includedUsers: number
  extraUserPrice: number  // Naira per extra user per month
  features: string[]
  excluded: string[]
}

export interface Product {
  slug: ProductSlug
  name: string
  shortName: string
  tagline: string
  description: string
  basePath: string
  dashboardPath: string
  colorClass: string      // Tailwind color base e.g. 'teal', 'blue'
  status: ProductStatus
  plans: ProductPlan[]
  navItems: NavItem[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'invoice',
    name: 'DigitGlance Invoice',
    shortName: 'Invoice',
    tagline: 'Professional invoicing for Nigerian businesses',
    description: 'Create invoices, track payments, manage customers, suppliers, and inventory. Built for Nigerian VAT, WHT, and FIRS compliance.',
    basePath: '/app/invoice',
    dashboardPath: '/app/invoice/dashboard',
    colorClass: 'teal',
    status: 'live',
    plans: [
      {
        slug: 'free',
        name: 'Free',
        price: 0,
        originalPrice: 0,
        invoiceLimit: 20,
        includedUsers: 1,
        extraUserPrice: 0,
        features: [
          '20 invoices per month',
          'Customer management',
          'PDF invoice generation',
          'Basic reports',
        ],
        excluded: [
          'Inventory management',
          'VAT reports',
          'User control',
          'Supplier management',
        ],
      },
      {
        slug: 'starter',
        name: 'Starter',
        price: 5000,
        originalPrice: 7500,
        invoiceLimit: 100,
        includedUsers: 1,
        extraUserPrice: 2000,
        features: [
          '100 invoices per month',
          'Customer management',
          'PDF invoice generation',
          'Inventory (up to 1,000 items)',
          'Full reports and VAT report',
          'User control (1 user included)',
          'Additional users at ₦2,000 each',
        ],
        excluded: [
          'Supplier management',
          'Accounts payable and receivable',
        ],
      },
      {
        slug: 'pro',
        name: 'Pro',
        price: 12000,
        originalPrice: 18000,
        invoiceLimit: null,
        includedUsers: 2,
        extraUserPrice: 2000,
        features: [
          'Unlimited invoices',
          'Customer management',
          'PDF invoice generation',
          'Unlimited inventory',
          'Full reports and VAT report',
          'User control (2 users included)',
          'Supplier management',
          'Accounts payable and receivable',
          'Additional users at ₦2,000 each',
          'Priority support',
        ],
        excluded: [],
      },
    ],
    navItems: [
      {
        label: 'Dashboard',
        href: '/app/invoice/dashboard',
        iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
      {
        label: 'Invoices',
        href: '/app/invoice/invoices',
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      },
      {
        label: 'Customers',
        href: '/app/invoice/customers',
        iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      },
      {
        label: 'Inventory',
        href: '/app/invoice/inventory',
        iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      },
      {
        label: 'Suppliers',
        href: '/app/invoice/suppliers',
        iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      },
      {
        label: 'Reports',
        href: '/app/invoice/reports',
        iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
    ],
  },

  {
    slug: 'pos',
    name: 'DigitGlance POS',
    shortName: 'POS',
    tagline: 'Point of sale for Nigerian retail businesses',
    description: 'Sell products, track stock, manage cash and card payments, and generate FIRS-compliant VAT reports.',
    basePath: '/app/pos',
    dashboardPath: '/app/pos/dashboard',
    colorClass: 'blue',
    status: 'live',
    plans: [
      {
        slug: 'starter',
        name: 'Starter',
        price: 8000,
        originalPrice: 12000,
        invoiceLimit: null,
        includedUsers: 1,
        extraUserPrice: 2000,
        features: [
          '1 branch, 1 terminal',
          'Up to 500 products',
          'Cash, card, and transfer payments',
          'Daily sales reports',
          'VAT tracking (FIRS)',
          'Customer credit accounts',
        ],
        excluded: [
          'Multi-branch',
          'Inventory valuation',
          'Vendor management',
        ],
      },
      {
        slug: 'pro',
        name: 'Pro',
        price: 18000,
        originalPrice: 25000,
        invoiceLimit: null,
        includedUsers: 2,
        extraUserPrice: 2000,
        features: [
          'Up to 3 branches, 3 terminals',
          'Unlimited products',
          'All payment methods incl. USSD & OPay',
          'Full VAT compliance (FIRS export)',
          'Vendor & purchase management',
          'FIFO/LIFO/WAVG inventory valuation',
          'Staff performance reports',
          'Priority support',
        ],
        excluded: [],
      },
    ],
    navItems: [
      {
        label: 'Dashboard',
        href: '/app/pos/dashboard',
        iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
      {
        label: 'Terminal',
        href: '/app/pos/terminal',
        iconPath: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      },
      {
        label: 'Inventory',
        href: '/app/pos/inventory',
        iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      },
      {
        label: 'Customers',
        href: '/app/pos/customers',
        iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      },
      {
        label: 'Vendors',
        href: '/app/pos/vendors',
        iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      },
      {
        label: 'VAT & FIRS',
        href: '/app/pos/vat',
        iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      },
      {
        label: 'Reports',
        href: '/app/pos/reports',
        iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
    ],
  },

  {
    slug: 'accounting',
    name: 'DigitGlance Accounting',
    shortName: 'Accounting',
    tagline: 'Full accounting software for Nigerian SMEs',
    description: 'Double-entry bookkeeping, financial statements, bank reconciliation, and ICAN-compliant reporting.',
    basePath: '/app/accounting',
    dashboardPath: '/app/accounting/dashboard',
    colorClass: 'purple',
    status: 'coming_soon',
    plans: [],
    navItems: [],
  },

  {
    slug: 'school',
    name: 'School Fee Track Pro',
    shortName: 'School Fees',
    tagline: 'School fee collection and tracking for Nigerian schools',
    description: 'Manage students, fee schedules, payment collection, receipts, and outstanding balance reports.',
    basePath: '/app/school',
    dashboardPath: '/app/school/dashboard',
    colorClass: 'orange',
    status: 'coming_soon',
    plans: [],
    navItems: [],
  },
]

// ── Lookup helpers ──────────────────────────────────────────────────────────

export function getProduct(slug: ProductSlug): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getLiveProducts(): Product[] {
  return PRODUCTS.filter(p => p.status === 'live')
}

export function getProductPlan(
  productSlug: ProductSlug,
  planSlug: PlanSlug
): ProductPlan | undefined {
  return getProduct(productSlug)?.plans.find(p => p.slug === planSlug)
}

// ── Plan limit helpers ──────────────────────────────────────────────────────
// Returns the invoice limit for a given product and plan.
// null means unlimited.

export function getInvoiceLimit(
  productSlug: ProductSlug,
  planSlug: PlanSlug
): number | null {
  return getProductPlan(productSlug, planSlug)?.invoiceLimit ?? 20
}

