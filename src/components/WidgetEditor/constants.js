import { keyMirror } from 'utils';
import { FigureWidget, ShapeWidget, TextWidget } from './components';

export const TEXT_WIDGET_DEFAULT_PROPS = {
  text1: { padding: { top: 0.07, right: 0.05, bottom: 0.07, left: 0.05 }, width: 154, height: 64 },
  text2: { padding: { top: 0.09, right: 0.07, bottom: 0.25, left: 0.07 }, width: 112, height: 108 },
  text3: { padding: { top: 0.22, right: 0.18, bottom: 0.28, left: 0.12 }, width: 168, height: 132 },
  text4: { padding: { top: 0.27, right: 0.2, bottom: 0.38, left: 0.26 }, width: 178, height: 170 },
};

export const TRANS_TYPES = keyMirror({
  rotate: null,
  drag: null,
  resize: null,
  land: null,
  scale: null,
});

export const WIDGET_GROUP_TYPES = keyMirror({
  lego: null,
  family: null,
  peg: null,
  chess: null,
  animal: null,
  emotion: null,
  object: null,
  shape: null,
  capacity: null,
  arrow: null,
  text: null,
  relationship: null,
});

export const WIDGET_GROUPS = [
  {
    type: WIDGET_GROUP_TYPES.lego,
    label: 'Figures (Lego)',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 22,
  },
  {
    type: WIDGET_GROUP_TYPES.family,
    label: 'Figures (Family)',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 18,
  },
  {
    type: WIDGET_GROUP_TYPES.peg,
    label: 'Figures (Pegs)',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.chess,
    label: 'Figures (Chess)',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.animal,
    label: 'Figures (Animals)',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 15,
  },
  {
    type: WIDGET_GROUP_TYPES.object,
    label: 'Objects',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 15,
  },
  {
    type: WIDGET_GROUP_TYPES.arrow,
    label: 'Directional Arrows',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'svg',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.shape,
    label: 'Shapes',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: false,
    defaultArea: 10000,
    imageType: 'svg',
    count: 6,
  },
  {
    type: WIDGET_GROUP_TYPES.text,
    label: 'Text Controls',
    draggable: true,
    scalable: true,
    rotatable: false,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'svg',
    count: 4,
  },
  {
    type: WIDGET_GROUP_TYPES.relationship,
    label: 'Relationships',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: false,
    defaultArea: 4000,
    imageType: 'svg',
    count: 10,
  },
  {
    type: WIDGET_GROUP_TYPES.capacity,
    label: 'Capacity/Energy',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'png',
    count: 5,
  },
  {
    type: WIDGET_GROUP_TYPES.emotion,
    label: 'Emotions',
    draggable: true,
    scalable: true,
    rotatable: true,
    keepRatio: true,
    defaultArea: 10000,
    imageType: 'svg',
    count: 6,
  },
];

export const WIDGET_MAP = {
  [WIDGET_GROUP_TYPES.lego]: FigureWidget,
  [WIDGET_GROUP_TYPES.family]: FigureWidget,
  [WIDGET_GROUP_TYPES.peg]: FigureWidget,
  [WIDGET_GROUP_TYPES.chess]: FigureWidget,
  [WIDGET_GROUP_TYPES.animal]: FigureWidget,
  [WIDGET_GROUP_TYPES.emotion]: FigureWidget,
  [WIDGET_GROUP_TYPES.object]: FigureWidget,
  [WIDGET_GROUP_TYPES.shape]: ShapeWidget,
  [WIDGET_GROUP_TYPES.capacity]: FigureWidget,
  [WIDGET_GROUP_TYPES.arrow]: FigureWidget,
  [WIDGET_GROUP_TYPES.text]: TextWidget,
  [WIDGET_GROUP_TYPES.relationship]: FigureWidget,
  shape4: FigureWidget,
};

