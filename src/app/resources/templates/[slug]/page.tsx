import Link from 'next/link'
import { notFound } from 'next/navigation'
import { templates, getTemplate, getRelatedTemplates } from '@/lib/templates'

export async function generateStaticParams() {
  return templates.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const template = getTemplate(params.slug)
  if (!template) return { title: 'Not Found' }
  return {
    title: template.seoTitle,
    description: template.seoDescription,
  }
}

const STATUS_POSITIVE = new Set(['On Track', 'Current', 'Fully Paid', 'Paid', 'Active', 'Operational'])
const STATUS_NEGATIVE = new Set(['Over Budget', 'Owing', 'Outstanding', 'Under Target', 'Overdue', 'Due Service'])
const STATUS_PARTIAL = new Set(['Partial', 'At Risk', 'Pending', 'Under Review'])

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = getTemplate(params.slug)
  if (!template) notFound()

  const related = getRelatedTemplates(params.slug)

  return (
    <div className="bg-white">

      {/* BREADCRUMB */}
      <div className="px-6 py-3 border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto text-xs text-slate-400 flex items-center gap-2">
          <Link href="/blog" className="hover:text-teal-600">Blog</Link>
          <span>/</span>
          <Link href="/blog#templates" className="hover:text-teal-600">Free Templates</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{template.industry}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-slate-900 text-white px-6 py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-8 right-10 w-80 h-80 rounded-full border border-teal-400" />
          <div className="absolute top-16 right-16 w-56 h-56 rounded-full border border-teal-400" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {template.available ? (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Free Download</span>
            ) : (
              <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">Publishing Soon</span>
            )}
            <span className="bg-teal-600/20 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full border border-teal-600/30">
              {template.files.length} Templates Included
            </span>
          </div>
          <p className="text-teal-400 text-xs font-bold mb-3 uppercase tracking-widest">Free Excel Template Pack</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-3xl">
            {template.industry} Business Management Templates
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mb-8 leading-relaxed">
            {template.heroDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            {template.available ? (
              <a
                href="#templates"
                className="bg-teal-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm"
              >
                Download Free Templates
              </a>
            ) : (
              <Link
                href="/contact"
                className="bg-teal-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm"
              >
                Notify Me When Available
              </Link>
            )}
            <a
              href="#learn"
              className="border border-slate-600 text-white font-semibold px-7 py-3 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors text-sm"
            >
              Learn More
            </a>
          </div>
          {template.available && (
            <p className="text-slate-500 text-xs mt-4">No account required. No email needed. Just download and use immediately.</p>
          )}
        </div>
      </section>

      {/* TEMPLATE FILE CARDS */}
      <section id="templates" className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">Template Pack</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {template.files.length} Excel templates for {template.industry.toLowerCase()} businesses
            </h2>
            <p className="text-slate-500 text-sm">
              Each template is a standalone Excel file you can download and use immediately. Designed for Nigerian businesses — naira-denominated, no internet connection required.
            </p>
          </div>

          <div className="space-y-8">
            {template.files.map((file, i) => (
              <div
                key={file.name}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  file.available
                    ? 'border-slate-200 hover:border-teal-200 hover:shadow-sm'
                    : 'border-dashed border-slate-200 opacity-70'
                }`}
              >
                {/* Card header */}
                <div className="p-5 bg-white">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        file.available ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className={`font-bold text-base ${file.available ? 'text-slate-900' : 'text-slate-500'}`}>
                            {file.name}
                          </h3>
                          {file.available ? (
                            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Available</span>
                          ) : (
                            <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Coming Soon</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{file.description}</p>
                      </div>
                    </div>
                    {file.available && file.filename ? (
                      <a
                        href={`/templates/${params.slug}/${file.filename}`}
                        download
                        className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm whitespace-nowrap flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Free
                      </a>
                    ) : !file.available ? (
                      <span className="text-xs font-bold bg-slate-100 text-slate-400 px-4 py-2.5 rounded-xl whitespace-nowrap flex-shrink-0">
                        Publishing Soon
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Spreadsheet preview */}
                <div className="bg-slate-900 border-t border-slate-700">
                  {/* Browser chrome bar */}
                  <div className="bg-slate-950 px-4 py-2.5 flex items-center gap-2 border-b border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <div className="flex-1 mx-3 bg-slate-800 rounded px-3 py-0.5 text-xs text-slate-500 font-mono truncate">
                      {file.name}.xlsx
                    </div>
                    <span className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded font-mono">.xlsx</span>
                  </div>
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs min-w-max">
                      <thead>
                        <tr className="bg-slate-800/80 border-b border-slate-700">
                          <th className="w-8 px-3 py-2.5 text-slate-600 border-r border-slate-700 text-center font-normal">#</th>
                          {file.previewColumns.map((col, ci) => (
                            <th
                              key={ci}
                              className="px-4 py-2.5 text-left font-semibold text-slate-300 border-r border-slate-700 whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {file.previewRows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/40'}>
                            <td className="px-3 py-2.5 text-slate-600 border-r border-slate-800 text-center">{ri + 1}</td>
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-4 py-2.5 border-r border-slate-800 whitespace-nowrap">
                                {STATUS_POSITIVE.has(cell) ? (
                                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-semibold">{cell}</span>
                                ) : STATUS_NEGATIVE.has(cell) ? (
                                  <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-semibold">{cell}</span>
                                ) : STATUS_PARTIAL.has(cell) ? (
                                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs font-semibold">{cell}</span>
                                ) : ci === 0 ? (
                                  <span className="text-slate-200 font-medium">{cell}</span>
                                ) : (
                                  <span className="text-slate-400">{cell}</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                        {/* Fade row */}
                        <tr className="opacity-30">
                          <td className="px-3 py-2.5 text-slate-600 border-r border-slate-800 text-center">
                            {file.previewRows.length + 1}
                          </td>
                          {file.previewColumns.map((_, ci) => (
                            <td key={ci} className="px-4 py-2.5 border-r border-slate-800">
                              <div className="h-2 bg-slate-700 rounded w-3/4" />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Features + Use Case */}
                <div className="p-5 grid md:grid-cols-2 gap-5 bg-white border-t border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features</p>
                    <ul className="space-y-2">
                      {file.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-slate-600">
                          <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">Real Business Use Case</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{file.useCase}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-6 bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 mb-1">{template.files.length}</p>
              <p className="text-slate-500 text-sm">Templates included</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 mb-1">Free</p>
              <p className="text-slate-500 text-sm">No cost, no account</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 mb-1">Excel</p>
              <p className="text-slate-500 text-sm">Works in all versions</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="px-6 py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-bold text-slate-900 mb-6">How to use these templates</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Download the file', desc: 'Click the download button on the template above. The .xlsx file saves to your device instantly — no account or email needed.' },
              { step: '02', title: 'Open in Excel', desc: 'Open in Microsoft Excel 2016 or later, or Google Sheets. All formulas are pre-built and fully compatible.' },
              { step: '03', title: 'Customise for your business', desc: 'Replace the sample data with your own. Add your business name, adjust column headers if needed, and start recording immediately.' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL CONTENT */}
      <section id="learn" className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">Industry Guide</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">{template.educationalTitle}</h2>
          <div className="space-y-5">
            {template.educationalParagraphs.map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-base">{para}</p>
            ))}
          </div>

          {/* Mid-content product CTA */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 my-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-teal-800 mb-1">Ready to move beyond spreadsheets?</p>
                <p className="text-slate-600 text-sm mb-3">
                  DigitGlance Invoice automates your invoicing, tracks payments, manages suppliers, and handles VAT reporting — all built for Nigerian businesses.
                </p>
                <Link href="/products" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                  See DigitGlance Invoice →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL SERVICES CTA */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">Need More Than a Template?</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  We Build Custom {template.industry} Excel and Automation Solutions
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  These free templates give you a solid starting point. But if your {template.industry.toLowerCase()} business needs something more tailored — custom formulas, automated dashboards, VBA systems that run at the click of a button, or industry-specific reporting built exactly for how you operate — our team builds it.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We also offer advanced premium templates with deeper automation, detailed financial analysis, and multi-sheet integration. Available on request.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: 'Custom VBA Automation',
                    desc: 'Buttons, macros, and automated workflows built directly into Excel for your specific business process',
                    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                  },
                  {
                    title: 'Industry-Specific Dashboards',
                    desc: `Management dashboards for ${template.industry.toLowerCase()} businesses with charts, KPIs, and automated monthly summaries`,
                    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                  },
                  {
                    title: 'Advanced Premium Templates',
                    desc: 'More detailed versions of these templates with deeper formulas and multi-sheet integration on request',
                    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  className="block text-center bg-teal-600 text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-teal-700 transition-colors mt-2"
                >
                  Discuss a Custom Solution
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED TEMPLATES */}
      {related.length > 0 && (
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">More Free Templates</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Templates for other industries</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(rel => (
                <Link
                  key={rel.slug}
                  href={`/resources/templates/${rel.slug}`}
                  className={`group border rounded-2xl p-6 transition-all hover:shadow-sm ${rel.accentBg} ${rel.accentBorder} hover:border-teal-300`}
                >
                  <div className={`w-10 h-10 ${rel.accentIcon} rounded-xl flex items-center justify-center mb-4`}>
                    <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={rel.iconPath} />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{rel.industry}</h3>
                    {rel.available ? (
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Available</span>
                    ) : (
                      <span className="text-xs font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">{rel.tagline}</p>
                  <p className="text-xs text-slate-400">{rel.files.length} templates included</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog#templates" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                View all industry templates →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="bg-slate-900 px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">DigitGlance Invoice</p>
          <h2 className="text-3xl font-bold text-white mb-4">When your business is ready for something more powerful</h2>
          <p className="text-slate-400 mb-10 text-base leading-relaxed">
            DigitGlance Invoice handles invoices, payments, VAT reports, supplier management, and financial analysis automatically. Free to start.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/app/register"
              className="bg-teal-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/products"
              className="border border-slate-600 text-white font-semibold px-10 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors"
            >
              See the Product
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
