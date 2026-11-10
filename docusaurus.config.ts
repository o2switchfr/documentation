import warmLight from './src/prism/warmLight';
import {
  themes as prismThemes,
} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';

import { FontaineTransform } from 'fontaine'

const config: Config = {
  title: 'Documentation o2switch',
  tagline: "Documentation de l'hébergeur web o2switch",
  favicon: '/img/misc/favicon-alt.ico',
  url: 'https://faq.o2switch.fr',
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'o2switchfr', 
  projectName: 'documentation', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'throw',
  clientModules: ['./src/clientModules/anchor.ts'],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  future: {
    experimental_faster: true,
    v4: true,
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
        // La page /search/ ne sert plus : elle redirige vers l'accueil.
        sitemap: {
          ignorePatterns: ['/search/**'],
        },
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
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['fr'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: false,
        explicitSearchResultPath: true,
        // Les cartes des pages d'index répètent les titres des pages enfants : on les exclut de l'index.
        ignoreCssSelectors: ['.tool-card', '[class*="cardContainer_"]'],
      },
    ],
  ],
  themeConfig: {
    /* Not working as of now... 
    titleFormatter: ({ title, siteConfig }) => {
      return `${title}`;
    },
    */
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
      copyright: `<a class="footer__link-item" href="https://www.o2switch.fr" target="_blank">© ${new Date().getFullYear()} o2switch.fr - Tous droits réservés</a>`,
    },
    prism: {
      theme: warmLight, // palette de la charte (src/prism/warmLight.ts) ; fond et filets dans src/css/o2switch.scss
      darkTheme: prismThemes.palenight, // palenight nightOwl
      additionalLanguages: ['php', 'apacheconf', 'javascript', 'markup', 'css', 'ruby', 'http', 'git', 'bash', 'json', 'csv'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
      'docusaurus-plugin-sass',
      // @link https://blog.logrocket.com/docusaurus-using-fontaine-reduce-cumulative-layout-shift/
      function fontainePlugin(_context, _options) {
        return {
          name: 'fontaine-plugin',
          configureWebpack(_config, _isServer) {
            return {
              plugins: [
                FontaineTransform.webpack({
                  fallbacks: [
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Oxygen',
                    'Ubuntu',
                    'Cantarell',
                    'Open Sans',
                    'Helvetica Neue',
                    'sans-serif',
                  ],
                  resolvePath: (id) => '../fonts/' + id,
                }),
              ],
            };
          },
        };
      },
  ],
};

export default config;