export const SHAPE_PATHS = {
  shape1: ({ fillColor, strokeColor }) => (
    <svg width="100%" height="100%" viewBox="0 0 52 52">
      <g fill={fillColor} stroke={strokeColor} transform="translate(1, 1)">
        <path d="M0 0H50V50H0z" />
      </g>
    </svg>
  ),
  shape2: ({ fillColor, strokeColor }) => (
    <svg width="100%" height="100%" viewBox="0 0 52 52">
      <g fill={fillColor} stroke={strokeColor} transform="translate(1, 1)">
        <circle cx="25" cy="25" r="25" />
      </g>
    </svg>
  ),
  shape3: ({ fillColor, strokeColor }) => (
    <svg width="100%" height="100%" viewBox="0 0 52 52">
      <g fill={fillColor} stroke={strokeColor} transform="translate(1, 1)">
        <polygon id="Triangle" points="25 0 50 50 0 50" />
      </g>
    </svg>
  ),
  shape5: ({ fillColor, strokeColor }) => (
    <svg width="100%" height="100%" viewBox="0 0 56 49" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth="1" fill={fillColor} stroke={strokeColor} transform="translate(0.5, 0.5)">
        <path d="M50.717914,4.31114729 C47.9474534,1.53473879 44.2691621,0.00538977627 40.3573711,0.00538977627 C36.44558,0.00538977627 32.7666177,1.53473879 29.998841,4.31249474 L27.4981129,6.82547792 L24.9953718,4.30912613 C22.2282661,1.53069646 18.5499748,0 14.6375128,0 C10.7250507,0 7.04743039,1.53002274 4.28099567,4.30912613 C-1.42699856,10.0431744 -1.42699856,19.3735508 4.28099567,25.1082727 L26.7862072,47.704236 C26.9828032,47.9016366 27.240458,48 27.4981129,48 C27.7557677,48 28.0134226,47.9016366 28.2100186,47.704236 L50.718585,25.1082727 C56.4272502,19.375572 56.4272502,10.0472167 50.717914,4.31114729 Z" />
      </g>
    </svg>
  ),
  shape6: ({ fillColor, strokeColor }) => (
    <svg width="100%" height="100%" viewBox="0 0 57 53">
      <g fill={fillColor} stroke={strokeColor} transform="translate(1, 1)">
        <polygon
          id="Path"
          points="27.5 0 35.5730702 17.358349 55 19.4802623 40.5625065 32.3302125 44.4959363 51 27.5 41.5833755 10.5040702 51 14.4375 32.3302125 0 19.4802623 19.4269363 17.358349"
        />
      </g>
    </svg>
  ),
};

export const CONTEXTMENU_TYPES = keyMirror({
  front: null,
  back: null,
  forward: null,
  backward: null,
  divider: null,
  copy: null,
  cut: null,
  paste: null,
  delete: null,
  incFontSize: null,
  decFontSize: null,
  colorPalette: null,
});

export const BOARD_CONTEXTMENU_ITEMS = [
  {
    type: CONTEXTMENU_TYPES.paste,
    label: 'Paste',
  },
];

export const GROUP_CONTEXTMENU_ITEMS = [
  {
    type: CONTEXTMENU_TYPES.copy,
    label: 'Copy Group',
  },
  {
    type: CONTEXTMENU_TYPES.cut,
    label: 'Cut Group',
  },
  {
    type: CONTEXTMENU_TYPES.delete,
    label: 'Delete Group',
  },
];

export const WIDGET_CONTEXTMENU_ITEMS = [
  {
    type: CONTEXTMENU_TYPES.front,
    label: 'Bring to Front',
  },
  {
    type: CONTEXTMENU_TYPES.back,
    label: 'Send to Back',
  },
  {
    type: CONTEXTMENU_TYPES.forward,
    label: 'Bring Forward',
  },
  {
    type: CONTEXTMENU_TYPES.backward,
    label: 'Send Backward',
  },
  {
    type: CONTEXTMENU_TYPES.divider,
  },
  {
    type: CONTEXTMENU_TYPES.copy,
    label: 'Copy',
  },
  {
    type: CONTEXTMENU_TYPES.cut,
    label: 'Cut',
  },
  {
    type: CONTEXTMENU_TYPES.paste,
    label: 'Paste',
  },
  {
    type: CONTEXTMENU_TYPES.delete,
    label: 'Delete',
  },
  {
    type: CONTEXTMENU_TYPES.divider,
    widget: WIDGET_GROUP_TYPES.text,
  },
  {
    type: CONTEXTMENU_TYPES.divider,
    widget: WIDGET_GROUP_TYPES.shape,
  },
  {
    type: CONTEXTMENU_TYPES.incFontSize,
    label: 'A+',
    widget: WIDGET_GROUP_TYPES.text,
  },
  {
    type: CONTEXTMENU_TYPES.decFontSize,
    label: 'A-',
    widget: WIDGET_GROUP_TYPES.text,
  },
  {
    type: CONTEXTMENU_TYPES.colorPalette,
    label: 'Color Palette',
    widget: WIDGET_GROUP_TYPES.shape,
  },
];

export const WIDGET_SCALE_LIMIT = {
  xMin: 0.3,
  yMin: 0.3,
  xMax: 10.0,
  yMax: 10.0,
};

export const WIDGET_EDITOR_SCALE_LIMIT = {
  min: 0.2,
  max: 3.5,
};

export const WIDGET_DESCRIPTIONS = {
  relationship7: 'Collaborative',
  relationship8: 'Conflicted',
  relationship9: 'Hostile',
  relationship10: 'Cut-off',
};

export const DOUBLE_CLICK_INTERVAL = 200;
export const CLICK_INTERVAL = 200;
export const CANVAS_PDF_FILENAMES = ['current-state.pdf', 'future-state-1.pdf', 'future-state-2.pdf'];
export const GROUP_UUID = 'group-uuid';
