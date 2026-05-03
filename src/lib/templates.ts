export interface TemplateFile {
  name: string
  description: string
  filename: string | null
  available: boolean
  features: string[]
  useCase: string
  previewColumns: string[]
  previewRows: string[][]
}

export interface TemplateData {
  slug: string
  industry: string
  tagline: string
  heroDescription: string
  seoTitle: string
  seoDescription: string
  files: TemplateFile[]
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
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    files: [
      {
        name: 'Project Cost Tracker',
        description: 'Monitor every active construction project against its approved budget in real time. See exactly where money is being spent and catch overruns before they become losses.',
        filename: '01-project-cost-tracker.xlsx',
        available: true,
        features: [
          'Budget vs actual spend per project',
          'Automatic variance calculation (₦ and %)',
          'Colour-coded status: on track / at risk / over budget',
          'Multiple active projects on one sheet',
          'Running spend history by date',
        ],
        useCase: 'A Lagos construction firm managing 4 simultaneous sites uses this to review total spend exposure every Monday morning. When one site hits 80% of budget at 60% completion, the PM flags it to the client before the problem escalates.',
        previewColumns: ['Project Name', 'Budget (₦)', 'Spent to Date (₦)', 'Variance (₦)', '% Complete', 'Status'],
        previewRows: [
          ['Victoria Island Office Block', '15,000,000', '8,250,000', '6,750,000', '55%', 'On Track'],
          ['Lekki Phase 1 Bungalow', '4,800,000', '5,100,000', '-300,000', '90%', 'Over Budget'],
          ['Ikeja Warehouse Extension', '9,200,000', '1,840,000', '7,360,000', '20%', 'On Track'],
        ],
      },
      {
        name: 'Material Usage Log',
        description: 'Record every material delivered and consumed on site. Reconcile supplier invoices against quantities received and flag discrepancies immediately.',
        filename: '02-material-usage-log.xlsx',
        available: true,
        features: [
          'Materials recorded by item, supplier, and date',
          'Quantity ordered vs quantity received reconciliation',
          'Unit cost and total value per delivery',
          'Site-level material summary',
          'Running balance of materials on hand',
        ],
        useCase: 'A contractor in Abuja uses this to verify that every cement bag, rod, and block delivered to site matches what was invoiced. Over one year, this prevented approximately ₦340,000 in billing discrepancies from suppliers.',
        previewColumns: ['Material', 'Supplier', 'Date Delivered', 'Qty Ordered', 'Qty Received', 'Unit Cost (₦)', 'Total (₦)'],
        previewRows: [
          ['Dangote Cement (50kg)', 'ABC Supplies Ltd', '02-May', '200 bags', '198 bags', '5,500', '1,089,000'],
          ['16mm Iron Rod', 'Lagos Steel Co', '03-May', '100 lengths', '100 lengths', '8,200', '820,000'],
          ['Sand (tipper load)', 'Alhaji Musa & Sons', '03-May', '3 loads', '3 loads', '35,000', '105,000'],
        ],
      },
      {
        name: 'Labour Cost Sheet',
        description: 'Track daily and weekly labour costs per worker and per project. Calculate total payroll accurately for each site without surprises at month end.',
        filename: null,
        available: false,
        features: [
          'Daily attendance and hours per worker',
          'Daily rate and overtime rate per trade',
          'Automatic weekly and project-level totals',
          'Comparison against labour budget per project',
          'Worker type breakdown: artisans, labourers, supervisors',
        ],
        useCase: 'A contractor who runs cash payroll daily uses this to reconcile total labour spend against the project budget each Friday. It prevents the common situation where labour costs balloon unnoticed over a 3-week period.',
        previewColumns: ['Worker Name', 'Trade', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Days', 'Rate (₦)', 'Total (₦)'],
        previewRows: [
          ['Emeka Okonkwo', 'Mason', '✓', '✓', '✓', '✓', '✓', '5', '7,500', '37,500'],
          ['Sunday Adeyemi', 'Labourer', '✓', '✓', '✓', '—', '✓', '4', '5,000', '20,000'],
          ['Alhaji Garba', 'Foreman', '✓', '✓', '✓', '✓', '✓', '5', '12,000', '60,000'],
        ],
      },
      {
        name: 'Contract Billing Tracker',
        description: 'Manage progress billing at every project milestone. Know exactly what you are entitled to bill, what has been submitted, what is approved, and what is still outstanding.',
        filename: null,
        available: false,
        features: [
          'Contract value and milestone schedule',
          'Amounts billed per milestone',
          'Client approvals and payment status',
          'Retention withheld and release date tracking',
          'Outstanding balance per contract at a glance',
        ],
        useCase: 'A firm with 6 active contracts uses this to ensure no milestone invoice is missed. On average, missed milestone billing delays the project cash cycle by 3–4 weeks. This template ensures every entitled billing is raised within 48 hours of milestone completion.',
        previewColumns: ['Contract', 'Milestone', 'Value (₦)', 'Invoice Raised', 'Date Submitted', 'Status', 'Retention (₦)'],
        previewRows: [
          ['ABC Office Block', 'Foundation Complete', '2,500,000', 'INV-041', '10-Apr', 'Paid', '125,000'],
          ['ABC Office Block', 'Slab Level 1', '3,800,000', 'INV-047', '02-May', 'Pending', '190,000'],
          ['Lekki Bungalow', 'Block Work 50%', '1,200,000', 'INV-044', '25-Apr', 'Approved', '60,000'],
        ],
      },
      {
        name: 'Equipment Maintenance Log',
        description: 'Schedule and record all servicing, repairs, and maintenance for every piece of equipment. Prevent costly breakdowns by tracking next-service-due dates.',
        filename: null,
        available: false,
        features: [
          'All equipment listed with registration/serial numbers',
          'Last service date and next service due',
          'Maintenance cost recorded per service',
          'Downtime tracking and reason codes',
          'Total annual maintenance cost per equipment',
        ],
        useCase: 'A plant hire company in Port Harcourt uses this to schedule preventative maintenance on 12 pieces of equipment. Tracking showed that one excavator was 6 weeks overdue for a service — catching it before a breakdown that would have cost ₦4.2 million in lost hire revenue.',
        previewColumns: ['Equipment', 'Reg / Serial', 'Last Service', 'Next Due', 'Service Cost (₦)', 'Status'],
        previewRows: [
          ['CAT 320 Excavator', 'NG-EX-001', '15-Mar', '15-Jun', '85,000', 'Current'],
          ['Concrete Mixer (large)', 'SN-CM-014', '20-Jan', '20-Apr', '12,500', 'Overdue'],
          ['Toyota Hilux Site Truck', 'ABC 123 LG', '01-May', '01-Aug', '45,000', 'Current'],
        ],
      },
    ],
    educationalTitle: 'Why Construction Businesses in Nigeria Lose Money Without Proper Cost Tracking',
    educationalParagraphs: [
      'Construction is one of the most financially complex industries in Nigeria. Projects run for months, involve dozens of suppliers and subcontractors, and carry costs that shift dramatically due to material price changes, labour disputes, and site delays. Without a structured cost tracking system, most Nigerian construction businesses only discover they have lost money after the project is complete.',
      'The most common financial problem in Nigerian construction is budget overrun caused by untracked material purchases. When site supervisors buy materials without recording quantities and costs against a specific project, there is no way to know whether you are within budget until the final reconciliation — which often reveals losses of 20 to 40 percent of expected profit.',
      'Labour cost management is equally critical. Daily labour payments in cash are common on Nigerian construction sites, but these payments are rarely reconciled against the project budget in real time. A site that runs three weeks longer than planned due to scope changes can wipe out the entire profit margin if those additional labour days were not captured and billed to the client.',
      'The templates in this pack address each of these problem areas directly. They are designed to work without any accounting software and can be maintained by a site supervisor or project manager.',
    ],
    relatedSlugs: ['school', 'trading', 'manufacturing'],
  },

