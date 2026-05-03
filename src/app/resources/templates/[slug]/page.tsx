import Link from 'next/link'
import { notFound } from 'next/navigation'
import { templates, getTemplate } from '@/lib/templates'
import TemplateList from '@/components/TemplateList'

export async function generateStaticParams() {
  return templates.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) return { title: 'Not Found' }
  return {
    title: template.seoTitle,
    description: template.seoDescription,
  }
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) notFound()

  const availableCount = template.files.filter(f => f.available).length

  return (
    <div className="bg-white min-h-screen">

      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-gray-100">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Link href="/blog" className="hover:text-teal-600">Blog</Link>
          <span>/</span>
          <Link href="/blog#templates" className="hover:text-teal-600">Free Templates</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{template.industry}</span>
        </div>
      </div>

      {/* Page content */}
      <div className="px-6 py-8 max-w-3xl">

        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900">{template.industry} Templates</h1>
            {availableCount > 0 ? (
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                {availableCount} Free Download{availableCount > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                Publishing Soon
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">{template.tagline}</p>
        </div>

        {/* Template accordion list */}
        <TemplateList template={template} />

        {/* How to use */}
        <div className="mt-8 bg-slate-50 border border-slate-100 rounded-xl p-5">
          <h3 className="font-bold text-slate-900 mb-4 text-sm">How to use these templates</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Download the file', desc: 'Click the download button on any available template. The .xlsx file saves instantly — no account needed.' },
              { step: '2', title: 'Open in Excel', desc: 'Open with Microsoft Excel 2016+ or Google Sheets. All formulas are pre-built and fully compatible.' },
              { step: '3', title: 'Customise and use', desc: 'Replace sample data with your business figures. Adjust headings as needed and start immediately.' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-0.5">{item.title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry guide */}
        <div className="mt-8">
          <h2 className="text-base font-bold text-slate-900 mb-3">{template.educationalTitle}</h2>
          <div className="space-y-3">
            {template.educationalParagraphs.slice(0, 3).map((para, i) => (
              <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Product CTA */}
        <div className="mt-8 bg-teal-50 border border-teal-100 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-teal-800 mb-1 text-sm">Ready to move beyond spreadsheets?</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              DigitGlance Invoice automates invoicing, payment tracking, VAT reporting, and supplier management — built for Nigerian businesses.
            </p>
          </div>
          <Link
            href="/products"
            className="bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors whitespace-nowrap flex-shrink-0"
          >
            See DigitGlance →
          </Link>
        </div>

        {/* Custom solution CTA */}
        <div className="mt-4 mb-10 bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 mb-1 text-sm">Need a custom {template.industry.toLowerCase()} Excel solution?</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              We build custom VBA automation, management dashboards, and tailored Excel systems for Nigerian businesses.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  )
}
