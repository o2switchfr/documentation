/**
 * Quick explanation about this file.
 * 
 * cPanel create two sprites of all the tools icons : one for the PNG, one for the SVG
 * We retrieved the sprite image and CSS code associated with it (see sprite.css). 
 * 
 * On the Doc, we want to have some reusable modules (like a card) to display a cPanel tools.
 * And we want it to be consistent and easy to use / easy to update later.
 * 
 * So we are using the CSS class name of the sprite as the "name" of the tool. 
 * For example the CSS classname of one the tool will be : icon-imunify-antivirus
 * And for us, here, we'll call this tool "imunify-antivirus".
 * 
 * And we'll have all the data associated with this tool here : 
 * - French name
 * - French description
 * - On which category the tools appear on cPanel
 * - Link to the related page doc 
 * - On which offers the tool is available
 * 
 * Then we'll create component that will re-use all of this data.
 */


const cpanelCategories = {
   security: {name: 'Sécurité', icon: 'security', to: '/cpanel/securite'},
   o2switch: {name: 'O2switch', icon: 'o2switch-tiger', to: '/cpanel/o2switch'},
   email: {name: 'Email', icon: 'email', to: '/cpanel/email'},
   files: {name: 'Fichiers', icon: 'files', to: '/cpanel/fichiers'},
   database: {name: 'Bases de données', icon: 'databases', to: '/cpanel/base-de-donnees'},
   domains: {name: 'Domaines', icon: 'domaines', to: '/cpanel/domaines'},
   metrics: {name: 'Mesures', icon: 'metrics', to: '/cpanel/mesures'},
   tools: {name: 'Outils', icon: 'outils', to: '/cpanel/outils'},
   software: {name: 'Logiciel', icon: 'software', to: '/cpanel/logiciel'},
   advanced: {name: 'Avancé', icon: 'advanced', to: '/cpanel/outils-avances'},
   preferences: {name: 'Préférences', icon: 'preferences', to: '/cpanel/preferences'},
   softaculous: {name: 'Softaculous', icon: 'group_soft_div', to: '/cpanel/softaculous'},
};

const offers = {
    grow: {name:"Offre Unique Grow", url:'https://www.o2switch.fr/hebergement-illimite/'},
    cloud: {name:"Offre Unique Cloud", url:'https://www.o2switch.fr/hebergement-illimite/'},
    pro: {name:"Offre Unique Pro", url:'https://www.o2switch.fr/hebergement-illimite/'},
    managed: {name:'Serveurs infogérés', url:'https://www.o2switch.fr/serveurs-dedies/'},
    domains: {name: 'Domaines', url:'https://clients.o2switch.fr/domaine/prix-domaines'},
};
const all_offers = [offers.grow, offers.cloud, offers.pro, offers.managed];
const all_shared_hosting = [offers.grow, offers.cloud, offers.pro];


/**
 * The idea is to have a common base, so that we can add the <ToolCard /> on multiple place on the doc with the same
 * content each time.
 *
 * It's generated from the cPanel CSS code that manage the Sprite. Then edited manually to add the French name + desc
 * The command to run to re-create the base :
 *
 * $> grep '.icon' sprite.css | cut -d'-' -f 2- | cut -d ' ' -f 1 | while read name ; do echo -e "'$name': {\n\tname:\"\",\n\tdesc:\"\",\n\ticon:\"$name\",\n\tcategory:\"\",\n}," ; done
 */