  {
    slug: 'school',
    industry: 'School and Education',
    tagline: 'Manage fees, payroll, and school finances clearly and accurately',
    heroDescription:
      'Free Excel templates for Nigerian schools and educational institutions. Track student fee payments by term, manage staff payroll with PAYE, record school expenses, monitor attendance, and plan annual budgets.',
    seoTitle: 'Free School Management Excel Templates for Nigeria | DigitGlance',
    seoDescription:
      'Download free Excel templates for Nigerian schools. Includes Student Fee Tracker, Staff Payroll Sheet, School Expense Tracker, Attendance Register, and Budget Planning Sheet.',
    available: true,
    accentBg: 'bg-blue-50',
    accentBorder: 'border-blue-200',
    accentIcon: 'bg-blue-100',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    files: [
      {
        name: 'Student Fee Tracker',
        description: 'Track every student\'s fee payment status across all three terms. See who has paid in full, who is owing, and the total collected vs outstanding for the entire school.',
        filename: '01-student-fee-tracker.xlsx',
        available: true,
        features: [
          'Per-student, per-term fee tracking',
          'Partial payment recording with running balance',
          'Class-level and school-level collection summaries',
          'Outstanding balance alerts',
          'Payment date and method recording',
        ],
        useCase: 'A private primary school in Ibadan with 340 students uses this to prepare a weekly collection report for the proprietor. It reduced uncollected fees by 28% in the first term of use by making the outstanding balances visible to the admin team daily.',
        previewColumns: ['Student Name', 'Class', 'Term 1 (₦)', 'Term 2 (₦)', 'Term 3 (₦)', 'Total Paid (₦)', 'Balance (₦)', 'Status'],
        previewRows: [
          ['Adebayo Tunde Emmanuel', 'JSS 1A', '85,000', '85,000', '—', '170,000', '85,000', 'Owing'],
          ['Chioma Nwachukwu', 'SS 2B', '95,000', '95,000', '95,000', '285,000', '0', 'Paid'],
          ['Ibrahim Musa Aliyu', 'JSS 3C', '85,000', '42,500', '—', '127,500', '127,500', 'Partial'],
        ],
      },
      {
        name: 'Staff Payroll Sheet',
        description: 'Compute monthly payroll for all teaching and non-teaching staff. Automatically calculates PAYE deductions using the current progressive tax bands and computes net pay.',
        filename: '02-staff-payroll-sheet.xlsx',
        available: true,
        features: [
          'Gross salary, allowances, and bonuses per staff',
          'Automatic PAYE calculation under current PITA bands',
          'Pension deduction (8% employee)',
          'Net pay per staff member',
          'Total payroll cost including employer pension contribution',
        ],
        useCase: 'The HR officer of a secondary school in Lagos uses this to process payroll for 47 staff members every month. The automatic PAYE calculation removed the manual tax lookup that previously took 3 hours and often contained errors.',
        previewColumns: ['Staff Name', 'Role', 'Gross (₦)', 'PAYE (₦)', 'Pension (₦)', 'Other Deductions (₦)', 'Net Pay (₦)'],
        previewRows: [
          ['Mrs. Funke Adeyemi', 'Class Teacher', '185,000', '14,250', '14,800', '0', '155,950'],
          ['Mr. Chukwudi Eze', 'Vice Principal', '280,000', '35,750', '22,400', '5,000', '216,850'],
          ['Miss Aisha Bello', 'Admin Officer', '120,000', '6,300', '9,600', '0', '104,100'],
        ],
      },
      {
        name: 'School Expense Tracker',
        description: 'Record and categorise all school expenditure by month. Compare actual spending against the approved budget for every expense category.',
        filename: null,
        available: false,
        features: [
          'Expense categories: utilities, supplies, maintenance, transport, etc.',
          'Monthly actual vs budget comparison',
          'Running year-to-date totals per category',
          'Supplier name and invoice reference per entry',
          'Year-end expense summary for accounts preparation',
        ],
        useCase: 'A school bursar uses this to justify budget variance to the school board. When electricity costs ran 40% over budget in Q2, the tracker showed exactly which months and why, enabling a targeted response.',
        previewColumns: ['Date', 'Category', 'Description', 'Supplier', 'Budget (₦)', 'Actual (₦)', 'Variance (₦)'],
        previewRows: [
          ['04-May', 'Utilities', 'EKEDC Electricity', 'EKEDC', '45,000', '58,200', '-13,200'],
          ['05-May', 'Supplies', 'Chalk, markers, paper', 'Okafor Stationery', '30,000', '27,500', '2,500'],
          ['06-May', 'Maintenance', 'Roof repair — Block C', 'Adewale Builders', '80,000', '80,000', '0'],
        ],
      },
      {
        name: 'Attendance Register',
        description: 'Record daily student attendance by class. Generate term-level summaries showing attendance percentage per student and identify patterns of absenteeism.',
        filename: null,
        available: false,
        features: [
          'Daily attendance mark per student per class',
          'Automatic total days present and absent',
          'Term attendance percentage per student',
          'Class-level summary for teacher reporting',
          'Flags students below 75% attendance threshold',
        ],
        useCase: 'A school management team uses the term attendance summary to identify students at risk of exam exclusion due to poor attendance before the cut-off date, allowing pastoral intervention.',
        previewColumns: ['Student Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Week Total', 'Term %'],
        previewRows: [
          ['Oluwaseun Bakare', 'P', 'P', 'P', 'A', 'P', '4/5', '88%'],
          ['Fatima Abdullahi', 'P', 'P', 'P', 'P', 'P', '5/5', '96%'],
          ['Emeka Okafor', 'A', 'P', 'A', 'P', 'P', '3/5', '62%'],
        ],
      },
      {
        name: 'Budget Planning Sheet',
        description: 'Plan income and expenditure for each academic session. Set targets per term, compare actuals quarterly, and forecast year-end financial position.',
        filename: null,
        available: false,
        features: [
          'Income budget: fee income by class and term',
          'Expenditure budget across all categories',
          'Quarterly actual vs budget comparison',
          'Year-end surplus or deficit projection',
          'Multi-year comparison to spot trends',
        ],
        useCase: 'A school proprietor planning to hire 3 additional teachers uses this to confirm the school can absorb the additional payroll cost without raising fees in the next session.',
        previewColumns: ['Category', 'Term 1 Budget (₦)', 'Term 1 Actual (₦)', 'Term 2 Budget (₦)', 'Term 2 Actual (₦)', 'Annual Budget (₦)'],
        previewRows: [
          ['Fee Income', '8,500,000', '7,820,000', '8,500,000', '—', '25,500,000'],
          ['Staff Salaries', '4,200,000', '4,200,000', '4,200,000', '—', '12,600,000'],
          ['Utilities', '135,000', '162,600', '135,000', '—', '405,000'],
        ],
      },
    ],
    educationalTitle: 'How Nigerian Schools Can Eliminate Fee Collection Chaos With Proper Financial Records',
    educationalParagraphs: [
      'Fee management is one of the most operationally stressful aspects of running a school in Nigeria. With hundreds of students paying across three terms, at different dates, in different amounts, and sometimes in instalments, the margin for error is enormous. Most Nigerian schools track fee payments in notebooks, WhatsApp messages, or basic spreadsheets that were never designed for this purpose — and the result is constant disputes, missed collections, and year-end shortfalls.',
      'The fundamental problem is the absence of a systematic per-student, per-term fee record. When a parent claims they paid Term 2 fees in cash and no formal receipt was issued with a corresponding ledger entry, it is impossible to verify. A proper student fee tracker creates a permanent record of every payment, including the date, amount, method, and the person who received it.',
      'Payroll management is equally important for school sustainability. Staff costs typically represent 60 to 80 percent of a Nigerian school\'s total expenses, yet many school owners have no accurate, month-by-month record of what they actually spent on payroll. The PAYE obligation is another area where schools regularly face penalties — a payroll sheet that automatically computes PAYE helps school administrators meet this obligation every month.',
    ],
    relatedSlugs: ['construction', 'trading', 'hospital'],
  },

