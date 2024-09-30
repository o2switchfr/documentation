import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import data from '@site/src/components/_data/tools';
import CpanelIcon from "@site/src/components/CpanelIcon";


type PreviewToolCard = {
    tool: string;
}

const cpanelCategories = data.cpanelCategories;
const cpanelTools = data.cpanelTool;

export default function PreviewToolCard ({tool}: PreviewToolCard) {

    if(cpanelTools[tool] === undefined){
        throw new Error(`"${tool}"  is not a valid value for <ToolCard />.\n\nThe possible values are : ${Object.keys(cpanelTools).join(', ')}\n`);
    }

    const _titlename = 'Documentation de l\'outil ' + cpanelTools[tool].name;
    const _href = cpanelTools[tool].to;
    const _icon = cpanelTools[tool].icon;
    const _name = cpanelTools[tool].name;
    const _desc = cpanelTools[tool].desc;
    const _cat = cpanelTools[tool].cat;
    const _offers = cpanelTools[tool].offers;
    const _imgSrc = `/img/docs/tools/${_icon}.png`;

    let _offersHtml = [];
    for (let i = 0; i < _offers.length; i++) {
        _offersHtml.push(<span key={'k' + i} className="badge badge--primary">{_offers[i].name}</span>);
    }

    return (        
        <div className={'preview-tool-card'}>
            <Zoom><img className={'preview-img'} src={_imgSrc} alt={"Aperçu de l'outil " + _name} title={"Capture d'écran de l'outil " + _name} /></Zoom>
            <div className={'tool-desc-container'}>
                <div className={'tool-icon-container'}>
                    <CpanelIcon tool={_icon} title={_name} />
                </div>
                <div className={'tool-text-container'}>
                    <p>
                        <strong>Outils {_name}</strong>
                    </p>
                    <p>{_desc}</p>
                    <div>{_offersHtml}</div>
                </div>
            </div>
        </div>
    );
}