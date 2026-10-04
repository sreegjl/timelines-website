// Homepage FAQ. Each answer is plain text so the same copy feeds the visible
// list and the FAQPage JSON-LD; `link` renders after the answer on the page.

export const faq = [
  {
    question: 'Is Timelines Studio free?',
    answer:
      'Yes. Timelines Studio is free and open-source under the GPL-3.0 license. There is no paid tier, no account, no ads, and no feature limit. Development is supported by optional donations.',
  },
  {
    question: 'Does Timelines Studio work offline?',
    answer:
      'Yes. The desktop app works offline and saves everything to your computer, with no account or sign-in. A few optional extras, such as Git Sync and the map tiles in Map View, need an internet connection.',
  },
  {
    question: 'Which platforms does Timelines Studio run on?',
    answer:
      'Windows 10 and 11, macOS 12 Monterey or later, and 64-bit Linux as an AppImage. The web viewer opens .timeline files in any modern browser for viewing.',
    link: { to: '/download/', label: 'Download Timelines' },
  },
  {
    question: 'Where is my data stored?',
    answer:
      'In plain files on your computer: each timeline is a .timeline JSON file, notes are Markdown files, and images sit in an assets folder. You can change these locations in settings, and nothing is uploaded to a server we run.',
    link: { to: '/wiki/Files/', label: 'How files work' },
  },
  {
    question: 'Does Timelines Studio work with Obsidian?',
    answer:
      'Yes. Notes in Timelines are plain Markdown files, so you can point the notes folder at your Obsidian vault or link notes you already have to any event, span, or era. Your vault stays as it is, and Timelines keeps the timeline itself in its own .timeline file.',
    link: { to: '/wiki/Notes/', label: 'How notes work' },
  },
  {
    question: 'Can I share a timeline with other people?',
    answer:
      'Yes. Export a timeline as a PNG, a video, JSON, or a packaged .timeline file that bundles its images and notes. Anyone can open a .timeline file in the web viewer without installing anything. With Git Sync and a public GitHub repo, every synced timeline also gets a shareable link.',
    link: { to: '/wiki/Exporting/', label: 'Exporting guide' },
  },
  {
    question: 'What time scales and dates does it support?',
    answer:
      'Anything from a few days to billions of years. Dates can be years, months, or full calendar dates, with era labels like BCE and circa markers for approximate dates.',
    link: { to: '/wiki/Dates/', label: 'Writing dates' },
  },
  {
    question: 'How is Timelines Studio different from Aeon Timeline or World Anvil?',
    answer:
      'Timelines Studio is free, open-source, and focused only on timelines, with your data kept as local files. Aeon Timeline is a paid desktop app, and World Anvil is a browser-based worldbuilding platform where timelines are one feature among many.',
    link: { to: '/alternatives/', label: 'See the full comparison' },
  },
  {
    question: 'Is Timelines Studio ready to use?',
    answer:
      'It is in early alpha. It is usable today, but expect bugs, missing features, and occasional breaking changes, so keep backups of timelines you care about.',
  },
]

export const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}