  {
    slug: 'trading',
    industry: 'Trading and Retail',
    tagline: 'Know your stock, your sales, your profit, and your cash every day',
    heroDescription: 'Free Excel templates for Nigerian trading and retail businesses. Track daily sales and inventory, maintain a cashbook, manage customer balances, track supplier payables, and analyse product profitability.',
    seoTitle: 'Free Trading Business Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian trading and retail businesses. Includes Sales and Inventory Tracker, Daily Cashbook, Customer Ledger, Supplier Payables Tracker, and Profit Analysis Sheet.',
    available: false,
    accentBg: 'bg-green-50',
    accentBorder: 'border-green-200',
    accentIcon: 'bg-green-100',
    iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    files: [
      { name: 'Sales and Inventory Tracker', description: 'Track daily sales by product, update stock quantities automatically, and flag items running low.', filename: null, available: false, features: ['Daily sales by product', 'Auto stock deduction on sale', 'Low stock alert threshold', 'Daily and monthly sales totals', 'Best-selling product analysis'], useCase: 'A wholesale FMCG trader uses this to know exactly which products are moving and which are sitting. It identified 3 slow-moving SKUs that were tying up ₦850,000 in dead stock.', previewColumns: ['Product', 'Opening Stock', 'Sold Today', 'Closing Stock', 'Unit Price (₦)', 'Revenue (₦)', 'Status'], previewRows: [['Indomie Noodles (carton)', '120', '28', '92', '3,200', '89,600', 'Good'], ['Peak Milk (48-pack)', '45', '0', '45', '8,500', '0', 'Slow'], ['Milo 500g (carton)', '30', '12', '18', '12,400', '148,800', 'Low Stock']] },
      { name: 'Daily Cashbook', description: 'Record all cash inflows and outflows daily. Reconcile closing balance against physical cash count every day.', filename: null, available: false, features: ['Opening balance carried forward', 'All receipts and payments recorded', 'Running balance after each entry', 'Daily closing balance', 'Weekly and monthly cash summaries'], useCase: 'A market trader reconciles the cashbook with physical cash in the till every evening. This simple habit caught a ₦15,000 discrepancy in the first week that was traced to an unrecorded supplier payment.', previewColumns: ['Date', 'Description', 'Receipts (₦)', 'Payments (₦)', 'Balance (₦)'], previewRows: [['03-May', 'Opening balance', '—', '—', '285,000'], ['03-May', 'Sales — morning session', '142,500', '—', '427,500'], ['03-May', 'Supplier payment — Dangote', '—', '85,000', '342,500']] },
      { name: 'Customer Ledger', description: 'Track credit sales per customer with full transaction history and current balance owed.', filename: null, available: false, features: ['Per-customer transaction history', 'Credit limit tracking', 'Current balance owed', 'Payment history and dates', 'Overdue balance highlighting'], useCase: 'A provision store owner extended credit to 23 regular customers. Without a ledger, collections were based on memory. The ledger revealed that one customer owed ₦380,000 — more than double what the owner estimated.', previewColumns: ['Customer', 'Date', 'Invoice (₦)', 'Payment (₦)', 'Balance (₦)', 'Days Outstanding'], previewRows: [['Alhaji Musa Store', '01-May', '85,000', '—', '85,000', '2'], ['Mama Titi Provision', '28-Apr', '42,000', '42,000', '0', '—'], ['Chukwuemeka & Sons', '15-Apr', '210,000', '100,000', '110,000', '18']] },
      { name: 'Supplier Payables Tracker', description: 'Monitor what you owe each supplier, due dates, and full payment history to avoid supply disruptions.', filename: null, available: false, features: ['All supplier balances in one view', 'Invoice due dates and payment terms', 'Payment history per supplier', 'Total payables vs cash available comparison', 'Overdue supplier flag'], useCase: 'A trading company managing 14 suppliers uses this to plan which suppliers to pay each week based on due dates and cash available, preventing supply cut-offs while protecting cash flow.', previewColumns: ['Supplier', 'Invoice', 'Amount (₦)', 'Due Date', 'Status', 'Days Overdue'], previewRows: [['Lagos Packaging Co', 'SP-0041', '185,000', '10-May', 'Due Soon', '—'], ['ABC Flour Mills', 'SP-0038', '420,000', '28-Apr', 'Overdue', '5'], ['Zenith Sugar Supplies', 'SP-0042', '96,500', '15-May', 'Current', '—']] },
      { name: 'Profit Analysis Sheet', description: 'Calculate gross profit and net margin by product category and by month to guide purchasing and pricing decisions.', filename: null, available: false, features: ['Revenue and cost of goods by category', 'Gross profit and margin per category', 'Monthly profit trend', 'Best and worst performing product groups', 'Price change impact simulation'], useCase: 'A trader discovered through this analysis that beverages had a 22% margin while household goods were at 8%. This data drove a deliberate shift in purchasing focus that increased overall margins by 4 percentage points.', previewColumns: ['Category', 'Revenue (₦)', 'COGS (₦)', 'Gross Profit (₦)', 'Margin %'], previewRows: [['Beverages', '1,240,000', '968,000', '272,000', '21.9%'], ['Household Goods', '890,000', '818,000', '72,000', '8.1%'], ['Personal Care', '456,000', '338,000', '118,000', '25.9%']] },
    ],
    educationalTitle: 'The Financial Records Every Nigerian Trading Business Must Keep',
    educationalParagraphs: [
      'Trading businesses in Nigeria operate in one of the most competitive and fast-moving commercial environments in Africa. Margins are often thin, credit terms are standard, and cash flow can turn negative overnight when a large customer delays payment or a supplier demands upfront payment.',
      'Stock management is where most Nigerian traders lose money invisibly. Without a systematic sales and inventory tracker, shrinkage, spoilage, and petty theft accumulate over weeks and months without detection. A daily stock reconciliation against recorded sales takes less than fifteen minutes and eliminates this silent profit drain.',
      'The daily cashbook is the most fundamental financial record for any trading business. The discipline of reconciling it daily against physical cash on hand creates the accountability that prevents small discrepancies from growing into significant losses.',
    ],
    relatedSlugs: ['manufacturing', 'construction', 'rental'],
  },

  {
    slug: 'manufacturing',
    industry: 'Manufacturing',
    tagline: 'Track production costs, raw materials, and finished goods accurately',
    heroDescription: 'Free Excel templates for Nigerian manufacturing businesses. Monitor production costs, track raw material inventory, manage work-in-progress, record finished goods, and calculate cost of goods sold.',
    seoTitle: 'Free Manufacturing Business Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian manufacturers. Includes Production Cost Sheet, Raw Material Inventory, WIP Tracker, Finished Goods Inventory, and COGS Calculator.',
    available: false,
    accentBg: 'bg-slate-100',
    accentBorder: 'border-slate-200',
    accentIcon: 'bg-slate-200',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    files: [
      { name: 'Production Cost Sheet', description: 'Record all direct and indirect costs per production run and compare against standard costs.', filename: null, available: false, features: ['Direct materials, labour, and overhead per run', 'Standard vs actual cost comparison', 'Cost per unit calculation', 'Production run variance analysis', 'Month-end production cost summary'], useCase: 'A small bakery in Lagos tracks cost per bread batch. When flour prices rose 18%, the sheet immediately showed the impact on cost-per-unit, triggering a price review within the same week.', previewColumns: ['Production Run', 'Units Produced', 'Materials (₦)', 'Labour (₦)', 'Overhead (₦)', 'Total Cost (₦)', 'Cost/Unit (₦)'], previewRows: [['Batch 001 — 6 Jan', '500', '185,000', '62,000', '38,000', '285,000', '570'], ['Batch 002 — 13 Jan', '480', '177,600', '62,000', '38,000', '277,600', '578'], ['Batch 003 — 20 Jan', '520', '192,400', '62,000', '38,000', '292,400', '562']] },
      { name: 'Raw Material Inventory', description: 'Track all raw material purchases, usage in production, and closing stock by material type.', filename: null, available: false, features: ['Opening stock, purchases, and usage per material', 'Closing stock valuation', 'Reorder point alerts', 'Supplier and unit cost tracking', 'Monthly material cost analysis'], useCase: 'A paint manufacturer tracks 24 raw materials using this sheet. It prevents production stoppages by flagging when any material drops below the 2-week production requirement.', previewColumns: ['Material', 'Opening Stock', 'Purchased (kg)', 'Used in Production', 'Closing Stock', 'Unit Cost (₦)', 'Closing Value (₦)'], previewRows: [['Titanium Dioxide', '450 kg', '500 kg', '680 kg', '270 kg', '1,850', '499,500'], ['Linseed Oil', '180 L', '200 L', '310 L', '70 L', '2,200', '154,000'], ['Pigment — Red', '90 kg', '0 kg', '45 kg', '45 kg', '4,500', '202,500']] },
      { name: 'WIP Tracker', description: 'Monitor the value of work-in-progress at any point in the production cycle.', filename: null, available: false, features: ['Units at each stage of production', 'Cost accumulated at each stage', 'Opening and closing WIP valuation', 'Transfer to finished goods tracking', 'WIP as percentage of total inventory value'], useCase: 'A furniture manufacturer tracks WIP across 5 production stages. This prevents undervaluing inventory on financial statements and helps identify bottlenecks in the production line.', previewColumns: ['Item', 'Stage', 'Units in WIP', 'Materials Cost (₦)', 'Labour Cost (₦)', 'Total WIP Value (₦)'], previewRows: [['3-Seater Sofa', 'Frame Assembly', '12', '180,000', '48,000', '228,000'], ['Dining Chair', 'Upholstery', '30', '225,000', '90,000', '315,000'], ['Office Desk', 'Finishing', '8', '96,000', '32,000', '128,000']] },
      { name: 'Finished Goods Inventory', description: 'Track completed production output, goods dispatched, and closing finished goods stock.', filename: null, available: false, features: ['Units produced and added to stock', 'Units dispatched per customer order', 'Closing finished goods count and value', 'FIFO cost allocation', 'Stock age analysis'], useCase: 'A bottled water company uses this to reconcile production output against sales dispatches every week. The reconciliation identified a 3% loss factor that was investigated and traced to breakage during loading.', previewColumns: ['Product', 'Opening Stock', 'Produced', 'Dispatched', 'Closing Stock', 'Unit Cost (₦)', 'Stock Value (₦)'], previewRows: [['Pure Water 50cl (carton)', '850', '2,000', '2,150', '700', '480', '336,000'], ['Table Water 75cl (carton)', '420', '800', '950', '270', '750', '202,500'], ['Spring Water 1.5L (carton)', '180', '400', '490', '90', '1,200', '108,000']] },
      { name: 'COGS Calculator', description: 'Calculate cost of goods sold accurately using opening inventory, purchases, and closing inventory figures.', filename: null, available: false, features: ['Opening stock value brought forward', 'Purchases and production costs added', 'Closing stock value deducted', 'COGS for income statement', 'Gross profit calculation'], useCase: 'A small manufacturer uses this to populate the income statement every month without needing an accountant. The COGS figure is ready within 30 minutes of completing the month-end stock count.', previewColumns: ['Item', 'Amount (₦)'], previewRows: [['Opening Stock (1 May)', '4,850,000'], ['Add: Raw Material Purchases', '3,200,000'], ['Add: Direct Labour', '1,560,000'], ['Add: Manufacturing Overhead', '820,000'], ['Less: Closing Stock (31 May)', '-5,120,000'], ['= Cost of Goods Sold', '5,310,000']] },
    ],
    educationalTitle: 'Why Nigerian Manufacturers Struggle to Price Profitably Without Cost Records',
    educationalParagraphs: [
      'Pricing is the most consequential financial decision a manufacturing business makes, and most Nigerian manufacturers make it without reliable cost data. When you do not know your true cost per unit — including direct materials, direct labour, manufacturing overhead, and the cost of waste and rework — it is impossible to set a price that consistently delivers profit.',
      'Raw material cost is the largest variable in most manufacturing operations and requires the most systematic tracking. Material prices in Nigeria are highly volatile due to exchange rate movements and logistics costs. A raw material inventory that records the actual landed cost of every batch gives you the data to reprice products quickly when input costs change.',
    ],
    relatedSlugs: ['trading', 'construction', 'transportation'],
  },

