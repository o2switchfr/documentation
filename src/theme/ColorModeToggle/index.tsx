import React, {type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import type ColorModeToggleType from '@theme/ColorModeToggle';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof ColorModeToggleType>;

/**
 * Avec `respectPrefersColorScheme: true`, Docusaurus propose un cycle à 3 états
 * (clair → sombre → système). Quand le thème du système correspond à l'un des deux
 * modes, un clic sur trois ne change rien à l'écran. On garde le suivi du système
 * au premier chargement, mais le bouton bascule désormais toujours entre clair et sombre,
 * à partir du mode réellement affiché.
 */
export default function ColorModeToggleWrapper(props: Props): ReactNode {
  const {colorMode} = useColorMode();
  return <ColorModeToggle {...props} respectPrefersColorScheme={false} value={colorMode} />;
}
