import _ from 'lodash';
import pointInPolygon from 'point-in-polygon';
import overlap from 'polygon-overlap';
import { isNumber } from 'utils';
import { WIDGET_IMG_BASE_URL } from 'utils/constants/ui';
import { GROUP_UUID, WIDGET_GROUPS } from './constants';

export const getImgUrl = (group, type, scale = 1) => {
  const { imageType } = WIDGET_GROUPS.find((g) => g.type === group);
  scale = scale === 1 || imageType === 'svg' ? '' : `@${scale}x`;
  return `${WIDGET_IMG_BASE_URL}${group}/${type}${scale}.${imageType}`;
};

export const parseTransform = (trans, toNumber = false) => {
  const t2dTokens = trans.match(/translate\(([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const t3dTokens = trans.match(/translate3d\(([-0-9.]*(px)), ([-0-9.]*(px)), ([-0-9.]*(px))\)/);
  const rTokens = trans.match(/rotate\(([-0-9.]*(deg|rad))\)/);
  const sTokens = trans.match(/scale\(([-0-9.]*), ([-0-9.]*)\)/);
  let tx = 0;
  let ty = 0;
  let tz = 0;
  let rotate = 0;
  let sx = 1;
  let sy = 1;

  if (t3dTokens) {
    tx = toNumber ? parseFloat(t3dTokens[1]) : t3dTokens[1];
    ty = toNumber ? parseFloat(t3dTokens[3]) : t3dTokens[3];
    tz = toNumber ? parseFloat(t3dTokens[5]) : t3dTokens[5];
  } else if (t2dTokens) {
    tx = toNumber ? parseFloat(t2dTokens[1]) : t2dTokens[1];
    ty = toNumber ? parseFloat(t2dTokens[3]) : t2dTokens[3];
  }

  if (rTokens) {
    rotate = toNumber ? parseFloat(rTokens[1]) : rTokens[1];
  }

  if (sTokens) {
    sx = toNumber ? parseFloat(sTokens[1]) : sTokens[1];
    sy = toNumber ? parseFloat(sTokens[2]) : sTokens[2];
  }

  return { tx, ty, rotate, sx, sy, ...(t3dTokens && { tz }) };
};

export const transformToString = ({ tx = 0, ty = 0, rotate = 0, sx = 1, sy = 1 }) => {
  tx = isNumber(tx) ? `${tx}px` : tx;
  ty = isNumber(ty) ? `${ty}px` : ty;
  rotate = isNumber(rotate) ? `${rotate}deg` : rotate;

  return `translate(${tx}, ${ty}) rotate(${rotate}) scale(${sx}, ${sy})`;
};

export const getForwardWidget = (figures, uuid, ref) => {
  const figure = figures.find((f) => f.uuid === uuid);
  const overlaped = getOverlappedFigures(figures, ref, uuid);
  const depth = _.min(overlaped.map((f) => (f.depth <= figure.depth ? Infinity : f.depth)));

  return overlaped.find((f) => f.depth === depth);
};

export const getBackwardWidget = (figures, uuid, ref) => {
  const figure = figures.find((f) => f.uuid === uuid);
  const overlaped = getOverlappedFigures(figures, ref, uuid);

  const depth = _.max(overlaped.map((f) => (f.depth >= figure.depth ? -Infinity : f.depth)));

  return overlaped.find((f) => f.depth === depth);
};

export const extendPolygon = (polygon, dist = 30) => {
  let cx = 0,
    cy = 0;

  polygon.forEach(([x, y]) => {
    cx += x;
    cy += y;
  });

  cx /= polygon.length;
  cy /= polygon.length;

  return polygon.map(([x, y]) => {
    let dx = x - cx;
    let dy = y - cy;
    const norm = Math.sqrt(dx * dx + dy * dy);
    dx /= norm;
    dy /= norm;

    return [x + dx * dist, y + dy * dist];
  });
};

export const getWidgetBoundaries = (ref, uuid, hover = true) => {
  const widget = ref.current.querySelector(uuid === GROUP_UUID ? '[data-able-groupable=true]' : `#widget-container-${uuid}`);

  const points = [
    hover && widget?.querySelector('.moveable-rotation-control'),
    widget?.querySelector('.moveable-ne'),
    widget?.querySelector('.moveable-se'),
    widget?.querySelector('.moveable-sw'),
    widget?.querySelector('.moveable-nw'),
  ]
    .filter((d) => d)
    .map((c) => c.getBoundingClientRect())
    .map(({ x, y }) => [x, y]);

  return points;
};

export const getHoveredFigure = ({ clientX, clientY }, figures, ref, includeGroup = true) => {
  const hoveredFigures = (includeGroup ? figures.concat({ uuid: GROUP_UUID, depth: Infinity }) : figures)
    .filter((f) => {
      const points = getWidgetBoundaries(ref, f.uuid, true);
      return pointInPolygon([clientX, clientY], extendPolygon(points, 30));
    })
    .sort((a, b) => b.depth - a.depth);

  if (hoveredFigures.length) {
    return hoveredFigures[0].uuid;
  }

  return null;
};

export const getOverlappedFigures = (figures, ref, uuid) => {
  const points1 = getWidgetBoundaries(ref, uuid, false);

  return figures
    .filter((f) => {
      const points2 = getWidgetBoundaries(ref, f.uuid, false);
      return overlap(points1, points2);
    })
    .sort((a, b) => b.depth - a.depth);
};

export const getMaxDepth = (figures) => {
  return _.max(figures.map((f) => f.depth)) || 0;
};
