/** Rubriques du site : source unique pour la page 404, le menu mobile et la recherche. */
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
