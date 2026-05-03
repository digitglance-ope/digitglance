DigitGlance Invoice System - Updated Project Brief (May 2026)
1. Product Overview
Product Name: DigitGlance Invoice
Brand: Digitglance Reliance (CAC registered)
Type: Multi-tenant SaaS web application
Target Users: Small and medium businesses in Nigeria
Live URL: https://digitglance.com
Repository: https://github.com/digitglance-ope/digitglance
Purpose: Replace spreadsheets and WhatsApp invoicing with a complete invoice and financial management system built for Nigerian businesses including naira support, VAT at 7.5%, and NRS compliance.

2. Technology Stack
Frontend:     Next.js 14 (App Router) + TypeScript + Tailwind CSS
Backend:      Next.js API Routes (serverless on Vercel)
Database:     Supabase PostgreSQL - project: digitglance-invoice
Auth:         Supabase Auth with Resend as custom SMTP
Email:        Resend - sender: hello@digitglance.com
Payments:     Paystack inline checkout
Hosting:      Vercel Hobby plan
Repo:         GitHub - digitglance-ope/digitglance
Domain:       digitglance.com on Namecheap
Environment Variables (all set in .env.local and Vercel):
NEXT_PUBLIC_SUPABASE_URL=https://apkbhpywfyoyfqebnnvj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_-TeTyzNg8CE2XCQOGbiFaQ_GBhpDKq9
NEXT_PUBLIC_INVOICE_SUPABASE_URL=https://apkbhpywfyoyfqebnnvj.supabase.co
NEXT_PUBLIC_INVOICE_SUPABASE_ANON_KEY=sb_publishable_-TeTyzNg8CE2XCQOGbiFaQ_GBhpDKq9
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_73bdb5e487a2261f9f1c411ec9dceb8c2dbfdfca
RESEND_API_KEY=re_736eAudx_9qoXFtuKTkukNQDkGL5MJLBV
SUPABASE_SERVICE_ROLE_KEY=[secret in Vercel only]
NEXT_PUBLIC_APP_URL=https://digitglance.com

3. Database Tables
sqlprofiles              - id, full_name, business_name, plan, onboarding_complete,
                        is_team_member, account_owner_id
account_users         - invited team members with account_owner_id, role, status
invoices              - sales invoices with customer_id, VAT, status, amounts
invoice_items         - line items linked to invoices and inventory
payments              - payment records against invoices
customers             - customer records per account owner
suppliers             - supplier records per account owner
supplier_invoices     - purchase invoices from suppliers
supplier_invoice_items - line items for purchase invoices linked to inventory
supplier_payments     - payments made to suppliers
inventory             - name, unit_price, cost_price, stock_quantity, unit
audit_logs            - all user actions with timestamp
Critical DB trigger (must exist in Supabase):
sqlcreate or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, onboarding_complete, plan, is_team_member)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    false,
    'free',
    case when new.raw_user_meta_data->>'is_team_member' = 'true' then true else false end
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
Additional columns added to profiles:
sqlalter table profiles add column if not exists is_team_member boolean default false;
alter table profiles add column if not exists account_owner_id uuid references auth.users(id) on delete set null;
Additional column added to inventory:
sqlalter table inventory add column if not exists cost_price numeric default 0;

4. Complete File Structure
src/
  app/
    page.tsx                              Home page
    products/page.tsx                     Full marketing page with app mockups
    blog/page.tsx                         Blog listing with 5 live articles
    blog/how-to-calculate-vat-in-nigeria/page.tsx
    blog/invoice-vs-receipt-nigeria/page.tsx
    blog/how-to-manage-accounts-receivable-nigeria/page.tsx
    blog/income-tax-vs-company-income-tax-nigeria/page.tsx
    blog/why-nigerian-smes-need-bookkeeping/page.tsx
    learn/page.tsx                        Learn page (AI assist not yet built)
    contact/page.tsx
    about/page.tsx
    services/page.tsx
    solutions/page.tsx
    privacy/page.tsx
    terms/page.tsx
    app/
      layout.tsx                          Loads Paystack script
      dashboard/page.tsx                  Live stats dashboard
      invoices/page.tsx                   Invoice list
      invoices/new/page.tsx               Create invoice with inventory selector
      invoices/[id]/page.tsx              Invoice detail, email, payment recording
      customers/page.tsx                  Customers with statement modal
      suppliers/page.tsx                  Suppliers with purchase invoices and statement
      inventory/page.tsx                  Inventory with cost price and stock value
      reports/page.tsx                    6-tab reports with CSV export
      settings/page.tsx                   Business settings
      users/page.tsx                      Team management with server-side invite
      audit/page.tsx                      Audit log
      subscription/page.tsx               Plans with dynamic user pricing counter
      login/page.tsx                      Login with password visibility toggle
      register/page.tsx                   Registration (profile via DB trigger)
      forgot-password/page.tsx            Password reset request
      reset-password/page.tsx             Set new password
      accept-invite/page.tsx              Team member password setup + welcome email
      onboarding/page.tsx                 Business setup for new account owners
  api/
    send-email/route.ts                   Handles: invoice, payment_confirmation,
                                          invitation, account_ready
    invite-user/route.ts                  Server-side invite via service role key
  lib/
    supabase/client.ts
    supabase/server.ts
    resend.ts                             Lazy initialisation with getResend()
  middleware.ts                           Auth guard, onboarding redirect,
                                          team member bypass

5. Completed Features
Authentication

Registration with email confirmation via Resend SMTP
Profile created automatically via DB trigger (bypasses RLS)
Login with password visibility toggle
Forgot password with hardcoded redirect to https://digitglance.com/app/reset-password
Reset password page with proper session detection
Accept invite page at /app/accept-invite for team members
Team members skip onboarding (is_team_member flag checked in middleware)

