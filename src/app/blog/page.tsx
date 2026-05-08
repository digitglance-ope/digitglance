'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { templates as allTemplates } from '@/lib/templates'

interface Article {
  slug: string | null
  category: string
  title: string
  description: string
  date: string
  readTime?: string
  featured?: boolean
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
    title: 'How to Calculate PAYE Tax in Nigeria: Step by Step for 2026',
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

const CATEGORIES = ['All Articles', 'Tax Practice', 'Accounting for SMEs', 'Excel and Automation', 'Student Resources']

const CATEGORY_COLORS: Record<string, string> = {
  'Tax Practice':         'bg-teal-100 text-teal-700',
  'Accounting for SMEs':  'bg-blue-100 text-blue-700',
  'Excel and Automation': 'bg-amber-100 text-amber-700',
  'Student Resources':    'bg-slate-100 text-slate-700',
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Articles')

  const filtered = activeCategory === 'All Articles' ? articles : articles.filter(a => a.category === activeCategory)
  const featuredArticle = articles.find(a => a.featured && a.slug)
  const showFeatured = activeCategory === 'All Articles' && !!featuredArticle

  const gridArticles = showFeatured
    ? filtered.filter(a => a.slug && !a.featured)
    : filtered.filter(a => a.slug)

  const comingSoon = filtered.filter(a => !a.slug)
  const availableTemplates = allTemplates.filter(t => t.available)

  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_320px] gap-10 items-center">
          <div>
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Knowledge Centre</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Practical accounting and tax knowledge for Nigerian businesses
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mb-8 leading-relaxed">
              Articles, guides, and free Excel templates written for SME owners, accountants, and students in Nigeria.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#articles" className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm">
                Browse Articles
              </a>
              <a href="#templates" className="border border-slate-600 text-white font-semibold px-6 py-3 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-all text-sm">
                Free Excel Templates
              </a>
            </div>
          </div>

          {/* Stats card */}
          <div className="hidden md:block bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">What you will find here</p>
            <div className="space-y-4">
              {[
                { value: `${articles.filter(a => a.slug).length}`, label: 'Articles published', dot: 'bg-teal-400' },
                { value: `${articles.filter(a => !a.slug).length}`, label: 'Coming soon', dot: 'bg-slate-500' },
                { value: `${allTemplates.length}`, label: 'Template packs', dot: 'bg-teal-400' },
                { value: `${availableTemplates.length * 5}+`, label: 'Free Excel templates', dot: 'bg-green-400' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                  <span className="text-2xl font-bold text-white w-14 flex-shrink-0">{s.value}</span>
                  <span className="text-slate-400 text-sm">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-700">
              <p className="text-xs text-slate-500 leading-relaxed">
                All content covers Nigerian tax law, NRS regulations, and business accounting practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER ─── */}
      <section id="articles" className="px-6 py-5 bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ─── FEATURED ARTICLE ─── */}
        {showFeatured && featuredArticle && (
          <div className="mb-14">
            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-5">Featured Article</p>
            <Link href={`/blog/${featuredArticle.slug}`} className="block group">
              <div className="grid md:grid-cols-2 border border-slate-200 rounded-3xl overflow-hidden hover:border-teal-300 hover:shadow-lg transition-all">
                {/* Visual panel */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-12 min-h-[240px]">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                    </div>
                    <p className="text-white/80 text-sm font-medium">Tax Practice Guide</p>
                    <p className="text-white text-2xl font-bold mt-1">VAT Filing</p>
                  </div>
                </div>
                {/* Content panel */}
                <div className="p-8 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[featuredArticle.category] ?? 'bg-slate-100 text-slate-600'}`}>
                      {featuredArticle.category}
                    </span>
                    {featuredArticle.readTime && (
                      <span className="text-xs text-slate-400">{featuredArticle.readTime}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{featuredArticle.description}</p>
                  <div className="flex items-center gap-2 text-teal-600 font-semibold text-sm">
                    Read Article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ─── ARTICLES GRID ─── */}
        {gridArticles.length > 0 && (
          <div className="mb-14">
            {showFeatured && <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">More Articles</p>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all h-full flex flex-col">
                    {/* Card header */}
                    <div className={`h-24 flex items-center justify-center ${
                      article.category === 'Tax Practice' ? 'bg-teal-50'
                      : article.category === 'Accounting for SMEs' ? 'bg-blue-50'
                      : 'bg-slate-50'
                    }`}>
                      <svg className={`w-8 h-8 ${
                        article.category === 'Tax Practice' ? 'text-teal-400'
                        : article.category === 'Accounting for SMEs' ? 'text-blue-400'
                        : 'text-slate-400'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-600'}`}>
                          {article.category}
                        </span>
                        {article.readTime && <span className="text-xs text-slate-400">{article.readTime}</span>}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3 leading-snug flex-1 group-hover:text-teal-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{article.date}</span>
                        <span className="text-xs font-semibold text-teal-600 group-hover:underline">Read →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── COMING SOON ─── */}
        {comingSoon.length > 0 && (
          <div className="mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Coming Soon</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoon.map(article => (
                <div key={article.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 opacity-70">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-500'} opacity-70 inline-block mb-3`}>
                    {article.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-700 mb-2 leading-snug">{article.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{article.description}</p>
                  <span className="inline-block mt-3 text-xs font-medium bg-slate-200 text-slate-500 px-2.5 py-1 rounded-full">Coming Soon</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── FREE TEMPLATES ─── */}
        <div id="templates" className="border-t border-slate-100 pt-14">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-2">Free Resources</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Free Excel templates for Nigerian businesses</h2>
              <p className="text-slate-500 max-w-xl">Professional spreadsheet templates for 11 industries. Download free, use immediately.</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                {availableTemplates.length} available now
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                {allTemplates.length - availableTemplates.length} coming soon
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allTemplates.map(pack => (
              <Link
                key={pack.slug}
                href={`/blog/templates/${pack.slug}`}
                className={`group bg-white border rounded-2xl p-5 transition-all flex flex-col ${
                  pack.available
                    ? 'border-slate-200 hover:border-teal-300 hover:shadow-md cursor-pointer'
                    : 'border-slate-100 opacity-70 cursor-default pointer-events-none'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${pack.accentIcon}`}>
                    <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={pack.iconPath} />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pack.available ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'}`}>
                    {pack.available ? 'Free' : 'Soon'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-teal-600 transition-colors">{pack.industry}</h3>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{pack.tagline}</p>
                {pack.available && (
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-600">
                    <span>View templates</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* ─── NEWSLETTER / CTA ─── */}
        <div className="mt-16 bg-teal-600 rounded-3xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Get new articles first</h3>
          <p className="text-teal-100 mb-6 max-w-lg mx-auto">
            New guides on Nigerian tax, accounting, and business software — delivered as soon as they publish. No spam.
          </p>
          <Link href="/contact" className="inline-block bg-white text-teal-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-50 transition-colors text-sm shadow-md">
            Contact Us to Subscribe
          </Link>
        </div>

      </div>

      <SiteFooter />
    </main>
  )
}
