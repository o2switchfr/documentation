import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/PaginatorNavLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

/** Lien « précédent / suivant » : le thème d'origine, avec une flèche FontAwesome collée au titre. */
export default function PaginatorNavLink({permalink, title, subLabel, isNext}: Props): ReactNode {
  return (
    <Link
      className={clsx('pagination-nav__link', isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev')}
      to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">
        {!isNext && <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />}
        <span>{title}</span>
        {isNext && <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />}
      </div>
    </Link>
  );
}
