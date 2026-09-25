// Default content for a fresh install. Everything here can be edited later
// from the admin panel; this file only runs when data/db.json does not exist.
const crypto = require('crypto');
const { seedTheme } = require('./theme');

const uid = () => crypto.randomUUID();

function roadmapCourse() {
  return {
    id: uid(),
    slug: 'road-map-to-equity-research',
    title: 'Road Map to Equity Research',
    subtitle: 'From stock-market basics to a complete, institution-grade research report.',
    category: 'Core Programme',
    level: 'Beginner to Professional',
    price: 677,
    originalPrice: 0,
    duration: '11 recorded modules + career bonus',
    schedule: '',
    format: 'Recorded video lectures · learn at your own pace',
    image: '/images/course-roadmap.svg',
    summary:
      'An 11-module programme that teaches you how to analyse businesses, industries, financial statements and valuations, and finish by writing a full equity research report on P N Gadgil Jewellers.',
    description:
      'Most people think equity research needs a Bloomberg terminal and a ten-person team. It does not. You need a process.\n\n' +
      'This programme takes you step by step through the exact workflow an analyst uses: understand the business, study the industry, read annual reports and concalls, analyse the three financial statements, judge management, value the company and write the investment thesis.\n\n' +
      'Along the way we use examples from many industries, and the final case study is a complete sell-side style research report on **P N Gadgil Jewellers Limited**, covering industry analysis, business model, financials, peer comparison, valuation, risks and a Buy / Hold / Sell recommendation.',
    highlights: [
      '11 recorded modules + career roadmap bonus: watch anytime, as often as you like',
      'Real Indian case studies: Reliance, Tata, Satyam, Titan, Dixon, Deepak Nitrite, Yes Bank',
      'Annual report and concall decoding frameworks',
      'DCF, EV/EBITDA and P/E valuation models',
      'Sell-side report template you keep for life',
      'Capstone: full research report on PNG Jewellers',
    ],
    outcomes: [
      'Analyse any listed company from scratch',
      'Read annual reports and concall transcripts like an analyst',
      'Spot accounting and management red flags early',
      'Build a valuation and defend a price target',
      'Write a professional Buy / Hold / Sell research report',
      'Walk into equity research interviews with a finished report in your portfolio',
    ],
    modules: [
      {
        title: 'Stock Market Foundations',
        summary: 'How stock markets function and how analysts operate.',
        topics: ['Introduction to equity research', 'How stock markets work', 'Market participants: FIIs, DIIs, retail investors', 'Market cycles and wealth creation', 'How analysts research companies, with examples from Reliance Industries and HDFC Bank'],
      },
      {
        title: 'Understanding Businesses',
        summary: 'Stock ≠ ticker. Stock = business. How a company creates, delivers and captures value.',
        topics: ['The five questions: who is the customer, what problem, how it makes money, key costs, what drives growth', 'User vs payer: Google, Zomato, Apple, Titan examples', 'Value chain analysis', 'Competitive advantages (economic moats)', 'B2B vs B2C vs B2G and scalability of business models'],
      },
      {
        title: 'Industry Analysis',
        summary: 'Good company + bad industry = bad investment. The industry sets the profitability ceiling.',
        topics: ['Industry size, CAGR and market structure: monopoly, oligopoly, fragmented', 'Temporary vs structural growth drivers', "Porter's Five Forces: telecom, restaurants, chips, e-commerce, OTT examples", 'Government regulations as barriers and opportunities', 'Cyclical (steel, cement) vs structural (FMCG, pharma, IT) industries'],
      },
      {
        title: 'Reading Annual Reports & Concall Analysis',
        summary: 'Golden rule: an annual report is not a novel. Read it like an investigator.',
        topics: ['Annual report structure: MD&A, financials, notes to accounts, governance', 'Red flags: high receivables, other-income spikes, auditor issues, capitalised expenses', 'Concalls: guidance vs actual, tone, repeated phrases, avoided questions', "Decoding management language: 'short-term issue', 'under control'", 'Smart question framework: observation + concern + question'],
      },
      {
        title: 'Financial Statements',
        summary: 'Reading the P&L, balance sheet and cash flow together.',
        topics: ['Income statement analysis', 'Balance sheet analysis', 'Cash flow statement, the most important one', 'Working capital analysis', 'Free cash flow analysis'],
      },
      {
        title: 'Ratio Analysis',
        summary: 'Understanding company performance through ratios, and how to combine them.',
        topics: ['Liquidity: current and quick ratio', 'Profitability: gross, EBIT and net margin, ROE, ROCE', 'Efficiency: asset, inventory, receivable and payable turnover; cash conversion cycle', 'Leverage: debt/equity, interest coverage, debt/EBITDA', 'Valuation and cash-flow ratios: P/E, EV/EBITDA, P/B, FCF'],
      },
      {
        title: 'Management Analysis',
        summary: '"Can I trust this management with my money?"',
        topics: ['Promoter background: Asian Paints, Reliance', 'Corporate governance: Tata Group vs Satyam', 'Capital allocation: Titan vs Vodafone Idea; ROCE vs cost of capital', 'Promoter holding, pledging and insider selling', 'Management red flags: Yes Bank, DHFL case studies'],
      },
      {
        title: 'Valuation Techniques',
        summary: 'Valuation is not just the P/E ratio.',
        topics: ['P/E ratio', 'EV/EBITDA', 'Discounted Cash Flow (DCF)', 'Margin of safety'],
      },
      {
        title: 'Finding Multibagger Stocks',
        summary: 'Multibaggers come from specific triggers plus strong fundamentals. No trigger = no multibagger.',
        topics: ['Growth triggers: Dixon (PLI), KPIT (EV transition)', 'Capacity expansion: Deepak Nitrite', 'Market share gains: Asian Paints', 'Industry tailwinds: China+1, EVs, renewables', 'Small-cap vs large-cap: Cera Sanitaryware, HDFC'],
      },
      {
        title: 'Risk Analysis',
        summary: 'Investor survival: protecting capital is the first rule.',
        topics: ['Accounting manipulation', 'Debt risks', 'Cyclical risks', 'Business disruption', 'Macro risks'],
      },
      {
        title: 'Complete Equity Research Report',
        summary: 'Capstone: prepare a full sell-side style report on P N Gadgil Jewellers Limited.',
        topics: ['Building an investment thesis', 'Industry analysis, business model, financials, peer comparison, valuation and risks', 'Buy / Hold / Sell recommendation', 'Writing the report in the sell-side format'],
      },
      {
        title: 'Bonus: How to Become an Equity Research Analyst',
        summary: 'Career roadmap: jobs, skills and certifications.',
        topics: ['Roles: sell-side, buy-side, KPO and research boutiques', 'Skills: Excel, financial modelling, report writing', 'Certifications: CFA, NISM', 'Building a portfolio with your own research report'],
      },
    ],
    materials: [],
    published: true,
    featured: true,
    order: 1,
    createdAt: new Date().toISOString(),
  };
}

