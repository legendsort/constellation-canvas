import React, { useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import { WIDGET_SCALE_LIMIT } from './constants';
import { parseTransform, transformToString } from './helper';

export default function WidgetGroup({ targets, figures, zoom, onTransformStart, onTransformEnd }) {
  const moveableRef = useRef();

  useEffect(() => {
    moveableRef.current.updateRect();
  }, [figures]);

  const handleDrag = ({ target, transform, translate: [tx, ty], dist: [dx, dy] }) => {
    tx = tx - dx + dx / zoom;
    ty = ty - dy + dy / zoom;
    target.style.transform = transformToString({ ...parseTransform(transform), tx, ty });
  };

  const handleRotate = (ev) => {
    ev.target.style.transform = ev.drag.transform;
  };

  const handleScale = ({ target, transform, scale: [sx, sy] }) => {
    const { xMin, yMin, xMax, yMax } = WIDGET_SCALE_LIMIT;
    if (sx < xMin || sy < yMin || sx > xMax || sy > yMax) {
      return;
    }

    target.style.transform = transform;
  };

  const handleDragGroup = ({ events }) => {
    events.forEach((ev) => handleDrag(ev));
  };

  const handleRotateGroup = ({ events }) => {
    events.forEach((ev) => handleRotate(ev));
  };

  const handleScaleGroup = ({ events }) => {
    events.forEach((ev) => handleScale(ev));
  };

  const handleTransformStart = (e) => {
    onTransformStart(e.targets.map((target) => target.id));
  };

  const handleTransformEnd = (e) => {
    e.targets.forEach((target) => {
      onTransformEnd(target.id, { transform: parseTransform(target.style.transform) });
    });
  };

  return (
    <Moveable
      ref={moveableRef}
      target={targets}
      defaultGroupRotate={0}
      defaultGroupOrigin={'50% 50%'}
      draggable={true}
      throttleDrag={0}
      startDragRotate={0}
      throttleDragRotate={0}
      zoom={1 / zoom}
      origin={false}
      originDraggable={false}
      originRelative={false}
      rotatable={true}
      throttleRotate={0}
      rotationPosition={'top'}
      padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      resizable={false}
      scalable={true}
      keepRatio={true}
      throttleResize={0}
      renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
      edge={false}
      onDragGroup={handleDragGroup}
      onRotateGroup={handleRotateGroup}
      onScaleGroup={handleScaleGroup}
      onDragGroupStart={handleTransformStart}
      onRotateGroupStart={handleTransformStart}
      onScaleGroupStart={handleTransformStart}
      onDragGroupEnd={handleTransformEnd}
      onRotateGroupEnd={handleTransformEnd}
      onScaleGroupEnd={handleTransformEnd}
    />
  );
}
