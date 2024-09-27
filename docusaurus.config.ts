import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Documentation o2switch',
  tagline: "Documentation de l'hébergeur web o2switch",
  favicon: 'img/favicon-32x32.png',

  // Set the production url of your site here
  url: 'https://faq.o2switch.fr',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'o2switchfr', // Usually your GitHub org/user name.
  projectName: 'doc', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/o2switchfr/documentation/tree/main/packages/create-docusaurus/templates/shared/',
          routeBasePath: '/',
        },
        blog: false,
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
          href: 'https://github.com/o2switchfr/documentation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: "Solutions d'hébergements",
          items: [
            {
              label: "L'Offre Unique",
              title: "Hébergement web illimité",
              to: 'https://www.o2switch.fr/hebergement-illimite/',
            },
            {
              label: "L'Offre Scale'UP",
              title: "Hébergement web entreprise",
              to: 'https://www.o2switch.fr/hebergement-entreprise/',
            },
            {
              label: "Managed Bare Metal",
              title: "Serveur dédié infogéré",
              to: 'https://www.o2switch.fr/serveurs-dedies/',
            },
          ],
        },
        {
          title: 'TODO',
          items: [
            {
              label: 'TODO',
              title:"tst",
              to:'/',
            },
            {
              label: 'TODO',
              to:'/',

            },
            {
              label: 'TODO',
              to:'/',

            },
          ],
        },
        {
          title: 'Nos satellites',
          items: [
            {
              label: 'Espace client',
              title: "L'espace client o2switch",
              to: 'https://clients.o2switch.fr',
            },
            {
              label: 'Blog',
              title: "Le blog d'o2switch",
              to: 'https://www.o2switch.fr/blog/',
            },
            {
              label: 'GitHub',
              title: 'GitHub o2swich',
              to: 'https://github.com/o2switchfr',
            },

          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} o2switch, Tous droits réservés. | <a class="footer__link-item" href="https://www.o2switch.fr/cgv/" target="_blank" title="CGV o2swich">Conditions Générales de vente</a> - <a class="footer__link-item" href="https://www.o2switch.fr/du-rgpd.pdf" target="_blank" title="D.U RGPD">Document Unique RGPD</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
      'docusaurus-plugin-sass',

  ],
};

export default config;
