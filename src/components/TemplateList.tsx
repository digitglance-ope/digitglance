'use client'

import { useState } from 'react'
import type { TemplateData } from '@/lib/templates'

export default function TemplateList({ template }: { template: TemplateData }) {
  const [expanded, setExpanded] = useState<string | null>(template.files[0]?.name ?? null)

  return (
    <div className="space-y-2">
      {template.files.map((file, i) => {
        const isOpen = expanded === file.name
        const canDownload = file.available && !!file.filename

        return (
          <div
            key={file.name}
            className={`border rounded-xl overflow-hidden transition-shadow ${
              isOpen ? 'border-teal-200 shadow-sm' : 'border-slate-200'
            } ${!file.available ? 'opacity-60' : ''}`}
          >
            {/* Header row — click to expand */}
            <div
              className={`flex items-center gap-3 p-4 cursor-pointer select-none ${
                isOpen ? 'bg-teal-50/50' : 'bg-white hover:bg-slate-50'
              }`}
              onClick={() => setExpanded(isOpen ? null : file.name)}
            >
              {/* Number badge */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                canDownload
                  ? isOpen ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-700'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {i + 1}
              </div>

              {/* Name + description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{file.name}</p>
                  {!file.available && (
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{file.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {canDownload && (
                  <a
                    href={`/templates/${template.slug}/${file.filename}`}
                    download
                    onClick={e => e.stopPropagation()}
                    title={`Download ${file.name}`}
                    className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                )}
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Expanded panel */}
            {isOpen && (
              <div className="border-t border-slate-100 p-4 bg-white">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Features */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Key Features</p>
                    <ul className="space-y-1.5">
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
                  {/* Use case */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Real Use Case</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{file.useCase}</p>
                  </div>
                </div>

                {/* Download action */}
                {canDownload ? (
                  <a
                    href={`/templates/${template.slug}/${file.filename}`}
                    download
                    className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download {file.name}
                  </a>
                ) : (
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    This template is being prepared and will be available shortly.
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