  {
    slug: 'hotel',
    industry: 'Hotel and Hospitality',
    tagline: 'Manage room revenue, occupancy, and hotel operations by the numbers',
    heroDescription: 'Free Excel templates for Nigerian hotels and hospitality businesses. Track room bookings, daily revenue, operational expenses, staff payroll, and occupancy rates.',
    seoTitle: 'Free Hotel Management Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian hotels. Includes Room Booking Tracker, Daily Revenue Report, Hotel Expense Tracker, Staff Payroll Sheet, and Occupancy Rate Dashboard.',
    available: false,
    accentBg: 'bg-purple-50',
    accentBorder: 'border-purple-200',
    accentIcon: 'bg-purple-100',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    files: [
      { name: 'Room Booking Tracker', description: 'Record all bookings with check-in, check-out, room type, rate, and payment status in one place.', filename: null, available: false, features: ['Guest name, room, and booking dates', 'Room type and rate per night', 'Total charge and payment status', 'Advance deposit tracking', 'Cancellation and no-show recording'], useCase: 'A 30-room hotel in Benin City uses this to brief the front desk every morning on expected arrivals and departures and to reconcile the previous night\'s revenue.', previewColumns: ['Guest Name', 'Room', 'Check-In', 'Check-Out', 'Nights', 'Rate/Night (₦)', 'Total (₦)', 'Status'], previewRows: [['Emeka Okonkwo', '104', '02-May', '05-May', '3', '18,000', '54,000', 'Paid'], ['Aisha Bello', '201', '03-May', '06-May', '3', '32,000', '96,000', 'Pending'], ['GTBank Corporate', '305', '04-May', '08-May', '4', '55,000', '220,000', 'Paid']] },
      { name: 'Daily Revenue Report', description: 'Summarise all revenue streams daily: room sales, bar, restaurant, and other income categories.', filename: null, available: false, features: ['Revenue by department: rooms, F&B, services', 'Daily totals and month-to-date running total', 'Comparison against budget and prior period', 'Cash vs transfer vs POS breakdown', 'Daily RevPAR (revenue per available room) calculation'], useCase: 'The general manager reviews this report every morning to see if the hotel hit its daily revenue target. When midweek revenue consistently falls short, it informs decisions on corporate rate promotions.', previewColumns: ['Revenue Category', 'Today (₦)', 'This Week (₦)', 'This Month (₦)', 'Budget MTD (₦)', 'Variance (₦)'], previewRows: [['Room Revenue', '285,000', '1,620,000', '6,840,000', '7,500,000', '-660,000'], ['Bar and Restaurant', '94,500', '520,000', '2,180,000', '2,000,000', '180,000'], ['Laundry / Services', '12,000', '68,000', '290,000', '300,000', '-10,000']] },
      { name: 'Hotel Expense Tracker', description: 'Record and categorise all hotel operating costs with monthly budget comparison.', filename: null, available: false, features: ['Expense categories by department', 'Monthly budget vs actual per category', 'Year-to-date expense tracking', 'Supplier and invoice reference per entry', 'Cost per occupied room analysis'], useCase: 'A boutique hotel uses this to contain laundry costs, which were running 60% over budget. The tracker showed the issue was outsourced linen cleaning volume. The fix: bring linen washing in-house.', previewColumns: ['Category', 'This Month (₦)', 'Budget (₦)', 'YTD Actual (₦)', 'YTD Budget (₦)'], previewRows: [['Salaries and Wages', '1,850,000', '1,850,000', '7,400,000', '7,400,000'], ['Utilities (EKEDC + Generator)', '480,000', '400,000', '2,040,000', '1,600,000'], ['Laundry and Housekeeping', '210,000', '130,000', '980,000', '520,000']] },
      { name: 'Staff Payroll Sheet', description: 'Compute monthly payroll for all hotel departments with automatic PAYE, allowances, and net pay.', filename: null, available: false, features: ['All departments: front desk, housekeeping, F&B, maintenance', 'Shift allowances and service charge inclusion', 'PAYE deduction under current bands', 'Net pay per staff', 'Total payroll cost by department'], useCase: 'A 45-room hotel with 62 staff across 6 departments uses this monthly. The department-level payroll summary shows which department\'s labour costs are growing, enabling proactive roster management.', previewColumns: ['Staff Name', 'Department', 'Gross (₦)', 'Service Charge (₦)', 'PAYE (₦)', 'Net Pay (₦)'], previewRows: [['Chidi Okonkwo', 'Front Desk', '125,000', '18,500', '7,650', '135,850'], ['Mrs. Fatima Hassan', 'Housekeeping', '95,000', '14,200', '3,960', '105,240'], ['Mr. Seun Adeyemi', 'F&B Supervisor', '160,000', '22,000', '16,500', '165,500']] },
      { name: 'Occupancy Rate Dashboard', description: 'Track daily, weekly, and monthly occupancy rates. Compare actual vs target occupancy by room type and spot seasonal patterns.', filename: null, available: false, features: ['Daily occupancy % by room type', 'Weekly and monthly averages', 'Revenue per available room (RevPAR)', 'Occupancy vs same period last year', 'Target vs actual with variance'], useCase: 'An Abuja hotel owner uses the monthly occupancy dashboard in board meetings to demonstrate performance trends and justify capital expenditure decisions on room upgrades.', previewColumns: ['Period', 'Rooms Available', 'Rooms Sold', 'Occupancy %', 'Target %', 'RevPAR (₦)'], previewRows: [['Week 17 (28 Apr)', '30', '22', '73.3%', '75%', '13,200'], ['Week 18 (05 May)', '30', '26', '86.7%', '75%', '17,333'], ['Month of April', '900', '618', '68.7%', '72%', '12,380']] },
    ],
    educationalTitle: 'The Financial Numbers Every Nigerian Hotel Owner Must Track Daily',
    educationalParagraphs: [
      'Hotel management in Nigeria is a high-overhead business where daily revenue visibility is not optional. A hotel carries fixed costs including staff salaries, utilities, loan repayments, and property maintenance that do not reduce when occupancy is low. The only way to manage this successfully is through disciplined daily financial tracking.',
      'Occupancy rate is the single most important metric for any hotel operation. Understanding your occupancy patterns — which days of the week, which months of the year — allows you to set rates dynamically and manage staffing costs intelligently.',
    ],
    relatedSlugs: ['rental', 'school', 'entertainment'],
  },

