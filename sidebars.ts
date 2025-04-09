import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {

  /**
   * Page related to the customer interface (clients.o2switch.fr)
   * /espace-client/* on the documentation
   */
  customerInterface: [
    {
      type: 'link',
      href: '/',
      label: 'Accueil'
    },
    {
      type: 'link',
      href: '/cpanel',
      label: 'Hébergement web'  
    },
    {
      type: 'link',
      href: '/nom-de-domaine',
      label: 'Nom de Domaine'  
    },
    {
      type: 'link',
      href: '/guides',
      label: 'Guides & Tutoriels'  
    },
    {
      type: 'link',
      href: '/questions',
      label: 'Questions Fréquentes'
    },
    {
      type: 'category',
      label: 'Espace client',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'espace-client/index'
      },
      items: [
        {
          type: 'category',
          label: 'Authentification',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'espace-client/auth/index'
          },
          items: [
            'espace-client/auth/changer-mot-de-passe',
            'espace-client/auth/comment-se-connecter',
            'espace-client/auth/ouvrir-un-compte',
            'espace-client/auth/mot-de-passe-perdu',
            'espace-client/auth/double-authentification',
          ],
        },
        {
          type: 'category',
          label: 'Commande & Facturation',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'espace-client/commande/index'
          },
          items: [
            'espace-client/commande/comment-commander',
            'espace-client/commande/renouvellement-automatique',
            'espace-client/commande/facturation',
            'espace-client/commande/remboursement',           
          ],
        },
        {
          type: 'category',
          label: 'Gestion des contacts',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'espace-client/commande/index'
          },
          items: [
            'espace-client/gestion-contact/administratif',
            'espace-client/gestion-contact/technique',
          ],
        },
        {
          type: 'category',
          label: 'Changement de titulaire',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'espace-client/trade/index'
          },
          items: [
            'espace-client/trade/ceder-hebergement',
            'espace-client/trade/ceder-nom-de-domaine',
          ],
        },
      ],
    },
  ],

  /**
   * Page related to the shared web hosting (cPanel tools)
   * /cpanel/* on the documentation
   */
  webHosting: [
    {
      type: 'link',
      href: '/',
      label: 'Accueil'  
    },
    {
      type: 'link',
      href: '/espace-client',
      label: 'Espace Client'  
    },
    {
      type: 'link',
      href: '/nom-de-domaine',
      label: 'Nom de Domaine'  
    },
    {
      type: 'link',
      href: '/guides',
      label: 'Guides & Tutoriels'  
    },
    {
      type: 'link',
      href: '/questions',
      label: 'Questions Fréquentes'  
    },
    {
      type: 'category',
      label: 'Hébergement Web',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'cpanel/index'
      },
      items: [
        {
          type: 'category',
          label: 'Outils Exclusifs',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/o2switch/index'
          },
          items: [
            'cpanel/o2switch/wptiger/index',
            'cpanel/o2switch/univers-web-sous-comptes',
            'cpanel/o2switch/tiger-protect-waf',
            'cpanel/o2switch/ipxtender-hebergement-multi-ips',
            'cpanel/o2switch/litespeed-cache-webadc',
            'cpanel/o2switch/xtremcache-varnish',        
            'cpanel/o2switch/redis',
            'cpanel/o2switch/memcached',
            'cpanel/o2switch/optimisation-pagespeed',
          ],
        },
        {
          type: 'category',
          label: 'Domaines',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/domaines/index'
          },
          items: [
            'cpanel/domaines/configuration-domaine',
            'cpanel/domaines/configuration-sous-domaine',
            'cpanel/domaines/editeur-zone-dns',
            'cpanel/domaines/redirection-domaine',
          ],
        },
        {
          type: 'category',
          label: 'Emails',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/emails/index'
          },
          items: [
            'cpanel/emails/adresse-email',
            'cpanel/emails/delivrabilite-spf-dkim',
            'cpanel/emails/suivi-remise-log-email',
            'cpanel/emails/repondeur-automatique',
            'cpanel/emails/redirecteur-email',
            'cpanel/emails/filtre-email',
            'cpanel/emails/filtre-email-global',
            'cpanel/emails/routage-email',
            'cpanel/emails/antispam-boxtrapper',
            /**
             * Not the right time. In between the old CCS software and the new updated cpdavd (not available on current LTS)
             * Need to wait for the next LTS (v126 ?) version of cPanel before documenting this
             * - https://features.cpanel.net/c/69-extend-cpdavd-to-support-contacts-and-calendars
             * - https://docs.cpanel.net/knowledge-base/cpanel-product/product-versions-and-the-release-process/#releases
             * 'cpanel/emails/calendrier-contact'
             */
            'cpanel/emails/chiffrement-gpg',
            'cpanel/emails/espace-disque-email',
            'cpanel/emails/filtre-antispam',
            'cpanel/emails/import-massif-compte-email',
            // 'cpanel/emails/liste-diffusion',
          ],
        },
        {
          type: 'category',
          label: 'Bases de données',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/bases-de-donnees/index'
          },
          items: [
            'cpanel/bases-de-donnees/mysql',
            'cpanel/bases-de-donnees/phpmyadmin',
            'cpanel/bases-de-donnees/mysql-distant',
            'cpanel/bases-de-donnees/postgresql',
            'cpanel/bases-de-donnees/phppgadmin',
            
          ],
        }, 
        {
          type: 'category',
          label: 'Langages',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/logiciels/index'
          },
          items: [
            'cpanel/logiciels/hebergement-php-multi-version',
            'cpanel/logiciels/hebergement-nodejs-multi-version',
            'cpanel/logiciels/hebergement-python-multi-version',
            'cpanel/logiciels/hebergement-ruby-multi-version',
          ],
        },      
        {
          type: 'category',
          label: 'Sécurité',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/securite/index'
          },
          items: [
            'cpanel/securite/antivirus-imunify',
            'cpanel/securite/mod-security-waf',
            'cpanel/securite/authentification-mfa',
            'cpanel/securite/token-api-cpanel',
            'cpanel/securite/status-certificat-ssl',
            'cpanel/securite/bloqueur-adresse-ip',
            'cpanel/securite/lets-encrypt-ssl-gratuit',
            'cpanel/securite/certificat-ssl',
          ],
        },
        {
          type: 'category',
          label: 'Fichiers',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/fichiers/index'
          },
          items: [
            'cpanel/fichiers/comptes-ftp',
            'cpanel/fichiers/gestionnaire-fichiers-web',
            'cpanel/fichiers/sauvegarde-jetbackup',
            'cpanel/fichiers/protection-repertoire-web',
            'cpanel/fichiers/gitweb',
            'cpanel/fichiers/utilisation-disque',
          ],
        },
        {
          type: 'category',
          label: 'Outils',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/outils/index'
          },
          items: [
            'cpanel/outils/exception-parefeu',
            'cpanel/outils/installateur-softaculous',
          ],
        },
        {
          type: 'category',
          label: 'Outils Avancés',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/outils-avances/index'
          },
          items: [
            'cpanel/outils-avances/tache-planifiee-cron',
            'cpanel/outils-avances/terminal-ssh-web',
            'cpanel/outils-avances/pages-erreurs-personnalises',
            'cpanel/outils-avances/gestionnaire-index',
          ],
        },
       
        {
          type: 'category',
          label: 'Mesures',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/mesures/index'
          },
          items: [
            'cpanel/mesures/suivi-usage-ressources',
            'cpanel/mesures/log-acces-brut',
            'cpanel/mesures/erreurs-apache',
            'cpanel/mesures/analytics-awstats',
            'cpanel/mesures/visiteurs',
            'cpanel/mesures/usage-bande-passante',

          ],
        },
       
       
        {
          type: 'category',
          label: 'Préférences',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'cpanel/preferences/index'
          },
          items: [
            'cpanel/preferences/coordonnees',
            'cpanel/preferences/langage',
            'cpanel/preferences/mot-de-passe',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
