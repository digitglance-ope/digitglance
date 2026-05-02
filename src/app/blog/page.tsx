'use client'

import { useState } from 'react'

interface Article {
  slug: string | null
  category: string
  title: string
  description: string
  date: string
  readTime?: string
  featured?: boolean
}

interface Template {
  slug: string
  industry: string
  description: string
  files: string[]
  available: boolean
  borderColor: string
  bgColor: string
  iconBgColor: string
  badgeBg: string
  badgeText: string
  iconPath: string
}

const articles: Article[] = [
  {
    slug: 'how-to-calculate-vat-in-nigeria',
    category: 'Tax Practice',
    title: 'How to Calculate and File VAT in Nigeria for Small Businesses',
    description: 'A practical step-by-step guide to computing Output VAT, Input VAT, and your net VAT payable to NRS every month. Includes a worked example and the full TaxPro Max filing process.',
    date: 'April 28, 2026',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'invoice-vs-receipt-nigeria',
    category: 'Accounting for SMEs',
    title: 'The Difference Between an Invoice and a Receipt in Nigerian Business',
    description: 'Many Nigerian business owners use invoices and receipts interchangeably. Here is what each document means, what it must contain, and why the difference matters for VAT claims.',
    date: 'April 28, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-manage-accounts-receivable-nigeria',
    category: 'Accounting for SMEs',
    title: 'How to Manage Accounts Receivable and Reduce Late Payments in Nigeria',
    description: 'Late payments are one of the biggest cash flow problems for Nigerian SMEs. This guide shows you how to track what customers owe and collect it faster with a structured AR system.',
    date: 'April 28, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'income-tax-vs-company-income-tax-nigeria',
    category: 'Tax Practice',
    title: 'Income Tax vs Company Income Tax in Nigeria: What Every Business Owner Must Know',
    description: 'Personal income tax and company income tax are two separate obligations in Nigeria. Understanding which applies to your business prevents penalties and double-filing mistakes.',
    date: 'April 28, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'why-nigerian-smes-need-bookkeeping',
    category: 'Accounting for SMEs',
    title: 'Why Nigerian SMEs Need Proper Bookkeeping and How to Start Today',
    description: 'Most small businesses in Nigeria do not keep proper financial records until something goes wrong. Here is why bookkeeping matters and how to start without a full-time accountant.',
    date: 'April 28, 2026',
    readTime: '6 min read',
  },
  {
    slug: null,
    category: 'Tax Practice',
    title: 'How to Calculate PAYE Tax in Nigeria: Step by Step for 2025',
    description: 'A practical guide to computing PAYE deductions for employees using the current consolidated relief allowance and progressive tax bands under PITA.',
    date: 'Coming Soon',
  },
  {
    slug: null,
    category: 'Excel and Automation',
    title: 'How to Build a Petty Cash System in Excel Without Macros',
    description: 'A beginner-friendly guide to creating a fully functional petty cash tracker using Excel formulas and structured tables. No VBA or coding required.',
    date: 'Coming Soon',
  },
  {
    slug: null,
    category: 'Student Resources',
    title: 'ICAN Exam Preparation: How to Approach Financial Reporting Questions',
    description: 'Practical tips for ICAN students on how to structure answers for financial reporting and analysis questions in professional level examinations.',
    date: 'Coming Soon',
  },
]

const templates: Template[] = [
  {
    slug: 'construction',
    industry: 'Construction',
    description: 'Track project costs, material usage, labour, and contract billing for construction businesses of any size.',
    files: ['Project Cost Tracker', 'Material Usage Log', 'Labour Cost Sheet', 'Contract Billing Tracker', 'Equipment Maintenance Log'],
    available: true,
    borderColor: 'border-amber-100',
    bgColor: 'bg-amber-50',
    iconBgColor: 'bg-amber-100',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    slug: 'school',
    industry: 'School and Education',
    description: 'Manage student fee collection, staff payroll, school expenses, attendance records, and budget planning.',
    files: ['Student Fee Tracker', 'Staff Payroll Sheet', 'School Expense Tracker', 'Attendance Register', 'Budget Planning Sheet'],
    available: true,
    borderColor: 'border-blue-100',
    bgColor: 'bg-blue-50',
    iconBgColor: 'bg-blue-100',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    slug: 'trading',
    industry: 'Trading and Retail',
    description: 'Sales and inventory tracking, daily cashbook, customer ledger, supplier payables, and profit analysis.',
    files: ['Sales and Inventory Tracker', 'Daily Cashbook', 'Customer Ledger', 'Supplier Payables Tracker', 'Profit Analysis Sheet'],
    available: false,
    borderColor: 'border-green-100',
    bgColor: 'bg-green-50',
    iconBgColor: 'bg-green-100',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    slug: 'manufacturing',
    industry: 'Manufacturing',
    description: 'Production cost sheets, raw material inventory, WIP tracking, finished goods, and COGS calculation.',
    files: ['Production Cost Sheet', 'Raw Material Inventory', 'WIP Tracker', 'Finished Goods Inventory', 'COGS Calculator'],
    available: false,
    borderColor: 'border-slate-200',
    bgColor: 'bg-slate-50',
    iconBgColor: 'bg-slate-200',
    badgeBg: 'bg-slate-200',
    badgeText: 'text-slate-600',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    slug: 'hotel',
    industry: 'Hotel and Hospitality',
    description: 'Room booking tracker, daily revenue report, hotel expenses, staff payroll, and occupancy dashboard.',
    files: ['Room Booking Tracker', 'Daily Revenue Report', 'Hotel Expense Tracker', 'Staff Payroll Sheet', 'Occupancy Rate Dashboard'],
    available: false,
    borderColor: 'border-purple-100',
    bgColor: 'bg-purple-50',
    iconBgColor: 'bg-purple-100',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    slug: 'rental',
    industry: 'Rental Property',
    description: 'Rent collection, tenant ledger, property expenses, vacancy tracker, and property ROI calculator.',
    files: ['Rent Collection Tracker', 'Tenant Ledger', 'Property Expense Tracker', 'Vacancy Tracker', 'Property ROI Calculator'],
    available: false,
    borderColor: 'border-teal-100',
    bgColor: 'bg-teal-50',
    iconBgColor: 'bg-teal-100',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
  },
]