  {
    slug: 'rental',
    industry: 'Rental Property',
    tagline: 'Track your tenants, rent, and property income with clarity',
    heroDescription: 'Free Excel templates for Nigerian property landlords and rental businesses. Manage rent collection by tenant, track property expenses, monitor vacant units, and calculate your real returns.',
    seoTitle: 'Free Rental Property Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian property landlords. Includes Rent Collection Tracker, Tenant Ledger, Property Expense Tracker, Vacancy Tracker, and Property ROI Calculator.',
    available: false,
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',
    accentIcon: 'bg-teal-100',
    iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    files: [
      { name: 'Rent Collection Tracker', description: 'Track all rent payments by unit and tenant. See who is current, who is owing, and total portfolio collection rate.', filename: null, available: false, features: ['Per-unit, per-tenant payment tracking', 'Annual rent schedule vs collected', 'Outstanding balance and days overdue', 'Payment method recording', 'Portfolio-level collection summary'], useCase: 'A landlord with 18 units across 3 properties uses this to produce a monthly rent statement. The outstanding balances view identified 4 tenants whose arrears had quietly grown to over ₦600,000 combined.', previewColumns: ['Tenant Name', 'Unit', 'Annual Rent (₦)', 'Last Payment', 'Paid (₦)', 'Balance (₦)', 'Status'], previewRows: [['Oluwaseun Adeyemi', 'Flat 2A', '480,000', 'Jan 2026', '480,000', '0', 'Current'], ['Fatima Suleiman', 'Flat 3B', '360,000', 'Oct 2025', '180,000', '180,000', 'Owing'], ['Kingsley Eze', 'Shop 1', '720,000', 'Mar 2026', '720,000', '0', 'Current']] },
      { name: 'Tenant Ledger', description: 'Complete transaction history per tenant including rent charges, payments, outstanding balance, and all correspondence dates.', filename: null, available: false, features: ['Chronological transaction list per tenant', 'Running balance after each transaction', 'Advance rent and deposit tracking', 'Notice and renewal dates', 'Dispute resolution reference trail'], useCase: 'A property manager uses the tenant ledger as the official record in any dispute about payment history. Having an auditable record prevented two potential legal disputes in one year.', previewColumns: ['Date', 'Description', 'Charge (₦)', 'Payment (₦)', 'Balance (₦)'], previewRows: [['01-Jan-26', 'Annual Rent — 2026', '480,000', '—', '480,000'], ['05-Jan-26', 'Payment received', '—', '480,000', '0'], ['01-Apr-26', 'Late payment fee', '15,000', '—', '15,000']] },
      { name: 'Property Expense Tracker', description: 'Record all property-related costs by property and category to see the real net income from your portfolio.', filename: null, available: false, features: ['Expenses by property and category', 'Repairs, rates, agency fees, insurance tracked', 'Monthly and annual expense totals per property', 'Cost comparison across properties', 'Net rental income after expenses'], useCase: 'A landlord discovered that one property was generating 40% lower net income than another of similar value — purely because of higher repair frequency. This drove a decision to carry out comprehensive maintenance on that property.', previewColumns: ['Property', 'Category', 'Description', 'Date', 'Amount (₦)'], previewRows: [['Victoria Close No. 5', 'Repairs', 'Plumbing — kitchen leak', '04-May', '45,000'], ['Victoria Close No. 5', 'Rates', 'Ground rent — 2026', '02-Jan', '120,000'], ['Ikeja Commercial', 'Agency Fee', 'New tenant — 2yr lease', '15-Mar', '180,000']] },
      { name: 'Vacancy Tracker', description: 'Monitor vacant units across your portfolio. Track how long each unit has been empty and estimate income lost.', filename: null, available: false, features: ['All units listed with current occupancy status', 'Date last vacated and days vacant', 'Expected income lost per vacant unit', 'Reason for vacancy', 'Time-to-relet tracking'], useCase: 'A property developer with 32 commercial units uses this to prioritise marketing effort on units that have been vacant longest, rather than cycling back to recently vacated ones.', previewColumns: ['Unit', 'Type', 'Date Vacated', 'Days Vacant', 'Monthly Rent (₦)', 'Income Lost (₦)', 'Status'], previewRows: [['Shop 4B', 'Commercial', '02-Feb', '90', '95,000', '285,000', 'Marketing'], ['Flat 6C', 'Residential', '15-Apr', '18', '45,000', '27,000', 'Viewing Scheduled'], ['Office Suite 2', 'Commercial', '01-Jan', '122', '180,000', '732,000', 'Under Renovation']] },
      { name: 'Property ROI Calculator', description: 'Calculate the true annual return on investment for each property after all income and expenses are accounted for.', filename: null, available: false, features: ['Purchase price and current market value', 'Annual rental income by property', 'All annual expenses deducted', 'Net yield and total return calculation', 'Portfolio-level ROI summary'], useCase: 'An investor reviewing their 5-property portfolio used this calculator to discover that their highest-value property had the lowest net yield (4.1%) due to high maintenance costs, informing a decision to sell and redeploy capital.', previewColumns: ['Property', 'Purchase Price (₦)', 'Annual Rent (₦)', 'Annual Expenses (₦)', 'Net Income (₦)', 'Net Yield %'], previewRows: [['Victoria Close No. 5', '25,000,000', '1,920,000', '640,000', '1,280,000', '5.1%'], ['Ikeja Commercial', '42,000,000', '2,880,000', '580,000', '2,300,000', '5.5%'], ['Lekki Flat Block', '68,000,000', '3,840,000', '1,850,000', '1,990,000', '2.9%']] },
    ],
    educationalTitle: 'How Nigerian Landlords Can Manage Multiple Properties Without Losing Track of Rent',
    educationalParagraphs: [
      'Rental property investment is one of the most popular wealth-building strategies in Nigeria, but it is also one of the most poorly managed from a financial perspective. Most Nigerian landlords with more than two or three properties are managing their rental income informally — through memory, bank alerts, and occasional conversations with tenants — rather than through a systematic record.',
      'Property expense tracking is where most Nigerian property owners fail to see the real picture of their returns. Roof repairs, repainting between tenancies, and agency fees are all legitimate costs of ownership. Without capturing these costs systematically, the net return from your property portfolio is essentially unknowable.',
    ],
    relatedSlugs: ['hotel', 'trading', 'construction'],
  },

  {
    slug: 'law-firm',
    industry: 'Law Firms',
    tagline: 'Track billable time, client fees, and case expenses professionally',
    heroDescription: 'Free Excel templates for Nigerian law firms and legal practitioners. Manage client billing, track case expenses, record time against matters, and monitor accounts receivable across your practice.',
    seoTitle: 'Free Law Firm Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian law firms. Includes Client Billing Tracker, Case Expense Tracker, Time Tracking Sheet, Invoice Generator, and Accounts Receivable Tracker.',
    available: false,
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentIcon: 'bg-indigo-100',
    iconPath: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    files: [
      { name: 'Client Billing Tracker', description: 'Track all fees raised per client and matter with outstanding balance and collection rate analysis.', filename: null, available: false, features: ['Fees raised per client per matter', 'Amounts paid and outstanding balances', 'Days outstanding per invoice', 'Collection rate by client', 'Practice-level AR summary'], useCase: 'A 6-partner law firm uses this to review outstanding fee notes every fortnight. The 90-day+ bucket highlighted ₦8.2M in potentially uncollectable fees that were then escalated to formal demand letters.', previewColumns: ['Client', 'Matter', 'Fee Raised (₦)', 'Date Billed', 'Paid (₦)', 'Balance (₦)', 'Days Outstanding'], previewRows: [['Dangote Holdings', 'Company Restructuring', '2,500,000', '15-Jan', '2,500,000', '0', '—'], ['Mr. B. Adewale', 'Property Dispute', '850,000', '20-Feb', '425,000', '425,000', '72'], ['PharmaPlus Nigeria', 'Contract Review', '380,000', '10-Mar', '0', '380,000', '53']] },
      { name: 'Case Expense Tracker', description: 'Record all disbursements and expenses incurred on each matter for accurate recovery from clients.', filename: null, available: false, features: ['Filing fees, travel, and disbursements per matter', 'Recoverable vs non-recoverable expense flags', 'Total disbursements per matter', 'Client approval status for large expenses', 'Monthly disbursement summary'], useCase: 'A litigation practice discovered it was recovering only 60% of its disbursements because unrecorded small expenses (courier, photocopying, searches) were absorbed by the firm. This sheet recovered an additional ₦1.8M in the first year.', previewColumns: ['Matter', 'Date', 'Expense Type', 'Description', 'Amount (₦)', 'Recoverable', 'Status'], previewRows: [['Adewale — Property', '04-May', 'Filing Fee', 'Court registry — originating summons', '35,000', 'Yes', 'To Bill'], ['PharmaPlus — Contract', '03-May', 'Travel', 'Lagos — Abuja — client meeting', '85,000', 'Yes', 'Billed'], ['Okonkwo Estate', '02-May', 'Search Fee', 'Land registry search', '12,500', 'Yes', 'To Bill']] },
      { name: 'Time Tracking Sheet', description: 'Log billable hours per matter per day to ensure accurate billing and prevent time leakage.', filename: null, available: false, features: ['Daily time entries per fee earner', 'Matter reference and task description', 'Billable hours vs non-billable time', 'Value at standard billing rate per entry', 'Weekly utilisation rate per fee earner'], useCase: 'A busy commercial practice found that fee earners were writing off an average of 1.8 hours per day in time that was worked but not captured. Implementing daily time recording added ₦4.2M to annual billings.', previewColumns: ['Date', 'Fee Earner', 'Matter', 'Task', 'Hours', 'Rate (₦/hr)', 'Value (₦)'], previewRows: [['05-May', 'Amaka Obi (Associate)', 'Dangote — M&A', 'Document review — SPA', '3.5', '45,000', '157,500'], ['05-May', 'Emeka Nweke (Partner)', 'PharmaPlus — Contract', 'Client call + advice note', '1.5', '85,000', '127,500'], ['05-May', 'Amaka Obi (Associate)', 'Adewale — Property', 'Research — land title issues', '2.0', '45,000', '90,000']] },
      { name: 'Invoice Generator', description: 'Generate professional fee notes from time records and disbursements with automatic totals and VAT.', filename: null, available: false, features: ['Fee note layout with firm letterhead fields', 'Line items from time records', 'Disbursements added separately', 'VAT at 7.5% on applicable items', 'Unique invoice number auto-generation'], useCase: 'A sole practitioner uses this to produce fee notes in under 10 minutes by pulling time records into the invoice template. Professional presentation improved prompt payment rates significantly.', previewColumns: ['Description', 'Hours', 'Rate (₦)', 'Amount (₦)'], previewRows: [['Professional services — SPA review and advice', '8.5', '45,000', '382,500'], ['Attendance at completion meeting', '4.0', '45,000', '180,000'], ['Disbursements: filing fee, travel, searches', '—', '—', '132,500']] },
      { name: 'Accounts Receivable Tracker', description: 'Monitor all outstanding fee notes with aging analysis to prioritise collection efforts.', filename: null, available: false, features: ['All outstanding fee notes in one view', 'Aging buckets: 0-30, 31-60, 61-90, 90+ days', 'Collection priority flagging', 'Follow-up date tracking', 'Estimated uncollectable provisions'], useCase: 'The accounts manager of a commercial law firm uses the aging analysis to prepare a weekly collection report for partners. Focus on the 60-90 day bucket reduced average collection days from 74 to 48 over 6 months.', previewColumns: ['Client', 'Fee Note', 'Amount (₦)', '0–30 Days', '31–60 Days', '61–90 Days', '90+ Days'], previewRows: [['Various — Current', 'Multiple', '4,200,000', '4,200,000', '—', '—', '—'], ['Various — Ageing', 'Multiple', '2,850,000', '—', '1,200,000', '850,000', '800,000'], ['Totals', '', '7,050,000', '4,200,000', '1,200,000', '850,000', '800,000']] },
    ],
    educationalTitle: 'Why Nigerian Law Firms Struggle With Cash Flow Despite High Fee Billings',
    educationalParagraphs: [
      'Law firms in Nigeria can generate substantial fee income and still face chronic cash flow problems. The reason is almost always the gap between fees raised and fees collected. A practice that bills ₦50 million annually but collects only 70 percent in the year it was earned is effectively operating at ₦35 million revenue.',
      'Time recording is the foundation of fair billing. Without capturing the hours spent on each matter, practitioners either underbill — leaving money on the table — or overbill — creating client disputes. A simple daily time log takes ten minutes and creates the basis for defensible, detailed fee notes.',
    ],
    relatedSlugs: ['rental', 'school', 'hospital'],
  },

