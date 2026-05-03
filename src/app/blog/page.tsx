'use client'

import { useState } from 'react'
import Link from 'next/link'
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

  const availableTemplates = allTemplates.filter(t => t.available)
  const comingSoonTemplates = allTemplates.filter(t => !t.available)

  return (
    <main className="min-h-screen bg-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/services" className="hover:text-teal-600">Services</Link>
            <Link href="/products" className="hover:text-teal-600">Products</Link>
            <Link href="/solutions" className="hover:text-teal-600">Solutions</Link>
            <Link href="/ai-tools" className="hover:text-teal-600">AI Tools</Link>
            <Link href="/blog" className="text-teal-600">Blog</Link>
            <Link href="/app/login" className="hover:text-teal-600">Sign In</Link>
          </div>
          <Link href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </Link>
        </div>
      </nav>

      {/* HERO — 2-column layout, compact */}
      <section className="bg-slate-900 text-white px-6 py-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-10 right-10 w-96 h-96 rounded-full border border-teal-400" />
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full border border-teal-400" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-[1fr_340px] gap-8 items-center">
            {/* Left: heading + buttons */}
            <div>
              <p className="text-teal-400 text-xs font-bold mb-3 uppercase tracking-widest">Knowledge Centre</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Practical Accounting and Tax Knowledge for Nigerian Businesses
              </h1>
              <p className="text-slate-300 text-base max-w-xl mb-7 leading-relaxed">
                Articles, guides, and free Excel templates written for SME owners, accountants, and students operating in Nigeria.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#articles" className="bg-teal-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm">
                  Browse Articles
                </a>
                <a href="#templates" className="border border-slate-600 text-white font-semibold px-7 py-3 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors text-sm">
                  Free Excel Templates
                </a>
              </div>
            </div>

            {/* Right: stats card */}
            <div className="hidden md:block bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">What you will find here</p>
              <div className="space-y-4">
                {[
                  { value: `${articles.filter(a => a.slug).length}`, label: 'Articles published', dot: 'bg-teal-400' },
                  { value: `${articles.filter(a => !a.slug).length}`, label: 'Articles coming soon', dot: 'bg-slate-500' },
                  { value: `${allTemplates.length}`, label: 'Industry template packs', dot: 'bg-teal-400' },
                  { value: `${availableTemplates.length * 5}+`, label: 'Free Excel templates', dot: 'bg-green-400' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stat.dot}`} />
                    <span className="text-2xl font-bold text-white w-14 flex-shrink-0">{stat.value}</span>
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-slate-700">
                <p className="text-xs text-slate-500 leading-relaxed">
                  All content covers Nigerian tax law, FIRS regulations, NRS compliance, and business accounting practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section id="articles" className="px-6 py-5 border-b border-gray-100 bg-white">
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
        <section className="px-6 pt-12 pb-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-5">Featured Article</p>
            <Link href={`/blog/${featuredArticle.slug}`} className="block group">
              <div className="grid md:grid-cols-2 border border-gray-100 rounded-2xl overflow-hidden hover:border-teal-200 hover:shadow-md transition-all">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-10 min-h-[200px]">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-teal-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                    </div>
                    <p className="text-teal-400 text-xs font-semibold uppercase tracking-widest">{featuredArticle.category}</p>
                  </div>
                </div>
                <div className="p-7 md:p-9 flex flex-col justify-center bg-white">
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full inline-block mb-3 w-fit">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
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
            </Link>
          </div>
        </section>
      )}

      {/* ARTICLES GRID */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {gridArticles.length > 0 && (
            <div className="mb-10">
              {showFeaturedSeparately && (
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5">More Articles</p>
              )}
              <div className="grid md:grid-cols-3 gap-5">
                {gridArticles.map(article => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-teal-200 hover:shadow-sm transition-all"
                  >
                    <div className="bg-slate-50 px-5 py-3.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      {article.readTime && (
                        <span className="text-xs text-slate-400">{article.readTime}</span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-900 mb-2.5 leading-snug group-hover:text-teal-700 transition-colors text-sm">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed flex-1">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-400">{article.date}</span>
                        <span className="text-xs font-semibold text-teal-600 group-hover:text-teal-700 transition-colors">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {gridArticles.length === 0 && comingSoonArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm">No articles in this category yet.</p>
            </div>
          )}

          {comingSoonArticles.length > 0 && (
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5">Coming Soon</p>
              <div className="grid md:grid-cols-3 gap-5">
                {comingSoonArticles.map(article => (
                  <div
                    key={article.title}
                    className="flex flex-col border border-dashed border-slate-200 rounded-xl overflow-hidden opacity-65"
                  >
                    <div className="bg-slate-50 px-5 py-3.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-400 mb-2.5 leading-snug text-sm">{article.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{article.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TOPIC REQUEST */}
      <section className="px-6 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Have a topic you want us to cover?</h3>
              <p className="text-slate-500 text-sm max-w-lg">
                We write practical accounting and tax articles focused on Nigerian business practice. Submit a specific topic and we will write it.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors whitespace-nowrap flex-shrink-0 text-sm"
            >
              Request a Topic
            </Link>
          </div>
        </div>
      </section>

      {/* FREE EXCEL TEMPLATES — all 11 industries */}
      <section id="templates" className="bg-slate-50 px-6 py-16 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">Free Resources</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Free Excel Templates for Nigerian Businesses
              </h2>
              <p className="text-slate-500 text-base max-w-2xl">
                Industry-specific Excel templates built for how Nigerian businesses actually operate.
                Download free, use immediately. New templates published every week.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                {availableTemplates.length} Available Now
              </span>
              <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full">
                {comingSoonTemplates.length} Coming Soon
              </span>
            </div>
          </div>

          {/* Available templates */}
          {availableTemplates.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Available Now</p>
              <div className="grid md:grid-cols-3 gap-5">
                {availableTemplates.map(template => (
                  <div
                    key={template.slug}
                    className={`border rounded-2xl overflow-hidden ${template.accentBg} ${template.accentBorder}`}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 ${template.accentIcon} rounded-xl flex items-center justify-center`}>
                          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={template.iconPath} />
                          </svg>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">Available</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1.5">{template.industry}</h3>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{template.tagline}</p>
                      <div className="space-y-1.5 mb-4">
                        {template.files.slice(0, 3).map(f => (
                          <div key={f.name} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckIcon className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                            {f.name}
                          </div>
                        ))}
                        {template.files.length > 3 && (
                          <p className="text-xs text-slate-400 pl-5">+{template.files.length - 3} more included</p>
                        )}
                      </div>
                      <Link
                        href={`/resources/templates/${template.slug}`}
                        className="block w-full text-center bg-white border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm hover:border-teal-300 hover:text-teal-600 transition-colors"
                      >
                        Download Free →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coming soon templates */}
          {comingSoonTemplates.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Publishing Soon</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {comingSoonTemplates.map(template => (
                  <Link
                    key={template.slug}
                    href={`/resources/templates/${template.slug}`}
                    className={`border rounded-xl p-4 flex items-center gap-3 ${template.accentBg} ${template.accentBorder} opacity-70 hover:opacity-90 transition-opacity`}
                  >
                    <div className={`w-9 h-9 ${template.accentIcon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={template.iconPath} />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-700 text-sm truncate">{template.industry}</p>
                      <p className="text-xs text-slate-400">Coming soon</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Professional services card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 md:p-9">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Need More Than a Template?</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  We Build Custom Excel and Automation Solutions
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">
                  These free templates are solid starting points. But if your business needs something more tailored — custom formulas, automated dashboards, VBA systems that run at the click of a button, or industry-specific reporting built exactly for how you operate — our team builds it.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Advanced premium templates with deeper automation and multi-sheet integration are also available on request.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Custom VBA Desktop Systems', desc: 'Full Excel automation with buttons, macros, forms, and custom workflows', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
                  { title: 'Industry-Specific Dashboards', desc: 'Management dashboards with dynamic charts, KPIs, and automated summaries', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { title: 'Advanced Premium Templates', desc: 'More detailed templates with deeper automation and multi-sheet integration', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <Link
                  href="/contact"
                  className="block text-center bg-teal-600 text-white font-semibold py-3 rounded-xl text-sm hover:bg-teal-700 transition-colors mt-1"
                >
                  Discuss a Custom Solution
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">DigitGlance Invoice</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop managing your business finances manually
          </h2>
          <p className="text-slate-400 mb-9 text-base leading-relaxed">
            DigitGlance Invoice handles your invoices, payments, VAT tracking, and financial reports automatically. Free to start, built for Nigeria.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/app/register" className="bg-teal-600 text-white font-semibold px-9 py-4 rounded-xl hover:bg-teal-700 transition-colors">
              Create Free Account
            </Link>
            <Link href="/products" className="border border-slate-600 text-white font-semibold px-9 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors">
              See the Product
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-2">Digit<span className="text-teal-400">Glance</span></p>
            <p className="text-sm max-w-xs">Accounting intelligence and software solutions for Nigerian businesses and beyond.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-white font-medium mb-3">Services</p>
              <div className="space-y-2">
                <Link href="/services" className="block hover:text-teal-400">Accounting</Link>
                <Link href="/services" className="block hover:text-teal-400">Tax Advisory</Link>
                <Link href="/solutions" className="block hover:text-teal-400">Excel VBA Tools</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-medium mb-3">Company</p>
              <div className="space-y-2">
                <Link href="/about" className="block hover:text-teal-400">About</Link>
                <Link href="/blog" className="block hover:text-teal-400">Blog</Link>
                <Link href="/contact" className="block hover:text-teal-400">Contact</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-8 text-xs flex flex-col md:flex-row justify-between gap-3">
          <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-teal-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-teal-400">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
