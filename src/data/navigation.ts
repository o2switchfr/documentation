/** Rubriques du site : source unique pour le pied de page, la 404 et les filtres de la recherche. */
export type Section = {
  to: string;
  title: string;
};

export const SECTIONS: Section[] = [
  {to: '/cpanel/', title: 'Hébergement web'},
  {to: '/nom-de-domaine/', title: 'Nom de domaine'},
  {to: '/espace-client/', title: 'Gestion administrative'},
  {to: '/guides/', title: 'Guides'},
  {to: '/questions/', title: 'Questions fréquentes'},
];

/** Pages les plus utiles, proposées quand la recherche est vide. */
export const POPULAR_PAGES: {to: string; label: string}[] = [
  {to: '/cpanel/emails/adresse-email/', label: 'Créer une adresse email'},
  {to: '/cpanel/securite/certificat-ssl/', label: 'Gérer les certificats SSL'},
  {to: '/guides/wordpress/comment-installer-wordpress/', label: 'Installer WordPress'},
  {to: '/nom-de-domaine/changer-dns/', label: 'Changer les DNS'},
  {to: '/cpanel/fichiers/sauvegarde-jetbackup/', label: 'Restaurer une sauvegarde'},
];
