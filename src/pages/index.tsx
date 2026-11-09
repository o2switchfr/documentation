import React, {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {
  faArrowUpRightFromSquare,
  faChevronRight,
  faCircleQuestion,
  faEarthEurope,
  faGraduationCap,
  faHeadset,
  faScrewdriverWrench,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

type Page = {to: string; label: string};

type Group = {
  to: string;
  title: string;
  text: string;
  icon: IconDefinition;
  pages: Page[];
  /** Carte principale : grande, avec une seconde liste. */
  featured?: {heading: string; pages: Page[]};
  /** Carte à droite de la carte principale. */
  side?: boolean;
};

const GROUPS: Group[] = [
  {
    to: '/cpanel',
    title: 'Hébergement web',
    text: 'Chaque outil cPanel est documenté.',
    icon: faScrewdriverWrench,
    pages: [
      {to: '/cpanel/emails/', label: 'Emails'},
      {to: '/cpanel/domaines/', label: 'Domaines'},
      {to: '/cpanel/fichiers/', label: 'Fichiers'},
      {to: '/cpanel/bases-de-donnees/', label: 'Bases de données'},
      {to: '/cpanel/securite/', label: 'Sécurité'},
      {to: '/cpanel/outils-avances/', label: 'Outils avancés'},
    ],
    featured: {
      heading: 'Outils utiles',
      pages: [
        {to: '/cpanel/emails/adresse-email/', label: 'Créer une adresse email'},
        {to: '/cpanel/securite/certificat-ssl/', label: 'Gérer les certificats SSL'},
        {to: '/cpanel/fichiers/sauvegarde-jetbackup/', label: 'Restaurer une sauvegarde'},
        {to: '/cpanel/logiciels/hebergement-php-multi-version/', label: 'Choisir la version de PHP'},
        {to: '/cpanel/outils-avances/tache-planifiee-cron/', label: 'Créer une tâche cron'},
        {to: '/cpanel/domaines/editeur-zone-dns/', label: 'Modifier la zone DNS'},
      ],
    },
  },
  {
    to: '/nom-de-domaine',
    title: 'Nom de domaine',
    text: 'Changement de DNS et transferts.',
    icon: faEarthEurope,
    side: true,
    pages: [
      {to: '/nom-de-domaine/changer-dns/', label: 'Changer les DNS'},
      {to: '/nom-de-domaine/transferer-un-domaine/', label: 'Transférer un domaine'},
      {to: '/nom-de-domaine/dns/utiliser-cloudflare-domaine-o2switch/', label: 'Utiliser Cloudflare'},
    ],
  },
  {
    to: '/guides',
    title: 'Guides',
    text: 'Des tutoriels détaillés, pas à pas.',
    icon: faGraduationCap,
    side: true,
    pages: [
      {to: '/guides/wordpress/comment-installer-wordpress/', label: 'Installer WordPress'},
      {to: '/guides/webmastering/forcer-https/', label: 'Forcer le HTTPS'},
      {to: '/guides/webmastering/connexion-ssh/', label: 'Se connecter en SSH'},
    ],
  },
  {
    to: '/espace-client',
    title: 'Gestion administrative',
    text: 'L\'espace client et les commandes.',
    icon: faUserTie,
    pages: [
      {to: '/espace-client/auth/', label: 'Connexion et mot de passe'},
      {to: '/espace-client/commande/', label: 'Commandes et facturation'},
      {to: '/espace-client/offre/', label: 'Les offres'},
    ],
  },
  {
    to: '/questions',
    title: 'Questions fréquentes',
    text: 'Des réponses rapides.',
    icon: faCircleQuestion,
    pages: [
      {to: '/questions/comment-installer-certificat-lets-encrypt/', label: 'Installer un certificat Let\'s Encrypt'},
      {to: '/questions/serveurs-dns-o2swich/', label: 'Quels sont les serveurs DNS ?'},
      {to: '/questions/heberger-plusieurs-sites/', label: 'Héberger plusieurs sites'},
    ],
  },
];

type PageListProps = {
  pages: Page[];
  columns?: boolean;
  /** Liste de second niveau : liens plus légers que les liens principaux de la carte. */
  secondary?: boolean;
};

function PageList({pages, columns, secondary}: PageListProps): ReactNode {
  const listClass = columns ? `${styles.pages} ${styles.columns}` : styles.pages;
  const linkClass = secondary ? `${styles.page_} ${styles.secondary}` : styles.page_;
  return (
    <ul className={listClass}>
      {pages.map((page) => (
        <li key={page.to}>
          <Link to={page.to} className={linkClass}>
            <span>{page.label}</span>
            <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home(): ReactNode {
  const illustration = useBaseUrl('/img/illustration/librarian-tiger.svg');

  return (
    <Layout
      title="Bienvenue sur la documentation o2switch"
      description="Documentation technique des services d'hébergement de l'hébergeur web Français o2switch">
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>La documentation o2switch</h1>
              <p className={styles.lead}>Outils cPanel, domaines, emails : tout est expliqué pas à pas.</p>
            </div>
            <img className={styles.illustration} src={illustration} alt="" width={170} height={170} />
          </header>

          <div className={styles.groups}>
            {GROUPS.map(({to, title, text, icon, pages, featured, side}) => (
              <section
                key={to}
                className={[styles.group, featured ? styles.featured : '', side ? styles.side : ''].filter(Boolean).join(' ')}>
                <h2 className={styles.groupTitle}>
                  <FontAwesomeIcon icon={icon} className={styles.groupIcon} />
                  <Link to={to} className={styles.groupLink}>{title}</Link>
                </h2>
                <p className={styles.groupText}>{text}</p>
                <PageList pages={pages} columns={Boolean(featured)} />
                {featured && (
                  <>
                    <p className={styles.subheading}>{featured.heading}</p>
                    <PageList pages={featured.pages} columns secondary />
                  </>
                )}
              </section>
            ))}

            <section className={styles.group}>
              <h2 className={styles.groupTitle}>
                <FontAwesomeIcon icon={faHeadset} className={styles.groupIcon} />
                Besoin d’aide ?
              </h2>
              <p className={styles.groupText}>
                Vous ne trouvez pas la réponse dans la documentation ? L'équipe o2switch vous répond.
              </p>
              <a
                href="https://www.o2switch.fr/support-hebergeur/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.supportButton}>
                <span>Contacter le support</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
                <span className={styles.visuallyHidden}>(s'ouvre dans un nouvel onglet)</span>
              </a>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
