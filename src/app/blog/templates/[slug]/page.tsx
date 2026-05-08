import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import TemplateSidebar from '@/components/TemplateSidebar'
import TemplateList from '@/components/TemplateList'
import { templates, getTemplate, getRelatedTemplates } from '@/lib/templates'

export async function generateStaticParams() {
  return templates.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTemplate(params.slug)
  if (!t) return {}
  return {
    title: t.seoTitle,
    description: t.seoDescription,
  }
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = getTemplate(params.slug)
  if (!template) notFound()

  const related = getRelatedTemplates(params.slug)
  const availableFiles = template.files.filter(f => f.available)

  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className={`${template.accentBg} border-b ${template.accentBorder} px-6 py-12`}>
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-5">
            <Link href="/blog" className="hover:text-teal-600 transition-colors">Blog</Link>
            <span>/</span>
            <Link href="/blog#templates" className="hover:text-teal-600 transition-colors">Templates</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{template.industry}</span>
          </nav>

          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${template.accentIcon}`}>
              <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={template.iconPath} />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Free Excel Templates · {template.industry}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{template.tagline}</h1>
              <p className="text-slate-600 leading-relaxed max-w-2xl">{template.heroDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-5 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span><strong>{template.files.length}</strong> template files</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span><strong>{availableFiles.length}</strong> available now · free download</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Built for Nigerian businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BODY ─── */}
      <div className="max-w-7xl mx-auto flex">
        <TemplateSidebar />

        <div className="flex-1 min-w-0 px-6 py-10">
          <div className="max-w-3xl">

            {/* Template files */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Templates included
              </h2>
              <TemplateList template={template} />
            </div>

            {/* Educational section */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-4">{template.educationalTitle}</h2>
              <div className="space-y-4">
                {template.educationalParagraphs.map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Related templates */}
            {related.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Related template packs</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map(t => (
                    <Link
                      key={t.slug}
                      href={`/blog/templates/${t.slug}`}
                      className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-sm transition-all group"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${t.accentIcon}`}>
                        <svg className="w-4.5 h-4.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={t.iconPath} />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">{t.industry} Templates</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{t.tagline}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-slate-900 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Need a custom Excel system?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                These free templates are a starting point. For fully automated VBA dashboards, custom reports, and industry-specific accounting systems, we build bespoke Excel solutions for Nigerian businesses.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm"
                >
                  Request Custom Template
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 font-semibold px-5 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors text-sm"
                >
                  View Our Services
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