  {
    slug: 'entertainment',
    industry: 'Entertainment and Events',
    tagline: 'Budget events accurately, track revenue, and protect your profit margin',
    heroDescription: 'Free Excel templates for Nigerian entertainment companies and event managers. Plan event budgets, track revenue, manage artist payments, record sponsorships, and monitor all event expenses.',
    seoTitle: 'Free Entertainment and Events Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian entertainment and events businesses. Includes Event Budget Planner, Revenue Tracker, Artist Payment Tracker, Sponsorship Tracker, and Event Expense Sheet.',
    available: false,
    accentBg: 'bg-pink-50',
    accentBorder: 'border-pink-200',
    accentIcon: 'bg-pink-100',
    iconPath: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    files: [
      { name: 'Event Budget Planner', description: 'Plan revenue and costs before the event. Track variance in real time as the event date approaches.', filename: null, available: false, features: ['Revenue budget: tickets, gate, sponsorships, bar', 'Cost budget by category', 'Real-time budget vs actual variance', 'Profit projection as at current date', 'Pre-event vs post-event reconciliation'], useCase: 'An event promoter planning a 2,000-person concert uses this to track spend across 12 cost categories. When artist fees went over budget by ₦600,000, the planner showed the event was still profitable — preventing a panic decision to cut the sound system budget.', previewColumns: ['Category', 'Budgeted (₦)', 'Committed (₦)', 'Actual (₦)', 'Variance (₦)', 'Status'], previewRows: [['Venue Rental', '1,200,000', '1,200,000', '1,200,000', '0', 'On Budget'], ['Artist Fees', '3,500,000', '4,100,000', '4,100,000', '-600,000', 'Over Budget'], ['Ticket Revenue', '8,000,000', '—', '6,750,000', '-1,250,000', 'Under Target']] },
      { name: 'Revenue Tracker', description: 'Record all event revenue streams: ticket sales, gate collections, bar revenue, VIP packages, and other income.', filename: null, available: false, features: ['Revenue by stream: ticket, gate, bar, VIP, sponsors', 'Advance sales vs day-of-event collections', 'Channel breakdown: online, box office, agents', 'Running revenue total vs target', 'Post-event final revenue reconciliation'], useCase: 'A concert promoter discovered from post-event analysis that advance online ticket sales represented 35% of revenue while box office on the day was 55%. This changed the marketing timeline for the next event.', previewColumns: ['Revenue Stream', 'Target (₦)', 'Pre-Event (₦)', 'Day Of (₦)', 'Total (₦)', 'vs Target'], previewRows: [['General Tickets', '4,000,000', '1,380,000', '2,190,000', '3,570,000', '-430,000'], ['VIP / Table Sales', '2,000,000', '2,000,000', '0', '2,000,000', '0'], ['Bar Revenue', '1,500,000', '—', '1,820,000', '1,820,000', '+320,000']] },
      { name: 'Artist Payment Tracker', description: 'Manage all performer fees, advance payments, balances due, and performance agreements in one place.', filename: null, available: false, features: ['Agreed fee per artist', 'Advance paid and balance due', 'Performance date and requirements', 'Cancellation terms recorded', 'Total artist cost vs budget'], useCase: 'An event company managing 8 performers across one weekend uses this to ensure advances are paid on schedule and balances are ready for settlement on the night. It prevents last-minute performance disputes over payment.', previewColumns: ['Artist / Act', 'Agreed Fee (₦)', 'Advance Paid (₦)', 'Balance Due (₦)', 'Performance Date', 'Status'], previewRows: [['Afrobeat Band (headline)', '1,500,000', '750,000', '750,000', '10-May', 'Confirmed'], ['MC Lagos', '350,000', '175,000', '175,000', '10-May', 'Confirmed'], ['Opening DJ', '200,000', '0', '200,000', '10-May', 'Pending Contract']] },
      { name: 'Sponsorship Tracker', description: 'Track all sponsor commitments, amounts received, deliverables owed, and outstanding balances.', filename: null, available: false, features: ['Sponsor name, package, and value', 'Amount received and balance outstanding', 'Deliverables list and completion status', 'Contract signed confirmation', 'Post-event sponsor report data'], useCase: 'A music festival with 6 sponsors used this to ensure all activation obligations were met before chasing final payments. It protected sponsor relationships while ensuring ₦4.5M in committed sponsorship was fully collected.', previewColumns: ['Sponsor', 'Package', 'Value (₦)', 'Received (₦)', 'Balance (₦)', 'Deliverables Status'], previewRows: [['MTN Nigeria', 'Title Sponsor', '3,000,000', '1,500,000', '1,500,000', '70% Complete'], ['Access Bank', 'Gold Sponsor', '1,200,000', '1,200,000', '0', 'Complete'], ['Coca-Cola', 'Beverage Partner', '800,000', '0', '800,000', 'Pending Activation']] },
      { name: 'Event Expense Sheet', description: 'Record all event expenditure by category with real-time comparison against the approved budget.', filename: null, available: false, features: ['Expenses by category: venue, tech, staffing, marketing', 'Invoice reference and supplier per expense', 'Actual vs budget per line item', 'Petty cash and cash expenses tracked', 'Post-event total cost of delivery report'], useCase: 'A production company records every expense the moment it is incurred rather than reconciling at the end. This discipline caught a duplicate payment for stage equipment rental — ₦180,000 recovered from the supplier the same day.', previewColumns: ['Category', 'Supplier', 'Description', 'Invoice Ref', 'Amount (₦)', 'Budget (₦)'], previewRows: [['Venue', 'Eko Hotels', 'Ballroom rental — full day', 'EKO-2042', '1,200,000', '1,200,000'], ['AV & Sound', 'Lagos Sound Pro', 'PA system + lighting rig', 'LSP-0881', '850,000', '900,000'], ['Catering (Staff)', 'Mama Cass Catering', 'Staff meals — 2 days', 'MCC-0115', '95,000', '80,000']] },
    ],
    educationalTitle: 'Why Most Nigerian Event Businesses Run at a Loss Without Knowing It',
    educationalParagraphs: [
      'Event production is one of the most financially unpredictable businesses in Nigeria. Revenue depends on ticket sales that may not reach projections, while costs escalate as the event date approaches. Without a real-time budget tracker, event producers often discover they have made a loss only after all bills have been settled.',
      'Artist and performer fee management is a particularly sensitive area. Advance payments are standard in the Nigerian entertainment industry, and managing these advances — tracking what has been paid, what is still due, and what the agreed deliverables are — requires a clear, written record rather than phone conversations.',
    ],
    relatedSlugs: ['hotel', 'trading', 'school'],
  },

