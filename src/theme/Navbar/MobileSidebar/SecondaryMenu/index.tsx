import type {ReactNode} from 'react';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';

/** Contenu contextuel du tiroir (sidebar des docs), sans bouton de retour : le tiroir n'a qu'un menu. */
export default function NavbarMobileSidebarSecondaryMenu(): ReactNode {
  return useNavbarSecondaryMenu().content;
}