function goldCourse() {
  const m = (title, summary, topics) => ({ title, summary, topics });
  return {
    id: uid(),
    slug: 'sector-expertise-gold-research',
    title: 'Sector Expertise: Gold & Jewellery Research',
    subtitle: 'The ₹6+ lakh crore sector nobody studies properly: 30 modules, 13 company deep-dives, one full sector report.',
    category: 'Sector Expertise',
    level: 'Intermediate to Advanced',
    price: 999,
    originalPrice: 0,
    duration: '30 recorded modules',
    schedule: '',
    format: 'Recorded video lectures + slide decks + deep-dive notes · learn at your own pace',
    image: '/images/course-gold.svg',
    summary:
      'A complete sector specialisation on Indian gold and jewellery: market structure, the value chain, consumer behaviour, gold financing, diamonds, store economics, financials, regulation, 13 listed-company deep-dives, KPIs, valuation and risks, ending with a full institutional-style sector report.',
    description:
      'Jewellery looks like a "boring, traditional" sector from the outside. People assume it is just gold prices going up and down. In reality it sits at the intersection of **commodity economics**, **retail economics**, **financial engineering** and **behavioural and cultural economics**. That is why most investors misprice it.\n\n' +
      'Every listed jewellery company is really valued on two questions: is gold going up or down, and is this company taking share from the local goldsmith down the street? Organised retail has moved from roughly 5–10% of the market in 2000 to about 35–40% in FY25, and the organised players are compounding revenue at 15–35%+ a year inside a market growing 8–10%.\n\n' +
      '## How the course is built\n' +
      '- **Sector foundations (modules 1–10):** market structure, the value chain, consumer behaviour, product mix, gold-market mechanics, gold financing, diamonds and manufacturing.\n' +
      '- **Analyst toolkit (modules 11–16):** store economics and SSSG, franchise payback, P&L and balance-sheet analysis, inventory risk and regulation.\n' +
      '- **13 company deep-dives (modules 17–22):** Titan, Kalyan, Senco, PNG, Thangamayil, PC Jeweller, BlueStone, TBZ, Sky Gold, Rajesh Exports, Goldiam, Renaissance Global and Asian Star.\n' +
      '- **Putting it together (modules 23–30):** competitive analysis, the KPI masterclass, growth drivers, risk register, valuation, exports, ESG, and a complete sector research report.\n\n' +
      'Every module comes with a video lesson, a slide deck and a written deep-dive note formatted for both laptop and mobile.',
    highlights: [
      '30 modules with video, slides and written deep-dive notes',
      '13 listed-company deep-dives: retail and export/manufacturing',
      'Gold Metal Loans, hedging and inventory risk explained with real filings',
      'Store economics, SSSG and franchise (FOCO) payback maths',
      'KPI masterclass: 12 metrics and who actually discloses them',
      'Capstone: a full institutional-style Indian gold jewellery sector report',
    ],
    outcomes: [
      'Break down the Indian jewellery sector from first principles',
      'Decompose revenue growth into volume, gold price, mix and new stores',
      'Explain why P/E multiples span roughly 9x to 74x across comparable retailers',
      'Read a jeweller\'s balance sheet: GML, hedging, inventory days, ROCE',
      'Underwrite retail and export/manufacturing names with the right framework',
      'Write and defend a complete sector research report',
    ],
    modules: [
      m('Welcome to the ₹6+ Lakh Crore Sector Nobody Studies Properly', 'Market size, the organised/unorganised fault line, product mix, and why domestic retail and export manufacturing are different businesses.', ['India gold demand 802.8 t in 2024; jewellery 563.4 t (−2% volume, +22% value)', 'Organised (about 35–40%) vs unorganised (about 60–65%)', 'Gold vs diamond vs silver vs platinum', 'Branded vs local: why a brand commands a premium', 'Domestic retail vs export/manufacturing']),
      m('Market Structure: Who Owns the Indian Jewellery Shelf?', 'A national leader surrounded by regional fortresses.', ['Titan/Tanishq vs regional strongholds: Kalyan, Senco, PNG, Thangamayil', 'Market share and regional concentration', 'FOCO (franchise) vs COCO (company-owned) expansion playbooks', 'Online-first insurgents in daily-wear gold']),
      m('The Full Value Chain: Mining to Your Wardrobe', 'How gold moves through ten stages, and which ones are actually investable.', ['Mining and refining (MMTC-PAMP, LBMA)', 'Bullion import and trading', 'Gold Metal Loans: the most important stage', 'Manufacturing, diamond cutting, wholesalers', 'Retail chains, online D2C and old-gold recycling']),
      m('Consumer Behaviour Part 1: Weddings, Festivals & the Indian Gold Psychology', 'Why a jeweller\'s year can be read off a religious calendar.', ['About 50% of gold jewellery demand is wedding-related', 'Akshaya Tritiya, Dhanteras and the Oct–Feb wedding season', 'Q3 as the strongest quarter', 'Rural vs urban buying motives']),
      m('Consumer Behaviour Part 2: The New Indian Buyer', 'Premiumisation, lightweight daily-wear and repeat customers.', ['Premiumisation and bigger branded tickets', 'Lightweight and daily-wear jewellery (CaratLane)', 'Men\'s jewellery and Gen Z behaviour', 'Old-gold exchange as a repeat-customer engine']),
      m('Product Categories: Gold, Diamond, Studded, Platinum, Silver & More', 'Why studded mix is the single most important number for margin quality.', ['Plain gold: the low-margin bread and butter', 'Studded and diamond jewellery margins', 'Platinum, silver and other categories', 'Making charges as the margin lever']),
      m('The Gold Market: Price, Imports & Supply Chain', 'Why gold price swings hit volume and value differently.', ['The two-sided impact of gold prices', 'Why India imports almost all its gold', 'How companies hedge price risk while holding inventory', 'Recycling and old-gold exchange reducing import dependence']),
      m('Gold Financing Mechanics: GML, Leasing & Hedging', 'How a jeweller funds gold inventory without blocking cash.', ['How a Gold Metal Loan works: bank lends gold, not cash', 'Lease rates and what financing really costs', 'Hedging so a price swing doesn\'t become a margin crisis', 'Phrases to watch in annual reports and concalls']),
      m('Diamond Industry: Natural vs Lab-Grown', 'Same carbon, same sparkle. A pricing story turning the industry upside down.', ['India cuts and polishes about 90% of the world\'s diamonds', 'Rough-to-polished journey and pricing pressure', 'Lab-grown prices down about 85–90% since 2020', 'How Goldiam, Rajesh Exports, Renaissance Global and Asian Star are repositioning']),
      m('Manufacturing: From Karigar\'s Hands to Hallmarked Jewellery', 'Who actually makes India\'s jewellery, and where the profit sits.', ['The karigar ecosystem and Kolkata clusters', 'CAD design, casting and hand-finishing', 'Hallmarking and HUID', 'Making charges and automation']),
      m('Retail Business Model Part 1: Store Economics & SSSG', 'The metric that separates real demand from store-count arithmetic.', ['What it costs to open a store: capex and inventory', 'Breakeven timelines', 'Reading revenue per store correctly', 'Same-Store Sales Growth (SSSG)']),
      m('Retail Business Model Part 2: Expansion, Franchise Profitability & Store Payback', 'The maths of growing a store network.', ['Tier 1 saturation vs Tier 2/3 whitespace', 'Franchise economics: two P&Ls, one store', 'Store payback period', 'Inventory turns and store productivity']),
      m('Financial Analysis Part 1: Reading the P&L Like an Analyst', 'Decompose the numbers before you believe them.', ['Revenue growth: volume, gold price, mix, new stores', 'Gross margin: what survives the cost of gold and stones', 'EBITDA margin: people, rent and marketing', 'PAT margin and why interest matters more than in FMCG']),
      m('Financial Analysis Part 2: Working Capital, ROCE & Free Cash Flow', 'How the balance sheet funds the business.', ['Inventory days: high by design, rising by risk', 'Working capital and the cash conversion cycle', 'ROCE vs ROE for a capital-intensive retailer', 'Strong profit alongside weak free cash flow']),
      m('Inventory Management: The Heart of Jewellery Retail Risk', 'Same balance-sheet line, very different risks.', ['Gold inventory vs diamond/studded inventory', 'Studded mix and stock ageing', 'Inventory turnover', 'Hedged vs unhedged inventory']),
      m('Regulations: The Rules That Move Stock Prices Overnight', 'Six levers that shape the jewellery trade.', ['BIS hallmarking', 'GST: 3% on gold, 5% on making charges', 'Import and customs duty: the biggest lever', 'RBI gold loan rules, KYC/PAN norms and government policy']),
      m('Titan (Tanishq): The Sector\'s Gold Standard (Full Deep Dive)', 'Jewellery, watches, eyecare and emerging businesses.', ['Business segments and business model', 'Retail network, manufacturing and capex', 'Financial deep-dive: revenue, margins, ROE, ROCE', 'Management guidance vs actual']),
      m('Kalyan Jewellers', 'The FOCO expansion engine: India, Candere and the Middle East.', ['FOCO business model', 'Candere and My Kalyan network', 'International expansion', 'Financials and guidance vs actual']),
      m('Senco Gold: The East India Specialist', 'Hub-and-spoke franchising and old-gold exchange.', ['Hybrid COCO + franchise model', 'East India concentration', 'Digital and the Melorra deal', 'Financial performance deep-dive']),
      m('P N Gadgil Jewellers', 'A 192-year heritage brand going pan-India.', ['COCO + FOCO hybrid', 'Store economics and the studded-mix shift', 'YOOU brand and digital', 'Maharashtra leadership and pan-India expansion']),
      m('Regional & Challenger Retailers', 'Four very different stories.', ['Thangamayil: Tamil Nadu dominance and the Chennai push', 'PC Jeweller: lessons from distress', 'BlueStone: digital-first omnichannel, IPO to FY26 profit', 'TBZ: heritage without a scale engine']),
      m('The Manufacturing & Export Cluster', 'Never compare a retailer\'s margin with an exporter\'s.', ['Sky Gold: pure B2B manufacturing growth', 'Rajesh Exports: refining and the SEBI order', 'Goldiam International: lab-grown and US tariffs', 'Renaissance Global and Asian Star: D2C and diamond pivots']),
      m('Full Competitive Analysis', 'Twelve companies, one master table, five investor buckets.', ['The master comparison table', 'Five buckets: national premium, regional, challengers, export, distressed', 'Retail vs manufacturing', 'What each kind of investor should underwrite']),
      m('The Complete KPI Masterclass', 'Twelve metrics every jewellery investor needs to read correctly.', ['SSSG, ticket size, footfalls and conversion', 'Studded mix and gross margin', 'Inventory days, gold exchange ratio, franchise contribution', 'The disclosure scorecard: what is reported and what isn\'t']),
      m('Growth Drivers: Why This Sector Has a Long Runway', 'Eight structural tailwinds, and how to tell structural from cyclical.', ['Rising income and urbanisation', 'Premiumisation', 'The organised-share story', 'Store-expansion whitespace']),
      m('Risks: What Can Go Wrong (And How to Track It)', 'Eight risks rated on likelihood, severity and monitorability.', ['Gold price volatility', 'Demand slowdown', 'Regulatory and duty risk', 'Early-warning signals for each risk']),
      m('Valuation Framework: Is the Stock Cheap or Expensive?', 'Six lenses that correct for each other\'s blind spots.', ['P/E and EV/EBITDA', 'PEG and growth premium', 'ROCE vs valuation', 'Practical peer comparison scorecard']),
      m('Export Business: India\'s Global Gems & Jewellery Footprint', 'The structural differentiator between export and domestic names.', ['Export overview and destinations', 'Currency and trade agreements', 'US tariffs', 'Global demand indicators']),
      m('ESG, Sustainability & the Future', 'What is proven versus what is still early.', ['Responsible sourcing and the Kimberley Process', 'Recycled gold and carbon disclosure', 'Omnichannel, AI/AR', 'Lab-grown diamonds and design-led luxury']),
      m('Complete Jewellery Sector Research Report', 'Capstone: synthesise all 29 modules into one institutional-style sector note.', ['Executive summary and verdict', 'Competitive landscape: thirteen companies, five buckets', 'Valuation and peer comparison', 'Risk register, outlook and conclusion']),
    ],
    materials: [],
    published: true,
    featured: true,
    order: 2,
    createdAt: new Date().toISOString(),
  };
}

