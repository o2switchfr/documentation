import React, { ReactNode, CSSProperties } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

type YoutubeVideo = {
    id: string;
    title: string;
}

export default function YoutubeVideo ({id, title}: YoutubeVideo) {
    return (
        <div className="video-container">
            <LiteYouTubeEmbed
                id={id}
                params="autoplay=1&autohide=1&showinfo=0&rel=0"
                title={title}
                poster="maxresdefault"
                webp
            />
        </div>
    );
}