import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

// From : https://docusaurus.community/knowledge/design/icons/fontawesome/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component.
import { library } from '@fortawesome/fontawesome-svg-core'; // Import the library component.
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons.
library.add(fas); // Add all icons to the library so you can use them without importing them individually.

// Custom components
import PreviewToolCard from "@site/src/components/PreviewToolCard";
import Image from "@site/src/components/Image";
import ToolCard from "@site/src/components/ToolCard";
import YoutubeVideo from "@site/src/components/YoutubeVideo";
import CpanelIcon from "@site/src/components/CpanelIcon"; // Probably won't be used directly in docs pages

export default {
    // Re-use the default mapping
    ...MDXComponents,
    PreviewToolCard,
    Image,
    ToolCard,
    YoutubeVideo,
    CpanelIcon,
    FAIcon: FontAwesomeIcon, // Make the FontAwesomeIcon component available in MDX as <icon />.
};