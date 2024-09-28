import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';

type CpanelIcon = {
    tool: 'email_accounts' | string;
    title: null | string;
}

export default function CpanelIcon ({tool, title}: CpanelIcon) {
    const classname = 'icon-' + tool;
    const titlename = title == '' ? 'Outils ' + tool : title;
    return (
        <span title={titlename} className={clsx('spriteicon_img', classname)}></span>
    );
}