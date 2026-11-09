import React, {useEffect, type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {useHistory} from '@docusaurus/router';
import Link from '@docusaurus/Link';

/**
 * Remplace la page /search/ du plugin de recherche, qui utilisait l'ancien moteur et n'est liée nulle part.
 * La recherche passe par la modale (Ctrl/Cmd+K) ; on renvoie les visiteurs vers l'accueil.
 */
export default function SearchPage(): ReactNode {
  const history = useHistory();

  useEffect(() => {
    history.replace('/');
  }, [history]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="container margin-vert--xl">
        <p>
          La recherche se trouve dans le menu, ou avec le raccourci Ctrl+K (⌘K sur Mac).{' '}
          <Link to="/">Retour à l'accueil</Link>
        </p>
      </main>
    </>
  );
}