const CATEGORIES = ['All Articles', 'Tax Practice', 'Accounting for SMEs', 'Excel and Automation', 'Student Resources']

const CheckIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Articles')

  const filteredArticles =
    activeCategory === 'All Articles'
      ? articles
      : articles.filter(a => a.category === activeCategory)

  const featuredArticle = articles.find(a => a.featured && a.slug)
  const showFeaturedSeparately = activeCategory === 'All Articles' && !!featuredArticle

  const gridArticles = showFeaturedSeparately
    ? filteredArticles.filter(a => a.slug && !a.featured)
    : filteredArticles.filter(a => a.slug)

  const comingSoonArticles = filteredArticles.filter(a => !a.slug)

  return (
    <main className="min-h-screen bg-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/services" className="hover:text-teal-600">Services</a>
            <a href="/products" className="hover:text-teal-600">Products</a>
            <a href="/solutions" className="hover:text-teal-600">Solutions</a>
            <a href="/learn" className="hover:text-teal-600">Learn</a>
            <a href="/blog" className="text-teal-600">Blog</a>
            <a href="/app/login" className="hover:text-teal-600">Sign In</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-slate-900 text-white px-6 py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full border border-teal-400" />
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-teal-400" />
          <div className="absolute -bottom-10 left-20 w-80 h-80 rounded-full border border-teal-400" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <p className="text-teal-400 text-sm font-semibold mb-4 uppercase tracking-widest">
            Knowledge Centre
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight max-w-3xl">
            Practical Accounting and Tax Knowledge for Nigerian Businesses
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">
            Articles, guides, and free Excel templates written for SME owners, accountants, and students operating in Nigeria.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#articles" className="bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors">
              Browse Articles
            </a>
            <a href="#templates" className="border border-slate-600 text-white font-semibold px-8 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors">
              Free Excel Templates
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section id="articles" className="px-6 py-6 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {showFeaturedSeparately && featuredArticle && (
        <section className="px-6 pt-16 pb-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-6">
              Featured Article
            </p>
            <a href={`/blog/${featuredArticle.slug}`} className="block group">
              <div className="grid md:grid-cols-2 border border-gray-100 rounded-2xl overflow-hidden hover:border-teal-200 hover:shadow-md transition-all">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-12 min-h-[240px]">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                    </div>
                    <p className="text-teal-400 text-xs font-semibold uppercase tracking-widest">
                      {featuredArticle.category}
                    </p>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full inline-block mb-4 w-fit">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {featuredArticle.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{featuredArticle.date}</span>
                      <span>·</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <span className="text-sm font-semibold text-teal-600 group-hover:text-teal-700 transition-colors">
                      Read article →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* ARTICLES GRID */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">

          {gridArticles.length > 0 && (
            <div className="mb-12">
              {showFeaturedSeparately && (
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  More Articles
                </p>
              )}
              <div className="grid md:grid-cols-3 gap-6">
                {gridArticles.map(article => (
                  <a
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-teal-200 hover:shadow-sm transition-all"
                  >
                    <div className="bg-slate-50 px-6 py-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      {article.readTime && (
                        <span className="text-xs text-slate-400">{article.readTime}</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed flex-1">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-400">{article.date}</span>
                        <span className="text-xs font-semibold text-teal-600 group-hover:text-teal-700 transition-colors">
                          Read →
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* No results state */}
          {gridArticles.length === 0 && comingSoonArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm">No articles in this category yet.</p>
            </div>
          )}

          {/* Coming Soon */}
          {comingSoonArticles.length > 0 && (
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-6">
                Coming Soon
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {comingSoonArticles.map(article => (
                  <div
                    key={article.title}
                    className="flex flex-col border border-dashed border-slate-200 rounded-xl overflow-hidden opacity-70"
                  >
                    <div className="bg-slate-50 px-6 py-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-slate-400 mb-3 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TOPIC REQUEST CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Have a topic you want us to cover?</h3>
              <p className="text-slate-500 text-sm max-w-lg">
                We write practical accounting and tax articles focused on Nigerian business practice. Submit a specific topic and we will write it.
              </p>
            </div>
            <a
              href="/contact"
              className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Request a Topic
            </a>
          </div>
        </div>
      </section>

      {/* FREE EXCEL TEMPLATES SECTION */}
      <section id="templates" className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">
                Free Resources
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Free Excel Templates for Nigerian Businesses
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl">
                Industry-specific Excel templates built for how Nigerian businesses actually operate. Download free, use immediately. New templates published every week.
              </p>
            </div>
            <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap self-start md:self-end">
              New Every Week
            </span>
          </div>

          {/* Templates grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {templates.map(template => (
              <div
                key={template.slug}
                className={`border rounded-2xl overflow-hidden ${template.bgColor} ${template.borderColor} ${!template.available ? 'opacity-60' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${template.iconBgColor} rounded-xl flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={template.iconPath} />
                      </svg>
                    </div>
                    {template.available ? (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${template.badgeBg} ${template.badgeText}`}>
                        Available
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-200 text-slate-500">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 mb-2">{template.industry}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{template.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {template.files.slice(0, 3).map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckIcon className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                    {template.files.length > 3 && (
                      <p className="text-xs text-slate-400 pl-5">
                        +{template.files.length - 3} more included
                      </p>
                    )}
                  </div>

                  {template.available ? (
                    <a
                      href={`/resources/templates/${template.slug}`}
                      className="block w-full text-center bg-white border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm hover:border-teal-300 hover:text-teal-600 transition-colors"
                    >
                      Download Free →
                    </a>
                  ) : (
                    <div className="block w-full text-center bg-slate-100 text-slate-400 font-semibold py-2.5 rounded-xl text-sm cursor-default">
                      Publishing Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Available count note */}
          <p className="text-center text-slate-400 text-sm mb-12">
            Templates available for 11 industries including Trading, Manufacturing, Hospital, Law Firms, Transportation, Entertainment, and Agriculture.
            New templates added weekly.
          </p>

          {/* Professional services positioning */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">
                  Need More Than a Template?
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  We Build Custom Excel and Automation Solutions
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  These free templates are solid starting points. But if your business needs something more tailored — custom formulas built around your specific workflow, automated dashboards, VBA systems that run at the click of a button, or industry-specific reporting designed exactly for how your business operates — our team builds it.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We also offer advanced premium templates with deeper automation, detailed financial analysis, and multi-sheet integration available on request.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: 'Custom VBA Desktop Systems',
                    desc: 'Full Excel automation with buttons, macros, forms, and custom workflows for your specific business process',
                    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                  },
                  {
                    title: 'Industry-Specific Dashboards',
                    desc: 'Management dashboards with dynamic charts, KPIs, automated summaries, and drill-down reports',
                    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                  },
                  {
                    title: 'Advanced Premium Templates',
                    desc: 'More detailed templates with deeper automation, advanced formulas, and multi-sheet integration on request',
                    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <a
                  href="/contact"
                  className="block text-center bg-teal-600 text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-teal-700 transition-colors mt-2"
                >
                  Discuss a Custom Solution
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">
            DigitGlance Invoice
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop managing your business finances manually
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            DigitGlance Invoice handles your invoices, payments, VAT tracking, and financial reports automatically. Free to start, built for Nigeria.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/app/register"
              className="bg-teal-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Create Free Account
            </a>
            <a
              href="/products"
              className="border border-slate-600 text-white font-semibold px-10 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors"
            >
              See the Product
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-2">
              Digit<span className="text-teal-400">Glance</span>
            </p>
            <p className="text-sm max-w-xs">
              Accounting intelligence and software solutions for Nigerian businesses and beyond.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-white font-medium mb-3">Services</p>
              <div className="space-y-2">
                <a href="/services" className="block hover:text-teal-400">Accounting</a>
                <a href="/services" className="block hover:text-teal-400">Tax Advisory</a>
                <a href="/solutions" className="block hover:text-teal-400">Excel VBA Tools</a>
              </div>
            </div>
            <div>
              <p className="text-white font-medium mb-3">Company</p>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-teal-400">About</a>
                <a href="/blog" className="block hover:text-teal-400">Blog</a>
                <a href="/contact" className="block hover:text-teal-400">Contact</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-8 text-xs flex justify-between">
          <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-teal-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-teal-400">Terms of Service</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
