import {
  themes as prismThemes,
} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';

const config: Config = {
  title: 'Documentation o2switch',
  tagline: "Documentation de l'hébergeur web o2switch",
  favicon: '/img/misc/favicon-alt.ico',

  // Set the production url of your site here
  url: 'http://v2doc.odns.fr',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'o2switchfr', 
  projectName: 'documentation', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/o2switchfr/documentation/edit/main/',
          routeBasePath: '/',
        } satisfies DocsOptions,
        blog: false,
        pages: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        } satisfies PageOptions,
        theme: {
          customCss: [
              './src/css/o2switch.scss',
              './src/css/sprite.css',
          ],
        },
      } satisfies Preset.Options,
    ],

  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Documentation',
      style: 'dark',
      logo: {
        alt: 'o2switch',
        src: 'img/misc/o2switch-logo-dark-bg.svg',
      },
      items: [
        {
          type: 'html',
          value: '<a href="https://github.com/o2switchfr/documentation" target="_blank" rel="noopener noreferrer nofollow" class="navbar__item navbar__link">GitHub</a>',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} <a class="footer__link-item" href="https://www.o2switch.fr" target="_blank">o2switch.fr</a>, Tous droits réservés.`,
    },
    prism: {
      theme: prismThemes.github, // nightOwlLight oneLight vsLight
      darkTheme: prismThemes.palenight, // palenight nightOwl
      additionalLanguages: ['php', 'apacheconf', 'javascript', 'markup', 'css', 'ruby', 'http', 'git', 'bash', 'json', 'csv'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
      'docusaurus-plugin-sass',
  ],
};

export default config;
