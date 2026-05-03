# Prompt for Claude Code

Paste the following into your Claude Code session in VSCode after running `claude` from inside the unzipped `design_handoff_digitglance_pos/` folder.

---

You are joining the Digitglance project as the lead engineer.

I have placed a complete design handoff in this folder. Please:

1. Read `README.md` end-to-end. It defines the product, architecture rules, screen map, design tokens, data model, keyboard shortcuts, and recommended stack.
2. Open `preview/index.html` in a browser (or read the JSX files in `preview/`) so you understand the intended UI behaviour. These are design references, NOT production code — re-implement them in our chosen stack.
3. Confirm the architectural rule: this is **module #2** of the shared Digitglance SaaS platform at `app.digitglance.com/pos`. It must reuse shared auth, tenant isolation, RBAC, billing, audit log, notifications, reporting, and the chart of accounts. Never build a separate login or tenant store.
4. Propose the initial repo layout and stack (default to the README's recommended stack: Next.js 14 + TypeScript + Tailwind + shadcn/ui + tRPC + Prisma + PostgreSQL with RLS, Clerk for shared SSO, Paystack for payments). Wait for my approval before scaffolding.
5. Once approved, follow the build order in §12 of the README: tenant/auth plumbing → settings → catalogue → inventory → POS terminal → customers/vendors → VAT → reports → onboarding → mobile.
6. For each phase, propose the schema migration, the API surface, and the React routes/components — and stop for review before generating code.
7. Match the design tokens in §7 exactly (teal #0E8383 primary, lime #37D200 reserved for success/money-positive, IBM Plex Sans + Mono, 6/8/12 radius scale, hairline borders).
8. Treat the POS terminal screen (§5.2) as the hero. Implement the F2/F8/F9/F10 keyboard map and barcode wedge handling as first-class features.
9. Before any commit, list every shared-platform service the change touches and confirm none are duplicated.

When ready, ask me three questions:
(a) which existing parts of the Digitglance shared platform are already built (so you don't reinvent them),
(b) the FIRS e-invoicing integration spec to target,
(c) the receipt printer hardware model.

Then begin Phase 1.
