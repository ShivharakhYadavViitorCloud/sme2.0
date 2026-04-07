import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const gtgId = process.env.GTAG_ID;
/** Public base URL of the Node API (`server/`), e.g. http://localhost:8787 — no trailing /api */
const publicApiBaseUrl = process.env.PUBLIC_API_BASE_URL ?? '';

const config: Config = {
  title: 'SME 2.0',
  tagline: 'Team handbook for Git workflows, reviews, security, and automation',
  favicon: 'img/favicon.png',

  customFields: {
    publicApiBaseUrl,
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://ShivharakhYadavViitorCloud.github.io',
  baseUrl: '/',

  organizationName: 'ShivharakhYadavViitorCloud',
  projectName: 'sme2.0',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ShivharakhYadavViitorCloud/sme2.0/tree/main/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next',
              path: 'next',
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Local search (no Algolia crawl). For Algolia DocSearch, remove this plugin
    // and configure theme-search-algolia instead — do not enable both.
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    ...(gtgId
      ? [
          [
            '@docusaurus/plugin-google-gtag',
            {
              trackingID: gtgId,
              anonymizeIP: true,
            },
          ] as [string, Record<string, unknown>],
        ]
      : []),
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'keywords',
        content:
          'Git, DevOps, code review, conventional commits, SME, handbook, Docusaurus',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'SME 2.0',
      hideOnScroll: true,
      logo: {
        alt: 'SME 2.0 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Git Best Practices',
        },
        {
          to: '/api-reference',
          label: 'API reference',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ShivharakhYadavViitorCloud/sme2.0',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Git Best Practices',
              to: '/docs/next/git-best-practices/overview',
            },
            {
              label: 'API reference',
              to: '/api-reference',
            },
            {
              label: 'Platform upgrade',
              to: '/docs/next/project-upgrade',
            },
          ],
        },
        {
          title: 'Repository',
          items: [
            {
              label: 'Source',
              href: 'https://github.com/ShivharakhYadavViitorCloud/sme2.0',
            },
            {
              label: 'Issues',
              href: 'https://github.com/ShivharakhYadavViitorCloud/sme2.0/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SME 2.0. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'diff',
        'json',
        'powershell',
        'nginx',
        'yaml',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
