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
    price: 14999,
    originalPrice: 24999,
    duration: '11 live sessions · 2.5 hours each',
    schedule: 'Weekends — Saturday 8:00 PM–10:30 PM · Sunday 12:00 PM–2:30 PM',
    format: 'Live online cohort + recordings',
    image: '/images/course-roadmap.svg',
    summary:
      'An 11-module programme that teaches you how to analyse businesses, industries, financial statements and valuations — and finish by writing a full equity research report on P N Gadgil Jewellers.',
    description:
      'Most people think equity research needs a Bloomberg terminal and a ten-person team. It does not. You need a process.\n\n' +
      'This programme takes you step by step through the exact workflow an analyst uses: understand the business, study the industry, read annual reports and concalls, analyse the three financial statements, judge management, value the company and write the investment thesis.\n\n' +
      'Along the way we use examples from many industries, and the final case study is a complete sell-side style research report on **P N Gadgil Jewellers Limited** — industry analysis, business model, financials, peer comparison, valuation, risks and a Buy / Hold / Sell recommendation.',
    highlights: [
      '11 live modules, 27+ hours of instruction',
      'Real Indian case studies — Reliance, HDFC Bank, Asian Paints, Dixon, Titan',
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
        topics: ['Introduction to equity research', 'How stock markets work', 'Market participants — FIIs, DIIs, retail investors', 'Market cycles and wealth creation', 'How analysts research companies'],
      },
      {
        title: 'Understanding Businesses',
        summary: 'Stock ≠ ticker. Stock = business. How companies create, deliver and capture value.',
        topics: ['Business models — the five questions', 'Value chain analysis', 'Competitive advantages (economic moats)', 'B2B vs B2C vs B2G businesses', 'Scalability of business models'],
      },
      {
        title: 'Industry Analysis',
        summary: 'Good company + bad industry = bad investment. Understand the industry first.',
        topics: ['Industry size and market structure', 'Industry growth drivers', "Porter's Five Forces", 'Government regulations', 'Cyclical vs structural industries'],
      },
      {
        title: 'Reading Annual Reports & Concall Analysis',
        summary: 'An annual report is not a novel — read it like an investigator.',
        topics: ['How to read annual reports', 'How to analyse concalls', 'Understanding management commentary', 'How analysts ask questions to management', 'Notes to accounts: contingent liabilities, related-party transactions, segment data'],
      },
      {
        title: 'Financial Statements',
        summary: 'Reading the P&L, balance sheet and cash flow together.',
        topics: ['Income statement analysis', 'Balance sheet analysis', 'Cash flow statement', 'Working capital analysis', 'Free cash flow analysis'],
      },
      {
        title: 'Ratio Analysis',
        summary: 'Understanding company performance through ratios.',
        topics: ['Profitability ratios', 'Efficiency ratios', 'Leverage ratios', 'Valuation ratios'],
      },
      {
        title: 'Management Analysis',
        summary: '"Can I trust this management with my money?"',
        topics: ['Promoter background and track record', 'Corporate governance', 'Capital allocation', 'Promoter holding analysis', 'Management red flags'],
      },
      {
        title: 'Valuation Techniques',
        summary: 'Valuation is not just the P/E ratio.',
        topics: ['P/E ratio', 'EV/EBITDA', 'Discounted Cash Flow (DCF)', 'Margin of safety'],
      },
      {
        title: 'Finding Multibagger Stocks',
        summary: 'Multibaggers come from specific triggers plus strong fundamentals. No trigger = no multibagger.',
        topics: ['Growth triggers', 'Capacity expansion', 'Market share gains', 'Industry tailwinds', 'Small-cap vs large-cap investing'],
      },
      {
        title: 'Risk Analysis',
        summary: 'Protecting capital is the first rule.',
        topics: ['Accounting manipulation', 'Debt risks', 'Cyclical risks', 'Business disruption', 'Macro risks'],
      },
      {
        title: 'Complete Equity Research Report',
        summary: 'Capstone — prepare a full research report on P N Gadgil Jewellers Limited.',
        topics: ['Building an investment thesis', 'Buy / Hold / Sell recommendation', 'Writing a research report', 'Industry, business model, financials, peers, valuation and risks'],
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
  return {
    id: uid(),
    slug: 'sector-expertise-gold-research',
    title: 'Sector Expertise: Gold & Jewellery Research',
    subtitle: 'The ₹6+ lakh crore sector nobody studies properly — analysed like an institutional sector analyst.',
    category: 'Sector Expertise',
    level: 'Intermediate',
    price: 9999,
    originalPrice: 14999,
    duration: '10 modules · live + recorded',
    schedule: 'Weekend cohort — timings shared on enrolment',
    format: 'Live online cohort + recordings + sector workbook',
    image: '/images/course-gold.svg',
    summary:
      'A deep sector specialisation on Indian gold and jewellery: demand drivers, gold-price cycles, regulation, retail store economics, studded mix, hedging and valuation of Titan, Kalyan, Senco, Thangamayil, PNG and more.',
    description:
      'Jewellery looks like a "boring, traditional" sector from the outside — people assume it is just gold prices going up and down. In reality it sits at the intersection of **commodity economics**, **retail economics**, **financial engineering** and **behavioural and cultural economics**. That is why most investors misprice it.\n\n' +
      'Every listed jewellery company is really valued on two questions: is gold going up or down, and is this company taking share from the local goldsmith down the street? This course teaches you to answer both — and to track the handful of KPIs that actually move these stocks.\n\n' +
      'You will finish with a sector model, a KPI tracker and a peer valuation covering the listed retail and export/manufacturing names.',
    highlights: [
      'India is the world\'s #2 gold consumer — learn how that demand really works',
      'Organised vs unorganised: the structural thesis behind every listed jeweller',
      'Studded mix, SSSG, old-gold exchange and hedging explained with real numbers',
      'Store economics: legacy vs lifestyle formats, COCO vs FOCO, break-even',
      'Quarterly concall decoding — Titan, Kalyan, PNG, Thangamayil, BlueStone',
      'Peer valuation workbook for retail and export names',
    ],
    outcomes: [
      'Break down the jewellery sector from first principles',
      'Separate seasonality from long-term gold-price cycles',
      'Explain why Titan trades at a premium to Thangamayil',
      'Read a jewellery concall and pull out the numbers that matter',
      'Build and defend a sector view and stock recommendation',
    ],
    modules: [
      {
        title: 'Welcome to the ₹6+ Lakh Crore Sector Nobody Studies Properly',
        summary: 'Scale, structure and the single most important concept in the sector.',
        topics: ['Indian jewellery market size (~700–800 tonnes of gold a year)', 'Organised (~35–40%) vs unorganised (~60–65%)', 'Gold vs diamond vs silver vs platinum — the product mix', 'Branded vs local — why a brand commands a premium', 'Domestic retail vs export/manufacturing — two different businesses'],
      },
      {
        title: 'What Drives Gold Jewellery Demand',
        summary: 'Gold jewellery is a consumption + investment hybrid — which is why it behaves unlike normal retail.',
        topics: ['Cultural demand — weddings, festivals, store of wealth', 'Investment demand — inflation hedge, currency, safe haven', 'Income-linked consumption — rural cash flow and urban salaries', 'Seasonality: wedding season, Dhanteras, Akshaya Tritiya, harvest', 'Rural vs urban demand cycles'],
      },
      {
        title: 'Gold Price Cycles & Cyclicality',
        summary: 'Seasonality drives short-term earnings visibility; cyclicality drives long-term valuation multiples.',
        topics: ['Short-term vs long-term reaction to gold prices', 'Historical cycles: 2001–11 bull run, 2012–15 correction, 2019–24 bull phase', 'The wealth-effect cycle', 'Margin behaviour when gold rises vs when it stabilises', 'When to own — and avoid — jewellery stocks'],
      },
      {
        title: 'Regulation & Policy',
        summary: 'How policy has pushed customers toward organised players.',
        topics: ['Import duty and its effect on smuggling and organised players', 'BIS hallmarking and HUID', 'KYC / PAN norms and cash transactions', 'Demonetisation and GST — long-term formalisation', 'Gold monetisation and gold metal loans'],
      },
      {
        title: 'Jewellery Retail Store Economics',
        summary: 'Stores, footfall and same-store sales — the retail engine.',
        topics: ['Legacy vs lifestyle store formats', 'COCO, franchise and FOCO models', 'Store investment, inventory and break-even', 'Revenue and profit per store', 'Same-store sales growth (SSSG) and inventory turnover'],
      },
      {
        title: 'Margins, Studded Mix & Old-Gold Exchange',
        summary: 'Treat product mix as a margin dial.',
        topics: ['Why studded/diamond jewellery carries higher margins', 'Making charges and pricing transparency', 'Old-gold exchange as a sourcing and working-capital advantage', 'Shift to lightweight, 18K and 14K jewellery', 'Margin dilution from coins and bars'],
      },
      {
        title: 'Working Capital, Hedging & Gold Metal Loans',
        summary: 'The balance sheet of a jeweller is mostly gold.',
        topics: ['Inventory-heavy working capital', 'Gold metal loans (GML) vs bank debt', 'Hedging policy and inventory gains/losses', 'Debt reduction and cash-flow quality', 'Reading the balance sheet of a jeweller'],
      },
      {
        title: 'The Manufacturing & Export Cluster',
        summary: 'Never compare a retailer\'s margin with an exporter\'s.',
        topics: ['Rajesh Exports, Sky Gold, Goldiam, Renaissance Global, Asian Star', 'Client concentration and contract manufacturing', 'USD-INR and the global demand cycle', 'Lab-grown diamonds', 'High-volume, low-margin models'],
      },
      {
        title: 'Decoding Jewellery Concalls & KPIs',
        summary: 'Build a quarterly tracker from what management actually says.',
        topics: ['Titan, Kalyan, PNG, Thangamayil and BlueStone — Q4 FY26 takeaways', 'Studded mix, SSSG, store additions, hedging %', 'Consumer behaviour shifts in a high-gold-price year', 'Management guidance vs delivery', 'Building your sector KPI tracker'],
      },
      {
        title: 'Valuation, Peer Comparison & Investment Thesis',
        summary: 'Put it all together into a defensible sector call.',
        topics: ['P/E and EV/EBITDA across the peer set', 'Why the market pays a premium for Titan', 'Peer comparison workbook', 'Building the investment thesis', 'Final sector note and stock recommendation'],
      },
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
        '- Inventory turnover has moderated from ~5x toward ~3.2x as studded mix rises\n\n' +
        '## Two store formats\n' +
        '**Legacy stores** need about ₹50 crore including inventory and break even in roughly 15 months. **Lifestyle stores** (~1,500 sq ft, ~₹12 crore total investment, ~₹25 crore revenue target) break even in about 12 months with higher gross margins from diamond and studded jewellery.\n\n' +
        '## The old-gold advantage\n' +
        'Wedding jewellery is 50–60% of sales, and nearly 80% of bridal purchases involve exchanging old gold. That lowers reliance on external gold procurement and gold metal loans.\n\n' +
        '## Growth drivers\n' +
        '- Continued shift from unorganised to organised retail (organised share ~18% in 2017 → ~35–40% today)\n' +
        '- Geographic expansion into Uttar Pradesh, Madhya Pradesh, Bihar and Chhattisgarh\n' +
        '- Higher studded penetration lifting margins\n' +
        '- Franchise model enabling capital-light growth\n\n' +
        '## Key risks\n' +
        '- Heavy concentration in Maharashtra; new markets take time to build brand\n' +
        '- Gold-price volatility affecting demand and inventory valuation\n' +
        '- Structurally high working capital\n' +
        '- Competition from Titan and Kalyan in expansion markets\n\n' +
        '## Investment view\n' +
        'PNG offers exposure to the formalisation of Indian jewellery retail. If it executes on store expansion and studded mix, it can deliver sustained revenue growth and margin improvement — though execution risk during national expansion is the key monitorable.',
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
    {
      id: uid(),
      slug: 'jewellery-sector-concall-summary-q4-fy26',
      title: 'Jewellery Sector Concall Summary — Q4 FY26',
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
        '- Management estimates ~50–60 bps market-share gain in FY26\n\n' +
        '## Kalyan Jewellers\n' +
        '- FY26 revenue +43%, PAT +89%; Q4 revenue +66%\n' +
        '- 129 showrooms added in FY26, ~150 planned for FY27, led by the FOCO model outside South India\n' +
        '- Candere turned profitable with studded mix above 70%\n' +
        '- Targeting a near debt-free (ex gold loans) position in FY27; India margin guided at ~5.5–5.6%\n\n' +
        '## P N Gadgil Jewellers\n' +
        '- Crossed ₹10,000 crore revenue for the first time; revenue +40%, PAT +88%\n' +
        '- 25 stores added (78 total); non-Maharashtra share reached 10% via UP, Bihar and MP\n' +
        '- Q4 margins declined on a heavy shift to bars and coins, promotions and lower inventory gains\n' +
        '- Hedging raised from 57% to 67%; FY27 target ₹13,500 crore revenue and entry into Gujarat and Haryana\n\n' +
        '## Thangamayil Jewellery\n' +
        '- Growth from weddings, festive demand and high gold prices\n' +
        '- Deepening Tier-2/3 and rural Tamil Nadu presence; focus on saving schemes and exchange programmes\n\n' +
        '## BlueStone\n' +
        '- 340 stores across 134 cities (65 added in FY26); studded mix ~55–60%\n' +
        '- Redesigning to reduce gold weight; ad intensity down from 12% to 6% of sales with scale\n\n' +
        '## Our read\n' +
        'The common thread is affordability: in a high-gold-price year customers are protecting budgets through exchange, lighter karats and investment gold. That supports revenue but dilutes margins — so studded mix and hedging discipline are the KPIs to watch next quarter.',
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
        '- **Cultural** — weddings, festivals, tradition as a store of wealth\n' +
        '- **Investment** — inflation hedge, currency depreciation, safe haven\n' +
        '- **Income-linked** — rural cash flow and urban salary growth\n\n' +
        '## Seasonality (within a year)\n' +
        'Wedding season (Oct–Dec and Jan–Mar) accounts for roughly 50–60% of annual jewellery demand. Diwali, Dhanteras and Akshaya Tritiya drive sentiment buying, and post-monsoon harvest income lifts rural demand. April–June and the monsoon months are typically weak. Companies build inventory in Q2, peak in Q3 and slow in Q1 — which shapes working capital and cash flow.\n\n' +
        '## Cyclicality (5–15 year waves)\n' +
        'When gold rises fast, demand falls in the short term on affordability but rises in the long term as investment demand kicks in. Recent cycles: the 2001–2011 super bull run, the 2012–2015 correction of 30–40%, and the 2019–2024 bull phase driven by COVID, war and inflation.\n\n' +
        '## Margins\n' +
        'Revenue = gold price × volume, but margin comes from making charges and design. Rising gold lifts ticket size, trims volume and keeps margins flat to slightly pressured; stable gold is when volumes and margins improve.\n\n' +
        '## Five checks before you act\n' +
        '- Seasonality — wedding calendar and festival timing\n' +
        '- Gold-price trend — rising, falling or stable\n' +
        '- Rural economy — monsoon and crop prices\n' +
        '- Policy — import duty and regulation\n' +
        '- Consumer sentiment — inflation and income growth\n\n' +
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
        email: 'hello@vector-research.in',
        phone: '',
        whatsapp: '',
        address: 'Pune, Maharashtra, India',
        hours: 'Mon–Sat · 10:00 AM – 7:00 PM IST',
      },
      social: { linkedin: '', instagram: '', youtube: '', twitter: '', telegram: '' },
      sections: {
        hero: true,
        stats: true,
        courses: true,
        approach: true,
        research: true,
        testimonials: true,
        faq: true,
        cta: true,
      },
      paymentInstructions:
        'Your enrolment request has been received. Our team will contact you within 24 hours with payment details (UPI / bank transfer). Your course unlocks as soon as payment is confirmed.',
      disclaimer:
        'Vector provides equity research education and sector research for informational and educational purposes only. Nothing on this website is investment advice or a recommendation to buy or sell any security. Please consult a SEBI-registered investment adviser before making investment decisions. Investments in securities markets are subject to market risks.',
      seoDescription:
        'Vector Equity Research — learn equity research the way analysts do. Road Map to Equity Research and Gold & Jewellery sector expertise courses, plus independent sector research.',
    },
    content: {
      hero_eyebrow: 'Independent Equity Research & Analyst Training',
      hero_title: 'Research with direction. Invest with conviction.',
      hero_subtitle:
        'Vector teaches you to analyse businesses the way institutional analysts do — industry, financials, management, valuation — and publishes independent sector research you can actually use.',
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
      research_subtitle: 'Independent, process-driven research — with the working shown.',
      testimonials_title: 'What learners say',
      faq_title: 'Frequently asked questions',
      cta_title: 'Ready to think like an analyst?',
      cta_subtitle: 'Create your free account to access members-only research and enrol in the next cohort.',
      cta_button: 'Create free account',
      about_eyebrow: 'About Vector',
      about_title: 'Built by an analyst, for future analysts.',
      about_body:
        'Vector was founded by Yash Chandorkar to close the gap between classroom finance and the way equity research is actually done.\n\n' +
        'Most learners get theory or tips — rarely the process. At Vector we teach the full workflow: understanding the business, studying the industry, decoding annual reports and concalls, analysing financial statements, judging management, building valuations and writing the report.\n\n' +
        'Our sector research — starting with India\'s gold and jewellery industry — is built on the same process, so every learner sees the method applied to real companies.',
      about_image: '',
      founder_name: 'Yash Chandorkar',
      founder_role: 'Founder & Lead Analyst',
      founder_bio:
        'Equity research analyst and educator focused on Indian consumer and jewellery sectors, company deep-dives and sell-side style report writing.',
      founder_image: '',
      mission_title: 'Our mission',
      mission_body: 'To make institution-grade equity research skills accessible to every serious student and investor in India.',
      contact_title: 'Get in touch',
      contact_subtitle: 'Questions about a course, a cohort date or our research? Send us a message and we will reply within one business day.',
    },
    stats: [
      { value: '11', label: 'Core research modules' },
      { value: '27+', label: 'Hours of live instruction' },
      { value: '10', label: 'Gold sector modules' },
      { value: '1', label: 'Full research report you build' },
    ],
    approach: [
      { title: 'Understand the business', body: 'Who pays, for what, and why they keep paying. Business model, value chain and moat.' },
      { title: 'Study the industry', body: 'Size, structure, Porter\'s Five Forces, regulation — and whether it is cyclical or structural.' },
      { title: 'Read the source', body: 'Annual reports, concall transcripts and investor presentations — read like an investigator.' },
      { title: 'Analyse the numbers', body: 'P&L, balance sheet, cash flow, working capital and ratios — direction before decimals.' },
      { title: 'Judge management', body: 'Track record, governance, capital allocation and promoter behaviour.' },
      { title: 'Value it properly', body: 'DCF, EV/EBITDA, P/E — the right method for the right sector, with a margin of safety.' },
      { title: 'Write the thesis', body: 'A clear Buy / Hold / Sell call with drivers, risks and what would change our mind.' },
    ],
    testimonials: [
      { name: 'Aditi K.', role: 'MBA Finance student', quote: 'The annual report and concall sessions changed how I read companies. I finally have a process instead of a watchlist of tips.' },
      { name: 'Rohan M.', role: 'CFA Level II candidate', quote: 'Writing a full report on PNG Jewellers gave me something concrete to show in interviews. The report template alone was worth it.' },
      { name: 'Sneha P.', role: 'Retail investor', quote: 'The gold sector course explained why jewellery stocks move the way they do. Studded mix and SSSG are now the first things I check.' },
    ],
    faqs: [
      { q: 'Do I need a finance background?', a: 'No. Road Map to Equity Research starts from stock-market foundations and builds up to valuation and report writing. Basic comfort with Excel helps.' },
      { q: 'Are the sessions live or recorded?', a: 'Sessions are live on weekends, and recordings are available in your dashboard so you can revise or catch up.' },
      { q: 'Which course should I take first?', a: 'Start with Road Map to Equity Research. The Gold & Jewellery sector course assumes you are comfortable with financial statements and basic valuation.' },
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
