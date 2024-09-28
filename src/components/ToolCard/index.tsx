import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import CpanelIcon from "@site/src/components/CpanelIcon";

type ToolCard = {
    tool: string;
    title: null | string;
    desc: null | string;
    category: null | string;
    class: null | string;
    type: null | 'full';
    href: null | string;
}


/**
 * For the Groups, the css class will be prefixed with "icon-group-". Example : icon-group_email*
 * For the Tools, it's prefixed with "icon-". Example : icon-email_accounts
 */
const cpanelCategories = {
    security: {name: 'Sécurité', icon: 'security', to: 'todo'},
    o2switch: {name: 'O2switch', icon: 'o2switch-tiger', to: 'todo'},
    email: {name: 'Email', icon: 'email', to: 'todo'},
    files: {name: 'Fichiers', icon: 'files', to: 'todo'},
    database: {name: 'Bases de données', icon: 'databases', to: 'todo'},
    domains: {name: 'Domaines', icon: 'domaines', to: 'todo'},
    metrics: {name: 'Mesures', icon: 'metrics', to: 'todo'},
    tools: {name: 'Outils', icon: 'outils', to: 'todo'},
    software: {name: 'Logiciel', icon: 'software', to: 'todo'},
    advanced: {name: 'Avancé', icon: 'advanced', to: 'todo'},
    preferences: {name: 'Préférences', icon: 'preferences', to: 'todo'},
    softaculous: {name: 'Softaculous', icon: 'group_soft_div', to: 'todo'},
}


/**
 * Current list of offers.
 * So we have the information on which tools are available on which offers.
 */
const offers = {
    shared: {name:"Offre Unique", url:'https://www.o2switch.fr/hebergement-illimite/'},
    scaleup: {name:"Scale'UP", url:'https://www.o2switch.fr/hebergement-entreprise/'},
    managed: {name:'Serveurs infogérés', url:'https://www.o2switch.fr/serveurs-dedies/'},
    domains: {name: 'Domaines', url:'https://clients.o2switch.fr/domaine/prix-domaines'},
}

// Shortcut
const all_offers = [offers.shared, offers.scaleup, offers.managed];
const all_shared_hosting = [offers.shared, offers.scaleup];

/**
 * The idea is to have a common base here, so that we can add the ToolCard on multiple place on the doc with the same
 * content each time.
 *
 * It's generated from the cPanel CSS code that manage the Sprite. Then edited manually to add the French name + desc
 * The command to run to re-create the base :
 *
 * $> grep '.icon' sprite.css | cut -d'-' -f 2- | cut -d ' ' -f 1 | while read name ; do echo -e "'$name': {\n\tname:\"\",\n\tdesc:\"\",\n\ticon:\"$name\",\n\tcategory:\"\",\n}," ; done
 */