  {
    slug: 'hospital',
    industry: 'Hospital and Healthcare',
    tagline: 'Manage patient billing, pharmacy inventory, and healthcare finances',
    heroDescription: 'Free Excel templates for Nigerian hospitals, clinics, and healthcare providers. Track patient billing, manage pharmacy inventory, compute staff payroll, record expenses, and schedule appointments.',
    seoTitle: 'Free Hospital and Healthcare Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian hospitals and clinics. Includes Patient Billing System, Pharmacy Inventory Tracker, Hospital Staff Payroll, Hospital Expense Tracker, and Patient Appointment Log.',
    available: false,
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-200',
    accentIcon: 'bg-red-100',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    files: [
      { name: 'Patient Billing System', description: 'Generate patient invoices for consultations, procedures, and drugs. Track payments and outstanding balances per patient file.', filename: null, available: false, features: ['Billing by consultation, procedure, and pharmacy', 'HMO and NHIS tracking separate from direct billing', 'Outstanding balance per patient', 'Daily revenue reconciliation', 'Debtor aging for overdue patient accounts'], useCase: 'A private clinic in Kano uses this to produce patient invoices at the point of discharge. Outstanding balances are reviewed weekly, reducing the average collection period from 38 days to 19 days.', previewColumns: ['Patient Name', 'File No.', 'Consultation (₦)', 'Drugs (₦)', 'Procedure (₦)', 'Total (₦)', 'Paid (₦)', 'Balance (₦)'], previewRows: [['Mrs. Chidinma Okafor', 'P-00891', '5,000', '12,500', '0', '17,500', '17,500', '0'], ['Mr. Hakeem Balogun', 'P-00892', '5,000', '8,200', '45,000', '58,200', '20,000', '38,200'], ['Miss Amina Yusuf', 'P-00893', '3,500', '4,800', '0', '8,300', '8,300', '0']] },
      { name: 'Pharmacy Inventory Tracker', description: 'Monitor drug stock levels, expiry dates, reorder points, and pharmacy revenue against cost of dispensing.', filename: null, available: false, features: ['Stock quantities by drug and formulation', 'Expiry date and batch number tracking', 'Reorder level alerts', 'FIFO dispensing cost calculation', 'Monthly pharmacy revenue and gross margin'], useCase: 'A pharmacy manager identified 14 drug lines with expiry dates within 60 days, enabling a targeted disposal and replacement process before the drugs became a write-off liability.', previewColumns: ['Drug', 'Formulation', 'Qty in Stock', 'Reorder Level', 'Expiry Date', 'Unit Cost (₦)', 'Status'], previewRows: [['Amoxicillin', '500mg caps × 100', '48 packs', '10 packs', 'Dec 2027', '2,800', 'Adequate'], ['Metformin', '500mg tabs × 100', '8 packs', '15 packs', 'Jun 2026', '1,450', 'Reorder'], ['IV Fluid 0.9% NaCl', '500ml bag', '120 bags', '50 bags', 'Aug 2026', '850', 'Adequate']] },
      { name: 'Hospital Staff Payroll', description: 'Compute monthly payroll for all healthcare staff categories with PAYE, allowances, and net pay.', filename: null, available: false, features: ['Staff categories: consultants, nurses, pharmacists, support', 'Call duty and shift allowances', 'PAYE and pension deductions', 'Net pay per staff member', 'Department-level payroll cost summary'], useCase: 'The HR manager of a 60-bed private hospital uses this for 78 staff across 8 departments. The department summary shows that clinical payroll is within budget but admin staffing costs have grown 22% year-on-year.', previewColumns: ['Staff Name', 'Category', 'Basic (₦)', 'Call Allowance (₦)', 'PAYE (₦)', 'Net Pay (₦)'], previewRows: [['Dr. Emeka Obi', 'Consultant', '650,000', '120,000', '155,250', '614,750'], ['Nurse Grace Adeyemi', 'Senior Nurse', '180,000', '35,000', '19,875', '195,125'], ['Mr. Bola Adesanya', 'Lab Scientist', '220,000', '25,000', '28,875', '216,125']] },
      { name: 'Hospital Expense Tracker', description: 'Record and categorise all hospital operating costs to compare against budget and identify where costs are growing.', filename: null, available: false, features: ['Expenses by department and category', 'Medical supplies vs admin costs separated', 'Monthly budget vs actual comparison', 'Generator fuel and utility cost tracking', 'Year-to-date expense totals for financial statements'], useCase: 'A clinic used this to discover that generator fuel costs had increased 85% year-on-year due to increased power outages. The data supported a business case for solar installation that would save ₦3.2M annually.', previewColumns: ['Category', 'This Month (₦)', 'Budget (₦)', 'YTD (₦)', 'YTD Budget (₦)'], previewRows: [['Medical Consumables', '380,000', '350,000', '1,720,000', '1,750,000'], ['Generator Fuel', '185,000', '120,000', '940,000', '600,000'], ['Staff Salaries', '4,200,000', '4,200,000', '16,800,000', '16,800,000']] },
      { name: 'Patient Appointment Log', description: 'Schedule and track patient appointments by doctor and department. Identify no-shows and ensure revenue-generating slots are maximised.', filename: null, available: false, features: ['Daily appointment schedule by doctor', 'Patient name, contact, and complaint', 'Attendance status: attended, no-show, rescheduled', 'Revenue per appointment slot', 'No-show rate analysis by doctor and day'], useCase: 'A specialist clinic found a 28% no-show rate for Monday morning appointments. Implementing SMS reminders (tracked in this log) reduced the rate to 11% and recovered approximately ₦640,000 in monthly consultation revenue.', previewColumns: ['Time', 'Patient Name', 'Doctor', 'Department', 'Purpose', 'Status'], previewRows: [['09:00', 'Mrs. Funke Oladele', 'Dr. Adeyemi', 'Gynaecology', 'Follow-up', 'Attended'], ['09:30', 'Mr. Tunde Bakare', 'Dr. Okonkwo', 'General', 'New consultation', 'No Show'], ['10:00', 'Miss Zara Ahmed', 'Dr. Adeyemi', 'Gynaecology', 'Scan review', 'Attended']] },
    ],
    educationalTitle: 'The Financial Management Challenges Unique to Nigerian Healthcare Providers',
    educationalParagraphs: [
      'Healthcare is one of the few industries where the service is often delivered before payment is confirmed. Whether due to emergency care situations, NHIS and HMO billing cycles, or informal credit arrangements, Nigerian hospitals and clinics frequently have significant outstanding patient balances. Without a systematic patient billing record, collections become reactive rather than managed.',
      'Pharmacy inventory management has both a financial and a regulatory dimension. Expired drugs represent a direct financial loss and a compliance liability. A pharmacy inventory tracker that records expiry dates alongside stock levels provides the data needed for both financial control and regulatory compliance.',
    ],
    relatedSlugs: ['school', 'law-firm', 'trading'],
  },

  {
    slug: 'transportation',
    industry: 'Transportation and Logistics',
    tagline: 'Track your fleet, fuel, drivers, and trip income with precision',
    heroDescription: 'Free Excel templates for Nigerian transportation and logistics businesses. Manage your fleet maintenance, monitor fuel consumption, compute driver payroll, track trip income, and schedule vehicle servicing.',
    seoTitle: 'Free Transportation and Logistics Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian transport businesses. Includes Fleet Management Tracker, Fuel Consumption Log, Driver Payroll Sheet, Trip Income Tracker, and Vehicle Maintenance Log.',
    available: false,
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    accentIcon: 'bg-orange-100',
    iconPath: 'M8 17a5 5 0 01-.916-9.916 5 5 0 016.823-5.941 5.5 5.5 0 0110.031 1.858A4.002 4.002 0 0116 17H8z',
    files: [
      { name: 'Fleet Management Tracker', description: 'Monitor all vehicles: registration, assigned driver, status, insurance, and last service date in one dashboard.', filename: null, available: false, features: ['All vehicles with registration and type', 'Current status: active, in maintenance, off road', 'Insurance and roadworthiness expiry dates', 'Assigned driver per vehicle', 'Vehicle age and mileage tracking'], useCase: 'A logistics company with 18 trucks uses this to brief the fleet manager every morning. Insurance expiry tracking alone prevented one vehicle from operating uninsured — a risk that could have cost the company its operating licence.', previewColumns: ['Vehicle Reg.', 'Type', 'Driver', 'Status', 'Insurance Expiry', 'Last Service', 'Mileage'], previewRows: [['LSD 345 AB', 'Rigid Truck 10T', 'Musa Aliyu', 'Active', '30-Sep-26', '15-Mar', '284,500 km'], ['ABJ 112 XC', 'Pickup Van', 'Emeka Nwoke', 'In Maintenance', '28-Feb-26', '02-May', '142,800 km'], ['RIV 789 ZZ', 'Articulated 30T', 'Alhaji Garba', 'Active', '31-Jul-26', '01-Apr', '512,000 km']] },
      { name: 'Fuel Consumption Log', description: 'Record all fuel purchases per vehicle and calculate litres per kilometre to detect inefficiency or misuse.', filename: null, available: false, features: ['Fuel purchased by date, vehicle, and location', 'Litres per 100km efficiency calculation', 'Fuel cost per trip and per month by vehicle', 'Abnormal consumption alerts', 'Total monthly fuel spend by fleet'], useCase: 'A haulage company discovered that one truck was consuming 28% more fuel than similar vehicles on identical routes. Investigation revealed a fuel injector fault. Fixing it saved ₦85,000 per month in fuel costs for that one vehicle alone.', previewColumns: ['Date', 'Vehicle Reg.', 'Fuel Station', 'Litres', 'Cost/Litre (₦)', 'Total Cost (₦)', 'Mileage at Fill'], previewRows: [['03-May', 'LSD 345 AB', 'Oando — Apapa', '200 L', '820', '164,000', '284,780'], ['03-May', 'RIV 789 ZZ', 'MRS — Mile 2', '350 L', '825', '288,750', '512,320'], ['04-May', 'ABJ 112 XC', 'NIPCO — Ikeja', '60 L', '822', '49,320', '143,010']] },
      { name: 'Driver Payroll Sheet', description: 'Calculate driver earnings based on trips, commissions, bonuses, and deductions.', filename: null, available: false, features: ['Trip-based earnings calculation', 'Fixed base salary component', 'Trip allowances and per diem', 'Deductions: advance recovery, penalties', 'Net pay and total payroll cost per driver'], useCase: 'A logistics firm with 22 drivers switched from informal cash payments to this structured payroll sheet. Payment disputes dropped immediately because every figure was documented and agreed in advance.', previewColumns: ['Driver Name', 'Trips Completed', 'Base Pay (₦)', 'Trip Allowance (₦)', 'Deductions (₦)', 'Net Pay (₦)'], previewRows: [['Musa Aliyu', '8', '80,000', '96,000', '15,000', '161,000'], ['Emeka Nwoke', '6', '80,000', '72,000', '0', '152,000'], ['Alhaji Garba (Senior)', '5', '120,000', '100,000', '20,000', '200,000']] },
      { name: 'Trip Income Tracker', description: 'Record all trips completed with route, freight, agreed rate, amount billed, and amount collected.', filename: null, available: false, features: ['Trip details: route, freight type, client', 'Agreed rate and amount billed', 'Amount collected and outstanding balance', 'Monthly trip income summary by vehicle', 'Profitability per route analysis'], useCase: 'A transport company identified that the Lagos–Kano route had a 91% collection rate while the Lagos–PH route had only 68%. Investigating the PH route revealed two clients who were systematically delaying payment — both were put on advance-payment-only terms.', previewColumns: ['Date', 'Vehicle', 'Driver', 'Route', 'Rate (₦)', 'Billed (₦)', 'Collected (₦)', 'Balance (₦)'], previewRows: [['01-May', 'LSD 345 AB', 'Musa Aliyu', 'Lagos → Kano', '280,000', '280,000', '280,000', '0'], ['02-May', 'ABJ 112 XC', 'Emeka Nwoke', 'Lagos → PH', '195,000', '195,000', '100,000', '95,000'], ['03-May', 'LSD 345 AB', 'Musa Aliyu', 'Kano → Lagos (return)', '45,000', '45,000', '45,000', '0']] },
      { name: 'Vehicle Maintenance Log', description: 'Track all maintenance and repairs per vehicle with costs, next service dates, and downtime history.', filename: null, available: false, features: ['Service type, date, and cost per vehicle', 'Next scheduled service due date', 'Downtime days and reason per incident', 'Cumulative maintenance cost per vehicle', 'Maintenance cost as % of revenue per vehicle'], useCase: 'A fleet operator uses the cumulative maintenance cost column to make replace-vs-repair decisions. When one truck\'s annual maintenance costs exceeded 35% of its revenue, the decision to retire it was data-driven rather than emotional.', previewColumns: ['Vehicle Reg.', 'Service Type', 'Date', 'Workshop', 'Cost (₦)', 'Next Due', 'Downtime Days'], previewRows: [['LSD 345 AB', 'Engine service + oil change', '15-Mar', 'ABC Motors', '85,000', '15-Jun', '1'], ['RIV 789 ZZ', 'Tyre replacement × 4', '22-Apr', 'Michelin Dealer', '420,000', 'On Condition', '0'], ['ABJ 112 XC', 'Gearbox repair', '02-May', 'DEF Mechanics', '280,000', '02-Aug', '5']] },
    ],
    educationalTitle: 'The Hidden Financial Drains in Nigerian Transportation Businesses',
    educationalParagraphs: [
      'Fleet businesses in Nigeria face a unique financial challenge: high fixed costs combined with highly variable revenue. A truck that is off the road for two weeks for maintenance still carries financing costs, insurance, and driver salary commitments. The businesses that manage these economics well are the ones that track vehicle utilisation, maintenance costs, and trip profitability with enough precision to make timely decisions.',
      'Fuel is typically the largest operating cost in a transportation business, often representing 35 to 45 percent of total expenses. Yet most Nigerian fleet operators track fuel purchases informally, without linking each purchase to a specific trip or vehicle. This makes it impossible to detect abnormal fuel consumption — a common signal of either vehicle engine problems or driver fuel theft.',
    ],
    relatedSlugs: ['manufacturing', 'construction', 'trading'],
  },