Invoices

Create invoices with line items, per-item VAT toggle, inventory selector
Auto invoice numbering, PDF download, email to customer
Record full and partial payments
Payment confirmation email via Resend
Status: paid, partial, outstanding
Quick add customer from invoice creation page
Plan enforcement: Free=20, Starter=100, Pro=unlimited

Customers

Full CRUD with customer statement modal
Statement shows all invoices, payments, totals, and balance

Suppliers

Full CRUD with purchase invoice creation
Auto inventory stock update on purchase save
Supplier payment recording and history
Supplier statement modal

Inventory

CRUD with cost price and selling price
Stock tracking (auto-decrease on sale, auto-increase on purchase)
Stock value column and total stock value on page header

Reports (6 tabs)

Invoice Summary with date/status filter, CSV export
Output VAT report, CSV export
VAT Liability: Output minus Input equals NRS payable, CSV export
Accounts Receivable with overdue flagging, CSV export
Accounts Payable by supplier
Inventory Valuation with opening, purchases, sales, closing, value, CSV export

Users and Team

Server-side invite API at /api/invite-user using SUPABASE_SERVICE_ROLE_KEY
Roles: Admin, Manager, Staff, Viewer
Role change, suspend, activate, remove
Business name shown in invite modal and passed to invite metadata
Welcome email sent after team member sets password on accept-invite page
Audit log for all actions

Subscription

Free, Starter (₦5,000), Pro (₦12,000) plans
Dynamic user counter with live price update (₦2,000 per extra user)
Paystack inline checkout with extra user count in metadata
Plan stored in profiles, audit logged on upgrade

Email System

Resend SMTP connected to Supabase auth
Custom /api/send-email handles 4 email types
All emails from hello@digitglance.com
Domain verified, SPF + DKIM + DMARC configured in Namecheap
Professional HTML templates for: confirm signup, invite user, reset password

Marketing Website

Products page with full marketing content and 3 app mockups
Blog with 5 live articles on Nigerian accounting and tax topics
Privacy policy, terms of service pages


6. Supabase Configuration
Custom SMTP:     smtp.resend.com, port 465, username: resend
                 password: RESEND_API_KEY, sender: hello@digitglance.com
Confirm Email:   Enabled
Redirect URLs:   https://digitglance.com/app/dashboard
                 https://digitglance.com/app/reset-password
                 https://digitglance.com/app/accept-invite
Email Templates: Confirm signup, Invite user, Reset password
                 All replaced with professional branded HTML

7. Multi-Tenant Architecture
Account Owner:  Registers, completes onboarding, owns all data
                All tables have user_id = auth.uid() enforced by RLS

Team Members:   Invited via /api/invite-user (service role key)
                Supabase sends email to /app/accept-invite
                User sets password, profile created with is_team_member=true
                Middleware skips onboarding for is_team_member=true
                Team member sees owner's data via account_users linkage

Middleware logic:
  - Public routes: login, register, forgot-password, reset-password, accept-invite
  - Authenticated + not team member + onboarding_complete=false → /app/onboarding
  - Team member landing on onboarding → redirect to /app/dashboard

8. Subscription and Pricing
Free:     ₦0, 20 invoices/month, 1 user, basic features
Starter:  ₦5,000/month (was ₦7,500), 100 invoices, inventory,
          VAT reports, user control, 1 user included,
          +₦2,000 per extra user
Pro:      ₦12,000/month (was ₦18,000), unlimited invoices,
          unlimited inventory, supplier management,
          accounts payable/receivable, 2 users included,
          +₦2,000 per extra user, priority support

Extra user pricing calculated dynamically on subscription page.
Paystack charge = plan price + (extra_users × 2000)

9. Remaining Tasks (Priority Order)
High Priority

DigitGlance Assist AI on Learn page using Anthropic Claude API
Google Analytics integration (add to layout.tsx)
Feature gating enforcement by plan:

Supplier module: Starter plan and above only
Inventory valuation report: Pro plan only


Paystack webhook for server-side payment verification (pending compliance)

Medium Priority

Mobile responsive fixes across all app pages
Sidebar refactored into shared component
Invoice edit functionality (currently create-only)
Role-based UI enforcement (restrict UI by role, not just stored role)
WhatsApp invoice sharing via wa.me link

Lower Priority

Password change from settings page
Business profile update from settings
Upgrade/downgrade subscription logic
Zero-rated and exempt VAT transaction support
Bulk invoice operations


10. Known Issues
IssueStatusInvite token expiryFix: upgrade Supabase to Pro planPaystack in test modeFix: complete Paystack complianceRole-based UI not enforcedRoles stored but UI not restricted yetInvoice edit not builtCreate only, no edit page existsSidebar duplicated across pagesNot yet a shared component

11. Deployment Workflow
Local:   npm run dev → localhost:3000
Push:    git add . && git commit -m "message" && git push
Deploy:  Vercel auto-deploys from GitHub main branch in ~2 minutes
Live:    https://digitglance.com

12. Testing Checklist
[ ] Register new user → confirm email → complete onboarding → dashboard
[ ] Forgot password → email received → click link → /app/reset-password → set password → login
[ ] Invite team member → email received → click link → /app/accept-invite →
    set password → welcome email received → dashboard (no onboarding)
[ ] Create invoice → add line items → save → send email → record payment
[ ] VAT Liability report shows correct Output minus Input
[ ] Inventory Valuation shows correct closing stock and value
[ ] Subscription upgrade via Paystack charges correct total with extra users
[ ] Free plan enforces 20 invoice limit