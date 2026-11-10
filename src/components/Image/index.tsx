import React from 'react';
import clsx from 'clsx';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type ImageProps = {
    src: string;
    alt: string;
    caption?: string;
    additionalClass?: string;
    title?: string;
    size?: 'small' | 'medium' | 'large' | 'full';
}

export default function Image ({src, alt, caption, additionalClass, size, title}: ImageProps) {
    
    const _title = title ? title : alt;

    // TODO : the size stuff
    return (

        <figure className={clsx('tutorial-img', additionalClass)}>
            <Zoom><img loading="lazy" data-zoomable src={src} alt={alt} title={_title}/></Zoom>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

