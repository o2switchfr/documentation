import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';

type Step = {
    type: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | null;
    text: string;
}

export default function CpanelIcon ({type, text}: Step) {
    let _type = type ?? 'info';
    const classname = 'badge--' + _type;
    return (
        <span className={clsx('badge', classname)}>{text}</span>
    );
}