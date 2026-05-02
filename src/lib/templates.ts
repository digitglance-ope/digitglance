export interface TemplateFile {
  name: string
  description: string
  filename: string | null
  available: boolean
}

export interface PreviewRow {
  cells: string[]
}

export interface TemplateData {
  slug: string
  industry: string
  tagline: string
  heroDescription: string
  seoTitle: string
  seoDescription: string
  files: TemplateFile[]
  previewTitle: string
  previewColumns: string[]
  previewRows: PreviewRow[]
  educationalTitle: string
  educationalParagraphs: string[]
  available: boolean
  accentBg: string
  accentBorder: string
  accentIcon: string
  iconPath: string
  relatedSlugs: string[]
}

export const templates: TemplateData[] = [
  {
    slug: 'construction',
    industry: 'Construction',
    tagline: 'Track every project, material, and naira from start to finish',
    heroDescription:
      'Free Excel templates for Nigerian construction businesses. Track project costs against budgets, log material usage, manage labour costs, handle contract billing, and maintain equipment records — all in one organised pack.',
    seoTitle: 'Free Construction Business Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian construction businesses. Includes Project Cost Tracker, Material Usage Log, Labour Cost Sheet, Contract Billing Tracker, and Equipment Maintenance Log.',
    available: true,
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentIcon: 'bg-amber-100',
    iconPath:
      'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    files: [
      {
        name: 'Project Cost Tracker',
        description:
          'Track budget vs actual spend per project with variance analysis. Ideal for monitoring multiple active sites simultaneously.',
        filename: '01-project-cost-tracker.xlsx',
        available: true,
      },
      {
        name: 'Material Usage Log',
        description:
          'Record every material delivered and used on site. Track quantities, unit costs, total spend, and remaining stock per project.',
        filename: '02-material-usage-log.xlsx',
        available: true,
      },
      {
        name: 'Labour Cost Sheet',
        description:
          'Calculate daily and weekly labour costs per worker. Track hours worked, daily rates, overtime, and total payroll per project.',
        filename: null,
        available: false,
      },
      {
        name: 'Contract Billing Tracker',
        description:
          'Manage progress billing against contracts. Track amounts billed, amounts received, retention held, and outstanding balances.',
        filename: null,
        available: false,
      },
      {
        name: 'Equipment Maintenance Log',
        description:
          'Schedule and record maintenance for all equipment. Track service dates, costs, next service due, and equipment status.',
        filename: null,
        available: false,
      },
    ],
    previewTitle: 'Project Cost Tracker — Preview',
    previewColumns: ['Project Name', 'Budget (₦)', 'Spent to Date (₦)', 'Variance (₦)', '% Complete', 'Status'],
    previewRows: [
      { cells: ['Victoria Island Office Block', '15,000,000', '8,250,000', '6,750,000', '55%', 'On Track'] },
      { cells: ['Lekki Phase 1 Bungalow', '4,800,000', '5,100,000', '-300,000', '90%', 'Over Budget'] },
      { cells: ['Ikeja Warehouse Extension', '9,200,000', '1,840,000', '7,360,000', '20%', 'On Track'] },
    ],
    educationalTitle: 'Why Construction Businesses in Nigeria Lose Money Without Proper Cost Tracking',
    educationalParagraphs: [
      'Construction is one of the most financially complex industries in Nigeria. Projects run for months, involve dozens of suppliers and subcontractors, and carry costs that can shift dramatically due to material price changes, labour disputes, and site delays. Without a structured cost tracking system, most Nigerian construction businesses only discover they have lost money after the project is complete.',
      'The most common financial problem in Nigerian construction is budget overrun caused by untracked material purchases. When site supervisors buy materials without recording quantities and costs against a specific project, there is no way to know whether you are within budget until the final reconciliation — which often reveals losses of 20 to 40 percent of expected profit.',
      'Labour cost management is equally critical. Daily labour payments in cash are common on Nigerian construction sites, but these payments are rarely reconciled against the project budget in real time. A site that runs three weeks longer than planned due to scope changes can wipe out the entire profit margin if those additional labour days were not captured and billed to the client.',
      'Contract billing is another area where construction businesses leave money on the table. Progress billing tied to project milestones is standard practice, but many small contractors fail to raise invoices promptly at each milestone, allowing clients to delay payment indefinitely. A proper contract billing tracker ensures you know exactly what you are entitled to bill at every stage of every project.',
      'The templates in this pack address each of these problem areas directly. They are designed to work without any accounting software and can be maintained by a site supervisor or project manager, not just an accountant. Used consistently, they give you a clear financial picture of every active project so you can make real-time decisions before problems become losses.',
    ],
    relatedSlugs: ['school', 'trading', 'manufacturing'],
  },

  {
    slug: 'school',
    industry: 'School and Education',
    tagline: 'Manage fees, payroll, and school finances clearly and accurately',
    heroDescription:
      'Free Excel templates for Nigerian schools and educational institutions. Track student fee payments by term, manage staff payroll, record school expenses, monitor attendance, and plan annual budgets in one structured pack.',
    seoTitle: 'Free School Management Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian schools. Includes Student Fee Tracker, Staff Payroll Sheet, School Expense Tracker, Attendance Register, and Budget Planning Sheet.',
    available: true,
    accentBg: 'bg-blue-50',
    accentBorder: 'border-blue-200',
    accentIcon: 'bg-blue-100',
    iconPath:
      'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    files: [
      {
        name: 'Student Fee Tracker',
        description:
          'Track fee payments by student, class, and term. See who has paid, who is owing, and total collections at a glance.',
        filename: '01-student-fee-tracker.xlsx',
        available: true,
      },
      {
        name: 'Staff Payroll Sheet',
        description:
          'Compute monthly payroll for all teaching and non-teaching staff. Includes PAYE deductions, pension, and net pay.',
        filename: '02-staff-payroll-sheet.xlsx',
        available: true,
      },
      {
        name: 'School Expense Tracker',
        description:
          'Record and categorise all school expenditure by month. Track utilities, supplies, maintenance, and other operating costs.',
        filename: null,
        available: false,
      },
      {
        name: 'Attendance Register',
        description:
          'Daily attendance tracking by class and term with summary statistics for each student and class.',
        filename: null,
        available: false,
      },
      {
        name: 'Budget Planning Sheet',
        description:
          'Plan the annual school budget by income and expense category. Compare planned figures against actual performance each term.',
        filename: null,
        available: false,
      },
    ],
    previewTitle: 'Student Fee Tracker — Preview',
    previewColumns: ['Student Name', 'Class', 'Term 1 (₦)', 'Term 2 (₦)', 'Term 3 (₦)', 'Balance (₦)', 'Status'],
    previewRows: [
      { cells: ['Adebayo Tunde Emmanuel', 'JSS 1A', '85,000', '85,000', '—', '85,000', 'Outstanding'] },
      { cells: ['Chioma Nwachukwu', 'SS 2B', '95,000', '95,000', '95,000', '0', 'Fully Paid'] },
      { cells: ['Ibrahim Musa Aliyu', 'JSS 3C', '85,000', '42,500', '—', '127,500', 'Partial'] },
    ],
    educationalTitle: 'How Nigerian Schools Can Eliminate Fee Collection Chaos With Proper Financial Records',
    educationalParagraphs: [
      'Fee management is one of the most operationally stressful aspects of running a school in Nigeria. With hundreds of students paying across three terms, at different dates, in different amounts, and sometimes in instalments, the margin for error is enormous. Most Nigerian schools track fee payments in notebooks, WhatsApp messages, or basic spreadsheets that were never designed for this purpose — and the result is constant disputes, missed collections, and year-end shortfalls.',
      'The fundamental problem is the absence of a systematic per-student, per-term fee record. When a parent claims they paid Term 2 fees in cash and no formal receipt was issued with a corresponding ledger entry, it is impossible to verify. A proper student fee tracker creates a permanent record of every payment, including the date, amount, method, and the person who received it.',
      'Payroll management is equally important for school sustainability. Staff costs typically represent 60 to 80 percent of a Nigerian school\'s total expenses, yet many school owners have no accurate, month-by-month record of what they actually spent on payroll. Without this, it is impossible to prepare a meaningful budget or understand why the school seems profitable on paper but is always short of cash.',
      'The PAYE obligation is another area where schools regularly face penalties. Any school with employees earning above the taxable threshold is required to deduct PAYE monthly and remit it to the relevant state internal revenue service. A payroll sheet that automatically computes PAYE based on the current tax bands helps school administrators meet this obligation without the need for an accountant on every payroll run.',
      'Budget planning is the discipline that separates schools that grow from schools that survive term to term. When you can see that Term 1 fee collections typically fund 45 percent of annual expenses, you can plan hiring, expansion, and capital expenditure with confidence. The budget planning sheet in this pack gives school administrators the structure to do this planning properly, even without formal accounting training.',
    ],
    relatedSlugs: ['construction', 'trading', 'hospital'],
  },

  {
    slug: 'trading',
    industry: 'Trading and Retail',
    tagline: 'Know your stock, your sales, your profit, and your cash — every day',
    heroDescription:
      'Free Excel templates for Nigerian trading and retail businesses. Track daily sales and inventory, maintain a cashbook, manage customer balances, track supplier payables, and analyse product profitability.',
    seoTitle: 'Free Trading Business Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian trading and retail businesses. Includes Sales and Inventory Tracker, Daily Cashbook, Customer Ledger, Supplier Payables Tracker, and Profit Analysis Sheet.',
    available: false,
    accentBg: 'bg-green-50',
    accentBorder: 'border-green-200',
    accentIcon: 'bg-green-100',
    iconPath:
      'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    files: [
      { name: 'Sales and Inventory Tracker', description: 'Track daily sales by product, update stock quantities automatically, and flag items running low.', filename: null, available: false },
      { name: 'Daily Cashbook', description: 'Record all daily cash inflows and outflows. Reconcile daily closing balance against physical cash count.', filename: null, available: false },
      { name: 'Customer Ledger', description: 'Track credit sales per customer. See current balance owed, payment history, and credit limit usage.', filename: null, available: false },
      { name: 'Supplier Payables Tracker', description: 'Monitor what you owe each supplier, due dates, and payment history to manage cash flow.', filename: null, available: false },
      { name: 'Profit Analysis Sheet', description: 'Calculate gross profit and net margin by product category and by month for business decisions.', filename: null, available: false },
    ],
    previewTitle: 'Sales and Inventory Tracker — Preview',
    previewColumns: ['Product', 'Opening Stock', 'Purchased', 'Sold', 'Closing Stock', 'Unit Cost (₦)', 'Stock Value (₦)'],
    previewRows: [
      { cells: ['Indomie Noodles (Carton)', '120', '200', '195', '125', '3,200', '400,000'] },
      { cells: ['Golden Morn (6kg)', '45', '60', '72', '33', '5,400', '178,200'] },
      { cells: ['Peak Milk (48-pack)', '30', '40', '38', '32', '8,500', '272,000'] },
    ],
    educationalTitle: 'The Financial Records Every Nigerian Trading Business Must Keep',
    educationalParagraphs: [
      'Trading businesses in Nigeria operate in one of the most competitive and fast-moving commercial environments in Africa. Margins are often thin, credit terms are standard, and cash flow can turn negative overnight when a large customer delays payment or a supplier demands upfront payment. The businesses that survive and grow are the ones that know their numbers — not just roughly, but precisely.',
      'Stock management is where most Nigerian traders lose money invisibly. Without a systematic sales and inventory tracker, shrinkage, spoilage, and petty theft accumulate over weeks and months without detection. By the time year-end stock count reveals a shortfall, the cause is impossible to trace. A daily or weekly stock reconciliation against recorded sales takes less than fifteen minutes and eliminates this silent profit drain.',
      'Credit management is equally critical. It is standard practice in Nigerian wholesale and retail trade to sell on credit to established customers. But when customer balances are tracked informally, collections become inconsistent and some debts quietly become uncollectable. A customer ledger that shows every transaction and the current balance owed turns collection into a systematic process rather than an uncomfortable conversation.',
      'The daily cashbook is the most fundamental financial record for any trading business. It does not need to be complicated — date, description, amount in, amount out, and running balance is sufficient. The discipline of reconciling the cashbook daily against physical cash on hand creates the accountability that prevents small discrepancies from growing into significant losses.',
    ],
    relatedSlugs: ['manufacturing', 'construction', 'rental'],
  },

  {
    slug: 'manufacturing',
    industry: 'Manufacturing',
    tagline: 'Track production costs, raw materials, and finished goods accurately',
    heroDescription:
      'Free Excel templates for Nigerian manufacturing businesses. Monitor production costs against budgets, track raw material inventory, manage work-in-progress, record finished goods, and calculate cost of goods sold.',
    seoTitle: 'Free Manufacturing Business Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian manufacturers. Includes Production Cost Sheet, Raw Material Inventory, WIP Tracker, Finished Goods Inventory, and COGS Calculator.',
    available: false,
    accentBg: 'bg-slate-100',
    accentBorder: 'border-slate-200',
    accentIcon: 'bg-slate-200',
    iconPath:
      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    files: [
      { name: 'Production Cost Sheet', description: 'Record all direct and indirect costs per production run. Compare actual costs against standard costs.', filename: null, available: false },
      { name: 'Raw Material Inventory', description: 'Track all raw material purchases, usage in production, and closing stock by material type.', filename: null, available: false },
      { name: 'WIP Tracker', description: 'Monitor the value of work-in-progress at any point in the production cycle.', filename: null, available: false },
      { name: 'Finished Goods Inventory', description: 'Track completed production output, goods dispatched to customers, and closing finished goods stock.', filename: null, available: false },
      { name: 'COGS Calculator', description: 'Calculate cost of goods sold accurately using opening stock, purchases, and closing stock figures.', filename: null, available: false },
    ],
    previewTitle: 'Production Cost Sheet — Preview',
    previewColumns: ['Production Run', 'Units Produced', 'Direct Materials (₦)', 'Direct Labour (₦)', 'Overhead (₦)', 'Total Cost (₦)', 'Cost per Unit (₦)'],
    previewRows: [
      { cells: ['Batch 001 — Jan 6', '500', '185,000', '62,000', '38,000', '285,000', '570'] },
      { cells: ['Batch 002 — Jan 13', '480', '177,600', '62,000', '38,000', '277,600', '578'] },
      { cells: ['Batch 003 — Jan 20', '520', '192,400', '62,000', '38,000', '292,400', '562'] },
    ],
    educationalTitle: 'Why Nigerian Manufacturers Struggle to Price Profitably Without Cost Records',
    educationalParagraphs: [
      'Pricing is the most consequential financial decision a manufacturing business makes, and most Nigerian manufacturers make it without reliable cost data. When you do not know your true cost per unit — including direct materials, direct labour, manufacturing overhead, and the cost of waste and rework — it is impossible to set a price that consistently delivers profit. Many manufacturers discover they have been selling below cost only when they run out of working capital.',
      'Raw material cost is the largest variable in most manufacturing operations, and it requires the most systematic tracking. Material prices in Nigeria are highly volatile due to exchange rate movements, import duties, and logistics costs. A raw material inventory that records the actual landed cost of every batch purchased, and ties those costs to the units of production they support, gives you the data to reprice your products quickly when input costs change.',
      'COGS computation is mandatory for preparing any meaningful financial statement. Under IFRS, which Nigerian companies are required to follow, cost of goods sold is computed as opening inventory plus purchases minus closing inventory. Without properly maintained inventory records, this calculation becomes an estimate — and estimates create disputes with auditors, tax authorities, and potential investors.',
    ],
    relatedSlugs: ['trading', 'construction', 'transportation'],
  },

  {
    slug: 'hotel',
    industry: 'Hotel and Hospitality',
    tagline: 'Manage room revenue, occupancy, and hotel operations by the numbers',
    heroDescription:
      'Free Excel templates for Nigerian hotels and hospitality businesses. Track room bookings, daily revenue, operational expenses, staff payroll, and occupancy rates with clear, easy-to-use spreadsheets.',
    seoTitle: 'Free Hotel Management Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian hotels. Includes Room Booking Tracker, Daily Revenue Report, Hotel Expense Tracker, Staff Payroll Sheet, and Occupancy Rate Dashboard.',
    available: false,
    accentBg: 'bg-purple-50',
    accentBorder: 'border-purple-200',
    accentIcon: 'bg-purple-100',
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    files: [
      { name: 'Room Booking Tracker', description: 'Record all bookings, room type, check-in and check-out dates, rate, and payment status.', filename: null, available: false },
      { name: 'Daily Revenue Report', description: 'Summarise daily room revenue, restaurant revenue, and other income by category.', filename: null, available: false },
      { name: 'Hotel Expense Tracker', description: 'Record and categorise all operational expenses including utilities, supplies, and maintenance.', filename: null, available: false },
      { name: 'Staff Payroll Sheet', description: 'Calculate monthly payroll for all hotel departments with PAYE and net pay computation.', filename: null, available: false },
      { name: 'Occupancy Rate Dashboard', description: 'Track daily, weekly, and monthly occupancy rates. Compare actual vs target occupancy by room type.', filename: null, available: false },
    ],
    previewTitle: 'Room Booking Tracker — Preview',
    previewColumns: ['Guest Name', 'Room No.', 'Room Type', 'Check-In', 'Check-Out', 'Nights', 'Rate/Night (₦)', 'Total (₦)', 'Status'],
    previewRows: [
      { cells: ['Emeka Okonkwo', '104', 'Standard', '02-May', '05-May', '3', '18,000', '54,000', 'Paid'] },
      { cells: ['Aisha Bello', '201', 'Executive', '03-May', '06-May', '3', '32,000', '96,000', 'Pending'] },
      { cells: ['Corporate — GTBank', '305', 'Suite', '04-May', '08-May', '4', '55,000', '220,000', 'Paid'] },
    ],
    educationalTitle: 'The Financial Numbers Every Nigerian Hotel Owner Must Track Daily',
    educationalParagraphs: [
      'Hotel management in Nigeria is a high-overhead business where daily revenue visibility is not optional — it is survival. Unlike most businesses where a slow week is inconvenient, a hotel carries fixed costs including staff salaries, utilities, loan repayments, and property maintenance that do not reduce when occupancy is low. The only way to manage this successfully is through disciplined daily financial tracking.',
      'Occupancy rate is the single most important metric for any hotel operation. It tells you what percentage of your available room nights were sold in a given period. A hotel with 20 rooms running at 60 percent occupancy earns significantly less than one at 85 percent, even at the same room rate. Understanding your occupancy patterns — which days of the week, which months of the year — allows you to set rates dynamically and manage staffing costs intelligently.',
      'Revenue leakage is a serious problem in hotels where cash handling is manual. Without a daily revenue report that reconciles room bookings against cash collected and bank transfers received, it is impossible to detect whether revenue is being understated or misappropriated. The daily revenue report in this template pack creates the reconciliation framework that prevents this.',
    ],
    relatedSlugs: ['rental', 'school', 'entertainment'],
  },

  {
    slug: 'rental',
    industry: 'Rental Property',
    tagline: 'Track your tenants, your rent, and your property income with clarity',
    heroDescription:
      'Free Excel templates for Nigerian property landlords and rental businesses. Manage rent collection by tenant, track property expenses, monitor vacant units, calculate returns, and maintain a complete tenant ledger.',
    seoTitle: 'Free Rental Property Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian property landlords. Includes Rent Collection Tracker, Tenant Ledger, Property Expense Tracker, Vacancy Tracker, and Property ROI Calculator.',
    available: false,
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',
    accentIcon: 'bg-teal-100',
    iconPath:
      'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    files: [
      { name: 'Rent Collection Tracker', description: 'Track all rent payments received by unit, tenant, and date. See who is current, who is owing, and by how much.', filename: null, available: false },
      { name: 'Tenant Ledger', description: 'Complete transaction history per tenant including rent charges, payments made, and current balance.', filename: null, available: false },
      { name: 'Property Expense Tracker', description: 'Record all property-related expenses by category and property. Track repairs, rates, agency fees, and management costs.', filename: null, available: false },
      { name: 'Vacancy Tracker', description: 'Monitor vacant units across your portfolio. Track days vacant and estimated income lost per property.', filename: null, available: false },
      { name: 'Property ROI Calculator', description: 'Calculate annual return on investment per property based on rental income, expenses, and purchase price.', filename: null, available: false },
    ],
    previewTitle: 'Rent Collection Tracker — Preview',
    previewColumns: ['Tenant Name', 'Unit', 'Annual Rent (₦)', 'Last Payment', 'Amount Paid (₦)', 'Balance (₦)', 'Status'],
    previewRows: [
      { cells: ['Oluwaseun Adeyemi', 'Flat 2A', '480,000', 'Jan 2026', '480,000', '0', 'Current'] },
      { cells: ['Fatima Suleiman', 'Flat 3B', '360,000', 'Oct 2025', '180,000', '180,000', 'Owing'] },
      { cells: ['Kingsley Eze', 'Shop 1', '720,000', 'Mar 2026', '720,000', '0', 'Current'] },
    ],
    educationalTitle: 'How Nigerian Landlords Can Manage Multiple Properties Without Losing Track of Rent',
    educationalParagraphs: [
      'Rental property investment is one of the most popular wealth-building strategies in Nigeria, but it is also one of the most poorly managed from a financial perspective. Most Nigerian landlords with more than two or three properties are managing their rental income informally — through memory, bank alerts, and occasional conversations with tenants — rather than through a systematic record of who owes what and when.',
      'The problem compounds over time. When a tenant has been in a property for three years, paying rent in partial installments at irregular intervals, reconstructing the complete payment history from bank statements and informal receipts becomes a serious undertaking. Disputes over whether a particular payment was made are common and damaging to landlord-tenant relationships.',
      'Property expense tracking is where most Nigerian property owners fail to see the real picture of their returns. Roof repairs, repainting between tenancies, electricity meter charges, and agency fees for finding new tenants are all legitimate costs of property ownership. Without capturing these costs systematically, the net return from your property portfolio is essentially unknowable. Many landlords believe they are earning a 12 percent annual return when the true figure, after expenses, is closer to 6 or 7 percent.',
    ],
    relatedSlugs: ['hotel', 'trading', 'construction'],
  },

  {
    slug: 'law-firm',
    industry: 'Law Firms',
    tagline: 'Track billable time, client fees, and case expenses professionally',
    heroDescription:
      'Free Excel templates for Nigerian law firms and legal practitioners. Manage client billing, track case expenses, record time against matters, generate invoices, and monitor accounts receivable across your practice.',
    seoTitle: 'Free Law Firm Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian law firms. Includes Client Billing Tracker, Case Expense Tracker, Time Tracking Sheet, Invoice Generator, and Accounts Receivable Tracker.',
    available: false,
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentIcon: 'bg-indigo-100',
    iconPath:
      'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    files: [
      { name: 'Client Billing Tracker', description: 'Track all fees raised per client and matter. Monitor amounts paid, outstanding balances, and collection rate.', filename: null, available: false },
      { name: 'Case Expense Tracker', description: 'Record all disbursements and expenses per matter. Recover costs accurately when billing clients.', filename: null, available: false },
      { name: 'Time Tracking Sheet', description: 'Log billable hours per matter per day. Calculate value of time at standard billing rates.', filename: null, available: false },
      { name: 'Invoice Generator', description: 'Generate professional fee notes from time records and disbursements with automatic totals.', filename: null, available: false },
      { name: 'Accounts Receivable Tracker', description: 'Monitor all outstanding fee notes with aging analysis and follow-up date tracking.', filename: null, available: false },
    ],
    previewTitle: 'Client Billing Tracker — Preview',
    previewColumns: ['Client Name', 'Matter', 'Fee Raised (₦)', 'Date Billed', 'Amount Paid (₦)', 'Balance (₦)', 'Days Outstanding'],
    previewRows: [
      { cells: ['Dangote Holdings Ltd', 'Company Restructuring', '2,500,000', '15-Jan', '2,500,000', '0', '0'] },
      { cells: ['Mr. Babatunde Adewale', 'Property Dispute — Appeal', '850,000', '20-Feb', '425,000', '425,000', '72'] },
      { cells: ['PharmaPlus Nigeria', 'Contract Review', '380,000', '10-Mar', '0', '380,000', '53'] },
    ],
    educationalTitle: 'Why Nigerian Law Firms Struggle With Cash Flow Despite High Fee Billings',
    educationalParagraphs: [
      'Law firms in Nigeria can generate substantial fee income and still face chronic cash flow problems. The reason is almost always the gap between fees raised and fees collected. A practice that bills ₦50 million annually but collects only 70 percent of that in the year it was earned is effectively operating at ₦35 million revenue. Without a rigorous system for tracking what has been billed, what has been paid, and what is overdue, this gap is invisible until it becomes a crisis.',
      'Time recording is the foundation of fair billing in a legal practice. Without capturing the hours spent on each matter, practitioners either underbill — leaving money on the table — or overbill — creating client disputes and reputation damage. A simple daily time log that records the matter, the task performed, and the time taken takes ten minutes a day and creates the basis for defensible, detailed fee notes.',
      'Expense recovery is another area where Nigerian law firms regularly lose money. Filing fees, court registry charges, travel costs, and third-party disbursements paid on behalf of clients are all recoverable. Without a case expense tracker, these amounts are either forgotten entirely or lumped into general overhead rather than being billed back to the client who incurred them.',
    ],
    relatedSlugs: ['rental', 'school', 'hospital'],
  },

  {
    slug: 'entertainment',
    industry: 'Entertainment and Events',
    tagline: 'Budget events accurately, track revenue, and protect your profit margin',
    heroDescription:
      'Free Excel templates for Nigerian entertainment companies and event managers. Plan and monitor event budgets, track ticket and sponsorship revenue, manage artist payments, and record all event expenses.',
    seoTitle: 'Free Entertainment and Events Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian entertainment and events businesses. Includes Event Budget Planner, Revenue Tracker, Artist Payment Tracker, Sponsorship Tracker, and Event Expense Sheet.',
    available: false,
    accentBg: 'bg-pink-50',
    accentBorder: 'border-pink-200',
    accentIcon: 'bg-pink-100',
    iconPath:
      'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    files: [
      { name: 'Event Budget Planner', description: 'Plan event revenue and costs before the event. Track variance between budgeted and actual figures in real time.', filename: null, available: false },
      { name: 'Revenue Tracker', description: 'Record all revenue streams: ticket sales, gate collections, bar revenue, and other income per event.', filename: null, available: false },
      { name: 'Artist Payment Tracker', description: 'Manage performer fees, appearance agreements, advances paid, and balance due per artist per event.', filename: null, available: false },
      { name: 'Sponsorship Tracker', description: 'Track sponsor commitments, amounts received, deliverables owed, and outstanding balances.', filename: null, available: false },
      { name: 'Event Expense Sheet', description: 'Record all event expenses by category with real-time comparison against the approved budget.', filename: null, available: false },
    ],
    previewTitle: 'Event Budget Planner — Preview',
    previewColumns: ['Category', 'Budgeted (₦)', 'Actual (₦)', 'Variance (₦)', 'Status'],
    previewRows: [
      { cells: ['Venue Rental', '1,200,000', '1,200,000', '0', 'On Budget'] },
      { cells: ['Artist Fees', '3,500,000', '4,100,000', '-600,000', 'Over Budget'] },
      { cells: ['Ticket Revenue', '8,000,000', '6,750,000', '-1,250,000', 'Under Target'] },
    ],
    educationalTitle: 'Why Most Nigerian Event Businesses Run at a Loss Without Knowing It',
    educationalParagraphs: [
      'Event production is one of the most financially unpredictable businesses in Nigeria. Revenue depends on ticket sales that may not reach projections, while costs have a tendency to escalate from the original budget as the event date approaches. Without a real-time budget tracker, event producers often discover they have made a loss only after the event is over and all bills have been settled.',
      'Artist and performer fee management is a particularly sensitive area. Advance payments are standard in the Nigerian entertainment industry, and managing these advances — tracking what has been paid, what is still due, and what the agreed deliverables are — requires a clear, written record rather than phone conversations and verbal agreements.',
      'Sponsorship management is where many Nigerian event companies leave significant money uncollected. Sponsors who commit funding often pay in installments or delay the final tranche until after the event. Without a sponsorship tracker showing commitment dates, payment due dates, and the value of deliverables provided to each sponsor, following up effectively is very difficult.',
    ],
    relatedSlugs: ['hotel', 'trading', 'school'],
  },

  {
    slug: 'hospital',
    industry: 'Hospital and Healthcare',
    tagline: 'Manage patient billing, pharmacy inventory, and healthcare finances',
    heroDescription:
      'Free Excel templates for Nigerian hospitals, clinics, and healthcare providers. Track patient billing and collections, manage pharmacy inventory, compute staff payroll, record operational expenses, and schedule appointments.',
    seoTitle: 'Free Hospital and Healthcare Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian hospitals and clinics. Includes Patient Billing System, Pharmacy Inventory Tracker, Hospital Staff Payroll, Hospital Expense Tracker, and Patient Appointment Log.',
    available: false,
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-200',
    accentIcon: 'bg-red-100',
    iconPath:
      'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    files: [
      { name: 'Patient Billing System', description: 'Generate patient invoices for consultations, procedures, and drugs. Track payments and outstanding balances per patient.', filename: null, available: false },
      { name: 'Pharmacy Inventory Tracker', description: 'Monitor drug stock levels, expiry dates, reorder points, and pharmacy revenue vs cost of dispensing.', filename: null, available: false },
      { name: 'Hospital Staff Payroll', description: 'Compute monthly payroll for all categories of healthcare staff including PAYE, pension, and allowances.', filename: null, available: false },
      { name: 'Hospital Expense Tracker', description: 'Record and categorise all hospital operating costs including consumables, utilities, and maintenance.', filename: null, available: false },
      { name: 'Patient Appointment Log', description: 'Schedule and track patient appointments by doctor and department. Identify no-shows and reschedule systematically.', filename: null, available: false },
    ],
    previewTitle: 'Patient Billing System — Preview',
    previewColumns: ['Patient Name', 'File No.', 'Consultation (₦)', 'Drugs (₦)', 'Procedure (₦)', 'Total (₦)', 'Paid (₦)', 'Balance (₦)'],
    previewRows: [
      { cells: ['Mrs. Chidinma Okafor', 'P-00891', '5,000', '12,500', '0', '17,500', '17,500', '0'] },
      { cells: ['Mr. Hakeem Balogun', 'P-00892', '5,000', '8,200', '45,000', '58,200', '20,000', '38,200'] },
      { cells: ['Miss Amina Yusuf', 'P-00893', '3,500', '4,800', '0', '8,300', '8,300', '0'] },
    ],
    educationalTitle: 'The Financial Management Challenges Unique to Nigerian Healthcare Providers',
    educationalParagraphs: [
      'Healthcare is one of the few industries where the service is often delivered before payment is confirmed. Whether due to emergency care situations, NHIS and HMO billing cycles, or informal credit arrangements, Nigerian hospitals and clinics frequently have significant outstanding patient balances. Without a systematic patient billing record, collections become reactive rather than managed, and bad debt accumulates silently.',
      'Pharmacy inventory management has both a financial and a regulatory dimension. Expired drugs represent a direct financial loss and a compliance liability. A pharmacy inventory tracker that records purchase dates, batch numbers, and expiry dates, alongside selling prices and quantities dispensed, provides the data needed for both financial control and regulatory compliance.',
      'Payroll complexity is higher in healthcare than in most other industries due to the variety of staff categories — consultants, resident doctors, nurses, pharmacists, laboratory scientists, and support staff — each with different pay structures, shift allowances, and call duty payments. A well-designed healthcare payroll sheet that handles these categories systematically saves significant administrative time each month.',
    ],
    relatedSlugs: ['school', 'law-firm', 'trading'],
  },

  {
    slug: 'transportation',
    industry: 'Transportation and Logistics',
    tagline: 'Track your fleet, fuel, drivers, and trip income with precision',
    heroDescription:
      'Free Excel templates for Nigerian transportation and logistics businesses. Manage your fleet maintenance, monitor fuel consumption, compute driver payroll, track trip income, and schedule vehicle servicing.',
    seoTitle: 'Free Transportation and Logistics Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian transport businesses. Includes Fleet Management Tracker, Fuel Consumption Log, Driver Payroll Sheet, Trip Income Tracker, and Vehicle Maintenance Log.',
    available: false,
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    accentIcon: 'bg-orange-100',
    iconPath:
      'M8 17a5 5 0 01-.916-9.916 5 5 0 016.823-5.941 5.5 5.5 0 0110.031 1.858A4.002 4.002 0 0116 17H8z',
    files: [
      { name: 'Fleet Management Tracker', description: 'Monitor all vehicles in your fleet including registration, assigned driver, current status, and last service date.', filename: null, available: false },
      { name: 'Fuel Consumption Log', description: 'Record daily fuel purchases per vehicle. Calculate litres per kilometre and fuel cost per trip.', filename: null, available: false },
      { name: 'Driver Payroll Sheet', description: 'Calculate driver earnings based on trips completed, commissions, bonuses, and deductions.', filename: null, available: false },
      { name: 'Trip Income Tracker', description: 'Record all trips completed with route, freight, agreed rate, amount billed, and amount collected.', filename: null, available: false },
      { name: 'Vehicle Maintenance Log', description: 'Track all maintenance and repairs per vehicle with dates, costs, and next service scheduling.', filename: null, available: false },
    ],
    previewTitle: 'Trip Income Tracker — Preview',
    previewColumns: ['Trip Date', 'Vehicle Reg.', 'Driver', 'Route', 'Freight', 'Rate (₦)', 'Billed (₦)', 'Collected (₦)'],
    previewRows: [
      { cells: ['01-May-26', 'LSD 345 AB', 'Musa Aliyu', 'Lagos → Kano', 'Electronics', '280,000', '280,000', '280,000'] },
      { cells: ['02-May-26', 'ABJ 112 XC', 'Emeka Nwoke', 'Lagos → PH', 'FMCG Goods', '195,000', '195,000', '100,000'] },
      { cells: ['03-May-26', 'LSD 345 AB', 'Musa Aliyu', 'Kano → Lagos', 'Empty Return', '45,000', '45,000', '45,000'] },
    ],
    educationalTitle: 'The Hidden Financial Drains in Nigerian Transportation Businesses',
    educationalParagraphs: [
      'Fleet businesses in Nigeria face a unique financial challenge: high fixed costs combined with highly variable revenue. A truck that is off the road for two weeks for maintenance still carries financing costs, insurance, and driver salary commitments. The businesses that manage these economics well are the ones that track vehicle utilisation, maintenance costs, and trip profitability with enough precision to make timely decisions.',
      'Fuel is typically the single largest operating cost in a transportation business, often representing 35 to 45 percent of total expenses. Yet most Nigerian fleet operators track fuel purchases informally, without linking each fuel purchase to a specific trip or vehicle. This makes it impossible to detect abnormal fuel consumption — a common signal of either vehicle engine problems or driver fuel theft — until the loss is already substantial.',
      'Driver payment structures in Nigeria are varied and often complex, mixing flat monthly salaries with per-trip allowances, loading fees, and performance bonuses. Without a structured payroll sheet that captures each element of driver compensation and reconciles it against completed trips, disputes over pay are frequent and accurate cost tracking is impossible.',
    ],
    relatedSlugs: ['manufacturing', 'construction', 'trading'],
  },

  {
    slug: 'agriculture',
    industry: 'Agriculture and Farming',
    tagline: 'Track farm finances from planting season to harvest and sale',
    heroDescription:
      'Free Excel templates for Nigerian farmers and agribusinesses. Record farm expenses by season, track crop yields, manage livestock records, log farm sales, and plan seasonal budgets for the full agricultural cycle.',
    seoTitle: 'Free Agriculture and Farm Management Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian farmers and agribusinesses. Includes Farm Expense Tracker, Crop Yield Record, Livestock Tracker, Farm Sales Tracker, and Seasonal Budget Planner.',
    available: false,
    accentBg: 'bg-lime-50',
    accentBorder: 'border-lime-200',
    accentIcon: 'bg-lime-100',
    iconPath:
      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    files: [
      { name: 'Farm Expense Tracker', description: 'Record all farm inputs: seeds, fertilisers, pesticides, labour, equipment hire, and other costs by season and crop.', filename: null, available: false },
      { name: 'Crop Yield Record', description: 'Track expected vs actual yield per acre for each crop type and season.', filename: null, available: false },
      { name: 'Livestock Tracker', description: 'Monitor livestock numbers, purchases, sales, births, deaths, and feed costs per livestock category.', filename: null, available: false },
      { name: 'Farm Sales Tracker', description: 'Record all produce sales by crop, buyer, quantity, price per unit, and amount received.', filename: null, available: false },
      { name: 'Seasonal Budget Planner', description: 'Plan input costs and expected revenue for each farming season. Compare planned vs actual at season end.', filename: null, available: false },
    ],
    previewTitle: 'Crop Yield Record — Preview',
    previewColumns: ['Crop', 'Hectares Planted', 'Expected Yield (kg)', 'Actual Yield (kg)', 'Variance', 'Selling Price (₦/kg)', 'Revenue (₦)'],
    previewRows: [
      { cells: ['Maize', '10', '25,000', '22,400', '-2,600', '180', '4,032,000'] },
      { cells: ['Soybeans', '5', '8,000', '8,750', '+750', '420', '3,675,000'] },
      { cells: ['Cassava', '8', '80,000', '74,500', '-5,500', '45', '3,352,500'] },
    ],
    educationalTitle: 'Why Nigerian Farmers Cannot Scale Without Basic Financial Records',
    educationalParagraphs: [
      'Agriculture is the foundation of the Nigerian economy, yet most farmers operate without any formal financial records. This is not simply an administrative gap — it is a direct barrier to growth. Banks require financial records to evaluate loan applications. Input suppliers extend credit based on documented purchase and payment history. And the ability to compare the profitability of different crops or farming methods requires data that informal operations simply cannot produce.',
      'Seasonal cash flow management is the most critical financial skill in agriculture. A farmer planting in April does not receive income until harvest in September. The entire period between planting and harvest must be financed from reserves, loans, or advance sales agreements. Without a seasonal budget planner that maps out these cash needs in advance, unexpected shortfalls at critical stages of the growing season can result in lost harvests.',
      'Yield tracking is what allows a serious farmer to improve year on year. When you record the inputs applied to each plot — variety of seed, quantity of fertiliser, irrigation schedule — alongside the resulting yield, you can identify which combinations deliver the best returns per naira invested. This kind of systematic tracking is the difference between farming by experience and farming by data.',
    ],
    relatedSlugs: ['trading', 'manufacturing', 'transportation'],
  },
]

export function getTemplate(slug: string): TemplateData | undefined {
  return templates.find(t => t.slug === slug)
}

export function getRelatedTemplates(slug: string): TemplateData[] {
  const template = getTemplate(slug)
  if (!template) return []
  return template.relatedSlugs
    .map(s => getTemplate(s))
    .filter((t): t is TemplateData => !!t)
}
