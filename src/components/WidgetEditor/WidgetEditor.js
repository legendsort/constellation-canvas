import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import Pdf from 'react-to-pdf';
import Selecto from 'react-selecto';
import usePanZoom from 'use-pan-and-zoom';
import { useDrop } from 'react-dnd';
import WidgetGroup from './WidgetGroup';
import { Button } from 'components/form-components';

import _ from 'lodash';
import { getHoveredFigure, getMaxDepth } from './helper';
import { isTouchDevice, toArray } from 'utils';

import {
  WIDGET_MAP,
  WIDGET_GROUP_TYPES,
  WIDGET_EDITOR_SCALE_LIMIT,
  DOUBLE_CLICK_INTERVAL,
  CLICK_INTERVAL,
  CANVAS_PDF_FILENAMES,
  GROUP_UUID,
} from './constants';
import { CANVAS_STATES, DND_ITEM_TYPES } from 'utils/constants';

import { createFigure, updateFigure, setFigureHovered, copyCanvasTo, setSelectedFigure, setCopiedFigure, deleteFigure } from 'actions';

import useContextMenu from './hooks/use-context-menu';
import useStyles from './hooks/use-styles';

const WidgetEditor = ({ index, figures, copiedFigure, editable = false }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stageRef = useRef();
  const rootRef = useRef();

  const [activeFigures, setActiveFigures] = useState([]);
  const [panEnabled, setPanEnabled] = useState(false);
  const [figureGroup, setFigureGroup] = useState([]);
  const [mouseDownTime, setMouseDownTime] = useState(new Date());
  const [touchStartTime, setTouchStartTime] = useState(new Date());
  const [touchStartPoint, setTouchStartPoint] = useState({ clientX: 0, clientY: 0 });
  const [copyMenuAnchorEl, setCopyMenuAnchorEl] = useState(null);

  const { transform, zoom, panZoomHandlers, setContainer, setZoom } = usePanZoom({
    minZoom: WIDGET_EDITOR_SCALE_LIMIT.min,
    maxZoom: WIDGET_EDITOR_SCALE_LIMIT.max,
    enableZoom: false,
  });

  const [, drop] = useDrop(() => ({
    accept: DND_ITEM_TYPES.widget,
    drop: (item, monitor) => {
      setZoom((zoom) => {
        const { offsetX, offsetY, type } = item;
        const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
        const { x: clientX, y: clientY } = monitor.getClientOffset();
        const tx = `${(clientX - baseX) / zoom - offsetX}px`;
        const ty = `${(clientY - baseY) / zoom - offsetY}px`;
        const figure = {
          type,
          data: {},
          transform: { tx, ty, rotate: '0deg', sx: '1', sy: '1' },
          depth: getMaxDepth(figures) + 1,
        };

        dispatch(createFigure(figure));

        return zoom;
      });
    },
  }));

  const { contextState, setContextState, handleContextMenu, MenuComponent } = useContextMenu({ figures, figureGroup, stageRef, zoom, copiedFigure });

  const blockedZoom = useMemo(
    () => contextState.mouseY || figures.filter((f) => f.hovered && f.type.match(WIDGET_GROUP_TYPES.text)).length,
    [contextState, figures]
  );
  const blockedPan = useMemo(() => activeFigures.length || !panEnabled || blockedZoom, [activeFigures, panEnabled, blockedZoom]);

  const copyCanvasMenuItems = useMemo(
    () =>
      Object.values(CANVAS_STATES)
        .map((state, idx) => ({ title: state, canvasIndex: idx }))
        .filter((_, idx) => idx !== index),
    [index]
  );

  const selectedFigure = useMemo(() => figures.find((f) => f.selected), [figures]);

  const setRef = (el) => {
    setContainer(el);
    drop(el);
  };

  const handleTransformStart = (uuids) => {
    setActiveFigures(toArray(uuids));
  };

  const handleTransformEnd = (uuid, params) => {
    const oldFigure = _.pick(
      figures.find((f) => f.uuid === uuid),
      ['depth', 'data', 'transform']
    );
    const newFigure = _.pick({ ...oldFigure, ...params }, ['depth', 'data', 'transform']);

    if (_.isEqual(oldFigure, newFigure) === false) {
      dispatch(updateFigure({ uuid, ...params }));
    }

    setTimeout(() => setActiveFigures([]));
  };

  const handleMouseDown = (e) => {
    const currentTime = new Date();
    const hovered = getHoveredFigure(e, figures, stageRef);
    if (currentTime - mouseDownTime < DOUBLE_CLICK_INTERVAL) {
      panZoomHandlers.onMouseDown(e);
      setPanEnabled(true);
    } else {
      dispatch(setSelectedFigure(hovered));
      if (hovered !== GROUP_UUID) {
        setFigureGroup([]);
      }
    }

    setMouseDownTime(currentTime);
  };

  const handleMouseUp = (e) => {
    const currentTime = new Date();
    if (panEnabled) {
      setPanEnabled(false);
    } else if (currentTime - mouseDownTime < CLICK_INTERVAL && !getHoveredFigure(e, figures, stageRef)) {
      setFigureGroup([]);
      setActiveFigures([]);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0 && figures.length && !contextState.uuid) {
      const hovered = getHoveredFigure(e, figures, stageRef);
      const oldHovered = figures.find((f) => f.hovered)?.uuid || null;

      if (hovered !== oldHovered) {
        dispatch(setFigureHovered(hovered));
      }
    }

    if (!blockedPan && e.buttons === 1) {
      panZoomHandlers.onMouseMove(e);
    }
  };

  const handleWheel = (e) => {
    if (!blockedZoom) {
      setZoom(zoom - e.deltaY * 0.001);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (activeFigures.length) {
        return;
      }

      if (e.key === 'Escape') {
        setActiveFigures([]);
        setFigureGroup([]);
      } else if (e.key === 'Delete') {
        if (selectedFigure) {
          dispatch(deleteFigure(selectedFigure.uuid));
        } else if (figureGroup.length) {
          dispatch(deleteFigure(figureGroup.map((f) => f.id)));
        }
      } else if (e.metaKey || e.ctrlKey) {
        if (e.key === 'c') {
          if (selectedFigure) {
            dispatch(setCopiedFigure(selectedFigure.uuid));
          } else if (figureGroup) {
            dispatch(setCopiedFigure(figureGroup.map((f) => f.id)));
          }
        } else if (e.key === 'v' && copiedFigure.length) {
          const maxDepth = getMaxDepth(figures);
          const newFigures = copiedFigure.map((figure, idx) => ({
            ...figure,
            depth: maxDepth + idx + 1,
            transform: {
              ...figure.transform,
              tx: `${parseFloat(figure.transform.tx) + 50}px`,
              ty: `${parseFloat(figure.transform.ty) + 50}px`,
            },
          }));
          dispatch(createFigure(newFigures));
        } else if (e.key === 'a') {
          e.preventDefault();
          dispatch(setSelectedFigure(null));
          setFigureGroup(Array.from(stageRef.current.querySelectorAll('.widget')));
        }
      }
    },
    [selectedFigure, activeFigures, figureGroup, copiedFigure, figures, dispatch]
  );

  const handleSelectFigures = (e) => {
    if (e.selected.length > 1) {
      e.added.forEach((el) => {
        el.classList.add('selected');
      });
      e.removed.forEach((el) => {
        el.classList.remove('selected');
      });

      setFigureGroup(e.selected);
    }
  };

  const handleSaveAsPDF = (e, toPdf) => {
    e.preventDefault();
    const svgElements = stageRef.current.querySelectorAll('svg');
    svgElements.forEach(function (item) {
      let { width, height } = item.parentElement.getBoundingClientRect();
      const figure = figures.find((f) => f.uuid === item.parentElement.id);
      width = width / parseFloat(figure.transform.sx) / zoom;
      height = height / parseFloat(figure.transform.sy) / zoom;
      width && item.setAttribute('width', width);
      height && item.setAttribute('height', height);
    });
    toPdf();
  };

  const toggleCopyCanvasMenu = (e) => {
    setCopyMenuAnchorEl(e.currentTarget);
  };

  const handleCopyCanvas = (canvasIndex) => {
    setCopyMenuAnchorEl(null);
    dispatch(copyCanvasTo(canvasIndex));
  };

  useEffect(() => {
    setFigureGroup([]);
    setActiveFigures([]);
  }, [index]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [figures, handleKeyDown]);

  const handleTouchStart = (e) => {
    const currentTime = new Date();
    const { clientX, clientY } = e.touches[0];
    const hovered = getHoveredFigure({ clientX, clientY }, figures, stageRef);

    if (currentTime - touchStartTime < 500) {
      setPanEnabled(!hovered);
    } else if (!contextState.mouseY) {
      if (hovered) {
        dispatch(setSelectedFigure(hovered));
      } else {
        dispatch(setSelectedFigure(null));
        setFigureGroup([]);
        setActiveFigures([]);
      }
    }

    panZoomHandlers.onTouchStart(e);
    setTouchStartTime(currentTime);
    setTouchStartPoint({ clientX, clientY });
  };

  const handleTouchMove = (e) => {
    if (!blockedPan) {
      panZoomHandlers.onTouchMove(e);
    }
  };

  const handleTouchEnd = (e) => {
    const currentTime = new Date();
    const { clientX, clientY } = e.changedTouches[0];

    if (panEnabled) {
      setPanEnabled(false);
    } else if (currentTime - touchStartTime > 500 && clientX === touchStartPoint.clientX && clientY === touchStartPoint.clientY) {
      const hovered = getHoveredFigure({ clientX, clientY }, figures, stageRef);
      setContextState({ mouseX: clientX, mouseY: clientY, uuid: hovered });
    }

    panZoomHandlers.onTouchEnd(e);
  };

  const mouseEventHandlers = {
    onMouseMove: handleMouseMove,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onWheel: handleWheel,
  };

  const touchEventHandlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
  };

  return (
    <div className={classes.root} ref={rootRef} id="widget-editor-wrapper">
      <div
        id="widget-editor"
        className={classes.figureZoompane}
        ref={setRef}
        onContextMenu={handleContextMenu}
        {...panZoomHandlers}
        {...(isTouchDevice() ? touchEventHandlers : mouseEventHandlers)}
      >
        <div className={classes.figureStage} ref={stageRef} style={{ transform }}>
          {figures.map((figure) => {
            const group = figure.type.match(/([a-zA-Z]*)/)[0];
            const WidgetComponent = WIDGET_MAP[figure.type] || WIDGET_MAP[group];
            return (
              <WidgetComponent
                {...figure}
                editable={editable}
                group={group}
                zoom={zoom}
                key={figure.uuid}
                onTransformStart={handleTransformStart}
                onTransformEnd={handleTransformEnd}
              />
            );
          })}
          <WidgetGroup
            targets={figureGroup}
            figures={figures}
            zoom={zoom}
            onTransformStart={handleTransformStart}
            onTransformEnd={handleTransformEnd}
          />
          {MenuComponent}
        </div>
      </div>
      <div className={classes.buttonArea}>
        <Pdf
          targetRef={stageRef}
          filename={CANVAS_PDF_FILENAMES[index]}
          options={{
            unit: 'px',
            orientation: 'l',
            hotfixes: ['px_scaling'],
            format: [stageRef.current?.clientWidth, stageRef.current?.clientHeight],
          }}
        >
          {({ toPdf }) => (
            <Button color="primary" variant="contained" className={classes.saveButton} onClick={(e) => handleSaveAsPDF(e, toPdf)}>
              Save as PDF
            </Button>
          )}
        </Pdf>
        {editable && (
          <Button color="primary" variant="contained" className={classes.copyButton} onClick={toggleCopyCanvasMenu}>
            Copy Canvas to ...
          </Button>
        )}
        <Menu
          id="copy-canvas-menu"
          anchorEl={copyMenuAnchorEl}
          keepMounted
          open={Boolean(copyMenuAnchorEl)}
          onClose={() => setCopyMenuAnchorEl(null)}
        >
          {copyCanvasMenuItems.map(({ title, canvasIndex }) => (
            <MenuItem key={title} onClick={() => handleCopyCanvas(canvasIndex)}>
              {title}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {editable && !panEnabled && !activeFigures.length && (
        <Selecto container={rootRef.current} selectableTargets={['.widget']} onSelect={handleSelectFigures} />
      )}
    </div>
  );
};

export default WidgetEditor;
