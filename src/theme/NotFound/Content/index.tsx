import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {SECTIONS} from '@site/src/data/navigation';

type Props = {className?: string};

export default function NotFoundContent({className}: Props): ReactNode {
  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {key: 'k', ctrlKey: true, bubbles: true}));
  };

  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="not-found">
        <Heading as="h1">Cette page est introuvable</Heading>
        <p>L'adresse a peut-être changé, ou la page n'existe plus. Essayez la recherche ou choisissez une rubrique.</p>
        <button type="button" className="button button--primary" onClick={openSearch}>
          Rechercher dans la documentation
        </button>
        <ul className="not-found__sections">
          {SECTIONS.map((section) => (
            <li key={section.to}>
              <Link to={section.to}>{section.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
