import type {PrismTheme} from 'prism-react-renderer';

/**
 * Thème Prism du mode clair : couleurs saturées, chacune au plus vif possible tout en gardant 4,5:1 de contraste ou plus
 * sur le fond blanc des blocs (--site-code-bg dans src/css/o2switch.scss). Le fond lui-même est posé par la feuille de style.
 */
const warmLight: PrismTheme = {
  plain: {
    color: '#1c3350',
    backgroundColor: '#ffffff',
  },
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#6b6a60'}},
    {types: ['punctuation', 'namespace'], style: {color: '#5b6475'}},
    {types: ['keyword', 'atrule', 'important'], style: {color: '#d14600'}},
    {types: ['string', 'char', 'attr-value', 'inserted', 'regex'], style: {color: '#008531'}},
    {types: ['number', 'boolean', 'constant', 'symbol', 'builtin'], style: {color: '#b25f00'}},
    {types: ['function', 'class-name', 'function-variable'], style: {color: '#0070f0'}},
    {types: ['tag', 'deleted'], style: {color: '#eb0014'}},
    {types: ['selector', 'attr-name', 'property'], style: {color: '#9a42ff'}},
    {types: ['variable', 'operator', 'entity', 'url'], style: {color: '#1c3350'}},
  ],
};

export default warmLight;
