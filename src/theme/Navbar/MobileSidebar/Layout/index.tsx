import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';

/**
 * Tiroir mobile à un seul menu : l'arbre de la sidebar des docs quand la page en a une,
 * sinon les liens de la barre (rubriques). Plus de panneau « Retour au menu principal ».
 */
export default function NavbarMobileSidebarLayout({header, primaryMenu, secondaryMenu}: Props): ReactNode {
  const {content} = useNavbarSecondaryMenu();

  return (
    <div className={clsx(ThemeClassNames.layout.navbar.mobileSidebar.container, 'navbar-sidebar')}>
      {header}
      <div className="navbar-sidebar__items">
        <div className={clsx(ThemeClassNames.layout.navbar.mobileSidebar.panel, 'navbar-sidebar__item menu')}>
          {content ? secondaryMenu : primaryMenu}
        </div>
      </div>
    </div>
  );
}
