import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';


const sidebars: SidebarsConfig = {


  /**
   * Sidebar for /nom-de-domaine/*
   */
  domainSidebar: [
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
      href: '/espace-client',
      label: 'Espace client'  
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
      label: 'Nom de domaine',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'nom-de-domaine/index'
      },
      items: [
        {
          type: 'category',
          label: 'Changement de DNS',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'nom-de-domaine/changer-dns/index'
          },
          items: [
            'nom-de-domaine/changer-dns/bookmyname',
            'nom-de-domaine/changer-dns/gandi',
            'nom-de-domaine/changer-dns/ionos-1and1',
            'nom-de-domaine/changer-dns/o2switch',
            'nom-de-domaine/changer-dns/online',
            'nom-de-domaine/changer-dns/ovh',
          ],
        },
        {
          type: 'category',
          label: 'Code de transfert',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'nom-de-domaine/code-transfert/index'
          },
          items: [
            'nom-de-domaine/code-transfert/bookmyname',
            'nom-de-domaine/code-transfert/gandi',
            'nom-de-domaine/code-transfert/ionos-1and1',
            'nom-de-domaine/code-transfert/o2switch',
            'nom-de-domaine/code-transfert/online',
            'nom-de-domaine/code-transfert/ovh'
          ],
        },
        'nom-de-domaine/dns/configurer-txt-google-search-console',
        'nom-de-domaine/acheter-un-domaine',
        'nom-de-domaine/pointage-domaine',
        'nom-de-domaine/renouveler-un-domaine',
        'nom-de-domaine/transferer-un-domaine',
        'nom-de-domaine/verification-titulaire',    
      ],
    },
  ],

  /**
   * Sidebar for /guides/*
   */
  guideSidebar: [
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
      href: '/espace-client',
      label: 'Espace client'  
    },
    {
      type: 'link',
      href: '/nom-de-domaine',
      label: 'Nom de domaine'
    },
    {
      type: 'link',
      href: '/questions',
      label: 'Questions Fréquentes'
    },
    {
      type: 'category',
      label: 'Guides & Tutoriels',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'guides/index'
      },
      items: [
        {
          type: 'doc',
          id: 'guides/pour-commencer'
        },
        {
          type: 'category',
          label: 'Base de données',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/base-de-donnees/index'
          },
          items: [
            'guides/base-de-donnees/importer-grosse-base',
            'guides/base-de-donnees/phpmyadmin-independant',
            'guides/base-de-donnees/utilisateurs-droits-mysql'
          ],
        },
        {
          type: 'category',
          label: 'Configuration logiciel',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/configuration-logiciel/index'
          },
          items: [
            'guides/configuration-logiciel/configuration-ftp',
            'guides/configuration-logiciel/cyberduck',
            'guides/configuration-logiciel/filezilla',
            'guides/configuration-logiciel/iweb',
            'guides/configuration-logiciel/open-element',
            'guides/configuration-logiciel/toweb',
            'guides/configuration-logiciel/webacappella',
          ],
        },
        {
          type: 'category',
          label: 'cPanel',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/cpanel/index'
          },
          items: [
            'guides/cpanel/changer-mot-de-passe',
            'guides/cpanel/comment-se-connecter',
            'guides/cpanel/mot-de-passe-perdu',
            {type: 'link', href: '/cpanel', label: 'Les Outils cPanel'}
          ],
        },
        {
          type: 'category',
          label: 'Emails',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/emails/index'
          },
          items: [
            {
              type: 'category',
              label: 'Logiciel de Messagerie',
              collapsible: true,
              collapsed: true,
              link: {
                type: 'doc',
                id: 'guides/emails/client/index'
              },
              items: [
                'guides/emails/client/configurer-android',
                'guides/emails/client/configurer-iphone',
                'guides/emails/client/configurer-outlook',
                'guides/emails/client/configurer-thunderbird',
                'guides/emails/client/configurer-mail-mac'
              ],
            },
            'guides/emails/webmail/webmail',
            'guides/emails/configurer-import-gmail',
            'guides/emails/configurer-mx-google-apps',
            'guides/emails/creer-filtre-email',
            'guides/emails/difference-chiffree-vs-non-chiffree',
            'guides/emails/differences-pop-vs-imap',
            'guides/emails/probleme-envoi-mail',
            'guides/emails/redirecteur-email-vers-script', 
            'guides/emails/serveurs-smtp-sortant'
          ],
        },
        {
          type: 'category',
          label: "Migration de site",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/migrations/index'
          },
          items: [
            'guides/migrations/changer-hebergeur',
            'guides/migrations/deplacer-site-hebergement-o2switch',
            'guides/migrations/transferer-site-ovh-vers-o2switch',
            'guides/migrations/transferer-site-wordpress-ovh-vers-o2switch',
          ],
        },
        {
          type: 'category',
          label: 'Langages',
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'NodeJS',
              collapsible: true,
              collapsed: true,
              link: {
                type: 'doc',
                id: 'guides/nodejs/index'
              },
              items: [
                'guides/nodejs/utiliser-binaire-nodejs-npm-yarn',
                'guides/nodejs/application-reactjs',
                'guides/nodejs/installer-etherpad',
                'guides/nodejs/installer-wikijs',
              ],
            },
            {
              type: 'category',
              label: 'PHP',
              collapsible: true,
              collapsed: true,
              link: {
                type: 'doc',
                id: 'guides/php/index'
              },
              items: [
                'guides/php/changer-version-php-et-php-ini',
                'guides/php/comment-activer-soap',
                'guides/php/comment-augmenter-taille-upload',
                'guides/php/comment-changer-version-php-hebergement',
                'guides/php/comment-desactiver-cache-php',
                'guides/php/comment-forcer-affichage-erreurs-php',
                'guides/php/installer-composer',
              ],
            },
            /* TODO : Python, but we don't have any guides about Python yet */
            {
              type: 'category',
              label: 'Ruby',
              collapsible: true,
              collapsed: true,
              link: {
                type: 'doc',
                id: 'guides/ruby/index'
              },
              items: [
                'guides/ruby/installer-redmine'
              ],
            },
          ],
        },
        {
          type: 'category',
          label: "Webmastering",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/webmastering/index'
          },
          items: [
            'guides/webmastering/connexion-ssh',
            'guides/webmastering/debuguer-page-blanche-erreur-500',
            'guides/webmastering/forcer-https',
            'guides/webmastering/structure-recommandee-multisite'
          ],
        },
        {
          type: 'category',
          label: "WordPress",
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'guides/wordpress/index'
          },
          items: [
            'guides/wordpress/changer-adresse',
            'guides/wordpress/comment-installer-wordpress',
            'guides/wordpress/forcer-https',
            'guides/wordpress/introduction-wpcli',
            'guides/wordpress/mot-de-passe-administrateur-perdu'
          ],
        },
      ]
    },
  ],

  /**
   * Sidebar for /espace-client/*
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
          label: 'Les Offres',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'espace-client/offre/index'
          },
          items: [
            'espace-client/offre/delai-ouverture',
            'espace-client/offre/nom-de-domaine',
            'espace-client/offre/offre-unique-grow',
            'espace-client/offre/offre-unique-cloud',
            'espace-client/offre/offre-unique-pro',
            'espace-client/offre/periode-engagement',
            'espace-client/offre/serveur-infogere',
          ],
        },
        {
          type: 'category',
          label: 'Authentification',
          collapsible: true,
          collapsed: true,
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
   * Sidebar for /cpanel/*
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
