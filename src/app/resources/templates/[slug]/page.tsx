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

function Nav({ industry }: { industry: string }) {
  return (
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
          <a href="/blog" className="hover:text-teal-600">Blog</a>
          <a href="/app/login" className="hover:text-teal-600">Sign In</a>
        </div>
        <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
          Book a Consultation
        </a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
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
              <a href="/services" className="block hover:text-teal-400">Accounting</a>
              <a href="/services" className="block hover:text-teal-400">Tax Advisory</a>
              <a href="/solutions" className="block hover:text-teal-400">Excel VBA Tools</a>
            </div>
          </div>
          <div>
            <p className="text-white font-medium mb-3">Resources</p>
            <div className="space-y-2">
              <a href="/blog" className="block hover:text-teal-400">Blog</a>
              <a href="/blog#templates" className="block hover:text-teal-400">Free Templates</a>
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
  )
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = getTemplate(params.slug)
  if (!template) notFound()

  const related = getRelatedTemplates(params.slug)
  const availableFiles = template.files.filter(f => f.available)
  const comingSoonFiles = template.files.filter(f => !f.available)

  return (
    <main className="min-h-screen bg-white">
      <Nav industry={template.industry} />

      {/* BREADCRUMB */}
      <div className="px-6 py-3 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto text-xs text-slate-400 flex items-center gap-2">
          <a href="/blog" className="hover:text-teal-600">Blog</a>
          <span>/</span>
          <a href="/blog#templates" className="hover:text-teal-600">Free Templates</a>
          <span>/</span>
          <span className="text-slate-600 font-medium">{template.industry}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-slate-900 text-white px-6 py-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 right-10 w-80 h-80 rounded-full border border-teal-400" />
          <div className="absolute top-16 right-16 w-56 h-56 rounded-full border border-teal-400" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Free Download
            </span>
            <span className="bg-teal-600/20 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full border border-teal-600/30">
              {template.files.length} Templates Included
            </span>
            {!template.available && (
              <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
                Publishing Soon
              </span>
            )}
          </div>
          <p className="text-teal-400 text-sm font-semibold mb-3 uppercase tracking-widest">
            Free Excel Template Pack
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight max-w-3xl">
            {template.industry} Business Management Templates
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">
            {template.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            {template.available ? (
              <a
                href="#download"
                className="bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors"
              >
                Download Free Templates
              </a>
            ) : (
              <a
                href="/contact"
                className="bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors"
              >
                Notify Me When Available
              </a>
            )}
            <a
              href="#whats-included"
              className="border border-slate-600 text-white font-semibold px-8 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors"
            >
              See What is Included
            </a>
          </div>
          {template.available && (
            <p className="text-slate-500 text-sm mt-4">
              No account required. No email needed. Just download and use immediately.
            </p>
          )}
        </div>
      </section>

      {/* SPREADSHEET PREVIEW */}
      <section className="px-6 py-16 bg-gradient-to-b from-slate-900 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Browser chrome */}
            <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
                {template.previewTitle}
              </div>
              <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">Excel</span>
            </div>
            {/* Spreadsheet mockup */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-max">
                <thead>
                  <tr className="bg-slate-700">
                    <th className="w-8 px-2 py-2.5 text-slate-500 border-r border-slate-600 text-center font-normal">#</th>
                    {template.previewColumns.map((col, i) => (
                      <th
                        key={i}
                        className="px-4 py-2.5 text-left font-semibold text-slate-300 border-r border-slate-600 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {template.previewRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className={ri % 2 === 0 ? 'bg-slate-800' : 'bg-slate-750'}
                    >
                      <td className="px-2 py-2.5 text-slate-500 border-r border-slate-700 text-center">
                        {ri + 1}
                      </td>
                      {row.cells.map((cell, ci) => {
                        const isStatus = ci === row.cells.length - 1 && (
                          cell === 'On Track' || cell === 'Current' || cell === 'Fully Paid' || cell === 'Paid'
                        )
                        const isWarning = ci === row.cells.length - 1 && (
                          cell === 'Over Budget' || cell === 'Owing' || cell === 'Outstanding' || cell === 'Under Target'
                        )
                        const isPartial = ci === row.cells.length - 1 && cell === 'Partial'
                        return (
                          <td
                            key={ci}
                            className="px-4 py-2.5 border-r border-slate-700 whitespace-nowrap"
                          >
                            {isStatus ? (
                              <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-semibold">{cell}</span>
                            ) : isWarning ? (
                              <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-semibold">{cell}</span>
                            ) : isPartial ? (
                              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs font-semibold">{cell}</span>
                            ) : ci === 0 ? (
                              <span className="text-slate-200 font-medium">{cell}</span>
                            ) : (
                              <span className="text-slate-400">{cell}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  {/* Fade row */}
                  <tr className="bg-slate-800 opacity-40">
                    <td className="px-2 py-2.5 text-slate-600 border-r border-slate-700 text-center">4</td>
                    {template.previewColumns.map((_, i) => (
                      <td key={i} className="px-4 py-2.5 border-r border-slate-700">
                        <div className="h-2 bg-slate-700 rounded w-3/4" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-slate-400 text-sm mt-4">
            Sample preview of the {template.previewTitle.split(' — ')[0]}. Actual template includes full functionality.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="whats-included" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Template Pack Contents
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              What is included in this pack
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              {template.files.length} Excel templates designed specifically for {template.industry.toLowerCase()} businesses in Nigeria.
              {!template.available && ' More templates being added. Download available shortly.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {template.files.map((file, i) => (
              <div
                key={file.name}
                className={`border rounded-2xl p-6 transition-all ${
                  file.available
                    ? 'border-gray-100 hover:border-teal-200 hover:shadow-sm'
                    : 'border-dashed border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    file.available ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className={`font-bold ${file.available ? 'text-slate-900' : 'text-slate-400'}`}>
                        {file.name}
                      </h3>
                      {file.available ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${file.available ? 'text-slate-500' : 'text-slate-400'}`}>
                      {file.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 bg-slate-50 rounded-2xl p-8 border border-slate-100">
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

      {/* DOWNLOAD SECTION */}
      <section id="download" className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Free Download
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Download your templates
            </h2>
            <p className="text-slate-500 text-lg">
              {template.available
                ? 'Click the button below to download each template. No registration or payment required.'
                : 'These templates are currently in final preparation and will be available for download very shortly.'}
            </p>
          </div>

          {template.available ? (
            <div className="space-y-3 mb-10">
              {availableFiles.map(file => (
                <div
                  key={file.name}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">.xlsx — Microsoft Excel</p>
                    </div>
                  </div>
                  <a
                    href={`/templates/${params.slug}/${file.filename}`}
                    download
                    className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Free
                  </a>
                </div>
              ))}

              {comingSoonFiles.length > 0 && (
                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-400">
                        {comingSoonFiles.length} more template{comingSoonFiles.length > 1 ? 's' : ''} coming soon
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {comingSoonFiles.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full whitespace-nowrap">
                    Publishing Soon
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-amber-200 rounded-2xl p-8 mb-10 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Publishing Soon</h3>
              <p className="text-slate-500 text-sm mb-6">
                The {template.industry} template pack is currently in final preparation. Contact us to be notified when it is ready, or to request early access.
              </p>
              <a href="/contact" className="inline-block bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-700 transition-colors">
                Request Early Access
              </a>
            </div>
          )}

          {/* How to use */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="font-bold text-slate-900 mb-6">How to use these templates</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Download the file', desc: 'Click the download button above. The .xlsx file will save to your device instantly.' },
                { step: '02', title: 'Open in Excel', desc: 'Open in Microsoft Excel (2016 or later recommended) or Google Sheets. All formulas are compatible.' },
                { step: '03', title: 'Customise for your business', desc: 'Replace the sample data with your own. Add your business name, adjust column headers if needed, and start recording.' },
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
        </div>
      </section>

      {/* EDUCATIONAL CONTENT */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Industry Guide
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            {template.educationalTitle}
          </h2>
          <div className="space-y-5">
            {template.educationalParagraphs.map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-base">
                {para}
              </p>
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
                <a href="/products" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                  See DigitGlance Invoice →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL SERVICES CTA */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3">
                  Need More Than a Template?
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  We Build Custom {template.industry} Excel and Automation Solutions
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  These free templates give you a solid starting point. But if your {template.industry.toLowerCase()} business needs something more tailored — custom formulas built around your specific workflow, automated dashboards, VBA systems that process data at the click of a button, or industry-specific reporting designed exactly for how you operate — our team builds it.
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

      {/* RELATED TEMPLATES */}
      {related.length > 0 && (
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">
              More Free Templates
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Templates for other industries
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(rel => (
                <a
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
                    <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {rel.industry}
                    </h3>
                    {rel.available ? (
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">{rel.tagline}</p>
                  <p className="text-xs text-slate-400">{rel.files.length} templates included</p>
                </a>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href="/blog#templates" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                View all industry templates →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="bg-slate-900 px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">
            DigitGlance Invoice
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            When your business is ready for something more powerful
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            DigitGlance Invoice handles invoices, payments, VAT reports, supplier management, and financial analysis automatically. Free to start.
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

      <Footer />
    </main>
  )
}