const cpanelTool = {
    'imunify-antivirus': {
        name:"Antivirus Imunify",
        desc:"Logiciel antivirus qui scanne les fichiers de l'hébergement à la recherche de fichiers malveillants",
        icon:"imunify-antivirus",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/antivirus-imunify',
        offers: [offers.cloud, offers.pro],
    },
    'o2switch-ipxtender': {
        name:"ipXtender",
        desc:"Permet de changer l'adresse IP associée à un nom de domaine afin d'utiliser plusieurs IP différentes sur le même hébergement",
        icon:"o2switch-ipxtender",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/ipxtender-hebergement-multi-ips',
        offers: all_offers,
    },
    'o2switch-lscache': {
        name:"LiteSpeed LSCache",
        desc:"Améliore la vitesse de chargement des sites en activant un puissant cache serveur : LScache",
        icon:"o2switch-lscache",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/litespeed-cache-webadc',
        offers: all_offers,
    },
    'o2switch-memcached-manager': {
        name:"Memcached",
        desc:"Permet d'activer une instance privée de Memcached qui peut être utilisé pour mettre en cache des données",
        icon:"o2switch-memcached-manager",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/memcached',
        offers: all_offers,
    },
    'o2switch-multiple-accounts': {
        name:"Gestion de mon Univers Web",
        desc:"Améliore la sécurité et le cloisonnement des sites en permettant la création de sous-compte cPanel",
        icon:"o2switch-multiple-accounts",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/univers-web-sous-comptes',
        offers: all_offers,
    },
    'o2switch-pagespeed': {
        name:"PageSpeed",
        desc:"Permet d'activer des règles Pagespeed qui servent à forcer certaines bonnes pratiques en terme de performance web",
        icon:"o2switch-pagespeed",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/optimisation-pagespeed',
        offers: all_shared_hosting,
    },
    'o2switch-redis-manager': {
        name:"Redis",
        desc:"Permet d'activer une instance privée de Redis qui peut être utilisé comme système de cache sur des applications",
        icon:"o2switch-redis-manager",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/redis',
        offers: all_offers,
    },
    'o2switch-ssl-certificate': {
        name:"Status SSL",
        desc:"Permet de vérifier la validité des certificats SSL sur les noms de domaines hébergés",
        icon:"o2switch-ssl-certificate",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/securite/status-certificat-ssl',
        offers: all_offers,
    },
    'o2switch-tiger-protect': {
        name:"TigerProtect",
        desc:"Permet de personnaliser les règles de sécurités en place l'hébergement web",
        icon:"o2switch-tiger-protect",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/tiger-protect-waf',
        offers: all_offers,
    },
    'o2switch-wp-tiger': {
        name:"WPTiger",
        desc:"WPTiger est une boite à outils pour faciliter l'administration et gestion de sites WordPress",
        icon:"o2switch-wp-tiger",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/wptiger',
        offers: all_offers,
    },
    'o2switch-xtrem-cache': {
        name:"xtremCache",
        desc:"Améliore la vitesse de chargement des sites en permettant l'activation d'un puissant cache serveur Varnish",
        icon:"o2switch-xtrem-cache",
        cat: cpanelCategories.o2switch,
        to: '/cpanel/o2switch/xtremcache-varnish',
        offers: all_offers,
    },
    /*
    'sitepad_div_icons': {
        name:"Sitepad",
        desc:"Sitepad permet de créer un site internet facilement via système de construction de site visuel et facile d'utilisation",
        icon:"sitepad_div_icons",
        cat: cpanelCategories.tools,
        to: '/cpanel/outils/site-builder-sitepad',
        offers: all_offers,
    },*/
    'soft_div_icons': {
        name:"Softaculous App Installer",
        desc:"Lance l'outil softaculous qui permet d'installer un grand nombre de CMS de manière quasi-automatique",
        icon:"soft_div_icons",
        cat: cpanelCategories.software,
        to: '/cpanel/outils/installateur-softaculous',
        offers: all_offers,
    },
    'address_importer': {
        name:"Importation d'adresses",
        desc:"Permet de créer en masse des adresses emails et redirections via une importation à partir d'un fichier CSV ou Excel",
        icon:"address_importer",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/import-massif-compte-email',
        offers: all_offers,
    },
    /*'apache_handlers': {
        name:"Gestionnaire apache",
        desc:"Contrôle la façon dont le serveur web apache traite certains types de fichiers via l'ajout d'handlers",
        icon:"apache_handlers",
        cat: cpanelCategories.advanced,
        to: '/cpanel/outils-avances/gestionnaire-type-mime',
        offers: all_offers,
    },*/
    'apache_spam_assassin': {
        name:"Comportement Antispam",
        desc:"Permet de gérer l'antispam, en désactivant le trie automatique des emails en spam ou en désactivant totalement l'antispam",
        icon:"apache_spam_assassin",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/filtre-antispam',
        offers: all_offers,
    },
    'api_tokens': {
        name:"API Tokens",
        desc:"Permet de créer des Tokens d'API afin d'utiliser l'API de cPanel sans avoir à requérir l'identifiant et mot de passe du compte",
        icon:"api_tokens",
        cat:"Sécurité",
        to: '/cpanel/securite/token-api-cpanel',
        offers: all_offers,
    },
    'autoresponders': {
        name:"Répondeur automatique",
        desc:"Permet d'ajouter un répondeur sur votre adresse email (email “type” envoyé automatiquement en réponse aux emails reçus)",
        icon:"autoresponders",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/repondeur-automatique',
        offers: all_offers,
    },
    'awstats': {
        name:"AWStats",
        desc:"Permet de consulter vos statistiques de fréquentation, généré à partir des logs d'accès serveur",
        icon:"awstats",
        cat: cpanelCategories.metrics,
        to: '/cpanel/mesures/analytics-awstats',
        offers: all_offers,
    },
    'bandwidth': {
        name:"Bande passante",
        desc:"Permet de consulter vos statistiques de fréquentation\n",
        icon:"bandwidth",
        cat: cpanelCategories.metrics,
        to: '/cpanel/mesures/usage-bande-passante',
        offers: all_offers,
    },
    'boxtrapper': {
        name:"BoxTrapper",
        desc:"Permet d'ajouter un filtre antispam qui envoie un email avec un lien de confirmation pour chaque mail reçu\n",
        icon:"boxtrapper",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/antispam-boxtrapper',
        offers: all_offers,
    },
    'calendar_and_contacts': {
        name:"Calendriers et contacts",
        desc:"Permet de créer des calendriers et contacts synchronisables avec des logiciels de messageries",
        icon:"calendar_and_contacts",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/calendrier-contact-email',
        offers: all_offers,
    },
    'change_language': {
        name:"Modifier la langue",
        desc:"Permet de changer la langue de l'interface de cPanel",
        icon:"change_language",
        cat: cpanelCategories.preferences,
        to: '/cpanel/preferences/langage',
        offers: all_offers,
    },
    'change_password': {
        name:"Mot de passe et sécurité",
        desc:"Permet de changer le mot de passe de votre hébergement",
        icon:"change_password",
        cat: cpanelCategories.preferences,
        to: '/cpanel/preferences/mot-de-passe',
        offers: all_offers,
    },
    /*'clam_av': {
        name:"Antivirus",
        desc:"Permet de lancer un scan antivirus avec le logiciel ClamAV (legacy)",
        icon:"clam_av",
        cat:"Sécurité",
        to: '/cpanel/securite/antivirus-imunify',
        offers: all_offers,
    },*/
    'contact_information': {
        name:"Coordonnées",
        desc:"Permet de mettre à jour les préférences de contacts",
        icon:"contact_information",
        cat: cpanelCategories.preferences,
        to: '/cpanel/preferences/coordonnees',
        offers: all_offers,
    },
    'cpu_and_concurrent_connection_usage': {
        name:"Utilisation des ressources",
        desc:"Permet de consulter la consommation CPU, mémoire et IO de votre hébergement",
        icon:"cpu_and_concurrent_connection_usage",
        cat: cpanelCategories.metrics,
        to: '/cpanel/mesures/suivi-usage-ressources',
        offers: all_offers,
    },
    'cron_jobs': {
        name:"Tâches Cron",
        desc:"Permet de gérer et planifier des tâches qui doivent être exécutées à un interval récurrent",
        icon:"cron_jobs",
        cat: cpanelCategories.advanced,
        to: '/cpanel/outils-avances/tache-planifiee-cron',
        offers: all_offers,
    },
    /*'default_address': {
        name:"",
        desc:"",
        icon:"default_address",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    'directory_privacy': {
        name:"Confidentialité du répertoire",
        desc:"Permet d'ajouter une protection par mot de passe sur un répertoire accessible depuis une URL",
        icon:"directory_privacy",
        cat: cpanelCategories.files,
        to: '/cpanel/fichiers/protection-repertoire-web',
        offers: all_offers,
    },
    'disk_usage': {
        name:"Utilisation du disque",
        desc:"Permet d'observer le niveau d'utilisation du disque de votre hébergement web, dossier par dossier",
        icon:"disk_usage",
        cat: cpanelCategories.files,
        to: '/cpanel/fichiers/utilisation-disque',
        offers: all_offers,
    },
    'domains': {
        name:"Domaines Configurés",
        desc:"Permet d'associer des noms de domaine supplémentaires sur votre hébergement en le liant à un dossier de votre choix",
        icon:"domains",
        cat: cpanelCategories.domains,
        to: '/cpanel/domaines/configuration-domaine',
        offers: all_offers,
    },
    'email_accounts': {
        name:"Comptes de messagerie",
        desc:"Permet de créer des adresses emails personnalisées et de gérer les adresses existantes",
        icon:"email_accounts",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/adresse-email',
        offers: all_offers,
    },
    'email_deliverability': {
        name:"Authentification",
        desc:"Permet de gérer les configurations DKIM et SPF de votre compte pour améliorer la délivrabilité de vos mails",
        icon:"email_deliverability",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/delivrabilite-spf-dkim',
        offers: all_offers,
    },
    'email_disk_usage': {
        name:"Usage disque email",
        desc:"Permet d'observer le niveau d'utilisation du disque pour les comptes emails de votre hébergement web",
        icon:"email_disk_usage",
        cat: cpanelCategories.email,
        to: '/cpanel/emails',
        offers: all_offers,
    },
    'email_filters': {
        name:"Filtres de messagerie",
        desc:"Permet d'ajouter des filtres de messageries sur une adresse email pour les messages réceptionnés",
        icon:"email_filters",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/filtre-email',
        offers: all_offers,
    },
    'email_routing': {
        name:"Routage des emails",
        desc:"Permet de contrôler le comportement de l'hébergement concernant la reception des emails d'un nom de domaine",
        icon:"email_routing",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/routage-email',
        offers: all_offers,
    },
    'encryption': {
        name:"Chiffrement",
        desc:"	Permet de créer une clé de chiffrement GnuPG",
        icon:"encryption",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/chiffrement-gpg',
        offers: all_offers,
    },
    'error_pages': {
        name:"Pages d'erreurs",
        desc:"Permet de définir des pages d'erreurs personnalisées",
        icon:"error_pages",
        cat: cpanelCategories.advanced,
        to: '/cpanel/outils-avances/pages-erreurs-personnalises',
        offers: all_offers,
    },
    'errors': {
        name:"Erreurs",
        desc:"Permet de voir les 300 dernières erreurs remontées par le serveur Web Apache sur vos sites",
        icon:"errors",
        cat: cpanelCategories.advanced,
        to: '/cpanel/mesures/erreurs-apache',
        offers: all_offers,
    },
    'file_manager': {
        name:"Gestionnaire de fichiers",
        desc:"Gestionnaire de fichiers vous permet de consulter et d'éditer les fichiers de votre hébergement depuis une interface web",
        icon:"file_manager",
        cat: cpanelCategories.files,
        to: '/cpanel/fichiers/gestionnaire-fichiers-web',
        offers: all_offers,
    },
    'forwarders': {
        name:"Redirecteurs",
        desc:"Permet de programmer des renvois (redirections automatiques) pour vos adresses emails",
        icon:"forwarders",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/redirecteur-email',
        offers: all_offers,
    },
    'ftp_accounts': {
        name:"Comptes FTP",
        desc:"Permet de gérer et de créer des comptes FTP, servant à envoyer/recevoir des fichiers sur l'hébergement",
        icon:"ftp_accounts",
        cat: cpanelCategories.files,
        to: '/cpanel/fichiers/comptes-ftp',
        offers: all_offers,
    },
    'global_email_filters': {
        name:"Filtres de messagerie globaux",
        desc:"Permet de créer des filtres de messageries agissant pour les emails entrants pour l'ensemble des adresses emails du compte d'hébergement",
        icon:"global_email_filters",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/filtre-email-global',
        offers: all_offers,
    },
    /*'images': {
        name:"Images",
        desc:"Fournis 3 outils de manipulations d'images permettant de créer des miniatures, convertir et modifier la tailles des images",
        icon:"images",
        cat: cpanelCategories.files,
        to: '/todo',
        offers: all_offers,
    },*/
    'indexes': {
        name:"Index",
        desc:"Permet de personnaliser l'affichage web des fichiers dans un dossier (définir la page d'index, afficher ou non les fichiers)",
        icon:"indexes",
        cat: cpanelCategories.advanced,
        to: '/cpanel/outils-avances/gestionnaire-index',
        offers: all_offers,
    },
    'ip_blocker': {
        name:"Bloqueur d'adresses IP",
        desc:"Permet de bloquer le traffic web venant d'adresses ou plages d'IP sur votre espace d'hébergement",
        icon:"ip_blocker",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/bloqueur-adresse-ip',
        offers: all_offers,
    },
    'jb5': {
        name:"JetBackup",
        desc:"Permet d'accéder aux archives effectuées par o2switch et de les restaurer",
        icon:"jb5",
        cat: cpanelCategories.files,
        to: '/cpanel/fichiers/sauvegarde-jetbackup',
        offers: all_offers,
    },
    'letsencrypt-cpanel': {
        name:"Let's Encrypt",
        desc:"Permet de générer un certificat SSL Let's Encrypt gratuitement",
        icon:"letsencrypt-cpanel",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/lets-encrypt-ssl-gratuit',
        offers: all_offers,
    },
    'lvenodejssel': {
        name:"Setup Node.js App",
        desc:"Permet d'installer une application NodeJS en créant un environnement NodeJS de votre choix (choix de la version, installation des dépendances)",
        icon:"lvenodejssel",
        cat: cpanelCategories.software,
        to: '/cpanel/logiciels/hebergement-nodejs-multi-version',
        offers: all_offers,
    },
    'lvephpsel': {
        name:"Sélectionner une version de PHP",
        desc:"Permet de changer l'environnement PHP de l'hébergement (version de PHP, module, php.ini)",
        icon:"lvephpsel",
        cat: cpanelCategories.software,
        to: '/cpanel/logiciels/hebergement-php-multi-version/',
        offers: all_offers,
    },
    'lvepythonsel': {
        name:"Setup Python App",
        desc:"Permet d'installer une application Python. L'outil permet de créer un environnement Python avec la version de Python de votre choix.",
        icon:"lvepythonsel",
        cat: cpanelCategories.software,
        to: '/cpanel/logiciels/hebergement-python-multi-version',
        offers: all_offers,
    },
    'lveresusage': {
        name:"Utilisation des ressources",
        desc:"Permet d'observeer la consommation CPU, mémoire et IO de votre hébergement",
        icon:"lveresusage",
        cat: cpanelCategories.metrics,
        to: '/cpanel/mesures/suivi-usage-ressources',
        offers: all_offers,
    },
    'lverubysel': {
        name:"Setup Ruby App",
        desc:"Permet d'installer une application Ruby, l'outil génère un environnement Ruby adapté à votre application",
        icon:"lverubysel",
        cat: cpanelCategories.software,
        to: '/cpanel/logiciels/hebergement-ruby-multi-version',
        offers: all_offers,
    },
    /*'lvewpos': {
        name:"",
        desc:"",
        icon:"lvewpos",
        cat: cpanelCategories,
        to: '/todo',
        offers: [offers.scaleup],
    },
    'lvexray': {
        name:"",
        desc:"",
        icon:"lvexray",
        cat: cpanelCategories,
        to: '/todo',
        offers: [offers.scaleup],
    },*/
    'mailing_lists': {
        name:"Listes de diffusion",
        desc:"Permet de créer des listes de diffusions. Outils non supporté officiellement, aucun support sur cet outil. Proposé tel quel.",
        icon:"mailing_lists",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/liste-diffusion',
        offers: all_offers,
    },
    /*
    'manage_calendar_access': {
        name:"Calendriers et contacts",
        desc:"Permet d'obtenir les informations de connexions caldav/carddav",
        icon:"manage_calendar_access",
        cat: cpanelCategories.email,
        to: '/#todo',
        offers: all_offers,
    },
    */
    /*'metrics_editor': {
        name:"",
        desc:"",
        icon:"metrics_editor",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    /*'mime_types': {
        name:"",
        desc:"",
        icon:"mime_types",
        cat: cpanelCategories,
        to: '/cpanel/outils-avances/types-mime',
        offers: all_offers,
    },*/
    'mod_security': {
        name:"Mod Security",
        desc:"Permet d'activer/désactiver le WAF (Parefeu applicatif) Mod Security",
        icon:"mod_security",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/mod-security-waf',
        offers: all_offers,
    },
    /*'mx_entry': {
        name:"",
        desc:"",
        icon:"mx_entry",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    /*'mysql_database_wizard': {
        name:"",
        desc:"",
        icon:"mysql_database_wizard",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    'mysql_databases': {
        name:"Bases de données MySQL",
        desc:"Permet de créer et gérer des bases de données MySQL ainsi que les utilisateurs et droits",
        icon:"mysql_databases",
        cat: cpanelCategories.database,
        to: '/cpanel/bases-de-donnees/mysql',
        offers: all_offers,
    },
    /*'mysql_manager': {
        name:"",
        desc:"",
        icon:"mysql_manager",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    'php_my_admin': {
        name:"phpMyAdmin",
        desc:"phpMyAdmin est un outil qui permet de travailler et consulter vos bases de données",
        icon:"php_my_admin",
        cat: cpanelCategories.database,
        to: '/cpanel/bases-de-donnees/phpmyadmin',
        offers: all_offers,
    },
    'php_pg_admin': {
        name:"phpPgAdmin",
        desc:"L'équivalent de phpMyAdmin pour les bases de données PostgreSQL",
        icon:"php_pg_admin",
        cat: cpanelCategories.database,
        to: '/cpanel/bases-de-donnees/phppgadmin',
        offers: all_offers,
    },
    /*'postgresql_database_wizard': {
        name:"",
        desc:"",
        icon:"postgresql_database_wizard",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    'postgresql_databases': {
        name:"Base de données PostgreSQL",
        desc:"Permet de créer et gérer des bases de données PostgreSQL",
        icon:"postgresql_databases",
        cat: cpanelCategories.database,
        to: '/cpanel/bases-de-donnees/postgresql',
        offers: all_offers,
    },
    'raw_access': {
        name:"Accès brut",
        desc:"Permet de consulter les logs d'accès brut (apache) de vos sites",
        icon:"raw_access",
        cat: cpanelCategories.metrics,
        to: '/cpanel/mesures/log-acces-brut',
        offers: all_offers,
    },
    'redirects': {
        name:"Redirections",
        desc:"Permet de créer et gérer les redirections de noms de domaines ou pages",
        icon:"redirects",
        cat: cpanelCategories.domains,
        to: '/cpanel/domaines/redirection-domaine',
        offers: all_offers,
    },
    'remote_mysql': {
        name:"MySQL distant",
        desc:"Permet de configurer des exceptions pour autoriser l'accès à distances aux bases MySQL",
        icon:"remote_mysql",
        cat: cpanelCategories.database,
        to: '/cpanel/bases-de-donnees/mysql-distant',
        offers: all_offers,
    },
    /*
    'sitepad': {
        name:"Sitepad",
        desc:"Sitepad permet de créer un site internet facilement via système de construction de site visuel et facile d'utilisation",
        icon:"sitepad",
        cat: cpanelCategories.tools,
        to: '/cpanel/outils/site-builder-sitepad',
        offers: all_offers,
    },*/
    'softaculous': {
        name:"Softaculous Apps Installer",
        desc:"Lance l'outil softaculous qui permet d'installer un grand nombre de CMS de manière quasi-automatique",
        icon:"softaculous",
        cat: cpanelCategories.software,
        to: '/cpanel/outils/installateur-softaculous',
        offers: all_offers,
    },
    /*'solr_search_index': {
        name:"",
        desc:"",
        icon:"solr_search_index",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    'ssh-whitelist': {
        name:"Autorisation SSH",
        desc:"Vous permet de placer votre adresse IP (ou un domaine) en liste blanche sur le parefeu (pour SSH par exemple)",
        icon:"ssh-whitelist",
        cat: cpanelCategories.tools,
        to: '/cpanel/outils/exception-parefeu',
        offers: all_offers,
    },
    /* Useless */
    /*'ssh_access': { 
        name:"Accès SSH",
        desc:"Permet de gestion/génération de clés SSH. N'enlève pas la nécessité de demander l'ouverture de SSH et le passage en liste blanche.",
        icon:"ssh_access",
        cat: cpanelCategories.security,
        to: '/#todo',
        offers: all_offers,
    },*/
    'ssl_tls': {
        name:"SSL/TLS",
        desc:"Permet de créer et gérer vos certificats SSL pour vos sites (HTTPS)",
        icon:"ssl_tls",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/certificat-ssl',
        offers: all_offers,
    },
    'subdomains': {
        name:"Sous-Domaines",
        desc:"Permet de créer et gérer des sous domaines",
        icon:"subdomains",
        cat: cpanelCategories.domains,
        to: '/cpanel/domaines/configuration-sous-domaine',
        offers: all_offers,
    },
    'terminal': {
        name:"Terminal",
        desc:"Permet d'accéder en SSH sur votre hébergement à partir de cPanel via votre navigateur web",
        icon:"terminal",
        cat: cpanelCategories.advanced,
        to: '/cpanel/outils-avances/terminal-ssh-web',
        offers: all_offers,
    },
    'tls_status': {
        name:"Status SSL/TLS",
        desc:"Permet de vérifier la validité des certificats SSL sur les noms de domaines hébergés",
        icon:"tls_status",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/status-certificat-ssl',
        offers: all_offers,
    },
    /*'tls_wizard': {
        name:"",
        desc:"",
        icon:"tls_wizard",
        cat: cpanelCategories,
        to: '/todo',
        offers: all_offers,
    },*/
    'track_delivery': {
        name:"Suivre la remise",
        desc:"Permet de vérifier qu'un email a bien été émis correctement en consultant les logs récents",
        icon:"track_delivery",
        cat: cpanelCategories.email,
        to: '/cpanel/emails/suivi-remise-log-email',
        offers: all_offers,
    },
    'two_factor_authentication': {
        name:"Authentification à deux facteurs",
        desc:"Permet d'activer l'authentification à deux facteurs pour la connexion sur votre espace d'hébergement",
        icon:"two_factor_authentication",
        cat: cpanelCategories.security,
        to: '/cpanel/securite/authentification-mfa/',
        offers: all_offers,
    },
    'version_control': {
        name:"Git Version Control",
        desc:"Permet de créer et gérer des dépôts GIT sur l'hébergement via GitWeb",
        icon:"version_control",
        cat: cpanelCategories.files,
        to: '/cpanel/fichiers/gitweb/',
        offers: all_offers,
    },
    'visitors': {
        name:"Visiteurs",
        desc:"Permet d'afficher les 1000 dernières visites d'un site hébergé",
        icon:"visitors",
        cat: cpanelCategories.metrics,
        to: '/cpanel/mesures/visiteurs',
        offers: all_offers,
    },
    'zone_editor': {
        name:"Zone Editor",
        desc:"Outil permettant de gérer les zones DNS des domaines de l'hébergement",
        icon:"zone_editor",
        cat: cpanelCategories.domains,
        to: '/cpanel/domaines/editeur-zone-dns',
        offers: all_offers,
    },
};

export default {
    cpanelCategories: cpanelCategories,
    offers: offers,
    cpanelTool: cpanelTool,    
};