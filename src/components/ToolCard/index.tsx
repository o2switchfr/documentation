import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import CpanelIcon from "@site/src/components/CpanelIcon";
import data from '@site/src/components/_data/tools';

type ToolCard = {
    tool: string;
    title: null | string;
    desc: null | string;
    category: null | string;
    classname: null | string;
    href: null | string;
}


const cpanelCategories = data.cpanelCategories;
const cpanelTools = data.cpanelTool;

export default function ToolCard ({tool}: ToolCard) {

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

    let _offersHtml = [];
    for (let i = 0; i < _offers.length; i++) {
        _offersHtml.push(<span key={'k' + i} className="badge">{_offers[i].name}</span>);
    }

    return (
        <a href={_href} title={_titlename} className={clsx('card', 'clickable-card', 'tool-card')}>
            <div className="card__body">
                <div className="icon-img">
                    <CpanelIcon tool={_icon} title={_name}/>
                </div>
                <div className="tool-desc">
                    <h3>{_name}</h3>
                    <p>{_desc}</p>
                    {_offersHtml}
                </div>
            </div>
            <div className="card__footer">
                <nav aria-label="breadcrumbs">
                    <ul className="breadcrumbs breadcrumbs--sm">
                        <li className="breadcrumbs__item">
                            <span className="breadcrumbs__link">cPanel</span>
                        </li>
                        <li className="breadcrumbs__item">
                            <span className="breadcrumbs__link">{_cat.name}</span>
                        </li>
                        <li className="breadcrumbs__item breadcrumbs__item--active">
                            <span className="breadcrumbs__link">{_name}</span>
                        </li>
                    </ul>
                </nav>

            </div>
        </a>
    );
}