function reports() {
  const now = Date.now();
  return [
    {
      id: uid(),
      slug: 'indian-gold-jewellery-sector-report-2026',
      title: 'Indian Gold Jewellery Sector: Full Sector Report',
      sector: 'Gold & Jewellery',
      company: 'Sector note · 13 companies',
      rating: 'Sector Report',
      date: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 10),
      image: '',
      access: 'members',
      published: true,
      summary:
        'A structural, multi-decade share-gain story, not just a cyclical wave. Organised retail has gone from roughly 5–10% of the market in 2000 to about 35–40% in FY25, while five comparable listed retailers trade across a 9x–74x P/E range.',
      body:
        '## Executive summary\n' +
        "India's organised gold jewellery retail sector is in the middle of a structural, multi-decade share-gain story. Organised retail's share of the market has moved from roughly 5–10% in 2000 to about 35–40% in FY25, with projections of 40–45% by 2028. The overall market grows at a nominal 8–10% a year; organised players inside it are compounding revenue at 15–35%+. Hallmarking, GST/KYC formalisation and brand trust are the engines behind that shift: and none of them are reversing.\n\n" +
        '## The verdict\n' +
        '- **Structural call:** the organised-share-gain thesis is intact and accelerating: 13% (2010) → 29% (2018) → 35% (2023).\n' +
        '- **Cyclical caveat:** FY24–FY26 has been a volume recession dressed as a value boom. Jewellery volume fell to 563.4 tonnes in 2024 (−2%) while value rose 22%; by Q1 2026 investment demand overtook jewellery demand for the first time on record.\n' +
        '- **Dispersion is the opportunity:** on 15–16 September 2026, P/E ranged from Senco Gold 9.6x to PC Jeweller 16.2x, Thangamayil 39x, Kalyan 42.6x and Titan 73.9x. Studded mix (high-20s to low-30s% at Titan/Kalyan vs 10–11% at Senco, Thangamayil and PNG) explains most of the spread.\n' +
        '- **Two businesses, two frameworks:** domestic retail and export/manufacturing run on different economics and must never be underwritten with the same checklist.\n\n' +
        '## Market structure\n' +
        "India is the world's second-largest gold consumer. Total gold demand reached 802.8 tonnes in 2024 (₹5,15,390 crore). Beyond Titan's national footprint the market is a patchwork of regional fortresses: Kalyan (now about 69% of showrooms outside the South), Senco (80+ of 201 showrooms in West Bengal), PNG (Maharashtra), Thangamayil (all 66 stores in Tamil Nadu) and TBZ (37 stores). Titan holds about 20–22% of the organised segment vs Kalyan's about 7%.\n\n" +
        '## Swing factors for the next 2–3 years\n' +
        '1. The gold import duty cycle: raised back to 15% in May 2026 after a cut to 6% in July 2024, the eighth change in fourteen years.\n' +
        '2. US tariffs on gems & jewellery exports.\n' +
        '3. Lab-grown diamonds: LGD export volume overtook natural for the first time in FY26.\n' +
        '4. Governance quality, which the market is now visibly pricing into multiples.\n\n' +
        '## Outlook\n' +
        'The most useful discipline is **decomposition before belief**: split revenue growth into volume, gold price, mix and store additions before crediting it to demand; split a multiple into ROCE, growth premium and governance before calling it cheap or expensive. Watch whether the 15% duty holds, whether lab-grown moves export value as sharply as volume, and whether the regional champions can close the studded-mix gap.\n\n' +
        '*This note is the capstone (Module 30) of the Gold & Jewellery sector course. Valuation multiples are a dated snapshot as of 15–16 September 2026.*',
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: uid(),
      slug: 'jewellery-sector-kpi-framework',
      title: 'The Jewellery KPI Framework: 12 Metrics and Who Actually Discloses Them',
      sector: 'Gold & Jewellery',
      company: 'Sector framework',
      rating: 'Framework',
      date: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString().slice(0, 10),
      image: '',
      access: 'public',
      published: true,
      summary:
        'Fewer than half of the sector\'s key metrics are disclosed cleanly. Here is what each KPI tells you, which companies report it, and how the KPIs fit together.',
      body:
        '## The headline finding\n' +
        'Balance-sheet and footprint KPIs (store count, studded mix, inventory days, gold exchange ratio, franchise contribution) are disclosed reasonably often. Shop-floor KPIs (footfalls, conversion, ticket size, revenue per store) are almost never disclosed, a genuine blind spot for outside analysts.\n\n' +
        '## Reasonably disclosed\n' +
        '- **Studded mix %:** the single best margin-quality proxy. Kalyan about 32% is highest among comparables; Senco about 11% lowest.\n' +
        '- **Inventory days:** PNG fastest (about 63 days); TBZ slowest (249 days, FY26).\n' +
        '- **Store count:** Titan 3,603 group-wide. Growth without SSSG support is not quality growth.\n' +
        '- **Gold exchange ratio:** a loyalty and working-capital signal, but also a near-term margin headwind at high levels.\n' +
        '- **Franchise contribution:** store share can differ sharply from revenue share (Kalyan about 66% of stores FOCO vs 49% of revenue).\n\n' +
        '## Partial or mixed\n' +
        '- **SSSG:** the cleanest proxy for organic health (Titan about 14%, Kalyan 22–45%+, Senco 24–34%).\n' +
        '- **Gross margin:** Thangamayil has the cleanest quarterly series.\n' +
        "- **Online sales %:** BlueStone's 6.66% despite a digital-first identity.\n\n" +
        '## Genuine gaps\n' +
        '- **Footfalls and conversion ratio:** no company discloses them.\n' +
        '- **Ticket size:** only BlueStone discloses it.\n' +
        '- **Revenue per store:** denominator mismatches make cross-company comparisons unreliable.\n\n' +
        '## How the KPIs connect\n' +
        'Footfalls × conversion = transactions; transactions × ticket size = revenue. Store count × revenue per store is a second path to revenue, with SSSG checking whether growth reflects existing-store health or just new stores. Studded mix and gross margin sit on top as the margin-quality layer.\n\n' +
        '*From Module 24: The Complete KPI Masterclass.*',
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
    {
      id: uid(),
      slug: 'png-jewellers-business-model-growth-outlook',
      title: 'PNG Jewellers: Business Model, Industry Positioning & Growth Outlook',
      sector: 'Gold & Jewellery',
      company: 'P N Gadgil Jewellers Ltd',
      rating: 'Initiating Coverage',
      date: new Date(now - 1000 * 60 * 60 * 24 * 20).toISOString().slice(0, 10),
      image: '',
      access: 'public',
      published: true,
      summary:
        'A two-century-old Maharashtra jeweller turning national. We look at store economics, the old-gold exchange advantage, studded mix and the expansion plan into North and Central India.',
      body:
        '## Executive summary\n' +
        'P N Gadgil Jewellers Limited (PNG) traces its roots to 1832 in Sangli, Maharashtra. It has evolved from a family goldsmith into an organised retail chain selling gold, diamond, platinum and silver jewellery, and is now pursuing a national expansion strategy.\n\n' +
        'The organised jewellery sector continues to gain share from local jewellers. PNG is positioned to benefit through brand trust, a growing store network, an improving product mix and rising studded penetration.\n\n' +
        '## Store network and operating scale\n' +
        '- Mix of company-owned and franchise stores; average store size 3,000–4,000 sq ft\n' +
        '- Roughly ₹61 crore revenue and ₹2.3 crore profit per store\n' +
        '- Inventory turnover has moderated from about 5x toward 3.2x as studded mix rises\n\n' +
        '## Two store formats\n' +
        '**Legacy stores** need about ₹50 crore including inventory and break even in roughly 15 months. **Lifestyle stores** (about 1,500 sq ft, ₹12 crore total investment, ₹25 crore revenue target) break even in about 12 months with higher gross margins from diamond and studded jewellery.\n\n' +
        '## The old-gold advantage\n' +
        'Wedding jewellery is 50–60% of sales, and nearly 80% of bridal purchases involve exchanging old gold. That lowers reliance on external gold procurement and gold metal loans.\n\n' +
        '## Growth drivers\n' +
        '- Continued shift from unorganised to organised retail (organised share about 18% in 2017 → 35–40% today)\n' +
        '- Geographic expansion into Uttar Pradesh, Madhya Pradesh, Bihar and Chhattisgarh\n' +
        '- Higher studded penetration lifting margins\n' +
        '- Franchise model enabling capital-light growth\n\n' +
        '## Key risks\n' +
        '- Heavy concentration in Maharashtra; new markets take time to build brand\n' +
        '- Gold-price volatility affecting demand and inventory valuation\n' +
        '- Structurally high working capital\n' +
        '- Competition from Titan and Kalyan in expansion markets\n\n' +
        '## Investment view\n' +
        'PNG offers exposure to the formalisation of Indian jewellery retail. If it executes on store expansion and studded mix, it can deliver sustained revenue growth and margin improvement, though execution risk during national expansion is the key monitorable.',
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
    {
      id: uid(),
      slug: 'jewellery-sector-concall-summary-q4-fy26',
      title: 'Jewellery Sector Concall Summary: Q4 FY26',
      sector: 'Gold & Jewellery',
      company: 'Titan · Kalyan · PNG · Thangamayil · BlueStone',
      rating: 'Sector Update',
      date: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
      image: '',
      access: 'members',
      published: true,
      summary:
        'What five listed jewellers told analysts this quarter: pulled-forward wedding demand, the shift to coins and lighter karats, hedging changes and store-expansion plans.',
      body:
        '## Titan Company\n' +
        '- Very strong Q4 jewellery demand as customers bought ahead of expected price rises and wedding demand shifted earlier\n' +
        '- Old-gold exchange became a major growth driver; studded demand improved on marketing campaigns\n' +
        '- Customers moving to lighter, 18K and 14K, wearable jewellery\n' +
        '- Margin pressure from a higher share of coins and plain gold; new "Hues" gemstone line and "beYon" lab-grown diamond stores\n' +
        '- Management estimates about 50–60 bps market-share gain in FY26\n\n' +
        '## Kalyan Jewellers\n' +
        '- FY26 revenue +43%, PAT +89%; Q4 revenue +66%\n' +
        '- 129 showrooms added in FY26, about 150 planned for FY27, led by the FOCO model outside South India\n' +
        '- Candere turned profitable with studded mix above 70%\n' +
        '- Targeting a near debt-free (ex gold loans) position in FY27; India margin guided at about 5.5–5.6%\n\n' +
        '## P N Gadgil Jewellers\n' +
        '- Crossed ₹10,000 crore revenue for the first time; revenue +40%, PAT +88%\n' +
        '- 25 stores added (78 total); non-Maharashtra share reached 10% via UP, Bihar and MP\n' +
        '- Q4 margins declined on a heavy shift to bars and coins, promotions and lower inventory gains\n' +
        '- Hedging raised from 57% to 67%; FY27 target ₹13,500 crore revenue and entry into Gujarat and Haryana\n\n' +
        '## Thangamayil Jewellery\n' +
        '- Growth from weddings, festive demand and high gold prices\n' +
        '- Deepening Tier-2/3 and rural Tamil Nadu presence; focus on saving schemes and exchange programmes\n\n' +
        '## BlueStone\n' +
        '- 340 stores across 134 cities (65 added in FY26); studded mix about 55–60%\n' +
        '- Redesigning to reduce gold weight; ad intensity down from 12% to 6% of sales with scale\n\n' +
        '## Our read\n' +
        'The common thread is affordability: in a high-gold-price year customers are protecting budgets through exchange, lighter karats and investment gold. That supports revenue but dilutes margins, so studded mix and hedging discipline are the KPIs to watch next quarter.',
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
    {
      id: uid(),
      slug: 'cyclicality-of-gold-jewellery-framework',
      title: 'Seasonality vs Cyclicality: A Framework for Gold Jewellery Stocks',
      sector: 'Gold & Jewellery',
      company: 'Sector framework',
      rating: 'Framework',
      date: new Date(now - 1000 * 60 * 60 * 24 * 35).toISOString().slice(0, 10),
      image: '',
      access: 'public',
      published: true,
      summary:
        'Gold jewellery is a consumption + investment hybrid. Here is how we separate predictable seasonal spikes from the 5–15 year gold cycles that actually move valuation multiples.',
      body:
        '## Three demand drivers\n' +
        '- **Cultural:** weddings, festivals, tradition as a store of wealth\n' +
        '- **Investment:** inflation hedge, currency depreciation, safe haven\n' +
        '- **Income-linked:** rural cash flow and urban salary growth\n\n' +
        '## Seasonality (within a year)\n' +
        'Wedding season (Oct–Dec and Jan–Mar) accounts for roughly 50–60% of annual jewellery demand. Diwali, Dhanteras and Akshaya Tritiya drive sentiment buying, and post-monsoon harvest income lifts rural demand. April–June and the monsoon months are typically weak. Companies build inventory in Q2, peak in Q3 and slow in Q1: which shapes working capital and cash flow.\n\n' +
        '## Cyclicality (5–15 year waves)\n' +
        'When gold rises fast, demand falls in the short term on affordability but rises in the long term as investment demand kicks in. Recent cycles: the 2001–2011 super bull run, the 2012–2015 correction of 30–40%, and the 2019–2024 bull phase driven by COVID, war and inflation.\n\n' +
        '## Margins\n' +
        'Revenue = gold price × volume, but margin comes from making charges and design. Rising gold lifts ticket size, trims volume and keeps margins flat to slightly pressured; stable gold is when volumes and margins improve.\n\n' +
        '## Five checks before you act\n' +
        '- Seasonality: wedding calendar and festival timing\n' +
        '- Gold-price trend: rising, falling or stable\n' +
        '- Rural economy: monsoon and crop prices\n' +
        '- Policy: import duty and regulation\n' +
        '- Consumer sentiment: inflation and income growth\n\n' +
        '## Takeaway\n' +
        'The best time to own jewellery stocks is usually when gold prices stabilise after a rise and demand is temporarily weak; the worst is peak demand combined with peak valuation.',
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 35).toISOString(),
    },
  ];
}

function buildSeed() {
  return {
    version: 1,
    settings: {
      siteName: 'Vector',
      tagline: 'Equity Research',
      logo: '/images/vector-emblem.png',
      favicon: '/images/favicon.png',
      theme: seedTheme(),
      contact: {
        email: 'chandorkaryash12@gmail.com',
        phone: '',
        whatsapp: '',
        address: 'Mumbai, Maharashtra, India',
        hours: 'Mon–Sat · 10:00 AM – 7:00 PM IST',
      },
      social: { linkedin: '', instagram: '', youtube: '', twitter: '', telegram: '' },
      sections: {
        hero: true,
        stats: true,
        courses: true,
        approach: true,
        research: true,
        founder: true,
        testimonials: true,
        faq: true,
        cta: true,
      },
      paymentInstructions:
        'Your enrolment request has been received. Our team will contact you within 24 hours with payment details (UPI / bank transfer). Your course unlocks as soon as payment is confirmed.',
      disclaimer:
        'Vector provides equity research education and sector research for informational and educational purposes only. Nothing on this website is investment advice or a recommendation to buy or sell any security. Please consult a SEBI-registered investment adviser before making investment decisions. Investments in securities markets are subject to market risks.',
      seoDescription:
        'Vector Equity Research: learn equity research the way analysts do. Road Map to Equity Research and Gold & Jewellery sector expertise courses, plus sector research.',
    },
    content: {
      hero_eyebrow: '',
      hero_title: 'Research with direction. Invest with conviction.',
      hero_subtitle:
        'Vector teaches you to analyse businesses the way institutional analysts do (industry, financials, management and valuation) and publishes sector research you can actually use.',
      hero_cta_primary: 'Explore Courses',
      hero_cta_secondary: 'Read Research',
      hero_image: '',
      courses_eyebrow: 'Programmes',
      courses_title: 'Two courses. One analyst mindset.',
      courses_subtitle: 'Start with the complete research process, then go deep on a sector the market routinely misprices.',
      approach_eyebrow: 'The Vector Method',
      approach_title: 'A repeatable process, not stock tips.',
      approach_subtitle: 'Every report we write and every class we teach follows the same seven-step research workflow.',
      research_eyebrow: 'Latest Research',
      research_title: 'Sector notes, company deep-dives and concall summaries.',
      research_subtitle: 'Process-driven research, with the working shown.',
      testimonials_title: 'What learners say',
      faq_title: 'Frequently asked questions',
      cta_title: 'Ready to think like an analyst?',
      cta_subtitle: 'Create your free account to access members-only research and start learning today.',
      cta_button: 'Create free account',
      about_eyebrow: 'About Vector',
      about_title: 'Built by an analyst, for future analysts.',
      about_body:
        'Vector is an equity research and training platform based in Mumbai, founded by Yash Chandorkar.\n\n' +
        'Most learners get theory or tips, rarely the process. Vector teaches the full analyst workflow: understanding the business, studying the industry, decoding annual reports, investor presentations and concall transcripts, analysing financial statements, judging management, building valuations and writing the report.\n\n' +
        '## Research built on conviction\n' +
        'Our research combines numbers with **scuttlebutt**: meeting management teams, visiting plants and checking the story on the ground. That is the same process we teach, applied to real listed companies, starting with a 30-module deep dive into India\'s gold and jewellery sector.',
      about_image: '',
      founder_name: 'Yash Chandorkar',
      founder_role: 'Founder · Equity Research Analyst',
      founder_bio:
        'Equity research analyst with a PGDM in Finance from Oriental School of Business, Navi Mumbai, focused on fundamental and scuttlebutt-driven investing. Yash analyses companies through annual reports, investor presentations, concall transcripts and broker research, and turns that work into clear, actionable reports.\n\n' +
        'He has met the management teams of 30+ listed companies, including Balu Forge, Deepak Fertilisers, Fino Payments Bank, Venus Pipes, Panchsheel Organics, JTL Industries, Ajmera Realty, Epigral, Intellect Design, Kalpataru, PDS, Gulf Oil, NIIT Learning, Cantabil Retail, NIIT and Karnataka Bank, and visited the manufacturing facilities of Pyramid Technoplast, Waaree Energies and BEW Engineering.',
      founder_image: '/images/founder.jpg',
      mission_title: 'Our mission',
      mission_body: 'To make institution-grade equity research skills accessible to every serious student and investor in India.',
      contact_title: 'Get in touch',
      contact_subtitle: 'Questions about a course, access or our research? Send us a message and we will reply within one business day.',
    },
    stats: [
      { value: '11', label: 'Core research modules' },
      { value: '30+', label: 'Listed-company managements met' },
      { value: '30', label: 'Gold sector modules' },
      { value: '13', label: 'Listed-company deep-dives' },
    ],
    approach: [
      { title: 'Understand the business', body: 'Who pays, for what, and why they keep paying. Business model, value chain and moat.' },
      { title: 'Study the industry', body: 'Size, structure, Porter\'s Five Forces, regulation, and whether it is cyclical or structural.' },
      { title: 'Read the source', body: 'Annual reports, concall transcripts and investor presentations, read like an investigator.' },
      { title: 'Analyse the numbers', body: 'P&L, balance sheet, cash flow, working capital and ratios: direction before decimals.' },
      { title: 'Meet management', body: 'Track record, governance and capital allocation, checked in person through management meetings and plant visits.' },
      { title: 'Value it properly', body: 'DCF, EV/EBITDA, P/E: the right method for the right sector, with a margin of safety.' },
      { title: 'Write the thesis', body: 'A clear Buy / Hold / Sell call with drivers, risks and what would change our mind.' },
    ],
    // Add real learner quotes in Admin > Sections & lists; the home page hides the section while this list is empty.
    testimonials: [],
    faqs: [
      { q: 'Do I need a finance background?', a: 'No. Road Map to Equity Research starts from stock-market foundations and builds up to valuation and report writing. Basic comfort with Excel helps.' },
      { q: 'Are the lectures live or recorded?', a: 'All lectures are pre-recorded. Watch them anytime, at your own pace, and rewatch them as often as you like from your dashboard.' },
      { q: 'Which course should I take first?', a: 'Start with Road Map to Equity Research. The 30-module Gold & Jewellery sector course assumes you are comfortable with financial statements and basic valuation.' },
      { q: 'How do I pay and get access?', a: 'Create an account and click Enrol on a course. We share payment details, and your course unlocks in your dashboard as soon as payment is confirmed.' },
      { q: 'Is this investment advice?', a: 'No. Vector is an education and research platform. Nothing we publish is a recommendation to buy or sell any security.' },
    ],
    courses: [roadmapCourse(), goldCourse()],
    reports: reports(),
    media: [],
    users: [],
    enrollments: [],
    messages: [],
  };
}

module.exports = { buildSeed };
