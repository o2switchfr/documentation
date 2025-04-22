import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Image = {
    src: string;
    alt: string;
    caption: string;
    additionalClass: null | string;
    title: null  | string;
    size: null | 'small' | 'medium' | 'large' | 'full';
}

export default function Image ({src, alt, caption, additionalClass, size, title}: Image) {
    
    const _title = title ? title : alt;

    // TODO : the size stuff
    return (

        <figure className={clsx('tutorial-img', additionalClass)}>
            <Zoom><img loading="lazy" data-zoomable src={src} alt={alt} title={_title}/></Zoom>
            <figcaption>{caption}</figcaption>
        </figure>
    );
}