const cpanelTools = {
    'imunify-antivirus': {
        name:"Imunify",
        desc:"Logiciel antivirus qui scanne les fichiers de l'hébergement à la recherche de fichiers malveillants",
        icon:"imunify-antivirus",
        cat: cpanelCategories.security,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-ipxtender': {
        name:"ipXtender",
        desc:"Permet de changer l'adresse IP associée à un nom de domaine afin d'utiliser plusieurs IP différentes sur le même hébergement",
        icon:"o2switch-ipxtender",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-lscache': {
        name:"LiteSpeed LSCache",
        desc:"Améliore la vitesse de chargement des sites en activant un puissant cache serveur : LScache",
        icon:"o2switch-lscache",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-memcached-manager': {
        name:"Memcached",
        desc:"Permet d'activer une instance privée de Memcached qui peut être utilisé pour mettre en cache des données",
        icon:"o2switch-memcached-manager",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-multiple-accounts': {
        name:"Gestion de mon Univers Web",
        desc:"Améliore la sécurité et le cloisonnement des sites en permettant la création de sous-compte cPanel",
        icon:"o2switch-multiple-accounts",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-pagespeed': {
        name:"PageSpeed",
        desc:"Permet d'activer des règles Pagespeed qui servent à forcer certaines bonnes pratiques en terme de performance web",
        icon:"o2switch-pagespeed",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-redis-manager': {
        name:"Redis",
        desc:"Permet d'activer une instance privée de Redis qui peut être utilisé comme système de cache sur des applications",
        icon:"o2switch-redis-manager",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-ssl-certificate': {
        name:"Status SSL",
        desc:"Permet de vérifier la validité des certificats SSL sur les noms de domaines hébergés",
        icon:"o2switch-ssl-certificate",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-tiger-protect': {
        name:"TigerProtect",
        desc:"Permet de personnaliser les règles de sécurités en place l'hébergement web",
        icon:"o2switch-tiger-protect",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-wp-tiger': {
        name:"WPTiger",
        desc:"WPTiger est une boite à outils pour faciliter l'administration et gestion de sites WordPress",
        icon:"o2switch-wp-tiger",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'o2switch-xtrem-cache': {
        name:"xtremCache",
        desc:"Améliore la vitesse de chargement des sites en permettant l'activation d'un puissant cache serveur Varnish",
        icon:"o2switch-xtrem-cache",
        cat: cpanelCategories.o2switch,
        to: 'todo',
        offers: all_offers,
    },
    'sitepad_div_icons': {
        name:"Sitepad",
        desc:"Sitepad permet de créer un site internet facilement via système de construction de site visuel et facile d'utilisation",
        icon:"sitepad_div_icons",
        cat: cpanelCategories.tools,
        to: 'todo',
        offers: all_offers,
    },
    'soft_div_icons': {
        name:"Softaculous App Installer",
        desc:"Lance l'outil softaculous qui permet d'installer un grand nombre de CMS de manière quasi-automatique",
        icon:"soft_div_icons",
        cat: cpanelCategories.software,
        to: 'todo',
        offers: all_offers,
    },
    'address_importer': {
        name:"Importation d'adresses",
        desc:"Permet de créer en masse des adresses emails et redirections via une importation à partir d'un fichier CSV ou Excel",
        icon:"address_importer",
        cat: cpanelCategories.email,
        to: 'todo',
        offers: all_offers,
    },
    'apache_handlers': {
        name:"Gestionnaire apache",
        desc:"Contrôle la façon dont le serveur web apache traite certains types de fichiers via l'ajout d'handlers",
        icon:"apache_handlers",
        cat: cpanelCategories.advanced,
        to: 'todo',
        offers: all_offers,
    },
    'apache_spam_assassin': {
        name:"Comportement Antispam",
        desc:"Permet de gérer l'antispam, en désactivant le trie automatique des emails en spam ou en désactivant totalement l'antispam",
        icon:"apache_spam_assassin",
        cat: cpanelCategories.email,
        to: 'todo',
        offers: all_offers,
    },
    'api_tokens': {
        name:"API Tokens",
        desc:"Permet de créer des Tokens d'API afin d'utiliser l'API de cPanel sans avoir à requérir l'identifiant et mot de passe du compte",
        icon:"api_tokens",
        cat:"Sécurité",
        to: 'todo',
        offers: all_offers,
    },
    'autoresponders': {
        name:"Répondeur automatique",
        desc:"Permet d'ajouter un répondeur sur votre adresse email (email “type” envoyé automatiquement en réponse aux emails reçus)",
        icon:"autoresponders",
        cat: cpanelCategories.email,
        to: 'todo',
        offers: all_offers,
    },
    'awstats': {
        name:"AWStats",
        desc:"Permet de consulter vos statistiques de fréquentation, généré à partir des logs d'accès serveur",
        icon:"awstats",
        cat: cpanelCategories.metrics,
        to: 'todo',
        offers: all_offers,
    },
    'bandwidth': {
        name:"Bande passante",
        desc:"Permet de consulter vos statistiques de fréquentation\n",
        icon:"bandwidth",
        cat: cpanelCategories.metrics,
        to: 'todo',
        offers: all_offers,
    },
    'boxtrapper': {
        name:"BoxTrapper",
        desc:"Permet d'ajouter un filtre antispam qui envoie un email avec un lien de confirmation pour chaque mail reçu\n",
        icon:"boxtrapper",
        cat: cpanelCategories.email,
        to: 'todo',
        offers: all_offers,
    },
    'calendar_and_contacts': {
        name:"Calendriers et contacts",
        desc:"Permet de créer des calendriers et contacts synchronisables avec des logiciels de messageries",
        icon:"calendar_and_contacts",
        cat: cpanelCategories.email,
        to: 'todo',
        offers: all_offers,
    },
    'change_language': {
        name:"Modifier la langue",
        desc:"Permet de changer la langue de l'interface de cPanel",
        icon:"change_language",
        cat: cpanelCategories.preferences,
        to: 'todo',
        offers: all_offers,
    },
    'change_password': {
        name:"Mot de passe et sécurité",
        desc:"Permet de changer le mot de passe de votre hébergement",
        icon:"change_password",
        cat: cpanelCategories.preferences,
        to: 'todo',
        offers: all_offers,
    },
    'clam_av': {
        name:"Antivirus",
        desc:"Permet de lancer un scan antivirus avec le logiciel ClamAV (legacy)",
        icon:"clam_av",
        cat:"Sécurité",
        to: 'todo',
        offers: all_offers,
    },
    'contact_information': {
        name:"Coordonnées",
        desc:"Permet de mettre à jour les préférences de contacts",
        icon:"contact_information",
        cat: cpanelCategories.preferences,
        to: 'todo',
        offers: all_offers,
    },
    'cpu_and_concurrent_connection_usage': {
        name:"Utilisation des ressources",
        desc:"Permet de consulter la consommation CPU, mémoire et IO de votre hébergement",
        icon:"cpu_and_concurrent_connection_usage",
        cat: cpanelCategories.metrics,
        to: 'todo',
        offers: all_offers,
    },
    'cron_jobs': {
        name:"Tâches Cron",
        desc:"Permet de gérer et planifier des tâches qui doivent être exécutées à un interval récurrent",
        icon:"cron_jobs",
        cat: cpanelCategories.advanced,
        to: 'todo',
        offers: all_offers,
    },
    'default_address': {
        name:"",
        desc:"",
        icon:"default_address",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'directory_privacy': {
        name:"",
        desc:"",
        icon:"directory_privacy",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'disk_usage': {
        name:"",
        desc:"",
        icon:"disk_usage",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'domains': {
        name:"",
        desc:"",
        icon:"domains",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'email_accounts': {
        name:"",
        desc:"",
        icon:"email_accounts",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'email_deliverability': {
        name:"",
        desc:"",
        icon:"email_deliverability",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'email_disk_usage': {
        name:"",
        desc:"",
        icon:"email_disk_usage",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'email_filters': {
        name:"",
        desc:"",
        icon:"email_filters",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'email_routing': {
        name:"",
        desc:"",
        icon:"email_routing",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'encryption': {
        name:"",
        desc:"",
        icon:"encryption",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'error_pages': {
        name:"",
        desc:"",
        icon:"error_pages",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'errors': {
        name:"",
        desc:"",
        icon:"errors",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'file_manager': {
        name:"",
        desc:"",
        icon:"file_manager",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'forwarders': {
        name:"",
        desc:"",
        icon:"forwarders",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'ftp_accounts': {
        name:"",
        desc:"",
        icon:"ftp_accounts",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'global_email_filters': {
        name:"",
        desc:"",
        icon:"global_email_filters",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'images': {
        name:"",
        desc:"",
        icon:"images",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'indexes': {
        name:"",
        desc:"",
        icon:"indexes",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'ip_blocker': {
        name:"",
        desc:"",
        icon:"ip_blocker",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'jb5': {
        name:"",
        desc:"",
        icon:"jb5",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'letsencrypt-cpanel': {
        name:"",
        desc:"",
        icon:"letsencrypt-cpanel",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lvenodejssel': {
        name:"",
        desc:"",
        icon:"lvenodejssel",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lvephpsel': {
        name:"",
        desc:"",
        icon:"lvephpsel",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lvepythonsel': {
        name:"",
        desc:"",
        icon:"lvepythonsel",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lveresusage': {
        name:"",
        desc:"",
        icon:"lveresusage",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lverubysel': {
        name:"",
        desc:"",
        icon:"lverubysel",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lvewpos': {
        name:"",
        desc:"",
        icon:"lvewpos",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'lvexray': {
        name:"",
        desc:"",
        icon:"lvexray",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mailing_lists': {
        name:"",
        desc:"",
        icon:"mailing_lists",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'manage_calendar_access': {
        name:"",
        desc:"",
        icon:"manage_calendar_access",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'metrics_editor': {
        name:"",
        desc:"",
        icon:"metrics_editor",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mime_types': {
        name:"",
        desc:"",
        icon:"mime_types",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mod_security': {
        name:"",
        desc:"",
        icon:"mod_security",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mx_entry': {
        name:"",
        desc:"",
        icon:"mx_entry",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mysql_database_wizard': {
        name:"",
        desc:"",
        icon:"mysql_database_wizard",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mysql_databases': {
        name:"",
        desc:"",
        icon:"mysql_databases",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'mysql_manager': {
        name:"",
        desc:"",
        icon:"mysql_manager",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'php_my_admin': {
        name:"",
        desc:"",
        icon:"php_my_admin",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'php_pg_admin': {
        name:"",
        desc:"",
        icon:"php_pg_admin",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'postgresql_database_wizard': {
        name:"",
        desc:"",
        icon:"postgresql_database_wizard",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'postgresql_databases': {
        name:"",
        desc:"",
        icon:"postgresql_databases",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'raw_access': {
        name:"",
        desc:"",
        icon:"raw_access",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'redirects': {
        name:"",
        desc:"",
        icon:"redirects",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'remote_mysql': {
        name:"",
        desc:"",
        icon:"remote_mysql",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'sitepad': {
        name:"",
        desc:"",
        icon:"sitepad",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'softaculous': {
        name:"",
        desc:"",
        icon:"softaculous",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'solr_search_index': {
        name:"",
        desc:"",
        icon:"solr_search_index",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'ssh-whitelist': {
        name:"",
        desc:"",
        icon:"ssh-whitelist",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'ssh_access': {
        name:"",
        desc:"",
        icon:"ssh_access",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'ssl_tls': {
        name:"",
        desc:"",
        icon:"ssl_tls",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'subdomains': {
        name:"",
        desc:"",
        icon:"subdomains",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'terminal': {
        name:"",
        desc:"",
        icon:"terminal",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'tls_status': {
        name:"",
        desc:"",
        icon:"tls_status",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'tls_wizard': {
        name:"",
        desc:"",
        icon:"tls_wizard",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'track_delivery': {
        name:"",
        desc:"",
        icon:"track_delivery",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'two_factor_authentication': {
        name:"",
        desc:"",
        icon:"two_factor_authentication",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'version_control': {
        name:"",
        desc:"",
        icon:"version_control",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'visitors': {
        name:"",
        desc:"",
        icon:"visitors",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
    'zone_editor': {
        name:"",
        desc:"",
        icon:"zone_editor",
        cat:"",
        to: 'todo',
        offers: all_offers,
    },
}


/**
 *
 *     <div>
 *         <CpanelIcon tool={tool} title={title}/>
 *     </div>
 *
 */

// Button component that accepts the specified props.
export default function ToolCard ({tool, title, desc, category, classname, type, href}: ToolCard) {
    const _titlename = title ?? ('Documentation de l\'outil ' + cpanelTools[tool].name);
    const _href = href ?? cpanelTools[tool].to;
    const _icon = cpanelTools[tool].icon;
    const _name = cpanelTools[tool].name;
    const _desc = cpanelTools[tool].desc;
    const _cat = cpanelTools[tool].cat;
    const _offers = cpanelTools[tool].offers;

    let _offersHtml = [];
    for (let i = 0; i < _offers.length; i++) {
        _offersHtml.push(<span className="badge">{_offers[i].name}</span>);
    }

    return (
        <a href={_href} title={_titlename} className={clsx('card', 'clickable-card', 'tool-card')}>
            <div className="card__body">
                <div className="icon-img">
                    <CpanelIcon tool={_icon} title={_name}/>
                </div>
                <div className="tool-desc">
                    <h3>{_name}</h3>
                    <p>{_desc}</p>
                    {_offersHtml}
                </div>
            </div>
            <div className="card__footer">
                <nav aria-label="breadcrumbs">
                    <ul className="breadcrumbs breadcrumbs--sm">
                        <li className="breadcrumbs__item">
                            <span className="breadcrumbs__link">cPanel</span>
                        </li>
                        <li className="breadcrumbs__item">
                            <span className="breadcrumbs__link">{_cat.name}</span>
                        </li>
                        <li className="breadcrumbs__item breadcrumbs__item--active">
                            <span className="breadcrumbs__link">{_name}</span>
                        </li>
                    </ul>
                </nav>

            </div>
        </a>
    );
}