  {
    slug: 'agriculture',
    industry: 'Agriculture and Farming',
    tagline: 'Track farm finances from planting season through harvest and sale',
    heroDescription: 'Free Excel templates for Nigerian farmers and agribusinesses. Record farm expenses by season, track crop yields, manage livestock records, log farm sales, and plan seasonal budgets for the full agricultural cycle.',
    seoTitle: 'Free Agriculture and Farm Management Excel Templates for Nigeria | DigitGlance',
    seoDescription: 'Download free Excel templates for Nigerian farmers and agribusinesses. Includes Farm Expense Tracker, Crop Yield Record, Livestock Tracker, Farm Sales Tracker, and Seasonal Budget Planner.',
    available: false,
    accentBg: 'bg-lime-50',
    accentBorder: 'border-lime-200',
    accentIcon: 'bg-lime-100',
    iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    files: [
      { name: 'Farm Expense Tracker', description: 'Record all farm inputs by season and crop: seeds, fertilisers, pesticides, labour, equipment hire, and other operating costs.', filename: null, available: false, features: ['Expenses by crop and season', 'Input cost categories: seeds, fertiliser, labour, equipment', 'Supplier and purchase date per entry', 'Total cost per crop per season', 'Cost per hectare calculation'], useCase: 'A commercial maize farmer tracks input costs by field plot. Comparing cost-per-hectare across 4 plots revealed that one plot consistently required 30% more fertiliser for the same yield — pointing to a soil pH issue that was corrected with lime treatment.', previewColumns: ['Date', 'Crop', 'Input Type', 'Supplier', 'Quantity', 'Unit Cost (₦)', 'Total (₦)'], previewRows: [['04-May', 'Maize', 'NPK Fertiliser 50kg', 'Notore Chemical', '40 bags', '18,500', '740,000'], ['05-May', 'Maize', 'Hybrid Seed 5kg', 'Seedco Nigeria', '20 packs', '12,000', '240,000'], ['06-May', 'Cassava', 'Stems / Cuttings', 'IITA Certified', '5,000 stems', '150', '750,000']] },
      { name: 'Crop Yield Record', description: 'Track expected vs actual yield per hectare for each crop type and season to improve future planning.', filename: null, available: false, features: ['Hectares planted per crop variety', 'Expected yield based on seed type and conditions', 'Actual harvest yield per crop per plot', 'Revenue per kg at prevailing market price', 'Year-on-year yield comparison'], useCase: 'A rice farmer tracked yields across 3 varieties over 2 seasons. The data showed that FARO 44 consistently outperformed FARO 52 on their soil type by 18%, resulting in a variety switch that increased total farm revenue by ₦2.1M the following season.', previewColumns: ['Crop', 'Variety', 'Hectares', 'Expected Yield (kg)', 'Actual Yield (kg)', 'Price/kg (₦)', 'Revenue (₦)'], previewRows: [['Maize', 'DKC 8033', '10 ha', '25,000', '22,400', '180', '4,032,000'], ['Soybeans', 'TGX 1835', '5 ha', '8,000', '8,750', '420', '3,675,000'], ['Cassava', 'TME 419', '8 ha', '80,000', '74,500', '45', '3,352,500']] },
      { name: 'Livestock Tracker', description: 'Monitor livestock numbers, track births, deaths, and sales, and record feed and veterinary costs per livestock category.', filename: null, available: false, features: ['Opening and closing herd count by category', 'Births, deaths, and purchases recorded', 'Sales quantities and revenue', 'Feed and veterinary cost per category', 'Cost per animal analysis'], useCase: 'A poultry farmer tracking 8,000 broilers found that mortality in Week 3 was consistently higher than industry average. The data led to a veterinary review that identified a ventilation issue in one house, reducing mortality by 40%.', previewColumns: ['Livestock', 'Opening', 'Births/Additions', 'Deaths', 'Sales', 'Closing', 'Feed Cost (₦)'], previewRows: [['Broiler Chickens', '8,000', '0', '240', '0', '7,760', '1,850,000'], ['Catfish (1,000L pond)', '1,200', '0', '45', '500', '655', '185,000'], ['Goats', '35', '6', '2', '8', '31', '42,000']] },
      { name: 'Farm Sales Tracker', description: 'Record all produce sales by crop, buyer, quantity, unit price, and amount received or outstanding.', filename: null, available: false, features: ['Sales by crop and buyer', 'Quantity sold and price per kg/unit', 'Advance payments and outstanding balances', 'Seasonal sales summary', 'Best and worst performing buyers by payment rate'], useCase: 'A tomato farmer selling to 4 market buyers used this to discover that one buyer consistently paid 2 weeks late and another had a 95% advance payment rate. The tracker redirected supply allocation to favour the reliable buyer.', previewColumns: ['Date', 'Crop', 'Buyer', 'Qty (kg)', 'Price/kg (₦)', 'Total (₦)', 'Received (₦)', 'Balance (₦)'], previewRows: [['10-May', 'Maize (dry)', 'Kano Buyers Coop', '8,500', '195', '1,657,500', '1,657,500', '0'], ['12-May', 'Soybeans', 'CHI Ltd (feed)', '4,200', '420', '1,764,000', '882,000', '882,000'], ['15-May', 'Cassava (fresh)', 'Starch Factory', '22,000', '42', '924,000', '924,000', '0']] },
      { name: 'Seasonal Budget Planner', description: 'Plan income and expenditure for each farming season. Compare planned figures against actual performance at season end.', filename: null, available: false, features: ['Income budget by crop and expected yield', 'Input cost budget by category', 'Seasonal profit projection', 'Actual vs budget comparison at harvest', 'Multi-season trend analysis'], useCase: 'A commercial farmer planning expansion from 15 to 25 hectares uses the budget planner to confirm that working capital finance needs are met before committing to the additional acreage. It prevents overexpansion that could threaten the existing operation.', previewColumns: ['Category', 'Budget (₦)', 'Actual (₦)', 'Variance (₦)', 'Notes'], previewRows: [['Maize Revenue', '4,500,000', '4,032,000', '-468,000', 'Lower yield — drought week 6'], ['Soybean Revenue', '3,360,000', '3,675,000', '+315,000', 'Better than expected'], ['Total Input Costs', '3,800,000', '4,120,000', '-320,000', 'Fertiliser price increase']] },
    ],
    educationalTitle: 'Why Nigerian Farmers Cannot Scale Without Basic Financial Records',
    educationalParagraphs: [
      'Agriculture is the foundation of the Nigerian economy, yet most farmers operate without any formal financial records. This is not simply an administrative gap — it is a direct barrier to growth. Banks require financial records to evaluate loan applications. Input suppliers extend credit based on documented purchase and payment history.',
      'Seasonal cash flow management is the most critical financial skill in agriculture. A farmer planting in April does not receive income until harvest in September. The entire period between planting and harvest must be financed from reserves, loans, or advance sales agreements. Without a seasonal budget planner that maps out these cash needs in advance, unexpected shortfalls at critical stages of the growing season can result in lost harvests.',
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
