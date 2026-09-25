// Describes every editable text/image block on the public site, grouped the
// way they appear in Admin → Site Content. Add a field here and it shows up in
// the editor automatically; reference it in a view as content.<key>.
module.exports = [
  {
    group: 'Home: Hero',
    fields: [
      { key: 'hero_eyebrow', label: 'Small heading above title' },
      { key: 'hero_title', label: 'Main headline', type: 'textarea', rows: 2 },
      { key: 'hero_subtitle', label: 'Sub-headline', type: 'textarea', rows: 3 },
      { key: 'hero_cta_primary', label: 'Primary button text' },
      { key: 'hero_cta_secondary', label: 'Secondary button text' },
      { key: 'hero_image', label: 'Hero image (optional, replaces the emblem)', type: 'image' },
    ],
  },
  {
    group: 'Home: Courses section',
    fields: [
      { key: 'courses_eyebrow', label: 'Eyebrow' },
      { key: 'courses_title', label: 'Title' },
      { key: 'courses_subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    ],
  },
  {
    group: 'Home: Method section',
    fields: [
      { key: 'approach_eyebrow', label: 'Eyebrow' },
      { key: 'approach_title', label: 'Title' },
      { key: 'approach_subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    ],
  },
  {
    group: 'Home: Research section',
    fields: [
      { key: 'research_eyebrow', label: 'Eyebrow' },
      { key: 'research_title', label: 'Title' },
      { key: 'research_subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    ],
  },
  {
    group: 'Home: Testimonials, FAQ & call to action',
    fields: [
      { key: 'testimonials_title', label: 'Testimonials title' },
      { key: 'faq_title', label: 'FAQ title' },
      { key: 'cta_title', label: 'Call-to-action title' },
      { key: 'cta_subtitle', label: 'Call-to-action text', type: 'textarea', rows: 2 },
      { key: 'cta_button', label: 'Call-to-action button' },
    ],
  },
  {
    group: 'About page',
    fields: [
      { key: 'about_eyebrow', label: 'Eyebrow' },
      { key: 'about_title', label: 'Title' },
      { key: 'about_body', label: 'Body (supports ## headings, - bullets, **bold**)', type: 'textarea', rows: 8 },
      { key: 'about_image', label: 'About image', type: 'image' },
      { key: 'mission_title', label: 'Mission title' },
      { key: 'mission_body', label: 'Mission text', type: 'textarea', rows: 3 },
      { key: 'founder_name', label: 'Founder name' },
      { key: 'founder_role', label: 'Founder role' },
      { key: 'founder_bio', label: 'Founder bio', type: 'textarea', rows: 4 },
      { key: 'founder_image', label: 'Founder photo', type: 'image' },
    ],
  },
  {
    group: 'Contact page',
    fields: [
      { key: 'contact_title', label: 'Title' },
      { key: 'contact_subtitle', label: 'Intro text', type: 'textarea', rows: 2 },
    ],
  },
];
