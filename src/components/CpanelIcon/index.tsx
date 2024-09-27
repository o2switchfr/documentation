import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';

// Define the Button type to control the props that can be passed to the Button component.
type CpanelIcon = {
    tool: string;
    title: null | string;
}

// Button component that accepts the specified props.
export default function CpanelIcon ({tool, title}: CpanelIcon) {
    const classname = 'icon-' + tool;
    const titlename = title == '' ? 'Outils ' + tool : title;
    return (
        <span title={titlename} className={clsx('spriteicon_img', classname)}></span>
    );
}